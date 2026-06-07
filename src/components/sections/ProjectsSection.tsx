import { useMemo } from "react";
import { Github, AlertCircle, Sparkles } from "lucide-react";
import SectionHeading from "@/components/ui/section-heading";
import Reveal from "@/components/ui/reveal";
import RepoCard from "@/components/projects/RepoCard";
import GitHubStats from "@/components/projects/GitHubStats";
import { useGitHubRepos, type GitHubRepo } from "@/hooks/use-github-repos";

const GITHUB_USER = "saranjthilak";

const FEATURED_KEYWORDS = [
  "AI", "LLM", "RAG", "Machine Learning", "ML", "Data Engineering",
  "AWS", "Terraform", "Docker", "Kubernetes", "MLOps", "FAISS",
  "Triton", "OpenAI",
];

function haystack(r: GitHubRepo): string {
  return [r.name, r.description ?? "", (r.topics ?? []).join(" "), r.language ?? ""].join(" ").toLowerCase();
}

function matchKeywords(r: GitHubRepo): string[] {
  const hay = haystack(r);
  const out = new Set<string>();
  for (const kw of FEATURED_KEYWORDS) {
    const needle = kw.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    if (new RegExp(`(?:^|[^a-z0-9])${needle}(?:$|[^a-z0-9])`, "i").test(hay)) out.add(kw);
  }
  return Array.from(out);
}

const ProjectsSection = () => {
  const { user, repos, loading, error } = useGitHubRepos(GITHUB_USER);

  const featured = useMemo(() => {
    if (!repos) return [] as Array<GitHubRepo & { matched: string[] }>;

    const enriched = repos.map((r) => ({ ...r, matched: matchKeywords(r) }));
    return enriched
      .filter((r) => r.matched.length > 0)
      .sort((a, b) => b.matched.length - a.matched.length || b.stargazers_count - a.stargazers_count);
  }, [repos]);

  return (
    <section id="projects" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Projects" tag="GitHub" />

        {/* Stats */}
        {user && repos && <GitHubStats user={user} repos={repos} />}

        {/* Loading skeleton */}
        {loading && (
          <div className="grid gap-6 md:gap-8 lg:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="glass rounded-2xl h-72 animate-pulse" />
            ))}
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="glass rounded-2xl p-8 text-center">
            <AlertCircle className="w-6 h-6 mx-auto mb-3 text-primary" aria-hidden />
            <p className="text-foreground/80 text-sm mb-1">Couldn't load GitHub data right now.</p>
            <p className="text-muted-foreground text-xs mb-4">{error}. You can still browse the profile directly.</p>
            <a
              href={`https://github.com/${GITHUB_USER}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.15em] uppercase px-4 py-2 rounded-lg bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 transition-colors"
            >
              <Github className="w-3.5 h-3.5" aria-hidden /> Visit GitHub
            </a>
          </div>
        )}

        {/* Featured repositories */}
        {!loading && !error && featured.length > 0 && (
          <div>
            <div className="flex items-end justify-between flex-wrap gap-3 mb-6">
              <div>
                <div className="text-[11px] tracking-[0.3em] uppercase font-mono text-primary/80 mb-1">Highlighted</div>
                <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-gradient-primary">
                  Featured Repositories
                </h3>
              </div>
              <a
                href={`https://github.com/${GITHUB_USER}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.15em] uppercase glass px-4 py-2 rounded-lg hover:border-primary/50 transition-colors"
              >
                <Github className="w-4 h-4" aria-hidden /> View All
              </a>
            </div>
            <div className="grid gap-6 md:gap-8 lg:grid-cols-2">
              {featured.map((repo, i) => (
                <Reveal key={repo.id} delay={Math.min(i, 6) * 0.08} direction="up" className="h-full">
                  <RepoCard repo={repo} featured matched={repo.matched} />
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {/* No featured found */}
        {!loading && !error && featured.length === 0 && (
          <div className="glass rounded-2xl p-10 text-center">
            <Sparkles className="w-6 h-6 mx-auto mb-3 text-primary/60" aria-hidden />
            <p className="text-foreground/80 text-sm">No featured repositories match the current keywords.</p>
            <p className="text-muted-foreground text-xs mt-1">
              Looking for: {FEATURED_KEYWORDS.join(", ")}
            </p>
            <a
              href={`https://github.com/${GITHUB_USER}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-xs font-mono tracking-[0.15em] uppercase px-4 py-2 rounded-lg bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 transition-colors"
            >
              <Github className="w-3.5 h-3.5" aria-hidden /> Browse GitHub
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;