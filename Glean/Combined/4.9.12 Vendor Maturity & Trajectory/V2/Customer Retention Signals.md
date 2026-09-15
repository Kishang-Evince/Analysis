**Glean Tier 3 Advanced Evaluation**
**Customer Retention Signals - Independent Fresh Research (V2)**

*Independent research, sources picked and read fresh this pass, dated 2026-09-14. Field definition: "Published NPS, G2/Gartner Peer Insights reviews, churn indicators, or expansion metrics." This is part of a brand-new section, 4.9.12 Vendor Maturity & Trajectory, added 2026-09-14 to close a gap against the contracted SOW (see scrap/GLEAN_RESEARCH_MEMORY.md) - the SOW defines this as Tier 3, same as sections 4.9.1-4.9.11, but it was never built until now.*

**Sr No mapping:** rows 1-8 below map 1:1 to the same Sr No in the companion test guide [test/V2/Customer Retention Signals.md](../../../../test/Glean/4.9.12%20Vendor%20Maturity%20%26%20Trajectory/V2/Customer%20Retention%20Signals.md) - same number, same claim, doc-sourced here / tenant-tested there.

---

## Headline

Third-party review-platform data is real and consistently strong (4.4-4.5 stars across three separate Gartner Peer Insights market categories, 100+ reviews each; a G2 seller page listing 162 reviews), but there is no published NPS anywhere, and no churn or net-revenue-retention figure disclosed publicly - both absence-checks, not oversights on this pass's part. The strongest available retention *proxy* is indirect: publicly reported ARR growth (~$100M to ~$300M in roughly 16 months) implies strong net expansion within the existing base, since that pace of growth for an enterprise SaaS company at this stage is not plausible on new-logo acquisition alone - but this is an inference this pass is making, not a vendor-disclosed retention metric, and should be labeled as such.

## Claims (Sr No 1-8, mapped to test guide)

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 1 | G2 lists 162 reviews for "Glean Technologies Products" on its seller aggregation page | [g2.com/sellers/glean-technologies](https://www.g2.com/sellers/glean-technologies-db5ca3dc-c8a9-4900-9065-0c1ab979908a) (found via search snippet; direct fetch returned HTTP 403 this pass) | Search-result snippet: *"Glean Technologies Products \| Read 162 Reviews on G2."* Direct WebFetch of the G2 page itself returned a 403 (G2 blocks automated fetching) both for the seller page and the product-specific reviews page - this figure is search-snippet-sourced only, not independently confirmed against the live page's rendered content this pass. |
| 2 | An older, explicitly dated comparison-report snippet shows Glean at 4.7/5 based on 116 reviews as of October 2023 - this is stale and should not be presented as current | [g2.com/compare_reports/guru-and-glean](https://www.g2.com/compare_reports/guru-and-glean-90617130-adbe-4aab-b4f5-0ff24a031f63) (search snippet only) | This figure is nearly three years old relative to this pass's 2026-09-14 validation date and predates most of the platform capability this project has documented (Agent Builder, AI Gateway, Model Hub, MCP support did not exist in anything like their current form in Oct 2023). Flagged explicitly as outdated context, not a current rating. |
| 3 | Gartner Peer Insights shows Glean at 4.5 stars / 115 reviews in the "Insight Engines" market | [gartner.com/reviews/market/insight-engines/...glean](https://www.gartner.com) (search-snippet sourced; direct fetch returned HTTP 403 this pass) | Search-result summary: *"In the Insight Engines market, Glean has a rating of 4.5 stars with 115 reviews."* Direct WebFetch of the Gartner review page returned a 403 this pass (Gartner blocks automated fetching) - figure is search-snippet-sourced, not independently confirmed against the live rendered page. |
| 4 | Gartner Peer Insights shows Glean at 4.5 stars / 126 reviews in the "Generative AI Knowledge Management Apps / General Productivity" market | [gartner.com/reviews/market/generative-ai-knowledge-management-apps-general-productivity/vendor/glean](https://www.gartner.com) (search-snippet sourced) | Search-result summary: *"In the Generative AI Knowledge Management Apps/General Productivity market, Glean has a rating of 4.5 stars with 126 reviews."* Same 403-on-direct-fetch caveat as claim 3 applies. |
| 5 | Gartner Peer Insights shows Glean at 4.4 stars / 132 reviews in the "Enterprise AI Search" market | [gartner.com/reviews/market/enterprise-ai-search/vendor/glean](https://www.gartner.com) (search-snippet sourced) | Search-result summary: *"In the Enterprise AI Search market, Glean has a rating of 4.4 stars with 132 reviews."* Same 403-on-direct-fetch caveat as claims 3-4 applies. Notably, Glean appears listed and independently rated across at least three distinct Gartner market-category taxonomies, not just one - consistent with a platform spanning multiple analyst-defined categories (see the companion Platform vs. Point Solution field). |
| 6 | No published Net Promoter Score (NPS) was found anywhere for Glean, from Glean itself or a third party | Absence-check, fresh web search this pass | A direct search for "Glean NPS score customer satisfaction enterprise search" returned only generic explainer content about what NPS is in general - no Glean-specific NPS figure surfaced from any source (vendor site, press, analyst, or review aggregator). |
| 7 | No published churn rate or net-revenue-retention (NRR) percentage was found anywhere for Glean | Absence-check, fresh web search this pass | Funding/ARR coverage found this pass (claim 8) reports growth and valuation figures but never a churn or NRR percentage - consistent with Glean being a private company under no public disclosure obligation for these metrics. This should be reported as a genuine gap, not inferred or estimated. |
| 8 | Publicly reported ARR growth is a real, though indirect, retention/expansion proxy: Glean's ARR is reported to have grown from roughly $100M (early 2025) to $200M (December 2025) to $300M (May 2026) | [glean.com/press/glean-raises-150m-series-f](https://www.glean.com/press) ; [techcrunch.com, "Glean's top line crosses $300M"](https://techcrunch.com/2026/05/28/gleans-top-line-crosses-300m-as-ai-budget-cutting-becomes-its-major-selling-point/) (search-snippet sourced; press release and TechCrunch article not independently re-fetched in full this pass) | Search-aggregated figures: ~$100M ARR (FY ended Jan 31, 2025) -> $200M ARR (Dec 2025, doubling in ~9 months) -> $300M ARR (May 2026), alongside a $150M Series F at a $7.2B valuation. This pace of ARR growth for an enterprise SaaS company at this maturity is difficult to sustain on new-logo bookings alone and typically implies meaningful expansion (seat growth, cross-sell into Agent Builder/AI Gateway) within the existing base - but this is this pass's own inference from the growth rate, not a disclosed NRR or expansion-rate figure, and must be labeled as inference, not fact. |

## Independent read

- The review-platform data (claims 1, 3-5) is genuinely useful and consistently positive across every market category checked - three separate Gartner taxonomies and one G2 seller aggregation, all landing in the 4.4-4.5 / 100+ review range, is a reasonably robust convergent signal even though none of the underlying pages could be directly re-fetched this pass (both G2 and Gartner blocked automated access with HTTP 403).
- The 403s on both G2 and Gartner are themselves worth flagging honestly in the test guide - these figures rest on search-engine snippet text, not a directly rendered and re-verified page, and a human reviewer with a live browser session should re-confirm them rather than treating this doc's numbers as the final word.
- Claims 6-7 (no NPS, no churn/NRR disclosed) are legitimate absence-check findings consistent with Glean's status as a private company - this is not a red flag on its own (most private enterprise SaaS vendors don't disclose these), but it does mean a buyer cannot lean on a vendor-published retention number and must rely on proxies (claim 8) and direct reference-checks instead.
- Claim 8's ARR-growth-as-retention-proxy argument is this pass's own reasoning, not a vendor claim - it should be presented to the client explicitly as an inference with a stated logic chain, not as if Glean published an NRR figure.

## Confidence

**Search-corroborated, unconfirmed against live page** for claims 1-5 and 8 (G2/Gartner blocked direct WebFetch with HTTP 403 this pass; figures rest on search-result snippets only - re-verification with a live browser session is recommended and tracked in the companion test guide). **Absence-check, explicitly flagged** for claims 6-7 (no NPS, no churn/NRR found anywhere). Validation date 2026-09-14.

---

## Summary

| Item | Finding | Sr No |
|---|---|---|
| G2 review count | 162 reviews (Glean Technologies Products, seller page) | 1 |
| G2 rating (stale, Oct 2023) | 4.7/5, 116 reviews - do not present as current | 2 |
| Gartner - Insight Engines market | 4.5 stars, 115 reviews | 3 |
| Gartner - Generative AI KM Apps market | 4.5 stars, 126 reviews | 4 |
| Gartner - Enterprise AI Search market | 4.4 stars, 132 reviews | 5 |
| Published NPS | Not found anywhere | 6 |
| Published churn / NRR | Not found anywhere | 7 |
| ARR growth (retention/expansion proxy, inferred) | ~$100M -> $200M -> $300M in ~16 months | 8 |
