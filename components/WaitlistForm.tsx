'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLang } from '@/lib/LangContext'
import { i18n } from '@/lib/i18n'

export default function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'duplicate'>('idle')
  const [referralCode, setReferralCode] = useState('')
  const { lang } = useLang()
  const t = i18n[lang]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || status === 'loading') return
    setStatus('loading')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, language: lang }),
      })
      const data = await res.json()
      if (res.status === 409) {
        setStatus('duplicate')
      } else if (res.ok) {
        setStatus('success')
        setReferralCode(data.referral_code)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-6 rounded-2xl"
        style={{ backgroundColor: 'rgba(29,158,117,0.15)', border: '1px solid #1D9E75' }}
      >
        <p className="text-lg font-semibold mb-2" style={{ color: '#5DCAA5' }}>{t.form.success}</p>
        {referralCode && (
          <p className="text-sm mt-2" style={{ color: '#B4B2A9' }}>
            Referral code: <code className="font-mono font-bold" style={{ color: '#1D9E75' }}>{referralCode}</code>
          </p>
        )}
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder={t.form.placeholder}
          required
          className="flex-1 px-4 py-3 rounded-full text-white outline-none transition-all focus:ring-2"
          style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff' }}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-6 py-3 rounded-full font-semibold transition-all hover:opacity-90 disabled:opacity-60 whitespace-nowrap"
          style={{ backgroundColor: '#1D9E75', color: '#fff' }}
        >
          {status === 'loading' ? '...' : t.form.submit}
        </button>
      </div>
      {status === 'error' && <p className="text-center mt-2 text-sm" style={{ color: '#ff6b6b' }}>{t.form.error}</p>}
      {status === 'duplicate' && <p className="text-center mt-2 text-sm" style={{ color: '#5DCAA5' }}>{t.form.duplicate}</p>}
    </form>
  )
}
