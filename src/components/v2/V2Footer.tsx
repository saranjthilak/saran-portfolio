"use client";

const V2Footer = () => {
  return (
    <footer
      className="font-kanit border-t"
      style={{
        background: "#0d1116",
        borderColor: "rgba(255, 255, 255, 0.1)",
        padding: "2rem 1.25rem",
      }}
    >
      <div className="mx-auto max-w-6xl flex flex-col gap-4 text-xs uppercase tracking-[0.08em] sm:flex-row sm:items-center sm:justify-between">
        {/* Name / Logo */}
        <span className="flex items-center gap-2 font-medium text-[#ffffff]/80">
          <span className="text-[#ffffff]" aria-hidden>✦</span>
          Saran Jaya Thilak
        </span>

        {/* Nav links */}
        <div className="flex flex-wrap gap-6 text-[#ffffff]/40">
          <a
            href="https://github.com/saranjthilak"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#ffffff] transition-colors duration-200"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/saranjayathilak"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#ffffff] transition-colors duration-200"
          >
            LinkedIn
          </a>
          <a
            href="mailto:saranjthilak@gmail.com"
            className="hover:text-[#ffffff] transition-colors duration-200"
          >
            Email
          </a>
        </div>

        {/* Copyright */}
        <span className="text-[#ffffff]/30">
          © {new Date().getFullYear()} — Berlin, Germany
        </span>
      </div>
    </footer>
  );
};

export default V2Footer;
