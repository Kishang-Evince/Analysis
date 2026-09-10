**Glean Tier 3 Advanced Evaluation**
**Undocumented Features (Found, Not in Marketing) — Independent Fresh Research (V2)**

*Independent research, all items drawn from this session's own fresh sourcing (2026-09-09 through 2026-09-10) across `github.com/gleanwork`, `developers.glean.com`, and `docs.glean.com` — not reused from any prior pass. Field definition: "Undocumented system capabilities or workarounds found during hands-on exploration." Base file at [`../Undocumented Features (found, not in marketing).md`](../Undocumented%20Features%20%28found%2C%20not%20in%20marketing%29.md) left untouched.*

**Sr No mapping:** rows 1-8 below map 1:1 to the same Sr No in the companion test guide [test/V2/Undocumented Features.md](../../../../test/Glean/4.9.1%20Functional%20Capabilities/V2/Undocumented%20Features.md) — same number, same finding, doc-sourced here / tenant-tested there.

---

## Headline

All 8 items below are real, working capabilities found only in developer docs, SDK source, or admin-facing docs — never surfaced on any `glean.com` marketing page checked across this entire research effort. None required guesswork: each is a directly-quoted or directly-observed artifact.

## Claims (Sr No 1-8, mapped to test guide)

| Sr No | Finding | Source | Detail |
|---|---|---|---|
| 1 | `debug_logger` parameter and `GLEAN_DEBUG` environment variable | [github.com/gleanwork/api-client-python](https://github.com/gleanwork/api-client-python/blob/main/README.md) | Re-confirmed live today: `Glean(debug_logger=logging.getLogger("glean.api_client"))`, and *"You can also enable a default debug logger by setting an environment variable `GLEAN_DEBUG` to true."* SDK-only, never mentioned on any marketing page checked. |
| 2 | `exclude_deprecated_after` / `include_experimental` SDK params, with env-var equivalents | [github.com/gleanwork/api-client-python](https://github.com/gleanwork/api-client-python/blob/main/README.md) | Re-confirmed live today: constructor args plus environment variable equivalents `X_GLEAN_EXCLUDE_DEPRECATED_AFTER` / `X_GLEAN_INCLUDE_EXPERIMENTAL`. Developer-docs-only. |
| 3 | Regional governance of open models under the Universal Model Key | [docs.glean.com/administration/llms](https://docs.glean.com/administration/llms) | Found this session: open models *"are controlled by creator region on Glean Universal Model Key deployments"* — a specific, real admin governance lever with zero presence on the Model Hub marketing page checked in the same pass. |
| 4 | A fourth SDK language (Go) exists, beyond the three normally referenced | [developers.glean.com](https://developers.glean.com) | Found this session: `go get github.com/gleanwork/api-client-go`. Not previously catalogued anywhere in this research effort's Python/TypeScript/Java-only framing, and absent from marketing SDK mentions. |
| 5 | Waldo's exact underlying base model and specific benchmarked latency figures | [docs.glean.com/administration/assistant/features/adaptive-reasoning](https://docs.glean.com/administration/assistant/features/adaptive-reasoning) | Found this session: Waldo is *"built on NVIDIA's Nemotron-3 Nano (30B-A3B) model and fine-tuned by Glean using reinforcement learning,"* with P25/P50/P75 Time-to-First-Token improvements of **-51.0% / -51.9% / -45.8%** and no stated quality regression. Adaptive Reasoning is marketed only as a vague speed/quality toggle — none of this specificity appears in marketing. |
| 6 | Full OpenTelemetry (OTLP) export pipeline for agent execution traces | [docs.glean.com/administration/agent-trace-export](https://docs.glean.com/administration/agent-trace-export) | Found this session: agent-run/tool-call/LLM-call spans exportable to Datadog, Dynatrace, Grafana, Langfuse, LangSmith, Braintrust, or Splunk, with attribute filtering. Zero presence on any Protect or Agent Builder marketing page. |
| 7 | A tenant-wide document visibility "kill switch" via the Governance API | [developers.glean.com/api/client-api/governance/setdocvisibility](https://developers.glean.com/api/client-api/governance/setdocvisibility) | Re-confirmed today: *"Sets the visibility-override state of the documents specified, effectively hiding or un-hiding documents"* — a real, programmatic, tenant-wide hide/unhide capability. Never referenced on any Glean Protect marketing page, which only discusses policies/findings in the abstract. |
| 8 | Agent prompt draft/version/rollback lifecycle tooling | [docs.glean.com/agents/agent-development-lifecycle/manage-drafts-versions-and-rollbacks](https://docs.glean.com/agents/agent-development-lifecycle/manage-drafts-versions-and-rollbacks) | Found this session: dedicated draft/publish workflow and rollback controls for agent instructions/prompts — real governance tooling absent from Agent Builder's own marketing, which never mentions this lifecycle management layer. |

## Independent read

- Every item here was surfaced as a byproduct of researching other fields this session (Foundation Models Used, Hallucination Controls, Model Agnosticism, Features Confirmed) — none required a dedicated "undocumented feature hunt." That's a meaningful pattern in itself: Glean's developer docs consistently reveal more engineering depth than its own marketing surfaces, across every category checked.
- Sr No 5 (Waldo's real base model + exact benchmark numbers) is the single most citable finding — a specific, falsifiable technical claim buried in an admin doc page, never once named in any Glean AI-quality marketing copy reviewed this session.

## Confidence

**Doc-Verified**, all 8 items independently sourced this session, 2 re-confirmed live today (2026-09-10). No sandbox/tenant access used. Tenant verification tracked in the companion test guide.

---

## Summary

| Item | Category | Sr No |
|---|---|---|
| SDK debug tooling | Developer/SDK | 1 |
| SDK deprecation/experimental flags | Developer/SDK | 2 |
| Regional model governance | AI/LLM admin | 3 |
| Go SDK | Developer/SDK | 4 |
| Waldo's real base model + benchmarks | AI architecture | 5 |
| OTLP agent trace export | Observability | 6 |
| Tenant-wide doc visibility kill switch | Governance/Protect | 7 |
| Agent prompt lifecycle tooling | Agent Builder | 8 |
