# glean-agents

Working folder for Glean agent builds. Not committed.

## email-triage

Enhancement of the existing Glean Email Triage agent (Outlook). 27 features, one workflow-mode agent, **80 h approved**.

| File | What it is |
|------|-----------|
| `email-triage/Email_Triage_Agent_80h_Approved.md` | Per-feature hours, total 80 h, ~2 weeks |
| `email-triage/Email_Triage_Agent_Glean_Tickets.md` | Glean design decisions, 11 tickets (6-8 h each), risks, build practices |
| `email-triage/Email_Triage_Agent_ADO_Tickets.md` | Azure DevOps tickets with description, execution steps, done-when |
| `email-triage/Email_Triage_Agent_ADO_Import.csv` | Same tickets as a CSV: 1 Feature + 11 Tasks, for Boards import |
| `email-triage/gen_ado.py` | Generates the two ADO files above. Edit tickets here, then run `python3 gen_ado.py` |
| `email-triage/glean-context.md` | What we learned from Glean docs and the glean.com agent pages |
| `email-triage/agent-build-spec.md` | Build blueprint: inputs, 20 steps, tools, models, prompt skeletons, test plan, spikes |

Superseded earlier estimates (480 h, 420 h, 252 h) are intentionally not kept here.

## Open items

- Confirm the template-copy start (Delegation tracker + Intelligent reminders) vs a blank workflow.
- Run the EMAIL-01 and EMAIL-09 spikes in the tenant.
- Decide whether to fund a custom-tool state store (phase 2, outside the 80 h).
