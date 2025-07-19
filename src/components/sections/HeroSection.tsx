
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Download, MapPin, Sparkles, Zap, Brain, Cpu } from "lucide-react";

interface HeroSectionProps {
  scrollToSection: (id: string) => void;
  handleDownloadResume: () => void;
}

const HeroSection = ({ scrollToSection, handleDownloadResume }: HeroSectionProps) => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center p-4 sm:p-8 relative">
      <div className="max-w-6xl mx-auto w-full">
        {/* Floating Tech Icons */}
        <div className="absolute top-20 right-20 text-primary animate-cyber-float">
          <Brain className="w-8 h-8" />
        </div>
        <div className="absolute bottom-32 left-20 text-secondary animate-cyber-float" style={{ animationDelay: '1s' }}>
          <Zap className="w-6 h-6" />
        </div>
        <div className="absolute top-1/2 right-32 text-accent animate-cyber-float" style={{ animationDelay: '2s' }}>
          <Cpu className="w-7 h-7" />
        </div>
        
        <Card className="glass-effect neural-glow scan-line animate-fade-in-up">
          <CardContent className="p-6 sm:p-8 md:p-12 lg:p-16">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="flex-1 lg:pr-8 text-center lg:text-left">
                <div className="inline-flex items-center space-x-2 bg-primary/20 px-4 sm:px-6 py-2 rounded-full border border-primary/30 mb-6 sm:mb-8 animate-neural-pulse">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-primary text-xs sm:text-sm font-medium tracking-wide font-display">Available for new opportunities</span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-4 sm:mb-6 text-neural font-display">
                  Saran Jaya Thilak
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-cyber font-light tracking-wide">
                  Data Scientist | Machine Learning | Cloud Infrastructure | CI/CD Automation Specialist
                </p>
                <p className="text-base sm:text-lg mb-8 sm:mb-10 text-muted-foreground max-w-3xl leading-relaxed mx-auto lg:mx-0">
                  Data science professional with extensive experience in machine learning, cloud infrastructure, and automation. Skilled in designing scalable cloud-native architectures (AWS, GCP) and building end-to-end CI/CD pipelines to optimize deployments and operations. Passionate about machine learning and developing reliable, scalable AI systems. Strong collaborator focused on delivering data-driven solutions aligned with business goals.
                </p>
                <div className="flex items-center justify-center lg:justify-start space-x-3 mb-8 sm:mb-10">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="text-foreground text-base sm:text-lg">Berlin, Germany</span>
                </div>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 items-center justify-center lg:justify-start">
                  <Button 
                    onClick={() => scrollToSection('projects')}
                    className="w-full sm:w-auto bg-neural-gradient hover:shadow-neural text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-xl transition-all duration-300 hover:scale-[1.03] animate-scale-in font-display"
                  >
                    Explore My Work
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button 
                    onClick={handleDownloadResume}
                    variant="outline" 
                    className="w-full sm:w-auto glass-effect border-primary/30 text-primary hover:bg-primary/20 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-xl transition-all duration-300 hover:scale-[1.03] animate-scale-in font-display"
                    style={{ animationDelay: '0.2s' }}
                  >
                    <Download className="mr-2 w-5 h-5" />
                    Download Resume
                  </Button>
                </div>
              </div>
              <div className="mt-8 lg:mt-0 lg:block">
                <div className="relative animate-slide-in-right">
                  <div className="w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-3xl overflow-hidden border-2 border-primary/30 shadow-neural bg-card-gradient mx-auto relative">
                    <div className="absolute inset-0 hologram-effect"></div>
                    <img 
                      src="/lovable-uploads/5881e7e5-f088-4e07-a79c-59eacb55eeb0.png" 
                      alt="Saran Jaya Thilak" 
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-700 relative z-10"
                    />
                  </div>
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-accent rounded-full border-2 border-card shadow-glow animate-glow-pulse"></div>
                  <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-secondary rounded-full border-2 border-card animate-glow-pulse" style={{ animationDelay: '1s' }}></div>
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
