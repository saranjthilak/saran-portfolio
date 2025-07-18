import { Github, Linkedin, Mail, Phone, Sparkles } from "lucide-react";
import { navigation } from "@/data/portfolio";

interface SidebarProps {
  activeSection: string;
  scrollToSection: (id: string) => void;
}

const Sidebar = ({ activeSection, scrollToSection }: SidebarProps) => {
  return (
    <div className="fixed left-0 top-0 h-full w-72 glass border-r border-border/50 z-50 animate-slide-in">
      <div className="p-8">
        <div className="flex items-center space-x-3 mb-12">
          <div className="w-10 h-10 gradient-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/25 animate-glow">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-foreground font-bold text-xl tracking-wide">Portfolio</h2>
        </div>
        
        <nav className="space-y-2">
          {navigation.map((item, index) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all duration-300 group animate-fade-in-up ${
                activeSection === item.id
                  ? "glass border border-primary/30 text-primary shadow-lg shadow-primary/20 hover-glow"
                  : "text-muted-foreground hover:glass hover:text-foreground hover:transform hover:translate-x-1"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-semibold tracking-wide">{item.label}</span>
              {activeSection === item.id && (
                <div className="ml-auto w-2 h-2 bg-primary rounded-full animate-glow"></div>
              )}
            </button>
          ))}
        </nav>
        
        <div className="mt-12 space-y-4">
          <h3 className="text-muted-foreground text-sm font-medium uppercase tracking-wider">Connect</h3>
          <div className="grid grid-cols-2 gap-3">
            <a 
              href="https://www.linkedin.com/in/saranjayathilak" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center p-3 glass rounded-2xl transition-all duration-300 group hover-glow hover:border-blue-400/50"
            >
              <Linkedin className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
            </a>
            <a 
              href="https://github.com/saranjthilak" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center p-3 glass rounded-2xl transition-all duration-300 group hover-glow hover:border-gray-400/50"
            >
              <Github className="w-4 h-4 text-muted-foreground group-hover:scale-110 transition-transform group-hover:text-foreground" />
            </a>
            <a 
              href="tel:+491744614592" 
              className="flex items-center justify-center p-3 glass rounded-2xl transition-all duration-300 group hover-glow hover:border-green-400/50"
            >
              <Phone className="w-4 h-4 text-green-400 group-hover:scale-110 transition-transform" />
            </a>
            <a 
              href="mailto:saranjthilak@gmail.com" 
              className="flex items-center justify-center p-3 glass rounded-2xl transition-all duration-300 group hover-glow hover:border-red-400/50"
            >
              <Mail className="w-4 h-4 text-red-400 group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
