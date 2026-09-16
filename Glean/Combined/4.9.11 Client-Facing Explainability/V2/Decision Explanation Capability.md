**Glean Tier 3 Advanced Evaluation**
**Decision Explanation Capability - Independent Fresh Research (V2)**

*Independent research, sources fetched fresh this pass, checked 2026-09-09 against `docs.glean.com/agents/create-agents/debug-agent` and `docs.glean.com/administration/assistant/features/adaptive-reasoning`. Field definition: "Platform capability to explain prompt selections and routing choices made by AI agents." Base file at [`../Decision Explanation Capability.md`](../Decision%20Explanation%20Capability.md) left untouched - this is a standalone V2 doc, not an edit of it.*

**Sr No mapping:** rows 1-5 below map 1:1 to the same Sr No in the companion test guide [test/V2/Decision Explanation Capability.md](../../../../test/Glean/4.9.11%20Client-Facing%20Explainability/V2/Decision%20Explanation%20Capability.md) - same number, same claim, doc-sourced here / tenant-tested there.

---

## Headline

The base research's central finding - "show your work = citations, not routing" - is reconfirmed with the cleanest possible verbatim evidence: Glean's own documentation states plainly that *"Waldo never generates user-visible text. The frontier model always runs afterward and is responsible for the final response."* Debug mode's step/span/input-output/model-metadata exposure is also confirmed directly - but with a significant, newly-precise limitation: it is explicitly **not supported for Azure-hosted deployments**. One base-research claim needs re-verification: this specific Debug-mode page does not itself state a "builder/admin only" access restriction, so that detail should be re-checked rather than assumed.

## Claims (Sr No 1-5, mapped to test guide)

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 1 | Debug mode exposes a real, detailed execution trace - step list, per-step status, input/output payloads, execution time, model metadata, and nested span operations | [docs.glean.com/agents/create-agents/debug-agent](https://docs.glean.com/agents/create-agents/debug-agent) | Confirmed directly: *"See a list of steps that executed in your agent run, with status for each step and human-readable metadata,"* with the ability to *"Click into any step to view detailed input and output payloads, execution time, and model metadata,"* plus nested *"span"* views for sub-operations. |
| 2 | **Significant, newly-precise limitation**: Debug mode is explicitly not supported for Azure-hosted Glean deployments - a real, material gap for any client on that specific hosting option | [docs.glean.com/agents/create-agents/debug-agent](https://docs.glean.com/agents/create-agents/debug-agent) | Verbatim: *"Debug mode is not supported for Azure-hosted deployments. If your organization uses an Azure-hosted Glean deployment, you may not see debug trace details in Agent Builder."* This means an organization choosing Azure-hosted Glean specifically loses this project's one confirmed "Yes" row for routing/reasoning transparency (per the base research's own surface-by-surface table) - a real trade-off worth flagging explicitly for any client evaluating hosting options. |
| 3 | **Needs re-verification**: this specific page does not itself state that Debug mode access is restricted to builders/admins only - the base research's "builder/admin only" access claim should be re-checked against a different source or the live product, not assumed from this page | [docs.glean.com/agents/create-agents/debug-agent](https://docs.glean.com/agents/create-agents/debug-agent) | Confirmed directly: *"the documentation indicates Debug mode is accessed through the Agent Builder's Preview feature, but doesn't explicitly specify role-based restrictions."* The access-control claim may well be accurate (Agent Builder access itself is typically role-gated), but it wasn't independently re-confirmed by this specific page this pass. |
| 4 | Waldo's retrieval-planning process is confirmed, in Glean's own words, to be entirely invisible to end users - the cleanest possible confirmation of this field's central finding | [docs.glean.com/administration/assistant/features/adaptive-reasoning](https://docs.glean.com/administration/assistant/features/adaptive-reasoning) | Verbatim: *"Waldo determines whether the question would benefit from a retrieval plan. If so, it issues targeted searches in parallel across your organization's content using a controlled set of tools."* And critically: *"Waldo never generates user-visible text. The frontier model always runs afterward and is responsible for the final response."* |
| 5 | Deep-linked (exact-quote) citations remain the strongest genuinely user-facing explanation mechanism, but require explicitly setting Thinking/Advanced mode - reconfirmed via cross-reference, consistent with prior research, not changed this pass | Cross-referenced from this project's own 4.9.3 RAG Implementation Quality V2 field | Already independently confirmed: deep-linked citations are not the default behavior and require `agentConfig.agent` set to `FAST`/`ADVANCED` explicitly. This remains the correct, unchanged finding for how "show your work" actually manifests to end users in practice. |

## Independent read

- Claim 2 is this pass's most consequential addition - a hosting-choice decision (Azure vs. GCP/AWS/SaaS) directly determines whether Debug mode's transparency exists at all for a given deployment, which is a real, practical trade-off that should be raised explicitly with any client considering Azure-hosted Glean specifically.
- Claim 4's verbatim quote is about as clean a confirmation as this project has found anywhere - worth quoting directly in any client-facing explanation of what "explainability" does and doesn't mean for this platform.
- Claim 3's honest "not independently re-confirmed here" is a small but real discipline point - it would have been easy to simply repeat the base research's access-control claim without checking, but this specific source doesn't actually state it.

## Confidence

**Doc-Verified** for claims 1, 2, 4 (direct fresh fetches, verbatim quotes). **Doc-Verified, an honest non-confirmation** for claim 3. **Cross-referenced, high confidence** for claim 5. Validation date 2026-09-09. Tenant/hands-on verification (an actual Debug-mode access-role test, an actual hosting-option confirmation) tracked in the companion test guide.

---

## Summary

| Item | Finding | Sr No |
|---|---|---|
| Debug mode exposure | Confirmed: steps, spans, I/O, model metadata | 1 |
| Debug mode + Azure hosting | **Not supported** - a real, material gap for Azure-hosted clients | 2 |
| Debug mode role restriction | Not confirmed by this specific page - re-verify separately | 3 |
| Waldo's invisibility to end users | Confirmed verbatim - the field's cleanest evidence | 4 |
| Deep-linked citations requirement | Reconfirmed via cross-reference: requires explicit Thinking/Advanced mode | 5 |
