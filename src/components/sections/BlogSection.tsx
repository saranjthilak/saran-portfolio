import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/section-heading";
import { ArrowRight, BookText } from "lucide-react";

const blogPosts = [
  {
    title: "Scaling RAG Systems for Enterprise",
    excerpt: "Learn how to architect and scale Retrieval-Augmented Generation systems using FAISS, Triton Inference, and LangChain to handle millions of daily queries with sub-second latency.",
    date: "Oct 12, 2023",
    readTime: "8 min read",
    category: "AI Architecture",
  },
  {
    title: "Optimizing AWS Costs for Data Pipelines",
    excerpt: "A comprehensive guide on right-sizing EC2 instances, leveraging Spot instances, and optimizing S3 lifecycles to reduce cloud infrastructure costs without compromising reliability.",
    date: "Aug 24, 2023",
    readTime: "6 min read",
    category: "Cloud Engineering",
  },
  {
    title: "Building Real-time ETL with Apache Airflow",
    excerpt: "Discover best practices for designing robust, real-time data pipelines using Apache Airflow and DBT, complete with automated data quality checks and alerting.",
    date: "May 15, 2023",
    readTime: "10 min read",
    category: "Data Engineering",
  }
];

const BlogSection = () => {
  return (
    <section id="blog" className="relative py-20 sm:py-32 px-6 sm:px-8 overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeading
          title="Writing"
          tag="Blog"
          index="12"
          subtitle="Thoughts, tutorials, and insights on data engineering and AI."
        />

        <div className="grid md:grid-cols-3 gap-6 mt-16 sm:mt-24">
          {blogPosts.map((post, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: idx * 0.1 }}
              className="group relative glass-panel rounded-3xl p-6 sm:p-8 flex flex-col border border-white/[0.05] hover:border-white/[0.15] bg-background/50 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="flex items-center justify-between mb-6 relative z-10">
                <span className="px-2.5 py-1 text-[10px] font-medium bg-primary/10 text-primary border border-primary/20 rounded-md uppercase tracking-widest shadow-[0_0_10px_rgba(var(--primary),0.1)]">
                  {post.category}
                </span>
                <BookText className="w-5 h-5 text-muted-foreground/50" />
              </div>
              
              <h3 className="text-xl font-bold font-display text-foreground mb-4 group-hover:text-primary transition-colors relative z-10">
                {post.title}
              </h3>
              
              <p className="text-sm text-muted-foreground leading-relaxed font-light mb-8 flex-grow relative z-10 line-clamp-3">
                {post.excerpt}
              </p>
              
              <div className="flex items-center justify-between pt-6 border-t border-white/[0.05] relative z-10">
                <div className="text-[11px] font-mono tracking-widest text-muted-foreground">
                  {post.date} • {post.readTime}
                </div>
                <button className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-foreground group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-300">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <button className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-foreground bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-colors">
            View all posts <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
