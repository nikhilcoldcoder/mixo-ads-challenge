import React from "react";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../utils/format";

export default function CampaignTable({ campaigns = [] }) {
  const navigate = useNavigate();

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <span style={{ color: "#1cc88a", fontWeight: "bold" }}>✅ Active</span>;
      case "paused":
        return <span style={{ color: "#f6c23e", fontWeight: "bold" }}>⏸️ Paused</span>;
      case "completed":
        return <span style={{ color: "#4e73df", fontWeight: "bold" }}>✔️ Completed</span>;
      default:
        return <span style={{ color: "#858796" }}>⚪ {status}</span>;
    }
  };

  const handleRowClick = (id) => {
    navigate(`/campaign/${id}`); // navigate to details page
  };

  return (
    <table style={{ width: "100%", borderCollapse: "collapse", borderRadius: 8, overflow: "hidden" }}>
      <thead style={{ background: "#4e73df", color: "#fff" }}>
        <tr>
          <th style={th}>Campaign</th>
          <th style={th}>Budget</th>
          <th style={th}>Daily Budget</th>
          <th style={th}>Status</th>
          <th style={th}>Platforms</th>
          <th style={th}>Created At</th>
        </tr>
      </thead>

      <tbody>
        {campaigns.map((c, i) => (
          <tr
            key={c.id}
            onClick={() => handleRowClick(c.id)}
            style={{
              background: i % 2 === 0 ? "#f9f9f9" : "#fff",
              borderBottom: "1px solid #eee",
              cursor: "pointer",
              transition: "0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#e6f0ff")}
            onMouseLeave={(e) => (e.currentTarget.style.background = i % 2 === 0 ? "#f9f9f9" : "#fff")}
          >
            <td style={td}>{c.name}</td>
            <td style={td}>{formatCurrency(c.budget)}</td>
            <td style={td}>{formatCurrency(c.daily_budget)}</td>
            <td style={td}>{getStatusBadge(c.status)}</td>
            <td style={td}>{c.platforms.join(", ")}</td>
            <td style={td}>{new Date(c.created_at).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const th = {
  textAlign: "left",
  padding: 12,
  borderBottom: "2px solid #ddd",
};

const td = {
  padding: 12,
};
