---
url: "https://docs.glean.com/connectors/native/greenhouse/setup"
canonical: "https://docs.glean.com/connectors/native/greenhouse/setup"
title: "Greenhouse setup"
description: "Set up the Greenhouse connector in Glean."
fetched_at: "2026-09-01T13:29:31.872Z"
---
On this page

Connector setup is performed primarily within the Glean admin console, with some tools in the Greenhouse admin UI. Most fields needed for secure API access are entered through Glean’s deployment interface, while credential controls remain with the Greenhouse site admin.

### Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Greenhouse site admin account with privileges to manage API keys and webhooks.
-   Glean Admin Console access.
-   The user setting up this connector must be the [Greenhouse Site Admin](https://support.greenhouse.io/hc/en-us/articles/360039614171-Permission-levels-overview).

### Step 1: Generate an API key[​](#step-1-generate-an-api-key "Direct link to Step 1: Generate an API key")

1.  Sign in to Greenhouse and navigate to **My Dashboard** in the top left.
    
2.  Copy the URL in the URL bar and save it for entering it into Glean.
    

note

While copying the URL, delete everything after the **.io** part. Expected format: [https://YourDomain.greenhouse.io](https://YourDomain.greenhouse.io).

3.  In Greenhouse, click the **gear** icon in the top right. It is located between the **+** and **?** icons.
    
4.  Navigate to **Dev Center** → **API Credential Management** and click **Create New API Key**.
    
    -   For **API Type**, select **Harvest**.
    -   For **Partners**, select **Unlisted Vendor**.
    -   For **Description**, enter `Glean Harvest API Key` and click **Manage Permissions**.
5.  Copy the newly created API key and store it. When you have stored the key, navigate to Greenhouse, click **I have stored the API Key**.
    
6.  Under **Manage Permissions**, check **Select All** and click **Save**.
    
    ![](/img/greenhouse-create-api-token-updated.png)

### Step 2: Create a webhook[​](#step-2-create-a-webhook "Direct link to Step 2: Create a webhook")

1.  In **Dev Center**, click **Webhooks** on the left.
    
2.  Repeat steps 4-8 for the following event types:
    
    -   Candidate anonymized
    -   Candidate has been hired
    -   Candidate has been unhired
    -   Candidate has changed stage
    -   Candidate or Prospect rejected
    -   Candidate or Prospect unrejected
    -   Candidate or Prospect updated
    -   Delete Candidate
    -   Job Created
    -   Job Deleted
    -   Job Updated
3.  In the **Name this webhook**, enter **Glean \[Event Type\]**. For example to get the *Delete Candidate* webhook, enter *Glean Delete Candidate*. Under **When**, select the appropriate event type.
    
4.  Enter the **Endpoint URL**. For example, `https://tenant_id-be.glean.com/instance/GREENHOUSE/event`.
    
    Copy your full backend URL from [app.glean.com/admin/about-glean](https://app.glean.com/admin/about-glean) under **Server instance (QE)**, and replace [https://tenant\_id-be.glean.com](https://tenant_id-be.glean.com) with it.
    
5.  In the **Secret Key**, enter the webhook secret from step 1.
    
6.  In the **Error recipient email** field, specify the email address to receive the alerts.
    
7.  Leave the **Deactivated** option as *No*.
    
8.  Click **Create Webhook**.
    
    ![](/img/greenhouse-create-webhooks-updated.png)

### Step 3: Connect Greenhouse and Glean[​](#step-3-connect-greenhouse-and-glean "Direct link to Step 3: Connect Greenhouse and Glean")

1.  As an admin, navigate to the Glean **Admin console**.
2.  Click **Add connector** and select Greenhouse.
3.  In the **Setup** tab, add the required information gathered from the previous sections:
    -   Connector name: keep the name such that the users understand that this connector is used for Glean.
    -   Greenhouse Base URL
    -   Harvest API Key
    -   Webhook Secret
4.  Click **Save**.

If you encounter any configuration issues or require further assistance, contact the [Glean support team](https://support.glean.com/hc/en-us/requests/new).
