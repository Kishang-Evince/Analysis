# 4.9.7 Admin Test Guide - Glean Pricing & TCO

**Purpose:** Gather contract + usage data for all 5 fields under `4.9.7 Pricing & TCO`.  
**Companion eval log:** `Glean/Combined/4.9.7 Pricing & TCO/Overview.md`  
**Knowledge base:** `scrap/glean/docs.glean.com/glean-enterprise-flex-pricing.md`, `glean-core-suite-pricing.md`

**Baseline:** 100-seat enterprise, 3-year horizon.  
**Note:** Most fields need **sales quote / contract**, not sandbox UI alone.

---

## 0. Pre-Flight

1. Obtain Glean or partner **quote** (100 seats, 3-year)
2. Full **order form** + SOW if implementation PS included
3. Admin → **Management → Usage** access (FlexCredits or Model Hub dashboard)
4. Know license model: **Enterprise Flex** vs **Core Suite**
5. 30-day usage snapshot for consumption extrapolation

---

## Fields in this section

- [Field 1 - Actual Partner Pricing](Actual Partner Pricing.md)
- [Field 2 - License Structure Details](License Structure Details.md)
- [Field 3 - Implementation Costs](Implementation Costs.md)
- [Field 4 - Hidden Costs Identified](Hidden Costs Identified.md)
- [Field 5 - 3-Year Projected TCO](3-Year Projected TCO.md)

---

## Evidence → Eval Log Mapping

| Source | Field |
|---|---|
| Quote + channel comparison | Field 1 Partner Pricing |
| Contract model + usage dashboard | Field 2 License Structure |
| SOW + internal hours | Field 3 Implementation Costs |
| Add-on line items | Field 4 Hidden Costs |
| Populated TCO table | Field 5 3-Year TCO |

Update [`Glean/Combined/4.9.7 Pricing & TCO/Pre-Flight.md`](../../../Glean/Combined/4.9.7%20Pricing%20&%20TCO/Pre-Flight.md) when quote received.

---

## Safety

1. Quote and contract docs **GUARDED** - do not commit to repo.
2. Store pricing in secure folder; eval log gets rounded figures only if client-facing.
