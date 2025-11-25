// src/api/client.js

const BASE_URL = "https://mixo-fe-backend-task.vercel.app";

export async function fetchCampaigns() {
  try {
    const response = await fetch(`${BASE_URL}/campaigns`);

    if (!response.ok) {
      console.error("❌ API ERROR:", response.status);
      return [];
    }

    const data = await response.json();

    console.log("📢 API DATA:", data);

    return data;
  } catch (err) {
    console.error("❌ FETCH FAILED:", err);
    return [];
  }
}
