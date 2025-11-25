import React from "react";

export default function Sparkline({ data }) {
  if (!data || data.length === 0) return <div>No Data</div>;

  const points = data.map((d, i) => `${i * 20},${50 - d / 10}`).join(" ");

  return (
    <svg width="120" height="50">
      <polyline
        fill="none"
        stroke="#007bff"
        strokeWidth="2"
        points={points}
      />
    </svg>
  );
}
