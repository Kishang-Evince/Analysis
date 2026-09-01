---
url: "https://docs.glean.com/troubleshooting/error-codes/microsoft/office365/o365-application-count"
canonical: "https://docs.glean.com/troubleshooting/error-codes/microsoft/office365/o365-application-count"
title: "O365_APPLICATION_COUNT"
description: "O365_APPLICATION_COUNT Error Code"
fetched_at: "2026-09-01T13:30:27.873Z"
---
Glean now requires setting up multiple applications for the Onedrive/Sharepoint integration for mid-sized enterprises and beyond. Each application should have both Graph API and REST API scopes.

-   Microsoft APIs (both Graph APIs and REST APIs) are subject to strict throttling limits.
-   Glean shards different types of API calls amongst each individual application.
-   Without multiple applications, Glean's Onedrive/Sharepoint connector will have significantly reduced fidelity.
-   Glean recommends at least five additional applications.
-   Glean validates each additional application has the proper API scopes during setup.
