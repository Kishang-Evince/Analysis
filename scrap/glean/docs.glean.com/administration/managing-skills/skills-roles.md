---
url: "https://docs.glean.com/administration/managing-skills/skills-roles"
canonical: "https://docs.glean.com/administration/managing-skills/skills-roles"
title: "Set up Skills and manage access"
description: "How to set up Skills and manage Skills access."
fetched_at: "2026-09-01T13:29:10.190Z"
---
On this page

Admins can enable Skills for their organization and assign the Skills Moderator role to control how users can share Skills.

Prerequisite

You need the Admin, Super Admin, or Setup Admin role to manage Skills access. See [About Role Based Access Control (RBAC)](/administration/identity/roles/about) for more information.

## Set up Skills management[​](#set-up-skills-management "Direct link to Set up Skills management")

Before teammates can create and share Skills, an admin enables Skills in the Admin console.

1.  Navigate to **Admin console → Skills**.
2.  In the **Setup** tab, review the current configuration:
    -   **Skills in Assistant**: Choose the rollout state for Skills in Assistant. See [Roll out Skills to a test group](#roll-out-skills-to-a-test-group).
    -   **Third-party skills**: Allow teammates to import Skills authored outside your organization, for example from GitHub.
    -   **Skill sharing**: Turn on **Allow teammates to share skills** to enable Skill sharing. This setting does not automatically give default users permission to share Skills with every audience. See [Manage default user permissions](#manage-default-user-permissions) to choose which audiences they can share with. Teammates can use Skills shared with them even if they don’t have permission to share Skills themselves.

The **Manage** tab lists all Skills shared at the organization level, with search and filters for **By Glean** and **Third-party** Skills, so moderators and admins can review and manage them.

## Roll out Skills to a test group[​](#roll-out-skills-to-a-test-group "Direct link to Roll out Skills to a test group")

Admins can validate Skills with a small group of teammates before rolling them out organization-wide. Under **Skills in Assistant** in the **Setup** tab, choose one of three rollout states:

-   **Disabled** - Skills in Assistant aren't available to anyone in your organization.
-   **Enabled for test group only** - Only teammates in the test group can use Skills in Assistant. Use this state to pilot Skills with a small audience before a broader rollout.
-   **Enabled for all teammates** - Skills in Assistant are available to everyone in your organization.

### Add teammates to the test group[​](#add-teammates-to-the-test-group "Direct link to Add teammates to the test group")

1.  Navigate to **Admin console → Skills**.
2.  In the **Setup** tab, expand **Skills in Assistant**.
3.  Select **Enabled for test group only**.
4.  In the **Search for teammates to add** field, start typing a teammate's name and select them from the suggestions. Repeat to add more teammates.
5.  To remove a teammate from the test group, open the context menu (three dots) next to their name and select **Remove**.
6.  Click **Save** to apply changes.

note

-   The test group supports up to **100 individual teammates**. Departments and identity provider groups aren't supported as test group audiences.
-   **Save** is disabled until you change the rollout state or the list of teammates. When **Enabled for test group only** is selected, **Save** is also disabled if the test group is empty.
-   Switching to **Disabled** clears the saved test group. Switching back from **Disabled** requires you to add teammates again before saving.
-   Switching between **Enabled for test group only** and **Enabled for all teammates** preserves the saved test group. If you later switch back to **Enabled for test group only**, your previous teammates are still listed.

## Skills roles and permissions[​](#skills-roles-and-permissions "Direct link to Skills roles and permissions")

Skills use Role Based Access Control. Every teammate can create and manage their own Skills; moderator roles add the ability to manage and share other people's Skills within a scope.

| Role | Scope | Access level | Can create Skills | Can share Skills | Can assign Skills Moderator role | Can auto-enable Skills |
| --- | --- | --- | --- | --- | --- | --- |
| Default user | Personal | Owner of their own Skills | Yes | Within the scopes the admin has enabled in **Default Member permissions** (none by default) | No | No |
| Skills Moderator | Organization | Owner-level access to all Skills shared at the organization level | Yes | To any scope | No | Yes, at any scope |
| Admin / Super Admin | All | Owner-level access to all Skills shared at the organization level | Yes | To any scope | Yes, to any user | Yes, at any scope |

note

-   **Admin console access:** Admins can browse all shared Skills from the Admin console management surface and have full management rights for Skills shared at their respective scopes.
-   **Visibility:** Admins cannot view private Skills that are not shared with anyone. Skills Moderators can only manage Skills within their assigned scope.

Glean plug-in for coding hosts

Skills available through the Glean plug-ins for Cursor, Claude Code, and Codex follow the same rollout, sharing, and access controls described on this page. Installing a plug-in doesn't automatically grant access to restricted or unpublished skills. For more information, see [Glean plug-in for coding hosts](/administration/platform/mcp/glean-plugin).

## Assign the Skills Moderator role[​](#assign-the-skills-moderator-role "Direct link to Assign the Skills Moderator role")

Admins can assign Skills Moderator to allow specific users to manage Skills within their scope.

To assign a Skills Moderator role:

1.  Navigate to **Admin console → User roles**.
2.  Locate the user you want to assign the Skills Moderator role to.
3.  Select the context menu (three dots) for that user.
4.  Click **Edit role** to open the role assignment dialog.
5.  In the role list, select the **Skills Moderator** role.
6.  Click **Save** to assign the role.

## Manage default user permissions[​](#manage-default-user-permissions "Direct link to Manage default user permissions")

Admins control what default users (teammates without an assigned moderator role) can do when sharing their own Skills.

1.  Navigate to **Admin console → User roles**.
2.  Select **Default Member permissions**.
3.  Under **Can share skills**, configure the following options for default users. All toggles default to **Off**:
    -   **With teammates** - share with named individuals.
    -   **With departments** - share with departments configured in your workspace.
    -   **With identity provider groups** - share with groups from your identity provider. This toggle only appears when external groups are configured for your workspace.
    -   **With entire company** - share company-wide.

These settings set the baseline for default users. Teammates with the Skills Moderator role can share within their scope regardless of these defaults. Changes can take up to 15 minutes to take effect.

note

You can also turn the **With teammates** permission on or off directly from the **Skill sharing** card on **Admin console → Skills → Setup**.
