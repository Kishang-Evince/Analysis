---
url: "https://docs.glean.com/connectors/native/granola/setup"
canonical: "https://docs.glean.com/connectors/native/granola/setup"
title: "Granola setup"
description: "Configure the Glean Granola connector, including Enterprise API key setup, connection details, and optional personal API keys."
fetched_at: "2026-09-01T13:29:31.306Z"
---
On this page

## Connect to Granola[​](#connect-to-granola "Direct link to Connect to Granola")

Glean supports two complementary auth modes for Granola:

-   **Workspace Enterprise API key** (admin-set): indexes all Team space notes and makes them searchable to every workspace member.
-   **Per-user personal API key** (user-set): each user can connect their own personal API key from the **Granola** toggle in the right-hand panel of the Glean search results page to index their personal (My Notes) content. Personal notes are visible only to the user who connected the key.

The Enterprise API key is required. Per-user personal API keys are optional and additive.

### Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   A Granola Enterprise plan is required to use the Enterprise API.
-   A workspace admin must generate an [Enterprise API key](https://docs.granola.ai/help-center/sharing/integrations/enterprise-api).
-   For per-user personal notes, the workspace admin must enable the personal API key toggle on the Granola plan so that individual users can generate their own personal API keys.

### Step 1: Generate an Enterprise API key in Granola[​](#step-1-generate-an-enterprise-api-key-in-granola "Direct link to Step 1: Generate an Enterprise API key in Granola")

1.  Log in to the Granola desktop app as a workspace admin.
2.  Go to **Settings** > **API** > **Create new key**.
3.  Select **Enterprise API key** and click **Generate API Key**.
4.  Copy the API key. You will need to enter this in the Glean configuration step below.

### Step 2: Enter the connection details in Glean[​](#step-2-enter-the-connection-details-in-glean "Direct link to Step 2: Enter the connection details in Glean")

1.  In Glean, go to **Admin console** > **Connectors** > **Add connector** and select **Granola**.
2.  Enter a display name for the connector.
3.  Paste the Enterprise API key you copied in the previous step into the **API key** field.
4.  (Optional) In **Base URL**, enter your workspace's API endpoint. If left blank, Glean uses the default: `https://public-api.granola.ai/v1`.
5.  Click **Save**. Glean validates the API key by making a test request to the Granola API.

### Step 3 (Optional): Connect a personal API key to index personal notes[​](#step-3-optional-connect-a-personal-api-key-to-index-personal-notes "Direct link to Step 3 (Optional): Connect a personal API key to index personal notes")

After the workspace connection is set up, individual users who want their personal (My Notes) content to be searchable in Glean can connect their own personal Granola API key:

1.  In Granola, go to **Settings** > **API** > **Create new key** and generate a **Personal API key**. Copy the key.
2.  In Glean, run any search and open the right-hand panel on the search results page. Toggle the **Granola** switch on and paste your personal API key when prompted.

Glean will index your personal notes on the next crawl. If a user's personal API key becomes invalid or expires, Glean stops indexing that user's personal notes; the workspace crawl continues unaffected.

## See also[​](#see-also "Direct link to See also")

-   [Granola overview](/connectors/native/granola/about)
