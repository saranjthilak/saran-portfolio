"use client";

import React, { useRef } from "react";
import { useInView } from "framer-motion";
import { certifications } from "@/data/portfolio";
import BlueprintSectionHeader from "./BlueprintSectionHeader";

export default function CertificationsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="blueprint-section font-kanit rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-40 overflow-hidden border-t border-accent/20"
      style={{
        padding: "clamp(5rem, 9vw, 9rem) 1.25rem",
        boxShadow: "0 -10px 40px rgba(0,0,0,0.5)",
      }}
    >
      <div className="blueprint-dots absolute inset-0 z-0 opacity-40" />

      <div className="relative z-10 mx-auto max-w-6xl w-full">
        <BlueprintSectionHeader index="SECTION_05" label="Credentials">
          <div className="mb-12 sm:mb-16">
            <h2
              className="font-black uppercase leading-[1.02] tracking-tight text-foreground"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
            >
              Certifications.
            </h2>
          </div>

          {certifications.length > 0 && (
            <div
              className={`${isInView ? "animate-fade-up" : "opacity-0"}`}
            >
              <div className="flex flex-col border-t border-border/60">
                {certifications.map((cert, idx) => (
                  <div
                    key={idx}
                    className="blueprint-cell group grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 md:gap-8 py-6 md:py-8 border-b border-border/60 items-center px-4 -mx-4 rounded-xl transition-colors duration-300 hover:bg-accent/[0.03]"
                  >
                    <div>
                      <span className="text-sm font-semibold text-foreground/70 uppercase tracking-widest block mb-1">
                        {cert.issuer}
                      </span>
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">
                        {cert.level}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-xl md:text-2xl font-medium text-foreground leading-tight group-hover:text-accent transition-colors duration-300">
                        {cert.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </BlueprintSectionHeader>
      </div>
    </section>
  );
}
