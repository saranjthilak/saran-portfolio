"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/section-heading";
import { Github } from "lucide-react";

// Generate fake contribution data for the mock graph
const generateContributionData = () => {
  const weeks = 52;
  const days = 7;
  const data = [];
  
  for (let w = 0; w < weeks; w++) {
    const week = [];
    for (let d = 0; d < days; d++) {
      // Create a pattern where more recent weeks have more activity
      const baseProbability = 0.2 + (w / weeks) * 0.5;
      const isActive = Math.random() < baseProbability;
      
      let intensity = 0;
      if (isActive) {
        const rand = Math.random();
        if (rand > 0.8) intensity = 3;
        else if (rand > 0.5) intensity = 2;
        else intensity = 1;
      }
      
      week.push(intensity);
    }
    data.push(week);
  }
  return data;
};

const generateStaticData = () => {
  return Array.from({ length: 52 }, () => Array(7).fill(0));
};

const GithubContributionsSection = () => {
  const [contributionData, setContributionData] = useState<number[][]>(generateStaticData());

  useEffect(() => {
    setContributionData(generateContributionData());
  }, []);

  return (
    <section id="github" className="relative py-20 sm:py-32 px-6 sm:px-8 overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] bg-primary/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeading
          title="Open Source"
          tag="GitHub"
          index="10"
          subtitle="A history of consistent contributions and personal projects."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="mt-16 glass-panel rounded-3xl p-6 sm:p-10 border border-white/[0.05] bg-background/50 backdrop-blur-xl relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <Github className="w-8 h-8 text-foreground" />
              <div>
                <h3 className="text-xl font-display font-semibold text-foreground">saranjthilak</h3>
                <p className="text-sm text-muted-foreground">843 contributions in the last year</p>
              </div>
            </div>
            
            <a 
              href="https://github.com/saranjthilak" 
              target="_blank" 
              rel="noreferrer"
              className="px-4 py-2 text-sm font-medium bg-white/5 hover:bg-white/10 text-foreground rounded-lg border border-white/10 transition-colors"
            >
              Follow on GitHub
            </a>
          </div>

          <div className="overflow-x-auto hide-scrollbar pb-4 -mx-2 px-2">
            <div className="flex gap-1 min-w-max">
              {contributionData.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-1">
                  {week.map((intensity, dIdx) => (
                    <div 
                      key={`${wIdx}-${dIdx}`}
                      className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-sm transition-colors duration-300 hover:scale-125 hover:z-10 relative
                        ${intensity === 0 ? 'bg-white/5 border border-white/5' : 
                          intensity === 1 ? 'bg-primary/30 border border-primary/20' : 
                          intensity === 2 ? 'bg-primary/60 border border-primary/40 shadow-[0_0_8px_rgba(59,130,246,0.4)]' : 
                          'bg-primary border border-primary/80 shadow-[0_0_12px_rgba(59,130,246,0.6)]'
                        }
                      `}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex items-center justify-end gap-2 mt-4 text-xs text-muted-foreground">
            <span>Less</span>
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-sm bg-white/5 border border-white/5" />
              <div className="w-3 h-3 rounded-sm bg-primary/30 border border-primary/20" />
              <div className="w-3 h-3 rounded-sm bg-primary/60 border border-primary/40" />
              <div className="w-3 h-3 rounded-sm bg-primary border border-primary/80" />
            </div>
            <span>More</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GithubContributionsSection;
