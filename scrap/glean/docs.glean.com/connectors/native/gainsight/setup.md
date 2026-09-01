---
url: "https://docs.glean.com/connectors/native/gainsight/setup"
canonical: "https://docs.glean.com/connectors/native/gainsight/setup"
title: "Gainsight setup"
description: "Configure the Glean Gainsight connector, including instance domain identification, M2M OAuth credential generation, and credential setup in Glean."
fetched_at: "2026-09-01T13:29:26.794Z"
---
On this page

## Set up instructions[​](#set-up-instructions "Direct link to Set up instructions")

### Step 1: Identify your Instance Domain[​](#step-1-identify-your-instance-domain "Direct link to Step 1: Identify your Instance Domain")

Your Gainsight instance domain is the subdomain of your Gainsight URL.

1.  Open your Gainsight instance in a web browser.
2.  Locate the URL in the address bar, which follows this format: `https://<instance-domain>.gainsightcloud.com`
3.  Identify the **Instance Domain**, which is the string preceding `.gainsightcloud.com` (for example, `acme.us2`).

### Step 2: Generate M2M OAuth Credentials[​](#step-2-generate-m2m-oauth-credentials "Direct link to Step 2: Generate M2M OAuth Credentials")

1.  In Gainsight, click the **Administration** icon in the left navigation menu.
2.  Navigate to **Integrations** → **Connectors 2.0**.
3.  Click **Create Connection** and select the **Gainsight API** connector from the dropdown menu.
4.  Name the connection "Glean integration" (or similar) and set the authorization type to **OAuth**.
5.  Click **Generate OAuth Credentials**. An OAuth credentials dialog appears. Save these values securely; you will need them to complete the setup in Glean.
6.  Copy the following values from the dialog:
    -   **Client ID**: Copy the **OAuth API Key**. You will enter this as the **OAuth Client ID** in the next step.
    -   **Client Secret**: Copy the **OAuth API Secret**. You will enter this as the **OAuth Client Secret** in the next step.

### Step 3: Configure credentials in Glean[​](#step-3-configure-credentials-in-glean "Direct link to Step 3: Configure credentials in Glean")

1.  Return to the **Glean Admin console**.
2.  Enter the following values:
    -   **Instance Domain**: The subdomain identified in Step 1.
    -   **OAuth Client ID**: The Client ID generated in Step 2.
    -   **OAuth Client Secret**: The Client Secret generated in Step 2.
3.  Click **Save** to complete the setup.

## See also[​](#see-also "Direct link to See also")

-   [Gainsight overview](/connectors/native/gainsight/about)
