import { useEffect, useState } from "react";
import { fetchCampaigns } from "../api/client";
import normalizeCampaign from "../utils/normalize";

export default function useCampaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const result = await fetchCampaigns();
      const normalized = (result.campaigns || []).map(normalizeCampaign);
      
      
      setCampaigns(normalized);
      console.log("Raw API result:", campaigns); // 👈 log before normalization
      
      setLoading(false);
    }
    load();
  }, []);

  return { campaigns, loading };
}
