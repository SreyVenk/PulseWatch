"use client";

import { useState } from "react";

type Props = {
  onAdd: (
    provider: string,
    keyName: string,
    apiKey: string,
    url?: string,
    method?: string,
    headerName?: string,
    headerValue?: string
  ) => void;
};

export default function AddProvider({
  onAdd,
}: Props) {

  const [provider, setProvider] =
    useState("GitHub");

  const [keyName, setKeyName] =
    useState("");

  const [apiKey, setApiKey] =
    useState("");

  const [url, setUrl] =
    useState("");

  const [method, setMethod] =
    useState("GET");

  const [headerName, setHeaderName] =
    useState("");

  const [headerValue, setHeaderValue] =
    useState("");

  function handleAdd() {

    onAdd(
      provider,
      keyName,
      apiKey,
      url,
      method,
      headerName,
      headerValue
    );

    setKeyName("");
    setApiKey("");
    setUrl("");
    setHeaderName("");
    setHeaderValue("");
  }

  return (
    <div className="add-provider">

      <select
        value={provider}
        onChange={(e) =>
          setProvider(e.target.value)
        }
      >
        <option>GitHub</option>

        <option>OpenAI</option>

        <option>Anthropic</option>

        <option>Google</option>

        <option>Stripe</option>

        <option>REST</option>
      </select>

      <input
        placeholder="Monitor Name"
        value={keyName}
        onChange={(e) =>
          setKeyName(e.target.value)
        }
      />

      {provider === "REST" && (
        <>
          <input
            placeholder="Endpoint URL"
            value={url}
            onChange={(e) =>
              setUrl(e.target.value)
            }
          />

          <select
            value={method}
            onChange={(e) =>
              setMethod(e.target.value)
            }
          >
            <option>GET</option>
            <option>POST</option>
          </select>

          <input
            placeholder="Header Name"
            value={headerName}
            onChange={(e) =>
              setHeaderName(e.target.value)
            }
          />

          <input
            placeholder="Header Value"
            value={headerValue}
            onChange={(e) =>
              setHeaderValue(e.target.value)
            }
          />
        </>
      )}

      {provider !== "REST" && (
        <input
          placeholder="API Key"
          value={apiKey}
          onChange={(e) =>
            setApiKey(e.target.value)
          }
        />
      )}

      <button onClick={handleAdd}>
        +
      </button>

    </div>
  );
}