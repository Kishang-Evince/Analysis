# 4.9.6 Resistance & Failure Signals — Independent Research Test Guide

**Purpose:** Verification of every claim in the companion research doc [V2/Resistance & Failure Signals.md](../../../../Glean/Combined/4.9.6%20Adoption%20&%20Readiness/V2/Resistance%20&%20Failure%20Signals.md). The core finding there is that Glean's own docs are unusually direct about naming their biggest self-inflicted failure modes (approval delays, over-eager upfront connector rollout, SSO lockout), and that the Notion connector has a real structural oversharing gap. This guide's job is to actually trigger these failure conditions in a controlled way and confirm the diagnostic signals fire as documented. Written so someone with no prior context on this project can pick it up and run it — uses this tenant's existing stack (Notion, Teams, Outlook, Google Workspace) throughout.

**Tenant entry:** Glean Admin Console (People data, Insights, Connectors) · Notion (a disposable test page) · your identity provider (Entra/Okta) · Glean Assistant chat UI
**Companion research doc:** [V2/Resistance & Failure Signals.md](../../../../Glean/Combined/4.9.6%20Adoption%20&%20Readiness/V2/Resistance%20&%20Failure%20Signals.md)
**Base field doc (untouched, original):** [../Resistance & Failure Signals.md](../../../../Glean/Combined/4.9.6%20Adoption%20&%20Readiness/Resistance%20&%20Failure%20Signals.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):**
- Admin access to the Glean Admin Console (People data, Insights, Connectors sections).
- A disposable/test Notion page you can safely share and later delete.
- A test user account you can safely modify department/people-data fields for (do not use a real employee's live record).
- Awareness of your organization's actual connector approval process/timeline, for Sr No 1.

**Sr No mapping:** Sr No 1-10 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Resistance & Failure Signals.md](../../../../Glean/Combined/4.9.6%20Adoption%20&%20Readiness/V2/Resistance%20&%20Failure%20Signals.md#claims-sr-no-1-10-mapped-to-test-guide) — same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes on exactly what you observed. "Pass" means you personally triggered and observed the signal — not that the docs say so.

**Effort column:** each row lists an estimated time to complete plus a difficulty tag — `Easy` (a quick console check) or `Hard` (needs a real timeline, a disposable test asset, or careful setup to avoid affecting real users) — so you can plan which rows to tackle first.

---

## Section 1 — Confirming the two biggest documented bottlenecks against your own rollout — Sr No 1-2

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | Internal approval delays are a real, measurable bottleneck for your organization specifically | 1. Document the actual timeline from "we decided to deploy Glean" to "final internal approval granted" for your own rollout (security review, procurement, data-access sign-off, etc.).<br>2. Compare against the 1-3 week baseline referenced in this section's other fields. | You get a real, dated timeline for your own organization, confirming (or contradicting) whether approvals were in fact a major bottleneck. | | | ~20 min compiling, Easy |
| 2 | Connecting every application upfront (vs. 4-6 mission-critical apps first) genuinely delays the point users can start being trained | 1. Check your organization's actual connector rollout plan — how many apps were/are targeted for Phase 1?<br>2. If more than 4-6 were attempted at once, ask your Glean implementation contact whether this measurably delayed training start relative to a phased approach. | You get a real answer on whether your own rollout followed the phased guidance, and if not, whether it caused a delay. | | | ~15 min, Easy |

## Section 2 — Triggering the SSO lockout and people-data failure modes directly — Sr No 3-5

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 3 | A user not assigned to Glean in the identity provider is genuinely locked out with no alternate sign-in path | 1. Using a test account (not a real employee), confirm it is NOT assigned to the Glean app in your IdP (Entra/Okta).<br>2. Attempt to sign in to Glean with that account and confirm it is blocked/denied.<br>3. Assign the account in the IdP and confirm access now works. | You confirm the lockout is real and immediate, and that IdP assignment is the only fix — no fallback sign-in path exists. | | | ~15 min, Easy |
| 4 | A people-data gap (invalid department, malformed email, etc.) triggers a real, visible "Attention required" flag in the Admin Console | 1. On a test user record (not a real employee), introduce one of the documented invalid-data conditions — e.g. assign a department value that doesn't match any known department.<br>2. Check Admin Console → People data for an "Attention required" flag.<br>3. Separately, check whether this test user's search relevance, org-chart appearance, or Insights segmentation is visibly affected — this specific consequence was NOT confirmed on the documentation page itself, so this is genuinely new information for this tenant. | You confirm the flag appears, and independently establish (for the first time in this research) what the actual downstream consequence looks like in your own tenant. | | This closes research's claim 4 content-location gap with real, first-party tenant evidence | ~20 min, Easy |
| 5 | MAU can genuinely exceed employee count in your own tenant, and Glean's own diagnostic page correctly explains why when it happens | 1. In Admin Console → Insights, check whether your tenant's MAU count has ever exceeded (or come close to) your current employee/roster count.<br>2. If your organization has had any recent departures or org-chart changes, check whether those users still show up in MAU. | You confirm whether this scenario applies to your tenant, and if so, that the explanation (28-day rolling activity window) matches what you observe. | | | ~15 min, Easy |

## Section 3 — Testing the Notion oversharing gap and its Live Mode fix directly — Sr No 6-7

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 6 | Content shared with the Notion integration becomes visible to ALL Glean users, regardless of the original Notion sharing/permission settings | 1. Create a disposable Notion test page containing an obviously-fake "sensitive" phrase (e.g. a nonsense internal-sounding term).<br>2. Share it with the Glean Notion integration but keep its actual Notion sharing restricted to a small group.<br>3. Using a DIFFERENT Glean user account (one not in that small Notion sharing group), search for the test phrase in Glean.<br>4. Delete the test page immediately after confirming. | The second user, who has no real Notion access to the page, still finds it via Glean search — confirming the oversharing gap directly. This is a real risk demonstration, so use only disposable, clearly-fake content. | | Handle carefully — this is intentionally demonstrating a real exposure risk; use throwaway content only | ~20 min, Hard |
| 7 | Live Mode, when enabled and the user has connected their own Notion OAuth, correctly restores per-user permission enforcement at query time | 1. If your tenant has Live Mode enabled for Notion, connect a test user's own Notion OAuth.<br>2. Repeat the Sr No 6 test with that same test page, this time with the OAuth-connected user searching. | The OAuth-connected user's Live Mode query correctly respects real Notion permissions — i.e., they do NOT see content their actual Notion account can't access, even if it was indexed. | | If Live Mode isn't enabled in your tenant, mark Blocked and note this as a real configuration gap worth raising | ~15 min (or Blocked), Hard |

## Section 4 — Getting a direct answer on churn and closing the failure-case-study gap — Sr No 8-9

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 8 | Independent analysis attributes churn to "experimental AI budget" scrutiny and long deployments — worth asking your account team directly rather than relying on third-party analyst framing alone | Ask your Glean account team, in writing: *"Can you share your typical customer renewal rate, and any common reasons customers have chosen not to renew or have paused a rollout?"* | You get a direct, first-party answer (or a clear non-answer) that either supports or updates the third-party (Sacra.com) characterization found in research. | | Vendors may not answer this fully — a non-answer is itself informative | ~10 min active + wait for reply, Hard |
| 9 | No named customer failure/cancellation case study exists publicly — confirm this is still true, or find one if it exists | Do your own search for "Glean" plus terms like "canceled," "switched from Glean," "replaced Glean" and see if you can find anything research missed. | You either confirm the same absence, or find something research didn't — either result is useful. | | | ~15 min, Easy |
| 10 | The rollout-checklist page and the items-to-prepare page are genuinely separate documents covering different failure risks | Open both `docs.glean.com/get-started/golive/roll-out-glean-to-teammates` and `docs.glean.com/get-started/prepare/items-to-prepare` and confirm neither one alone covers both the SSO-lockout risk and the connector-sequencing risk. | You confirm both pages are needed for a complete rollout runbook. | | Quick sanity check for anyone building an internal rollout doc | ~10 min, Easy |

---

## Result Rollup

Once every row above has a Result filled in, copy the Pass/Fail/Partial/Blocked counts back into the companion research doc [V2/Resistance & Failure Signals.md](../../../../Glean/Combined/4.9.6%20Adoption%20&%20Readiness/V2/Resistance%20&%20Failure%20Signals.md), and specifically record the Notion oversharing test result (Sr No 6-7) and the account team's churn/renewal answer (Sr No 8) — those give this field its most decisive, tenant-specific evidence.

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Approval + connector-sequencing bottlenecks | 2 | | | | |
| 2. SSO lockout + people-data failure modes | 3 | | | | |
| 3. Notion oversharing + Live Mode fix | 2 | | | | |
| 4. Churn attribution + failure-case-study gap | 3 | | | | |
