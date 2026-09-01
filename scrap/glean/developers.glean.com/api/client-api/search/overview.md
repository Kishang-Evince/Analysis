---
url: "https://developers.glean.com/api/client-api/search/overview"
canonical: "https://developers.glean.com/api/client-api/search/overview"
title: "Search API Overview | Glean Developer"
description: "<ApiOverview"
fetched_at: "2026-09-01T13:22:54.629Z"
---
The Search API is the core of Glean's search functionality, enabling you to perform powerful searches across your organization's content. Access search results, autocomplete suggestions, and personalized feeds to build custom search experiences and knowledge discovery applications.

## Use Cases

### Custom Search Interfaces

Build tailored search experiences for your applications using Glean's powerful search capabilities with custom filtering and ranking.

### Autocomplete Integration

Enhance user experience with intelligent autocomplete suggestions that help users discover relevant content as they type.

### Personalized Content Discovery

Leverage personalized feeds and search results to surface the most relevant content for each user based on their role and interests.

## API Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | [`/rest/api/v1/adminsearch`](/api/client-api/search/adminsearch) | [Search the index (admin)](/api/client-api/search/adminsearch)
Retrieves results for search query without respect for permissions. This is available only to privileged users.

 |
| POST | [`/rest/api/v1/autocomplete`](/api/client-api/search/autocomplete) | [Autocomplete](/api/client-api/search/autocomplete)

Retrieve query suggestions, operators and documents for the given partially typed query.

 |
| POST | [`/rest/api/v1/feed`](/api/client-api/search/feed) | [Feed of documents and events](/api/client-api/search/feed)

The personalized feed/home includes different types of contents including suggestions, recents, calendar events and many more.

 |
| POST | [`/rest/api/v1/recommendations`](/api/client-api/search/recommendations) | [Recommend documents](/api/client-api/search/recommendations)

Retrieve recommended documents for the given URL or Glean Document ID.

 |
| POST | [`/rest/api/v1/search`](/api/client-api/search/search) | [Search](/api/client-api/search/search)

Retrieve results from the index for the given query and filters.

 |
