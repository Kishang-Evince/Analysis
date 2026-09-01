---
url: "https://docs.glean.com/connectors/native/crayon/setup"
canonical: "https://docs.glean.com/connectors/native/crayon/setup"
title: "Crayon setup"
description: "Configure the Glean Crayon connector by generating a Crayon API key and entering the connection details in the Glean Admin console."
fetched_at: "2026-09-01T13:29:24.689Z"
---
On this page

## Requirements[​](#requirements "Direct link to Requirements")

-   A Crayon account with the **Admin** or **Integrator** role (required to generate API keys).
-   Access to the Crayon dashboard whose content should be indexed.

## Step 1: Generate an API key in Crayon[​](#step-1-generate-an-api-key-in-crayon "Direct link to Step 1: Generate an API key in Crayon")

1.  Log in to your [Crayon](https://app.crayon.co/login/) account.
2.  Navigate to the **Admin** screen and select **API Keys**.
3.  Click **Create New API Key**.
4.  Copy the generated API key and store it securely. The key cannot be retrieved after you leave this page.

## Step 2: Enter the connection details in Glean[​](#step-2-enter-the-connection-details-in-glean "Direct link to Step 2: Enter the connection details in Glean")

1.  In the Glean Admin console, go to **Connectors** > **Add Connector** and select **Crayon**.
2.  Paste the API key into the **API Key** field.
3.  Click **Save**. Glean validates the API key by verifying access to the Crayon dashboard.

## See also[​](#see-also "Direct link to See also")

-   [Crayon overview](/connectors/native/crayon/about)
-   [Crayon troubleshooting and FAQs](/connectors/native/crayon/troubleshooting)
