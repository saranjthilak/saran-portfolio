
import { useState, useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/custom-cursor";
import NeuralNetBackdrop from "@/components/ui/neural-net-backdrop";
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
import MicroHud from "@/components/ui/micro-hud";
import { motion } from "framer-motion";

const Index = () => {
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
      <CustomCursor />
      {/* Futuristic background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <NeuralNetBackdrop />
      </div>
      <div className="fixed inset-0 bg-gradient-mesh pointer-events-none"></div>
      <div className="fixed inset-0 cyber-grid opacity-40 pointer-events-none"></div>
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-primary/10 rounded-full blur-[160px] pointer-events-none"></div>
      <div className="fixed bottom-0 right-1/4 w-[700px] h-[700px] bg-accent/10 rounded-full blur-[160px] animate-neural-pulse pointer-events-none" style={{ animationDelay: '1.5s' }}></div>

      <Sidebar activeSection={activeSection} scrollToSection={scrollToSection} />
      <MicroHud />

      <div className="ml-72 min-h-screen relative z-0">
        <HeroSection scrollToSection={scrollToSection} handleDownloadResume={handleDownloadResume} />
        <SectionDivider variant="cyan" />
        <AboutSection />
        <SectionDivider variant="mixed" />
        <ExperienceSection />
        <SectionDivider variant="fuchsia" />
        <SkillsSection />
        <SectionDivider variant="cyan" flip />
        <ProjectsSection />
        <SectionDivider variant="mixed" />
        <PublicationsSection />
        <SectionDivider variant="fuchsia" flip />
        <EducationSection />
        <SectionDivider variant="cyan" />
        <CertificationsSection />
        <SectionDivider variant="mixed" flip />
        <ContactSection />
        <Footer />
      </div>
    </motion.div>
  );
};

export default Index;
