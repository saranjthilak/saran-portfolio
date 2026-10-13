import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="v2-page relative flex min-h-screen items-center justify-center overflow-hidden bg-v2-base px-6 text-foreground">
      <div className="pointer-events-none absolute inset-0 blueprint-dots opacity-20" aria-hidden="true" />
      <div className="relative w-full max-w-3xl border-y border-border/70 py-12 text-center sm:py-16">
        <p className="eyebrow justify-center">ROUTE NOT FOUND <span className="text-muted-foreground">/ 404</span></p>
        <h1 className="mt-6 font-display text-7xl font-black leading-none text-foreground sm:text-9xl">404</h1>
        <p className="mt-5 text-lg text-muted-foreground">This page isn’t part of the map.</p>
        <Link href="/" className="mt-9 inline-flex min-h-12 items-center gap-3 border border-accent/50 bg-accent/10 px-5 py-3 font-mono text-xs font-semibold tracking-widest text-accent transition-colors hover:bg-accent/20">
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          BACK TO HOME
        </Link>
      </div>
    </main>
  );
}
