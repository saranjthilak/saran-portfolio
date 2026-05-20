
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { publications } from "@/data/portfolio";
import HudFrame from "@/components/ui/hud-frame";
import SectionHeading from "@/components/ui/section-heading";

const PublicationsSection = () => {
  return (
    <section id="publications" className="py-24 px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Publications" tag="Research" />
        <div className="space-y-8">
          {publications.map((pub, index) => (
            <HudFrame key={index} scan variant="mixed">
            <Card className="bg-black/30 backdrop-blur-xl border border-cyan-400/20 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-500/30 group hover:border-cyan-400/50">
              <CardContent className="p-8">
                <div className="flex items-start justify-between">
                  <div className="flex-1 pr-8">
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-200 transition-colors tracking-wide">{pub.title}</h3>
                    <p className="text-white/70 mb-6 text-lg leading-relaxed">{pub.description}</p>
                    <div className="flex items-center space-x-6">
                      <Badge className="bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 border border-cyan-400/40 text-cyan-200 px-4 py-2 tracking-wider uppercase text-xs">
                        {pub.journal}
                      </Badge>
                      <span className="text-cyan-300/70 text-sm uppercase tracking-[0.2em]">{pub.date}</span>
                    </div>
                  </div>
                  <a href={pub.link} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="icon" className="text-cyan-300 hover:text-white hover:bg-cyan-500/20 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] rounded-xl group-hover:scale-110 transition-all duration-300 h-12 w-12 border border-cyan-400/30">
                      <ExternalLink className="w-6 h-6" />
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
            </HudFrame>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PublicationsSection;
