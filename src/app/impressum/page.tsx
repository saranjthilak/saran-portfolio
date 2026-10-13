import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum page for Saran Jaya Thilak. This page must be completed before publication.",
  alternates: { canonical: "/impressum" },
};

export default function ImpressumPage() {
  return (
    <main className="v2-page min-h-screen bg-v2-base px-5 py-16 text-foreground sm:px-8 sm:py-24">
      <article className="mx-auto max-w-3xl">
        <Link href="/" className="inline-flex min-h-11 items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-accent">
          <ArrowLeft aria-hidden="true" className="h-4 w-4" /> Home
        </Link>
        <p className="mt-12 border-l-2 border-accent px-4 py-3 font-mono text-xs leading-6 text-accent">
          Diese Seite muss vor Veröffentlichung vervollständigt werden.
        </p>
        <h1 className="mt-8 text-5xl font-black text-foreground sm:text-7xl">Impressum</h1>
        <section className="mt-12 border-t border-border/70 py-8">
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Angaben gemäß § 5 DDG</h2>
          <p className="mt-4 text-base leading-7 text-foreground">TODO: legal name, address, email per § 5 DDG</p>
        </section>
      </article>
    </main>
  );
}