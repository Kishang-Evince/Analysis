---
url: "https://docs.glean.com/connectors/native/productboard/setup"
canonical: "https://docs.glean.com/connectors/native/productboard/setup"
title: "Set up Productboard"
description: "Register a Productboard OAuth app and connect a Productboard workspace to Glean"
fetched_at: "2026-10-13T08:50:12.141Z"
---
On this page

Set up the Productboard connector with a customer-managed OAuth 2.0 application. A Productboard maker with admin access (workspace admin) must create the app and authorize Glean.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before you begin, confirm that you have:

-   Access to the **Admin console**
-   The Productboard **maker with admin access** role
-   Permission to create an OAuth 2.0 application in Productboard
-   The exact redirect address shown in the Productboard setup instructions in Glean

The connector uses one authorization from a Productboard maker with admin access for each configured connector instance. Glean supports multiple Productboard connector instances, but you must configure and authorize each instance.

## Register an OAuth application[​](#register-an-oauth-application "Direct link to Register an OAuth application")

1.  Sign in to Productboard as a maker with admin access.
2.  Open [OAuth2 Applications](https://app.productboard.com/oauth2/applications).
3.  Create an **OAuth 2.0 application**. Do not select a Server or Public client.
4.  Enter an application name, such as `Glean`.
5.  In **Redirect / Callback URL**, enter the exact redirect address shown in the Productboard setup instructions in the **Admin console**.
6.  Grant the required API V2 scopes from [Required OAuth scopes](#required-oauth-scopes).
7.  Create the application.
8.  Copy the generated **Client ID** and **Client Secret**.

Store the client secret securely. You need it when you configure the connector in Glean.

## Required OAuth scopes[​](#required-oauth-scopes "Direct link to Required OAuth scopes")

Grant these read-only Productboard API V2 scopes:

| Scope | Purpose |
| --- | --- |
| `entities:read` | Read products, components, features, subfeatures, and their field schemas |
| `notes:read` | Read notes and note field schemas |
| `members:read` | Read active workspace members and their Productboard member IDs |
| `members:pii:read` | Expose member, owner, and creator email fields so Glean can create member identity records |

Productboard returns `[redacted]` instead of member email addresses when `members:pii:read` is missing. Glean matches document owners to identity records by Productboard member ID. It also needs a usable email address to create each member identity record. If an email address is redacted, Glean skips that member and cannot match documents to that owner.

## Configure Productboard in Glean[​](#configure-productboard-in-glean "Direct link to Configure Productboard in Glean")

1.  Go to **Admin console → Connectors → Add connector**.
2.  Select **Productboard**.
3.  Enter an organization-visible connector name.
4.  Open the Productboard setup instructions and copy the displayed redirect address into your Productboard OAuth application if you have not already done so.
5.  In **Client ID**, enter the client ID from the Productboard OAuth application.
6.  In **Client secret**, enter the client secret from the same application.
7.  Click **Save**.
8.  Click **Authorize**.
9.  Sign in to Productboard as a maker with admin access and complete the consent flow.

Success

After authorization, Glean validates access to members, roadmap entities, notes, and member email addresses. The connector can then start its initial crawls.

## Understand setup validation[​](#understand-setup-validation "Direct link to Understand setup validation")

Glean runs these checks when you save and authorize the connector:

| Check | Result and action |
| --- | --- |
| Member access | Setup fails if Glean cannot list workspace members or the list is empty. Confirm the app has `members:read` |
| Roadmap access | Setup fails if Glean cannot read features. Confirm the app has `entities:read` |
| Notes access | Setup fails if Glean cannot read notes. Confirm the app has `notes:read` |
| Member email access | Setup fails if Productboard redacts member email addresses. Confirm the app has `members:pii:read` |
| Roadmap content | Setup shows a warning when the workspace has no features to index. Add roadmap content or continue without it |
| Notes content | Setup shows a warning when the workspace has no notes to index. Add notes or continue without them |

If roadmap items exist but Glean cannot determine the Productboard workspace address from them, contact [Glean Support](https://support.glean.com) with the connector instance name and validation error.

## Verify the connection[​](#verify-the-connection "Direct link to Verify the connection")

After the initial crawls complete:

1.  Search for a known Productboard feature, component, product, subfeature, or note.
2.  Open the result and confirm that it opens the expected Productboard item.
3.  Confirm that expected standard and custom fields appear in the result metadata.
4.  Review the [workspace-wide access model](/connectors/native/productboard/permissions#understand-workspace-wide-access) before making the connector available to users.

## Update OAuth credentials[​](#update-oauth-credentials "Direct link to Update OAuth credentials")

If you rotate the Productboard OAuth credentials, update **Client ID** and **Client secret** in the connector configuration. Save the connector and complete authorization again.
