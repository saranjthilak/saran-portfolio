import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative py-10 px-8">
      {/* Gradient top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, hsl(24 95% 53% / 0.5) 20%, hsl(190 85% 53% / 0.4) 50%, hsl(280 80% 65% / 0.5) 80%, transparent 100%)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Left: Copyright + tagline */}
          <div className="flex flex-col items-center sm:items-start gap-1">
            <p className="text-foreground/60 text-sm">
              © {new Date().getFullYear()} Saran Jaya Thilak. Built with passion for data and innovation.
            </p>
            <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground/40">
              V.03—26 · BERLIN_NODE_04 · REACT + VITE
            </span>
          </div>

          {/* Right: Social links + Back to top */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/saranjayathilak"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-8 h-8 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://github.com/saranjthilak"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-8 h-8 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
            </a>
            <a
              href="mailto:saranjthilak@gmail.com"
              aria-label="Email"
              className="w-8 h-8 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
            </a>

            {/* Divider */}
            <div className="w-px h-6 bg-border mx-1" />

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="w-8 h-8 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-colors group"
            >
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
