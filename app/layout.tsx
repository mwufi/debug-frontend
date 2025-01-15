'use client'

import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-background text-foreground">
            {children}
          </div>
          <Toaster richColors position="top-center" />
        </Providers>
      </body>
    </html>
  )
}
