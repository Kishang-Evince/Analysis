---
url: "https://developers.glean.com/errors/token-limit-exceeded"
canonical: "https://developers.glean.com/errors/token-limit-exceeded"
title: "Token Limit Exceeded | Glean Developer"
description: "token_limit_exceeded ProblemDetail reference for the Glean Platform API"
fetched_at: "2026-09-01T13:23:01.285Z"
---
On this page

## Code[​](#code "Direct link to Code")

-   `code`: `token_limit_exceeded`
-   `status`: `413`
-   `url`: `https://developers.glean.com/errors/token-limit-exceeded`

## What It Means[​](#what-it-means "Direct link to What It Means")

The request exceeded the model's token limit, which caps how much content the model can process in one operation.

## Common Causes[​](#common-causes "Direct link to Common Causes")

-   The supplied input is longer than the model's context window.
-   A continued conversation has accumulated too much history.
-   Large pasted documents or transcripts were included in the input.

## How To Resolve[​](#how-to-resolve "Direct link to How To Resolve")

### Client Actions[​](#client-actions "Direct link to Client Actions")

-   Shorten the input, or summarize long content before sending it.
-   Start a new conversation instead of continuing one with a long history.
-   Split large content into smaller requests and combine the results client-side.
-   Note that this limit counts tokens, not payload bytes, unlike `request_too_large`.

## Retry Guidance[​](#retry-guidance "Direct link to Retry Guidance")

Retrying the same input will continue to fail. Retry only after reducing the amount of content.

## Example Response[​](#example-response "Direct link to Example Response")

```
{  "type": "https://developers.glean.com/errors/token-limit-exceeded",  "title": "Token Limit Exceeded",  "status": 413,  "detail": "Human-readable explanation specific to this occurrence.",  "code": "token_limit_exceeded",  "documentation_url": "https://developers.glean.com/errors/token-limit-exceeded",  "request_id": "req_7f8a9b0c1d2e"}
```
