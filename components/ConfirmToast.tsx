'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

const MESSAGES: Record<string, string> = {
  success: '✅ E-mail confermata! Sei ufficialmente in lista.',
  expired: '⚠️ Il link è scaduto. Iscriviti di nuovo.',
  invalid: '❌ Link non valido.',
  already: '✅ Hai già confermato l\'iscrizione!',
  'unsubscribe-success': '✅ Iscrizione cancellata con successo.',
  'unsubscribe-invalid': '❌ Richiesta non valida.',
}

export default function ConfirmToast() {
  const searchParams = useSearchParams()
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    const confirm = searchParams.get('confirm')
    const unsubscribe = searchParams.get('unsubscribe')

    const key = confirm ?? (unsubscribe ? `unsubscribe-${unsubscribe}` : null)
    if (key && MESSAGES[key]) {
      setToast(MESSAGES[key])
      const timer = setTimeout(() => setToast(null), 5000)
      return () => clearTimeout(timer)
    }
  }, [searchParams])

  if (!toast) return null

  return (
    <div
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl text-sm text-white shadow-xl"
      style={{
        background: 'rgba(15,31,15,0.95)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(29,158,117,0.4)',
      }}
    >
      {toast}
    </div>
  )
}
