import { Github, Linkedin, Mail, Phone, Sparkles, Volume2, VolumeX, Music, Music2 } from "lucide-react";
import { navigation } from "@/data/portfolio";
import { useUiSound } from "@/hooks/use-ui-sound";
import { useAmbientMusic } from "@/hooks/use-ambient-music";
import { useState, useRef, useEffect } from "react";

interface SidebarProps {
  activeSection: string;
  scrollToSection: (id: string) => void;
}

const Sidebar = ({ activeSection, scrollToSection }: SidebarProps) => {
  const { muted, toggleMuted, play } = useUiSound();
  const { playing: musicOn, toggle: toggleMusic, volume, setVolume } = useAmbientMusic();
  const [showVol, setShowVol] = useState(false);
  const volTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleVolChange = (v: number) => {
    setVolume(v);
    setShowVol(true);
    if (volTimer.current) clearTimeout(volTimer.current);
    volTimer.current = setTimeout(() => setShowVol(false), 2500);
  };

  useEffect(() => () => { if (volTimer.current) clearTimeout(volTimer.current); }, []);
  return (
    <div className="fixed left-0 top-0 h-full w-72 bg-black/20 backdrop-blur-xl border-r border-white/10 z-10">
      <div className="p-8">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-white font-bold text-xl tracking-wide">Portfolio</h2>
          </div>
          <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => { play("click"); toggleMusic(); }}
            onMouseEnter={() => play("hover")}
            aria-label={musicOn ? "Pause ambient music" : "Play ambient music"}
            title={musicOn ? "Music on" : "Music off"}
            className={`relative w-9 h-9 rounded-lg flex items-center justify-center border transition-all duration-300 ${
              musicOn
                ? "bg-fuchsia-500/10 border-fuchsia-400/40 text-fuchsia-300 shadow-[0_0_12px_rgba(232,121,249,0.35)]"
                : "bg-white/5 border-white/10 text-white/50 hover:text-white/80 hover:border-white/20"
            }`}
          >
            {musicOn ? <Music2 className="w-4 h-4" /> : <Music className="w-4 h-4" />}
            {musicOn && (
              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-fuchsia-400 animate-pulse" />
            )}
          </button>
          <button
            type="button"
            onClick={toggleMuted}
            aria-label={muted ? "Enable UI sounds" : "Mute UI sounds"}
            title={muted ? "Sound off" : "Sound on"}
            className={`relative w-9 h-9 rounded-lg flex items-center justify-center border transition-all duration-300 ${
              muted
                ? "bg-white/5 border-white/10 text-white/50 hover:text-white/80 hover:border-white/20"
                : "bg-cyan-500/10 border-cyan-400/40 text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.35)]"
            }`}
          >
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            {!muted && (
              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            )}
          </button>
          </div>
        </div>
        
        <nav className="space-y-3">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => { play("click"); scrollToSection(item.id); }}
              onMouseEnter={() => play("hover")}
              className={`w-full flex items-center space-x-4 px-6 py-4 rounded-xl transition-all duration-300 group ${
                activeSection === item.id
                  ? "bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-white border border-blue-500/30 shadow-lg shadow-blue-500/25"
                  : "text-white/70 hover:bg-white/10 hover:text-white hover:transform hover:translate-x-1"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-semibold tracking-wide">{item.label}</span>
              {activeSection === item.id && (
                <div className="ml-auto w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              )}
            </button>
          ))}
        </nav>
        
        <div className="mt-12 space-y-4">
          <h3 className="text-white/70 text-sm font-medium uppercase tracking-wider">Connect</h3>
          <div className="grid grid-cols-2 gap-3">
            <a onMouseEnter={() => play("hover")} onClick={() => play("click")} href="https://www.linkedin.com/in/saranjayathilak" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-2 p-3 bg-white/10 hover:bg-blue-500/20 rounded-xl transition-all duration-300 group">
              <Linkedin className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
            </a>
            <a onMouseEnter={() => play("hover")} onClick={() => play("click")} href="https://github.com/saranjthilak" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-2 p-3 bg-white/10 hover:bg-gray-500/20 rounded-xl transition-all duration-300 group">
              <Github className="w-4 h-4 text-gray-400 group-hover:scale-110 transition-transform" />
            </a>
            <a onMouseEnter={() => play("hover")} onClick={() => play("click")} href="tel:+491744614592" className="flex items-center justify-center space-x-2 p-3 bg-white/10 hover:bg-green-500/20 rounded-xl transition-all duration-300 group">
              <Phone className="w-4 h-4 text-green-400 group-hover:scale-110 transition-transform" />
            </a>
            <a onMouseEnter={() => play("hover")} onClick={() => play("click")} href="mailto:saranjthilak@gmail.com" className="flex items-center justify-center space-x-2 p-3 bg-white/10 hover:bg-red-500/20 rounded-xl transition-all duration-300 group">
              <Mail className="w-4 h-4 text-red-400 group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
