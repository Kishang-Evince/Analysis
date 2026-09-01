---
url: "https://docs.glean.com/administration/platform/embedded-integrations/glean-in-gemini-chat/installation-guide"
canonical: "https://docs.glean.com/administration/platform/embedded-integrations/glean-in-gemini-chat/installation-guide"
title: "Set up Glean in Gemini chat"
description: "Connect Glean to Google Gemini Enterprise as a custom MCP server so users can ask work questions in Gemini chat using company knowledge from Glean."
fetched_at: "2026-09-01T13:29:10.971Z"
---
On this page

Use this guide to connect Glean to Google Gemini Enterprise through a custom MCP server data store.

After setup, users can ask Gemini work questions and get answers grounded in company knowledge from Glean. Glean enforces each signed-in user's existing permissions on every result.

## Before you begin[​](#before-you-begin "Direct link to Before you begin")

Complete the requirements in [Prerequisites for Glean in Gemini chat](/administration/platform/embedded-integrations/glean-in-gemini-chat/prerequisites) before you start. In particular, confirm the required MCP tools are enabled on the MCP server path you plan to use.

## Step 1: Gather your Glean connection details[​](#step-1-gather-your-glean-connection-details "Direct link to Step 1: Gather your Glean connection details")

In this step, you collect the server URL, confirm the required tools, and create an OAuth client inside Glean.

### 1.1 Find the MCP server URL[​](#11-find-the-mcp-server-url "Direct link to 1.1 Find the MCP server URL")

In Glean, go to the **MCP** admin page and copy the full MCP server URL for the server path you want Gemini to use.

tip

Your Glean backend URL follows the pattern `https://<tenant_id>-be.glean.com`. You can find it in **[About Glean](https://app.glean.com/admin/about-glean)** under **Server instance (QE)**.

Example:

```
https://your-company-be.glean.com/mcp/default
```

### 1.2 Confirm the required MCP tools are enabled[​](#12-confirm-the-required-mcp-tools-are-enabled "Direct link to 1.2 Confirm the required MCP tools are enabled")

Confirm the selected MCP server path includes the [required MCP tools](/administration/platform/embedded-integrations/glean-in-gemini-chat/prerequisites#required-mcp-tools).

### 1.3 Create the Gemini OAuth client[​](#13-create-the-gemini-oauth-client "Direct link to 1.3 Create the Gemini OAuth client")

Open the Glean **[Third-party OAuth](https://app.glean.com/admin/third-party-oauth)** admin page and create a new static client with the values listed in [OAuth client values](/administration/platform/embedded-integrations/glean-in-gemini-chat/prerequisites#oauth-client-values).

After you create the client, copy and store these values:

-   Client ID
-   Client secret
-   Authorization URL
-   Token URL
-   MCP server URL

Use these URL patterns:

-   Authorization URL: `https://your-company-be.glean.com/oauth/authorize`
-   Token URL: `https://your-company-be.glean.com/oauth/token`

Do **not** append `/mcp/default` to the authorization URL or token URL.

![Static OAuth client setup in Glean for Gemini](/img/administration/platform/embed-integrate/glean-in-gemini-chat/create-static-client.png)

## Step 2: Create the MCP data store in Gemini[​](#step-2-create-the-mcp-data-store-in-gemini "Direct link to Step 2: Create the MCP data store in Gemini")

### 2.1 Open the data stores page[​](#21-open-the-data-stores-page "Direct link to 2.1 Open the data stores page")

In Google Cloud, go to the **Gemini Enterprise data stores** page and create a new data store. Under **Third-party sources**, select **Custom MCP Server (Preview)**.

![Gemini Enterprise data stores](/img/administration/platform/embed-integrate/glean-in-gemini-chat/create-data-store.png)

### 2.2 Enter the connection details[​](#22-enter-the-connection-details "Direct link to 2.2 Enter the connection details")

Use the values from Step 1.

| Field in Gemini | Value |
| --- | --- |
| MCP Server URL | Your Glean MCP server URL |
| Authorization URL | Your Glean authorization URL |
| Authorization URL Parameters | Leave blank |
| Token URL | Your Glean token URL |
| Client ID | Your Glean client ID |
| Client secret | Your Glean client secret |
| Scopes | Leave blank |

### 2.3 Sign in and open advanced options[​](#23-sign-in-and-open-advanced-options "Direct link to 2.3 Sign in and open advanced options")

1.  Click **Login** and complete the Glean sign-in flow.
2.  Click **Continue**. The **Advanced options** section opens.
3.  Paste the recommended MCP server description (see below) into the description field.
4.  Paste the recommended MCP agent instructions (see below) into the agent instructions field.
5.  Click **Continue**.

Paste this text into the **MCP Server Description** field.

![Advanced options in Gemini Enterprise for the MCP server](/img/administration/platform/embed-integrate/glean-in-gemini-chat/mcp-server-config.png)

Glean is your company's unified knowledge layer. This data store searches and synthesizes across every connected enterprise system, including Google Drive, Gmail, Slack, Jira, Confluence, Notion, GitHub, Salesforce, Zendesk, and 100+ more, with the user's own permissions enforced on every result. Use it to answer questions about the organization's people, projects, documents, meetings, code, tickets, customers, and decisions, including recent company activity that is not yet in any model's training data. This data store retrieves and synthesizes existing company knowledge. With the default tool set, it does not create, modify, or delete records in connected systems. It is not the right choice for general public-web facts, current events, or general world knowledge that does not depend on internal context.

#### Example triggering queries[​](#example-triggering-queries "Direct link to Example triggering queries")

| Query | Reasoning |
| --- | --- |
| What's the latest status on the Q2 platform launch? | Asks for internal project status, which Glean can retrieve from connected docs, tickets, and chat. |
| Who owns the OAuth integration work and what's blocking it? | Combines a people lookup with project context. |
| Summarize what we decided in the customer sync with the account. | Requires synthesizing meeting notes and related threads. |
| What did the customer say in their last few support tickets? | Customer context lives in connected systems like Zendesk. |
| Find the function that handles tenant config flags. | Code search across connected repositories. |
| Any updates on the rollout plan? | Ambiguous, but rollout plans are tracked internally. |
| What's the capital of France? | General world knowledge; not a function of this data store. |

#### Behavior[​](#behavior "Direct link to Behavior")

You are Glean, the company's knowledge assistant. Your role is to retrieve and synthesize information from across the organization's connected enterprise systems and answer accurately, always respecting the user's existing permissions.

**Core instructions:**

-   Default to Glean for work-related questions that may depend on company knowledge. When in doubt about whether internal context is needed, query Glean first.
-   Interpret the user's intent, run the appropriate search first, and answer from the results. Do not refuse without performing a query.
-   Synthesize across sources rather than dumping raw results. Lead with the direct answer, then cite the supporting documents so the user can verify.
-   For people or project lookups, infer the entity from the query and results. Do not ask for IDs the results will already contain.

**Ambiguous queries:**

-   Do not stall with clarifying questions. Run a best-effort search, surface the most relevant results, then offer to narrow.
-   Prefer recent and authoritative sources when results conflict, and note the conflict to the user.

**Errors and permissions:**

-   Always operate within the user's permissions. If a user cannot access a result, do not expose its contents.
-   If nothing relevant is found, say so clearly and suggest a refined query.
-   Handle retrieval failures gracefully with a brief, friendly message.

**Data presentation:**

-   Provide concise, synthesized answers with key details first (status, owner, date, decision) and citations to the sources.
-   Use short summaries for broad requests rather than long excerpts.
-   The default tool set is read-only. If asked to modify a system and no write-capable tools are enabled, state that you can search and synthesize company knowledge but cannot make changes.

Paste this text into the **MCP Agent Instructions** field:

You are Glean's enterprise knowledge assistant. Your primary function is to retrieve and present information from your company's connected internal systems using Glean.

**Role:**

You are a helpful assistant for answering work-related questions using company knowledge available through Glean. Your job is to find, read, and summarize relevant internal information across connected enterprise systems.

**Core tasks:**

-   Search internal company knowledge across connected systems such as documents, chat, email, meetings, tickets, CRM, code, and people data.
-   Read and summarize specific internal documents or URLs when provided.
-   Find people, ownership, project context, customer context, and recent company activity.
-   Synthesize findings from multiple internal sources into a clear response.

**Default behavior:**

-   For work-related or ambiguous queries, use Glean first.
-   If the request may depend on internal company knowledge, recent company activity, or enterprise systems, prefer Glean before other sources.
-   If the user provides a URL, or a relevant URL needs to be opened, use the Glean Document Reader.
-   Do not ask for extra identifiers if the answer can be found through Glean search first. If initial results are broad, filter and summarize them before responding rather than returning a raw dump.

**Error handling:**

-   If you cannot find relevant information in Glean, clearly say so.
-   If a document or URL cannot be retrieved, clearly say it could not be read.
-   If the request is outside Glean's scope, say it does not appear to require company knowledge and use another appropriate source if available.
-   If access is restricted, say the information may not be available due to permissions.

**Data presentation:**

-   Present the answer as a concise summary first.
-   When useful, include key supporting details such as document title, owner, project name, person name, date, or source system.
-   For broad questions, provide a short synthesized overview rather than a raw dump of search results.
-   Clearly distinguish between internal company knowledge and general knowledge when both are used.

note

The server description and agent instructions tell Gemini when and how to call Glean. Pasting the recommended text gives the best out-of-the-box behavior. You can refine it later.

### 2.4 Name the connector[​](#24-name-the-connector "Direct link to 2.4 Name the connector")

1.  Choose a data connector name, for example `Glean_default`.
2.  Finish creating the data store. It now appears in your data store list.

### 2.5 Verify the data store is ready[​](#25-verify-the-data-store-is-ready "Direct link to 2.5 Verify the data store is ready")

Open the data store and monitor its state until it changes to **Active**.

## Step 3: Enable the Glean tools[​](#step-3-enable-the-glean-tools "Direct link to Step 3: Enable the Glean tools")

The data store exists, but its tools and actions need to be loaded and enabled before Gemini can use them.

1.  Open the data store.
2.  In the left navigation, go to **Actions**.
3.  Click **Reload custom actions**.
4.  Complete authentication if prompted.
5.  Select all actions that loaded from the MCP server.
6.  Click **Enable actions**.
7.  Confirm the actions now show as enabled.

If no actions load, return to Step 1 and confirm the [required MCP tools](/administration/platform/embedded-integrations/glean-in-gemini-chat/prerequisites#required-mcp-tools) are enabled on the selected server path.

![Gemini actions view showing Glean actions](/img/administration/platform/embed-integrate/glean-in-gemini-chat/resources-selected.png)

## Step 4: Create and configure your Gemini app[​](#step-4-create-and-configure-your-gemini-app "Direct link to Step 4: Create and configure your Gemini app")

The app is what users open. It connects to the data store, carries your branding, and can offer ready-made prompts.

### 4.1 Connect to an existing app or create a new app[​](#41-connect-to-an-existing-app-or-create-a-new-app "Direct link to 4.1 Connect to an existing app or create a new app")

Go to the **Gemini Enterprise apps** page.

-   If your organization already has a Gemini app that users should open, use that app and continue to the next step.
-   If you do not have a pre-existing app, create a new app, set the app name to something like `Glean`, and choose the appropriate multi-region location.

### 4.2 Connect the data store[​](#42-connect-the-data-store "Direct link to 4.2 Connect the data store")

In the app:

1.  Open **Connected data stores** in the left navigation.
2.  Click **Add existing data store**.
3.  Select the `Glean_default` data store you created (or the name you chose in Step 2.4).
4.  Click **Connect**.

### 4.3 Add prompt chips (optional)[​](#43-add-prompt-chips-optional "Direct link to 4.3 Add prompt chips (optional)")

Prompt chips are optional but recommended.

You can add a prompt chip with these values:

| Field | Value |
| --- | --- |
| Name | `ask-glean-company-knowledge` |
| Display name | `Ask Glean` |
| Title | `Search company knowledge` |
| Prefix | `Use company knowledge from connected enterprise systems to answer this. Search internal docs, chat, email, meetings, Jira, code, Salesforce, people, and project data with my permissions before answering.` |
| Enabled | Yes |

### 4.4 Configure the web app and branding[​](#44-configure-the-web-app-and-branding "Direct link to 4.4 Configure the web app and branding")

1.  Click **Configure web app**.
2.  Add the Glean logo using this image URL: `https://app.glean.com/images/admin/glean-logo2-256.png`.
3.  Pin the shortcut so users can find the app easily.
4.  Click **Save** and publish the app.

![Web app branding screen showing the logo field](/img/administration/platform/embed-integrate/glean-in-gemini-chat/general-config.png)

## Step 5: Access Glean in Gemini and verify[​](#step-5-access-glean-in-gemini-and-verify "Direct link to Step 5: Access Glean in Gemini and verify")

After setup, confirm the full flow works end to end.

1.  Navigate to the app URL from the app **Overview** tab.
2.  Confirm the Glean data store appears in the Gemini interface.
3.  Click **Authorize** and complete the Glean sign-in.
4.  Ask a company question.
5.  Confirm Gemini returns an answer with citations to internal sources.

A successful setup should meet all of these checks:

| Check | Expected result |
| --- | --- |
| Authorization | Users can sign in to Glean from inside Gemini without errors |
| Tool invocation | Asking a work question triggers a Glean search rather than a generic web answer |
| Permissions | Results only include content the signed-in user is allowed to see |
| Citations | Answers include links to the underlying documents, threads, or tickets |

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Sign-in fails or loops

**Likely cause:** Redirect URL mismatch.

**What to do:** Confirm the OAuth client redirect URL is exactly `https://vertexaisearch.cloud.google.com/oauth-redirect`.

### No actions load in Step 3

**Likely cause:** Tools not enabled on the server path.

**What to do:** Re-check Step 1.2, enable the required tools, then reload custom actions.

### Invalid client error

**Likely cause:** Wrong client ID or client secret.

**What to do:** Re-paste the values from the Glean OAuth client. Regenerate the client if the secret was lost.

### Answers ignore Glean

**Likely cause:** Server description or agent instructions missing.

**What to do:** Confirm the recommended MCP server description and MCP agent instructions were pasted in Step 2.3.

### User sees no results

**Likely cause:** Permissions issue, not a connection issue.

**What to do:** Confirm the user has access to the content directly in Glean.

### Token errors

**Likely cause:** Authorization URL or token URL is wrong.

**What to do:** Verify the URLs use your Glean backend URL (`<tenant_id>-be.glean.com`) with `/oauth/authorize` and `/oauth/token`, without `/mcp/default`.

## Support[​](#support "Direct link to Support")

-   For Glean-side issues, contact your Glean administrator or Glean account team.
-   For Gemini Enterprise-side issues, contact your Google Cloud admin or Google Cloud support, and reference Google's [Custom MCP Server documentation](https://docs.cloud.google.com/gemini/enterprise/docs/connectors/custom-mcp-server/set-up-custom-mcp-server).
