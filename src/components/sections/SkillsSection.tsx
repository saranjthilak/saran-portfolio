import SectionHeading from "@/components/ui/section-heading";
import NeuralSkillsNetwork from "@/components/skills/NeuralSkillsNetwork";
import SkillsStackFallback from "@/components/skills/SkillsStackFallback";
import { useIsMobile } from "@/hooks/use-mobile";

const SkillsSection = () => {
  const isMobile = useIsMobile();
  return (
    <section id="skills" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Skill Network"
          tag="Tech Arsenal"
          subtitle="My core toolkit organized by domain — hover any skill to inspect proficiency, or click a domain header to isolate."
        />
        {isMobile ? <SkillsStackFallback /> : <NeuralSkillsNetwork />}
      </div>
    </section>
  );
};

export default SkillsSection;