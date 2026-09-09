---
url: "https://docs.glean.com/administration/assistant/features/chat-api-agentic-engine"
canonical: "https://docs.glean.com/administration/assistant/features/chat-api-agentic-engine"
title: "Agentic engine in the Chat API"
description: "Enable Glean's agentic engine for Chat API requests and confirm it's active in responses."
fetched_at: "2026-09-01T13:28:59.989Z"
---
On this page

If you use the Chat API to integrate Glean Assistant into your own applications, the agentic engine isn't enabled by default for API requests. When you omit `agentConfig` from a Chat API request, the API defaults to legacy Chat V2 behavior, even if the agentic engine is enabled for your tenant in the Glean UI.

## Enable the agentic engine for a request[​](#enable-the-agentic-engine-for-a-request "Direct link to Enable the agentic engine for a request")

To use the agentic engine through the Chat API, set `agentConfig.agent` in your request body to one of the following values:

-   **`FAST`**: Uses the agentic engine with a fast model set and reduced reasoning effort. Corresponds to fast mode in the Glean UI.
-   **`ADVANCED`**: Uses full agentic reasoning with the best model set. Corresponds to thinking mode in the Glean UI.

If you don't set `agentConfig.agent`, or set it to `DEFAULT`, the API uses legacy Chat V2 without the agentic engine.

note

The agentic engine must be enabled for your tenant and a supported agentic reasoning model must be configured - the same requirements as the Glean UI. If no supported agentic reasoning model is configured, `FAST` and `ADVANCED` requests fail rather than returning a response.

## Verify the agentic engine is active[​](#verify-the-agentic-engine-is-active "Direct link to Verify the agentic engine is active")

To confirm that a Chat API response used the agentic engine, check for `"workflowId": "INTERNAL_LOOPING_PYAGENT"` in the response body.

## Citations in Chat API responses[​](#citations-in-chat-api-responses "Direct link to Citations in Chat API responses")

Citation behavior differs between legacy Chat V2 and the agentic engine:

-   **Legacy Chat V2 (`DEFAULT`)**: May return fewer or missing citations compared to the Glean UI.
-   **Agentic engine (`FAST` or `ADVANCED`)**: Provides grounded answers with consistent citations, including deep-linked citations when supported.

If your Chat API integration previously returned citations and they stopped appearing after the agentic engine was enabled in the UI, verify that your API requests include `agentConfig.agent` set to `FAST` or `ADVANCED`.

## See also[​](#see-also "Direct link to See also")

-   [Agentic reasoning engine](/administration/assistant/features/agentic-reasoning) - Background on Glean's agentic architecture
-   [Agentic Engine V2 token consumption](/administration/assistant/features/engine-pricing) - How the agentic engine affects token usage and cost
