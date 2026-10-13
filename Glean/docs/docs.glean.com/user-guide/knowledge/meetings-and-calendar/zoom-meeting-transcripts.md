---
url: "https://docs.glean.com/user-guide/knowledge/meetings-and-calendar/zoom-meeting-transcripts"
canonical: "https://docs.glean.com/user-guide/knowledge/meetings-and-calendar/zoom-meeting-transcripts"
title: "Use Zoom meeting transcripts in Search, Chat, and Home"
description: "Learn how to use Zoom meeting transcript and recordings in Glean"
fetched_at: "2026-10-13T08:51:31.962Z"
---
On this page

When the Zoom connector is enabled, Glean will help you find and use the Zoom meeting transcripts and their recording links across **Search**, **Chat**, and the **Home** page:

-   Glean can use Zoom transcript content that you have permission to access to answer questions.
    
-   You can summarize past Zoom meetings from the Calendar widget on the Glean Home page.
    

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   The Zoom connector is installed and authorized by your admin. For more information, see [Zoom connector](/connectors/native/zoom/).
    
-   Your Zoom plan supports cloud recordings and transcription, and cloud recording is enabled in Zoom.
    
-   Access is permission-aware. Glean will only surface meetings and transcript content you are allowed to access in Zoom.
    

## How to retrieve meeting information using Glean?[​](#how-to-retrieve-meeting-information-using-glean "Direct link to How to retrieve meeting information using Glean?")

### Find meeting transcripts in Search[​](#find-meeting-transcripts-in-search "Direct link to Find meeting transcripts in Search")

-   Search naturally, for example, “quarterly roadmap review decisions” to see relevant Zoom meetings in your results.
    
-   Meeting results include a link to play the cloud recording in Zoom and are ranked by relevance alongside your other work content.
    
-   Opening a Zoom meeting result takes you to the transcript destination in Zoom. Depending on your Zoom configuration, the transcript and recording are hosted and viewed in Zoom.
    

### Ask questions in Glean[​](#ask-questions-in-glean "Direct link to Ask questions in Glean")

-   Paste a Zoom cloud-recording share or playback link into Glean Assistant, then ask it to summarize the meeting or answer questions. Assistant can retrieve the transcript when Glean has already indexed the recording, the transcript content is available, and you have permission to access it.
    
-   A Zoom meeting join link is not a transcript source. Pasting a recording link does not cause Glean to fetch an unindexed transcript directly from Zoom.
    
-   Ask questions like “What did we decide about Q1 hiring in last week’s sales leadership sync?” or “Summarize the action items from the customer escalation call.”
    
-   Chat uses the transcript content you have permission to access and includes citations as usual within Glean.
    

### Summarize past meetings from Home[​](#summarize-past-meetings-from-home "Direct link to Summarize past meetings from Home")

-   On the Glean Home page, open the Calendar widget.
    
-   Select a past meeting to generate a concise summary of key topics, decisions, and action items.
    
-   For more information, see [Customizing the Home page](/user-guide/advanced/customizing-home-page) (Calendar widget).
    

## Limitations[​](#limitations "Direct link to Limitations")

-   Transcript and recording availability depend on your Zoom plan and settings. Cloud recordings must be enabled.
    
-   Glean indexes only standard Audio Transcript or Closed Caption files attached to Zoom cloud recordings. Standalone Zoom AI Companion transcripts and summaries are not supported.
    
-   Transcript visibility follows the configured Zoom connector permission model and each recording's Zoom access settings. Depending on your organization's configuration, access can be host-only or can include participants, invitees, or everyone in the organization.
    

## Privacy and security[​](#privacy-and-security "Direct link to Privacy and security")

-   Glean enforces your enterprise permissions and Zoom access controls. Users only see meetings and transcripts they are allowed to access.
    
-   Connector data is stored in the cloud environment of your organization as per your Glean deployment model.
    

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

-   Assistant says that a transcript is unavailable for a Zoom link:
    
    -   Confirm the link is a cloud-recording share or playback link, not a meeting join link.
    -   Confirm the recording includes a standard Audio Transcript or Closed Caption file and Zoom has finished processing it.
    -   Confirm the Zoom connector completed a crawl after the transcript became available.
    -   Confirm you have access under the configured Zoom connector permission model and the recording's Zoom sharing settings.
-   I can not authorize the Zoom app:
    
    -   Your Zoom admin may need to approve the *Glean Search Crawler for Zoom* in the Zoom App Marketplace per your tenant policies.
-   Search results open in Zoom instead of a preview:
    
    -   This is expected, Zoom hosts the transcript and recording. Glean links you to the Zoom destination.

## See also[​](#see-also "Direct link to See also")

-   [Zoom connector](/connectors/native/zoom/).
-   [Calendar Search Tools setup](/administration/tools/setup-tools/calendar-search-tools-setup).
-   [Search in Glean](/user-guide/search/how-to-search-in-glean).
