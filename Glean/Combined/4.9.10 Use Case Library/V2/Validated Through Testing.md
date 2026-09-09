**Glean Tier 3 Advanced Evaluation**
**Validated Through Testing — Independent Fresh Research (V2)**

*Independent research, checked 2026-09-09. Unlike most fields in this project, this field's actual status is fundamentally an internal sandbox-testing record — it cannot be advanced by web research alone, only by actually running UC10-T01 through UC10-T08 in the sandbox. This V2 pass's real contribution is cross-referencing what this project's own extensive V2 research elsewhere has already established as indirect, relevant evidence for the currently-"NO" use cases, and correcting one specific gap description using a newer finding. Field definition: "Flag indicating if use case was physically built and verified in sandbox without unhandled errors." Base file at [`../Validated Through Testing.md`](../Validated%20Through%20Testing.md) left untouched — this is a standalone V2 doc, not an edit of it.*

**Sr No mapping:** rows 1-4 below map 1:1 to the same Sr No in the companion test guide [test/V2/Validated Through Testing.md](../../../../test/Glean/4.9.10%20Use%20Case%20Library/V2/Validated%20Through%20Testing.md) — same number, same claim, doc-sourced here / tenant-tested there.

---

## Headline

This field's 2-Partial/6-Pending status cannot be honestly changed by web research — it requires actually building and running the eight sandbox tests. What this pass can and does contribute: a correction to UC-05's gap description using this project's own newer Implementation Complexity V2 finding (the "OAuth `tools_unauthorized` edge cases" gap may be reducible via Agent Identity, not just an inherent limitation to accept), and a reminder that this project's own separate hands-on testing across 4.9.1, 4.9.5, and 4.9.9 (ACL negative tests, Notion oversharing tests) constitutes real, relevant evidence that should inform — but not substitute for — the specific UC10-T0x sandbox tests this field actually requires.

## Claims (Sr No 1-4, mapped to test guide)

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 1 | This field's status cannot be advanced by external research — the 2-Partial/6-Pending status accurately reflects that the specific UC10-T01 through UC10-T08 sandbox tests have not all been run, and no amount of web research substitutes for actually running them | Absence-check, by design | This is the correct, honest state to report. Any temptation to mark additional use cases "YES" based on adjacent evidence from other fields would overstate what has actually been verified for this specific field's specific test protocol. |
| 2 | **Correction to UC-05's gap description**: the "OAuth `tools_unauthorized` edge cases" gap is not necessarily a permanent limitation to document as inherent — this project's own newer Implementation Complexity V2 finding (Agent Identity) suggests a real, testable mitigation path that should be tried as part of closing this gap, not just noted as an accepted risk | Cross-referenced from this project's own 4.9.10 Implementation Complexity V2 field (claim 1) | When UC10-T05 is actually run, it should specifically test whether configuring the agent with Agent Identity (rather than a personal OAuth token) resolves the `tools_unauthorized` edge case, rather than simply re-confirming the edge case exists and moving on. |
| 3 | This project's own separate hands-on testing elsewhere (4.9.1's ACL negative tests, 4.9.5's Notion oversharing tests, 4.9.9's fresh ACL re-test) constitutes real, relevant, already-completed evidence bearing on UC-01, UC-02, and UC-08's underlying technical viability — but this is evidence for those *capabilities*, not a substitute for running the specific UC10-T0x tests this field requires, which validate the *end-to-end use case as configured*, not just the underlying capability in isolation | Cross-referenced across this project's 4.9.1, 4.9.5, 4.9.9 V2 fields | This distinction matters: knowing that permission-aware search works (a capability test) is necessary but not sufficient to mark UC-01 fully validated — the use case also requires confirming the specific configured workflow (unified query across all 7 tenant connectors, in the actual pilot content) works end-to-end, which is what UC10-T01 specifically tests. |
| 4 | The three "NO" use cases (UC-03, UC-06, UC-07) each have real, already-confirmed underlying capabilities elsewhere in this project (Collections/Answers curation, Go Links, Gmail/Outlook federated search) — meaning their path to "PARTIAL YES" is likely to be building/configuring content rather than discovering new capability gaps | Cross-referenced across this project's 4.9.1, 4.9.6 V2 fields | This is a useful planning distinction: UC-03/06/07's "NO" status reflects that the specific sandbox artifacts (a curated onboarding Collection, authored top-20 FAQs, a timed email-thread-prep test) haven't been built yet — not that the underlying Glean capabilities are unconfirmed or in doubt. This should shape prioritization: these three are likely faster to move to "PARTIAL YES" than UC-08, which has a genuine, harder unresolved compliance question (per this project's 4.9.5 Notion ACL findings) behind its "NO" status. |

## Independent read

- Claim 1's honest "cannot be advanced by research" is the single most important thing to state plainly for this field — it would be easy to quietly inflate confidence here given how much adjacent evidence exists elsewhere in this project, and resisting that temptation is exactly the kind of discipline this project's methodology has maintained throughout.
- Claim 4's distinction between "capability confirmed, artifact not yet built" (UC-03/06/07) versus "genuine unresolved compliance question" (UC-08) is a useful prioritization signal for whoever runs the actual sandbox tests next — the first three are likely quick wins, while UC-08 needs a real compliance decision before testing even makes sense.

## Confidence

**Internal-status field, external research inapplicable, by design** for claim 1. **Cross-referenced, high confidence** for claims 2, 3, 4. Validation date 2026-09-09. This field's actual status update requires running UC10-T01 through UC10-T08 — tracked in the companion test guide.

---

## Summary

| Item | Finding | Sr No |
|---|---|---|
| Overall validation status | Correctly 2-Partial/6-Pending — cannot be advanced by research | 1 |
| UC-05 gap description | Corrected: test Agent Identity as a mitigation, not just an accepted limitation | 2 |
| Capability evidence vs. end-to-end use-case validation | Distinguished — the former doesn't substitute for the latter | 3 |
| UC-03/06/07 vs. UC-08 path to validation | UC-03/06/07 = artifact-building; UC-08 = genuine unresolved compliance question | 4 |
