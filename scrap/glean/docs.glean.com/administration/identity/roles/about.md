---
url: "https://docs.glean.com/administration/identity/roles/about"
canonical: "https://docs.glean.com/administration/identity/roles/about"
title: "About Role Based Access Control (RBAC)"
description: "Glean offers a robust Role-Based Access Control (RBAC) system that allows for management of user and administrator permissions within the platform"
fetched_at: "2026-09-01T13:29:07.375Z"
---
On this page

Glean's Role-Based Access Control (RBAC) system provides comprehensive management of user and administrator permissions within the platform. This system ensures that both users and administrators have appropriate access to features and data while maintaining security and organizational control.

info

Only users with the **Admin** or **Super Admin** roles can manage RBAC within Glean.

## Administrator Roles[​](#administrator-roles "Direct link to Administrator Roles")

Administrator roles in Glean follow a hierarchical structure with increasing levels of privilege. The platform offers three distinct administrator roles.

info

Roles can be assigned to both individual users and identity provider groups. When using [group-based permissions](/administration/identity/roles/group-based-permissions), users automatically inherit roles from the groups they belong to in Azure AD, Google Workspace, or Okta.

### Setup Admin

Setup Admins can:

-   Configure Single Sign-On
-   Set up integrations between Glean and connectors (M365, Google, GitHub, Atlassian, etc.)
-   Initiate content crawls

### Admin

Admins have comprehensive control including:

-   Full access to Glean Workspace settings
-   Management of roles and permissions for other users
-   Configuration of general settings (UI theme, company name, feature enablement)

### Super Admin

The Super Admin role is reserved for security team members and provides:

-   Access to security tooling like Sensitive Content Search and DLP
-   Enhanced security management capabilities

warning

This role requires written authorization from your company's CISO or Security Manager due to its access to sensitive content.

For detailed information about administrator roles and their specific capabilities, see the [Administrator Roles](/administration/identity/roles/admin-roles) documentation.

## User Roles[​](#user-roles "Direct link to User Roles")

Glean implements a streamlined approach to user roles with a single primary role: **Member**.

info

Members can receive additional **Moderator** permissions from Admins or Super Admins, allowing them to manage content within specific features of the Glean platform. However, Members (including those with Moderator permissions) cannot access the Admin UI or Admin Console. Moderator permissions can also be assigned via [group-based permissions](/administration/identity/roles/group-based-permissions).

For more information about user roles and moderator permissions, refer to our [User Roles](/administration/identity/roles/user-roles) documentation.
