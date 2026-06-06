import { useEffect, useState } from "react";

export type GitHubRepo = {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  fork: boolean;
  archived: boolean;
  pushed_at: string;
  updated_at: string;
};

export type GitHubUser = {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
};

type CacheShape = {
  ts: number;
  user: GitHubUser;
  repos: GitHubRepo[];
};

const TTL_MS = 60 * 60 * 1000; // 1h
const KEY = (u: string) => `gh-cache:${u}`;

const readCache = (username: string): CacheShape | null => {
  try {
    const raw = localStorage.getItem(KEY(username));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CacheShape;
    if (Date.now() - parsed.ts > TTL_MS) return null;
    return parsed;
  } catch {
    return null;
  }
};

const writeCache = (username: string, data: Omit<CacheShape, "ts">) => {
  try {
    localStorage.setItem(KEY(username), JSON.stringify({ ...data, ts: Date.now() }));
  } catch {
    /* ignore quota */
  }
};

export const useGitHubRepos = (username: string) => {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const cached = readCache(username);
    if (cached) {
      setUser(cached.user);
      setRepos(cached.repos);
      setLoading(false);
      return;
    }

    const headers = { Accept: "application/vnd.github+json" };

    Promise.all([
      fetch(`https://api.github.com/users/${username}`, { headers }).then((r) =>
        r.ok ? r.json() : Promise.reject(r.status)
      ),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, { headers }).then(
        (r) => (r.ok ? r.json() : Promise.reject(r.status))
      ),
    ])
      .then(([u, rs]: [GitHubUser, GitHubRepo[]]) => {
        if (cancelled) return;
        const cleaned = rs
          .filter((r) => !r.fork && !r.archived)
          .map((r) => ({ ...r, topics: r.topics ?? [] }));
        setUser(u);
        setRepos(cleaned);
        writeCache(username, { user: u, repos: cleaned });
      })
      .catch((e) => {
        if (cancelled) return;
        setError(typeof e === "number" ? `GitHub API error ${e}` : "GitHub API unavailable");
      })
      .finally(() => !cancelled && setLoading(false));

    return () => {
      cancelled = true;
    };
  }, [username]);

  return { user, repos, loading, error };
};