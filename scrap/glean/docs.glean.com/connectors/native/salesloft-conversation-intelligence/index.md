---
url: "https://docs.glean.com/connectors/native/salesloft-conversation-intelligence/"
canonical: "https://docs.glean.com/connectors/native/salesloft-conversation-intelligence/"
title: "Salesloft Conversation Intelligence"
description: "Learn how to connect Salesloft Conversation Intelligence to Glean so you can search across call transcripts, AI summaries, and engagement metadata alongside the rest of your workspace content."
fetched_at: "2026-09-01T13:29:40.207Z"
---
On this page

note

**Beta:** This page contains beta features and may change.

Salesloft Conversation Intelligence is Salesloft's conversational intelligence product that records, transcribes, and analyzes sales and customer calls. It helps revenue teams understand customer sentiment, improve execution, identify gaps in the sales cycle, automatically extract insights from conversations, and coach reps with AI‑driven guidance.

The Salesloft Conversation Intelligence connector indexes call transcripts, AI‑generated summaries, action items, revenue‑critical moments, topics, and engagement metadata into Glean. This enables enterprise search and AI‑powered insights across sales conversations, combined with broader organizational context from your CRM systems, support portals, knowledge bases, and collaboration tools.

## Who can use this integration[​](#who-can-use-this-integration "Direct link to Who can use this integration")

-   **Product managers:** Extract feature requests and identify customer pain points directly from call transcripts.
-   **Customer success managers:** Prepare for QBRs and monitor account health by searching across historical meeting summaries.
-   **Enablement teams:** Locate high-quality example calls and coaching opportunities to share with the broader team.
-   **Revenue leaders (VP Sales, CRO):** Gain visibility into deal health and win/loss signals across all customer conversations.
-   **System admins:** Configure and maintain the data flow between Glean and Salesloft Conversation Intelligence to ensure organizational alignment.

## Supported objects[​](#supported-objects "Direct link to Supported objects")

The connector currently supports the **Calls** object from Salesloft Conversation Intelligence, including:

-   **Transcript**
    -   Full conversation text for each call.
-   **Insights**
    -   AI‑generated summaries.
    -   action items and next steps.
    -   Revenue‑critical moments and key deal moments.
    -   Competitor‑related sentiment or mentions (where present in the payload).
-   **Topics**
    -   Topics discussed in the call, as provided in the payload.
-   **Participants**
    -   Participant list (attendees).
    -   Organizer/host for the call.
-   **Call metadata**
    -   Call title.
    -   Call URL (deep link back to Salesloft Conversation Intelligence).
    -   Call type (for example, Google Meet, Zoom, or recording), as provided in the payload.
    -   Date and time of the call.
    -   Call duration.
-   **CRM context**
    -   Linked opportunity name and ID.
    -   Linked account name and ID.
    -   Additional CRM context that Salesloft Conversation Intelligence exposes with the call.

All of this information is indexed so that you can search by call attributes (participants, account, opportunity, date, topic) and use Glean's AI to summarize and synthesize patterns across calls.

## Supported API endpoints[​](#supported-api-endpoints "Direct link to Supported API endpoints")

The connector uses Salesloft Conversation Intelligence's public calls APIs. The following table summarizes how Glean uses these endpoints.

| Purpose | Endpoint | Method | Notes |
| --- | --- | --- | --- |
| List calls | `/calls` | GET | Retrieves lists of calls and their high‑level metadata. Glean only processes calls whose post‑processing (including transcripts and AI insights) is complete, and uses Salesloft Conversation Intelligence's pagination and update markers to handle both full and incremental crawls. |
| Call details | `/call-details` | GET | Fetches full details for a specific call using the `id` query parameter (for example, `?id=call-123`). The response includes transcripts, AI summaries, action items, topics, participants, and linked CRM context, which Glean converts into searchable documents. |

## Content scope and behavior[​](#content-scope-and-behavior "Direct link to Content scope and behavior")

To ensure a reliable and secure search experience, the Salesloft Conversation Intelligence connector follows specific indexing logic based on available API capabilities.

### Indexed content[​](#indexed-content "Direct link to Indexed content")

The connector focuses on high-value text and metadata to power Glean's search and AI insights:

-   **Transcripts and summaries:** Fully processed call transcripts, AI-generated summaries, action items, and topics are indexed.
-   **Engagement metadata:** Data regarding call participants and meeting context is included to improve search relevance.
-   **Direct access:** While raw audio and video files remain in Salesloft Conversation Intelligence to save storage and ensure native playback, Glean provides direct links to the call URL for seamless viewing.

### Security and access control[​](#security-and-access-control "Direct link to Security and access control")

The connector's permission behavior is based on information exposed by the Salesloft Conversation Intelligence APIs:

-   **Public calls**
    
    -   Calls fetched from Salesloft Conversation Intelligence as public are marked as such and granted to the "all users in org" group in Glean.
    -   Any Glean user with access to the Salesloft Conversation Intelligence connector can see these calls (subject to Glean's usual connector access controls).
-   **Private calls**
    
    -   Glean builds an allow-list from the call's `users` list.
    -   Only those users are granted access to the call document in Glean.
-   **Fail‑closed behavior**
    
    -   If a call is marked private but detailed call data is missing, or if the required flag is not available, Glean does not grant any users or groups access to that document.

Because of this:

-   Both public and private calls can be indexed in Glean.
-   Public calls are broadly visible to your organization.
-   Private calls are restricted to users in the call's `users` list.

### Coverage boundaries[​](#coverage-boundaries "Direct link to Coverage boundaries")

-   **Salesloft modules:** This connector is dedicated to Salesloft Conversation Intelligence (conversational intelligence). Data from other Salesloft modules or external Snowflake exports are not included in this specific sync.
-   **Processing and freshness:** Content is indexed once it is fully processed by Salesloft Conversation Intelligence. Update frequency is managed by Glean's crawl configuration to ensure your search results remain current.
-   **Call activity:** The connector captures the core conversation and summaries; peripheral data like individual call comments are not currently part of the indexed scope.

## Crawling strategy[​](#crawling-strategy "Direct link to Crawling strategy")

The connector uses scheduled crawls to keep Glean in sync with Salesloft Conversation Intelligence.

-   Runs full crawls to discover calls within the configured historical window.
-   Runs incremental crawls that focus on calls whose processing status has recently changed (for example, newly completed calls with transcripts and summaries).
-   Uses the Salesloft Conversation Intelligence list‑calls API to poll for calls whose status indicates that post‑processing is complete.
-   Removes calls from the Glean index when they are deleted in Salesloft Conversation Intelligence or removed by retention policies.

The following table summarizes the crawl behavior at a high level:

| Crawl type | Full crawl | Incremental crawl | People data | Activity | Update rate | Webhook | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Salesloft calls | Discovers and indexes eligible calls within the configured historical period (for example, recent months of activity). | Picks up newly completed or recently updated calls by polling Salesloft Conversation Intelligence for calls whose processing is done. | A separate users crawl calls the `/users` endpoint to keep Glean's identity store in sync with Salesloft Conversation Intelligence users. Call participants are also included as part of each call's metadata. | Call transcripts, summaries, topics, and CRM context are all refreshed as calls update. | Designed for near–real‑time freshness after calls finish processing in Salesloft Conversation Intelligence. | No | Uses Salesloft Conversation Intelligence list and details APIs; no Salesloft‑side webhooks are used for this connector. |

## Results display[​](#results-display "Direct link to Results display")

In Glean search results and assistant experiences, Salesloft Conversation Intelligence calls appear as individual items. A typical result includes:

-   Call title (clickable deep link back to the call in Salesloft Conversation Intelligence)
-   Call date and time
-   Primary rep or organizer
-   Linked deal or opportunity name (where available)
-   Call duration
-   A short snippet from the AI‑generated summary
-   Top topics as tags (for example, "pricing," "security," "renewal")
-   An icon for the Salesloft Conversation Intelligence call

## Requirements[​](#requirements "Direct link to Requirements")

This section covers what you need in both Glean and Salesloft Conversation Intelligence before you can configure the connector.

### Technical requirements[​](#technical-requirements "Direct link to Technical requirements")

-   An active Glean workspace with access to the connectors gallery.
-   Network access from Glean's infrastructure to the Salesloft Conversation Intelligence APIs used by your organization (typically via the public internet).
-   A Salesloft Conversation Intelligence environment where call recording and analysis are already configured and in active use.
-   You are a Glean admin for your workspace and can access the Glean admin console.
-   You are a Salesloft Conversation Intelligence admin (or have equivalent permissions) and can access the Salesloft Conversation Intelligence API configuration screen under **Workspace Settings** in the profile menu.

### Credential requirements[​](#credential-requirements "Direct link to Credential requirements")

The connector uses **API key and API password** authentication, not OAuth.

You need:

-   A **Salesloft Conversation Intelligence API key** with access to call data.
-   A **Salesloft Conversation Intelligence API password** associated with that API key.

These credentials are generated in the Salesloft Conversation Intelligence admin console. The steps below guide you through the process.

## Setup instructions[​](#setup-instructions "Direct link to Setup instructions")

### Step 1: Generate API credentials in Salesloft Conversation Intelligence[​](#step-1-generate-api-credentials-in-salesloft-conversation-intelligence "Direct link to Step 1: Generate API credentials in Salesloft Conversation Intelligence")

1.  Log in to Salesloft Conversation Intelligence as an admin.
2.  Navigate to **Workspace Settings** in the profile menu.
3.  Navigate to the **Integrations** section.
4.  Create or locate the API key and API password for the integration.
5.  Copy both values and store them securely. You will need them in the next step.

### Step 2: Add the Salesloft Conversation Intelligence connector in Glean[​](#step-2-add-the-salesloft-conversation-intelligence-connector-in-glean "Direct link to Step 2: Add the Salesloft Conversation Intelligence connector in Glean")

1.  Log in to the **Glean admin console**.
2.  Navigate to **Connectors** and click **Add connector**.
3.  Search for **Salesloft Conversation Intelligence** and select it.
4.  Enter a name for your Salesloft Conversation Intelligence connector.
5.  Enter the following Salesloft Conversation Intelligence details:
    -   **API Key** from Step 1.
    -   **API Password** from Step 1.
6.  **Save** the configuration.

### Step 3: Verify the connection[​](#step-3-verify-the-connection "Direct link to Step 3: Verify the connection")

1.  After saving, Glean will begin its initial crawl of Salesloft Conversation Intelligence data.
2.  Monitor the connector status in the admin console to confirm that calls are being indexed.
3.  Once the initial crawl completes, verify that Salesloft Conversation Intelligence call results appear in Glean search.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

| Issue | Resolution |
| --- | --- |
| No calls appearing after setup | Verify that the API key and password are correct and have the required permissions. Check that calls exist in Salesloft Conversation Intelligence with completed processing. |
| Missing transcripts or summaries | Ensure calls have finished post‑processing in Salesloft Conversation Intelligence before expecting them in Glean. |
| Permission errors | Confirm that the API credentials have access to the call data endpoints (`/calls` and `/call-details`). |
| Stale data | Check the crawl schedule in the Glean admin console and verify that incremental crawls are running as expected. |
