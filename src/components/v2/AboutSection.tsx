"use client";

import React from "react";
import FadeIn from "./FadeIn";


const ABOUT_TEXT =
  "With an M.Sc. in Data Science and hands-on experience across cloud, networking, and AI engineering at companies like Tesla, Nokia, and Huawei, i focus on data pipelines, retrieval-augmented generation, and MLOps. i truly enjoy turning messy data and ambitious ideas into production-grade systems. Let's build something incredible together!";




const AboutSection = () => {
  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500&display=swap" rel="stylesheet" />
      
      <section
        id="about"
        className="font-kanit rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-[15] overflow-hidden"
        style={{
          padding: "clamp(5rem, 9vw, 9rem) 1.25rem",
          boxShadow: "0 -10px 40px rgba(0,0,0,0.5)",
          minHeight: "100vh"
        }}
      >
        {/* Lumen Background Elements */}
        <div className="absolute inset-0 z-0 bg-black">
          <video
            className="absolute inset-0 w-full h-full object-cover anim-fade-in"
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260813_115057_94c3699b-0fd1-4124-bcf3-3626bb8c1f77.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
          {/* Subtle overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black/40" />

        </div>

        {/* Existing Content */}
        <div className="relative z-10 w-full">
          <div className="max-w-2xl">
            <FadeIn delay={0} y={20}>
              <h2
                className="font-black italic leading-[1.02] tracking-tight text-[#D7E2EA] mb-6 sm:mb-8"
                style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
              >
                About Me
              </h2>
            </FadeIn>
            <FadeIn delay={0.1} y={20}>
              <p
                className="text-[#D7E2EA]/90 font-light leading-relaxed bg-black/20 p-4 sm:p-6 rounded-xl backdrop-blur-sm"
                style={{ fontSize: "clamp(1rem, 1.8vw, 1.2rem)" }}
              >
                {ABOUT_TEXT}
              </p>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutSection;
