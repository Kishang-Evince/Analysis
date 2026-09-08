# Field 6: Identity & SSO Integrations

**Category:** 4.9.4 - Integration & Technical  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** All 8 fields drafted (Doc-Verified baseline) · Sandbox metrics Pending for API latency, webhook latency, SSO/SCIM live config  
**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.  
**Out of scope for this eval:** Salesforce, Slack, Jira, custom Indexing SDK production deploy, Customer Hosted bootstrap (unless contracted).  
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [Identity & SSO Integrations.md](../../../test/Glean/4.9.4 Integration & Technical/Identity & SSO Integrations.md)

---

**Field definition:** Support for SAML, OIDC, SCIM directory syncs, and MFA.  
**Prerequisites / Licensing:** IdP admin access; SSO configured (assumed for tenant).  
**SSO coverage (Doc-Verified):** **OIDC (preferred) + SAML 2.0 mandatory**; SCIM documented for Okta deprovisioning.  
**Confidence Level:** **Doc-Verified** (SSO) · **Pending Sandbox** (SCIM provider in use)  
**Validation Date:** September 3, 2026  
**Source URLs:** [SSO about](https://docs.glean.com/administration/identity/sso/about) · [OIDC/SAML](https://docs.glean.com/administration/identity/sso/oidc-saml) · [Entra ID OIDC](https://docs.glean.com/administration/identity/sso/configuration/entra-id-oidc) · [Google OIDC](https://docs.glean.com/administration/identity/sso/configuration/google-oidc) · [Okta SAML + SCIM](https://docs.glean.com/administration/identity/sso/configuration/okta-saml) · [Deployment best practices](https://docs.glean.com/security/deployment-best-practices)

### Identity integration matrix

| Protocol | Supported | Documented IdP guides | Notes |
|---|---|---|---|
| **OIDC** | Yes (preferred) | Entra ID, Google Workspace, Okta | First config step per docs |
| **SAML 2.0** | Yes | Okta, Generic SAML | |
| **SCIM 2.0** | Yes | **Okta** (deprovisioning) | Base URL: `https://<tenant>-be.glean.com/instance/api/scim/v2` |
| **MFA** | Via IdP | — | Recommended in deployment best practices |
| **Group sync** | SAML/SCIM near real-time; OIDC groups up to ~3h delay | [Group-based permissions](https://docs.glean.com/administration/identity/roles/group-based-permissions) | |

### Admin paths (tenant UI)

- SSO: `https://app.glean.com/admin/setup/auth` (**Users & permissions → SSO**)
- User roles: `/admin/teammates`
- Third-party OAuth (tools/MCP): **Users & permissions → Third-party access**

### Engineering observation (Doc-Verified)

- Glean does **not** invent local users — identities from IdP/SSO/invites (consistent with 4.9.1 Admin Test Guide).
- **SCIM breadth gap:** Entra ID SCIM guide not found in scrap — Okta SCIM is primary documented path; verify with Glean if Entra SCIM supported via generic SCIM.
- Per-user OAuth for Google/Microsoft/Notion tools is **separate** from SSO — common sandbox friction.

### Verification steps / test case

1. SSO login flow — confirm domain restriction + MFA via IdP.
2. Deactivate User B in IdP — confirm Glean access blocked within documented sync window.
3. If Okta: SCIM deactivate — verify `scim/v2` events.
4. Map group → Glean role — test permission inheritance timing.

**Risk & Cost Impact:** Risk: Low (SSO) / Medium (SCIM gap on non-Okta IdP) | Cost: Native

---
