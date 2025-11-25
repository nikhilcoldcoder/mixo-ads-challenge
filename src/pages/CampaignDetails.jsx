import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { formatCurrency } from "../utils/format";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

export default function CampaignDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [campaign, setCampaign] = useState(null);
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);

  // ----------------------------
  // LOAD CAMPAIGN DETAILS + SSE STREAM
  // ----------------------------
  useEffect(() => {
    async function fetchCampaign() {
      try {
        const res = await fetch(
          `https://mixo-fe-backend-task.vercel.app/campaigns/${id}`
        );
        const data = await res.json();
        setCampaign(data?.campaign || data);
        setLoading(false);
      } catch (err) {
        console.error("Error:", err);
        setLoading(false);
      }
    }

    fetchCampaign();

    // ----------------------------
    // Real-Time INSIGHTS STREAM (SSE)
    // ----------------------------
    const eventSource = new EventSource(
      `https://mixo-fe-backend-task.vercel.app/campaigns/${id}/insights/stream`
    );

    eventSource.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data);
        console.log("LIVE STREAM INSIGHTS:", parsed);
        setInsights(parsed);
      } catch (err) {
        console.error("Error parsing SSE:", err);
      }
    };

    eventSource.onerror = (err) => {
      console.error("SSE connection failed:", err);
      eventSource.close();
    };

    // cleanup on component unmount
    return () => {
      eventSource.close();
    };
  }, [id]);

  if (loading) return <h2 style={{ padding: 20 }}>Loading...</h2>;
  if (!campaign) return <h2 style={{ padding: 20 }}>No campaign found</h2>;

  const getStatusStyle = (status) => {
    const base = {
      padding: "6px 14px",
      fontWeight: 600,
      borderRadius: 20,
      color: "#fff",
    };

    if (status === "active") return { ...base, background: "#1cc88a" };
    if (status === "paused") return { ...base, background: "#f6c23e" };
    if (status === "completed") return { ...base, background: "#4e73df" };

    return { ...base, background: "#858796" };
  };

  return (
    <div style={{ padding: 30, background: "#f4f6f9", minHeight: "100vh" }}>
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        style={{
          padding: "8px 16px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        ← Back
      </button>

      {/* Main Card */}
      <div
        style={{
          background: "#fff",
          padding: 25,
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ marginBottom: 10 }}>{campaign.name}</h1>

        <div style={{ marginBottom: 30 }}>
          <span style={getStatusStyle(campaign.status)}>
{campaign.status.toUpperCase()}
          </span>
        </div>

        {/* Info Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 20,
          }}
        >
          <InfoCard title="Budget" value={formatCurrency(campaign.budget)} />
          <InfoCard
            title="Daily Budget"
            value={formatCurrency(campaign.daily_budget)}
          />
          <InfoCard
            title="Created At"
            value={new Date(campaign.created_at).toLocaleString()}
          />
          <InfoCard
            title="Platforms"
            value={(campaign.platforms || []).join(", ")}
          />
        </div>

        {/* Insights Section */}
        {insights && (
          <div style={{ marginTop: 40 }}>
            <h2>Campaign Insights (Real-Time)</h2>

            <div style={{ marginTop: 50 }}>
              <h2>Performance Graphs</h2>

              {/* Bar Chart */}
              <div style={{ marginTop: 30 }}>
                <h3>Impressions vs Clicks vs Conversions</h3>
                <BarChart
                  width={600}
                  height={300}
                  data={[
                    {
                      name: "Metrics",
                      impressions: insights.impressions,
                      clicks: insights.clicks,
                      conversions: insights.conversions,
                    },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="impressions" fill="#4e73df" />
                  <Bar dataKey="clicks" fill="#1cc88a" />
                  <Bar dataKey="conversions" fill="#f6c23e" />
                </BarChart>
              </div>

              {/* Line Chart */}
              <div style={{ marginTop: 50 }}>
                <h3>CTR Line Chart</h3>
                <LineChart
                  width={600}
                  height={300}
                  data={[{ ctr: insights.ctr }]}
                >
                  <XAxis dataKey="ctr" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="ctr"
                    stroke="#2563eb"
                    strokeWidth={3}
                  />
                </LineChart>
              </div>

              {/* Pie Chart */}
              <div style={{ marginTop: 50 }}>
                <h3>Spend Distribution</h3>
                <PieChart width={400} height={300}>
                  <Pie
                    data={[
                      { name: "Spend", value: insights.spend },
                      { name: "Conversions", value: insights.conversions },
                    ]}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    <Cell fill="#4e73df" />
                    <Cell fill="#1cc88a" />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </div>
            </div>

            {/* Metrics */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 20,
                marginTop: 30,
              }}
            >
              <InfoCard title="Impressions" value={insights.impressions} />
              <InfoCard title="Clicks" value={insights.clicks} />
              <InfoCard title="CTR" value={insights.ctr + "%"} />
              <InfoCard title="Conversions" value={insights.conversions} />
              <InfoCard title="CPC" value={formatCurrency(insights.cpc)} />
              <InfoCard
                title="CPA"
                value={
                  insights.conversions
                    ? formatCurrency(insights.spend / insights.conversions)
                    : "N/A"
                }
              />
              <InfoCard
                title="Conversion Rate"
                value={insights.conversion_rate + "%"}
              />
              <InfoCard title="Spend" value={formatCurrency(insights.spend)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const InfoCard = ({ title, value }) => {
  return (
    <div
      style={{
        background: "#f8f9fc",
        padding: 20,
        borderRadius: 10,
        borderLeft: "4px solid #4e73df",
      }}
    >
      <p style={{ margin: 0, color: "#858796", fontSize: 14 }}>{title}</p>
      <h3 style={{ marginTop: 5 }}>{value}</h3>
    </div>
  );
};
