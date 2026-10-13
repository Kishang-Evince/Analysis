---
url: "https://docs.glean.com/connectors/native/salesloft/setup"
canonical: "https://docs.glean.com/connectors/native/salesloft/setup"
title: "Salesloft setup"
description: "Configure the Glean Salesloft connector with a private application and OAuth 2.0 client credentials."
fetched_at: "2026-10-13T08:50:14.258Z"
---
On this page

Connect Salesloft to Glean with a private application that uses the OAuth 2.0 Client Credentials grant. Create the application with a Salesloft administrator who has enough workspace-wide access for Glean to index the records you need.

## Requirements[​](#requirements "Direct link to Requirements")

Before you begin, make sure you have:

-   A Glean **Admin** account that can add and configure connectors.
-   A Salesloft **Super Admin** or **Team Admin** account, or an equivalent role with permission to create private applications and access the required workspace data.
-   Permission to create OAuth applications in Salesloft.

## Step 1: Create a private application in Salesloft[​](#step-1-create-a-private-application-in-salesloft "Direct link to Step 1: Create a private application in Salesloft")

1.  In Salesloft, navigate to **Account → Your Applications → OAuth Applications**.
    
2.  Click **Create New**.
    
3.  Enter an application name and description, such as `Glean`.
    
4.  For **Application Type**, select the internal application option, not a public frontend integration.
    
5.  For **Grant Type**, select **Client Credentials**.
    
6.  Select all of the following scopes:
    
    | Scope | Used to index |
    | --- | --- |
    | `team:read` | Team, user, group, role, and access metadata |
    | `people:read` | People |
    | `accounts:read` | Accounts |
    | `cadences:read` | Cadences |
    | `emails:read` | Activity emails |
    | `calls:read` | Activity calls |
    | `notes:read` | Notes |
    | `tasks:read` | Tasks |
    | `meetings:read` | Meetings |
    | `email_contents` and `email_bodies` | Activity-email subjects and bodies |
    
7.  Submit the application.
    
8.  Copy the **Application ID (Client ID)** and **Secret (Client Secret)**. Store the secret securely.
    

caution

The access token inherits the permissions of the account that creates the private application. Create the application with workspace-wide access, or Glean may index only the records that account can access.

## Step 2: Add the credentials in Glean[​](#step-2-add-the-credentials-in-glean "Direct link to Step 2: Add the credentials in Glean")

1.  In Glean, go to **Admin console → Connectors → Add connector**.
2.  Select **Salesloft**.
3.  Enter a display name for the connector.
4.  Paste the Salesloft **Application ID (Client ID)** into **Application ID (Client ID)**.
5.  Paste the Salesloft **Secret (Client Secret)** into **Client secret**.
6.  Click **Save**.

## Step 3: Authorize Glean[​](#step-3-authorize-glean "Direct link to Step 3: Authorize Glean")

After saving the credentials, click **Authorize**. Glean uses the Client ID and Client Secret to mint and store the workspace access token. The Client Credentials grant does not require you to sign in to Salesloft or complete another consent screen.

Glean validates access by calling the Salesloft team endpoint. If authorization succeeds, Glean displays **Successfully authorized** and the initial crawl can begin.

## Verify the connection[​](#verify-the-connection "Direct link to Verify the connection")

1.  Check the connector status in the Glean **Admin console**.
2.  After the initial crawl, search for a known person, account, cadence, activity, note, task, or meeting.
3.  Open a result and confirm that its link takes you to the corresponding record in Salesloft.
4.  Confirm that users can access only the records allowed by the Salesloft ownership, group, role, and team access settings.

## Update credentials or scopes[​](#update-credentials-or-scopes "Direct link to Update credentials or scopes")

If you rotate the Client Secret or change the application scopes:

1.  Update the **Application ID (Client ID)** or **Client secret** in the Glean connector settings.
2.  Click **Save**.
3.  Click **Authorize** to mint a new workspace access token.
4.  Confirm that validation and the subsequent crawls succeed.

## See also[​](#see-also "Direct link to See also")

-   [Salesloft overview](/connectors/native/salesloft/about)
-   [Salesloft troubleshooting and FAQs](/connectors/native/salesloft/troubleshooting)
