---
url: "https://docs.glean.com/connectors/native/panopto/"
canonical: "https://docs.glean.com/connectors/native/panopto/"
title: "Panopto"
description: "Learn how the Panopto connector works and how to configure it for Glean."
fetched_at: "2026-09-01T13:29:38.162Z"
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

## Requirements[​](#requirements "Direct link to Requirements")

To use the Panopto connector, you need:

-   A Panopto instance that exposes the public Panopto APIs and allows server‑to‑server connections from Glean.
-   A Panopto administrator who can:
    -   Register an OAuth 2.0 client for Glean.
    -   Obtain or approve client credentials (client ID and client secret).
    -   Approve the required API scopes for reading users, groups, folders, sessions, permissions, and captions.
-   A Glean org admin (or equivalent) with permission to add and configure connectors in the Glean Admin console.

If your Panopto instance is behind a firewall or uses a private domain, you must allow outbound traffic from your Glean deployment to the Panopto APIs for the connector to work.

## Setup and configuration[​](#setup-and-configuration "Direct link to Setup and configuration")

### Step 1: Identify your Panopto Hostname[​](#step-1-identify-your-panopto-hostname "Direct link to Step 1: Identify your Panopto Hostname")

1.  Sign in to your Panopto instance as an administrator.
2.  Review the URL in your browser's address bar. Your hostname is the domain portion of that URL.
    -   **Cloud-hosted example:** `company.hosted.panopto.com`
    -   **On-premises example:** `panopto.mycompany.edu`
3.  Copy this hostname and enter it into the **Panopto Hostname** field on the Glean setup page.

**Note:** Ensure you do not include `https://` or any trailing slashes when entering the hostname.

### Step 2: Create an API client in Panopto[​](#step-2-create-an-api-client-in-panopto "Direct link to Step 2: Create an API client in Panopto")

1.  In Panopto, click the **gear icon** in the bottom-left corner to open **System Settings**.
2.  Navigate to the **API Clients** tab and click **New**.
3.  Configure the client with the following settings:
    -   **Client Name:** `Glean Panopto Client`
    -   **Client Type:** `Server-side Web Application`
    -   **Redirect URL:** Copy the Redirect URL shown on the Panopto setup page in the Glean Admin console. Glean provides the specific value for your deployment; it will look like: `<INSTANCE_URL>/PANOPTO/oauth/verify_code`
    -   **CORS Origin URL:** Leave empty.
    -   **Post Logout Redirect URL:** Leave empty.
4.  Click **Create** to generate your credentials.
5.  **Copy the Client ID and Client Secret immediately.** The secret may only be visible once.

### Step 3: Configure in Glean[​](#step-3-configure-in-glean "Direct link to Step 3: Configure in Glean")

1.  Go to **Admin console** → **Connectors** → **Add connector** and select **Panopto**.
    
2.  Enter a name for your Panopto connector.
    
3.  Enter the following Panopto details:
    
    -   **Panopto Hostname:** Enter the hostname identified in Step 1.
    -   **OAuth2 Client ID:** Paste the ID from Step 2.
    -   **OAuth2 Client Secret:** Paste the Secret from Step 2.
4.  Click **Save** to store your configuration.
    

### Step 4: Authorize[​](#step-4-authorize "Direct link to Step 4: Authorize")

1.  Click **Authorize** to open the Panopto OAuth2 authorization window.
2.  Sign in with your Panopto Administrator account if prompted.
3.  Grant Glean permission to access your Panopto content.
4.  Once authorization is complete, you will see a success message.

### Step 5: Start the initial crawl[​](#step-5-start-the-initial-crawl "Direct link to Step 5: Start the initial crawl")

After authorization:

1.  In the Panopto connector page, start a crawl (for example, by clicking **Crawl now** if available, or waiting for the scheduled crawl to run).
2.  The connector will:
    -   Crawl users, groups, and folders for identity and permissions.
    -   Crawl sessions for metadata and permissions.
    -   Download and index captions where available.
3.  Once the crawl completes, Panopto videos begin appearing in Glean Search and can be used by Glean as grounding.

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
