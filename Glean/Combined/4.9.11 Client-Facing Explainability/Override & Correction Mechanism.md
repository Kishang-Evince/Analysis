# Field 5: Override & Correction Mechanism

**Category:** 4.9.11 - Client-Facing Explainability  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** All 6 fields drafted (Doc-Verified baseline) · Sandbox scores Pending for Field 3 UX ratings, Field 4 API probe, Field 5 correction latency  
**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.  
**Synthesis basis:** Fields 4.9.1, 4.9.3 Field 10, 4.9.5 Field 3/9 + docs corpus.  
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [Override & Correction Mechanism.md](../../../test/Glean/4.9.11 Client-Facing Explainability/Override & Correction Mechanism.md)

---

**Field definition:** Interface or configurations allowing humans to override or correct wrong AI decisions.  
**Prerequisites / Licensing:** Answers/Verification for content correction; Agent Builder for agent logic; source-app edit rights for index refresh.  
**Override rating (Doc-Verified):** **Moderate** — strong **content governance** paths; **no** one-click "fix AI answer in index" for arbitrary hallucinations.  
**Correction latency (Pending Sandbox):** _TBD — source edit to re-index time_  
**Confidence Level:** **Doc-Verified** · **Pending Sandbox**  
**Validation Date:** September 3, 2026  
**Source URLs:** [Answers](https://docs.glean.com/user-guide/knowledge/answers/what-are-answers-and-how-do-they-work) · [Verification](https://docs.glean.com/user-guide/knowledge/verification/how-verification-works) · [Deprecate documents](https://docs.glean.com/user-guide/knowledge/verification/what-should-i-do-with-documents-that-are-completely-out-of-date) · [Citation feedback](https://docs.glean.com/user-guide/assistant/glean-chat/glean-chat-citations/glean-citations) · Cross-ref [4.9.2 Field 8](../4.9.2%20Agent%20&%20Workflow%20Builder/Overview.md)

### Correction mechanisms

| Mechanism | What it corrects | Latency to effect | Limitation |
|---|---|---|---|
| **Create/edit Answer** | Wrong or missing FAQ response | Minutes (immediate in search) | Manual curation; not auto-learned from thumbs-down |
| **Verify document** | Stale but valid content | Immediate badge | Does not change AI text generation |
| **Deprecate document** | Outdated source | Immediate warning badge | Doc still in index |
| **Unshare/delete in source** | Remove bad content | **Crawl-dependent** (hours) | Glean read-only on Drive/Notion |
| **Thumbs down + "incorrect citation"** | Quality signal to admins | Feeds Insights; **no auto-retrain** | Feedback ≠ override |
| **Edit agent step / republish** | Wrong agent behavior | Minutes | Requires builder access |
| **Org custom instructions** | Global tone/rules | Immediate | **Does not** fix retrieval errors |
| **Protect+ autohide** | Sensitive overshared doc | Near real-time (Protect+) | Security not accuracy |

### Engineering observation (Doc-Verified)

- Correction loop is **governance-first**: fix source or add curated Answer — not RLHF-style per-answer override.
- Notion correction requires workspace edit + re-crawl (~6h) — slow path (4.9.4).
- Human-in-the-loop on agents: per-step confirmation available in Workflow builder (4.9.2).

### Verification steps / test case

1. Assistant gives wrong answer — create Answer for correct text — confirm trumps on next search.
2. Deprecate outdated Drive doc — confirm deprecated symbol in search results.
3. Edit source doc title — time until Assistant cites updated content.
4. Thumbs down with incorrect citation — verify appears in Assistant Insights.
5. Agent wrong step — edit prompt, republish, rerun — confirm behavior change.

**Risk & Cost Impact:** Risk: Medium (slow index refresh) | Cost: Content owner labor

---
