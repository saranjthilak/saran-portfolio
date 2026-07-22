import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { UiSoundProvider } from "@/hooks/use-ui-sound";
import { AmbientMusicProvider } from "@/hooks/use-ambient-music";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://saranjthilak.com'),
  title: {
    default: 'Saran Jaya Thilak | AI & Data Engineer',
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
    title: 'Saran Jaya Thilak | AI & Data Engineer',
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
    title: 'Saran Jaya Thilak | AI & Data Engineer',
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
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased`}>
        <TooltipProvider>
          <UiSoundProvider>
            <AmbientMusicProvider>
              {children}
              <Toaster />
              <Sonner />
            </AmbientMusicProvider>
          </UiSoundProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
