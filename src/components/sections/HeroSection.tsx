
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
        <Card className="glass-card border-border/50 hover-glow">
          <CardContent className="p-6 sm:p-8 md:p-12 lg:p-16">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="flex-1 lg:pr-8 text-center lg:text-left">
                <div className="inline-flex items-center space-x-2 glass rounded-full px-4 sm:px-6 py-2 mb-6 sm:mb-8 hover-glow">
                  <Sparkles className="w-4 h-4 text-primary animate-glow" />
                  <span className="text-primary font-medium tracking-wide text-xs sm:text-sm">Available for new opportunities</span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-4 sm:mb-6 text-gradient">
                  Saran Jaya Thilak
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-muted-foreground font-light tracking-wide">
                  Data Scientist | Machine Learning | Cloud Infrastructure | CI/CD Automation Specialist
                </p>
                <p className="text-base sm:text-lg mb-8 sm:mb-10 text-foreground/80 max-w-3xl leading-relaxed mx-auto lg:mx-0">
                  Data science professional with extensive experience in machine learning, cloud infrastructure, and automation. Skilled in designing scalable cloud-native architectures (AWS, GCP) and building end-to-end CI/CD pipelines to optimize deployments and operations. Passionate about machine learning and developing reliable, scalable AI systems. Strong collaborator focused on delivering data-driven solutions aligned with business goals.
                </p>
                <div className="flex items-center justify-center lg:justify-start space-x-3 mb-8 sm:mb-10">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="text-foreground/80 text-base sm:text-lg">Berlin, Germany</span>
                </div>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 items-center justify-center lg:justify-start">
                  <Button 
                    onClick={() => scrollToSection('projects')}
                    className="w-full sm:w-auto gradient-primary hover:opacity-90 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-2xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 hover:scale-[1.03] border-0"
                  >
                    Explore My Work
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button 
                    onClick={handleDownloadResume}
                    variant="outline" 
                    className="w-full sm:w-auto glass border-border/50 text-foreground hover:bg-card/50 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-[1.03] hover-glow"
                  >
                    <Download className="mr-2 w-5 h-5" />
                    Download Resume
                  </Button>
                </div>
              </div>
              <div className="mt-8 lg:mt-0 lg:block">
                <div className="relative animate-float">
                  <div className="w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 glass-card border-2 border-primary/20 shadow-2xl shadow-primary/20 mx-auto overflow-hidden">
                    <img 
                      src="/lovable-uploads/5881e7e5-f088-4e07-a79c-59eacb55eeb0.png" 
                      alt="Saran Jaya Thilak" 
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full border-2 border-background shadow-lg animate-glow"></div>
                  
                  {/* Floating elements */}
                  <div className="absolute -top-8 -left-8 w-4 h-4 bg-primary/60 rounded-full animate-glow"></div>
                  <div className="absolute -bottom-6 -right-8 w-3 h-3 bg-accent/60 rounded-full animate-glow" style={{ animationDelay: '1s' }}></div>
                  <div className="absolute top-1/2 -left-12 w-2 h-2 bg-primary/40 rounded-full animate-glow" style={{ animationDelay: '2s' }}></div>
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
