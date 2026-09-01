---
url: "https://developers.glean.com/libraries/web-sdk/reference/type-aliases/WebSdkChatEvent"
canonical: "https://developers.glean.com/libraries/web-sdk/reference/type-aliases/WebSdkChatEvent"
title: "WebSdkChatEvent | Glean Developer"
description: "Chat events that can be emitted by the chat component"
fetched_at: "2026-09-01T13:23:07.389Z"
---
On this page

```
type WebSdkChatEvent =   | {  name: "chat:page_view";}  | {  chatId: string | undefined;  name: "chat:id_update";}  | {  id?: string;  name: "chat:location_update";  type: ChatLocation;}  | {  name: "chat:action_click";  payload: string;};
```

Chat events that can be emitted by the chat component

-   chat:id\_update and chat:location\_update events may be sent multiple times for the same ID and the handler should be idempotent

## Union Members[​](#union-members "Direct link to Union Members")

### Type Literal[​](#type-literal "Direct link to Type Literal")

```
{  name: "chat:page_view";}
```

* * *

### Type Literal[​](#type-literal-1 "Direct link to Type Literal")

```
{  chatId: string | undefined;  name: "chat:id_update";}
```

| Name | Type | Description |
| --- | --- | --- |
| `chatId` | `string` | `undefined` | chatId can be undefined if the chatId is not yet available in current chat session, for example when the current chat is cleared. |
| `name` | `"chat:id_update"` | Deprecated: Use chat:location\_update instead |

* * *

### Type Literal[​](#type-literal-2 "Direct link to Type Literal")

```
{  id?: string;  name: "chat:location_update";  type: ChatLocation;}
```

| Name | Type | Description |
| --- | --- | --- |
| `id?` | `string` | Can be undefined, for example when the current chat is cleared. |
| `name` | `"chat:location_update"` | \- |
| `type` | `ChatLocation` | \- |

* * *

### Type Literal[​](#type-literal-3 "Direct link to Type Literal")

```
{  name: "chat:action_click";  payload: string;}
```
