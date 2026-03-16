import React from 'react'

export default function Logo({ size = 'md', dark = false }: { size?: 'sm' | 'md' | 'lg'; dark?: boolean }) {
  const sizes = { sm: 'text-xl', md: 'text-2xl', lg: 'text-4xl' }
  return (
    <span className={`font-black ${sizes[size]}`} style={{ fontFamily: 'Arial Black, Arial, sans-serif', fontWeight: 900 }}>
      <span style={{ background: 'linear-gradient(135deg, #0F6E56, #5DCAA5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{'// '}</span>
      <span style={{ color: '#1D9E75' }}>Mo&apos;</span>
      <span style={{ color: dark ? '#FFFFFF' : '#0A1628' }}>Arivo</span>
    </span>
  )
}
