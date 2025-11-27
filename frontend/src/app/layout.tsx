import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Translation Tool',
  description: 'Nepali and Sinhala to English Translation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}