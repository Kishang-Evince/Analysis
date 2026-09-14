# 4.9.4 Identity & SSO Integrations - Independent Research Test Guide

**Purpose:** Hands-on verification of every claim in the companion research doc [V2/Identity & SSO Integrations.md](../../../../Glean/Combined/4.9.4%20Integration%20&%20Technical/V2/Identity%20&%20SSO%20Integrations.md). The core finding there is a real tension: Glean recommends OIDC for better permission control, but OIDC-only directory sync is documented as up to 3 hours slower than SAML+SCIM. This guide's job is to confirm your own tenant's actual sync behavior and close the one unconfirmed detail (a dedicated OneLogin guide). Written so someone with no prior context on this project can pick it up and run it - everything here uses your normal Admin Console access plus whichever IdP your organization already uses (Okta, Microsoft Entra ID, or Google Workspace are the most common).

**Tenant entry:** Admin Console → Users & permissions → SSO · your organization's actual identity provider (Okta / Entra ID / Google Workspace, whichever you use)
**Companion research doc:** [V2/Identity & SSO Integrations.md](../../../../Glean/Combined/4.9.4%20Integration%20&%20Technical/V2/Identity%20&%20SSO%20Integrations.md)
**Base field doc (untouched, original):** [../Identity & SSO Integrations.md](../../../../Glean/Combined/4.9.4%20Integration%20&%20Technical/Identity%20&%20SSO%20Integrations.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):**
- Admin access to the Glean Admin Console.
- Admin access to your organization's actual identity provider (whichever one you use - Okta, Microsoft Entra ID, and Google Workspace all have dedicated Glean guides; any other SAML-compliant IdP works via the generic SAML path).
- One test user account you can add to/remove from a group in your IdP, to test sync timing without disrupting real users.

**Sr No mapping:** Sr No 1-9 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Identity & SSO Integrations.md](../../../../Glean/Combined/4.9.4%20Integration%20&%20Technical/V2/Identity%20&%20SSO%20Integrations.md#claims-sr-no-1-9-mapped-to-test-guide) - same number, same claim, doc-sourced there / tenant-tested here. Sr No 8-9 added 2026-09-14 - new identity-reconciliation findings found via a full-corpus sweep of this project's local Glean documentation crawl, never previously tested (see scrap/GLEAN_RESEARCH_MEMORY.md).

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes on exactly what you observed. "Pass" means you personally confirmed it - not that the docs say so.

**Effort column:** each row lists an estimated time to complete plus a difficulty tag - `Easy` (routine console/IdP check, quick to judge) or `Hard` (needs waiting for a sync window, or a full SSO reconfiguration test) - so you can plan which rows to tackle first.

---

## Section 1 - Confirming which protocol your tenant actually uses, and why - Sr No 1

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | Your tenant supports (or could support) both SAML and OIDC, with OIDC as the documented recommendation | 1. Go to **Admin Console → Users & permissions → SSO**.<br>2. Confirm which protocol your tenant currently uses (SAML or OIDC).<br>3. If you're setting up SSO for the first time, note whether the setup flow itself recommends OIDC, matching the documentation. | You confirm your tenant's actual protocol, and whether the setup experience matches the documented OIDC recommendation. | | | ~10 min, Easy |

## Section 2 - Confirming the named IdP guides exist and work, including the unconfirmed OneLogin gap - Sr No 2

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 2 | Dedicated setup guides exist for Entra ID, Google Workspace, and Okta - and it's worth checking directly whether OneLogin also has one | 1. Open `docs.glean.com/administration/identity/sso/about` and confirm the four listed IdP paths.<br>2. Search specifically for a dedicated OneLogin configuration guide (not just a mention) - does one exist, or does OneLogin only work via the generic SAML path? | You confirm the three named guides (Entra ID, Google Workspace, Okta) exist, and specifically resolve whether OneLogin has its own dedicated guide or uses the generic SAML path - closing the one gap flagged in research. | | This closes a real research gap - record the answer either way | ~10 min, Easy |

## Section 3 - Confirming MFA really is delegated to the IdP, not enforced by Glean - Sr No 3

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 3 | Glean has no MFA setting of its own - logging in without MFA succeeds if your IdP doesn't require it, and MFA only appears if configured at the IdP level | 1. Check your IdP's (Okta/Entra ID/Google Workspace) conditional access / MFA policy settings - confirm whether MFA is required there.<br>2. Log in to Glean via SSO and observe whether an MFA prompt appears - and confirm it's coming from your IdP's login screen, not a separate Glean-hosted prompt. | The MFA prompt (if any) appears as part of your IdP's own login flow, confirming Glean has no independent MFA layer of its own. | | | ~10 min, Easy |

## Section 4 - The core test: measuring real directory sync speed for your actual protocol - Sr No 4-5

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 4 | Group membership changes sync to Glean at very different speeds depending on protocol - near real-time for SAML+SCIM, up to 3 hours for OIDC-only | 1. Add your test user to (or remove from) a group in your IdP.<br>2. Do **not** manually refresh - just wait and periodically check Glean's Admin Console for when that group-membership change is reflected.<br>3. Time how long it actually took. | If you're on SAML+SCIM, the change reflects in Glean quickly (minutes). If you're on OIDC-only, it may take up to 3 hours - either result, if it matches your protocol, confirms the documented behavior. | | This is the field's core finding - a real timed measurement is the most valuable thing this guide can produce | ~5 min active + up to 3 hrs waiting (OIDC) or ~15 min (SAML/SCIM), Hard |
| 5 | An admin can manually force an immediate group-membership refresh instead of waiting | 1. In Admin Console, find the "refresh group membership" or equivalent manual sync control.<br>2. Trigger it after making a test group change.<br>3. Confirm the change reflects immediately, without waiting for the normal sync window. | The manual refresh control exists and works - the change appears right away when you trigger it, regardless of your protocol's normal sync delay. | | | ~10 min, Easy |

## Section 5 - Confirming Glean doesn't enforce your IdP's own permission rules - Sr No 6

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 6 | Glean only reads group membership from your IdP - it does not independently enforce your IdP's conditional access or permission policies | 1. Set up an IdP-side conditional access rule that would block or restrict a specific test user in some way (e.g. block access from a specific network/location, if your IdP supports this in a test-safe way).<br>2. Confirm this restriction is enforced by the IdP's own login screen, not something Glean separately checks or re-implements on its own. | The restriction is enforced entirely at the IdP login step - Glean simply trusts the IdP's authentication result and reads group membership afterward, with no separate enforcement logic of its own. | | Adjust this test to whatever conditional-access capability your specific IdP safely supports for testing | ~15 min, Easy |

## Section 6 - Confirming the domain-match safety check in the login flow - Sr No 7

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 7 | Glean checks that the authenticating user's email domain matches your organization's expected domain before issuing a session, as an extra safety layer beyond the IdP's own check | 1. If you have access to a test account with an email domain that does **not** match your organization's primary domain (e.g. a personal or unrelated test account authenticated through the same IdP setup), attempt to log in.<br>2. Observe whether Glean rejects the session despite successful IdP authentication, due to the domain mismatch. | Glean rejects or blocks the session when the email domain doesn't match, even though the IdP itself authenticated the user successfully - confirming this is a real, additional check Glean performs. | | This is a safety-sensitive test - only attempt with an account you're authorized to use for testing, and expect it to fail (that failure is the pass condition) | ~15 min, Easy |

## Section 7 - Confirming cross-tenant identity reconciliation via aliases - Sr No 8

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 8 | Glean stitches a user's separate accounts (across multiple connectors or IdP tenants) into one person record using aliases derived from named IdP attributes (proxyAddresses, otherMails/secondEmail) | 1. Go to **Admin Console → Identity → People data → User aliases** (or equivalent).<br>2. Pick a test user who exists in more than one connector or has multiple email addresses in your IdP (e.g. via proxyAddresses in Entra ID/Okta).<br>3. Confirm Glean has merged these into a single person record, and confirm which attribute (proxyAddresses vs. otherMails/secondEmail) is driving the merge, and whether the opt-in/spoofing-risk-aware defaults match documentation. | You confirm a real multi-identity user is correctly merged into one person record, and that the alias source attribute and its default (off unless enabled) match the documented behavior. | | Relevant for M&A or multi-domain healthcare-network scenarios | ~20 min, Easy-Hard depending on whether a suitable multi-identity test user exists |

## Section 8 - Confirming the SSO vs. People Data dependency - Sr No 9

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 9 | SSO and People Data are decoupled - a user can log in via SSO yet be invisible in the org chart/directory, especially under SAML-only setups, unless a separate people-data pipeline (OIDC-scoped sync, CSV, or Indexing API) is configured | 1. Confirm which protocol your tenant uses for SSO (from Sr No 1).<br>2. If SAML-only, check whether a separate people-data sync (OIDC-scoped, CSV upload, or Indexing API) is configured in **Admin Console → Identity → People data**.<br>3. Pick a recently-onboarded user and confirm whether they can log in successfully but are missing from the org chart/directory search (or vice versa), consistent with the documented decoupling. | You confirm whether your tenant's SSO protocol requires a separate people-data pipeline, and find (or rule out) at least one real example of a user visible in one system but not the other. | | Refines claim 4's sync-speed finding by identifying a more basic dependency | ~20 min, Easy |

---

## Result Rollup

Once every row above has a Result filled in, copy the Pass/Fail/Partial/Blocked counts back into the companion research doc [V2/Identity & SSO Integrations.md](../../../../Glean/Combined/4.9.4%20Integration%20&%20Technical/V2/Identity%20&%20SSO%20Integrations.md), and specifically record your real measured sync time from Sr No 4 and resolve the OneLogin question from Sr No 2.

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Protocol confirmation | 1 | | | | |
| 2. Named IdP guides + OneLogin gap | 1 | | | | |
| 3. MFA delegated to IdP | 1 | | | | |
| 4. Real sync-speed measurement + manual override | 2 | | | | |
| 5. No independent IdP-rule enforcement | 1 | | | | |
| 6. Domain-match safety check | 1 | | | | |
| 7. Cross-tenant identity reconciliation (aliases) | 1 | | | | |
| 8. SSO vs. People Data dependency | 1 | | | | |
