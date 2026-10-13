---
url: "https://docs.glean.com/connectors/native/outlook-calendar/setup"
canonical: "https://docs.glean.com/connectors/native/outlook-calendar/setup"
title: "Set up Outlook Calendar"
description: "Register a Microsoft Entra app and configure certificate or client-secret authentication for a new Outlook Calendar connection"
fetched_at: "2026-10-13T08:50:08.763Z"
---
On this page

Connect Outlook Calendar to Glean without setting up the Glean Teams connector. Use this procedure for a new standalone connection.

Existing calendar connections

Check the **Admin console** before registering a new app. If Outlook Calendar already appears for your existing Microsoft calendar connection, don't create a duplicate or replace its credentials using this procedure. Contact your Glean account team before changing that connection.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before you start:

-   Use a Microsoft Entra account with the Global Administrator role to complete this setup. You also need permission to manage connectors in the Glean **Admin console**. Review [Outlook Calendar permissions](/connectors/native/outlook-calendar/permissions).
-   For background crawling, use Microsoft 365 calendar accounts with an enabled Exchange service. Glean skips guest accounts and accounts without an enabled Exchange plan by default.
-   For meeting transcripts, involve a Teams Administrator or Global Administrator who can configure meeting policies and transcript API access. Microsoft Teams administration doesn't require you to configure the Glean Teams connector.

## Register the Microsoft Entra app[​](#register-the-microsoft-entra-app "Direct link to Register the Microsoft Entra app")

Create an app for the new Outlook Calendar connection, separate from an email or messaging app.

1.  Sign in to the [Azure portal](https://portal.azure.com/). Go to **Microsoft Entra ID → App registrations → New registration**.
2.  Enter a name such as `Glean Outlook Calendar App`. Select **Accounts in this organizational directory only (Single tenant)**, and leave **Redirect URI** blank.
3.  Click **Register**.
4.  From the app's **Overview**, record the **Directory (tenant) ID** and **Application (client) ID**.
5.  Go to **API permissions → Add a permission → Microsoft Graph → Application permissions**. Add `User.Read.All`, `GroupMember.Read.All`, `Calendars.Read`, `OnlineMeetings.Read.All`, and `OnlineMeetingTranscript.Read.All`.
6.  Ask a Global Administrator or Privileged Role Administrator to click **Grant admin consent** for your tenant. Confirm that consent is granted for all five permissions.

## Prepare authentication[​](#prepare-authentication "Direct link to Prepare authentication")

Choose one authentication method. The Glean setup form selects certificate-based authentication by default.

### Use a certificate[​](#use-a-certificate "Direct link to Use a certificate")

Generate a certificate and an unencrypted `PKCS#8` private key, then upload the certificate to the app registration. Protect the private key as a credential.

1.  Run these commands in a secure working directory with OpenSSL installed:
    
    ```
    openssl genrsa -out tempprivatekey.key 2048openssl pkcs8 -topk8 -inform PEM -outform PEM -in tempprivatekey.key -out privatekey.key -nocryptopenssl req -new -key privatekey.key -out request.csropenssl x509 -req -days 365 -in request.csr -signkey privatekey.key -out certificate.crt
    ```
    
2.  Confirm that both files exist. The certificate must use `PEM` encoding, and the private key must use unencrypted `PKCS#8` format rather than `PKCS#1` format.
    
3.  In the app registration, go to **Certificates & secrets → Certificates → Upload certificate**. Upload `certificate.crt`. Don't upload the private key to Microsoft Entra.
    

Keep `certificate.crt` and `privatekey.key` available for the Glean setup. Follow your organization's credential-storage and rotation policies.

### Use a client secret[​](#use-a-client-secret "Direct link to Use a client secret")

If you choose client-secret authentication instead:

1.  In the app registration, go to **Certificates & secrets → Client secrets → New client secret**.
2.  Enter a description, select an expiration that meets your organization's policy, and click **Add**.
3.  Copy the secret's **Value**, not its **Secret ID**. Microsoft displays the value only once. Store it securely for the Glean setup.

## Configure transcript access[​](#configure-transcript-access "Direct link to Configure transcript access")

To retrieve Microsoft Teams meeting transcripts, configure an application access policy and turn on transcript API access. These Microsoft controls are separate from calendar-event read permissions.

### Configure the application access policy[​](#configure-the-application-access-policy "Direct link to Configure the application access policy")

Have your Microsoft administrator review existing application access policies before changing them. The policy must include the Outlook Calendar app's **Application (client) ID** and cover the relevant meeting organizers.

1.  Install [PowerShell](https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell) if needed. In PowerShell, install and connect to the Microsoft Teams module:
    
    ```
    Install-Module MicrosoftTeamsImport-Module MicrosoftTeamsConnect-MicrosoftTeams
    ```
    
2.  Create a policy for the app. Replace `<client_id>` with its **Application (client) ID**:
    
    ```
    New-CsApplicationAccessPolicy -Identity Glean-Meetings-App-Policy -AppIds "<client_id>" -Description "Glean Meetings App Policy"
    ```
    
3.  Assign the policy to the users whose meetings the app needs to access. If your organization approves a global assignment, run:
    
    ```
    Grant-CsApplicationAccessPolicy -PolicyName Glean-Meetings-App-Policy -Global
    ```
    

A global assignment applies to users without an individually assigned application access policy. It doesn't override their existing assignments. If a user has another policy, add the Glean app to the appropriate policy rather than removing the existing assignment. See [OUTLOOK-CALENDAR\_2](/troubleshooting/error-codes/microsoft/outlook-calendar/outlook-calendar-2#add-the-glean-app-to-a-users-overriding-application-access-policy).

Policy changes can take up to 30 minutes to affect Microsoft Graph calls. See Microsoft's [Configure application access policy](https://learn.microsoft.com/en-us/graph/cloud-communication-online-meeting-application-access-policy#configure-application-access-policy) for per-user assignment and policy details.

### Enable transcript API access[​](#enable-transcript-api-access "Direct link to Enable transcript API access")

Microsoft Graph access to meeting transcripts is off by default. Glean can't retrieve transcript content until you turn it on, even if the app has the required permissions and application access policy. This Microsoft setting is separate from Glean's **Enable Transcript Content Crawling** option.

Ask a Teams Administrator or Global Administrator to configure transcript access:

1.  In the [Teams admin center](https://admin.teams.microsoft.com/), go to **Meetings → Meeting settings**.
2.  Under **Transcript API access**, turn on **Microsoft Graph access**.
3.  Click **Configure**. Use the link to the **Microsoft Entra admin center** to check that the Outlook Calendar app isn't blocked.
4.  (Optional) Turn on **Include speaker attribution** to include speaker names in transcripts.

Speaker attribution isn't required for transcript text. Microsoft Graph access, application permissions, and the application access policy are still required. See Microsoft's [Manage transcript API access for Teams meetings](https://learn.microsoft.com/en-us/microsoftteams/meeting-transcript-api-access).

## Connect the app to Glean[​](#connect-the-app-to-glean "Direct link to Connect the app to Glean")

1.  In Glean, go to **Admin console → Connectors → Add connector** and select **Outlook Calendar**.
2.  Enter a **Name** for the connection.
3.  Enter the app's **Directory (tenant) ID** and **Application (client) ID**.
4.  Under **Authentication method (choose one)**, select the method you prepared:
    -   **Certificate-based authentication**: use **Upload Certificate File** for `certificate.crt` and **Upload Private Key File** for `privatekey.key`.
    -   **Client secret authentication**: enter the secret value in **Client secret**.
5.  Review **Enable Transcript Content Crawling**. It controls background content fetching for transcripts already associated with crawled calendar events, not the required permissions.
6.  Click **Save** and resolve any validation errors. Complete the sync or crawl step shown by your setup flow.

If Outlook Calendar isn't available in your **Admin console**, contact your Glean account team. Don't create a Teams connector as a workaround for the standalone setup.

## Verify the connection[​](#verify-the-connection "Direct link to Verify the connection")

Validate calendar lookup and indexing separately:

1.  Ask Glean about a known meeting in your own Outlook calendar. Check its date and participants against Outlook.
2.  If calendar indexing is enabled, wait for the initial crawl to complete and search for a meeting within the crawl scope.
3.  If transcript access is configured, ask about a meeting that has a transcript in Microsoft Teams and that you're authorized to access.
4.  If a check fails, review [Troubleshoot Outlook Calendar](/connectors/native/outlook-calendar/troubleshooting). A successful event lookup doesn't prove that transcript access works.
