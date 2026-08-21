"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

export default function NexumHero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @import url('https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Silkscreen:wght@400;700&display=swap');
          
          .font-geist {
            font-family: 'Geist', -apple-system, BlinkMacSystemFont, sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          
          .font-silkscreen {
            font-family: 'Silkscreen', cursive;
          }

          .cta-gradient {
            background: linear-gradient(to bottom, #2B2B2B, #101010);
          }
        `
      }} />

      <section className="relative h-screen w-full overflow-hidden font-geist">
        {/* Background Video */}
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260803_192301_9231ed6b-c55c-4a48-909c-4ebe11cf2e11.mp4"
        />

        {/* Content Wrapper */}
        <div className="relative z-10 flex h-full flex-col">
          {/* Top Bar Navigation */}
          <nav className="flex items-center justify-between px-5 py-5 sm:px-8 sm:py-6 lg:px-12">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <svg
                viewBox="0 0 256 256"
                className="h-6 w-6 fill-[#010101] transition-colors duration-300 lg:fill-white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M 128 128 C 128 198.692 70.692 256 0 256 C 0 185.308 57.308 128 128 128 Z M 128 128 C 198.692 128 256 185.308 256 256 C 185.308 256 128 198.692 128 128 Z M 0 0 C 70.692 0 128 57.308 128 128 C 57.308 128 0 70.692 0 0 Z M 256 0 C 256 70.692 198.692 128 128 128 C 128 57.308 185.308 0 256 0 Z" />
              </svg>
              <span className="text-lg font-semibold text-[#010101] transition-colors duration-300 lg:text-white">
                nexum
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-1 rounded-full bg-white/10 px-1.5 py-1.5 backdrop-blur-lg">
                <a href="#" className="rounded-full px-4 py-1.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white">Modules</a>
                <a href="#" className="rounded-full px-4 py-1.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white">Clientele</a>
                <a href="#" className="flex items-center gap-1 rounded-full px-4 py-1.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white">
                  Solutions <ChevronDown className="h-3.5 w-3.5" />
                </a>
                <a href="#" className="rounded-full px-4 py-1.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white">Billing</a>
              </div>
              <button className="cta-gradient self-stretch rounded-full px-5 text-sm font-medium text-white transition-opacity hover:opacity-90">
                Get started
              </button>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-lg md:hidden"
              aria-label="Toggle menu"
            >
              <Menu
                className={`absolute h-5 w-5 text-[#010101] transition-all duration-300 lg:text-white ${
                  isMenuOpen ? "rotate-90 scale-0 opacity-0" : "scale-100 opacity-100"
                }`}
              />
              <X
                className={`absolute h-5 w-5 text-[#010101] transition-all duration-300 lg:text-white ${
                  isMenuOpen ? "scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
                }`}
              />
            </button>
          </nav>

          {/* Mobile Overlay & Drawer */}
          <div
            className={`fixed inset-0 z-40 transition-opacity duration-300 md:hidden ${
              isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Drawer */}
            <div
              className={`absolute right-0 top-0 flex h-full w-72 flex-col bg-black/90 backdrop-blur-xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isMenuOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div className="flex flex-col gap-2 px-6 pt-24">
                {[
                  { name: "Modules", hasDropdown: false },
                  { name: "Clientele", hasDropdown: false },
                  { name: "Solutions", hasDropdown: true },
                  { name: "Billing", hasDropdown: false },
                ].map((link, i) => (
                  <a
                    key={link.name}
                    href="#"
                    className="flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                    style={{
                      opacity: isMenuOpen ? 1 : 0,
                      transform: isMenuOpen ? "translateX(0)" : "translateX(24px)",
                      transition: `opacity 300ms ease ${(i + 1) * 60}ms, transform 300ms ease ${(i + 1) * 60}ms`,
                    }}
                  >
                    {link.name}
                    {link.hasDropdown && <ChevronDown className="h-4 w-4" />}
                  </a>
                ))}
              </div>

              <div
                className="mt-auto px-6 pb-10"
                style={{
                  opacity: isMenuOpen ? 1 : 0,
                  transform: isMenuOpen ? "translateY(0)" : "translateY(16px)",
                  transition: "opacity 400ms ease 300ms, transform 400ms ease 300ms",
                }}
              >
                <button className="cta-gradient w-full rounded-full py-3.5 text-base font-medium text-white transition-opacity hover:opacity-90">
                  Get started
                </button>
              </div>
            </div>
          </div>

          {/* Main Content (Bottom Anchored) */}
          <main className="mt-auto flex flex-col gap-6 px-5 pb-8 sm:gap-8 sm:px-8 sm:pb-12 lg:flex-row lg:items-end lg:justify-between lg:px-12 lg:pb-16">
            
            {/* Left: Headline & CTA */}
            <div className="flex max-w-xl flex-col">
              <h1 className="text-3xl font-semibold leading-[1.1] tracking-tight text-[#010101] transition-colors duration-300 sm:text-4xl lg:text-[3.5rem] lg:text-white">
                Ship AI workers that grind while you rest
              </h1>
              
              <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:inline-flex sm:flex-row sm:items-center sm:rounded-full sm:bg-white sm:p-1.5 sm:w-max">
                <input
                  type="email"
                  placeholder="Type your email"
                  className="w-full rounded-full bg-white px-5 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none sm:w-64 sm:rounded-none sm:bg-transparent sm:px-4 sm:py-2"
                />
                <button className="cta-gradient w-full rounded-full px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 sm:w-auto sm:py-2.5">
                  Get started
                </button>
              </div>
            </div>

            {/* Right: Glass Cards */}
            <div className="flex flex-col gap-4 sm:flex-row lg:w-auto lg:gap-5">
              
              {/* Stats Card */}
              <div className="flex flex-col justify-between rounded-2xl bg-white/10 p-5 backdrop-blur-lg sm:w-64 sm:p-6">
                <div className="font-silkscreen text-3xl font-normal tracking-tight text-[#010101] transition-colors duration-300 sm:text-4xl lg:text-white">
                  42,500+
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[#010101]/70 transition-colors duration-300 sm:mt-4 lg:text-white/70">
                  Teams run Nexum to handle recurring ops daily.
                </p>
              </div>

              {/* Testimonial Card */}
              <div className="flex flex-col justify-between rounded-2xl bg-white/10 p-5 backdrop-blur-lg sm:w-64 sm:p-6">
                <div className="mb-3 flex items-center gap-2 sm:mb-4">
                  <div className="flex h-6 w-6 items-center justify-center rounded bg-black text-xs font-bold text-white">
                    S
                  </div>
                  <span className="text-sm font-semibold text-[#010101] transition-colors duration-300 lg:text-white">
                    Stratify
                  </span>
                </div>
                
                <p className="text-sm leading-relaxed text-[#010101]/80 transition-colors duration-300 lg:text-white/80">
                  "With Nexum we went from managing tedious operational work to having AI agents that handle everything."
                </p>

                <div className="mt-4 flex items-center gap-3 sm:mt-5">
                  <img
                    src="https://i.pravatar.cc/72?img=12"
                    alt="Sara Klein"
                    className="h-9 w-9 rounded-full bg-white/20 object-cover"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-[#010101] transition-colors duration-300 lg:text-white">
                      Sara Klein
                    </span>
                    <span className="text-xs text-[#010101]/60 transition-colors duration-300 lg:text-white/60">
                      Dir of Operations
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </main>
        </div>
      </section>
    </>
  );
}
