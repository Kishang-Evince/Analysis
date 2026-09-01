---
url: "https://docs.glean.com/troubleshooting/error-codes/github/github-4"
canonical: "https://docs.glean.com/troubleshooting/error-codes/github/github-4"
title: "GITHUB_4"
description: "GITHUB_4 Error Code"
fetched_at: "2026-09-01T13:30:19.173Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

When setting up the Github instance, we were unable to validate that one or more of the entered repositories exist using the Repositories REST API. We allow admins to specify which repositories should be included or excluded from the content crawl and validate that they exist.

## Possible causes and resolution[​](#possible-causes-and-resolution "Direct link to Possible causes and resolution")

For each entered repository:

-   Ensure that the full repository is included and spelled correctly. The format of the repository should be `<organization>/<repository>`, e.g. `octocat/Hello-World`
-   Ensure that the repository exists within your Github organization and is not deleted.
-   If private, ensure that the credentials provided to Glean allow us to fetch the repository.

Once updated, the changes should be reflected immediately since we are validating directly from Github's API.

If you are still having difficulty please reach out to us: [https://support.glean.com](https://support.glean.com)
