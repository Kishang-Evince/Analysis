# Field 3 - Undocumented Features

**Section pre-flight & reference:** [Pre-Flight.md](Pre-Flight.md)
**Companion eval log:** [Undocumented Features (found, not in marketing).md](../../../Glean/Combined/4.9.1%20Functional%20Capabilities/Undocumented%20Features%20%28found%2C%20not%20in%20marketing%29.md)
**Deep dive (V2):** 12-item SDK/API reproduction guide → [V2/Undocumented Features.md](V2/Undocumented%20Features.md)

---

Hands-on discovery (SDK + API). Marketing often silent.

### F3.1 SDK flags `exclude_deprecated_after` / `include_experimental`
1. Open [api-client-python](https://github.com/gleanwork/api-client-python) README
2. Init client with experimental / deprecation flags
3. Document params + behavior

### F3.2 `X-Glean-ActAs`
1. Admin service token + header `X-Glean-ActAs: user-b@company.com`
2. Call Chat/Search
3. Confirm ACL = User B; quota attributed per user

### F3.3 Typed errors `GleanDataError` / `ProblemDetail`
1. Force `422 tools_unauthorized` (agent tool without user OAuth)
2. Inspect structured `code` in response / SDK exception `.data`

### F3.4 Custom metadata enrichment API
1. Pick Drive-indexed doc ID
2. POST custom metadata via `/rest/api/index/custom-metadata/...`
3. Search/filter by new tag - no source re-index required

**Also poke Admin for undocumented UI:** feature flags, early access toggles, beta badges, hidden debug panels - screenshot → Field 3.

---
