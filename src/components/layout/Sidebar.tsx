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

  return (
    <aside className="fixed left-0 top-0 h-full w-20 z-20 flex flex-col items-center py-6 bg-[hsl(var(--surface-2))] border-r border-border">
      {/* Monogram */}
      <div className="w-10 h-10 mb-10 bg-primary flex items-center justify-center font-bold text-[13px] text-primary-foreground tracking-tighter">
        SJT
      </div>

      {/* Nav */}
      <nav className="flex-1 flex flex-col items-center gap-0.5">
        {navigation.map((item, index) => {
          const Icon = iconMap[item.id] ?? Home;
          const active = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => { play("click"); scrollToSection(item.id); }}
              onMouseEnter={() => play("hover")}
              aria-label={item.label}
              title={item.label}
              className={`relative group w-full py-2.5 flex flex-col items-center justify-center gap-0.5 transition-colors ${
                active ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-0.5 bg-primary" />
              )}
              {/* Chapter number */}
              <span className={`font-mono text-[7px] tracking-[0.15em] transition-colors ${
                active ? "text-primary" : "text-muted-foreground/40 group-hover:text-muted-foreground/60"
              }`}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <Icon className="w-4 h-4" strokeWidth={1.75} />
              {/* Tooltip */}
              <span className="pointer-events-none absolute left-full ml-3 px-2 py-1 bg-[hsl(var(--surface))] border border-border text-foreground text-[10px] font-mono uppercase tracking-[0.2em] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all whitespace-nowrap z-30">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Audio toggles */}
      <div className="flex flex-col items-center gap-2 mb-4">
        <button
          type="button"
          onClick={() => { play("click"); toggleMusic(); }}
          aria-label={musicOn ? "Pause ambient music" : "Play ambient music"}
          title={musicOn ? "Music on" : "Music off"}
          className={`w-8 h-8 flex items-center justify-center border transition-colors ${
            musicOn
              ? "border-primary/50 text-primary"
              : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/40"
          }`}
        >
          {musicOn ? <Music2 className="w-3.5 h-3.5" /> : <Music className="w-3.5 h-3.5" />}
        </button>
        <button
          type="button"
          onClick={toggleMuted}
          aria-label={muted ? "Enable UI sounds" : "Mute UI sounds"}
          title={muted ? "Sound off" : "Sound on"}
          className={`w-8 h-8 flex items-center justify-center border transition-colors ${
            muted
              ? "border-border text-muted-foreground hover:text-foreground hover:border-foreground/40"
              : "border-primary/50 text-primary"
          }`}
        >
          {muted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Connect icons */}
      <div className="flex flex-col items-center gap-2 pt-4 border-t border-border w-8">
        <a onMouseEnter={() => play("hover")} onClick={() => play("click")} href="https://www.linkedin.com/in/saranjayathilak" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors p-1.5">
          <Linkedin className="w-3.5 h-3.5" />
        </a>
        <a onMouseEnter={() => play("hover")} onClick={() => play("click")} href="https://github.com/saranjthilak" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-primary transition-colors p-1.5">
          <Github className="w-3.5 h-3.5" />
        </a>
        <a onMouseEnter={() => play("hover")} onClick={() => play("click")} href="mailto:saranjthilak@gmail.com" aria-label="Email" className="text-muted-foreground hover:text-primary transition-colors p-1.5">
          <Mail className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Version stamp */}
      <div className="mt-4 [writing-mode:vertical-lr] rotate-180 font-mono text-[9px] tracking-[0.2em] text-muted-foreground/60">
        V.03—26
      </div>
    </aside>
  );
};

export default Sidebar;
