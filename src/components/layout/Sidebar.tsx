import { Github, Linkedin, Mail, Phone, Sparkles } from "lucide-react";
import { navigation } from "@/data/portfolio";

interface SidebarProps {
  activeSection: string;
  scrollToSection: (id: string) => void;
}

const Sidebar = ({ activeSection, scrollToSection }: SidebarProps) => {
  return (
    <div className="fixed left-0 top-0 h-full w-72 glass-effect border-r border-primary/20 z-10 scan-line">
      <div className="p-8">
        <div className="flex items-center space-x-3 mb-12 animate-slide-in-left">
          <div className="w-10 h-10 bg-neural-gradient rounded-xl flex items-center justify-center neural-glow">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-foreground font-bold text-xl tracking-wide font-display">Portfolio</h2>
        </div>
        
        <nav className="space-y-3">
          {navigation.map((item, index) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`w-full flex items-center space-x-4 px-6 py-4 rounded-xl transition-all duration-300 group animate-fade-in-up ${
                activeSection === item.id
                  ? "bg-primary/20 text-primary border border-primary/30 neural-glow font-display"
                  : "text-muted-foreground hover:bg-primary/10 hover:text-primary hover:transform hover:translate-x-1"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-semibold tracking-wide">{item.label}</span>
              {activeSection === item.id && (
                <div className="ml-auto w-2 h-2 bg-primary rounded-full animate-glow-pulse"></div>
              )}
            </button>
          ))}
        </nav>
        
        <div className="mt-12 space-y-4 animate-fade-in-up" style={{ animationDelay: '1s' }}>
          <h3 className="text-muted-foreground text-sm font-medium uppercase tracking-wider font-display">Connect</h3>
          <div className="grid grid-cols-2 gap-3">
            <a href="https://www.linkedin.com/in/saranjayathilak" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-2 p-3 glass-effect hover:bg-primary/20 hover:border-primary/30 rounded-xl transition-all duration-300 group border border-muted">
              <Linkedin className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
            </a>
            <a href="https://github.com/saranjthilak" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-2 p-3 glass-effect hover:bg-muted/20 hover:border-muted-foreground/30 rounded-xl transition-all duration-300 group border border-muted">
              <Github className="w-4 h-4 text-muted-foreground group-hover:scale-110 transition-transform" />
            </a>
            <a href="tel:+491744614592" className="flex items-center justify-center space-x-2 p-3 glass-effect hover:bg-accent/20 hover:border-accent/30 rounded-xl transition-all duration-300 group border border-muted">
              <Phone className="w-4 h-4 text-accent group-hover:scale-110 transition-transform" />
            </a>
            <a href="mailto:saranjthilak@gmail.com" className="flex items-center justify-center space-x-2 p-3 glass-effect hover:bg-destructive/20 hover:border-destructive/30 rounded-xl transition-all duration-300 group border border-muted">
              <Mail className="w-4 h-4 text-destructive group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
