import React, { useEffect, useState } from "react";
import StatCards from "../components/StatCards";
import CampaignTable from "../components/CampaignTable";

export default function Dashboard() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true); // NEW

   useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://mixo-fe-backend-task.vercel.app/campaigns");
        const data = await res.json();

        console.log("API Data:", data);

        setCampaigns(data.campaigns || []);  // Safety
      } catch (err) {
        console.log("Error fetching campaigns:", err);
      } finally {
        setLoading(false); // STOP LOADING
      }
    }

    fetchData();
  }, []);
  // ========== LOADING UI ==========
  if (loading) {
    return (
      <div
        style={{
          height: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="loader"></div>

        {/* Simple CSS Loader */}
        <style>
          {`
            .loader {
              border: 6px solid #f3f3f3;
              border-top: 6px solid #2563eb;
              border-radius: 50%;
              width: 50px;
              height: 50px;
              animation: spin 1s linear infinite;
            }

            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

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
