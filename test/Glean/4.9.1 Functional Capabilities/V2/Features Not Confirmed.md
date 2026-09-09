# 4.9.1 Features Not Confirmed - Deep Dive Admin Test Guide

**Purpose:** Hands-on tenant/API verification for the 46-item re-verified list in the companion research doc [V2/Features Not Confirmed.md](../../../../Glean/Combined/4.9.1%20Functional%20Capabilities/V2/Features%20Not%20Confirmed.md). Focus is on the 13 items still genuinely unconfirmed and the 8 partially-confirmed items - confirm the 25 already-`Now Confirmed` items only where a quick tenant spot-check is cheap.

**Tenant entry:** `https://app.glean.com` → Admin Console
**Companion research doc:** [V2/Features Not Confirmed.md](../../../../Glean/Combined/4.9.1%20Functional%20Capabilities/V2/Features%20Not%20Confirmed.md)
**Related guide (7 tenant limitations already tested):** [../Features Not Confirmed.md](../Features%20Not%20Confirmed.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md) · **Sister deep dives:** [Features Confirmed.md](Features%20Confirmed.md) · [Undocumented Features.md](Undocumented%20Features.md)

**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.

---

## Section 1 - AI / Model Behavior (items #1–#12)

| # | Feature / Claim | Test Step | Result | Notes |
|---|---|---|---|---|
| 1 | BYOM (confirmed not offered) | **Admin → Platform → Models** - confirm the "Add LLM" flow only offers named cloud providers (OpenAI, Azure OpenAI, Vertex AI, Bedrock, Anthropic), never a custom endpoint URL field | | Sanity-check the negative finding |
| 2 | Model Routing Logic | Run a trivial chat and a complex chat under Auto mode; check **Admin → Management → Usage** billing dashboard for which model served each; compare against the documented performance/cost/quality/latency criteria | | Cannot fully resolve - algorithm internals stay a documentation gap |
| 3 | Grounding (enforced) | Ask a question with no relevant indexed content; confirm the answer declines/hedges rather than fabricating, consistent with the retrieval-first architecture | | |
| 4 | Agentic RAG (Waldo) | Ask a multi-part question requiring 2+ searches; check Admin billing/usage dashboard for "Glean" provider / "Waldo" model line item alongside the frontier model | | Confirms Waldo is live on your tenant, not just docs |
| 5 | Planning Capability | Ask a complex research question; inspect any available trace/debug view for a visible retrieval plan before the final answer | | Expect: no user-facing plan artifact (per doc finding) |
| 6 | Fine-Tuning (confirmed not offered) | Ask account team directly: "Can we fine-tune any model on our own data?" - log the verbatim answer | | Expect confirmation of "no" |
| 7 | Training Data Handling | Review your signed DPA/AI Terms Addendum for the "no training on customer data" clause; confirm it matches the public doc language | | Procurement/legal action item |
| 8 | Model Update & Versioning | Ask account team what advance notice (if any) you get before a default model is swapped/deprecated | | Still a documentation gap - resolve via account team |
| 9 | Prompt Versioning (Agent Builder) | In **Agent Builder**, open an existing agent, make an edit, and confirm draft/publish/rollback controls are visible and functional | | |
| 10 | Hallucination Detection | Deliberately ask an out-of-scope or ambiguous question; observe whether the agent declines cleanly vs. fabricates an answer | | No dedicated "flagged as hallucination" UI expected |
| 11 | Agent Memory (2hr limit) | Have a chat conversation, turn off conversation history, wait >2 hours, then ask a follow-up referencing earlier context | | **Expect:** no memory retained past ~2hr window - confirms documented limit |
| 12 | Reflection / Self-Correction | Trigger a Code Search query that initially returns empty/noisy results; observe whether the agent adjusts its search strategy automatically | | Code Search only - do not expect this in Assistant/general agents |

## Section 2 - Agents & Workflow (items #13–#16)

| # | Feature / Claim | Test Step | Result | Notes |
|---|---|---|---|---|
| 13 | Multi-Agent Orchestration | In Agent Builder, add a Sub-agent step to an existing agent; run it; confirm the sub-agent's output flows back into the parent's memory for a later step to use | | |
| 14 | Workflow Complexity Ceiling | Build a deliberately tool-call-heavy agent (many searches/loops); run it until it hits the tool-call budget or the ~30-minute scheduled-run cap; note the exact error/termination behavior | | Confirms the documented ceiling against real tenant limits (may differ by plan) |
| 15 | Reasoning Pipeline (branding) | N/A - architecture already confirmed via #3/#4; no separate tenant test needed | | Documentation-only finding |
| 16 | Evaluation Framework | In Agent Builder, look for a "Golden test set" / test-suite feature when building/launching an agent; confirm it matches the documented Happy Path / Edge / Adversarial / Permission categories | | |

## Section 3 - Model / Provider Support (items #17–#20)

| # | Feature / Claim | Test Step | Result | Notes |
|---|---|---|---|---|
| 17 | Azure OpenAI | **Admin → Platform → Models → Add LLM** - confirm Azure OpenAI appears as a selectable provider and can be configured with a tenant key | | |
| 18 | Vertex AI | Same screen - confirm Google Vertex AI (Gemini/Claude) appears and configures successfully | | |
| 19 | Local/Self-Hosted Models | Same screen - confirm no custom-endpoint option exists | | Sanity-check the negative finding |
| 20 | Ollama/Llama/Mistral/DeepSeek | Same screen - confirm none of these appear by name in the model picker | | |

## Section 4 - Architecture (items #21–#25)

| # | Feature / Claim | Test Step | Result | Notes |
|---|---|---|---|---|
| 21 | Caching | Run the identical search query twice in quick succession from the same session; compare response latency - if the 2nd call is meaningfully faster, that's observable (if indirect) evidence of server-side caching | | Cannot confirm internals, only observable behavior |
| 22 | Context Window | In Agent Builder debug mode, run a large-document step and confirm the input/output context-window percentage indicator described in release notes is visible | | |
| 23 | Prompt Assembly | Not testable via UI - would require API/support access to raw prompt construction | | Stays a documentation gap |
| 24 | Memory (Session/Long-term) | Same as #11 | | |
| 25 | LLM Routing (automation) | Same as #2 | | |

## Section 5 - Multimodal (items #26–#28)

| # | Feature / Claim | Test Step | Result | Notes |
|---|---|---|---|---|
| 26 | Image Processing | Upload an image to Glean Chat; ask a question about its visual content; confirm "Image understanding" behaves as licensed | | Confirm your plan tier includes it |
| 27 | OCR Support | Upload a scanned-image PDF to Chat (should OCR by default) and separately to an S3/OneDrive-backed connector (should NOT OCR by default); search for unique text in both; confirm the documented default-on/default-off split | | Directly tests the connector-dependent OCR finding |
| 28 | Multimodal Support (scoped) | Confirm image generation is available (if licensed); confirm no audio/video upload/understanding option exists anywhere in the UI | | Confirms scope is image-only |

## Section 6 - Security & Compliance (items #29–#37)

| # | Feature / Claim | Test Step | Result | Notes |
|---|---|---|---|---|
| 29 | CCPA | Documentation-confirmed via public privacy policy - no tenant test needed; optionally have legal confirm your DPA references it | | |
| 30 | ABAC | **Admin → Users & permissions** - confirm only role-based (RBAC) controls exist, no attribute-based policy builder (region/device/time-of-day conditions) | | Confirms the negative finding |
| 31 | SAML | **Admin → Users & permissions → SSO** - configure or review a SAML connection using the generic-SAML guide | | |
| 32 | OIDC | Same screen - configure or review an OIDC connection (Okta, Google, or Entra ID) | | |
| 33 | SCIM | **Admin → Users & permissions → People data** - confirm SCIM provisioning/deprovisioning is configured; deprovision a test user at the IdP and confirm near-real-time sync into Glean | | |
| 34 | Audit Logs | **Admin → Management → Audit logs** - confirm 30-day default retention is visible/configurable and CSV export includes the documented field set | | |
| 35 | Secrets Management | Ask account team how connector OAuth tokens/credentials are stored and rotated internally | | Still a documentation gap - account-team question |
| 36 | Audit Trail Completeness | Same as #34 | | |
| 37 | Sub-Processors | Cross-check your signed DPA's approved subprocessor list against the live list at glean.com/legal/subprocessors; flag any mismatch to legal/procurement | | Live list changes - re-check periodically |

## Section 7 - Pricing & Licensing (items #38–#39)

| # | Feature / Claim | Test Step | Result | Notes |
|---|---|---|---|---|
| 38 | Training & Enablement Cost | Ask account team for an itemized breakdown separate from implementation cost | | Procurement action item |
| 39 | Integration Licensing | Check your specific Enterprise Flex tier for which features (Image understanding, Image generation, Data analysis) are included vs. add-on; ask account team about MCP Gateway/per-connector fees specifically | | |

## Section 8 - Functional / Operational (items #40–#42)

| # | Feature / Claim | Test Step | Result | Notes |
|---|---|---|---|---|
| 40 | Performance Under Load | Run the load-test plan from the Features Confirmed V2 test guide (Section on rate limiting) at higher concurrency; record p50/p95 latency and error rate as your own benchmark since Glean publishes none | | Stop on sustained 429 - see that guide's Safety Rules |
| 41 | Infrastructure Requirements | Have network/security team allowlist the published Glean Central IP ranges and confirm connectivity; set up Admin VPN per the guide if required by your deployment | | |
| 42 | Scalability Architecture | Not independently testable at tenant scale - track your own document/query volume against subjective performance over time as an informal benchmark | | Stays a documentation gap |

## Section 9 - Adoption & Explainability (items #43–#46)

| # | Feature / Claim | Test Step | Result | Notes |
|---|---|---|---|---|
| 43 | Non-Technical User Experience | Recruit a genuinely non-technical pilot user; give them 3 realistic tasks (search, chat summary, one agent run) with zero training; time completion and log friction points verbatim | | The one item that can only be resolved this way - prioritize in the pilot |
| 44 | Audit Trail for AI Actions | **Admin console** - locate trace-export settings, configure an OTLP endpoint (e.g. a test Datadog/Grafana instance), run an agent, confirm the trace arrives with agent-run/tool-call/LLM-call spans | | |
| 45 | Human-Readable Output | Have the same non-technical pilot user (from #43) read 3 cited Assistant answers cold; ask them to rate clarity 1–5 without prompting | | Pairs naturally with #43 |
| 46 | Confidence Scoring | Ask Assistant several questions of varying answerability; confirm no numeric/qualitative confidence indicator ever appears next to an answer in the UI, even though an internal groundedness score exists | | Confirms the "nothing user-facing" finding |

---

## Result Rollup

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. AI/Model Behavior | 12 | | | | |
| 2. Agents & Workflow | 4 | | | | |
| 3. Model/Provider Support | 4 | | | | |
| 4. Architecture | 5 | | | | |
| 5. Multimodal | 3 | | | | |
| 6. Security & Compliance | 9 | | | | |
| 7. Pricing & Licensing | 2 | | | | |
| 8. Functional/Operational | 3 | | | | |
| 9. Adoption & Explainability | 4 | | | | |
| **Total** | **46** | | | | |

Copy results back into the research doc's Status column: upgrade `Partially Confirmed`/`Still Unconfirmed` rows to `Tested` where a Pass resolves them; log account-team-only items (#6, #8, #35, #38, #39) as `Blocked (procurement/account-team)` rather than a tenant test failure.

## Safety Rules

1. Item #11/#24 memory test requires waiting >2 hours - schedule it, don't rush it with a shorter wait that gives a false negative.
2. Item #40 load test reuses the Safety Rules from the Features Confirmed V2 test guide - stop on first sustained `429`.
3. Item #37 subprocessor list is legal/procurement territory - loop in legal before flagging any mismatch as a contract issue.
4. Items #43/#45 need a genuine non-technical volunteer, not an engineer play-acting - the result is only meaningful if the tester has no prior Glean exposure.
