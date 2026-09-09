**Glean Tier 3 Advanced Evaluation**
**Data Residency Validation - Independent Fresh Research (V2)**

*Independent research, sources picked and read fresh this pass, cross-checked 2026-09-09 against `docs.glean.com` and `www.glean.com`. Field definition: "Physical region where data-at-rest and processing servers are located." Base file at [`../Data Residency Validation.md`](../Data%20Residency%20Validation.md) left untouched - this is a standalone V2 doc, not an edit of it.*

**Sr No mapping:** rows 1-7 below map 1:1 to the same Sr No in the companion test guide [test/V2/Data Residency Validation.md](../../../../test/Glean/4.9.4%20Integration%20&%20Technical/V2/Data%20Residency%20Validation.md) - same number, same claim, doc-sourced here / tenant-tested there.

---

## Headline

The most important finding here is precise and checkable: for the standard "Glean Hosted" SaaS deployment, the **default region is North America (`us-central1`)** - not customer-selectable at sign-up by default, and EU (or other) residency is available only if the customer **proactively requests it**. A customer relying on the GDPR/HIPAA badges on Glean's marketing page alone would not learn this - those badges are compliance certifications, not a regional-residency guarantee.

## Claims (Sr No 1-7, mapped to test guide)

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 1 | The default region for standard Glean-hosted tenants is explicitly North America (`us-central1`) | [docs.glean.com/get-started/prepare/self-hosted-deployment/gcp/supported-gcp-regions](https://docs.glean.com/get-started/prepare/self-hosted-deployment/gcp/supported-gcp-regions) | Verbatim: *"The default region for tenants hosted by Glean is `us-central1`, which is located in North America."* |
| 2 | A different region (e.g. EU) is available, but only if the customer proactively asks - it is opt-in, not offered as a choice during standard signup | [docs.glean.com/get-started/prepare/self-hosted-deployment/gcp/supported-gcp-regions](https://docs.glean.com/get-started/prepare/self-hosted-deployment/gcp/supported-gcp-regions) | Verbatim: *"Please advise Glean if you would like your tenant deployed in a different region."* No indication this is presented as a standard signup-flow choice - the wording implies a request/advisory process. |
| 3 | Standard "Glean Hosted" tenants appear to be GCP-only by default - AWS is only available through the separate "Customer Hosted" deployment model | Search-corroborated across [docs.glean.com/get-started/prepare/about-deployment](https://docs.glean.com/get-started/prepare/about-deployment) and the GCP/AWS region docs already fetched in the Model Hosting Location field's research | Glean Hosted documentation consistently discusses GCP regions only; AWS region support (*"Glean now supports any region that offers all of our required services"*) is documented specifically under the Customer Hosted / self-hosted-deployment doc tree, a materially different deployment model requiring the customer's own cloud account. |
| 4 | Glean's public marketing security page displays GDPR and HIPAA compliance badges but does not elaborate on data residency specifics or promise regional choice | [www.glean.com/platform/security](https://www.glean.com/platform/security) | Checked directly: GDPR and HIPAA appear *"as compliance badges without elaboration."* No explicit statement on this page that customers can choose their data region, and no mention of the US-default-unless-requested behavior confirmed in claims 1-2. |
| 5 | This creates a real, checkable gap for a GDPR-sensitive buyer: seeing the GDPR badge does not by itself mean EU data stays in the EU by default | Synthesis of claims 1, 2, and 4 - not a single quoted source, but a direct logical connection between three independently-confirmed facts | A customer who assumes "GDPR-compliant = my EU data stays in the EU automatically" based on the marketing badge alone would be wrong under the *default* configuration - EU residency requires the customer to actively request `europe-west4` (or another non-default region) rather than it being automatic. |
| 6 | Customer Hosted AWS deployments have broader, more flexible region support than the Glean-Hosted default | [docs.glean.com/security/cloud-prem/aws/faq](https://docs.glean.com/security/cloud-prem/aws/faq) | Verbatim: *"Generally yes. We now support any region that offers all of our required services."* This flexibility is specific to the Customer Hosted path (data/compute inside the customer's own AWS account), not the standard SaaS default. |
| 7 | This finding adds a specific, actionable layer to the Tenancy Model field's "single-tenant, dedicated instance" finding - dedicated per customer, but defaulting to one specific region unless the customer intervenes | Cross-referenced from this project's own Tenancy Model V2 research, not re-derived fresh this pass | That field established each customer gets a dedicated, isolated instance. This field adds: that dedicated instance defaults to a specific geographic region (US) regardless of the customer's own location or regulatory needs, unless proactively changed. |

## Independent read

- Claims 1-2 are the field's most valuable, precise finding - a specific region name, a specific default, and a specific mechanism (ask Glean) for changing it. This is exactly the kind of concrete, checkable answer the evaluation methodology asks for.
- Claim 5 is a genuine buyer-protection insight: certification badges (GDPR, HIPAA, SOC 2, etc.) answer "does Glean have the right controls in place," not "where is my specific data physically located by default." These are different questions, and conflating them is a common but consequential mistake in vendor evaluation - this field exists specifically to catch that gap.
- Claim 3 matters for any AWS-preferring organization: getting AWS-hosted Glean at all requires stepping into the Customer Hosted deployment model (with its own operational tradeoffs, already documented in the Tenancy Model and Model Hosting Location fields), not just picking AWS as a region option within standard SaaS.

## Confidence

**Doc-Verified**, 3 independent first-party sources (2 fetched directly, one search-corroborated with strong consistency across multiple pages), validation date 2026-09-09. No sandbox/tenant access used - everything above is publicly readable without login. Tenant-specific confirmation tracked in the companion test guide.

---

## Summary

| Item | Finding | Sr No |
|---|---|---|
| Default region, standard Glean Hosted | `us-central1` (North America), explicit | 1 |
| Changing the default | Possible, but opt-in - customer must proactively ask | 2 |
| AWS availability for standard SaaS | Not available - AWS requires Customer Hosted deployment | 3 |
| Marketing page residency detail | GDPR/HIPAA badges shown, no residency-specific elaboration | 4 |
| Buyer risk | Badge ≠ automatic regional guarantee - must confirm default vs. requested region | 5 |
| Customer Hosted AWS region flexibility | Broader - "any region that offers all required services" | 6 |
| Relationship to Tenancy Model finding | Adds region-default detail to the dedicated-instance finding | 7 |
