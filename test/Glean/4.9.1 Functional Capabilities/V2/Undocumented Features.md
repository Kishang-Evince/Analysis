# 4.9.1 Undocumented Features - Deep Dive Admin Test Guide

**Purpose:** Hands-on SDK/API reproduction of the 12-item re-verified list (8 original + 4 new) in the companion research doc [V2/Undocumented Features.md](../../../../Glean/Combined/4.9.1%20Functional%20Capabilities/V2/Undocumented%20Features.md). Every item here is a real capability the vendor never markets - the goal is to actually invoke each one, not just re-read the docs.

**Tenant entry:** `https://app.glean.com` → Admin Console
**Companion research doc:** [V2/Undocumented Features.md](../../../../Glean/Combined/4.9.1%20Functional%20Capabilities/V2/Undocumented%20Features.md)
**Related guide (2 items already tested):** [../Undocumented Features.md](../Undocumented%20Features.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md) · **Sister deep dives:** [../V2/Features Confirmed.md](../V2/Features%20Confirmed.md) · [../V2/Features Not Confirmed.md](../V2/Features%20Not%20Confirmed.md)

**Prerequisites:** Python 3.10+ scratch venv with `pip install glean-api-client`, a Glean-issued API token, and (for #5/#10/#11/#12) Admin/Super Admin console access.

---



## Section 1 - SDK-Level Findings (items #1–#4)


| #   | Finding                                             | Test Step                                                                                                                                                                                                                                                                                                                             | Result | Notes                                                                           |
| --- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------- |
| 1   | `exclude_deprecated_after` / `include_experimental` | In a scratch script: `Glean(api_token=..., server_url=..., exclude_deprecated_after="2026-10-15", include_experimental=True)`. Confirm no error on init. Repeat setting `X_GLEAN_EXCLUDE_DEPRECATED_AFTER` / `X_GLEAN_INCLUDE_EXPERIMENTAL` as env vars instead and confirm same effect (env var should take precedence if both set). |        |                                                                                 |
| 2   | `X-Glean-ActAs` header                              | Using an admin/service token, call `search.query()` with header `X-Glean-ActAs: <user-b-email>` against a document only User B can see; confirm the ACL-scoped result differs from an unscoped admin call. Confirm rate-limit/quota usage attributes to User B, not the service account, via usage dashboard if visible.              |        | Same as the earlier Features Confirmed test guide's #29 - reuse if already done |
| 3   | Typed `GleanDataError`                              | Force a `403` (query a restricted resource) and a `422` (malformed query) in two separate calls; confirm the SDK raises `errors.GleanDataError` specifically for both, distinct from the base `errors.GleanError` used for e.g. a `429`.                                                                                              |        |                                                                                 |
| 4   | `debug_logger` / `GLEAN_DEBUG`                      | Run one call with `Glean(debug_logger=logging.getLogger("glean.api_client"))` after `logging.basicConfig(level=logging.DEBUG)`; confirm full request/response is logged. Repeat via `GLEAN_DEBUG=true` env var with no explicit logger passed; confirm same default behavior.                                                         |        |                                                                                 |


