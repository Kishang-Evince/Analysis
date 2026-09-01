---
url: "https://developers.glean.com/libraries/indexing-sdk/pull/rate-limiting"
canonical: "https://developers.glean.com/libraries/indexing-sdk/pull/rate-limiting"
title: "Rate limiting | Glean Developer"
description: "Token bucket rate limiting for source APIs in the Glean Indexing SDK"
fetched_at: "2026-09-01T13:23:04.752Z"
---
On this page

Connectors are the most aggressive client most source APIs will ever see: a full crawl issues thousands of requests as fast as the network allows. Rate limiting keeps you inside the source's quota, and keeps your connector from being the reason someone else's integration gets throttled.

## Token bucket[​](#token-bucket "Direct link to Token bucket")

```
from glean.indexing.recipes.pull import (    BasePullHttpStreamingDataClient,    TokenBucketRateLimiter,)class ArticleDataClient(BasePullHttpStreamingDataClient[Article]):    def __init__(self, token: str):        super().__init__(            base_url="https://api.example.com/v2",            path="/articles",            headers={"Authorization": f"Bearer {token}"},            rate_limiter=TokenBucketRateLimiter(                rate_per_second=10,                capacity=20,            ),        )
```

Tokens refill continuously at `rate_per_second`, up to `capacity`. Every request consumes one token, blocking if none are available.

| Parameter | Meaning |
| --- | --- |
| `rate_per_second` | Sustained request rate. Must be greater than zero. |
| `capacity` | Burst size — how many requests can go out back-to-back after an idle period. |
| `initial_tokens` | Starting tokens. Defaults to full capacity. |

Setting `capacity` above `rate_per_second` allows a short burst, which is usually what you want: the crawl starts fast, then settles to the sustained rate.

The limiter is thread-safe, so it can be shared across data clients that hit the same API:

```
shared = TokenBucketRateLimiter(rate_per_second=10, capacity=20)articles = ArticleDataClient(token, rate_limiter=shared)comments = CommentDataClient(token, rate_limiter=shared)
```

That's the right pattern when a source enforces its quota per token rather than per endpoint.

## Choosing a rate[​](#choosing-a-rate "Direct link to Choosing a rate")

Start from the source's documented quota and leave headroom — other things use the same token. A source allowing 600 requests/minute is 10/second; running at 7–8 leaves room for retries and for whatever else is authenticating as you.

## Timeouts[​](#timeouts "Direct link to Timeouts")

`acquire()` blocks indefinitely by default. To fail instead of waiting forever, set a rate-limit timeout:

```
from glean.indexing.recipes.pull import PullOptionsoptions = PullOptions(rate_limit_timeout_seconds=30.0)
```

If capacity doesn't arrive in time, the SDK raises `RateLimitExceededError`. Waiting forever is the safer default for a scheduled batch job; a timeout is better when the connector runs behind something with its own deadline.

## Rate limiting and retries work together[​](#rate-limiting-and-retries-work-together "Direct link to Rate limiting and retries work together")

They solve different problems and both should be on:

-   The **rate limiter** is proactive — it paces requests to stay under the quota.
-   **Retries** are reactive — when a 429 gets through anyway, `PullRetryOptions` backs off and tries again, honoring `Retry-After` by default.

```
super().__init__(    base_url="https://api.example.com/v2",    path="/articles",    rate_limiter=TokenBucketRateLimiter(rate_per_second=10, capacity=20),    options=PullOptions(        retries=PullRetryOptions(max_attempts=5, respect_retry_after=True),    ),)
```

A rising retry count is a signal your configured rate is too high. [Observability](/libraries/indexing-sdk/observability) records retries, so you can see it rather than guess.

## Custom limiters[​](#custom-limiters "Direct link to Custom limiters")

`RateLimiter` is a `Protocol`. Anything with a matching `acquire()` works — a distributed limiter backed by Redis, for instance, when several connector instances share one quota:

```
class RedisRateLimiter:    def acquire(self, tokens: float = 1.0, timeout_seconds: float | None = None) -> None:        ...  # raise RateLimitExceededError if capacity doesn't arrive in time
```

info

`TokenBucketRateLimiter` accumulates minor floating-point drift over very long continuous runs. It has no practical effect on a crawl measured in hours. Tracked in [issue #121](https://github.com/gleanwork/glean-indexing-sdk/issues/121).
