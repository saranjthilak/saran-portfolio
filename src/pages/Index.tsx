
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background relative overflow-hidden">
      {/* Futuristic background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 via-transparent to-accent/10"></div>
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-3/4 left-1/4 w-64 h-64 bg-primary/15 rounded-full blur-2xl animate-glow"></div>
      </div>

      {/* Glass overlay pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 animate-shimmer"></div>
      </div>

      <Sidebar activeSection={activeSection} scrollToSection={scrollToSection} />

      <div className="ml-72 min-h-screen relative z-10">
        <div className="animate-fade-in-up">
          <HeroSection scrollToSection={scrollToSection} handleDownloadResume={handleDownloadResume} />
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <AboutSection />
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <ExperienceSection />
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <SkillsSection />
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <ProjectsSection />
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: '1.0s' }}>
          <PublicationsSection />
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
          <EducationSection />
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: '1.4s' }}>
          <CertificationsSection />
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: '1.6s' }}>
          <ContactSection />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
