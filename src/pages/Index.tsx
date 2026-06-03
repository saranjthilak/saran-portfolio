
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
    const resumeUrl = "https://github.com/saranjthilak/saran-portfolio/raw/main/SaranJayaThilakResume%20(36).pdf";
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'SaranJayaThilak_Resume.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#05060f] via-[#0a0a23] to-[#05060f] relative overflow-hidden bg-[size:200%_200%] animate-gradient-pan">
      <CustomCursor />
      {/* Futuristic background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <NeuralNetBackdrop />
      </div>
      <div className="absolute inset-0 cyber-grid opacity-60 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.25),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.25),transparent_50%)]"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-neural-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl animate-neural-pulse" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-indigo-500/10 rounded-full animate-orbit"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] border border-purple-500/10 rounded-full animate-orbit" style={{ animationDirection: 'reverse', animationDuration: '30s' }}></div>

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
    </div>
  );
};

export default Index;
