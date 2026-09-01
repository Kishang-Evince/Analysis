---
url: "https://docs.glean.com/connectors/native/greenhouse/overview"
canonical: "https://docs.glean.com/connectors/native/greenhouse/overview"
title: "Greenhouse overview"
description: "Learn how the Greenhouse connector works with Glean."
fetched_at: "2026-09-01T13:29:31.632Z"
---
On this page

Greenhouse is an applicant tracking and recruiting platform. The Greenhouse connector enables Glean to index and search recruiting and onboarding data from your Greenhouse account.

The connector respects Greenhouse permissions, ensuring only authorized users can access relevant information. Glean understands all user access permissions and strictly enforces permissions for users at the time of the search query. For Greenhouse, this means that Glean respects and applies the user permission levels of basic user, job admin, and site admin.

The connector authenticates using Basic Auth over HTTPS to the Greenhouse Harvest API, ensuring secure, read-only access to the data required for indexing.

## Supported features[​](#supported-features "Direct link to Supported features")

-   The Greenhouse connector is designed to bring key recruiting content from Greenhouse into Glean, respecting native permissioning at every step.
-   The integration focuses on content relevant for search and workflow enablement, while explicitly excluding private and confidential data types.
-   Glean only performs read operations and no data is modified in Greenhouse. Sensitive candidate information like demographic data, salary is not ingested.

## Supported objects[​](#supported-objects "Direct link to Supported objects")

| Objects | Description |
| --- | --- |
| Candidates | Candidate indexing includes contact info, recruiter, and coordinator assignments, excluding those marked `Private` in Greenhouse. |
| Jobs | Jobs indexing includes job title, location, and the hiring team, excluding those marked `Confidential`. |

## Supported API endpoints[​](#supported-api-endpoints "Direct link to Supported API endpoints")

The connector uses the Greenhouse Harvest API to fetch the following endpoints:

-   Applications: Get/List
-   Candidates: Get/List
-   Users: Get/List, User Job Permissions, Pending Approvals
-   Activity Feed: Get
-   Jobs: Get/List, Get hiring team
-   Job Stages: Get
-   User Roles: Get/List

## Limitations[​](#limitations "Direct link to Limitations")

-   Scorecards, interview notes, and resumes are currently not indexed.

## Greenhouse content crawling summary[​](#greenhouse-content-crawling-summary "Direct link to Greenhouse content crawling summary")

-   Glean begins by understanding the users that are a part of the Greenhouse instance and their roles and associated hiring teams.
-   Glean crawls candidates, jobs, parallelizing the content fetching and indexing where possible for maximized efficiency.
-   Glean makes use of webhooks to keep up-to-date with permissions changes, candidate/job updates and deletions, etc.

## Crawling strategy[​](#crawling-strategy "Direct link to Crawling strategy")

Glean performs a full crawl of the content monthly, and makes use of incremental crawls to update existing content and permissions several times every hour.

| Crawl type | Full Crawl | Incremental Crawl | People Data | Activity | Update Rate | Webhook | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Candidates | Yes | Yes | Yes | Yes | Monthly (full), several times/hour (incremental) | Yes | Excludes private candidates |
| Jobs | Yes | Yes | No | Yes | Monthly (full), several times/hour (incremental) | Yes | Excludes confidential jobs |

## Requirements[​](#requirements "Direct link to Requirements")

The Greenhouse connector requires the following to ensure secure, minimal necessary access to Greenhouse data for indexing and search.

-   Access to a Greenhouse account with administrative (site admin) privileges.
-   Access to Glean’s admin console for connector setup.
-   API network access between Glean and Greenhouse over HTTPS.
-   Greenhouse Harvest API Key must be provisioned through the Greenhouse admin interface.
-   The API Key must be scoped to allow only the required endpoints listed in Supported API endpoints. For more information see, [Supported API endpoints](#supported-api-endpoints).
-   Webhook secret is needed to securely receive Greenhouse webhook notifications for updates and deletions.
