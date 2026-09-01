---
url: "https://docs.glean.com/tools/connector/gmail-tools"
canonical: "https://docs.glean.com/tools/connector/gmail-tools"
title: "Gmail tools"
description: "Use Gmail tools in Glean to send, read, organize, and draft emails, manage labels, and look up contacts."
fetched_at: "2026-09-01T13:30:01.515Z"
---
On this page

Gmail extension tools enable Glean to interact directly with Gmail messages, drafts, labels, threads, and contacts in supported Glean experiences.

This allows users to send and read emails, manage drafts and labels, reply to threads, and look up contacts without switching between applications.

Gmail tools are a key component of the broader Google tool suite.

When building a workflow agent, Gmail tools are available within the *Plan and Execute* step. For agents with auto mode, Gmail tools are available for all steps. This allows the agent to dynamically determine when to send emails, create drafts, organize messages, or look up contacts to fulfill a complex user request.

## Supported tools[​](#supported-tools "Direct link to Supported tools")

Gmail tools are available in a unified pack. The pack includes 28 tools:

### Email and thread management[​](#email-and-thread-management "Direct link to Email and thread management")

-   Fetch emails: Retrieves Gmail messages so users can review recent emails or find specific messages.
-   Fetch message by message ID: Retrieves a single Gmail message by its message ID.
-   Fetch message by thread ID: Retrieves all messages in a specific Gmail thread for additional context.
-   List Gmail history: Reports mailbox changes, including added, modified, or deleted messages and labels.
-   List threads: Retrieves Gmail threads to help users identify and navigate email conversations.
-   Send email: Sends an email from the signed-in user's Gmail account.
-   Reply to thread: Sends a reply within an existing Gmail thread.
-   Forward message: Forwards an existing Gmail message to one or more recipients.
-   Batch delete Gmail messages: Permanently deletes multiple Gmail messages.
-   Batch modify Gmail messages: Adds or removes labels from multiple Gmail messages.
-   Move to trash: Moves a Gmail message to the trash folder.
-   Trash thread: Moves all messages in a Gmail thread to the trash.
-   Get Gmail attachment: Retrieves an attachment from a Gmail message.

### Draft management[​](#draft-management "Direct link to Draft management")

-   Create email draft: Creates a new Gmail draft for user review before sending.
-   List drafts: Retrieves existing Gmail drafts so users can review or continue editing.
-   Send draft: Sends a previously created Gmail draft.
-   Delete draft: Permanently deletes a Gmail draft.
-   Update draft: Updates the content or recipients of an existing Gmail draft.

### Label management[​](#label-management "Direct link to Label management")

-   List labels: Retrieves all Gmail labels available to the signed-in user.
-   Create label: Creates a new Gmail label for organizing messages.
-   Add label to email: Applies an existing label to a Gmail message.
-   Modify thread labels: Adds or removes labels from all messages in a Gmail thread.
-   Patch label: Updates selected fields of a Gmail label.
-   Delete label: Permanently deletes a Gmail label from the account.

### Contacts and profile[​](#contacts-and-profile "Direct link to Contacts and profile")

-   Get contacts: Retrieves the signed-in user's Google contacts for use in composing or forwarding emails.
-   Get people: Retrieves people and contact information from the user's Google account.
-   Search people: Searches the user's Google contacts and directory for people.
-   Get profile: Retrieves profile information for the signed-in Gmail user.

## Example use cases[​](#example-use-cases "Direct link to Example use cases")

Gmail tools support several common workflow patterns:

-   Email triage workflows: An agent can fetch recent emails, summarize key messages, and draft replies for the user to review before sending.
-   Automated follow-ups: A workflow can reply to a thread or forward a message after gathering context from earlier agent steps.
-   Label-based organization: An agent can create labels and apply them to emails based on content, sender, or project, keeping inboxes organized.
-   Contact-aware messaging: A user can look up contacts, compose a new email, and send it without leaving Glean.
-   Draft review pipelines: An agent can create drafts from meeting summaries or reports, list existing drafts for review, and send approved drafts on behalf of the user.

## Setup and configuration[​](#setup-and-configuration "Direct link to Setup and configuration")

### Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before configuring tools, ensure you have the following:

-   You must have administrative access to the Glean Admin console.
-   Your organization must have an existing Google Drive connector configured in Glean.
-   You must have access to the Google Cloud Console to enable the required APIs and configure OAuth credentials.
-   The Gmail API and People API must be enabled in your Google Cloud Console.

### Administrator steps[​](#administrator-steps "Direct link to Administrator steps")

1.  Enable the pack: In Glean, go to **Admin console** → **Platform** → Tools and add *Gmail tools* from the template library.
2.  Select the connector instance: Link the pack to your existing *Google Drive* connector instance.
3.  Configure authentication: Gmail tools use OAuth user authentication.
    -   *Central*: Use the Glean-managed Google OAuth app when it is available in your environment.
    -   *Custom OAuth app*: If using a customer-managed app, register it in the Google Cloud Console, enable the Gmail API and People API, configure the OAuth consent screen, and enter the client credentials in Glean.
4.  Save the tools after the authentication configuration is complete.
5.  Enable the pack for users: Use **Edit settings** under **Enable Tools** to make the pack available to the relevant users and supported Glean surfaces.

note

Gmail tools use OAuth user authentication exclusively. Domain-wide Delegation is not supported for Gmail extension tools.

For detailed setup steps, see [Google tools setup](/administration/tools/setup-tools/google-tools-setup).

## FAQ[​](#faq "Direct link to FAQ")

### Do users need to connect their own Google account?

Yes.

Gmail tools use OAuth user authentication, so each user must authenticate with their own Google account before using the tools.

### Can I enable only some Gmail tools from the pack?

Yes. Admins can enable tools based on what they want to make available.

### What Google APIs need to be enabled?

Enable the Gmail API and People API. Gmail tools use the People API for contact lookup.

### Can I use Domain-wide Delegation for Gmail tools?

No.

Gmail extension tools require OAuth user authentication. Domain-wide Delegation is not supported for these tools. Each user authenticates individually.

### Where can I find the complete Google authentication setup steps?

See [Google tools setup](/administration/tools/setup-tools/google-tools-setup).
