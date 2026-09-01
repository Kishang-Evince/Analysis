---
url: "https://docs.glean.com/tools/connector/googlecalendar/list-google-calendars"
canonical: "https://docs.glean.com/tools/connector/googlecalendar/list-google-calendars"
title: "List Google calendars"
description: "Retrieves a list of calendars available in a user's Google Calendar account for browsing or selection before creating or updating events."
fetched_at: "2026-09-01T13:30:02.255Z"
---
On this page

The *List Google calendars* tool retrieves a list of calendars that the authenticated user can access in their Google Calendar account. This is a read-only tool that retrieves calendar metadata without modifying any calendars.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Ensure a connected Google Calendar account exists for the user.
-   The connected account must have permission in Google Calendar to add events.
-   Google Calendar must be connected as a connector for Glean tools.

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameter | Type | Description |
| --- | --- | --- |
| Max results | Integer | Limits the number of calendar records returned by the tool. |
| Min access role | String | Filters calendars so that only calendars at or above this access level are returned. |
| Show hidden | Boolean | When enabled, includes calendars that are marked as hidden. |
| Show deleted | Boolean | When enabled, includes calendars that have been deleted. |
| Min access role | String | Minimum access role the user must have for the returned calendars. Examples: "freeBusyReader" "owner" "reader" "writer" |
| Page token | String | Token for retrieving a specific page of results from a previous list operation. |
| Sync token | String | Sync token from a previous list request's 'nextSyncToken' to retrieve only entries changed since the last sync. When provided, only 'syncToken' and optionally 'pageToken' are used; other filters are ignored. 'minAccessRole' cannot be combined with 'syncToken'. |

## Usage examples[​](#usage-examples "Direct link to Usage examples")

-   "Show me all my Google calendars so I can choose which one to use for my team's weekly standup."
    
-   "List all calendars I have access to in my Google Calendar account."
    
-   "What calendars are available in my Google Calendar?"
    

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### No calendars are returned

-   **Possible cause:** The underlying Google account has no calendars, the user doesn't have access to the calendars, or hidden/deleted calendars are excluded from the results.
-   **Fix:** Verify that the Google account has calendars and that the user has access to them. If needed, enable the parameters to include hidden and deleted calendars in the tool's configuration.

## FAQs[​](#faqs "Direct link to FAQs")

### Does this tool modify calendars?

No. List Google calendars is a read-only tool that only retrieves calendar metadata.

### Can I control which calendars are returned?

Yes. Use the *Min access role* parameter to control which calendars qualify, and the *Show hidden* and *Show deleted* flags to include or exclude those calendars. You can also use the **Max results** parameter to cap how many calendars are returned in a single call.
