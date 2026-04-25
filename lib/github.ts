type GitHubLanguageItem = {
  name: string;
  value: number;
  color: string;
};

export type GitHubMetrics = {
  username: string;
  contributions: number[];
  languageData: GitHubLanguageItem[];
  impact: {
    repos: number;
    followers: number;
    stars: number;
  };
};

type GitHubUser = {
  login: string;
  public_repos: number;
  followers: number;
};

type GitHubRepo = {
  stargazers_count: number;
  language: string | null;
};

type GitHubEvent = {
  created_at: string;
};

const CHART_COLORS = ["#6366F1", "#8B5CF6", "#D946EF", "#10B981", "#A3A3A3"];

function emptyContributionGrid() {
  return Array.from({ length: 365 }, () => 0);
}

function countToLevel(count: number, maxCount: number) {
  if (count === 0) return 0;
  if (maxCount <= 1) return 1;
  if (count <= Math.ceil(maxCount * 0.33)) return 1;
  if (count <= Math.ceil(maxCount * 0.66)) return 2;
  return 3;
}

function buildContributions(events: GitHubEvent[]) {
  const dateCounter = new Map<string, number>();
  for (const event of events) {
    const day = event.created_at.slice(0, 10);
    dateCounter.set(day, (dateCounter.get(day) ?? 0) + 1);
  }

  const today = new Date();
  const counts = [];
  for (let offset = 364; offset >= 0; offset -= 1) {
    const date = new Date(today);
    date.setDate(today.getDate() - offset);
    const dayKey = date.toISOString().slice(0, 10);
    counts.push(dateCounter.get(dayKey) ?? 0);
  }

  const maxCount = Math.max(...counts, 1);
  return counts.map((count) => countToLevel(count, maxCount));
}

function buildLanguages(repos: GitHubRepo[]) {
  const languageCounts = new Map<string, number>();
  for (const repo of repos) {
    if (!repo.language) continue;
    languageCounts.set(repo.language, (languageCounts.get(repo.language) ?? 0) + 1);
  }

  const entries = [...languageCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 4);
  const total = entries.reduce((sum, [, count]) => sum + count, 0);
  if (!total) {
    return [
      { name: "JavaScript", value: 35, color: "#6366F1" },
      { name: "TypeScript", value: 30, color: "#8B5CF6" },
      { name: "Python", value: 20, color: "#D946EF" },
      { name: "Other", value: 15, color: "#A3A3A3" },
    ];
  }

  const normalized = entries.map(([name, count], index) => ({
    name,
    value: Math.round((count / total) * 100),
    color: CHART_COLORS[index] ?? "#A3A3A3",
  }));
  const usedPercentage = normalized.reduce((sum, item) => sum + item.value, 0);
  if (usedPercentage < 100) {
    normalized.push({
      name: "Other",
      value: 100 - usedPercentage,
      color: CHART_COLORS[normalized.length] ?? "#A3A3A3",
    });
  }
  return normalized;
}

export async function getGitHubMetrics(): Promise<GitHubMetrics> {
  const username = process.env.GITHUB_USERNAME || "octocat";
  const token = process.env.GITHUB_TOKEN;
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const userResponse = await fetch(`https://api.github.com/users/${username}`, {
      headers,
      next: { revalidate: 3600 },
    });
    if (!userResponse.ok) {
      throw new Error("Unable to fetch GitHub user.");
    }

    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
      headers,
      next: { revalidate: 3600 },
    });
    if (!reposResponse.ok) {
      throw new Error("Unable to fetch GitHub repositories.");
    }

    const eventPromises = [1, 2, 3].map((page) =>
      fetch(`https://api.github.com/users/${username}/events/public?per_page=100&page=${page}`, {
        headers,
        next: { revalidate: 3600 },
      }).then((response) => (response.ok ? response.json() : [])),
    );

    const [user, repos, eventPages] = await Promise.all([
      userResponse.json() as Promise<GitHubUser>,
      reposResponse.json() as Promise<GitHubRepo[]>,
      Promise.all(eventPromises),
    ]);

    const events = eventPages.flat() as GitHubEvent[];
    const stars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);

    return {
      username: user.login || username,
      contributions: buildContributions(events),
      languageData: buildLanguages(repos),
      impact: {
        repos: user.public_repos || repos.length,
        followers: user.followers || 0,
        stars,
      },
    };
  } catch {
    return {
      username,
      contributions: emptyContributionGrid(),
      languageData: [
        { name: "JavaScript", value: 35, color: "#6366F1" },
        { name: "TypeScript", value: 30, color: "#8B5CF6" },
        { name: "Python", value: 20, color: "#D946EF" },
        { name: "Other", value: 15, color: "#A3A3A3" },
      ],
      impact: {
        repos: 3,
        followers: 0,
        stars: 2,
      },
    };
  }
}
