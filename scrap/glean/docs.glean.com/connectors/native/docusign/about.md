---
url: "https://docs.glean.com/connectors/native/docusign/about"
canonical: "https://docs.glean.com/connectors/native/docusign/about"
title: "Docusign overview"
description: "Learn what the Glean Docusign connector supports, which API endpoint it uses, and its limitations."
fetched_at: "2026-09-01T13:29:25.864Z"
---
On this page

The Docusign connector for Glean enables you to fetch and summarize content from Docusign documents directly within Glean. You can use Glean to fetch and summarize the content of a Docusign document by providing its URL.

To connect Docusign to Glean, see [Setup](/connectors/native/docusign/setup).

## Supported objects[​](#supported-objects "Direct link to Supported objects")

-   Docusign eSignature documents
-   Envelopes
-   Templates

## Supported API endpoints[​](#supported-api-endpoints "Direct link to Supported API endpoints")

Live fetch of Docusign document content via the eSignature API when a user provides a document URL in Glean.

## Limitations[​](#limitations "Direct link to Limitations")

-   You cannot search for Docusign documents in Glean; only live fetch in Glean is supported.
-   No support for Docusign CLM or other Docusign product APIs.
-   No crawling, incremental updates, or webhooks.

## See also[​](#see-also "Direct link to See also")

-   [Docusign setup](/connectors/native/docusign/setup)
