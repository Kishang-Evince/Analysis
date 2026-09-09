# Field 2 - API Depth & Writeback

**Section pre-flight & reference:** [Pre-Flight.md](Pre-Flight.md)
**Companion eval log:** [API Depth & Writeback.md](../../../Glean/Combined/4.9.4 Integration & Technical/API Depth & Writeback.md)

---

| Layer | Test | Write to source? | Pass? |
|---|---|---|---|
| Connector | Confirm Outlook/Teams read scopes in setup docs | No | |
| Gmail tool | Agent drafts email | Yes (Gmail) | |
| Docs tool | Agent creates Google Doc | Yes (Drive) | |
| Indexing API | Index + delete test doc on custom datasource | Glean index only | |

Note `tools_unauthorized` if OAuth missing.

---
