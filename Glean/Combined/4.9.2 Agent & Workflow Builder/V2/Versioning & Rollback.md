**Glean Tier 3 Advanced Evaluation**
**Versioning & Rollback - Independent Fresh Research (V2)**

*Independent research, sources fetched fresh this pass, checked 2026-09-09 against `docs.glean.com/agents/concepts/agents-draft-version`, `docs.glean.com/agents/agent-development-lifecycle/manage-drafts-versions-and-rollbacks`, and a fresh search on the moderator approval mechanism. Field definition: "Administrative management of system revisions, workspaces, and immediate rollbacks." Base file at [`../Versioning & Rollback.md`](../Versioning%20&%20Rollback.md) left untouched - this is a standalone V2 doc, not an edit of it.*

**Sr No mapping:** rows 1-4 below map 1:1 to the same Sr No in the companion test guide [test/V2/Versioning & Rollback.md](../../../../test/Glean/4.9.2%20Agent%20&%20Workflow%20Builder/V2/Versioning%20&%20Rollback.md) - same number, same claim, doc-sourced here / tenant-tested there.

---

## Headline

The 30-version retention limit and restore-as-new-draft mechanic are reconfirmed directly. This pass also finds and precisely sources the moderator approval mechanism the base research described only generically - it's a real, named admin control: turning off *"Can share and publish agents"* for Default Members forces every publish through an Agent Moderator's review of the staged *"Ready to publish"* version. One base-research claim (permissions/sharing settings excluded from version diffs) could not be re-confirmed by the specific lifecycle-management page checked this pass and should be sourced elsewhere or confirmed hands-on.

## Claims (Sr No 1-4, mapped to test guide)

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 1 | The 30-published-version retention limit and restore-as-new-draft mechanic are confirmed directly, with version metadata (timestamp, editor) also confirmed | [docs.glean.com/agents/concepts/agents-draft-version](https://docs.glean.com/agents/concepts/agents-draft-version) | Verbatim: *"Version history stores published versions so you can review older versions and restore one as a new draft. Glean retains up to 30 published versions, identified by timestamp and editor metadata."* Restoring creates a new draft from any of the 30 retained versions, matching the base research precisely. |
| 2 | **More precisely sourced**: the moderator approval gate is a real, named admin control - turning off "Can share and publish agents" for Default Members forces every publish through an Agent Moderator reviewing a staged "Ready to publish" version | Search-corroborated - [docs.glean.com/administration/managing-agents/review-and-publish-agents](https://docs.glean.com/administration/managing-agents/review-and-publish-agents) and related pages | Confirmed: *"Admins can control when publishing changes requires approval, which lets builders stage changes for review before those changes go live to end users. For agents that require approval, agent moderators and department agent moderators review the staged version and publish it."* Also: for scheduled/background agents specifically, *"admins keep 'Can share and publish agents' off for Default Members so Agent Moderators serve as the publish gate, and moderators verify trusted inputs, enabled actions, and trigger choices before publishing."* This gives the base research's generic "Moderator gate when sharing scope requires" bullet a real, named, actionable admin setting. |
| 3 | **Needs re-verification**: the specific lifecycle-management page checked this pass does not itself confirm that permissions/sharing settings are excluded from version-history diffs - this claim should be sourced elsewhere or confirmed with a direct hands-on test rather than assumed | Absence-check against [docs.glean.com/agents/agent-development-lifecycle/manage-drafts-versions-and-rollbacks](https://docs.glean.com/agents/agent-development-lifecycle/manage-drafts-versions-and-rollbacks) | This pass's own fetch explicitly noted: *"this page does not mention... whether permissions or sharing settings are excluded from version history."* The underlying claim remains plausible (permissions are typically managed separately from content versioning in many systems) but wasn't independently reconfirmed by this specific source. |
| 4 | The moderator's role is confirmed to extend beyond just approving content changes - for scheduled/background agents specifically, moderators are described as verifying trusted inputs, enabled actions, and trigger choices, not just reviewing prompt text | Search-corroborated - same sources as claim 2 | This is a genuinely more complete picture of what a moderator review actually checks for higher-risk (scheduled/background) agents specifically, beyond a generic "approval gate" description. |

## Independent read

- Claim 2's precise sourcing turns a generic "moderator gate" bullet into an actionable admin configuration Stratos can point to directly - worth naming the specific toggle ("Can share and publish agents") when advising a client on how to set up a safe agent-governance model.
- Claim 3's honest non-confirmation matters because "permissions aren't versioned" is exactly the kind of claim that sounds intuitively true but deserves a direct check - if it turns out permissions *are* captured in version diffs, that would be a meaningfully different (and arguably better) governance story than the base research described.
- Claim 4 adds real texture to what "moderator review" means for the highest-risk agent category (scheduled/background), which is directly relevant to this project's own repeated finding that scheduled agents bypass interactive HITL confirmation.

## Confidence

**Doc-Verified** for claim 1 (direct fresh fetch, verbatim quote). **Search-corroborated, more precisely sourced than the base research** for claims 2, 4. **Absence-check, needs re-verification** for claim 3. Validation date 2026-09-09. Tenant/hands-on verification (an actual publish/restore cycle, an actual permissions-change-then-version-diff check) tracked in the companion test guide.

---

## Summary

| Item | Finding | Sr No |
|---|---|---|
| 30-version retention + restore-as-draft | Reconfirmed, exact match | 1 |
| Moderator approval gate | Precisely sourced: named "Can share and publish agents" toggle | 2 |
| Permissions excluded from version diffs | Not confirmed by this page - re-verify separately | 3 |
| Moderator review scope for scheduled agents | New, more complete detail: inputs, actions, triggers all checked | 4 |
