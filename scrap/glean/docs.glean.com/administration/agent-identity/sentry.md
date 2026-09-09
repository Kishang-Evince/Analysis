---
url: "https://docs.glean.com/administration/agent-identity/sentry"
canonical: "https://docs.glean.com/administration/agent-identity/sentry"
title: "Set up Sentry service credential"
description: "Configure a Sentry Internal Integration auth token so Glean agents can read issues, events, and releases from Sentry under a non-human identity."
fetched_at: "2026-09-01T13:28:59.230Z"
---
On this page

A Sentry service credential lets a Glean agent read data from Sentry - issues, events, projects, and releases - with an Internal Integration auth token instead of acting on behalf of an individual user. Every call the agent makes is authenticated as one read-only, non-human identity.

Glean adds the auth token to outbound requests to `sentry.io`, so the agent never sees the raw token.

-   Authentication: Sentry Internal Integration auth token (Bearer)
-   Scope: The Sentry organizations and projects the integration is installed in
-   **Access:** Read-only

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   A Sentry organization with admin access.
-   An Internal Integration created in Sentry with read-only scopes.
-   The Internal Integration auth token (format: `sntrys_...`), securely stored.
-   A Glean administrator who can create service credentials.
-   The Sentry service credential template enabled for your deployment. If you don't see it in the list of templates, contact your Glean representative.

Token type

The token **must** be an **Internal Integration auth token**. Do **not** use an Organization Auth Token (`org:ci` scope only) or a personal User Auth Token - those will not work with this integration.

## Step 1: Create an Internal Integration in Sentry[​](#step-1-create-an-internal-integration-in-sentry "Direct link to Step 1: Create an Internal Integration in Sentry")

1.  Log in to Sentry and go to **Settings → Custom Integrations**.
2.  Click **Create Internal Integration**.
3.  Fill in the details:
    -   **Name**: A descriptive name, for example, "Glean Service Credential."
    -   **Scopes**: Grant read-only scopes only:
        -   `org:read`
        -   `project:read`
        -   `event:read`
        -   `team:read`
4.  Click **Save**.

## Step 2: Copy the auth token[​](#step-2-copy-the-auth-token "Direct link to Step 2: Copy the auth token")

1.  On the integration's detail page, locate the generated auth token.
2.  The token starts with `sntrys_` and is shown only once.
3.  Copy the token value and store it securely (for example, in a secrets vault or 1Password) - you'll need it when creating the service credential in Glean.

caution

Store the auth token securely. It is shown only once and cannot be retrieved later. Do not share it in plaintext or over unencrypted channels.

## Step 3: Install the integration in your Sentry organization[​](#step-3-install-the-integration-in-your-sentry-organization "Direct link to Step 3: Install the integration in your Sentry organization")

1.  Go to **Settings → Integrations**.
2.  Find the Internal Integration you created in Step 1.
3.  Click **Install** next to your target organization.
4.  Select the projects the integration should access.

## Step 4: Create the service credential in Glean[​](#step-4-create-the-service-credential-in-glean "Direct link to Step 4: Create the service credential in Glean")

1.  In Glean, go to **Admin console → Platform → Tools → Service credentials**.
    
    ![Create service credentials](/img/independent-agent-create-service-creds.png)
    
2.  Click **Add**.
3.  Select **Sentry** under **Service credentials**.
4.  Fill in these fields:
    -   **Credential name**: A human-readable name, for example, "Sentry Agent - your-org."
    -   **Description**: A brief description of what this credential is used for.
    -   **Auth token**: The Internal Integration auth token you copied in Step 2 (format: `sntrys_...`).
    -   **Audience**: Which users or groups can attach this credential to agents.
5.  Select **Save**.

## Step 5: Attach the credential to an agent[​](#step-5-attach-the-credential-to-an-agent "Direct link to Step 5: Attach the credential to an agent")

1.  Go to **Agents** in Glean.
    
2.  Select the agent to which you want to add the service credentials.
    
3.  In the **Tools** tab, select **Service credentials** and select the Sentry service credential you created.
    
    ![Add service credentials to an agent](/img/service-creds-agent.png)
    

## Verify it works[​](#verify-it-works "Direct link to Verify it works")

Success

Ask the agent to list recent issues in a Sentry project, for example, "Show the latest unresolved issues in the backend project." If it returns results, the credential is working.

## What the agent can do[​](#what-the-agent-can-do "Direct link to What the agent can do")

With a Sentry credential attached, the agent can read Sentry data:

-   List and search issues across projects
-   View issue details, including stack traces and event context
-   Check release health and deployment status
-   Summarize error trends and frequencies

The integration is read-only - the agent cannot create, update, or delete any Sentry resources.

## Security and operational notes[​](#security-and-operational-notes "Direct link to Security and operational notes")

-   Token-based auth: Glean stores the auth token in the credential broker and injects it as a Bearer header into outbound requests. The agent runtime never receives the raw token.
-   Read-only by design: the integration scopes are set to read-only (`org:read`, `project:read`, `event:read`, `team:read`). No mutating or destructive operations are permitted.
-   Correct token type: only an Internal Integration auth token works. Do not use an Organization Auth Token (`org:ci` scope) or a personal User Auth Token.
-   Revocation: to cut off access, revoke the token in Sentry or remove the Sentry service credential in Glean.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### The agent gets a 401 Unauthorized error

The auth token may be invalid, revoked, or the wrong type. Verify you are using an **Internal Integration auth token** (format: `sntrys_...`), not an Organization Auth Token or personal User Auth Token. If needed, create a new Internal Integration and generate a fresh token.

### The agent can't see issues in a specific project

The Internal Integration may not be installed in the target Sentry organization, or the project may not be selected. Go to **Settings → Integrations** in Sentry and verify the integration is installed and the project is enabled.

### The agent returns results from the wrong Sentry organization

Verify that the Internal Integration auth token is scoped to the correct Sentry organization. Each token is tied to the organization where the integration was created.

## See also[​](#see-also "Direct link to See also")

-   [Agent identity overview](/administration/agent-identity/overview)
