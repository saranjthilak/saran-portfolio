/**
 * Fetches real GitHub contribution stats from the public contributions API
 * (same data source used by react-github-calendar).
 *
 * No authentication token required — works with static export.
 */

export interface GitHubStats {
  totalContributions: number;
  longestStreak: number;
  currentStreak: number;
  activeDays: number;
}

interface ContributionDay {
  date: string;   // "YYYY-MM-DD"
  count: number;
  level: number;  // 0–4
}

interface ContributionsApiResponse {
  total: Record<string, number>;
  contributions: ContributionDay[];
}

/**
 * Compute streak and activity stats from a sorted array of contribution days.
 */
function computeStats(contributions: ContributionDay[]): GitHubStats {
  // Sort ascending by date
  const sorted = [...contributions].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  let totalContributions = 0;
  let activeDays = 0;
  let longestStreak = 0;
  let currentStreak = 0;

  // Walk through every day to compute streaks
  let runningStreak = 0;

  for (const day of sorted) {
    totalContributions += day.count;
    if (day.count > 0) {
      activeDays++;
      runningStreak++;
      longestStreak = Math.max(longestStreak, runningStreak);
    } else {
      runningStreak = 0;
    }
  }

  // Current streak: count consecutive days with contributions ending at today
  // (or the most recent day in the dataset)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  currentStreak = 0;
  for (let i = sorted.length - 1; i >= 0; i--) {
    const dayDate = new Date(sorted[i].date);
    dayDate.setHours(0, 0, 0, 0);

    // Skip future dates
    if (dayDate > today) continue;

    // If this is the first day we check (today or most recent past day),
    // allow it to have 0 contributions (day isn't over yet) but only if
    // it IS today. Otherwise, a 0 breaks the streak.
    if (currentStreak === 0 && sorted[i].count === 0) {
      if (dayDate.getTime() === today.getTime()) {
        // Today has 0 so far — skip and keep looking backwards
        continue;
      } else {
        // Most recent past day has 0 → streak is 0
        break;
      }
    }

    if (sorted[i].count > 0) {
      currentStreak++;
    } else {
      break;
    }
  }

  return { totalContributions, longestStreak, currentStreak, activeDays };
}

/**
 * Fetch contribution data for `username` from the public API and derive stats.
 * Returns null on network/parse errors so the caller can gracefully degrade.
 */
export async function fetchGitHubStats(
  username: string
): Promise<GitHubStats | null> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`
    );
    if (!res.ok) return null;

    const data: ContributionsApiResponse = await res.json();
    if (!data.contributions || data.contributions.length === 0) return null;

    return computeStats(data.contributions);
  } catch {
    return null;
  }
}
