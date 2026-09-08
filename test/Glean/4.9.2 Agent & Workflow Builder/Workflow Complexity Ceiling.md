# Field 3 — Workflow Complexity Ceiling

**Section pre-flight & reference:** [Pre-Flight.md](Pre-Flight.md)
**Companion eval log:** [Workflow Complexity Ceiling.md](../../../Glean/Combined/4.9.2 Agent & Workflow Builder/Workflow Complexity Ceiling.md)

---

**Goal:** Find practical crash/truncation point.

1. Workflow agent: **loop** 20+ OneDrive files → **branch** on type → **sub-agent** summarize
2. Record fail step + error message (tool-call budget / timeout / truncate)
3. Retry with **batched** date-range queries
4. Fill eval log limits table Observed column

| Metric | Observed |
|---|---|
| Max steps before fail | |
| Tool-call budget hit? | |
| Company search 500 cap hit? | |

---
