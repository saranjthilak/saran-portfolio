"use client";

import HeroSection from "@/components/v2/HeroSection";
import MarqueeSection from "@/components/v2/MarqueeSection";
import AboutSection from "@/components/v2/AboutSection";
import ExperienceSection from "@/components/v2/ExperienceSection";

import ServicesSection from "@/components/v2/ServicesSection";
import ProjectsSection from "@/components/v2/ProjectsSection";
import ResearchSection from "@/components/v2/ResearchSection";
import CertificationsSection from "@/components/v2/CertificationsSection";
import GithubSection from "@/components/v2/GithubSection";
import ContactSection from "@/components/v2/ContactSection";
import V2Footer from "@/components/v2/V2Footer";

const Index = () => {
  return (
    <div className="v2-page" style={{ overflowX: "clip" }}>
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ExperienceSection />

      <ServicesSection />
      <ProjectsSection />
      <GithubSection />
      <CertificationsSection />
      <ResearchSection />
      <ContactSection />
      <V2Footer />
    </div>
  );
};

export default Index;
