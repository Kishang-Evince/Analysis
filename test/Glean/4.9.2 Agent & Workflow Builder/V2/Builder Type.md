# 4.9.2 Builder Type — Independent Research Test Guide

**Purpose:** Hands-on tenant verification of every claim in the companion research doc [V2/Builder Type.md](../../../../Glean/Combined/4.9.2%20Agent%20&%20Workflow%20Builder/V2/Builder%20Type.md). That doc's classification (Hybrid) is doc-sourced only, publicly readable, no login — this guide upgrades each claim to `Tested` against a live tenant. Written so someone with no prior context on this project can pick it up and run it.

**Tenant entry:** `https://app.glean.com` → Agents → Agent Builder
**Companion research doc:** [V2/Builder Type.md](../../../../Glean/Combined/4.9.2%20Agent%20&%20Workflow%20Builder/V2/Builder%20Type.md)
**Base field doc (untouched, original):** [../Builder Type.md](../../../../Glean/Combined/4.9.2%20Agent%20&%20Workflow%20Builder/Builder%20Type.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):**
- A Glean account with Agent Builder access (ask your Glean admin to enable this if the "Agents" tab is missing from the left nav).
- Both Auto mode and Workflow mode enabled in the tenant (same admin can confirm).
- For Sr No 7-10 only: a terminal with Python 3.10+ and `pip` installed, and a Glean API token (Admin Console → look for API/developer token settings).
- For Sr No 9 only: an MCP-capable app installed on your machine — Cursor or Claude Desktop are the easiest.
- For Sr No 11 only: one Admin identity, and access to a Git repo configured with a `.glean/agents/` folder (ask your admin if this isn't set up — if it isn't, mark this row `Blocked (no headless repo configured)`).
- For Sr No 12 only: nothing extra — this one just needs a terminal or browser.

**Sr No mapping:** Sr No 1-12 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Builder Type.md](../../../../Glean/Combined/4.9.2%20Agent%20&%20Workflow%20Builder/V2/Builder%20Type.md#claims-sr-no-1-12-mapped-to-test-guide) — same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes on what you actually saw (screenshot filename, error text, etc.). "Pass" means you personally observed the exact behavior described in the Expected Result — not that it seems plausible.

**Effort column:** each row lists an estimated time to complete plus a difficulty tag — `Easy` (routine UI clicking, quick to judge) or `Hard` (needs extra setup, external tools, or waiting) — so you can plan which rows to tackle first.

---

## Section 1 — Entry-point choice (NL vs. Scratch) — Sr No 1-3

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | When you start a new agent, Glean offers two starting choices: "Build with Natural Language" and "Start from Scratch" | 1. Log in to `https://app.glean.com`.<br>2. Click **Agents** in the left-hand navigation.<br>3. Click the **Create new agent** (or **+ New agent**) button. | You see both "Build with Natural Language" and "Start from Scratch" as two clearly labeled options on the very first screen — not one option with the other buried in a settings menu. | | | ~5 min, Easy |
| 2 | If you pick "Build with Natural Language," Glean writes the workflow steps for you automatically | 1. From the screen in Sr No 1, click **Build with Natural Language**.<br>2. In the text box, type a plain-English goal, e.g. *"Summarize a Google Doc and post the summary to a Teams channel."*<br>3. Submit it (press Enter or click the generate/build button). | Without you configuring anything else, Glean produces a list of steps (e.g. "Read document" → "Summarize" → "Post to Teams") on its own. You did not have to manually add or configure any step yourself. | | | ~10 min, Easy |
| 3 | If you pick "Start from Scratch" instead, you land in a visual, drag-and-drop-style canvas | 1. Go back to the new-agent screen (Sr No 1).<br>2. This time click **Start from Scratch** instead. | A canvas/diagram view opens showing a trigger box connected to step boxes (a flowchart-like picture), plus a side panel on the right where you can configure whichever step is selected. | | | ~5 min, Easy |

## Section 2 — Natural-language editing inside the visual canvas — Sr No 4

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 4 | Even inside the visual (Scratch/canvas) view, you can still make edits by typing plain English instead of clicking through menus | 1. Stay in the canvas view from Sr No 3 (or reopen it).<br>2. Look for a button or panel labeled something like "Open Panel," "Ask AI," or similar — usually near the top or side of the canvas.<br>3. Click it, and type a plain-English edit instruction, e.g. *"Add a step that checks if the search returned no results."* | The canvas itself updates — a new step box appears reflecting your instruction — without you having to manually drag a new block onto the canvas and wire it up by hand. | | This is the finding most in need of live confirmation — it's currently only a documentation claim, never manually observed in a live tenant | ~10 min, Easy |

## Section 3 — Workflow mode vs. Auto mode: fixed steps or does it plan on its own? — Sr No 5-6

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 5 | A Workflow-mode agent always runs the exact same steps in the exact same order, no matter what input it's given | 1. Build a simple Workflow-mode agent with 2 fixed steps (e.g. Step 1: "Read a document," Step 2: "Summarize it").<br>2. Run it once using Input A (e.g. one specific document).<br>3. Run it a second time using Input B (a different, unrelated document).<br>4. Compare the two runs' step sequence (visible in each run's trace/log). | Both runs execute the identical 2 steps in the identical order. Neither run skips a step, adds a step, or reorders anything based on what the input document contained. | | Contrast against Sr No 6, which is expected to behave the opposite way | ~15 min, Easy |
| 6 | An Auto-mode agent, by contrast, decides its own steps while it runs, and that decision can change based on the input | 1. Build an Auto-mode agent with an open-ended goal (e.g. "Research this topic and summarize what you find").<br>2. Run it with Input A.<br>3. Run it again with a meaningfully different Input B.<br>4. Compare the two runs' step/tool sequence in each run's trace. | The two runs use a genuinely different sequence of tools/steps from each other — proving the agent is deciding its own path at runtime, not replaying one fixed script. | | | ~20 min, Hard (judging whether the sequence "genuinely differs" is subjective) |

## Section 4 — Code-first paths for developers (4 separate named routes) — Sr No 7-10

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 7 | Developers can build and run an agent using only direct API calls — no framework or library required | 1. Open a terminal.<br>2. Using `curl` or the Glean SDK (no LangChain, no CrewAI, nothing else installed), call the Agents API's `create_agent` endpoint, then `create-and-stream-run` to execute it.<br>3. Confirm you get a successful response back. | The agent is created and runs successfully using nothing but raw API calls — no extra framework package was needed at any point. | | | ~20 min, Hard (needs API token + terminal comfort) |
| 8 | Glean's agent tools work inside LangChain, a popular third-party AI framework | 1. In a terminal, create a fresh Python virtual environment (`python -m venv venv` then activate it).<br>2. Run `pip install glean-agent-toolkit[langchain]`.<br>3. In a Python script, import Glean's toolkit and use it as a LangChain tool (see the toolkit's own quickstart for exact import syntax).<br>4. Run the script. | The install completes with no errors, the import works with no errors, and calling the tool actually returns real Glean search/data results (not a mock/stub). | | | ~20 min, Hard (Python environment setup required) |
| 9 | Glean can be plugged into any AI coding assistant that supports MCP (Model Context Protocol), such as Cursor or Claude Desktop | 1. Open Cursor or Claude Desktop.<br>2. In its settings, add Glean's MCP server connection (URL/config provided by your Glean admin).<br>3. In a chat with that assistant, ask something only your company's Glean data would know, e.g. *"Search Glean for our latest onboarding guide."* | The assistant returns a real, specific answer sourced from your actual company data — not a generic answer it would give without the Glean connection. | | | ~20 min, Hard (needs a separate app installed + admin-provided config) |
| 10 | The "Agent Toolkit" genuinely works with more than one framework — it's not secretly LangChain-only | 1. Repeat Sr No 8's steps, but this time run `pip install glean-agent-toolkit[crewai]` (or `[openai]`) instead of `[langchain]`.<br>2. Use the same underlying Glean retrieval tool, now inside CrewAI (or the OpenAI Agents SDK) instead of LangChain. | The exact same retrieval tool works correctly under this second, different framework, with no code changes needed to the tool itself — only to how you plug it in. | | | ~15 min, Hard (builds on Sr No 8's setup) |

## Section 5 — Headless (Git-based, code-only) builder — Auto mode agents only — Sr No 11

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 11 | The headless/Git-based way of building an agent (writing files instead of using the UI) only works for Auto-mode agents — it explicitly refuses Workflow-mode agents | 1. Using a coding-assistant CLI plugin (Claude Code, Codex, or Cursor) pointed at a Git repo that has a `.glean/agents/` folder set up, create a new **Auto-mode** agent by writing its `spec.yaml` and `instructions.md` files.<br>2. Publish/sync it and confirm it appears successfully in Glean.<br>3. Now repeat the same process but try to define a **Workflow-mode** agent instead. | Step 2 (Auto mode) succeeds — the agent appears live in Glean. Step 3 (Workflow mode) is rejected or explicitly unsupported — you should see an error or a message stating Workflow mode isn't supported through this path. | | If your organization has no `.glean/agents/` repo configured yet, mark this `Blocked (no headless repo configured)` and note who would need to set one up | ~30 min, Hard (needs a pre-configured Git repo + CLI plugin) |

## Section 6 — Infrastructure check: has Glean's Help Center been folded into its docs site? — Sr No 12

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 12 | The old `help.glean.com` help-center website now automatically forwards visitors to `docs.glean.com` — the two sites have been merged into one | **Option A (browser):** Open `https://help.glean.com/en/` in a normal browser tab and watch where it lands.<br>**Option B (terminal, more precise):** Run `curl -I https://help.glean.com/en/` and read the response headers. | **Option A:** the browser's address bar ends up showing a `docs.glean.com` URL instead of `help.glean.com`. **Option B:** the terminal output shows a `301` status line and a `Location:` header pointing at a `docs.glean.com` address. | | Websites get restructured over time — re-run this check and note today's date each time, don't assume last check still holds | ~5 min, Easy |

---

## Result Rollup

Once every row above has a Result filled in, copy the Pass/Fail/Partial/Blocked counts back into the companion research doc [V2/Builder Type.md](../../../../Glean/Combined/4.9.2%20Agent%20&%20Workflow%20Builder/V2/Builder%20Type.md): for each `Pass` row, append `+ Tested (tenant, 2026-XX-XX)` to that claim's Detail cell; for anything else, add a short note on what blocked it or what actually happened instead.

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Entry-point choice | 3 | | | | |
| 2. NL editing in canvas | 1 | | | | |
| 3. Workflow-mode vs. Auto-mode planning | 2 | | | | |
| 4. Code-first paths | 4 | | | | |
| 5. Headless / Git ADLC | 1 | | | | |
| 6. Infra finding | 1 | | | | |
