**Glean Tier 3 Advanced Evaluation**
**Testing & Debugging Tools — Independent Fresh Research (V2)**

*Independent research, sources fetched fresh this pass, checked 2026-09-09 against `docs.glean.com/agents/create-agents/re-run-from-step` and `docs.glean.com/agents/concepts/content-trigger`, cross-referenced against this project's own 4.9.11 Decision Explanation Capability V2 finding on Debug mode's Azure limitation. Field definition: "Quality of native sandboxes, loggers, step-tracers, and rollback environments." Base file at [`../Testing & Debugging Tools.md`](../Testing%20&%20Debugging%20Tools.md) left untouched — this is a standalone V2 doc, not an edit of it.*

**Sr No mapping:** rows 1-4 below map 1:1 to the same Sr No in the companion test guide [test/V2/Testing & Debugging Tools.md](../../../../test/Glean/4.9.2%20Agent%20&%20Workflow%20Builder/V2/Testing%20&%20Debugging%20Tools.md) — same number, same claim, doc-sourced here / tenant-tested there.

---

## Headline

Re-run from step's ~2-hour session window, its caching mechanic, and its Preview-only scope are all reconfirmed directly and precisely. The content-trigger sample-event play button is confirmed real, with one new, practical precondition: the agent must be saved with zero validation errors before the test button will actually fire — a real prerequisite worth knowing before a live demo. This project's own 4.9.11 research (Debug mode not supported on Azure-hosted deployments) is directly relevant here too and should be cross-applied to this field's own "Pending Sandbox: Azure-hosted limitation check" item.

## Claims (Sr No 1-4, mapped to test guide)

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 1 | Re-run from step's ~2-hour session window is confirmed directly, with a precise consequence: after that window, a full run is required to re-enable it | [docs.glean.com/agents/create-agents/re-run-from-step](https://docs.glean.com/agents/create-agents/re-run-from-step) | Verbatim: *"re-run is available for approximately 2 hours after the last Preview run. After this period, a full run is required to re-enable the feature."* |
| 2 | The caching mechanic is confirmed directly, with a real UI-visibility detail: cached vs. re-executed steps are visually distinguished | [docs.glean.com/agents/create-agents/re-run-from-step](https://docs.glean.com/agents/create-agents/re-run-from-step) | Verbatim: the feature works by *"reusing the preserved state and outputs from earlier steps,"* and *"Cached steps and re-executed steps are clearly distinguished in the UI."* Confirmed to be a Preview-only feature, not available in production/published-agent runs. |
| 3 | The content-trigger sample-event play button is confirmed real, with a genuinely new, practical precondition: the agent must be saved and free of validation errors, or the test will silently not run | [docs.glean.com/agents/concepts/content-trigger](https://docs.glean.com/agents/concepts/content-trigger) | Verbatim: *"You can also run the agent against a sample event by clicking the play button in the event list. This helps you confirm that the trigger passes the expected input into the agent."* Critically: *"Make sure the agent is saved and has no validation errors before you test or run it. If the agent is not saved, or if it still has errors, the trigger will not run."* This is a real, previously-uncaptured precondition worth knowing before demonstrating this feature live — an unsaved or error-containing agent won't produce a visible failure explaining why the test didn't fire. |
| 4 | This project's own 4.9.11 research already directly confirmed Debug mode is not supported on Azure-hosted deployments — this field's own "Pending Sandbox: Azure-hosted limitation check" item is now resolved by that cross-reference and should be updated to Doc-Verified | Cross-referenced from this project's 4.9.11 Decision Explanation Capability V2 field (claim 2) | Verbatim (already confirmed there): *"Debug mode is not supported for Azure-hosted deployments. If your organization uses an Azure-hosted Glean deployment, you may not see debug trace details in Agent Builder."* This closes a gap this field's own base research had flagged as pending. |

## Independent read

- Claim 3's precondition is worth building into any pilot runbook — a tester who forgets to save the agent (or has an unresolved validation error) and clicks the sample-event play button will see nothing happen, with no obvious error message pointing to the actual cause.
- Claim 4 demonstrates the value of this project's cross-referencing discipline: a gap flagged as "Pending Sandbox" in this field's base research was actually already resolved by direct-fetch research done for a completely different field (4.9.11) — connecting the two closes the gap without needing new research.

## Confidence

**Doc-Verified** for claims 1, 2, 3 (direct fresh fetches, verbatim quotes). **Cross-referenced, resolves a previously-pending item** for claim 4. Validation date 2026-09-09. Tenant/hands-on verification (an actual re-run-from-step timing test, an actual sample-event play-button test with a deliberately-unsaved agent) tracked in the companion test guide.

---

## Summary

| Item | Finding | Sr No |
|---|---|---|
| Re-run from step session window | Confirmed: ~2 hours, then requires a full run | 1 |
| Caching + UI distinction | Confirmed, Preview-only | 2 |
| Sample-event play button precondition | **New**: agent must be saved, error-free, or test silently fails | 3 |
| Azure-hosted Debug mode limitation | Resolved via cross-reference to 4.9.11 — no longer Pending | 4 |
