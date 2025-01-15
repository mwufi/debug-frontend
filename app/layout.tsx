'use client'

import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"
import { ThemeToggle } from "@/components/theme-toggle"

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
            <header className="border-b">
              <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <h1 className="text-lg font-semibold">Debugger</h1>
                <ThemeToggle />
              </div>
            </header>
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
