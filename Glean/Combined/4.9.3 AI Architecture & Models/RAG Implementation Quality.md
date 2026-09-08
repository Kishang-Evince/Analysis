# Field 6: RAG Implementation Quality

**Category:** 4.9.3 - AI Architecture & Models  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** All 12 fields drafted (Doc-Verified baseline) · Sandbox metrics Pending for Model Hub inventory, context limits, Protect+ triggers  
**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.  
**Out of scope for this eval:** Salesforce, Slack, Jira, Snowflake/BigQuery, custom fine-tuning, on-prem appliance.  
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [RAG Implementation Quality.md](../../../test/Glean/4.9.3 AI Architecture & Models/RAG Implementation Quality.md)

---

**Field definition:** Retrieval architecture, vector chunking strategies, and precise citation engines.  
**Prerequisites / Licensing:** Healthy connectors for Drive/OneDrive/Gmail/Outlook/Teams/Notion; Glean Assistant enabled.  
**RAG quality rating (Doc-Verified):** **Strong** — hybrid indexed + live + federated; Knowledge Graph; permission-aware citations.  
**Confidence Level:** **Doc-Verified** · **Pending Sandbox** (tenant citation precision scores)  
**Validation Date:** September 3, 2026  
**Source URLs:** [How connectors power Glean](https://docs.glean.com/connectors/connectors-power-glean) · [Crawling and learning](https://docs.glean.com/get-started/review/crawling-and-learning) · [Glean citations user guide](https://docs.glean.com/user-guide/assistant/glean-chat/glean-chat-citations/glean-citations) · [Adaptive reasoning](https://docs.glean.com/administration/assistant/features/adaptive-reasoning)

### RAG architecture (tenant-relevant)

| Stage | Mechanism | Tenant stack behavior |
|---|---|---|
| Index | Connector crawl + parse + embed | Drive/Docs/Sheets, Gmail, Outlook, OneDrive, Teams, Notion (shared pages) |
| Live / federated | Paste URL or tool fetch when index lags | Drive/OneDrive URL paste; Notion needs OAuth for tools |
| Knowledge Graph | People, projects, permissions, activity links | Cross-source ranking for `Stratos_*` test artifacts |
| Waldo planning | Retrieval planning before frontier LLM | Thinking mode; ~50% latency reduction claimed |
| Citations | Deep links to source passages | Permission-enforced; User B sees only ACL-allowed sources |

### Known tenant limitations (from 4.9.1 Field 2)

- OneDrive private file crawl lag; Notion share-to-integration required; large Sheets may truncate in index.

### Verification steps / test case

1. **TEST-02 style:** Query answer known only in `Stratos_Connector_Test_Doc` (Drive) — verify citation + deep link.
2. Repeat for Notion SLA page (shared with integration).
3. Ask Teams thread content — compare indexed vs live transcript if enabled.
4. Toggle **Use company sources** off — confirm ungrounded behavior differs.
5. Thinking vs Fast — score citation completeness 1–5.

**Risk & Cost Impact:** Risk: Low | Cost: Native

---
