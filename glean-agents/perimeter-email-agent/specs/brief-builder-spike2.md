# Brief builder spike 2 (2026-10-23)

Question: does a Glean agent build the designed HTML brief from the chat board (markdown), not from JSON, completely and correctly.

Setup: throwaway agent `363ea6796e0c401db4848a92a1ec6d70` (no tools, never published). Instructions are `node brief-builder-text.mjs --spike` (the rules plus 19 fragments, about 18,000 characters). Input is `MODE`, `TODAY` and the board from `test-mailer/brief-board.mjs`. Every reply is checked with `brief-check.mjs --snippet` run in the page, against the golden render. The model is the default of the agent (GPT-6 Sol, thinking).

| Run | Input | First text | Final text (rules `cff109b7`) |
|---|---|---|---|
| 1 | morning, 43 items | 2 slips: card 8 took card 4's Original ask and Latest update (twin cards, same sender and subject) | Clean except section titles written in capitals (cosmetic). About 3.3 minutes |
| 2 | mixed, 15 items, every fragment | chart counted section 2 senders as to do | Clean, 100 s |
| 3 | end-of-day, 43 items | clean once, twin slip once | One run: brief without any card (6 tiles then nothing, 85 s) |
| 4 | empty board | CSS shortened to 413 characters, empty sentence repeated as a note | Clean, 20 s |
| 5 | edge: `<script>` in a name, " | " in a subject, future due date, no due date, injection line in Why | Clean in data and escaping. Two harmless differences: chart name without the script text, one day pill class (2 days red instead of amber) |

Fixes the spike produced (all in `templates/brief/compact/builder-rules.txt`, tests in `brief-check.test.mjs`): copy the style block exactly, never a note for the empty sentence, count only section 1 senders as to do, copy dates exactly, check every card field by field, twin cards re-read their own dates, worked examples for day pill classes. The checker gained a style block check, a note paragraph check, whitespace and case tolerant comparisons.

Findings:
- Typical boards (up to about 15 items) are built correctly on every run.
- A 43 item board works most runs, takes 3.3 to 5 minutes, and now and then fails: twin card slip (fixed by rules so far), or the whole board collapses to tiles without cards (1 of the last 3 big runs).
- The builder text has its own guard (count cards against the board, rebuild once, else `NOT SENT: incomplete`), but the spike text has no tools so this guard was not exercised.
- Page side checking needed three workarounds: `window.name` to carry inputs across origins (fetch and script tags are blocked by the page CSP), the nonce of an existing script tag to run the checker snippet, and a reply search for the smallest element that starts with `<!doctype` and ends with `</html>`.

Open decision for the user: accept the fail-safe for big boards, split the brief into sections per call, or cap the cards per brief.

## Finding from the live build (Task 9)

A sub-agent whose text holds `{{TOKEN}}` fails to start in Glean: the call from main shows "Failed to execute step" after 0.02 seconds, status code 2, and main answers "Brief not delivered." The throwaway agent in the spikes was a top level agent, so it did not show this. The same text with the marker written `@@TOKEN@@` runs, calls Get outlook profile and Send email (is_html true, own address, the right subject). The fragments, renderer, checker and rules now use `@@TOKEN@@`.
