**Glean Tier 3 Advanced Evaluation**
**Human-Readable Output — Independent Fresh Research (V2)**

*Independent research, sources fetched fresh this pass, checked 2026-09-09 against `docs.glean.com/user-guide/knowledge/answers/what-are-answers-and-how-do-they-work` and `docs.glean.com/user-guide/about/accessibility`. Field definition: "Clarity of natural-language outputs and formatting for non-technical clients and users." Base file at [`../Human-Readable Output.md`](../Human-Readable%20Output.md) left untouched — this is a standalone V2 doc, not an edit of it.*

**Sr No mapping:** rows 1-5 below map 1:1 to the same Sr No in the companion test guide [test/V2/Human-Readable Output.md](../../../../test/Glean/4.9.11%20Client-Facing%20Explainability/V2/Human-Readable%20Output.md) — same number, same claim, doc-sourced here / tenant-tested there.

---

## Headline

The most significant upgrade this pass finds is on accessibility: rather than a vague "a11y statement on file," Glean maintains a real, formal Accessibility Conformance Report (ACR) covering **WCAG 2.0, 2.1, and 2.2 at Levels A and AA**, with an accessible-by-default design system (keyboard support, focus management, screen reader semantics built into every new feature) and a real testing methodology across screen readers, magnifiers, and keyboard/voice navigation. This is a substantially stronger, more specific, and more citable finding than the base research had, and should raise this field's confidence on the accessibility dimension specifically. Answers' surfacing logic is also confirmed more precisely, including a surface (Slack's `/glean` command) not previously captured.

## Claims (Sr No 1-5, mapped to test guide)

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 1 | Answers are confirmed directly as short, markdown-formatted content with real formatting flexibility (links, markdown, optional department-audience targeting, optional Collection organization) | [docs.glean.com/user-guide/knowledge/answers/what-are-answers-and-how-do-they-work](https://docs.glean.com/user-guide/knowledge/answers/what-are-answers-and-how-do-they-work) | Verbatim: *"Answers are bite-sized chunks of information you create in Glean to answer common questions your users might have,"* consisting of a question, *"Free-form text content,"* *"Links and markdown formatting,"* and optional audience/Collection organization. |
| 2 | The surfacing mechanic is more precise than a generic "curated card pinned when confident" description: Answers either get featured top placement when confidence is high, or blend into ranked results otherwise — a real, two-mode behavior | [docs.glean.com/user-guide/knowledge/answers/what-are-answers-and-how-do-they-work](https://docs.glean.com/user-guide/knowledge/answers/what-are-answers-and-how-do-they-work) | Verbatim: *"If we're highly confident in an answer based on your query, we'll show that answer at the top of the results page"* — otherwise, *"you'll see Answers blended in with other results using our ranking magic."* |
| 3 | **New surface not previously captured**: Answers can also appear via Slack's `/glean` command — relevant context even though Slack is not in Stratos's tenant stack, since it confirms Answers content is genuinely multi-surface, not just web/Teams-bound | [docs.glean.com/user-guide/knowledge/answers/what-are-answers-and-how-do-they-work](https://docs.glean.com/user-guide/knowledge/answers/what-are-answers-and-how-do-they-work) | Confirmed directly: Answers appear when users utilize *"the `/glean` command on Slack."* Out of scope for the current tenant stack, but worth noting for completeness. |
| 4 | **Significant upgrade to the base research's accessibility finding**: Glean maintains a formal, current Accessibility Conformance Report covering WCAG 2.0/2.1/2.2 at Levels A and AA, with accessibility built into the design system by default and a real, named feedback channel | [docs.glean.com/user-guide/about/accessibility](https://docs.glean.com/user-guide/about/accessibility) | Confirmed directly: *"Glean maintains an up-to-date Accessibility Conformance Report (ACR)... covering WCAG 2.0, 2.1, and 2.2 at Levels A and AA."* Design-system-level commitment: *"new features inherit keyboard support, focus management, and screen reader semantics by default."* Testing methodology: *"a variety of assistive technologies, including screen readers, magnifiers, and alternative navigation methods such as keyboard-only and voice control."* A named feedback channel exists: **a11y@glean.com**, plus in-app Messenger contact. |
| 5 | The known readability friction points (Notion/Drive/OneDrive source-app familiarity requirement, `token_limit_exceeded` errors on large Sheets, `tools_unauthorized` technical messages before agent runs) remain accurate on cross-reference to this project's own prior V2 research | Cross-referenced from this project's 4.9.1 V2 field | Each friction point traces to a specific, already-confirmed finding elsewhere in this project. No changes needed to these attributions. |

## Independent read

- Claim 4 deserves real weight in this field's overall confidence rating — a formal ACR with specific WCAG level conformance is a meaningfully stronger, more auditable commitment than a vague "statement on file," and this is worth citing directly and specifically (including the exact WCAG levels) in any client-facing summary of this platform's accessibility posture, especially relevant for a healthcare client where accessibility compliance may itself be a regulatory consideration.
- Claims 1-3 don't change the substance of this field's "Strong" readability rating but do give more precise, quotable mechanics for how Answers actually behave — useful detail for setting accurate expectations during a pilot.
- Claim 5's honest "nothing new" for the friction points reflects that this project's own hands-on work already established these well; this pass's fresh contribution was concentrated on Answers precision and the accessibility upgrade.

## Confidence

**Doc-Verified** for claims 1, 2, 3, 4 (direct fresh fetches, verbatim quotes). **Cross-referenced** for claim 5. Validation date 2026-09-09. Tenant/hands-on verification (the actual User B clarity-rating exercise, an actual keyboard-navigation accessibility spot-check) tracked in the companion test guide.

---

## Summary

| Item | Finding | Sr No |
|---|---|---|
| Answers format | Confirmed: markdown, links, audience/Collection targeting | 1 |
| Featured vs. blended surfacing logic | Confirmed, more precise two-mode mechanic | 2 |
| Slack `/glean` surface | New, out-of-scope-but-noted surface | 3 |
| Accessibility conformance | **Significant upgrade**: real ACR, WCAG 2.0/2.1/2.2 A/AA, named contact | 4 |
| Known readability friction points | Reconfirmed via cross-reference; no changes | 5 |
