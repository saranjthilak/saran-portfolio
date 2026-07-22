import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { experience } from "@/data/portfolio";
import SectionHeading from "@/components/ui/section-heading";

const ExperienceCard = ({ job, index }: { job: typeof experience[0], index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      className="relative pl-8 md:pl-0"
    >
      {/* Timeline Dot (Mobile) */}
      <div className="md:hidden absolute left-[3.5px] top-6 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-background z-20" />

      <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-12 items-center group">
        
        {/* Left Side (Period & Company) */}
        <div className={`md:text-right ${index % 2 !== 0 ? 'md:order-3 md:text-left' : ''}`}>
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl glass border-white/10 mb-4 md:mb-0 md:hidden text-2xl shadow-inner">
            {job.logo}
          </div>
          <h3 className="text-xl md:text-2xl font-bold font-display text-foreground group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-primary/80 transition-all duration-300">{job.company}</h3>
          <p className="text-xs font-mono text-primary/80 mt-1.5 mb-2 tracking-widest uppercase">{job.period}</p>
        </div>

        {/* Center Timeline Node (Desktop) */}
        <div className={`hidden md:flex flex-col items-center justify-center relative ${index % 2 !== 0 ? 'md:order-2' : ''}`}>
          <div className="w-14 h-14 rounded-2xl glass-panel border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] flex items-center justify-center text-2xl z-10 group-hover:scale-110 group-hover:-rotate-3 group-hover:border-primary/30 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-500 bg-background/50 backdrop-blur-xl">
            {job.logo}
          </div>
        </div>

        {/* Right Side (Role & Description) */}
        <div className={`relative glass-panel p-6 sm:p-8 rounded-3xl border border-white/[0.05] group-hover:border-primary/20 transition-all duration-500 overflow-hidden bg-background/40 backdrop-blur-xl group-hover:-translate-y-1 ${index % 2 !== 0 ? 'md:order-1' : ''}`}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-colors duration-700 pointer-events-none" />
          
          <h4 className="text-lg font-semibold text-foreground mb-3 relative z-10">{job.role}</h4>
          <p className="text-sm text-muted-foreground leading-relaxed font-light relative z-10">
            {job.description}
          </p>
        </div>
        
      </div>
    </motion.div>
  );
};

const ExperienceSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="relative py-20 sm:py-32 px-6 sm:px-8 overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeading title="Experience" tag="Career" index="02" subtitle="A track record of building reliable, scalable data platforms." />

        <div ref={containerRef} className="relative mt-20 sm:mt-32">
          {/* Central Line (Desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/5 -translate-x-1/2" />
          <motion.div 
            style={{ scaleY, transformOrigin: "top" }}
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary via-primary/50 to-transparent -translate-x-1/2 shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
          />

          {/* Left Line (Mobile) */}
          <div className="md:hidden absolute left-[7px] top-0 bottom-0 w-[1px] bg-white/10" />
          <motion.div 
            style={{ scaleY, transformOrigin: "top" }}
            className="md:hidden absolute left-[7px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary via-primary/50 to-transparent shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
          />

          <div className="space-y-12 md:space-y-28">
            {experience.map((job, index) => (
              <ExperienceCard key={index} job={job} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
