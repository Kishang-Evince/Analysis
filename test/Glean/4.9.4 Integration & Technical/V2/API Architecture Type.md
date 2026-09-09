# 4.9.4 API Architecture Type - Independent Research Test Guide

**Purpose:** Hands-on verification of every claim in the companion research doc [V2/API Architecture Type.md](../../../../Glean/Combined/4.9.4%20Integration%20&%20Technical/V2/API%20Architecture%20Type.md). The core finding there is that "REST" alone is an incomplete answer - Glean also runs a fourth, architecturally distinct surface (MCP, on JSON-RPC 2.0) for AI-agent consumption. This guide's job is to actually inspect real network traffic and confirm both halves. Written so someone with no prior context on this project can pick it up and run it.

**Tenant entry:** A terminal with `curl` and a Glean API token · an MCP-capable app (Cursor or Claude Desktop) for the MCP-side check
**Companion research doc:** [V2/API Architecture Type.md](../../../../Glean/Combined/4.9.4%20Integration%20&%20Technical/V2/API%20Architecture%20Type.md)
**Base field doc (untouched, original):** [../API Architecture Type.md](../../../../Glean/Combined/4.9.4%20Integration%20&%20Technical/API%20Architecture%20Type.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):**
- A Glean API token (Admin Console → developer/API settings).
- A terminal with `curl` installed. **This whole guide is inherently developer-facing** - the field itself is about API wire-protocol behavior, which has no everyday-tool (Jira/Teams/Outlook/etc.) equivalent to test against. If you're not a developer, ask one on your team to run these rows and share the raw request/response output with you, rather than skipping the field.
- For Sr No 6 only: Cursor or Claude Desktop installed, with Glean's MCP server connection configured (ask your admin for the config if not already set up).

**Sr No mapping:** Sr No 1-6 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/API Architecture Type.md](../../../../Glean/Combined/4.9.4%20Integration%20&%20Technical/V2/API%20Architecture%20Type.md#claims-sr-no-1-6-mapped-to-test-guide) - same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes on exactly what you observed. "Pass" means you personally saw it in real traffic - not that the docs say so.

**Effort column:** each row lists an estimated time to complete plus a difficulty tag - `Easy` (routine doc/UI check, quick to judge) or `Hard` (needs a terminal, API token, or a connected MCP app) - so you can plan which rows to tackle first.

---

## Section 1 - Confirming each named API is really REST, via real HTTP traffic - Sr No 1-3

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | The Client API responds to standard REST-style HTTP calls (JSON in, JSON out, standard status codes) | 1. In a terminal, call a Client API endpoint with `curl`, e.g. a search or chat endpoint, with your API token.<br>2. Inspect the request (method, headers, body) and response (status code, JSON body). | You see a standard REST exchange: HTTP method + JSON body request, JSON body response, standard HTTP status codes (200, 401, etc). | | | ~15 min, Hard (needs terminal + API token) |
| 2 | The Platform API responds the same way - POST + JSON, bearer-token auth, capability-based path | 1. `curl -X POST 'https://<your-instance>-be.glean.com/api/search' -H 'Authorization: Bearer <your_token>' -H 'Content-Type: application/json' -d '{...}'` (fill in a real minimal search body).<br>2. Inspect the response. | You get a valid JSON response confirming REST/JSON/Bearer-token behavior exactly as documented. | | | ~10 min, Hard (builds on Sr No 1's setup) |
| 3 | The Indexing API also follows the same REST pattern, with versioned resource paths | 1. `curl` a safe, read-only Indexing API endpoint (or a call against a disposable test datasource) using the `/api/index/v1/...` path pattern.<br>2. Inspect the response. | You confirm the same REST/JSON pattern and the `/api/index/v1/` path structure. | | Use a disposable/test datasource - do not touch production indices | ~15 min, Hard |

## Section 2 - Confirming the OpenAPI specs are real and match the actual API behavior - Sr No 4

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 4 | All three REST APIs have real, loadable OpenAPI spec files, not just a documentation claim | 1. Open `developers.glean.com/oas/client`, `/oas/platform`, and `/oas/indexing` in a browser (or `curl` them).<br>2. Confirm each returns a real OpenAPI/Swagger spec document (JSON or YAML), not a 404 or placeholder. | All three URLs return real, structured OpenAPI spec content. | | | ~10 min, Easy |

## Section 3 - Confirming no GraphQL/gRPC/SOAP surface exists - Sr No 5

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 5 | Nowhere in Glean's developer docs or your own tenant's admin settings is there a GraphQL endpoint, a `.proto`/gRPC service definition, or a SOAP/WSDL endpoint | 1. Search `developers.glean.com` yourself for "GraphQL," "gRPC," "SOAP," or "WSDL."<br>2. Check Admin Console's developer/API settings for any mention of these. | You find no such surface anywhere. | | | ~10 min, Easy |

## Section 4 - Confirming the MCP server is a genuinely different protocol, not just another REST group - Sr No 6

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 6 | Connecting to Glean's MCP server uses a stateful JSON-RPC session, not stateless REST calls - a genuinely different wire protocol | 1. Open Cursor or Claude Desktop with Glean's MCP server configured.<br>2. If your tool has a network/debug inspector, watch the connection being established and the messages exchanged.<br>3. Note whether it behaves like a persistent session (one connection, multiple back-and-forth messages) versus separate stateless REST calls each time. | You observe a persistent, session-based exchange of JSON-RPC-style request/response/notification messages - distinct in character from the stateless REST calls tested in Sr No 1-3. | | If you can't inspect raw traffic, at minimum confirm functionally that one MCP connection handles multiple tool calls without re-authenticating each time (evidence of statefulness) | ~20 min, Hard (needs MCP app configured, ideally with traffic inspection) |

---

## Result Rollup

Once every row above has a Result filled in, copy the Pass/Fail/Partial/Blocked counts back into the companion research doc [V2/API Architecture Type.md](../../../../Glean/Combined/4.9.4%20Integration%20&%20Technical/V2/API%20Architecture%20Type.md): for each `Pass` row, append `+ Tested (tenant, 2026-XX-XX)` to that claim's Detail cell.

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Three REST APIs confirmed via real traffic | 3 | | | | |
| 2. OpenAPI specs are real and loadable | 1 | | | | |
| 3. No GraphQL/gRPC/SOAP found | 1 | | | | |
| 4. MCP is a distinct stateful JSON-RPC surface | 1 | | | | |
