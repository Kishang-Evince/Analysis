# 4.9.2 Custom Agent Development — Independent Research Test Guide

**Purpose:** Verification of every claim in the companion research doc [V2/Custom Agent Development.md](../../../../Glean/Combined/4.9.2%20Agent%20&%20Workflow%20Builder/V2/Custom%20Agent%20Development.md). The core finding is that fully custom agents ARE buildable — via a no-code Agent Builder (natural-language or manual step config, bound by documented tool-call/payload constraints) and via a genuine developer path supporting third-party frameworks (OpenAI, LangChain, Google ADK, CrewAI). The narrower original finding (headless builder is prompt-driven, not code-authoring; Auto mode's sandbox scope is genuinely undocumented) still holds. This guide tests both the no-code and developer-framework paths directly. Written so someone with no prior context on this project can pick it up and run it.

**Tenant entry:** A coding environment with the `/glean_run` command available · Agent Builder → Auto mode · Agents API / developer credentials for a framework-based build
**Companion research doc:** [V2/Custom Agent Development.md](../../../../Glean/Combined/4.9.2%20Agent%20&%20Workflow%20Builder/V2/Custom%20Agent%20Development.md)
**Base field doc (untouched, original):** [../Custom Code Support.md](../../../../Glean/Combined/4.9.2%20Agent%20&%20Workflow%20Builder/Custom%20Code%20Support.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):** Agents API token (Beta) or headless builder access; for Sr No 7-8, a developer environment capable of installing an agent framework SDK (e.g. OpenAI, LangChain).

**Sr No mapping:** Sr No 1-8 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Custom Agent Development.md](../../../../Glean/Combined/4.9.2%20Agent%20&%20Workflow%20Builder/V2/Custom%20Agent%20Development.md#claims-sr-no-1-8-mapped-to-test-guide) — same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes.

---

## Section 1 — Testing the headless builder and the sandbox's real scope — Sr No 1-2

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | The headless builder is prompt-driven, not code-authoring, and is limited to Auto mode agents | Use `/glean_run` in a coding environment to create a test agent, and confirm the workflow is natural-language prompt input, not writing agent logic in a programming language. Attempt to point it at a Workflow-mode agent and confirm it's rejected/unsupported. | Confirmed prompt-driven; Workflow mode agent creation via headless builder is confirmed unsupported. | | | ~30 min, Easy |
| 2 | Auto mode's sandbox can (or can't) run genuinely arbitrary computation | Give an Auto-mode agent a task requiring real intermediate computation (e.g., "calculate the median of these 50 numbers from this Sheet") and observe whether it succeeds, and if possible, how. | You get a real, first-hand answer to what the documentation left vague. | | This directly tests research's flagged documentation gap | ~20 min, Easy |

## Section 2 — Reconfirming the no-code-block finding and remaining paths — Sr No 3-4

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 3 | No code-block step exists in the Workflow canvas | Open Agent Builder's Workflow mode and confirm the full list of available step/action types contains no code/script option. | Confirmed. | | | ~15 min, Easy |
| 4 | Remaining customization paths (Agents API, Git ADLC, MCP) are accurate | Spot-check one (e.g., export/import an agent via API). | Confirmed. | | | ~15 min, Easy |

## Section 3 — Building a fully custom agent via Agent Builder (no-code) — Sr No 5-6

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 5 | Agent Builder supports both natural-language agent generation and full manual step-by-step configuration | 1. In Agent Builder, create a new agent by describing it in plain language and confirm steps are auto-generated.<br>2. Separately, create (or edit) an agent using the manual/traditional step editor and confirm you have full control over each step's configuration. | Both paths work as documented. | | | ~30 min, Easy |
| 6 | Agents are bound by tool-call budgets and payload size caps, and the headless builder cannot create Workflow-mode agents | 1. Ask your Glean account team (or check admin docs) for the actual numeric tool-call budget / payload cap values for your tenant, since the public docs confirm the constraint exists but not the exact numbers.<br>2. Build an agent with a very large expected data pull and confirm guidance to use a native connector tool (JQL/SOQL) rather than company search. | You obtain the actual numeric limits for your tenant (closing the gap the public docs leave open), and confirm the native-connector-tool guidance in practice. | | | ~20 min, Hard (needs account-team input for exact numbers) |

## Section 4 — Building a custom agent via a third-party framework (developer path) — Sr No 7-8

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 7 | Developers can build a custom agent in a third-party framework (OpenAI, LangChain, Google ADK, or CrewAI) grounded in Glean's enterprise context | Using the Agents API/toolkit, build a minimal test agent in one supported framework (pick whichever your engineering team already uses) that calls at least one Glean tool (e.g. Search). | The framework-based agent successfully calls Glean and returns grounded results. | | Pick the framework most relevant to your own engineering stack | ~2-4 hrs, Hard (needs a developer) |
| 8 | The full list of supported SDK languages (beyond Python and Go) is confirmed or clarified | Ask your Glean account/developer-relations contact directly: "What is the complete list of officially supported SDK languages for building custom agents?" | You get a definitive list, closing the gap the public marketing page leaves open. | | | ~10 min active + wait for reply, Hard |

---

## Result Rollup

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Headless builder + sandbox scope tested | 2 | | | | |
| 2. No-code-block + remaining paths confirmed | 2 | | | | |
| 3. No-code Agent Builder full-custom-agent build | 2 | | | | |
| 4. Developer/framework-based custom agent build | 2 | | | | |
