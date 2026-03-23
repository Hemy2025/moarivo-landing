import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createHash, randomBytes } from 'crypto'
import { Resend } from 'resend'

function generateReferralCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const array = new Uint8Array(8)
  crypto.getRandomValues(array)
  return Array.from(array).map(b => chars[b % chars.length]).join('')
}

function hashValue(value: string): string {
  return createHash('sha256').update(value).digest('hex').slice(0, 16)
}

function confirmEmailHtml(confirmUrl: string, unsubscribeUrl: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#070711;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#070711;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#0F0E1A;border-radius:16px;border:1px solid #1E1B4B;overflow:hidden;">
        <tr><td style="background:#7C3AED;padding:32px;text-align:center;">
          <h1 style="color:#fff;font-size:28px;margin:0;letter-spacing:2px;">MOARIVO</h1>
          <p style="color:#C4B5FD;margin:8px 0 0;font-size:13px;">Personal AI CRM</p>
        </td></tr>
        <tr><td style="padding:40px 48px;">
          <p style="color:#A5B4FC;font-size:13px;margin:0 0 8px;text-transform:uppercase;letter-spacing:1px;">Sei dentro</p>
          <h2 style="color:#FFFFFF;font-size:22px;margin:0 0 20px;">Conferma la tua iscrizione</h2>
          <p style="color:#94A3B8;font-size:15px;line-height:1.6;margin:0 0 24px;">
            Sei quasi dentro alla waitlist MOARIVO. Clicca il bottone per confermare la tua email e bloccare il tuo posto.
          </p>
          <div style="background:#1E1B4B;border-radius:8px;border-left:4px solid #7C3AED;padding:16px 20px;margin:0 0 32px;">
            <p style="color:#C4B5FD;font-size:14px;margin:0 0 4px;font-weight:bold;">Offerta Early Adopter</p>
            <p style="color:#94A3B8;font-size:14px;margin:0;">I primi 1.000 iscritti ottengono <strong style="color:#C4B5FD;">2 mesi Pro gratuiti</strong> al lancio.</p>
          </div>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td align="center" style="padding:0 0 32px;">
              <a href="${confirmUrl}" style="display:inline-block;background:#7C3AED;color:#fff;text-decoration:none;padding:16px 48px;border-radius:8px;font-size:16px;font-weight:bold;">
                Conferma iscrizione →
              </a>
            </td></tr>
          </table>
          <p style="color:#64748B;font-size:13px;text-align:center;margin:0;">Il link scade in 24 ore. Se non hai richiesto questo, ignora questa email.</p>
        </td></tr>
        <tr><td style="background:#070711;padding:24px 48px;border-top:1px solid #1E1B4B;text-align:center;">
          <p style="color:#475569;font-size:12px;margin:0;">
            © 2026 MOARIVO — Bitwear S.r.l. · <a href="https://moarivo.com/privacy" style="color:#7C3AED;">Privacy</a> · <a href="${unsubscribeUrl}" style="color:#7C3AED;">Cancellati</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

export async function POST(req: NextRequest) {
  try {
    const { email, consent_given, language = 'it', referred_by } = await req.json()

    if (!email || !consent_given) {
      return NextResponse.json({ error: 'Dati mancanti o consenso non fornito.' }, { status: 400 })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Indirizzo e-mail non valido.' }, { status: 400 })
    }

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const normalizedEmail = email.toLowerCase().trim()
    const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'unknown'
    const userAgent = req.headers.get('user-agent') ?? 'unknown'
    const token = randomBytes(32).toString('hex')
    const consent_timestamp = new Date().toISOString()
    const optin_token_expires_at = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()

    // Check if already confirmed — don't overwrite with a new token
    const { data: existing } = await supabaseAdmin
      .from('waitlist')
      .select('confirmed, referral_code')
      .eq('email', normalizedEmail)
      .single()

    if (existing?.confirmed) {
      // Already confirmed — silently succeed (don't leak info)
      return NextResponse.json({ ok: true })
    }

    const referral_code = existing?.referral_code ?? generateReferralCode()

    const { error: dbError } = await supabaseAdmin
      .from('waitlist')
      .upsert({
        email: normalizedEmail,
        language,
        referral_code,
        referred_by: referred_by ?? null,
        ip_hash: hashValue(ip),
        user_agent_hash: hashValue(userAgent),
        confirmed: false,
        consent_given: true,
        consent_timestamp,
        consent_ip: ip,
        optin_token: token,
        optin_token_expires_at,
      }, { onConflict: 'email' })

    if (dbError) {
      console.error('Supabase error:', dbError)
      return NextResponse.json({ error: 'Errore interno.' }, { status: 500 })
    }

    // Send double opt-in confirmation email
    if (!process.env.RESEND_API_KEY) {
      console.log('RESEND_API_KEY non trovata nelle env vars')
    } else {
      const resend = new Resend(process.env.RESEND_API_KEY)
      const confirmUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/waitlist/confirm?token=${token}`
      const unsubscribeUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/waitlist/unsubscribe?email=${encodeURIComponent(normalizedEmail)}`
      const isIt = language !== 'en'

      try {
        await resend.emails.send({
          from: 'Sofia Ferretti <sofia@moarivo.com>',
          to: normalizedEmail,
          subject: isIt
            ? 'Conferma la tua iscrizione a MOARIVO'
            : 'Confirm your MOARIVO signup',
          html: confirmEmailHtml(confirmUrl, unsubscribeUrl),
        })
      } catch (emailErr) {
        console.error('Resend error:', emailErr)
        return NextResponse.json({ error: "Errore nell'invio dell'e-mail." }, { status: 500 })
      }
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Waitlist error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
