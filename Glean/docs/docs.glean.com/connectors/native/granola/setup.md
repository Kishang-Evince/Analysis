---
url: "https://docs.glean.com/connectors/native/granola/setup"
canonical: "https://docs.glean.com/connectors/native/granola/setup"
title: "Granola setup"
description: "Configure the Glean Granola connector, including Enterprise API key setup, connection details, and optional personal API keys."
fetched_at: "2026-10-13T08:49:58.406Z"
---
On this page

## Connect to Granola[​](#connect-to-granola "Direct link to Connect to Granola")

Glean supports two complementary auth modes for Granola:

-   **Workspace Enterprise API key** (admin-set): indexes all Team space notes and makes them searchable to every workspace member.
-   **Per-user personal API key** (user-set): each user can connect their own personal API key from **Settings** > **Connectors**, then open **Granola** in Glean to index their personal (My Notes) content. Personal notes are visible only to the user who connected the key.

The Enterprise API key is required. Per-user personal API keys are optional and additive.

### Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   A Granola Enterprise plan is required to use the Enterprise API.
-   A workspace admin must generate an [Enterprise API key](https://docs.granola.ai/help-center/sharing/integrations/enterprise-api).
-   For per-user personal notes on Enterprise plans, a workspace administrator must first enable **Allow personal API keys** in Granola under **Settings** > **Workspace**. On Business plans, workspace members can generate personal API keys directly.

### Step 1: Generate an Enterprise API key in Granola[​](#step-1-generate-an-enterprise-api-key-in-granola "Direct link to Step 1: Generate an Enterprise API key in Granola")

1.  Log in to the Granola desktop app as a workspace admin.
2.  In Granola, go to **Settings** > **Connectors** > **API Keys**.
3.  Click **Create new key**, select **Enterprise API**, generate the key, and copy it. You will need to enter this in the Glean configuration step below.

### Step 2: Enter the connection details in Glean[​](#step-2-enter-the-connection-details-in-glean "Direct link to Step 2: Enter the connection details in Glean")

1.  In Glean, go to **Admin console** > **Connectors** > **Add connector** and select **Granola**.
2.  Enter a display name for the connector.
3.  Paste the Enterprise API key you copied in the previous step into the **API key** field.
4.  (Optional) In **Base URL**, enter your workspace's API endpoint. If left blank, Glean uses the default: `https://public-api.granola.ai/v1`.
5.  Click **Save**. Glean validates the API key by making a test request to the Granola API.

### Step 3 (Optional): Connect a personal API key to index personal notes[​](#step-3-optional-connect-a-personal-api-key-to-index-personal-notes "Direct link to Step 3 (Optional): Connect a personal API key to index personal notes")

After the workspace connection is set up, individual users who want their personal (My Notes) content to be searchable in Glean can connect their own personal Granola API key:

1.  In Granola, go to **Settings** > **Connectors** > **API Keys**, click **Create new key**, select **Personal API**, generate the key, and copy it.
2.  In Glean, open your user settings and go to **Settings** > **Connectors**, then open **Granola**.
3.  If a Granola personal key is already connected, select **Remove Credentials**.
4.  Enter the new personal API key and reconnect Granola.
5.  Wait for the next personal-notes crawl for your notes to appear in Glean.

If your personal API key expires, you revoke it, or you generate a replacement:

1.  Remove the old credentials in Glean.
2.  Connect the new key.

Glean continues the workspace crawl normally, but it does not index your personal notes until you connect a valid key.

## See also[​](#see-also "Direct link to See also")

-   [Granola overview](/connectors/native/granola/about)
