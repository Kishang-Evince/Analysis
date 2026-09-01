---
url: "https://developers.glean.com/api-info/indexing/custom-metadata/schema-management"
canonical: "https://developers.glean.com/api-info/indexing/custom-metadata/schema-management"
title: "Schema Management | Glean Developer"
description: "A metadata group must have a schema defined before metadata can be attached to documents in that group. The schema declares which keys are allowed, what type each key is, and whether the value participates in full-text search."
fetched_at: "2026-09-01T13:22:50.379Z"
---
On this page

A metadata group must have a schema defined before metadata can be attached to documents in that group. The schema declares which keys are allowed, what type each key is, and whether the value participates in full-text search.

## Endpoints[​](#endpoints "Direct link to Endpoints")

| Method | Path | Purpose |
| --- | --- | --- |
| `PUT` | `/custom-metadata/schema/{groupName}` | Create or update a schema |
| `GET` | `/custom-metadata/schema/{groupName}` | Retrieve the current schema |
| `DELETE` | `/custom-metadata/schema/{groupName}` | Delete a schema |

## Create or update a schema[​](#create-or-update-a-schema "Direct link to Create or update a schema")

```
PUT /custom-metadata/schema/{groupName}
```

Defines or updates the schema for a metadata group.

### Request body[​](#request-body "Direct link to Request body")

```
{  "metadataKeys": [    {      "name": "string",      "propertyType": "TEXT" | "PICKLIST" | "TEXTLIST" | "MULTIPICKLIST",      "skipIndexing": false    }  ]}
```

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | string | Yes | Key name. Alphanumeric, case-insensitive, max 50 characters. |
| `propertyType` | enum | Yes | One of `TEXT`, `PICKLIST`, `TEXTLIST`, `MULTIPICKLIST`. See [Property types](#property-types). |
| `skipIndexing` | boolean | No | Default `false`. When `true`, the key is stored on the document but not used for full-text search matching. |

### Example[​](#example "Direct link to Example")

-   curl

```
curl -X PUT https://customer-be.glean.com/rest/api/index/custom-metadata/schema/compliance \  -H 'Authorization: Bearer <token>' \  -H 'Content-Type: application/json' \  -d '{    "metadataKeys": [      { "name": "status", "propertyType": "PICKLIST" },      { "name": "tags", "propertyType": "MULTIPICKLIST" },      { "name": "reviewDate", "propertyType": "TEXT" },      { "name": "internalNotes", "propertyType": "TEXT", "skipIndexing": true }    ]  }'
```

## Retrieve a schema[​](#retrieve-a-schema "Direct link to Retrieve a schema")

```
GET /custom-metadata/schema/{groupName}
```

Returns the current schema for the group, in the same shape as the `PUT` request body.

## Delete a schema[​](#delete-a-schema "Direct link to Delete a schema")

```
DELETE /custom-metadata/schema/{groupName}
```

Deletes the schema for a metadata group. Existing metadata values previously attached to documents using this schema are retained until they are removed by a separate cleanup pass.

## Property types[​](#property-types "Direct link to Property types")

| Type | Description | Search behavior |
| --- | --- | --- |
| `TEXT` | Single-line free-form text. | Substring match on punctuation/whitespace boundaries. |
| `PICKLIST` | Single value chosen from a small set of distinct values. | Exact-string match; suitable as a facet. |
| `TEXTLIST` | Array of free-form text values. | Substring match per entry. |
| `MULTIPICKLIST` | Array of picklist values. | Exact-string match per entry; suitable as a multi-select facet. |

note

`DATE`, `INT`, and `USERID` property types are **not** supported by the Custom Metadata API.

## Schema limits[​](#schema-limits "Direct link to Schema limits")

| Limit | Value |
| --- | --- |
| Maximum metadata groups | 50 |
| Maximum keys per group | 20 |
| Maximum group name length | 50 characters |
| Maximum key name length | 50 characters |
