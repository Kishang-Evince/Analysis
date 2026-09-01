---
url: "https://docs.glean.com/administration/identity/roles/admin-roles"
canonical: "https://docs.glean.com/administration/identity/roles/admin-roles"
title: "Administrator Roles"
description: "A comprehensive overview of Glean's administrator roles and their associated permissions"
fetched_at: "2026-09-01T13:29:07.301Z"
---
On this page

Understanding administrative roles is crucial for maintaining a secure and well-managed Glean workspace. Glean provides three distinct administrator roles: **Setup Admin**, **Admin**, and **Super Admin**, each with specific responsibilities and access levels.

## Permission Matrix[​](#permission-matrix "Direct link to Permission Matrix")

| Feature | Setup Admin | Admin | Super Admin | Sensitive Content Moderator |
| --- | --- | --- | --- | --- |
| Manage Authentication Settings (i.e. SSO) | ✓ | ✓ | ✓ | ✗ |
| Connect and Manage connectors | ✓ | ✓ | ✓ | ✗ |
| Initiate Crawls of connectors | ✓ | ✓ | ✓ | ✗ |
| View currently synchronized directory data | ✓ | ✓ | ✓ | ✗ |
| Manage members of the testing group | ✓ | ✓ | ✓ | ✗ |
| Create API Tokens | Indexing API only | ✓1 | ✓2 | ✗ |
| Manage general company settings | ✗ | ✓ | ✓ | ✗ |
| Customize the UI | ✗ | ✓ | ✓ | ✗ |
| Customize the homepage | ✗ | ✓ | ✓ | ✗ |
| Manage roles and permissions within Glean | ✗ | ✓3 | ✓ | ✗ |
| Manage access to in-product support | ✗ | ✓ | ✓ | ✗ |
| Manage Document Visibility in Search | ✗ | ✓ | ✓ | ✓ |
| Manage Environment Alerts | ✗ | ✓ | ✓ | ✗ |
| Manage Glean Assistant Settings | ✗ | ✓ | ✓ | ✗ |
| Manage browser extension support integrations | ✓ | ✓ | ✓ | ✗ |
| Manage emails that are sent to users | ✗ | ✓ | ✓ | ✗ |
| Manage Glean invites and adoption | ✗ | ✓ | ✓ | ✗ |
| Assign Sensitive Content Moderator Access to others | ✗ | ✗ | ✓ | ✗ |
| Access Sensitive Data Search (Admin Search) | ✗ | ✗ | ✓ | ✓ |
| Access Sensitive Findings and Reports | ✗ | ✗ | ✓ | ✓ |
| Access AI Security | ✗ | ✗ | ✓ | ✓ |

These administrator roles can also be assigned to identity provider groups (for example, a Microsoft Entra ID group of IT admins). Users who belong to a group with an administrator role inherit those permissions. See [Group-based permissions](/administration/identity/roles/group-based-permissions).

note

1.  The **Admin** role can generate tokens for all Glean APIs and scopes, **except** global scope.
2.  The **Super Admin** role can generate tokens for all Glean APIs and scopes, **including** global scope.
3.  The **Admin** role cannot assign the Super Admin role or any permissions only assignable by the Super Admin.

To manage configuration for browser-extension support integrations, see [About the browser extension](/administration/management/features/browser/about#configure-agents-for-support-platforms).

## Role Descriptions[​](#role-descriptions "Direct link to Role Descriptions")

### Setup Admin[​](#setup-admin "Direct link to Setup Admin")

### Setup Admin Role

The Setup Admin role is the most restrictive administrator role, focused specifically on application integration and setup. Their permissions include:

-   Connecting and managing Single Sign-On settings
-   Configuring and connecting connector applications
-   Initiating crawls for configured connector apps
-   Generating API tokens specifically for the Indexing API

This role is ideal for administrators of specific connectors that need integration with Glean. For example, assigning this role to your M365 administrator allows them to connect Glean to Entra ID SSO and configure crawling for SharePoint, Teams, and OneDrive.

### Admin[​](#admin "Direct link to Admin")

### Admin Role

Admins possess broader capabilities compared to Setup Admins, including:

-   Managing roles and permissions for all users (except Super Admin role)
-   Configuring general Glean settings (company name, appearance, home page customizations)
-   Managing Glean feature configurations (Org Chat, Glean)
-   Generating API tokens for all Glean APIs (excluding global scope)

### Super Admin[​](#super-admin "Direct link to Super Admin")

### Super Admin Role

The Super Admin role encompasses all Admin permissions plus additional sensitive capabilities:

-   Assigning Admin Search role and DLP moderator role
-   Creating global scope API tokens
-   Assigning the Super Admin role and all other permissions

info

The Super Admin role is disabled by default and requires written authorization from your company's CISO or Security Manager for initial assignment by Glean support. This role is typically reserved for senior security team members due to its access to sensitive content.

warning

Admins cannot downgrade or remove Super Admin permissions from users or groups. Only a Super Admin can modify Super Admin role assignments. Additionally, the last user or group cannot be removed from any administrator role.
