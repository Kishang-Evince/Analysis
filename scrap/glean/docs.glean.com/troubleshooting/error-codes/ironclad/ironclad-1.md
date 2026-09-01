---
url: "https://docs.glean.com/troubleshooting/error-codes/ironclad/ironclad-1"
canonical: "https://docs.glean.com/troubleshooting/error-codes/ironclad/ironclad-1"
title: "IRONCLAD_1"
description: "IRONCLAD_1 Error Code"
fetched_at: "2026-09-01T13:30:22.730Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

The OAuth token provided is missing one or more required scopes. The Ironclad connector requires specific permissions to access records, workflows, entities, and other relevant information.

## Resolution[​](#resolution "Direct link to Resolution")

Ensure that your Ironclad OAuth application has been configured with all of the required scopes specified in the setup instructions.

To fix this issue:

1.  Go to your Ironclad instance and navigate to the OAuth application settings.
2.  Verify that all the required scopes listed in the setup instructions are enabled for your application in the scopes section.
3.  If any scopes are missing, add them to your OAuth application configuration.
4.  Re-authenticate the connector in Glean to obtain a new access token with the correct scopes.

For additional assistance, please contact Glean Support at [https://support.glean.com](https://support.glean.com)
