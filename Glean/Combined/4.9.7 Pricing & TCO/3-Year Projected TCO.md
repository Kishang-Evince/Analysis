# Field 5: 3-Year Projected TCO

**Category:** 4.9.7 - Pricing & TCO  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** All 5 fields drafted (pricing mechanics Doc-Verified) · Dollar amounts Pending Contract / quote  
**Baseline model:** 100-seat enterprise deploy, tenant stack only (Notion, Teams, Outlook, OneDrive, Gmail, Drive/Docs/Sheets).  
**Important:** Glean publishes **pricing mechanics**, not public list prices. All dollar figures below are **Pending Contract** unless marked Vendor-Stated.
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [3-Year Projected TCO.md](../../../test/Glean/4.9.7 Pricing & TCO/3-Year Projected TCO.md)

---

**Field definition:** Estimated total cost of ownership over 3-year enterprise horizon (100-seat baseline).  
**Prerequisites / Licensing:** Completed Fields 1–4 quotes; consumption scenario selected.  
**3-year TCO (Pending Contract):** _TBD — insert quoted dollars_  
**Confidence Level:** **Doc-Verified** (model structure) · **Pending Contract** (all dollar inputs)  
**Validation Date:** September 3, 2026  
**Source URLs:** [Enterprise Flex pricing](https://docs.glean.com/glean-enterprise-flex-pricing) · [Core Suite pricing](https://docs.glean.com/glean-core-suite-pricing) · [Forrester TEI study](https://www.glean.com/resources/guides/forrester-study-the-total-economic-impact-of-glean) (Vendor-Stated ROI only, not cost model)

### TCO model — 100 seats × 36 months

| Line item | Formula | Year 1 | Year 2 | Year 3 | 3-yr total | Source |
|---|---|---|---|---|---|---|
| **Enterprise Flex seats** | `$/seat/mo × 100 × 12` | Pending | Pending | Pending | Pending | Quote Field 1 |
| **Base FlexCredits included** | In seat agreement | Included | Included | Included | $0 incremental | Flex pricing |
| **FlexCredit overage packs** | Scenario-based | Pending | Pending | Pending | Pending | Usage model below |
| **Protect+** | Annual site-wide | Pending | Pending | Pending | Pending | Quote Field 4 |
| **Premium Support** | Annual site-wide | Pending | Pending | Pending | Pending | Quote Field 4 |
| **Implementation PS** | One-time | Pending | — | — | Pending | Quote Field 3 |
| **Custom connector PS** | One-time (if any) | Pending | — | — | Pending | Out of scope = $0 |
| **Customer cloud infra** | Monthly × 36 (Cloud-Prem only) | Pending | Pending | Pending | Pending | N/A if Hosted |
| **BYOK provider LLM** | Direct to provider (if BYOK) | Pending | Pending | Pending | Pending | Optional |
| **Internal IT labor** | Admin deploy hours × rate | Pending | — | — | Pending | 4.9.1 Field 6 timing |
| **LESS: BYOK/self-host discount** | % off seats + credits | Pending | Pending | Pending | Pending | Contract |
| **3-YEAR TCO** | Sum | | | | **Pending** | |

### Consumption scenarios (FlexCredit mechanics — Doc-Verified)

| Scenario | Profile | Agent runs/user/month (assumed) | FlexCredit burn (rough) |
|---|---|---|---|
| **Light** | Fast Mode + included 100 thinking/week Standard | 5 | Mostly within seat inclusion |
| **Moderate** | Regular agents + some Premium model | 20 | ~7 FC × 20 × 100 users = ~14K FC/mo (median) |
| **Heavy** | Deep research, slides, MCP automation, Premium default | 50+ | p90 ~114 FC/run escalates fast |

*Dollar mapping requires contract $/FlexCredit — not published.*

### Vendor-Stated ROI reference (not a cost input)

- Forrester TEI (commissioned): **141% ROI over 3 years** — benefit-side only; no cost breakdown in public scrap.

### Engineering observation (Doc-Verified)

- **Cannot compute numeric TCO from docs alone** — only structure and consumption mechanics.
- 100-seat baseline aligns with tier3-analysis-report definition; verify no **150-seat minimum** in actual quote (Vendor-Stated in perspective content only).
- Renewal uplift and true-up policy materially affect Year 2–3 — must be in contract.

### Verification steps / test case

1. Populate TCO table from Glean/partner quote (all Pending cells).
2. Run 30-day pilot — extrapolate FlexCredit burn to annual overage.
3. Model Light / Moderate / Heavy scenarios — present range not single point.
4. Add internal IT labor from Field 6 timed checklist for full economic view.
5. Compare 3-year TCO to Forrester ROI only as sanity check, not validation.

**Risk & Cost Impact:** Risk: Medium (consumption variance) | Cost: **Pending quote** — budget hold until Field 1 complete
