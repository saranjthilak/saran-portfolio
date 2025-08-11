
import { Button } from "@/components/ui/button";

import { ArrowRight, Download, MapPin, Sparkles } from "lucide-react";

interface HeroSectionProps {
  scrollToSection: (id: string) => void;
  handleDownloadResume: () => void;
}

const HeroSection = ({ scrollToSection, handleDownloadResume }: HeroSectionProps) => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-4 sm:px-8 overflow-hidden">
      {/* holographic beam */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[48%] -translate-y-1/2 h-24 bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
      <div className="max-w-5xl mx-auto w-full">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 bg-secondary px-4 sm:px-6 py-2 rounded-full border border-border mb-6 sm:mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-secondary-foreground text-xs sm:text-sm font-medium tracking-wide">Available for new opportunities</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-3 text-transparent bg-clip-text bg-gradient-to-b from-foreground to-primary/70">
            Saran Jaya Thilak
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl mb-6 text-muted-foreground/90 font-light tracking-wide">
            Data Scientist | Machine Learning | Cloud Infrastructure | CI/CD Automation Specialist
          </p>

          <div className="my-6 sm:my-8">
            <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full overflow-hidden border border-border ring-1 ring-primary/20 shadow-glow mx-auto animate-neon">
              <img 
                src="/lovable-uploads/5881e7e5-f088-4e07-a79c-59eacb55eeb0.png" 
                alt="Saran Jaya Thilak" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <p className="text-base sm:text-lg mb-8 text-muted-foreground max-w-3xl leading-relaxed">
            Data science professional with extensive experience in machine learning, cloud infrastructure, and automation. Skilled in designing scalable cloud-native architectures (AWS, GCP) and building end-to-end CI/CD pipelines to optimize deployments and operations. Passionate about machine learning and developing reliable, scalable AI systems. Strong collaborator focused on delivering data-driven solutions aligned with business goals.
          </p>

          <div className="flex items-center justify-center gap-3 mb-8">
            <MapPin className="w-5 h-5 text-primary" />
            <span className="text-muted-foreground text-base sm:text-lg">Berlin, Germany</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Button 
              onClick={() => scrollToSection('projects')}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-xl"
            >
              Explore My Work
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              onClick={handleDownloadResume}
              variant="secondary" 
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-xl"
            >
              <Download className="mr-2 w-5 h-5" />
              Download Resume
            </Button>
          </div>
        </div>
      </div>
    </section>

  );
};

export default HeroSection;
