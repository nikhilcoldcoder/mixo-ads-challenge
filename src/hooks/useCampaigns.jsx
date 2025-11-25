import { useEffect, useState } from "react";
import { fetchCampaigns } from "../api/client";
import normalizeCampaign from "../utils/normalize";

export default function useCampaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function load() {
      const result = await fetchCampaigns();
      const normalized = (result.data || []).map(normalizeCampaign);
      setCampaigns(normalized);
      const data = await fetchCampaigns();
      
      console.log("📌 Hook received campaigns:", data); // <-- LOG HERE

      setLoading(false);
    }
    load();
  }, []);

  return { campaigns, loading };
}
