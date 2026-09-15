# 4.9.4 Deployment Complexity Assessment - Independent Research Test Guide

**Purpose:** This guide's real job is different from most companion test guides in this project - it is the *only* way to actually produce the "engineering experience" complexity rating this field's own SOW definition requires ("Based on engineering experience: how complex is a real-world deployment?"). The companion research doc [V2/Deployment Complexity Assessment.md](../../../../Glean/Combined/4.9.4%20Integration%20&%20Technical/V2/Deployment%20Complexity%20Assessment.md) found documented setup steps, vendor timeline figures (1-3 weeks), a community-sourced realistic estimate (4-5 weeks), and review-site commentary - but no substitute exists for actually running a pilot rollout and logging what happens. Written so someone with no prior context on this project can pick it up and run it.

**Tenant entry:** Admin Console → Home (setup checklist) → Platform → Connectors / Identity / Branding
**Companion research doc:** [V2/Deployment Complexity Assessment.md](../../../../Glean/Combined/4.9.4%20Integration%20&%20Technical/V2/Deployment%20Complexity%20Assessment.md)
**Related fields:** [V2/Native Connectors.md](../../../../Glean/Combined/4.9.4%20Integration%20&%20Technical/V2/Native%20Connectors.md) · [V2/Identity & SSO Integrations.md](../../../../Glean/Combined/4.9.4%20Integration%20&%20Technical/V2/Identity%20&%20SSO%20Integrations.md) · [V2/Infrastructure Requirements.md](../../../../Glean/Combined/4.9.4%20Integration%20&%20Technical/V2/Infrastructure%20Requirements.md) · [4.9.10 Use Case Library/V2/Implementation Complexity.md](../../../../Glean/Combined/4.9.10%20Use%20Case%20Library/V2/Implementation%20Complexity.md) (single-use-case complexity - distinct from this field's whole-platform framing)

**Prerequisites (what you need before starting):**
- Admin access to the Glean Admin Console (or a sandbox/trial tenant if the production tenant isn't yet provisioned).
- Access to configure at least one SSO/IdP connection (Entra ID, Okta, or Google Workspace) and at least two-three native connectors (e.g. SharePoint/Google Drive, Teams or Slack, and one ticketing/knowledge system).
- A way to log elapsed time per phase (spreadsheet, timer, or ticketing system) - this guide's whole point is to produce real numbers.
- Whoever runs this should be the same person (or team) doing the actual engineering work, not just observing - the SOW field explicitly asks for "engineering experience," not a documentation review.

**Sr No mapping:** Sr No 1-8 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Deployment Complexity Assessment.md](../../../../Glean/Combined/4.9.4%20Integration%20&%20Technical/V2/Deployment%20Complexity%20Assessment.md#claims-sr-no-1-8-mapped-to-test-guide) - same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes on exactly what you observed and how long it took. "Pass" means you personally did it and it matched (or was better/worse than) the documented expectation - not that the docs say so.

**Effort column:** each row lists an estimated time to complete plus a difficulty tag - `Easy` (routine console check), `Medium` (a real but bounded configuration task), or `Hard` (a substantial, multi-step engineering task requiring cross-team coordination) - so you can plan which rows to tackle first.

---

## Section 1 - Confirming the documented process structure and headline timeline - Sr No 1-2

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | Deployment genuinely follows the documented 7-stage structure (pre-deployment, choose model, create workspace, prepare workspace, go live, maximize value, post-launch) | 1. Log into the Admin Console and check the built-in setup checklist/onboarding flow.<br>2. Confirm whether it maps to the 7 documented stages, or differs in this tenant. | The tenant's actual onboarding flow substantially matches (or you can clearly explain how it differs from) the 7 documented stages. | | | ~20 min, Easy |
| 2 | The vendor's "1-3 weeks" end-to-end setup-time figure is realistic for this specific tenant, given its actual connector count and content volume | 1. Before starting any real setup, list the connectors and content volume planned for this pilot (or the full rollout, if already scoped).<br>2. Track elapsed calendar time from "workspace created" to "first group of real users searching successfully." | You get a real, tenant-specific number to compare directly against the vendor's 1-3 week claim - note whether it matched, beat, or exceeded it, and why. | | This is the field's single most important measurement - log start/end dates precisely | Ongoing across the whole pilot, Hard |

## Section 2 - The core test: log a real pilot phase-by-phase (this IS the engineering-experience rating) - Sr No 3-5

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 3 | A realistic mid-sized-enterprise timeline (per community.glean.com) is closer to 4-5 weeks than the vendor's 1-3 week headline, once identity/SSO readiness, people data, source count, and stakeholder alignment are factored in | 1. For each of the five named drivers (SSO readiness, people data setup, number of initial sources, permissions/governance complexity, IT/security/business alignment speed), log how many calendar days each one actually took or blocked progress.<br>2. Sum total elapsed time and compare against both the 1-3 week and 4-5 week figures. | You get a real driver-by-driver breakdown of where time actually went, and can say definitively which published estimate (1-3 weeks vs. 4-5 weeks) this tenant's pilot more closely resembled. | | | Ongoing across the pilot, Hard |
| 4 | The reported 3-phase rollout pattern (2-week pilot, 4-6 week department deployment, 3-6 month org-wide scaling) is directionally accurate for a healthcare-scale deployment, or this tenant's real experience diverges meaningfully | 1. If this pilot is scoped as phase 1 (core systems, high-impact use cases), track its actual duration against the ~2-week benchmark.<br>2. Note explicitly if the pilot's scope or duration diverges from this pattern, and why. | You can state whether the tenant's actual pilot phase came in at, above, or below ~2 weeks, with a one-line reason for any gap. | | | Included in Sr No 3's tracking, Medium |
| 5 | Real deployment effort concentrates in connecting data sources, configuring permissions, and tuning relevance - not in the initial workspace setup itself - matching the G2 review-summarized split between vendor "under 2 hours" framing and IT-practitioner "significant time and effort" framing | 1. Time the initial workspace/first-connector setup separately from the full connector rollout + permissions configuration + relevance tuning that follows.<br>2. Compare the two durations directly. | You confirm (or refute) that initial workspace setup is fast (consistent with "under 2 hours" for that narrow step) while the full connector/permissions/tuning effort is the real time sink, giving this project its own first-hand version of the review-site split found in desk research. | | This directly closes the field's most explicitly search-summarized (least verified) claim | ~2 hrs for initial setup + ongoing for full rollout, Hard |

## Section 3 - Confirming specific complexity drivers already flagged by this project's other research - Sr No 6-8

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 6 | Microsoft Teams integration genuinely requires coordinated, multi-portal access (Azure Portal, Teams Developer Portal, Teams Admin Center, Glean Admin Console), and the single-tenant Azure 401 pitfall is a real risk for this tenant | 1. If Teams is in scope for this pilot, attempt (or interview whoever attempted) the Teams setup and count how many distinct portals/admins were actually involved.<br>2. Confirm whether this tenant's Azure AD is single-tenant, and if so, whether the documented 401 error was hit. | You get a real count of portals/people involved and a definitive answer on whether the single-tenant 401 pitfall applies to this tenant. | | Mark `Blocked (Teams not in this pilot's scope)` if not applicable yet | ~30-60 min (interview-based) or full setup time if done live, Medium-Hard |
| 7 | The OIDC-vs-SAML+SCIM directory-sync tradeoff is a real decision this tenant's deployment team has to make explicitly, not a default that resolves itself | 1. Confirm which protocol this tenant is using (or planning to use) for SSO.<br>2. If OIDC-only, test how long a real group-membership change takes to reflect in Glean (up to the documented 3 hours) - or confirm the manual "refresh immediately" override was used instead. | You get a real, tenant-specific confirmation of which protocol was chosen, why, and (if OIDC) an actual measured sync delay. | | | ~15 min to confirm choice + up to 3 hrs if timing a real sync delay, Medium |
| 8 | The AWS region-selection decision (if self-hosted on AWS) is treated as genuinely permanent/irreversible during actual deployment planning, and GCP vs. AWS on-prem connectivity setup is confirmed to require structurally different engineering work | 1. If self-hosted deployment is being evaluated, confirm with whoever is planning cloud infrastructure whether the "cannot be changed once built" region constraint was explicitly flagged and factored into planning.<br>2. If on-prem connectivity is in scope, confirm which mechanism (GCP IPsec VPN vs. AWS Transit Gateway peering) applies and whether the setup matched the documented CIDR requirements. | You confirm the region decision was treated with appropriate care, and that the correct cloud-specific on-prem mechanism was used without confusion between the two. | | Mark `Blocked (Glean-hosted, not self-hosted - not applicable)` if this client is not doing a self-hosted deployment | ~20 min (interview-based), Easy-Medium |

---

## Final step - roll this up into an actual complexity rating

Once Sections 1-3 are complete, use the totals below to state a real rating (Straightforward / Moderate / Complex) with specific observations, in the format the SOW field actually asks for - then copy that rating and the key numbers (real total elapsed time, biggest blocker encountered, biggest time sink) back into the companion research doc's Headline section, replacing its preliminary "Moderate, pending pilot" framing with the tenant-confirmed rating.

## Result Rollup

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Process structure & headline timeline | 2 | | | | |
| 2. Real pilot phase-by-phase log (core engineering-experience rating) | 3 | | | | |
| 3. Specific complexity drivers (Teams, OIDC/SAML, region/on-prem) | 3 | | | | |

**Final complexity rating (fill in after all rows complete):** ___________________
**Total real elapsed time, workspace creation to first live user group:** ___________________
**Biggest blocker encountered:** ___________________
