"use client";

import { useState } from "react";
import { useLenis } from "@/hooks/useLenis";
import PageLoader from "@/components/studio/PageLoader";
import Header from "@/components/studio/Header";
import Hero from "@/components/studio/Hero";
import About from "@/components/studio/About";
import Work from "@/components/studio/Work";
import Capabilities from "@/components/studio/Capabilities";
import Experience from "@/components/studio/Experience";
import Stats from "@/components/studio/Stats";
import Research from "@/components/studio/Research";
import Contact from "@/components/studio/Contact";
import SiteFooter from "@/components/studio/SiteFooter";
import ScrollThread from "@/components/studio/ScrollThread";

const Index = () => {
  useLenis();
  const [ready, setReady] = useState(false);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = "/Saran-Jaya-Thilak-Resume.pdf";
    link.download = "Saran-Jaya-Thilak-Resume.pdf";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <PageLoader onDone={() => setReady(true)} />
      <div className="relative min-h-screen bg-background">
        <Header ready={ready} scrollToSection={scrollToSection} />
        <ScrollThread />
        <main>
          <Hero ready={ready} scrollToSection={scrollToSection} onResume={handleDownloadResume} />
          <About />
          <Work />
          <Capabilities />
          <Experience />
          <Stats />
          <Research />
          <Contact />
        </main>
        <SiteFooter scrollToSection={scrollToSection} />
      </div>
    </>
  );
};

export default Index;
