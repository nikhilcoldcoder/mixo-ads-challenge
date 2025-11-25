import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function CampaignDetails() {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);

  useEffect(() => {
    fetch(`https://mixo-fe-backend-task.vercel.app/campaigns/${id}`)
      .then(res => res.json())
      .then(data => setCampaign(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!campaign) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: 20 }}>
      <h1>{campaign.name}</h1>
      <p><strong>Status:</strong> {campaign.status}</p>
      <p><strong>Budget:</strong> {campaign.budget}</p>
      <p><strong>Daily Budget:</strong> {campaign.daily_budget}</p>
      <p><strong>Platforms:</strong> {campaign.platforms.join(", ")}</p>
      <p><strong>Created At:</strong> {new Date(campaign.created_at).toLocaleString()}</p>
    </div>
  );
}
