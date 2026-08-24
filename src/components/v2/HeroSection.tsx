"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const navLinks = [
  { label: "ABOUT", href: "#about" },
  { label: "SKILLS", href: "#skills" },
  { label: "PROJECTS", href: "#projects" },
  { label: "CONTACT", href: "#contact" },
];

const HeroSection = () => {
  return (
    <div className="relative bg-[#0d1116] min-h-screen overflow-hidden text-white font-sans">
      {/* Grid Background Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* Navbar */}
      <nav className="fixed top-0 w-full h-24 z-50 bg-[#0f1115]/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-6 md:px-12">
        <a href="#home" className="text-2xl font-black tracking-tighter">
          SARAN<span className="text-[#00df8f]">.</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="text-sm font-semibold text-gray-300 uppercase hover:text-[#00df8f] transition-colors">
              {link.label}
            </a>
          ))}
        </div>
        <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-[#00df8f] transition-colors cursor-pointer">
          <div className="w-2 h-2 rounded-full bg-[#00df8f]"></div>
        </div>
      </nav>

      {/* Massive Typography Graphic */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <h1 className="text-[20vw] font-black opacity-[0.02] tracking-tighter">ENGINEER</h1>
      </div>

      {/* Hero Content */}
      <section id="home" className="relative z-10 min-h-screen flex items-center pt-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column */}
          <div className="flex flex-col items-start pt-12 lg:pt-0">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-2 h-2 rounded-full bg-[#00df8f]"></div>
              <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold">DATA ENGINEER & GENAI SPECIALIST</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1 }}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] font-black leading-[0.9] tracking-tighter mb-6"
            >
              AI-NATIVE<br/>
              <span className="text-transparent" style={{ WebkitTextStroke: '2px #00df8f' }}>PRODUCTS</span>
              <span className="text-[#00df8f]">.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 max-w-md text-lg leading-relaxed mb-10"
            >
              I build reliable RAG systems, scalable MLOps pipelines, and intelligent products that empower businesses to lead in the AI era.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center gap-6"
            >
              <a href="#projects" className="group flex items-center gap-3 bg-gradient-to-r from-[#00df8f] to-[#00b373] text-black px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider hover:scale-105 transition-transform duration-300">
                View My Work
                <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
              </a>
              <a href="#contact" className="flex items-center gap-3 bg-[#14181f] border border-white/10 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider text-white hover:bg-white/5 transition-colors">
                <div className="w-2 h-2 rounded-full bg-[#00df8f]"></div>
                Contact Me
              </a>
            </motion.div>
          </div>

          {/* Right Column - Interactive ID Card */}
          <div className="relative flex justify-center lg:justify-end items-center h-[500px]">
            {/* Lanyard String */}
            <div className="absolute top-[-250px] left-1/2 -translate-x-1/2 w-[12px] h-[350px] bg-gradient-to-b from-[#0d1116] via-[#14181f] to-[#2a303c] border-x border-white/5 z-0" />
            
            <motion.div
              drag
              dragElastic={0.2}
              dragConstraints={{ top: -50, bottom: 50, left: -50, right: 50 }}
              dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
              animate={{ y: [0, -15, 0], rotateZ: [-1, 1, -1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 w-[300px] h-[420px] bg-[#14181f] rounded-3xl border border-white/10 overflow-hidden shadow-2xl shadow-black/80 cursor-grab active:cursor-grabbing"
            >
              {/* Card Header Hole */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-3 bg-[#0d1116] rounded-full border border-white/10 z-20 shadow-inner" />
              
              {/* ID Portrait */}
              <div className="absolute inset-0 p-3 pb-24">
                <div className="w-full h-full bg-[#0d1116] rounded-2xl overflow-hidden relative">
                  <img 
                    src="/lovable-uploads/5881e7e5-f088-4e07-a79c-59eacb55eeb0.png" 
                    alt="Saran Portrait" 
                    className="w-full h-full object-cover opacity-80"
                    draggable={false}
                  />
                  {/* Inner neon border effect */}
                  <div className="absolute inset-0 border border-[#00df8f]/30 rounded-2xl pointer-events-none" />
                </div>
              </div>
              
              {/* Card Bottom Details */}
              <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#14181f] via-[#14181f]/95 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-[1.35rem] font-black tracking-tighter text-white leading-tight">Saran Jaya Thilak</h3>
                <p className="text-[#00df8f] text-xs uppercase tracking-widest font-semibold mt-1">AI Engineer</p>
                
                {/* Barcode graphic */}
                <div className="w-full h-6 mt-4 flex gap-[2px] opacity-40">
                  <div className="w-1 h-full bg-white"></div>
                  <div className="w-[6px] h-full bg-white"></div>
                  <div className="w-1 h-full bg-white"></div>
                  <div className="w-[10px] h-full bg-white"></div>
                  <div className="w-1 h-full bg-white"></div>
                  <div className="w-[2px] h-full bg-white"></div>
                  <div className="w-[12px] h-full bg-white"></div>
                  <div className="w-[5px] h-full bg-white"></div>
                  <div className="w-1 h-full bg-white"></div>
                  <div className="w-[8px] h-full bg-white"></div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default HeroSection;
