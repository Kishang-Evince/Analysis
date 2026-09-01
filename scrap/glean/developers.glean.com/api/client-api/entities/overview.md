---
url: "https://developers.glean.com/api/client-api/entities/overview"
canonical: "https://developers.glean.com/api/client-api/entities/overview"
title: "Entities API Overview | Glean Developer"
description: "<ApiOverview"
fetched_at: "2026-09-01T13:22:53.403Z"
---
The Entities API provides access to organizational entities such as people, teams, and other structured data within your Glean instance. Query and retrieve entity information to build directory services, organizational charts, and people-centric applications.

## Use Cases

### People Directory

Build employee directories and organizational charts by accessing people entities with their profiles, roles, and contact information.

### Team Management

Retrieve team and organizational structure information to create team-based applications and workflow management tools.

### Entity Search

Search across different entity types to find people, teams, and other organizational resources for integration into your applications.

## API Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | [`/rest/api/v1/listentities`](/api/client-api/entities/listentities) | [List entities](/api/client-api/entities/listentities)
List some set of details for all entities that fit the given criteria and return in the requested order. Does not support negation in filters, assumes relation type EQUALS. There is a limit of 10000 entities that can be retrieved via this endpoint, except when using FULL\_DIRECTORY request type for people entities.

 |
| POST | [`/rest/api/v1/people`](/api/client-api/entities/people) | [Read people](/api/client-api/entities/people)

Read people details for the given IDs.

 |
| GET | [`/rest/api/v1/people/{person_id}/photo`](/api/client-api/entities/get-person-photo) | [Get person photo](/api/client-api/entities/get-person-photo)

Returns the profile photo bytes for a person whose photo is stored in Glean (crawled from an identity source or user-uploaded via admin console). Photos hosted externally (e.g. Slack CDN) are not served by this endpoint; callers should follow the photoUrl from /people or /listentities directly. Responses include a Cache-Control header (max-age=3600) to reduce redundant fetches.

 |
