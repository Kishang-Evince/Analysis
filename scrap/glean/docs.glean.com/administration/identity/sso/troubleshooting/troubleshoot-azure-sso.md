---
url: "https://docs.glean.com/administration/identity/sso/troubleshooting/troubleshoot-azure-sso"
canonical: "https://docs.glean.com/administration/identity/sso/troubleshooting/troubleshoot-azure-sso"
title: "Troubleshoot Azure SSO"
description: "Resolve common Azure Single Sign-On (SSO) authentication issues in Glean"
fetched_at: "2026-09-01T13:29:07.869Z"
---
On this page

When using Azure as your authentication method, users may encounter various login issues. This guide covers common authentication errors and their resolutions.

## User Redirected to Login Screen[​](#user-redirected-to-login-screen "Direct link to User Redirected to Login Screen")

### Error[​](#error "Direct link to Error")

User redirected to login screen

### Cause[​](#cause "Direct link to Cause")

This issue typically occurs when a user's email domain in Azure has not been added to Glean's allowed domains list.

### Resolution[​](#resolution "Direct link to Resolution")

Contact Glean Support to request the addition of the user's domain to your instance's allowed domains list.

## Error Code 13: SSO Code Exchange Failure[​](#error-code-13-sso-code-exchange-failure "Direct link to Error Code 13: SSO Code Exchange Failure")

### Error[​](#error-1 "Direct link to Error")

SSO code exchange failed \[Error Code 13\]

### Cause[​](#cause-1 "Direct link to Cause")

This error appears when the client secret for your Azure App has expired.

### Resolution[​](#resolution-1 "Direct link to Resolution")

1.  Navigate to your Azure App configuration
2.  Generate a new client secret
3.  Access the Admin Console
4.  Go to **Setup → Authentication**
5.  Select your Azure App
6.  Update the Client Secret field with the new value
7.  Update the Client secret expiration date field with the expiration date from Azure.
8.  Save the App configuration

## Error Code 14: User Authentication Failure[​](#error-code-14-user-authentication-failure "Direct link to Error Code 14: User Authentication Failure")

### Error[​](#error-2 "Direct link to Error")

Cannot authenticate user from access token \[Error code 14\]

### Cause[​](#cause-2 "Direct link to Cause")

This error occurs when the user information request fails. Glean requires both email and name fields to be returned in the user information response. The error typically indicates that one or both of these fields are empty.

### Resolution[​](#resolution-2 "Direct link to Resolution")

1.  Access the Azure Admin portal
2.  Locate and view the user's properties
3.  Verify that both email and name fields contain valid values
