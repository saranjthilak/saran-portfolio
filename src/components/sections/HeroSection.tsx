
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Download, MapPin, Sparkles } from "lucide-react";

interface HeroSectionProps {
  scrollToSection: (id: string) => void;
  handleDownloadResume: () => void;
}

const HeroSection = ({ scrollToSection, handleDownloadResume }: HeroSectionProps) => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center p-4 sm:p-8">
      <div className="max-w-6xl mx-auto w-full">
        <Card className="bg-black/20 backdrop-blur-2xl border border-purple-500/30 shadow-2xl shadow-purple-500/20">
          <CardContent className="p-6 sm:p-8 md:p-12 lg:p-16">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="flex-1 lg:pr-8 text-center lg:text-left">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/20 to-purple-600/20 px-4 sm:px-6 py-2 rounded-full border border-blue-500/30 mb-6 sm:mb-8">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-300 text-xs sm:text-sm font-medium tracking-wide">Available for new opportunities</span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-4 sm:mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Saran Jaya Thilak
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-blue-200 font-light tracking-wide">
                  Generative AI | RAG Architectures | LLM Orchestration | Python Expertise
                </p>
                <p className="text-base sm:text-lg mb-8 sm:mb-10 text-white/80 max-w-3xl leading-relaxed mx-auto lg:mx-0">
                  Data Engineering and Generative AI professional with 3 years of experience designing and deploying scalable data pipelines and LLM-powered systems. Strong expertise in Python, distributed data processing, and Retrieval-Augmented Generation (RAG) architectures — including vector databases, embedding pipelines, and model evaluation frameworks. Proven track record of 99.9% reliability in ML model deployment and a 30% boost in LLM classification accuracy through prompt engineering and retrieval tuning.
                </p>
                <div className="flex items-center justify-center lg:justify-start space-x-3 mb-8 sm:mb-10">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  <span className="text-white/80 text-base sm:text-lg">Berlin, Germany</span>
                </div>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 items-center justify-center lg:justify-start">
                  <Button 
                    onClick={() => scrollToSection('projects')}
                    className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-[1.03]"
                  >
                    Explore My Work
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button 
                    onClick={handleDownloadResume}
                    variant="outline" 
                    className="w-full sm:w-auto bg-white/10 border-white/30 text-white hover:bg-white/20 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-xl backdrop-blur-sm transition-all duration-300 hover:scale-[1.03]"
                  >
                    <Download className="mr-2 w-5 h-5" />
                    Download Resume
                  </Button>
                </div>
              </div>
              <div className="mt-8 lg:mt-0 lg:block">
                <div className="relative">
                  <div className="w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl shadow-black/40 bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-sm mx-auto">
                    <img 
                      src="/lovable-uploads/5881e7e5-f088-4e07-a79c-59eacb55eeb0.png" 
                      alt="Saran Jaya Thilak" 
                      width="320"
                      height="320"
                      fetchPriority="high"
                      decoding="async"
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
