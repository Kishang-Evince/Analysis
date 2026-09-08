# Field 3 — Webhook Support Quality

**Section pre-flight & reference:** [Pre-Flight.md](Pre-Flight.md)
**Companion eval log:** [Webhook Support Quality.md](../../../Glean/Combined/4.9.4 Integration & Technical/Webhook Support Quality.md)

---

| Connector | Action | Time to searchable | Mechanism |
|---|---|---|---|
| Drive | Edit `Stratos_Connector_Test_Doc` | min | webhook |
| Teams | Post new message | min | Graph webhook |
| Gmail | Send test mail | min | History polling |
| Notion | Edit shared page | hours | crawl only |
| OneDrive | Upload file | min–hours | Graph webhook |

**Outbound (optional):** Platform Trigger → test endpoint — verify HMAC signature.

| Metric | Value |
|---|---|
| Fastest connector | |
| Slowest connector | |
| Platform Trigger works? | Y/N |

---
