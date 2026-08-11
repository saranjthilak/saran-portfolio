import type { Metadata } from 'next';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import PageTransition from "@/components/ui/page-transition";
import CustomCursor from "@/components/ui/CustomCursor";

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://saranjthilak.com'),
  title: {
    default: 'Saran Jaya Thilak — Data Engineer & Generative AI Specialist',
    template: '%s | Saran Jaya Thilak',
  },
  description: 'Portfolio of Saran Jaya Thilak, an AI & Data Engineer specializing in RAG systems, scalable data pipelines, and cloud architecture.',
  keywords: ['AI Engineer', 'Data Engineer', 'Machine Learning', 'RAG', 'AWS', 'Python', 'React', 'Next.js', 'Portfolio'],
  authors: [{ name: 'Saran Jaya Thilak' }],
  creator: 'Saran Jaya Thilak',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://saranjthilak.com',
    title: 'Saran Jaya Thilak — Data Engineer & Generative AI Specialist',
    description: 'Portfolio of Saran Jaya Thilak, an AI & Data Engineer specializing in RAG systems, scalable data pipelines, and cloud architecture.',
    siteName: 'Saran Jaya Thilak Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Saran Jaya Thilak - AI & Data Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saran Jaya Thilak — Data Engineer & Generative AI Specialist',
    description: 'Portfolio of Saran Jaya Thilak, an AI & Data Engineer specializing in RAG systems, scalable data pipelines, and cloud architecture.',
    images: ['/og-image.png'],
    creator: '@saranjthilak',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <TooltipProvider>
              <CustomCursor />
              <PageTransition>
                {children}
              </PageTransition>
              <Toaster />
              <Sonner />
        </TooltipProvider>
      </body>
    </html>
  );
}
