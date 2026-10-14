# glean-agents

Working folder for Glean agent builds.

## Agent enhancements

Enhancement of the existing Glean agent (Outlook). 27 features, one Auto-mode agent, **80 h approved**.

| File | What it is |
|------|-----------|
| `perimeter-email-agent/Agent_80h_Approved.md` | Per-feature hours, total 80 h, ~2 weeks |
| `perimeter-email-agent/Agent_Glean_Tickets.md` | Glean design decisions, 11 tickets (6-8 h each), risks, build practices |
| `perimeter-email-agent/Agent_ADO_Tickets.md` | Azure DevOps tickets with description, execution steps, done-when |
| `perimeter-email-agent/Agent_ADO_Import.csv` | Same tickets as a CSV: 1 Feature + 11 Tasks, for Boards import |
| `perimeter-email-agent/gen_ado.py` | Generates the two ADO files above. Edit tickets here, then run `python3 gen_ado.py` |
| `perimeter-email-agent/glean-context.md` | What we learned from Glean docs and the glean.com agent pages |
| `perimeter-email-agent/prompts/` | One file per ticket, plus `instruction.md` (how to use them) and `RUN-ORDER-final.md`. Paste-ready Auto-mode prompts for Glean Agent Builder: Prompt 0 creates the one instruction document (parity with current agent); Prompts 1-10, one per stage (Prompt 10 covers EMAIL-10 and EMAIL-11), add or edit named steps (Step 1B, Step 8E and so on) |
| `perimeter-email-agent/test-plan.md` | Test cases: Part A existing behaviour, Part B each enhancement in ticket order, cross-cutting checks, regression pack, spec gaps |
| `perimeter-email-agent/EMAIL-01-runbook.md` | Execution order for EMAIL-01: admin checklist, mailer setup, spike, create agent from Prompt 0 with parity diff, Part A, Prompt 1, the EMAIL-01 test groups with seed commands and manual steps, scheduled path, sign-off |
| `perimeter-email-agent/prompt-review-findings.md` | Findings from the dry-run of all ten prompts and the test walkthroughs; Prompt 0 and Prompt 1 findings are fixed, the rest are applied ticket by ticket from EMAIL-02 |
| `perimeter-email-agent/Current Perimeter Email Agent (Glean).md` | The existing agent's prompt, kept as provided; source for parity |
| `perimeter-email-agent/test-mailer/` | Node script that sends the test plan's inbound emails through an SMTP relay (Brevo) to the test mailbox (174 entries, one JSON constant per enhancement, 118 unit tests). See its README |
| `perimeter-email-agent/agent-build-spec.md` | Auto-mode build blueprint: agent settings, SETTINGS block, stage map (steps and tool per stage), admin prerequisites, build rules, test-plan pointers, first-day spikes. The prompts are in `prompts/` |

Superseded earlier estimates (480 h, 420 h, 252 h) are intentionally not kept here.

## Open items

- Confirm the agent is built as a new Auto-mode agent from Prompt 0; the Agent Library's Delegation tracker and Intelligent reminders are reference patterns only.
- Run the EMAIL-01 and EMAIL-09 spikes in the tenant.
- Decide whether to fund a custom-tool state store (phase 2, outside the 80 h).
