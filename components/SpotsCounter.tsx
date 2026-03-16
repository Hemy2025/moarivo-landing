'use client'
import { useEffect, useState } from 'react'
import { useLang } from '@/lib/LangContext'

const TOTAL = 1000

export default function SpotsCounter() {
  const [count, setCount] = useState<number | null>(null)
  const { lang } = useLang()

  useEffect(() => {
    fetch('/api/waitlist/count')
      .then(r => r.json())
      .then(d => setCount(d.count ?? 0))
      .catch(() => setCount(0))
  }, [])

  if (count === null) return null

  const spotsLeft = Math.max(0, TOTAL - count)
  const isIt = lang === 'it'

  if (spotsLeft === 0) {
    return (
      <p className="mt-3 text-sm font-medium" style={{ color: '#5DCAA5' }}>
        {isIt ? 'Offerta esaurita — ora ottieni 1 mese gratis' : 'Offer ended — now get 1 month free'}
      </p>
    )
  }

  return (
    <p className="mt-3 text-sm font-medium" style={{ color: '#5DCAA5' }}>
      {isIt
        ? `Posti rimasti: ${spotsLeft.toLocaleString('it-IT')}/${TOTAL.toLocaleString('it-IT')}`
        : `Spots left: ${spotsLeft.toLocaleString('en-US')}/${TOTAL.toLocaleString('en-US')}`}
    </p>
  )
}
