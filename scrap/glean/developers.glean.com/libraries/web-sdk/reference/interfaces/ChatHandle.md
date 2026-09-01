---
url: "https://developers.glean.com/libraries/web-sdk/reference/interfaces/ChatHandle"
canonical: "https://developers.glean.com/libraries/web-sdk/reference/interfaces/ChatHandle"
title: "ChatHandle | Glean Developer"
description: "Properties"
fetched_at: "2026-09-01T13:23:06.293Z"
---
On this page

## Properties[​](#properties "Direct link to Properties")

### off[​](#off "Direct link to off")

```
off: (eventName, handler) => void;
```

#### Parameters[​](#parameters "Direct link to Parameters")

| Parameter | Type |
| --- | --- |
| `eventName` | | `"chat:page_view"` | `"chat:id_update"` | `"chat:location_update"` | `"chat:action_click"` |
| `handler` | (`event`) => `void` |

#### Returns[​](#returns "Direct link to Returns")

`void`

* * *

### on[​](#on "Direct link to on")

```
on: (eventName, handler) => void;
```

#### Parameters[​](#parameters-1 "Direct link to Parameters")

| Parameter | Type |
| --- | --- |
| `eventName` | | `"chat:page_view"` | `"chat:id_update"` | `"chat:location_update"` | `"chat:action_click"` |
| `handler` | (`event`) => `void` |

#### Returns[​](#returns-1 "Direct link to Returns")

`void`
