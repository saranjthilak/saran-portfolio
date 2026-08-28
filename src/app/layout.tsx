import type { Metadata } from 'next';
import { Space_Grotesk, JetBrains_Mono, Kanit } from 'next/font/google';
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

const kanit = Kanit({
  subsets: ['latin'],
  variable: '--font-kanit',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://saran.cloud'),
  title: {
    default: 'Saran Jaya Thilak — Data Engineer & GenAI Specialist',
    template: '%s | Saran Jaya Thilak',
  },
  description: 'Portfolio of Saran Jaya Thilak, Data Engineer & GenAI Specialist specializing in RAG systems, scalable data pipelines, and cloud architecture.',
  keywords: ['Data Engineer', 'GenAI Specialist', 'AI Engineer', 'Machine Learning', 'RAG', 'AWS', 'Python', 'React', 'Next.js', 'Portfolio'],
  authors: [{ name: 'Saran Jaya Thilak' }],
  creator: 'Saran Jaya Thilak',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://saran.cloud',
    title: 'Saran Jaya Thilak — Data Engineer & GenAI Specialist',
    description: 'Portfolio of Saran Jaya Thilak, Data Engineer & GenAI Specialist specializing in RAG systems, scalable data pipelines, and cloud architecture.',
    siteName: 'Saran Jaya Thilak Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Saran Jaya Thilak - Data Engineer & GenAI Specialist',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saran Jaya Thilak — Data Engineer & GenAI Specialist',
    description: 'Portfolio of Saran Jaya Thilak, Data Engineer & GenAI Specialist specializing in RAG systems, scalable data pipelines, and cloud architecture.',
    images: ['/og-image.jpg'],
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
      <body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${kanit.variable} font-sans antialiased`}>
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
