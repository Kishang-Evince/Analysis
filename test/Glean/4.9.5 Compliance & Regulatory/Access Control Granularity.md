# Field 6 - Access Control Granularity

**Section pre-flight & reference:** [Pre-Flight.md](Pre-Flight.md)
**Companion eval log:** [Access Control Granularity.md](../../../Glean/Combined/4.9.5 Compliance & Regulatory/Access Control Granularity.md)

---

| # | Test | User B result | Pass? |
|---|---|---|---|
| 1 | Private Drive/OneDrive file search | No hit | |
| 2 | User A private Outlook/Gmail | No hit | |
| 3 | Teams channel User B not in | No hit | |
| 4 | Notion page shared to integration only | **All connector users see it** | document gap |
| 5 | Notion Live Mode + User B OAuth | Per-user filter | |
| 6 | Protect Verify access on sample doc | | |

---
