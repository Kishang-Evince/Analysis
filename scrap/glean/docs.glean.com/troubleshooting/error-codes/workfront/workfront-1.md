---
url: "https://docs.glean.com/troubleshooting/error-codes/workfront/workfront-1"
canonical: "https://docs.glean.com/troubleshooting/error-codes/workfront/workfront-1"
title: "WORKFRONT_1"
description: "WORKFRONT_1 Error Code"
fetched_at: "2026-09-01T13:30:35.161Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

Glean failed to authenticate with your Adobe Workfront instance using JSON Web Token (JWT) credentials. This can happen when the credentials are invalid or incorrectly formatted, the JWT token exchange fails, or the server domain is incorrect.

## Resolution[​](#resolution "Direct link to Resolution")

Verify the following configuration values provided during setup:

1.  **Server Domain**: Confirm the domain is correct (for example, `yourcompany.my.workfront.com`).
2.  **Client ID** and **Client Secret**: Ensure they match the OAuth2 application configured in your Workfront instance.
3.  **Customer ID**: Verify the value matches your Workfront customer ID.
4.  **Credentials**: Ensure the key provided is in a valid format.
5.  **Admin User ID**: Confirm this belongs to a user with **System Administrator** access in Workfront.

For additional assistance, contact [Glean Support](https://support.glean.com).
