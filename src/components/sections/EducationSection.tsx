import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/section-heading";

const educationData = [
  {
    icon: "🧑‍💻",
    institution: "Le Wagon",
    degree: "Boot Camp",
    field: "Data Science & AI",
    period: "04/2025 – 06/2025",
    location: "Berlin, Germany",
    skills: ["Deep Learning", "NLP", "MLOps", "Python", "LLMs"],
  },
  {
    icon: "🎓",
    institution: "University of Europe for Applied Sciences",
    degree: "Master's Degree",
    field: "Data Science",
    period: "04/2022 – 03/2023",
    location: "Berlin, Germany",
    skills: ["Machine Learning", "Statistics", "Big Data", "Research", "Cloud Computing"],
  },
  {
    icon: "🔬",
    institution: "Delhi University",
    degree: "PG Diploma — NIELIT",
    field: "VLSI & Embedded Systems HW Design",
    period: "01/2013 – 12/2014",
    location: "New Delhi, India",
    skills: ["VLSI Design", "Embedded Systems", "Hardware Architecture", "Signal Processing"],
  },
  {
    icon: "⚡",
    institution: "Cochin University of Science & Technology",
    degree: "Bachelor of Technology",
    field: "Electrical, Electronics & Communications Engineering",
    period: "01/2009 – 12/2013",
    location: "Kochi, India",
    skills: ["Circuit Design", "Control Systems", "Telecommunications", "Mathematics", "Physics"],
  },
];

const EducationCard = ({ item, index }: { item: typeof educationData[0], index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: index * 0.1 }}
      className="glass p-6 sm:p-8 rounded-3xl group hover:bg-white/5 transition-colors"
    >
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl shrink-0 group-hover:scale-110 transition-transform duration-500">
          {item.icon}
        </div>
        
        <div className="flex-grow">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
            <div>
              <h3 className="text-xl font-bold font-display text-foreground">{item.institution}</h3>
              <div className="text-primary text-sm font-medium mt-1">{item.degree}</div>
            </div>
            <div className="flex flex-col sm:items-end text-left sm:text-right">
              <span className="text-xs font-mono tracking-widest text-muted-foreground uppercase">{item.period}</span>
              <span className="text-xs text-muted-foreground/60 mt-1">{item.location}</span>
            </div>
          </div>
          
          <p className="text-sm text-foreground/80 font-light mb-4">{item.field}</p>
          
          <div className="flex flex-wrap gap-2">
            {item.skills.map((skill) => (
              <span key={skill} className="px-2.5 py-1 text-[10px] uppercase tracking-wider font-mono bg-white/5 rounded-md border border-white/5 text-foreground/60">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const EducationSection = () => {
  return (
    <section id="education" className="py-20 sm:py-32 px-6 sm:px-8 bg-white/[0.01]">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          title="Education"
          tag="Academic"
          index="06"
          subtitle="A solid foundation in engineering, scaling up to advanced AI research."
        />
        
        <div className="space-y-6 mt-16">
          {educationData.map((item, index) => (
            <EducationCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
