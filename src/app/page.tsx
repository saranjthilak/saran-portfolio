"use client";
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
import AwsCloudSection from "@/components/sections/AwsCloudSection";
import GithubContributionsSection from "@/components/sections/GithubContributionsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import BlogSection from "@/components/sections/BlogSection";
import ContactSection from "@/components/sections/ContactSection";
import dynamic from "next/dynamic";
const Background3D = dynamic(() => import("@/components/ui/Background3D"), { ssr: false });
import { useLenis } from "@/hooks/useLenis";
import { motion, useScroll, useSpring } from "framer-motion";
import SectionDivider from "@/components/ui/SectionDivider";
import dynamic from "next/dynamic";
const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), { ssr: false });


const Index = () => {
  useLenis();
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolling, setIsScrolling] = useState(false);

  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

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
      className="min-h-screen bg-transparent relative text-foreground selection:bg-primary/30"
    >
      <CustomCursor />
      {/* Scroll Progress Bar */}
      <motion.div className="scroll-progress w-full" style={{ scaleX }} />

      <Background3D />
      <Sidebar activeSection={activeSection} scrollToSection={scrollToSection} />

      <div className="w-full min-h-screen relative z-0 pb-24 bg-transparent">
        <HeroSection scrollToSection={scrollToSection} handleDownloadResume={handleDownloadResume} />
        
        <SectionDivider variant="dot-fade" />
        <AboutSection />
        
        <SectionDivider variant="glow-line" />
        <ExperienceSection />
        
        <SectionDivider variant="wave" />
        <SkillsSection />
        
        <SectionDivider variant="dot-fade" />
        <ProjectsSection />
        
        <SectionDivider variant="glow-line" />
        <PublicationsSection />
        
        <SectionDivider variant="wave" />
        <EducationSection />
        
        <SectionDivider variant="dot-fade" />
        <CertificationsSection />
        
        <SectionDivider variant="glow-line" />
        <AwsCloudSection />
        
        <SectionDivider variant="wave" />
        <GithubContributionsSection />
        
        <SectionDivider variant="dot-fade" />
        <TestimonialsSection />

        <SectionDivider variant="glow-line" />
        <BlogSection />
        
        <SectionDivider variant="wave" />
        <ContactSection />

        <Footer />
      </div>
    </motion.div>
  );
};

export default Index;
