import { motion } from "framer-motion";
import { skills } from "@/data/portfolio";
import SectionHeading from "@/components/ui/section-heading";

const SkillsSection = () => {
  return (
    <section id="skills" className="py-20 sm:py-32 px-6 sm:px-8 bg-white/[0.01]">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          title="Skills"
          tag="Expertise"
          index="03"
          subtitle="Core technologies and frameworks I use to build robust data platforms and AI systems."
        />

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {Object.entries(skills).map(([category, items], categoryIdx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: categoryIdx * 0.1 }}
              className="glass rounded-3xl p-8"
            >
              <h3 className="text-lg font-display font-semibold mb-6 text-foreground">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 100, damping: 20, delay: (categoryIdx * 0.1) + (i * 0.05) }}
                    className="px-3 py-1.5 text-xs font-medium bg-white/5 border border-white/10 rounded-full text-foreground/80 hover:bg-white/10 hover:text-foreground transition-colors cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;