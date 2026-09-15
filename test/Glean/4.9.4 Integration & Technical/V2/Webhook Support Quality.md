# 4.9.4 Webhook Support Quality - Independent Research Test Guide

**Purpose:** Hands-on verification of every claim in the companion research doc [V2/Webhook Support Quality.md](../../../../Glean/Combined/4.9.4%20Integration%20&%20Technical/V2/Webhook%20Support%20Quality.md). The core finding there is that inbound and outbound webhooks are both real but neither has a documented reliability guarantee - and a generic Glean blog post about webhooks in general should not be mistaken for a spec of Glean's own product. This guide's job is to actually measure latency in both directions and confirm the outbound API's experimental status live. Written so someone with no prior context on this project can pick it up and run it.

**Tenant entry:** Admin Console → Platform → Connectors (for inbound webhook setup, e.g. Jira) · a terminal with `curl` and a Platform API token (for the outbound Triggers API checks - this half genuinely needs developer/API access)
**Companion research doc:** [V2/Webhook Support Quality.md](../../../../Glean/Combined/4.9.4%20Integration%20&%20Technical/V2/Webhook%20Support%20Quality.md)
**Base field doc (untouched, original):** [../Webhook Support Quality.md](../../../../Glean/Combined/4.9.4%20Integration%20&%20Technical/Webhook%20Support%20Quality.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):**
- Admin access to the Glean Admin Console.
- A connector that supports inbound webhook configuration. **Jira** is a good, commonly-available choice - Glean sets up real-time webhook sync for it automatically (Cloud) or via a simple one-time setup (Data Center). Confluence works similarly. If your organization uses a less common connector like Shortcut, that works too - the research doc's specific URL pattern example came from Shortcut, but the underlying mechanism is the same across connectors that support it.
- A Platform API token and terminal with `curl`, for the outbound Triggers API checks (Sr No 4-5 only) - this half is genuinely developer-facing since Glean has no UI for managing trigger subscriptions. If you're not a developer, ask one on your team to run Sr No 4-5 and share the results, or mark those rows `Blocked (no API access available)`.
- A stopwatch or phone timer, for the latency measurements.

**Sr No mapping:** Sr No 1-7 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Webhook Support Quality.md](../../../../Glean/Combined/4.9.4%20Integration%20&%20Technical/V2/Webhook%20Support%20Quality.md#claims-sr-no-1-7-mapped-to-test-guide) - same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes on exactly what you observed. "Pass" means you personally saw it happen - not that the docs say so.

**Effort column:** each row lists an estimated time to complete plus a difficulty tag - `Easy` (routine doc/UI check, quick to judge) or `Hard` (needs API access, connector setup, or timed testing) - so you can plan which rows to tackle first.

---

## Section 1 - Confirming inbound and outbound are genuinely two separate things - Sr No 1

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | Inbound (a connector pushing events into Glean) and outbound (Glean's Triggers API pushing events out) are two separate, independently-configured mechanisms | 1. Find one connector in your tenant that supports inbound webhook configuration (check its setup docs/settings for a webhook URL field).<br>2. Separately, locate the outbound Triggers API documentation/settings.<br>3. Confirm these are configured completely independently of each other (different settings screens, different credentials). | You confirm two distinct configuration surfaces, not one shared webhook setting. | | | ~15 min, Easy [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |

## Section 2 - Testing the inbound direction: does it actually work, and how fast? - Sr No 2-3

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 2 | The inbound webhook setup works as documented for real-time sync, and no signing-verification detail or latency figure is published | 1. Confirm your chosen connector's real-time/webhook sync is set up (for Jira this is largely automatic once the connector is installed; check Admin Console → Connectors for its status).<br>2. Trigger a real change in the source system (e.g. edit a test Jira issue's title or add a comment).<br>3. Time how long it takes for that change to be reflected in Glean's index/search results.<br>4. Look for any documentation on how requests are verified/signed for your connector (HMAC signature check, etc). | You get a real timing number for how long the inbound update takes end-to-end, and you confirm whether or not signing-verification mechanics are documented anywhere you can find. | | This closes a real gap - no latency figure exists in public docs, so your measurement is the first real data point | ~30 min, Hard (needs connector access + real change + timing) [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |
| 3 | Inbound webhook events genuinely power an agent's "content trigger" - an agent actually runs automatically when the connected tool's content changes | 1. Build a simple agent with a content trigger tied to the same connector/content you changed in Sr No 2.<br>2. Make another change to that content.<br>3. Confirm the agent runs automatically without manual triggering. | The agent runs on its own shortly after the content change, confirming the inbound-webhook-to-agent-trigger pipeline works end-to-end. | | | ~20 min, Hard (needs agent setup) [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |

## Section 3 - Testing the outbound direction: signed, scoped, but still experimental? - Sr No 4-5

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 4 | The outbound Triggers API requires the experimental header, delivers HMAC-SHA256-signed Standard Webhooks, and is scoped to what the subscribing user can see | 1. In a terminal, call the Triggers API's preset-list endpoint **without** the `X-Glean-Include-Experimental: true` header - confirm it 404s or is hidden.<br>2. Retry **with** the header - confirm it now works.<br>3. Set up a real trigger subscription pointing at a test endpoint you control (e.g. a webhook testing tool like webhook.site) and confirm you receive a signed payload; verify the HMAC-SHA256 signature using the provided secret. | Step 1 confirms the experimental gate is real. Step 3 confirms real signed delivery, with a valid HMAC-SHA256 signature you can independently verify. | | | ~30 min, Hard (needs API token, terminal, a webhook test endpoint) [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |
| 5 | No retry policy or delivery guarantee is documented - test whether one exists in practice by observing real behavior | 1. Set up a trigger subscription pointing at an endpoint you control that deliberately returns an error (e.g. HTTP 500) or times out.<br>2. Trigger the underlying event.<br>3. Observe whether Glean retries the delivery, and if so, how many times and at what interval. | You get real, observed retry behavior (or confirm there is none) - filling a gap the documentation itself doesn't address. | | | ~25 min, Hard (needs a controllable test endpoint that can simulate failure) [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |

## Section 4 - Making sure the general "what are webhooks" blog isn't mistaken for Glean's own spec - Sr No 6

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 6 | The `glean.com/blog/what-are-webhooks` post is general education, not a documented commitment about Glean's own Triggers API behavior - confirm your Sr No 5 observations match (or don't match) what that post describes | 1. Re-read the blog post's claims (at-least-once delivery, 1-5 second provider timeout norms, retry-on-failure).<br>2. Compare directly against what you actually observed in Sr No 5.<br>3. Note explicitly whether Glean's real behavior matches this general industry description or differs from it. | You get a direct comparison: does Glean's actual outbound webhook behavior match the general pattern described in its own educational blog post, or not? Either answer is useful - document it either way. | | This turns a "don't cite this as spec" caution into an actual data point about whether the real behavior happens to match general best practice anyway | ~10 min, Easy (builds on Sr No 5) [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |

## Section 5 - Confirming there's no universal webhook-to-agent endpoint - Sr No 7

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 7 | There is no single, general-purpose public URL you can call to trigger any agent - only connector-specific inbound webhooks and content triggers | 1. Search Admin Console and Agent Builder thoroughly for any "generic webhook trigger" or "get a webhook URL for this agent" option.<br>2. Confirm the only trigger mechanisms available are the named types (chat message, input form, content/connector-based). | You find no general-purpose webhook-to-agent endpoint - only the specific, named trigger types. | | | ~15 min, Easy [OPTIONAL - deprioritized 2026-09-14, see scrap/GLEAN_RESEARCH_MEMORY.md] |

---

## Result Rollup

Once every row above has a Result filled in, copy the Pass/Fail/Partial/Blocked counts back into the companion research doc [V2/Webhook Support Quality.md](../../../../Glean/Combined/4.9.4%20Integration%20&%20Technical/V2/Webhook%20Support%20Quality.md), and specifically add the real latency and retry-behavior numbers from Sr No 2 and 5 - those close the field's two biggest documented gaps.

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Inbound/outbound are separate mechanisms | 1 | | | | |
| 2. Inbound: works, latency measured, content trigger fires | 2 | | | | |
| 3. Outbound: experimental gate + signing + retry behavior | 2 | | | | |
| 4. Blog post vs. real observed behavior | 1 | | | | |
| 5. No universal webhook-to-agent endpoint | 1 | | | | |
