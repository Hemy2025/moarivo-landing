import type { Metadata } from 'next'
import './globals.css'
import { LangProvider } from '@/lib/LangContext'
import CookieBanner from '@/components/CookieBanner'

export const metadata: Metadata = {
  title: "Mo'Arivo — Il CRM AI per consulenti e freelance",
  description: "Il primo AI CRM personale che ricorda per te chi chiamare, quando farlo, e cosa dire.",
  openGraph: {
    title: "Mo'Arivo",
    description: "The first personal AI CRM that remembers who to call, when to call them, and what to say.",
    url: 'https://moarivo.com',
    siteName: "Mo'Arivo",
    locale: 'it_IT',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </head>
      <body style={{ backgroundColor: '#0A1628', color: '#fff', margin: 0 }}>
        <LangProvider>{children}</LangProvider>
        <CookieBanner />
      </body>
    </html>
  )
}
