
import { useState, useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import PublicationsSection from "@/components/sections/PublicationsSection";
import EducationSection from "@/components/sections/EducationSection";
import CertificationsSection from "@/components/sections/CertificationsSection";
import ContactSection from "@/components/sections/ContactSection";

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
      <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
        {/* Futuristic subtle glows */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 -left-24 w-[28rem] h-[28rem] rounded-full bg-primary/10 blur-3xl animate-float" />
          <div className="absolute bottom-[-6rem] -right-24 w-[32rem] h-[32rem] rounded-full bg-primary/10 blur-3xl animate-float [animation-delay:2s]" />
        </div>

        <Sidebar activeSection={activeSection} scrollToSection={scrollToSection} />

        <div className="ml-72 min-h-screen relative z-0">
        <HeroSection scrollToSection={scrollToSection} handleDownloadResume={handleDownloadResume} />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <PublicationsSection />
        <EducationSection />
        <CertificationsSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
