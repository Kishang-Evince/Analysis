# Field 4: Model Agnosticism

**Category:** 4.9.3 - AI Architecture & Models  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** All 12 fields drafted (Doc-Verified baseline) · Sandbox metrics Pending for Model Hub inventory, context limits, Protect+ triggers  
**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.  
**Out of scope for this eval:** Salesforce, Slack, Jira, Snowflake/BigQuery, custom fine-tuning, on-prem appliance.  
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [Model Agnosticism.md](../../../test/Glean/4.9.3 AI Architecture & Models/Model Agnosticism.md)

---

**Field definition:** Ability to swap underlying LLM providers or models without breaking workflows.  
**Prerequisites / Licensing:** Multiple models enabled in Model Hub; Agent Builder access.  
**Agnosticism rating (Doc-Verified):** **High** - 40+ models; per-session, per-agent, per-step selection; model exclusion policies.  
**Confidence Level:** **Doc-Verified** · **Pending Sandbox** (agent breakage on swap)  
**Validation Date:** September 3, 2026  
**Source URLs:** [Configure LLMs](https://docs.glean.com/administration/configure-llms) · [Model exclusion](https://docs.glean.com/administration/model-exclusion) · [Model choice go-live](https://docs.glean.com/get-started/golive/model-choice) · [Model Hub marketing](https://www.glean.com/platform/model-hub)

### Swap surfaces

| Surface | Swap mechanism | Blast radius |
|---|---|---|
| Assistant chat | User model picker or **Auto** (Universal Key) | Single session |
| Agent Builder | Per-agent default model | One agent |
| Workflow steps | Per-step model override | One step |
| Admin policy | Model exclusion / department restrictions | Org-wide |
| Deprecation | Auto-fallback (agents) or admin migration (Assistant BYOK) | See Field 12 |

### Engineering observation (Doc-Verified)

- Marketing: access models **without lock-in**; auto-routing by task (Beta - verify badge).
- Swapping model on published agent may change answer quality/citation style - functional breakage rare; quality regression likely.
- **Auto** mode on Universal Key delegates selection to Glean - reduces user lock-in to one vendor, increases Glean routing dependency.

### Verification steps / test case

1. Same prompt to GPT-5.1 vs Claude Sonnet vs Gemini - compare citation format and tone.
2. Agent with per-step models (Haiku retrieve, Sonnet synthesize) - confirm step-level picker.
3. Exclude one model in Admin - confirm removal from user picker.
4. Change agent default model post-publish - re-run golden prompt set.

**Risk & Cost Impact:** Risk: Low | Cost: Tier/credit shifts on model change

---
