import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import ModalProvider from '@/components/ModalProvider';
import { ToastProvider } from '@/components/ToasterProvider';
import { CrispProvider } from '@/components/crispProvider';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'AI Generator',
  description: 'AI Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <CrispProvider />
        <body className={inter.className}>
          <ModalProvider />
          <ToastProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

// time 4:28:47
