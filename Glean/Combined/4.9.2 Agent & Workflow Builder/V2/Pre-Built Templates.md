**Glean Tier 3 Advanced Evaluation**
**Pre-Built Templates — Independent Fresh Research (V2)**

*Independent research, sources fetched fresh this pass, checked 2026-09-09 against `docs.glean.com/agents/templates` and `glean.com/agent-library/`. Field definition: "Availability and quality of ready-to-use virtual agents or workflow models." Base file at [`../Pre-Built Templates.md`](../Pre-Built%20Templates.md) left untouched — this is a standalone V2 doc, not an edit of it.*

**Sr No mapping:** rows 1-5 below map 1:1 to the same Sr No in the companion test guide [test/V2/Pre-Built Templates.md](../../../../test/Glean/4.9.2%20Agent%20&%20Workflow%20Builder/V2/Pre-Built%20Templates.md) — same number, same claim, doc-sourced here / tenant-tested there.

---

## Headline

The in-product Templates documentation page confirms exactly 8 named templates, matching the base research's count — but organized under only two named categories (Personal Productivity, Marketing), not the seven-category framework (General, Engineering, HR, IT, Marketing, Sales, Support) the base research described. That seven-category framework instead precisely matches the **public** Agent Library's structure, confirmed directly this pass at 33 examples across six named departments. These are two different catalogs with two different category systems, and this pass also found "Plan my day" listed as a single template on the docs page, not split into separate Outlook/Google-named entries — worth confirming directly in the live product rather than assumed from documentation.

## Claims (Sr No 1-5, mapped to test guide)

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 1 | The in-product Templates page confirms exactly 8 named templates, organized under two categories: Personal Productivity (Daily action items, Plan my day, Weekly work report) and Marketing (Persona-based event messaging, Marketing event description, Customer reference summary, LinkedIn post draft, SEO keyword research from sales calls) | [docs.glean.com/agents/templates](https://docs.glean.com/agents/templates) | Confirmed directly, full list matching the base research's "8" count precisely — but the two-category structure found here (Personal Productivity, Marketing) does not match the seven-category framework (General, Engineering, HR, IT, Marketing, Sales, Support) attributed to templates in the base research. |
| 2 | **Correction candidate**: the seven-category framework (General/Engineering/HR/IT/Marketing/Sales/Support) precisely matches the structure of the separate, public Agent Library catalog, not the in-product Templates page — these are two distinct catalogs and should not be described with the same category framework | Cross-referenced from claim 4 below | This is worth flagging as a likely category-attribution mix-up in the base research rather than a contradiction to resolve — the in-product Templates page (2 categories, 8 items) and the public Agent Library (6 categories, 33 items) are simply different things, and the seven-category description belongs to the latter, not the former. |
| 3 | **New template name confirmed**: "Weekly work report" appears as a third Personal Productivity template not previously named in the base research's partial list | [docs.glean.com/agents/templates](https://docs.glean.com/agents/templates) | Confirmed directly as one of the three Personal Productivity templates, alongside Daily action items and Plan my day. |
| 4 | "Plan my day" is confirmed to be listed as a single named template on the documentation page, not split into two separately-named "Plan my day (Outlook)" and "Plan my day (Google)" entries — this specific split should be confirmed directly in the live in-product template picker rather than assumed from the docs page alone | [docs.glean.com/agents/templates](https://docs.glean.com/agents/templates) | The docs page lists exactly one "Plan my day" template. It's plausible the product itself offers a calendar-provider selection *within* this single template (Outlook vs. Google Calendar) rather than two distinct named templates — this distinction matters for an accurate tenant-relevance description and should be confirmed hands-on. |
| 5 | The public Agent Library is confirmed directly at exactly 33 example agents across six named departments — a complete, precise list, more thorough than the base research's illustrative "meeting recap, ghostwriter, competitive brief, etc." | [glean.com/agent-library/](https://www.glean.com/agent-library/) | Confirmed full list: **All Teams** (Ghostwriter, Intelligent Reminders, Delegation Tracker, Meeting Recap, Daily Meeting Action Summary); **Engineering** (Spec to Implementation PR, Resolve Jira Ticket, Resolve GitHub PR Feedback, Engineering Standup, Pull Request Review, Launch Documentation, Engineering Self-Evaluation, Engineering Project Onboarding); **Marketing** (Customer Testimonials from Calls, SEO Article Evaluation, Persona-Based Event Messaging, Customer Reference Summary, LinkedIn Post Draft, Marketing Event Description, SEO Keyword Research from Sales Calls); **Sales** (Competitive Brief, Account Handoff, Sales Call Coaching, Deal Strategy, Prospect Outreach Email, Account Snapshot, Deal Loss Insights); **Support** (Support Ticket Next Steps, Support Follow-Up Email, Customer Sentiment Score, Detailed Support Ticket Timeline); **IT Operations** (Support Documentation from Ticket, IT Help Desk). No distinct "HR" category exists on this public library either — HR-adjacent examples (Engineering Project Onboarding, Engineering Self-Evaluation) are filed under Engineering. |

## Independent read

- Claim 2 is worth stating plainly rather than treating as a contradiction needing resolution — it's simply a case where two separate Glean catalogs (in-product Templates, public Agent Library) were likely conflated in the base research's category description. Keeping them clearly separate in this project's own materials avoids overstating how many categories the actual in-product picker offers.
- Claim 4 is a small but real detail worth confirming hands-on before a client conversation — describing "Plan my day (Outlook)" as if it's a distinct named template, when the docs suggest it's a single template with a calendar-provider choice, could create a mismatched expectation during a live demo.
- Claim 5's complete inventory is useful as a reference list for identifying which of the 33 public examples might be worth adapting into Stratos's own tenant-stack use-case library (4.9.10), even though they aren't natively pre-installed.

## Confidence

**Doc-Verified** for claims 1, 3, 4, 5 (direct fresh fetches, complete lists). **Cross-referenced, likely attribution correction** for claim 2. Validation date 2026-09-09. Tenant/hands-on verification (an actual in-product template-picker screenshot, an actual "Plan my day" clone test) tracked in the companion test guide.

---

## Summary

| Item | Finding | Sr No |
|---|---|---|
| In-product templates | Confirmed: 8 total, 2 categories (Personal Productivity, Marketing) | 1 |
| 7-category framework | Belongs to the public Agent Library, not the in-product Templates page | 2 |
| "Weekly work report" | New template name confirmed | 3 |
| "Plan my day" split | Docs show ONE template — confirm Outlook/Google split hands-on | 4 |
| Public Agent Library | Confirmed: 33 examples, 6 departments, full list captured | 5 |
