
import { useState, useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/custom-cursor";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import PublicationsSection from "@/components/sections/PublicationsSection";
import EducationSection from "@/components/sections/EducationSection";
import CertificationsSection from "@/components/sections/CertificationsSection";
import ContactSection from "@/components/sections/ContactSection";
import SectionDivider from "@/components/ui/section-divider";
import SectionReveal from "@/components/ui/SectionReveal";
import MicroHud from "@/components/ui/micro-hud";
import ParticleField from "@/components/ui/ParticleField";
import ScrollProgress from "@/components/ui/ScrollProgress";
import { useLenis } from "@/hooks/useLenis";
import { motion } from "framer-motion";

const Index = () => {
  useLenis(); // Smooth scroll — respects prefers-reduced-motion
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolling, setIsScrolling] = useState(false);


  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrolling) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, [isScrolling]);

  const scrollToSection = (id: string) => {
    setIsScrolling(true);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(id);
    setTimeout(() => setIsScrolling(false), 1000);
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/Saran-Jaya-Thilak-Resume.pdf';
    link.download = 'Saran-Jaya-Thilak-Resume.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen bg-background relative overflow-hidden"
    >
      <ScrollProgress />
      <CustomCursor />
      {/* Animated particle field backdrop */}
      <ParticleField />

      <Sidebar activeSection={activeSection} scrollToSection={scrollToSection} />
      <MicroHud />

      <div className="ml-20 min-h-screen relative z-0">
        <HeroSection scrollToSection={scrollToSection} handleDownloadResume={handleDownloadResume} />

        <SectionDivider variant="cyan" />
        <SectionReveal accent="rgba(34,211,238,0.25)">
          <AboutSection />
        </SectionReveal>

        <SectionDivider variant="mixed" />
        <SectionReveal accent="rgba(129,140,248,0.25)">
          <ExperienceSection />
        </SectionReveal>

        <SectionDivider variant="fuchsia" />
        <SectionReveal accent="rgba(232,121,249,0.2)">
          <SkillsSection />
        </SectionReveal>

        <SectionDivider variant="cyan" flip />
        <SectionReveal accent="rgba(34,211,238,0.25)">
          <ProjectsSection />
        </SectionReveal>

        <SectionDivider variant="mixed" />
        <SectionReveal accent="rgba(129,140,248,0.2)">
          <PublicationsSection />
        </SectionReveal>

        <SectionDivider variant="fuchsia" flip />
        <SectionReveal accent="rgba(232,121,249,0.2)">
          <EducationSection />
        </SectionReveal>

        <SectionDivider variant="cyan" />
        <SectionReveal accent="rgba(34,211,238,0.2)">
          <CertificationsSection />
        </SectionReveal>

        <SectionDivider variant="mixed" flip />
        <SectionReveal accent="rgba(129,140,248,0.2)">
          <ContactSection />
        </SectionReveal>

        <Footer />
      </div>
    </motion.div>
  );
};

export default Index;
