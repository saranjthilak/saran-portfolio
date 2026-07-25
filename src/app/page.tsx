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
import { useLenis } from "@/hooks/useLenis";
import { motion } from "framer-motion";

/** Animated divider that scales in from center when scrolled into view */
const AnimatedDivider = () => (
  <motion.div
    initial={{ scaleX: 0, opacity: 0 }}
    whileInView={{ scaleX: 1, opacity: 1 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    className="w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent my-12 origin-center"
  />
);

const Index = () => {
  useLenis();
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
      className="min-h-screen bg-background relative overflow-hidden text-foreground selection:bg-primary/30"
    >
      <Sidebar activeSection={activeSection} scrollToSection={scrollToSection} />

      <div className="w-full min-h-screen relative z-0 pb-24">
        <HeroSection scrollToSection={scrollToSection} handleDownloadResume={handleDownloadResume} />
        
        {/* Animated dividers between sections */}
        <AnimatedDivider />
        <AboutSection />
        
        <AnimatedDivider />
        <ExperienceSection />
        
        <AnimatedDivider />
        <SkillsSection />
        
        <AnimatedDivider />
        <ProjectsSection />
        
        <AnimatedDivider />
        <PublicationsSection />
        
        <AnimatedDivider />
        <EducationSection />
        
        <AnimatedDivider />
        <CertificationsSection />
        
        <AnimatedDivider />
        <AwsCloudSection />
        
        <AnimatedDivider />
        <GithubContributionsSection />
        
        <AnimatedDivider />
        <TestimonialsSection />

        <AnimatedDivider />
        <BlogSection />
        
        <AnimatedDivider />
        <ContactSection />

        <Footer />
      </div>
    </motion.div>
  );
};

export default Index;
