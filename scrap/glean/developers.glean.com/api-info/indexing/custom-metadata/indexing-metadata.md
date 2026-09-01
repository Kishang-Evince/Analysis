---
url: "https://developers.glean.com/api-info/indexing/custom-metadata/indexing-metadata"
canonical: "https://developers.glean.com/api-info/indexing/custom-metadata/indexing-metadata"
title: "Indexing Metadata | Glean Developer"
description: "Once a schema is defined for a metadata group, you can attach metadata values to individual documents."
fetched_at: "2026-09-01T13:22:50.400Z"
---
On this page

Once a [schema is defined](/api-info/indexing/custom-metadata/schema-management) for a metadata group, you can attach metadata values to individual documents.

## Endpoints[​](#endpoints "Direct link to Endpoints")

| Method | Path | Purpose |
| --- | --- | --- |
| `PUT` | `/document/{docId}/custom-metadata/{groupName}` | Add or replace all metadata for a `(docId, groupName)` pair |
| `DELETE` | `/document/{docId}/custom-metadata/{groupName}` | Remove all metadata for a `(docId, groupName)` pair |

`docId` is the unique Glean identifier of the document. You can obtain it via the Client API (for example, [Search](/api/client-api/search/search) or [Get Documents](/api/client-api/documents/getdocuments)).

## Add or update metadata[​](#add-or-update-metadata "Direct link to Add or update metadata")

```
PUT /document/{docId}/custom-metadata/{groupName}
```

Indexes custom metadata for the specified document and group.

warning

This call **replaces** all metadata for the `(docId, groupName)` pair. Any keys not present in the request are removed from the group on that document. To update a single key without losing others, include the full set of keys in the request body.

### Request body[​](#request-body "Direct link to Request body")

```
{  "customMetadata": [    {      "name": "string",      "value": "string" | ["string", ...]    }  ]}
```

`value` is a string for `TEXT` and `PICKLIST` keys, and an array of strings for `TEXTLIST` and `MULTIPICKLIST` keys.

### Example[​](#example "Direct link to Example")

-   curl

```
curl -X PUT https://customer-be.glean.com/rest/api/index/document/gdrive_abc123/custom-metadata/compliance \  -H 'Authorization: Bearer <token>' \  -H 'Content-Type: application/json' \  -d '{    "customMetadata": [      { "name": "status", "value": "Approved" },      { "name": "reviewDate", "value": "2026-03-15" },      { "name": "tags", "value": ["SOC2", "annual-review"] }    ]  }'
```

## Remove metadata[​](#remove-metadata "Direct link to Remove metadata")

```
DELETE /document/{docId}/custom-metadata/{groupName}
```

Removes all metadata for the specified group from the document. Metadata for **other** groups on the same document is unaffected.

## Rate limits[​](#rate-limits "Direct link to Rate limits")

| Limit | Value |
| --- | --- |
| Sustained rate | 5 requests per second per group |
| Burst | Up to 300 requests |

Rate limits are enforced **per metadata group**, not per document. Distributing writes across multiple groups increases overall throughput.

When the limit is exceeded, the API returns `429 Too Many Requests`. See [Error responses](/api-info/indexing/custom-metadata/overview#error-responses) for the full list of status codes.
