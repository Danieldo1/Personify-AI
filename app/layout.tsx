import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/components/ThemeProvider'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/toaster'
import ProModal from '@/components/ProModal'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Personify AI',
  description: 'Personify Your Chats, Unleash AI Companions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn('bg-secondary', inter.className)}>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
            <ProModal />
          {children}
          <Toaster />
          </ThemeProvider>
          </body>
      </html>
    </ClerkProvider>
  )
}
