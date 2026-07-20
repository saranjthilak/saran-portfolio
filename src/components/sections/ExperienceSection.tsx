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
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: index * 0.1 }}
      className="relative pl-8 md:pl-0"
    >
      {/* Timeline Dot (Mobile) */}
      <div className="md:hidden absolute left-0 top-6 w-3 h-3 rounded-full bg-primary ring-4 ring-background" />

      <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-8 items-center group">
        
        {/* Left Side (Period & Company) */}
        <div className={`md:text-right ${index % 2 !== 0 ? 'md:order-3 md:text-left' : ''}`}>
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl glass border-white/10 mb-4 md:mb-0 md:hidden text-2xl">
            {job.logo}
          </div>
          <h3 className="text-xl font-bold font-display text-foreground">{job.company}</h3>
          <p className="text-sm font-mono text-primary/80 mt-1 mb-2 tracking-widest uppercase">{job.period}</p>
        </div>

        {/* Center Timeline Node (Desktop) */}
        <div className={`hidden md:flex flex-col items-center justify-center relative ${index % 2 !== 0 ? 'md:order-2' : ''}`}>
          <div className="w-12 h-12 rounded-2xl glass border border-white/10 flex items-center justify-center text-xl z-10 group-hover:scale-110 group-hover:bg-white/5 transition-all duration-300">
            {job.logo}
          </div>
        </div>

        {/* Right Side (Role & Description) */}
        <div className={`glass p-6 rounded-2xl border-white/10 hover:bg-white/5 transition-colors ${index % 2 !== 0 ? 'md:order-1' : ''}`}>
          <h4 className="text-lg font-semibold text-foreground mb-3">{job.role}</h4>
          <p className="text-sm text-muted-foreground leading-relaxed font-light">
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
    <section id="experience" className="py-20 sm:py-32 px-6 sm:px-8">
      <div className="max-w-5xl mx-auto">
        <SectionHeading title="Experience" tag="Career" index="02" subtitle="A track record of building reliable, scalable data platforms." />

        <div ref={containerRef} className="relative mt-16 sm:mt-24">
          {/* Central Line (Desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/5 -translate-x-1/2" />
          <motion.div 
            style={{ scaleY, transformOrigin: "top" }}
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent -translate-x-1/2" 
          />

          {/* Left Line (Mobile) */}
          <div className="md:hidden absolute left-[5px] top-0 bottom-0 w-px bg-white/10" />

          <div className="space-y-12 md:space-y-24">
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
