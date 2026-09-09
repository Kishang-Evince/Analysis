# 4.9.2 Agent Autonomy Level - Independent Research Test Guide

**Purpose:** Hands-on tenant verification of every claim in the companion research doc [V2/Agent Autonomy Level.md](../../../../Glean/Combined/4.9.2%20Agent%20&%20Workflow%20Builder/V2/Agent%20Autonomy%20Level.md). Two genuine documentation gaps were flagged there (the exact tool-call budget number is never published; how an agent handles a totally unexpected input is never documented) - this guide's job is to try to close those two gaps by actually observing the behavior, not by re-reading docs. Written so someone with no prior context on this project can pick it up and run it.

**Tenant entry:** `https://app.glean.com` → Agents → Agent Builder, and Admin Console → Glean Protect
**Companion research doc:** [V2/Agent Autonomy Level.md](../../../../Glean/Combined/4.9.2%20Agent%20&%20Workflow%20Builder/V2/Agent%20Autonomy%20Level.md)
**Base field doc (untouched, original):** [../Agent Autonomy Level.md](../../../../Glean/Combined/4.9.2%20Agent%20&%20Workflow%20Builder/Agent%20Autonomy%20Level.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):**
- A Glean account with Agent Builder access.
- Admin or Super Admin access to **Glean Protect** in the Admin Console (needed for Sr No 9-12 - the agent access policy tests).
- One write-capable connector turned on in the tenant - Google Docs is easiest - needed for Sr No 6-8 (the write-confirmation tests).
- Two separate user logins: "Admin A" (full admin rights) and "User B" (a regular member account with no special/admin permissions, and - importantly - no access to at least one test document you'll set up in Sr No 12).

**Sr No mapping:** Sr No 1-15 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Agent Autonomy Level.md](../../../../Glean/Combined/4.9.2%20Agent%20&%20Workflow%20Builder/V2/Agent%20Autonomy%20Level.md#claims-sr-no-1-15-mapped-to-test-guide) - same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes describing exactly what you saw (the real number you found, the exact error text, a screenshot filename, etc.). "Pass" means you personally observed the exact behavior described in Expected Result - not that it seems plausible.

**Effort column:** each row lists an estimated time to complete plus a difficulty tag - `Easy` (routine UI clicking, quick to judge) or `Hard` (needs extra setup, deliberate stress-testing, or waiting) - so you can plan which rows to tackle first.

---

## Section 1 - Does the agent plan its own steps, or follow a fixed script? - Sr No 1-2

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | An Auto-mode agent decides for itself, while running, which tools to use and in what order | 1. Build an Auto-mode agent with an open-ended goal that needs 2 or more tools (e.g. "find the latest SOW draft and summarize it").<br>2. Run it.<br>3. Open the run's trace/log view. | The trace shows the agent choosing between multiple possible tools/steps as it goes - not a single hard-coded list that was decided before the run started. | | | ~15 min, Easy |
| 2 | A Workflow-mode agent, by contrast, always runs the same fixed steps regardless of input | 1. Build a Workflow-mode agent with 2 fixed steps.<br>2. Run it twice with two different inputs.<br>3. Compare both runs' step sequence in their trace logs. | Both runs show the exact same step sequence, unaffected by the different inputs. | | Same underlying test as the Builder Type guide's Sr No 5 - if you already ran that one, you can reuse the result here | ~15 min, Easy (or ~0 min if reused from Builder Type guide) |

## Section 2 - Hard limits on how much an agent can do in one run (closing a real documentation gap) - Sr No 3-5

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 3 | There's a maximum number of tool calls an agent is allowed to make in a single run, but Glean's own documentation never states what that number actually is | 1. Build an agent that's deliberately inefficient - instead of fetching many records in one batch, have it fetch them one at a time in a loop, so it racks up tool calls quickly.<br>2. Run it and let it keep going until it stops on its own (hits the limit) or clearly fails.<br>3. Open the trace/log and count exactly how many tool calls happened before it stopped, and copy the exact error or cutoff message shown. | You get a real, specific number (e.g. "it stopped after exactly 47 tool calls") and the exact wording of whatever message appeared - this is the number the public docs never give you. | | This is the most important row in this section - write down the literal number and message, don't paraphrase | ~30 min, Hard (needs a deliberately inefficient agent design + patience) |
| 4 | Each tool call has a maximum response size, and if the real data is bigger than that, the result gets silently cut off (truncated) | 1. Point an agent at something likely to return a very large result - a broad, unfiltered search query is a good choice.<br>2. Run it.<br>3. Open the trace for that specific tool call and look for any indicator that the response was cut short (a "truncated" flag, a result count that looks suspiciously round, etc). | You can confirm whether truncation happened, and if so, roughly at what size/row count it kicked in. | | | ~20 min, Hard (needs a broad enough query to actually hit the cap) |
| 5 | Scheduled (recurring) agent runs are cut off after about 30 minutes, and when that happens the user doesn't get a clear, helpful error message | 1. Set up a recurring/scheduled agent run using a deliberately slow or long-running task (or point it at something you know will be slow).<br>2. Let it run past the 30-minute mark without intervening.<br>3. Note exactly what happens - does it just vanish, does an error appear, is there a partial result? | You can describe in plain words exactly what the end user sees and experiences at the moment of cutoff - confirming or correcting the research finding that the error message isn't clear. | | | ~35 min elapsed (mostly waiting), Hard |

## Section 3 - Does Glean ask for your permission before an agent takes a real action? - Sr No 6-8

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 6 | Before an agent does anything that writes/changes something (like creating a document), it stops and shows you a confirmation screen first - and this is the default behavior, not something you have to turn on | 1. Build or run an agent that includes a write step, e.g. "draft a Google Doc."<br>2. Run it and watch closely as it reaches that step. | Before the document actually gets created/changed, a confirmation panel appears on screen showing which app it's about to act in and exactly what change it's about to make. Nothing is written until you respond to this panel. | | | ~10 min, Easy |
| 7 | On that same confirmation panel, you can edit the planned change before approving it, if the action supports editing | 1. When the confirmation panel from Sr No 6 appears, look for an edit option.<br>2. Change something about the planned action (e.g. edit the draft text).<br>3. Approve it. | The version that actually gets written reflects your edit, not the original unedited version the agent first proposed. | | | ~10 min, Easy |
| 8 | An administrator can turn off the confirmation step for one specific, chosen action - but this has to be done deliberately per action, it isn't a single global switch that turns off confirmations everywhere | 1. Log in as Admin A.<br>2. Find the setting to mark one specific write action as "Run without user confirmation" (or similarly named) - this is usually in the agent or tool's own settings.<br>3. Turn it on for just that one action.<br>4. Re-run the agent and confirm that specific action now skips the confirmation panel.<br>5. Check that any *other* write actions in that same agent still show the confirmation panel as normal. | The one action you specifically opted out now runs without a pause, while every other write action in the same agent still pauses for approval as before. | | This confirms the opt-out is scoped to one action, not a blanket setting | ~15 min, Easy |

## Section 4 - Admin-configured safety rules that run automatically (separate from the confirmation screen above) - Sr No 9-12

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 9 | An admin can write a rule that blocks a specific tool call from running at all, before it ever executes | 1. Log in as Admin A, go to Glean Protect's agent access policy settings.<br>2. Create a new policy with a rule that would block a specific kind of tool call (e.g. block any call where a parameter matches a value you choose).<br>3. Run an agent that would normally trigger that exact call. | The call never executes - it's blocked before it runs, and this should be visible in the agent's trace/log as a blocked/denied step. | | | ~20 min, Hard (requires writing a CEL rule condition) |
| 10 | An admin can also write a "softer" rule that only removes the sensitive parts of a result, instead of blocking the whole thing | 1. As Admin A, create a policy set to "filter" (not "block") - e.g. a rule that strips out documents owned by a particular group from search results.<br>2. Run an agent whose results would normally include some of those documents alongside other, unrelated documents. | The final result still contains the unrelated documents, but the specific flagged ones are missing - proving only the flagged items were removed, not the entire result set. | | | ~20 min, Hard (requires writing a CEL rule condition + mixed test data) |
| 11 | An admin can also set a rule to just log/flag something for review, without actually stopping it from happening | 1. As Admin A, create a policy set to "flag for review" only.<br>2. Run an agent action that would trigger that rule. | The action still completes normally (nothing was blocked), but a log entry documenting the flagged event appears somewhere an admin/auditor can review it. | | | ~15 min, Easy |
| 12 | These admin rules are an extra safety layer on top of normal permissions - they don't replace the basic rule that you can't see documents you were never given access to in the first place | 1. As User B (someone with no access to a specific test document, and with **no** special agent access policy configured for this test), have an agent try to retrieve that document. | User B still gets no access to that document - proving normal permission rules alone already block it, with no extra Glean Protect policy needed. | | | ~10 min, Easy |

## Section 5 - What happens when an agent hits something it doesn't understand? (closing a real documentation gap) - Sr No 13

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 13 | Glean's documentation never states what an agent does when it receives an input it wasn't built to handle - does it try again, ask you a clarifying question, fail with a clear error, or crash unhelpfully? | 1. Build any working agent.<br>2. Deliberately give it a bad or nonsensical input - e.g. ask it to act on a document that doesn't exist, or give it a request outside anything it was designed to do.<br>3. Run it and watch exactly what happens, step by step. | You can write down, in plain words, exactly what the agent actually did - this observed behavior is the answer, since nothing in the public docs states it in advance. | | This directly closes the gap flagged in the research doc - whatever you observe here becomes the real answer | ~15 min, Easy |

## Section 6 - Ongoing oversight after an agent is published - Sr No 14-15

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 14 | Glean actually shows usage/health metrics for published agents inside the product - not just something described in the docs | 1. Go to the Admin Console's Insights/Agents section (exact menu name may vary - look for anything about agent usage or analytics).<br>2. Open the page for one published agent. | You can see real numbers for: how many people use it weekly, how many times it's run, positive vs. negative feedback, and error/permission-denied rates - all populated with actual data, not blank or "coming soon" placeholders. | | | ~10 min, Easy |
| 15 | There is no "emergency stop" button to instantly disable a misbehaving agent - the only real control is deprecating/retiring it | 1. As Admin A, open a published agent's settings.<br>2. Look specifically for a control that immediately disables or pauses the agent right now, separate from editing it or marking it deprecated. | Either you find no such immediate-stop control (confirming the research finding), or you do find one (which would contradict the research finding - note exactly what it's called and where it is if so). | | | ~10 min, Easy |

---

## Result Rollup

Once every row above has a Result filled in, copy the Pass/Fail/Partial/Blocked counts back into the companion research doc [V2/Agent Autonomy Level.md](../../../../Glean/Combined/4.9.2%20Agent%20&%20Workflow%20Builder/V2/Agent%20Autonomy%20Level.md), and specifically update the Summary table's two "Not disclosed"/"Undocumented" rows with the real numbers/behavior you found in Sr No 3 and Sr No 13.

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Autonomy by mode | 2 | | | | |
| 2. Hard execution limits | 3 | | | | |
| 3. Write-action confirmation | 3 | | | | |
| 4. Admin runtime policy | 4 | | | | |
| 5. Unknown-input behavior | 1 | | | | |
| 6. Post-deployment governance | 2 | | | | |
