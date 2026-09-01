---
url: "https://docs.glean.com/connectors/native/teams/setup"
canonical: "https://docs.glean.com/connectors/native/teams/setup"
title: "Set up the Teams connector"
description: "Register the Azure app, grant permissions, and configure the Microsoft Teams connector in Glean."
fetched_at: "2026-09-01T13:29:45.186Z"
---
On this page

This section covers setup requirements, permissions, and configuration for the Microsoft Teams connector.

## Before you start[​](#before-you-start "Direct link to Before you start")

Have these in place before you configure the connector, so your IT or security team can approve everything in one request:

-   **Global Administrator:** The person performing setup must be a [Microsoft 365 Global Administrator](https://learn.microsoft.com/en-us/microsoft-365/admin/add-users/about-admin-roles?view=o365-worldwide#commonly-used-microsoft-365-admin-center-roles) (to register the app and grant admin consent) and a **Glean admin** who can add and configure connectors.
-   **A Microsoft 365 tenant with Teams enabled** — plus the ability to register an application in Microsoft Entra ID (Azure Active Directory) with access to Microsoft Graph API v1.0.
-   **Authentication credentials** — a client certificate and PKCS#8 private key (recommended) or a client secret, plus your application (client) ID and directory (tenant) ID. Glean recommends certificate-based authentication because Microsoft is phasing out client-secret authentication for these APIs, though client secrets still work.
-   **Graph permissions approved in advance** — an admin must consent to a set of read-only Microsoft Graph application permissions. Share the [required permissions](#required-permissions) with your CISO or security team before you start. Optional features add scopes: **private and meeting chats** and **meeting transcripts** each need their own permissions, so decide which you want up front to avoid a second IT request.

## Required permissions[​](#required-permissions "Direct link to Required permissions")

Grant admin consent for the following Microsoft Graph **application** permissions. Toggle any optional features you plan to enable so your security team can approve everything in a single request.

**Tell us what you need, and we’ll build the request.**

The baseline permissions are always included. Select any extras below and the permission set updates instantly. Then copy it to hand to your IT or security team, so every scope is requested in one pass.

Index Teams channels and messagesAlways includedReads channel messages, membership, and identity data for search indexing.Private and meeting chatsIndex private (direct) and meeting chat messages. Enable in connector settings under "Allow crawling Teams private chats" and "Allow crawling Teams meeting chats".Meeting transcriptsIndex Teams meeting transcripts. Requires an application access policy granted globally in Teams admin — see Meeting transcripts for setup details.

Permissions to request from ITCopy request

Microsoft Graph API Application

-   `User.Read.All`Reads tenant user profiles for identity resolution.
-   `GroupMember.Read.All`Reads Microsoft 365 group membership to discover teams and resolve team access.
-   `Team.ReadBasic.All`Lists teams and reads team metadata.
-   `ChannelSettings.Read.All`Lists channels and reads channel metadata.
-   `ChannelMember.Read.All`Reads channel membership to enforce access.
-   `ChannelMessage.Read.All`Reads channel messages and replies, and subscribes to message change notifications for freshness.

## Known limitations[​](#known-limitations "Direct link to Known limitations")

-   This connector doesn't cover SharePoint-backed team sites; SharePoint handles the associated file uploads.
-   **Glean doesn't support cross-tenant or external Teams content.** Glean crawls only Teams content that belongs to the Microsoft 365 tenant where you configure the connector.
-   Glean doesn't index transcripts for meetings organized ad hoc directly from Teams channels (those not accessible through Outlook).

## Setup steps[​](#setup-steps "Direct link to Setup steps")

### Microsoft Teams setup (Azure)[​](#microsoft-teams-setup-azure "Direct link to Microsoft Teams setup (Azure)")

Before configuring the connector in Glean, register and configure an application in Microsoft Entra ID.

#### 1\. Register an application[​](#1-register-an-application "Direct link to 1. Register an application")

1.  Sign in to the [Azure portal](https://portal.azure.com/). Select **Microsoft Entra ID**, then **Manage → App registrations → New registration**.
    
2.  On the **Register an application** page, register an app with the following:
    
    | Field | Value |
    | --- | --- |
    | Name | `Glean MSFT Teams App (for messages)` |
    | Supported account types | Accounts in this organizational directory only (Single tenant) |
    | Redirect URI | (Leave this field blank) |
    
3.  Click **Register**.
    

#### 2\. Add and grant API permissions[​](#2-add-and-grant-api-permissions "Direct link to 2. Add and grant API permissions")

1.  On the left navigation of the overview page, click **Manage → API permissions**.
    
2.  Click **Add a permission** and select **Microsoft Graph**. Choose **Application permissions** and add the [required permissions](#required-permissions).
    
3.  After you add all permissions, click **Grant admin consent for tenant**.
    

#### 3\. Generate a certificate and private key[​](#3-generate-a-certificate-and-private-key "Direct link to 3. Generate a certificate and private key")

Generate a certificate and a PKCS#8 private key using OpenSSL. OpenSSL is installed by default on macOS and Linux. On Windows, install a [third-party OpenSSL build](https://wiki.openssl.org/index.php/Binaries) and add its `\bin` directory to your PowerShell `PATH`.

1.  Run the following commands. Microsoft requires the certificate to be verified with a private key in PKCS#8 syntax.
    
    ```
    openssl genrsa -out tempprivatekey.key 2048openssl pkcs8 -topk8 -inform PEM -outform PEM -in tempprivatekey.key -out privatekey.key -nocryptopenssl req -new -key privatekey.key -out request.csropenssl x509 -req -days 365 -in request.csr -signkey privatekey.key -out certificate.crt
    ```
    
2.  Verify that both `certificate.crt` and `privatekey.key` conform to these formats:
    
    -   `certificate.crt` starts with a `BEGIN CERTIFICATE` header and ends with an `END CERTIFICATE` footer.
    -   `privatekey.key` starts with a `BEGIN PRIVATE KEY` header and ends with an `END PRIVATE KEY` footer. It must **not** include `RSA` in the header and must not be encrypted.
    
    warning
    
    The private key must be in **PKCS#8** format. A PKCS#1 key (a `BEGIN RSA PRIVATE KEY` header) uploads successfully but fails when you save the connector. Convert it with: `openssl pkcs8 -topk8 -inform PEM -outform PEM -in privatekey.key -out privatekey_pkcs8.key -nocrypt`.
    

#### 4\. Upload the certificate to Azure[​](#4-upload-the-certificate-to-azure "Direct link to 4. Upload the certificate to Azure")

1.  Navigate back to **Microsoft Entra ID → Manage → App registrations** and select the app you created. Then click **Manage → Certificates & secrets**.
    
2.  Select the **Certificates** tab and click **Upload certificate**.
    
3.  Upload the `certificate.crt` file you generated.
    
4.  Click **Overview** and copy the **Application (client) ID** and **Directory (tenant) ID**; you'll enter these in Glean.
    
    note
    
    In deployments that use more than one Entra ID app registration, upload the same certificate to **every** app registration.
    

#### Client secret setup (alternative)[​](#client-secret-setup-alternative "Direct link to Client secret setup (alternative)")

Instead of a certificate, you can authenticate with a client secret:

1.  After granting admin consent, go to **Manage → Certificates & secrets** and click **New client secret**. Enter a description, select **24 months** for expiry, then click **Add**.
    
2.  Copy the **Value** (not the **Secret ID**) — it is shown only once.
    

### Configure Glean[​](#configure-glean "Direct link to Configure Glean")

#### 1\. Start connector setup[​](#1-start-connector-setup "Direct link to 1. Start connector setup")

1.  In the Glean **Admin console**, go to **Connectors → Add connector**.
2.  Search for **Microsoft Teams** and select the connector.
3.  Provide a **Name** and optional **Icon** for the connector.

#### 2\. Provide credentials[​](#2-provide-credentials "Direct link to 2. Provide credentials")

-   **Directory (tenant) ID**
-   **Application (client) ID**
-   For **certificate-based authentication**: upload the **Client certificate** (`certificate.crt`) and the **Private key** (`privatekey.key`, PKCS#8).
-   For **client secret authentication**: enter the **Client secret** value you generated.

#### 3\. Configure optional crawl settings[​](#3-configure-optional-crawl-settings "Direct link to 3. Configure optional crawl settings")

-   **Allow crawling Teams private chats** — enables crawling of private (direct) messages.
-   **Allow crawling Teams meeting chats** — enables crawling of meeting chat messages.

#### 4\. Save and start the initial crawl[​](#4-save-and-start-the-initial-crawl "Direct link to 4. Save and start the initial crawl")

Click **Save** to complete setup. Glean starts an initial crawl of Teams content.

## Meeting transcripts (optional)[​](#meeting-transcripts-optional "Direct link to Meeting transcripts (optional)")

Glean can index Microsoft Teams meeting transcripts. This requires additional permissions and a Microsoft application access policy granted globally. See [Teams transcripts](/connectors/native/teams/teams-transcripts).

warning

The application access policy must be created with the **transcript app's** Application (client) ID and granted globally (`Grant-CsApplicationAccessPolicy -Global`). Policy changes can take 24–48 hours to propagate.

## Supported API endpoints[​](#supported-api-endpoints "Direct link to Supported API endpoints")

| Endpoint | Permissions | Purpose |
| --- | --- | --- |
| `GET /users` | `User.Read.All` | Reads all user profiles for identity crawl. |
| `GET /groups` | `GroupMember.Read.All` | Lists groups, discovering Microsoft 365 groups provisioned as teams. |
| `GET /groups/{groupId}/members` | `GroupMember.Read.All` | Reads direct backing-group memberships for team access. |
| `GET /users/{userId}/teamwork/associatedTeams` | `Team.ReadBasic.All` | Lists teams associated with a user. |
| `GET /teams/{teamId}/channels` | `ChannelSettings.Read.All` | Lists channel metadata. |
| `GET /teams/{teamId}/channels/{channelId}/members` | `ChannelMember.Read.All` | Reads channel membership. |
| `GET /teams/{teamId}/channels/{channelId}/messages` | `ChannelMessage.Read.All` | Reads channel root messages. |
| `GET /teams/{teamId}/channels/{channelId}/messages/delta` | `ChannelMessage.Read.All` | Reads channel message delta pages. |
| `POST /subscriptions` | `ChannelMessage.Read.All` | Creates change-notification subscriptions. |
| `GET /users/{userId}/chats` | `Chat.Read.All` | Lists chats when private or meeting chat crawl is enabled. |
| `GET /chats/{chatId}/messages` | `Chat.Read.All` | Reads private or meeting chat messages. |

**Meeting transcripts** additionally use:

| Endpoint | Purpose | Permission |
| --- | --- | --- |
| `/me/calendars`, `/me/calendar/calendarView` | Read calendars and calendar events | `Calendars.Read` |
| `/me/onlineMeetings` | Read online meetings | `OnlineMeetings.Read.All` |
| `/me/onlineMeetings/{id}/transcripts` | Read meeting transcripts | `OnlineMeetingTranscript.Read.All` |

## Crawling and freshness[​](#crawling-and-freshness "Direct link to Crawling and freshness")

-   **Full crawls** re-enumerate teams, channels, chats, and supported content.
-   **Incremental crawls** fetch newly created and recently updated content since the last crawl.
-   **Real-time updates** — Glean subscribes to Microsoft Graph change notifications (webhooks) for near real-time channel content updates, subject to Microsoft subscription limits.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Save fails after uploading the private key

The private key must be in **PKCS#8** format (a `BEGIN PRIVATE KEY` header). Convert a PKCS#1 key with:

```
openssl pkcs8 -topk8 -inform PEM -outform PEM -in privatekey.key -out privatekey_pkcs8.key -nocrypt
```

### "Certificate is not authorized"

The certificate has not been uploaded to the Entra ID app registration. In deployments with more than one app registration, upload the same certificate to **every** app.

### "Private key does not match the certificate"

The uploaded private key does not correspond to the uploaded certificate. Make sure `privatekey.key` and `certificate.crt` are the matching pair generated together in [step 3](#3-generate-a-certificate-and-private-key).

### Meeting transcripts are not appearing (TEAMS-2)

Transcripts require an application access policy granted globally. See [Teams transcripts](/connectors/native/teams/teams-transcripts) and the [TEAMS-2 error reference](/troubleshooting/error-codes/microsoft/teams/teams-2).

### Some users do not see Teams content they expect

Confirm the user is a member of the relevant teams, channels, or chats, and that the required Graph permissions were granted and admin-consented.
