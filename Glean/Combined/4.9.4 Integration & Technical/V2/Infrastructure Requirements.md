**Glean Tier 3 Advanced Evaluation**
**Infrastructure Requirements - Independent Fresh Research (V2)**

*Independent research, sources picked and read fresh this pass, cross-checked 2026-09-09 against `docs.glean.com`. Field definition: "Minimum cloud infrastructure, security networks, or local compute required to run the platform." Base file at [`../Infrastructure Requirements.md`](../Infrastructure%20Requirements.md) left untouched - this is a standalone V2 doc, not an edit of it.*

**Sr No mapping:** rows 1-7 below map 1:1 to the same Sr No in the companion test guide [test/V2/Infrastructure Requirements.md](../../../../test/Glean/4.9.4%20Integration%20&%20Technical/V2/Infrastructure%20Requirements.md) - same number, same claim, doc-sourced here / tenant-tested there.

---

## Headline

Real, specific numbers do exist - a documented `/29` transit CIDR and IPsec VPN spec for GCP on-prem connectivity, and specific AWS SageMaker instance types for model workloads - but they're scattered and incomplete, not one itemized spec sheet. The two clouds also use **different mechanisms** for the same on-prem-reachability need (VPN tunnel on GCP vs. Transit Gateway peering on AWS), which is easy to conflate if not checked carefully.

## Claims (Sr No 1-7, mapped to test guide)

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 1 | For GCP deployments, reaching on-premises/private-network connectors requires a specific, documented IPsec VPN setup with concrete customer-provided parameters | [docs.glean.com/security/networking/admin-vpn-setup](https://docs.glean.com/security/networking/admin-vpn-setup) | Customer must supply: a public IP for their VPN gateway; a reserved **`/29` transit CIDR range** that doesn't overlap their own VPC or Glean's internal ranges; a strong pre-shared key (PSK); IKE version (typically v2); and firewall rules allowing IPsec traffic to the Glean transit range. Uses *"IPsec site-to-site VPN tunnel"* technology, with Glean exposing a peer IP on its transit VPC side. |
| 2 | This specific VPN-tunnel mechanism is explicitly GCP-only - not available for AWS deployments | [docs.glean.com/security/networking/admin-vpn-setup](https://docs.glean.com/security/networking/admin-vpn-setup) | Verbatim: this feature is *"currently available only for GCP deployments."* |
| 3 | AWS achieves the equivalent on-prem-reachability capability through a structurally different mechanism - Transit Gateway (TGW) peering with a dedicated private `/26` range - not the same VPN-tunnel setup as GCP | Search-corroborated - direct fetch of [docs.glean.com/security/cloud-prem/aws/connecting-to-onprem-datasources](https://docs.glean.com/security/cloud-prem/aws/connecting-to-onprem-datasources) failed (empty response) this pass; content below is from search-engine-indexed summary only, not independently re-verified live | *"The Glean AWS project can peer with Transit Gateways (TGWs) in your other AWS accounts, which allows Glean to crawl private services within your network... you must set aside a private `/26` range for this transit VPC."* **Confidence caveat:** should be re-fetched and confirmed live before being cited externally - flagged here as the one item in this field not confirmed against a directly-loaded page. |
| 4 | AWS deployment docs disclose specific compute instance-type quotas for model/ML-related workloads, but no general-purpose compute or storage sizing | [docs.glean.com/get-started/prepare/self-hosted-deployment/aws/deploy-aws](https://docs.glean.com/get-started/prepare/self-hosted-deployment/aws/deploy-aws) | SageMaker quota requirements found: `ml.g4dn.12xlarge` for GPU training (quota 1), `ml.g4dn.xlarge` for standard training (quota 4), `ml.m5.2xlarge` or `ml.m5.4xlarge` for CPU training depending on deployment size (quota 1). No general compute/storage minimums (CPU, memory, disk) were found on this page. |
| 5 | GCP deployment docs disclose even less compute-specific detail than AWS - only that a GKE cluster with Workload Identity is used, with no machine types, storage, or resource minimums published | [docs.glean.com/get-started/prepare/self-hosted-deployment/gcp/deploy-gcp](https://docs.glean.com/get-started/prepare/self-hosted-deployment/gcp/deploy-gcp) | Confirmed: *"Glean's Google Kubernetes Engine cluster requires Workload Identity"*; deployment *"creates a deployment VPC and peers it with the default VPC using a VPN tunnel."* Checked directly and confirmed absent: *"machine type specifications... GPU or TPU requirements... storage size requirements... CPU/memory minimums... network bandwidth specifications... GKE node pool configurations."* |
| 6 | AWS deployment includes real, checkable isolation and security defaults, plus one permanent, irreversible decision point (region) | [docs.glean.com/get-started/prepare/self-hosted-deployment/aws/deploy-aws](https://docs.glean.com/get-started/prepare/self-hosted-deployment/aws/deploy-aws) | *"Glean deploys to an empty AWS instance to provide layer of isolation from any other services you have running in AWS."* *"Glean enables EBS encryption by default for all volumes during the initial AWS account setup."* Critically: the selected region *"cannot be changed once your tenant has been built"* - a real, permanent operational constraint worth flagging to any buyer during initial region selection. |
| 7 | No single published document gives a complete, itemized minimum-hardware/software spec sheet comparable to a typical on-prem software requirements list - Glean's own AWS doc effectively confirms this by pointing elsewhere for anything not covered | Absence checked across claims 1-6, consistent with the AWS deployment page's own framing | The AWS page explicitly frames itself as covering *"prerequisites and setup procedures rather than detailed infrastructure specifications"* - for anything beyond what's published, the implied path is direct contact with Glean's deployment engineers, not a public spec document. |

## Independent read

- Claims 1-2 vs. claim 3 is the field's most important precision point: "does Glean support connecting to my on-prem systems" has a yes answer for both clouds, but *how* differs materially (VPN tunnel with a `/29` range on GCP; Transit Gateway peering with a `/26` range on AWS) - quoting one cloud's mechanism as if it applied to the other would be a real sourcing error.
- Claim 6's permanent-region constraint is a genuinely actionable finding for procurement/deployment planning - it should be flagged explicitly during initial setup discussions, not discovered after the fact.
- Claim 7 sets honest expectations: this field cannot be fully answered from public documentation alone for either cloud - the companion test guide is built around getting the missing numbers directly from Glean's deployment team, which is the documented path Glean itself points to.

## Confidence

**Doc-Verified** for claims 1, 2, 4, 5, 6, 7 (all fetched directly). **Search-synthesized, needs live re-verification** for claim 3 (direct fetch failed twice this pass - content sourced from search-engine index only). Validation date 2026-09-09. No sandbox/tenant access used - everything above is publicly readable without login. Tenant/deployment-team verification tracked in the companion test guide.

---

## Summary

| Item | Finding | Sr No |
|---|---|---|
| GCP on-prem connectivity mechanism | IPsec VPN tunnel, `/29` transit CIDR, PSK, IKEv2 | 1 |
| GCP-only limitation | Explicitly stated - VPN tunnel feature not on AWS | 2 |
| AWS on-prem connectivity mechanism | Transit Gateway peering, `/26` range (needs live re-verification) | 3 |
| AWS compute specs disclosed | SageMaker instance types/quotas for ML workloads only | 4 |
| GCP compute specs disclosed | GKE + Workload Identity only - no sizing published | 5 |
| AWS isolation/security defaults | Dedicated empty AWS account, EBS encryption by default | 6 |
| AWS region permanence | Cannot be changed once tenant is built | 6 |
| Complete public spec sheet exists? | No - direct deployment-team contact is the real path | 7 |
