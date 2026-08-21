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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {certifications.map((cert, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col rounded-[24px] bg-[rgba(17,16,15,0.35)] backdrop-blur-[20px] p-6 border border-white/[0.05] transition-colors hover:bg-[rgba(25,24,23,0.45)]"
                    >

                      <div className="flex flex-col flex-1 justify-end">
                        <span className="text-xs font-bold text-white/50 uppercase tracking-wider mb-2">
                          {cert.issuer} • {cert.level}
                        </span>
                        <h4 className="text-lg font-[450] text-white leading-tight">
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
