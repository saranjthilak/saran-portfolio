
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { publications } from "@/data/portfolio";

const PublicationsSection = () => {
  return (
    <section id="publications" className="py-24 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6">Publications</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
        </div>
        <div className="space-y-8">
          {publications.map((pub, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
              <CardContent className="p-8">
                <div className="flex items-start justify-between">
                  <div className="flex-1 pr-8">
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-200 transition-colors">{pub.title}</h3>
                    <p className="text-white/70 mb-6 text-lg leading-relaxed">{pub.description}</p>
                    <div className="flex items-center space-x-6">
                      <Badge className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 border-blue-500/30 text-blue-300 px-4 py-2">
                        {pub.journal}
                      </Badge>
                      <span className="text-white/60 text-lg">{pub.date}</span>
                    </div>
                  </div>
                  <a href={pub.link} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="sm" className="text-blue-300 hover:text-white hover:bg-blue-500/20 rounded-2xl group-hover:scale-110 transition-all duration-300">
                      <ExternalLink className="w-5 h-5" />
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PublicationsSection;
