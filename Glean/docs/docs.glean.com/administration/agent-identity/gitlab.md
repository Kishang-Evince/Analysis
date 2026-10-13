---
url: "https://docs.glean.com/administration/agent-identity/gitlab"
canonical: "https://docs.glean.com/administration/agent-identity/gitlab"
title: "Set up GitLab service credential"
description: "Configure a GitLab service account and access token so Glean agents can work with approved GitLab projects."
fetched_at: "2026-10-13T08:49:03.776Z"
---
On this page

A GitLab service credential lets a Glean agent work with repositories, issues, merge requests, and pipelines under a shared service-account identity. You create a GitLab service account, grant it access to the required top-level group, generate a personal access token, and store the connection details in Glean.

Glean stores the token encrypted and adds it to outbound GitLab API requests. The agent never sees the raw token.

-   Authentication: GitLab service account personal access token (Bearer)
-   Scope: One GitLab host and top-level group, limited by the service account's memberships, role, and token scopes
-   Access: Read and write access determined by the GitLab role and token scopes; write requests require approval in Glean

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Complete the following prerequisites:

-   For GitLab.com, have the Owner role in the top-level group.
-   For GitLab Self-Managed or GitLab Dedicated, have administrator access or the Owner role in a group that can create service accounts.
-   Have permission to add the service account to the required group or projects and assign its role.
-   Work with a Glean administrator who can create service credentials.
-   Enable the **GitLab** template for your deployment. If you don't see it in the list of templates, contact your Glean representative.

## Identify the GitLab host and group path[​](#identify-the-gitlab-host-and-group-path "Direct link to Identify the GitLab host and group path")

Copy these values from the URL of the top-level group the agent will use. For example, for `https://gitlab.example.com/my-organization`:

-   The GitLab host is `gitlab.example.com`
-   The top-level group path is `my-organization`

Use the group URL path, which can differ from the group's display name. The host must be a hostname without `https://`, a port, or a path.

## Create and scope a GitLab service account[​](#create-and-scope-a-gitlab-service-account "Direct link to Create and scope a GitLab service account")

1.  In GitLab, go to the top-level group.
    
2.  Go to **Settings → Service accounts**.
    
3.  Select **Add service account**.
    
4.  Enter a name that identifies the agent integration, then select **Create service account**.
    
5.  Add the service account to the top-level group or the specific projects it needs.
    
6.  Assign the lowest role that supports the agent's work:
    
    | Role | Use when the agent needs to |
    | --- | --- |
    | **Reporter** | Read repository content and work with issues without pushing code |
    | **Developer** | Create branches, push to non-protected branches, and create merge requests |
    

GitLab service accounts are external users. Grant the account explicit access to each private group or project the agent needs.

## Create a service account access token[​](#create-a-service-account-access-token "Direct link to Create a service account access token")

1.  On the **Service accounts** page, find the account you created.
    
2.  Open the vertical ellipsis menu and select **Manage access tokens**.
    
3.  Select **Add new token**.
    
4.  Enter a descriptive token name and an expiration date that follows your organization's rotation policy.
    
5.  Choose the least-privileged scopes for the agent:
    
    | Access | Token scopes |
    | --- | --- |
    | Read GitLab API data and repository files | `read_api` and `read_repository` |
    | Create or update issues, merge requests, comments, branches, and repository files | `api` |
    
6.  Select **Create personal access token**.
    
7.  Copy the token and store it in your secret manager. GitLab doesn't display the value again.
    

The `api` scope grants complete API access within the service account's effective GitLab permissions. Keep the service account's role and project memberships as narrow as possible.

## Create the service credential in Glean[​](#create-the-service-credential-in-glean "Direct link to Create the service credential in Glean")

1.  In Glean, go to **Admin console → Platform → Tools → Service credentials**.
2.  Select **Add**, then select **GitLab**.
3.  Fill in these fields:
    -   **Credential name**: A name that identifies the credential.
    -   **Description**: The GitLab host, top-level group, and intended use. Include enough detail for an agent builder to select the correct credential.
    -   **GitLab Host**: The hostname from [Identify the GitLab host and group path](#identify-the-gitlab-host-and-group-path), such as `gitlab.com` or `gitlab.example.com`.
    -   **Top-level Group Path**: The path from the top-level group's URL, such as `my-organization`.
    -   **Service Account Access Token**: The personal access token you created in [Create a service account access token](#create-a-service-account-access-token).
    -   **Audience**: The people or groups who can attach this credential to agents.
4.  Select **Save**. Glean stores the token encrypted and doesn't display it again.

## Attach the credential to an agent[​](#attach-the-credential-to-an-agent "Direct link to Attach the credential to an agent")

1.  Go to **Agents** in Glean and select the agent.
2.  Open the **Tools** tab.
3.  Under **Service credentials**, select the GitLab credential you created.

## Verify it works[​](#verify-it-works "Direct link to Verify it works")

Success

Ask the agent to read from a project in the configured top-level group, such as, "List the open merge requests in `my-organization/example-project`." If it returns the expected results, the credential is working.

If the credential includes write access, create or update an issue in a test project. Confirm that Glean asks for approval and that GitLab attributes the change to the service account.

## What the agent can do[​](#what-the-agent-can-do "Direct link to What the agent can do")

Depending on the service account's role and token scopes, the agent can:

-   Read repositories, files, branches, issues, merge requests, comments, and pipelines
-   Create or update issues, merge requests, comments, branches, files, and labels
-   Work with projects under the configured top-level group on GitLab.com or a custom GitLab host

Glean instructs the agent to stay within the configured top-level group. It also instructs the agent not to merge a merge request, delete a project or branch, force-push, change permissions or settings, or write directly to a default or protected branch unless the user explicitly requests that action.

## Security and operational notes[​](#security-and-operational-notes "Direct link to Security and operational notes")

-   Dedicated service account: use a service account created for this integration so GitLab attributes agent activity separately from human activity.
-   Least privilege: restrict the account's group and project memberships, choose the lowest GitLab role that supports the task, and grant only the required token scopes.
-   Group boundary: enter the intended top-level group path in Glean and don't grant the service account access outside that group unless another approved workflow requires it.
-   Injected server-side: Glean adds the token only to requests for the configured GitLab host. The agent runtime never receives the raw token.
-   Write approval: Glean requires approval before the agent sends requests that create or update GitLab data.
-   Rotation: create or rotate the token in GitLab, update **Service Account Access Token** in Glean, test the credential, and then revoke the old token.
-   Revocation: revoke the token in GitLab or remove the GitLab service credential in Glean to cut off access.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### GitLab returns 401 Unauthorized

The token might be invalid, expired, or revoked. Create or rotate the service account token in GitLab, then update **Service Account Access Token** in Glean.

### GitLab returns 403 Forbidden

The service account might lack the required GitLab role, project membership, or token scope. Confirm that the target project is available to the service account and that the token has `read_api` for reads or `api` for writes.

### The GitLab host is rejected

Enter a hostname such as `gitlab.com` or `gitlab.example.com`. Don't include `https://`, a port, a path, a query, or a fragment.

### The agent can't access a project in another group

The credential is configured for one top-level group. Use a project under the configured group, or create another GitLab service credential for the other group and set its audience deliberately.

### The agent selects the wrong GitLab credential

Give each credential a distinct name and description that identify both its GitLab host and top-level group. In the request, specify the target project URL so the agent can select the matching credential.

### The GitLab template isn't available

The template isn't enabled for your deployment. Contact your Glean representative to turn it on.

## See also[​](#see-also "Direct link to See also")

-   [Agent identity overview](/administration/agent-identity/overview)
-   [Service accounts](https://docs.gitlab.com/user/profile/service_accounts/)
-   [Access token scopes](https://docs.gitlab.com/security/tokens/access_token_scopes/)
-   [Roles and permissions](https://docs.gitlab.com/user/permissions/)
