---
url: "https://developers.glean.com/libraries/indexing-sdk/concepts/architecture"
canonical: "https://developers.glean.com/libraries/indexing-sdk/concepts/architecture"
title: "Architecture | Glean Developer"
description: "How the Glean Indexing SDK moves data from your source into the Glean index"
fetched_at: "2026-09-01T13:23:04.544Z"
---
On this page

A connector is a pipeline. You own the two stages specific to your source; the SDK owns batching, retries, upload sessions, and stale-document cleanup.

Source systemYour wiki, catalog, database

`get_source_data()`Fetch raw records

`transform()`Map to Glean documents

`PushUploader`Batch, retry, upload

Glean indexSearchable, permission-aware

You write thisThe SDK handles thisExternal system

## The indexing lifecycle[​](#the-indexing-lifecycle "Direct link to The indexing lifecycle")

`BaseDatasourceConnector.index_data()` runs the sequence below. Each stage is timed separately, so a slow connector can be attributed to fetch, transform, or upload without adding instrumentation.

1

Start observabilitySDK

Begins execution timing and assigns a `run_id` for the run.

2

Identity crawl - `get_identities()`Your code

Users are bulk-indexed first. If groups are returned, memberships must be too - otherwise the SDK raises `InconsistentDataError`, because groups without memberships produce ACLs that can never match anyone.

3

Resolve `since`Your code

On an incremental crawl, calls `_get_last_crawl_timestamp()`. The base implementation returns `None`.

4

Content crawl - `get_data()`Your code

Delegates to your data client’s `get_source_data()`.

5

Transform - `transform()`Your code

Your mapping from source records to Glean entity definitions.

6

UploadSDK

A full crawl calls `PushUploader.bulk_index_documents()` for replacement and stale cleanup. An incremental crawl calls additive `index_documents()`.

7

End observabilitySDK

Records totals. On exception, increments the error counter and re-raises so a scheduler sees a non-zero exit.

Sync and async streaming datasource connectors keep fetch/transform memory bounded, but their indexing implementations do **not** run the optional `get_identities()` crawl. Push identities separately before a streaming content crawl. Their full uploads still use replacement semantics, while incremental batches use additive uploads.

## Class hierarchy[​](#class-hierarchy "Direct link to Class hierarchy")

Connectors and data clients pair by shape: a streaming connector expects a streaming data client.

```
BaseConnector[TSourceData, TIndexableEntityDefinition]├── BaseDatasourceConnector[T]                 → DocumentDefinition├── BaseStreamingDatasourceConnector[T]        → DocumentDefinition (sync generator)├── BaseAsyncStreamingDatasourceConnector[T]   → DocumentDefinition (async generator)└── BasePeopleConnector[T]                     → EmployeeInfoDefinitionBaseDataClient[T]                     → Sequence[T]├── BaseStreamingDataClient[T]        → Generator[T]├── BaseAsyncStreamingDataClient[T]   → AsyncGenerator[T]└── BasePullHttpStreamingDataClient[T]  (HTTP + pagination, from the pull recipes)
```

See [Connector types](/libraries/indexing-sdk/concepts/connector-types) for which pair to use.

## Errors[​](#errors "Direct link to Errors")

Every SDK exception derives from `GleanError` and carries a `fix_suggestion` and, where applicable, a `docs_url`. Both are included in `str(error)`, so an unhandled failure tells the operator what to do next.

```
GleanError├── GleanConfigurationError (also a ValueError)│   ├── MissingEnvironmentVariableError│   └── InvalidDatasourceConfigError└── GleanValidationError (also a ValueError)    ├── InvalidPropertyError    ├── InconsistentDataError    └── UnsupportedConnectorTypeError
```

Both branches subclass `ValueError`, so existing `except ValueError` handlers keep working. See [Error handling](/libraries/indexing-sdk/push/error-handling) for what to catch and - more importantly - what never to swallow.

## Configuration[​](#configuration "Direct link to Configuration")

Two environment variables. There is no configuration file.

| Variable | Purpose |
| --- | --- |
| `GLEAN_SERVER_URL` | Your Glean backend URL, e.g. `https://acme-be.glean.com`. |
| `GLEAN_INDEXING_API_TOKEN` | Datasource-scoped Indexing API token. |
| `GLEAN_INSTANCE` | Deprecated fallback for `GLEAN_SERVER_URL`. |

A missing variable raises `MissingEnvironmentVariableError` at client construction, not mid-upload.
