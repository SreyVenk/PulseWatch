import { ProviderConfig } from "../types/provider";

const STORAGE_KEY = "pulsewatch_providers";

export function getProviders(): ProviderConfig[] {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return [];
  }

  return JSON.parse(raw);
}

export function saveProviders(
  providers: ProviderConfig[]
) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(providers)
  );
}