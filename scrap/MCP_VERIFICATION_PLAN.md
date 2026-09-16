# Glean MCP Verification Plan

*Scope: only claims reachable via Glean's MCP tool surface (Search, Chat, Agents, Document retrieval, Code search, People lookup). Admin Console/pricing/compliance/partner claims are out of scope here - MCP has no admin/billing/config tools.*

## 1. Setup (one-time)

1. Get MCP server URL + OAuth from Glean admin (`docs.glean.com/administration/platform/mcp/about`).
2. Connect via Claude Code / Cursor / Claude Desktop MCP config, using this tenant's instance.
3. Confirm connection: run one trivial search query, confirm results return with citations.
4. Confirm identity: check the resolved user matches whoever's permissions should scope the test (self, or `X-Glean-ActAs` for a second test user if doing ACL-adjacent checks).



## 2. Tool-to-claim mapping


| MCP tool             | What it proves                                                                                     | Target sections                                               |
| -------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `search`             | Retrieval behavior, permission-aware results, citation presence                                    | 4.9.1 Features Confirmed/Not Confirmed, Undocumented Features |
| `chat`               | Answer quality, hallucination behavior, memory/context, RAG grounding, confidence/citation framing | 4.9.1, 4.9.3, 4.9.11                                          |
| `agents` (run)       | Agent execution, autonomy, orchestration, tool-call behavior                                       | 4.9.2                                                         |
| `document retrieval` | Access-permission enforcement on a specific doc                                                    | cross-cuts 4.9.1 Features Confirmed                           |
| `code search`        | Code Search feature claim (if GitHub in scope)                                                     | 4.9.1                                                         |
| `people lookup`      | People/org-chart search claims                                                                     | 4.9.1 (if kept in scope)                                      |




## 3. Per-section execution



### 4.9.1 Functional Capabilities (Features Confirmed, Features Not Confirmed, Undocumented Features, Feature Maturity, Error Handling & Recovery, Performance Under Load)

- Run `search` with known test docs (per each connector already in tenant stack - Notion/Teams/Outlook/OneDrive/Gmail/Drive/Docs/Sheets) to confirm each claimed capability fires (e.g. permission mirroring, Go Links resolution, browser-history results).
- Run `chat` with edge-case prompts (malformed input, huge doc, empty result) to test Error Handling & Recovery claims.
- Time N sequential `search`/`chat` calls to sanity-check Performance Under Load claims (rough only - real load testing needs concurrent calls, not single-session MCP).



### 4.9.2 Agent & Workflow Builder (Agent Autonomy Level, Multi-Agent Orchestration, Human-in-the-Loop Design, Trigger Types Supported)

- Use `agents` tool to run an existing pre-built agent (e.g. IT/HR agent) end to end; observe whether it stops for approval on a write action (Autonomy/HITL claim).
- Run a multi-agent workflow if one exists in this tenant; observe hand-off behavior (Orchestration claim).
- Note: Builder Type, Pre-Built Templates, Versioning & Rollback, Workflow Complexity Ceiling need the Agent Builder browser UI - not testable via MCP tool calls alone.



### 4.9.3 AI Architecture & Models (Context Window & Memory, Hallucination Controls, RAG Implementation, Foundation Models Used)

- `chat`: send a fact, start new session, ask for it back - tests Memory & Personalization persistence.
- `chat`: ask something requiring a large document - check for silent truncation (Context Window claim).
- `chat`: ask something with no grounding available - check citation behavior / hallucination guardrail triggers.
- `chat`: if model selection is exposed per-session, confirm named models appear (Foundation Models Used).



### 4.9.11 Client-Facing Explainability (Human-Readable Output, Confidence Scoring, Decision Explanation, Override & Correction)

- `chat`: inspect response format - is a confidence score/citation shown, is language business-readable.
- `chat`: test correction/override flow if exposed at chat-turn level.



## 4. What MCP cannot verify (flag, don't fake)

Admin Console config (SSO, connectors, alerts, RBAC), pricing/contract terms, compliance certifications, partner program terms, vendor maturity/roadmap, UI-UX Quality (visual judgment), Builder-UI-only agent fields. These stay `Blocked (needs Admin Console / contract / browser)` in the test guides regardless of MCP access.

## 5. Output

For each Sr No tested: record Pass/Fail/Partial in the matching test guide row (`test/Glean/<section>/V2/<field>.md`), same format already used throughout this project. Roll results into the xlsx's `Check Required`/Confidence columns afterward.

## 6. Exact claims MCP can confirm, with How

*Only rows a live MCP session (search/chat/agents tools, no admin console) can actually test. Same field often has other rows needing Admin Console/browser - those are marked Blocked, not skipped.*

### 4.9.1 Functional Capabilities - Features Confirmed (61 rows total, ~19 MCP-testable)


| Sr No | Claim                                                 | How (MCP)                                                                                        |
| ----- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| 1     | Intelligent/AI-powered relevance ranking              | `search` same query twice with different user context, compare ranking                           |
| 2     | Faceted filtering                                     | `search` with filter params, confirm results narrow correctly                                    |
| 3     | Autocomplete / search suggestions                     | `search` partial query, check suggestion list in response                                        |
| 4     | Federated search (multi-instance)                     | `search` query spanning 2+ connectors (Notion+Drive), confirm mixed results                      |
| 5     | Click-feedback loop                                   | Not directly testable via MCP (client-side telemetry) - Blocked                                  |
| 6     | Permission-aware retrieval                            | `search`/`document retrieval` as two different users (or `X-Glean-ActAs`), confirm ACL respected |
| 7     | Cursor-based pagination                               | `search` with pagination param, confirm cursor advances                                          |
| 8     | Rate-limit handling + sub-second response             | Time N sequential `search` calls, check for 429 + latency                                        |
| 30    | Real-time sync + inherited permissions                | Edit a test doc in source app, `search` immediately, time to appear                              |
| 50-52 | Projects replacing Collections                        | `search`/`chat` - check if a Project object is creatable/visible via chat context                |
| 53    | AI Answers                                            | `search` a query with a known Answer configured, confirm it surfaces                             |
| 54    | Chat sharing                                          | `chat`, generate a shareable link, open as different user, confirm redaction                     |
| 55    | Contextual images in chat                             | `chat` a query over an image-containing doc, confirm image renders inline                        |
| 56    | Real-time voice                                       | Not testable via MCP (audio channel not exposed) - Blocked                                       |
| 57    | Browser history search                                | Not testable via MCP (client-side extension feature) - Blocked                                   |
| 58-59 | Companion / Quick Chat                                | Not testable via MCP (browser-extension/desktop-app UI) - Blocked                                |
| 60    | Three knowledge sources, no citation when toggles off | `chat` with company+web toggles off, confirm answer has no citations                             |
| 61    | Advanced search filter syntax                         | `search` with `reportsto:`/`level:` syntax, confirm it parses                                    |


*(Sr No 9-29, 31-49 in this field are Model Hub/SDK/API/certification/pipeline facts - need Admin Console, developer docs, or vendor docs, not a live chat/search session. Blocked.)*

### 4.9.1 - Undocumented Features (8 rows, 2 MCP-testable)


| Sr No | Claim                                     | How                                                                                            |
| ----- | ----------------------------------------- | ---------------------------------------------------------------------------------------------- |
| 6     | OTLP agent trace export                   | `agents` run, then check if trace appears in configured OTLP sink (needs sink access too)      |
| 7     | Governance API doc-visibility kill switch | Call Governance API `setdocvisibility` via MCP if exposed, then `search` to confirm doc hidden |


*(Rest are SDK/model-internals facts, not MCP-session-testable - Blocked.)*

### 4.9.1 - Feature Maturity, Error Handling & Recovery, Performance Under Load (16 rows, 5 MCP-testable)


| Sr No | Field                  | Claim                                                            | How                                                               |
| ----- | ---------------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------- |
| 3     | Error Handling         | Scheduled agent runs exceeding cap terminate with no clear error | `agents` run, deliberately exceed time cap, observe error message |
| 4     | Error Handling         | Context overflow causes silent partial read                      | `chat` a huge doc, compare summary coverage vs. full doc          |
| 5     | Error Handling         | Tool-call budget cutoff undisclosed                              | `agents` run, push tool-call count high, observe failure point    |
| 2     | Performance Under Load | Rate-limit quota unconfirmed exact figure                        | Fire rapid `search`/`chat` calls, find actual 429 threshold       |
| 4     | Performance Under Load | Sub-second response marketing claim                              | Time `search`/`chat` calls directly                               |


*(Feature Maturity's 6 rows are release-cadence/changelog facts - Blocked, needs release-notes review not MCP.)*

### 4.9.2 Agent & Workflow Builder - Agent Autonomy Level (15 rows, 11 MCP-testable)


| Sr No | Claim                                             | How                                                                       |
| ----- | ------------------------------------------------- | ------------------------------------------------------------------------- |
| 1     | Auto mode plans own steps                         | `agents` run in Auto mode, observe dynamic tool selection                 |
| 2     | Workflow mode fixed sequence                      | `agents` run in Workflow mode, confirm no re-planning                     |
| 3     | Tool-call budget undisclosed                      | `agents` run, push high tool-call count, find real cutoff                 |
| 4     | Tool response payload size cap, silent truncation | `agents` run pulling a huge tool result, check for truncation w/o warning |
| 5     | Scheduled runs cap ~30 min                        | Schedule a long-running agent, time actual cutoff                         |
| 6     | Write actions pause for approval                  | `agents` run with a write action, confirm approval prompt fires           |
| 7     | Confirmation panel supports inline edit           | Same run, attempt edit-before-approve                                     |
| 9     | Pre-execution block on unsafe tool calls          | `agents` run, attempt an unsafe call, confirm blocked pre-execution       |
| 10    | Post-execution filter                             | `agents` run, confirm only flagged items removed, not whole result        |
| 11    | Flag-for-review mode                              | `agents` run in that mode, confirm logged not blocked                     |
| 13    | No documented retry/clarify policy                | `agents` run with malformed input, observe actual behavior                |


*(Sr No 8, 12, 14, 15 are admin-config/governance-policy facts - Blocked, needs Admin Console.)*

### 4.9.2 - Multi-Agent Orchestration, Human-in-the-Loop, Trigger Types (15 rows, 6 MCP-testable)


| Sr No | Field                     | Claim                                                       | How                                                                                        |
| ----- | ------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| 1     | Multi-Agent Orchestration | Sub-agent output-to-parent-memory mechanic                  | `agents` run a multi-step agent with a sub-agent call, inspect parent's final context      |
| 3     | Multi-Agent Orchestration | Task-tool delegation (Auto mode dynamic sub-agent routing)  | `agents` run in Auto mode, observe sub-agent spawn                                         |
| 4     | Multi-Agent Orchestration | 10-active-background-agents-per-user cap                    | Launch 11 concurrent scheduled agent runs, confirm 11th queues/rejects                     |
| 1     | Human-in-the-Loop         | Write confirmation applies only in interactive web sessions | `agents` run via MCP (non-interactive) vs. interactive chat, compare confirmation behavior |
| 2     | Human-in-the-Loop         | Two-phase pause-then-editable-preview, grouped batch review | `agents` run with multiple write actions, confirm batching                                 |
| 3     | Trigger Types             | ~30-min scheduled-run execution ceiling reconfirmed         | Same test as 4.9.2 Autonomy Sr 5, cross-check figure matches                               |


*(Rest need Admin Console - trigger-type admin defaults, tool-eligibility defaults.)*

### 4.9.3 AI Architecture & Models - Context Window & Memory (14 rows, 10 MCP-testable)


| Sr No | Claim                                                      | How                                                                           |
| ----- | ---------------------------------------------------------- | ----------------------------------------------------------------------------- |
| 1     | Agent memory configurable per step, 3 modes                | `agents` build/run 3-step agent, toggle each mode, confirm behavior differs   |
| 2     | 2-hour memory ceiling w/ history off                       | `chat` fact early, disable history, retest at 1hr and 2.5hr marks             |
| 3     | `[[ ]]` manual reference syntax                            | `agents` run using `[[ ]]` to skip-reference a step                           |
| 4     | Sub-agent memory fully isolated                            | `agents` run, confirm parent can't see sub-agent's intermediate steps         |
| 5     | Silent partial read on context overflow                    | `chat` huge doc, compare coverage                                             |
| 6     | Exact token cap per chat turn undisclosed                  | `chat` progressively larger single messages, find real cutoff                 |
| 10    | Persistent cross-session memory (Memory & Personalization) | `chat` tell it a fact, new session, ask it back                               |
| 11    | Saved vs. extracted memory types                           | `chat`, explicitly save a fact + have normal conversations, check both appear |
| 12    | Memory scoped to facts only, no doc access leak            | `chat`, confirm memory never surfaces inaccessible doc content                |
| 14    | Cross-tool memory read/write via MCP                       | Connect a second MCP client, read/write memory, confirm sync                  |


*(Sr No 7-9, 13 are model-catalog/deployment-tier facts - Blocked, needs Admin Console/docs.)*

### 4.9.3 - Hallucination Controls (9 rows, 3 MCP-testable)


| Sr No | Claim                                                                          | How                                                                             |
| ----- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------- |
| 7     | Confidence-gated clarifying-question behavior                                  | `chat` an ambiguous query, confirm it asks to clarify before answering          |
| 8     | Clarifying-question safety net doesn't apply to factual/inference-type queries | `chat` a factual-but-ambiguous query, confirm no clarification, compare to Sr 7 |
| 9     | No documented refusal/"I don't have enough information" message                | `chat` a query with zero grounding, observe exact response text                 |


*(Sr No 1-6 are internal AI-Evaluator-scoring mechanics not exposed to any client, MCP or otherwise - Blocked, genuinely unobservable.)*

### 4.9.3 - RAG Implementation (10 rows, 5 MCP-testable)


| Sr No | Claim                                                                           | How                                                                       |
| ----- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| 1     | Retrieval is agentic/planned, not flat vector search                            | `chat` a multi-hop question, observe multi-step retrieval behavior        |
| 3     | Two citation precision tiers exist                                              | `chat`, inspect citation format on a few different queries                |
| 4     | Deep-linked citations not default, opt-in                                       | `chat` default settings, confirm baseline citation only                   |
| 5     | Precise citations restricted to specific answer types even with Agentic Loop on | `chat` various query types with the setting on, compare citation depth    |
| 6     | Deliberate fallback to document-level citation                                  | `chat` a query where deep-link isn't available, confirm graceful fallback |


*(Sr No 2, 7-10 are model-architecture/chunking/format-support facts - Blocked, needs vendor docs.)*

### 4.9.3 - Foundation Models Used (12 rows, 3 MCP-testable)


| Sr No | Claim                                               | How                                                                                                 |
| ----- | --------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| 10    | Admins can restrict/beta-gate models per deployment | `chat`, check which models are actually selectable in this tenant                                   |
| 11    | No consolidated "current model per feature" view    | Attempt to determine active model per feature purely via chat responses, confirm it's not disclosed |
| 12    | GPT-6 Astra added                                   | `chat`, check if GPT-6 Astra is selectable                                                          |


*(Sr No 1-9 are Model Hub catalog/licensing facts - Blocked, needs Admin Console.)*

### 4.9.11 Client-Facing Explainability (20 rows, 12 MCP-testable)


| Sr No | Field                 | Claim                                                 | How                                                                       |
| ----- | --------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------- |
| 1     | Human-Readable Output | Markdown-formatted Answers with real formatting       | `search` a query with a configured Answer, inspect format                 |
| 3     | Human-Readable Output | Answers surface via Slack `/glean` command            | Trigger via Slack if MCP bridges it, else Blocked                         |
| 1     | Confidence Scoring    | Chat response schema field list                       | `chat`, inspect raw API response object for score fields                  |
| 3     | Confidence Scoring    | Verified-doc badges, thumbs up/down feedback          | `search`/`chat`, confirm badge + feedback UI elements present in response |
| 4     | Confidence Scoring    | No numeric confidence score exposed to end users      | `chat`, confirm response never includes a raw score                       |
| 1     | Decision Explanation  | Debug mode execution trace                            | `agents` run with Debug mode enabled, inspect step-by-step trace          |
| 4     | Decision Explanation  | Waldo's retrieval-planning process invisible          | `chat`, confirm no exposed planning trace in normal (non-debug) response  |
| 5     | Decision Explanation  | Deep-linked citations = strongest explanation surface | `chat`, cross-check against RAG Sr 3-6 findings                           |
| 1     | Override & Correction | Document Verification is display-only                 | `search`, find a Verified doc, confirm no correction action available     |
| 2     | Override & Correction | Document Deprecation leaves doc searchable            | `search` a deprecated doc, confirm it still returns                       |
| 3     | Override & Correction | Canvas is drafting-only, no correction path           | `chat`, open Canvas, confirm no "flag this answer" mechanism              |
| 6     | Override & Correction | "Plan" steering control                               | `chat` in Thinking mode, mid-execution redirect, confirm plan updates     |


*(Rest need Admin Console - content-owner notification workflows, correction-queue existence.)*

---

**Running total: ~65 claims genuinely MCP-testable with a concrete method, out of the ~189 rows across these 18 "mostly MCP" fields.** it counted whole fields as MCP-reachable when in practice each field is a mix of chat/search-visible behavior (testable) and admin-config/architecture-internals facts (not testable via MCP, need Admin Console or vendor docs regardless). Revised honest number: **~65 claims MCP alone can close.**
