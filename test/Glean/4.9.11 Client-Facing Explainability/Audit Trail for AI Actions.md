# Field 2 - Audit Trail for AI Actions

**Section pre-flight & reference:** [Pre-Flight.md](Pre-Flight.md)
**Companion eval log:** [Audit Trail for AI Actions.md](../../../Glean/Combined/4.9.11 Client-Facing Explainability/Audit Trail for AI Actions.md)

---

| # | Test | Pass? | Notes |
|---|---|---|---|
| 1 | Change connector setting - Admin audit CSV entry | | |
| 2 | Assistant query - GCE `CHAT` event (if export live) | | |
| 3 | Same session - `CHAT_CITATIONS` row | | |
| 4 | Agent run - `WORKFLOW_RUN` event | | |
| 5 | Protect+ injection test - Finding row | | |
| 6 | Full prompt text in logs? (expect **No**) | | |

Log retention: Admin audit **30d**. Export path: ___________

---
