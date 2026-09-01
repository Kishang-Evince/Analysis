---
url: "https://docs.glean.com/administration/managing-agents/agent-access"
canonical: "https://docs.glean.com/administration/managing-agents/agent-access"
title: "Manage agent access"
description: "Control how users share agents and what level of access each audience receives, and assign agent roles that govern agent deployment."
fetched_at: "2026-09-01T13:29:09.759Z"
---
On this page

Admins have granular control over how users can share agents. They determine how much agent access an audience gets on a per-agent basis.

Prerequisite

Have the Admin role to manage agent access. See [About Role Based Access Control (RBAC)](/administration/identity/roles/about) for more information.

## Agent access tiers[​](#agent-access-tiers "Direct link to Agent access tiers")

When someone shares an agent with an audience, they can give the audience different levels of access. Only agent owners, moderators, and Admins can assign owner access.

note

By default, unshared agents are only visible to Admins, agent moderators, and the agent creator.

The following table shows capabilities that each level of access grants.

| Level of access to agent | Can see agent in library | Can run agent | Can edit agent | Can delete agent |
| --- | --- | --- | --- | --- |
| Not in sharing audience | No | No | No | No |
| Viewer | Yes | Yes | No | No |
| Editor | Yes | Yes | Yes | No |
| Owner | Yes | Yes | Yes | Yes |

## Agent roles[​](#agent-roles "Direct link to Agent roles")

Admins can assign agent roles to govern agent deployment. These roles have certain privileges:

| Role | Can see agent in library | Can run agent | Can edit agent | Can delete agent | Can disable agent |
| --- | --- | --- | --- | --- | --- |
| Default user | Only if in sharing audience | Only if in sharing audience | Only if has “editor” access or higher | Only if has “owner” access or higher | No |
| Departmental Agent Moderator | Yes, for agents created by members of assigned department(s) | Yes, for agents created by members of assigned department(s) | Yes, for agents created by members of assigned department(s) | Yes, for agents created by members of assigned department(s) | Yes, for agents created by members of assigned department(s) |
| Agent Moderator | Yes | Yes | Yes | Yes | Yes |
| Admin | Yes | Yes | Yes | Yes | Yes |

## Publishing permissions by role[​](#publishing-permissions-by-role "Direct link to Publishing permissions by role")

Publishing permission depends on the user's role and the `agent-create` permission.

| Role | Private agents | Agents shared with specific people or groups | Company-wide agents |
| --- | --- | --- | --- |
| Default member | Can publish when the user has `agent-create` permission. The default-member publishing setting doesn't apply to private agents. | Can publish when the user has `agent-create` permission and the applicable default-member sharing or publishing setting allows it. | Can publish when the user has `agent-create` permission and the company-wide sharing or publishing setting allows it. |
| Agent Creator | Can publish any agent they can edit. | Can publish any agent they can edit. | Can publish any agent they can edit. |
| Agent moderator or Admin | Can publish any agent. | Can publish any agent. | Can publish any agent. |

An explicit agent creator can publish any agent they can edit at any sharing level, including private, shared, and company-wide agents. This permission is not limited by the default-member publish settings.

## Configure default member permissions for agents[​](#configure-default-member-permissions-for-agents "Direct link to Configure default member permissions for agents")

As an admin, you can configure default permissions to control how standard users (any user without an assigned role) create, publish, and share agents in Glean.

### Access default member permissions[​](#access-default-member-permissions "Direct link to Access default member permissions")

note

Publishing requires the `agent-create` permission. A user who only has editor access to an agent can't publish it unless they also have `agent-create` permission. Admin and moderator publishing permissions are unchanged.

1.  Go to **Admin console** > **Users and permissions** > **User roles**.
    
2.  Click **Default Member permissions**.
    
    ![Default Member permissions button on the Teammates page](/img/default-member-permissions-nav.png)
    

### Available permission settings[​](#available-permission-settings "Direct link to Available permission settings")

These permission toggles operate independently. Disabling one setting does not impact the others.

| Permission toggle | Default state | What it controls |
| --- | --- | --- |
| **Can create and publish agents** | On | Allows default members to create new agents and publish updates to existing shared agents. |
| **Can publish agents via embedding, API, and Slack** | Off | Allows members to deploy agents to external channels, including embedded widgets, the API, or Slack. |
| **Can share agents** | On | Allows members to share their owned agents with other users. |

### Agent sharing scope options[​](#agent-sharing-scope-options "Direct link to Agent sharing scope options")

When **Can share agents** is enabled, choose one of the following scope levels:

-   **Department only**: Members can share agents exclusively with teammates in their own department.
    -   **Include identity groups user is a member of**: Check this box to extend sharing access to identity provider (IdP) groups that the user belongs to.
-   **Entire company**: Members can share agents with anyone in the organization.
    -   **Include all identity groups**: Check this box to extend sharing access to every configured IdP group across the company.

note

The identity group checkbox displays only when group-based sharing is enabled. If no IdP groups are configured, an empty state is shown. Configure IdP groups under **Admin console** > **Agents** > **Manage**.

![Can create and publish agents, Can publish agents via embedding, API, and Slack, and Can share agents, settings in Default Member permissions](/img/default-member-agent-permissions.png)

### Publishing approval rules[​](#publishing-approval-rules "Direct link to Publishing approval rules")

Publishing approval is configured independently under **Publishing an agent requires approval**. Select one of three approval modes:

-   **Never**: Users with publishing permissions can publish changes directly without approval.
-   **When shared with the entire company only**: Changes require moderator review only if the agent is shared company-wide.
-   **When shared with specific people or the entire company**: Changes require moderator review for any shared agent (including agents shared with specific individuals).

### Approval workflow[​](#approval-workflow "Direct link to Approval workflow")

When an approval rule is active:

1.  Agent builders submit a request to publish their updates.
2.  Agent moderators or department agent moderators review and publish the staged version.

### Access level assignment rules[​](#access-level-assignment-rules "Direct link to Access level assignment rules")

When an agent is shared, an editor can assign **Viewer**, **Editor**, or **Owner** access levels to other users.

-   **Assigning Owner access**: Restricted exclusively to Agent Owners, Agent Moderators, and Admins.

## Assign agent roles[​](#assign-agent-roles "Direct link to Assign agent roles")

Admins can assign agent roles to any user:

1.  Navigate to **Admin console → Users and permissions → User roles**.
2.  Select the context menu for the user you want to assign an agent role to.
3.  Click **Edit roles** to open the **Edit role** dialog.
4.  For the **Additional roles** section, select the agent roles you want to add:
    -   **Agent Creator**
    -   **Agent Moderator**
    -   **Departmental Agent Moderator** (Select at least one department)
5.  Click **Save** to apply the changes.
