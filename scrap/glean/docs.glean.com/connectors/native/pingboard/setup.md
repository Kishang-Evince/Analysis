---
url: "https://docs.glean.com/connectors/native/pingboard/setup"
canonical: "https://docs.glean.com/connectors/native/pingboard/setup"
title: "Pingboard setup"
description: "Set up the Pingboard connector in Glean."
fetched_at: "2026-09-01T13:29:38.081Z"
---
On this page

### Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Your company must be on a *Pro plan* in order to have API access.
-   Administrator access to create a service account.

### Steps[​](#steps "Direct link to Steps")

#### Create a service account[​](#create-a-service-account "Direct link to Create a service account")

1.  Log in to your Pingboard account as a Pingboard administrator.
2.  Click the **Add-Ons** tab, select **API**.
3.  Click **Manage Service Accounts** button under **Service Accounts**.
4.  Click **Add Service Account**. For the added Service Account:
    1.  Add a recognizable name such as *Glean*.
    2.  Set permissions as **Regular User**.
5.  After the account is created, you will have access to the following:
    -   Client Id
    -   Client Secret
6.  Save the Client ID and Client Secret.

#### Connect Pingboard to Glean[​](#connect-pingboard-to-glean "Direct link to Connect Pingboard to Glean")

1.  In the Glean **Admin console**, click **Other**.
2.  In *Connect all your Tools* section:
    -   Toggle to **Config** and enter:
        -   Key name: *pingboard.domain*
        -   Key value: Enter the Client ID. Enter only the subdomain part of your Pingboard URL, for example, *subdomain*.pingboard.com
        -   Click **Submit**.
    -   Toggle to **Secret** section:
        -   Key name: *PINGBOARD\_CLIENT\_SECRET*
        -   Key value: enter the value from the Pingboard Client Secret.
        -   Click **Submit**.
3.  Click **Save**.
