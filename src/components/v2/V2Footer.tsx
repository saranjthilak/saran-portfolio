"use client";

const V2Footer = () => {
  return (
    <footer
      className="font-kanit border-t"
      style={{
        background: "#0C0C0C",
        borderColor: "#2a2a2a",
        padding: "2rem 1.25rem",
      }}
    >
      <div className="mx-auto max-w-6xl flex flex-col gap-4 text-xs uppercase tracking-[0.08em] sm:flex-row sm:items-center sm:justify-between">
        {/* Name / Logo */}
        <span className="flex items-center gap-2 font-medium text-[#D7E2EA]/80">
          <span className="text-[#D7E2EA]" aria-hidden>✦</span>
          Saran Jaya Thilak
        </span>

        {/* Nav links */}
        <div className="flex flex-wrap gap-6 text-[#D7E2EA]/40">
          <a
            href="https://github.com/saranjthilak"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#D7E2EA] transition-colors duration-200"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/saranjayathilak"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#D7E2EA] transition-colors duration-200"
          >
            LinkedIn
          </a>
          <a
            href="mailto:saranjaya.thilak@gmail.com"
            className="hover:text-[#D7E2EA] transition-colors duration-200"
          >
            Email
          </a>
        </div>

        {/* Copyright */}
        <span className="text-[#D7E2EA]/30">
          © {new Date().getFullYear()} — Berlin, Germany
        </span>
      </div>
    </footer>
  );
};

export default V2Footer;
