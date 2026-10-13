---
url: "https://docs.glean.com/connectors/native/fathom/setup"
canonical: "https://docs.glean.com/connectors/native/fathom/setup"
title: "Fathom setup"
description: "Requirements and step-by-step configuration for the Fathom connector in Glean."
fetched_at: "2026-10-13T08:49:50.594Z"
---
On this page

Set up Fathom in three steps in the **Admin console**: register a Fathom OAuth app, enter its credentials, and authorize with a Fathom account admin. After that, ask each user to authorize their own Fathom account. Those authorizations determine how many meetings Glean can index.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   **Glean permissions:** Glean administrator privileges to manage connectors.
-   **A Fathom account admin:** the Fathom account you authorize in Step 3 is the account Glean uses to read your Fathom user list, and Fathom restricts that API to account admins. Complete this setup as a Fathom account admin.
-   **Access to Fathom's API settings:** you register the OAuth app yourself from **Settings → API access** in Fathom. Glean doesn't ship a pre-registered Fathom app.

## Step 1: Register an OAuth app in Fathom[​](#step-1-register-an-oauth-app-in-fathom "Direct link to Step 1: Register an OAuth app in Fathom")

1.  Sign in to Fathom as an account admin.
2.  Go to **Settings**.
3.  Under **My settings**, scroll to **API access** and click **Add**.
4.  Select **Create public app**.
5.  Enter an **App name** (for example, `Glean`), a short **Description**, and upload a **Logo**. Fathom shows these to your users when they authorize the app.
6.  Set the **Production redirect URL** to the redirect URL that Glean shows on the Fathom setup page in the **Admin console**. Glean displays the exact value for your deployment, ending in `/oauth/instance/verify_code`. Don't construct this URL by hand.
7.  Click **Register app**.
8.  Copy the **Client ID** and **Client secret** that Fathom displays.

Glean requests Fathom's single OAuth scope, `public_api`, for read-only access. You don't select a scope during registration.

## Step 2: Enter the credentials in Glean[​](#step-2-enter-the-credentials-in-glean "Direct link to Step 2: Enter the credentials in Glean")

1.  In Glean, go to **Admin console → Connectors → Add connector** and select **Fathom**.
2.  Enter a display name. This is the name your organization sees for Fathom in search results.
3.  Paste the client ID into **OAuth Client ID** and the client secret into **OAuth Client Secret**.
4.  Click **Save**.

## Step 3: Authorize with a Fathom account admin[​](#step-3-authorize-with-a-fathom-account-admin "Direct link to Step 3: Authorize with a Fathom account admin")

Click **Authorize** and sign in to Fathom with an account admin.

Glean uses this authorization to read your Fathom user list and index the meetings that the authorized account can see. Fathom restricts its user list API to account admins. If you authorize with a non-admin account, Fathom rejects the user-list request, Glean can't discover your Fathom users, and Glean doesn't prompt those users to authorize their own accounts.

## Step 4: Roll out authorization to your users[​](#step-4-roll-out-authorization-to-your-users "Direct link to Step 4: Roll out authorization to your users")

Fathom has no admin API for reading other people's recordings, so Glean indexes a meeting only when an authorized user's own Fathom account returns it.

Glean may prompt users to connect Fathom in two places: through a banner on the search results page and through the Fathom connector in **Settings → Connectors**. Connecting sends the user to Fathom's own authorization screen, so there's no API key for anyone to copy. Once a user approves, Glean indexes that user's accessible meetings during a subsequent crawl. The connector processes meetings according to its crawl schedule, and Fathom API limits can delay processing. Users who dismiss the search-results banner can still connect Fathom from **Settings → Connectors**.

Plan for this when you estimate coverage. Until a user authorizes, Glean doesn't show that user their Fathom meetings. Another user's authorization may still add those meetings to the index. Glean indexes a meeting only when at least one authorized user's Fathom account returns it.

Glean never prompts users missing from your Fathom user list, and it doesn't show those users an error. If Glean can't read the Fathom user list, it can't discover users or prompt them to authorize their accounts. Authorize the connector with a Fathom account admin. For how access is derived from these authorizations, see [Fathom overview](/connectors/native/fathom/about#permissions).

## See also[​](#see-also "Direct link to See also")

-   [Fathom overview](/connectors/native/fathom/about)
-   [Fathom troubleshooting and FAQs](/connectors/native/fathom/troubleshooting)
