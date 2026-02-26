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
  metadataBase: new URL('https://smart-elektrik-landing-page.vercel.app/'),
  title: 'SMART ELEKTRIK — Електромонтаж та Розумний Будинок | Київ',
  description: 'Професійні електромонтажні роботи та консультації в Україні. Розраховуйте вартість послуг онлайн.',
  icons: {
    icon: '/logo-smart-v1.png?v=1',
    shortcut: '/logo-smart-v1.png?v=1',
    apple: '/logo-smart-v1.png?v=1',
  },
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
        <link rel="icon" href="/logo-smart-v1.png?v=1" type="image/png" />
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
