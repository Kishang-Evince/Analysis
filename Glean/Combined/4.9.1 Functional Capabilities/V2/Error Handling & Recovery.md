**Glean Tier 3 Advanced Evaluation**
**Error Handling & Recovery — Independent Fresh Research (V2)**

*Independent research, compiled from this session's own fresh cross-field findings, all originally sourced 2026-09-09/10. Field definition: "System behavior during API timeouts, invalid inputs, or network drops."*

**Sr No mapping:** rows 1-5 map 1:1 to [test/V2/Error Handling & Recovery.md](../../../../test/Glean/4.9.1%20Functional%20Capabilities/V2/Error%20Handling%20%26%20Recovery.md).

## Claims

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 1 | Typed, structured API errors exist (`GleanError` / `GleanDataError`) | [developers.glean.com/guides/search/overview](https://developers.glean.com/guides/search/overview) | Base `errors.GleanError` exposes `status_code`/`raw_response`; `GleanDataError` carries a structured `.data` payload for specific codes (403/422) — real, documented error typing, not generic strings. |
| 2 | `429` rate-limit responses come with documented, retry-friendly guidance | [developers.glean.com/guides/search/overview](https://developers.glean.com/guides/search/overview) | Official error-handling sample explicitly retries on `429` with exponential backoff (`2 ** attempt`). |
| 3 | Scheduled agent runs that exceed the execution cap terminate without a clear application error — a real, named weakness | Cross-session finding (Agent Autonomy Level field), [docs.glean.com/agents/concepts/execution-limits](https://docs.glean.com/agents/concepts/execution-limits) | Verbatim: runs exceeding ~30 minutes are *"Terminated mid-run without a clear application error."* |
| 4 | Context/token overflow causes a silent partial read with no stated user-facing warning | Cross-session finding (Context Window & Memory field), [docs.glean.com/agents/concepts/memory](https://docs.glean.com/agents/concepts/memory) | Verbatim: *"agents will read only a portion of documents when the token limit is being approached"* — no documented visible warning to the end user when this happens. |
| 5 | The exact tool-call budget cutoff message/number is undisclosed, leaving the actual failure mode unverified from docs alone | Cross-session finding (Agent Autonomy Level field), [docs.glean.com/agents/concepts/limits-and-best-practices](https://docs.glean.com/agents/concepts/limits-and-best-practices) | A hard cap on tool calls per run is confirmed to exist, but neither the number nor the exact cutoff error text is published — genuinely requires a live test to observe. |

## Confidence
**Doc-Verified**, 3 first-party sources (2 re-used from this session's own prior fresh research, correctly cross-referenced), 2026-09-09/10.
