---
url: "https://docs.glean.com/administration/identity/roles/user-roles"
canonical: "https://docs.glean.com/administration/identity/roles/user-roles"
title: "User Roles"
description: "An overview of the Member and Moderator roles for Glean platform users, their access rights, and customizable privileges"
fetched_at: "2026-09-01T13:29:07.496Z"
---
On this page

Glean implements a streamlined approach to user roles with a single primary role: **Member**. Members can receive additional **Moderator** permissions from Admins or Super Admins to manage content within specific platform features. Members (including those with Moderator permissions) cannot access privileged Admin Console pages such as connectors, user roles, settings, Protect, or Insights. These pages remain gated behind the Admin and Super Admin roles.

Members do, however, see the **Actions** tab under the **Admin Console** label today. They use it to view and, depending on default member permissions, create custom actions and MCP-based actions.

There is no admin setting today to hide the **Admin Console** nav entry from members. To control whether members can create actions, use the **Default Member permissions** controls and the **Action Creator** role:

-   From **Admin Console → Users & permissions → User roles**, select **Default Member permissions** to configure which capabilities are granted to all members by default.
-   To grant action creation to a smaller set of users, leave the corresponding default off and assign the **Action Creator** role to specific users from **User roles → Edit roles**.

If you have a use case for hiding the **Admin Console** entry from members entirely, share feedback with your Glean account team so it can be considered in a future release.

## Member Role[​](#member-role "Direct link to Member Role")

The Member role provides users with the following base permissions:

| Feature | View | Create | Edit | Delete |
| --- | --- | --- | --- | --- |
| Announcements | ✓ | ✗ | ✗ | ✗ |
| Answers | ✓ | ✗ | ✗ | ✗ |
| Collections | ✓ | ✗ | ✓ | ✓ |
| Go Links (own) | ✓ | ✗ | ✓ | ✓ |
| Go Links (public) | ✓ | ✗ | ✗ | ✗ |
| Pinned Results (own) | ✓ | ✓ | ✓ | ✓ |
| Pinned Results (public) | ✓ | ✗ | ✗ | ✗ |
| Teams (own) | ✓ | ✗ | ✓ | ✗ |
| Teams (public) | ✓ | ✗ | ✗ | ✗ |
| Verification (own docs) | ✓ | ✓ | ✓ | ✓ |
| Verification (all docs) | ✓ | ✗ | ✗ | ✗ |
| Credits Dashboard | ✗ | N/A | N/A | N/A |
| Insights | ✗ | N/A | N/A | N/A |

### Core Member Capabilities[​](#core-member-capabilities "Direct link to Core Member Capabilities")

### Feature Access

Members can:

-   View, edit, and delete Answers they are added as an editor to
-   View and modify items in anyone's Collections, including thumbnails and banners
-   Access all content they have permission to view
-   Edit and delete their own Go Links, while viewing others' Go Links
-   Create private pinned results visible only to them and view pinned results where they are in the audience
-   Edit team pages where they are a member
-   Verify and deprecate their own documents

### Customizable Member Permissions[​](#customizable-member-permissions "Direct link to Customizable Member Permissions")

info

Administrators with Admin and Super Admin roles can extend the default Member permissions to include:

-   Creating new Answers
-   Creating new Collections
-   Creating public pinned results
-   Creating public Go Links

If [group-based permissions](/administration/identity/roles/group-based-permissions) are enabled, Admins can also grant these capabilities to IdP groups. Members of those groups inherit the corresponding permissions when they sign into Glean.

## Moderator Permissions[​](#moderator-permissions "Direct link to Moderator Permissions")

Moderator permissions can be selectively assigned by Admins or Super Admins for specific knowledge management features. These permissions can also be assigned to identity provider groups using [group-based permissions](/administration/identity/roles/group-based-permissions), allowing entire teams to inherit moderator capabilities based on their group membership.

### Content Management Moderators[​](#content-management-moderators "Direct link to Content Management Moderators")

### Announcements Moderator

| Feature | View | Create | Edit | Delete |
| --- | --- | --- | --- | --- |
| Announcements | ✓ | ✓ | ✓ | ✓ |

### Answers Moderator

| Feature | View | Create | Edit | Delete |
| --- | --- | --- | --- | --- |
| Answers | ✓ | ✓ | ✓ | ✓ |

### Collections Moderator

| Feature | View | Create | Edit | Delete |
| --- | --- | --- | --- | --- |
| Collections | ✓ | ✓ | ✓ | ✓ |

### Go Links Moderator

| Feature | View | Create | Edit | Delete |
| --- | --- | --- | --- | --- |
| Go Links (own) | ✓ | ✓ | ✓ | ✓ |
| Go Links (public) | ✓ | ✓ | ✓ | ✓ |

### Pinned Results Moderator

| Feature | View | Create | Edit | Delete |
| --- | --- | --- | --- | --- |
| Pinned Results (own) | ✓ | ✓ | ✓ | ✓ |
| Pinned Results (public) | ✓ | ✓ | ✓ | ✓ |

### Teams Moderator

| Feature | View | Create | Edit | Delete |
| --- | --- | --- | --- | --- |
| Teams (own) | ✓ | ✓ | ✓ | ✓ |
| Teams (public) | ✓ | ✓ | ✓ | ✓ |

### Verification Moderator

| Feature | View | Create | Edit | Delete |
| --- | --- | --- | --- | --- |
| Verification (own docs) | ✓ | ✓ | ✓ | ✓ |
| Verification (all docs) | ✓ | ✓ | ✓ | ✓ |

## Special Access Permissions[​](#special-access-permissions "Direct link to Special Access Permissions")

These additional permissions require more careful consideration when assigning to users.

### Insights Moderator

Provides access to the Insights dashboard and CSV downloads of organizational Glean usage data.

info

Recommended for Senior Leadership only

| Feature | View | Create | Edit | Delete |
| --- | --- | --- | --- | --- |
| Insights | ✓ | N/A | N/A | N/A |

### Billing Moderator

Provides access to the credits dashboard to view credit usage and spending data.

info

Recommended for finance teams and cost center owners.

| Feature | View | Create | Edit | Delete |
| --- | --- | --- | --- | --- |
| Credits Dashboard | ✓ | N/A | N/A | N/A |

### MCP Server Moderator

Lets designated users create and manage Glean MCP servers and view MCP insights, without full Admin access. This role does not grant permission to manage third party MCP host connections. Use the existing tool administration permissions to create, update, delete, refresh, repair, or manage templates for those connections.

info

Recommended for teams that manage MCP servers, such as engineering, go-to-market, or AI platform teams.

| Feature | View | Create | Edit | Delete |
| --- | --- | --- | --- | --- |
| Glean MCP servers | ✓ | ✓ | ✓ | ✓ |
| MCP insights | ✓ | N/A | N/A | N/A |

### Security-Related Permissions[​](#security-related-permissions "Direct link to Security-Related Permissions")

### Admin Search

warning

This role requires Super Admin assignment and should be restricted to security team members only.

Enables searching across all company documents for sensitive data and ownership determination.

| Feature | View | Create | Edit | Delete |
| --- | --- | --- | --- | --- |
| Admin Search | ✓ | ✓ | N/A | N/A |

### Sensitive Content Moderator

warning

This role requires Super Admin assignment and should be restricted to security team members only.

Provides access to Sensitive Content (DLP) features and DLP Findings Reports management.

| Feature | View | Create | Edit | Delete |
| --- | --- | --- | --- | --- |
| DLP Reporting | ✓ | ✓ | ✓ | ✓ |

## Agent Permissions[​](#agent-permissions "Direct link to Agent Permissions")

[

### Agent Permissions

Refer to the Managing agent access article for more information on Agent Roles and Permissions.







](/administration/managing-agents/agent-access#agent-roles)
