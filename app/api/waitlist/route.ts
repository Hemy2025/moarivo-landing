import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createHash } from 'crypto'
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

function buildEmailIt(referralCode: string): string {
  return `<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; background: #0A1628; color: #ffffff; padding: 40px; max-width: 600px; margin: 0 auto;">
  <div style="margin-bottom: 32px;">
    <span style="color: #1D9E75; font-weight: 900; font-size: 24px;">Mo'</span><span style="color: #ffffff; font-weight: 900; font-size: 24px;">Arivo</span>
  </div>
  <h1 style="color: #1D9E75; font-size: 32px; margin-bottom: 8px;">Mo' arivo.</h1>
  <h2 style="color: #ffffff; font-size: 24px; margin-bottom: 24px;">E tu sei già dentro 🚀</h2>
  <p style="color: #B4B2A9; line-height: 1.6;">Ciao!</p>
  <p style="color: #B4B2A9; line-height: 1.6;">Sei ufficialmente nella lista di Mo'Arivo.</p>
  <p style="color: #B4B2A9; line-height: 1.6;">Sai cosa significa? Che mentre gli altri ancora perdono trattative per dimenticanza, tu stai già facendo la mossa giusta.</p>
  <p style="color: #B4B2A9; line-height: 1.6;">Mo'Arivo è il primo AI CRM personale che lavora per te — trova i tuoi contatti, ti ricorda quando agire, ti guida in ogni trattativa. Passo dopo passo. Senza che tu debba pensarci.</p>
  <div style="background: #0F1F0F; border-radius: 12px; padding: 24px; margin: 32px 0;">
    <p style="color: #1D9E75; font-weight: 700; margin: 0 0 16px;">Cosa succede adesso?</p>
    <p style="color: #B4B2A9; margin: 8px 0;">→ Sei tra i primi 1.000. Ottieni <strong style="color: #ffffff;">2 mesi Pro completamente gratis</strong> — nessuna carta, nessun vincolo.</p>
    <p style="color: #B4B2A9; margin: 8px 0;">→ Il tuo link referral esclusivo:<br><a href="https://moarivo.com?ref=${referralCode}" style="color: #1D9E75;">moarivo.com?ref=${referralCode}</a></p>
    <p style="color: #B4B2A9; margin: 8px 0;">→ Condividilo con 5 colleghi o amici. Quando accettano, guadagni 1 mese Pro extra. Gratis. Per sempre.</p>
  </div>
  <p style="color: #B4B2A9; line-height: 1.6;">A presto —<br><strong style="color: #ffffff;">Sofia 🤖</strong><br><span style="color: #5F5E5A;">CMO di Mo'Arivo</span></p>
  <hr style="border-color: #1D9E75; margin: 32px 0;">
  <p style="color: #5F5E5A; font-size: 12px;">Mo'Arivo · moarivo.com · Fatto con ❤️ e un po' di romano · Roma, Italia</p>
</body>
</html>`
}

function buildEmailEn(referralCode: string): string {
  return `<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; background: #0A1628; color: #ffffff; padding: 40px; max-width: 600px; margin: 0 auto;">
  <div style="margin-bottom: 32px;">
    <span style="color: #1D9E75; font-weight: 900; font-size: 24px;">Mo'</span><span style="color: #ffffff; font-weight: 900; font-size: 24px;">Arivo</span>
  </div>
  <h1 style="color: #1D9E75; font-size: 32px; margin-bottom: 8px;">Mo' arivo.</h1>
  <h2 style="color: #ffffff; font-size: 24px; margin-bottom: 24px;">And you're already in 🚀</h2>
  <p style="color: #B4B2A9; line-height: 1.6;">Hey!</p>
  <p style="color: #B4B2A9; line-height: 1.6;">You're officially on the Mo'Arivo waitlist.</p>
  <p style="color: #B4B2A9; line-height: 1.6;">While others are still losing deals because they forgot to follow up, you're already making the right move.</p>
  <p style="color: #B4B2A9; line-height: 1.6;">Mo'Arivo is the first personal AI CRM that works for you — finds your contacts, reminds you when to act, guides you through every deal. Step by step. Without you having to think about it.</p>
  <div style="background: #0F1F0F; border-radius: 12px; padding: 24px; margin: 32px 0;">
    <p style="color: #1D9E75; font-weight: 700; margin: 0 0 16px;">What happens now?</p>
    <p style="color: #B4B2A9; margin: 8px 0;">→ You're among the first 1,000. Get <strong style="color: #ffffff;">2 months Pro completely free</strong> — no card, no strings attached.</p>
    <p style="color: #B4B2A9; margin: 8px 0;">→ Your exclusive referral link:<br><a href="https://moarivo.com?ref=${referralCode}" style="color: #1D9E75;">moarivo.com?ref=${referralCode}</a></p>
    <p style="color: #B4B2A9; margin: 8px 0;">→ Share it with 5 colleagues or friends. When they join, you earn 1 extra month Pro. Free. Forever.</p>
  </div>
  <p style="color: #B4B2A9; line-height: 1.6;">See you soon —<br><strong style="color: #ffffff;">Sofia 🤖</strong><br><span style="color: #5F5E5A;">CMO at Mo'Arivo</span></p>
  <hr style="border-color: #1D9E75; margin: 32px 0;">
  <p style="color: #5F5E5A; font-size: 12px;">Mo'Arivo · moarivo.com · Made with ❤️ and a bit of Roman spirit · Rome, Italy</p>
</body>
</html>`
}

export async function POST(req: NextRequest) {
  try {
    const { email, language = 'it', referred_by } = await req.json()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const referral_code = generateReferralCode()
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
    const userAgent = req.headers.get('user-agent') || 'unknown'

    const { data, error } = await supabaseAdmin
      .from('waitlist')
      .insert({
        email: email.toLowerCase().trim(),
        language,
        referral_code,
        referred_by: referred_by || null,
        ip_hash: hashValue(ip),
        user_agent_hash: hashValue(userAgent),
      })
      .select('referral_code')
      .single()

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: 'Email already registered' }, { status: 409 })
      }
      throw error
    }

    const { count } = await supabaseAdmin
      .from('waitlist')
      .select('*', { count: 'exact', head: true })

    // Send welcome email via Resend (non-blocking — don't fail the request if email fails)
    if (!process.env.RESEND_API_KEY) {
      console.log('RESEND_API_KEY non trovata nelle env vars')
    } else {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY)
        const isIt = language === 'it'
        await resend.emails.send({
          from: 'Sofia Ferretti <sofia@moarivo.com>',
          to: email.toLowerCase().trim(),
          subject: isIt
            ? "Mo' arivo. E tu sei già dentro 🚀"
            : "Mo' arivo. And you're already in 🚀",
          html: isIt
            ? buildEmailIt(data.referral_code)
            : buildEmailEn(data.referral_code),
        })
      } catch (emailErr) {
        console.error('Email send error:', emailErr)
        console.error('Email send error completo:', JSON.stringify(emailErr))
      }
    }

    return NextResponse.json({
      success: true,
      referral_code: data.referral_code,
      count: count ?? 0,
    })
  } catch (err) {
    console.error('Waitlist error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
