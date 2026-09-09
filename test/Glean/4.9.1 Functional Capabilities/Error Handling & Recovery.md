# Field 7 - Error Handling & Recovery

**Section pre-flight & reference:** [Pre-Flight.md](Pre-Flight.md)
**Companion eval log:** [Error Handling & Recovery.md](../../../Glean/Combined/4.9.1 Functional Capabilities/Error Handling & Recovery.md)

---

**Goal:** Clarity of errors + recovery.  
**Write results to:** eval log Field 7 battery (Observed + Msg quality columns).

### Forced-failure battery (tenant-stack)

| # | Trigger | Expected | Observed | Msg 1–5 | Machine-readable | Recovery |
|---|---|---|---|---|---|---|
| E1 | User B → private Drive/OneDrive file | Empty / no leak | | | N/A | |
| E2 | Agent tool before Notion/Drive OAuth | `422 tools_unauthorized` | | | | Authorize in settings |
| E3 | Search during connector crawl lag | Partial / unavailable msg | | | | Wait for crawl |
| E4 | Huge Sheet/Doc in Chat | `token_limit_exceeded` / truncate | | | | Narrow scope |
| E5 | Invalid API token | `401 authentication_required` | | | | Rotate token |
| E6 | Gentle Chat/Search spam | `429 rate_limit_exceeded` | | | | Backoff |
| E7 | DevTools Offline mid-chat | Retry / clear fail | | | N/A | |
| E8 | Malformed Indexing API body | `400 invalid_request` | | | | Fix payload |

### Record aggregate
- Mean Msg quality 1–5 → eval log Overall error UX score
- Machine-readable codes present? Y/N aggregate

---
