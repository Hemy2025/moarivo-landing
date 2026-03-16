'use client'
import { motion } from 'framer-motion'

interface PricingCardProps {
  name: string
  price: string
  features: string[]
  cta: string
  highlighted?: boolean
  badge?: string
  delay?: number
}

export default function PricingCard({ name, price, features, cta, highlighted = false, badge, delay = 0 }: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="relative p-8 rounded-2xl flex flex-col gap-6"
      style={{
        backgroundColor: highlighted ? 'rgba(29,158,117,0.08)' : 'rgba(255,255,255,0.03)',
        border: highlighted ? '2px solid #1D9E75' : '1px solid rgba(255,255,255,0.1)',
      }}
    >
      {badge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full" style={{ backgroundColor: '#1D9E75', color: '#fff' }}>
          {badge}
        </span>
      )}
      <div>
        <h3 className="text-xl font-bold mb-1" style={{ color: '#fff' }}>{name}</h3>
        <p className="text-2xl font-black" style={{ color: highlighted ? '#1D9E75' : '#B4B2A9' }}>{price}</p>
      </div>
      <ul className="flex flex-col gap-2 flex-1">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-2 text-sm" style={{ color: '#B4B2A9' }}>
            <span style={{ color: '#1D9E75' }}>✓</span> {f}
          </li>
        ))}
      </ul>
      <a
        href="#waitlist"
        className="block text-center py-3 rounded-full font-semibold transition-all hover:opacity-90"
        style={highlighted ? { backgroundColor: '#1D9E75', color: '#fff' } : { backgroundColor: 'rgba(255,255,255,0.06)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}
      >
        {cta}
      </a>
    </motion.div>
  )
}
