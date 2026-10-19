# Skills, sub-agents and resources: what we measured (2026-10-16)

Method: a private test agent ("Untitled agent", draft, never published, nothing sent) in the same Glean workspace, plus a docs check by four research agents with a second agent re-checking each answer. Test agent URL id: eb83825079fb40bc88b4bd7978f01f72.

## Results from the test agent (measured)

| Question | Result |
|----------|--------|
| Instructions limit | An empty agent shows "32000 left", so the limit is 32,000 characters. Typing 144 characters showed "31856 left". |
| Does a skill count against Instructions? | No. Two skills attached (one of 50,145 characters): counter stayed 32000 left. |
| Skill upload format | `.md` with YAML name and description, or `.zip` / `.skill` holding a `SKILL.md`. |
| Skill size cap | 50,145 characters accepted. No per-skill cap seen. Docs: 100 files, 10 MB zip, name 128, description 1,000. |
| Does the agent use a skill? | 2 of 2 draft requests ended with the skill's phrase ("Kind regards from the test skill"). The test Instructions said "follow your skills for style". Docs say skill use is not guaranteed in Auto mode. |
| Sub-agent form | Name, Description, its own Instructions with its own "32000 left" counter, Tools, Skills, Company knowledge, Reasoning mode, LLM. |
| Does a sub-agent count against the main Instructions? | No. Main counter stayed at 31856 left after adding one. |
| Sub-agent call | The main Instructions line "call the test-prep sub-agent" worked: run 1 returned the marker, run 2 got the user's text (the word "secret" produced SUBAGENT-REFUSED). Each call took about 20 seconds. |
| Resources defaults | New agent: "Use all company knowledge" is ON. Our real agent: OFF, no resources. |
| Resource sources | SharePoint (ED-Sharepoint), ED-Share, OneDrive, Microsoft 365, Teams, Glean Docs. The VIP doc search returned "No results" (doc not created yet). |

## Results from the Glean docs (documented or inferred)

- The official 32,000 limit is for the agent spec file (`instructions.md`). Name is at most 100 and description at most 300 characters, as separate fields.
- Our spec files plus the counter total about 30,960 to 31,070. The counter counts the editor's own text, which differs from our `.md` files by roughly 1,000 characters. Always plan from the counter, not from file size.
- Sub-agents: no nested sub-agents; the parent receives only the sub-agent's final result; the root Instructions must say when to delegate; a sub-agent may use skills.
- Skills: shared through Personal and Shared tabs with Owner, Editor and Viewer roles; they follow Glean's permission model; no allowed-tools field is documented (a skill cannot grant tools).
- Resources: the agent runs with the permissions of the person who invokes it ("always runs with the permissions of the current user" on the Auto mode page), so it reads only documents that person can open. Exception: an agent with an admin-attached identity. Documents are found by search, so not every run reads them; use them for stable lookup data, not for rules.
- Open points: whose permissions apply to a scheduled run is not documented. Not testable with one account. The two community posts about an 8,000-character limit concern the Workflow builder, not Auto mode.

## What this means for stages 7 to 10

- Procedure text for drafts (7, 8) and meeting prep (10) can live in skills or sub-agents at zero cost to the main 32,000.
- Skills load on demand and are not guaranteed, so a rule that must run every time should stay in main or in a sub-agent that main is told to call.
- Sub-agents hold their own tools, so the Create a draft reply tool and the calendar tool can sit on the sub-agent.
- Resource docs fit data only (VIP list, topic list, style samples). Treat their text as untrusted data in the Instructions.
- Every sub-agent must repeat the SAFETY rule on untrusted email text.

## Added after the second check of the docs (all four topics now re-checked)

- Not documented: whether a sub-agent inherits the main agent's write-approval setting. Test it on the real build before a sub-agent gets a write tool (Create a draft reply, Send email).
- Possible: the tool-call budget may cover every tool the agent calls, including delegation to sub-agents, so splitting work does not clearly add budget. Not confirmed.
- Resources: up to 500 documents per agent as knowledge sources (troubleshooting page); per-document indexing limits apply (items over 64 MB are skipped).
- Text in Instructions or in skill files is visible to every viewer of the agent. Do not put secrets or personal data there. Resource docs keep their own source permissions, enforced for the invoking user.
- Labels corrected by the checkers: "Workflow mode limit differs" is an unofficial community report; "Create new subagent" is not described in the docs (we tested it ourselves); skill loading in Auto mode is documented only as "not guaranteed" in Adaptive mode and "not available" in Fast mode, so keep the model on Thinking.
