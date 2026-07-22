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
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      className="group relative glass-panel p-6 sm:p-10 rounded-3xl transition-all duration-500 hover:-translate-y-1 border border-white/[0.05] hover:border-white/[0.15] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] bg-background/50 backdrop-blur-xl overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 shadow-inner flex items-center justify-center text-3xl shrink-0 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
          {item.icon}
        </div>
        
        <div className="flex-grow">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-foreground group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-primary/80 transition-all duration-300">{item.institution}</h3>
              <div className="text-primary text-sm font-semibold mt-1.5">{item.degree}</div>
            </div>
            <div className="flex flex-col sm:items-end text-left sm:text-right mt-2 sm:mt-0">
              <span className="text-[10px] sm:text-xs font-mono tracking-widest text-muted-foreground uppercase bg-white/5 px-2.5 py-1 rounded-md border border-white/5">{item.period}</span>
              <span className="text-xs text-muted-foreground/60 mt-2">{item.location}</span>
            </div>
          </div>
          
          <p className="text-sm text-foreground/80 font-light mb-6">{item.field}</p>
          
          <div className="flex flex-wrap gap-2">
            {item.skills.map((skill) => (
              <span key={skill} className="px-3 py-1 text-[10px] uppercase tracking-widest font-mono bg-white/5 rounded-full border border-white/5 text-foreground/70 shadow-inner group-hover:border-white/10 transition-colors">
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
    <section id="education" className="relative py-20 sm:py-32 px-6 sm:px-8 overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <SectionHeading
          title="Education"
          tag="Academic"
          index="06"
          subtitle="A solid foundation in engineering, scaling up to advanced AI research."
        />
        
        <div className="space-y-6 sm:space-y-8 mt-16 sm:mt-24 relative">
          <div className="absolute left-[39px] top-4 bottom-4 w-px bg-gradient-to-b from-primary/30 via-primary/10 to-transparent hidden sm:block pointer-events-none" />
          
          {educationData.map((item, index) => (
            <EducationCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
