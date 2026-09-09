---
url: "https://docs.glean.com/connectors/custom/troubleshooting"
canonical: "https://docs.glean.com/connectors/custom/troubleshooting"
title: "Troubleshooting"
description: "Debugging endpoints and tools to investigate indexing API issues in Glean"
fetched_at: "2026-09-01T13:29:20.412Z"
---
On this page

This article reviews helpful debug endpoints you can use to investigate indexing API issues. For a comprehensive document on the different endpoints available for debugging, please review this [troubleshooting document](https://developers.glean.com/api-info/indexing/debugging/datasource-config). If you require further assistance debugging, the Next Steps section describes what information to share with Glean Support when raising a ticket.

In the examples below, copy your full backend URL from [app.glean.com/admin/about-glean](https://app.glean.com/admin/about-glean) under **Server instance (QE)**, and replace [https://tenant\_id-be.glean.com](https://tenant_id-be.glean.com) with it.

## Debug Connector Status[​](#debug-connector-status "Direct link to Debug Connector Status")

### Documentation [Link](https://developers.glean.com/api/indexing-api/beta-get-datasource-status)[​](#documentation-link "Direct link to documentation-link")

```
curl -i -X POST \  'https://tenant_id-be.glean.com/api/index/v1/debug/{connector}/status' \  -H 'Authorization: Bearer <YOUR_TOKEN_HERE>'
```

### When to Use[​](#when-to-use "Direct link to When to Use")

If you want to confirm whether your indexing job was successful, you can use this endpoint to verify if your documents have been uploaded and indexed. The **bulkUploadHistory** will show the details of your document indexing endpoint time. After documents are uploaded, they will be queued for processing. New documents will be available in search results when the **processingHistory** timestamp is after the **bulkUploadHistory**.

## Debug Connector Document[​](#debug-connector-document "Direct link to Debug Connector Document")

### Documentation [Link](https://developers.glean.com/api/indexing-api/beta-get-document-information)[​](#documentation-link-1 "Direct link to documentation-link-1")

```
curl -i -X POST \  'https://tenant_id-be.glean.com/api/index/v1/debug/{connector}/document' \  -H 'Authorization: Bearer <YOUR_TOKEN_HERE>' \  -H 'Content-Type: application/json; charset=UTF-8' \  -d '{    "objectType": "Article",    "docId": "art123"  }'
```

### When to Use[​](#when-to-use-1 "Direct link to When to Use")

If a user reports a missing document, this endpoint can be used to confirm if a document is present in the connector index and verify what permissions this document has. A user will be able to view a document if any of the below criteria is met:

-   **allowAnonymousAccess** is **true**
-   **allowAllDatasourceUsersAccess** is **true** and user has been indexed as a user of the connector
-   user is a member of the **allowedGroups** and in the list of **allowedUsers** OR **allowedGroupIntersections**

## Debug Connector User[​](#debug-connector-user "Direct link to Debug Connector User")

### Documentation [Link](https://developers.glean.com/api/indexing-api/beta-get-user-information)[​](#documentation-link-2 "Direct link to documentation-link-2")

```
curl -i -X POST \  'https://tenant_id-be.glean.com/api/index/v1/debug/{connector}/user' \  -H 'Authorization: Bearer <YOUR_TOKEN_HERE>' \  -H 'Content-Type: application/json; charset=UTF-8' \  -d '{    "email": "u1@foo.com"  }'
```

### When to Use[​](#when-to-use-2 "Direct link to When to Use")

This endpoint can be used along with debug connector document to confirm if a user is in the group(s) provisioned to have access to the document.

## Check Document Access[​](#check-document-access "Direct link to Check Document Access")

### Documentation [Link](https://developers.glean.com/api/indexing-api/check-document-access)[​](#documentation-link-3 "Direct link to documentation-link-3")

```
curl -i -X POST \  https://tenant_id-be.glean.com/api/index/v1/checkdocumentaccess \  -H 'Authorization: Bearer <YOUR_TOKEN_HERE>' \  -H 'Content-Type: application/json' \  -d '{    "datasource": "string",    "objectType": "string",    "docId": "string",    "userEmail": "string"  }'
```

### When to Use[​](#when-to-use-3 "Direct link to When to Use")

To check if a user has access to view a document in Glean. The response will show **true** or **false**. If **false**, review the debug endpoints debug connector user and debug connector document to check permissions.

## User and Membership Ingestion[​](#user-and-membership-ingestion "Direct link to User and Membership Ingestion")

Custom connector user uploads can appear to succeed when `bulkUploadHistory` shows `UPLOAD COMPLETED`, while indexed user counts remain far below what you expect. This is usually caused by confusion between the upload, processing, and indexing stages of the pipeline.

### Understand the upload pipeline[​](#understand-the-upload-pipeline "Direct link to Understand the upload pipeline")

User and membership ingestion follows a three-stage process:

| Stage | What happens | How to check |
| --- | --- | --- |
| **Upload** | The API accepts the payload and queues it for processing. `bulkUploadHistory` shows `processingState: UPLOAD COMPLETED`. | Check `identity.users.bulkUploadHistory` in the [connector status endpoint](#debug-connector-status). |
| **Processing** | Glean expands derived groups and memberships. This step associates users with the groups and permissions needed for document access. | Check `identity.processingHistory` for timestamps. |
| **Indexing** | Users become searchable and their permissions are applied to documents. | Check `identity.users.counts.uploaded` vs the document-level `counts.indexed` for user-type objects. |

note

`UPLOAD COMPLETED` only means the API accepted your upload. It doesn't mean users are indexed and searchable. Always check `counts.indexed` or the debug user endpoint to confirm users are fully processed.

### Trigger membership reprocessing[​](#trigger-membership-reprocessing "Direct link to Trigger membership reprocessing")

If `counts.indexed` is lower than expected after uploads show `UPLOAD COMPLETED`, trigger membership reprocessing to re-expand derived groups and memberships:

```
curl -i -X POST \  'https://tenant_id-be.glean.com/api/index/v1/processallmemberships' \  -H 'Authorization: Bearer <YOUR_TOKEN_HERE>'
```

### When to Use[​](#when-to-use-4 "Direct link to When to Use")

Call this endpoint when uploaded user counts don't match indexed counts, or when you've updated group memberships and need Glean to re-derive permissions. After triggering, allow time for processing to complete before re-checking counts.

### Debugging checklist[​](#debugging-checklist "Direct link to Debugging checklist")

If users aren't appearing as expected after a bulk upload, follow these steps:

1.  **Check upload status** - call the [connector status endpoint](#debug-connector-status) and confirm that `identity.users.bulkUploadHistory` shows `processingState: UPLOAD COMPLETED` and `status: SUCCESSFUL`.
2.  **Compare uploaded vs indexed counts** - in the same response, compare `identity.users.counts.uploaded` with the indexed counts. If indexed is much lower, the processing step may not have completed.
3.  **Trigger reprocessing** - call `/processallmemberships` to trigger membership expansion.
4.  **Wait and re-check** - allow several minutes for processing, then call the status endpoint again to check whether `counts.indexed` has increased.
5.  **Inspect individual users** - use the [debug user endpoint](#debug-connector-user) with a specific user's email to check their `uploadStatus`, `isActiveUser`, and `uploadedGroups`. If `uploadedGroups` is empty, the user was uploaded but not yet associated with any groups.
6.  **Check your upload payload** - verify that your `/bulkindexusers` or `/bulkindexmemberships` payloads include the correct `isFirstPage`, `isLastPage`, and `uploadId` pagination flags. Incorrect pagination can cause partial uploads to be treated as complete.

## Custom property validation errors[​](#custom-property-validation-errors "Direct link to Custom property validation errors")

When a document pushed via [`/indexdocument`](https://developers.glean.com/api/indexing-api/index-document) or [`/bulkindexdocuments`](https://developers.glean.com/api/indexing-api/bulk-index-documents) contains a custom property value that violates its declared type, the API returns an HTTP **400** response that identifies the specific document and offending value.

### Example error response[​](#example-error-response "Direct link to Example error response")

A document with a `TEXTLIST` custom property that contains a non-string element produces an error like:

```
Document rightanswers-doc-001 has invalid value at index 2for custom property Attributes: expected String, got java.lang.Integer
```

The response includes:

| Detail | Description |
| --- | --- |
| **Document ID** | The ID of the document that failed validation. If the document ID is missing or null, this renders as `Document (id unspecified)`. |
| **List index** | For list-type properties (`TEXTLIST`), the index (starting from 0) of the offending element. |
| **Property name** | The custom property whose type constraint was violated. |
| **Expected vs actual type** | The declared type (for example, `String`) compared to the runtime type of the value that was provided. For non-list properties, the message reads: `expected String, Number, or list of strings, got <type>`. |

### Debugging checklist[​](#debugging-checklist-1 "Direct link to Debugging checklist")

If a bulk upload fails with a 400 validation error for custom properties, follow these steps:

1.  **Read the response body:** the error message names the document ID, property, and value that caused the failure.
2.  **Locate the document in your upload payload:** search for the document ID to find the record with the invalid value.
3.  **Check the offending property value:** for list-type properties, use the list index from the error to find the exact element. Verify that every element in the list matches the declared type.
4.  **Fix and re-upload:** correct the value and resubmit the request. Validation fails fast on the first invalid property, so repeat until the upload succeeds.

note

Validation stops at the first invalid custom property it encounters. After fixing one error, re-upload to check for additional issues in other documents or properties.

## Trigger document reprocessing[​](#trigger-document-reprocessing "Direct link to Trigger document reprocessing")

If documents have been uploaded but are not appearing in search results, you can trigger a full document reprocessing for the connector. This re-indexes all previously uploaded documents without requiring a new upload.

```
curl -i -X POST \  'https://tenant_id-be.glean.com/api/index/v1/processalldocuments' \  -H 'Authorization: Bearer <YOUR_TOKEN_HERE>'
```

### When to use[​](#when-to-use-5 "Direct link to When to use")

Call this endpoint when uploaded documents show in the [connector status endpoint](#debug-connector-status) but are not appearing in search results. This is also useful after permission changes that should make previously hidden documents visible.

After triggering, allow time for processing to complete. Monitor progress by checking the `processingHistory` timestamps in the [connector status endpoint](#debug-connector-status). New documents become searchable when the `processingHistory` timestamp is after the `bulkUploadHistory` timestamp.

note

For issues with user or group permissions rather than document content, use [`/processallmemberships`](#trigger-membership-reprocessing) instead.

## Next steps[​](#next-steps "Direct link to Next steps")

If you need help debugging your issue, contact [Glean Support](https://support.glean.com) and provide the following details:

-   Description of the issue including error message
-   Endpoint URL and request body schema
-   Connector name
-   Timestamp and timezone of when you encountered the error

## See also[​](#see-also "Direct link to See also")

-   [Verify if a document is visible in Glean](/administration/search/access-verification) - check document visibility and access from the **Admin console**
-   [Connector refresh rates](/connectors/crawling-refresh-rates) - default crawl intervals by connector
