'use client'
import Logo from './Logo'
import { useLang } from '@/lib/LangContext'
import { i18n } from '@/lib/i18n'

export default function Navbar() {
  const { lang, setLang } = useLang()
  const t = i18n[lang]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4" style={{ backgroundColor: '#0A1628', borderBottom: '1px solid rgba(29,158,117,0.15)' }}>
      <Logo dark />
      <div className="flex items-center gap-4">
        <button
          onClick={() => setLang(lang === 'it' ? 'en' : 'it')}
          className="text-sm font-semibold px-3 py-1 rounded-full border transition-all"
          style={{ borderColor: '#1D9E75', color: '#1D9E75', backgroundColor: 'transparent' }}
        >
          {lang === 'it' ? '🇬🇧 EN' : '🇮🇹 IT'}
        </button>
        <a
          href="#waitlist"
          className="text-sm font-semibold px-4 py-2 rounded-full transition-all hover:opacity-90"
          style={{ backgroundColor: '#1D9E75', color: '#FFFFFF' }}
        >
          {t.nav.cta}
        </a>
      </div>
    </nav>
  )
}
