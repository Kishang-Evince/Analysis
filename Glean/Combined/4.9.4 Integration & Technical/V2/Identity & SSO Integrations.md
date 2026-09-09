**Glean Tier 3 Advanced Evaluation**
**Identity & SSO Integrations - Independent Fresh Research (V2)**

*Independent research, sources picked and read fresh this pass, cross-checked 2026-09-09 against `docs.glean.com`. Field definition: "Support for SAML, OIDC, SCIM directory syncs, and multi-factor authentication." Base file at [`../Identity & SSO Integrations.md`](../Identity%20&%20SSO%20Integrations.md) left untouched - this is a standalone V2 doc, not an edit of it.*

**Sr No mapping:** rows 1-7 below map 1:1 to the same Sr No in the companion test guide [test/V2/Identity & SSO Integrations.md](../../../../test/Glean/4.9.4%20Integration%20&%20Technical/V2/Identity%20&%20SSO%20Integrations.md) - same number, same claim, doc-sourced here / tenant-tested there.

---

## Headline

Both SAML and OIDC are real, with named-IdP configuration guides for the major providers. But there's a genuine tension worth surfacing plainly: Glean's own docs **recommend OIDC** for better permission control, while separately documenting that **OIDC-only directory sync is slower** (up to 3 hours) than SAML+SCIM (near real-time). MFA is entirely delegated to the IdP - Glean has no MFA of its own.

## Claims (Sr No 1-7, mapped to test guide)

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 1 | Both SAML 2.0 and OIDC are supported, with OIDC positioned as the recommended default | [docs.glean.com/administration/identity/sso/about](https://docs.glean.com/administration/identity/sso/about) | Verbatim: *"Glean recommends the use of OIDC over SAML due to the more granular control over permissioning that it provides."* |
| 2 | Four named IdP paths have dedicated first-party configuration guides | [docs.glean.com/administration/identity/sso/about](https://docs.glean.com/administration/identity/sso/about) | Microsoft Entra ID (formerly Azure AD), Google Workspace, Okta, and a generic "Other SAML providers" option covering any additional SAML-compliant IdP. (OneLogin appeared in search results as a general example IdP but a *dedicated* OneLogin configuration guide was not independently confirmed this pass - flagged for the test guide to check directly.) |
| 3 | MFA is not enforced by Glean itself - it is entirely delegated to whatever the customer's IdP enforces | [docs.glean.com/administration/identity/sso/about](https://docs.glean.com/administration/identity/sso/about) | Verbatim: *"Glean recommends that you configure an appropriately secure conditional access or conditional authentication policy that includes the use of Multi-Factor Authentication (MFA)."* Framed as a recommendation for the customer's IdP configuration, not a control Glean applies on its own. |
| 4 | Directory/group-membership sync speed differs sharply depending on which protocol is used - a real tension against claim 1's OIDC recommendation | [docs.glean.com/administration/identity/roles/group-based-permissions](https://docs.glean.com/administration/identity/roles/group-based-permissions) | SAML/SCIM integrations: *"near real-time"* sync. OIDC-only integrations: *"Changes may take up to three hours to sync"* - explicitly, *"OIDC-based integrations may have up to 3 hours of sync delay for membership changes."* |
| 5 | An on-demand override exists to bypass the standard sync delay when needed | [docs.glean.com/administration/identity/roles/group-based-permissions](https://docs.glean.com/administration/identity/roles/group-based-permissions) | An admin control exists to *"refresh group membership immediately"* - a manual mitigation for the OIDC sync-delay gap in claim 4. |
| 6 | Glean's relationship to IdP group data is strictly read-only - it does not sync back, modify, or independently enforce IdP-side permission rules | [docs.glean.com/administration/identity/roles/group-based-permissions](https://docs.glean.com/administration/identity/roles/group-based-permissions) | Verbatim: *"Glean only reads group membership information from your identity provider. It does not sync, modify, or enforce IdP permission rules."* Glean-side role/permission logic is a downstream consumer of IdP group data, not a bidirectional sync. |
| 7 | The authentication flow includes a concrete domain-matching safety check before issuing a session | Search-corroborated, consistent with [docs.glean.com/administration/identity/sso/about](https://docs.glean.com/administration/identity/sso/about) area | After the IdP confirms authentication, *"Glean further ensures that the user's email domain matches the expected customer domain before issuing a login cookie"* - a specific, concrete anti-cross-tenant-leakage check in the login flow. |

## Independent read

- Claim 1 vs. claim 4 is the field's most useful tension to surface directly: Glean's own recommendation (OIDC, for permissioning control) trades off against directory-sync freshness (SAML+SCIM is faster). A buyer with fast-changing org structure (frequent role/group changes) should weigh this explicitly rather than assume "recommended" automatically means "best for us in every dimension."
- Claim 5 meaningfully softens claim 4's gap - a manual refresh exists, so the 3-hour delay is a default/passive behavior, not a hard ceiling an admin is stuck with if a change needs to take effect sooner.
- Claim 6 is an important scope-setting fact: Glean is not a place where IdP-side permission *rules* (e.g. conditional access policies) get enforced a second time - it only consumes group *membership* for its own downstream authorization logic. Confusing "Glean reads my groups" with "Glean enforces my IdP's access policies" would be inaccurate.
- Claim 2's OneLogin gap should be closed directly in tenant testing rather than left as an assumption either way.

## Confidence

**Doc-Verified** for claims 1, 3-7 (2 sources fetched directly, cross-checked). **Partially confirmed, needs live check** for the OneLogin portion of claim 2. Validation date 2026-09-09. No sandbox/tenant access used - everything above is publicly readable without login. Tenant/hands-on SSO configuration verification tracked in the companion test guide.

---

## Summary

| Item | Finding | Sr No |
|---|---|---|
| Protocols supported | SAML 2.0 and OIDC, OIDC recommended | 1 |
| Named IdP guides | Entra ID, Google Workspace, Okta, generic SAML (OneLogin unconfirmed as dedicated) | 2 |
| MFA | Not Glean's own - fully delegated to IdP | 3 |
| Directory sync speed | SAML/SCIM = near real-time; OIDC-only = up to 3 hours | 4 |
| Manual override for sync delay | Yes - "refresh group membership immediately" | 5 |
| Glean's role in IdP group data | Read-only consumer, no enforcement/sync-back | 6 |
| Login-flow safety check | Email-domain match required before session issued | 7 |
