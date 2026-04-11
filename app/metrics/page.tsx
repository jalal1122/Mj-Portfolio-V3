import { MetricsView } from "@/components/metrics/metrics-view";
import { getGitHubMetrics } from "@/lib/github";

export default async function MetricsPage() {
  const metrics = await getGitHubMetrics();
  return <MetricsView metrics={metrics} />;
}
