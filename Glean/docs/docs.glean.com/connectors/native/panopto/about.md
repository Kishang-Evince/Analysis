---
url: "https://docs.glean.com/connectors/native/panopto/about"
canonical: "https://docs.glean.com/connectors/native/panopto/about"
title: "Panopto overview"
description: "Learn how the Panopto connector works and how to configure it for Glean."
fetched_at: "2026-10-13T08:50:10.476Z"
---
On this page

The Panopto connector indexes Panopto video sessions into Glean so that you can search across recorded trainings, lectures, and enablement videos alongside the rest of your knowledge base. It uses Panopto's APIs to fetch video metadata, transcripts, and access controls, and mirrors Panopto permissions in Glean.

## Use cases[​](#use-cases "Direct link to Use cases")

Teams typically use the Panopto connector to:

-   Discover training and enablement videos by topic, owner, or folder.
-   Let engineers or learners ask natural‑language questions and get answers grounded in Panopto transcripts.
-   Help support and field teams find "how‑to" walkthroughs recorded in Panopto for specific workflows or incidents.
-   Give admins and SAs a single place to reason about video knowledge alongside docs, tickets, and code.

Example queries:

-   "Panopto videos about debugging intermittent message drops."
-   "Show training videos from the Engineering Training folder about Kubernetes."
-   "What does the search quality enablement video say about relevance tuning?"

## Supported features[​](#supported-features "Direct link to Supported features")

The current Panopto connector (P0) supports:

-   Indexing Panopto **sessions (videos)**, including:
    -   Title and description.
    -   Folder context (which folder the session belongs to).
    -   Creator and basic timing metadata.
    -   View URL so users can open the video in Panopto.
    -   Captions / transcripts (for supported caption languages; English is explicitly supported today).
-   Crawling **folders** to build the content hierarchy and permission model (folders are used for organization and ACLs; they are not the primary searchable content type).
-   Crawling **users and groups** so that Glean can enforce Panopto's user‑ and group‑based access rules in search and Glean experiences.
-   Respecting **folder‑level and session‑level permissions** (including inheritance from folders down to sessions) so that users only see videos they can access in Panopto.
-   Making Panopto content available as a retrieval source for Glean Search and Glean, so answers and summaries can be grounded in video transcripts where relevant.

## Limitations[​](#limitations "Direct link to Limitations")

Consider these limitations before setup:

-   Only **sessions (videos)** are indexed as primary documents.
-   The connector indexes captions / transcripts for sessions where Panopto provides downloadable caption files; videos without captions are still discoverable by metadata, but their spoken content is not searchable.
-   Notes, discussions, and embedded presentation content associated with sessions are out of scope for P0 and are not indexed as separate fields.
-   The connector currently uses **periodic full crawls** for identity, permissions, and content. Incremental crawls and webhooks are not used; changes are picked up on the next scheduled full crawl.
-   Activity and audience analytics (for example, viewer counts and engagement metrics) are not part of the P0 index, even though Panopto exposes some viewer endpoints in its APIs.

## Objects and data indexed[​](#objects-and-data-indexed "Direct link to Objects and data indexed")

### Sessions (videos)[​](#sessions-videos "Direct link to Sessions (videos)")

Each Panopto session is indexed as a document in Glean. The connector uses the Panopto sessions APIs and associated metadata to populate document fields.

Representative fields:

-   Document ID: Panopto session `Id`.
-   Title: Session `Name`.
-   Description: Session `Description`.
-   View URL: `Urls.ViewUrl`, so users can open the video in Panopto's viewer.
-   Folder context:
    -   Folder ID: `Folder` or `FolderDetails.Id`.
    -   Folder name: `FolderDetails.Name` (used to provide context and, where configured, filtering).
-   Creator: `CreatedBy.Username` (and associated user identity mapped via the identity crawl).
-   Timing:
    -   Start time / created time: `StartTime`.
    -   Duration: `Duration` (seconds).
-   Transcript content:
    -   Parsed text from captions downloaded from Panopto (for example, SRT files fetched via caption download URLs and parsed into plain text).

Glean uses this metadata for ranking, result display, and (where configured) filters. Transcript text is used as full‑text content for both Glean Search and Glean grounding.

### Folders[​](#folders "Direct link to Folders")

The connector crawls folders primarily to support hierarchy and permissions.

For each folder, it fetches:

-   Folder ID and name.
-   Parent folder ID and name (for hierarchy).
-   View URL for the folder in Panopto.
-   Folder‑level permissions and access settings.

Folders are used to:

-   Compute inherited permissions for sessions inside the folder.
-   Provide organizational context (for example, showing a folder path or name around a session result).
-   Power folder‑based filtering, where configured in the Glean Admin UI.

### Identity (users and groups)[​](#identity-users-and-groups "Direct link to Identity (users and groups)")

Panopto identity is crawled to enable permission‑aware search.

The connector:

-   Enumerates **users** (user IDs and usernames) via Panopto's identity APIs or SOAP endpoints.
-   Enumerates **groups** and group membership, where group‑based access control is used.
-   Uses this identity data alongside permissions crawls to compute which users and groups can see each session or folder.

The connector retrieves email addresses via Panopto's SOAP APIs to align Panopto users with their Glean profiles. When necessary, additional user identifiers are used to ensure accurate mapping across workspaces.

## Permissions and visibility[​](#permissions-and-visibility "Direct link to Permissions and visibility")

Panopto uses a hierarchical permissions model:

-   Folders act as the main containers that control access.
-   Sessions inside a folder normally inherit that folder's permissions.
-   Sessions can also have explicit permissions that override inheritance.
-   Permissions can be granted to individual users or groups, and content can be made public or restricted.

The connector mirrors this model in Glean:

-   It crawls **folder permissions** via the folders permissions API (for example, `GET /api/v1/folders/{id}/permissions`).
-   It crawls **session permissions** via the session permissions API (for example, `GET /api/v1/sessions/{id}/permissions`).
-   Each permission record associates:
    -   Principal: a user or group (`Principal.Id`, `Principal.Type`).
    -   Role: the role or access level (`Role.Id`, `Role.Name`).
    -   Inheritance: whether the permission is inherited from a parent (`IsInherited`).

At index time, Glean:

-   Expands user and group permissions using the identity crawl.
-   Computes effective access lists for each session based on both folder‑level and session‑level permissions.
-   Stores these access lists in Glean's index as ACLs.

At query time, Glean:

-   Resolves the signed‑in user's Panopto identity and group memberships.
-   Filters out any sessions the user cannot access in Panopto.
-   Ensures that public vs private content in Panopto behaves the same way in Glean.

Administrators typically have broad access in Panopto, which is reflected in Glean's behavior. The connector does not grant anyone access beyond what Panopto itself allows.

## Sync behavior and freshness[​](#sync-behavior-and-freshness "Direct link to Sync behavior and freshness")

The Panopto connector uses scheduled **full crawls** rather than incremental deltas:

-   Identity crawls (users and groups) run on a periodic schedule to keep Panopto identity in sync.
-   Folder and session crawls run regularly to:
    -   Discover new sessions.
    -   Update metadata for existing sessions.
    -   Fetch updated folder and session permissions.
    -   Re‑download captions where needed.
-   Deleted sessions and folders are detected by comparing current full crawl results to previous state; content missing from the latest crawl is removed from the index.

Typical expectations:

-   New or updated videos appear in Glean after the next content crawl and indexing cycle.
-   Permission changes (for example, adding or removing users or groups from a folder or session) propagate after the permissions crawl and re‑indexing complete.

Exact crawl frequencies and timing can vary by deployment. If you have strict freshness requirements, contact Glean Support to review crawl schedules and configuration for your Panopto connector.
