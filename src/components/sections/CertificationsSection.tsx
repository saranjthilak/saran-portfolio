
import { Card, CardContent } from "@/components/ui/card";
import { certifications } from "@/data/portfolio";
import SectionHeading from "@/components/ui/section-heading";
import Reveal from "@/components/ui/reveal";
import HeroGlobe from "@/components/ui/hero-globe";

const CertificationsSection = () => {
  return (
    <section id="certifications" className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <HeroGlobe />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto">
        <SectionHeading title="Certifications" tag="Credentials" />
        <div className="grid gap-6 md:gap-8 md:grid-cols-2">
          {certifications.map((cert, index) => (
            <Reveal key={index} delay={index * 0.1} direction="scale">
            <Card className="glass rounded-2xl hover:border-primary/50 transition-all duration-500 hover:shadow-elegant group hover-lift">
              <CardContent className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-primary rounded-2xl flex items-center justify-center text-2xl sm:text-4xl shadow-glow group-hover:scale-110 transition-transform duration-300">
                    {cert.logo}
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="font-display text-xl sm:text-2xl font-semibold text-foreground mb-2 group-hover:text-gradient-primary transition-colors tracking-tight">{cert.title}</h3>
                    {cert.level && <p className="text-primary text-xs sm:text-sm mb-2 uppercase tracking-[0.2em] font-mono">{cert.level}</p>}
                    <p className="text-muted-foreground text-base">{cert.issuer}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
