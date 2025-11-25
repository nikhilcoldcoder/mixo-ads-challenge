import React, { useEffect, useState } from "react";
import StatCards from "../components/StatCards";
import CampaignTable from "../components/CampaignTable";

export default function Dashboard() {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    fetch("https://mixo-fe-backend-task.vercel.app/campaigns")
      .then((res) => res.json())
      .then((data) => {
        console.log("API Data:", data);
        setCampaigns(data.campaigns); // IMPORTANT
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Campaign Dashboard</h2>

      {/* Stat Cards */}
      <StatCards campaigns={campaigns} />

      {/* Table */}
      <CampaignTable campaigns={campaigns} />
    </div>
  );
}
