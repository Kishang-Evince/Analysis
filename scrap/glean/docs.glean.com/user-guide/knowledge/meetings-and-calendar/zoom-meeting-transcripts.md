---
url: "https://docs.glean.com/user-guide/knowledge/meetings-and-calendar/zoom-meeting-transcripts"
canonical: "https://docs.glean.com/user-guide/knowledge/meetings-and-calendar/zoom-meeting-transcripts"
title: "Use Zoom meeting transcripts in Search, Chat, and Home"
description: "Learn how to use Zoom meeting transcript and recordings in Glean"
fetched_at: "2026-09-01T13:30:41.718Z"
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

-   Ask questions like “What did we decide about Q1 hiring in last week’s sales leadership sync?” or “Summarize the action items from the customer escalation call.”
    
-   Chat uses the transcript content you have permission to access and includes citations as usual within Glean.
    

### Summarize past meetings from Home[​](#summarize-past-meetings-from-home "Direct link to Summarize past meetings from Home")

-   On the Glean Home page, open the Calendar widget.
    
-   Select a past meeting to generate a concise summary of key topics, decisions, and action items.
    
-   For more information, see [Customizing the Home page](/user-guide/advanced/customizing-home-page) (Calendar widget).
    

## Limitations[​](#limitations "Direct link to Limitations")

-   Transcript and recording availability depend on your Zoom plan and settings. Cloud recordings must be enabled.
    
-   Transcript visibility follows Zoom's access controls. Meeting organizers, participants, and invitees can access transcripts for meetings they were part of.
    

## Privacy and security[​](#privacy-and-security "Direct link to Privacy and security")

-   Glean enforces your enterprise permissions and Zoom access controls. Users only see meetings and transcripts they are allowed to access.
    
-   Connector data is stored in the cloud environment of your organization as per your Glean deployment model.
    

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

-   I cannot see transcripts I expect:
    
    -   Confirm you were an organizer, participant, or invitee of the meeting. Glean respects Zoom's access controls.
    -   Check that the Zoom connector is successfully connected and crawled in the Glean Admin Console.
-   I can not authorize the Zoom app:
    
    -   Your Zoom admin may need to approve the *Glean Search Crawler for Zoom* in the Zoom App Marketplace per your tenant policies.
-   Search results open in Zoom instead of a preview:
    
    -   This is expected, Zoom hosts the transcript and recording. Glean links you to the Zoom destination.

## See also[​](#see-also "Direct link to See also")

-   [Zoom connector](/connectors/native/zoom/).
-   [Calendar Search Tools setup](/administration/tools/setup-tools/calendar-search-tools-setup).
-   [Search in Glean](/user-guide/search/how-to-search-in-glean).
