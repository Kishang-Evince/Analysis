# 4.9.3 Training Data Handling - Independent Research Test Guide

**Purpose:** Hands-on verification of every claim in the companion research doc [V2/Training Data Handling.md](../../../../Glean/Combined/4.9.3%20AI%20Architecture%20&%20Models/V2/Training%20Data%20Handling.md). The core finding there is that Glean and its model providers consistently state customer data is not used for training and that each tenant runs in an isolated single-tenant environment - but no explicit opt-in/opt-out toggle for training was found, and the training guarantee's documented wording is tied specifically to the Glean Universal Model Key path rather than confirmed identical for BYOK. This guide's job is to confirm this tenant's actual deployment path, actual admin-console configuration, and to get a direct written confirmation from Glean's account team on the two open questions (opt-out mechanism, BYOK scoping). Written so someone with no prior context on this project can pick it up and run it.

**Tenant entry:** Admin Console → Platform → LLM (also referenced in Glean's docs as "Model Management")
**Companion research doc:** [V2/Training Data Handling.md](../../../../Glean/Combined/4.9.3%20AI%20Architecture%20&%20Models/V2/Training%20Data%20Handling.md)
**Base field doc:** none exists yet - this is a new field, no pre-existing base to cross-check. **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):**
- Admin access to the Glean Admin Console, specifically the Platform → LLM / Model Management area.
- A contact at Glean (account manager, solutions engineer, or support) able to answer direct written questions about this tenant's specific DPA/order form - most of this guide cannot be closed from the console alone.
- Access to (or a copy of) this org's signed Glean DPA/order form, if available, for Sr No 8.

**Sr No mapping:** Sr No 1-8 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Training Data Handling.md](../../../../Glean/Combined/4.9.3%20AI%20Architecture%20&%20Models/V2/Training%20Data%20Handling.md#claims-sr-no-1-8-mapped-to-test-guide) - same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes on exactly what you observed. "Pass" means you personally confirmed it (in console, or in writing from Glean) - not that the docs say so.

**Effort column:** each row lists an estimated time to complete plus a difficulty tag - `Easy` (routine console check or a single email), `Medium` (needs a reply from Glean or a short document review), or `Hard` (needs a formal written confirmation from Glean's legal/security team, which may take days) - so you can plan which rows to tackle first.

---

## Section 1 - Confirming the standing no-training guarantee actually applies to this tenant - Sr No 1-3

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | Glean's documented zero-retention commitment with model providers (OpenAI, Azure OpenAI, Vertex AI, Amazon Bedrock) applies to this tenant's actual configured providers | 1. Go to **Admin Console → Platform → LLM** and note which model providers are actually enabled/configured for this tenant.<br>2. For each enabled provider, ask your Glean account contact (in writing) to confirm the zero-retention commitment applies to that specific provider for this tenant's account. | Written confirmation received naming each of this tenant's actual enabled providers as covered by a zero-retention commitment. | | | ~20 min console + a few days for written reply, Medium |
| 2 | The "your data isn't used for model training" guarantee is stated the same way regardless of whether a proprietary or open-weight model is selected in this tenant | 1. In Admin Console → Platform → LLM, check whether any open-weight models (vs. proprietary/hosted) are enabled for this tenant.<br>2. If so, ask your Glean contact to confirm in writing that the no-training guarantee applies identically to the open-weight option. | Confirmation received, or determined not applicable if this tenant has no open-weight models enabled. | | Mark `Blocked (no open-weight models in this tenant)` if not applicable | ~15 min, Easy |
| 3 | "Zero LLM data retention" is confirmed as a standard, included capability in this tenant's actual contract/deployment tier - not something that required an extra purchase or separate opt-in | 1. Check this tenant's Glean deployment tier (Protect vs. Protect+) in Admin Console → Security & Governance → Protect.<br>2. Confirm with your Glean account contact whether "zero LLM data retention" required any additional configuration or purchase for this tier, or was present by default. | Confirmed present by default at this tenant's actual tier, matching the documented claim that it's foundational (not a paid add-on). | | | ~15 min, Easy |

## Section 2 - Confirming tenant isolation is real, not just documented - Sr No 4

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 4 | This tenant is genuinely running in a single-tenant, isolated environment (not a shared multi-tenant pool), consistent with the documented sandbox/architecture claims | 1. Ask your Glean account contact to confirm in writing which cloud (AWS/Azure/GCP) and which isolation model (Glean-hosted single-tenant vs. customer-hosted) applies to this org's actual deployment.<br>2. If this tenant uses Agent Builder / agent sandboxes, ask whether any shared infrastructure components exist across customers, or whether isolation is confirmed end-to-end as documented. | Written confirmation of this tenant's actual hosting model and an explicit statement that no cross-tenant data/code/artifact access exists. | | This is the single most consequential row for a healthcare buyer - get it in writing, not verbally | ~30 min + written reply time, Hard |

## Section 3 - Closing the two genuine open questions from the research pass - Sr No 5-6

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 5 | Determine which model-key path this tenant actually uses (Glean Universal Model Key vs. Bring Your Own Key/Customer Key) and get written confirmation of whether the no-training guarantee's wording differs between the two paths | 1. In **Admin Console → Platform → LLM**, determine whether this tenant is on the Glean Universal Model Key or BYOK/Customer Key path (or a mix, per provider).<br>2. If BYOK is used for any provider, ask your Glean contact directly: "For providers where we bring our own key, is the zero-retention/no-training commitment Glean's, or is it purely our own contract with that provider?" | A clear, written answer identifying this tenant's actual key path per provider, and an explicit statement of who holds the no-training commitment (Glean vs. this org's own provider contract) for any BYOK provider. | | This closes the research doc's most important scoping gap (Sr No 5) | ~20 min console + written reply, Hard |
| 6 | Confirm whether any opt-in/opt-out control for training exists anywhere in this tenant's console or contract - the research pass found none documented publicly | 1. Search Admin Console → Platform → LLM and Security & Governance → Protect thoroughly for any toggle or setting referencing "training," "opt-out," or "opt-in."<br>2. If none is found, ask your Glean contact directly whether such a control exists anywhere (console or contractual) for this tenant. | Either a real toggle/setting is found and documented (contradicting the research pass's absence-check), or Glean confirms in writing that no such toggle exists and the protection is purely contractual/architectural (confirming it). | | Either outcome is a valid Pass - the goal is a definitive answer, not a particular answer | ~20 min console + written reply, Medium |

## Section 4 - The authoritative source: this tenant's actual signed DPA - Sr No 7-8

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 7 | This tenant's subprocessor list (per the companion Data Leakage Protections field) includes only providers this org has actually reviewed and accepted, and no undisclosed subprocessors are in use | 1. Compare the subprocessor list at glean.com/legal/subprocessors against any subprocessor addendum in this org's own DPA.<br>2. Confirm with Glean whether this org receives advance notice of subprocessor changes. | The lists match, and a subprocessor-change notification process is confirmed to exist. | | Cross-referenced from the companion Data Leakage Protections test guide - do not duplicate that field's own Sr No, just confirm consistency | ~20 min, Easy |
| 8 | This tenant's actual signed DPA/order form contains explicit training-data and tenant-isolation language consistent with (or going beyond) what's publicly documented | 1. Locate or request this org's signed Glean DPA/order form.<br>2. Check for explicit clauses on: (a) use of customer data for model training, (b) data isolation between tenants, (c) subprocessor training practices. | The DPA is located and its training/isolation language is read and recorded verbatim, confirming or adding detail beyond the public docs. | | This is the single authoritative source per this field's SOW definition - treat every other row above as directional until this is checked | ~1-2 hrs (may require legal/procurement involvement), Hard |

---

## Result Rollup

Once every row above has a Result filled in, copy the Pass/Fail/Partial/Blocked counts back into the companion research doc [V2/Training Data Handling.md](../../../../Glean/Combined/4.9.3%20AI%20Architecture%20&%20Models/V2/Training%20Data%20Handling.md), and specifically record: (1) this tenant's actual model-key path per provider (Sr No 5), and (2) whether any opt-in/opt-out control was confirmed to exist (Sr No 6) - those two answers are what turns this field from "Doc-Verified" into fully tenant-confirmed.

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. No-training guarantee applies to this tenant's configured providers | 3 | | | | |
| 2. Tenant isolation confirmed in writing | 1 | | | | |
| 3. Model-key path and opt-in/opt-out control | 2 | | | | |
| 4. Signed DPA - the authoritative source | 2 | | | | |
