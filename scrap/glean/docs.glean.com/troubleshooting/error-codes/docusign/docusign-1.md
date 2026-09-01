---
url: "https://docs.glean.com/troubleshooting/error-codes/docusign/docusign-1"
canonical: "https://docs.glean.com/troubleshooting/error-codes/docusign/docusign-1"
title: "DOCUSIGN_1"
description: "DOCUSIGN_1 Error Code"
fetched_at: "2026-09-01T13:30:12.954Z"
---
On this page

## Possible error[​](#possible-error "Direct link to Possible error")

-   The credentials provided could not be validated.

## Possible reasons[​](#possible-reasons "Direct link to Possible reasons")

-   The DocuSign account ID does not match the connected account.
-   The API base URI does not match the DocuSign environment for your account.
-   The OAuth app lacks the required scopes.

## Possible resolutions[​](#possible-resolutions "Direct link to Possible resolutions")

To resolve this error, try one or more of the following resolutions:

### Verify API base URI and account ID[​](#verify-api-base-uri-and-account-id "Direct link to Verify API base URI and account ID")

Confirm that your DocuSign configuration uses the correct **API Base URI** and **API Account ID** for the connected account.

### Check OAuth scopes[​](#check-oauth-scopes "Direct link to Check OAuth scopes")

Ensure the OAuth app includes all required DocuSign scopes for your integration.

For more information, see [DocuSign connector](/connectors/native/docusign/).

If you continue to see this error, contact [Glean Support](https://support.glean.com).
