import { motion } from "framer-motion";
import { skills } from "@/data/portfolio";
import SectionHeading from "@/components/ui/section-heading";

// Utility to generate a pseudo-random proficiency (80-98%) based on string to keep it deterministic
const getProficiency = (skill: string) => {
  let hash = 0;
  for (let i = 0; i < skill.length; i++) {
    hash = skill.charCodeAt(i) + ((hash << 5) - hash);
  }
  return 80 + (Math.abs(hash) % 19); 
};

const SkillsSection = () => {
  return (
    <section id="skills" className="relative py-20 sm:py-32 px-6 sm:px-8 overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-[30%] right-[0%] w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeading
          title="Skills"
          tag="Expertise"
          index="03"
          subtitle="Core technologies and frameworks I use to build robust data platforms and AI systems."
        />

        <div className="grid md:grid-cols-3 gap-8 mt-16 sm:mt-24">
          {Object.entries(skills).map(([category, items], categoryIdx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: categoryIdx * 0.1 }}
              className="relative glass-panel rounded-3xl p-8 border border-white/[0.05] hover:border-primary/20 transition-colors bg-background/50 backdrop-blur-xl group"
            >
              <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-[40px] -translate-y-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <h3 className="text-xl font-display font-semibold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 relative z-10">{category}</h3>
              
              <div className="flex flex-col gap-5 relative z-10">
                {items.map((skill, i) => {
                  const proficiency = getProficiency(skill);
                  return (
                    <div key={skill} className="flex flex-col gap-2">
                      <div className="flex justify-between items-center text-xs font-medium">
                        <span className="text-foreground/90">{skill}</span>
                        <span className="text-primary/70 font-mono">{proficiency}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden shadow-inner">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${proficiency}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, delay: (categoryIdx * 0.1) + (i * 0.05), ease: [0.16, 1, 0.3, 1] }}
                          className="h-full bg-gradient-to-r from-primary/50 to-primary rounded-full relative"
                        >
                          <div className="absolute top-0 right-0 bottom-0 w-8 bg-white/20 blur-[2px]" />
                        </motion.div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;