'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useLang } from '@/lib/LangContext'
import { i18n } from '@/lib/i18n'

export default function CounterBadge() {
  const [count, setCount] = useState<number | null>(null)
  const { lang } = useLang()
  const t = i18n[lang]

  useEffect(() => {
    fetch('/api/waitlist/count')
      .then(r => r.json())
      .then(d => setCount(d.count ?? 0))
      .catch(() => setCount(0))
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
      style={{ backgroundColor: 'rgba(29,158,117,0.15)', border: '1px solid rgba(29,158,117,0.3)', color: '#5DCAA5' }}
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: '#1D9E75' }}></span>
        <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: '#1D9E75' }}></span>
      </span>
      {count !== null ? (
        <span><strong>{count.toLocaleString()}</strong> {t.counter.label}</span>
      ) : (
        <span className="animate-pulse">...</span>
      )}
    </motion.div>
  )
}
