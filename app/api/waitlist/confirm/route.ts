import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

function buildWelcomeEmailIt(referralCode: string, email: string): string {
  const unsubscribeUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/waitlist/unsubscribe?email=${encodeURIComponent(email)}`
  return `<!DOCTYPE html>
<html lang="it">
<body style="font-family:Arial,sans-serif;background:#0A1628;color:#fff;padding:40px;max-width:600px;margin:0 auto;">
  <div style="margin-bottom:32px;">
    <span style="color:#1D9E75;font-weight:900;font-size:24px;">Mo'</span><span style="color:#fff;font-weight:900;font-size:24px;">Arivo</span>
  </div>
  <h1 style="color:#1D9E75;font-size:32px;margin-bottom:8px;">Mo' arivo.</h1>
  <h2 style="color:#fff;font-size:24px;margin-bottom:24px;">E tu sei già dentro 🚀</h2>
  <p style="color:#B4B2A9;line-height:1.6;">Ciao!</p>
  <p style="color:#B4B2A9;line-height:1.6;">Sei ufficialmente nella lista di Mo'Arivo.</p>
  <p style="color:#B4B2A9;line-height:1.6;">Sai cosa significa? Che mentre gli altri ancora perdono trattative per dimenticanza, tu stai già facendo la mossa giusta.</p>
  <p style="color:#B4B2A9;line-height:1.6;">Mo'Arivo è il primo AI CRM personale che lavora per te — trova i tuoi contatti, ti ricorda quando agire, ti guida in ogni trattativa. Passo dopo passo. Senza che tu debba pensarci.</p>
  <div style="background:#0F1F0F;border-radius:12px;padding:24px;margin:32px 0;">
    <p style="color:#1D9E75;font-weight:700;margin:0 0 16px;">Cosa succede adesso?</p>
    <p style="color:#B4B2A9;margin:8px 0;">→ Sei tra i primi 1.000. Ottieni <strong style="color:#fff;">2 mesi Pro completamente gratis</strong> — nessuna carta, nessun vincolo.</p>
    <p style="color:#B4B2A9;margin:8px 0;">→ Il tuo link referral esclusivo:<br><a href="https://moarivo.com?ref=${referralCode}" style="color:#1D9E75;">moarivo.com?ref=${referralCode}</a></p>
    <p style="color:#B4B2A9;margin:8px 0;">→ Condividilo con 5 colleghi o amici. Quando accettano, guadagni 1 mese Pro extra. Gratis. Per sempre.</p>
  </div>
  <p style="color:#B4B2A9;line-height:1.6;">A presto —<br><strong style="color:#fff;">Sofia 🤖</strong><br><span style="color:#5F5E5A;">CMO di Mo'Arivo</span></p>
  <hr style="border-color:rgba(29,158,117,0.3);margin:32px 0;">
  <p style="color:#5F5E5A;font-size:11px;text-align:center;line-height:1.7;">
    Hai ricevuto questa e-mail perché ti sei iscritto alla wait-list di MOARIVO.<br>
    <a href="${unsubscribeUrl}" style="color:#1D9E75;">Cancella iscrizione</a>
    &nbsp;·&nbsp;
    <a href="${process.env.NEXT_PUBLIC_APP_URL}/privacy" style="color:#1D9E75;">Privacy Policy</a><br><br>
    Bitwear S.r.l. · Via degli Alpini 7, 38027 Malè (TN) · P.IVA 02480770227
  </p>
</body>
</html>`
}

function buildWelcomeEmailEn(referralCode: string, email: string): string {
  const unsubscribeUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/waitlist/unsubscribe?email=${encodeURIComponent(email)}`
  return `<!DOCTYPE html>
<html lang="en">
<body style="font-family:Arial,sans-serif;background:#0A1628;color:#fff;padding:40px;max-width:600px;margin:0 auto;">
  <div style="margin-bottom:32px;">
    <span style="color:#1D9E75;font-weight:900;font-size:24px;">Mo'</span><span style="color:#fff;font-weight:900;font-size:24px;">Arivo</span>
  </div>
  <h1 style="color:#1D9E75;font-size:32px;margin-bottom:8px;">Mo' arivo.</h1>
  <h2 style="color:#fff;font-size:24px;margin-bottom:24px;">And you're already in 🚀</h2>
  <p style="color:#B4B2A9;line-height:1.6;">Hey!</p>
  <p style="color:#B4B2A9;line-height:1.6;">You're officially on the Mo'Arivo waitlist.</p>
  <p style="color:#B4B2A9;line-height:1.6;">While others are still losing deals because they forgot to follow up, you're already making the right move.</p>
  <p style="color:#B4B2A9;line-height:1.6;">Mo'Arivo is the first personal AI CRM that works for you — finds your contacts, reminds you when to act, guides you through every deal. Step by step. Without you having to think about it.</p>
  <div style="background:#0F1F0F;border-radius:12px;padding:24px;margin:32px 0;">
    <p style="color:#1D9E75;font-weight:700;margin:0 0 16px;">What happens now?</p>
    <p style="color:#B4B2A9;margin:8px 0;">→ You're among the first 1,000. Get <strong style="color:#fff;">2 months Pro completely free</strong> — no card, no strings attached.</p>
    <p style="color:#B4B2A9;margin:8px 0;">→ Your exclusive referral link:<br><a href="https://moarivo.com?ref=${referralCode}" style="color:#1D9E75;">moarivo.com?ref=${referralCode}</a></p>
    <p style="color:#B4B2A9;margin:8px 0;">→ Share it with 5 colleagues or friends. When they join, you earn 1 extra month Pro. Free. Forever.</p>
  </div>
  <p style="color:#B4B2A9;line-height:1.6;">See you soon —<br><strong style="color:#fff;">Sofia 🤖</strong><br><span style="color:#5F5E5A;">CMO at Mo'Arivo</span></p>
  <hr style="border-color:rgba(29,158,117,0.3);margin:32px 0;">
  <p style="color:#5F5E5A;font-size:11px;text-align:center;line-height:1.7;">
    You received this email because you signed up for the MOARIVO waitlist.<br>
    <a href="${unsubscribeUrl}" style="color:#1D9E75;">Unsubscribe</a>
    &nbsp;·&nbsp;
    <a href="${process.env.NEXT_PUBLIC_APP_URL}/privacy" style="color:#1D9E75;">Privacy Policy</a><br><br>
    Bitwear S.r.l. · Via degli Alpini 7, 38027 Malè (TN) · P.IVA 02480770227
  </p>
</body>
</html>`
}

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')

  if (!token) {
    return NextResponse.redirect(new URL('/?confirm=invalid', req.url))
  }

  const { data, error } = await supabase
    .from('waitlist')
    .select('email, language, referral_code, optin_token_expires_at, confirmed')
    .eq('optin_token', token)
    .single()

  if (error || !data) {
    return NextResponse.redirect(new URL('/?confirm=invalid', req.url))
  }

  if (new Date(data.optin_token_expires_at) < new Date()) {
    return NextResponse.redirect(new URL('/?confirm=expired', req.url))
  }

  if (data.confirmed) {
    return NextResponse.redirect(new URL('/?confirm=already', req.url))
  }

  await supabase
    .from('waitlist')
    .update({
      confirmed: true,
      confirmed_at: new Date().toISOString(),
      optin_token: null,
      optin_token_expires_at: null,
    })
    .eq('optin_token', token)

  // Send welcome email now that the address is confirmed
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY)
      const isIt = data.language !== 'en'
      await resend.emails.send({
        from: 'Sofia Ferretti <sofia@moarivo.com>',
        to: data.email,
        subject: isIt
          ? "Mo' arivo. E tu sei già dentro 🚀"
          : "Mo' arivo. And you're already in 🚀",
        html: isIt
          ? buildWelcomeEmailIt(data.referral_code, data.email)
          : buildWelcomeEmailEn(data.referral_code, data.email),
      })
    } catch (emailErr) {
      console.error('Welcome email error:', emailErr)
      // Don't block the redirect — confirmation already saved
    }
  }

  return NextResponse.redirect(new URL('/?confirm=success', req.url))
}
