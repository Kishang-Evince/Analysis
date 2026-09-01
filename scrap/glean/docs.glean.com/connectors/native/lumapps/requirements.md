---
url: "https://docs.glean.com/connectors/native/lumapps/requirements"
canonical: "https://docs.glean.com/connectors/native/lumapps/requirements"
title: "LumApps requirements"
description: "Review the requirements for setting up the LumApps connector in Glean."
fetched_at: "2026-09-01T13:29:34.676Z"
---
On this page

To use the LumApps connector, you must meet certain technical, credential, and permission requirements. These ensure secure and complete access to your LumApps data for indexing and search.

## Credential requirements[​](#credential-requirements "Direct link to Credential requirements")

-   OAuth 2.0 credentials: You must authorize Glean to access your LumApps instance using OAuth 2.0. This process provides Glean with a refresh token and an access token.

The access token is used to fetch data from LumApps APIs and the refresh token is used to obtain new access tokens as needed.

## Permission requirements[​](#permission-requirements "Direct link to Permission requirements")

-   The access token inherits the permissions of the admin user, so only content visible to that user will be indexed.
-   Glean enforces all LumApps permissions at query time, ensuring users only see content they are authorized to access.
