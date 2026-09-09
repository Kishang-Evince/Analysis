---
url: "https://docs.glean.com/connectors/native/notion/troubleshooting"
canonical: "https://docs.glean.com/connectors/native/notion/troubleshooting"
title: "Notion troubleshooting"
description: "Fixes for common Notion connector issues, from retrieval mode to indexing and sharing."
fetched_at: "2026-09-01T13:29:36.321Z"
---
### Understand what's indexed versus per-user

Setup does not offer a retrieval-mode switch: indexed search is always on, because providing indexing credentials is a required step of setup, not an optional toggle. On top of that, each teammate individually authorizes their own Notion account for Notion's read and write tools the first time they use one-that authorization is per user, not an admin-level setting.

-   **Indexed search** covers whatever pages and databases you shared with the Glean integration during setup. It is not permission-aware: anything shared is visible to every Glean user who can access the connector.
-   **Read and write tools** run per user, using each person's own Notion OAuth. Notion enforces that person's permissions on every call, so a teammate who hasn't authorized yet, or who lacks access in Notion, won't get tool results for that content.

For details on per-user authorization, see [Per-user authorization](/connectors/native/notion/new-setup#per-user-authorization).

### Confirm a page’s indexing status

Before concluding a page isn’t indexed, verify its status:

1.  In the Glean admin console, go to **Glean Protect → Document lookup**.
2.  Paste the exact Notion page URL and search. Watch for typos or trailing characters in the URL.
3.  To check overall connector health, go to **Admin Console → Connectors → Notion** and review the crawl status and last successful crawl time.

### A shared page or database doesn’t appear in Glean search

**Issue:** You’ve shared a page or database with the Glean integration, but it doesn’t appear in search results after the next crawl cycle.

**Fix:** Try these fixes based on the underlying issue:

| Issue | Fix |
| --- | --- |
| Notion’s `/search` API didn’t return the page | Make a small edit to the page (for example, add and remove a space in the title) to update the page’s `last_edited_time` and help Notion resurface it in search results. |
| The integration lost access | Re-share the page with the Glean integration: open the page menu, select **Connections**, remove the Glean integration, wait a minute, and re-add it. |
| The page is archived or its parent chain is inaccessible | Confirm the page isn’t in Notion’s Trash and that every parent page in its hierarchy is accessible to the integration. |
| Notion’s search index is stale | Contact [Notion support](https://www.notion.com/help) and report that the specific page isn’t being returned by the search API. In past cases, Notion has re-indexed the content on their side to resolve this. |
| The crawl hasn’t completed yet | New or updated content is picked up during the next full crawl, which runs every 6 hours. Wait for the cycle to complete and check again. |

**Fallback:** If the page still doesn’t appear after trying these fixes, enable [Live Mode](/connectors/native/notion/about#how-it-works) so Glean can fetch the page on demand at query time instead of relying on crawl-based discovery.

### Trashed pages still appear in search results

**Issue:** A page you deleted in Notion continues to show up in Glean search results.

**Fix:**

-   Empty the Notion Trash to permanently delete the page. Glean’s deletion safety window, up to 10 days, applies only while the page remains in a "missing" state.
-   Remove the Glean integration from the trashed page before emptying the Trash, so the next crawl detects the access change sooner.

**Fallback:** Enable Live Mode for permission-aware retrieval. Live Mode respects Notion’s current permissions, so trashed content a teammate can’t access in Notion won’t appear in their results.

### Crawl errors after creating multi-source databases

**Issue:** Crawls return errors, such as `400 Bad Request`, after you create new database sources or use multi-source databases in Notion.

**Fix:** The Glean connector doesn’t yet support multi-source databases or the Notion API’s `data_source_id` parameter. Avoid creating new sources in connected databases.

**Fallback:** Continue using single-source databases until the connector adds support for multi-source databases.

### Linked database views aren’t indexed

**Issue:** A linked database view page doesn’t appear in search results even though you can see it in Notion.

**Fix:** Share the underlying database with the Glean integration, not the view page. Notion’s API only returns pages and databases that are directly shared with the integration. Linked database views are separate objects-sharing a view doesn’t automatically share the underlying database.

**Fallback:** If the linked view still isn’t indexed, use the directly shared database page in Glean search and Assistant queries.

### Child pages are missing while parent pages appear

If child pages are missing while their parent page appears in Glean:

-   Re-share the parent page with the integration to re-trigger inheritance.
-   Confirm the child pages aren’t archived.
-   Make a small no-op title edit to an affected child page to bump its last edited time.
