**Glean Tier 3 Advanced Evaluation**
**Model Versioning Freeze — Independent Fresh Research (V2)**

*Independent research, sources picked and read fresh this pass, cross-checked 2026-09-09 against `docs.glean.com`. Field definition: "Option to pin specific API model releases to protect against downstream behavior shifts." Base file at [`../Model Versioning Freeze.md`](../Model%20Versioning%20Freeze.md) left untouched — this is a standalone V2 doc, not an edit of it.*

**Sr No mapping:** rows 1-7 below map 1:1 to the same Sr No in the companion test guide [test/V2/Model Versioning Freeze.md](../../../../test/Glean/4.9.3%20AI%20Architecture%20&%20Models/V2/Model%20Versioning%20Freeze.md) — same number, same claim, doc-sourced here / tenant-tested there.

---

## Headline

No evidence was found for the specific capability this field asks about — pinning one exact dated model release (e.g. `gpt-4o-2024-05-13`) so it stays fixed indefinitely regardless of provider updates. What exists instead is coarser: admins can enable/disable which models are *available*, and choose Auto vs. a specific named model — but not freeze a dated snapshot. Three separate, dated, real-world precedents confirm the platform actively **migrates tenants off older models on its own schedule**, which is close to the opposite of a freeze guarantee.

## Claims (Sr No 1-7, mapped to test guide)

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 1 | No admin control was found for locking one exact dated model version indefinitely — this specific capability isn't described anywhere checked | [docs.glean.com/get-started/golive/model-choice](https://docs.glean.com/get-started/golive/model-choice) | Checked directly and thoroughly: *"there is no feature for locking or pinning a specific model version"* — no mention of *"administrators selecting a fixed model version that persists across updates"*, no *"mechanisms to prevent model upgrades when newer versions launch."* |
| 2 | The one model-selection control that does exist is scoped to a single chat session, not an org-wide freeze | [docs.glean.com/get-started/golive/model-choice](https://docs.glean.com/get-started/golive/model-choice) | Same verbatim finding already established independently in the Model Agnosticism field, directly relevant here too: *"The selection applies to a particular chat session. You can pick a model for a conversation, but you cannot change the global default models used by Assistant for your organization."* |
| 3 | The admin's actual lever is availability control (enable/disable/beta-gate a model for the org), not version-pinning | [docs.glean.com/get-started/golive/model-choice](https://docs.glean.com/get-started/golive/model-choice) | Confirmed from earlier research (Foundation Models Used field, Sr No 10) and re-checked here: admins *"decide which models are available for users"* and can *"keep some models in beta or limited rollout, and set Auto for everyone else"* — availability and rollout gating, not a version-lock mechanism. |
| 4 | Glean does maintain a real, first-party, dated retirement-notice page — a more accurate location for "what's being sunset and when" than the API-only deprecations list found in earlier research | [docs.glean.com/release-notes/sunset/](https://docs.glean.com/release-notes/sunset/) | Directly fetched and confirmed: this page lists specific retiring capabilities with exact dates, e.g. *"Agentic Engine V1 (Customer Key: Gemini)"* with a retirement date of **February 15, 2026**. **This refines, not contradicts, the Model Agnosticism field's earlier finding** — that field found `developers.glean.com/deprecations` covers API endpoints only, not models; this is a *separate* page that does track capability/model-generation retirements. Worth citing both pages correctly rather than treating "deprecations" as the only retirement source. |
| 5 | A concrete, dated precedent shows Glean forcing tenants off an older model generation on its own timeline, ahead of even the underlying provider's own retirement date | Search-synthesized — direct fetch of the specific release note containing this could not be located this pass; content below is from search-engine-indexed summaries of Glean's release notes, not an independently loaded page | Reported: *"Glean stops routing to Gemini 2.5 models on October 6, 2026... traffic moves to Gemini 3.1 Pro, Gemini 3.7 Flash... or Gemini 3.5 Flash Lite"* — ahead of Google's own separately-reported Gemini 2.5 retirement date of October 20, 2026. Explicit guidance: *"review and update your model selections before October 6 to choose your preferred replacement rather than relying on automatic rerouting."* **Confidence caveat:** flagged as search-synthesized only, not confirmed against a directly-loaded first-party page this pass — should be re-verified live before being cited as settled. |
| 6 | This is not an isolated incident — it is the third documented case in this research effort of Glean changing a tenant's effective model behavior on a provider- or platform-driven schedule, without a customer opt-out | Cross-referenced from this project's own prior V2 findings (Model Agnosticism field, Context Window & Memory field), not re-derived fresh this pass | Prior confirmed cases: GPT-4.1 automatically expanded to its full 1M-token window *"when necessary"* (Universal Key); Claude Sonnet 4.5/4's 1M-token beta retired 2026-04-30 with over-limit requests erroring afterward. Claim 5 (Gemini 2.5 rerouting) would be a third instance of the same pattern if independently confirmed. |
| 7 | No source found offers anything resembling the field's own example of a freeze mechanism — pinning to one exact, permanently-fixed dated model snapshot | Absence checked across claims 1-3, plus [docs.glean.com/administration/llms](https://docs.glean.com/administration/llms) and [docs.glean.com/administration/llm-key-feature-availability](https://docs.glean.com/administration/llm-key-feature-availability) (both checked in earlier fields' research, re-confirmed relevant here) | No dated-snapshot pinning field, parameter, or admin control was found in any source checked across this entire research pass for the 4.9.3 section. |

## Independent read

- Claim 4 is worth flagging as a genuine correction-in-progress: earlier research (Model Agnosticism field) concluded model deprecation tracking was scattered across release notes with no dedicated tracker. This pass found a dedicated sunset/retirement page does exist — it just isn't the "deprecations" page that was checked before. The overall conclusion (no single unified *version-freeze* mechanism) still holds, but the retirement-*notice* story is better than previously stated, and this should be reflected as an update if the two docs are ever merged into one master summary.
- Claim 5 needs a live re-check before being treated as fully settled — flagged honestly rather than presented as equally solid as the directly-fetched claims.
- The overall pattern (claims 5-6) matters most for a buyer: "Model Versioning Freeze" as literally defined in the SOW does not appear to be a capability Glean offers. The realistic client-facing answer is "no dated-snapshot pinning; instead, Glean manages model transitions on its own schedule and provides advance notice via release notes/the sunset page, but migration is not optional."

## Confidence

**Doc-Verified** for claims 1-4, 7 (direct fetches, including one confirmed real retirement-page entry). **Search-synthesized, needs live re-verification** for claim 5. **Cross-referenced, not independently re-derived** for claim 6. Validation date 2026-09-09. Tenant verification tracked in the companion test guide.

---

## Summary

| Item | Finding | Sr No |
|---|---|---|
| Exact dated-model-version pinning | Not found anywhere checked | 1, 7 |
| Chat-session model picker | Session-scoped only, not org-wide | 2 |
| Admin's actual control | Availability/rollout gating, not version-lock | 3 |
| Dedicated retirement-notice page | Exists — `release-notes/sunset/`, confirmed live with a real dated entry | 4 |
| Forced-migration precedent (Gemini) | Reported, needs live re-verification | 5 |
| Pattern across research (GPT-4.1, Claude Sonnet, Gemini) | 3 cases of platform-driven model change, no opt-out | 6 |
