import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ThemeProvider } from '@/components/theme-provider'
import { AtmosphericBackground } from '@/components/atmospheric-background'
import { CursorGlow } from '@/components/cursor-glow'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const _plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin", "latin-ext"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://smart-elektrik-landing-page.vercel.app'),
  title: 'SMART ELEKTRIK — Електромонтаж та Розумний Будинок | Київ',
  description: 'Професійні електромонтажні роботи та консультації в Україні.',
}

export const viewport: Viewport = {
  themeColor: '#ff7a00',
  userScalable: true,
}

import { Toaster } from '@/components/ui/toaster'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico?t=1710000000" sizes="any" />
        <link rel="icon" href="/favicon-32x32.png?t=1710000000" type="image/png" sizes="32x32" />
        <link rel="icon" href="/favicon-16x16.png?t=1710000000" type="image/png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?t=1710000000" />
        <link rel="manifest" href="/site.webmanifest?t=1710000000" />
        <meta name="theme-color" content="#FF8C00" />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <div className="relative min-h-screen">
            <AtmosphericBackground />
            <CursorGlow />

            {/* Content layer */}
            <div className="relative z-10">
              {children}
            </div>
          </div>
          <Analytics />
          <SpeedInsights />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
