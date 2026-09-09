# 4.9.4 Infrastructure Requirements - Independent Research Test Guide

**Purpose:** Verification of every claim in the companion research doc [V2/Infrastructure Requirements.md](../../../../Glean/Combined/4.9.4%20Integration%20&%20Technical/V2/Infrastructure%20Requirements.md). The core finding there is that GCP and AWS use genuinely different mechanisms for on-prem connector reachability (VPN tunnel vs. Transit Gateway peering) - easy to conflate if not checked carefully - and that neither cloud's public docs give a complete infrastructure spec sheet. This guide's job is to get the real numbers from whoever manages your organization's cloud/infra relationship with Glean. Written so someone with no prior context on this project can pick it up and run it - **this field is inherently a cloud/infrastructure-team topic** (VPC ranges, Transit Gateways, compute instance types), so most rows here are about getting the right people to confirm the right documents, not something a non-technical tester can click through alone.

**Tenant entry:** Public documentation review, plus direct written questions to whoever manages your organization's cloud infrastructure relationship with Glean (this may be your own cloud/platform team if you're on Customer Hosted, or your Glean account team if you're on standard SaaS)
**Companion research doc:** [V2/Infrastructure Requirements.md](../../../../Glean/Combined/4.9.4%20Integration%20&%20Technical/V2/Infrastructure%20Requirements.md)
**Base field doc (untouched, original):** [../Infrastructure Requirements.md](../../../../Glean/Combined/4.9.4%20Integration%20&%20Technical/Infrastructure%20Requirements.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):**
- Knowing whether your organization is on standard "Glean Hosted" or "Customer Hosted" (GCP or AWS) - check with your account team if unsure.
- If you're on Customer Hosted: access to whoever on your team manages that cloud account (they'll know VPC ranges, Transit Gateway/VPN setup, etc). If that's not you, this entire guide should be handed to them, or you should interview them for the answers.
- If you're on standard SaaS: most of this guide won't apply directly to you - mark those rows `Blocked (standard SaaS, not applicable)` and focus on Sr No 7 (asking your account team what, if anything, they can share).

**Sr No mapping:** Sr No 1-7 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Infrastructure Requirements.md](../../../../Glean/Combined/4.9.4%20Integration%20&%20Technical/V2/Infrastructure%20Requirements.md#claims-sr-no-1-7-mapped-to-test-guide) - same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes on exactly what you found or what answer you got. "Pass" means you personally confirmed it - not that the docs say so.

**Effort column:** each row lists an estimated time to complete plus a difficulty tag - `Easy` (routine document read, quick to judge) or `Hard` (needs a cloud/infra-team member's involvement or a written technical answer) - so you can plan which rows to tackle first.

---

## Section 1 - Confirming the GCP VPN-tunnel requirements, and that they're GCP-specific - Sr No 1-2

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | If your organization is on GCP Customer Hosted and needs to reach on-prem systems, the documented requirements (a `/29` transit CIDR, a PSK, IKEv2) are what you'll actually need to provide | 1. If applicable, open `docs.glean.com/security/networking/admin-vpn-setup` yourself and confirm these exact requirements.<br>2. If your organization has already set this up, ask your infra team to confirm these are the actual parameters they configured. | You confirm the documented requirements match either the published page or your organization's actual real-world setup. | | If not on GCP Customer Hosted with on-prem needs, mark `Blocked (not applicable)` | ~15 min, Easy (doc read) or Hard if confirming against a real setup |
| 2 | This VPN-tunnel mechanism genuinely doesn't apply to AWS deployments - confirm this distinction is real, not just a documentation oversight | 1. Ask your Glean account team or infra contact directly: *"Is the IPsec VPN tunnel mechanism described in your GCP networking docs available for AWS deployments too, or is AWS handled differently?"* | You get a clear confirmation that AWS uses a genuinely different mechanism (not the same VPN tunnel), matching the research finding. | | | ~10 min active + wait for reply, Easy |

## Section 2 - Closing the research gap: confirming the AWS Transit Gateway mechanism directly - Sr No 3

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 3 | AWS uses Transit Gateway peering with a `/26` private range for on-prem connectivity - this specific claim couldn't be confirmed via a direct page load during research and needs verification | 1. Open `docs.glean.com/security/cloud-prem/aws/connecting-to-onprem-datasources` yourself in a browser (the automated research tool couldn't load this page - a real browser may succeed).<br>2. If it loads, confirm or correct the `/26` range and Transit Gateway peering details.<br>3. If your organization actually uses AWS Customer Hosted with on-prem connectivity, ask your infra team to confirm these are the real parameters they set up. | You either confirm the page's content live (upgrading the research's confidence tier), or you get direct confirmation from your infra team of the real mechanism and range size used. | | This is the single most important row in this guide - it closes a real, flagged research gap | ~15 min, Easy (page re-check) + ~10 min active/wait for infra-team reply if applicable |

## Section 3 - Confirming what compute specs actually are disclosed (and aren't) - Sr No 4-5

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 4 | For AWS, only ML/model-workload instance types (SageMaker) are publicly documented - general compute/storage sizing is not | 1. Open the AWS deployment guide yourself and confirm the SageMaker instance-type quotas match research (`ml.g4dn.12xlarge`, `ml.g4dn.xlarge`, `ml.m5.2xlarge`/`ml.m5.4xlarge`).<br>2. Confirm no general-purpose compute/storage sizing is published on the same page. | You confirm both halves: the specific numbers that are published, and the absence of general sizing info. | | | ~15 min, Easy |
| 5 | For GCP, even less compute detail is published - just that a GKE cluster with Workload Identity is used | 1. Open the GCP deployment guide and confirm this matches research.<br>2. If your organization is on GCP Customer Hosted, ask your infra team whether they received machine-type/sizing details directly from Glean's deployment team (since it's not in the public docs). | You confirm the public-doc gap, and - if applicable - find out whether the missing information was provided directly during your organization's actual deployment. | | | ~15 min, Easy (doc read) + optional follow-up with infra team |

## Section 4 - Confirming the security defaults and the permanent region decision - Sr No 6

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 6 | AWS deployments get a dedicated empty account and default EBS encryption, and the chosen region is genuinely permanent - confirm this matters for real deployment planning | 1. If your organization is on AWS Customer Hosted, ask your infra team to confirm Glean's AWS presence lives in a dedicated/empty account (not mixed with other workloads) and that EBS encryption is indeed on by default.<br>2. Separately, confirm whether anyone was told, before the deployment was built, that the region choice would be permanent. | You get confirmation of both security defaults, and specifically find out whether the permanent-region constraint was clearly communicated during your organization's own procurement/setup process - a useful finding regardless of the answer. | | If your organization isn't on AWS Customer Hosted, mark `Blocked (not applicable)` | ~10 min active + wait for reply, Easy |

## Section 5 - Confirming there's no single complete spec sheet, and getting the real answer for your tenant - Sr No 7

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 7 | No single published document gives a complete infrastructure spec sheet - ask Glean directly for whatever your organization's actual deployment needed | 1. Ask your Glean account team, in writing: *"Can you provide a complete infrastructure requirements document for our deployment - compute, storage, network - beyond what's in the public docs?"*<br>2. Record whatever they provide (or confirm they don't have a single consolidated document either). | You get either a real, complete document that closes this field's gap for your organization, or a clear confirmation that no such single document exists even internally - both are useful, concrete findings. | | This is the row most likely to produce genuinely new information for your specific deployment | ~10 min active + wait for reply, Easy |

---

## Result Rollup

Once every row above has a Result filled in, copy the Pass/Fail/Partial/Blocked counts back into the companion research doc [V2/Infrastructure Requirements.md](../../../../Glean/Combined/4.9.4%20Integration%20&%20Technical/V2/Infrastructure%20Requirements.md), and specifically record the outcome of Sr No 3 (closes a flagged gap) and Sr No 7 (whatever your account team actually provides).

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. GCP VPN-tunnel requirements + AWS distinction | 2 | | | | |
| 2. AWS Transit Gateway mechanism (closes research gap) | 1 | | | | |
| 3. Compute-spec disclosure gaps (AWS vs. GCP) | 2 | | | | |
| 4. Security defaults + permanent region decision | 1 | | | | |
| 5. Real, complete infra document for your tenant | 1 | | | | |
