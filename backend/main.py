from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from providers.provider_factory import get_provider

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:3000",
    "https://pulse-watch-delta.vercel.app",
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "PulseWatch backend running"}


@app.post("/api/provider-analytics")
def provider_analytics(payload: dict):
    provider_name = payload.get("provider", "Unknown")
    api_key = payload.get("apiKey", "")
    key_name = payload.get("keyName", "Unnamed Key")

    provider = get_provider(
    provider=provider_name,

    api_key=api_key,

    key_name=key_name,

    payload=payload,
)

    return provider.get_analytics()