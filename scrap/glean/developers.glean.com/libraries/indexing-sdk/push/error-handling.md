---
url: "https://developers.glean.com/libraries/indexing-sdk/push/error-handling"
canonical: "https://developers.glean.com/libraries/indexing-sdk/push/error-handling"
title: "Error handling | Glean Developer"
description: "The Glean Indexing SDK exception hierarchy and how to handle connector failures"
fetched_at: "2026-09-01T13:23:04.874Z"
---
On this page

Every SDK exception derives from `GleanError` and carries a `fix_suggestion` — and often a `docs_url` — that are included in `str(error)`. An unhandled failure prints what to do about it, not just what went wrong.

```
from glean.indexing.exceptions import GleanErrortry:    connector.index_data(mode=IndexingMode.FULL)except GleanError as error:    print(error)            # message + "How to fix:" + "Documentation:"    print(error.fix_suggestion)    print(error.docs_url)
```

## Hierarchy[​](#hierarchy "Direct link to Hierarchy")

```
GleanError├── GleanConfigurationError (also a ValueError)│   ├── MissingEnvironmentVariableError│   └── InvalidDatasourceConfigError└── GleanValidationError (also a ValueError)    ├── InvalidPropertyError    ├── InconsistentDataError    └── UnsupportedConnectorTypeError
```

Configuration errors and validation errors both subclass `ValueError`, so existing `except ValueError` handlers keep working.

| Exception | Raised when |
| --- | --- |
| `MissingEnvironmentVariableError` | `GLEAN_SERVER_URL` or `GLEAN_INDEXING_API_TOKEN` is unset. Raised at client construction, not mid-upload. |
| `InvalidDatasourceConfigError` | `CustomDatasourceConfig` is missing `name` or `display_name`. |
| `InvalidPropertyError` | A property definition has an invalid value. |
| `InconsistentDataError` | `get_identities()` returned groups without memberships. |
| `UnsupportedConnectorTypeError` | A connector type isn't supported for the requested operation. |

## Source-side errors[​](#source-side-errors "Direct link to Source-side errors")

Failures pulling from your source raise different types, because they're not Glean's problem:

| Exception | From |
| --- | --- |
| `PullHttpError` | A source request failed after exhausting retries. Carries `status_code` and `response`. |
| `RateLimitExceededError` | Rate-limit capacity didn't arrive before `rate_limit_timeout_seconds`. |

```
from glean.indexing.recipes.pull import PullHttpErrortry:    response = self.http.get(f"/articles/{article_id}")except PullHttpError as error:    if error.status_code == 404:        return None      # deleted between listing and fetch — skip it    raise                # anything else aborts the crawl
```

## What to swallow, and what not to[​](#what-to-swallow-and-what-not-to "Direct link to What to swallow, and what not to")

This is the decision that matters most in a connector, because getting it wrong deletes data.

**Safe to swallow:** a single document that 404s between listing and fetch, or one record whose payload is malformed. Skip it, log it, continue.

**Never swallow:** anything that makes the result set incomplete — a failed page of results, an auth expiry mid-crawl, a source-side 500 on a list endpoint.

```
def get_source_data(self, **kwargs):    for summary in self.list_articles():        # raises on failure — correct        try:            yield self.fetch_detail(summary["id"])        except PullHttpError as error:            if error.status_code == 404:                logger.warning("Article %s vanished mid-crawl", summary["id"])                continue            raise
```

danger

On a **full crawl**, a short result set means stale-document deletion removes everything that didn't appear. Catching an exception around your paging loop and returning what you have so far converts a transient source outage into mass deletion in Glean. Let it raise. A failed crawl is recoverable; a successful crawl that deleted 90% of your index is not.

## Partial upload failures[​](#partial-upload-failures "Direct link to Partial upload failures")

The SDK retries transient upload failures via the generated client's retry configuration. If an upload session fails partway, the next run picks up cleanly — but a session left in a stuck state can block subsequent uploads. Clear it with:

```
connector.index_data(    mode=IndexingMode.FULL,    options=ConnectorOptions(force_restart=True),)
```

Use `force_restart` deliberately, not as a default. It discards in-progress upload state.

## Observing failures[​](#observing-failures "Direct link to Observing failures")

`index_data()` increments an error counter and re-raises, so failures are visible in metrics as well as logs:

```
try:    connector.index_data(mode=IndexingMode.FULL)except Exception:    logger.exception("Crawl failed")    raise                      # let the scheduler see a non-zero exit
```

Exiting non-zero matters: a scheduler that thinks the run succeeded won't alert, and won't retry. See [Observability](/libraries/indexing-sdk/observability).
