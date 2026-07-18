import { Github, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SectionHeading from "@/components/ui/section-heading";
import Reveal from "@/components/ui/reveal";
import { projects as curatedProjects } from "@/data/portfolio";
import productMatchingImg from "@/assets/project-product-matching.jpg";
import knowledgeAssistantImg from "@/assets/project-knowledge-assistant.jpg";
import divvyBikesImg from "@/assets/project-divvy-bikes.jpg";
import { useRef, useState, useEffect, useCallback } from "react";

const IMAGE_MAP: Record<string, string> = {
  "/src/assets/project-product-matching.jpg": productMatchingImg,
  "/src/assets/project-knowledge-assistant.jpg": knowledgeAssistantImg,
  "/src/assets/project-divvy-bikes.jpg": divvyBikesImg,
};

const featuredProjects = curatedProjects.filter((p) => p.featured);
const otherProjects = curatedProjects.filter((p) => !p.featured);

const ProjectsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);

    /* figure out which card is centred */
    const cards = el.querySelectorAll<HTMLElement>("[data-project-card]");
    let closestIdx = 0;
    let closestDist = Infinity;
    const center = el.scrollLeft + el.clientWidth / 2;
    cards.forEach((card, i) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const dist = Math.abs(cardCenter - center);
      if (dist < closestDist) {
        closestDist = dist;
        closestIdx = i;
      }
    });
    setActiveIdx(closestIdx);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    updateScrollState();
    return () => el.removeEventListener("scroll", updateScrollState);
  }, [updateScrollState]);

  const scrollTo = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector<HTMLElement>("[data-project-card]")?.offsetWidth ?? 400;
    const gap = 24; // matches gap-6
    el.scrollBy({ left: dir === "left" ? -(cardWidth + gap) : cardWidth + gap, behavior: "smooth" });
  };

  const scrollToIdx = (idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>("[data-project-card]");
    if (cards[idx]) {
      const cardCenter = cards[idx].offsetLeft + cards[idx].offsetWidth / 2;
      const containerCenter = el.clientWidth / 2;
      el.scrollTo({ left: cardCenter - containerCenter, behavior: "smooth" });
    }
  };

  return (
    <section id="projects" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Projects" tag="GitHub" index="05" />

        {/* ── Featured: Horizontal Scroll Showcase ── */}
        <div className="mb-16">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <div className="text-[11px] tracking-[0.3em] uppercase font-mono text-primary/80 mb-1">Selected Work</div>
              <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-gradient-primary">
                Featured Projects
              </h3>
            </div>
            {/* Arrow navigation */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => scrollTo("left")}
                disabled={!canScrollLeft}
                className="w-9 h-9 border border-border flex items-center justify-center text-foreground hover:bg-primary/10 hover:border-primary/40 disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:border-border transition-colors"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollTo("right")}
                disabled={!canScrollRight}
                className="w-9 h-9 border border-border flex items-center justify-center text-foreground hover:bg-primary/10 hover:border-primary/40 disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:border-border transition-colors"
                aria-label="Next project"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Scrollable container */}
          <div className="relative">
            {/* Left fade */}
            {canScrollLeft && (
              <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none bg-gradient-to-r from-background to-transparent" />
            )}
            {/* Right fade */}
            {canScrollRight && (
              <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none bg-gradient-to-l from-background to-transparent" />
            )}

            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto scroll-snap-x pb-4 -mx-4 px-4 scrollbar-hide"
              style={{
                scrollSnapType: "x mandatory",
                WebkitOverflowScrolling: "touch",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {featuredProjects.map((p, i) => (
                <div
                  key={p.title}
                  data-project-card
                  className="flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-[50vw] lg:w-[420px] xl:w-[460px] scroll-snap-center"
                  style={{
                    scrollSnapAlign: "center",
                    perspective: "1200px",
                  }}
                >
                  <Reveal delay={i * 0.08} direction="up" className="h-full">
                    <Card
                      className={`glass rounded-2xl overflow-hidden h-full flex flex-col group transition-all duration-500 ${
                        activeIdx === i
                          ? "border-primary/50 shadow-glow scale-[1.02]"
                          : "border-border hover:border-primary/30 hover:shadow-elegant scale-100"
                      }`}
                      style={{
                        transition: "transform 500ms cubic-bezier(0.22,1,0.36,1), border-color 400ms, box-shadow 400ms",
                      }}
                    >
                      {p.image ? (
                        <div className="relative aspect-[16/10] overflow-hidden border-b border-border/50 hover-distort">
                          <img
                            src={IMAGE_MAP[p.image] ?? p.image}
                            alt={p.title}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                          {/* Hover grid overlay */}
                          <div className="hover-grid-reveal pointer-events-none absolute inset-0 z-10" />
                          {/* Project number badge */}
                          <div className="absolute top-3 left-3 font-mono text-[10px] tracking-[0.2em] uppercase px-2 py-1 bg-background/80 backdrop-blur-sm border border-border text-primary z-20">
                            {String(i + 1).padStart(2, "0")}
                          </div>
                        </div>
                      ) : (
                        <div className="relative aspect-[16/10] overflow-hidden border-b border-border/50 bg-secondary/40 flex items-center justify-center">
                          <div
                            className="absolute inset-0 opacity-40"
                            style={{
                              backgroundImage:
                                "linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)",
                              backgroundSize: "24px 24px",
                            }}
                            aria-hidden
                          />
                          <Github className="relative w-10 h-10 text-primary/70" aria-hidden />
                        </div>
                      )}
                      <CardHeader className="pb-3">
                        <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-primary/80 mb-1">
                          {p.source}
                        </div>
                        <CardTitle className="font-display text-xl font-semibold tracking-tight group-hover:text-gradient-primary transition-colors">
                          {p.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow flex flex-col gap-4">
                        <p className="text-foreground/75 text-sm leading-relaxed">{p.description}</p>
                        <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                          {p.skills.map((s) => (
                            <Badge
                              key={s}
                              className="bg-primary/10 border border-primary/30 text-primary px-2 py-0.5 text-[10px] tracking-[0.1em] uppercase font-mono font-medium rounded-md"
                            >
                              {s}
                            </Badge>
                          ))}
                        </div>
                        {p.url && (
                          <a
                            href={p.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 self-start text-[10px] font-mono tracking-[0.2em] uppercase px-3 py-2 rounded-lg bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 transition-colors"
                            aria-label={`View ${p.title} on GitHub`}
                          >
                            <Github className="w-3.5 h-3.5" aria-hidden /> View Repo
                            <ExternalLink className="w-3 h-3 opacity-70" aria-hidden />
                          </a>
                        )}
                      </CardContent>
                    </Card>
                  </Reveal>
                </div>
              ))}
            </div>

            {/* Dot indicators */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {featuredProjects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToIdx(i)}
                  aria-label={`Go to project ${i + 1}`}
                  className={`transition-all duration-300 rounded-full ${
                    activeIdx === i
                      ? "w-6 h-2 bg-primary"
                      : "w-2 h-2 bg-border hover:bg-muted-foreground"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── Other Projects: Compact Grid ── */}
        {otherProjects.length > 0 && (
          <div>
            <div className="mb-6">
              <div className="text-[11px] tracking-[0.3em] uppercase font-mono text-muted-foreground/60 mb-1">Open Source</div>
              <h3 className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-foreground/80">
                Other Projects
              </h3>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {otherProjects.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.06} direction="up" className="h-full">
                  <Card className="glass rounded-xl overflow-hidden h-full flex flex-col group hover:border-primary/30 transition-all duration-400">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2 mb-1">
                        <Github className="w-4 h-4 text-primary/60" />
                        <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-muted-foreground">{p.source}</span>
                      </div>
                      <CardTitle className="font-display text-base font-semibold tracking-tight group-hover:text-primary transition-colors">
                        {p.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col gap-3 pt-0">
                      <p className="text-foreground/65 text-xs leading-relaxed line-clamp-3">{p.description}</p>
                      <div className="flex flex-wrap gap-1 mt-auto">
                        {p.skills.map((s) => (
                          <Badge
                            key={s}
                            className="bg-muted/50 border border-border text-muted-foreground px-1.5 py-0 text-[9px] tracking-[0.1em] uppercase font-mono rounded"
                          >
                            {s}
                          </Badge>
                        ))}
                      </div>
                      {p.url && (
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 self-start text-[9px] font-mono tracking-[0.15em] uppercase text-primary/70 hover:text-primary transition-colors"
                          aria-label={`View ${p.title} on GitHub`}
                        >
                          View Repo <ExternalLink className="w-2.5 h-2.5" aria-hidden />
                        </a>
                      )}
                    </CardContent>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
