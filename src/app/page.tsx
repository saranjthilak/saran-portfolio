"use client";

import HeroSection from "@/components/v2/HeroSection";
import MarqueeSection from "@/components/v2/MarqueeSection";
import AboutSection from "@/components/v2/AboutSection";
import ServicesSection from "@/components/v2/ServicesSection";
import ProjectsSection from "@/components/v2/ProjectsSection";
import ContactSection from "@/components/v2/ContactSection";
import V2Footer from "@/components/v2/V2Footer";

const Index = () => {
  return (
    <div className="v2-page" style={{ overflowX: "clip" }}>
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <ContactSection />
      <V2Footer />
    </div>
  );
};

export default Index;
