# Field 8: Infrastructure Requirements

**Category:** 4.9.4 - Integration & Technical  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** All 8 fields drafted (Doc-Verified baseline) · Sandbox metrics Pending for API latency, webhook latency, SSO/SCIM live config  
**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.  
**Out of scope for this eval:** Salesforce, Slack, Jira, custom Indexing SDK production deploy, Customer Hosted bootstrap (unless contracted).  
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [Infrastructure Requirements.md](../../../test/Glean/4.9.4 Integration & Technical/Infrastructure Requirements.md)

---

**Field definition:** Minimum cloud infrastructure, security networks, or local compute required.  
**Prerequisites / Licensing:** Know deployment model (Hosted vs Customer Hosted).  
**Infra requirement (Doc-Verified):** **Glean Hosted = zero customer infra**; **Customer Hosted = full AWS/GCP stack in customer account**.  
**Confidence Level:** **Doc-Verified** · **Pending Sandbox** (network allowlist validation)  
**Validation Date:** September 3, 2026  
**Source URLs:** [About deployment](https://docs.glean.com/get-started/prepare/about-deployment) · [AWS deploy](https://docs.glean.com/get-started/prepare/self-hosted-deployment/aws/deploy-aws) · [GCP deploy](https://docs.glean.com/get-started/prepare/self-hosted-deployment/gcp/deploy-gcp) · [Glean IP ranges](https://docs.glean.com/security/networking/glean-ip-ranges) · [Crawling and learning ML gate](https://docs.glean.com/get-started/review/crawling-and-learning)

### Requirements by deployment

| Requirement | Glean Hosted (`app.glean.com`) | Customer Hosted |
|---|---|---|
| Customer cloud account | No | Yes — dedicated AWS or GCP |
| Core services | Glean-operated | EKS, RDS, S3, ElastiCache, ALB, Lambda, etc. (AWS) or GCP equivalents |
| Networking | Outbound HTTPS to Glean + OAuth IdPs | Allowlist Glean Central IPs + 3 tenant-specific IPs |
| Patching / upgrades | Glean-managed | Glean-managed (customer cannot alter architecture) |
| ML indexing gate | 2–14 days post-connect before full usage | Same |
| Sizing | Auto-scaling | Contact Glean / account team |

### Tenant sandbox (`app.glean.com`) implication

- Stratos eval tenant is likely **Glean Hosted** — no VPC, no EKS, no Customer Hosted bootstrap required for baseline.
- Client enterprises with strict residency may need **Customer Hosted** quote — materially different infra project.

### Verification steps / test case

1. Confirm Hosted vs Customer Hosted from About Glean / contract.
2. If Hosted: verify corporate firewall allows `*.glean.com` + Google/Microsoft OAuth endpoints.
3. If Customer Hosted: run AWS SCP checker script pre-bootstrap.
4. Post-connector connect: confirm ML completion before user rollout (2–14 day window).
5. Request tenant IP allowlist from Support if ingress filtering required.

**Risk & Cost Impact:** Risk: Low (Hosted) / High (Customer Hosted program cost) | Cost: Cloud-Prem significant uplift
