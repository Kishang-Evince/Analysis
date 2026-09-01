---
url: "https://docs.glean.com/connectors/custom/faq"
canonical: "https://docs.glean.com/connectors/custom/faq"
title: "REST APIs FAQ"
description: "Frequently asked questions about using Glean's REST APIs, including troubleshooting guides and implementation tips"
fetched_at: "2026-09-01T13:29:20.233Z"
---
On this page

Our REST APIs FAQ provides answers to common questions about implementing and using Glean's APIs. For detailed implementation guidance, see our [developer documentation](https://developers.glean.com/).

### Why isn't my indexed document appearing in search results?

When using the [/indexdocument](https://developers.glean.com/api/indexing-api/index-document) and [/bulkindexdocuments](https://developers.glean.com/api/indexing-api/bulk-index-documents) endpoints, documents are added to a processing queue and are not indexed immediately. To expedite document indexing:

1.  Use the [/processalldocuments](https://developers.glean.com/api/indexing-api/schedules-the-processing-of-uploaded-documents) endpoint to schedule immediate processing
2.  Verify document status using the [get document information](https://developers.glean.com/api/indexing-api/beta-get-document-information) endpoint
3.  Check permissions with the [check document access](https://developers.glean.com/api/indexing-api/check-document-access) endpoint if the document is indexed but not appearing in results

### How can I delete documents from my custom connector?

You have several options for document deletion:

1.  Use the [/deletedocument](https://developers.glean.com/api/indexing-api/delete-document) endpoint for individual documents
2.  Use [/bulkindexdocuments](https://developers.glean.com/api/indexing-api/bulk-index-documents) to remove documents not present in the upload
3.  To delete all documents, use [/bulkindexdocuments](https://developers.glean.com/api/indexing-api/bulk-index-documents) with an empty *documents* array and set *disableStaleDocumentDeletionCheck* to *true*

### Where can I find example API implementations?

We maintain a public GitHub repository with example implementations for our APIs. You can find these examples in our [indexing-api-connectors repository](https://github.com/gleanwork/indexing-api-connectors/).

### Why is the 'Results Display' section blank in the UI for my custom connector?

The Results Display options are not shown until object definitions are created for the connector. This is because you can customize the results display based on the object type. For more information on setting up object definitions, please refer to our [documentation on custom properties](https://developers.glean.com/api-info/indexing/connector/custom-properties).

### Why is my /indexdocument or /bulkindexdocuments request returning a 400 error for custom properties?

When a document contains a custom property value that violates its declared type (for example, a non-string element in a `TEXTLIST`), the API returns an HTTP **400** response. The response body identifies the specific document and offending value so you can locate the problem:

```
Document rightanswers-doc-001 has invalid value at index 2for custom property Attributes: expected String, got java.lang.Integer
```

To resolve this:

1.  Check the **document ID** and **property name** in the error message to find the record in your upload payload.
2.  For list-type properties, use the **list index** to locate the exact element that has the wrong type.
3.  Correct the value so it matches the declared property type, then re-upload.
4.  If the document ID shows as `Document (id unspecified)`, ensure every document in your payload includes a valid `id` field.

Validation stops at the first invalid property. After fixing one error, re-upload to check for additional issues. For more details, see the [custom property validation errors](/connectors/custom/troubleshooting#custom-property-validation-errors) section of the troubleshooting guide.

### Why am I getting a 405 Method Not Allowed response from a Glean API endpoint?

Glean Platform API endpoints return `405 Method Not Allowed` when called with an unsupported HTTP method. These responses include an `Allow` header listing the supported methods, and the response body uses the problem detail code `method_not_allowed`.

A `404 resource_not_found` response means the endpoint path itself is not valid. A `405 method_not_allowed` response means the endpoint exists but the HTTP method you used is not supported.

For example, sending a `GET` request to a `POST`\-only endpoint:

```
curl -i -X GET https://<instance>/api/search \  -H "Authorization: Bearer <token>"
```

Returns:

```
HTTP/1.1 405 Method Not AllowedAllow: POSTContent-Type: application/problem+json{  "code": "method_not_allowed"}
```

If you receive a `405` response, check the `Allow` header in the response to see which HTTP methods are supported, then update your request accordingly.

## See also[​](#see-also "Direct link to See also")

[

### Developer Documentation

Access our comprehensive developer documentation for detailed API references and implementation guides.







](https://developers.glean.com)[

### Troubleshooting Guide

Find solutions to common API issues and implementation challenges.







](/connectors/custom/troubleshooting)
