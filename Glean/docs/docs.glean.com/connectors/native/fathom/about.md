---
url: "https://docs.glean.com/connectors/native/fathom/about"
canonical: "https://docs.glean.com/connectors/native/fathom/about"
title: "Fathom overview"
description: "Learn what the Fathom connector indexes, how it syncs, and how meeting access is enforced."
fetched_at: "2026-10-13T08:49:50.575Z"
---
On this page

Use the Fathom connector to index your organization's Fathom meetings in Glean, so people can search recordings by what was said in them and by the summaries and action items Fathom produced.

To connect Fathom, see [Fathom setup](/connectors/native/fathom/setup).

## Supported features[​](#supported-features "Direct link to Supported features")

-   Indexes each Fathom meeting as one searchable document, with its AI summary and full transcript as the body.
-   Indexes searchable metadata including the recorder, the recorder's Fathom team, calendar invitees, external attendees, and action item assignees.
-   Indexes additional meeting metadata as custom fields, including the meeting platform, recording duration, scheduled start and end times, action items, CRM matches, highlights, and transcript language.
-   Opens each result in the Fathom call page for that recording.
-   Syncs Fathom users, including their account status, so Glean can match Fathom identities to Glean users.

## Use cases and example queries[​](#use-cases-and-example-queries "Direct link to Use cases and example queries")

Use Glean Search to:

-   **Find a meeting by topic:** `customer onboarding timeline`
-   **Recover a decision:** `decision about the Atlas launch`
-   **Find follow-up work:** `action items from the Atlas launch meeting`
-   **Locate a conversation by attendee and topic:** `meetings with Alex Morgan about renewal`

## Authorization model[​](#authorization-model "Direct link to Authorization model")

Fathom has no admin API for reading other people's recordings, so Glean can't crawl your workspace's meetings with a single admin credential. Instead, each person authorizes Glean with their own Fathom account, and Glean crawls what that account can see.

Two consequences are worth planning around:

-   **Coverage grows with authorization.** Glean indexes a meeting when at least one authorized user's Fathom account returns it. If no authorized user can see a meeting, Glean doesn't index it.
-   **Access mirrors Fathom.** Glean shows a user a meeting only if their own Fathom account returned it during the crawl. The user can then open only meetings they could already open in Fathom. A user who hasn't authorized sees no Fathom results, including meetings that a colleague's authorization added to the index. The user may still see a prompt to connect Fathom, which carries no meeting content.

## What Glean crawls[​](#what-glean-crawls "Direct link to What Glean crawls")

For each meeting, Glean fetches:

-   Meeting title and creation time
-   The AI summary in markdown and the full transcript, with speaker names where Fathom supplies them
-   The recorder's name, email, and Fathom team
-   Calendar invitees, with their email domains and whether they're external
-   Action items, including assignees and completion state
-   CRM matches and highlights, when Fathom returns them
-   The Fathom call URL and the share link

Glean also crawls your Fathom workspace's user list to build identity, which includes each user's status in Fathom.

## How crawl and sync work[​](#how-crawl-and-sync-work "Direct link to How crawl and sync work")

The connector runs three crawls: one for users, one to discover meetings per authorized user, and one to fetch meeting content.

Discovery fans out across every user who has authorized Glean and lists the meetings that user can see. When several users can see the same recording, Glean stores it once and records each user's access to it.

The content crawl fetches the summary and transcript once per recording, using an authorization from a user who can access it.

Incremental crawls ask Fathom for meetings created since the last crawl. Fathom's API can filter by creation time but has no filter for later modifications, so edits and new shares on an existing meeting are picked up by the next full crawl rather than by an incremental one.

Glean handles deletions during full crawl reconciliation. When a recording stops appearing in every authorized user's meeting list because someone deleted it in Fathom or unshared it from everyone who had access, Glean removes it from the index on the next full crawl. Full crawls also reconcile revoked authorizations. The user stops contributing access on the next crawl.

### Crawling frequency and freshness[​](#crawling-frequency-and-freshness "Direct link to Crawling frequency and freshness")

| Crawl type | Frequency | Scope |
| --- | --- | --- |
| Full crawl | Daily | Meetings returned for at least one authorized user; coverage is the union across authorized users. Rebuilds access and reconciles deletions. |
| Incremental crawl | Every 10 minutes | Meetings created since the last crawl, plus their summaries and transcripts. |
| User crawl | Hourly | Your Fathom account's user list and each user's status. |

The connector doesn't support webhook\-based sync for Fathom, so new meetings appear after the next incremental crawl rather than when Fathom finishes processing them.

## Permissions[​](#permissions "Direct link to Permissions")

Glean derives access from the crawl itself. A meeting's allowed users are exactly the Glean users whose own Fathom authorization returned that meeting.

Glean indexes the recorder, calendar invitees, participant domains, and other meeting metadata as facets. These fields never widen who can see a meeting in Glean.

## Limitations[​](#limitations "Direct link to Limitations")

-   **Indexed content depends on who authorizes:** Glean doesn't index meetings that no authorized user can see.
-   **The full crawl picks up updates:** Fathom offers no "updated after" filter, so the next full crawl picks up an edited summary, a renamed meeting, or a new share instead of the next incremental crawl.
-   **Speaker attribution depends on Fathom's response:** When Fathom supplies a speaker display name, Glean includes it in the transcript. Otherwise, Glean indexes the transcript without that speaker attribution.
-   **Fathom rate limits can slow initial indexing:** Fathom returns rate-limit headers that tell Glean when to back off. Glean reads those headers and continues indexing across crawl cycles when Fathom reports a rate limit.
-   **The connector doesn't support real-time sync:** It polls Fathom, so new meetings arrive on the crawl schedule.
-   **The user list requires a Fathom admin:** Fathom restricts its user list API to account admins, so only a Fathom account admin can authorize the connector. Glean never prompts users missing from that list, and it doesn't show those users an error. See [Fathom setup](/connectors/native/fathom/setup#prerequisites).

## See also[​](#see-also "Direct link to See also")

-   [Fathom setup](/connectors/native/fathom/setup)
-   [Fathom troubleshooting and FAQs](/connectors/native/fathom/troubleshooting)
