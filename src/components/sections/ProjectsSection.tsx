import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/data/portfolio";
import SectionHeading from "@/components/ui/section-heading";
import Reveal from "@/components/ui/reveal";
import { motion } from "framer-motion";
import { Github, Star, GitFork, ExternalLink, Sparkles, Network, ImageIcon } from "lucide-react";
import productMatchingImg from "@/assets/project-product-matching.jpg";
import knowledgeAssistantImg from "@/assets/project-knowledge-assistant.jpg";
import divvyBikesImg from "@/assets/project-divvy-bikes.jpg";

const projectImages = [productMatchingImg, knowledgeAssistantImg, divvyBikesImg];

const GITHUB_USER = "saranjthilak";

const FEATURED_KEYWORDS = [
  "AI", "LLM", "RAG", "Machine Learning", "ML", "Data Engineering",
  "AWS", "Terraform", "Docker", "Kubernetes", "MLOps", "FAISS",
  "Triton", "OpenAI",
];

type Repo = {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics?: string[];
  fork: boolean;
  archived: boolean;
  pushed_at: string;
};

type Featured = Repo & { matched: string[] };

const matchKeywords = (repo: Repo): string[] => {
  const haystack = [
    repo.name,
    repo.description ?? "",
    (repo.topics ?? []).join(" "),
    repo.language ?? "",
  ]
    .join(" ")
    .toLowerCase();
  const found = new Set<string>();
  for (const kw of FEATURED_KEYWORDS) {
    const needle = kw.toLowerCase();
    const re = new RegExp(`(?:^|[^a-z0-9])${needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?:$|[^a-z0-9])`, "i");
    if (re.test(haystack)) found.add(kw);
  }
  return Array.from(found);
};

const inferAchievements = (repo: Repo): string[] => {
  const items: string[] = [];
  if (repo.stargazers_count > 0) items.push(`${repo.stargazers_count}★ on GitHub`);
  if (repo.forks_count > 0) items.push(`${repo.forks_count} forks`);
  if (repo.language) items.push(`Primary: ${repo.language}`);
  if (repo.topics && repo.topics.length > 0) items.push(`${repo.topics.length} curated topics`);
  if (items.length === 0) items.push("Actively maintained");
  return items.slice(0, 3);
};

const inferStack = (repo: Repo): string[] => {
  const stack = new Set<string>();
  if (repo.language) stack.add(repo.language);
  (repo.topics ?? []).slice(0, 8).forEach((t) => stack.add(t));
  return Array.from(stack).slice(0, 8);
};

const ProjectsSection = () => {
  const [repos, setRepos] = useState<Repo[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`, {
      headers: { Accept: "application/vnd.github.mercy-preview+json" },
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data: Repo[]) => {
        if (!cancelled) setRepos(data.filter((r) => !r.fork && !r.archived));
      })
      .catch(() => !cancelled && setError(true));
    return () => {
      cancelled = true;
    };
  }, []);

  const { featured, others } = useMemo(() => {
    if (!repos) return { featured: [] as Featured[], others: [] as Repo[] };
    const feat: Featured[] = [];
    const rest: Repo[] = [];
    for (const r of repos) {
      const matched = matchKeywords(r);
      if (matched.length > 0) feat.push({ ...r, matched });
      else rest.push(r);
    }
    feat.sort((a, b) => b.matched.length - a.matched.length || b.stargazers_count - a.stargazers_count);
    return { featured: feat, others: rest };
  }, [repos]);

  return (
    <section id="projects" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Featured Projects" tag="Builds" />

        {/* Curated showcase */}
        <div className="grid gap-6 md:gap-8 sm:grid-cols-2 mb-20">
          {projects.map((project, index) => (
            <Reveal key={index} delay={index * 0.1} direction={index % 2 === 0 ? "right" : "left"} className="h-full">
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="h-full"
              >
                <Card className="glass rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-500 hover:shadow-elegant group flex flex-col h-full relative">
                  <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative overflow-hidden aspect-[16/9] border-b border-border">
                    <img
                      src={projectImages[index]}
                      alt={`${project.title} preview`}
                      loading="lazy"
                      width={800}
                      height={450}
                      className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent pointer-events-none" />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md glass">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      <span className="text-[10px] tracking-[0.2em] uppercase text-foreground/80 font-mono">Live</span>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="font-display text-xl sm:text-2xl font-semibold text-foreground group-hover:text-gradient-primary transition-colors tracking-tight">{project.title}</CardTitle>
                    <CardDescription className="text-muted-foreground pt-1 text-[11px] uppercase tracking-[0.2em] font-mono">{project.source}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-between">
                    <p className="text-muted-foreground mb-6 text-sm sm:text-base leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.skills.map((skill) => (
                        <Badge key={skill} className="bg-secondary/60 border border-border text-foreground/80 hover:border-primary/40 hover:bg-primary/10 px-2.5 py-1 text-[10px] tracking-[0.1em] uppercase font-mono font-medium rounded-md">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* From GitHub */}
        <div className="mb-10 flex items-end justify-between flex-wrap gap-3">
          <div>
            <div className="text-[11px] tracking-[0.3em] uppercase font-mono text-primary/80 mb-2">From GitHub</div>
            <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-gradient-primary">
              Featured Repositories
            </h3>
            <p className="text-muted-foreground text-sm mt-2 max-w-2xl">
              Auto-curated from <span className="font-mono text-foreground/80">@{GITHUB_USER}</span> based on keywords:
              AI · LLM · RAG · MLOps · AWS · Terraform · Docker · Kubernetes · FAISS · Triton · OpenAI.
            </p>
          </div>
          <a
            href={`https://github.com/${GITHUB_USER}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.15em] uppercase glass px-4 py-2 rounded-lg hover:border-primary/50 transition-colors"
          >
            <Github className="w-4 h-4" /> View all
          </a>
        </div>

        {error && (
          <div className="glass rounded-2xl p-8 text-center text-muted-foreground text-sm">
            Could not load GitHub repositories right now.
          </div>
        )}

        {!repos && !error && (
          <div className="grid gap-6 md:gap-8 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="glass rounded-2xl h-80 animate-pulse" />
            ))}
          </div>
        )}

        {featured.length > 0 && (
          <div className="grid gap-6 md:gap-8 lg:grid-cols-2">
            {featured.map((repo, index) => (
              <Reveal key={repo.id} delay={index * 0.08} direction="up" className="h-full">
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className="h-full"
                >
                  <Card className="glass rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-500 hover:shadow-elegant group flex flex-col h-full relative">
                    {/* Featured ribbon */}
                    <div className="absolute top-3 right-3 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md glass border border-primary/40">
                      <Sparkles className="w-3 h-3 text-primary" />
                      <span className="text-[10px] tracking-[0.2em] uppercase text-foreground/80 font-mono">Featured</span>
                    </div>

                    {/* Screenshot + Architecture placeholders */}
                    <div className="grid grid-cols-2 border-b border-border">
                      <div className="relative aspect-[16/10] bg-gradient-to-br from-primary/10 via-background to-accent/10 flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 cyber-grid opacity-30" />
                        <ImageIcon className="w-8 h-8 text-foreground/30" />
                        <span className="absolute bottom-2 left-2 text-[9px] tracking-[0.2em] uppercase font-mono text-muted-foreground">Screenshot</span>
                      </div>
                      <div className="relative aspect-[16/10] bg-gradient-to-br from-accent/10 via-background to-primary/10 flex items-center justify-center overflow-hidden border-l border-border">
                        <div className="absolute inset-0 cyber-grid opacity-30" />
                        <Network className="w-8 h-8 text-foreground/30" />
                        <span className="absolute bottom-2 left-2 text-[9px] tracking-[0.2em] uppercase font-mono text-muted-foreground">Architecture</span>
                      </div>
                    </div>

                    <CardHeader>
                      <div className="flex items-start justify-between gap-3">
                        <CardTitle className="font-display text-xl sm:text-2xl font-semibold text-foreground group-hover:text-gradient-primary transition-colors tracking-tight">
                          {repo.name}
                        </CardTitle>
                        <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground shrink-0 pt-1">
                          <span className="inline-flex items-center gap-1"><Star className="w-3 h-3" />{repo.stargazers_count}</span>
                          <span className="inline-flex items-center gap-1"><GitFork className="w-3 h-3" />{repo.forks_count}</span>
                        </div>
                      </div>
                      <CardDescription className="text-muted-foreground pt-1 text-[11px] uppercase tracking-[0.2em] font-mono">
                        {repo.matched.slice(0, 4).join(" · ")}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="flex-grow flex flex-col gap-5">
                      {/* Problem solved */}
                      <div>
                        <div className="text-[10px] tracking-[0.25em] uppercase font-mono text-primary/80 mb-1.5">Problem</div>
                        <p className="text-foreground/80 text-sm leading-relaxed">
                          {repo.description || "Open-source project addressing real-world engineering challenges using modern AI and cloud-native tooling."}
                        </p>
                      </div>

                      {/* Stack */}
                      <div>
                        <div className="text-[10px] tracking-[0.25em] uppercase font-mono text-primary/80 mb-2">Tech Stack</div>
                        <div className="flex flex-wrap gap-2">
                          {inferStack(repo).map((s) => (
                            <Badge key={s} className="bg-secondary/60 border border-border text-foreground/80 hover:border-primary/40 hover:bg-primary/10 px-2.5 py-1 text-[10px] tracking-[0.1em] uppercase font-mono font-medium rounded-md">
                              {s}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Achievements */}
                      <div>
                        <div className="text-[10px] tracking-[0.25em] uppercase font-mono text-primary/80 mb-2">Key Achievements</div>
                        <ul className="space-y-1.5">
                          {inferAchievements(repo).map((a) => (
                            <li key={a} className="flex items-start gap-2 text-sm text-foreground/80">
                              <span className="mt-1.5 w-1 h-1 rounded-full bg-primary shrink-0" />
                              {a}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Links */}
                      <div className="flex items-center gap-3 pt-2 mt-auto border-t border-border/50">
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.15em] uppercase px-3 py-2 rounded-lg bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 transition-colors"
                        >
                          <Github className="w-3.5 h-3.5" /> Repo
                        </a>
                        {repo.homepage && (
                          <a
                            href={repo.homepage}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.15em] uppercase px-3 py-2 rounded-lg glass hover:border-primary/40 transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" /> Live
                          </a>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </Reveal>
            ))}
          </div>
        )}

        {/* Other repos */}
        {others.length > 0 && (
          <div className="mt-16">
            <div className="text-[11px] tracking-[0.3em] uppercase font-mono text-muted-foreground mb-6">
              More Repositories
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {others.slice(0, 9).map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="glass rounded-xl p-5 hover:border-primary/40 hover:shadow-elegant transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-display text-base font-semibold text-foreground group-hover:text-gradient-primary tracking-tight truncate">
                      {repo.name}
                    </span>
                    <Github className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3 min-h-[2rem]">
                    {repo.description || "No description provided."}
                  </p>
                  <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground">
                    {repo.language && <span>{repo.language}</span>}
                    <span className="inline-flex items-center gap-1"><Star className="w-3 h-3" />{repo.stargazers_count}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;

