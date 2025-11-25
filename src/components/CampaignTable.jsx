import React from "react";
import { formatNumber, formatCurrency } from "../utils/format";


export default function CampaignTable({ campaigns }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead style={{ background: "#f7f7f7" }}>
        <tr>
          <th style={th}>Campaign</th>
          <th style={th}>Impressions</th>
          <th style={th}>Clicks</th>
          <th style={th}>Spend</th>
          <th style={th}>CPC</th>
        </tr>
      </thead>

      <tbody>
        {campaigns.map((c) => (
          <tr key={c.id} style={{ borderBottom: "1px solid #eee" }}>
            <td style={td}>{c.name}</td>
            <td style={td}>{formatNumber(c.impressions)}</td>
            <td style={td}>{formatNumber(c.clicks)}</td>
            <td style={td}>{formatCurrency(c.spend)}</td>
            <td style={td}>{formatCurrency(c.cpc)}</td>
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
