import React from "react";
import Sparkline from "./Sparkline";

export default function Sidebar({ campaigns }) {
  const topCampaigns = [...campaigns]
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 5);

  return (
    <div>
      <h3>Top Campaigns</h3>

      {topCampaigns.map((c) => (
        <div
          key={c.id}
          style={{
            background: "#fff",
            padding: 15,
            marginBottom: 10,
            borderRadius: 10,
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <strong>{c.name}</strong>
          <Sparkline data={c.daily} />
        </div>
      ))}
    </div>
  );
}
