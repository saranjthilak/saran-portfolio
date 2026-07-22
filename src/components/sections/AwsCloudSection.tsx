import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/section-heading";
import { Cloud, Server, Database, Shield } from "lucide-react";

const awsServices = [
  { icon: <Cloud className="w-6 h-6" />, name: "Compute", services: ["EC2", "Lambda", "ECS", "EKS"] },
  { icon: <Database className="w-6 h-6" />, name: "Data & Storage", services: ["S3", "RDS", "DynamoDB", "Redshift"] },
  { icon: <Server className="w-6 h-6" />, name: "Networking & Content", services: ["VPC", "CloudFront", "Route 53", "API Gateway"] },
  { icon: <Shield className="w-6 h-6" />, name: "Security & Identity", services: ["IAM", "KMS", "Cognito", "WAF"] }
];

const AwsCloudSection = () => {
  return (
    <section id="cloud" className="relative py-20 sm:py-32 px-6 sm:px-8 overflow-hidden bg-white/[0.01]">
      <div className="absolute top-[30%] left-[20%] w-[500px] h-[500px] bg-amber-500/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeading
          title="AWS & Cloud"
          tag="Infrastructure"
          index="09"
          subtitle="Certified expertise in architecting scalable, secure cloud environments."
        />

        <div className="grid sm:grid-cols-2 gap-6 mt-16 sm:mt-24">
          {awsServices.map((category, idx) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: idx * 0.1 }}
              className="group relative glass-panel rounded-3xl p-8 border border-white/[0.05] hover:border-amber-500/30 transition-colors bg-background/50 backdrop-blur-xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-inner">
                  {category.icon}
                </div>
                <h3 className="text-xl font-display font-semibold text-foreground">{category.name}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2 relative z-10">
                {category.services.map(service => (
                  <span key={service} className="px-3 py-1.5 text-xs font-medium bg-white/5 border border-white/10 rounded-full text-foreground/80 group-hover:bg-amber-500/10 group-hover:border-amber-500/20 group-hover:text-amber-500 transition-colors">
                    {service}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AwsCloudSection;
