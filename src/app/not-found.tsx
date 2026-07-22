import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="text-center">
        <h1 className="text-6xl font-bold font-display mb-4 text-primary">404</h1>
        <p className="text-xl text-muted-foreground mb-8">Oops! Page not found.</p>
        <Link href="/" className="inline-flex items-center justify-center px-6 py-3 glass-panel rounded-full font-medium hover:bg-white/10 transition-colors">
          Return to Home
        </Link>
      </div>
    </div>
  );
}
