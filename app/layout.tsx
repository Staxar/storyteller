import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import NavbarComponent from '@/components/NavbarComponent'

export const metadata: Metadata = {
  title: 'StoryTeller',
  description: 'Make your child happy',
}

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen font-sans antialiased bg-background-adventure bg-no-repeat bg-cover bg-center',
          fontSans.variable
        )}
        suppressHydrationWarning
      >
        <main className="h-full w-full">
          <NavbarComponent />
          {children}
        </main>
      </body>
    </html>
  )
}
