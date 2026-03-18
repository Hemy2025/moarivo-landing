'use client'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Logo from '@/components/Logo'
import CounterBadge from '@/components/CounterBadge'
import WaitlistForm from '@/components/WaitlistForm'
import SpotsCounter from '@/components/SpotsCounter'
import FeatureCard from '@/components/FeatureCard'
import PricingCard from '@/components/PricingCard'
import { useLang } from '@/lib/LangContext'
import { i18n } from '@/lib/i18n'

export default function Home() {
  const { lang } = useLang()
  const t = i18n[lang]

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section id="hero" className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-16" style={{ backgroundColor: '#0A1628' }}>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4"
          style={{ backgroundColor: 'rgba(29,158,117,0.15)', border: '1px solid rgba(29,158,117,0.4)', color: '#5DCAA5' }}
        >
          {lang === 'it'
            ? '🎁 Offerta early adopter: i primi 1.000 iscritti ottengono 2 mesi Pro gratis invece di 1'
            : '🎁 Early adopter offer: the first 1,000 subscribers get 2 months Pro free instead of 1'}
        </motion.div>
        <CounterBadge />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto"
        >
          {lang === 'it' ? (
            <h1 className="font-black leading-tight mb-6" style={{ fontFamily: 'Arial Black, Arial, sans-serif' }}>
              <span className="block text-3xl md:text-4xl mb-2" style={{ color: '#5F5E5A' }}>{t.hero.headline1}</span>
              <span className="block text-5xl md:text-7xl mb-2" style={{ color: '#1D9E75' }}>{t.hero.headline2}</span>
              <span className="block text-4xl md:text-5xl" style={{ color: '#ffffff' }}>{t.hero.headline3}</span>
            </h1>
          ) : (
            <h1 className="font-black leading-tight mb-6" style={{ fontFamily: 'Arial Black, Arial, sans-serif' }}>
              <span className="block text-5xl md:text-7xl mb-2" style={{ color: '#1D9E75' }}>{t.hero.headline1}</span>
              <span className="block text-3xl md:text-4xl" style={{ color: '#ffffff' }}>{t.hero.headline3}</span>
            </h1>
          )}

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-lg md:text-xl max-w-2xl mx-auto mb-10"
            style={{ color: '#B4B2A9' }}
          >
            {t.hero.subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            id="waitlist"
            className="w-full"
          >
            <WaitlistForm />
            <SpotsCounter />
            <p className="mt-3 text-sm" style={{ color: '#5F5E5A' }}>{t.hero.formNote}</p>
          </motion.div>
        </motion.div>
      </section>

      {/* SOCIAL PROOF BAR */}
      <section className="py-8 px-6" style={{ backgroundColor: '#0F1F0F' }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex flex-wrap justify-center gap-3 mb-4">
            {['GDPR Compliant', 'Privacy by Design', 'AI Act Compliant'].map(badge => (
              <span key={badge} className="text-xs px-3 py-1 rounded-full font-semibold" style={{ backgroundColor: 'rgba(29,158,117,0.15)', color: '#5DCAA5', border: '1px solid rgba(29,158,117,0.3)' }}>
                {badge}
              </span>
            ))}
          </div>
          <p className="text-sm mb-3" style={{ color: '#B4B2A9' }}>{t.social.text}</p>
          <div className="flex flex-wrap justify-center gap-4" style={{ color: '#5F5E5A' }}>
            {['Google', 'LinkedIn', 'Facebook', 'X', 'Instagram', 'TikTok'].map(s => (
              <span key={s} className="text-sm font-medium">{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 px-6" style={{ backgroundColor: '#0A1628' }}>
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-black text-center mb-16"
            style={{ color: '#fff' }}
          >
            {t.features.title}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.features.cards.map((card, i) => (
              <FeatureCard key={i} icon={card.icon} title={card.title} desc={card.desc} delay={i * 0.15} />
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-24 px-6" style={{ backgroundColor: '#0F1F0F' }}>
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-black text-center mb-16"
            style={{ color: '#fff' }}
          >
            {t.pricing.title}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <PricingCard
              name={t.pricing.starter.name}
              price={t.pricing.starter.price}
              features={t.pricing.starter.features}
              cta={t.pricing.starter.cta}
              delay={0}
            />
            <PricingCard
              name={t.pricing.pro.name}
              price={t.pricing.pro.price}
              features={t.pricing.pro.features}
              cta={t.pricing.pro.cta}
              highlighted
              badge={t.pricing.pro.badge}
              delay={0.15}
            />
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10 text-lg font-semibold"
            style={{ color: '#5DCAA5' }}
          >
            {t.pricing.referral}
          </motion.p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 px-6" style={{ backgroundColor: '#1D9E75' }}>
        <div className="max-w-2xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black mb-6"
            style={{ color: '#fff', fontFamily: 'Arial Black, Arial, sans-serif' }}
          >
            {t.finalCta.title}
          </motion.h2>
          <div className="mb-6">
            <WaitlistForm />
          </div>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.8)' }}>{t.finalCta.subtitle}</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6" style={{ backgroundColor: '#0A1628', borderTop: '1px solid rgba(29,158,117,0.2)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <Logo dark size="md" />
          </div>
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            {t.footer.links.map(link => (
              <a key={link} href="#" className="text-sm hover:underline" style={{ color: '#B4B2A9' }}>{link}</a>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {['GDPR', 'Privacy by Design', 'AI Act Compliant'].map(badge => (
              <span key={badge} className="text-xs px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(29,158,117,0.1)', color: '#5DCAA5', border: '1px solid rgba(29,158,117,0.2)' }}>
                {badge}
              </span>
            ))}
          </div>
          <p className="text-sm mb-2" style={{ color: '#5F5E5A' }}>{t.footer.tagline}</p>
          <p className="text-sm" style={{ color: '#5F5E5A' }}>{t.footer.copyright}</p>
          <div className="flex flex-wrap justify-center gap-3 mt-4 text-xs" style={{ color: '#5F5E5A' }}>
            <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>·</span>
            <a href="/privacy#cookie" className="hover:text-white transition-colors">Cookie Policy</a>
            <span>·</span>
            <a href="mailto:privacy@moarivo.com" className="hover:text-white transition-colors">privacy@moarivo.com</a>
          </div>
        </div>
      </footer>
    </>
  )
}
