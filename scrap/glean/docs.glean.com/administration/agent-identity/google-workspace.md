---
url: "https://docs.glean.com/administration/agent-identity/google-workspace"
canonical: "https://docs.glean.com/administration/agent-identity/google-workspace"
title: "Set up Google Workspace service credential"
description: "Let Glean agents access Google Drive, Docs, Sheets, Calendar, and Gmail using a Google Workspace service identity."
fetched_at: "2026-09-01T13:28:59.112Z"
---
On this page

A Google Workspace service credential lets a Glean agent access Google Drive, Docs, Sheets, Calendar, and Gmail through Google Workspace Representational State Transfer (REST) APIs using an admin-managed identity.

Choose one of these identity modes:

-   Service account: The agent acts as a service account to access content explicitly shared with its email address.
-   Domain-wide delegation: The agent impersonates a specific Google Workspace user to access that user's Drive, Docs, Sheets, Calendar, and Gmail.
-   OAuth refresh token: The agent acts as a dedicated Google Workspace user through a stored OAuth refresh token.

Glean handles authentication automatically. The platform manages credentials and tokens server side, preventing the agent from receiving raw client secrets, refresh tokens, or service account keys.

For service account and domain-wide delegation credentials, Glean obtains separate tokens for each Google Workspace API scope and caches them by credential and scope. Glean reuses cached tokens until they near expiration. For OAuth credentials, Glean reuses one cached token containing all scopes granted during consent.

note

Glean does not enable any of the three Google Workspace service credential templates by default. A deployment specific greenlist entry is required before they appear in the service credential list. Contact your Glean representative if the templates are not available for your deployment.

## Authentication modes[​](#authentication-modes "Direct link to Authentication modes")

| Mode | Agent identity | Access model | Gmail |
| --- | --- | --- | --- |
| Service account | Service account | Shared files, folders, shared drives, and calendars | Unavailable |
| Domain-wide delegation | Specific Workspace user | Impersonated user's Drive, Docs, Sheets, Calendar, and Gmail | Read-only |
| OAuth refresh token | Dedicated Workspace user | Any resources accessible to the dedicated user | Read-only |

Service account and domain-wide delegation modes accept either workload identity authentication or a JSON key:

-   Workload identity authentication: Glean's Query Endpoint impersonates the service account using workload identity. You do not need to store a service account key.
-   JSON key: Upload a service account JSON key to Glean when workload identity is unavailable.

If you provide both `service_account_email` and `service_account_json_key`, the JSON key takes precedence. Provide only one authentication method.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Ensure you have the following before starting setup:

-   A GCP project for the service account.
-   A Glean administrator account with credential creation permissions.
-   Google Workspace administrator access for domain-wide delegation setup.
-   Local installation of `gcloud`, authenticated for command-line setup.
-   The Glean Query Endpoint service account for your deployment when configuring workload identity. Follow [Identify the Glean Query Endpoint service account](/administration/agent-identity/gcp-service-account#step-1-identify-the-glean-query-endpoint-service-account) to find it.
-   The required Google Workspace APIs enabled in your GCP project:
    -   Drive API
    -   Docs API
    -   Sheets API
    -   Calendar API
    -   Gmail API, if the agent will access Gmail

Workload identity authentication requires a GCP deployment. Use the JSON key option for AWS or Azure deployments.

### Enable Google Workspace APIs[​](#enable-google-workspace-apis "Direct link to Enable Google Workspace APIs")

Run the following commands to configure your project and enable the required services:

```
export PROJECT_ID="my-gcp-project"gcloud config set project "$PROJECT_ID"gcloud services enable \  drive.googleapis.com \  docs.googleapis.com \  sheets.googleapis.com \  calendar-json.googleapis.com \  gmail.googleapis.com
```

## Step 1: Choose a Google Workspace identity[​](#step-1-choose-a-google-workspace-identity "Direct link to Step 1: Choose a Google Workspace identity")

Select the identity mode that fits your agent's required access model:

-   Bare service account: Use when the agent needs access to specific shared files, folders, shared drives, or calendars.
-   Domain-wide delegation: Use when the agent needs to impersonate a specific Workspace user or read that user's Gmail.
-   OAuth: Use when the agent must act as a dedicated real Workspace user without a service account.

For security and auditing, isolate bare service accounts from domain-wide delegation accounts.

important

Select and complete only one path based on the identity mode you selected above. After completing your selected path, continue to Step 2 if you selected workload identity authentication, or to Step 3 if you selected JSON-key or OAuth authentication.

-   Service account
-   Domain-wide delegation
-   OAuth refresh token

Use this mode to grant access to specific Drive files, Docs, Sheets, or calendars shared with the service account email. Bare service accounts do not have mailboxes and cannot access Gmail.

### Create the service account[​](#create-the-service-account "Direct link to Create the service account")

1.  Open **Identity and Access Management (IAM) & Admin → Service Accounts** in the Google Cloud Console.
2.  Select **Create service account**.
3.  Enter a name, such as `glean-agent-workspace-sa`.
4.  Select **Create and continue**.
5.  Skip granting GCP IAM roles. Grant Workspace access directly by sharing content with the service account email.
6.  Do not enable domain-wide delegation on this account.
7.  Select **Done**.
8.  Save the service account email as `SA_EMAIL` for subsequent CLI steps.

### Grant access to Workspace content[​](#grant-access-to-workspace-content "Direct link to Grant access to Workspace content")

Share required resources with the service account email:

-   **Drive, Docs, and Sheets**: Share files, folders, or shared drives directly. Assign **Viewer** for read operations or **Editor** for create and update operations.
-   **Calendar**: Open Google Calendar **Settings → Share with specific people**, then add the service account email. Assign **See all event details** for read access or **Make changes to events** for write access.

Use the Calendar `calendarList` API to discover shared calendars. Do not assume primary calendar endpoints contain target user data.

### Configure authentication[​](#configure-authentication "Direct link to Configure authentication")

Choose exactly one authentication option below:

-   Workload identity
-   JSON key

1.  Grant the **Service Account Token Creator** role on your target service account to the Glean Query Endpoint account. Complete [Step 2: Grant Query Endpoint impersonation rights](#step-2-grant-query-endpoint-impersonation-rights) after you finish this tab.
2.  Continue to [Step 3: Create the service credential in Glean](#step-3-create-the-service-credential-in-glean) and enter `service_account_email`.

1.  Generate a JSON key:

```
gcloud iam service-accounts keys create glean-workspace-sa.json \  --iam-account="$SA_EMAIL"
```

2.  Continue to [Step 3: Create the service credential in Glean](#step-3-create-the-service-credential-in-glean) and enter the key payload in `service_account_json_key` instead of filling in `service_account_email`.

warning

Service account JSON keys act as long-lived credentials. Secure keys, avoid committing them to source repositories, and rotate them regularly.

Use this mode when agents impersonate Workspace users to access Drive, Docs, Sheets, Calendar, or read Gmail. Domain Wide Delegation (DWD) allows service accounts to assume user identities.

### Create a dedicated service account[​](#create-a-dedicated-service-account "Direct link to Create a dedicated service account")

1.  Open **Identity and Access Management (IAM) & Admin → Service Accounts** in the Google Cloud Console.
2.  Select **Create service account**.
3.  Enter a name, such as `glean-agent-workspace-dwd`.
4.  Select **Done**.
5.  Save the service account email, numeric Unique ID, and OAuth 2.0 Client ID.
6.  Find the OAuth 2.0 Client ID under the account's **Advanced settings**. Do not substitute the numeric Unique ID for the OAuth 2.0 Client ID.
7.  Do not reuse the bare service account for domain-wide delegation tasks.

Use the OAuth 2.0 Client ID during delegation configuration.

### Authorize domain-wide delegation[​](#authorize-domain-wide-delegation "Direct link to Authorize domain-wide delegation")

1.  Sign in to the Google Admin console using super administrator credentials.
2.  Navigate to **Security → Access and data control → API controls**.
3.  Select **Domain-wide delegation**, then select **Manage domain-wide delegation**.
4.  Select **Add new**.
5.  Enter the service account's OAuth 2.0 Client ID in the **Client ID** field. Find this value in the service account's **Advanced settings**. Do not enter the numeric Unique ID.
6.  Enter the required OAuth scopes:

```
https://www.googleapis.com/auth/drive,https://www.googleapis.com/auth/spreadsheets,https://www.googleapis.com/auth/documents,https://www.googleapis.com/auth/calendar,https://www.googleapis.com/auth/gmail.readonly
```

7.  Select **Authorize**.

Authorize only the required scopes. Missing scope approvals cause token generation failures during runtime.

### Configure authentication[​](#configure-authentication-1 "Direct link to Configure authentication")

Choose exactly one authentication option below:

-   Workload identity
-   JSON key

1.  Complete [Step 2: Grant Query Endpoint impersonation rights](#step-2-grant-query-endpoint-impersonation-rights) to grant the Query Endpoint access to your DWD service account.
2.  Continue to [Step 3: Create the service credential in Glean](#step-3-create-the-service-credential-in-glean) and enter `service_account_email`.

1.  Generate a JSON key for the DWD service account:

```
export DWD_SA_EMAIL="<dwd-service-account-email>"gcloud iam service-accounts keys create glean-workspace-dwd.json \  --iam-account="$DWD_SA_EMAIL"
```

2.  Continue to [Step 3: Create the service credential in Glean](#step-3-create-the-service-credential-in-glean) and enter the key payload in `service_account_json_key`.

Ensure the service account specified in Glean matches the account authorized in the Google Admin console.

Use this mode when agents run as dedicated Workspace users instead of service accounts. This configuration does not require service account creation, domain-wide delegation, or Query Endpoint impersonation setup.

### Create an OAuth client[​](#create-an-oauth-client "Direct link to Create an OAuth client")

1.  Open **APIs & Services → OAuth consent screen** in the Google Cloud Console.
2.  Select **Internal** if the user belongs to your internal organization.
3.  Add the required scopes.
4.  Set the publishing status to **In production**.
5.  Open **APIs & Services → Credentials**.
6.  Select **Create credentials → OAuth client ID**.
7.  Choose **Desktop app**.
8.  Record the generated OAuth client ID and client secret.

warning

OAuth refresh tokens created during *Testing* mode expire after seven days. Keep the consent screen *In production* for a long lived integration.

### Mint a refresh token[​](#mint-a-refresh-token "Direct link to Mint a refresh token")

Execute this workflow while signed in as the dedicated Workspace user:

```
export CLIENT_ID="...apps.googleusercontent.com"export SCOPES="https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/documents https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/gmail.readonly"python3 - <<'PY'import osimport urllib.parseparams = {    "client_id": os.environ["CLIENT_ID"],    "redirect_uri": "http://localhost",    "response_type": "code",    "scope": os.environ["SCOPES"],    "access_type": "offline",    "prompt": "consent",}print(    "https://accounts.google.com/o/oauth2/v2/auth?"    + urllib.parse.urlencode(params))PY
```

1.  Open the output address in a browser where the dedicated user is signed in.
2.  Grant access.
3.  Extract the authorization code from the `http://localhost/?code=...` redirect address.
4.  Exchange the authorization code for a refresh token:

```
read -r -s -p "OAuth client secret: " OAUTH_VALUEechocurl -sS https://oauth2.googleapis.com/token \  -d client_id="$CLIENT_ID" \  -d "client""_""secret=$OAUTH_VALUE" \  -d code="<authorization-code>" \  -d grant_type=authorization_code \  -d redirect_uri="http://localhost"
```

5.  Copy the `refresh_token` value from the JSON response.

Google returns a refresh token on the initial consent flow. If the response omits the refresh token, revoke app access under **Google Account → Security → Third-party access** and rerun authorization with `prompt=consent`.

Changing `SCOPES` later does not update an existing refresh token. Revoke access and repeat token generation to add scopes.

note

The `oauth2l` utility can simplify browser consent and token exchange:

```
oauth2l fetch \  --credentials <client.json> \  --scope "<scopes>" \  --output_format refresh_token
```

Continue to [Step 3: Create the service credential in Glean](#step-3-create-the-service-credential-in-glean).

## Step 2: Grant Query Endpoint impersonation rights[​](#step-2-grant-query-endpoint-impersonation-rights "Direct link to Step 2: Grant Query Endpoint impersonation rights")

Complete this step only if you selected **Workload identity** for service account or domain-wide delegation authentication. Skip this step for JSON-key and OAuth authentication.

Grant `roles/iam.serviceAccountTokenCreator` on the target Workspace service account to the Glean Query Endpoint service account.

```
# Query Endpoint service account for your deployment.export QE_SA="<query-endpoint-service-account>"# Target service account email: the bare service account or DWD service account.export TARGET_SA="<target-service-account>"# View the existing policy.gcloud iam service-accounts get-iam-policy "$TARGET_SA" \  --project="my-gcp-project"# Add the binding.gcloud iam service-accounts add-iam-policy-binding "$TARGET_SA" \  --member="serviceAccount:${QE_SA}" \  --role="roles/iam.serviceAccountTokenCreator" \  --project="my-gcp-project"
```

Apply the policy to the project hosting the **target service account** in a multi-project environment. Allow up to 60 seconds for IAM changes to propagate across GCP.

## Step 3: Create the service credential in Glean[​](#step-3-create-the-service-credential-in-glean "Direct link to Step 3: Create the service credential in Glean")

1.  In Glean, navigate to **Admin console → Platform → Tools → Service credentials**.
    
    ![Create service credentials](/img/independent-agent-create-service-creds.png)
    
2.  Select **Add**.
    
3.  Choose the same Google Workspace template as the identity mode selected in Step 1:
    
    -   **Google Workspace (service account)**
    -   **Google Workspace (domain-wide delegation)**
    -   **Google Workspace (OAuth)**
4.  Fill in the fields for your selected authentication method:
    
    -   **Service account**: Enter either `service_account_email` for workload identity or `service_account_json_key` for JSON-key authentication.
    -   **Domain-wide delegation**: Enter `impersonated_user_email` and either `service_account_email` for workload identity or `service_account_json_key` for JSON-key authentication.
    -   **OAuth**: Enter `oauth_client_id`, `oauth_client_secret`, and `oauth_refresh_token`.
5.  Configure the credential audience.
    
6.  Select **Save**.
    

## Step 4: Attach the credential to an agent[​](#step-4-attach-the-credential-to-an-agent "Direct link to Step 4: Attach the credential to an agent")

1.  Open **Agents** in Glean.
    
2.  Select your agent.
    
3.  Open the **Tools** tab.
    
4.  Select your Google Workspace credential under **Service credentials**.
    
    ![Add service credentials to an agent](/img/service-creds-agent.png)
    

If you attach multiple credentials that use the same Google Workspace template, ensure the tool request includes `credentialId` to select the intended credential. Glean rejects a request when it cannot determine which credential to use, such as when multiple Workspace identity modes are attached or same-mode credentials are not disambiguated.

## Supported agent capabilities[​](#supported-agent-capabilities "Direct link to Supported agent capabilities")

Attached Google Workspace credentials enable agents to invoke Google Workspace REST APIs to:

-   Read, create, and update Drive files.
-   Read, create, and update Docs and Sheets.
-   Read, create, and update Calendar events.
-   Read Gmail messages when using domain-wide delegation or OAuth.

Bare service accounts cannot access Gmail. The integration blocks destructive calls, permission updates, Access Control List (ACL) mutations, deletion, and trash operations.

## Verify credentials[​](#verify-credentials "Direct link to Verify credentials")

Run basic requests to verify authentication behavior without adding manual authorization headers. Glean injects tokens automatically.

Test bare service accounts by requesting shared files:

```
curl -sS "https://www.googleapis.com/drive/v3/files"
```

Test domain-wide delegation or OAuth setups by querying user messages:

```
curl -sS "https://gmail.googleapis.com/gmail/v1/users/me/messages"
```

Verify setup by executing a basic read operation inside the agent runtime. Successful data retrieval confirms valid configuration.

## Security and operational best practices[​](#security-and-operational-best-practices "Direct link to Security and operational best practices")

-   Isolate identities: Maintain separate service accounts for bare access and domain-wide delegation.
-   Enforce least privilege: Limit file sharing and scope authorization to the minimum operational requirements.
-   Avoid static keys: Prefer workload identity authentication over long-lived JSON keys.
-   Secure secrets: Store OAuth client secrets and refresh tokens securely.
-   Rotate keys: Generate a new JSON key, update the Glean credential, verify runtime calls, and delete the old key.
-   Revoke unused access: Remove IAM impersonation bindings, revoke OAuth authorizations, and delete unused Glean service credentials.
-   Scope isolation: For service account and domain-wide delegation credentials, Glean caches tokens separately by credential and Google Workspace API scope. For OAuth credentials, Glean reuses one cached token containing all scopes granted during consent.
-   Runtime protection: Secret material stays on the server; agent environments never receive raw keys or tokens.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### The templates do not appear in Glean

Glean does not enable the templates by default. A deployment-specific greenlist entry is required before they appear in the service credential list. Contact your Glean representative.

### The request returns a 403 and suggests sharing a folder

The credential broker denies the request locally with HTTP 403 (`CredentialInvalid`) before contacting Google. No authorization header is injected, and the request does not reach Google. Check the broker deny or audit logs, then verify the Query Endpoint `roles/iam.serviceAccountTokenCreator` binding on the target service account.

### \`iam.serviceAccounts.getAccessToken\` is denied

The bare service-account workload identity path lacks the Service Account Token Creator role. Grant the role and wait for IAM propagation.

### \`iam.serviceAccounts.signJwt\` is denied

The domain-wide delegation workload identity path lacks the Service Account Token Creator role. Grant the role on the DWD service account and wait for IAM propagation.

### DWD returns \`unauthorized\_client\` or a scope error

The wrong OAuth 2.0 Client ID was entered, or a required scope was not authorized. Recheck the OAuth 2.0 Client ID in the service account's Advanced settings and the scopes in the Admin console. Do not use the service account's numeric Unique ID.

### OAuth returns \`invalid\_grant\`

The refresh token was revoked, expired, or issued while the consent screen was in Testing mode. Re-mint the refresh token and use an In production consent screen.

### Both service account authentication fields are configured

Provide exactly one of `service_account_email` or `service_account_json_key`. If both are provided, the JSON key takes precedence.

## See also[​](#see-also "Direct link to See also")

-   [Agent identity overview](/administration/agent-identity/overview)
-   [Google Workspace API documentation](https://developers.google.com/workspace)
-   [Service account impersonation documentation](https://cloud.google.com/iam/docs/service-account-impersonation)
-   [Domain-wide delegation documentation](https://support.google.com/a/answer/162106)
