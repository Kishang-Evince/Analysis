# Field 12: Model Versioning Freeze

**Category:** 4.9.3 - AI Architecture & Models  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** All 12 fields drafted (Doc-Verified baseline) · Sandbox metrics Pending for Model Hub inventory, context limits, Protect+ triggers  
**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.  
**Out of scope for this eval:** Salesforce, Slack, Jira, Snowflake/BigQuery, custom fine-tuning, on-prem appliance.  
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [Model Versioning Freeze.md](../../../test/Glean/4.9.3 AI Architecture & Models/Model Versioning Freeze.md)

---

**Field definition:** Option to pin specific API model releases to protect against downstream behavior shifts.  
**Prerequisites / Licensing:** BYOK for closest approximation to pin via deployment name; Universal Key = Glean-managed upgrades.  
**Version freeze rating (Doc-Verified):** **Weak** - no explicit freeze feature; lifecycle actively managed by Glean especially on Universal Key.  
**Confidence Level:** **Doc-Verified**  
**Validation Date:** September 3, 2026  
**Source URLs:** [Model deprecation](https://docs.glean.com/administration/model-deprecation) · [Model exclusion](https://docs.glean.com/administration/model-exclusion) · [LLM key feature availability § upgrades](https://docs.glean.com/administration/llm-key-feature-availability) · [Enterprise Flex pricing](https://docs.glean.com/glean-enterprise-flex-pricing)

### Lifecycle behavior

| Key type | Who controls version | Deprecation notice | Post-deprecation |
|---|---|---|---|
| **Universal Model Key** | Glean auto-upgrades Assistant model | Glean-managed | Seamless for users |
| **Customer Key (BYOK)** | Admin picks deployment | **60-day** + **15-day** email; Admin banner | Assistant **fails** if not migrated |
| **Agents** | Builder per step | Email + Admin banner | **Auto-fallback** to recommended model |

### Mitigations (not true freeze)

- BYOK: pin via Azure OpenAI **deployment name** until provider deprecates.
- Model **exclusion** blocks models org-wide.
- Snapshot enabled Model Hub list as change baseline.

### Engineering observation (Doc-Verified)

- Flex pricing: *"Model tier for each model is subject to change."*
- Example deprecation table includes GPT-4o → GPT-5.1, Claude 3.x → 4.x migrations with dated cutoffs.
- Regulated clients needing frozen model behavior should use **BYOK pinned deployment** + contract notice SLA - not native Glean freeze toggle.

### Verification steps / test case

1. Screenshot current Model Hub enabled models as baseline.
2. If BYOK: record exact deployment ID strings.
3. Check Admin for deprecation banners.
4. Exclude a model - confirm agent fallback model in run.
5. Request written deprecation SLA from Glean if client requires 90-day freeze.

**Risk & Cost Impact:** Risk: Medium (behavior drift on Universal Key) | Cost: Migration testing hours on each deprecation wave
