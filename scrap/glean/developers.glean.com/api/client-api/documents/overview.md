---
url: "https://developers.glean.com/api/client-api/documents/overview"
canonical: "https://developers.glean.com/api/client-api/documents/overview"
title: "Documents API Overview | Glean Developer"
description: "<ApiOverview"
fetched_at: "2026-09-01T13:22:53.261Z"
---
The Documents API provides access to document metadata, permissions, and content within your organization. Retrieve document information, check access permissions, and query documents by various criteria to build powerful document management and discovery features.

## Use Cases

### Document Discovery

Retrieve document metadata and content to build custom search and discovery interfaces that help users find relevant information.

### Permission Management

Check document access permissions to ensure users only see content they're authorized to access in your applications.

### Content Analysis

Access document metadata and facets to perform content analysis, categorization, and build insights about your organization's knowledge.

## API Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | [`/rest/api/v1/getdocpermissions`](/api/client-api/documents/getdocpermissions) | [Read document permissions](/api/client-api/documents/getdocpermissions)
Read the emails of all users who have access to the given document.

 |
| POST | [`/rest/api/v1/getdocuments`](/api/client-api/documents/getdocuments) | [Read documents](/api/client-api/documents/getdocuments)

Read the documents including metadata (does not include enhanced metadata via \`/documentmetadata\`) for the given list of Glean Document IDs or URLs specified in the request.

 |
| POST | [`/rest/api/v1/getdocumentsbyfacets`](/api/client-api/documents/getdocumentsbyfacets) | [Read documents by facets](/api/client-api/documents/getdocumentsbyfacets)

Read the documents including metadata (does not include enhanced metadata via \`/documentmetadata\`) macthing the given facet conditions.

 |
