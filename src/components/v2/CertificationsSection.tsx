"use client";

import React from "react";
import { certifications } from "@/data/portfolio";

export default function CertificationsSection() {
  return (
    <>
      <link href="https://db.onlinewebfonts.com/c/13ab13418f633c1b0516fed6e30bedbc?family=Suisse+Int%27l" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{
        __html: `
          .font-suisse {
            font-family: 'Suisse Intl', -apple-system, BlinkMacSystemFont, sans-serif;
          }
        `
      }} />

      <section id="certifications" className="relative w-full min-h-screen overflow-hidden bg-[#080A19] font-suisse z-40">
        {/* Background Video (Fixed behind content) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <video
            className="absolute inset-0 w-full h-full object-cover opacity-80"
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260813_092641_de52eb87-daf2-41db-92cb-7a56eae012a5.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          {/* Subtle gradient overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />
        </div>
        
        {/* Content Wrapper */}
        <div className="relative z-10 flex h-full flex-col p-6 md:p-12 max-w-7xl mx-auto w-full pb-20 pt-20">
          
          {/* Section Header */}
          <div className="mb-16">
            <p className="flex items-center gap-2 font-medium uppercase tracking-[0.25em] text-white/50 text-xs mb-3 animate-fade-down" style={{ animationDelay: '0ms' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-white/50 inline-block" />
              Credentials
            </p>
            <h2 className="font-normal leading-[1.02] tracking-tight text-white text-[36px] sm:text-[52px] md:text-[64px] animate-fade-up" style={{ animationDelay: '100ms' }}>
              Certifications.
            </h2>
          </div>

          <div className="flex flex-col gap-12">
            
            {/* Certifications */}
            {certifications.length > 0 && (
              <div className="animate-fade-up opacity-0" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
                <h3 className="text-xl font-[450] text-white/90 mb-5 border-b border-white/10 pb-3">Professional Certifications</h3>
                <div className="flex flex-col border-t border-white/10 mt-2">
                  {certifications.map((cert, idx) => (
                    <div
                      key={idx}
                      className="group grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 md:gap-8 py-6 md:py-8 border-b border-white/10 items-center hover:bg-white/[0.03] transition-colors px-4 -mx-4 rounded-xl"
                    >
                      <div>
                        <span className="text-sm font-semibold text-white/70 uppercase tracking-widest block mb-1">
                          {cert.issuer}
                        </span>
                        <span className="text-xs text-white/40 uppercase tracking-wider">
                          {cert.level}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-xl md:text-2xl font-[450] text-white leading-tight group-hover:text-amber-200 transition-colors">
                          {cert.title}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}


          </div>
          
        </div>
      </section>
    </>
  );
}
