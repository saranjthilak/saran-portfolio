
import { Card, CardContent } from "@/components/ui/card";
import { certifications } from "@/data/portfolio";

const CertificationsSection = () => {
  return (
    <section id="certifications" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 sm:mb-6">Certifications</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
        </div>
        <div className="grid gap-8 md:gap-10 md:grid-cols-2">
          {certifications.map((cert, index) => (
            <Card key={index} className="bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-yellow-500/20 group hover:border-white/20">
              <CardContent className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl sm:rounded-3xl flex items-center justify-center text-2xl sm:text-4xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {cert.logo}
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-blue-200 transition-colors">{cert.title}</h3>
                    {cert.level && <p className="text-blue-300 text-base sm:text-lg mb-2">{cert.level}</p>}
                    <p className="text-white/70 text-base sm:text-lg">{cert.issuer}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
