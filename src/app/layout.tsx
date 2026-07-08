import type { Metadata } from 'next'
import { Inter, Orbitron, Fira_Code } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import ParticlesBackground from '@/components/effects/ParticlesBackground'
import CustomCursor from '@/components/effects/CustomCursor'
import { ThemeProvider } from '@/components/ThemeProvider'
import { withBasePath } from '@/lib/utils'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
})

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code',
})

export const metadata: Metadata = {
  title: 'Aakash Kharb | 27',
  description: 'Portfolio of Aakash Kharb - Passionate about Gen AI, Machine Learning, Cloud Engineering, and innovative software solutions.',
  keywords: ['Aakash Kharb', 'AI Engineer', 'Machine Learning', 'Cloud Engineering', 'Software Developer', 'Portfolio'],
  authors: [{ name: 'Aakash Kharb' }],
  creator: 'Aakash Kharb',
  icons: {
    icon: withBasePath('/images/favicon.png'),
    shortcut: withBasePath('/images/favicon.png'),
    apple: withBasePath('/images/favicon.png'),
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aakash-test7.github.io',
    title: 'Aakash Kharb | 27',
    description: 'Portfolio showcasing AI, ML, and Cloud Engineering projects',
    siteName: 'Aakash Kharb Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aakash Kharb | 27',
    description: 'Portfolio showcasing AI, ML, and Cloud Engineering projects',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} ${orbitron.variable} ${firaCode.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <CustomCursor />
          <ParticlesBackground />
          <Navigation />
          <main className="relative z-10">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
