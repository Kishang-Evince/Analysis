---
url: "https://developers.glean.com/libraries/web-sdk/reference/interfaces/ChatCustomizations"
canonical: "https://developers.glean.com/libraries/web-sdk/reference/interfaces/ChatCustomizations"
title: "ChatCustomizations | Glean Developer"
description: "Properties"
fetched_at: "2026-09-01T13:23:06.096Z"
---
On this page

## Properties[​](#properties "Direct link to Properties")

### autocompletePosition?[​](#autocompleteposition "Direct link to autocompletePosition?")

```
optional autocompletePosition?: "above" | "below";
```

Controls where the autocomplete dropdown appears relative to the chat input box. Only applies when `features.autocomplete` is enabled.

-   'above' - Autocomplete results appear above the input box.
-   'below' - Autocomplete results appear below the input box.

Default is 'above'.

* * *

### container?[​](#container "Direct link to container?")

```
optional container?: BoxCustomizations;
```

Customizations for the widget box.

* * *

### features?[​](#features "Direct link to features?")

```
optional features?: object;
```

Options to control which chat features or UI elements are displayed in the widget.

#### agentLibrary?[​](#agentlibrary "Direct link to agentLibrary?")

```
optional agentLibrary?: boolean;
```

The entry point to the agents library. Default is true.

#### agentMetadata?[​](#agentmetadata "Direct link to agentMetadata?")

```
optional agentMetadata?: boolean;
```

The element that shows metadata about an embedded agent. Default is true.

#### applicationLibrary?[​](#applicationlibrary "Direct link to applicationLibrary?")

```
optional applicationLibrary?: boolean;
```

The entry point to the AI apps library. Default is true.

#### autocomplete?[​](#autocomplete "Direct link to autocomplete?")

```
optional autocomplete?: boolean;
```

Autocomplete suggestions shown in the chat input. Default is false.

#### chatMenu?[​](#chatmenu "Direct link to chatMenu?")

```
optional chatMenu?: boolean;
```

The menu which displays chat history and other advanced features. Default is true.

#### chatSettings?[​](#chatsettings "Direct link to chatSettings?")

```
optional chatSettings?: boolean;
```

The button that leads to the chat settings menu. Default is true.

#### clearChat?[​](#clearchat "Direct link to clearChat?")

```
optional clearChat?: boolean;
```

The button that clears the current chat session. Default is true when chat menu is disabled.

#### createPrompt?[​](#createprompt "Direct link to createPrompt?")

```
optional createPrompt?: boolean;
```

The button that opens prompt creation drawer. Default is true.

#### feedback?[​](#feedback "Direct link to feedback?")

```
optional feedback?: boolean;
```

The button that opens the feedback form. Default is true.

#### newChatButton?[​](#newchatbutton "Direct link to newChatButton?")

```
optional newChatButton?: boolean;
```

The ability to start a new chat from the chat menu. Disabling this will remove the new chat button in the chat menu. Default is true.

#### promptLibrary?[​](#promptlibrary "Direct link to promptLibrary?")

```
optional promptLibrary?: boolean;
```

The entry point to the prompts library. Default is true.
