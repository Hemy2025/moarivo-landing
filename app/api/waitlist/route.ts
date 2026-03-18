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

function confirmEmailHtml(confirmUrl: string, lang: string): string {
  const isIt = lang !== 'en'
  return `<!DOCTYPE html>
<html lang="${isIt ? 'it' : 'en'}">
<body style="margin:0;padding:0;background:#0A1628;font-family:Arial,sans-serif;">
  <div style="max-width:480px;margin:40px auto;padding:32px 24px;background:#0F1F0F;border-radius:16px;border:1px solid rgba(29,158,117,0.2);">
    <div style="margin-bottom:24px;">
      <span style="color:#1D9E75;font-weight:900;font-size:22px;">Mo'</span><span style="color:#fff;font-weight:900;font-size:22px;">Arivo</span>
    </div>
    <p style="font-size:15px;color:#d1d5db;line-height:1.6;margin:0 0 12px;">
      ${isIt ? 'Grazie per esserti iscritto alla wait-list! 🎉' : 'Thanks for joining the waitlist! 🎉'}
    </p>
    <p style="font-size:14px;color:#9ca3af;line-height:1.6;margin:0 0 28px;">
      ${isIt
        ? 'Clicca il bottone qui sotto per confermare la tua e-mail e completare l\'iscrizione. Il link è valido per 24 ore.'
        : 'Click the button below to confirm your email and complete your signup. The link is valid for 24 hours.'}
    </p>
    <a href="${confirmUrl}"
      style="display:inline-block;padding:14px 28px;background:#1D9E75;
             color:#fff;font-weight:700;font-size:14px;border-radius:24px;text-decoration:none;">
      ${isIt ? '✓ Conferma iscrizione' : '✓ Confirm signup'}
    </a>
    <p style="margin-top:32px;font-size:11px;color:#4b5563;line-height:1.7;">
      ${isIt
        ? 'Se non hai richiesto questa iscrizione, ignora questa e-mail — non verrà fatto nulla.'
        : "If you didn't request this signup, ignore this email — nothing will happen."}<br><br>
      Bitwear S.r.l. · Via degli Alpini 7, 38027 Malè (TN) · P.IVA 02480770227<br>
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/privacy" style="color:#1D9E75;">Privacy Policy</a>
      &nbsp;·&nbsp;
      <a href="mailto:privacy@moarivo.com" style="color:#1D9E75;">privacy@moarivo.com</a>
    </p>
  </div>
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
      const isIt = language !== 'en'

      try {
        await resend.emails.send({
          from: 'Sofia Ferretti <sofia@moarivo.com>',
          to: normalizedEmail,
          subject: isIt
            ? 'Conferma la tua iscrizione a MOARIVO'
            : 'Confirm your MOARIVO signup',
          html: confirmEmailHtml(confirmUrl, language),
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
