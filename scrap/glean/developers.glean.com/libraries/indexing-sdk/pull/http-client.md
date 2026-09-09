---
url: "https://developers.glean.com/libraries/indexing-sdk/pull/http-client"
canonical: "https://developers.glean.com/libraries/indexing-sdk/pull/http-client"
title: "HTTP client | Glean Developer"
description: "PullHttpClient - retries, backoff, redaction, and bounded fetches against your source API"
fetched_at: "2026-09-01T13:23:04.646Z"
---
On this page

`PullHttpClient` is the SDK's HTTP client for talking to **your source system**. It is not the client that talks to Glean - that's [`PushUploader`](/libraries/indexing-sdk/push/uploader).

It exists because every hand-rolled connector ends up reimplementing the same things: session reuse, retry with backoff, honoring `Retry-After`, and keeping API keys out of logs.

```
from glean.indexing.recipes.pull import PullHttpClient, PullOptionswith PullHttpClient(    base_url="https://api.example.com/v2",    headers={"Authorization": f"Bearer {token}"},    options=PullOptions(timeout_seconds=30.0),) as http:    response = http.get("/articles", params={"limit": 100})    articles = response.json_dict()["items"]
```

## Requests[​](#requests "Direct link to Requests")

| Method | Returns |
| --- | --- |
| `get(path_or_url, *, params, headers, timeout_seconds)` | `PullResponse` |
| `post(path_or_url, *, json, data, params, headers, timeout_seconds)` | `PullResponse` |
| `request(method, path_or_url, ...)` | `PullResponse` |
| `get_bytes(path_or_url, *, headers, timeout_seconds, max_bytes)` | `tuple[bytes, str]` - body and content type |

Paths are resolved against `base_url`; absolute URLs are used as-is, which is what makes [`Link`\-header pagination](/libraries/indexing-sdk/pull/pagination) work without extra bookkeeping.

## Responses[​](#responses "Direct link to Responses")

`PullResponse` is a frozen dataclass with two accessors that fail loudly on shape mismatches:

```
response.status_code   # intresponse.headers       # dict[str, str]response.url           # strresponse.json_dict()   # dict - raises TypeError if the body was a listresponse.json_list()   # list - raises TypeError if the body was an object
```

Preferring these over raw `.data` means a source that starts returning `{"error": ...}` where you expected a list fails with a clear `TypeError` at the boundary instead of an `AttributeError` deep inside `transform()`.

## Retries and backoff[​](#retries-and-backoff "Direct link to Retries and backoff")

Retry behavior lives on `PullRetryOptions`:

```
options = PullOptions(    timeout_seconds=30.0,    retries=PullRetryOptions(        max_attempts=5,        initial_backoff_seconds=1.0,        max_backoff_seconds=60.0,        backoff_multiplier=2.0,        retry_status_codes={429, 500, 502, 503, 504},        retry_connection_errors=True,        respect_retry_after=True,        jitter_seconds=1.0,    ),)
```

| Field | Default | Notes |
| --- | --- | --- |
| `max_attempts` | `2` | Total attempts, not retries after the first. |
| `initial_backoff_seconds` | `1.0` | First wait, then multiplied each attempt. |
| `max_backoff_seconds` | `60.0` | Ceiling on any single wait. |
| `backoff_multiplier` | `2.0` | Exponential factor. |
| `retry_status_codes` | `{429, 500, 502, 503, 504}` | Everything else fails immediately. |
| `retry_connection_errors` | `True` | Retries transport-level failures. |
| `respect_retry_after` | `True` | A `Retry-After` header overrides computed backoff. |
| `jitter_seconds` | `1.0` | Random jitter added to each wait, so parallel connectors don't retry in lockstep. |

info

The default `max_attempts=2` is deliberately conservative - one retry. Most production connectors should raise it to 4 or 5, particularly against APIs that rate-limit aggressively. Pair it with a [rate limiter](/libraries/indexing-sdk/pull/rate-limiting) so you're pacing requests rather than only reacting to 429s.

Failures that exhaust retries raise `PullHttpError`, which carries `status_code` and the underlying `response`:

```
from glean.indexing.recipes.pull import PullHttpErrortry:    response = http.get("/articles")except PullHttpError as error:    if error.status_code == 404:        return []    raise
```

## Credential redaction[​](#credential-redaction "Direct link to Credential redaction")

`PullOptions.mask_params` defaults to `True`, so query parameters are redacted in the client's request logs. This matters because source APIs frequently accept tokens as query parameters, and connector logs are routinely shipped to a log aggregator.

Redaction covers logging only. It does not stop you from putting a secret in an exception message you construct yourself.

## Bounded binary fetches[​](#bounded-binary-fetches "Direct link to Bounded binary fetches")

`get_bytes()` takes a `max_bytes` cap, useful when indexing attachments from a source that can return arbitrarily large files:

```
content, content_type = http.get_bytes("/attachments/42", max_bytes=10 * 1024 * 1024)
```

warning

`get_bytes()` currently reads the full response into memory before applying `max_bytes`, so the cap bounds what you *receive*, not what gets buffered. Don't rely on it as protection against a source returning a multi-gigabyte file. Tracked in [issue #119](https://github.com/gleanwork/glean-indexing-sdk/issues/119).

## Connection lifecycle[​](#connection-lifecycle "Direct link to Connection lifecycle")

The client owns an `httpx.Client` unless you pass your own. Use it as a context manager, or call `close()` explicitly:

```
http = PullHttpClient(base_url="https://api.example.com")try:    ...finally:    http.close()
```

If you pass `client=my_httpx_client`, the SDK will not close it - ownership stays with you.

## Next[​](#next "Direct link to Next")

[

### Data clients

Wire this into a streaming data client with no boilerplate.







](/libraries/indexing-sdk/pull/data-clients)[

### Pagination

Link header, offset, and cursor strategies.







](/libraries/indexing-sdk/pull/pagination)
