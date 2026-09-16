**Glean Tier 3 Advanced Evaluation**
**Time to Value Estimate - Independent Fresh Research (V2)**

*Independent research, sources fetched fresh this pass, checked 2026-09-09 against `docs.glean.com/get-started/start/post-launch-tasks`. Field definition: "Expected months to achieve measurable adoption and ROI." Base file at [`../Time to Value Estimate.md`](../Time%20to%20Value%20Estimate.md) left untouched - this is a standalone V2 doc, not an edit of it.*

**Sr No mapping:** rows 1-4 below map 1:1 to the same Sr No in the companion test guide [test/V2/Time to Value Estimate.md](../../../../test/Glean/4.9.10%20Use%20Case%20Library/V2/Time%20to%20Value%20Estimate.md) - same number, same claim, doc-sourced here / tenant-tested there.

---

## Headline

The ~4-week survey checkpoint is reconfirmed directly, and this pass adds one new, real detail: Glean names a specific ongoing-support role, the **Delivery Excellence Manager**, for regular post-launch check-ins - a concrete point of contact for troubleshooting and feature guidance during the exact ramp-up window this field's use-case timelines depend on. The rollout methodology itself (survey before expanding, use of Glean's own survey template, in-product announcements to mandate completion) is now more precisely documented than the base research's brief phase summary.

## Claims (Sr No 1-4, mapped to test guide)

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 1 | The ~4-week post-launch survey checkpoint is confirmed directly, with more precise detail on how it's actually administered | [docs.glean.com/get-started/start/post-launch-tasks](https://docs.glean.com/get-started/start/post-launch-tasks) | Verbatim: *"About four weeks after the kickoff to the initial wave of users, you should send out a survey to collect their thoughts and experiences."* Organizations are encouraged to use *"Glean's provided survey template"* and can *"post announcements within Glean to mandate survey completion"* - a real, in-product mechanism for driving response rates, not left to email alone. |
| 2 | **New finding**: Glean names a specific ongoing-support role - the Delivery Excellence Manager - for regular post-launch check-ins, distinct from the general account manager relationship | [docs.glean.com/get-started/start/post-launch-tasks](https://docs.glean.com/get-started/start/post-launch-tasks) | Confirmed directly: organizations are encouraged to establish *"regular check-in meetings with your account manager or Delivery Excellence Manager to address troubleshooting, explore new features, and ensure smooth deployment."* This is a concrete, named point of contact Stratos should ask about and use actively during each use case's ramp-up window, not just at initial go-live. |
| 3 | The rollout methodology explicitly sequences user-feedback collection before cohort expansion - confirmed directly as a stated best practice, not just an implied one | [docs.glean.com/get-started/start/post-launch-tasks](https://docs.glean.com/get-started/start/post-launch-tasks) | Confirmed directly: *"user feedback from the initial survey should be collected before bringing the next group of users onboard"* - expansion *"from a single department to other business units"* is explicitly gated on positive feedback, not run on a fixed calendar regardless of pilot results. This should inform how Stratos sequences its own per-use-case wave-2 expansion timing. |
| 4 | The per-use-case Week/Month timeline estimates (UC-01 through UC-08) remain accurate on cross-reference to this project's own prior V2 findings - no changes needed to the substantive timeline ranges themselves | Cross-referenced across this project's 4.9.1, 4.9.4, 4.9.6 V2 fields | Each timeline driver (crawl lag for UC-07, Collection curation time for UC-03, governance/folder-hygiene time for UC-08) traces to a specific, already-confirmed finding elsewhere in this project. This pass's fresh contribution is precision on the general rollout methodology (claims 1-3), not new per-use-case timeline data. |

## Independent read

- Claim 2's named role is a small but genuinely useful piece of process knowledge - Stratos should specifically ask whether a Delivery Excellence Manager is assigned and how to reach them, rather than relying solely on the account manager relationship (which is more sales-oriented) for operational troubleshooting during the critical ramp-up window each use case depends on.
- Claim 3's explicit feedback-gate confirmation reinforces (with a direct quote) something the base research already implied - worth having this precise, quotable language available when explaining to a client why wave-2 expansion shouldn't be scheduled on a fixed calendar date regardless of pilot results.

## Confidence

**Doc-Verified** for claims 1, 2, 3 (direct fresh fetch, verbatim quotes). **Cross-referenced** for claim 4. Validation date 2026-09-09. Tenant/hands-on verification (an actual per-use-case success-date tracking exercise) tracked in the companion test guide.

---

## Summary

| Item | Finding | Sr No |
|---|---|---|
| ~4-week survey checkpoint | Confirmed, with real administration mechanics (template, in-product mandate) | 1 |
| Delivery Excellence Manager | **New**: named ongoing-support contact role | 2 |
| Feedback-gated expansion | Confirmed as explicit stated policy, not just implied | 3 |
| Per-UC timeline estimates | Reconfirmed via cross-reference; no changes | 4 |
