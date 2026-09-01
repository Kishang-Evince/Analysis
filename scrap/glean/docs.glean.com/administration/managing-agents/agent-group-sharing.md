---
url: "https://docs.glean.com/administration/managing-agents/agent-group-sharing"
canonical: "https://docs.glean.com/administration/managing-agents/agent-group-sharing"
title: "Share agents with identity provider groups"
description: "Share agents with Google Groups or Azure Active Directory/Entra ID groups so the right teams get access without adding people individually."
fetched_at: "2026-09-01T13:29:09.788Z"
---
On this page

You can share Glean agents with your organization's existing identity provider (IdP) groups instead of adding people one by one or sharing with entire departments. When an agent is shared with a group, every member of that group receives the assigned permission level (Viewer, Editor, or Owner).

Supported identity providers:

-   **Google Groups** (requires the [Google Groups connector](/connectors/native/gcal/))
-   **Azure Active Directory/Entra ID Groups** (requires the [Microsoft 365 (O365) connector](/connectors/native/onedrive/))

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before users can share agents with IdP groups, two things must be configured:

1.  The corresponding connector must be set up and actively syncing groups into Glean:
    -   For **Google Groups**: set up the [Google Groups connector](/connectors/native/gcal/) (which requires a connected Google Drive instance).
    -   For **Azure Active Directory/Entra ID Groups**: set up the [Microsoft 365 (O365) connector](/connectors/native/onedrive/).
2.  An admin must select which IdP source to use for agent group sharing in the Admin Console. See [Configure the IdP source for agent group sharing](#configure-the-idp-source-for-agent-group-sharing).

## Configure the IdP source for agent group sharing[​](#configure-the-idp-source-for-agent-group-sharing "Direct link to Configure the IdP source for agent group sharing")

An admin must choose which identity provider supplies the groups that appear when sharing agents.

1.  Navigate to the **Admin Console → Agents**.
2.  Under the **Manage** tab, go to **Sharing agents to Identity Groups**, and select the identity provider you want to use:
    -   **Google Groups**
    -   **Azure Active Directory/Entra ID Groups**

info

It may take up to 4 hours for changes to the configured IdP source to take effect.

warning

Only one IdP source can be active for agent group sharing at a time. If your organization uses both Google Groups and Azure Active Directory/Entra ID, choose the one that best represents your team structure.

### Enable group sharing for default members[​](#enable-group-sharing-for-default-members "Direct link to Enable group sharing for default members")

By default, only Admins and Agent Moderators can share agents with IdP groups. To allow default members to share agents with groups they belong to:

1.  Navigate to the **Admin Console → users**.
2.  Select the **Default Member permissions** button.
3.  Under **Can share agents**, enable the **With identity provider groups** toggle.

When this setting is enabled, default members can share agents with IdP groups they are a member of. Admins and Agent Moderators can always see and share to all IdP groups from the configured identity provider, regardless of this setting.

### Share an agent with an IdP group[​](#share-an-agent-with-an-idp-group "Direct link to Share an agent with an IdP group")

After the IdP source is configured and sharing is enabled:

1.  Open the agent you want to share.
2.  Open the **People with access** panel.
3.  Search for the group by name using the group picker.
4.  Select the group and assign the desired permission level:
    -   **Viewer** — can use the agent
    -   **Editor** — can use and edit the agent
    -   **Owner** — can use, edit, and manage sharing for the agent
5.  Confirm the selection.

Users who are already members of the selected group will receive the assigned permissions immediately on their next request.

info

The group picker is optimized for type-ahead search and displays a maximum of 20 groups at a time. Type at least a few characters to narrow results.

### How access updates work[​](#how-access-updates-work "Direct link to How access updates work")

Glean evaluates group-based agent permissions at request time using the group membership data already synced from your identity provider. Keep the following in mind:

-   Sharing with an existing group takes effect immediately: When you share an agent with an IdP group, users who are already members of that group gain access on their next request and there is no additional sync wait.
-   Group membership changes in your IdP are not immediate: If someone is added to or removed from a group in your identity provider, the change takes effect in Glean after the next identity sync cycle.
-   Permissions are inherited: If a user is a member of a group that has been granted access to an agent, they receive that permission level automatically.
-   Individual and group permissions coexist: A user can have access through both individual sharing and group sharing. The highest permission level applies.
