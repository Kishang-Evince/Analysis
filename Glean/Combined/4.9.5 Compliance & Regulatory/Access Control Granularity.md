# Field 6: Access Control Granularity

**Category:** 4.9.5 - Compliance & Regulatory  
**Vendor:** Glean  
**Evaluator:** Stratos Engineering  
**Visibility Tier:** GUARDED *(Can inform advisory matching but not for raw client-facing delivery without prior advisor review)*  
**Evaluation Date:** September 3, 2026  
**Overall Section Status:** All 9 fields drafted (Doc-Verified baseline) · Contract artifacts Pending (Trust Portal, BAA, DPA PDFs, SOC 2 scope)  
**Tenant test stack (in scope):** Notion, Microsoft Teams, Outlook, OneDrive, Gmail, Google Drive, Google Docs, Google Sheets.  
**Section overview:** [Overview.md](Overview.md)
**Companion test guide:** [Access Control Granularity.md](../../../test/Glean/4.9.5 Compliance & Regulatory/Access Control Granularity.md)

---

**Field definition:** Row, document, or field-level restriction inheriting source permissions.  
**Prerequisites / Licensing:** User A + User B; private ACL test files; Notion integration share model understood.  
**ACL granularity rating (Doc-Verified):** **Strong doc/mailbox level** on Google/Microsoft connectors; **Notion indexed corpus NOT ACL-aware**; no field-level for email/docs in tenant stack.  
**Confidence Level:** **Doc-Verified** · **Pending Sandbox** (live ACL tests)  
**Validation Date:** September 3, 2026  
**Source URLs:** [Security principles](https://docs.glean.com/security/security-principles) · [GDrive permissions](https://docs.glean.com/connectors/native/gdrive/security/permissions) · [Gmail about](https://docs.glean.com/connectors/native/gmail/about) · [Outlook setup](https://docs.glean.com/connectors/native/outlook/new-setup) · [Teams about](https://docs.glean.com/connectors/native/teams/about) · [Notion about - permissions](https://docs.glean.com/connectors/native/notion/about)

### Tenant-stack ACL matrix

| Source | Granularity | Mirrored? | Critical caveat |
|---|---|---|---|
| **Gmail** | Mailbox-level | Yes | User sees own mail only |
| **Outlook** | Mailbox-level | Yes | M365 permission model |
| **Drive / OneDrive** | Document-level ACL | Yes | "Anyone with link" edge cases; visited-doc exceptions |
| **Teams** | Channel/chat membership | Yes | Query-time evaluation |
| **Notion (indexed)** | **Org-wide within connector** | **No per-user ACL** | Anything shared with integration visible to all connector users |
| **Notion (Live Mode / MCP tools)** | Per-user OAuth | Yes at query time | Requires user OAuth + Live Mode enabled |
| **Field/row-level** | N/A for tenant stack | - | Only documented for Power BI, Salesforce FLS (out of scope) |

### Engineering observation (Doc-Verified)

- Notion docs explicit: *"indexed corpus is not permission-aware-any content shared with the integration is visible in Glean to all such users."*
- Mitigation: multiple Notion connector instances with connector visibility controls (group-level only) OR Live Mode for per-user retrieval.
- **Healthcare/regulated risk:** clinical notes in Notion shared with integration = org-wide Glean visibility unless segmented.

### Verification steps / test case

1. Private Drive/OneDrive file (User A only) - User B search - **no result** (4.9.1 E1).
2. User B cannot see User A private Outlook/Gmail in search.
3. **Notion gap test:** share restricted page with integration - confirm **all** Glean users with connector access find it.
4. Admin → Glean Protect → **Verify access** on sample document.
5. Enable Notion Live Mode - repeat with User B - confirm per-user filtering.

**Risk & Cost Impact:** Risk: **High** (Notion) / Low (Microsoft/Google) | Cost: Native

---
