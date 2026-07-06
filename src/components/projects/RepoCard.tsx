import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Star, GitFork, ExternalLink, Sparkles, Calendar } from "lucide-react";
import type { GitHubRepo } from "@/hooks/use-github-repos";

type Props = {
  repo: GitHubRepo;
  featured?: boolean;
  matched?: string[];
};

const formatDate = (iso: string) => {
  const d = new Date(iso);
  const diff = (Date.now() - d.getTime()) / 86400000;
  if (diff < 1) return "today";
  if (diff < 30) return `${Math.floor(diff)}d ago`;
  if (diff < 365) return `${Math.floor(diff / 30)}mo ago`;
  return `${Math.floor(diff / 365)}y ago`;
};

const RepoCard = ({ repo, featured, matched }: Props) => {
  const topics = (repo.topics ?? []).slice(0, 6);

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="h-full"
    >
      <Card
        className={`glass rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-elegant group flex flex-col h-full relative ${
          featured ? "border-primary/40" : "hover:border-primary/40"
        }`}
      >
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {featured && (
          <div className="absolute top-3 right-3 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md glass border border-primary/40">
            <Sparkles className="w-3 h-3 text-primary" aria-hidden />
            <span className="text-[10px] tracking-[0.2em] uppercase text-foreground/80 font-mono">Featured</span>
          </div>
        )}

        <CardHeader className="pb-3">
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-2">
            <Github className="w-3.5 h-3.5" aria-hidden />
            <span className="truncate">{repo.full_name}</span>
          </div>
          <CardTitle className="font-display text-xl font-semibold text-foreground group-hover:text-gradient-primary transition-colors tracking-tight">
            {repo.name}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-grow flex flex-col gap-4">
          <p className="text-foreground/75 text-sm leading-relaxed min-h-[2.5rem]">
            {repo.description || "No description provided."}
          </p>

          {(topics.length > 0 || matched?.length) && (
            <div className="flex flex-wrap gap-1.5">
              {matched?.slice(0, 3).map((m) => (
                <Badge
                  key={`m-${m}`}
                  className="bg-primary/15 border border-primary/40 text-primary px-2 py-0.5 text-[10px] tracking-[0.1em] uppercase font-mono font-medium rounded-md"
                >
                  {m}
                </Badge>
              ))}
              {topics.map((t) => (
                <Badge
                  key={t}
                  className="bg-secondary/60 border border-border text-foreground/80 hover:border-primary/40 hover:bg-primary/10 px-2 py-0.5 text-[10px] tracking-[0.1em] uppercase font-mono font-medium rounded-md"
                >
                  {t}
                </Badge>
              ))}
            </div>
          )}

          <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground pt-1">
            {repo.language && (
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary" aria-hidden />
                {repo.language}
              </span>
            )}
            <span className="inline-flex items-center gap-1" aria-label={`${repo.stargazers_count} stars`}>
              <Star className="w-3 h-3" aria-hidden />
              {repo.stargazers_count}
            </span>
            <span className="inline-flex items-center gap-1" aria-label={`${repo.forks_count} forks`}>
              <GitFork className="w-3 h-3" aria-hidden />
              {repo.forks_count}
            </span>
            <span className="inline-flex items-center gap-1 ml-auto">
              <Calendar className="w-3 h-3" aria-hidden />
              {formatDate(repo.pushed_at)}
            </span>
          </div>

          <div className="flex items-center gap-2 pt-2 mt-auto border-t border-border/50">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.15em] uppercase px-3 py-2 rounded-lg bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 transition-colors"
              aria-label={`View ${repo.name} on GitHub`}
            >
              <Github className="w-3.5 h-3.5" aria-hidden /> View on GitHub
            </a>
          </div>
        </CardContent>
      </Card>
    </motion.article>
  );
};

export default RepoCard;