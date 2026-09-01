---
url: "https://docs.glean.com/user-guide/assistant/meeting-notes/"
canonical: "https://docs.glean.com/user-guide/assistant/meeting-notes/"
title: "Meeting notes"
description: "Capture meeting transcripts, notes, summaries, decisions, and action items in Glean without adding a meeting bot to the call."
fetched_at: "2026-09-01T13:30:39.185Z"
---
On this page

Glean meeting notes is a meeting companion built into Glean. It detects upcoming and active meetings, captures microphone and system audio, supports live note-taking, and generates a summary after the meeting ends.

Glean meeting notes works with your desktop workflow across Google Meet, Microsoft Teams, Zoom, Slack huddles, and in-person meetings. No meeting bot joins the call as a third-party participant. Glean transcribes locally from your own audio.

## What Glean meeting notes does[​](#what-glean-meeting-notes-does "Direct link to What Glean meeting notes does")

During a meeting, Glean meeting notes transcribes audio and lets you take notes alongside the transcript. You can ask questions in chat while the meeting is in progress, and Glean answers using the transcript generated up to that moment.

After the meeting ends, Glean automatically generates:

-   A transcript
-   A summary with key decisions and action items
-   Related meeting artifacts and metadata inside Glean

Meeting notes are first-class artifacts in Glean. They are indexed and surfaceable through Assistant, search, and agents, subject to your existing permissions.

## Who can use it[​](#who-can-use-it "Direct link to Who can use it")

Glean meeting notes is generally available to Glean Key customers using the Glean desktop app on macOS.

The best fit is teams with:

-   A Glean Key entitlement
-   Mac or Windows users on the Glean desktop app

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before you start a meeting, make sure you have:

1.  Glean for Desktop installed on macOS or Windows. Install it from your [Glean install settings](https://app.glean.com/settings/install), or download it directly:
    -   macOS: [DMG](https://storage.googleapis.com/glean-downloads/glean-desktop-app/Glean.dmg) (recommended) or [PKG](https://storage.googleapis.com/glean-downloads/glean-desktop-app/Glean.pkg)
    -   Windows: [x64](https://storage.googleapis.com/glean-downloads/glean-desktop-app/win/Glean-x64.exe) or [ARM64](https://storage.googleapis.com/glean-downloads/glean-desktop-app/win/Glean-arm64.exe)
2.  The required permissions granted for microphone, screen recording, and system audio capture
3.  A connected Google or Outlook calendar (only for scheduled meeting detection)

## Start a meeting[​](#start-a-meeting "Direct link to Start a meeting")

You can start meeting notes from any of the following entry points:

-   A calendar notification shortly before a scheduled meeting
-   An auto-detected active call
-   The Glean desktop calendar dropdown
-   A manual flow for ad hoc or in-person meetings

For guidance on notice and consent before recording, see [Transcription and consent guidance](/user-guide/assistant/meeting-notes/transcription-and-consent).

## Catch up during a meeting[​](#catch-up-during-a-meeting "Direct link to Catch up during a meeting")

Click **Catch me up** to summarize the last two minutes of the meeting without interrupting it.

**Catch me up** appears above the chat composer once the meeting has about two minutes of transcript, and stays available for the rest of the meeting, even if you pause recording. Glean answers this request from the meeting transcript alone, so the summary doesn't pull in company knowledge or web results.

## Find past meeting notes[​](#find-past-meeting-notes "Direct link to Find past meeting notes")

Meeting notes are first-class artifacts in Glean. You can:

-   Open notes immediately in the Glean side chat bar after a meeting ends
-   Find past notes through the artifact library and chat history
-   Reference notes in search and chat

## Data handling[​](#data-handling "Direct link to Data handling")

Glean does not record or store raw audio recordings. Glean meeting notes stores the transcribed text, the generated summary, and related metadata needed to power follow-up experiences inside Glean.

Transcripts and summaries inherit your existing Glean permissions and are private to you by default.

Meeting summary artifacts automatically follow your organization's existing Glean data retention policy. Admins can configure transcript retention separately; if not configured, transcripts follow your organization's Glean chat history retention policy.

## Admin rollout[​](#admin-rollout "Direct link to Admin rollout")

Glean meeting notes is admin-controlled for the whole organization. Admins can manage rollout from **Admin Console → Assistant → Meeting Notes**, including:

-   Enabling for all users
-   Enabling for admins only
-   Disabling entirely

In addition, admins can configure transcript retention. Note that transcript retention cannot exceed chat history retention.

## Pricing[​](#pricing "Direct link to Pricing")

Glean meeting notes is a usage-based feature billed through Glean FlexCredits. Audio duration is converted to credits based on the underlying transcription model. For more information, see [Glean Enterprise Flex pricing](/glean-enterprise-flex-pricing).

Usage is visible to admins in the **Admin Console → Billing** tab alongside other FlexCredit consumption.

## What's coming next[​](#whats-coming-next "Direct link to What's coming next")

-   Live streaming transcription
-   Improved non-English language transcription
-   Support for non-Glean Key, self-hosted, and customer-key deployments
-   Mobile capture for in-person and one-on-one conversations

## Current limitations[​](#current-limitations "Direct link to Current limitations")

The following are not currently supported:

-   **Summary template customization.** The generated summary follows a fixed format. You can't supply a custom template or configure the structure of the output.
-   **Transcript language selection.** Transcript language is autodetected per session. You cannot preset or lock a specific transcript language for a user or organization.

## Frequently asked questions[​](#frequently-asked-questions "Direct link to Frequently asked questions")

### Will Glean meeting notes replace any existing Glean functionality?

No. Glean meeting notes adds a new meeting workflow inside Glean focused on notes, transcripts, summaries, and post-meeting Q&A. It doesn't remove or change any existing Glean functionality.

### Does Glean store meeting audio?

No. Glean stores transcribed text, the generated summary, and related metadata. Glean doesn't store raw audio.

### Who should try it first?

Glean meeting notes works best for people who spend significant time in meetings, already rely on notes or transcription tools, care about post-meeting follow-through, and want meeting context available to Assistant, search, and agents.

## See also[​](#see-also "Direct link to See also")

-   [Transcription and consent guidance](/user-guide/assistant/meeting-notes/transcription-and-consent)
-   [Glean for Desktop](/user-guide/apps/glean-for-desktop)
