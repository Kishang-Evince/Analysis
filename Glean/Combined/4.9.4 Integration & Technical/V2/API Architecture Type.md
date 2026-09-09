**Glean Tier 3 Advanced Evaluation**
**API Architecture Type - Independent Fresh Research (V2)**

*Independent research, sources picked and read fresh this pass, cross-checked 2026-09-09 against `developers.glean.com` and `docs.glean.com`. Field definition: "The framework type of the vendor's APIs (e.g., REST, GraphQL, gRPC, SOAP)." Base file at [`../API Architecture Type.md`](../API%20Architecture%20Type.md) left untouched - this is a standalone V2 doc, not an edit of it.*

**Sr No mapping:** rows 1-6 below map 1:1 to the same Sr No in the companion test guide [test/V2/API Architecture Type.md](../../../../test/Glean/4.9.4%20Integration%20&%20Technical/V2/API%20Architecture%20Type.md) - same number, same claim, doc-sourced here / tenant-tested there.

---

## Headline

**REST**, confirmed across all three named API surfaces, each with a published OpenAPI spec - but that is not the complete picture. Glean also exposes a fourth, architecturally distinct surface for AI-agent/tool consumption: an MCP server built on stateful **JSON-RPC 2.0**, not REST. A "REST-only" answer to this field would be technically incomplete.

## Claims (Sr No 1-6, mapped to test guide)

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 1 | The Client API is explicitly and verbatim confirmed REST | [developers.glean.com/api/client-api](https://developers.glean.com/api/client-api) | *"The Client API provides existing REST capabilities for building user-facing Glean experiences, including search, chat, agents, document access, and content management."* |
| 2 | The Platform API is REST, using standard HTTP POST + JSON, bearer-token auth, capability-based endpoint paths | [developers.glean.com/api/platform-api/getting-started](https://developers.glean.com/api/platform-api/getting-started) | Example: `curl -X POST 'https://<instance>-be.glean.com/api/search' -H 'Authorization: Bearer <platform_token>' -H 'Content-Type: application/json'`. Endpoint pattern `/api/<capability>`, capability-organized (Search, Agents, Skills, Chat). |
| 3 | The Indexing API is also REST, with versioned, resource-based endpoint paths | [developers.glean.com/api/indexing-api/index-documents](https://developers.glean.com/api/indexing-api/index-documents) | `POST /api/index/v1/indexdocuments`, plus `bulk-index-documents`, `update-document-permissions`, `delete-document` - consistent `/api/index/v1/` versioning and resource-based URI structure. |
| 4 | All three REST surfaces have formally published, machine-readable OpenAPI specifications - not just prose documentation | [developers.glean.com/api/client-api](https://developers.glean.com/api/client-api) | Confirmed live: `developers.glean.com/oas/client`, plus the homepage separately references `/oas/platform` and `/oas/indexing` for the other two surfaces. |
| 5 | No GraphQL, gRPC, or SOAP surface was found anywhere in Glean's developer documentation or in general web search | Absence checked across [developers.glean.com](https://developers.glean.com), all API overview pages fetched (claims 1-3), and a dedicated web search | Search specifically for Glean + GraphQL/gRPC/SOAP returned no Glean-specific results - only generic educational content about those protocols in general. Consistent, repeated absence across every source checked. |
| 6 | Beyond the three REST APIs, Glean exposes a fourth, architecturally distinct surface: an MCP server built on stateful JSON-RPC 2.0 - a genuinely different protocol paradigm, not another REST endpoint group | [docs.glean.com/administration/platform/mcp/about](https://docs.glean.com/administration/platform/mcp/about) ; [developers.glean.com/guides/mcp/](https://developers.glean.com/guides/mcp/) | MCP *"uses stateful JSON-RPC 2.0, with a session established per connection and maintained for its duration"* - request/response and notification messages, not stateless REST calls. Glean's MCP server exposes *"search, chat, document retrieval, code search, and people lookup"* plus agents and Gateway-connected external tools, to AI hosts (Cursor, Claude Desktop, ChatGPT, etc.) - a different consumer (AI agents/IDEs) and different transport paradigm than the REST APIs' typical consumers (custom apps, indexing jobs). |

## Independent read

- Claims 1-4 give a clean, well-documented "REST, with OpenAPI specs" answer for the traditional integration surface - a strong, checkable positive.
- Claim 5 (the absence check) matters because the field's own example list explicitly invites checking for GraphQL/gRPC/SOAP - worth stating plainly that none were found, not leaving it implied.
- Claim 6 is the nuance that actually differentiates a careful answer from a superficial one: if this field is answered simply "REST," it misses that Glean's AI-agent integration surface (increasingly the more strategically relevant one, given the whole product's agent-first direction) runs on a different protocol entirely. An evaluator should report both: REST for conventional API integration, JSON-RPC/MCP for AI-tool/agent integration.
- Worth noting for context, not as a new numbered claim: Client API is framed as *"existing"* REST capabilities while Platform API is positioned as the newer, recommended surface - suggesting an API-generation transition within the REST layer itself, separate from the REST-vs-MCP distinction in claim 6.

## Confidence

**Doc-Verified**, 4 independent first-party sources plus one explicit absence-check, validation date 2026-09-09. No sandbox/tenant access used - everything above is publicly readable without login. Tenant/hands-on verification (actual network-traffic inspection) tracked in the companion test guide.

---

## Summary

| Item | Finding | Sr No |
|---|---|---|
| Client API | REST, confirmed verbatim | 1 |
| Platform API | REST (POST/JSON/Bearer), capability-organized | 2 |
| Indexing API | REST, versioned resource-based paths | 3 |
| OpenAPI specs | Published for all 3 REST surfaces | 4 |
| GraphQL / gRPC / SOAP | Not found anywhere | 5 |
| MCP server (4th surface) | JSON-RPC 2.0, stateful - architecturally distinct from REST | 6 |
