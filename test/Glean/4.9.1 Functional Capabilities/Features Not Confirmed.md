# Field 2 - Features Not Confirmed

**Section pre-flight & reference:** [Pre-Flight.md](Pre-Flight.md)
**Companion eval log:** [Features Not Confirmed.md](../../../Glean/Combined/4.9.1 Functional Capabilities/Features Not Confirmed.md)
**Deep dive (V2):** 46-item hands-on/API checklist → [V2/Features Not Confirmed.md](V2/Features%20Not%20Confirmed.md)

---

Intentional **negative / limitation** tests. Expect fail or partial.

### F2.1 Notion page not shared with integration
1. Create Notion page **not** shared with Glean integration
2. Wait ≥ one Notion crawl (~6h) or check connector activity
3. Search exact title - **Expect:** miss
4. Share with integration → after crawl → **Expect:** hit

### F2.2 Multiplayer concurrency
Same as F1.7 under stress - document if OT/conflict fails

### F2.3 Iframe extraction
1. Index parent page with unique string only inside `<iframe>`
2. Search unique string
3. **Expect:** no hit

### F2.4 Indexing API OAuth
1. Call `/api/index/v1/...` with OAuth user token
2. **Expect:** `401` / `authentication_required`
3. Retry with Glean-issued indexing token - succeed

### F2.5 CDP `Input.*` blocked
Only if agent browser/PTC tools available - try raw CDP Input method; expect deny; use connector tools (Drive/Notion) instead

### F2.6 Legacy prompt → agent auto-migrate
1. Open legacy prompts/apps (if still present)
2. Look for bulk migrate
3. **Expect:** manual rebuild only (scope agent to Drive + Notion)

### F2.7 Private OneDrive / Drive crawl lag
1. Upload unique private file to OneDrive (no share)
2. Immediately search as owner - often miss despite connector green
3. Check last crawl / wait incremental (~10 min–1h+)
4. Re-search as owner → hit; User B → still miss

---
