**Glean Tier 3 Advanced Evaluation**
**Undocumented Features (Found, Not in Marketing) - Re-Verified (V2)**

*Re-verification of every finding in [`Undocumented_Features_Glean.docx.md`](../../../cloude/Undocumented_Features_Glean.docx.md) against live SDK source, developer docs, and web search, cross-checked 2026-09-01 through 2026-09-08. Companion hands-on test guide: [V2/Undocumented Features.md](../../../../test/Glean/4.9.1%20Functional%20Capabilities/V2/Undocumented%20Features.md). Sibling field doc (2 items already tested): [../Undocumented Features (found, not in marketing).md](../Undocumented%20Features%20%28found%2C%20not%20in%20marketing%29.md). Sister deep dives: [Features Confirmed.md](Features%20Confirmed.md) · [Features Not Confirmed.md](Features%20Not%20Confirmed.md).*

## Headline result

This is the inverse of the other two V2 docs: instead of upgrading unconfirmed claims, this pass mostly **re-confirms every original finding still holds** - except one, which flipped hard. **Item #6 ("Skills" API resource) is no longer undocumented in marketing at all.** Glean launched Skills publicly in 2026 with dedicated blog posts and a full user guide - the single biggest change found in this entire V2 series across all three fields. Four genuinely new undocumented-in-marketing findings were also surfaced during the sweep (#9–#12 below).

## Methodology

- **Source** = live, global URL only, per [.cursor/rules/vendor-analysis-web-sourcing.mdc](../../../../.cursor/rules/vendor-analysis-web-sourcing.mdc).
- **Status tags:**
  - `Still Holds` - the finding is unchanged: still real, still absent from any Glean marketing/product page (developer-docs-only or SDK-source-only is fine - that was always the original bar).
  - `Now Marketed` - Glean has since surfaced this publicly on a marketing page; it no longer belongs on an "undocumented" list.
  - `Deepened` - still holds, and this pass found materially more detail than the original catalog-level finding.
- **Validation date** for every row: 2026-09-08.

---

# Original 8 findings, re-verified

| # | Finding | Status | Detail & Evidence | Source |
|---|---|---|---|---|
| 1 | **`exclude_deprecated_after` / `include_experimental` SDK params** | Still Holds | Confirmed live in the current README: env vars are precisely named `X_GLEAN_EXCLUDE_DEPRECATED_AFTER` and `X_GLEAN_INCLUDE_EXPERIMENTAL` (env var takes precedence over constructor arg if both set). Still absent from `developers.glean.com` and all marketing. | https://github.com/gleanwork/api-client-python/blob/main/README.md |
| 2 | **`X-Glean-ActAs` header for rate-limit quota distribution** | Still Holds | Still documented only in developer authentication guides (Client API, Platform API, and Indexing API auth pages all reference it), never on a marketing/product page. | https://developers.glean.com/get-started/authentication ; https://developers.glean.com/api/platform-api/authentication |
| 3 | **Typed `GleanDataError` with structured `.data` payload** | **Deepened** | Now shown directly in the official Python client guide's own Error Handling section (not just SDK source): `except errors.GleanDataError as e:  # 403 Permission Denied, 422 Invalid Query` vs. base `errors.GleanError` for all other codes. Confirms this is a stable, documented (if marketing-invisible) pattern. | https://developers.glean.com/libraries/api-clients/python |
| 4 | **`debug_logger` param + `GLEAN_DEBUG` env var** | Still Holds | Confirmed live in the README's "Debugging" section, plus independently corroborated by a third-party DeepWiki technical breakdown of the SDK's configuration surface. Still absent from `developers.glean.com`'s own guides and all marketing. | https://github.com/gleanwork/api-client-python/blob/main/README.md ; https://deepwiki.com/gleanwork/api-client-python/5.1-configuration-and-customization |
| 5 | **Governance API resource group** | **Deepened** | Original finding was catalog-level only ("existence confirmed, functional depth not walked through"). This pass found a full dedicated overview page: two distinct token scopes (`DATA_GOVERNANCE` for policy/report endpoints, `CONTENT_HIDING` for visibility-override endpoints), an explicit policy-vs-report distinction (`WEEKLY`/`CONTINUOUS` scheduled policies with a dashboard vs. one-off reports), and a 10-endpoint catalog spanning findings-exports, policies, reports, and document visibility overrides. Still zero presence on any marketing/Protect product page. | https://developers.glean.com/api/client-api/governance/overview |
| 6 | **"Skills" API resource** | **Now Marketed** | **Reversed finding.** The original gap - "no guide, example, or explanation of what a Skill actually is was found anywhere" - is completely closed. Glean shipped Skills as a headline 2026 feature: a full `docs.glean.com` user guide (Skills vs. Agents comparison table, routing behavior, "Open Agent Skills standard" compatibility with Anthropic/OpenAI/Cursor skill ecosystems) plus two dedicated marketing blog posts announcing the launch. Currently in beta, admin-enableable per user/group. This is no longer an unexplained primitive - remove from any future "undocumented" tracking. | https://docs.glean.com/user-guide/assistant/skills ; https://www.glean.com/blog/glean-skills-launch-2026 ; https://www.glean.com/blog/skills-may-drop-2026 |
| 7 | **Platform API as a distinct third API surface** | Still Holds | Structural finding unchanged: Platform API (Agents, Chat, Search, Skills, Triggers) remains a separate surface from Client API and Indexing API, with its own OAuth Authorization Server. Glean's own marketing/SDK messaging still speaks in terms of "APIs" generically, never naming three distinct surfaces. | https://developers.glean.com/api/platform-api/getting-started ; https://developers.glean.com/api/platform-api/authentication |
| 8 | **Signed webhook Triggers system** | Still Holds | Unchanged and re-confirmed: preset-based, HMAC-SHA256-signed Standard Webhooks delivery, still explicitly gated behind the `X-Glean-Include-Experimental: true` request header - Glean's own docs still label these endpoints "experimental." Zero marketing presence, consistent with the original finding. | https://developers.glean.com/api/platform-api/triggers-overview |

# New findings surfaced this pass (beyond the original 8)

| # | Finding | Status | Detail & Evidence | Source |
|---|---|---|---|---|
| 9 | **Waldo's actual base model + benchmarked latency numbers** | New | Glean's "Adaptive Reasoning" feature is marketed only as a vague speed/quality toggle. What's never marketed: the underlying model is named and specified - **NVIDIA's Nemotron-3 Nano (30B-A3B)**, fine-tuned by Glean via reinforcement learning, hosted on Glean-managed GCP Vertex AI or AWS SageMaker infrastructure - plus exact benchmark numbers (P25/P50/P75 Time-to-First-Token improvements of -51.0% / -51.9% / -45.8%, with no quality regression). | https://docs.glean.com/administration/assistant/features/adaptive-reasoning |
| 10 | **Agent execution trace export via OTLP** | New | A fully-built OpenTelemetry Protocol export pipeline pushes agent-run/tool-call/LLM-call spans to Datadog, Dynatrace, Grafana, Langfuse, LangSmith, Braintrust, or Splunk - with attribute filtering and internal-span exclusion before export. Zero presence on any marketing or Protect product page; only found via direct docs navigation. | https://docs.glean.com/administration/agent-trace-export |
| 11 | **Agent prompt draft/version/rollback lifecycle tooling** | New | A dedicated lifecycle-management doc describes draft/publish workflows and rollback controls for agent instructions/prompts - real governance tooling for agent builders that Glean's Agent Builder marketing never mentions. | https://docs.glean.com/agents/agent-development-lifecycle/manage-drafts-versions-and-rollbacks |
| 12 | **Governance API's `CONTENT_HIDING` scope - programmatic document hide/unhide** | New | Beyond the Governance API's general existence (#5), the content-hiding sub-scope specifically lets an authorized token programmatically hide or unhide any indexed document tenant-wide (`setdocvisibility`) - a real "kill switch" capability with its own dedicated token scope, entirely absent from any Glean Protect marketing material, which only ever talks about policies/findings in the abstract. | https://developers.glean.com/api/client-api/governance/setdocvisibility |

---

# Summary

## Counts by status (12 items: original 8 + 4 new)

| Status | Count | Items |
|---|---|---|
| Still Holds | 5 | #1, #2, #4, #7, #8 |
| Deepened | 2 | #3, #5 |
| Now Marketed (demoted) | 1 | #6 |
| New findings | 4 | #9, #10, #11, #12 |

## The one demotion

**#6 "Skills" API resource** - this is the most significant change across all three V2 docs produced so far. What was "an entirely new, unexplained primitive" in the original research is now a publicly launched, marketed, beta product feature with its own comparison-table documentation. If this list is ever cited externally, #6 should be pulled and instead noted as a *correctly predicted* early signal - the original researcher spotted a real capability months before Glean marketed it.

## What stayed genuinely hidden

Five of the eight original findings (#1, #2, #4, #7, #8) are still exactly where they were: real, working, and completely absent from any Glean marketing page - still only discoverable by reading SDK source or walking the developer-docs navigation by hand. Two more (#3, #5) are the same story with more technical detail available now than before.

## Why the new findings matter

#9–#12 reinforce the original doc's core thesis: Glean's developer docs and SDK consistently reveal more engineering depth and more governance/observability tooling than its marketing ever surfaces. None of these four required a live tenant - all four were found by the same "read the actual docs, not the pitch" method the original research used.

## What wasn't independently re-verified this pass

Item #7's claim that the Client API's Agents resource "overlaps, unexplained" with the Platform API's own Agents resource was not re-investigated in depth this pass - the structural finding (three distinct APIs) was re-confirmed, but the specific overlap-ambiguity nuance is carried forward from the original doc unchanged.
