---
url: "https://developers.glean.com/api/client-api/pins/overview"
canonical: "https://developers.glean.com/api/client-api/pins/overview"
title: "Pins API Overview | Glean Developer"
description: "<ApiOverview"
fetched_at: "2026-09-01T13:22:54.447Z"
---
The Pins API allows you to create, manage, and organize pinned search results that appear prominently for specific queries. Improve search experience by ensuring high-quality, relevant content appears at the top of search results for important topics.

## Use Cases

### Search Result Curation

Pin high-quality documents and resources to appear at the top of search results for specific queries, ensuring users find the best content first.

### Content Promotion

Highlight important announcements, policies, and frequently accessed documents by pinning them to relevant search terms.

### Search Quality Control

Manage and update pinned results to maintain search quality and ensure users consistently find the most relevant and current information.

## API Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | [`/rest/api/v1/editpin`](/api/client-api/pins/editpin) | [Update pin](/api/client-api/pins/editpin)
Update an existing user-generated pin.

 |
| POST | [`/rest/api/v1/getpin`](/api/client-api/pins/getpin) | [Read pin](/api/client-api/pins/getpin)

Read pin details given its ID.

 |
| POST | [`/rest/api/v1/listpins`](/api/client-api/pins/listpins) | [List pins](/api/client-api/pins/listpins)

Lists all pins.

 |
| POST | [`/rest/api/v1/pin`](/api/client-api/pins/pin) | [Create pin](/api/client-api/pins/pin)

Pin a document as a result for a given search query.Pin results that are known to be a good match.

 |
| POST | [`/rest/api/v1/unpin`](/api/client-api/pins/unpin) | [Delete pin](/api/client-api/pins/unpin)

Unpin a previously pinned result.

 |
