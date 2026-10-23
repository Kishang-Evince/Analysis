# Brief template spike (2026-10-23)

Question: can a Glean agent fill the compact brief fragments for a full board in one reply, and how long does it take.

Setup: throwaway agent `363ea6796e0c401db4848a92a1ec6d70` (Auto, no tools, never published). Instructions are the fill rules plus the 18 fragments from `templates/brief/compact/` (15,244 characters), text in `../prompts/EMAIL-38-spike-brief-fill.md`. Input is the board as JSON. The golden output is `node brief-render.mjs` in `test-mailer/`.

| Run | Input | Reply | Time | Result |
|---|---|---|---|---|
| 1 | morning, 43 items (13 Must Do, 30 Waiting on Others) | 83,529 characters (golden 83,289) | about 2.5 minutes | Complete. Every field of every card present, KPIs, chart percentages and day pills equal the golden render, no leftover token, no em dash or semicolon |
| 2 | morning, 15 items, all fragments (VIP, topic, more asks, also waiting on, responses, commitments, meetings, highlights, special characters) | 34,988 characters | about 98 seconds | Complete and escaped correctly. One gap: an unsummarized meeting was written without ": not summarized" because the rule text never said how |
| 3 | end-of-day, 43 items | 81,117 characters | about 3 minutes | Structure complete, 6 tiles, right headline. One counting slip: Drafts ready said 6 instead of 7 |

Findings:
- The original inline-styled template was 191,184 characters for 43 items. The compact class based fragments give 83,289, a 56 percent cut, with the same look.
- Fill fidelity is high when the data is structured. Counting across many items is the weak point (1 slip in 3 runs).
- A 43 item brief takes about 3 minutes to write. Quoting the board in a tool call costs the same again if main has to copy it.
- Fixes already made in the prompt text: the unsummarized meeting rule, and "count every tile by going through the items one by one". The throwaway agent still holds the first text.

Local checks: `npm test` in `test-mailer/` (brief-render tests), `node brief-check.mjs brief.html fixtures/brief-morning-43.json`.
