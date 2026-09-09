# Field 4 - Confidence Scoring

**Section pre-flight & reference:** [Pre-Flight.md](Pre-Flight.md)
**Companion eval log:** [Confidence Scoring.md](../../../Glean/Combined/4.9.11 Client-Facing Explainability/Confidence Scoring.md)

---

| # | Probe | Result |
|---|---|---|
| 1 | Assistant UI - numeric % on answer? | expect **No** |
| 2 | `client.chat.create()` JSON - `confidence` field? | expect **Absent** |
| 3 | Thumbs up/down only? | |
| 4 | Protect+ admin - per-category score on injection? | if licensed |
| 5 | Client needs numeric score - flag gap? | Y/N |

Document workaround: Answers + verification badges + human review.

---
