---
url: "https://developers.glean.com/api/client-api/chat/chat"
canonical: "https://developers.glean.com/api/client-api/chat/chat"
title: "Chat | Glean Developer"
description: "Have a conversation with Glean AI."
fetched_at: "2026-09-01T13:22:52.405Z"
---
# Chat

POST 

## /rest/api/v1/chat

⚠1 active deprecation

`citations`

Use inline citations via ChatMessageFragment.citation and ChatMessageCitation.referenceRanges instead. This field is still populated for backward compatibility.

Deprecation introduced on 2026-02-06|Will be removed after 2026-10-15

[View All Deprecations](/deprecations)

Have a conversation with Glean AI.

## Request[​](#request "Direct link to request")

## Responses[​](#responses "Direct link to Responses")

-   200
-   202
-   400
-   401
-   408
-   429

OK

Request accepted but not yet processed. Returned when another in-flight request is already running for the same chat session; the body's `queuedRequestId` identifies the deferred run and output will be persisted to the chat session referenced by `chatId`.

Invalid request

Not Authorized

Request Timeout

Too Many Requests
