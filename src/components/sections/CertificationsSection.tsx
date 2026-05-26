
import { Card, CardContent } from "@/components/ui/card";
import { certifications } from "@/data/portfolio";
import HudFrame from "@/components/ui/hud-frame";
import SectionHeading from "@/components/ui/section-heading";
import Reveal from "@/components/ui/reveal";

const CertificationsSection = () => {
  return (
    <section id="certifications" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Certifications" tag="Credentials" />
        <div className="grid gap-8 md:gap-10 md:grid-cols-2">
          {certifications.map((cert, index) => (
            <Reveal key={index} delay={index * 0.1} direction="scale">
            <HudFrame scan variant={index % 2 === 0 ? "cyan" : "fuchsia"}>
            <Card className="bg-black/30 backdrop-blur-xl border border-cyan-400/20 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-500/30 group hover:border-cyan-400/50">
              <CardContent className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-cyan-500 via-indigo-500 to-fuchsia-500 rounded-2xl sm:rounded-3xl flex items-center justify-center text-2xl sm:text-4xl shadow-[0_0_25px_rgba(34,211,238,0.5)] group-hover:scale-110 transition-transform duration-300">
                    {cert.logo}
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-cyan-200 transition-colors tracking-wide">{cert.title}</h3>
                    {cert.level && <p className="text-cyan-300 text-sm sm:text-base mb-2 uppercase tracking-[0.2em]">{cert.level}</p>}
                    <p className="text-white/70 text-base sm:text-lg">{cert.issuer}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            </HudFrame>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
