"use client";

import { useEffect, useState } from "react";

import AddProvider from "../components/AddProvider";
import AnalyticsCard from "../components/AnalyticsCard";
import UsageChart from "../components/UsageChart";

import { getProviders, saveProviders } from "../services/storage";
import { fetchAnalytics } from "../services/api";

import {
  ProviderAnalytics,
  ProviderConfig,
} from "../types/provider";

export default function HomePage() {
  const [providers, setProviders] = useState<ProviderConfig[]>([]);
  const [analytics, setAnalytics] = useState<ProviderAnalytics[]>([]);
  const [historyMap, setHistoryMap] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  useEffect(() => {
    const stored = getProviders();
    setProviders(stored);
  }, []);

  useEffect(() => {
    async function loadAnalytics() {
      if (providers.length === 0) {
        setAnalytics([]);
        setHistoryMap({});
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const results = await Promise.allSettled(
          providers.map((provider) => fetchAnalytics(provider))
        );

        const successfulResults = results
          .filter((result) => result.status === "fulfilled")
          .map((result: any) => result.value);

        setAnalytics(successfulResults);

        setHistoryMap((prev) => {
          const updated = { ...prev };

          successfulResults.forEach((provider: any) => {
            const existing = updated[provider.keyName] || [];

            const nextPoint = {
              time: new Date().toLocaleTimeString(),
              latency: provider.latency,
              requests: provider.requests,
              errors: provider.errors,
              cost: provider.cost,
            };

            updated[provider.keyName] = [
              ...existing,
              nextPoint,
            ].slice(-20);
          });

          return updated;
        });

        setLastUpdated(new Date().toLocaleTimeString());
      } catch (error) {
        console.error("Analytics fetch failed:", error);
      } finally {
        setLoading(false);
      }
    }

    loadAnalytics();

    const interval = setInterval(() => {
      loadAnalytics();
    }, 5000);

    return () => clearInterval(interval);
  }, [providers]);

  function addProvider(
    provider: string,
    keyName: string,
    apiKey: string,
    url?: string,
    method?: string,
    headerName?: string,
    headerValue?: string
  ) {
    const updated = [
      ...providers,
      {
        id: crypto.randomUUID(),
        provider,
        keyName,
        apiKey,
        url,
        method,
        headerName,
        headerValue,
      },
    ];

    setProviders(updated);
    saveProviders(updated);
  }

  function removeProvider(id: string) {
    const removedProvider = providers.find((provider) => provider.id === id);

    const updated = providers.filter((provider) => provider.id !== id);

    setProviders(updated);
    saveProviders(updated);

    if (removedProvider) {
      setHistoryMap((prev) => {
        const updatedHistory = { ...prev };
        delete updatedHistory[removedProvider.keyName];
        return updatedHistory;
      });
    }
  }

  return (
    <main className="page">
      <section className="hero">
        <div>
          <p className="subtitle">API + LLM Observability</p>

          <h1>PulseWatch</h1>

          <p className="description">
            Track usage, latency, cost, and health across your APIs and AI
            providers.
          </p>
        </div>

        <div className="refresh-pill">
          {lastUpdated ? `Updated ${lastUpdated}` : "Waiting for providers"}
        </div>
      </section>

      {loading && analytics.length === 0 ? (
        <section className="chart-placeholder">
          <div className="loading-state">
            <div className="spinner"></div>

            <p>Fetching monitor analytics...</p>
          </div>
        </section>
      ) : (
        <UsageChart analytics={analytics} historyMap={historyMap} />
      )}

      <section className="provider-list">
        <h2>Tracked Keys</h2>

        {providers.length === 0 ? (
          <p className="empty-state">
            Add your first provider key below to start tracking analytics.
          </p>
        ) : (
          providers.map((provider) => (
            <div className="provider-row" key={provider.id}>
              <div>
                <strong>{provider.provider}</strong>

                <p>
                  {provider.keyName} ·{" "}
                  {provider.provider === "REST"
                    ? provider.url
                    : maskKey(provider.apiKey)}
                </p>
              </div>

              <button onClick={() => removeProvider(provider.id)}>
                Remove
              </button>
            </div>
          ))
        )}
      </section>

      <section className="analytics-grid">
        {analytics.map((item, index) => (
          <AnalyticsCard key={index} analytics={item} />
        ))}
      </section>

      <section className="bottom-bar">
        <AddProvider onAdd={addProvider} />
      </section>
    </main>
  );
}

function maskKey(key: string) {
  if (!key) {
    return "No key";
  }

  if (key.length <= 8) {
    return "••••••••";
  }

  return `${key.slice(0, 4)}••••••••${key.slice(-4)}`;
}