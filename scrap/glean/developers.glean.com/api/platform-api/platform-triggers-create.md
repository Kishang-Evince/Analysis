---
url: "https://developers.glean.com/api/platform-api/platform-triggers-create"
canonical: "https://developers.glean.com/api/platform-api/platform-triggers-create"
title: "Create trigger | Glean Developer"
description: "Create a trigger from a preset and return it with its signing secret."
fetched_at: "2026-09-01T13:22:58.874Z"
---
# Create trigger

POST 

## /api/triggers

experimental

Expect changes and instability. Introduced on July 6, 2026. [Learn how experimental APIs work](/experimental/overview).

Create a trigger from a preset and return it with its signing secret.

## Request[​](#request "Direct link to request")

## Responses[​](#responses "Direct link to Responses")

-   201
-   400
-   401
-   403
-   404
-   408
-   409
-   413
-   429
-   500
-   503

Trigger created.

Invalid request (malformed JSON, invalid parameter values, unknown fields).

Missing or invalid authentication token.

Token valid but lacks permission for the requested operation.

Resource not found.

Backend did not respond within the timeout window.

Request conflicts with current state of the resource.

Request body exceeds the maximum allowed size.

Rate limit exceeded. Includes Retry-After header.

Unexpected server-side failure.

Backend temporarily unavailable.

## Callbacks[​](#callbacks "Direct link to Callbacks")

-   POST triggerEvent

POST 

## {$request.body#/delivery/webhook\_url}

Delivery uses at-least-once semantics, so the same event can be sent more than once. Return any 2xx status after accepting the event. Network failures, 408, 429, and 5xx responses are retried; other non-2xx responses, including redirects, are terminal. The `webhook-id` remains stable across attempts and can be used for deduplication, while `webhook-timestamp` and `webhook-signature` are generated for each attempt.

## Callbacks Responses[​](#callbacks-responses "Direct link to Callbacks Responses")

-   408
-   429
-   2XX
-   3XX
-   4XX
-   5XX

Request timeout. Glean retries the delivery.

Rate limited. Glean retries the delivery.

Event accepted. Glean does not retry the delivery.

Redirects are not followed and the delivery is not retried.

Client error other than 408 or 429. Glean does not retry.

Server error. Glean retries the delivery.
