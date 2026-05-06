import random
from typing import Any, Dict

from providers.base_provider import BaseProvider


PROVIDER_PROFILES = {
    "OpenAI": {
        "base_requests": (1200, 9000),
        "base_cost": (15, 300),
        "latency": (400, 1800),
        "errors": (0, 12),
    },
    "Anthropic": {
        "base_requests": (800, 6000),
        "base_cost": (20, 350),
        "latency": (700, 2600),
        "errors": (0, 10),
    },
    "Google": {
        "base_requests": (1000, 8000),
        "base_cost": (8, 200),
        "latency": (300, 1600),
        "errors": (0, 8),
    },
    "Stripe": {
        "base_requests": (500, 5000),
        "base_cost": (0, 80),
        "latency": (120, 700),
        "errors": (0, 4),
    },
    "Default": {
        "base_requests": (100, 5000),
        "base_cost": (1, 100),
        "latency": (200, 2000),
        "errors": (0, 10),
    },
}


class MockProvider(BaseProvider):
    def __init__(self, provider: str, api_key: str, key_name: str):
        super().__init__(api_key=api_key, key_name=key_name)
        self.provider = provider

    def get_analytics(self) -> Dict[str, Any]:
        profile = PROVIDER_PROFILES.get(
            self.provider,
            PROVIDER_PROFILES["Default"],
        )

        requests = random.randint(*profile["base_requests"])
        cost = round(random.uniform(*profile["base_cost"]), 2)
        latency = round(random.uniform(*profile["latency"]), 2)
        errors = random.randint(*profile["errors"])

        if errors >= 10 or latency >= 2200:
            status = "critical"
        elif errors >= 5 or latency >= 1200:
            status = "warning"
        else:
            status = "healthy"

        return {
            "provider": self.provider,
            "keyName": self.key_name,
            "requests": requests,
            "cost": cost,
            "latency": latency,
            "errors": errors,
            "status": status,
            "isReal": False,
        }