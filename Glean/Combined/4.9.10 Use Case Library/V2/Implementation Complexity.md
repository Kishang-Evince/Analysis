**Glean Tier 3 Advanced Evaluation**
**Implementation Complexity — Independent Fresh Research (V2)**

*Independent research, checked 2026-09-09 against `docs.glean.com/administration/agent-identity/overview` and general search, cross-referenced against this project's own extensive prior V2 findings. Field definition: "Estimated engineering complexity to configure the workflow (Low, Med, High)." Base file at [`../Implementation Complexity.md`](../Implementation%20Complexity.md) left untouched — this is a standalone V2 doc, not an edit of it.*

**Sr No mapping:** rows 1-4 below map 1:1 to the same Sr No in the companion test guide [test/V2/Implementation Complexity.md](../../../../test/Glean/4.9.10%20Use%20Case%20Library/V2/Implementation%20Complexity.md) — same number, same claim, doc-sourced here / tenant-tested there.

---

## Headline

This pass finds a real, potentially complexity-reducing mitigation for UC-05 (Auto Agent Document Summarization) not captured in the base research: Glean's "Agent Identity" concept allows a scheduled agent to run independent of any individual user's login session or OAuth token — meaning a properly-configured agent doesn't break when the configuring user goes on vacation, changes roles, or resets their password. This is directly relevant to the base research's own flagged complexity driver ("per-user OAuth for tools") and represents a real way to reduce, not just accept, that specific complexity source. No vendor-published setup-hour figures were found anywhere — confirming the base research's own hour estimates remain Stratos's internal estimates pending actual sandbox measurement, not externally verifiable numbers.

## Claims (Sr No 1-4, mapped to test guide)

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 1 | **New finding**: Glean's "Agent Identity" concept allows scheduled agents to run independent of any individual user's OAuth session — directly mitigating the base research's own flagged UC-05/07 complexity driver of per-user OAuth fragility | [docs.glean.com/administration/agent-identity/overview](https://docs.glean.com/administration/agent-identity/overview) | Confirmed via search: *"Scheduled work can run without depending on a login session — for example, a Jira ticket autoresponder keeps working through vacations, role changes, and password resets because it isn't using an OAuth token of any person."* This means the OAuth-fragility complexity driver flagged for UC-05 can potentially be architected around using Agent Identity rather than accepted as an inherent limitation — worth investigating during actual pilot configuration rather than assumed as an unavoidable ongoing maintenance cost. |
| 2 | No vendor-published setup-hour or configuration-time figures were found anywhere for Agent Builder or OAuth setup — the base research's hour estimates (4-32h range across use cases) remain Stratos's own internal estimates, appropriately labeled Pending Sandbox rather than externally verifiable | Absence-check, fresh search this pass | Confirmed: search results returned only general conceptual documentation (OAuth overview, agent identity, authentication guides) with no specific timing figures anywhere. This reconfirms, rather than changes, the base research's own honest "Pending Sandbox" confidence labeling for the hour estimates. |
| 3 | The Notion ACL gap and per-user OAuth complexity drivers named for UC-05, UC-07, and UC-08 remain accurate on cross-reference to this project's own extensive prior V2 research | Cross-referenced across this project's 4.9.1, 4.9.4, 4.9.5 V2 fields | Both drivers trace to specific, already-confirmed findings elsewhere in this project (the Notion structural oversharing gap, and the general OAuth-per-tool authorization requirement for agent actions). No changes needed to these complexity-driver attributions. |
| 4 | The base research's UC-08 "High if compliance requires Notion per-user ACL" escalation condition remains the correct, honest framing — this project's own 4.9.5 research already confirmed there is no way to achieve true per-user Notion ACL enforcement on the indexed path, only Live Mode (which requires per-user OAuth setup, itself a real adoption dependency) | Cross-referenced from this project's 4.9.5 Access Control Granularity V2 field | This is worth restating plainly: if a client's compliance requirement is strict and non-negotiable per-user Notion ACL enforcement, UC-08 (and any Notion-touching use case) may not be achievable at all through the standard indexed path — Live Mode is the only path, and it depends on every relevant user completing individual OAuth setup, which is itself an adoption risk already flagged in this project's 4.9.6 research. |

## Independent read

- Claim 1 is a genuinely useful, actionable finding — it suggests a concrete configuration choice (using Agent Identity rather than a named user's OAuth token for scheduled agents) that could meaningfully reduce one of this field's own flagged ongoing-maintenance risks, and should be tested directly during pilot configuration.
- Claim 4's restatement is intentionally blunt: this field's complexity ratings shouldn't be read as "hard but achievable at High complexity" for UC-08 under strict compliance requirements — the honest finding, carried over from 4.9.5, is that it may not be achievable in the standard indexed form at all, only via Live Mode with its own adoption dependency.

## Confidence

**Search-corroborated** for claim 1 (documentation content found via search, not a fully successful direct fetch of the specific page — worth a live-browser confirmation). **Absence-check** for claim 2. **Cross-referenced, high confidence** for claims 3, 4. Validation date 2026-09-09. Tenant/hands-on verification (actual configuration hours logged, an actual Agent Identity test) tracked in the companion test guide.

---

## Summary

| Item | Finding | Sr No |
|---|---|---|
| Agent Identity as an OAuth-fragility mitigation | **New finding** — worth testing for UC-05/07 | 1 |
| Vendor-published setup-hour figures | Confirmed absent — estimates remain Stratos-internal | 2 |
| Notion ACL / OAuth complexity drivers | Reconfirmed via cross-reference | 3 |
| UC-08 "High" escalation framing | Reconfirmed, restated bluntly: may not be achievable at all without Live Mode | 4 |
