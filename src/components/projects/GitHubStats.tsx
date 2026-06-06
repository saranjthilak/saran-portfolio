import { Github, Star, BookMarked, Code2 } from "lucide-react";
import type { GitHubRepo, GitHubUser } from "@/hooks/use-github-repos";

type Props = {
  user: GitHubUser;
  repos: GitHubRepo[];
};

const GitHubStats = ({ user, repos }: Props) => {
  const totalStars = repos.reduce((acc, r) => acc + r.stargazers_count, 0);

  const languageCounts = repos.reduce<Record<string, number>>((acc, r) => {
    if (r.language) acc[r.language] = (acc[r.language] ?? 0) + 1;
    return acc;
  }, {});
  const topLanguages = Object.entries(languageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  const maxCount = topLanguages[0]?.[1] ?? 1;

  const stats = [
    { icon: BookMarked, label: "Repositories", value: user.public_repos },
    { icon: Star, label: "Total Stars", value: totalStars },
    { icon: Code2, label: "Languages", value: Object.keys(languageCounts).length },
  ];

  return (
    <div className="glass rounded-2xl p-6 sm:p-8 mb-10">
      <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
        <a
          href={user.html_url}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-4 group shrink-0"
          aria-label={`Open GitHub profile of ${user.login}`}
        >
          <img
            src={user.avatar_url}
            alt={`${user.login} avatar`}
            loading="lazy"
            width={64}
            height={64}
            className="w-16 h-16 rounded-2xl border border-border group-hover:border-primary/50 transition-colors"
          />
          <div>
            <div className="text-[10px] tracking-[0.25em] uppercase font-mono text-primary/80 mb-1">GitHub</div>
            <div className="font-display text-lg font-semibold tracking-tight group-hover:text-gradient-primary transition-colors inline-flex items-center gap-2">
              @{user.login}
              <Github className="w-4 h-4 opacity-60" aria-hidden />
            </div>
          </div>
        </a>

        <div className="grid grid-cols-3 gap-3 sm:gap-6 flex-1">
          {stats.map(({ icon: Icon, label, value }) => (
            <div key={label} className="text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.25em] uppercase font-mono text-muted-foreground mb-1">
                <Icon className="w-3 h-3" aria-hidden /> {label}
              </div>
              <div className="font-display text-2xl sm:text-3xl font-semibold text-gradient-primary tabular-nums">
                {value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {topLanguages.length > 0 && (
        <div className="mt-6 pt-6 border-t border-border/50">
          <div className="text-[10px] tracking-[0.25em] uppercase font-mono text-muted-foreground mb-3">
            Most used languages
          </div>
          <div className="space-y-2">
            {topLanguages.map(([lang, count]) => (
              <div key={lang} className="flex items-center gap-3">
                <span className="text-xs font-mono w-24 truncate">{lang}</span>
                <div className="flex-1 h-1.5 bg-secondary/60 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                    style={{ width: `${(count / maxCount) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-mono text-muted-foreground tabular-nums w-8 text-right">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GitHubStats;