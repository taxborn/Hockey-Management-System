import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'HMS',
  description: 'Hockey Management System',
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
