---
url: "https://docs.glean.com/administration/platform/embedded-integrations/glean-in-gemini-chat/get-started-user"
canonical: "https://docs.glean.com/administration/platform/embedded-integrations/glean-in-gemini-chat/get-started-user"
title: "Use Glean in Gemini chat"
description: "Authorize Glean in Gemini chat and ask work questions using company knowledge from Glean."
fetched_at: "2026-09-01T13:29:10.934Z"
---
On this page

After your administrator sets up Glean in Gemini chat and shares the app URL, you can use Gemini to ask work questions grounded in company knowledge from Glean.

With the default tool set, this integration is read-only - it can search and synthesize company knowledge but does not create, update, or delete records in connected systems. Your administrator controls which tools are enabled.

Admins: see the [Installation guide](/administration/platform/embedded-integrations/glean-in-gemini-chat/installation-guide).

## Before you start[​](#before-you-start "Direct link to Before you start")

You need:

-   Access to the Gemini app your administrator configured
-   A Glean account
-   Access in Glean to the content you want to ask about

Glean only returns content you already have permission to access.

## Authorize Glean the first time you use it[​](#authorize-glean-the-first-time-you-use-it "Direct link to Authorize Glean the first time you use it")

The first time you use Glean in Gemini chat:

1.  Open the Gemini app URL shared by your administrator.
2.  Ask a work question in Gemini.
3.  When prompted, click **Authorize**.
4.  Sign in to Glean.

## Ask questions in Gemini[​](#ask-questions-in-gemini "Direct link to Ask questions in Gemini")

After you authorize Glean, you can ask questions such as:

-   What is the latest status on this project?
-   Summarize what we decided in my last customer meeting.
-   Who owns this workstream and what is blocking it?
-   Show me recent activity and open tickets for this account.
-   Who are the experts on this topic?

Gemini routes these questions to Glean and returns a synthesized answer with citations to the underlying internal sources.

## Did it work?[​](#did-it-work "Direct link to Did it work?")

When Glean is working correctly in Gemini chat:

-   Answers are grounded in internal company knowledge from Glean.
-   Answers include citations to internal sources you can open.
-   Results reflect your existing Glean permissions.

If you see those three things, the setup is working.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### You do not see content you expected

Glean only returns content you already have permission to access. Confirm you can open that content directly in Glean. If you can open it in Glean but it is not surfacing in Gemini, contact your administrator.

### Gemini answers without using Glean

The Glean data store may be missing its server description or agent instructions. Contact your administrator and ask them to verify that the server description and agent instructions are configured on the data store.

### Sign-in or authorization fails

Sign-in loops, redirect errors, invalid client errors, and token errors are usually configuration issues with the Glean OAuth client or the Gemini data store. Contact your administrator and share the exact error you saw.

Your administrator should check:

-   The OAuth client redirect URL is exactly `https://vertexaisearch.cloud.google.com/oauth-redirect`.
-   The client ID and client secret are correct.
-   The authorization URL uses `/oauth/authorize`.
-   The token URL uses `/oauth/token`.
-   Neither URL includes `/mcp/default`.

## Support[​](#support "Direct link to Support")

If something does not work and the checks above do not help, contact your Glean administrator.
