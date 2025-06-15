import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Download, MapPin, Sparkles } from "lucide-react";

interface HeroSectionProps {
  scrollToSection: (id: string) => void;
  handleDownloadResume: () => void;
}

const HeroSection = ({ scrollToSection, handleDownloadResume }: HeroSectionProps) => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-6xl mx-auto">
        <Card className="bg-black/20 backdrop-blur-2xl border border-purple-500/30 shadow-2xl shadow-purple-500/20">
          <CardContent className="p-16">
            <div className="flex items-center justify-between">
              <div className="flex-1 pr-8">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/20 to-purple-600/20 px-6 py-2 rounded-full border border-blue-500/30 mb-8">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-300 text-sm font-medium tracking-wide">Available for new opportunities</span>
                </div>
                
                <h1 className="text-7xl font-black tracking-tight mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Saran Jaya Thilak
                </h1>
                <p className="text-2xl mb-8 text-blue-200 font-light tracking-wide">
                  Data Scientist | Machine Learning | Cloud Infrastructure | CI/CD Automation Specialist
                </p>
                <p className="text-lg mb-10 text-white/80 max-w-3xl leading-relaxed">
                  Data science professional with extensive experience in machine learning, cloud infrastructure, and automation. Skilled in designing scalable cloud-native architectures (AWS, GCP) and building end-to-end CI/CD pipelines to optimize deployments and operations. Passionate about machine learning and developing reliable, scalable AI systems. Strong collaborator focused on delivering data-driven solutions aligned with business goals.
                </p>
                <div className="flex items-center space-x-3 mb-10">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  <span className="text-white/80 text-lg">Berlin, Germany</span>
                </div>
                <div className="flex space-x-6">
                  <Button 
                    onClick={() => scrollToSection('projects')}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-[1.03]"
                  >
                    Explore My Work
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button 
                    onClick={handleDownloadResume}
                    variant="outline" 
                    className="bg-white/10 border-white/30 text-white hover:bg-white/20 px-8 py-4 text-lg rounded-xl backdrop-blur-sm transition-all duration-300 hover:scale-[1.03]"
                  >
                    <Download className="mr-2 w-5 h-5" />
                    Download Resume
                  </Button>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="relative">
                  <div className="w-80 h-80 rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl shadow-black/40 bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-sm">
                    <img 
                      src="/lovable-uploads/5881e7e5-f088-4e07-a79c-59eacb55eeb0.png" 
                      alt="Saran Jaya Thilak" 
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-400 rounded-full border-4 border-white shadow-lg animate-pulse"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default HeroSection;
