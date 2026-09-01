---
url: "https://docs.glean.com/administration/identity/roles/faq"
canonical: "https://docs.glean.com/administration/identity/roles/faq"
title: "RBAC FAQ"
description: "Super Admin"
fetched_at: "2026-09-01T13:29:07.361Z"
---
On this page

## Super Admin[​](#super-admin "Direct link to Super Admin")

### What is the Super Admin role?

The Super Admin role in Glean is a powerful role that controls access to Glean’s security features, including the Sensitive Content Report (DLP), Sensitive Content Search, and Client API Token. This role is not automatically assigned by Glean.

The Super Admin role has all the Admin permissions plus the following:

-   Can assign the Admin Search role
-   Can assign the DLP moderator role
-   Can create global scope API tokens
-   Can assign the Super Admin role and any other permission or role

The tools of a Super Admin are logged, including user, tool, and timestamp details. Once a user is granted Super Admin status, they have continuous access to the associated permissions and features.

-   More information: [Manage Users](/administration/identity/roles/manage-users)

### How can a user get first-time super admin role access?

-   Get in touch with your Glean Account Manager or [file a ticket](https://support.glean.com/hc/en-us) with Glean Support.
-   CSM will request for a written email authorization from a high-level approver at the customer's end. This person should ideally be a CxO role or VP and above who is typically responsible for giving security access to others in their organization.
-   Once an email approval is obtained, the super admin access would be granted in 1-2 days.

### How can a user be granted Super Admin role access after the initial Super Admin is created for your company?

Contact your company’s existing Glean super admin and they should be able to assign other users to be Super Admins.

## User Permissions[​](#user-permissions "Direct link to User Permissions")

### What are 'Default Member permissions'?

In Glean, they refer to the set of permissions that are automatically assigned to all members when they join the workspace. These permissions can be managed and modified by Admins.

### Where can I configure Default Member permissions?

Admins can configure default member permissions in **Admin console → Users & permissions → User roles**. Select the "⚙ Default Member permissions" button near the top right corner of the table. For smaller teams, Glean recommends keeping most of the permissions toggled on by default.

### How do I make adjustments to individual users' permissions?

If you want to adjust the permissions of an individual, you can go back to the main User roles page, find the specific individual in the table, click on the ⋮ menu, then "Edit roles". You'll be able to see the different permissions associated with different roles (i.e. Super Admin, Admin, Setup Admin, Member). You can also scroll to the bottom of the modal and assign additional permissions (e.g. sensitive content moderator).

## Group-based Permissions[​](#group-based-permissions "Direct link to Group-based Permissions")

### Can I assign roles using identity provider groups (e.g., Azure AD, Google Groups, or Okta)?

Yes, if group-based permissions are enabled for your deployment. Glean can sync groups and membership from supported identity providers (Azure AD, Google Workspace, and Okta) and let you map those groups to Glean roles (Admin, Setup Admin, Member, and additional Moderator roles) from the User roles page. Users then inherit permissions from all of the groups they belong to, in addition to any roles you've assigned directly to them.

For more information, see [Group-based Permissions](/administration/identity/roles/group-based-permissions).

### Does group-based permissions change connector permissions or IdP permission rules?

No. Glean only **reads** groups and members from your identity provider. It does not sync or enforce IdP permission rules, and it never overrides your connector ACLs. All document- and app-level permissions continue to be enforced by the original source systems.

### Is Okta group-based role assignment supported?

Yes. Native Okta groups and memberships can be mapped to Glean roles after the Okta connector has the `okta.groups.read` scope, native groups are enabled, and an identity crawl completes. See [Group-based Permissions](/administration/identity/roles/group-based-permissions) for setup details.

### How do permissions work when a user belongs to multiple groups?

Glean computes effective permissions by merging all role assignments from the user's direct assignments and group memberships:

-   **Primary role**: The highest-precedence role wins (**Super Admin → Admin → Setup Admin → Member**)
-   **Secondary roles**: All secondary roles from all sources are combined

For example, if a user is directly assigned the Admin role and also belongs to a group with Setup Admin + Agent Creator, their effective permissions would be Admin (primary) plus Agent Creator (secondary).

### How do I remove a role that a user inherited from a group?

Roles inherited from groups cannot be directly removed in Glean. To change a user's group-derived permissions, you must update their group membership in your identity provider (Azure AD, Google Workspace, or Okta). The change will sync to Glean automatically.
