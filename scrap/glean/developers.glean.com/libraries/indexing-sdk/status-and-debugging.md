---
url: "https://developers.glean.com/libraries/indexing-sdk/status-and-debugging"
canonical: "https://developers.glean.com/libraries/indexing-sdk/status-and-debugging"
title: "Status and debugging | Glean Developer"
description: "Answer \"why isn't my document in Glean search?\" with glean-idx and StatusClient"
fetched_at: "2026-09-01T13:23:04.854Z"
---
On this page

Indexing is asynchronous. An upload that returns success has been *accepted*, not indexed - documents become searchable some time later. Most "the connector is broken" reports are really one of four things, and this sequence separates them.

## Why isn't my document in search?[​](#why-isnt-my-document-in-search "Direct link to Why isn't my document in search?")

Work through it in order. Each step rules out one layer.

1

Did the connector actually upload it?

Run against a recording mock and print `result.documents_posted`. If the document isn’t there, the bug is in your data client or `transform()`, not in Glean. Stop here.

2

Has it finished indexing?

Run `glean-idx document status --datasource NAME --document TYPE ID --poll`. If it’s still pending, wait - large uploads take longer.

3

Is the datasource healthy?

`glean-idx datasource status --datasource NAME` reports uploaded and indexed counts side by side. A gap between them points at rejected documents rather than slow indexing.

4

Can the user see it?

If the document is indexed but one person can’t find it, it’s a permissions problem. `glean-idx document access --datasource NAME --object-type TYPE --id ID --user them@example.com` answers it directly - a correct-looking ACL is still wrong if the identities it names were never pushed.

## StatusClient[​](#statusclient "Direct link to StatusClient")

Read-only wrappers over the debug endpoints:

```
from glean.indexing.push import StatusClientstatus = StatusClient(datasource="companywiki")status.get_datasource_status()      # counts and datasource statestatus.get_documents_status(...)    # per-document indexing statusstatus.check_document_access(...)   # whether a user can access a document
```

The constructor takes the same optional overrides as `PushUploader`: `retries`, `server_url`, `timeout_ms`, `http_headers`. Credentials come from the environment.

## The CLI[​](#the-cli "Direct link to The CLI")

The SDK ships one CLI, `glean-idx`. This needs only credentials, so it runs anywhere - including with no install:

```
glean-idx document status \  --datasource companywiki \  --document article page_123 \  --document article page_124 \  --poll
```

`--document` takes two values: object type and document ID. Repeat it for multiple documents. `--poll` checks every 30 seconds for up to five minutes instead of once.

In Python:

```
from glean.api_client.models import DebugDocumentRequestfrom glean.indexing.testing import check_documents_status, poll_documents_statussnapshot = poll_documents_status(    "companywiki",    [DebugDocumentRequest(object_type="article", doc_id="page_123")],)print(snapshot.result)
```

This is worth wiring into a deployment smoke test - index a known document, then confirm it becomes searchable before declaring the rollout good.

## Common causes[​](#common-causes "Direct link to Common causes")

| Symptom | Likely cause |
| --- | --- |
| `datasource configure` reports an unknown outcome | The connection failed after the write may have committed and read-back could not prove equivalence. Inspect the current configuration with `glean-idx doctor --datasource NAME` before retrying. |
| Document never appears | Never uploaded. Check `documents_posted` in a mocked run first. |
| Appears, then disappears | A later **full** crawl didn't include it, so it was deleted as stale. |
| Indexed but not findable by a user | ACL doesn't cover them, or the identity graph is incomplete. |
| Indexed but body is empty | `ContentDefinition` missing, wrong `mime_type`, or empty `text_content`. |
| Wrong sort order or "updated" date | `created_at` / `updated_at` passed as ISO strings instead of epoch seconds. |
| Upload succeeds, count doesn't grow | Documents rejected server-side. Check `get_datasource_status()`. |

## Documents disappearing is usually stale deletion[​](#documents-disappearing-is-usually-stale-deletion "Direct link to Documents disappearing is usually stale deletion")

If documents vanish after a scheduled run, the cause is almost always a full crawl that fetched an incomplete result set. A full crawl deletes anything it didn't include.

Look for a partial fetch that was allowed to complete successfully - a source error swallowed inside a paging loop, an auth token expiring mid-crawl, or a `max_items` cap left set from local testing. `max_items` limits source consumption; it is not a blast-radius guarantee, and on a full crawl it can make the replacement dangerously incomplete. Alert on `documents_indexed` dropping sharply between runs; that catches it before the deletion propagates. See [Indexing modes](/libraries/indexing-sdk/concepts/indexing-modes).

## Tracing a document through the logs[​](#tracing-a-document-through-the-logs "Direct link to Tracing a document through the logs")

With [structured logging](/libraries/indexing-sdk/observability) enabled, every crawl carries a `run_id` and lifecycle events are emitted per batch. In your log aggregator, filter by document ID or `run_id` to see whether a document was fetched, transformed, and which batch carried it.

For per-document lifecycle events server-side:

```
from glean.indexing.push import PushUploaderPushUploader(datasource="companywiki").get_document_lifecycle_events(...)
```

## Related[​](#related "Direct link to Related")

[

### Indexing API debugging

The underlying debug endpoints.







](/api-info/indexing/debugging/datasource-status)[

### Observability

Logging and metrics setup.







](/libraries/indexing-sdk/observability)
