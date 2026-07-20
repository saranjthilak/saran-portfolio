import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/10 mt-24">
      <div className="py-12 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="text-xl font-display font-bold">Saran Jaya Thilak</div>
            <p className="text-muted-foreground text-sm font-light">
              © {new Date().getFullYear()} — All rights reserved.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/saranjayathilak"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-foreground hover:bg-white/10 transition-colors hover:-translate-y-1"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/saranjthilak"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-foreground hover:bg-white/10 transition-colors hover:-translate-y-1"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="mailto:saranjthilak@gmail.com"
              aria-label="Email"
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-foreground hover:bg-white/10 transition-colors hover:-translate-y-1"
            >
              <Mail className="w-4 h-4" />
            </a>
            
            <div className="w-px h-6 bg-white/10 mx-2" />
            
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-foreground hover:bg-white/10 transition-colors hover:-translate-y-1 group"
            >
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
