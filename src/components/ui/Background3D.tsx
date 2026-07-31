"use client";

import { useEffect, useRef } from "react";

/**
 * Animated gradient mesh background inspired by Apple / Stripe / Linear.
 *
 * Renders several large soft-edged colour orbs that drift around the viewport
 * on independent CSS animations, producing a continuously shifting gradient
 * mesh effect.  Pure CSS — no canvas, no Three.js.
 */
export default function Background3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  /* Subtle scroll-parallax: shift the mesh slightly opposite to scroll */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        el.style.transform = `translateY(${y * 0.08}px)`;
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      {/* Gradient orbs container — parallaxes on scroll */}
      <div ref={containerRef} className="absolute inset-0 will-change-transform">
        {/* ─── Primary blue orb ─── */}
        <div
          className="absolute rounded-full mix-blend-screen"
          style={{
            width: "55vmax",
            height: "55vmax",
            top: "-15%",
            left: "-10%",
            background:
              "radial-gradient(circle at center, hsla(217,91%,60%,0.35) 0%, hsla(217,91%,60%,0) 70%)",
            animation: "mesh-drift-1 22s ease-in-out infinite alternate",
          }}
        />

        {/* ─── Accent violet orb ─── */}
        <div
          className="absolute rounded-full mix-blend-screen"
          style={{
            width: "50vmax",
            height: "50vmax",
            top: "10%",
            right: "-15%",
            background:
              "radial-gradient(circle at center, hsla(258,90%,66%,0.3) 0%, hsla(258,90%,66%,0) 70%)",
            animation: "mesh-drift-2 26s ease-in-out infinite alternate",
          }}
        />

        {/* ─── Teal / cyan orb ─── */}
        <div
          className="absolute rounded-full mix-blend-screen"
          style={{
            width: "45vmax",
            height: "45vmax",
            bottom: "-10%",
            left: "15%",
            background:
              "radial-gradient(circle at center, hsla(187,72%,50%,0.22) 0%, hsla(187,72%,50%,0) 70%)",
            animation: "mesh-drift-3 20s ease-in-out infinite alternate",
          }}
        />

        {/* ─── Rose / pink orb ─── */}
        <div
          className="absolute rounded-full mix-blend-screen"
          style={{
            width: "40vmax",
            height: "40vmax",
            bottom: "5%",
            right: "5%",
            background:
              "radial-gradient(circle at center, hsla(330,80%,55%,0.18) 0%, hsla(330,80%,55%,0) 70%)",
            animation: "mesh-drift-4 24s ease-in-out infinite alternate",
          }}
        />

        {/* ─── Warm amber orb (subtle) ─── */}
        <div
          className="absolute rounded-full mix-blend-screen"
          style={{
            width: "35vmax",
            height: "35vmax",
            top: "40%",
            left: "35%",
            background:
              "radial-gradient(circle at center, hsla(38,92%,55%,0.1) 0%, hsla(38,92%,55%,0) 70%)",
            animation: "mesh-drift-5 28s ease-in-out infinite alternate",
          }}
        />
      </div>

      {/* Noise texture overlay for organic feel */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* Dark vignette for depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, hsl(223 49% 8% / 0.6) 100%)",
        }}
      />
    </div>
  );
}
