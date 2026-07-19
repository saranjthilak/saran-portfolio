import { useState, useEffect, useRef } from "react";
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
import MicroHud from "@/components/ui/micro-hud";
import ParticleField from "@/components/ui/ParticleField";
import ScrollProgress from "@/components/ui/ScrollProgress";
import { useLenis } from "@/hooks/useLenis";
import { motion, useScroll, useTransform } from "framer-motion";

const SECTIONS = [
  { id: "home", component: HeroSection, divider: "cyan" },
  { id: "about", component: AboutSection, divider: "mixed" },
  { id: "experience", component: ExperienceSection, divider: "fuchsia" },
  { id: "skills", component: SkillsSection, divider: "cyan" },
  { id: "projects", component: ProjectsSection, divider: "mixed" },
  { id: "publications", component: PublicationsSection, divider: "fuchsia" },
  { id: "education", component: EducationSection, divider: "cyan" },
  { id: "certifications", component: CertificationsSection, divider: "mixed" },
  { id: "contact", component: ContactSection, divider: "fuchsia" },
];

const Index = () => {
  useLenis(); // Smooth scroll — respects prefers-reduced-motion
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolling, setIsScrolling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  // Calculate the total number of items in the horizontal track
  // Each section + dividers + footer
  const totalPanels = SECTIONS.length + 1; // +1 for Footer
  
  // Translate the horizontal track. 
  // We want to move left by (total width - viewport width)
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(totalPanels - 1) * 100}vw`]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrolling) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% -40% -40% -40%" } // Triggers when roughly centered horizontally
    );

    const sections = document.querySelectorAll("section");
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, [isScrolling]);

  const scrollToSection = (id: string) => {
    setIsScrolling(true);
    setActiveSection(id);
    
    // Find the index of the section to scroll to
    const index = SECTIONS.findIndex(s => s.id === id);
    if (index !== -1) {
      // Calculate scroll offset based on total height and index
      const maxScroll = (containerRef.current?.scrollHeight || 0) - window.innerHeight;
      const targetScroll = (index / (totalPanels - 1)) * maxScroll;
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
    
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
      className="bg-background relative"
    >
      <ScrollProgress />
      <CustomCursor />
      <ParticleField />
      <Sidebar activeSection={activeSection} scrollToSection={scrollToSection} />
      <MicroHud />

      {/* The scrolling container height controls how much we can scroll vertically */}
      <div 
        ref={containerRef} 
        className="relative z-0"
        style={{ height: `${totalPanels * 100}vh` }} 
      >
        {/* The sticky wrapper that holds the horizontal track */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center bg-background">
          <motion.div 
            style={{ x }} 
            className="flex flex-row h-screen will-change-transform ml-20"
          >
            {SECTIONS.map((section, idx) => {
              const Component = section.component;
              return (
                <div key={section.id} className="flex flex-row h-screen items-center">
                  <div className="w-[calc(100vw-5rem)] h-screen overflow-y-auto relative flex-shrink-0 hide-scrollbar">
                    <Component 
                      scrollToSection={scrollToSection} 
                      handleDownloadResume={handleDownloadResume} 
                    />
                  </div>
                  {/* Vertical Section Divider */}
                  {idx < SECTIONS.length - 1 && (
                    <div className="h-full w-px bg-border shrink-0 flex items-center justify-center relative z-20">
                      <SectionDivider variant={section.divider as any} />
                    </div>
                  )}
                </div>
              );
            })}
            
            {/* Footer Panel */}
            <div className="w-[calc(100vw-5rem)] h-screen overflow-y-auto flex-shrink-0 bg-background relative hide-scrollbar">
              <Footer />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Index;

