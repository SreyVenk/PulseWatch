from providers.github_provider import (
    GitHubProvider,
)

from providers.mock_provider import (
    MockProvider,
)

from providers.rest_provider import (
    RESTProvider,
)


def get_provider(
    provider: str,
    api_key: str,
    key_name: str,
    payload: dict,
):

    normalized = (
        provider.lower().strip()
    )

    if normalized == "github":

        return GitHubProvider(
            api_key=api_key,
            key_name=key_name,
        )

    if normalized == "rest":

        return RESTProvider(
            api_key="",

            key_name=key_name,

            url=payload.get("url", ""),

            method=payload.get(
                "method",
                "GET",
            ),

            header_name=payload.get(
                "headerName",
                "",
            ),

            header_value=payload.get(
                "headerValue",
                "",
            ),
        )

    return MockProvider(
        provider=provider,

        api_key=api_key,

        key_name=key_name,
    )