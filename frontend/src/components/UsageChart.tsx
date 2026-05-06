"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

import { ProviderAnalytics } from "../types/provider";

type Props = {
  analytics: ProviderAnalytics[];
  historyMap: Record<string, any[]>;
};

const COLORS = [
  "#60a5fa",
  "#34d399",
  "#f472b6",
  "#f59e0b",
  "#a78bfa",
  "#fb7185",
];

export default function UsageChart({
  analytics,
  historyMap,
}: Props) {
  if (analytics.length === 0) {
    return (
      <section className="chart-placeholder">
        <div className="empty-chart">
          <h2>No Active Monitors</h2>

          <p>
            Add an endpoint below to begin tracking analytics.
          </p>
        </div>
      </section>
    );
  }

  const firstKey = analytics[0]?.keyName;
  const timestamps = historyMap[firstKey] || [];

  const mergedData = timestamps.map((_: any, index: number) => {
    const point: any = {
      time: timestamps[index]?.time,
    };

    analytics.forEach((provider) => {
      point[provider.keyName] =
        historyMap[provider.keyName]?.[index]?.latency || 0;
    });

    return point;
  });

  return (
    <section className="chart-placeholder">
      <div className="chart-header">
        <div>
          <h2>Latency Monitoring</h2>

          <p>
            Live endpoint response times across all monitors.
          </p>
        </div>
      </div>

      <div className="real-chart">
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={mergedData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1f2937"
            />

            <XAxis
              dataKey="time"
              stroke="#94a3b8"
            />

            <YAxis stroke="#94a3b8" />

            <Tooltip
              contentStyle={{
                background: "#111827",
                border: "1px solid #1f2937",
                color: "white",
                borderRadius: "12px",
              }}
            />

            <Legend />

            {analytics.map((provider, index) => (
              <Line
                key={provider.keyName}
                type="monotone"
                dataKey={provider.keyName}
                stroke={COLORS[index % COLORS.length]}
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}