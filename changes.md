Facts for the gate:

1. **Request:** check feasibility of the client's asks from the Radar call.
2. **Command:** read-only. Prints saved Glean platform notes from memory, to ground the feasibility check. Nothing is written.

Retrying.

Feasibility of Micah's asks. Verdicts come from saved Glean facts and the repo. Nothing tested in Glean yet.

Status column added 2026-11-18. It is based on the V2 draft agent as of 2026-11-06, the last work in the repo.

| # | Ask | Verdict | Why / work | Status |
|---|---|---|---|---|
| 1 | Per-user settings on start screen (lookback days, features, draft on/off) | Partial | Input fields exist (`[[name]]`, default values). Scheduled runs use defaults only, so per-user values work in manual runs only. Checkboxes unverified: use yes/no text fields. Per-user saved values unverified. | Done in V2. Run form with 11 inputs, checkboxes replaced by yes/no choices. A schedule takes the values chosen in Set schedule. |
| 2 | Users cannot edit agent spec | Unknown | Ask Glean who can edit a shared agent. Clone gives each user a copy. | Ignored by decision. Not in scope. |
| 3 | Run twice a day (morning and end-of-day) | Unknown, likely no | One recurrence per agent seen. Workaround: two agents sharing one instruction set. Glean support to confirm. | Ignored by decision. Not in scope. |
| 4 | Per-user schedule time | Likely yes | Triggers show "Default schedule (users can customize)". Micah could not find the control. Check. | Partly done. Set schedule is per user. No real scheduled run tested (T14). Delivery must be set to chat and email. |
| 5 | Close item, do not show tomorrow | Feasible, build | Store closed keys in user's OneDrive Excel (notes-keeper pattern works). Key by thread id, not message id (ids corrupt across agents). Filter at run start. Reopen when new mail arrives in thread. New store and command needed. | Done in V2, built differently. Uses the Outlook category "Brief: Ignored" instead of Excel. New reply brings the card back. Tests T3 to T9 not run. |
| 6 | Chat: "close 1", "email Bob, tell him handled" | Feasible, approval needed | Send email and draft tools work with write approval. Unattended runs stall on approval cards. | Half done. `Ignore N` and `Undo N` work with an approval card. Email from chat not built, out of scope. |
| 7 | Refresh brief after closing | Feasible | On-demand run. Each run takes minutes. | Done. Board redraws without the card and later runs leave it out. Not tested (T5, T6). |
| 8 | Brief in Glean side panel with chat, not email | Partial, verify | Glean shows HTML in side panel (Micah saw it). This agent's output sometimes lands in artifact panel, sometimes chat. Test. | Done with a gap. Board opens in the side panel and the email has a live board button. Cards vary between runs (T1 failed). |
| 9 | Draft on/off option | Feasible if #1 works | draft-writer creates drafts with write approval on. Needs per-run flag. | Done. Default off, replies only. Quick test passed 2026-11-06. T12 and T13 not run. |
| 10 | Faster thinking model | Unknown | Model picker exists. Benchmark pending (Dharmesh). Keep Luna meanwhile. | Open. The run is too slow now. It must be faster and still accurate. Ask Glean which model suits best. The benchmark by Dharmesh is still pending. |
| 11 | Conversation starter runs one feature only | Feasible, cheap version fits the budget | Starters max 10, no instruction budget used. Starters are hidden once the trigger is Input fields. Plan: one choice input FOCUS on the run form replaces them. Options: Full board (default), Commitments only, Waiting on others only, Meeting prep only, VIPs and topics only. Date, look back, brief type, drafts and calendar are already inputs, so they are not repeated. Display only version is cheap and keeps its rules in a skill. A real one-feature-only run skips steps and needs more main text than the 145 free characters. VIPs only is the easiest, it reads no mail. Cost: one new input, about 100 characters of main text, one skill edit, about 5 test runs at 2 to 3.5 credits each. Risks: an assistant edit wipes the ten dropdown defaults, board variance (T1) is not fixed, and a 12th input and hidden starters are not checked in the builder. | Partly done. The trigger is set to Input fields ("What type of input does it need?" = "Input Field"). The FOCUS input is not built. Next: display only filter plus VIPs only, after T1 is fixed. |
| 12 | User picks from 27 features | Partial | Depends on #1 and checkbox support. | Partly done. Only 4 section toggles exist. |

Glean support to ask: the best suitable model for speed and accuracy, checkbox inputs, per-user saved settings.
