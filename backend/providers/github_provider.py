import time
from datetime import datetime
from typing import Any, Dict

import requests

from providers.base_provider import BaseProvider


class GitHubProvider(BaseProvider):

    def get_analytics(self) -> Dict[str, Any]:

        headers = {
            "Authorization":
                f"Bearer {self.api_key}",

            "Accept":
                "application/vnd.github+json",

            "X-GitHub-Api-Version":
                "2022-11-28",
        }

        try:

            traffic_start = (
                time.perf_counter()
            )

            # REAL API USAGE
            requests.get(
                "https://api.github.com/user",
                headers=headers,
                timeout=10,
            )

            latency_ms = round(
                (
                    time.perf_counter()
                    - traffic_start
                )
                * 1000,
                2,
            )

            # CHECK UPDATED RATE LIMIT
            response = requests.get(
                "https://api.github.com/rate_limit",
                headers=headers,
                timeout=10,
            )

            if response.status_code == 401:

                return self._error_response(
                    status="critical",

                    latency_ms=latency_ms,

                    message=
                        "Invalid GitHub token",
                )

            if response.status_code >= 400:

                return self._error_response(
                    status="warning",

                    latency_ms=latency_ms,

                    message=
                        f"GitHub API returned {response.status_code}",
                )

            data = response.json()

            core = (
                data
                .get("resources", {})
                .get("core", {})
            )

            limit = core.get("limit", 0)

            remaining = core.get(
                "remaining",
                0,
            )

            used = core.get(
                "used",
                max(limit - remaining, 0),
            )

            reset_timestamp = core.get(
                "reset"
            )

            status = "healthy"

            if limit > 0:

                remaining_ratio = (
                    remaining / limit
                )

                if remaining_ratio <= 0.1:

                    status = "critical"

                elif remaining_ratio <= 0.25:

                    status = "warning"

            reset_time = None

            if reset_timestamp:

                reset_time = (
                    datetime
                    .fromtimestamp(
                        reset_timestamp
                    )
                    .strftime("%H:%M")
                )

            return {
                "provider": "GitHub",

                "keyName": self.key_name,

                "requests": used,

                "cost": 0,

                "latency": latency_ms,

                "errors": 0,

                "status": status,

                "isReal": True,

                "details": {
                    "limit": limit,

                    "remaining": remaining,

                    "used": used,

                    "resetTime":
                        reset_time,
                },
            }

        except Exception as e:

            return self._error_response(
                status="critical",

                latency_ms=0,

                message=str(e),
            )

    def _error_response(
        self,
        status: str,
        latency_ms: float,
        message: str,
    ) -> Dict[str, Any]:

        return {
            "provider": "GitHub",

            "keyName": self.key_name,

            "requests": 0,

            "cost": 0,

            "latency": latency_ms,

            "errors": 1,

            "status": status,

            "isReal": True,

            "details": {
                "error": message,
            },
        }