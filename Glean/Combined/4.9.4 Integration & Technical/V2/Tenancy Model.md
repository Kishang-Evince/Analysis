**Glean Tier 3 Advanced Evaluation**
**Tenancy Model - Independent Fresh Research (V2)**

*Independent research, sources picked and read fresh this pass, cross-checked 2026-09-09 against `docs.glean.com`. Field definition: "Database tenant architecture (e.g., Shared SaaS multi-tenant vs isolated single-tenant)." Base file at [`../Tenancy Model.md`](../Tenancy%20Model.md) left untouched - this is a standalone V2 doc, not an edit of it.*

**Sr No mapping:** rows 1-6 below map 1:1 to the same Sr No in the companion test guide [test/V2/Tenancy Model.md](../../../../test/Glean/4.9.4%20Integration%20&%20Technical/V2/Tenancy%20Model.md) - same number, same claim, doc-sourced here / tenant-tested there.

---

## Headline

Glean's own documentation makes a direct, explicit claim that departs from the field's own framing: it is **single-tenant, not shared multi-tenant, even for the standard "Glean Hosted" SaaS product** - every customer gets a dedicated instance, not a shared database with logical/row-level separation. A small, clearly-scoped shared control-plane layer ("Glean Central") does exist across all tenants, but customer document content and search query content are confirmed to never pass through or be stored there.

## Claims (Sr No 1-6, mapped to test guide)

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 1 | Glean explicitly states its infrastructure is single-tenant, for both deployment models - including the default SaaS ("Glean Hosted") product, not just Customer Hosted | [docs.glean.com/get-started/prepare/about-deployment](https://docs.glean.com/get-started/prepare/about-deployment) | Verbatim: *"Glean uses a single-tenant infrastructure, meaning that the infrastructure isolates your data from other customers' data."* This directly departs from the common assumption that a standard SaaS offering implies shared multi-tenant infrastructure with logical separation - Glean's own claim is dedicated-instance-per-customer, even in its default hosted mode. |
| 2 | A shared, centralized component ("Glean Central") does exist across all tenants - but its documented scope is limited to routing/discovery and web-app delivery, not customer data | [docs.glean.com/security/architecture/shared-centralized-services](https://docs.glean.com/security/architecture/shared-centralized-services) | Confirmed centralized functions: (a) serving the static web app (`app.glean.com` JS/CSS assets); (b) tenant discovery - resolving a login email domain to the customer's own Query Endpoint (QE) URL; (c) anonymized analytics. |
| 3 | Customer document content and actual search-query content are confirmed to never transit or reside in the shared central infrastructure | [docs.glean.com/security/architecture/shared-centralized-services](https://docs.glean.com/security/architecture/shared-centralized-services) | Verbatim: after initial login/tenant-discovery, *"all future communication is directed to your company's Glean GCP instance."* Central on-call/debug access is limited to *"control-plane tasks"* that *"do not expose customer document content."* |
| 4 | Even the analytics data that does leave the dedicated tenant is anonymized and hashed, not raw - but it is non-zero data egress, worth being precise about | [docs.glean.com/security/architecture/shared-centralized-services](https://docs.glean.com/security/architecture/shared-centralized-services) | *"Anonymized, non-PII logs"* are exported via GCP Log Sink to the central server for aggregate analytics; *"personally identifiable information (PII), such as user IDs, document URLs, and query terms, [is] sanitized through a hashing process at the time of log creation."* A customer requiring literally zero egress of any kind (even hashed) should know this pipeline exists. |
| 5 | The exact technical isolation mechanism at the database/storage-engine level is not specified - the documented claim is architectural (dedicated instance), not implementation-level (e.g. separate physical database vs. separate schema within a shared engine) | [docs.glean.com/get-started/prepare/about-deployment](https://docs.glean.com/get-started/prepare/about-deployment) | Checked directly: the page confirms single-tenant *infrastructure* but *"does not specify which layer (database, storage, compute, index) this isolation operates at,"* and provides *"no details about storage-level or database-level separation"* - whether via physically separate databases, schema isolation, or another mechanism is not stated. A genuine, checkable documentation gap beneath the architectural-level claim. |
| 6 | This finding refines (not contradicts) earlier research on hosting location - "Glean Hosted" runs on Glean's own GCP estate, but as a collection of per-customer dedicated instances, not one shared multi-tenant deployment within that estate | Cross-referenced from this project's own Model Hosting Location V2 research, not re-derived fresh this pass | That field established *"Glean Hosted"* = Glean's own GCP tenant as the infrastructure owner; this field adds the more precise layer - within Glean's GCP estate, each customer still gets a dedicated, isolated instance rather than sharing one database/index with other customers. |

## Independent read

- Claim 1 is the field's central, most citable finding - it's a direct quote that answers the field's own either/or framing cleanly: **single-tenant**, explicitly, for both deployment models.
- Claims 2-3 matter for precision: "single-tenant" doesn't mean *zero* shared infrastructure anywhere - a thin, well-scoped control-plane layer is shared, and the documentation is specific and credible about exactly what that layer does and does not touch (routing/analytics only, never document content).
- Claim 5 is the honest limit of what public documentation can answer - "single-tenant" is an architectural promise, not a storage-engine implementation spec. A buyer needing to satisfy a specific compliance framework's database-isolation requirements (e.g. a specific certification's definition of "isolated") should get the exact mechanism confirmed directly, not inferred from this phrase alone.

## Confidence

**Doc-Verified**, 2 independent first-party sources (both fetched directly and cross-checked against each other), validation date 2026-09-09. No sandbox/tenant access used - everything above is publicly readable without login. Tenant-specific confirmation of the exact isolation mechanism tracked in the companion test guide.

---

## Summary

| Item | Finding | Sr No |
|---|---|---|
| Tenancy model, both deployment types | Single-tenant, explicitly stated | 1 |
| Shared component | "Glean Central" - routing/discovery, web-app delivery, analytics only | 2 |
| Customer document/query content in shared infra? | No - confirmed never transits central infrastructure | 3 |
| Any data leaves the tenant at all? | Yes - anonymized/hashed analytics logs only | 4 |
| Exact DB/storage-engine isolation mechanism | Not specified - architectural claim only | 5 |
| Consistency with Model Hosting Location field | Refines it - dedicated instance within Glean's own GCP estate | 6 |
