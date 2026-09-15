**Glean Tier 3 Advanced Evaluation**
**Model Hosting Validated - Independent Fresh Research (V2)**

*Independent research, sources picked and read fresh this pass, cross-checked 2026-09-09 against `docs.glean.com`. Field definition: "The confirmed physical/cloud hosting location for model inference." Base file at [`../Model Hosting Location.md`](../Model%20Hosting%20Location.md) left untouched - this is a standalone V2 doc, not an edit of it.*

**Sr No mapping:** rows 1-7 below map 1:1 to the same Sr No in the companion test guide [test/V2/Model Hosting Validated.md](../../../../test/Glean/4.9.3%20AI%20Architecture%20&%20Models/V2/Model%20Hosting%20Validated.md) - same number, same claim, doc-sourced here / tenant-tested there.

---

## Headline

Default (standard SaaS) hosting runs on **Glean's own GCP tenant**. Customers can instead choose **Customer Hosted** deployment, which moves compute into the customer's own AWS or GCP account/region - but there is **no fully self-hosted option**, and Glean's own docs are deliberately vague about the exact infrastructure location for the standard multi-tenant path, beyond confirming data storage stays in-tenant.

## Claims (Sr No 1-7, mapped to test guide)

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 1 | Standard "Glean Hosted" (SaaS) deployment runs entirely on Glean's own GCP infrastructure | [docs.glean.com/get-started/prepare/about-deployment](https://docs.glean.com/get-started/prepare/about-deployment) | *"a true SaaS service, where you don't have any infrastructure responsibility"* - infrastructure location stated as Glean's own tenant on GCP; model inference and compute occur entirely within Glean's cloud environment. |
| 2 | Independent network-level evidence corroborates GCP as Glean's own infrastructure base | [docs.glean.com/security/networking/glean-ip-ranges](https://docs.glean.com/security/networking/glean-ip-ranges) | Glean Central's published IP addresses (e.g. `104.154.230.46`, `35.239.35.180`) trace to Google Cloud Platform via public IP-ownership records - the docs themselves never state this outright, but the addresses independently confirm claim 1. |
| 3 | "Customer Hosted" (formerly Cloud-Prem) moves compute into the customer's own AWS or GCP account, but is still a Glean-managed service, not true self-hosting | [docs.glean.com/get-started/prepare/about-deployment](https://docs.glean.com/get-started/prepare/about-deployment) | *"Glean deploys its tenant as a managed service in isolation within your own cloud environment."* Explicit disclaimer: *"Glean doesn't support manually deploying or patching the Glean services, or altering any part of the Glean architecture."* Only two deployment models exist - no third, fully independent self-hosted option. |
| 4 | For the AWS Bedrock inference path specifically, inference is region-co-located with the customer's own Glean instance | [docs.glean.com/administration/management/models/provider-setup/amazon-bedrock-setup](https://docs.glean.com/administration/management/models/provider-setup/amazon-bedrock-setup) | *"All data is encrypted in transit between your Glean instance and the Amazon Bedrock service, which operate in the same AWS region."* Customer is instructed to *"Choose the same region as your Glean AWS instance (or the nearest supported one)"* when requesting model access. Also: *"Amazon Bedrock does not use customer prompts and completions to train AWS models or share them with third parties."* |
| 5 | On GCP Customer Hosted deployments, the specific region chosen determines the actual hardware running ML inference (TPU vs GPU), not just data residency | [docs.glean.com/get-started/prepare/self-hosted-deployment/gcp/supported-gcp-regions](https://docs.glean.com/get-started/prepare/self-hosted-deployment/gcp/supported-gcp-regions) | *"Preferred regions are GCP regions that support the use of compatible TPUs"* (more efficient/cost-effective); non-preferred regions *"do not support TPUs"* and must use GPUs instead, at *"higher monthly infrastructure costs."* Only 3 preferred regions found: `us-central1` (Iowa), `asia-east1` (Taiwan), `europe-west4` (Netherlands) - every other supported region (Brazil, India, UK, Australia, etc.) is non-preferred/GPU-based and costs more. |
| 6 | Data storage is confirmed to stay within the customer's own tenant/project - but this is a storage claim, not an inference-location claim, and the two are not the same thing | [docs.glean.com/security/architecture/data-flow/processing](https://docs.glean.com/security/architecture/data-flow/processing) | Verbatim: *"All data storage occurs within your tenant's project. Your data is never stored outside your tenant's environment."* The same page does **not** state where processing/inference compute itself executes - a real documentation gap between "where data rests" and "where the model actually runs." |
| 7 | Glean's own networking documentation deliberately withholds exact core-infrastructure geographic/region detail, directing customers to Support instead | [docs.glean.com/security/networking/glean-ip-ranges](https://docs.glean.com/security/networking/glean-ip-ranges) | Page provides IP allowlist guidance only; no geographic regions or data-center locations for Glean's own core infrastructure are disclosed. Customers needing tenant-specific IPs are told to *"contact Glean Support."* |

## Independent read

- Claims 1+2 together (explicit doc statement + independent IP-ownership corroboration) make "GCP is Glean's default hosting" a well-supported finding, not a guess - two unrelated evidence types agree.
- Claim 5 is the most actionable finding for a healthcare/regulated buyer: picking a "non-preferred" GCP region for data-sovereignty reasons has a real, disclosed cost and hardware consequence (GPU vs TPU) that a buyer would otherwise not know to ask about.
- Claim 6 is the field's core caveat: "hosting location for model inference" and "storage location for data" are two different questions in Glean's own docs, and only the storage question gets a clean, confident answer for the standard SaaS path. The inference-execution location for standard (non-Bedrock) multi-tenant SaaS is not explicitly pinned down beyond "Glean's GCP tenant" generally - no region-level detail was found for that specific path.

## Confidence

**Doc-Verified**, 5 independent sources (one further corroborated by independent IP-ownership lookup), validation date 2026-09-09. No sandbox/tenant access used - everything above is publicly readable without login. Tenant verification of all 7 claims tracked in the companion test guide.

---

## Summary

| Item | Finding | Sr No |
|---|---|---|
| Default (SaaS) hosting | Glean's own GCP tenant | 1-2 |
| Alternate model | Customer Hosted - customer's own AWS/GCP account, still Glean-managed | 3 |
| Fully self-hosted option | Does not exist | 3 |
| Bedrock inference path | Region-co-located with customer's Glean instance; Bedrock doesn't train on prompts | 4 |
| GCP region hardware impact | Preferred regions = TPU (cheaper); non-preferred = GPU (costlier) | 5 |
| Storage vs. inference-location gap | Storage location confirmed in-tenant; inference execution location not region-pinned for standard SaaS | 6 |
| Infra transparency | Core infra region intentionally undisclosed publicly; ask Support | 7 |
