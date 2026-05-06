import time

import requests

from providers.base_provider import BaseProvider


class RESTProvider(BaseProvider):
    def __init__(
        self,
        api_key: str,
        key_name: str,
        url: str,
        method: str,
        header_name: str,
        header_value: str,
    ):
        super().__init__(
            api_key=api_key,
            key_name=key_name,
        )

        self.url = url
        self.method = method
        self.header_name = header_name
        self.header_value = header_value

    def get_analytics(self):
        headers = {}

        if self.header_name and self.header_value:
            headers[self.header_name] = self.header_value

        start = time.perf_counter()

        try:
            response = requests.request(
                method=self.method,
                url=self.url,
                headers=headers,
                timeout=10,
            )

            latency_ms = round((time.perf_counter() - start) * 1000, 2)
            status_code = response.status_code

            if status_code >= 500:
                status = "critical"
            elif status_code >= 400:
                status = "warning"
            else:
                status = "healthy"

            return {
                "provider": "REST",
                "keyName": self.key_name,
                "requests": 1,
                "cost": 0,
                "latency": latency_ms,
                "errors": 1 if status_code >= 400 else 0,
                "status": status,
                "isReal": True,
                "details": {
                    "statusCode": status_code,
                },
            }

        except Exception as e:
            return {
                "provider": "REST",
                "keyName": self.key_name,
                "requests": 0,
                "cost": 0,
                "latency": 0,
                "errors": 1,
                "status": "critical",
                "isReal": True,
                "details": {
                    "error": str(e),
                },
            }