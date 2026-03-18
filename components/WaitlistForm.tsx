'use client'

import { useState, useId } from 'react'
import { motion } from 'framer-motion'
import { useLang } from '@/lib/LangContext'
import { i18n } from '@/lib/i18n'

type Step = 'idle' | 'loading' | 'pending_confirm' | 'error'

export default function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [step, setStep] = useState<Step>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const checkboxId = useId()
  const { lang } = useLang()
  const t = i18n[lang]

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!consent || step === 'loading') return

    setStep('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, consent_given: true, language: lang }),
      })

      const data = await res.json()

      if (!res.ok) {
        setErrorMsg(data.error ?? 'Qualcosa è andato storto. Riprova.')
        setStep('error')
        return
      }

      setStep('pending_confirm')
    } catch {
      setErrorMsg('Errore di rete. Controlla la connessione e riprova.')
      setStep('error')
    }
  }

  if (step === 'pending_confirm') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-3 py-4"
      >
        <div className="text-3xl">📬</div>
        <p className="font-semibold" style={{ color: '#5DCAA5' }}>
          {lang === 'it' ? 'Controlla la tua e-mail' : 'Check your email'}
        </p>
        <p className="text-sm max-w-xs mx-auto leading-relaxed" style={{ color: '#B4B2A9' }}>
          {lang === 'it'
            ? <>Ti abbiamo inviato un link di conferma a <span style={{ color: '#1D9E75', fontWeight: 600 }}>{email}</span>. Clicca il link per completare l&apos;iscrizione.</>
            : <>We&apos;ve sent a confirmation link to <span style={{ color: '#1D9E75', fontWeight: 600 }}>{email}</span>. Click the link to complete your signup.</>}
        </p>
        <p className="text-xs" style={{ color: '#5F5E5A' }}>
          {lang === 'it' ? 'Non trovi l\'e-mail? Controlla lo spam.' : "Can't find it? Check your spam folder."}
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full max-w-md mx-auto space-y-3">
      {/* Email + submit */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.form.placeholder}
          disabled={step === 'loading'}
          className="flex-1 px-4 py-3 rounded-full text-white outline-none transition-all focus:ring-2 disabled:opacity-50"
          style={{
            backgroundColor: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            color: '#fff',
          }}
        />
        <button
          type="submit"
          disabled={step === 'loading' || !consent || !email}
          className="px-6 py-3 rounded-full font-semibold transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
          style={{ backgroundColor: '#1D9E75', color: '#fff' }}
        >
          {step === 'loading' ? (
            <span className="flex items-center gap-2 justify-center">
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            </span>
          ) : t.form.submit}
        </button>
      </div>

      {/* Checkbox consenso GDPR — obbligatorio */}
      <div className="flex items-start gap-3">
        <div className="relative flex-shrink-0 mt-0.5">
          <input
            type="checkbox"
            id={checkboxId}
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            required
            className="sr-only peer"
          />
          <label
            htmlFor={checkboxId}
            className="block w-4 h-4 rounded cursor-pointer transition-colors"
            style={{
              border: consent ? '1px solid #1D9E75' : '1px solid rgba(255,255,255,0.2)',
              backgroundColor: consent ? '#1D9E75' : 'rgba(255,255,255,0.05)',
            }}
          >
            {consent && (
              <svg viewBox="0 0 12 12" fill="none" className="w-4 h-4 p-0.5">
                <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </label>
        </div>
        <label htmlFor={checkboxId} className="text-xs leading-relaxed cursor-pointer" style={{ color: '#5F5E5A' }}>
          {lang === 'it' ? (
            <>
              Ho letto e accetto la{' '}
              <a href="/privacy" target="_blank" rel="noopener noreferrer"
                className="underline transition-colors hover:opacity-80"
                style={{ color: '#1D9E75' }}
                onClick={(e) => e.stopPropagation()}>
                Privacy Policy
              </a>{' '}
              e acconsento al trattamento dei miei dati per ricevere comunicazioni sul lancio.{' '}
              <span style={{ color: '#3a3a3a' }}>(obbligatorio)</span>
            </>
          ) : (
            <>
              I have read and accept the{' '}
              <a href="/privacy" target="_blank" rel="noopener noreferrer"
                className="underline transition-colors hover:opacity-80"
                style={{ color: '#1D9E75' }}
                onClick={(e) => e.stopPropagation()}>
                Privacy Policy
              </a>{' '}
              and consent to processing my data for launch communications.{' '}
              <span style={{ color: '#3a3a3a' }}>(required)</span>
            </>
          )}
        </label>
      </div>

      {step === 'error' && (
        <p className="text-xs text-center" style={{ color: '#ff6b6b' }}>{errorMsg}</p>
      )}
    </form>
  )
}
