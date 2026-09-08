# Field 3: Human-Readable Output

**Category:** 4.9.11 - Client-Facing Explainability  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** All 6 fields drafted (Doc-Verified baseline) · Sandbox scores Pending for Field 3 UX ratings, Field 4 API probe, Field 5 correction latency  
**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.  
**Synthesis basis:** Fields 4.9.1, 4.9.3 Field 10, 4.9.5 Field 3/9 + docs corpus.  
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [Human-Readable Output.md](../../../test/Glean/4.9.11 Client-Facing Explainability/Human-Readable Output.md)

---

**Field definition:** Clarity of natural-language outputs and formatting for non-technical clients and users.  
**Prerequisites / Licensing:** Assistant enabled; extension/Teams for embedded UX.  
**Readability rating (Doc-Verified):** **Strong** — conversational prose, markdown, bullet summaries, cited sources panel, curated Answers cards.  
**User clarity scores (Pending Sandbox):** _TBD — 5-user 1–5 rating_  
**Confidence Level:** **Doc-Verified** · **Pending Sandbox**  
**Validation Date:** September 3, 2026  
**Source URLs:** [Glean citations UX](https://docs.glean.com/user-guide/assistant/glean-chat/glean-chat-citations/glean-citations) · [Answers](https://docs.glean.com/user-guide/knowledge/answers/what-are-answers-and-how-do-they-work) · [Deep Research](https://docs.glean.com/user-guide/assistant/deep-research) · [Accessibility](https://docs.glean.com/user-guide/about/accessibility) · Cross-ref [4.9.6 Field 3](../4.9.6%20Adoption%20&%20Readiness/Overview.md)

### Output format inventory

| Output type | Format | Non-technical suitability |
|---|---|---|
| Assistant answer | Prose + bullets + inline citations + **View sources** | **High** |
| Search results | Title, snippet, app icon, verified badge | **High** |
| Answers card | Short curated markdown at top of results | **Very high** for FAQs |
| Artifacts | Slides, sheets, HTML, code blocks | **Medium** — technical artifacts need training |
| Deep Research | 5–10 page structured report | **Medium** — long-form; web app only |
| Agent response | Conversational + tool output | **Medium–High** depends on agent design |
| Protect block message | Security policy denial | **Low–Medium** — may confuse without training |

### Known readability friction (tenant stack)

- Citations to Notion/Drive/OneDrive require user to understand source apps.
- `token_limit_exceeded` on huge Sheets — error not business-friendly (4.9.1 Field 7).
- OAuth `tools_unauthorized` — technical message before agent runs.

### Verification steps / test case

1. **User B hat:** Teams sidebar PTO/policy question — rate clarity 1–5 (layout, phrasing, citation usefulness).
2. Same query on web Assistant — compare formatting consistency.
3. Non-technical user reads Deep Research sample (if enabled) — time-to-comprehension.
4. Verify verified/deprecated badges visible on search results.
5. Accessibility spot-check: keyboard nav to citations (a11y statement on file).

**Risk & Cost Impact:** Risk: Low | Cost: Native

---
