**Glean Tier 3 Advanced Evaluation**
**Override & Correction Mechanism - Independent Fresh Research (V2)**

*Independent research, sources fetched fresh this pass, checked 2026-09-09 against `docs.glean.com/user-guide/knowledge/verification/*` pages and a fresh search for review-queue/notification features. Field definition: "Interface or configurations allowing humans to override or correct wrong AI decisions." Base file at [`../Override & Correction Mechanism.md`](../Override%20&%20Correction%20Mechanism.md) left untouched - this is a standalone V2 doc, not an edit of it.*

**Sr No mapping:** rows 1-6 below map 1:1 to the same Sr No in the companion test guide [test/V2/Override & Correction Mechanism.md](../../../../test/Glean/4.9.11%20Client-Facing%20Explainability/V2/Override%20&%20Correction%20Mechanism.md) - same number, same claim, doc-sourced here / tenant-tested there. Row 6 added 2026-09-14 - found via a full-corpus sweep of this project's local Glean documentation crawl, never cited by this field's original research pass (see scrap/GLEAN_RESEARCH_MEMORY.md).

---

## Headline

Verification and deprecation are both reconfirmed directly, exactly matching prior research: neither affects AI-generated text, only search-result display badges. This pass surfaces one new, unexplored feature worth flagging: **"Canvas,"** described as a structured workspace for drafts and review, named in a Glean thought-leadership article on content-review workflows - not previously documented anywhere in this project, and worth investigating whether it has any relevance to correcting a specific wrong Assistant answer, versus being purely a content-creation tool. No dedicated correction queue or automated content-owner notification for downvoted answers was found anywhere searched this pass, reconfirming the base research's "feedback ≠ override" finding.

## Claims (Sr No 1-6, mapped to test guide)

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 1 | Document Verification is confirmed directly to be a search-result display feature only - it explicitly does not affect AI-generated text | [docs.glean.com/user-guide/knowledge/verification/how-verification-works](https://docs.glean.com/user-guide/knowledge/verification/how-verification-works) | Verbatim: *"Glean's Verification feature makes it easy to know if a document is verified: personally approved by one of your users that it's accurate and up to date."* Display: *"A verified search result appears with a green badge after a result title."* Confirmed scope: this pass's own fetch explicitly noted the page *"does not mention anything about AI-generated text or how verification affects algorithmic outputs - only that the badge system helps users identify approved documents."* |
| 2 | Document Deprecation is confirmed directly to leave the document searchable and still in the index - it is a warning flag, not a removal | [docs.glean.com/user-guide/knowledge/verification/what-should-i-do-with-documents-that-are-completely-out-of-date](https://docs.glean.com/user-guide/knowledge/verification/what-should-i-do-with-documents-that-are-completely-out-of-date) | Verbatim: *"Deprecated documents may still appear on Glean search results"* with *"a deprecated symbol"* shown *"next to the document on the Search results page"* and on the document itself. Confirmed: deprecation *"preserves the document's availability for reference purposes while clearly communicating its status"* rather than removing it. |
| 3 | **Checked and ruled out - resolved 2026-09-14**: Canvas is confirmed to be purely a co-authoring/drafting workspace - it offers no mechanism to correct, annotate, or override a wrong Assistant chat answer. It is a separate output surface, not a correction/feedback pathway | [docs.glean.com/user-guide/assistant/glean-chat/canvas](https://docs.glean.com/user-guide/assistant/glean-chat/canvas) | Verbatim: *"Glean Canvas is a co-authoring surface built into Glean. It opens alongside Chat and gives you a dedicated editor where you can draft, refine, and export documents, emails, messages, and presentations."* Its editing tools (direct editing, conversational editing, targeted/queued edits, version history) all operate on drafted content Canvas itself generated, not on a prior chat answer's underlying facts or a flag/downvote workflow. This confirms the field's "governance-first, not override-first" framing stands. Status changed from "new lead, needs follow-up" to "checked and ruled out - drafting tool only, resolved 2026-09-14." |
| 4 | No dedicated correction queue, automated content-owner notification, or any workflow that routes a downvoted Assistant answer to a specific person for review was found anywhere searched this pass - reconfirming the base research's "feedback ≠ override, no auto-retrain" finding | Absence-check, fresh search this pass | The one relevant search result - *"Flag-for-review mode"* - refers specifically to Glean Protect's security-violation logging (already covered in this project's 4.9.5/4.9.9 research), not a general-purpose factual-correction review queue. No such mechanism for ordinary Assistant answer quality was found. |
| 5 | The remaining correction mechanisms (Answers creation/editing, source-edit-dependent re-crawl lag, agent step editing/republishing, org custom instructions, Protect+ autohide) remain accurate on cross-reference to this project's own prior V2 research | Cross-referenced across this project's 4.9.1, 4.9.2, 4.9.4 V2 fields | Each mechanism traces to a specific, already-confirmed finding elsewhere in this project. No changes needed to these attributions. |
| 6 | "Plan" is a visible, editable task-list/reasoning-trace UI for multi-step Assistant queries, with mid-execution human-in-the-loop steering (stop and redirect) - the closest thing found in this project to a real "stop it before it's wrong" control, distinct from post-hoc correction | [docs.glean.com/user-guide/assistant/glean-chat/plan](https://docs.glean.com/user-guide/assistant/glean-chat/plan) | Verbatim: *"Users can stop Glean at any time during plan execution and provide new direction. Glean can then generate a new plan or update the current one based on that feedback."* Also shows live status (Pending/In Progress/Done), intermediate reasoning traces, and tool invocations. Available "in Thinking mode... to all users on Glean Universal Key and Glean Hosted." Row 6 added 2026-09-14 - found via a full-corpus sweep of this project's local Glean documentation crawl, never cited by this field's original research pass (see scrap/GLEAN_RESEARCH_MEMORY.md). |

## Independent read

- Claims 1-2's exact, precise reconfirmation matters because this field's core finding (governance-first correction, not RLHF-style per-answer override) is a genuinely consequential one for any client expecting a "fix this AI answer" button - having both mechanisms' limitations confirmed verbatim, directly from the source, gives this finding maximum credibility.
- Claim 3 is offered as a lead for further investigation, not a settled finding - Canvas could turn out to be irrelevant to this field's question (a drafting tool, not a correction mechanism) or could reveal a genuinely new override pathway; it deserves a dedicated look before being incorporated into this field's conclusions either way.
- Claim 4's reconfirmed absence continues to support the field's central "governance-first, not override-first" framing - there is no automated escalation path from a downvote to a specific accountable person, only a passive feedback signal.

## Confidence

**Doc-Verified** for claims 1, 2 (direct fresh fetches, verbatim quotes). **Search-corroborated, flagged for follow-up** for claim 3. **Absence-check** for claim 4. **Cross-referenced** for claim 5. Validation date 2026-09-09. Tenant/hands-on verification (the actual correction-latency timing tests, a Canvas feature investigation) tracked in the companion test guide.

**Update, 2026-09-14:** Claim 3 (Canvas) resolved this pass - now **Doc-Verified** via docs.glean.com/user-guide/assistant/glean-chat/canvas, crawl-only (2026-09-01), not independently re-fetched live this pass. Claim 6 ("Plan") added this pass, also **Doc-Verified**, crawl-only (2026-09-01), not independently re-fetched live this pass. Because this resolves a previously-flagged open item, a live re-check of both docs.glean.com/user-guide/assistant/glean-chat/canvas and docs.glean.com/user-guide/assistant/glean-chat/plan is recommended before finalizing.

---

## Summary

| Item | Finding | Sr No |
|---|---|---|
| Verification scope | Confirmed: badge only, no effect on AI text | 1 |
| Deprecation scope | Confirmed: warning flag, doc stays in index | 2 |
| "Canvas" feature | Resolved - drafting tool only, no override mechanism (closed 2026-09-14) | 3 |
| Correction queue / owner notification | Confirmed absent | 4 |
| Remaining mechanisms | Reconfirmed via cross-reference | 5 |
| "Plan" feature | New: mid-execution stop/redirect control, added 2026-09-14 | 6 |
