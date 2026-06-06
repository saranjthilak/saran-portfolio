import { useMemo, useState } from "react";
import { Search, Github, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
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

type FilterKey = "all" | "ai-ml" | "data-eng" | "cloud" | "python" | "infra" | "other";

const FILTERS: { key: FilterKey; label: string; match: (r: GitHubRepo) => boolean }[] = [
  { key: "all", label: "All", match: () => true },
  {
    key: "ai-ml",
    label: "AI / ML",
    match: (r) => /ai|llm|rag|ml|machine.?learning|nlp|openai|faiss|triton|pytorch|tensorflow|langchain/i.test(haystack(r)),
  },
  {
    key: "data-eng",
    label: "Data Engineering",
    match: (r) => /data|etl|airflow|dbt|bigquery|spark|kafka|snowflake|warehouse/i.test(haystack(r)),
  },
  {
    key: "cloud",
    label: "Cloud",
    match: (r) => /aws|gcp|azure|cloud|s3|lambda|ec2|cloudfront/i.test(haystack(r)),
  },
  {
    key: "python",
    label: "Python",
    match: (r) => r.language === "Python" || /python|fastapi|django|flask/i.test(haystack(r)),
  },
  {
    key: "infra",
    label: "Infrastructure",
    match: (r) => /terraform|docker|kubernetes|k8s|helm|ansible|infra|devops|ci.?cd/i.test(haystack(r)),
  },
  { key: "other", label: "Other", match: () => true /* handled below */ },
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
  const [filter, setFilter] = useState<FilterKey>("all");
  const [query, setQuery] = useState("");

  const { featured, others, filtered } = useMemo(() => {
    if (!repos) return { featured: [], others: [], filtered: [] as Array<GitHubRepo & { matched: string[] }> };

    const enriched = repos.map((r) => ({ ...r, matched: matchKeywords(r) }));
    const featured = enriched
      .filter((r) => r.matched.length > 0)
      .sort((a, b) => b.matched.length - a.matched.length || b.stargazers_count - a.stargazers_count);
    const others = enriched.filter((r) => r.matched.length === 0);

    const q = query.trim().toLowerCase();
    let list = enriched;
    if (filter === "other") {
      const knownKeys: FilterKey[] = ["ai-ml", "data-eng", "cloud", "python", "infra"];
      const known = new Set(
        enriched.filter((r) => knownKeys.some((k) => FILTERS.find((f) => f.key === k)!.match(r))).map((r) => r.id)
      );
      list = enriched.filter((r) => !known.has(r.id));
    } else if (filter !== "all") {
      const f = FILTERS.find((f) => f.key === filter)!;
      list = enriched.filter((r) => f.match(r));
    }
    if (q) list = list.filter((r) => r.name.toLowerCase().includes(q));

    list.sort((a, b) => {
      if (a.matched.length !== b.matched.length) return b.matched.length - a.matched.length;
      return b.stargazers_count - a.stargazers_count;
    });

    return { featured, others, filtered: list };
  }, [repos, filter, query]);

  return (
    <section id="projects" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Projects" tag="GitHub" />

        {/* Stats */}
        {user && repos && <GitHubStats user={user} repos={repos} />}

        {/* Featured */}
        {!loading && featured.length > 0 && filter === "all" && !query && (
          <div className="mb-14">
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
                <Github className="w-4 h-4" aria-hidden /> Profile
              </a>
            </div>
            <div className="grid gap-6 md:gap-8 lg:grid-cols-2">
              {featured.slice(0, 4).map((repo, i) => (
                <Reveal key={repo.id} delay={i * 0.08} direction="up" className="h-full">
                  <RepoCard repo={repo} featured matched={repo.matched} />
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {/* Filters + search */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search repositories…"
              aria-label="Search repositories by name"
              className="pl-10 glass border-border focus-visible:ring-primary/40"
            />
          </div>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter repositories">
            {FILTERS.map((f) => {
              const active = filter === f.key;
              return (
                <button
                  key={f.key}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(f.key)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] tracking-[0.15em] uppercase font-mono transition-all border ${
                    active
                      ? "bg-primary/15 border-primary/50 text-primary shadow-glow"
                      : "glass border-border text-foreground/70 hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="glass rounded-2xl h-64 animate-pulse" />
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

        {/* Filtered grid */}
        {!loading && !error && filtered.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((repo, i) => (
              <Reveal key={repo.id} delay={Math.min(i, 6) * 0.05} direction="up" className="h-full">
                <RepoCard repo={repo} matched={repo.matched} />
              </Reveal>
            ))}
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="glass rounded-2xl p-10 text-center text-muted-foreground text-sm">
            No repositories match your filters.
          </div>
        )}

        {/* eslint-disable-next-line @typescript-eslint/no-unused-expressions */}
        {others.length > 0 ? null : null}
      </div>
    </section>
  );
};

export default ProjectsSection;