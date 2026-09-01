---
url: "https://docs.glean.com/tools/connector/outlook-tools"
canonical: "https://docs.glean.com/tools/connector/outlook-tools"
title: "Microsoft Outlook tools"
description: "Use Microsoft Outlook tools in Glean to work with email, calendar events, contacts, and Outlook profile information."
fetched_at: "2026-09-01T13:30:04.105Z"
---
On this page

Microsoft Outlook extension tools enable Glean to interact directly with Outlook email, calendar, contacts, and profile data in supported Glean experiences.

This allows users to draft and send emails, review messages, create and update calendar events, attach files to existing calendar events, and manage contacts without switching between applications.

Outlook tools are a key component of the broader Microsoft 365 tool suite. For read-only calendar retrieval and search, see [Calendar search](/tools/glean/calendar-search).

When building a workflow agent, the Outlook tools are available within the *Plan and Execute* step and for building agents with auto mode, the Outlook tools are available for all the steps. This allows the agent to dynamically determine when to send emails, create or update calendar events, or manage contacts to fulfill a complex user request.

important

**Before you begin**

Complete the [Microsoft 365 tools and extension tools setup](/administration/tools/setup-tools/m365-tools-setup) before creating or using Outlook tools. That page covers the connector, OAuth, tenant, permission, and administrator requirements.

## Supported tools[​](#supported-tools "Direct link to Supported tools")

The Outlook tools are enabled as a unified bundle.

The following tools are included:

### Email and draft management[​](#email-and-draft-management "Direct link to Email and draft management")

-   List messages: Retrieves Outlook messages so users can identify the email thread or message they want to review.
-   Get message: Retrieves the contents of a specific Outlook message for additional context.
-   Create draft: Creates a new Outlook email draft for user review before sending.
-   Create draft reply: Creates a draft reply to an existing Outlook email thread.
-   Send email: Sends an email from the signed-in user’s Outlook account.
-   Forward message: Forwards an existing Outlook message to one or more recipients.

### Calendar and event management[​](#calendar-and-event-management "Direct link to Calendar and event management")

-   List events: Retrieves Outlook calendar events available to the signed-in user.
-   Get event: Retrieves the details of a specific Outlook calendar event.
-   Get calendar view: Returns a time-bounded view of calendar events for a given date range.
-   Get calendar schedule: Returns schedule and availability information for one or more users.
-   List calendars: Retrieves the Outlook calendars available to the signed-in user.
-   Create calendar event: Creates a new Outlook calendar event.
-   Update calendar event: Updates an existing Outlook calendar event.
-   Cancel event: Cancels an existing Outlook calendar event.
-   Delete calendar event: Deletes an existing Outlook calendar event.
-   Add event attachment: Attaches a file to an existing Outlook calendar event.

### Contacts and profile[​](#contacts-and-profile "Direct link to Contacts and profile")

-   List contacts: Retrieves Outlook contacts so users can review and select existing contacts.
-   Create contact: Creates a new Outlook contact.
-   Update contact: Updates an existing Outlook contact.
-   Get profile: Retrieves profile information for the authenticated Outlook user.

## Example use cases[​](#example-use-cases "Direct link to Example use cases")

Integrating tools into Glean workflows provides several high-value automation opportunities:

-   Email follow-up workflows: An agent can summarize a meeting or conversation, draft an Outlook email, and prepare a reply or forward for the user to review.
-   Calendar coordination: A workflow can create or update Outlook events after gathering scheduling details from earlier agent steps. In P&E steps, an agent can also check availability and attach relevant files to an existing event.
-   Customer communications: A user can retrieve a recent email, draft a response, and send a follow-up without leaving Glean.
-   Contact management: An agent can create or update Outlook contacts after extracting details from notes, forms, or prior messages.

## Setup and configuration[​](#setup-and-configuration "Direct link to Setup and configuration")

### Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before configuring tools, ensure you have the following:

-   You must have administrative access to the Glean Admin console.
-   Your organization must have an existing Microsoft 365 (O365) connector configured in Glean.
-   You must have access to the Microsoft Entra admin center to grant admin consent or configure a custom OAuth app.
-   For a new custom OAuth configuration, register the app as *single tenant*. Existing multitenant apps restricted to your tenant continue to work and do not require migration.

### Administrator steps[​](#administrator-steps "Direct link to Administrator steps")

1.  Enable the pack: In Glean, go to **Admin Console** → **Platform** → Tools and add *Microsoft Outlook extension tools* from the template library.
2.  Select the connector instance: Link the pack to your existing *Microsoft 365* connector instance.
3.  Configure authentication: Microsoft Outlook tools use user OAuth.
    -   *Central*: Use the Glean-managed Microsoft OAuth app when it is available in your environment.
    -   *Custom OAuth app*: If using a customer-managed app, register it in Microsoft Entra ID as a single-tenant app, configure the required delegated permissions, and enter the client credentials in Glean.
4.  Save the tools after the authentication configuration is complete.
5.  Enable the pack for users: Use **Edit settings** under **Enable Tools** to make the pack available to the relevant users and supported Glean surfaces.

important

If you use Microsoft Outlook extension tools, a Glean admin must complete a one-time connection after the tools are created before other users can reliably use the tools in your environment.

For detailed setup steps, see [Microsoft 365 tools and extension tools setup](https://docs.glean.com/administration/tools/setup-tools/m365-tools-setup).

## FAQ[​](#faq "Direct link to FAQ")

### Do users need to connect their own Outlook account?

Yes.

Microsoft Outlook tools use user OAuth, so each user must authenticate with their own Microsoft account before using the tools.

### Can I enable only some Outlook tools from the pack?

Yes.

Admins can enable tools based on what they want to make available.

### Why does Outlook require extra admin setup beyond basic OAuth configuration?

Outlook is part of the Microsoft extension tool family.

In addition to the OAuth configuration, a Glean admin must complete a one-time admin connection so the pack is fully authorized for your environment.

### Do I need to migrate an existing multitenant custom OAuth app?

No. Existing multitenant apps that are restricted to your tenant continue to work.

Use a single-tenant app for new custom OAuth configurations. You can optionally switch an existing configuration to a single-tenant app.

### Where should I go for the complete Microsoft authentication steps?

See [Microsoft 365 tools and extension tools setup](https://docs.glean.com/administration/tools/setup-tools/m365-tools-setup).
