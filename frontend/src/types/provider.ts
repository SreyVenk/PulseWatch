export type ProviderConfig = {
  id: string;
  provider: string;
  keyName: string;
  apiKey: string;
  url?: string;
  method?: string;
  headerName?: string;
  headerValue?: string;
};

export type ProviderHistoryPoint = {
  time: string;
  requests: number;
  cost: number;
  latency: number;
  errors: number;
};

export type ProviderAnalytics = {
  provider: string;
  keyName: string;
  requests: number;
  cost: number;
  latency: number;
  errors: number;
  status: string;
  history?: ProviderHistoryPoint[];
  isReal?: boolean;
  details?: {
    limit?: number;
    remaining?: number;
    used?: number;
    resetTime?: string | null;
    error?: string;
    statusCode?: number;
  };
};