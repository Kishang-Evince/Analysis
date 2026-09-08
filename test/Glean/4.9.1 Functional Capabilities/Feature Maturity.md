# Field 4 — Feature Maturity

**Section pre-flight & reference:** [Pre-Flight.md](Pre-Flight.md)
**Companion eval log:** [Feature Maturity.md](../../../Glean/Combined/4.9.1 Functional Capabilities/Feature Maturity.md)

---

**Goal:** Label each in-scope capability Production / Public Beta / Early Access / Experimental.  
**Write results to:** [4.9.1 - Functional Capabilities](../../../Glean/Combined/4.9.1%20Functional%20Capabilities/Pre-Flight.md) → Field 4 matrix (Admin UI badge column).

### Steps
1. **Admin → What's new → Feature rollouts** — Beta + Managed rollout tabs; note enrollment + forced GA dates
2. **Platform → Models (Model Hub)** — deprecation notices, premium model badges
3. **Agents** — Auto vs Workflow labels; any Beta stickers on Multiplayer / team chat
4. **Platform → Glean MCP server** — default-enabled OAuth (GA-class per July 2026 release)
5. Cross-check doc-backed matrix in eval log rows 1–14
6. Update **Admin UI badge** column from Pending → observed

### In-scope maturity matrix (copy scores into eval log)

| # | Capability | Doc-Verified | Admin badge (fill) | Notes |
|---|---|---|---|---|
| 1 | Enterprise Search (Drive/OneDrive/Gmail/Outlook/Teams/Notion) | Production / GA | | |
| 2 | Permission-aware ACL (Drive/OneDrive) | Production / GA | | |
| 3 | Glean Assistant + Chat + Artifacts | Production / GA | | |
| 4 | Auto-mode Agents | Production / GA | | |
| 5 | Workflow-mode Agents | Production / GA | | |
| 6 | Model Hub | Production / GA | | |
| 7 | Intelligent Auto-Routing | Beta (verify) | | |
| 8 | Remote MCP Server | Production / GA (default OAuth) | | |
| 9 | Multiplayer / Team chat | Beta / Unverified | | |
| 10 | Notion connector (personal path) | GA connector / immature path | | Share-to-integration required |
| 11 | OneDrive private-file freshness | Production + crawl lag | | Green ≠ instant index |

---
