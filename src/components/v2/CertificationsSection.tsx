"use client";

import React from "react";
import { certifications } from "@/data/portfolio";

export default function CertificationsSection() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{
        __html: `
          .font-manrope {
            font-family: 'Manrope', system-ui, -apple-system, sans-serif;
          }
        `
      }} />

      <section id="certifications" className="relative w-full min-h-screen overflow-hidden bg-[#050505] font-manrope z-40">
        <div className="absolute inset-0 overflow-hidden pointer-events-none bg-[#050505]">
          <video
            className="absolute left-1/2 top-0 w-full min-w-[1492px] h-full object-cover -translate-x-1/2"
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260808_112712_da9d53df-6d27-4b12-bdf6-aa9dc2622bdf.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          {/* Side letterbox overlay */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to right, #050505 calc(50% - 746px), transparent calc(50% - 676px), transparent calc(50% + 676px), #050505 calc(50% + 746px))'
            }}
          />
          {/* Bottom cinematic fade overlay */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(5,5,5,0) 50%, rgba(5,5,5,.23) 60%, rgba(5,5,5,.45) 70%, rgba(5,5,5,.75) 80%, rgba(5,5,5,.96) 95%, #050505 100%)'
            }}
          />
        </div>
        
        {/* Content Wrapper */}
        <div className="relative z-10 flex flex-col pt-[20vh] pl-[6vw] md:pl-[8vw] pr-6 md:pr-12 max-w-4xl w-full">
          
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
