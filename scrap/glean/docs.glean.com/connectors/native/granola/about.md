---
url: "https://docs.glean.com/connectors/native/granola/about"
canonical: "https://docs.glean.com/connectors/native/granola/about"
title: "Granola overview"
description: "Learn what the Glean Granola connector indexes, how Granola crawl and sync work, and how permissions and limitations apply."
fetched_at: "2026-09-01T13:29:31.289Z"
---
On this page

note

**Beta:** This page contains beta features and may change.

Use the Granola connector to index AI-powered meeting notes from your Granola workspace in Glean. Granola captures, transcribes, and summarizes meetings without requiring a meeting bot by running as a desktop or mobile app that records audio locally.

To connect Granola to Glean, see [Setup](/connectors/native/granola/setup).

## Supported features[​](#supported-features "Direct link to Supported features")

-   Indexes Granola meeting notes including AI-generated summaries and full transcripts.
-   Indexes Team space notes via a workspace-level Enterprise API key, and personal (My Notes) content for individual users via per-user personal API keys.
-   Stores searchable metadata such as attendees, calendar event details, and note creation and modification timestamps.
-   Supports incremental sync so only notes modified since the last crawl are re-fetched.
-   Opens each result in the corresponding Granola note URL.

## What Glean crawls[​](#what-glean-crawls "Direct link to What Glean crawls")

Glean indexes Granola meeting notes from your workspace's Team space, and — when users connect a personal API key — their personal (My Notes) content. For each note, Glean fetches:

-   Note title (falls back to the calendar event title or "Meeting on {date}" if no title is set)
-   AI-generated summary (markdown)
-   Full meeting transcript with speaker attribution
-   Note owner name and email
-   Attendee names and emails
-   Calendar event metadata including event title, organizer, invitees, and start and end times
-   Folder membership
-   Creation and last-modified timestamps

Personal notes are deduplicated against Team space notes — if a note is already indexed via the Enterprise API key, it is not re-indexed via a user's personal token.

## How crawl and sync work[​](#how-crawl-and-sync-work "Direct link to How crawl and sync work")

After the initial indexing run, Glean updates content periodically.

**Full crawl**: Glean fetches a paginated list of all notes (up to 30 per page) using the `GET /v1/notes` API, then fetches the detail and transcript for each note individually using `GET /v1/notes/{id}?include=transcript`. The same flow runs once per connected user for personal notes.

**Incremental crawl**: Glean uses the `updated_after` parameter to fetch only notes that were created or modified since the last crawl, reducing the time and API calls required for each sync cycle. Personal notes are also crawled incrementally per user.

**Deletions**: Because Granola does not provide a deletion API or webhook support, deletions are detected through full crawl reconciliation. Notes removed from Granola are identified and removed from Glean's index during full crawl runs.

Glean does not support real-time or webhook-based sync for Granola. All syncs are periodic.

## Crawling frequency and freshness[​](#crawling-frequency-and-freshness "Direct link to Crawling frequency and freshness")

| Crawl type | Frequency | Scope |
| --- | --- | --- |
| Full crawl | Daily | All Team space notes, plus personal notes for users with a connected personal API key. Reconciles deletions. |
| Incremental crawl | Hourly | Notes created or modified since the last crawl, fetched via the `updated_after` parameter. |

Real-time and webhook-based sync are not supported. New or updated notes appear in Glean after the next scheduled incremental crawl. Frequencies are subject to change as Glean optimizes the integration.

## Permissions[​](#permissions "Direct link to Permissions")

Granola uses a domain access model for Team space content. All workspace members have access to all Team space notes, and Glean reflects this by granting access to indexed Team space notes based on workspace membership. There are no per-note access control lists for Team space content.

Personal notes indexed via a user's personal API key are scoped to that user only. Glean grants access to those notes exclusively to the Glean user whose personal API key was used to fetch them.

Identity is derived from note owners and attendees associated with each note.

## Limitations[​](#limitations "Direct link to Limitations")

-   There are no per-note permissions for Team space notes. All indexed Team space notes are visible to all members of the connected Granola workspace in Glean.
-   Real-time sync is not supported. Content updates are reflected only after the next scheduled crawl.
-   Speaker attribution in transcripts is anonymous except for the note owner. Other speakers are not identified by name.
-   The Granola API returns a maximum of 30 notes per page.
-   No activity or audit trail is available through the API.
-   Personal notes require each user to connect their own personal API key from the search results panel. Without a per-user key, the user's personal (My Notes) content is not indexed.
-   Personal API keys cannot be removed or updated from Glean once connected.

## See also[​](#see-also "Direct link to See also")

-   [Granola setup](/connectors/native/granola/setup)
-   [Granola troubleshooting](/connectors/native/granola/troubleshooting)
