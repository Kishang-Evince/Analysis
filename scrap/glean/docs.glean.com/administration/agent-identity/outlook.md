---
url: "https://docs.glean.com/administration/agent-identity/outlook"
canonical: "https://docs.glean.com/administration/agent-identity/outlook"
title: "Set up Microsoft Outlook service credential"
description: "Configure a Microsoft Entra application so Glean agents can access approved Outlook data through Microsoft Graph."
fetched_at: "2026-09-01T13:28:59.062Z"
---
On this page

A Microsoft Outlook service credential lets a Glean agent call Microsoft Graph under a shared application identity instead of a person's identity. You register an app in Microsoft Entra ID, grant the application permissions the agent needs, and store its credentials in Glean. Glean uses the OAuth 2.0 client-credentials flow to mint short-lived access tokens.

Glean stores the client secret encrypted. The agent never sees the raw secret or access token.

-   Authentication: Microsoft Entra application identity (OAuth 2.0 client credentials)
-   Scope: The Microsoft Graph application permissions you grant and any Exchange Online mailbox scope you configure
-   Access: Mail, calendar, contacts, tasks, places, and directory data allowed by those permissions

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Permission to register an application in Microsoft Entra ID.
-   Permission to grant Microsoft Graph application permissions and tenant-wide admin consent.
-   If you plan to use Microsoft's Role Based Access Control (RBAC) for Applications to restrict mailbox access, you need either of these roles:
    -   Membership in the **Organization Management** role group in Exchange Online, or an equivalent delegated role assignment.
    -   The **Exchange Administrator** role in Microsoft Entra ID.
-   A Glean administrator who can create service credentials.
-   The **Microsoft Outlook App** template enabled for your deployment. If you don't see it in the list of templates, contact your Glean representative.

## Step 1: Register an application in Microsoft Entra ID[​](#step-1-register-an-application-in-microsoft-entra-id "Direct link to Step 1: Register an application in Microsoft Entra ID")

1.  Sign in to the [Microsoft Entra admin center](https://entra.microsoft.com) and switch to the correct tenant.
2.  Go to **Microsoft Entra ID → App registrations → New registration**.
3.  Enter a descriptive name, such as `Glean Agent Outlook`.
4.  For **Supported account types**, select **Accounts in this organizational directory only**.
5.  Select **Register**.
6.  From the app's **Overview** page, copy the **Application (client) ID** and **Directory (tenant) ID**.
7.  Go to **Microsoft Entra ID → Enterprise applications**, select the app, and open **Properties**. Copy the **Object ID** for the service principal. You need this value if you configure Exchange Online RBAC.

Important

For the Exchange Online `New-ServicePrincipal` command, use the **Object ID** from **Enterprise applications**. Don't use the object ID shown under **App registrations**.

## Step 2: Choose and configure the permission model[​](#step-2-choose-and-configure-the-permission-model "Direct link to Step 2: Choose and configure the permission model")

Choose one of these models for Exchange data:

-   Scoped mailbox access (recommended): Grant mail, calendar, and contact permissions through Exchange Online RBAC for Applications in Step 5. Don't add matching Exchange application permissions in Microsoft Entra ID.
-   Tenant-wide mailbox access: Add the required Exchange application permissions in Microsoft Entra ID. The app can use those permissions across the tenant.

For directory and other non-Exchange capabilities, add the required permissions in Microsoft Entra ID:

1.  Open the app registration and go to **API permissions**.
    
2.  Select **Add a permission → Microsoft Graph → Application permissions**.
    
3.  Add the least-privileged permissions the agent needs. Common examples include:
    
    | Permission | Use when the agent needs to |
    | --- | --- |
    | `User.Read.All` | Look up users in the directory |
    | `Tasks.ReadWrite.All` | Read or manage Microsoft To Do tasks |
    | `Place.Read.All` | Find meeting rooms and other places |
    
4.  If you chose tenant-wide mailbox access, add only the Exchange permissions the agent needs:
    
    | Permission | Use when the agent needs to |
    | --- | --- |
    | `Mail.Read` | Read mail, folders, and attachments |
    | `Mail.ReadWrite` | Create, update, move, or delete mail |
    | `Mail.Send` | Send mail; `Mail.ReadWrite` doesn't include sending |
    | `Calendars.Read` | Read calendar events |
    | `Calendars.ReadWrite` | Create, update, or cancel calendar events |
    | `Contacts.Read` or `Contacts.ReadWrite` | Read or manage contacts |
    
5.  Select **Add permissions**.
    

Important

Microsoft Entra application permissions are unscoped grants. If you grant a permission such as `Mail.Read` in Microsoft Entra ID and grant the same permission with a mailbox scope through Exchange Online RBAC, the effective access is the union of both grants. Remove the unscoped permission from Microsoft Entra ID for the RBAC mailbox scope to take effect.

## Step 3: Grant admin consent[​](#step-3-grant-admin-consent "Direct link to Step 3: Grant admin consent")

1.  Review the application permissions configured in Microsoft Entra ID.
2.  Select **Grant admin consent for *tenant*** and confirm the action.
3.  Confirm that each permission you retained in Microsoft Entra ID shows a granted status.

Application permissions configured in Microsoft Entra ID require admin consent. Exchange Online RBAC assignments are configured separately and don't appear in this consent list.

## Step 4: Create a client secret[​](#step-4-create-a-client-secret "Direct link to Step 4: Create a client secret")

1.  Open **Certificates and secrets** for the app registration.
2.  Under **Client secrets**, select **New client secret**.
3.  Enter a descriptive name and choose the shortest practical expiration period for your rotation policy.
4.  Select **Add**.
5.  Copy the secret **Value** immediately and store it in your secret manager.

Important

Microsoft Entra shows the client secret value once. If you lose it, create a new secret.

## Step 5: Restrict mailbox access with Exchange Online RBAC[​](#step-5-restrict-mailbox-access-with-exchange-online-rbac "Direct link to Step 5: Restrict mailbox access with Exchange Online RBAC")

Skip this step if you intentionally granted tenant-wide Exchange permissions in Microsoft Entra ID.

[RBAC for Applications](https://learn.microsoft.com/en-us/exchange/permissions-exo/application-rbac) lets you grant Microsoft Graph mail, calendar, and contact permissions for a defined set of mailboxes. Complete this step in Exchange Online PowerShell.

### Define the mailbox scope[​](#define-the-mailbox-scope "Direct link to Define the mailbox scope")

Connect to Exchange Online:

```
Connect-ExchangeOnline
```

Create a management scope. For example, the following scope includes one mailbox:

```
New-ManagementScope -Name "Glean-Agent-Mailbox-Scope" `  -RecipientRestrictionFilter "PrimarySmtpAddress -eq 'support@example.com'"
```

To scope access to the direct members of a supported mail-enabled group, use the group's distinguished name:

```
New-ManagementScope -Name "Glean-Agent-Group-Scope" `  -RecipientRestrictionFilter "MemberOfGroup -eq '<group-distinguished-name>'"
```

Use `Get-Group` to find the group's distinguished name. Nested group members aren't included in the scope.

You can also use the `-RecipientAdministrativeUnitScope` parameter when you create the role assignment to scope access to a Microsoft Entra administrative unit.

### Register the service principal in Exchange Online[​](#register-the-service-principal-in-exchange-online "Direct link to Register the service principal in Exchange Online")

Create an Exchange Online pointer to the Microsoft Entra service principal:

```
New-ServicePrincipal `  -AppId "<Application-client-ID>" `  -ObjectId "<Service-principal-object-ID>" `  -DisplayName "Glean Agent Outlook"
```

### Assign scoped application roles[​](#assign-scoped-application-roles "Direct link to Assign scoped application roles")

Assign each role the agent needs. This example grants read access to mail in the management scope:

```
New-ManagementRoleAssignment `  -Role "Application Mail.Read" `  -App "<Service-principal-object-ID>" `  -CustomResourceScope "Glean-Agent-Mailbox-Scope"
```

For an administrative unit, create the assignment with its object ID:

```
New-ManagementRoleAssignment `  -Role "Application Mail.Read" `  -App "<Service-principal-object-ID>" `  -RecipientAdministrativeUnitScope "<Administrative-unit-object-ID>"
```

Use the corresponding Exchange Online application roles for other capabilities, such as `Application Mail.Send`, `Application Calendars.Read`, or `Application Contacts.Read`.

### Test the RBAC assignment[​](#test-the-rbac-assignment "Direct link to Test the RBAC assignment")

Test whether the service principal is in scope for a mailbox:

```
Test-ServicePrincipalAuthorization `  -Identity "<Service-principal-object-ID>" `  -Resource "support@example.com" |  Format-Table
```

Confirm that `InScope` is `True` for each required role. This command tests Exchange Online RBAC assignments but doesn't include permissions granted separately in Microsoft Entra ID.

Changes to application permissions can take from 30 minutes to two hours to affect live API calls. The test command bypasses this cache.

## Step 6: Create the service credential in Glean[​](#step-6-create-the-service-credential-in-glean "Direct link to Step 6: Create the service credential in Glean")

1.  In Glean, go to **Admin console → Platform → Tools → Service credentials**.
2.  Select **Add**, then select **Microsoft Outlook App**.
3.  Fill in these fields:
    -   **Credential name**: A name that identifies the credential.
    -   **Description**: A short description of its purpose and scope.
    -   **Application (Client) ID**: The application ID from the app registration's **Overview** page.
    -   **Client Secret**: The secret value you created in Step 4.
    -   **Directory (Tenant) ID**: The tenant ID from the app registration's **Overview** page.
    -   **Audience**: The people or groups who can attach this credential to agents.
4.  Select **Save**. Glean stores the client secret encrypted and doesn't display it again.

## Step 7: Attach the credential to an agent[​](#step-7-attach-the-credential-to-an-agent "Direct link to Step 7: Attach the credential to an agent")

1.  Go to **Agents** in Glean and select the agent.
2.  Open the **Tools** tab.
3.  Under **Service credentials**, select the Microsoft Outlook credential you created.

## Verify it works[​](#verify-it-works "Direct link to Verify it works")

Success

Ask the agent to read mail from a test mailbox that is in scope, such as, "List the 10 most recent messages in `support@example.com`'s inbox." If it returns the expected messages, the credential is working.

If you configured Exchange Online RBAC, repeat the test with a mailbox outside the scope and confirm that access is denied.

## What the agent can do[​](#what-the-agent-can-do "Direct link to What the agent can do")

Depending on the permissions you grant, the agent can:

-   Read and search mail, folders, and attachments
-   Send, reply to, forward, move, or delete mail
-   Read and manage calendar events and availability
-   Read and manage contacts and Microsoft To Do tasks
-   Find meeting rooms and look up directory users

Outlook write operations require user approval. Glean asks the user to confirm before the agent sends or deletes mail and before it deletes or cancels calendar events.

The agent operates within the effective permissions of the Microsoft Entra app and Exchange Online RBAC assignments.

## Security and operational notes[​](#security-and-operational-notes "Direct link to Security and operational notes")

-   Dedicated app registration: use an app registration created only for Glean agent access.
-   Least privilege: grant only the capabilities the agent needs and scope Exchange access to the required mailboxes.
-   Avoid duplicate grants: remove tenant-wide Exchange permissions from Microsoft Entra ID when the same permissions are assigned through scoped Exchange Online RBAC.
-   Admin consent: review the permission list before granting tenant-wide consent and repeat the consent process after changing Microsoft Entra permissions.
-   Injected server-side: Glean stores the client secret encrypted and uses it to mint short-lived tokens. The agent never receives the secret or token.
-   Rotation: create a new client secret before the current one expires, update the credential in Glean, test it, and then delete the old secret in Microsoft Entra ID.
-   Revocation: remove the credential in Glean, delete the client secret, or remove the app's grants to cut off access.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Microsoft Graph returns 401 Unauthorized

Confirm that the **Application (Client) ID**, **Directory (Tenant) ID**, and **Client Secret** are correct. If the secret expired or was deleted, create a new secret and update the credential in Glean.

### Microsoft Graph returns 403 Forbidden or insufficient privileges

The app lacks a required permission, admin consent, or an in-scope Exchange Online RBAC assignment. Review the permission required by the Graph operation and test the RBAC assignment for the target mailbox.

### The app can reach mailboxes outside the RBAC scope

A matching unscoped Exchange application permission might still be granted in Microsoft Entra ID. Remove unscoped mail and calendar permissions from the app registration when you grant the same capabilities through scoped Exchange Online RBAC.

### One mailbox works, but another returns 403

This is expected when only the first mailbox is in scope. Review the management-scope filter or administrative-unit membership. Allow up to two hours for permission changes to affect live API calls.

### The Microsoft Outlook App template isn't available

The template isn't enabled for your deployment. Contact your Glean representative to turn it on.

### The Service credentials option isn't available

Confirm that Agent identity is enabled for your deployment and that your Glean admin role can create service credentials.

## See also[​](#see-also "Direct link to See also")

-   [Agent identity overview](/administration/agent-identity/overview)
-   [Microsoft Graph application authentication](https://learn.microsoft.com/en-us/graph/auth-v2-service)
-   [Exchange Online RBAC for Applications](https://learn.microsoft.com/en-us/exchange/permissions-exo/application-rbac)
