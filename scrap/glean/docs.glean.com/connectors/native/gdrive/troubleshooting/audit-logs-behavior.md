---
url: "https://docs.glean.com/connectors/native/gdrive/troubleshooting/audit-logs-behavior"
canonical: "https://docs.glean.com/connectors/native/gdrive/troubleshooting/audit-logs-behavior"
title: "Audit logs behavior"
description: "Google audit logs may show many **Download** events tied to a specific user, often with the API method `drive.files.export`. These entries typically reflect **Glean’s automated indexing** of Google‑native files (Docs/Sheets/Slides), not manual user downloads."
fetched_at: "2026-09-01T13:29:28.424Z"
---
On this page

## Why this happens[​](#why-this-happens "Direct link to Why this happens")

-   Glean uses a Google service account with **Domain‑wide Delegation (DWD)** to index Drive content so it’s searchable. With DWD, the service account can impersonate authorized Workspace users to read files they already have access to, allowing the connector to index content across your domain while honoring existing Drive permissions. You can read more about Domain-wide Delegation [here](/connectors/native/gdrive/about#why-does-glean-need-domain-wide-delegation).
    
-   To extract content from Google‑native files, Glean calls the **Drive export API** (for example, `drive.files.export`). Google counts these automated reads as **Download** events, even though no one is manually downloading files.
    
-   Access is **read‑only** and always **respects Drive ACLs**—Glean only indexes content users already have permission to access.
    

## What’s not happening[​](#whats-not-happening "Direct link to What’s not happening")

-   These entries do not, by themselves, indicate that a user manually downloaded files. They reflect the **automated, read‑only export** step used for indexing.

## Reasons for many events for a single user[​](#reasons-for-many-events-for-a-single-user "Direct link to Reasons for many events for a single user")

-   The user **owns a large number of files**, and routine incremental or periodic crawls touched many of them in a short period.
    
-   **Frequent edits** to owned documents triggered many **re‑crawls** (each edit sends a webhook that initiates re‑indexing).
    
-   **Bulk changes** (for example, renaming a folder with many files, moving a large directory, changing sharing on a parent folder) triggered re‑indexing of all affected files.
    

## Recommendations[​](#recommendations "Direct link to Recommendations")

-   If you notice sudden spikes, validate document changes with the user before concluding there’s unusual access.
    
-   Remember that high‑ownership users, frequent edits, or bulk changes can legitimately generate many indexing events in a short time.
    

## FAQ[​](#faq "Direct link to FAQ")

**Why do events appear under a specific user?**  
Glean’s service account uses **Domain‑wide Delegation** and must impersonate a Workspace user. Google logs that user as the actor.

**Why is the method `drive.files.export` and the tool “Download”?**  
The Drive API **exports** Google‑native content so it can be indexed. Google records that export as a **Download** event.

**Does this indicate data exfiltration?**  
Not by itself. These entries typically reflect **automated crawling** that respects Drive permissions.

**Why are there thousands of events in a short window?**  
Common causes include many **edits**, **bulk changes like folder rearrangements**, or a user **owning many files** that were re‑crawled.

note

If you’d like us to review specific audit log entries, please contact Glean Support with timestamps and example document IDs.
