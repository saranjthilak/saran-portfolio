import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, JetBrains_Mono, Kanit, Bebas_Neue } from 'next/font/google';
import './globals.css';

import { Toaster as Sonner } from "@/components/ui/sonner";
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

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  variable: '--font-bebas-neue',
  weight: '400',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://saran-portfolio.lovable.app'),
  title: {
    default: 'Saran Jaya Thilak — Data Engineer & GenAI Specialist',
    template: '%s | Saran Jaya Thilak',
  },
  description: 'Portfolio of Saran Jaya Thilak, Data Engineer & GenAI Specialist specializing in RAG systems, scalable data pipelines, and cloud architecture.',
  authors: [{ name: 'Saran Jaya Thilak' }],
  creator: 'Saran Jaya Thilak',
  alternates: { canonical: '/' },
  icons: {
    icon: [{ url: '/favicon.png', type: 'image/png', sizes: '64x64' }],
    shortcut: [{ url: '/favicon.png', type: 'image/png' }],
    apple: [{ url: '/apple-touch-icon.png', type: 'image/png', sizes: '180x180' }],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://saran-portfolio.lovable.app/',
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

export const viewport: Viewport = {
  themeColor: '#0a0a0f',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${kanit.variable} ${bebasNeue.variable} font-sans antialiased`}>
        <CustomCursor />
        <PageTransition>
          {children}
        </PageTransition>
        <Sonner />
      </body>
    </html>
  );
}
