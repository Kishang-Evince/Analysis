**Glean Tier 3 Advanced Evaluation**
**Product Release Velocity - Independent Fresh Research (V2)**

*Independent research, sources picked and read fresh this pass, dated 2026-09-14. Field definition: "How frequently does the vendor ship updates? Is the product actively evolving or stagnant?" This is part of a brand-new section, 4.9.12 Vendor Maturity & Trajectory, added 2026-09-14 to close a gap against the contracted SOW (see scrap/GLEAN_RESEARCH_MEMORY.md) - the SOW defines this as Tier 3, same as sections 4.9.1-4.9.11, but it was never built until now.*

**Sr No mapping:** rows 1-7 below map 1:1 to the same Sr No in the companion test guide [test/V2/Product Release Velocity.md](../../../../test/Glean/4.9.12%20Vendor%20Maturity%20%26%20Trajectory/V2/Product%20Release%20Velocity.md) - same number, same claim, doc-sourced here / tenant-tested there.

---

## Headline

Glean ships on a genuinely fast, sustained cadence - the public release-notes index lists 44 dated monthly/bi-weekly entries stretching back to April 2025, and 32 of those fall inside the most recent 12 months (September 2025-September 2026), a rate of roughly 2.7 dated releases per month. This is not a slowing or token cadence: the newest entry (September 8, 2026) shipped a new frontier model (GPT-6 Astra) into Assistant/Agents, and this project's own prior research independently found substantive feature drops in February, March, May, July, and September 2026 - meaning the cadence carries real functional weight, not just changelog padding. The one caveat: a dated entry proves *a* release happened, not the magnitude of what shipped in it - some entries are major (new model, new product surface) and some are narrower fixes, and the index alone doesn't distinguish them.

## Claims (Sr No 1-7, mapped to test guide)

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 1 | The public release-notes index lists 44 dated entries from April 2025 through September 2026 (~17 months) | [docs.glean.com/release-notes](https://docs.glean.com/release-notes) | Fresh fetch of the index page enumerated dated entries from Apr 17, 2025 through Sep 8, 2026: Apr 17/30 2025; May 20; Jun 4/18; Jul 2/10/16/30; Aug 12/22/27; Sep 10/15/24/25; Oct 8/22; Nov 5/19; Dec 3/17/25 2025; Jan 14/28; Feb 11/25; Mar 11/25; Apr 8/22; May 6/20; Jun 3/17; Jul 1/15/29; Aug 12/13/18/31; Sep 3/8 2026 - 44 total dated releases. |
| 2 | In the most recent 12 months alone (Sep 2025-Sep 2026), there are 32 dated release entries - a rate of ~2.7 per month, i.e. roughly biweekly with some months carrying multiple drops | Derived from the same index, [docs.glean.com/release-notes](https://docs.glean.com/release-notes) | Month-by-month count over the trailing 12 months: Sep 2025 (4), Oct (2), Nov (2), Dec (3), Jan 2026 (2), Feb (2), Mar (2), Apr (2), May (2), Jun (2), Jul (3), Aug (4), Sep-to-date (2) = 32. This is a materially faster cadence than a quarterly-release enterprise-software norm. |
| 3 | The newest entry in the index (September 8, 2026) shipped a new frontier third-party model into production, not a cosmetic update | [docs.glean.com/release-notes/releases/2026-09-08-september-release](https://docs.glean.com/release-notes/releases/2026-09-08-september-release) | Verbatim (independently confirmed in this project's own `4.9.3/V2/Foundation Models Used.md` Sr No 12): *"You can now use GPT-6 Astra in Glean Assistant and Agents. Astra is strongest on long-running artifact workflows and complex reasoning, coding, and agentic work."* Available to Enterprise Flex, Core Suite, and Enterprise (Customer Key) at ship time, with Azure support "coming soon" - itself a small forward-visibility data point (see companion field, Roadmap Visibility). |
| 4 | At least one month in the trailing 12 (August 2026) carried four separate dated entries in a single calendar month, showing cadence isn't evenly smoothed - it bursts | [docs.glean.com/release-notes](https://docs.glean.com/release-notes) | Index lists Aug 12, Aug 13, Aug 18, and Aug 31, 2026 as four distinct dated entries in the same month - the densest single month in the trailing-12 window. |
| 5 | This project's own prior, independently-conducted research (across multiple unrelated fields) already found substantive shipped features in five separate 2026 months, corroborating the index-derived cadence from a second angle | Cross-referenced from this project's own `4.9.3/V2/Foundation Models Used.md`, `4.9.1/V2/Features Confirmed.md`, and `scrap/GLEAN_RESEARCH_MEMORY.md` | Prior research independently documented substantive drops in February 2026 (85+ actions, 8 named engineering agents), March 2026 (MCP directory growth, "tool search," Skills/SKILL.md concepts), May 2026 (Claude Sonnet 1M-context retirement notice), July 2026 (referenced in the memory audit's coverage table), and September 2026 (GPT-6 Astra, Insights/Admin chat). Two independent research passes (this one and the prior 87-field corpus) converge on the same finding: cadence is real and substantive, not just frequent trivial entries. |
| 6 | A separate "product drop" content series ran monthly from August 2025 through at least July 2026, presented as retrospective feature recaps rather than a duplicate of the release-notes log | [glean.com/product-drop](https://www.glean.com/product-drop) | Fresh fetch confirms the page lists monthly recap entries (e.g. "Create content with voice," "Turn meetings into searchable context," "Move from answers to action") in past tense, covering roughly Aug 2025-Jul 2026 per this project's own prior audit (`scrap/GLEAN_RESEARCH_MEMORY.md`, 8 files). This is a second, marketing-facing cadence signal independent of the docs.glean.com release-notes log, and it corroborates rather than duplicates it. |
| 7 | Caveat: the release-notes index counts dated *entries*, not the magnitude of each one - some are major (new model, new product surface) and some are narrower/incremental, and the public index does not itself distinguish the two | [docs.glean.com/release-notes](https://docs.glean.com/release-notes) | The index page returned only titles/dates in this pass's fetch, not a size/impact classification. Claims 3 and 5 above independently establish that *several* entries in the cadence carry real substantive weight, but a buyer should not assume all 44 (or all 32 trailing-12-month) entries are equally significant without opening each one - this is a real limit on what "cadence" alone proves. |

## Independent read

- The cadence itself (32 dated releases in 12 months, ~2.7/month) is unambiguous and independently verifiable - a buyer or advisor can re-run the same index fetch at any time to re-confirm currency.
- What makes this more than a vanity metric is claim 5: this project's own prior research, done for entirely different reasons across five other fields, kept independently landing on real shipped capability in the same months the index shows activity. Two independently-arrived-at data sources agreeing is stronger evidence than either alone.
- Claim 7's caveat matters for how this gets presented to the client: "ships roughly every two weeks" is a defensible, evidenced claim; "every release is a major capability" is not, and this doc does not make that stronger claim.

## Confidence

**Doc-Verified**, 3 independent sources (release-notes index, product-drop index, September release-note detail page) plus cross-referenced corroboration from this project's own prior independent research across 5 other fields, validation date 2026-09-14. No sandbox/tenant access required - the release-notes index and product-drop archive are both publicly readable without login.

---

## Summary

| Item | Finding | Sr No |
|---|---|---|
| Total dated release-note entries (Apr 2025-Sep 2026) | 44 | 1 |
| Trailing-12-month cadence | 32 entries, ~2.7/month | 2 |
| Most recent release | Sep 8, 2026 - GPT-6 Astra shipped into Assistant/Agents | 3 |
| Densest single month (trailing 12) | Aug 2026 - 4 dated entries | 4 |
| Cross-project corroboration | 5 separate months (Feb/Mar/May/Jul/Sep 2026) independently confirmed substantive in prior unrelated research | 5 |
| Secondary cadence signal | "Product drop" monthly recap series, Aug 2025-Jul 2026 | 6 |
| Limitation | Entry count ≠ magnitude; index doesn't classify impact | 7 |
