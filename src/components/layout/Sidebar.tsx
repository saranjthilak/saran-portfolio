
import { Github, Linkedin, Mail, Phone, Sparkles } from "lucide-react";
import { navigation } from "@/data/portfolio";

interface SidebarProps {
  activeSection: string;
  scrollToSection: (id: string) => void;
}

const Sidebar = ({ activeSection, scrollToSection }: SidebarProps) => {
  return (
    <div className="fixed left-0 top-0 h-full w-72 bg-white/10 backdrop-blur-xl border-r border-white/20 z-10">
      <div className="p-8">
        <div className="flex items-center space-x-3 mb-12">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-white font-bold text-xl">Portfolio</h2>
        </div>
        
        <nav className="space-y-3">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${
                activeSection === item.id
                  ? "bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-white border border-blue-500/30 shadow-lg shadow-blue-500/25"
                  : "text-white/70 hover:bg-white/10 hover:text-white hover:transform hover:translate-x-1"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
              {activeSection === item.id && (
                <div className="ml-auto w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              )}
            </button>
          ))}
        </nav>
        
        <div className="mt-12 space-y-4">
          <h3 className="text-white/70 text-sm font-medium uppercase tracking-wider">Connect</h3>
          <div className="grid grid-cols-2 gap-3">
            <a href="https://www.linkedin.com/in/saranjayathilak" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-2 p-3 bg-white/10 hover:bg-blue-500/20 rounded-xl transition-all duration-300 group">
              <Linkedin className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
            </a>
            <a href="https://github.com/saranjthilak" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-2 p-3 bg-white/10 hover:bg-gray-500/20 rounded-xl transition-all duration-300 group">
              <Github className="w-4 h-4 text-gray-400 group-hover:scale-110 transition-transform" />
            </a>
            <a href="tel:+491744614592" className="flex items-center justify-center space-x-2 p-3 bg-white/10 hover:bg-green-500/20 rounded-xl transition-all duration-300 group">
              <Phone className="w-4 h-4 text-green-400 group-hover:scale-110 transition-transform" />
            </a>
            <a href="mailto:saranjthilak@gmail.com" className="flex items-center justify-center space-x-2 p-3 bg-white/10 hover:bg-red-500/20 rounded-xl transition-all duration-300 group">
              <Mail className="w-4 h-4 text-red-400 group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
