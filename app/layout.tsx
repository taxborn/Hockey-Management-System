import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import Navbar from './_components/Navbar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <title>Goal Guardian</title>
          {/* TODO: Generate an actual description */}
          <meta name="description" content="Goal Guardian is a hockey team management system" />
        </head>
        <body>
          <Navbar />

          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
