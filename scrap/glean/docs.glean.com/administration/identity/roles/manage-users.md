---
url: "https://docs.glean.com/administration/identity/roles/manage-users"
canonical: "https://docs.glean.com/administration/identity/roles/manage-users"
title: "Managing Users"
description: "The User roles page in the Admin Console allows you to manage users of Glean and their associated roles."
fetched_at: "2026-09-01T13:29:07.468Z"
---
On this page

note

Only users with the **Admin** or **Super Admin** roles can access the **User roles** page.

## Access the **User roles Page**[​](#access-the-user-roles-page "Direct link to access-the-user-roles-page")

 [Admin Console → Users & permissions → User roles](https://app.glean.com/admin/teammates)

The **User roles page** displays all users in your organization who have access to Glean. From here, you can:

-   View a list of all users
-   See their departments and assigned roles
-   Manage user permissions
-   Search for specific users
-   Filter users by department or role

## Invite users[​](#invite-users "Direct link to Invite users")

To invite new users to your Glean instance:

1.  From the **User roles** page, click the "Invite teammates" button in the top-right corner
2.  This will take you to the Invite users page where you can manage Slack and Email invites
3.  Use the search box to find specific users to invite
4.  Filter by departments using the dropdown menu
5.  To send invites:
    -   Click the Slack button to invite via Slack
    -   Click the Email button to invite via Email
6.  You can also download invite statistics by clicking "Download stats"

The **Invite teammates** page shows different tabs for tracking invitation status:

-   Not invited
-   Invite sent
-   Signed up
-   All users

## Manage user roles[​](#manage-user-roles "Direct link to Manage user roles")

Glean offers several user roles with different permission levels:

-   **Super Admin**: Targeted at security team members who need access to sensitive content
-   **Admin**: Regular administrators who maintain Glean
-   **Setup Admin**: Can help add connectors but aren't involved in general maintenance
-   **Member**: Standard users who can access content but have limited creation abilities

More information:

-   [About Role Based Access Control (RBAC)](/administration/identity/roles/about)
-   [Administrator Roles](/administration/identity/roles/admin-roles)
-   [User Roles](/administration/identity/roles/user-roles)

### Edit a user's role[​](#edit-a-users-role "Direct link to Edit a user's role")

To change a user's role:

1.  On the **User roles page**, find the user you want to edit
2.  Click the three-dot menu (⋮) at the end of the user's row
3.  Select "Edit roles" from the dropdown menu
4.  In the "Edit role" dialog, select the appropriate primary role
5.  Optionally, assign additional roles by checking the boxes under "Additional roles"
6.  Click "Save" to apply the changes

### Set default member permissions[​](#set-default-member-permissions "Direct link to Set default member permissions")

You can set default permissions for all users with the Member role:

1.  From the **User roles** page, click "Default Member permissions"
2.  Toggle the switches to enable or disable specific permissions:
    -   Can create new Answers
    -   Can create new Collections
    -   Can create new public Pins
    -   Can create new Go Links
    -   Restrict Go Links edit access to admins and owners by default
    -   Can create and save new Agents
3.  Changes may take up to 15 minutes to take effect

### Manage group-based roles[​](#manage-group-based-roles "Direct link to Manage group-based roles")

In addition to assigning roles to individual users, you can assign roles to identity provider groups (Azure AD, Google Groups, or Okta). Users who belong to these groups automatically inherit the assigned roles.

To configure group-to-role mappings:

1.  From the **User roles** page, click **Default Member permissions**.
2.  Navigate to the **User group permissions**.
3.  Select your identity provider (Microsoft 365, Google Workspace, or Okta).
4.  Click **Add mapping** to assign a Glean role to an IdP group.
5.  Search for and select the group, then choose the primary role and any secondary roles.
6.  Click **Save changes**.

info

When a user has roles from both direct assignment and group membership, Glean uses the highest-precedence primary role and combines all secondary roles. For detailed information, see [Group-based Permissions](/administration/identity/roles/group-based-permissions).

note

Roles inherited from groups cannot be removed from individual users in Glean. To change a user's group-derived permissions, update their group membership in your identity provider.

## Manage sessions[​](#manage-sessions "Direct link to Manage sessions")

For security reasons, you may need to sign users out of all their active sessions.

### Sign a user out of all sessions[​](#sign-a-user-out-of-all-sessions "Direct link to Sign a user out of all sessions")

1.  On the **User roles** page, find the user you want to sign out
2.  Click the three-dot menu (⋮) at the end of the user's row
3.  Select "Sign out of all sessions" from the dropdown menu
4.  Review the active sessions listed, showing:
    -   Session start time and date
    -   IP address and location
    -   Device and browser information
5.  Click "Sign user out of all sessions" to confirm
6.  The user will need to re-authenticate via SSO to access Glean on all devices

note

Signing out of Embedded Search and Chat is not yet supported. It may take up to 5 minutes for changes to take effect.

## Best Practices for User Management[​](#best-practices-for-user-management "Direct link to Best Practices for User Management")

-   Regularly review user permissions to ensure appropriate access levels
-   Remove access for users who have left your organization
-   Use the "Super Admin" role sparingly for security purposes
-   Consider using department-based permissions for more granular control
-   Review active sessions periodically to identify any suspicious login activity
-   Use [group-based permissions](/administration/identity/roles/group-based-permissions) to manage roles at scale and ensure permissions stay synchronized with your identity provider
