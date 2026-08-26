import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import AuthGuard from '@/components/auth-guard'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mariscope Command | Maritime Intelligence',
  description: 'AI-powered oil spill detection and vessel surveillance command center.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f5f8f7',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased" suppressHydrationWarning>
        <AuthGuard>{children}</AuthGuard>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
