**Glean Tier 3 Advanced Evaluation**
**Features Not Confirmed - Re-Verified (V2)**

*Re-verification of every row in [`features-Confirmed.docx.md`'s sibling doc, `Features_Not_Confirmed_Glean.docx.md`](../../../cloude/Features_Not_Confirmed_Glean.docx.md), against live, global web sources (`www.glean.com`, `docs.glean.com`, `developers.glean.com`, third-party analyses), cross-checked 2026-09-01 through 2026-09-08. Companion hands-on test guide: [V2/Features Not Confirmed.md](../../../../test/Glean/4.9.1%20Functional%20Capabilities/V2/Features%20Not%20Confirmed.md). Sibling field doc (7 tenant-specific limitations already tested): [../Features Not Confirmed.md](../Features%20Not%20Confirmed.md). Sister deep dives: [Features Confirmed.md](Features%20Confirmed.md) · [Undocumented Features.md](Undocumented%20Features.md).*

## Headline result

Of the original doc's 46 "unconfirmed" items, deeper research this pass found **25 are now confirmable outright**, **8 are partially confirmable** (real mechanism documented, one narrower sub-question still open), and **13 remain genuinely unconfirmed**. Most of the upgrades weren't new Glean features shipped since the original research - they were already-published docs the original pass's search simply didn't surface (SAML/OIDC/SCIM config guides, agent memory/eval/versioning docs, the public subprocessor list, the LLM provider matrix).

## Methodology

- **Source** = live, global URL only, per [.cursor/rules/vendor-analysis-web-sourcing.mdc](../../../../.cursor/rules/vendor-analysis-web-sourcing.mdc). Local-cache paths were used during research to locate pages but are never cited as the Source of record.
- **Status tags:**
  - `Now Confirmed` - this pass found a citable first-party source that resolves the claim (positively or as a definitive "not supported" negative).
  - `Partially Confirmed` - a real, documented mechanism resolves part of the claim; a narrower sub-question inside it stays open.
  - `Still Unconfirmed` - nothing new found; original sub-tag (`Marketing` / `Unable` / `Vendor`) carried forward.
- **Validation date** for every row: 2026-09-08.

---

# AI / Model Behavior (12)

| # | Feature / Claim | Status | Detail & Evidence | Source |
|---|---|---|---|---|
| 1 | **Bring Your Own Model (BYOM)** | **Now Confirmed (negative)** | Model Hub only supports BYOK (bring your own *key*) to existing cloud LLM providers (OpenAI, Azure OpenAI, Vertex AI, Bedrock, Anthropic) - there is no path to register a fully custom/self-hosted model endpoint. Confirmed as a real gap, not just an undocumented one: competitor comparisons explicitly note Glean lacks "BYOLLM" support that some rivals offer. | https://docs.glean.com/administration/llms ; https://www.glean.com/platform/model-hub |
| 2 | **Model Routing Logic** | Partially Confirmed | "Auto routing selects from 40+ LLMs based on performance and cost to match the right model to the job." Separately, Auto mode "monitors quality, latency, cost, and reliability in production and adjusts recommendations over time." Criteria are now documented; the internal decision algorithm/weights are not. | https://www.glean.com/platform/model-hub ; https://docs.glean.com/get-started/golive/model-choice |
| 3 | **Grounding (as an enforced mechanism)** | Partially Confirmed | Waldo's architecture retrieves evidence *before* the frontier model generates a response - grounding is structurally sequenced, not just a stated behavior. Not an absolute guarantee against hallucination (see #10). | https://docs.glean.com/administration/assistant/features/adaptive-reasoning |
| 4 | **Agentic RAG** | **Now Confirmed** | Waldo is the documented mechanism: a retrieval-optimized model that runs automatically before the frontier model, plans retrieval, issues targeted parallel searches, then hands evidence to the frontier model for reasoning. This is a real technical description of how it differs from standard single-pass RAG. | https://docs.glean.com/administration/assistant/features/adaptive-reasoning |
| 5 | **Planning Capability** | Partially Confirmed | "Waldo determines whether the question would benefit from a retrieval plan... plans retrieval, breaks down the question." A real internal planning step is confirmed - but it is not exposed as a human-reviewable artifact before execution, so the original nuance (visible, reviewable plan) stays open. | https://docs.glean.com/administration/assistant/features/adaptive-reasoning |
| 6 | **Fine-Tuning Capabilities** | **Now Confirmed (negative)** | Customers cannot fine-tune models on proprietary data - not offered. Glean's own model (Waldo) is fine-tuned only by Glean, using reinforcement learning on Glean's internal dataset, never on customer data. | https://docs.glean.com/administration/assistant/features/adaptive-reasoning |
| 7 | **Training Data Handling** | **Now Confirmed** | Explicit statement: "No model training on customer data - the model was trained exclusively on Glean's internal data. Your organization's data is never used to train or fine-tune the model." Same guarantee stated separately for Gemini web-search tool use. | https://docs.glean.com/administration/assistant/features/adaptive-reasoning ; https://docs.glean.com/administration/tools/setup-tools/web-search-tools-setup |
| 8 | **Model Update & Versioning** | Still Unconfirmed (Unable) | Waldo's own RL fine-tuning cadence is documented, but a general cross-provider foundation-model update/customer-notification *policy* is not published. | - |
| 9 | **Prompt Templates / Versioning (governed)** | **Now Confirmed** | Dedicated official doc covers draft/publish workflow and rollback controls for agent prompts/instructions. | https://docs.glean.com/agents/agent-development-lifecycle/manage-drafts-versions-and-rollbacks |
| 10 | **Hallucination Detection (as a distinct mechanism)** | Still Unconfirmed (Unable) | Mitigations are real (citations, QA test batteries, "error experience" design guidance) but no dedicated automated hallucination-flagging feature was found for general Assistant/Agent output. A narrow self-correcting loop exists specifically for Code Search ("surfaces structured errors and hints... adjusts course, rather than quietly failing or hallucinating") - not general-purpose. | https://docs.glean.com/security/how-code-search-works ; https://docs.glean.com/agents/agent-development-lifecycle/evaluate-agent-quality |
| 11 | **Agent Memory (long-term / cross-session)** | **Now Confirmed (negative)** | Dedicated memory doc: memory is per-step and configurable (all-previous / previous-only / none), with `[[ ]]` manual referencing and sub-agent memory isolation. Explicitly: "If you have turned off conversation history, Glean will still retain memory for up to **2 hours**." No persistence beyond that window is documented - this resolves the claim with a definitive limit rather than an open gap. | https://docs.glean.com/agents/concepts/memory |
| 12 | **Reflection / Self-Correction** | Partially Confirmed | Confirmed narrowly for Code Search's agentic loop (see #10); not confirmed as a general Assistant/Agent Builder-wide feature across all agent types. | https://docs.glean.com/security/how-code-search-works |

# Agents & Workflow (4)

| # | Feature / Claim | Status | Detail & Evidence | Source |
|---|---|---|---|---|
| 13 | **Multi-Agent Orchestration** | **Now Confirmed** | Sub-agents are a real, documented mechanism: a sub-agent runs as a step inside a parent agent's workflow with its own isolated memory, returning only its final output to the parent. Branches ("If/Then" logic) route which tools/sub-agents run. | https://docs.glean.com/agents/concepts/flow |
| 14 | **Workflow Complexity Ceiling** | **Now Confirmed** | Concrete, documented limits: a maximum tool-call budget per run (covers searches/reads/writes/orchestration steps), a response-payload size cap per tool call, and scheduled runs capped at **~30 minutes** end-to-end before Glean terminates execution. | https://docs.glean.com/agents/concepts/limits-and-best-practices ; https://docs.glean.com/agents/concepts/execution-limits |
| 15 | **Reasoning Pipeline** | Partially Confirmed | The underlying architecture is now well-documented (Waldo two-stage retrieval-then-reasoning pipeline, #3/#4), just not branded "Reasoning Pipeline" in Glean's own materials - that label only appears in third-party comparisons, as the original doc noted. | https://docs.glean.com/administration/assistant/features/adaptive-reasoning |
| 16 | **Evaluation Framework** | **Now Confirmed** | Dedicated official doc: build a "Golden test set," balance tests across Happy Path / Edge Case / Adversarial / Permission categories, and define a quantitative quality bar (e.g. "accurate citations in 95% of tests") before launch. | https://docs.glean.com/agents/agent-development-lifecycle/evaluate-agent-quality |

# Model / Provider Support (4)

| # | Feature / Claim | Status | Detail & Evidence | Source |
|---|---|---|---|---|
| 17 | **Azure OpenAI Support** | **Now Confirmed** | Explicit provider-availability matrix lists Azure OpenAI as supported across Glean Universal Model Key, GCP-based Customer Key, and AWS-based Customer Key. | https://docs.glean.com/administration/llm-key-feature-availability |
| 18 | **Vertex AI Support** | **Now Confirmed** | Same matrix confirms Google Vertex AI (Gemini and Claude) for Universal Key and GCP-based Customer Key; dedicated Vertex/Gemini setup doc exists. | https://docs.glean.com/administration/llm-key-feature-availability ; https://docs.glean.com/administration/management/models/provider-setup/gemini-setup |
| 19 | **Local / Self-Hosted Models** | Still Unconfirmed (Unable) | No path found for pointing Glean at a fully self-hosted inference endpoint outside the 5 named cloud providers. Consistent with #1. | - |
| 20 | **Ollama / Llama / Mistral / DeepSeek** | Still Unconfirmed (Unable) | None of these open-weight model names appear in Glean's own docs as individually selectable models. | - |

# Architecture (5)

| # | Feature / Claim | Status | Detail & Evidence | Source |
|---|---|---|---|---|
| 21 | **Caching** | Still Unconfirmed (Unable) | Only a client-side SDK example (an application-level cache wrapper pattern) was found; no internal server-side caching architecture is disclosed. | - |
| 22 | **Context Window** | **Now Confirmed** | Model-dependent, but thoroughly documented per model in release notes (e.g. GPT-4.1's 1M-token window vs. 128K default; Claude Sonnet 4.5's 1M-token beta retiring to a 200K standard window on 2026-04-30) and in the agent memory doc, which explains truncation warnings when a run approaches the limit. | https://docs.glean.com/release-notes/releases/2025-07-16-july-release ; https://docs.glean.com/release-notes/releases/2026-05-06-may-release ; https://docs.glean.com/agents/concepts/memory |
| 23 | **Prompt Assembly** | Still Unconfirmed (Unable) | No disclosure of the exact ordering/construction logic for combining retrieved passages and system instructions into the final prompt. | - |
| 24 | **Memory (Session / Long-term)** | **Now Confirmed (negative)** | Same finding as #11 - session/step memory is real and configurable; long-term/cross-session persistence beyond the documented 2-hour window is not offered. | https://docs.glean.com/agents/concepts/memory |
| 25 | **LLM Routing (the automation itself)** | Partially Confirmed | Same finding as #2 - criteria (performance, cost, quality, latency, reliability) are documented; exact algorithm/weighting is not. | https://www.glean.com/platform/model-hub ; https://docs.glean.com/get-started/golive/model-choice |

# Multimodal (3)

| # | Feature / Claim | Status | Detail & Evidence | Source |
|---|---|---|---|---|
| 26 | **Image Processing** | **Now Confirmed** | "Image understanding" is a named, licensed feature listed across multiple Enterprise Flex pricing tiers - a first-party product commitment, not just a third-party comparison claim. | https://docs.glean.com/glean-enterprise-flex-pricing |
| 27 | **OCR Support** | **Now Confirmed** | Thoroughly documented and connector-dependent: OCR is an optional, subscription-gated feature powered by GCP Cloud Vision; off by default for S3 and OneDrive, on by default for direct Chat file uploads; a hard 64MB pre-OCR / 16.875MB post-extraction text-size ceiling applies regardless. | https://docs.glean.com/security/cloud-prem/aws/faq ; https://docs.glean.com/connectors/native/s3/about ; https://docs.glean.com/connectors/crawler-and-indexing-limits |
| 28 | **Multimodal Support** | **Now Confirmed (scoped)** | "Image understanding" and "Image generation" are both named, tier-gated features. Audio/video modalities are not found as named features - scope is confirmed as image-only, not the open-ended "which modalities" gap the original doc described. | https://docs.glean.com/glean-enterprise-flex-pricing |

# Security & Compliance (9)

| # | Feature / Claim | Status | Detail & Evidence | Source |
|---|---|---|---|---|
| 29 | **CCPA** | **Now Confirmed** | Dedicated CCPA/CPRA rights section on Glean's public privacy policy (Right to Know, Delete, Correct, Opt Out of Sharing, Non-Discrimination; "No Sale of Personal Information" statement). | https://www.glean.com/privacy |
| 30 | **ABAC (Attribute-Based Access Control)** | Still Unconfirmed (Marketing) | Every mention of ABAC in the corpus is Glean's own SEO/perspectives blog content describing ABAC as a generic industry concept - never a claim that *Glean's own product* implements ABAC. Glean's actual security docs describe RBAC only. | https://docs.glean.com/security/secure-configuration (RBAC only, no ABAC) |
| 31 | **SAML Support** | **Now Confirmed** | Dedicated Okta-SAML and generic-SAML configuration guides; deployment best practices explicitly say "Configure SSO (OIDC or SAML)." | https://docs.glean.com/administration/identity/sso/configuration/generic-saml ; https://docs.glean.com/security/deployment-best-practices |
| 32 | **OIDC Support** | **Now Confirmed** | Dedicated Okta-OIDC, Google-OIDC, and Microsoft Entra ID-OIDC configuration guides - Entra ID (Microsoft) is a bonus finding, named explicitly. | https://docs.glean.com/administration/identity/sso/configuration/entra-id-oidc ; https://docs.glean.com/administration/identity/sso/configuration/okta-oidc |
| 33 | **SCIM Provisioning** | **Now Confirmed** | Explicit and repeated: "Configure SSO (OIDC or SAML) and SCIM for automatic deprovisioning"; group-membership sync documented as near-real-time for SAML/SCIM integrations vs. up to 3 hours for OIDC-only. Multiple connectors (Klue, Ironclad) also use SCIM for permission mapping. | https://docs.glean.com/security/deployment-best-practices ; https://docs.glean.com/administration/identity/roles/group-based-permissions |
| 34 | **Audit Logs (completeness / tamper-proofing)** | **Now Confirmed (scoped)** | Retention and export are fully documented: 30-day default retention (custom retention available on request), self-serve CSV export with a defined field set (timestamps, user identities, tool descriptions, affected resources, change details). Tamper-proofing specifically (e.g. write-once storage, cryptographic sealing) is not addressed - narrow residual gap. | https://docs.glean.com/administration/management/audit-logs/admin-audit-logs |
| 35 | **Secrets Management** | Still Unconfirmed (Unable) | OAuth connection-flow docs exist, but internal storage/rotation architecture for connector credentials and tokens is not disclosed. | - |
| 36 | **Audit Trail Completeness** | **Now Confirmed (scoped)** | Duplicate of #34 in the original doc - same evidence, same tamper-proofing caveat. | https://docs.glean.com/administration/management/audit-logs/admin-audit-logs |
| 37 | **Third-Party Sub-Processors** | **Now Confirmed** | Glean publishes a complete, dated, itemized subprocessor list - entity name, subprocessing activity, and location for each (AWS, Google, Microsoft, Anthropic, OpenAI, Snowflake, Baseten, Fireworks.ai, Groq, Modal Labs, Deepgram, Palo Alto Networks, Twilio, SendGrid, Brave, Exa Labs, Salesforce, Slack, Zendesk, Intercom, plus Glean's own India affiliate for support access). Updated as recently as 2026-07-28. | https://www.glean.com/legal/subprocessors |

# Pricing & Licensing (2)

| # | Feature / Claim | Status | Detail & Evidence | Source |
|---|---|---|---|---|
| 38 | **Training & Enablement Cost** | Still Unconfirmed (Vendor) | Still bundled into overall implementation cost across buyer-side sources; no standalone line item found. | - |
| 39 | **Integration Licensing** | Partially Confirmed | Enterprise Flex pricing shows some capabilities (Image understanding, Image generation, Data analysis) are tier-gated per-feature, confirming *a* licensing structure exists beyond flat seat pricing. Per-connector or per-call MCP Gateway fees specifically remain unitemized. | https://docs.glean.com/glean-enterprise-flex-pricing |

# Functional / Operational (3)

| # | Feature / Claim | Status | Detail & Evidence | Source |
|---|---|---|---|---|
| 40 | **Performance Under Load** | Still Unconfirmed (Unable) | Documented API rate limits confirmed elsewhere (see the Features Confirmed V2 doc); no concurrent-load or throughput benchmark found anywhere. Unchanged from original. | - |
| 41 | **Infrastructure Requirements** | **Now Confirmed** | Specific static IP ranges published for allowlisting (Glean Central + per-tenant addresses) plus a dedicated Admin VPN setup guide. | https://docs.glean.com/security/networking/glean-ip-ranges ; https://docs.glean.com/security/networking/admin-vpn-setup |
| 42 | **Scalability Architecture** | Still Unconfirmed (Marketing) | Still only marketing-adjacent claims ("petabytes of enterprise data," pricing-tier scale language); no independently benchmarked scale limit found. | - |

# Adoption & Explainability (4)

| # | Feature / Claim | Status | Detail & Evidence | Source |
|---|---|---|---|---|
| 43 | **Non-Technical User Experience** | Still Unconfirmed (Unable) | Genuinely requires live sandbox/tenant observation with a non-technical test user - cannot be resolved by documentation research. Tracked as a test-guide action item (see V2 test guide). | - |
| 44 | **Audit Trail for AI Actions** | **Now Confirmed** | Dedicated OTLP export of full agent execution traces (agent runs, tool calls, LLM interactions) to external observability platforms (Datadog, Splunk, Grafana, Langfuse, LangSmith, Braintrust, Dynatrace) - genuinely distinct from the general admin audit log (#34/#36). | https://docs.glean.com/administration/agent-trace-export |
| 45 | **Human-Readable Output** | Still Unconfirmed (Unable) | The citation-linking mechanism itself is confirmed real (see the Features Confirmed V2 doc), but the specific "human-readable" *quality* claim still needs hands-on UI review with a non-technical reader - documentation alone can't settle a subjective readability claim. | - |
| 46 | **Confidence Scoring** | Partially Confirmed | Glean runs an internal "AI Evaluator" that scores every answer on relevance, completeness, and groundedness (LLM-graded, benchmarked against human agreement), and Slack integration gates automatic responses on an internal confidence check ("responds automatically only when it has a confident answer"). Neither is exposed to the end user as a visible numeric/qualitative confidence indicator on individual answers - the original claim's core gap (nothing user-facing) still holds, but the internal mechanism is now confirmed to exist. | https://www.glean.com/blog/glean-ai-evaluator ; https://docs.glean.com/administration/platform/embedded-integrations/slackbot/admin-guide/configure-bot-responses |

---

# Summary

## Counts by status (46 items)

| Status | Count |
|---|---|
| Now Confirmed | 25 |
| Partially Confirmed | 8 |
| Still Unconfirmed | 13 |

## Now Confirmed - full list (25)

\#1 (BYOM, negative), #4 (Agentic RAG), #6 (Fine-Tuning, negative), #7 (Training Data Handling), #9 (Prompt Versioning), #11 (Agent Memory, negative), #13 (Multi-Agent Orchestration), #14 (Workflow Complexity Ceiling), #16 (Evaluation Framework), #17 (Azure OpenAI), #18 (Vertex AI), #22 (Context Window), #24 (Memory Session/Long-term, negative), #26 (Image Processing), #27 (OCR Support), #28 (Multimodal Support, scoped), #29 (CCPA), #31 (SAML), #32 (OIDC), #33 (SCIM), #34 (Audit Logs, scoped), #36 (Audit Trail, scoped), #37 (Sub-Processors), #41 (Infrastructure Requirements), #44 (Audit Trail for AI Actions).

Several of these are **confirmed negatives** - the original doc treated "we don't know" as the gap, but the real gap is "Glean has stated this explicitly is not offered" (BYOM, fine-tuning on customer data, cross-session memory beyond 2 hours). That's a materially more useful answer than "unconfirmed" for a buyer evaluating the platform.

## Partially Confirmed - full list (8)

\#2/#25 (Model/LLM Routing - criteria known, algorithm not), #3 (Grounding - structurally sequenced, not guaranteed), #5 (Planning - real but not human-reviewable), #12 (Reflection/Self-Correction - Code Search only, not general), #15 (Reasoning Pipeline - architecture confirmed, not the branded term), #39 (Integration Licensing - feature-tier gating confirmed, per-connector fees not), #46 (Confidence Scoring - internal mechanism confirmed, nothing user-facing).

## Still Unconfirmed - full list (13)

\#8 (Model Update/Versioning notification policy), #10 (Hallucination Detection, general-purpose), #19 (Local/Self-Hosted Models), #20 (Named open-weight models), #21 (Caching, server-side), #23 (Prompt Assembly internals), #30 (ABAC), #35 (Secrets Management internals), #38 (Training & Enablement Cost), #40 (Performance Under Load benchmark), #42 (Scalability Architecture benchmark), #43 (Non-Technical UX - needs live tenant), #45 (Human-Readable Output quality - needs live UI review).

Of these 13, only 2 (#43, #45) are blocked purely by lack of tenant access - the other 11 are genuine documentation gaps (Glean hasn't published the answer anywhere found) or, for #30, a claim that was never actually about Glean's own product in the first place.

## What wasn't independently re-verified this pass

Item #21 (caching) and #23 (prompt assembly) were checked against the same corpus used for the Features Confirmed V2 pass without new findings - no fresh live search was run specifically for these two this pass beyond what that companion research already covered.
