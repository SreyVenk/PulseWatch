import {
  ProviderAnalytics,
  ProviderConfig,
} from "../types/provider";

const API_URL = "https://pulsewatch-pq6v.onrender.com";

export async function fetchAnalytics(
  provider: ProviderConfig
): Promise<ProviderAnalytics> {

  const response = await fetch(
    `${API_URL}/api/provider-analytics`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(provider),
    }
  );

  return response.json();
}