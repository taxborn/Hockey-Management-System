import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import Navbar from './components/Navbar'

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
    <ClerkProvider>
      <html lang="en">
        <body>
          <Navbar />

          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
