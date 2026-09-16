**Glean Tier 3 Advanced Evaluation**
**Dependencies & Prerequisites - Independent Fresh Research (V2)**

*Independent research, checked 2026-09-09 against fresh search results on Glean's SSO/people-data/SCIM documentation, cross-referenced against this project's own 4.9.4 Identity & SSO Integrations V2 finding. Field definition: "Required software licenses, external APIs, or security networks prior to activation." Base file at [`../Dependencies & Prerequisites.md`](../Dependencies%20&%20Prerequisites.md) left untouched - this is a standalone V2 doc, not an edit of it.*

**Sr No mapping:** rows 1-4 below map 1:1 to the same Sr No in the companion test guide [test/V2/Dependencies & Prerequisites.md](../../../../test/Glean/4.9.10%20Use%20Case%20Library/V2/Dependencies%20&%20Prerequisites.md) - same number, same claim, doc-sourced here / tenant-tested there.

---

## Headline

Most of this field's substantive content is already deeply established through this project's own prior V2 research and is reconfirmed here by cross-reference. This pass surfaces one real, worth-flagging discrepancy: a third-party site claims *"Glean does not currently offer SCIM-based user provisioning"* - but this directly conflicts with this project's own already-confirmed 4.9.4 finding that SAML+SCIM sync is real and offers near-real-time directory updates (versus OIDC-only's up-to-3-hour lag). Notably, the third-party source making the "no SCIM" claim is itself a provisioning-automation vendor with a commercial interest in positioning Glean as lacking native SCIM support - this should be resolved directly with Glean rather than assumed either way.

## Claims (Sr No 1-4, mapped to test guide)

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 1 | People data is confirmed as a genuinely separate data flow from SSO, requiring its own sync source even when using the same identity provider for both | Search-corroborated - Glean SSO/people-data documentation | Confirmed: *"People data powers user profiles, org chart, users, ranking signals, and personalization in Glean, and it is a separate data flow from SSO that must be synced from a directory source"* - though *"if you configured SSO using OIDC and your directory is the same as your SSO platform... you only need to enable it as a people connector,"* simplifying the dual-setup in the common case. |
| 2 | **Discrepancy worth flagging, not silently resolving**: a third-party source claims Glean does not offer SCIM-based provisioning at all, directly conflicting with this project's own already-confirmed 4.9.4 finding that SAML+SCIM sync is real and provides near-real-time updates | Search-corroborated, conflicting sources - a third-party provisioning-automation vendor's own marketing content, versus this project's 4.9.4 Identity & SSO Integrations V2 field | The third-party claim (*"Glean does not currently offer SCIM-based user provisioning"*) comes from a site whose own business is selling non-SCIM provisioning automation *for* Glean - a real commercial incentive to characterize Glean as lacking native SCIM. This project's own earlier, more directly-sourced research found real SAML+SCIM sync behavior with specific timing characteristics. This contradiction should be resolved with a direct question to Glean rather than assumed in either direction - worth flagging explicitly rather than silently picking the more convenient (or more recently found) claim. |
| 3 | SSO is confirmed mandatory for all Glean deployments, with OIDC as the primary recommended mechanism and SAML available as a fallback where OIDC isn't supported by the customer's IdP or internal SOPs | Search-corroborated - Glean SSO documentation | Confirmed: *"SSO is mandatory for all Glean deployments"* using *"OpenID Connect (OIDC)... widely supported by leading Identity Providers"* with SAML as an alternative *"in cases where your SSO provider or company's Standard Operating Procedure does not support using OIDC."* This is consistent with, not a change to, prior research. |
| 4 | The remaining cross-cutting dependencies (browser extension MDM, M365/Google Workspace admin consent, Notion workspace-admin share model, Protect+ recommendations, FlexCredit needs for agent-heavy use cases) remain accurate on cross-reference to this project's own extensive prior V2 research | Cross-referenced across this project's 4.9.4, 4.9.5, 4.9.6, 4.9.7 V2 fields | Each dependency traces to a specific, already-confirmed finding elsewhere in this project. No changes needed to these attributions. |

## Independent read

- Claim 2 is worth taking seriously specifically because of who is making it: a vendor selling a competing provisioning solution has a direct incentive to claim Glean lacks a capability that would make their own product less necessary. This doesn't mean the claim is false, but it means it shouldn't be accepted uncritically over this project's own more directly-sourced documentation research - a direct question to Glean is the right way to resolve this before it affects any SSO/provisioning planning for Perimeter Healthcare's actual deployment.
- Claim 1's people-data/SSO separation is a small but practically important planning detail - even organizations using a single IdP (e.g., Entra ID) for both authentication and directory sync need to explicitly enable the people connector, it doesn't happen automatically just because SSO is configured.

## Confidence

**Search-corroborated** for claims 1, 3. **Search-corroborated, explicit unresolved discrepancy** for claim 2. **Cross-referenced** for claim 4. Validation date 2026-09-09. Tenant/hands-on verification (an actual SCIM configuration attempt, an actual people-connector setup check) tracked in the companion test guide.

---

## Summary

| Item | Finding | Sr No |
|---|---|---|
| People data vs. SSO separation | Confirmed: separate flow, simplified when IdP matches directory | 1 |
| SCIM support | **Unresolved discrepancy** - conflicts with 4.9.4's own finding; ask Glean directly | 2 |
| SSO mandatory, OIDC primary/SAML fallback | Reconfirmed | 3 |
| Remaining cross-cutting dependencies | Reconfirmed via cross-reference | 4 |
