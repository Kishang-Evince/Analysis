# Field 10 - Trigger Types Supported

**Section pre-flight & reference:** [Pre-Flight.md](Pre-Flight.md)
**Companion eval log:** [Trigger Types Supported.md](../../../Glean/Combined/4.9.2 Agent & Workflow Builder/Trigger Types Supported.md)

---

**Goal:** Map tenant trigger picker + measure latency.

### Trigger inventory (fill from UI)

| Source | In picker? | Tier (Rec/Exp) | Test latency |
|---|---|---|---|
| Gmail new email | | Recommended | |
| Outlook new email | | Recommended | |
| Google Drive new doc | | Experimental | |
| OneDrive new doc | | Experimental | |
| Notion | | expect absent | |
| Teams | | expect absent | |
| Schedule | | | |
| API runs/wait | | | |

### Tests
1. Gmail content trigger + subject filter → send test mail → time to fire
2. OneDrive new file trigger → upload → time to fire (expect hours)
3. API `POST /agents/runs/wait` on published agent
4. Schedule daily run - confirm obeys 10-active cap

---
