import {
  Github,
  Linkedin,
  Mail,
  Home,
  User,
  Briefcase,
  Zap,
  Rocket,
  BookOpen,
  GraduationCap,
  Trophy,
  MessageSquare,
  Volume2,
  VolumeX,
  Music,
  Music2,
} from "lucide-react";
import { navigation } from "@/data/portfolio";
import { useUiSound } from "@/hooks/use-ui-sound";
import { useAmbientMusic } from "@/hooks/use-ambient-music";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const iconMap: Record<string, typeof Home> = {
  home: Home,
  about: User,
  experience: Briefcase,
  skills: Zap,
  projects: Rocket,
  publications: BookOpen,
  education: GraduationCap,
  certifications: Trophy,
  contact: MessageSquare,
};

interface SidebarProps {
  activeSection: string;
  scrollToSection: (id: string) => void;
}

const Sidebar = ({ activeSection, scrollToSection }: SidebarProps) => {
  const { muted, toggleMuted, play } = useUiSound();
  const { playing: musicOn, toggle: toggleMusic } = useAmbientMusic();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const springConfig = { type: "spring", stiffness: 300, damping: 20 };

  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.5 }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 sm:gap-2 px-3 py-2 rounded-full glass border border-white/10 shadow-2xl bg-background/80"
    >
      {/* Navigation Items */}
      {navigation.map((item) => {
        const Icon = iconMap[item.id] ?? Home;
        const active = activeSection === item.id;
        
        return (
          <button
            key={item.id}
            onMouseEnter={() => { play("hover"); setHoveredItem(item.id); }}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={() => { play("click"); scrollToSection(item.id); }}
            className={`relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full transition-colors duration-300 ${
              active ? "text-primary" : "text-muted-foreground hover:text-foreground hover:bg-white/5"
            }`}
          >
            {active && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 rounded-full bg-white/10"
                transition={springConfig}
              />
            )}
            <Icon className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" />
            
            {/* Tooltip */}
            <AnimatePresence>
              {hoveredItem === item.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="absolute -top-12 px-3 py-1.5 rounded-lg glass text-xs font-medium whitespace-nowrap"
                >
                  {item.label}
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        );
      })}

      <div className="w-px h-6 bg-white/10 mx-1 sm:mx-2" />

      {/* Audio Controls */}
      <button
        onClick={() => { play("click"); toggleMusic(); }}
        className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full transition-colors ${
          musicOn ? "text-primary bg-white/5" : "text-muted-foreground hover:text-foreground hover:bg-white/5"
        }`}
      >
        {musicOn ? <Music2 className="w-4 h-4 sm:w-5 sm:h-5" /> : <Music className="w-4 h-4 sm:w-5 sm:h-5" />}
      </button>

      <button
        onClick={toggleMuted}
        className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full transition-colors ${
          !muted ? "text-primary bg-white/5" : "text-muted-foreground hover:text-foreground hover:bg-white/5"
        }`}
      >
        {!muted ? <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" /> : <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />}
      </button>

    </motion.div>
  );
};

export default Sidebar;
