---
url: "https://docs.glean.com/connectors/native/s3/about"
canonical: "https://docs.glean.com/connectors/native/s3/about"
title: "S3 overview"
description: "Index text-based objects from Amazon S3 in Glean using IAM roles, with setup for Glean on GCP or AWS and optional pre-signed URLs."
fetched_at: "2026-09-01T13:29:39.390Z"
---
On this page

The Glean Amazon S3 connector indexes text-based objects from your buckets so they are searchable in Glean. It supports common office formats, PDFs, and plain text. Glean can run on **GCP** or **AWS**; IAM setup differs slightly by platform. Results can use indexed text and metadata, or optional time-limited pre-signed URLs.

## Supported features and limitations[​](#supported-features-and-limitations "Direct link to Supported features and limitations")

The connector reads from the buckets you specify. Platform-specific authentication is covered under [Requirements](/connectors/native/s3/setup#requirements) and [Setup](/connectors/native/s3/setup#configuration-and-setup).

### Supported objects[​](#supported-objects "Direct link to Supported objects")

You can index the following file types from S3:

-   PDF
-   Microsoft Word
-   Microsoft PowerPoint
-   Microsoft Excel
-   Plain text and similar text-based formats

### Supported behavior[​](#supported-behavior "Direct link to Supported behavior")

-   Full-corpus indexing for supported document types.
-   Search over indexed S3 content in Glean.
-   Optional display of objects using time-limited pre-signed URLs.

### Limitations[​](#limitations "Direct link to Limitations")

-   Client-side encrypted objects and similar encryption modes are not supported for indexing.
-   Objects larger than **64 MB** are skipped.
-   **S3 permissions are not enforced in Glean.** Everyone who can use Glean in your organization can see anything that was indexed from S3.
-   Only the listed file types are indexed; other types are ignored.
-   OCR is disabled for S3 content by default. Text within scanned documents or image-based PDFs is not extracted or indexed during the crawl.

note

OCR behavior varies by feature. While Glean does not run OCR on S3 content during a crawl, it is enabled by default for direct [file uploads](/administration/assistant/features/file-upload) in Chat. As a result, the same scanned PDF may yield results in Chat but not in Search. To enable OCR for your S3 connector, contact [Glean Support](https://support.glean.com/hc/en-us).

### Crawling strategy[​](#crawling-strategy "Direct link to Crawling strategy")

| Crawl type | Full crawl | Incremental crawl | People data | Activity | Update rate | Webhook | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| S3 connector | Scheduled scan of configured bucket(s) | Picks up new or modified objects since last crawl | N/A | Additions, updates, and deletes reflected via crawl cycle | Tunable schedule | N/A | Deletions appear after the next full crawl; no webhooks |

### Data and metadata ingested[​](#data-and-metadata-ingested "Direct link to Data and metadata ingested")

-   Document content (supported types)
-   Metadata such as name, path, and last modified time

### Permission behavior[​](#permission-behavior "Direct link to Permission behavior")

S3 ACLs and bucket policies are **not** replayed inside Glean. Indexed documents are visible to everyone who can use Glean in your organization.

### Security notes[​](#security-notes "Direct link to Security notes")

-   Access uses a cross-account IAM role (AWS-hosted) or federated web identity (GCP-hosted), with read-only scope to listed buckets.
-   After content is indexed, Glean does not re-check S3 ACLs on every search-plan what you put in the allowlist accordingly.

### Additional limitations[​](#additional-limitations "Direct link to Additional limitations")

-   Multi-instance setups need separate roles and bucket allowlists per instance.
-   The connector does not offer per-user S3 permission mirroring.

### Privacy[​](#privacy "Direct link to Privacy")

Anyone in the organization who can use Glean can search indexed S3 documents.
