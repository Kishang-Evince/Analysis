---
url: "https://docs.glean.com/administration/agent-identity/github-app"
canonical: "https://docs.glean.com/administration/agent-identity/github-app"
title: "Set up GitHub service credential"
description: "Let Glean agents read GitHub repository data using a GitHub app."
fetched_at: "2026-09-01T13:28:58.768Z"
---
On this page

A GitHub app service credential lets a Glean agent read GitHub repository data as a *GitHub app* rather than as an individual user. You create a GitHub app, install it on the organizations or repositories the agent should reach, and store its app ID and private key in Glean. Glean signs a short-lived token for the requests of the agent.

Glean handles authentication automatically. The private key is stored encrypted, and the agent never sees it.

-   Authentication: GitHub app, private key signs a JWT that is exchanged for an installation access token
-   Scope: The repositories where the app is installed, limited to the permissions you grant
-   Access: Read-only

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Permission to create a GitHub app and install it on your organization or repositories.
-   A Glean administrator who can create service credentials.
-   The **GitHub app** template enabled for your deployment. If you do not see it in the list of templates, contact your Glean representative to turn it on.

## Step 1: Create a GitHub app[​](#step-1-create-a-github-app "Direct link to Step 1: Create a GitHub app")

In GitHub, go to **Settings → Developer settings → GitHub Apps** and click **New GitHub App**.

## Step 2: Grant read-only repository permissions[​](#step-2-grant-read-only-repository-permissions "Direct link to Step 2: Grant read-only repository permissions")

Under **Permissions → Repository**, grant only what the agent needs to read, for example:

| Permission | Access |
| --- | --- |
| Contents | Read-only |
| Metadata | Read-only |
| Pull requests | Read-only (if needed) |
| Issues | Read-only (if needed) |

## Step 3: Generate a private key[​](#step-3-generate-a-private-key "Direct link to Step 3: Generate a private key")

On the app's page, under **Private keys**, click **Generate a private key**. GitHub downloads a PEM file — keep it safe.

## Step 4: Install the app[​](#step-4-install-the-app "Direct link to Step 4: Install the app")

Click **Install App** and choose the organizations or repositories the agent should reach. Note the numeric **App ID** from the app's **General** page.

## Step 5: Create the service credential in Glean[​](#step-5-create-the-service-credential-in-glean "Direct link to Step 5: Create the service credential in Glean")

1.  In Glean, go to **Admin console → Platform → Tools → Service credentials**.
    
    ![Create service credentials](/img/independent-agent-create-service-creds.png)
    
2.  Click **Add**.
3.  Select **GitHub App** under **Service credentials**.
4.  Fill in these fields:
    -   **Credential name**: A human-readable name for the credential.
    -   **Description**: A brief description of what this credential is used for.
    -   **App ID**: The numeric GitHub App ID from the app's **General** page.
    -   **Private Key (PEM)**: The full contents of the downloaded PEM file (stored encrypted). Used to sign the JWT that is exchanged for an installation access token.
    -   **Audience**: Which users or groups can attach this credential to agents.
5.  Select **Save**. Glean stores the private key as an encrypted secret and doesn't display it again.

## Step 6: Attach the credential to an agent[​](#step-6-attach-the-credential-to-an-agent "Direct link to Step 6: Attach the credential to an agent")

When the agent calls `api.github.com` including through the `gh` CLI in its sandbox, Glean signs a short-lived installation token automatically and grants the agent a `gh` skill.

1.  Go to **Agents** in Glean.
    
2.  Select the agent to which you want to add the service credentials.
    
3.  In the **Tools** tab, select **Service credentials** and select the GitHub credential you created.
    
    ![Add service credentials to an agent](/img/service-creds-agent.png)
    

## Verify it works[​](#verify-it-works "Direct link to Verify it works")

Success

Ask the agent to read something from an installed repository, for example, "show me the README of `owner/repo`." If it returns the file contents, the credential is working.

## What the agent can do[​](#what-the-agent-can-do "Direct link to What the agent can do")

The agent can read repository data through repository-scoped endpoints (`/repos/{owner}/{repo}`) for the repositories where the app is installed. Other endpoints are denied. Agents are instructed not to perform destructive operations, such as deleting repositories or branches, force-pushing to default branches, or deleting issues or releases.

## Security and operational notes[​](#security-and-operational-notes "Direct link to Security and operational notes")

-   Injected server-side: the agent never receives the raw private key. Glean signs a short-lived installation token and adds the header only to requests bound for `api.github.com`.
-   Least privilege: grant read-only repository permissions and install the app only on the repositories the agent needs.
-   Rotation: to rotate, generate a new private key in GitHub, update the **Private Key (PEM)** on the credential in Glean, then delete the old key.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### 401 Unauthorized

The app ID or private key is wrong. Re-check the **App ID** and re-paste the PEM key on the credential in Glean.

### 404 Not Found on a repository

The app isn't installed on that repository. Install the app on the target organization or repository.

### Access to a non-/repos endpoint is denied

Only repository-scoped endpoints are permitted. Use `/repos/{owner}/{repo}` endpoints.

### The GitHub app template isn't available

The template isn't enabled for your deployment. Contact your Glean representative to turn it on.

## See also[​](#see-also "Direct link to See also")

-   [Agent identity overview](/administration/agent-identity/overview)
-   [Registering a GitHub App](https://docs.github.com/en/apps/creating-github-apps)
