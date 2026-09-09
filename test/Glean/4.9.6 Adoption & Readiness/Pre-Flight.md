# 4.9.6 Admin Test Guide - Glean Adoption & Readiness

**Purpose:** Verify all 4 fields under `4.9.6 Adoption & Readiness`.  
**Companion eval log:** `Glean/Combined/4.9.6 Adoption & Readiness/Overview.md`  
**Knowledge base:** `scrap/glean/docs.glean.com/get-started/`, `scrap/glean/docs.glean.com/administration/insights/`

**Tenant stack:** Notion, Teams, Outlook, OneDrive, Gmail, Drive/Docs/Sheets.  
**Pilot size:** 50–100 users (doc recommends 100–300).

---

## 0. Pre-Flight

1. Insights Moderator role for Admin A
2. Pilot cohort identified (dept or cross-functional)
3. Browser extension deploy path ready (MDM or manual)
4. Teams Glean app install permissions
5. Pre-seed: 10 Answers + 5 Go Links (populate-content doc)
6. Week-0 baseline Insights screenshot

---

## Fields in this section

- [Field 1 - Training Infrastructure](Training Infrastructure.md)
- [Field 2 - Adoption Friction Signals](Adoption Friction Signals.md)
- [Field 3 - Non-Technical User Experience](Non-Technical User Experience.md)
- [Field 4 - Resistance & Failure Signals](Resistance & Failure Signals.md)

---

## Evidence → Eval Log Mapping

| Tests | Field |
|---|---|
| Academy + docs inventory | Field 1 Training Infrastructure |
| Pilot metrics + extension A/B | Field 2 Adoption Friction |
| User B task scores | Field 3 Non-Technical UX |
| Bottleneck probes + 28-day cohort | Field 4 Resistance & Failure |

Update [`Glean/Combined/4.9.6 Adoption & Readiness/Pre-Flight.md`](../../../Glean/Combined/4.9.6%20Adoption%20&%20Readiness/Pre-Flight.md) after each session.

---

## Safety

1. Pilot survey - no PHI in free-text responses.
2. Notion over-share test - disposable content only; remove after test.
3. People-data gap test - restore user record after probe.
