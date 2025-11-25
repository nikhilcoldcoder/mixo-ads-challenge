export default function normalizeCampaign(raw) {
  if (!raw) return null;

  return {
    id: raw.id || raw._id,
    name: raw.name || raw.title || "Untitled Campaign",
    impressions: raw.impressions ?? raw.stats?.impressions ?? 0,
    clicks: raw.clicks ?? raw.stats?.clicks ?? 0,
    spend: raw.spend ?? raw.stats?.spend ?? 0,
    cpc: raw.cpc ?? raw.stats?.cpc ?? 0,
    daily: raw.daily || raw.stats?.daily || [],
  };
}
