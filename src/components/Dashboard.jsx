import React, { useEffect } from "react";
import useCampaigns from "../hooks/useCampaigns";
import StatCards from "./StatCards";
import CampaignTable from "./CampaignTable";
import Sidebar from "./Sidebar";
function Dashboard() {
  const { campaigns, loading } = useCampaigns();
console.log("Campaigns data:", campaigns)

useEffect(() => {
    console.log("Campaigns state:", campaigns); // 👈 logs whenever campaigns updates
  }, [campaigns]);

  if (loading) return <h2 style={{ padding: 20 }}>Loading campaigns...</h2>;

  return (
    <div style={{ display: "flex", padding: 20, gap: 20 }}>
      <div style={{ flex: 3 }}>
        <StatCards campaigns={campaigns} />
        <CampaignTable campaigns={campaigns} />
      </div>

      <div style={{ flex: 1 }}>
        <Sidebar campaigns={campaigns} />
      </div>
    </div>
  );
}

export default Dashboard;
