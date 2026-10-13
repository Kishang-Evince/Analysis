---
url: "https://docs.glean.com/tools/glean/calendar-search"
canonical: "https://docs.glean.com/tools/glean/calendar-search"
title: "Calendar search"
description: "Find Google and Outlook calendar events in Glean Assistant and agents, with guidance on date ranges, shared calendars, and permissions"
fetched_at: "2026-10-13T08:50:50.077Z"
---
On this page

Use calendar search in Glean Assistant and autonomous agents to find past and upcoming events from Google Calendar and Microsoft Outlook Calendar. You can look up your own meetings, a colleague's calendar, or shared calendars that you have permission to view.

In Glean Assistant and autonomous agents, you can:

-   Search longer date ranges, such as 3–12 months back or ahead
-   Ask about another person's calendar when you already have access to it in Google Calendar or Outlook
-   Search accessible team, room, resource, subscribed, and holiday calendars

Legacy workflow agents

Legacy workflow agents receive calendar lookup performance improvements, but not these expanded date-range, colleague-calendar, or shared-calendar lookup capabilities. Use Glean Assistant or an autonomous agent for those lookups. The workflow step settings on this page apply to legacy workflow agents.

## Supported calendars[​](#supported-calendars "Direct link to Supported calendars")

Both providers support the expanded calendar lookups. Your admin must configure calendar access for the provider your organization uses.

| Calendar | Setup guidance |
| --- | --- |
| Google Calendar | [Google Calendar prerequisites](/administration/tools/setup-tools/calendar-search-tools-setup#google-calendar) |
| Microsoft Outlook Calendar | [Microsoft Outlook Calendar prerequisites](/administration/tools/setup-tools/calendar-search-tools-setup#microsoft-outlook-calendar) |

Calendar lookup can retrieve live events from the provider at query time, also called federated access. This access is separate from native indexing, which stores events for Search and other indexed meeting features. Longer lookup ranges and access to shared calendars don't change what Glean indexes.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before you search calendars:

-   Ask your Glean admin to configure calendar access for your provider. See [Supported calendars](#supported-calendars).
-   Check that you can view the requested calendar in Google Calendar or Outlook. Naming a person or calendar in a query doesn't grant access.
-   Check what event details the source calendar lets you see. Free/busy access doesn't grant access to titles, descriptions, or attendees. Private-event details remain restricted unless your source permissions allow you to view them.

## Usage examples[​](#usage-examples "Direct link to Usage examples")

Ask a question in Glean Assistant or describe the calendar lookup in an autonomous agent's instructions. Include the person or calendar and the time period you want to search:

-   “Find my meetings with Acme from the last six months.”
-   “What is on Alex’s calendar tomorrow?”
-   “Show events on the team calendar for the next three months.”
-   “Show the company holiday calendar for the next six months.”

You can also ask about shorter periods, such as today's meetings or next week. The longer-range support doesn't require a minimum three-month query.

## Inputs[​](#inputs "Direct link to Inputs")

In a legacy workflow agent, the **Calendar search** step accepts AI instructions or a search query. These are the step settings:

| Input or setting | What to provide | Example |
| --- | --- | --- |
| **AI search instructions** | Describe what the AI should look for when it generates meeting queries | `Search for my next meeting with John` |
| **Enter meeting query** | Write a query using keywords and search operators | `participants:"John" after:"now"` |
| **Number of Results** | Choose how many events the step returns. The default is **Let AI decide** | **As many as possible** |

In a query, use `after:` and `before:` with `now` or a quoted date to select a date range. Use `updated:`, `organizer:`, or `participants:` to narrow results. For example, `updated:past_week organizer:"alex@example.com"` finds recent meetings from a specific organizer.

The `type:` operator filters by event type. Supported values include `default`, `focusTime`, `outOfOffice`, and `workingLocation`.

For more query syntax, see [Advanced search filters](/user-guide/advanced/advanced-search-filter).

## Outputs[​](#outputs "Direct link to Outputs")

In a workflow agent, the step returns matching calendar events that the running user can view. Results enter the agent's context rather than appearing directly to the user. Follow the step with a **Think** or **Respond** step to summarize meetings, extract action items, or propose next steps.

## Configuration[​](#configuration "Direct link to Configuration")

To configure calendar search in a legacy workflow agent:

1.  Open the workflow agent in **Agent builder**.
2.  Select a step, then search for and select **Calendar search**.
3.  Choose whether to provide **AI search instructions** or **Enter meeting query**, then enter your instructions or query.
4.  Set **Number of Results** if you need a different result count.

Select **As many as possible** to request more events. This setting doesn't guarantee an unlimited export or enable the expanded lookup capabilities in legacy workflows. Agent execution and response-size limits still apply to the workflow step.

## Limitations[​](#limitations "Direct link to Limitations")

-   Follow-up queries through the meeting summarization modal are not currently supported
-   Calendar search retrieves events but doesn't create or change them. Your organization may separately enable calendar write tools through skills or MCP.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### A colleague's calendar or a shared calendar returns no events

Check that you're using Glean Assistant or an autonomous agent, not a legacy workflow step. Open the calendar in Google Calendar or Outlook to check your access. Include the calendar or person's name and a date range in your request. If the calendar is accessible in the source but lookup still fails, ask your admin to check the calendar connection and authorization. See [Calendar Search Tools Setup](/administration/tools/setup-tools/calendar-search-tools-setup#prerequisites).

### Calendar search is unavailable in my workflow agent

Check that you've added the Calendar search step to the workflow and ask your admin to confirm that calendar access is configured. Expanded colleague-calendar and shared-calendar lookups require Glean Assistant or an autonomous agent. See [Configuration](#configuration) for the workflow steps.

### My workflow step returns fewer events than expected

Check the date and meeting filters in the query, then increase **Number of Results** or select **As many as possible**. Result-count settings don't enable longer-range, colleague-calendar, or shared-calendar lookups in legacy workflows. Use Glean Assistant or an autonomous agent for those requests. For query syntax, see [Advanced search filters in Glean](/user-guide/advanced/advanced-search-filter).

## Frequently asked questions[​](#faq "Direct link to Frequently asked questions")

### Does looking up a shared calendar make its events available in Search?

No. Live calendar lookup doesn't add events to the native index or change the connector's indexing window. Indexed Search and homepage meeting features retain their own indexing and transcript requirements.

### Can calendar search create or update events?

No. Use a separate calendar write tool if your organization has configured one. Calendar lookup permissions don't grant permission to change events.

## See also[​](#see-also "Direct link to See also")

-   [Create agents with Auto mode](/agents/auto-mode-agent) — build an agent by describing the work you want it to do
-   [Outlook tools](/tools/connector/outlook-tools) — review separate Outlook tools and their setup requirements
