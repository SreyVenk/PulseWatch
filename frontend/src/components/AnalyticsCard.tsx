import { ProviderAnalytics } from "../types/provider";

type Props = {
  analytics: ProviderAnalytics;
};

export default function AnalyticsCard({ analytics }: Props) {
  return (
    <div className="analytics-card">
      <div className="analytics-top">
        <div>
          <h2>{analytics.provider}</h2>
          <p className="key-name">{analytics.keyName}</p>
        </div>

        <div className="badge-stack">
          {analytics.isReal && <span className="real-badge">REAL</span>}
          <span className={`badge ${analytics.status}`}>
            {analytics.status}
          </span>
        </div>
      </div>

      <div className="metric-row">
        <span>Requests Used</span>
        <strong>{analytics.requests.toLocaleString()}</strong>
      </div>

      <div className="metric-row">
        <span>Cost</span>
        <strong>${analytics.cost}</strong>
      </div>

      <div className="metric-row">
        <span>Latency</span>
        <strong>{analytics.latency}ms</strong>
      </div>

      <div className="metric-row">
        <span>Errors</span>
        <strong>{analytics.errors}</strong>
      </div>

      {analytics.details?.remaining !== undefined && (
        <div className="details-box">
          <p>
            Remaining:{" "}
            <strong>{analytics.details.remaining.toLocaleString()}</strong>
          </p>
          <p>
            Limit: <strong>{analytics.details.limit?.toLocaleString()}</strong>
          </p>
          <p>
            Reset: <strong>{analytics.details.resetTime}</strong>
          </p>
        </div>
      )}

      {analytics.details?.error && (
        <div className="error-box">{analytics.details.error}</div>
      )}
    </div>
  );
}