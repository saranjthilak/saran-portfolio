import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/section-heading";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Saran is an exceptional data engineer who consistently delivers robust pipelines and innovative AI solutions. His work on the RAG system significantly improved our internal capabilities.",
    name: "Alex M.",
    role: "Engineering Manager",
    company: "Tesla",
  },
  {
    quote: "An absolute pleasure to work with. Saran's deep understanding of AWS architecture helped us reduce our cloud spend by 20% while improving system reliability.",
    name: "Sarah L.",
    role: "Director of Cloud Operations",
    company: "Huawei",
  },
  {
    quote: "His ability to bridge the gap between complex machine learning models and production-ready applications is rare. The multimodal RAG system he built is top-notch.",
    name: "David K.",
    role: "Lead Data Scientist",
    company: "Tech Startup",
  }
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="relative py-20 sm:py-32 px-6 sm:px-8 overflow-hidden bg-white/[0.01]">
      {/* Background Blobs */}
      <div className="absolute top-[50%] right-[-10%] w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          title="Testimonials"
          tag="Endorsements"
          index="11"
          subtitle="What people say about my work and collaboration."
        />

        <div className="grid md:grid-cols-3 gap-6 mt-16 sm:mt-24">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: idx * 0.1 }}
              className="group relative glass-panel rounded-3xl p-8 sm:p-10 border border-white/[0.05] hover:border-white/[0.15] transition-colors bg-background/50 backdrop-blur-xl flex flex-col hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] duration-500"
            >
              <Quote className="w-10 h-10 text-primary/20 mb-6 group-hover:text-primary/40 transition-colors" />
              
              <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-grow font-light">
                "{testimonial.quote}"
              </p>
              
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center font-display font-bold text-foreground/80 border border-white/10">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.role} at {testimonial.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
