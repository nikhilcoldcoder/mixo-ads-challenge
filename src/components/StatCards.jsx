import React from "react";
import { formatNumber, formatCurrency } from "../utils/format";

export default function StatCards({ campaigns = [] }) {
  const totalBudget = campaigns.reduce((a, c) => a + (c.budget || 0), 0);

  const active = campaigns.filter(c => c.status === "active").length;
  const paused = campaigns.filter(c => c.status === "paused").length;
  const completed = campaigns.filter(c => c.status === "completed").length;

  const baseStyle = {
    padding: 20,
    borderRadius: 10,
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    flex: 1,
    color: "#fff", // text white for contrast
  };

  return (
    <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
      <div style={{ ...baseStyle, background: "#4e73df" }}>
        <h4>Total Campaigns</h4>
        <h2>{formatNumber(campaigns.length)}</h2>
      </div>

      <div style={{ ...baseStyle, background: "#1cc88a" }}>
        <h4>Total Budget</h4>
        <h2>{formatCurrency(totalBudget)}</h2>
      </div>

      <div style={{ ...baseStyle, background: "#36b9cc" }}>
        <h4>Active</h4>
        <h2>{active}</h2>
      </div>

      <div style={{ ...baseStyle, background: "#f6c23e", color: "#000" }}>
        <h4>Paused</h4>
        <h2>{paused}</h2>
      </div>

      <div style={{ ...baseStyle, background: "#e74a3b" }}>
        <h4>Completed</h4>
        <h2>{completed}</h2>
      </div>
    </div>
  );
}