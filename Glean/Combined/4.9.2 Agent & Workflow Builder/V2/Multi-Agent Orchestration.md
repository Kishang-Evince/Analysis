**Glean Tier 3 Advanced Evaluation**
**Multi-Agent Orchestration — Independent Fresh Research (V2)**

*Independent research, sources fetched fresh this pass, checked 2026-09-09 against `docs.glean.com/agents/concepts/flow` and `docs.glean.com/agents/how-agents-work`. Field definition: "Cooperation and conflict-resolution patterns when running multiple automated agents." Base file at [`../Multi-Agent Orchestration.md`](../Multi-Agent%20Orchestration.md) left untouched — this is a standalone V2 doc, not an edit of it.*

**Sr No mapping:** rows 1-5 below map 1:1 to the same Sr No in the companion test guide [test/V2/Multi-Agent Orchestration.md](../../../../test/Glean/4.9.2%20Agent%20&%20Workflow%20Builder/V2/Multi-Agent%20Orchestration.md) — same number, same claim, doc-sourced here / tenant-tested there.

---

## Headline

The sub-agent memory-passing mechanic and the permission-preservation guarantee for Task-tool delegation are both reconfirmed directly. The "10 active background agents per user" cap is reconfirmed with a real, useful detail not previously captured: Glean explicitly directs customers needing more capacity to *"reach out to the Glean team"* — implying this is a soft, negotiable limit, not a hard architectural ceiling. The specific "0.5 requests per second" rate-limit figure could not be found or reconfirmed anywhere this pass and should be treated as unconfirmed pending a different source or a direct question to Glean.

## Claims (Sr No 1-5, mapped to test guide)

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 1 | The sub-agent step's output-to-parent-memory mechanic is confirmed directly, verbatim | [docs.glean.com/agents/concepts/flow](https://docs.glean.com/agents/concepts/flow) | Verbatim: a Sub-agent step *"returns its outputs to the parent agent when finished. This way, your main agent can reason across everything done so far, including what the Sub-agent accomplished."* |
| 2 | This specific page does not detail how this parent-child data flow is visually represented in the Workflow canvas — the base research's "explicit in canvas" framing should be confirmed via a direct sandbox test, not assumed from documentation text alone | Absence-check against [docs.glean.com/agents/concepts/flow](https://docs.glean.com/agents/concepts/flow) | This pass's own fetch explicitly noted the page *"describes the functional behavior of sub-agent memory integration but doesn't detail the visual mechanics of how output feeds between agents in the interface."* This is a case where the underlying capability is confirmed, but its specific UI presentation needs a hands-on check rather than a documentation citation. |
| 3 | Task-tool delegation (Auto mode's dynamic sub-agent routing) is confirmed directly to preserve the invoking agent's permission scope — child agents cannot escalate access, matching prior research | [docs.glean.com/agents/how-agents-work](https://docs.glean.com/agents/how-agents-work) | Verbatim: *"The Task tool preserves the agent's permissions and error-handling behavior."* This directly reconfirms the base research's ACL-non-escalation finding with a precise, quotable source. |
| 4 | The 10-active-background-agents-per-user cap is reconfirmed, with a new, useful detail: this is presented as a soft limit, with an explicit path to request more capacity directly from Glean | Search-corroborated — [docs.glean.com/agents/concepts/schedule-triggers](https://docs.glean.com/agents/concepts/schedule-triggers) | Confirmed: *"A maximum of 10 active background agents can be scheduled per user. If you need to run more than 10 active background agents, reach out to the Glean team."* This is a materially different framing than a hard architectural ceiling — worth knowing if a client's use case genuinely needs more than 10 concurrent scheduled agents per user. |
| 5 | **Unconfirmed this pass**: the specific "0.5 requests per second" agent-run rate limit could not be found anywhere in this pass's search — it should be treated as unconfirmed pending a different source or a direct question to Glean, not repeated with the same confidence as the 10-agent cap | Absence-check, fresh search this pass | No source found this specific figure. This doesn't mean the base research's number is wrong — it may simply not be indexed or may require portal/account-team access to confirm — but per this project's established honesty convention, it should be flagged as unconfirmed rather than silently repeated. |

## Independent read

- Claim 4's "soft limit, ask Glean" framing is a genuinely useful practical detail — a client whose orchestration needs exceed 10 concurrent agents per user shouldn't treat this as a hard wall requiring architectural workarounds; a direct conversation with the account team may resolve it.
- Claim 2's distinction between "capability confirmed" and "UI presentation confirmed" is a useful discipline point — it would be easy to assume documentation prose about a feature's behavior also confirms exactly how it looks in the product, when that requires an actual hands-on look.
- Claim 5's flagged gap matters because the "0.5 rps" figure, if actually accurate, would materially affect how a client architects any high-throughput agent-orchestration workflow — it shouldn't be relied upon without independent confirmation.

## Confidence

**Doc-Verified** for claims 1, 3 (direct fresh fetches, verbatim quotes). **Doc-Verified, an honest scope limitation** for claim 2. **Search-corroborated, with a new practical detail** for claim 4. **Absence-check, explicitly flagged** for claim 5. Validation date 2026-09-09. Tenant/hands-on verification (an actual sub-agent canvas inspection, an actual parallel-agent race-condition test) tracked in the companion test guide.

---

## Summary

| Item | Finding | Sr No |
|---|---|---|
| Sub-agent output-to-parent-memory | Confirmed verbatim | 1 |
| Visual canvas representation | Not confirmed by documentation — needs hands-on check | 2 |
| Task-tool permission preservation | Confirmed verbatim | 3 |
| 10-agent cap | Reconfirmed, with a new "soft limit, ask Glean" detail | 4 |
| "0.5 rps" rate limit | **Unconfirmed this pass** — flag before repeating | 5 |
