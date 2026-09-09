**Glean Tier 3 Advanced Evaluation**
**Confidence Scoring — Independent Fresh Research (V2)**

*Independent research, sources fetched fresh this pass, checked 2026-09-09 against `developers.glean.com/api-info/client/getting-started/basic-usage` and `docs.glean.com/administration/protect/ai-security/policies-and-examples`. Field definition: "Numerical confidence scores or truth indicators attached to AI-generated answers." Base file at [`../Confidence Scoring.md`](../Confidence%20Scoring.md) left untouched — this is a standalone V2 doc, not an edit of it.*

**Sr No mapping:** rows 1-4 below map 1:1 to the same Sr No in the companion test guide [test/V2/Confidence Scoring.md](../../../../test/Glean/4.9.11%20Client-Facing%20Explainability/V2/Confidence%20Scoring.md) — same number, same claim, doc-sourced here / tenant-tested there.

---

## Headline

The absence of any numeric confidence/score/similarity field in the Client API's Chat response is reconfirmed directly, with a complete, precise field list. One correction worth flagging: the base research's "Yes - per-category thresholds" claim for Protect+ visibility overstates what this specific page actually confirms — the page confirms per-category confidence scores exist internally and drive threshold-based flagging, but does not itself state whether the numeric score is actually surfaced to admins in the dashboard, only that a block/flag outcome results.

## Claims (Sr No 1-4, mapped to test guide)

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 1 | The Client API's Chat response schema is confirmed directly, with a complete field list — no confidence, score, or similarity field exists anywhere in it | [developers.glean.com/api-info/client/getting-started/basic-usage](https://developers.glean.com/api-info/client/getting-started/basic-usage) | Confirmed directly, full field list: `messages`, `messageType`, `author`, `fragments`, `text`, `citation`, `sourceDocument`, `title`, `url`, `snippet`, `chatId`, `followUpPrompts`, `backendTimeMillis`, `chatSessionTrackingToken`. None of these is a confidence/score/similarity field — the schema is built entirely around citations and source-document metadata, not a truth score. |
| 2 | **Correction**: the base research's claim that Protect+ per-category confidence scores are visible to admins ("Yes - per-category thresholds") overstates what this specific page confirms — the page confirms scores exist and drive threshold-based flagging internally, but does not itself state that the numeric score is displayed to admins, only that flagging behavior results | [docs.glean.com/administration/protect/ai-security/policies-and-examples](https://docs.glean.com/administration/protect/ai-security/policies-and-examples) | Verbatim: *"The policy flags content only when scores exceed calibrated thresholds, balancing safety against over-blocking."* This confirms confidence scoring is real and operative — but this page's own language stops at describing the flagging mechanism, without confirming that the raw numeric score itself is exposed in the Guardrails Insights dashboard or elsewhere to a human admin. This distinction matters: "the system uses a confidence score internally" is a different, weaker claim than "an admin can see the confidence score" — and only the former is confirmed by this specific source. |
| 3 | Answer ranking, verified-document badges, and thumbs up/down feedback remain accurate on cross-reference — none of these expose a numeric confidence value to end users, consistent with prior research | Cross-referenced from this project's own 4.9.10 and base 4.9.11 research | No change to these findings — each remains confirmed as a qualitative or binary signal, not a numeric confidence score. |
| 4 | The overall finding — no numeric confidence/truth score is exposed anywhere to end users, and even the internal Protect+ mechanism's admin-visibility is less certain than previously stated — should be flagged clearly for any regulated buyer (like a healthcare client) who expects a "% confidence" or "needs review" flag as a standard feature | Cross-referenced synthesis of claims 1-2 | This remains a real, confirmed gap relative to what regulated/compliance-sensitive buyers often expect, and the correction in claim 2 makes the gap slightly more pronounced than the base research suggested — not even the admin-facing safety layer's numeric detail is confirmed visible, let alone anything end-user-facing about factual confidence. |

## Independent read

- Claim 1's complete field list is the clean, exhaustive confirmation this field needs — there's no ambiguity about the API schema's contents, and no confidence-adjacent field is hiding under a different name.
- Claim 2's correction matters because it's the difference between "Protect+ gives admins a confidence dashboard" and "Protect+ uses confidence scores internally but may only surface a block/flag decision" — the second, more conservative claim is what this specific page actually supports, and the distinction should be tested directly (via the companion test guide) rather than assumed either way.

## Confidence

**Doc-Verified** for claim 1 (direct fresh fetch, complete field list). **Doc-Verified, a correction to an overstated claim** for claim 2. **Cross-referenced** for claim 3. **Cross-referenced synthesis** for claim 4. Validation date 2026-09-09. Tenant/hands-on verification (an actual Protect+ admin dashboard check for numeric score visibility) tracked in the companion test guide.

---

## Summary

| Item | Finding | Sr No |
|---|---|---|
| Client API Chat response schema | Confirmed complete field list — no confidence/score field anywhere | 1 |
| Protect+ admin-visible numeric scores | **Corrected**: existence of internal scoring confirmed; admin visibility NOT confirmed by this page | 2 |
| Answer ranking / badges / thumbs up-down | Reconfirmed via cross-reference — all qualitative/binary, not numeric | 3 |
| Overall gap for regulated buyers | Reconfirmed, slightly sharpened by claim 2's correction | 4 |
