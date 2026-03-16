'use client'
import { motion } from 'framer-motion'

interface FeatureCardProps {
  icon: string
  title: string
  desc: string
  delay?: number
}

export default function FeatureCard({ icon, title, desc, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="p-6 rounded-2xl flex flex-col gap-4"
      style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(29,158,117,0.2)' }}
    >
      <span className="text-4xl">{icon}</span>
      <h3 className="text-xl font-bold" style={{ color: '#fff' }}>{title}</h3>
      <p style={{ color: '#B4B2A9' }}>{desc}</p>
    </motion.div>
  )
}
