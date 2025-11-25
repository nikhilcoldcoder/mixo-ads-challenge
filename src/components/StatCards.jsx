import React from "react";
import { formatNumber, formatCurrency } from "../utils/format";

export default function StatCards({ campaigns }) {
  const totalImpressions = campaigns.reduce((a, c) => a + c.impressions, 0);
  const totalClicks = campaigns.reduce((a, c) => a + c.clicks, 0);
  const totalSpend = campaigns.reduce((a, c) => a + c.spend, 0);

  const cardStyle = {
    padding: 20,
    background: "#fff",
    borderRadius: 10,
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    flex: 1,
  };

  return (
    <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
      <div style={cardStyle}>
        <h4>Total Impressions</h4>
        <h2>{formatNumber(totalImpressions)}</h2>
      </div>

      <div style={cardStyle}>
        <h4>Total Clicks</h4>
        <h2>{formatNumber(totalClicks)}</h2>
      </div>

      <div style={cardStyle}>
        <h4>Total Spend</h4>
        <h2>{formatCurrency(totalSpend)}</h2>
      </div>
    </div>
  );
}
