import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get('email')

  if (!email) {
    return NextResponse.redirect(new URL('/?unsubscribe=invalid', req.url))
  }

  await supabase
    .from('waitlist')
    .update({
      confirmed: false,
      consent_given: false,
    })
    .eq('email', email.toLowerCase().trim())

  return NextResponse.redirect(new URL('/?unsubscribe=success', req.url))
}
