---
url: "https://developers.glean.com/changelog/"
canonical: "https://developers.glean.com/changelog/"
title: "Changelog | Glean Developer"
description: "Keep up with the latest changes and updates to Glean's developer platform"
fetched_at: "2026-09-01T13:23:00.024Z"
---
# Changelog

Keep up with the latest changes and updates to Glean's developer platform.

CategoryAll categoriesAPIAPI ClientsDocumentationGlean Agent ToolkitGlean Indexing SDKMCPSDKWebsitelangchain-glean

AttentionAll attention levelsBreakingAction requiredDeprecatedNoteworthyRoutine

340 of 340

August 21

2026

Api-client-typescript v0.19.0 includes 4 additions, 4 changes.

**Read more**

## Changes

-   Added `request.chatRequest.messages[].citations[].sourceSkill` to `client.chat.create()`.
-   Added `response.messages[].citations[].sourceSkill` to `client.chat.create()`.
-   Added `response.chatResult.chat.messages[].citations[].sourceSkill` to `client.chat.retrieve()`.
-   Added `request.chatRequest.messages[].citations[].sourceSkill` to `client.chat.createstream()`.
-   Changed `request.input.union(Array<PlatformChatInputMessage>)[].role` on `chat.create()`.
-   Changed `response` on `chat.create()`.
-   Changed `request.feedRequest.categories[]` on `client.search.retrievefeed()`.
-   Changed `response.results[]` on `client.search.retrievefeed()`.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-typescript/releases/tag/v0.19.0)

Api-client-python v0.16.0 includes 4 additions, 4 changes.

**Read more**

## Changes

-   Added `request.messages[].citations[].source_skill` to `client.chat.create()`.
-   Added `response.messages[].citations[].source_skill` to `client.chat.create()`.
-   Added `response.chat_result.chat.messages[].citations[].source_skill` to `client.chat.retrieve()`.
-   Added `request.messages[].citations[].source_skill` to `client.chat.create_stream()`.
-   Changed `request.input.union(Array<PlatformChatInputMessage>)[].role` on `chat.create()`.
-   Changed `response` on `chat.create()`.
-   Changed `request.categories[]` on `client.search.retrieve_feed()`.
-   Changed `response.results[]` on `client.search.retrieve_feed()`.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-python/releases/tag/v0.16.0)

Api-client-java v0.16.0 includes 4 additions, 4 changes.

**Read more**

## Changes

-   Added `request.chatRequest.messages[].citations[].sourceSkill` to `client.chat.create()`.
-   Added `response.messages[].citations[].sourceSkill` to `client.chat.create()`.
-   Added `response.chatResult.chat.messages[].citations[].sourceSkill` to `client.chat.retrieve()`.
-   Added `request.chatRequest.messages[].citations[].sourceSkill` to `client.chat.createstream()`.
-   Changed `request.input.union(Array<PlatformChatInputMessage>)[].role` on `chat.create()`.
-   Changed `response` on `chat.create()`.
-   Changed `request.feedRequest.categories[]` on `client.search.retrievefeed()`.
-   Changed `response.results[]` on `client.search.retrievefeed()`.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-java/releases/tag/v0.16.0)

Api-client-go v0.14.0 includes 4 additions, 4 changes.

**Read more**

## Changes

-   Added `request.ChatRequest.Messages[].Citations[].SourceSkill` to `client.chat.create()`.
-   Added `response.Messages[].Citations[].SourceSkill` to `client.chat.create()`.
-   Added `response.ChatResult.Chat.Messages[].Citations[].SourceSkill` to `client.chat.retrieve()`.
-   Added `request.ChatRequest.Messages[].Citations[].SourceSkill` to `client.chat.createstream()`.
-   Changed `request.Request.Input.union(Array<PlatformChatInputMessage>)[].Role` on `chat.create()`.
-   Changed `response` on `chat.create()`.
-   Changed `request.FeedRequest.Categories[]` on `client.search.retrievefeed()`.
-   Changed `response.Results[]` on `client.search.retrievefeed()`.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-go/releases/tag/v0.14.0)

August 20

2026

The Platform Triggers API is now documented as an experimental release — subscribe to content events in Glean and receive them at your own endpoint as signed webhooks, instead of polling for changes.

**Read more**

## Changes

-   Added endpoints: `GET /api/trigger-presets`, `GET /api/trigger-presets/{preset_id}`, `GET /api/trigger-presets/{preset_id}/input-values`.
-   Added endpoints: `POST /api/triggers`, `GET /api/triggers`, `GET /api/triggers/{trigger_id}`, `PATCH /api/triggers/{trigger_id}`, `DELETE /api/triggers/{trigger_id}`.
-   Added endpoints: `POST /api/trigger-presets/{preset_id}/events/search`, `POST /api/triggers/{trigger_id}/events/search` — preview what a preset would match, or search recent events a trigger's current configuration matches.
-   Triggers are created from **presets**: curated event definitions per datasource, each declaring the inputs it accepts, discoverable at runtime.
-   Events arrive as [Standard Webhooks](https://www.standardwebhooks.com), signed with HMAC-SHA256. The signing secret is returned once, at creation. Delivery is at least once, and `webhook-id` is stable across retries.
-   `delivery.auth` attaches a bearer token sent alongside the signature, not instead of it.
-   Events are scoped to what the subscribing user is permitted to see.

## Experimental

These endpoints are experimental. Send `X-Glean-Include-Experimental: true` or they are not exposed. They may change or be removed without notice, and the standard API lifecycle guarantees do not apply. See [Experimental APIs](/experimental/overview).

## Documentation

-   [Triggers API overview](/api/platform-api/triggers-overview)
-   [List trigger presets](/api/platform-api/platform-trigger-presets-list)
-   [Create trigger](/api/platform-api/platform-triggers-create)

August 5

2026

Glean-indexing-sdk v1.0.0rc0: **cli**: add test, schema, and completion commands.

**Read more**

## Changes

-   **cli**: add test, schema, and completion commands.
-   **cli**: add glean-idx run.
-   **cli**: ship connector validation as glean-idx validate.
-   **cli**: add the datasource command group.
-   **cli**: add the document command group.
-   **cli**: resolve connector projects and enforce preconditions.
-   **cli**: add the glean-idx foundation and doctor command.
-   Add configurable upload timeout to ConnectorOptions.
-   Add ConnectorOptions for bulk indexing configuration.
-   **deployment**: strip https:// from OIDC issuer URL in AWS IRSA trust policy.
-   Sync markdown doc with reformatted snippet import order.
-   Use attribute access in configure\_datasource() to avoid camelCase kwargs.
-   **cli**: move deploy under glean-idx.
-   Remove experimental worker module.

## Source

-   [Release notes](https://github.com/gleanwork/glean-indexing-sdk/releases/tag/v1.0.0rc0)
-   [PR #132](https://github.com/gleanwork/glean-indexing-sdk/pull/132)
-   [PR #131](https://github.com/gleanwork/glean-indexing-sdk/pull/131)
-   [PR #130](https://github.com/gleanwork/glean-indexing-sdk/pull/130)
-   [PR #127](https://github.com/gleanwork/glean-indexing-sdk/pull/127)
-   [PR #126](https://github.com/gleanwork/glean-indexing-sdk/pull/126)
-   [PR #124](https://github.com/gleanwork/glean-indexing-sdk/pull/124)
-   [PR #123](https://github.com/gleanwork/glean-indexing-sdk/pull/123)
-   [PR #19](https://github.com/gleanwork/glean-indexing-sdk/pull/19)
-   [PR #134](https://github.com/gleanwork/glean-indexing-sdk/pull/134)
-   [PR #125](https://github.com/gleanwork/glean-indexing-sdk/pull/125)
-   [PR #52](https://github.com/gleanwork/glean-indexing-sdk/pull/52)

August 4

2026

1 endpoint added.

**Read more**

## Changes

-   Added endpoint: /tool-servers/{serverId}/tools

## Source

-   [open-api 0809530](https://github.com/gleanwork/open-api/commit/080953028c9e47551287142d11b77bb86d431b4c)
-   [open-api 0be0e04](https://github.com/gleanwork/open-api/commit/0be0e0473775c21f657b5b450ecfc4c9e5acfa02)
-   [open-api 18a683c](https://github.com/gleanwork/open-api/commit/18a683ca1e11151781288cf9be1d3edba125f9e9)
-   [open-api 1dcebdb](https://github.com/gleanwork/open-api/commit/1dcebdb0fd6465a22228976a2a34b5b2cdf0538a)
-   [open-api 3fdab96](https://github.com/gleanwork/open-api/commit/3fdab962b5825b7c0b902e0accbdcb38e8ed6b59)
-   [open-api 4690f7e](https://github.com/gleanwork/open-api/commit/4690f7e7dd919d8ed34d1f7b09f885839f4ade43)
-   [open-api 46a9f32](https://github.com/gleanwork/open-api/commit/46a9f32120bfd62f558b616d34c02f7c5128bf5d)
-   [open-api 4bcd05c](https://github.com/gleanwork/open-api/commit/4bcd05cb81511c66c6b6dc1c868fe8deef214a3c)

August 3

2026

1 endpoint added.

**Read more**

## Changes

-   Added endpoint: /agents/{agent\_id}/import

## Source

-   [open-api 05b91ed](https://github.com/gleanwork/open-api/commit/05b91ed3f5fe7e8e466282bc4d3310ce9f3f3ec3)
-   [open-api 3a0319b](https://github.com/gleanwork/open-api/commit/3a0319b8edeb91bb7df1e0a8d69c4d78c3e4356a)
-   [open-api 3d6799d](https://github.com/gleanwork/open-api/commit/3d6799d152c55521cb4b4cb6a552e7d9e45de190)
-   [open-api 654cceb](https://github.com/gleanwork/open-api/commit/654cceb01e5dabc4a050e06661f7e404869f5ce7)
-   [open-api 6614a94](https://github.com/gleanwork/open-api/commit/6614a94408401c45827c3f3fb42fc2f0cc17c5e5)
-   [open-api 7c1cbe9](https://github.com/gleanwork/open-api/commit/7c1cbe976d51476bc4710e80c7a72f51d868466a)
-   [open-api 892f265](https://github.com/gleanwork/open-api/commit/892f265f99e911faca69c14d7843b5b1041ce900)
-   [open-api 8d778d4](https://github.com/gleanwork/open-api/commit/8d778d470db9a68c490027c0b1f0206ec53c668d)

July 29

2026

Mcp-config v5.4.1: `mcp-config-schema`: update documentation URLs for Antigravity, Gemini CLI, Goose, and Linear ([@glean-github-app-oauth\[bot\]](https://github.com/apps/glean-github-app-oauth)).

**Read more**

## Action Required

-   Review OAuth configuration before upgrading.

## Changes

-   `mcp-config-schema`: update documentation URLs for Antigravity, Gemini CLI, Goose, and Linear ([@glean-github-app-oauth\[bot\]](https://github.com/apps/glean-github-app-oauth)).

## Source

-   [Release notes](https://github.com/gleanwork/mcp-config/releases/tag/v5.4.1)
-   [PR #129](https://github.com/gleanwork/mcp-config/pull/129)

July 21

2026

Api-client-typescript v0.18.0 includes 6 additions, 3 changes.

**Read more**

## Changes

-   Added `request.chatRequest.messages[].fragments[].action.metadata.actionTypeSource` to `client.chat.create()`.
-   Added `response.messages[].fragments[].action.metadata.actionTypeSource` to `client.chat.create()`.
-   Added `response.chatResult.chat.messages[].fragments[].action.metadata.actionTypeSource` to `client.chat.retrieve()`.
-   Added `request.chatRequest.messages[].fragments[].action.metadata.actionTypeSource` to `client.chat.createstream()`.
-   Added `response.workflow.webhookUrl` to `client.agents.create()`.
-   Added `response.results[].primaryEntry.workflow.workflow.webhookUrl` to `client.search.retrievefeed()`.
-   Changed `request` on `client.governance.data.findings.create()`.
-   Changed `response` on `client.governance.data.findings.create()`.
-   Changed `response.exports[]` on `client.governance.data.findings.list()`.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-typescript/releases/tag/v0.18.0)

Api-client-python v0.15.4 includes 6 additions, 3 changes.

**Read more**

## Changes

-   Added `request.messages[].fragments[].action.metadata.action_type_source` to `client.chat.create()`.
-   Added `response.messages[].fragments[].action.metadata.action_type_source` to `client.chat.create()`.
-   Added `response.chat_result.chat.messages[].fragments[].action.metadata.action_type_source` to `client.chat.retrieve()`.
-   Added `request.messages[].fragments[].action.metadata.action_type_source` to `client.chat.create_stream()`.
-   Added `response.workflow.webhook_url` to `client.agents.create()`.
-   Added `response.results[].primary_entry.workflow.workflow.webhook_url` to `client.search.retrieve_feed()`.
-   Changed `request` on `client.governance.data.findings.create()`.
-   Changed `response` on `client.governance.data.findings.create()`.
-   Changed `response.exports[]` on `client.governance.data.findings.list()`.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-python/releases/tag/v0.15.4)

Api-client-java v0.14.4 includes 6 additions, 3 changes.

**Read more**

## Changes

-   Added `request.chatRequest.messages[].fragments[].action.metadata.actionTypeSource` to `client.chat.create()`.
-   Added `response.messages[].fragments[].action.metadata.actionTypeSource` to `client.chat.create()`.
-   Added `response.chatResult.chat.messages[].fragments[].action.metadata.actionTypeSource` to `client.chat.retrieve()`.
-   Added `request.chatRequest.messages[].fragments[].action.metadata.actionTypeSource` to `client.chat.createstream()`.
-   Added `response.workflow.webhookUrl` to `client.agents.create()`.
-   Added `response.results[].primaryEntry.workflow.workflow.webhookUrl` to `client.search.retrievefeed()`.
-   Changed `request` on `client.governance.data.findings.create()`.
-   Changed `response` on `client.governance.data.findings.create()`.
-   Changed `response.exports[]` on `client.governance.data.findings.list()`.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-java/releases/tag/v0.14.4)

Api-client-go v0.13.4 includes 6 additions, 3 changes.

**Read more**

## Changes

-   Added `request.ChatRequest.Messages[].Fragments[].Action.Metadata.ActionTypeSource` to `client.chat.create()`.
-   Added `response.Messages[].Fragments[].Action.Metadata.ActionTypeSource` to `client.chat.create()`.
-   Added `response.ChatResult.Chat.Messages[].Fragments[].Action.Metadata.ActionTypeSource` to `client.chat.retrieve()`.
-   Added `request.ChatRequest.Messages[].Fragments[].Action.Metadata.ActionTypeSource` to `client.chat.createstream()`.
-   Added `response.Workflow.WebhookUrl` to `client.agents.create()`.
-   Added `response.Results[].PrimaryEntry.Workflow.Workflow.WebhookUrl` to `client.search.retrievefeed()`.
-   Changed `request.Request` on `client.governance.data.findings.create()`.
-   Changed `response` on `client.governance.data.findings.create()`.
-   Changed `response.Exports[]` on `client.governance.data.findings.list()`.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-go/releases/tag/v0.13.4)

July 20

2026

Glean-agent-toolkit 0.7.0: **tools**: add transport seam, typed search backend, result truncation, status-code errors.

**Read more**

## Changes

-   **tools**: add transport seam, typed search backend, result truncation, status-code errors.
-   **chat**: read citations from fragments with legacy fallback.
-   **core**: ctx-aware as\_\*\_tool, registry collision warnings, retry unit fix.
-   **read\_document**: support renamed retrieve kwarg across glean-api-client versions.

## Source

-   [Release notes](https://github.com/gleanwork/glean-agent-toolkit/releases/tag/0.7.0)
-   [PR #87](https://github.com/gleanwork/glean-agent-toolkit/pull/87)
-   [PR #83](https://github.com/gleanwork/glean-agent-toolkit/pull/83)
-   [PR #84](https://github.com/gleanwork/glean-agent-toolkit/pull/84)
-   [PR #81](https://github.com/gleanwork/glean-agent-toolkit/pull/81)

July 19

2026

Glean-agent-toolkit 0.6.1: **read\_document**: support renamed retrieve kwarg across glean-api-client versions.

**Read more**

## Changes

-   **read\_document**: support renamed retrieve kwarg across glean-api-client versions.
-   **crewai**: pass args\_schema to BaseTool so the LLM sees real parameters.
-   **adk**: expose real typed signatures so declarations and invocation work.
-   **openai**: sanitize strict schemas and isolate per-tool conversion failures.
-   **adapters**: map anyOf/union and array item types correctly in get\_field\_type.
-   **langchain**: use StructuredTool so converted tools are invocable.
-   **tools**: stop closing shared Glean client on every tool call.

## Source

-   [Release notes](https://github.com/gleanwork/glean-agent-toolkit/releases/tag/0.6.1)
-   [PR #81](https://github.com/gleanwork/glean-agent-toolkit/pull/81)
-   [PR #73](https://github.com/gleanwork/glean-agent-toolkit/pull/73)
-   [PR #77](https://github.com/gleanwork/glean-agent-toolkit/pull/77)
-   [PR #76](https://github.com/gleanwork/glean-agent-toolkit/pull/76)
-   [PR #75](https://github.com/gleanwork/glean-agent-toolkit/pull/75)
-   [PR #74](https://github.com/gleanwork/glean-agent-toolkit/pull/74)
-   [PR #72](https://github.com/gleanwork/glean-agent-toolkit/pull/72)

Glean-agent-toolkit 0.6.0: **crewai**: pass args\_schema to BaseTool so the LLM sees real parameters.

**Read more**

## Action Required

-   Plan migration away from deprecated behavior.

## Changes

-   Add installable skills for SDK usage and tool building.
-   Search API alignment, chat tool, deprecation path, get\_tools, async support, import docs.
-   Injectable GleanContext replaces hidden api\_client() global (#62).
-   **deps**: add \[all\] extra combining all framework adapters (CHK-001).
-   **crewai**: pass args\_schema to BaseTool so the LLM sees real parameters.
-   **adk**: expose real typed signatures so declarations and invocation work.
-   **openai**: sanitize strict schemas and isolate per-tool conversion failures.
-   **adapters**: map anyOf/union and array item types correctly in get\_field\_type.
-   **langchain**: use StructuredTool so converted tools are invocable.
-   **tools**: stop closing shared Glean client on every tool call.
-   Correct web search tool name from 'Web Browser' to 'Gemini Web Search'.
-   Resolve remaining P2 eval items (CHK-111, CHK-115, CHK-118, CHK-119).
-   Resolve eval checklist items — dedup, dead code, error handling, imports.
-   Namespace tool names and optimize descriptions for LLM consumption.
-   Structured error results and consistent adapter return types.
-   Depend on langchain-core instead of langchain to support LangGraph 1.x.
-   Regenerate lockfile.
-   Align publish workflow tag trigger with commitizen tag format.
-   Use is not None checks in read\_document validation.
-   Export Registry from top-level package.
-   Remove pydantic BaseModel from adapters public API.
-   Preserve float values in retry backoff config (CHK-002).
-   **release**: correct broken version\_files path in .cz.toml (CHK-006).

## Source

-   [Release notes](https://github.com/gleanwork/glean-agent-toolkit/releases/tag/0.6.0)
-   [PR #73](https://github.com/gleanwork/glean-agent-toolkit/pull/73)
-   [PR #77](https://github.com/gleanwork/glean-agent-toolkit/pull/77)
-   [PR #76](https://github.com/gleanwork/glean-agent-toolkit/pull/76)
-   [PR #75](https://github.com/gleanwork/glean-agent-toolkit/pull/75)
-   [PR #74](https://github.com/gleanwork/glean-agent-toolkit/pull/74)
-   [PR #72](https://github.com/gleanwork/glean-agent-toolkit/pull/72)
-   [PR #70](https://github.com/gleanwork/glean-agent-toolkit/pull/70)
-   [PR #66](https://github.com/gleanwork/glean-agent-toolkit/pull/66)
-   [PR #65](https://github.com/gleanwork/glean-agent-toolkit/pull/65)
-   [PR #27](https://github.com/gleanwork/glean-agent-toolkit/pull/27)
-   [PR #71](https://github.com/gleanwork/glean-agent-toolkit/pull/71)
-   [PR #68](https://github.com/gleanwork/glean-agent-toolkit/pull/68)
-   [PR #67](https://github.com/gleanwork/glean-agent-toolkit/pull/67)
-   [PR #58](https://github.com/gleanwork/glean-agent-toolkit/pull/58)
-   [PR #55](https://github.com/gleanwork/glean-agent-toolkit/pull/55)
-   [PR #54](https://github.com/gleanwork/glean-agent-toolkit/pull/54)
-   [PR #39](https://github.com/gleanwork/glean-agent-toolkit/pull/39)
-   [PR #37](https://github.com/gleanwork/glean-agent-toolkit/pull/37)
-   [PR #36](https://github.com/gleanwork/glean-agent-toolkit/pull/36)
-   [PR #35](https://github.com/gleanwork/glean-agent-toolkit/pull/35)
-   [PR #31](https://github.com/gleanwork/glean-agent-toolkit/pull/31)

July 15

2026

2 endpoints added.

**Read more**

## Changes

-   Added endpoint: /rest/api/index/submissions/{datasourceInstance}/{type}
-   Added endpoint: /submissions/{datasourceInstance}/{type}

## Source

-   [open-api 0014369](https://github.com/gleanwork/open-api/commit/0014369d53ab6aeab9d28a4d3a24dea2361c43cd)
-   [open-api 0dce218](https://github.com/gleanwork/open-api/commit/0dce2185d014565fa994ea8b485b2c354632bc35)
-   [open-api 0dfbcff](https://github.com/gleanwork/open-api/commit/0dfbcffd5e93be2858b792645a4ad878be2c6c80)
-   [open-api 2d5869e](https://github.com/gleanwork/open-api/commit/2d5869e5349aa2221f85aa1b4e8138acc76e02f2)
-   [open-api 2da199e](https://github.com/gleanwork/open-api/commit/2da199e3d09b50fb6e535ce8d682e8faea0d5c4f)
-   [open-api 2e06973](https://github.com/gleanwork/open-api/commit/2e069735ae7931e10a7fc35947465d1995fcdb48)
-   [open-api 32e7a51](https://github.com/gleanwork/open-api/commit/32e7a5113a574eea522faa51c2d948e14af0c650)
-   [open-api 438762b](https://github.com/gleanwork/open-api/commit/438762b2397cac4b50c63dba42784619bca9279c)

Mcp-config v5.4.0: `mcp-config-glean`, `mcp-config-schema`: add managed setup URLs.

**Read more**

## Changes

-   `mcp-config-glean`, `mcp-config-schema`: add managed setup URLs.
-   `mcp-config-schema`: add Cursor Team MCP Servers client.

## Source

-   [Release notes](https://github.com/gleanwork/mcp-config/releases/tag/v5.4.0)
-   [PR #126](https://github.com/gleanwork/mcp-config/pull/126)
-   [PR #125](https://github.com/gleanwork/mcp-config/pull/125)

July 14

2026

Mcp-config v5.3.0: `mcp-config-schema`: add Copilot Studio, Gemini Enterprise, and LibreChat clients.

**Read more**

## Changes

-   `mcp-config-schema`: add Copilot Studio, Gemini Enterprise, and LibreChat clients.

## Source

-   [Release notes](https://github.com/gleanwork/mcp-config/releases/tag/v5.3.0)
-   [PR #124](https://github.com/gleanwork/mcp-config/pull/124)

July 10

2026

Api-client-typescript v0.17.3 includes 4 changes.

**Read more**

## Changes

-   Changed `request.chatRequest.messages[].fragments[]` on `client.chat.create()`.
-   Changed `response.messages[].fragments[]` on `client.chat.create()`.
-   Changed `response.chatResult.chat.messages[].fragments[]` on `client.chat.retrieve()`.
-   Changed `request.chatRequest.messages[].fragments[]` on `client.chat.createstream()`.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-typescript/releases/tag/v0.17.3)

Api-client-python v0.15.3 includes 4 changes.

**Read more**

## Changes

-   Changed `request.messages[].fragments[]` on `client.chat.create()`.
-   Changed `response.messages[].fragments[]` on `client.chat.create()`.
-   Changed `response.chat_result.chat.messages[].fragments[]` on `client.chat.retrieve()`.
-   Changed `request.messages[].fragments[]` on `client.chat.create_stream()`.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-python/releases/tag/v0.15.3)

Api-client-java v0.14.3 includes 4 changes.

**Read more**

## Changes

-   Changed `request.chatRequest.messages[].fragments[]` on `client.chat.create()`.
-   Changed `response.messages[].fragments[]` on `client.chat.create()`.
-   Changed `response.chatResult.chat.messages[].fragments[]` on `client.chat.retrieve()`.
-   Changed `request.chatRequest.messages[].fragments[]` on `client.chat.createstream()`.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-java/releases/tag/v0.14.3)

Api-client-go v0.13.3 includes 4 changes.

**Read more**

## Changes

-   Changed `request.ChatRequest.Messages[].Fragments[]` on `client.chat.create()`.
-   Changed `response.Messages[].Fragments[]` on `client.chat.create()`.
-   Changed `response.ChatResult.Chat.Messages[].Fragments[]` on `client.chat.retrieve()`.
-   Changed `request.ChatRequest.Messages[].Fragments[]` on `client.chat.createstream()`.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-go/releases/tag/v0.13.3)

July 8

2026

Api-client-typescript v0.17.2 includes 1 addition, 1 change.

**Read more**

## Changes

-   Added `request.feedRequest.categories[].enum(adminHealthCenter)` to `client.search.retrievefeed()`.
-   Changed `response.results[]` on `client.search.retrievefeed()`.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-typescript/releases/tag/v0.17.2)

Api-client-python v0.15.2 includes 1 addition, 1 change.

**Read more**

## Changes

-   Added `request.categories[].enum(admin_health_center)` to `client.search.retrieve_feed()`.
-   Changed `response.results[]` on `client.search.retrieve_feed()`.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-python/releases/tag/v0.15.2)

Api-client-java v0.14.2 includes 1 addition, 1 change.

**Read more**

## Changes

-   Added `request.feedRequest.categories[].enum(adminHealthCenter)` to `client.search.retrievefeed()`.
-   Changed `response.results[]` on `client.search.retrievefeed()`.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-java/releases/tag/v0.14.2)

Api-client-go v0.13.2 includes 1 addition, 1 change.

**Read more**

## Changes

-   Added `request.FeedRequest.Categories[].Enum(adminHealthCenter)` to `client.search.retrievefeed()`.
-   Changed `response.Results[]` on `client.search.retrievefeed()`.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-go/releases/tag/v0.13.2)

July 6

2026

1 endpoint added.

**Read more**

## Changes

-   Added endpoint: /tool-servers/{serverId}/auth

## Source

-   [open-api 4a21fa5](https://github.com/gleanwork/open-api/commit/4a21fa5af798541d971684d6553cac6518076572)
-   [open-api 4fe01f0](https://github.com/gleanwork/open-api/commit/4fe01f099b6b30460fd3c6cd2ed47cb4a77797e1)
-   [open-api 566e3d3](https://github.com/gleanwork/open-api/commit/566e3d392ace2cb8f2cd9a6fd99c9f47b1fee05a)
-   [open-api 6154b37](https://github.com/gleanwork/open-api/commit/6154b37644c41cc06ec7707d153e0babaa182692)
-   [open-api 66b0eaf](https://github.com/gleanwork/open-api/commit/66b0eaff65a1685a2aac683388743350dc8b82cc)
-   [open-api 7163488](https://github.com/gleanwork/open-api/commit/71634881068d89d4bf7db5d0464d083bad3570c7)
-   [open-api 78aad8c](https://github.com/gleanwork/open-api/commit/78aad8ce6c1ac5d1bb48377182f00e85bb723591)
-   [open-api 872c2b5](https://github.com/gleanwork/open-api/commit/872c2b51976682d881d04d05a90d7df93c20883a)

Api-client-typescript v0.17.1 includes 3 additions, 55 changes.

**Read more**

## Changes

-   Added `error.code.enum(requestTooLarge)` to `agents.get()`.
-   Added `error.code.enum(requestTooLarge)` to `agents.getschemas()`.
-   Added `request.feedRequest.categories[].enum(podcast)` to `client.search.retrievefeed()`.
-   Changed `error` on `agents.search()`.
-   Changed `error` on `agents.createrun()`.
-   Changed `error` on `search.query()`.
-   Changed `request.createAnnouncementRequest.body.structuredList[].document.metadata.author.relatedDocuments[].results[]` on `client.announcements.create()`.
-   Changed `response` on `client.announcements.create()`.
-   Changed `request.updateAnnouncementRequest.body.structuredList[].document.metadata.author.relatedDocuments[].results[]` on `client.announcements.update()`.
-   Changed `response` on `client.announcements.update()`.
-   Changed `request.createAnswerRequest.data.addedRoles[].person.relatedDocuments[].querySuggestion.ranges[].document.metadata` on `client.answers.create()`.
-   Changed `response.addedRoles[].person.relatedDocuments[].querySuggestion.ranges[].document.metadata` on `client.answers.create()`.
-   Changed `request.editAnswerRequest.addedRoles[].person.relatedDocuments[].querySuggestion.ranges[].document.metadata` on `client.answers.update()`.
-   Changed `response.addedRoles[].person.relatedDocuments[].querySuggestion.ranges[].document.metadata` on `client.answers.update()`.
-   Changed `response.answerResult` on `client.answers.retrieve()`.
-   Changed `response.answerResults[]` on `client.answers.list()`.
-   Changed `request.chatRequest.messages[].citations[].sourceDocument.metadata.author.relatedDocuments[].results[]` on `client.chat.create()`.
-   Changed `response.messages[].citations[].sourceDocument.metadata.author.relatedDocuments[].results[]` on `client.chat.create()`.
-   Changed `response.chatResult.chat.createdBy.relatedDocuments[].querySuggestion.ranges[].document.metadata` on `client.chat.retrieve()`.
-   Changed `response.chatResults[].chat.createdBy.relatedDocuments[].querySuggestion.ranges[].document.metadata` on `client.chat.list()`.
-   Changed `request.chatRequest.messages[].citations[].sourceDocument.metadata.author.relatedDocuments[].results[]` on `client.chat.createstream()`.
-   Changed `response.workflow.author.relatedDocuments[].querySuggestion.ranges[].document.metadata` on `client.agents.create()`.
-   Changed `response.collection` on `client.collections.additems()`.
-   Changed `request.createCollectionRequest.addedRoles[].person.relatedDocuments[].querySuggestion.ranges[].document.metadata` on `client.collections.create()`.
-   Changed `response.union(class (0)).collection` on `client.collections.create()`.
-   Changed `response.collection` on `client.collections.deleteitem()`.
-   Changed `request.editCollectionRequest.addedRoles[].person.relatedDocuments[].querySuggestion.ranges[].document.metadata` on `client.collections.update()`.
-   Changed `response` on `client.collections.update()`.
-   Changed `response.collection` on `client.collections.updateitem()`.
-   Changed `response.collection` on `client.collections.retrieve()`.
-   Changed `response.collections[]` on `client.collections.list()`.
-   Changed `response.documents.Map<DocumentOrError>.union(Document).metadata.author.relatedDocuments[].results[]` on `client.documents.retrieve()`.
-   Changed `response.documents[].metadata.author.relatedDocuments[].results[]` on `client.documents.retrievebyfacets()`.
-   Changed `response.gleanAssist.activityInsights[].user.relatedDocuments[].querySuggestion.ranges[].document.metadata` on `client.insights.retrieve()`.
-   Changed `response.searchResponse.results[].structuredResults[].document.metadata` on `client.messages.retrieve()`.
-   Changed `response` on `client.pins.update()`.
-   Changed `response.pin` on `client.pins.retrieve()`.
-   Changed `response.pins[]` on `client.pins.list()`.
-   Changed `response` on `client.pins.create()`.
-   Changed `request.searchRequest.sourceDocument.metadata.author.relatedDocuments[].results[]` on `client.search.queryasadmin()`.
-   Changed `response.results[].structuredResults[].document.metadata` on `client.search.queryasadmin()`.
-   Changed `response.results[].document.metadata.author.relatedDocuments[].results[]` on `client.search.autocomplete()`.
-   Changed `response.results[]` on `client.search.retrievefeed()`.
-   Changed `request.recommendationsRequest.sourceDocument.metadata.author.relatedDocuments[].results[]` on `client.search.recommendations()`.
-   Changed `response.results[].structuredResults[].document.metadata` on `client.search.recommendations()`.
-   Changed `request.searchRequest.sourceDocument.metadata.author.relatedDocuments[].results[]` on `client.search.query()`.
-   Changed `response.results[].structuredResults[].document.metadata` on `client.search.query()`.
-   Changed `response.results[].relatedDocuments[].querySuggestion.ranges[].document.metadata` on `client.entities.list()`.
-   Changed `response.results[].relatedDocuments[].querySuggestion.ranges[].document.metadata` on `client.entities.readpeople()`.
-   Changed `request.createShortcutRequest.data.addedRoles[].person.relatedDocuments[].querySuggestion.ranges[].document.metadata` on `client.shortcuts.create()`.
-   Changed `response.shortcut` on `client.shortcuts.create()`.
-   Changed `response.shortcut` on `client.shortcuts.retrieve()`.
-   Changed `response.shortcuts[]` on `client.shortcuts.list()`.
-   Changed `request.updateShortcutRequest.addedRoles[].person.relatedDocuments[].querySuggestion.ranges[].document.metadata` on `client.shortcuts.update()`.
-   Changed `response.shortcut` on `client.shortcuts.update()`.
-   Changed `response.metadata.lastVerifier.relatedDocuments[].querySuggestion.ranges[].document.metadata` on `client.verification.addreminder()`.
-   Changed `response.documents[].metadata.lastVerifier.relatedDocuments[].querySuggestion.ranges[].document.metadata` on `client.verification.list()`.
-   Changed `response.metadata.lastVerifier.relatedDocuments[].querySuggestion.ranges[].document.metadata` on `client.verification.verify()`.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-typescript/releases/tag/v0.17.1)

Api-client-python v0.15.1 includes 3 additions, 55 changes.

**Read more**

## Changes

-   Added `error.code.enum(request_too_large)` to `agents.get()`.
-   Added `error.code.enum(request_too_large)` to `agents.get_schemas()`.
-   Added `request.categories[].enum(podcast)` to `client.search.retrieve_feed()`.
-   Changed `error` on `agents.search()`.
-   Changed `error` on `agents.create_run()`.
-   Changed `error` on `search.query()`.
-   Changed `request.body.structured_list[].document.metadata.author.related_documents[].results[]` on `client.announcements.create()`.
-   Changed `response` on `client.announcements.create()`.
-   Changed `request.body.structured_list[].document.metadata.author.related_documents[].results[]` on `client.announcements.update()`.
-   Changed `response` on `client.announcements.update()`.
-   Changed `request.data.added_roles[].person.related_documents[].query_suggestion.ranges[].document.metadata` on `client.answers.create()`.
-   Changed `response.added_roles[].person.related_documents[].query_suggestion.ranges[].document.metadata` on `client.answers.create()`.
-   Changed `request.added_roles[].person.related_documents[].query_suggestion.ranges[].document.metadata` on `client.answers.update()`.
-   Changed `response.added_roles[].person.related_documents[].query_suggestion.ranges[].document.metadata` on `client.answers.update()`.
-   Changed `response.answer_result` on `client.answers.retrieve()`.
-   Changed `response.answer_results[]` on `client.answers.list()`.
-   Changed `request.messages[].citations[].source_document.metadata.author.related_documents[].results[]` on `client.chat.create()`.
-   Changed `response.messages[].citations[].source_document.metadata.author.related_documents[].results[]` on `client.chat.create()`.
-   Changed `response.chat_result.chat.created_by.related_documents[].query_suggestion.ranges[].document.metadata` on `client.chat.retrieve()`.
-   Changed `response.chat_results[].chat.created_by.related_documents[].query_suggestion.ranges[].document.metadata` on `client.chat.list()`.
-   Changed `request.messages[].citations[].source_document.metadata.author.related_documents[].results[]` on `client.chat.create_stream()`.
-   Changed `response.workflow.author.related_documents[].query_suggestion.ranges[].document.metadata` on `client.agents.create()`.
-   Changed `response.collection` on `client.collections.add_items()`.
-   Changed `request.added_roles[].person.related_documents[].query_suggestion.ranges[].document.metadata` on `client.collections.create()`.
-   Changed `response.union(class (0)).collection` on `client.collections.create()`.
-   Changed `response.collection` on `client.collections.delete_item()`.
-   Changed `request.added_roles[].person.related_documents[].query_suggestion.ranges[].document.metadata` on `client.collections.update()`.
-   Changed `response` on `client.collections.update()`.
-   Changed `response.collection` on `client.collections.update_item()`.
-   Changed `response.collection` on `client.collections.retrieve()`.
-   Changed `response.collections[]` on `client.collections.list()`.
-   Changed `response.documents.Map<DocumentOrError>.union(Document).metadata.author.related_documents[].results[]` on `client.documents.retrieve()`.
-   Changed `response.documents[].metadata.author.related_documents[].results[]` on `client.documents.retrieve_by_facets()`.
-   Changed `response.glean_assist.activity_insights[].user.related_documents[].query_suggestion.ranges[].document.metadata` on `client.insights.retrieve()`.
-   Changed `response.search_response.results[].structured_results[].document.metadata` on `client.messages.retrieve()`.
-   Changed `response` on `client.pins.update()`.
-   Changed `response.pin` on `client.pins.retrieve()`.
-   Changed `response.pins[]` on `client.pins.list()`.
-   Changed `response` on `client.pins.create()`.
-   Changed `request.source_document.metadata.author.related_documents[].results[]` on `client.search.query_as_admin()`.
-   Changed `response.results[].structured_results[].document.metadata` on `client.search.query_as_admin()`.
-   Changed `response.results[].document.metadata.author.related_documents[].results[]` on `client.search.autocomplete()`.
-   Changed `response.results[]` on `client.search.retrieve_feed()`.
-   Changed `request.source_document.metadata.author.related_documents[].results[]` on `client.search.recommendations()`.
-   Changed `response.results[].structured_results[].document.metadata` on `client.search.recommendations()`.
-   Changed `request.source_document.metadata.author.related_documents[].results[]` on `client.search.query()`.
-   Changed `response.results[].structured_results[].document.metadata` on `client.search.query()`.
-   Changed `response.results[].related_documents[].query_suggestion.ranges[].document.metadata` on `client.entities.list()`.
-   Changed `response.results[].related_documents[].query_suggestion.ranges[].document.metadata` on `client.entities.read_people()`.
-   Changed `request.data.added_roles[].person.related_documents[].query_suggestion.ranges[].document.metadata` on `client.shortcuts.create()`.
-   Changed `response.shortcut` on `client.shortcuts.create()`.
-   Changed `response.shortcut` on `client.shortcuts.retrieve()`.
-   Changed `response.shortcuts[]` on `client.shortcuts.list()`.
-   Changed `request.added_roles[].person.related_documents[].query_suggestion.ranges[].document.metadata` on `client.shortcuts.update()`.
-   Changed `response.shortcut` on `client.shortcuts.update()`.
-   Changed `response.metadata.last_verifier.related_documents[].query_suggestion.ranges[].document.metadata` on `client.verification.add_reminder()`.
-   Changed `response.documents[].metadata.last_verifier.related_documents[].query_suggestion.ranges[].document.metadata` on `client.verification.list()`.
-   Changed `response.metadata.last_verifier.related_documents[].query_suggestion.ranges[].document.metadata` on `client.verification.verify()`.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-python/releases/tag/v0.15.1)

Api-client-java v0.14.1 includes 3 additions, 55 changes.

**Read more**

## Changes

-   Added `error.code.enum(requestTooLarge)` to `agents.get()`.
-   Added `error.code.enum(requestTooLarge)` to `agents.getschemas()`.
-   Added `request.feedRequest.categories[].enum(podcast)` to `client.search.retrievefeed()`.
-   Changed `error` on `agents.search()`.
-   Changed `error` on `agents.createrun()`.
-   Changed `error` on `search.query()`.
-   Changed `request.createAnnouncementRequest.body.structuredList[].document.metadata.author.relatedDocuments[].results[]` on `client.announcements.create()`.
-   Changed `response` on `client.announcements.create()`.
-   Changed `request.updateAnnouncementRequest.body.structuredList[].document.metadata.author.relatedDocuments[].results[]` on `client.announcements.update()`.
-   Changed `response` on `client.announcements.update()`.
-   Changed `request.createAnswerRequest.data.addedRoles[].person.relatedDocuments[].querySuggestion.ranges[].document.metadata` on `client.answers.create()`.
-   Changed `response.addedRoles[].person.relatedDocuments[].querySuggestion.ranges[].document.metadata` on `client.answers.create()`.
-   Changed `request.editAnswerRequest.addedRoles[].person.relatedDocuments[].querySuggestion.ranges[].document.metadata` on `client.answers.update()`.
-   Changed `response.addedRoles[].person.relatedDocuments[].querySuggestion.ranges[].document.metadata` on `client.answers.update()`.
-   Changed `response.answerResult` on `client.answers.retrieve()`.
-   Changed `response.answerResults[]` on `client.answers.list()`.
-   Changed `request.chatRequest.messages[].citations[].sourceDocument.metadata.author.relatedDocuments[].results[]` on `client.chat.create()`.
-   Changed `response.messages[].citations[].sourceDocument.metadata.author.relatedDocuments[].results[]` on `client.chat.create()`.
-   Changed `response.chatResult.chat.createdBy.relatedDocuments[].querySuggestion.ranges[].document.metadata` on `client.chat.retrieve()`.
-   Changed `response.chatResults[].chat.createdBy.relatedDocuments[].querySuggestion.ranges[].document.metadata` on `client.chat.list()`.
-   Changed `request.chatRequest.messages[].citations[].sourceDocument.metadata.author.relatedDocuments[].results[]` on `client.chat.createstream()`.
-   Changed `response.workflow.author.relatedDocuments[].querySuggestion.ranges[].document.metadata` on `client.agents.create()`.
-   Changed `response.collection` on `client.collections.additems()`.
-   Changed `request.createCollectionRequest.addedRoles[].person.relatedDocuments[].querySuggestion.ranges[].document.metadata` on `client.collections.create()`.
-   Changed `response.union(class (0)).collection` on `client.collections.create()`.
-   Changed `response.collection` on `client.collections.deleteitem()`.
-   Changed `request.editCollectionRequest.addedRoles[].person.relatedDocuments[].querySuggestion.ranges[].document.metadata` on `client.collections.update()`.
-   Changed `response` on `client.collections.update()`.
-   Changed `response.collection` on `client.collections.updateitem()`.
-   Changed `response.collection` on `client.collections.retrieve()`.
-   Changed `response.collections[]` on `client.collections.list()`.
-   Changed `response.documents.Map<DocumentOrError>.union(Document).metadata.author.relatedDocuments[].results[]` on `client.documents.retrieve()`.
-   Changed `response.documents[].metadata.author.relatedDocuments[].results[]` on `client.documents.retrievebyfacets()`.
-   Changed `response.gleanAssist.activityInsights[].user.relatedDocuments[].querySuggestion.ranges[].document.metadata` on `client.insights.retrieve()`.
-   Changed `response.searchResponse.results[].structuredResults[].document.metadata` on `client.messages.retrieve()`.
-   Changed `response` on `client.pins.update()`.
-   Changed `response.pin` on `client.pins.retrieve()`.
-   Changed `response.pins[]` on `client.pins.list()`.
-   Changed `response` on `client.pins.create()`.
-   Changed `request.searchRequest.sourceDocument.metadata.author.relatedDocuments[].results[]` on `client.search.queryasadmin()`.
-   Changed `response.results[].structuredResults[].document.metadata` on `client.search.queryasadmin()`.
-   Changed `response.results[].document.metadata.author.relatedDocuments[].results[]` on `client.search.autocomplete()`.
-   Changed `response.results[]` on `client.search.retrievefeed()`.
-   Changed `request.recommendationsRequest.sourceDocument.metadata.author.relatedDocuments[].results[]` on `client.search.recommendations()`.
-   Changed `response.results[].structuredResults[].document.metadata` on `client.search.recommendations()`.
-   Changed `request.searchRequest.sourceDocument.metadata.author.relatedDocuments[].results[]` on `client.search.query()`.
-   Changed `response.results[].structuredResults[].document.metadata` on `client.search.query()`.
-   Changed `response.results[].relatedDocuments[].querySuggestion.ranges[].document.metadata` on `client.entities.list()`.
-   Changed `response.results[].relatedDocuments[].querySuggestion.ranges[].document.metadata` on `client.entities.readpeople()`.
-   Changed `request.createShortcutRequest.data.addedRoles[].person.relatedDocuments[].querySuggestion.ranges[].document.metadata` on `client.shortcuts.create()`.
-   Changed `response.shortcut` on `client.shortcuts.create()`.
-   Changed `response.shortcut` on `client.shortcuts.retrieve()`.
-   Changed `response.shortcuts[]` on `client.shortcuts.list()`.
-   Changed `request.updateShortcutRequest.addedRoles[].person.relatedDocuments[].querySuggestion.ranges[].document.metadata` on `client.shortcuts.update()`.
-   Changed `response.shortcut` on `client.shortcuts.update()`.
-   Changed `response.metadata.lastVerifier.relatedDocuments[].querySuggestion.ranges[].document.metadata` on `client.verification.addreminder()`.
-   Changed `response.documents[].metadata.lastVerifier.relatedDocuments[].querySuggestion.ranges[].document.metadata` on `client.verification.list()`.
-   Changed `response.metadata.lastVerifier.relatedDocuments[].querySuggestion.ranges[].document.metadata` on `client.verification.verify()`.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-java/releases/tag/v0.14.1)

Api-client-go v0.13.1 includes 3 additions, 55 changes.

**Read more**

## Changes

-   Added `error.Code.Enum(requestTooLarge)` to `agents.get()`.
-   Added `error.Code.Enum(requestTooLarge)` to `agents.getschemas()`.
-   Added `request.FeedRequest.Categories[].Enum(podcast)` to `client.search.retrievefeed()`.
-   Changed `error` on `agents.search()`.
-   Changed `error` on `agents.createrun()`.
-   Changed `error` on `search.query()`.
-   Changed `request.CreateAnnouncementRequest.Body.StructuredList[].Document.Metadata.Author.RelatedDocuments[].Results[]` on `client.announcements.create()`.
-   Changed `response` on `client.announcements.create()`.
-   Changed `request.UpdateAnnouncementRequest.Body.StructuredList[].Document.Metadata.Author.RelatedDocuments[].Results[]` on `client.announcements.update()`.
-   Changed `response` on `client.announcements.update()`.
-   Changed `request.CreateAnswerRequest.Data.AddedRoles[].Person.RelatedDocuments[].QuerySuggestion.Ranges[].Document.Metadata` on `client.answers.create()`.
-   Changed `response.AddedRoles[].Person.RelatedDocuments[].QuerySuggestion.Ranges[].Document.Metadata` on `client.answers.create()`.
-   Changed `request.EditAnswerRequest.AddedRoles[].Person.RelatedDocuments[].QuerySuggestion.Ranges[].Document.Metadata` on `client.answers.update()`.
-   Changed `response.AddedRoles[].Person.RelatedDocuments[].QuerySuggestion.Ranges[].Document.Metadata` on `client.answers.update()`.
-   Changed `response.AnswerResult` on `client.answers.retrieve()`.
-   Changed `response.AnswerResults[]` on `client.answers.list()`.
-   Changed `request.ChatRequest.Messages[].Citations[].SourceDocument.Metadata.Author.RelatedDocuments[].Results[]` on `client.chat.create()`.
-   Changed `response.Messages[].Citations[].SourceDocument.Metadata.Author.RelatedDocuments[].Results[]` on `client.chat.create()`.
-   Changed `response.ChatResult.Chat.CreatedBy.RelatedDocuments[].QuerySuggestion.Ranges[].Document.Metadata` on `client.chat.retrieve()`.
-   Changed `response.ChatResults[].Chat.CreatedBy.RelatedDocuments[].QuerySuggestion.Ranges[].Document.Metadata` on `client.chat.list()`.
-   Changed `request.ChatRequest.Messages[].Citations[].SourceDocument.Metadata.Author.RelatedDocuments[].Results[]` on `client.chat.createstream()`.
-   Changed `response.Workflow.Author.RelatedDocuments[].QuerySuggestion.Ranges[].Document.Metadata` on `client.agents.create()`.
-   Changed `response.Collection` on `client.collections.additems()`.
-   Changed `request.CreateCollectionRequest.AddedRoles[].Person.RelatedDocuments[].QuerySuggestion.Ranges[].Document.Metadata` on `client.collections.create()`.
-   Changed `response.union(class (0)).Collection` on `client.collections.create()`.
-   Changed `response.Collection` on `client.collections.deleteitem()`.
-   Changed `request.EditCollectionRequest.AddedRoles[].Person.RelatedDocuments[].QuerySuggestion.Ranges[].Document.Metadata` on `client.collections.update()`.
-   Changed `response` on `client.collections.update()`.
-   Changed `response.Collection` on `client.collections.updateitem()`.
-   Changed `response.Collection` on `client.collections.retrieve()`.
-   Changed `response.Collections[]` on `client.collections.list()`.
-   Changed `response.Documents.Map<DocumentOrError>.union(Document).Metadata.Author.RelatedDocuments[].Results[]` on `client.documents.retrieve()`.
-   Changed `response.Documents[].Metadata.Author.RelatedDocuments[].Results[]` on `client.documents.retrievebyfacets()`.
-   Changed `response.GleanAssist.ActivityInsights[].User.RelatedDocuments[].QuerySuggestion.Ranges[].Document.Metadata` on `client.insights.retrieve()`.
-   Changed `response.SearchResponse.Results[].StructuredResults[].Document.Metadata` on `client.messages.retrieve()`.
-   Changed `response` on `client.pins.update()`.
-   Changed `response.Pin` on `client.pins.retrieve()`.
-   Changed `response.Pins[]` on `client.pins.list()`.
-   Changed `response` on `client.pins.create()`.
-   Changed `request.SearchRequest.SourceDocument.Metadata.Author.RelatedDocuments[].Results[]` on `client.search.queryasadmin()`.
-   Changed `response.Results[].StructuredResults[].Document.Metadata` on `client.search.queryasadmin()`.
-   Changed `response.Results[].Document.Metadata.Author.RelatedDocuments[].Results[]` on `client.search.autocomplete()`.
-   Changed `response.Results[]` on `client.search.retrievefeed()`.
-   Changed `request.RecommendationsRequest.SourceDocument.Metadata.Author.RelatedDocuments[].Results[]` on `client.search.recommendations()`.
-   Changed `response.Results[].StructuredResults[].Document.Metadata` on `client.search.recommendations()`.
-   Changed `request.SearchRequest.SourceDocument.Metadata.Author.RelatedDocuments[].Results[]` on `client.search.query()`.
-   Changed `response.Results[].StructuredResults[].Document.Metadata` on `client.search.query()`.
-   Changed `response.Results[].RelatedDocuments[].QuerySuggestion.Ranges[].Document.Metadata` on `client.entities.list()`.
-   Changed `response.Results[].RelatedDocuments[].QuerySuggestion.Ranges[].Document.Metadata` on `client.entities.readpeople()`.
-   Changed `request.CreateShortcutRequest.Data.AddedRoles[].Person.RelatedDocuments[].QuerySuggestion.Ranges[].Document.Metadata` on `client.shortcuts.create()`.
-   Changed `response.Shortcut` on `client.shortcuts.create()`.
-   Changed `response.Shortcut` on `client.shortcuts.retrieve()`.
-   Changed `response.Shortcuts[]` on `client.shortcuts.list()`.
-   Changed `request.UpdateShortcutRequest.AddedRoles[].Person.RelatedDocuments[].QuerySuggestion.Ranges[].Document.Metadata` on `client.shortcuts.update()`.
-   Changed `response.Shortcut` on `client.shortcuts.update()`.
-   Changed `response.Metadata.LastVerifier.RelatedDocuments[].QuerySuggestion.Ranges[].Document.Metadata` on `client.verification.addreminder()`.
-   Changed `response.Documents[].Metadata.LastVerifier.RelatedDocuments[].QuerySuggestion.Ranges[].Document.Metadata` on `client.verification.list()`.
-   Changed `response.Metadata.LastVerifier.RelatedDocuments[].QuerySuggestion.Ranges[].Document.Metadata` on `client.verification.verify()`.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-go/releases/tag/v0.13.1)

June 30

2026

Configure-mcp-server v3.2.1: Inline mcp-server-utils utilities; drop the dependency.

**Read more**

## Changes

-   Inline mcp-server-utils utilities; drop the dependency.

## Source

-   [Release notes](https://github.com/gleanwork/configure-mcp-server/releases/tag/v3.2.1)
-   [PR #84](https://github.com/gleanwork/configure-mcp-server/pull/84)

June 29

2026

Api-client-typescript v0.16.0 includes 57 additions, 1 change.

**Read more**

## Changes

-   Added `request.createAnnouncementRequest.body.structuredList[].document.metadata.author.relatedDocuments[].results[].structuredResults[].customEntity.roles[].group.type.enum(collectionAudience)` to `client.announcements.create()`.
-   Added `response.body.structuredList[].document.metadata.author.relatedDocuments[].results[].structuredResults[].customEntity.roles[].group.type.enum(collectionAudience)` to `client.announcements.create()`.
-   Added `request.updateAnnouncementRequest.body.structuredList[].document.metadata.author.relatedDocuments[].results[].structuredResults[].customEntity.roles[].group.type.enum(collectionAudience)` to `client.announcements.update()`.
-   Added `response.body.structuredList[].document.metadata.author.relatedDocuments[].results[].structuredResults[].customEntity.roles[].group.type.enum(collectionAudience)` to `client.announcements.update()`.
-   Added `request.createAnswerRequest.data.addedRoles[].group.type.enum(collectionAudience)` to `client.answers.create()`.
-   Added `response.addedRoles[].group.type.enum(collectionAudience)` to `client.answers.create()`.
-   Added `request.editAnswerRequest.addedRoles[].group.type.enum(collectionAudience)` to `client.answers.update()`.
-   Added `response.addedRoles[].group.type.enum(collectionAudience)` to `client.answers.update()`.
-   Added `response.answerResult.answer.addedRoles[].group.type.enum(collectionAudience)` to `client.answers.retrieve()`.
-   Added `response.answerResults[].answer.addedRoles[].group.type.enum(collectionAudience)` to `client.answers.list()`.
-   Added `request.chatRequest.messages[].citations[].sourceDocument.metadata.author.relatedDocuments[].results[].structuredResults[].customEntity.roles[].group.type.enum(collectionAudience)` to `client.chat.create()`.
-   Added `response.messages[].citations[].sourceDocument.metadata.author.relatedDocuments[].results[].structuredResults[].customEntity.roles[].group.type.enum(collectionAudience)` to `client.chat.create()`.
-   Added `response.chatResult.chat.createdBy.relatedDocuments[].querySuggestion.ranges[].document.metadata.collections[].addedRoles[].group.type.enum(collectionAudience)` to `client.chat.retrieve()`.
-   Added `response.chatResults[].chat.createdBy.relatedDocuments[].querySuggestion.ranges[].document.metadata.collections[].addedRoles[].group.type.enum(collectionAudience)` to `client.chat.list()`.
-   Added `request.chatRequest.messages[].citations[].sourceDocument.metadata.author.relatedDocuments[].results[].structuredResults[].customEntity.roles[].group.type.enum(collectionAudience)` to `client.chat.createstream()`.
-   Added `response.collection.addedRoles[].group.type.enum(collectionAudience)` to `client.collections.additems()`.
-   Added `request.createCollectionRequest.addedRoles[].group.type.enum(collectionAudience)` to `client.collections.create()`.
-   Added `response.union(class (0)).collection.addedRoles[].group.type.enum(collectionAudience)` to `client.collections.create()`.
-   Added `response.collection.addedRoles[].group.type.enum(collectionAudience)` to `client.collections.deleteitem()`.
-   Added `request.editCollectionRequest.addedRoles[].group.type.enum(collectionAudience)` to `client.collections.update()`.
-   Added `response.addedRoles[].group.type.enum(collectionAudience)` to `client.collections.update()`.
-   Added `response.collection.addedRoles[].group.type.enum(collectionAudience)` to `client.collections.updateitem()`.
-   Added `response.collection.addedRoles[].group.type.enum(collectionAudience)` to `client.collections.retrieve()`.
-   Added `response.collections[].addedRoles[].group.type.enum(collectionAudience)` to `client.collections.list()`.
-   Added `response.documents.Map<DocumentOrError>.union(Document).metadata.author.relatedDocuments[].results[].structuredResults[].customEntity.roles[].group.type.enum(collectionAudience)` to `client.documents.retrieve()`.
-   Added `response.documents[].metadata.author.relatedDocuments[].results[].structuredResults[].customEntity.roles[].group.type.enum(collectionAudience)` to `client.documents.retrievebyfacets()`.
-   Added `response.gleanAssist.activityInsights[].user.relatedDocuments[].querySuggestion.ranges[].document.metadata.collections[].addedRoles[].group.type.enum(collectionAudience)` to `client.insights.retrieve()`.
-   Added `response.searchResponse.results[].structuredResults[].document.metadata.collections[].addedRoles[].group.type.enum(collectionAudience)` to `client.messages.retrieve()`.
-   Added `response.attribution.relatedDocuments[].querySuggestion.ranges[].document.metadata.collections[].addedRoles[].group.type.enum(collectionAudience)` to `client.pins.update()`.
-   Added `response.pin.attribution.relatedDocuments[].querySuggestion.ranges[].document.metadata.collections[].addedRoles[].group.type.enum(collectionAudience)` to `client.pins.retrieve()`.
-   Added `response.pins[].attribution.relatedDocuments[].querySuggestion.ranges[].document.metadata.collections[].addedRoles[].group.type.enum(collectionAudience)` to `client.pins.list()`.
-   Added `response.attribution.relatedDocuments[].querySuggestion.ranges[].document.metadata.collections[].addedRoles[].group.type.enum(collectionAudience)` to `client.pins.create()`.
-   Added `request.searchRequest.sourceDocument.metadata.author.relatedDocuments[].results[].structuredResults[].customEntity.roles[].group.type.enum(collectionAudience)` to `client.search.queryasadmin()`.
-   Added `response.results[].structuredResults[].document.metadata.collections[].addedRoles[].group.type.enum(collectionAudience)` to `client.search.queryasadmin()`.
-   Added `response.results[].document.metadata.author.relatedDocuments[].results[].structuredResults[].customEntity.roles[].group.type.enum(collectionAudience)` to `client.search.autocomplete()`.
-   Added `request.feedRequest.categories[].enum(cardStackPromo)` to `client.search.retrievefeed()`.
-   Added `request.recommendationsRequest.sourceDocument.metadata.author.relatedDocuments[].results[].structuredResults[].customEntity.roles[].group.type.enum(collectionAudience)` to `client.search.recommendations()`.
-   Added `response.results[].structuredResults[].document.metadata.collections[].addedRoles[].group.type.enum(collectionAudience)` to `client.search.recommendations()`.
-   Added `request.searchRequest.sourceDocument.metadata.author.relatedDocuments[].results[].structuredResults[].customEntity.roles[].group.type.enum(collectionAudience)` to `client.search.query()`.
-   Added `response.results[].structuredResults[].document.metadata.collections[].addedRoles[].group.type.enum(collectionAudience)` to `client.search.query()`.
-   Added `response.results[].relatedDocuments[].querySuggestion.ranges[].document.metadata.collections[].addedRoles[].group.type.enum(collectionAudience)` to `client.entities.list()`.
-   Added `response.results[].relatedDocuments[].querySuggestion.ranges[].document.metadata.collections[].addedRoles[].group.type.enum(collectionAudience)` to `client.entities.readpeople()`.
-   Added `request.createShortcutRequest.data.addedRoles[].group.type.enum(collectionAudience)` to `client.shortcuts.create()`.
-   Added `response.shortcut.addedRoles[].group.type.enum(collectionAudience)` to `client.shortcuts.create()`.
-   Added `response.shortcut.addedRoles[].group.type.enum(collectionAudience)` to `client.shortcuts.retrieve()`.
-   Added `response.shortcuts[].addedRoles[].group.type.enum(collectionAudience)` to `client.shortcuts.list()`.
-   Added `request.updateShortcutRequest.addedRoles[].group.type.enum(collectionAudience)` to `client.shortcuts.update()`.
-   Added `response.shortcut.addedRoles[].group.type.enum(collectionAudience)` to `client.shortcuts.update()`.
-   Added `response.metadata.lastVerifier.relatedDocuments[].querySuggestion.ranges[].document.metadata.collections[].addedRoles[].group.type.enum(collectionAudience)` to `client.verification.addreminder()`.
-   Added `response.documents[].metadata.lastVerifier.relatedDocuments[].querySuggestion.ranges[].document.metadata.collections[].addedRoles[].group.type.enum(collectionAudience)` to `client.verification.list()`.
-   Added `response.metadata.lastVerifier.relatedDocuments[].querySuggestion.ranges[].document.metadata.collections[].addedRoles[].group.type.enum(collectionAudience)` to `client.verification.verify()`.
-   Added `response.report.config.allowlistOptions.regexes` to `client.governance.data.policies.retrieve()`.
-   Added `request.updateDlpReportRequest.config.allowlistOptions.regexes` to `client.governance.data.policies.update()`.
-   Added `response.reports[].config.allowlistOptions.regexes` to `client.governance.data.policies.list()`.
-   Added `request.config.allowlistOptions.regexes` to `client.governance.data.policies.create()`.
-   Added `response.report.config.allowlistOptions.regexes` to `client.governance.data.policies.create()`.
-   Added `request.config.allowlistOptions.regexes` to `client.governance.data.reports.create()`.
-   Changed `response.results[]` on `client.search.retrievefeed()`.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-typescript/releases/tag/v0.16.0)

Api-client-python v0.14.0 includes 56 additions, 2 changes.

**Read more**

## Changes

-   Added `request.messages[].citations[].source_document.metadata.author.related_documents[].results[].structured_results[].custom_entity.roles[].group.type.enum(collection_audience)` to `client.chat.create()`.
-   Added `response.attribution.related_documents[].query_suggestion.ranges[].document.metadata.collections[].added_roles[].group.type.enum(collection_audience)` to `client.pins.update()`.
-   Added `request.body.structured_list[].document.metadata.author.related_documents[].results[].structured_results[].custom_entity.roles[].group.type.enum(collection_audience)` to `client.announcements.update()`.
-   Added `response.body.structured_list[].document.metadata.author.related_documents[].results[].structured_results[].custom_entity.roles[].group.type.enum(collection_audience)` to `client.announcements.update()`.
-   Added `request.data.added_roles[].group.type.enum(collection_audience)` to `client.answers.create()`.
-   Added `response.added_roles[].group.type.enum(collection_audience)` to `client.answers.create()`.
-   Added `request.added_roles[].group.type.enum(collection_audience)` to `client.answers.update()`.
-   Added `response.added_roles[].group.type.enum(collection_audience)` to `client.answers.update()`.
-   Added `response.answer_result.answer.added_roles[].group.type.enum(collection_audience)` to `client.answers.retrieve()`.
-   Added `response.answer_results[].answer.added_roles[].group.type.enum(collection_audience)` to `client.answers.list()`.
-   Added `request.body.structured_list[].document.metadata.author.related_documents[].results[].structured_results[].custom_entity.roles[].group.type.enum(collection_audience)` to `client.announcements.create()`.
-   Added `response.body.structured_list[].document.metadata.author.related_documents[].results[].structured_results[].custom_entity.roles[].group.type.enum(collection_audience)` to `client.announcements.create()`.
-   Added `response.chat_result.chat.created_by.related_documents[].query_suggestion.ranges[].document.metadata.collections[].added_roles[].group.type.enum(collection_audience)` to `client.chat.retrieve()`.
-   Added `response.chat_results[].chat.created_by.related_documents[].query_suggestion.ranges[].document.metadata.collections[].added_roles[].group.type.enum(collection_audience)` to `client.chat.list()`.
-   Added `request.messages[].citations[].source_document.metadata.author.related_documents[].results[].structured_results[].custom_entity.roles[].group.type.enum(collection_audience)` to `client.chat.create_stream()`.
-   Added `response.collection.added_roles[].group.type.enum(collection_audience)` to `client.collections.add_items()`.
-   Added `request.added_roles[].group.type.enum(collection_audience)` to `client.collections.create()`.
-   Added `response.union(class (0)).collection.added_roles[].group.type.enum(collection_audience)` to `client.collections.create()`.
-   Added `response.collection.added_roles[].group.type.enum(collection_audience)` to `client.collections.delete_item()`.
-   Added `request.added_roles[].group.type.enum(collection_audience)` to `client.collections.update()`.
-   Added `response.added_roles[].group.type.enum(collection_audience)` to `client.collections.update()`.
-   Added `response.collection.added_roles[].group.type.enum(collection_audience)` to `client.collections.update_item()`.
-   Added `response.collection.added_roles[].group.type.enum(collection_audience)` to `client.collections.retrieve()`.
-   Added `response.collections[].added_roles[].group.type.enum(collection_audience)` to `client.collections.list()`.
-   Added `response.documents.Map<DocumentOrError>.union(Document).metadata.author.related_documents[].results[].structured_results[].custom_entity.roles[].group.type.enum(collection_audience)` to `client.documents.retrieve()`.
-   Added `response.documents[].metadata.author.related_documents[].results[].structured_results[].custom_entity.roles[].group.type.enum(collection_audience)` to `client.documents.retrieve_by_facets()`.
-   Added `response.glean_assist.activity_insights[].user.related_documents[].query_suggestion.ranges[].document.metadata.collections[].added_roles[].group.type.enum(collection_audience)` to `client.insights.retrieve()`.
-   Added `response.pin.attribution.related_documents[].query_suggestion.ranges[].document.metadata.collections[].added_roles[].group.type.enum(collection_audience)` to `client.pins.retrieve()`.
-   Added `response.search_response.results[].structured_results[].document.metadata.collections[].added_roles[].group.type.enum(collection_audience)` to `client.messages.retrieve()`.
-   Added `response.pins[].attribution.related_documents[].query_suggestion.ranges[].document.metadata.collections[].added_roles[].group.type.enum(collection_audience)` to `client.pins.list()`.
-   Added `response.attribution.related_documents[].query_suggestion.ranges[].document.metadata.collections[].added_roles[].group.type.enum(collection_audience)` to `client.pins.create()`.
-   Added `request.source_document.metadata.author.related_documents[].results[].structured_results[].custom_entity.roles[].group.type.enum(collection_audience)` to `client.search.query_as_admin()`.
-   Added `response.results[].structured_results[].document.metadata.collections[].added_roles[].group.type.enum(collection_audience)` to `client.search.query_as_admin()`.
-   Added `response.results[].document.metadata.author.related_documents[].results[].structured_results[].custom_entity.roles[].group.type.enum(collection_audience)` to `client.search.autocomplete()`.
-   Added `request.categories[].enum(card_stack_promo)` to `client.search.retrieve_feed()`.
-   Added `request.source_document.metadata.author.related_documents[].results[].structured_results[].custom_entity.roles[].group.type.enum(collection_audience)` to `client.search.recommendations()`.
-   Added `response.results[].structured_results[].document.metadata.collections[].added_roles[].group.type.enum(collection_audience)` to `client.search.recommendations()`.
-   Added `request.source_document.metadata.author.related_documents[].results[].structured_results[].custom_entity.roles[].group.type.enum(collection_audience)` to `client.search.query()`.
-   Added `response.results[].structured_results[].document.metadata.collections[].added_roles[].group.type.enum(collection_audience)` to `client.search.query()`.
-   Added `response.results[].related_documents[].query_suggestion.ranges[].document.metadata.collections[].added_roles[].group.type.enum(collection_audience)` to `client.entities.list()`.
-   Added `response.results[].related_documents[].query_suggestion.ranges[].document.metadata.collections[].added_roles[].group.type.enum(collection_audience)` to `client.entities.read_people()`.
-   Added `request.data.added_roles[].group.type.enum(collection_audience)` to `client.shortcuts.create()`.
-   Added `response.shortcut.added_roles[].group.type.enum(collection_audience)` to `client.shortcuts.create()`.
-   Added `response.shortcut.added_roles[].group.type.enum(collection_audience)` to `client.shortcuts.retrieve()`.
-   Added `response.shortcuts[].added_roles[].group.type.enum(collection_audience)` to `client.shortcuts.list()`.
-   Added `request.added_roles[].group.type.enum(collection_audience)` to `client.shortcuts.update()`.
-   Added `response.shortcut.added_roles[].group.type.enum(collection_audience)` to `client.shortcuts.update()`.
-   Added `response.metadata.last_verifier.related_documents[].query_suggestion.ranges[].document.metadata.collections[].added_roles[].group.type.enum(collection_audience)` to `client.verification.add_reminder()`.
-   Added `response.documents[].metadata.last_verifier.related_documents[].query_suggestion.ranges[].document.metadata.collections[].added_roles[].group.type.enum(collection_audience)` to `client.verification.list()`.
-   Added `response.metadata.last_verifier.related_documents[].query_suggestion.ranges[].document.metadata.collections[].added_roles[].group.type.enum(collection_audience)` to `client.verification.verify()`.
-   Added `response.report.config.allowlist_options.regexes` to `client.governance.data.policies.retrieve()`.
-   Added `request.config.allowlist_options.regexes` to `client.governance.data.policies.update()`.
-   Added `response.reports[].config.allowlist_options.regexes` to `client.governance.data.policies.list()`.
-   Added `request.config.allowlist_options.regexes` to `client.governance.data.policies.create()`.
-   Added `response.report.config.allowlist_options.regexes` to `client.governance.data.policies.create()`.
-   Added `request.config.allowlist_options.regexes` to `client.governance.data.reports.create()`.
-   Changed `response` on `client.chat.create()`.
-   Changed `response.results[]` on `client.search.retrieve_feed()`.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-python/releases/tag/v0.14.0)

Api-client-java v0.13.2 includes 57 additions, 1 change.

**Read more**

## Changes

-   Added `request.createAnnouncementRequest.body.structuredList[].document.metadata.author.relatedDocuments[].results[].structuredResults[].customEntity.roles[].group.type.enum(collectionAudience)` to `client.announcements.create()`.
-   Added `response.body.structuredList[].document.metadata.author.relatedDocuments[].results[].structuredResults[].customEntity.roles[].group.type.enum(collectionAudience)` to `client.announcements.create()`.
-   Added `request.updateAnnouncementRequest.body.structuredList[].document.metadata.author.relatedDocuments[].results[].structuredResults[].customEntity.roles[].group.type.enum(collectionAudience)` to `client.announcements.update()`.
-   Added `response.body.structuredList[].document.metadata.author.relatedDocuments[].results[].structuredResults[].customEntity.roles[].group.type.enum(collectionAudience)` to `client.announcements.update()`.
-   Added `request.createAnswerRequest.data.addedRoles[].group.type.enum(collectionAudience)` to `client.answers.create()`.
-   Added `response.addedRoles[].group.type.enum(collectionAudience)` to `client.answers.create()`.
-   Added `request.editAnswerRequest.addedRoles[].group.type.enum(collectionAudience)` to `client.answers.update()`.
-   Added `response.addedRoles[].group.type.enum(collectionAudience)` to `client.answers.update()`.
-   Added `response.answerResult.answer.addedRoles[].group.type.enum(collectionAudience)` to `client.answers.retrieve()`.
-   Added `response.answerResults[].answer.addedRoles[].group.type.enum(collectionAudience)` to `client.answers.list()`.
-   Added `request.chatRequest.messages[].citations[].sourceDocument.metadata.author.relatedDocuments[].results[].structuredResults[].customEntity.roles[].group.type.enum(collectionAudience)` to `client.chat.create()`.
-   Added `response.messages[].citations[].sourceDocument.metadata.author.relatedDocuments[].results[].structuredResults[].customEntity.roles[].group.type.enum(collectionAudience)` to `client.chat.create()`.
-   Added `response.chatResult.chat.createdBy.relatedDocuments[].querySuggestion.ranges[].document.metadata.collections[].addedRoles[].group.type.enum(collectionAudience)` to `client.chat.retrieve()`.
-   Added `response.chatResults[].chat.createdBy.relatedDocuments[].querySuggestion.ranges[].document.metadata.collections[].addedRoles[].group.type.enum(collectionAudience)` to `client.chat.list()`.
-   Added `request.chatRequest.messages[].citations[].sourceDocument.metadata.author.relatedDocuments[].results[].structuredResults[].customEntity.roles[].group.type.enum(collectionAudience)` to `client.chat.createstream()`.
-   Added `response.collection.addedRoles[].group.type.enum(collectionAudience)` to `client.collections.additems()`.
-   Added `request.createCollectionRequest.addedRoles[].group.type.enum(collectionAudience)` to `client.collections.create()`.
-   Added `response.union(class (0)).collection.addedRoles[].group.type.enum(collectionAudience)` to `client.collections.create()`.
-   Added `response.collection.addedRoles[].group.type.enum(collectionAudience)` to `client.collections.deleteitem()`.
-   Added `request.editCollectionRequest.addedRoles[].group.type.enum(collectionAudience)` to `client.collections.update()`.
-   Added `response.addedRoles[].group.type.enum(collectionAudience)` to `client.collections.update()`.
-   Added `response.collection.addedRoles[].group.type.enum(collectionAudience)` to `client.collections.updateitem()`.
-   Added `response.collection.addedRoles[].group.type.enum(collectionAudience)` to `client.collections.retrieve()`.
-   Added `response.collections[].addedRoles[].group.type.enum(collectionAudience)` to `client.collections.list()`.
-   Added `response.documents.Map<DocumentOrError>.union(Document).metadata.author.relatedDocuments[].results[].structuredResults[].customEntity.roles[].group.type.enum(collectionAudience)` to `client.documents.retrieve()`.
-   Added `response.documents[].metadata.author.relatedDocuments[].results[].structuredResults[].customEntity.roles[].group.type.enum(collectionAudience)` to `client.documents.retrievebyfacets()`.
-   Added `response.gleanAssist.activityInsights[].user.relatedDocuments[].querySuggestion.ranges[].document.metadata.collections[].addedRoles[].group.type.enum(collectionAudience)` to `client.insights.retrieve()`.
-   Added `response.searchResponse.results[].structuredResults[].document.metadata.collections[].addedRoles[].group.type.enum(collectionAudience)` to `client.messages.retrieve()`.
-   Added `response.attribution.relatedDocuments[].querySuggestion.ranges[].document.metadata.collections[].addedRoles[].group.type.enum(collectionAudience)` to `client.pins.update()`.
-   Added `response.pin.attribution.relatedDocuments[].querySuggestion.ranges[].document.metadata.collections[].addedRoles[].group.type.enum(collectionAudience)` to `client.pins.retrieve()`.
-   Added `response.pins[].attribution.relatedDocuments[].querySuggestion.ranges[].document.metadata.collections[].addedRoles[].group.type.enum(collectionAudience)` to `client.pins.list()`.
-   Added `response.attribution.relatedDocuments[].querySuggestion.ranges[].document.metadata.collections[].addedRoles[].group.type.enum(collectionAudience)` to `client.pins.create()`.
-   Added `request.searchRequest.sourceDocument.metadata.author.relatedDocuments[].results[].structuredResults[].customEntity.roles[].group.type.enum(collectionAudience)` to `client.search.queryasadmin()`.
-   Added `response.results[].structuredResults[].document.metadata.collections[].addedRoles[].group.type.enum(collectionAudience)` to `client.search.queryasadmin()`.
-   Added `response.results[].document.metadata.author.relatedDocuments[].results[].structuredResults[].customEntity.roles[].group.type.enum(collectionAudience)` to `client.search.autocomplete()`.
-   Added `request.feedRequest.categories[].enum(cardStackPromo)` to `client.search.retrievefeed()`.
-   Added `request.recommendationsRequest.sourceDocument.metadata.author.relatedDocuments[].results[].structuredResults[].customEntity.roles[].group.type.enum(collectionAudience)` to `client.search.recommendations()`.
-   Added `response.results[].structuredResults[].document.metadata.collections[].addedRoles[].group.type.enum(collectionAudience)` to `client.search.recommendations()`.
-   Added `request.searchRequest.sourceDocument.metadata.author.relatedDocuments[].results[].structuredResults[].customEntity.roles[].group.type.enum(collectionAudience)` to `client.search.query()`.
-   Added `response.results[].structuredResults[].document.metadata.collections[].addedRoles[].group.type.enum(collectionAudience)` to `client.search.query()`.
-   Added `response.results[].relatedDocuments[].querySuggestion.ranges[].document.metadata.collections[].addedRoles[].group.type.enum(collectionAudience)` to `client.entities.list()`.
-   Added `response.results[].relatedDocuments[].querySuggestion.ranges[].document.metadata.collections[].addedRoles[].group.type.enum(collectionAudience)` to `client.entities.readpeople()`.
-   Added `request.createShortcutRequest.data.addedRoles[].group.type.enum(collectionAudience)` to `client.shortcuts.create()`.
-   Added `response.shortcut.addedRoles[].group.type.enum(collectionAudience)` to `client.shortcuts.create()`.
-   Added `response.shortcut.addedRoles[].group.type.enum(collectionAudience)` to `client.shortcuts.retrieve()`.
-   Added `response.shortcuts[].addedRoles[].group.type.enum(collectionAudience)` to `client.shortcuts.list()`.
-   Added `request.updateShortcutRequest.addedRoles[].group.type.enum(collectionAudience)` to `client.shortcuts.update()`.
-   Added `response.shortcut.addedRoles[].group.type.enum(collectionAudience)` to `client.shortcuts.update()`.
-   Added `response.metadata.lastVerifier.relatedDocuments[].querySuggestion.ranges[].document.metadata.collections[].addedRoles[].group.type.enum(collectionAudience)` to `client.verification.addreminder()`.
-   Added `response.documents[].metadata.lastVerifier.relatedDocuments[].querySuggestion.ranges[].document.metadata.collections[].addedRoles[].group.type.enum(collectionAudience)` to `client.verification.list()`.
-   Added `response.metadata.lastVerifier.relatedDocuments[].querySuggestion.ranges[].document.metadata.collections[].addedRoles[].group.type.enum(collectionAudience)` to `client.verification.verify()`.
-   Added `response.report.config.allowlistOptions.regexes` to `client.governance.data.policies.retrieve()`.
-   Added `request.updateDlpReportRequest.config.allowlistOptions.regexes` to `client.governance.data.policies.update()`.
-   Added `response.reports[].config.allowlistOptions.regexes` to `client.governance.data.policies.list()`.
-   Added `request.config.allowlistOptions.regexes` to `client.governance.data.policies.create()`.
-   Added `response.report.config.allowlistOptions.regexes` to `client.governance.data.policies.create()`.
-   Added `request.config.allowlistOptions.regexes` to `client.governance.data.reports.create()`.
-   Changed `response.results[]` on `client.search.retrievefeed()`.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-java/releases/tag/v0.13.2)

Api-client-go v0.12.1 includes 57 additions, 1 change.

**Read more**

## Changes

-   Added `request.CreateAnnouncementRequest.Body.StructuredList[].Document.Metadata.Author.RelatedDocuments[].Results[].StructuredResults[].CustomEntity.Roles[].Group.Type.Enum(collectionAudience)` to `client.announcements.create()`.
-   Added `response.Body.StructuredList[].Document.Metadata.Author.RelatedDocuments[].Results[].StructuredResults[].CustomEntity.Roles[].Group.Type.Enum(collectionAudience)` to `client.announcements.create()`.
-   Added `request.UpdateAnnouncementRequest.Body.StructuredList[].Document.Metadata.Author.RelatedDocuments[].Results[].StructuredResults[].CustomEntity.Roles[].Group.Type.Enum(collectionAudience)` to `client.announcements.update()`.
-   Added `response.Body.StructuredList[].Document.Metadata.Author.RelatedDocuments[].Results[].StructuredResults[].CustomEntity.Roles[].Group.Type.Enum(collectionAudience)` to `client.announcements.update()`.
-   Added `request.CreateAnswerRequest.Data.AddedRoles[].Group.Type.Enum(collectionAudience)` to `client.answers.create()`.
-   Added `response.AddedRoles[].Group.Type.Enum(collectionAudience)` to `client.answers.create()`.
-   Added `request.EditAnswerRequest.AddedRoles[].Group.Type.Enum(collectionAudience)` to `client.answers.update()`.
-   Added `response.AddedRoles[].Group.Type.Enum(collectionAudience)` to `client.answers.update()`.
-   Added `response.AnswerResult.Answer.AddedRoles[].Group.Type.Enum(collectionAudience)` to `client.answers.retrieve()`.
-   Added `response.AnswerResults[].Answer.AddedRoles[].Group.Type.Enum(collectionAudience)` to `client.answers.list()`.
-   Added `request.ChatRequest.Messages[].Citations[].SourceDocument.Metadata.Author.RelatedDocuments[].Results[].StructuredResults[].CustomEntity.Roles[].Group.Type.Enum(collectionAudience)` to `client.chat.create()`.
-   Added `response.Messages[].Citations[].SourceDocument.Metadata.Author.RelatedDocuments[].Results[].StructuredResults[].CustomEntity.Roles[].Group.Type.Enum(collectionAudience)` to `client.chat.create()`.
-   Added `response.ChatResult.Chat.CreatedBy.RelatedDocuments[].QuerySuggestion.Ranges[].Document.Metadata.Collections[].AddedRoles[].Group.Type.Enum(collectionAudience)` to `client.chat.retrieve()`.
-   Added `response.ChatResults[].Chat.CreatedBy.RelatedDocuments[].QuerySuggestion.Ranges[].Document.Metadata.Collections[].AddedRoles[].Group.Type.Enum(collectionAudience)` to `client.chat.list()`.
-   Added `request.ChatRequest.Messages[].Citations[].SourceDocument.Metadata.Author.RelatedDocuments[].Results[].StructuredResults[].CustomEntity.Roles[].Group.Type.Enum(collectionAudience)` to `client.chat.createstream()`.
-   Added `response.Collection.AddedRoles[].Group.Type.Enum(collectionAudience)` to `client.collections.additems()`.
-   Added `request.CreateCollectionRequest.AddedRoles[].Group.Type.Enum(collectionAudience)` to `client.collections.create()`.
-   Added `response.union(class (0)).Collection.AddedRoles[].Group.Type.Enum(collectionAudience)` to `client.collections.create()`.
-   Added `response.Collection.AddedRoles[].Group.Type.Enum(collectionAudience)` to `client.collections.deleteitem()`.
-   Added `request.EditCollectionRequest.AddedRoles[].Group.Type.Enum(collectionAudience)` to `client.collections.update()`.
-   Added `response.AddedRoles[].Group.Type.Enum(collectionAudience)` to `client.collections.update()`.
-   Added `response.Collection.AddedRoles[].Group.Type.Enum(collectionAudience)` to `client.collections.updateitem()`.
-   Added `response.Collection.AddedRoles[].Group.Type.Enum(collectionAudience)` to `client.collections.retrieve()`.
-   Added `response.Collections[].AddedRoles[].Group.Type.Enum(collectionAudience)` to `client.collections.list()`.
-   Added `response.Documents.Map<DocumentOrError>.union(Document).Metadata.Author.RelatedDocuments[].Results[].StructuredResults[].CustomEntity.Roles[].Group.Type.Enum(collectionAudience)` to `client.documents.retrieve()`.
-   Added `response.Documents[].Metadata.Author.RelatedDocuments[].Results[].StructuredResults[].CustomEntity.Roles[].Group.Type.Enum(collectionAudience)` to `client.documents.retrievebyfacets()`.
-   Added `response.GleanAssist.ActivityInsights[].User.RelatedDocuments[].QuerySuggestion.Ranges[].Document.Metadata.Collections[].AddedRoles[].Group.Type.Enum(collectionAudience)` to `client.insights.retrieve()`.
-   Added `response.SearchResponse.Results[].StructuredResults[].Document.Metadata.Collections[].AddedRoles[].Group.Type.Enum(collectionAudience)` to `client.messages.retrieve()`.
-   Added `response.Attribution.RelatedDocuments[].QuerySuggestion.Ranges[].Document.Metadata.Collections[].AddedRoles[].Group.Type.Enum(collectionAudience)` to `client.pins.update()`.
-   Added `response.Pin.Attribution.RelatedDocuments[].QuerySuggestion.Ranges[].Document.Metadata.Collections[].AddedRoles[].Group.Type.Enum(collectionAudience)` to `client.pins.retrieve()`.
-   Added `response.Pins[].Attribution.RelatedDocuments[].QuerySuggestion.Ranges[].Document.Metadata.Collections[].AddedRoles[].Group.Type.Enum(collectionAudience)` to `client.pins.list()`.
-   Added `response.Attribution.RelatedDocuments[].QuerySuggestion.Ranges[].Document.Metadata.Collections[].AddedRoles[].Group.Type.Enum(collectionAudience)` to `client.pins.create()`.
-   Added `request.SearchRequest.SourceDocument.Metadata.Author.RelatedDocuments[].Results[].StructuredResults[].CustomEntity.Roles[].Group.Type.Enum(collectionAudience)` to `client.search.queryasadmin()`.
-   Added `response.Results[].StructuredResults[].Document.Metadata.Collections[].AddedRoles[].Group.Type.Enum(collectionAudience)` to `client.search.queryasadmin()`.
-   Added `response.Results[].Document.Metadata.Author.RelatedDocuments[].Results[].StructuredResults[].CustomEntity.Roles[].Group.Type.Enum(collectionAudience)` to `client.search.autocomplete()`.
-   Added `request.FeedRequest.Categories[].Enum(cardStackPromo)` to `client.search.retrievefeed()`.
-   Added `request.RecommendationsRequest.SourceDocument.Metadata.Author.RelatedDocuments[].Results[].StructuredResults[].CustomEntity.Roles[].Group.Type.Enum(collectionAudience)` to `client.search.recommendations()`.
-   Added `response.Results[].StructuredResults[].Document.Metadata.Collections[].AddedRoles[].Group.Type.Enum(collectionAudience)` to `client.search.recommendations()`.
-   Added `request.SearchRequest.SourceDocument.Metadata.Author.RelatedDocuments[].Results[].StructuredResults[].CustomEntity.Roles[].Group.Type.Enum(collectionAudience)` to `client.search.query()`.
-   Added `response.Results[].StructuredResults[].Document.Metadata.Collections[].AddedRoles[].Group.Type.Enum(collectionAudience)` to `client.search.query()`.
-   Added `response.Results[].RelatedDocuments[].QuerySuggestion.Ranges[].Document.Metadata.Collections[].AddedRoles[].Group.Type.Enum(collectionAudience)` to `client.entities.list()`.
-   Added `response.Results[].RelatedDocuments[].QuerySuggestion.Ranges[].Document.Metadata.Collections[].AddedRoles[].Group.Type.Enum(collectionAudience)` to `client.entities.readpeople()`.
-   Added `request.CreateShortcutRequest.Data.AddedRoles[].Group.Type.Enum(collectionAudience)` to `client.shortcuts.create()`.
-   Added `response.Shortcut.AddedRoles[].Group.Type.Enum(collectionAudience)` to `client.shortcuts.create()`.
-   Added `response.Shortcut.AddedRoles[].Group.Type.Enum(collectionAudience)` to `client.shortcuts.retrieve()`.
-   Added `response.Shortcuts[].AddedRoles[].Group.Type.Enum(collectionAudience)` to `client.shortcuts.list()`.
-   Added `request.UpdateShortcutRequest.AddedRoles[].Group.Type.Enum(collectionAudience)` to `client.shortcuts.update()`.
-   Added `response.Shortcut.AddedRoles[].Group.Type.Enum(collectionAudience)` to `client.shortcuts.update()`.
-   Added `response.Metadata.LastVerifier.RelatedDocuments[].QuerySuggestion.Ranges[].Document.Metadata.Collections[].AddedRoles[].Group.Type.Enum(collectionAudience)` to `client.verification.addreminder()`.
-   Added `response.Documents[].Metadata.LastVerifier.RelatedDocuments[].QuerySuggestion.Ranges[].Document.Metadata.Collections[].AddedRoles[].Group.Type.Enum(collectionAudience)` to `client.verification.list()`.
-   Added `response.Metadata.LastVerifier.RelatedDocuments[].QuerySuggestion.Ranges[].Document.Metadata.Collections[].AddedRoles[].Group.Type.Enum(collectionAudience)` to `client.verification.verify()`.
-   Added `response.Report.Config.AllowlistOptions.Regexes` to `client.governance.data.policies.retrieve()`.
-   Added `request.UpdateDlpReportRequest.Config.AllowlistOptions.Regexes` to `client.governance.data.policies.update()`.
-   Added `response.Reports[].Config.AllowlistOptions.Regexes` to `client.governance.data.policies.list()`.
-   Added `request.Request.Config.AllowlistOptions.Regexes` to `client.governance.data.policies.create()`.
-   Added `response.Report.Config.AllowlistOptions.Regexes` to `client.governance.data.policies.create()`.
-   Added `request.Request.Config.AllowlistOptions.Regexes` to `client.governance.data.reports.create()`.
-   Changed `response.Results[]` on `client.search.retrievefeed()`.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-go/releases/tag/v0.12.1)

June 9

2026

1 endpoint added.

**Read more**

## Changes

-   Added endpoint: /agents

## Source

-   [open-api 04d057a](https://github.com/gleanwork/open-api/commit/04d057a1ee884ee7cd054bc62ae2048c76d90b02)
-   [open-api 289f5ff](https://github.com/gleanwork/open-api/commit/289f5ffa635cf440780bf159fdd194f4421a4888)
-   [open-api 4d68227](https://github.com/gleanwork/open-api/commit/4d68227a532a587e419c4f5aa32ec3b0779f071a)
-   [open-api 89b5b21](https://github.com/gleanwork/open-api/commit/89b5b2118a970f00492d39b262f0e87ecc7a14a1)
-   [open-api 96940dd](https://github.com/gleanwork/open-api/commit/96940dd45ce8c10d244f30c1230264ffe3717ad9)
-   [open-api adae527](https://github.com/gleanwork/open-api/commit/adae527852da72eaabde4953bea307550c8be02f)

June 7

2026

Mcp-config v5.2.0: `mcp-config-schema`: add client type classification (CLIENT\_TYPES, TYPE\_LABELS).

**Read more**

## Changes

-   `mcp-config-schema`: add client type classification (CLIENT\_TYPES, TYPE\_LABELS).

## Source

-   [Release notes](https://github.com/gleanwork/mcp-config/releases/tag/v5.2.0)
-   [PR #120](https://github.com/gleanwork/mcp-config/pull/120)

June 6

2026

Mcp-config v5.1.0: `mcp-config-glean`, `mcp-config-schema`: add Linear as MCP client configuration.

**Read more**

## Changes

-   `mcp-config-glean`, `mcp-config-schema`: add Linear as MCP client configuration.
-   `mcp-config-schema`: add per-client host icons.
-   `mcp-config-schema`: add Antigravity CLI MCP client configuration.
-   Other.
-   Realign @eslint/js to v9 (restore npm install/publish).
-   `mcp-config-schema`: generate client constants from configs (single source of truth).

## Source

-   [Release notes](https://github.com/gleanwork/mcp-config/releases/tag/v5.1.0)
-   [PR #106](https://github.com/gleanwork/mcp-config/pull/106)
-   [PR #112](https://github.com/gleanwork/mcp-config/pull/112)
-   [PR #110](https://github.com/gleanwork/mcp-config/pull/110)
-   [PR #118](https://github.com/gleanwork/mcp-config/pull/118)
-   [PR #111](https://github.com/gleanwork/mcp-config/pull/111)

June 5

2026

Api-client-typescript v0.15.0 includes 3 additions, 54 changes.

**Read more**

## Changes

-   Added `errorCode.enum(corruptItem)` to `client.collections.create()`.
-   Added `errorCode.enum(corruptItem)` to `client.collections.delete()`.
-   Added `errorCode.enum(corruptItem)` to `client.collections.update()`.
-   Changed `request.chatRequest.messages[].citations[].sourceDocument.metadata.author.relatedDocuments[].results[].structuredResults[].answer` on `client.chat.create()`.
-   Changed `response` on `client.chat.create()`.
-   Changed `response` on `client.collections.additems()`.
-   Changed `request.feedback1.category` on `client.activity.feedback()`.
-   Changed `request.createAnnouncementRequest.body.structuredList[].document.metadata.author.relatedDocuments[].results[].structuredResults[].answer` on `client.announcements.create()`.
-   Changed `response` on `client.announcements.create()`.
-   Changed `request.updateAnnouncementRequest.body.structuredList[].document.metadata.author.relatedDocuments[].results[].structuredResults[].answer` on `client.announcements.update()`.
-   Changed `response` on `client.announcements.update()`.
-   Changed `request.createAnswerRequest.data.addedRoles[].person.relatedDocuments[]` on `client.answers.create()`.
-   Changed `response` on `client.answers.create()`.
-   Changed `request.editAnswerRequest.addedRoles[].person.relatedDocuments[]` on `client.answers.update()`.
-   Changed `response` on `client.answers.update()`.
-   Changed `response.answerResult.answer` on `client.answers.retrieve()`.
-   Changed `response.answerResults[].answer` on `client.answers.list()`.
-   Changed `response.chatResult.chat.createdBy.relatedDocuments[]` on `client.chat.retrieve()`.
-   Changed `response.chatResults[].chat.createdBy.relatedDocuments[]` on `client.chat.list()`.
-   Changed `request.chatRequest.messages[].citations[].sourceDocument.metadata.author.relatedDocuments[].results[].structuredResults[].answer` on `client.chat.createstream()`.
-   Changed `request.createCollectionRequest.addedRoles[].person.relatedDocuments[]` on `client.collections.create()`.
-   Changed `response.union(class (0))` on `client.collections.create()`.
-   Changed `response.collection` on `client.collections.deleteitem()`.
-   Changed `request.editCollectionRequest.addedRoles[].person.relatedDocuments[]` on `client.collections.update()`.
-   Changed `response` on `client.collections.update()`.
-   Changed `response.collection` on `client.collections.updateitem()`.
-   Changed `response` on `client.collections.retrieve()`.
-   Changed `response.collections[]` on `client.collections.list()`.
-   Changed `response.documents.Map<DocumentOrError>.union(Document).metadata.author.relatedDocuments[].results[].structuredResults[].answer` on `client.documents.retrieve()`.
-   Changed `response.documents[].metadata.author.relatedDocuments[].results[].structuredResults[].answer` on `client.documents.retrievebyfacets()`.
-   Changed `request.insightsRequest` on `client.insights.retrieve()`.
-   Changed `response` on `client.insights.retrieve()`.
-   Changed `response.searchResponse.results[].structuredResults[]` on `client.messages.retrieve()`.
-   Changed `response.attribution.relatedDocuments[]` on `client.pins.update()`.
-   Changed `response.pin.attribution.relatedDocuments[]` on `client.pins.retrieve()`.
-   Changed `response.pins[].attribution.relatedDocuments[]` on `client.pins.list()`.
-   Changed `response.attribution.relatedDocuments[]` on `client.pins.create()`.
-   Changed `request.searchRequest.sourceDocument.metadata.author.relatedDocuments[].results[].structuredResults[].answer` on `client.search.queryasadmin()`.
-   Changed `response.results[].structuredResults[]` on `client.search.queryasadmin()`.
-   Changed `response.results[].document.metadata.author.relatedDocuments[].results[].structuredResults[].answer` on `client.search.autocomplete()`.
-   Changed `request.feedRequest.categories[]` on `client.search.retrievefeed()`.
-   Changed `response.results[]` on `client.search.retrievefeed()`.
-   Changed `request.recommendationsRequest.sourceDocument.metadata.author.relatedDocuments[].results[].structuredResults[].answer` on `client.search.recommendations()`.
-   Changed `response.results[].structuredResults[]` on `client.search.recommendations()`.
-   Changed `request.searchRequest.sourceDocument.metadata.author.relatedDocuments[].results[].structuredResults[].answer` on `client.search.query()`.
-   Changed `response.results[].structuredResults[]` on `client.search.query()`.
-   Changed `response.results[].relatedDocuments[]` on `client.entities.list()`.
-   Changed `response.results[].relatedDocuments[]` on `client.entities.readpeople()`.
-   Changed `request.createShortcutRequest.data.addedRoles[].person.relatedDocuments[]` on `client.shortcuts.create()`.
-   Changed `response.shortcut.addedRoles[].person.relatedDocuments[]` on `client.shortcuts.create()`.
-   Changed `response.shortcut.addedRoles[].person.relatedDocuments[]` on `client.shortcuts.retrieve()`.
-   Changed `response.shortcuts[].addedRoles[].person.relatedDocuments[]` on `client.shortcuts.list()`.
-   Changed `request.updateShortcutRequest.addedRoles[].person.relatedDocuments[]` on `client.shortcuts.update()`.
-   Changed `response.shortcut.addedRoles[].person.relatedDocuments[]` on `client.shortcuts.update()`.
-   Changed `response.metadata.lastVerifier.relatedDocuments[]` on `client.verification.addreminder()`.
-   Changed `response.documents[].metadata.lastVerifier.relatedDocuments[]` on `client.verification.list()`.
-   Changed `response.metadata.lastVerifier.relatedDocuments[]` on `client.verification.verify()`.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-typescript/releases/tag/v0.15.0)

Api-client-python v0.13.0 includes 3 additions, 54 changes.

**Read more**

## Changes

-   Added `error_code.enum(corrupt_item)` to `client.collections.create()`.
-   Added `error_code.enum(corrupt_item)` to `client.collections.delete()`.
-   Added `error_code.enum(corrupt_item)` to `client.collections.update()`.
-   Changed `response` on `client.collections.add_items()`.
-   Changed `request.feedback1.category` on `client.activity.feedback()`.
-   Changed `request.body.structured_list[].document.metadata.author.related_documents[].results[].structured_results[].answer` on `client.announcements.create()`.
-   Changed `response` on `client.announcements.create()`.
-   Changed `request.body.structured_list[].document.metadata.author.related_documents[].results[].structured_results[].answer` on `client.announcements.update()`.
-   Changed `response` on `client.announcements.update()`.
-   Changed `request.data.added_roles[].person.related_documents[]` on `client.answers.create()`.
-   Changed `response` on `client.answers.create()`.
-   Changed `request.added_roles[].person.related_documents[]` on `client.answers.update()`.
-   Changed `response` on `client.answers.update()`.
-   Changed `response.answer_result.answer` on `client.answers.retrieve()`.
-   Changed `response.answer_results[].answer` on `client.answers.list()`.
-   Changed `request.messages[].citations[].source_document.metadata.author.related_documents[].results[].structured_results[].answer` on `client.chat.create()`.
-   Changed `response.messages[].citations[].source_document.metadata.author.related_documents[].results[].structured_results[].answer` on `client.chat.create()`.
-   Changed `response.chat_result.chat.created_by.related_documents[]` on `client.chat.retrieve()`.
-   Changed `response.chat_results[].chat.created_by.related_documents[]` on `client.chat.list()`.
-   Changed `request.messages[].citations[].source_document.metadata.author.related_documents[].results[].structured_results[].answer` on `client.chat.create_stream()`.
-   Changed `request.added_roles[].person.related_documents[]` on `client.collections.create()`.
-   Changed `response.union(class (0))` on `client.collections.create()`.
-   Changed `response.collection` on `client.collections.delete_item()`.
-   Changed `request.added_roles[].person.related_documents[]` on `client.collections.update()`.
-   Changed `response` on `client.collections.update()`.
-   Changed `response.collection` on `client.collections.update_item()`.
-   Changed `response` on `client.collections.retrieve()`.
-   Changed `response.collections[]` on `client.collections.list()`.
-   Changed `response.documents.Map<DocumentOrError>.union(Document).metadata.author.related_documents[].results[].structured_results[].answer` on `client.documents.retrieve()`.
-   Changed `response.documents[].metadata.author.related_documents[].results[].structured_results[].answer` on `client.documents.retrieve_by_facets()`.
-   Changed `request` on `client.insights.retrieve()`.
-   Changed `response` on `client.insights.retrieve()`.
-   Changed `response.search_response.results[].structured_results[]` on `client.messages.retrieve()`.
-   Changed `response.attribution.related_documents[]` on `client.pins.update()`.
-   Changed `response.pin.attribution.related_documents[]` on `client.pins.retrieve()`.
-   Changed `response.pins[].attribution.related_documents[]` on `client.pins.list()`.
-   Changed `response.attribution.related_documents[]` on `client.pins.create()`.
-   Changed `request.source_document.metadata.author.related_documents[].results[].structured_results[].answer` on `client.search.query_as_admin()`.
-   Changed `response.results[].structured_results[]` on `client.search.query_as_admin()`.
-   Changed `response.results[].document.metadata.author.related_documents[].results[].structured_results[].answer` on `client.search.autocomplete()`.
-   Changed `request.categories[]` on `client.search.retrieve_feed()`.
-   Changed `response.results[]` on `client.search.retrieve_feed()`.
-   Changed `request.source_document.metadata.author.related_documents[].results[].structured_results[].answer` on `client.search.recommendations()`.
-   Changed `response.results[].structured_results[]` on `client.search.recommendations()`.
-   Changed `request.source_document.metadata.author.related_documents[].results[].structured_results[].answer` on `client.search.query()`.
-   Changed `response.results[].structured_results[]` on `client.search.query()`.
-   Changed `response.results[].related_documents[]` on `client.entities.list()`.
-   Changed `response.results[].related_documents[]` on `client.entities.read_people()`.
-   Changed `request.data.added_roles[].person.related_documents[]` on `client.shortcuts.create()`.
-   Changed `response.shortcut.added_roles[].person.related_documents[]` on `client.shortcuts.create()`.
-   Changed `response.shortcut.added_roles[].person.related_documents[]` on `client.shortcuts.retrieve()`.
-   Changed `response.shortcuts[].added_roles[].person.related_documents[]` on `client.shortcuts.list()`.
-   Changed `request.added_roles[].person.related_documents[]` on `client.shortcuts.update()`.
-   Changed `response.shortcut.added_roles[].person.related_documents[]` on `client.shortcuts.update()`.
-   Changed `response.metadata.last_verifier.related_documents[]` on `client.verification.add_reminder()`.
-   Changed `response.documents[].metadata.last_verifier.related_documents[]` on `client.verification.list()`.
-   Changed `response.metadata.last_verifier.related_documents[]` on `client.verification.verify()`.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-python/releases/tag/v0.13.0)

Api-client-java v0.13.1 includes 1 addition.

**Read more**

## Changes

-   Added `response.status[202]` to `client.chat.create()`.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-java/releases/tag/v0.13.1)

Api-client-java v0.13.0 includes 3 additions, 54 changes.

**Read more**

## Changes

-   Added `errorCode.enum(corruptItem)` to `client.collections.create()`.
-   Added `errorCode.enum(corruptItem)` to `client.collections.delete()`.
-   Added `errorCode.enum(corruptItem)` to `client.collections.update()`.
-   Changed `response` on `client.collections.additems()`.
-   Changed `request.feedback1.category` on `client.activity.feedback()`.
-   Changed `request.createAnnouncementRequest.body.structuredList[].document.metadata.author.relatedDocuments[].results[].structuredResults[].answer` on `client.announcements.create()`.
-   Changed `response` on `client.announcements.create()`.
-   Changed `request.updateAnnouncementRequest.body.structuredList[].document.metadata.author.relatedDocuments[].results[].structuredResults[].answer` on `client.announcements.update()`.
-   Changed `response` on `client.announcements.update()`.
-   Changed `request.createAnswerRequest.data.addedRoles[].person.relatedDocuments[]` on `client.answers.create()`.
-   Changed `response` on `client.answers.create()`.
-   Changed `request.editAnswerRequest.addedRoles[].person.relatedDocuments[]` on `client.answers.update()`.
-   Changed `response` on `client.answers.update()`.
-   Changed `response.answerResult.answer` on `client.answers.retrieve()`.
-   Changed `response.answerResults[].answer` on `client.answers.list()`.
-   Changed `request.chatRequest.messages[].citations[].sourceDocument.metadata.author.relatedDocuments[].results[].structuredResults[].answer` on `client.chat.create()`.
-   Changed `response.messages[].citations[].sourceDocument.metadata.author.relatedDocuments[].results[].structuredResults[].answer` on `client.chat.create()`.
-   Changed `response.chatResult.chat.createdBy.relatedDocuments[]` on `client.chat.retrieve()`.
-   Changed `response.chatResults[].chat.createdBy.relatedDocuments[]` on `client.chat.list()`.
-   Changed `request.chatRequest.messages[].citations[].sourceDocument.metadata.author.relatedDocuments[].results[].structuredResults[].answer` on `client.chat.createstream()`.
-   Changed `request.createCollectionRequest.addedRoles[].person.relatedDocuments[]` on `client.collections.create()`.
-   Changed `response.union(class (0))` on `client.collections.create()`.
-   Changed `response.collection` on `client.collections.deleteitem()`.
-   Changed `request.editCollectionRequest.addedRoles[].person.relatedDocuments[]` on `client.collections.update()`.
-   Changed `response` on `client.collections.update()`.
-   Changed `response.collection` on `client.collections.updateitem()`.
-   Changed `response` on `client.collections.retrieve()`.
-   Changed `response.collections[]` on `client.collections.list()`.
-   Changed `response.documents.Map<DocumentOrError>.union(Document).metadata.author.relatedDocuments[].results[].structuredResults[].answer` on `client.documents.retrieve()`.
-   Changed `response.documents[].metadata.author.relatedDocuments[].results[].structuredResults[].answer` on `client.documents.retrievebyfacets()`.
-   Changed `request.insightsRequest` on `client.insights.retrieve()`.
-   Changed `response` on `client.insights.retrieve()`.
-   Changed `response.searchResponse.results[].structuredResults[]` on `client.messages.retrieve()`.
-   Changed `response.attribution.relatedDocuments[]` on `client.pins.update()`.
-   Changed `response.pin.attribution.relatedDocuments[]` on `client.pins.retrieve()`.
-   Changed `response.pins[].attribution.relatedDocuments[]` on `client.pins.list()`.
-   Changed `response.attribution.relatedDocuments[]` on `client.pins.create()`.
-   Changed `request.searchRequest.sourceDocument.metadata.author.relatedDocuments[].results[].structuredResults[].answer` on `client.search.queryasadmin()`.
-   Changed `response.results[].structuredResults[]` on `client.search.queryasadmin()`.
-   Changed `response.results[].document.metadata.author.relatedDocuments[].results[].structuredResults[].answer` on `client.search.autocomplete()`.
-   Changed `request.feedRequest.categories[]` on `client.search.retrievefeed()`.
-   Changed `response.results[]` on `client.search.retrievefeed()`.
-   Changed `request.recommendationsRequest.sourceDocument.metadata.author.relatedDocuments[].results[].structuredResults[].answer` on `client.search.recommendations()`.
-   Changed `response.results[].structuredResults[]` on `client.search.recommendations()`.
-   Changed `request.searchRequest.sourceDocument.metadata.author.relatedDocuments[].results[].structuredResults[].answer` on `client.search.query()`.
-   Changed `response.results[].structuredResults[]` on `client.search.query()`.
-   Changed `response.results[].relatedDocuments[]` on `client.entities.list()`.
-   Changed `response.results[].relatedDocuments[]` on `client.entities.readpeople()`.
-   Changed `request.createShortcutRequest.data.addedRoles[].person.relatedDocuments[]` on `client.shortcuts.create()`.
-   Changed `response.shortcut.addedRoles[].person.relatedDocuments[]` on `client.shortcuts.create()`.
-   Changed `response.shortcut.addedRoles[].person.relatedDocuments[]` on `client.shortcuts.retrieve()`.
-   Changed `response.shortcuts[].addedRoles[].person.relatedDocuments[]` on `client.shortcuts.list()`.
-   Changed `request.updateShortcutRequest.addedRoles[].person.relatedDocuments[]` on `client.shortcuts.update()`.
-   Changed `response.shortcut.addedRoles[].person.relatedDocuments[]` on `client.shortcuts.update()`.
-   Changed `response.metadata.lastVerifier.relatedDocuments[]` on `client.verification.addreminder()`.
-   Changed `response.documents[].metadata.lastVerifier.relatedDocuments[]` on `client.verification.list()`.
-   Changed `response.metadata.lastVerifier.relatedDocuments[]` on `client.verification.verify()`.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-java/releases/tag/v0.13.0)

Api-client-go v0.12.0 includes 3 additions, 54 changes.

**Read more**

## Changes

-   Added `error.ErrorCode.Enum(corruptItem)` to `client.collections.create()`.
-   Added `error.ErrorCode.Enum(corruptItem)` to `client.collections.delete()`.
-   Added `error.ErrorCode.Enum(corruptItem)` to `client.collections.update()`.
-   Changed `request.ChatRequest.Messages[].Citations[].SourceDocument.Metadata.Author.RelatedDocuments[].Results[].StructuredResults[].Answer` on `client.chat.create()`.
-   Changed `response` on `client.chat.create()`.
-   Changed `response` on `client.collections.additems()`.
-   Changed `request.Feedback1.Category` on `client.activity.feedback()`.
-   Changed `request.CreateAnnouncementRequest.Body.StructuredList[].Document.Metadata.Author.RelatedDocuments[].Results[].StructuredResults[].Answer` on `client.announcements.create()`.
-   Changed `response` on `client.announcements.create()`.
-   Changed `request.UpdateAnnouncementRequest.Body.StructuredList[].Document.Metadata.Author.RelatedDocuments[].Results[].StructuredResults[].Answer` on `client.announcements.update()`.
-   Changed `response` on `client.announcements.update()`.
-   Changed `request.CreateAnswerRequest.Data.AddedRoles[].Person.RelatedDocuments[]` on `client.answers.create()`.
-   Changed `response` on `client.answers.create()`.
-   Changed `request.EditAnswerRequest.AddedRoles[].Person.RelatedDocuments[]` on `client.answers.update()`.
-   Changed `response` on `client.answers.update()`.
-   Changed `response.AnswerResult.Answer` on `client.answers.retrieve()`.
-   Changed `response.AnswerResults[].Answer` on `client.answers.list()`.
-   Changed `response.ChatResult.Chat.CreatedBy.RelatedDocuments[]` on `client.chat.retrieve()`.
-   Changed `response.ChatResults[].Chat.CreatedBy.RelatedDocuments[]` on `client.chat.list()`.
-   Changed `request.ChatRequest.Messages[].Citations[].SourceDocument.Metadata.Author.RelatedDocuments[].Results[].StructuredResults[].Answer` on `client.chat.createstream()`.
-   Changed `request.CreateCollectionRequest.AddedRoles[].Person.RelatedDocuments[]` on `client.collections.create()`.
-   Changed `response.union(class (0))` on `client.collections.create()`.
-   Changed `response.Collection` on `client.collections.deleteitem()`.
-   Changed `request.EditCollectionRequest.AddedRoles[].Person.RelatedDocuments[]` on `client.collections.update()`.
-   Changed `response` on `client.collections.update()`.
-   Changed `response.Collection` on `client.collections.updateitem()`.
-   Changed `response` on `client.collections.retrieve()`.
-   Changed `response.Collections[]` on `client.collections.list()`.
-   Changed `response.Documents.Map<DocumentOrError>.union(Document).Metadata.Author.RelatedDocuments[].Results[].StructuredResults[].Answer` on `client.documents.retrieve()`.
-   Changed `response.Documents[].Metadata.Author.RelatedDocuments[].Results[].StructuredResults[].Answer` on `client.documents.retrievebyfacets()`.
-   Changed `request.InsightsRequest` on `client.insights.retrieve()`.
-   Changed `response` on `client.insights.retrieve()`.
-   Changed `response.SearchResponse.Results[].StructuredResults[]` on `client.messages.retrieve()`.
-   Changed `response.Attribution.RelatedDocuments[]` on `client.pins.update()`.
-   Changed `response.Pin.Attribution.RelatedDocuments[]` on `client.pins.retrieve()`.
-   Changed `response.Pins[].Attribution.RelatedDocuments[]` on `client.pins.list()`.
-   Changed `response.Attribution.RelatedDocuments[]` on `client.pins.create()`.
-   Changed `request.SearchRequest.SourceDocument.Metadata.Author.RelatedDocuments[].Results[].StructuredResults[].Answer` on `client.search.queryasadmin()`.
-   Changed `response.Results[].StructuredResults[]` on `client.search.queryasadmin()`.
-   Changed `response.Results[].Document.Metadata.Author.RelatedDocuments[].Results[].StructuredResults[].Answer` on `client.search.autocomplete()`.
-   Changed `request.FeedRequest.Categories[]` on `client.search.retrievefeed()`.
-   Changed `response.Results[]` on `client.search.retrievefeed()`.
-   Changed `request.RecommendationsRequest.SourceDocument.Metadata.Author.RelatedDocuments[].Results[].StructuredResults[].Answer` on `client.search.recommendations()`.
-   Changed `response.Results[].StructuredResults[]` on `client.search.recommendations()`.
-   Changed `request.SearchRequest.SourceDocument.Metadata.Author.RelatedDocuments[].Results[].StructuredResults[].Answer` on `client.search.query()`.
-   Changed `response.Results[].StructuredResults[]` on `client.search.query()`.
-   Changed `response.Results[].RelatedDocuments[]` on `client.entities.list()`.
-   Changed `response.Results[].RelatedDocuments[]` on `client.entities.readpeople()`.
-   Changed `request.CreateShortcutRequest.Data.AddedRoles[].Person.RelatedDocuments[]` on `client.shortcuts.create()`.
-   Changed `response.Shortcut.AddedRoles[].Person.RelatedDocuments[]` on `client.shortcuts.create()`.
-   Changed `response.Shortcut.AddedRoles[].Person.RelatedDocuments[]` on `client.shortcuts.retrieve()`.
-   Changed `response.Shortcuts[].AddedRoles[].Person.RelatedDocuments[]` on `client.shortcuts.list()`.
-   Changed `request.UpdateShortcutRequest.AddedRoles[].Person.RelatedDocuments[]` on `client.shortcuts.update()`.
-   Changed `response.Shortcut.AddedRoles[].Person.RelatedDocuments[]` on `client.shortcuts.update()`.
-   Changed `response.Metadata.LastVerifier.RelatedDocuments[]` on `client.verification.addreminder()`.
-   Changed `response.Documents[].Metadata.LastVerifier.RelatedDocuments[]` on `client.verification.list()`.
-   Changed `response.Metadata.LastVerifier.RelatedDocuments[]` on `client.verification.verify()`.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-go/releases/tag/v0.12.0)

May 18

2026

The Custom Metadata API is now generally available — a new capability for attaching structured metadata to documents from any datasource, including native connectors and custom datasources, without re-indexing the source document.

**Read more**

## What's new

-   **New endpoints** under `/rest/api/index`:
    -   `PUT /custom-metadata/schema/{groupName}` — create or update a metadata group schema
    -   `GET /custom-metadata/schema/{groupName}` — retrieve a metadata group schema
    -   `DELETE /custom-metadata/schema/{groupName}` — remove a metadata group schema
    -   `PUT /document/{docId}/custom-metadata/{groupName}` — add or update metadata on a document
    -   `DELETE /document/{docId}/custom-metadata/{groupName}` — remove metadata from a document
-   **Property types**: `TEXT`, `PICKLIST`, `TEXTLIST`, `MULTIPICKLIST`, with optional `skipIndexing` to keep values retrievable but excluded from full-text search.
-   **Scoped tokens** — manage permissions per metadata group via `custommetadata:<group_name>`, or globally with `custommetadata:global_scope`.
-   **Querying** — values are searchable as facets (`<groupName><keyName>:<value>`) and retrievable through the Client API `getDocuments` endpoint with `includeFields: ["CUSTOM_METADATA"]`.

## When to use it

Custom Metadata works with any document already indexed in Glean. Use it to enrich documents from native connectors (Google Drive, Confluence, Jira, etc.) or custom datasources without re-uploading them. For a side-by-side comparison with Custom Properties (which require re-indexing the document), see [Custom Properties vs Custom Metadata](/api-info/indexing/custom-metadata/custom-properties-vs-custom-metadata).

## Documentation

-   [Custom Metadata Overview](/api-info/indexing/custom-metadata/overview)
-   [Authentication](/api-info/indexing/custom-metadata/authentication)
-   [Schema Management](/api-info/indexing/custom-metadata/schema-management)
-   [Indexing Metadata](/api-info/indexing/custom-metadata/indexing-metadata)
-   [Querying](/api-info/indexing/custom-metadata/querying)

May 13

2026

2 endpoints added.

**Read more**

## Changes

-   Added endpoint: /custom-metadata/schema/{groupName}
-   Added endpoint: /document/{docId}/custom-metadata/{groupName}

## Source

-   [open-api 1d56839](https://github.com/gleanwork/open-api/commit/1d568391d821bd180625c82512f0000265073362)
-   [open-api 6249d56](https://github.com/gleanwork/open-api/commit/6249d56b0e04656fd917ec7477aa135a78e84305)
-   [open-api 647eaa3](https://github.com/gleanwork/open-api/commit/647eaa38c051fec5593ab69cfdbc89e96fe5932f)
-   [open-api 7a2b665](https://github.com/gleanwork/open-api/commit/7a2b665f271485fea9181f008202a3f98536fcae)

May 12

2026

Breaking change: 1 endpoint added, 1 endpoint removed.

**Read more**

## Action Required

-   Update callers to stop using /actions/{actionPackId}/auth.

## Changes

-   Added endpoint: /actions/actionpack/{actionPackId}/auth

## Breaking Changes

-   Removed endpoint: /actions/{actionPackId}/auth (breaking change)

## Source

-   [open-api 02f647c](https://github.com/gleanwork/open-api/commit/02f647c1ae9b636e06115733a1d5e179a31578d2)
-   [open-api 222faa4](https://github.com/gleanwork/open-api/commit/222faa48c244289ca936bbc8c880543c048b73e0)
-   [open-api 3c5f04e](https://github.com/gleanwork/open-api/commit/3c5f04e4172b07ada26ee79f7f6751f1720fb04c)
-   [open-api 439d1d2](https://github.com/gleanwork/open-api/commit/439d1d2144619900359c140129d902e6b28e8688)
-   [open-api 51db945](https://github.com/gleanwork/open-api/commit/51db945590372dc3832099eff8ee01d3ce66c162)
-   [open-api 5a6fddc](https://github.com/gleanwork/open-api/commit/5a6fddcf74166faa81f53f824a4d389e61800e83)
-   [open-api 5f2faf1](https://github.com/gleanwork/open-api/commit/5f2faf1fd784e237def639db02464cccdd827c1d)
-   [open-api 81d283b](https://github.com/gleanwork/open-api/commit/81d283bdc17d07db5fb7c2de0801c40e8bd017c0)

May 11

2026

2 endpoints added.

**Read more**

## Changes

-   Added endpoint: /api/index/v1/debug/{datasource}/document/events
-   Added endpoint: /debug/{datasource}/document/events

## Source

-   [open-api 31144d0](https://github.com/gleanwork/open-api/commit/31144d0a1a6d47a7a15e0df5fe47d4d9e1f2a846)
-   [open-api 565ee21](https://github.com/gleanwork/open-api/commit/565ee21edfefe7b9ebedd2f3c568054dbc340901)
-   [open-api 8d3a911](https://github.com/gleanwork/open-api/commit/8d3a9118a3de11737fa4eda5bcdb850867067613)
-   [open-api 968befb](https://github.com/gleanwork/open-api/commit/968befb8c149a90c5954f43a49a3c40ae5834772)
-   [open-api ae19c79](https://github.com/gleanwork/open-api/commit/ae19c79f11106c658bf1061dcc8d4ca5c9a26f07)
-   [open-api eb3e8be](https://github.com/gleanwork/open-api/commit/eb3e8be368aaa09d127d325de8413064635e76dd)

May 7

2026

2 endpoints added.

**Read more**

## Changes

-   Added endpoint: /actions/{actionPackId}/auth
-   Added endpoint: /chat-files/{fileId}

## Source

-   [open-api 368a20e](https://github.com/gleanwork/open-api/commit/368a20e9e9b003c93c2a9bc7a34d0672cd764a20)
-   [open-api 36ccb9c](https://github.com/gleanwork/open-api/commit/36ccb9ca0c45287b1f1f6d876940315f09e51ab0)
-   [open-api 49f327d](https://github.com/gleanwork/open-api/commit/49f327d09ca52c6dcd7b5ef92c1ba891e753d9bb)
-   [open-api 50b0df5](https://github.com/gleanwork/open-api/commit/50b0df50b50693714bddc3e93c6cfa281962767d)
-   [open-api 6a7c06c](https://github.com/gleanwork/open-api/commit/6a7c06cb55082b8df19cf4111a4d1fefd6efb22e)
-   [open-api 6bd6a08](https://github.com/gleanwork/open-api/commit/6bd6a0894942908a5a808538273f228c59e2f41f)
-   [open-api 6c3c728](https://github.com/gleanwork/open-api/commit/6c3c728ff527a3e06c2616e820057fb69dd6406f)
-   [open-api 8d724f8](https://github.com/gleanwork/open-api/commit/8d724f8d913aa80050700dcc64f42f202943ada9)

May 5

2026

1 endpoint added.

**Read more**

## Changes

-   Added endpoint: /people/{person\_id}/photo

## Source

-   [open-api 2800e7a](https://github.com/gleanwork/open-api/commit/2800e7a577fa6d58a60b0659a83e2b4cd07ee575)
-   [open-api 2d3443c](https://github.com/gleanwork/open-api/commit/2d3443c7126e7b9b8504012ebc1b576f478f719e)
-   [open-api 61c1f35](https://github.com/gleanwork/open-api/commit/61c1f35f0e4d5c3cad1fe94c398a131a42628273)
-   [open-api 73555b8](https://github.com/gleanwork/open-api/commit/73555b80908616f7b414a05add5defcf86178a0c)
-   [open-api 8b52a73](https://github.com/gleanwork/open-api/commit/8b52a73a0470863ec091b92ba321dbfd4bdb3d5d)
-   [open-api 8f8bfbd](https://github.com/gleanwork/open-api/commit/8f8bfbd45f91882595938f16493847a4488a5ac9)
-   [open-api a6d97ad](https://github.com/gleanwork/open-api/commit/a6d97ad3f1a75fee061fbad5d48f402834e3531e)
-   [open-api d485d2c](https://github.com/gleanwork/open-api/commit/d485d2c00fb0fcbba724b8fefe66283b2d55e155)

May 4

2026

Configure-mcp-server v3.2.0: Friendly error when no local MCP server is configured.

**Read more**

## Changes

-   Friendly error when no local MCP server is configured.

## Source

-   [Release notes](https://github.com/gleanwork/configure-mcp-server/releases/tag/v3.2.0)
-   [PR #78](https://github.com/gleanwork/configure-mcp-server/pull/78)

May 2

2026

Breaking change: `mcp-config-glean`, `mcp-config-schema`: drop local MCP path; add cliVersion pin support.

**Read more**

## Action Required

-   Review this breaking change before upgrading: `mcp-config-glean`, `mcp-config-schema`: drop local MCP path; add cliVersion pin support.

## Changes

-   This release only includes breaking or deprecated changes.

## Breaking Changes

-   `mcp-config-glean`, `mcp-config-schema`: drop local MCP path; add cliVersion pin support.

## Source

-   [Release notes](https://github.com/gleanwork/mcp-config/releases/tag/v5.0.0)
-   [PR #108](https://github.com/gleanwork/mcp-config/pull/108)

April 23

2026

Glean Indexing SDK v1.0.0b2 adds connector options for bulk indexing and fixes datasource configuration handling.

**Read more**

## Changes

-   Added ConnectorOptions and updated documentation.
-   Fixed configure\_datasource() to use attribute access and avoid camelCase keyword arguments.

## Source

-   [Release notes](https://github.com/gleanwork/glean-indexing-sdk/releases/tag/v1.0.0b2)
-   [PR #15](https://github.com/gleanwork/glean-indexing-sdk/pull/15)
-   [PR #17](https://github.com/gleanwork/glean-indexing-sdk/pull/17)

April 15

2026

Added `feedbackUserCount` to `client.insights.retrieve()` and `issueFilter` to `governance.createfindingsexport()`.

**Read more**

## Changes

-   Added `feedbackUserCount` to `client.insights.retrieve()` and `issueFilter` to `governance.createfindingsexport()`. Changed `issues` on `client.activity.feedback()`, `response` on `governance.createfindingsexport()`, and `exports` on `governance.listfindingsexports()`.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-typescript/releases/tag/v0.14.18)

Added `feedback_user_count` to `client.insights.retrieve()` and `issue_filter` to `governance.createfindingsexport()`. Changed `response` on `governance.createfindingsexport()` and `exports` on `governance.listfindingsexports()`.

**Read more**

## Changes

-   Added `feedback_user_count` to `client.insights.retrieve()` and `issue_filter` to `governance.createfindingsexport()`. Changed `response` on `governance.createfindingsexport()` and `exports` on `governance.listfindingsexports()`.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-python/releases/tag/v0.12.22)

Added `feedbackUserCount` to `client.insights.retrieve()` and `issueFilter` to `governance.createfindingsexport()`. Changed `response` on `governance.createfindingsexport()` and `exports` on `governance.listfindingsexports()`.

**Read more**

## Changes

-   Added `feedbackUserCount` to `client.insights.retrieve()` and `issueFilter` to `governance.createfindingsexport()`. Changed `response` on `governance.createfindingsexport()` and `exports` on `governance.listfindingsexports()`.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-java/releases/tag/v0.12.37)

Added `FeedbackUserCount` to `client.insights.retrieve()` and `IssueFilter` to `governance.createfindingsexport()`.

**Read more**

## Changes

-   Added `FeedbackUserCount` to `client.insights.retrieve()` and `IssueFilter` to `governance.createfindingsexport()`. Changed `Issues` on `client.activity.feedback()`, `response` on `governance.createfindingsexport()`, and `Exports` on `governance.listfindingsexports()`.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-go/releases/tag/v0.11.42)

April 13

2026

Added lastDraftSavedAt workflow field to search feed results in glean.client.search.retrieveFeed() and statuses filter field to governance findings export endpoints glean.governance.createfindingsexport().

**Read more**

## Changes

-   Added lastDraftSavedAt workflow field to search feed results in glean.client.search.retrieveFeed() and statuses filter field to governance findings export endpoints glean.governance.createfindingsexport() and glean.governance.listfindingsexports().

## Source

-   [Release notes](https://github.com/gleanwork/api-client-typescript/releases/tag/v0.14.17)

Added LastDraftSavedAt workflow field to search feed results in Glean.Client.Search.RetrieveFeed() and Statuses filter field to governance findings export endpoints Glean.Governance.Createfindingsexport().

**Read more**

## Changes

-   Added LastDraftSavedAt workflow field to search feed results in Glean.Client.Search.RetrieveFeed() and Statuses filter field to governance findings export endpoints Glean.Governance.Createfindingsexport() and Glean.Governance.Listfindingsexports().

## Source

-   [Release notes](https://github.com/gleanwork/api-client-go/releases/tag/v0.11.41)

April 9

2026

Changed the AgentsResponse field in Glean.Client.Insights.Retrieve() and added the spreadsheetType UgcType enum value to search feed results in Glean.Client.Search.RetrieveFeed().

**Read more**

## Changes

-   Changed the AgentsResponse field in Glean.Client.Insights.Retrieve() and added the spreadsheetType UgcType enum value to search feed results in Glean.Client.Search.RetrieveFeed().

## Source

-   [Release notes](https://github.com/gleanwork/api-client-go/releases/tag/v0.11.40)

April 8

2026

Glean Agent Toolkit improved developer setup and compatibility with installable skills, injectable GleanContext, unified adapter extras, retry and environment configuration updates, and LangGraph 1.x support.

**Read more**

## Changes

-   Glean Agent Toolkit improved developer setup and compatibility with installable skills, injectable GleanContext, unified adapter extras, retry and environment configuration updates, and LangGraph 1.x support.

## Source

-   [Release notes](https://github.com/gleanwork/glean-agent-toolkit/releases/tag/0.5.0)

March 27

2026

Added partiallyProcessed status enum to chat file metadata in glean.client.chat.create(), glean.client.chat.retrieve(), glean.client.chat.createStream(), glean.client.chat.uploadFiles(), and glean.client.chat.retrieveFiles().

**Read more**

## Changes

-   Added nativeAppUrl field to document indexing requests in glean.indexing.documents.addOrUpdate(), glean.indexing.documents.index(), and glean.indexing.documents.bulkIndex().

## Source

-   [Release notes](https://github.com/gleanwork/api-client-typescript/releases/tag/v0.14.14)

The API client now supports a file metadata status in chat request and response citation objects and adds to document indexing requests.

**Read more**

## Changes

-   Added in request citations and response message citations, and in request citations.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-python/releases/tag/v0.12.18)

Added support for the metadata status in chat citation and file fields, and added to document indexing requests.

**Read more**

## Changes

-   Added to chat create and createStream request citation source files.
-   Added to chat create, retrieve, uploadFiles, and retrieveFiles response citation and file metadata.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-java/releases/tag/v0.12.33)

The Go API client adds the status enum to chat citation and file metadata fields and adds to document indexing requests.

**Read more**

## Changes

-   Added to chat create and createStream request citation source file metadata.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-go/releases/tag/v0.11.38)

March 25

2026

Released TypeScript API client v0.14.13 for the Glean REST API, published on npm as @gleanwork/api-client.

**Read more**

## Changes

-   Generated from OpenAPI Doc 0.9.0 using Speakeasy CLI 1.759.2.
-   Includes full TypeScript types, async/await support, and fetch-based HTTP for browser and Node.js.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-typescript/releases/tag/v0.14.13)

Released Python API client v0.12.17 generated from OpenAPI Doc 0.9.0 using Speakeasy CLI 1.759.2 (2.869.23).

**Read more**

## Changes

-   Generated Python SDK version v0.12.17 - Published Python package release v0.12.17 on PyPI.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-python/releases/tag/v0.12.17)

Released Java API client v0.12.32 based on OpenAPI Doc 0.9.0 using Speakeasy CLI 1.759.2 (2.869.23).

**Read more**

## Changes

-   Generated Java SDK version v0.12.32 - Published Java SDK v0.12.32 to Maven Central.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-java/releases/tag/v0.12.32)

Released Go API client v0.11.37 generated from OpenAPI Doc 0.9.0 using Speakeasy CLI 1.759.2 (2.869.23).

**Read more**

## Changes

-   Updated Go API client to version v0.11.37 - Regenerated client from OpenAPI Doc 0.9.0 - Generation performed with Speakeasy CLI 1.759.2 (2.869.23).

## Source

-   [Release notes](https://github.com/gleanwork/api-client-go/releases/tag/v0.11.37)

March 23

2026

The request.feedRequest.categories enum value weeklyMeetings was added and response.results was changed in glean.client.search.retrieveFeed().

**Read more**

## Changes

-   Added weeklyMeetings category enum.
-   Changed feed response results.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-typescript/releases/tag/v0.14.12)

Added sourceCustomEntity to message citations in glean.client.chat.create(), glean.client.chat.retrieve(), and glean.client.chat.createStream().

**Read more**

## Changes

-   Added issues enum to glean.governance.createfindingsexport() export type.
-   Changed response.overviewResponse in glean.client.insights.retrieve().

## Source

-   [Release notes](https://github.com/gleanwork/api-client-typescript/releases/tag/v0.14.11)

The request.categories enum value weekly\_meetings was added and response.results was changed in glean.client.search.retrieve\_feed().

**Read more**

## Changes

-   Added weekly\_meetings category enum.
-   Changed feed response results.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-python/releases/tag/v0.12.16)

Glean-api-client 0.12.15 adds citation fields to chat create, retrieve, and create\_stream flows, changes in insights retrieve, and adds as an export type for findings export.

**Read more**

## Changes

-   And add , and also adds - adds - changes , and adds.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-python/releases/tag/v0.12.15)

The request.feedRequest.categories enum value weeklyMeetings was added and response.results was changed in glean.client.search.retrieveFeed().

**Read more**

## Changes

-   Added weeklyMeetings category enum.
-   Changed feed response results.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-java/releases/tag/v0.12.31)

Chat citations now include across chat create, retrieve, and streaming APIs, changed , and findings export added an export type.

**Read more**

## Changes

-   Added.
-   Changed and added.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-java/releases/tag/v0.12.30)

The request.FeedRequest.Categories enum value weeklyMeetings was added and response.Results was changed in Glean.Client.Search.RetrieveFeed().

**Read more**

## Changes

-   Added weeklyMeetings category enum.
-   Changed feed response results.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-go/releases/tag/v0.11.36)

Added SourceCustomEntity to message citations in Glean.Client.Chat.Create(), Glean.Client.Chat.Retrieve(), and Glean.Client.Chat.CreateStream().

**Read more**

## Changes

-   Added issues enum to Glean.Governance.Createfindingsexport() export type.
-   Changed response.OverviewResponse in Glean.Client.Insights.Retrieve().

## Source

-   [Release notes](https://github.com/gleanwork/api-client-go/releases/tag/v0.11.35)

March 19

2026

Released Glean TypeScript API client v0.14.10 based on OpenAPI Doc 0.9.0.

**Read more**

## Changes

-   Updated generated TypeScript SDK to version 0.14.10.
-   Published @gleanwork/api-client NPM package at version 0.14.10.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-typescript/releases/tag/v0.14.10)

Released Python API client v0.12.14 based on OpenAPI Doc 0.9.0 and updated Speakeasy CLI tooling.

**Read more**

## Changes

-   Updated client generation to use OpenAPI Doc 0.9.0.
-   Regenerated Python SDK at version 0.12.14.
-   Published Python client v0.12.14 to PyPI.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-python/releases/tag/v0.12.14)

Released Java API client version 0.12.29 based on OpenAPI Doc 0.9.0 and updated Speakeasy CLI tooling.

**Read more**

## Changes

-   Generated Java SDK v0.12.29 - Published Java SDK v0.12.29 to Maven Central.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-java/releases/tag/v0.12.29)

Released Go API client v0.11.34 generated from OpenAPI Doc 0.9.0.

**Read more**

## Changes

-   Based on OpenAPI Doc version 0.9.0 - Regenerated Go SDK (v0.11.34) using updated inputs - Published Go API client release v0.11.34.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-go/releases/tag/v0.11.34)

March 18

2026

Updated the Glean TypeScript API client to v0.14.9 based on OpenAPI Doc 0.9.0.

**Read more**

## Changes

-   TypeScript SDK regenerated as version 0.14.9.
-   Published NPM package @gleanwork/api-client at version 0.14.9.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-typescript/releases/tag/v0.14.9)

Released Python API client v0.12.13 based on OpenAPI Doc 0.9.0 and updated Speakeasy CLI tooling.

**Read more**

## Changes

-   Generated python v0.12.13 from OpenAPI Doc 0.9.0 - Published python client as PyPI release v0.12.13.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-python/releases/tag/v0.12.13)

Updated Java API client to version 0.12.28 based on OpenAPI Doc 0.9.0 and Speakeasy CLI 1.757.0 (2.866.0), with a new release published to Maven Central.

**Read more**

## Changes

-   Generated Java client: v0.12.28 - OpenAPI specification: 0.9.0; Speakeasy CLI: 1.757.0 (2.866.0) - Maven Central release: v0.12.28.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-java/releases/tag/v0.12.28)

Released Go API client v0.11.33 based on OpenAPI Doc 0.9.0 using Speakeasy CLI 1.757.0 (2.866.0).

**Read more**

## Changes

-   Updated Go client generation to OpenAPI Doc 0.9.0.
-   Regenerated Go SDK as version v0.11.33.
-   Published Go API client release v0.11.33.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-go/releases/tag/v0.11.33)

March 17

2026

This release updates multiple request/response schemas (including chat, search, collections, answers, pins, announcements, entities, shortcuts, verification) and adds new datasource configuration endpoints, with several breaking changes.

**Read more**

## Changes

-   This release updates multiple request/response schemas (including chat, search, collections, answers, pins, announcements, entities, shortcuts, verification) and adds new datasource configuration endpoints, with several breaking changes.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-typescript/releases/tag/v0.14.8)

Released Python API client v0.12.12 generated from OpenAPI Doc 0.9.0 using Speakeasy CLI 1.755.1 (2.865.2).

**Read more**

## Changes

-   Generated Python SDK version v0.12.12 - Published PyPI release v0.12.12.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-python/releases/tag/v0.12.12)

Updated Java API client to version 0.12.27 based on OpenAPI Doc 0.9.0 and the latest Speakeasy CLI tooling.

**Read more**

## Changes

-   Regenerated Java SDK at v0.12.27 - Published Java SDK v0.12.27 to Maven Central.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-java/releases/tag/v0.12.27)

Released Go API client version 0.11.32 based on OpenAPI Doc 0.9.0.

**Read more**

## Changes

-   Updated Go API client to v0.11.32 - Regenerated from OpenAPI Doc 0.9.0 using Speakeasy CLI 1.755.1 (2.865.2).

## Source

-   [Release notes](https://github.com/gleanwork/api-client-go/releases/tag/v0.11.32)

March 16

2026

The response.chat field was added to glean.client.chat.create() and request.categories and response.results were changed in glean.client.search.retrieve\_feed().

**Read more**

## Changes

-   Added chat field to chat create response.
-   Changed feed request categories and response results.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-python/releases/tag/v0.12.11)

The response.chat field was added to glean.client.chat.create() and request.feedRequest.categories and response.results were changed in glean.client.search.retrieveFeed().

**Read more**

## Changes

-   Added chat field to chat create response.
-   Changed feed request categories and response results.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-java/releases/tag/v0.12.26)

This release adds a new chat response object and updates feed search request and result structures in the Go API client.

**Read more**

## Changes

-   : added - : changed - : changed.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-go/releases/tag/v0.11.31)

March 11

2026

Added new auth metadata fields to chat APIs and a name field to agent schema retrieval responses.

**Read more**

## Changes

-   Added request and response.
-   Added response.
-   Added request to and response.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-python/releases/tag/v0.12.10)

Added tokenEndpointAuthMethod to action metadata auth fields in glean.client.chat.create(), glean.client.chat.retrieve(), and glean.client.chat.createStream().

**Read more**

## Changes

-   Added name field to the glean.client.agents.retrieveSchemas() response.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-java/releases/tag/v0.12.25)

Added TokenEndpointAuthMethod to action metadata auth fields in Glean.Client.Chat.Create(), Glean.Client.Chat.Retrieve(), and Glean.Client.Chat.CreateStream().

**Read more**

## Changes

-   Added Name field to the Glean.Client.Agents.RetrieveSchemas() response.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-go/releases/tag/v0.11.30)

March 9

2026

Added glean.datasources.get\_datasource\_instance\_configuration() and glean.datasources.update\_datasource\_instance\_configuration().

**Read more**

## Action Required

-   Plan migration away from glean.indexing.people.bulk\_index().

## Changes

-   Added 404 error type to glean.client.agents.retrieve().
-   Changed snippet structures across search, chat.
-   Added glean.datasources.get\_datasource\_instance\_configuration() and glean.datasources.update\_datasource\_instance\_configuration().
-   Changed snippet structures across search, chat, collections, and entity endpoints.

## Deprecated

-   Deprecated glean.indexing.people.bulk\_index().

## Source

-   [Release notes](https://github.com/gleanwork/api-client-python/releases/tag/v0.12.9)

This release updates multiple client request/response schemas (including snippets and chat messages), introduces new datasource configuration endpoints, and deprecates a people indexing API.

**Read more**

## Action Required

-   Plan migration away from deprecated behavior.

## Changes

-   This release updates multiple client request/response schemas (including snippets and chat messages), introduces new datasource configuration endpoints, and deprecates a people indexing API.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-java/releases/tag/v0.12.24)

This release introduces widespread response and snippet schema changes across the Go client, multiple breaking changes to chat and search APIs, new datasource configuration endpoints, and an updated agents error model.

**Read more**

## Changes

-   This release introduces widespread response and snippet schema changes across the Go client, multiple breaking changes to chat and search APIs, new datasource configuration endpoints, and an updated agents error model.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-go/releases/tag/v0.11.29)

March 6

2026

Fixed a publishing issue affecting version 0.10.0.

**Read more**

## Changes

-   Resolved a problem that prevented successful publishing with 0.10.0.

## Source

-   [Release notes](https://github.com/gleanwork/mcp-server/releases/tag/v0.10.1)

March 5

2026

Adds server\_url configuration with instance fallback and updates tooling and SDK usage for improved developer ergonomics.

**Read more**

## Action Required

-   Follow the migration notes before upgrading.

## Changes

-   Added server\_url support with automatic fallback to the Glean instance.
-   Migrated task runner from go-task to native mise tasks.

## Source

-   [Release notes](https://github.com/gleanwork/langchain-glean/releases/tag/v0.4.0)

Glean Indexing SDK now supports configuration via GLEAN\_SERVER\_URL with GLEAN\_INSTANCE fallback and introduces improved error handling and documentation.

**Read more**

## Changes

-   Added support for configuring the SDK using GLEAN\_SERVER\_URL with GLEAN\_INSTANCE as a fallback.

## Source

-   [Release notes](https://github.com/gleanwork/glean-indexing-sdk/releases/tag/v1.0.0b1)

Improves Glean Agent Toolkit’s environment configuration, developer setup, and schema capabilities while fixing adapter hints and lint issues.

**Read more**

## Changes

-   Improves Glean Agent Toolkit’s environment configuration, developer setup, and schema capabilities while fixing adapter hints and lint issues.

## Source

-   [Release notes](https://github.com/gleanwork/glean-agent-toolkit/releases/tag/0.4.0)

This release adds server URL configurability for MCP and updates the MCP config package dependency.

**Read more**

## Action Required

-   Follow the migration notes before upgrading.

## Changes

-   Added CLI flag to configure the MCP server endpoint.
-   Added environment variable support for MCP server configuration.
-   Migrated MCP config dependency.

## Source

-   [Release notes](https://github.com/gleanwork/configure-mcp-server/releases/tag/v3.1.0)

February 23

2026

No functional changes documented for mcp-config-schema v4.2.0 based on the provided release notes.

**Read more**

## Changes

-   Version identifier updated to mcp-config-schema v4.2.0 for tracking and dependency alignment.

## Source

-   [Release notes](https://github.com/gleanwork/mcp-config/releases/tag/v4.2.0)

Introduces a custom exception hierarchy for the Glean Indexing SDK and improves release packaging and documentation references.

**Read more**

## Changes

-   Introduces a custom exception hierarchy for the Glean Indexing SDK and improves release packaging and documentation references.

## Source

-   [Release notes](https://github.com/gleanwork/glean-indexing-sdk/releases/tag/v1.0.0b0)

February 20

2026

Updated to change the field.

**Read more**

## Changes

-   Category: API Clients - Affected method:.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-typescript/releases/tag/v0.14.7)

The response.unauthorized\_datasource\_instances field was changed in glean.authentication.checkdatasourceauth().

**Read more**

## Changes

-   Review usage of this endpoint for compatibility with the updated response field.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-python/releases/tag/v0.12.8)

Updated so that has changed in the API client.

**Read more**

## Changes

-   Category: API Clients - Package:.
-   Change: in response marked as changed.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-java/releases/tag/v0.12.23)

Updated to change the field.

**Read more**

## Changes

-   Behavior or structure has been modified.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-go/releases/tag/v0.11.28)

February 19

2026

1 endpoint added.

**Read more**

## Changes

-   Added endpoint: /checkdatasourceauth.
-   1 endpoint added.

Added the method to the package in version 0.14.6.

**Read more**

## Changes

-   Category: API Clients - New:.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-typescript/releases/tag/v0.14.6)

Added a new authentication helper for checking data source authorization in glean-api-client 0.12.7.

**Read more**

## Changes

-   Added for data source auth checks.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-python/releases/tag/v0.12.7)

Added the method to the API client for authentication checks.

**Read more**

## Changes

-   New function added to the client.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-java/releases/tag/v0.12.22)

Added the method to the Go API client.

**Read more**

## Changes

-   Added to support datasource authentication checks.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-go/releases/tag/v0.11.27)

February 18

2026

Breaking changes to response types in glean.client.chat.create() and glean.client.chat.retrieve(); changed messageType on chat messages in glean.client.chat.createStream().

**Read more**

## Changes

-   Added unauthorizedDatasourceInstances to response and error types in glean.client.search.query(), glean.client.search.queryAsAdmin(), glean.client.search.autocomplete(), glean.client.search.recommendations(), and glean.client.messages.retrieve().

## Source

-   [Release notes](https://github.com/gleanwork/api-client-typescript/releases/tag/v0.14.5)

Glean-api-client 0.12.6 changes chat message type fields and adds unauthorized datasource error details across search APIs.

**Read more**

## Changes

-   Changed in for and , and in for (breaking).
-   Changed for (breaking).
-   Added (and ) to , , , ,.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-python/releases/tag/v0.12.6)

This release updates chat messageType fields and introduces unauthorizedDatasourceInstances error details across search and messages APIs, including breaking changes to chat create and retrieve responses.

**Read more**

## Changes

-   This release updates chat messageType fields and introduces unauthorizedDatasourceInstances error details across search and messages APIs, including breaking changes to chat create and retrieve responses.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-java/releases/tag/v0.12.21)

Api-client-go 0.11.26 updates chat message type fields and adds UnauthorizedDatasourceInstances error details across messages and search APIs, including several breaking response changes.

**Read more**

## Changes

-   Api-client-go 0.11.26 updates chat message type fields and adds UnauthorizedDatasourceInstances error details across messages and search APIs, including several breaking response changes.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-go/releases/tag/v0.11.26)

February 10

2026

Added support for the enum value in the activity feedback API request.

The request.feedback1.event enum value feedback\_time\_saved was added to glean.client.activity.feedback().

**Read more**

## Changes

-   Added feedback\_time\_saved enum to activity feedback events.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-python/releases/tag/v0.12.5)

Added a new feedbackTimeSaved enum value to the feedback request event in glean.client.activity.feedback().

**Read more**

## Changes

-   Added request.feedback1.event.enum(feedbackTimeSaved) to glean.client.activity.feedback().

## Source

-   [Release notes](https://github.com/gleanwork/api-client-java/releases/tag/v0.12.20)

The request.Feedback1.Event enum value feedbackTimeSaved was added to Glean.Client.Activity.Feedback().

**Read more**

## Changes

-   Added feedbackTimeSaved enum to activity feedback events.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-go/releases/tag/v0.11.25)

February 9

2026

Added the response.tools field to glean.client.agents.retrieveSchemas() in the @gleanwork/api-client 0.14.3 release.

**Read more**

## Changes

-   Added response.tools to glean.client.agents.retrieveSchemas() output.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-typescript/releases/tag/v0.14.3)

Released Python API client v0.12.4 generated from OpenAPI Doc 0.9.0 using Speakeasy CLI 1.709.1 (2.812.2).

**Read more**

## Changes

-   Generated Python SDK version v0.12.4 - Published Python package release v0.12.4.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-python/releases/tag/v0.12.4)

The response.tools field was added to glean.client.agents.retrieve\_schemas().

**Read more**

## Changes

-   Added tools field to the agent schema retrieval response.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-python/releases/tag/v0.12.3)

The method now includes the field in its response.

**Read more**

## Changes

-   Added to the response.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-java/releases/tag/v0.12.19)

The response.Tools field was added to Glean.Client.Agents.RetrieveSchemas().

**Read more**

## Changes

-   Added Tools field to the agent schema retrieval response.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-go/releases/tag/v0.11.24)

February 6

2026

Updated the TypeScript API client to version 0.14.1 based on OpenAPI Doc 0.9.0.

**Read more**

## Changes

-   Generated TypeScript client v0.14.1 - Aligned with OpenAPI Doc 0.9.0 - Release available as NPM package v0.14.1.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-typescript/releases/tag/v0.14.1)

Updated Python API client to version 0.12.1 based on OpenAPI Doc 0.9.0.

**Read more**

## Changes

-   Python client generated at v0.12.1 - Released on PyPI as v0.12.1.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-python/releases/tag/v0.12.1)

Updated Java API client to version 0.12.16 based on OpenAPI Doc 0.9.0 and Speakeasy CLI 1.706.1 (2.809.2).

**Read more**

## Changes

-   Java client v0.12.16 released to Maven Central.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-java/releases/tag/v0.12.16)

Updated Go API client to version 0.11.22 based on OpenAPI Doc 0.9.0.

**Read more**

## Changes

-   No additional details or breaking changes were specified in this release.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-go/releases/tag/v0.11.22)

February 5

2026

Added a guided release process, standardized async class and file naming, and improved release commit contents.

**Read more**

## Changes

-   Introduced /release command for guided releases - Renamed async classes with Base prefix and files to base\_\* convention - Included CHANGELOG.md and uv.lock in release commits.

## Source

-   [Release notes](https://github.com/gleanwork/glean-indexing-sdk/releases/tag/v0.3.1)

Introduces a guided release process, standardizes async class and file naming, and improves Python version management for the Glean Indexing SDK.

**Read more**

## Changes

-   Introduces a guided release process, standardizes async class and file naming, and improves Python version management for the Glean Indexing SDK.

## Source

-   [Release notes](https://github.com/gleanwork/glean-indexing-sdk/releases/tag/v0.3.0)

January 29

2026

Restored README documentation files for both mcp-config-glean and mcp-config-schema packages.

**Read more**

## Changes

-   Documentation updates only - No protocol or schema changes - Committer: Steve Calvert.

## Source

-   [Release notes](https://github.com/gleanwork/mcp-config/releases/tag/v4.1.1)

January 22

2026

This release updates the MCP config schema with enhancements to client support, API behavior, and authentication options.

**Read more**

## Changes

-   Added Cursor Agent to clients.
-   Updated clientNeedsMcpRemote in the API.
-   Introduced new authentication configurations.

## Source

-   [Release notes](https://github.com/gleanwork/mcp-config/releases/tag/v4.1.0)

January 21

2026

Updated SDK to use vars() for Speakeasy models and removed unused parameters, with improved environment variable propagation.

**Read more**

## Changes

-   Updated SDK to use vars() for Speakeasy models and removed unused parameters, with improved environment variable propagation.

## Source

-   [Release notes](https://github.com/gleanwork/langchain-glean/releases/tag/v0.3.4)

January 16

2026

Updated TypeScript API client to version 0.13.20 based on OpenAPI Doc 0.9.0 and Speakeasy CLI 1.686.0 (2.796.1).

**Read more**

## Changes

-   Updated TypeScript API client to version 0.13.20 based on OpenAPI Doc 0.9.0 and Speakeasy CLI 1.686.0 (2.796.1).

## Source

-   [Release notes](https://github.com/gleanwork/api-client-typescript/releases/tag/v0.13.20)

Python API client updated to version 0.11.27 based on OpenAPI Doc 0.9.0 and Speakeasy CLI 1.686.0 (2.796.1).

**Read more**

## Changes

-   Generated python v0.11.27 - Released on PyPI v0.11.27.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-python/releases/tag/v0.11.27)

Updated Java API client to version 0.12.14 based on OpenAPI Doc 0.9.0 and Speakeasy CLI 1.686.0 (2.796.1).

**Read more**

## Changes

-   Java client v0.12.14 released - Maven Central v0.12.14 published.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-java/releases/tag/v0.12.14)

Go API client updated to version 0.11.20 based on OpenAPI Doc 0.9.0 and Speakeasy CLI 1.686.0 (2.796.1).

**Read more**

## Changes

-   Generated Go client v0.11.20 - Release includes updates from OpenAPI Doc 0.9.0 - Built using Speakeasy CLI 1.686.0 (2.796.1).

## Source

-   [Release notes](https://github.com/gleanwork/api-client-go/releases/tag/v0.11.20)

January 14

2026

Added --bearer-token-env-var flag to Codex CLI for API token authentication and improved CLAUDE.md documentation with architecture and vendor-neutrality details.

**Read more**

## Changes

-   Added --bearer-token-env-var flag to Codex CLI for API token authentication and improved CLAUDE.md documentation with architecture and vendor-neutrality details.

## Source

-   [Release notes](https://github.com/gleanwork/mcp-config/releases/tag/v4.0.1)

Tooling configuration consolidated at the monorepo root and converted to an npm workspaces monorepo.

**Read more**

## Changes

-   Affects: mcp-config-glean, mcp-config-schema.
-   Refactored configuration structure for improved maintainability - Transitioned to npm workspaces for streamlined dependency management.

## Source

-   [Release notes](https://github.com/gleanwork/mcp-config/releases/tag/v4.0.0)

January 10

2026

Clients without a configPath now receive null from buildCommand, preventing errors in protocol-level command construction.

**Read more**

## Changes

-   Fixed buildCommand to return null for clients lacking configPath - Ensures protocol-level stability for clients with missing configuration - Committer: Steve Calvert.

## Source

-   [Release notes](https://github.com/gleanwork/mcp-config-schema/releases/tag/v3.1.1)

January 9

2026

Removed the engines field from configuration and restored Node 20 CI testing.

**Read more**

## Changes

-   Internal change only - No impact on external protocol or config schema - Change committed by Steve Calvert.

## Source

-   [Release notes](https://github.com/gleanwork/configure-mcp-server/releases/tag/v3.0.1)

January 8

2026

This release adds native HTTP transport support for JetBrains (2025.2+), deprecates getNormalizedServersConfig for future removal, corrects the Junie config path, and introduces config validation for Claude Code commands.

**Read more**

## Action Required

-   Plan migration away from deprecated behavior.

## Changes

-   This release adds native HTTP transport support for JetBrains (2025.2+), deprecates getNormalizedServersConfig for future removal, corrects the Junie config path, and introduces config validation for Claude Code commands.

## Source

-   [Release notes](https://github.com/gleanwork/mcp-config-schema/releases/tag/v3.1.0)

January 7

2026

The minimum supported Node.js version is now 22 LTS, and internal dependencies and documentation have been updated.

**Read more**

## Action Required

-   Verify your runtime uses Node.js 22 or later.

## Changes

-   Documentation: Added GA stability badge to README.
-   Internal: Migrated to bintastic and updated config package dependencies.

## Breaking Changes

-   Breaking: Node.js 22 LTS is now required.

## Source

-   [Release notes](https://github.com/gleanwork/configure-mcp-server/releases/tag/v3.0.0)

January 6

2026

Server naming and CLI configuration are now vendor-neutral, with updated terminology and improved type safety in config builders.

**Read more**

## Changes

-   Server naming and CLI configuration are now vendor-neutral, with updated terminology and improved type safety in config builders.

## Source

-   [Release notes](https://github.com/gleanwork/mcp-config-schema/releases/tag/v3.0.0)

January 5

2026

Mcp-config-schema v3.0.0-beta.0.

**Read more**

## Changes

-   Mcp-config-schema v3.0.0-beta.0.

## Source

-   [Release notes](https://github.com/gleanwork/mcp-config-schema/releases/tag/v3.0.0-beta.0)

December 16

2025

Added a migration guide for custom chat frontends to adopt deep-linked citations in the `/chat` API response.

**Read more**

## Action Required

-   Follow the migration notes before upgrading.

## Changes

-   New response format and fields.
-   Minimal vs full migration paths.
-   Code examples (TypeScript/React).
-   Fetching document content for contextual previews.

December 12

2025

Added export size fields to findings export APIs.

**Read more**

## Changes

-   Glean.governance.createfindingsexport(): response.exportsize added - glean.governance.listfindingsexports(): response.exports.\[\].exportSize added.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-typescript/releases/tag/v0.13.18)

Added export\_size to the response of glean.governance.createfindingsexport() and to each export in glean.governance.listfindingsexports().

**Read more**

## Changes

-   Glean.governance.createfindingsexport(): response.export\_size added - glean.governance.listfindingsexports(): response.exports.\[\].export\_size added.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-python/releases/tag/v0.11.25)

Added export size fields to findings export APIs.

**Read more**

## Changes

-   Glean.governance.createfindingsexport(): response.exportsize added - glean.governance.listfindingsexports(): response.exports.\[\].exportSize added.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-java/releases/tag/v0.12.12)

Added ExportSize to the response of Glean.Governance.Createfindingsexport() and to each export in Glean.Governance.Listfindingsexports().

**Read more**

## Changes

-   Glean.Governance.Createfindingsexport(): response.ExportSize added - Glean.Governance.Listfindingsexports(): response.Exports.\[\].ExportSize added.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-go/releases/tag/v0.11.18)

December 11

2025

Updated TypeScript API client to version 0.13.17 based on OpenAPI Doc 0.9.0.

**Read more**

## Changes

-   Reflects changes from OpenAPI Doc 0.9.0 - TypeScript client generated at v0.13.17 - NPM package released at v0.13.17.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-typescript/releases/tag/v0.13.17)

Updated Python API client to version 0.11.24 based on OpenAPI Doc 0.9.0 and Speakeasy CLI 1.675.4 (2.779.2).

**Read more**

## Changes

-   Python client generated at v0.11.24 - Released on PyPI as v0.11.24.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-python/releases/tag/v0.11.24)

Updated Java API client to version 0.12.11 based on OpenAPI Doc 0.9.0.

**Read more**

## Changes

-   Java client generated at v0.12.11 - Released to Maven Central v0.12.11.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-java/releases/tag/v0.12.11)

Updated Go API client to version 0.11.17 based on OpenAPI Doc 0.9.0 and Speakeasy CLI 1.675.4 (2.779.2).

**Read more**

## Changes

-   No additional details about new endpoints, parameters, or breaking changes were provided in these release notes.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-go/releases/tag/v0.11.17)

December 10

2025

Updated TypeScript API client to version 0.13.16 based on OpenAPI Doc 0.9.0.

**Read more**

## Changes

-   Updated TypeScript API client to version 0.13.16 based on OpenAPI Doc 0.9.0.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-typescript/releases/tag/v0.13.16)

New governance findings export endpoints were added, and multiple existing endpoints changed request and response fields related to authorship, roles, attribution, and sensitive content options.

**Read more**

## Changes

-   New governance findings export endpoints were added, and multiple existing endpoints changed request and response fields related to authorship, roles, attribution, and sensitive content options.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-typescript/releases/tag/v0.13.15)

Api-client-python v0.11.23 includes 6 additions, 51 changes.

**Read more**

## Changes

-   Added `response.report.config.sensitive_content_options.custom_sensitive_expressions` to `client.governance.data.policies.retrieve()`.
-   Added `request.config.sensitive_content_options.custom_sensitive_expressions` to `client.governance.data.policies.update()`.
-   Added `response.reports.[].config.sensitive_content_options.custom_sensitive_expressions` to `client.governance.data.policies.list()`.
-   Added `request.config.sensitive_content_options.custom_sensitive_expressions` to `client.governance.data.policies.create()`.
-   Added `response.report.config.sensitive_content_options.custom_sensitive_expressions` to `client.governance.data.policies.create()`.
-   Added `request.config.sensitive_content_options.custom_sensitive_expressions` to `client.governance.data.reports.create()`.
-   Changed `request.body.structured_list.[].document.metadata.author` on `client.announcements.create()`.
-   Changed `response.body.structured_list.[].document.metadata.author` on `client.announcements.create()`.
-   Changed `request.body.structured_list.[].document.metadata.author` on `client.announcements.update()`.
-   Changed `response.body.structured_list.[].document.metadata.author` on `client.announcements.update()`.
-   Changed `request.data.added_roles.[].person` on `client.answers.create()`.
-   Changed `response.added_roles.[].person` on `client.answers.create()`.
-   Changed `request.added_roles.[].person` on `client.answers.update()`.
-   Changed `response.added_roles.[].person` on `client.answers.update()`.
-   Changed `response.answer_result.answer.added_roles.[].person` on `client.answers.retrieve()`.
-   Changed `response.answer_results.[].answer.added_roles.[].person` on `client.answers.list()`.
-   Changed `request.messages.[].citations.[].source_document.metadata.author` on `client.chat.create()`.
-   Changed `response.messages.[].citations.[].source_document.metadata.author` on `client.chat.create()`.
-   Changed `response.chat_result.chat.created_by` on `client.chat.retrieve()`.
-   Changed `response.chat_results.[].chat.created_by` on `client.chat.list()`.
-   Changed `request.messages.[].citations.[].source_document.metadata.author` on `client.chat.create_stream()`.
-   Changed `response.collection.added_roles.[].person` on `client.collections.add_items()`.
-   Changed `request.added_roles.[].person` on `client.collections.create()`.
-   Changed `response.[class].collection.added_roles.[].person` on `client.collections.create()`.
-   Changed `response.collection.added_roles.[].person` on `client.collections.delete_item()`.
-   Changed `request.added_roles.[].person` on `client.collections.update()`.
-   Changed `response.added_roles.[].person` on `client.collections.update()`.
-   Changed `response.collection.added_roles.[].person` on `client.collections.update_item()`.
-   Changed `response.collection.added_roles.[].person` on `client.collections.retrieve()`.
-   Changed `response.collections.[].added_roles.[].person` on `client.collections.list()`.
-   Changed `response.documents.{}.[document].metadata.author` on `client.documents.retrieve()`.
-   Changed `response.documents.[].metadata.author` on `client.documents.retrieve_by_facets()`.
-   Changed `response` on `client.insights.retrieve()`.
-   Changed `response.search_response.results.[].structured_results.[].document.metadata.author` on `client.messages.retrieve()`.
-   Changed `response.attribution` on `client.pins.update()`.
-   Changed `response.pin.attribution` on `client.pins.retrieve()`.
-   Changed `response.pins.[].attribution` on `client.pins.list()`.
-   Changed `response.attribution` on `client.pins.create()`.
-   Changed `request.source_document.metadata.author` on `client.search.query_as_admin()`.
-   Changed `response.results.[].structured_results.[].document.metadata.author` on `client.search.query_as_admin()`.
-   Changed `response.results.[].document.metadata.author` on `client.search.autocomplete()`.
-   Changed `response.results.[].primary_entry.created_by` on `client.search.retrieve_feed()`.
-   Changed `request.source_document.metadata.author` on `client.search.recommendations()`.
-   Changed `response.results.[].structured_results.[].document.metadata.author` on `client.search.recommendations()`.
-   Changed `request.source_document.metadata.author` on `client.search.query()`.
-   Changed `response.results.[].structured_results.[].document.metadata.author` on `client.search.query()`.
-   Changed `response.results.[]` on `client.entities.list()`.
-   Changed `response.results.[]` on `client.entities.read_people()`.
-   Changed `request.data.added_roles.[].person` on `client.shortcuts.create()`.
-   Changed `response.shortcut.added_roles.[].person` on `client.shortcuts.create()`.
-   Changed `response.shortcut.added_roles.[].person` on `client.shortcuts.retrieve()`.
-   Changed `response.shortcuts.[].added_roles.[].person` on `client.shortcuts.list()`.
-   Changed `request.added_roles.[].person` on `client.shortcuts.update()`.
-   Changed `response.shortcut.added_roles.[].person` on `client.shortcuts.update()`.
-   Changed `response.metadata.last_verifier` on `client.verification.add_reminder()`.
-   Changed `response.documents.[].metadata.last_verifier` on `client.verification.list()`.
-   Changed `response.metadata.last_verifier` on `client.verification.verify()`.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-python/releases/tag/v0.11.23)

Api-client-java v0.12.9 includes 6 additions, 51 changes.

**Read more**

## Changes

-   Added `response.report.config.sensitiveContentOptions.customSensitiveExpressions` to `client.governance.data.policies.retrieve()`.
-   Added `request.updatedlpreportrequest.config.sensitiveContentOptions.customSensitiveExpressions` to `client.governance.data.policies.update()`.
-   Added `response.reports.[].config.sensitiveContentOptions.customSensitiveExpressions` to `client.governance.data.policies.list()`.
-   Added `request.config.sensitiveContentOptions.customSensitiveExpressions` to `client.governance.data.policies.create()`.
-   Added `response.report.config.sensitiveContentOptions.customSensitiveExpressions` to `client.governance.data.policies.create()`.
-   Added `request.config.sensitiveContentOptions.customSensitiveExpressions` to `client.governance.data.reports.create()`.
-   Changed `request.body.structuredList.[].document.metadata.author` on `client.announcements.create()`.
-   Changed `response.body.structuredList.[].document.metadata.author` on `client.announcements.create()`.
-   Changed `request.body.structuredList.[].document.metadata.author` on `client.announcements.update()`.
-   Changed `response.body.structuredList.[].document.metadata.author` on `client.announcements.update()`.
-   Changed `request.data.addedRoles.[].person` on `client.answers.create()`.
-   Changed `response.addedroles.[].person` on `client.answers.create()`.
-   Changed `request.addedRoles.[].person` on `client.answers.update()`.
-   Changed `response.addedroles.[].person` on `client.answers.update()`.
-   Changed `response.answerresult.answer.addedRoles.[].person` on `client.answers.retrieve()`.
-   Changed `response.answerresults.[].answer.addedRoles.[].person` on `client.answers.list()`.
-   Changed `request.chatrequest.messages.[].citations.[].sourceDocument.metadata.author` on `client.chat.create()`.
-   Changed `response.messages.[].citations.[].sourceDocument.metadata.author` on `client.chat.create()`.
-   Changed `response.chatresult.chat.createdBy` on `client.chat.retrieve()`.
-   Changed `response.chatresults.[].chat.createdBy` on `client.chat.list()`.
-   Changed `request.chatrequest.messages.[].citations.[].sourceDocument.metadata.author` on `client.chat.createstream()`.
-   Changed `response.collection.addedRoles.[].person` on `client.collections.additems()`.
-   Changed `request.addedRoles.[].person` on `client.collections.create()`.
-   Changed `response.[class].collection.addedRoles.[].person` on `client.collections.create()`.
-   Changed `response.collection.addedRoles.[].person` on `client.collections.deleteitem()`.
-   Changed `request.addedRoles.[].person` on `client.collections.update()`.
-   Changed `response.addedroles.[].person` on `client.collections.update()`.
-   Changed `response.collection.addedRoles.[].person` on `client.collections.updateitem()`.
-   Changed `response.collection.addedRoles.[].person` on `client.collections.retrieve()`.
-   Changed `response.collections.[].addedRoles.[].person` on `client.collections.list()`.
-   Changed `response.documents.{}.[document].metadata.author` on `client.documents.retrieve()`.
-   Changed `response.documents.[].metadata.author` on `client.documents.retrievebyfacets()`.
-   Changed `response` on `client.insights.retrieve()`.
-   Changed `response.searchresponse.results.[].structuredResults.[].document.metadata.author` on `client.messages.retrieve()`.
-   Changed `response.attribution` on `client.pins.update()`.
-   Changed `response.pin.attribution` on `client.pins.retrieve()`.
-   Changed `response.pins.[].attribution` on `client.pins.list()`.
-   Changed `response.attribution` on `client.pins.create()`.
-   Changed `request.sourceDocument.metadata.author` on `client.search.queryasadmin()`.
-   Changed `response.results.[].structuredResults.[].document.metadata.author` on `client.search.queryasadmin()`.
-   Changed `response.results.[].document.metadata.author` on `client.search.autocomplete()`.
-   Changed `response.results.[].primaryEntry.createdBy` on `client.search.retrievefeed()`.
-   Changed `request.sourceDocument.metadata.author` on `client.search.recommendations()`.
-   Changed `response.results.[].structuredResults.[].document.metadata.author` on `client.search.recommendations()`.
-   Changed `request.sourceDocument.metadata.author` on `client.search.query()`.
-   Changed `response.results.[].structuredResults.[].document.metadata.author` on `client.search.query()`.
-   Changed `response.results.[]` on `client.entities.list()`.
-   Changed `response.results.[]` on `client.entities.readpeople()`.
-   Changed `request.data.addedRoles.[].person` on `client.shortcuts.create()`.
-   Changed `response.shortcut.addedRoles.[].person` on `client.shortcuts.create()`.
-   Changed `response.shortcut.addedRoles.[].person` on `client.shortcuts.retrieve()`.
-   Changed `response.shortcuts.[].addedRoles.[].person` on `client.shortcuts.list()`.
-   Changed `request.addedRoles.[].person` on `client.shortcuts.update()`.
-   Changed `response.shortcut.addedRoles.[].person` on `client.shortcuts.update()`.
-   Changed `response.metadata.lastVerifier` on `client.verification.addreminder()`.
-   Changed `response.documents.[].metadata.lastVerifier` on `client.verification.list()`.
-   Changed `response.metadata.lastVerifier` on `client.verification.verify()`.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-java/releases/tag/v0.12.9)

Updated Java API client to version 0.12.10 based on OpenAPI Doc 0.9.0 and Speakeasy CLI 1.675.2.

**Read more**

## Changes

-   Java client v0.12.10 generated - Released to Maven Central v0.12.10.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-java/releases/tag/v0.12.10)

Updated Go API client to version 0.11.16 based on OpenAPI Doc 0.9.0 and Speakeasy CLI 1.675.2 (2.778.5).

**Read more**

## Changes

-   No additional details or breaking changes were specified in the release notes.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-go/releases/tag/v0.11.16)

New governance findings export endpoints were added, and multiple request and response fields were changed across Announcements, Answers, Chat, Collections, Documents, Pins, Search, Entities, Shortcuts, and Verification APIs.

**Read more**

## Changes

-   New governance findings export endpoints were added, and multiple request and response fields were changed across Announcements, Answers, Chat, Collections, Documents, Pins, Search, Entities, Shortcuts, and Verification APIs.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-go/releases/tag/v0.11.15)

December 9

2025

Fixed an issue with the windsurf manual configuration.

**Read more**

## Changes

-   Bug fix for windsurf manual configuration.
-   Committers: David J. Hamilton, Steve Calvert.

## Source

-   [Release notes](https://github.com/gleanwork/mcp-config-schema/releases/tag/v2.0.1)

December 4

2025

Breaking: 2 endpoints removed.

**Read more**

## Action Required

-   Update callers to stop using /custom-metadata/schema/{groupName}.
-   Update callers to stop using /document/{docId}/custom-metadata/{groupName}.

## Changes

-   This release only includes breaking or deprecated changes.

## Breaking Changes

-   Breaking: 2 endpoints removed.
-   Removed endpoint: /custom-metadata/schema/{groupName}.
-   Removed endpoint: /document/{docId}/custom-metadata/{groupName}.

December 1

2025

V0.9.0 was re-released with no additional protocol-level or config schema changes.

**Read more**

## Changes

-   V0.9.0 was re-released with no additional protocol-level or config schema changes.

## Source

-   [Release notes](https://github.com/gleanwork/mcp-server/releases/tag/v0.9.1)

November 26

2025

2 endpoints added.

**Read more**

## Changes

-   Added endpoint: /custom-metadata/schema/{groupName}.
-   Added endpoint: /document/{docId}/custom-metadata/{groupName}.
-   2 endpoints added.

November 25

2025

Upgraded mcp-config-schema to version 2.0.0.

**Read more**

## Changes

-   Enhancement: Updated dependency to mcp-config-schema 2.0.0.
-   Internal: Added CLAUDE.md.

## Source

-   [Release notes](https://github.com/gleanwork/configure-mcp-server/releases/tag/v2.1.0)

November 24

2025

The response.agentsresponse.agentsUsageByDepartmentInsights array in glean.client.insights.retrieve() has changed.

**Read more**

## Changes

-   Review integration for possible breaking changes in this response structure.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-typescript/releases/tag/v0.13.14)

The response.agents\_response.agents\_usage\_by\_department\_insights array in glean.client.insights.retrieve() has changed.

**Read more**

## Changes

-   The response.agents\_response.agents\_usage\_by\_department\_insights array in glean.client.insights.retrieve() has changed.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-python/releases/tag/v0.11.22)

The response.agentsresponse.agentsUsageByDepartmentInsights array in glean.client.insights.retrieve() has changed.

**Read more**

## Changes

-   Review integration for potential breaking changes in this response structure.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-java/releases/tag/v0.12.8)

Changed the structure of response.AgentsResponse.AgentsUsageByDepartmentInsights\[\] in Glean.Client.Insights.Retrieve().

**Read more**

## Changes

-   Changed the structure of response.AgentsResponse.AgentsUsageByDepartmentInsights\[\] in Glean.Client.Insights.Retrieve().

## Source

-   [Release notes](https://github.com/gleanwork/api-client-go/releases/tag/v0.11.14)

November 21

2025

Updated TypeScript API client to version 0.13.13 based on OpenAPI Doc 0.9.0 and Speakeasy CLI 1.660.0.

**Read more**

## Changes

-   TypeScript client generated at v0.13.13 - Release available as NPM package v0.13.13.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-typescript/releases/tag/v0.13.13)

Updated TypeScript API client to version 0.13.12 based on OpenAPI Doc 0.9.0 and Speakeasy CLI 1.660.0.

**Read more**

## Changes

-   Updated TypeScript API client to version 0.13.12 based on OpenAPI Doc 0.9.0 and Speakeasy CLI 1.660.0.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-typescript/releases/tag/v0.13.12)

The response structure of glean.client.insights.retrieve() has changed in a breaking way.

**Read more**

## Action Required

-   Review this breaking change before upgrading: Breaking change: applications using glean.client.insights.retrieve() may require updates to handle the new response format.

## Changes

-   This release only includes breaking or deprecated changes.

## Breaking Changes

-   Breaking change: applications using glean.client.insights.retrieve() may require updates to handle the new response format.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-typescript/releases/tag/v0.13.11)

Updated Python API client to version 0.11.20 based on OpenAPI Doc 0.9.0 and Speakeasy CLI 1.650.0.

**Read more**

## Changes

-   Updated Python API client to version 0.11.20 based on OpenAPI Doc 0.9.0 and Speakeasy CLI 1.650.0.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-python/releases/tag/v0.11.20)

Updated Python API client to version 0.11.18, based on OpenAPI Doc 0.9.0 and Speakeasy CLI 1.650.0.

**Read more**

## Changes

-   Python SDK generated at v0.11.18 - PyPI release published at v0.11.18 - Based on OpenAPI Doc 0.9.0 and Speakeasy CLI 1.650.0.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-python/releases/tag/v0.11.18)

The response structure for glean.client.insights.retrieve() has changed in a breaking way.

**Read more**

## Action Required

-   Review this breaking change before upgrading: Breaking change: applications using this method may require updates to handle the new response format.

## Changes

-   This release only includes breaking or deprecated changes.

## Breaking Changes

-   Breaking change: applications using this method may require updates to handle the new response format.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-python/releases/tag/v0.11.16)

Updated Java API client to version 0.12.7 based on OpenAPI Doc 0.9.0 and Speakeasy CLI 1.660.0.

**Read more**

## Changes

-   Java SDK generated at v0.12.7 - Released to Maven Central v0.12.7.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-java/releases/tag/v0.12.7)

Updated Java API client to version 0.12.6 based on OpenAPI Doc 0.9.0 and Speakeasy CLI 1.660.0.

**Read more**

## Changes

-   Java SDK generated at v0.12.6 - Released to Maven Central v0.12.6.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-java/releases/tag/v0.12.6)

The response object returned by glean.client.insights.retrieve() has changed in a breaking way.

**Read more**

## Changes

-   This is a breaking change and may require updates to client code using this method.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-java/releases/tag/v0.12.5)

Updated Go API client to version 0.11.13 based on OpenAPI Doc 0.9.0 and Speakeasy CLI 1.660.0 (2.760.2).

**Read more**

## Changes

-   Reflects changes from the latest OpenAPI specification - Incorporates updates from recent Speakeasy CLI versions.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-go/releases/tag/v0.11.13)

Updated Go API client to version 0.11.12 based on OpenAPI Doc 0.9.0 and Speakeasy CLI 1.660.0 (2.760.2).

**Read more**

## Changes

-   Reflects changes from the latest OpenAPI specification - Incorporates updates from the latest Speakeasy CLI release.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-go/releases/tag/v0.11.12)

The response object returned by Glean.Client.Insights.Retrieve() has changed in a breaking way.

**Read more**

## Action Required

-   Review this breaking change before upgrading: Breaking change to the response structure - Review integration for compatibility before upgrading.

## Changes

-   This release only includes breaking or deprecated changes.

## Breaking Changes

-   Breaking change to the response structure - Review integration for compatibility before upgrading.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-go/releases/tag/v0.11.11)

November 18

2025

Renamed components for improved semantic clarity, added support for Jetbrains IDEs and Codex, and updated documentation to reflect recent changes.

**Read more**

## Changes

-   Renamed components for improved semantic clarity, added support for Jetbrains IDEs and Codex, and updated documentation to reflect recent changes.

## Source

-   [Release notes](https://github.com/gleanwork/mcp-config-schema/releases/tag/v2.0.0)

November 17

2025

Updated API client to typescript v0.13.10 based on OpenAPI Doc 0.9.0.

**Read more**

## Changes

-   Updated API client to typescript v0.13.10 based on OpenAPI Doc 0.9.0.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-typescript/releases/tag/v0.13.10)

Updated Python API client to version 0.11.14 based on OpenAPI Doc 0.9.0 and Speakeasy CLI 1.650.0.

**Read more**

## Changes

-   Updated Python API client to version 0.11.14 based on OpenAPI Doc 0.9.0 and Speakeasy CLI 1.650.0.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-python/releases/tag/v0.11.14)

Updated Java API client to version 0.12.4 based on OpenAPI Doc 0.9.0 and Speakeasy CLI 1.658.1.

**Read more**

## Changes

-   Java client v0.12.4 generated - Released to Maven Central v0.12.4.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-java/releases/tag/v0.12.4)

Updated Go API client to v0.11.10 based on OpenAPI Doc 0.9.0 and Speakeasy CLI 1.658.1 (2.755.6).

**Read more**

## Changes

-   Reflects changes from OpenAPI Doc 0.9.0 - Generated using Speakeasy CLI 1.658.1 (2.755.6) - Go API client version updated to v0.11.10.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-go/releases/tag/v0.11.10)

November 14

2025

Updated TypeScript API client to version 0.13.9 based on OpenAPI Doc 0.9.0 and Speakeasy CLI 1.657.0.

**Read more**

## Changes

-   Includes all changes from OpenAPI Doc 0.9.0 - Generated TypeScript client at v0.13.9 - Released as NPM package v0.13.9.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-typescript/releases/tag/v0.13.9)

Updated TypeScript API client to version 0.13.8, generated from OpenAPI Doc 0.9.0 using Speakeasy CLI 1.657.0.

**Read more**

## Changes

-   Includes all changes from OpenAPI Doc 0.9.0 - TypeScript SDK now at v0.13.8 - NPM package released as v0.13.8.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-typescript/releases/tag/v0.13.8)

The request.getchatfilesrequest.chatId parameter was removed from glean.client.chat.retrieveFiles(), introducing a breaking change.

**Read more**

## Action Required

-   Review this breaking change before upgrading: Breaking change: chatId parameter is no longer accepted in retrieveFiles() - Update any integrations relying on chatId in this method.

## Changes

-   This release only includes breaking or deprecated changes.

## Breaking Changes

-   Breaking change: chatId parameter is no longer accepted in retrieveFiles() - Update any integrations relying on chatId in this method.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-typescript/releases/tag/v0.13.7)

In glean 0.11.8, the request.chat\_id parameter was removed from glean.client.chat.retrieve\_files(), introducing a breaking change.

**Read more**

## Changes

-   This release only includes breaking or deprecated changes.

## Breaking Changes

-   Breaking: request.chat\_id is no longer accepted in retrieve\_files() - Update any integrations that relied on this parameter to avoid errors.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-python/releases/tag/v0.11.8)

Updated Python API client to version 0.11.12 based on OpenAPI Doc 0.9.0 and Speakeasy CLI 1.650.0.

**Read more**

## Changes

-   Python client generated at v0.11.12 - PyPI release published at v0.11.12.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-python/releases/tag/v0.11.12)

Updated Python API client to version 0.11.10 based on OpenAPI Doc 0.9.0 and Speakeasy CLI 1.650.0.

**Read more**

## Changes

-   Python SDK generated at v0.11.10 - Released to PyPI as v0.11.10.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-python/releases/tag/v0.11.10)

Updated Java API client to version 0.12.3 based on OpenAPI Doc 0.9.0 and Speakeasy CLI 1.657.0.

**Read more**

## Changes

-   Java SDK v0.12.3 generated - Released to Maven Central v0.12.3.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-java/releases/tag/v0.12.3)

The chatId field was removed from request.getchatfilesrequest in glean.client.chat.retrieveFiles(), introducing a breaking change.

**Read more**

## Action Required

-   Review this breaking change before upgrading: Breaking change: chatId parameter is no longer available in retrieveFiles() requests.

## Changes

-   This release only includes breaking or deprecated changes.

## Breaking Changes

-   Breaking change: chatId parameter is no longer available in retrieveFiles() requests.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-java/releases/tag/v0.12.2)

Updated Go API client to v0.11.9 based on OpenAPI Doc 0.9.0 and Speakeasy CLI 1.657.0 (2.755.0).

**Read more**

## Changes

-   Reflects changes from OpenAPI Doc 0.9.0 - Generated using Speakeasy CLI 1.657.0 (2.755.0) - Go API client version updated to v0.11.9.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-go/releases/tag/v0.11.9)

Updated Go API client to version 0.11.8 based on OpenAPI Doc 0.9.0 and Speakeasy CLI 1.657.0.

**Read more**

## Changes

-   Reflects changes from OpenAPI Doc 0.9.0 - Generated using Speakeasy CLI 1.657.0 - Go client now at version 0.11.8.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-go/releases/tag/v0.11.8)

The ChatId field has been removed from request.GetChatFilesRequest in Glean.Client.Chat.RetrieveFiles(), introducing a breaking change.

**Read more**

## Changes

-   This release only includes breaking or deprecated changes.

## Breaking Changes

-   Breaking: request.GetChatFilesRequest.ChatId is no longer available - Update code to remove usage of the ChatId field in RetrieveFiles() requests.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-go/releases/tag/v0.11.7)

November 13

2025

Updated TypeScript API client to version 0.13.6 based on OpenAPI Doc 0.9.0 and Speakeasy CLI 1.656.1 (2.753.1).

**Read more**

## Changes

-   Includes all changes from OpenAPI Doc 0.9.0 - Generated TypeScript client at v0.13.6 - Released as NPM package v0.13.6.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-typescript/releases/tag/v0.13.6)

Updated Python API client to version 0.11.6 based on OpenAPI Doc 0.9.0 and Speakeasy CLI 1.650.0.

**Read more**

## Changes

-   Python SDK generated at v0.11.6 - PyPI release v0.11.6.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-python/releases/tag/v0.11.6)

Updated Java API client to version 0.12.1 based on OpenAPI Doc 0.9.0 and Speakeasy CLI 1.656.1.

**Read more**

## Changes

-   Java client v0.12.1 generated - Released to Maven Central v0.12.1.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-java/releases/tag/v0.12.1)

Updated Go API client to version 0.11.6 based on OpenAPI Doc 0.9.0 and Speakeasy CLI 1.656.1 (2.753.1).

**Read more**

## Changes

-   Reflects changes from OpenAPI Doc 0.9.0 - Generated using Speakeasy CLI 1.656.1 (2.753.1) - Go client now at version 0.11.6.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-go/releases/tag/v0.11.6)

November 11

2025

Updated TypeScript API client to v0.13.5 based on OpenAPI Doc 0.9.0.

**Read more**

## Changes

-   -   Released as NPM package v0.13.5.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-typescript/releases/tag/v0.13.5)

Released java API client v0.12.0 based on OpenAPI Doc 0.9.0 and Speakeasy CLI 1.653.0 (2.748.0).

**Read more**

## Changes

-   Published to Maven Central as v0.12.0.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-java/releases/tag/v0.12.0)

Updated Go API client to version 0.11.5 based on OpenAPI Doc 0.9.0 and Speakeasy CLI 1.653.0 (2.748.0).

**Read more**

## Changes

-   Reflects changes from OpenAPI Doc 0.9.0 - Incorporates updates from Speakeasy CLI 1.653.0 (2.748.0) - Go client now at version 0.11.5.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-go/releases/tag/v0.11.5)

November 7

2025

Updated the TypeScript API client to version 0.13.4 based on OpenAPI Doc 0.9.0.

**Read more**

## Changes

-   TypeScript client regenerated to reflect latest API specification - NPM package released as version 0.13.4.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-typescript/releases/tag/v0.13.4)

Updated Python API client to version 0.11.4 based on OpenAPI Doc 0.9.0 and Speakeasy CLI 1.650.0.

**Read more**

## Changes

-   Python client generated at v0.11.4 - Released on PyPI as v0.11.4.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-python/releases/tag/v0.11.4)

Updated Java API client to version 0.11.4 based on OpenAPI Doc 0.9.0 and Speakeasy CLI 1.650.0.

**Read more**

## Changes

-   Java client v0.11.4 released to Maven Central - Aligned with OpenAPI Doc 0.9.0 specification - Built using Speakeasy CLI 1.650.0.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-java/releases/tag/v0.11.4)

The Go API client was updated to version 0.11.4 based on OpenAPI Doc 0.9.0 and Speakeasy CLI 1.650.0.

**Read more**

## Changes

-   Updated Go client to v0.11.4 - Reflects changes from OpenAPI Doc 0.9.0 - Built using Speakeasy CLI 1.650.0.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-go/releases/tag/v0.11.4)

November 5

2025

Updates Windsurf configuration to support native HTTP.

**Read more**

## Action Required

-   Review this breaking change before upgrading: Breaking change: protocol-level or configuration schema update for Windsurf.

## Changes

-   Enhancement: improved native HTTP support in Windsurf configuration.

## Breaking Changes

-   Breaking change: protocol-level or configuration schema update for Windsurf.

## Source

-   [Release notes](https://github.com/gleanwork/mcp-config-schema/releases/tag/v1.0.0)

Updated TypeScript API client to version 0.13.3 based on OpenAPI Doc 0.9.0 and Speakeasy CLI 1.649.0.

**Read more**

## Changes

-   Generated new TypeScript client version 0.13.3 - Release available as NPM package version 0.13.3.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-typescript/releases/tag/v0.13.3)

Updated Python API client to version 0.11.3 based on OpenAPI Doc 0.9.0 and Speakeasy CLI 1.649.0.

**Read more**

## Changes

-   Python SDK generated at v0.11.3 - Released to PyPI as v0.11.3.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-python/releases/tag/v0.11.3)

Updated Java API client to version 0.11.3 based on OpenAPI Doc 0.9.0 and Speakeasy CLI 1.649.0.

**Read more**

## Changes

-   Java client v0.11.3 generated - Released to Maven Central v0.11.3.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-java/releases/tag/v0.11.3)

Updated Go API client to version 0.11.3 based on OpenAPI Doc 0.9.0 and Speakeasy CLI 1.649.0.

**Read more**

## Changes

-   Reflects changes from OpenAPI Doc 0.9.0 - Generated using Speakeasy CLI 1.649.0 - Go client now at version 0.11.3.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-go/releases/tag/v0.11.3)

October 29

2025

The response.agentsresponse field in glean.client.insights.retrieve() was changed.

**Read more**

## Changes

-   Applies to @gleanwork/api-client version 0.13.2 - Review usage of response.agentsresponse for compatibility.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-typescript/releases/tag/v0.13.2)

The response.agents\_response field in glean.client.insights.retrieve() has changed.

**Read more**

## Changes

-   Review integrations using this field for compatibility - No other changes noted in this release.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-python/releases/tag/v0.11.2)

The response.agentsresponse field in glean.client.insights.retrieve() was changed.

**Read more**

## Changes

-   API response structure for glean.client.insights.retrieve() updated - Review integration for compatibility with the new agentsresponse format.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-java/releases/tag/v0.11.2)

The response type for Glean.Client.Insights.Retrieve() has changed to response.AgentsResponse.

**Read more**

## Action Required

-   Review this breaking change before upgrading: Breaking change to the Insights.Retrieve() method response type - Review integrations using Insights.Retrieve() for compatibility - No new endpoints or parameters introduced in this release.

## Changes

-   This release only includes breaking or deprecated changes.

## Breaking Changes

-   Breaking change to the Insights.Retrieve() method response type - Review integrations using Insights.Retrieve() for compatibility - No new endpoints or parameters introduced in this release.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-go/releases/tag/v0.11.2)

October 28

2025

Added support for the .chat field in relatedDocuments.structuredResults across multiple API endpoints and updated the response structure for glean.client.documents.retrieve().

**Read more**

## Changes

-   Added support for the .chat field in relatedDocuments.structuredResults across multiple API endpoints and updated the response structure for glean.client.documents.retrieve().

## Source

-   [Release notes](https://github.com/gleanwork/api-client-typescript/releases/tag/v0.13.1)

Added support for the .chat field in relatedDocuments structured results across multiple API endpoints, and changed the response structure for glean.client.documents.retrieve().

**Read more**

## Changes

-   Added support for the .chat field in relatedDocuments structured results across multiple API endpoints, and changed the response structure for glean.client.documents.retrieve().

## Source

-   [Release notes](https://github.com/gleanwork/api-client-java/releases/tag/v0.11.1)

Api-client-go v0.11.1 includes 50 additions, 1 change.

**Read more**

## Changes

-   Added `request.Request.Body.StructuredList.[].Document.Metadata.Author.RelatedDocuments.[].Results.[].StructuredResults.[].Chat` to `client.announcements.create()`.
-   Added `response.Body.StructuredList.[].Document.Metadata.Author.RelatedDocuments.[].Results.[].StructuredResults.[].Chat` to `client.announcements.create()`.
-   Added `request.Request.Body.StructuredList.[].Document.Metadata.Author.RelatedDocuments.[].Results.[].StructuredResults.[].Chat` to `client.announcements.update()`.
-   Added `response.Body.StructuredList.[].Document.Metadata.Author.RelatedDocuments.[].Results.[].StructuredResults.[].Chat` to `client.announcements.update()`.
-   Added `request.Request.Data.AddedRoles.[].Person.RelatedDocuments.[].Results.[].StructuredResults.[].Chat` to `client.answers.create()`.
-   Added `response.AddedRoles.[].Person.RelatedDocuments.[].Results.[].StructuredResults.[].Chat` to `client.answers.create()`.
-   Added `request.Request.AddedRoles.[].Person.RelatedDocuments.[].Results.[].StructuredResults.[].Chat` to `client.answers.update()`.
-   Added `response.AddedRoles.[].Person.RelatedDocuments.[].Results.[].StructuredResults.[].Chat` to `client.answers.update()`.
-   Added `response.AnswerResult.Answer.AddedRoles.[].Person.RelatedDocuments.[].Results.[].StructuredResults.[].Chat` to `client.answers.retrieve()`.
-   Added `response.AnswerResults.[].Answer.AddedRoles.[].Person.RelatedDocuments.[].Results.[].StructuredResults.[].Chat` to `client.answers.list()`.
-   Added `request.ChatRequest.Messages.[].Citations.[].SourceDocument.Metadata.Author.RelatedDocuments.[].Results.[].StructuredResults.[].Chat` to `client.chat.create()`.
-   Added `response.Messages.[].Citations.[].SourceDocument.Metadata.Author.RelatedDocuments.[].Results.[].StructuredResults.[].Chat` to `client.chat.create()`.
-   Added `response.ChatResult.Chat.CreatedBy.RelatedDocuments.[].Results.[].StructuredResults.[].Chat` to `client.chat.retrieve()`.
-   Added `response.ChatResults.[].Chat.CreatedBy.RelatedDocuments.[].Results.[].StructuredResults.[].Chat` to `client.chat.list()`.
-   Added `request.ChatRequest.Messages.[].Citations.[].SourceDocument.Metadata.Author.RelatedDocuments.[].Results.[].StructuredResults.[].Chat` to `client.chat.createstream()`.
-   Added `response.Collection.AddedRoles.[].Person.RelatedDocuments.[].Results.[].StructuredResults.[].Chat` to `client.collections.additems()`.
-   Added `request.Request.AddedRoles.[].Person.RelatedDocuments.[].Results.[].StructuredResults.[].Chat` to `client.collections.create()`.
-   Added `response.[class].Collection.AddedRoles.[].Person.RelatedDocuments.[].Results.[].StructuredResults.[].Chat` to `client.collections.create()`.
-   Added `response.Collection.AddedRoles.[].Person.RelatedDocuments.[].Results.[].StructuredResults.[].Chat` to `client.collections.deleteitem()`.
-   Added `request.Request.AddedRoles.[].Person.RelatedDocuments.[].Results.[].StructuredResults.[].Chat` to `client.collections.update()`.
-   Added `response.AddedRoles.[].Person.RelatedDocuments.[].Results.[].StructuredResults.[].Chat` to `client.collections.update()`.
-   Added `response.Collection.AddedRoles.[].Person.RelatedDocuments.[].Results.[].StructuredResults.[].Chat` to `client.collections.updateitem()`.
-   Added `response.Collection.AddedRoles.[].Person.RelatedDocuments.[].Results.[].StructuredResults.[].Chat` to `client.collections.retrieve()`.
-   Added `response.Collections.[].AddedRoles.[].Person.RelatedDocuments.[].Results.[].StructuredResults.[].Chat` to `client.collections.list()`.
-   Added `response.Documents.[].Metadata.Author.RelatedDocuments.[].Results.[].StructuredResults.[].Chat` to `client.documents.retrievebyfacets()`.
-   Added `response.Users.ActivityInsights.[].User.RelatedDocuments.[].Results.[].StructuredResults.[].Chat` to `client.insights.retrieve()`.
-   Added `response.SearchResponse.Results.[].StructuredResults.[].Chat` to `client.messages.retrieve()`.
-   Added `response.Attribution.RelatedDocuments.[].Results.[].StructuredResults.[].Chat` to `client.pins.update()`.
-   Added `response.Pin.Attribution.RelatedDocuments.[].Results.[].StructuredResults.[].Chat` to `client.pins.retrieve()`.
-   Added `response.Pins.[].Attribution.RelatedDocuments.[].Results.[].StructuredResults.[].Chat` to `client.pins.list()`.
-   Added `response.Attribution.RelatedDocuments.[].Results.[].StructuredResults.[].Chat` to `client.pins.create()`.
-   Added `request.Request.SourceDocument.Metadata.Author.RelatedDocuments.[].Results.[].StructuredResults.[].Chat` to `client.search.queryasadmin()`.
-   Added `response.Results.[].StructuredResults.[].Chat` to `client.search.queryasadmin()`.
-   Added `response.Results.[].Document.Metadata.Author.RelatedDocuments.[].Results.[].StructuredResults.[].Chat` to `client.search.autocomplete()`.
-   Added `response.Results.[].PrimaryEntry.CreatedBy.RelatedDocuments.[].Results.[].StructuredResults.[].Chat` to `client.search.retrievefeed()`.
-   Added `request.Request.SourceDocument.Metadata.Author.RelatedDocuments.[].Results.[].StructuredResults.[].Chat` to `client.search.recommendations()`.
-   Added `response.Results.[].StructuredResults.[].Chat` to `client.search.recommendations()`.
-   Added `request.Request.SourceDocument.Metadata.Author.RelatedDocuments.[].Results.[].StructuredResults.[].Chat` to `client.search.query()`.
-   Added `response.Results.[].StructuredResults.[].Chat` to `client.search.query()`.
-   Added `response.Results.[].RelatedDocuments.[].Results.[].StructuredResults.[].Chat` to `client.entities.list()`.
-   Added `response.Results.[].RelatedDocuments.[].Results.[].StructuredResults.[].Chat` to `client.entities.readpeople()`.
-   Added `request.Request.Data.AddedRoles.[].Person.RelatedDocuments.[].Results.[].StructuredResults.[].Chat` to `client.shortcuts.create()`.
-   Added `response.Shortcut.AddedRoles.[].Person.RelatedDocuments.[].Results.[].StructuredResults.[].Chat` to `client.shortcuts.create()`.
-   Added `response.Shortcut.AddedRoles.[].Person.RelatedDocuments.[].Results.[].StructuredResults.[].Chat` to `client.shortcuts.retrieve()`.
-   Added `response.Shortcuts.[].AddedRoles.[].Person.RelatedDocuments.[].Results.[].StructuredResults.[].Chat` to `client.shortcuts.list()`.
-   Added `request.Request.AddedRoles.[].Person.RelatedDocuments.[].Results.[].StructuredResults.[].Chat` to `client.shortcuts.update()`.
-   Added `response.Shortcut.AddedRoles.[].Person.RelatedDocuments.[].Results.[].StructuredResults.[].Chat` to `client.shortcuts.update()`.
-   Added `response.Metadata.LastVerifier.RelatedDocuments.[].Results.[].StructuredResults.[].Chat` to `client.verification.addreminder()`.
-   Added `response.Documents.[].Metadata.LastVerifier.RelatedDocuments.[].Results.[].StructuredResults.[].Chat` to `client.verification.list()`.
-   Added `response.Metadata.LastVerifier.RelatedDocuments.[].Results.[].StructuredResults.[].Chat` to `client.verification.verify()`.
-   Changed `response.Documents.{}` on `client.documents.retrieve()`.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-go/releases/tag/v0.11.1)

October 26

2025

The CLI now uses commander.js instead of meow, improving subcommand support and updating documentation for accuracy.

**Read more**

## Changes

-   Refactored CLI to use commander.js for enhanced subcommand handling.
-   Updated README.md for accurate information.
-   Improved init help documentation to match current Claude output.

## Source

-   [Release notes](https://github.com/gleanwork/configure-mcp-server/releases/tag/v2.0.0)

October 25

2025

Moved zod to peerDependencies to support both v3 and v4, and updated documentation links for supported hosts.

**Read more**

## Changes

-   Moved zod to peerDependencies to support both v3 and v4, and updated documentation links for supported hosts.

## Source

-   [Release notes](https://github.com/gleanwork/mcp-config-schema/releases/tag/v0.14.0)

October 22

2025

Added support for the useImageGeneration field in chat message agentConfig for create, retrieve, and createStream chat API methods.

**Read more**

## Changes

-   Added support for the useImageGeneration field in chat message agentConfig for create, retrieve, and createStream chat API methods.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-typescript/releases/tag/v0.13.0)

Added support for the use\_image\_generation field in agent\_config for chat creation, retrieval, and streaming APIs.

**Read more**

## Changes

-   Added support for the use\_image\_generation field in agent\_config for chat creation, retrieval, and streaming APIs.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-python/releases/tag/v0.11.0)

Added support for the useImageGeneration field in chat message agentConfig for create, retrieve, and createStream chat API methods.

**Read more**

## Changes

-   Added support for the useImageGeneration field in chat message agentConfig for create, retrieve, and createStream chat API methods.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-java/releases/tag/v0.11.0)

Added support for the UseImageGeneration field in chat message agent configuration for create, retrieve, and stream chat operations.

**Read more**

## Changes

-   Added support for the UseImageGeneration field in chat message agent configuration for create, retrieve, and stream chat operations.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-go/releases/tag/v0.11.0)

October 16

2025

The request.datasource parameter in glean.client.messages.retrieve() was changed. This is a breaking change.

**Read more**

## Action Required

-   Review this breaking change before upgrading: Breaking change to request.datasource in messages.retrieve() - Review usage of request.datasource to ensure compatibility.

## Changes

-   This release only includes breaking or deprecated changes.

## Breaking Changes

-   Breaking change to request.datasource in messages.retrieve() - Review usage of request.datasource to ensure compatibility.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-typescript/releases/tag/v0.12.3)

The request.datasource parameter in glean.client.messages.retrieve() has changed, introducing a breaking change.

**Read more**

## Action Required

-   Review this breaking change before upgrading: Breaking change to request.datasource in messages.retrieve() - Review usage of request.datasource to ensure compatibility - Update client integrations as needed.

## Changes

-   This release only includes breaking or deprecated changes.

## Breaking Changes

-   Breaking change to request.datasource in messages.retrieve() - Review usage of request.datasource to ensure compatibility - Update client integrations as needed.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-python/releases/tag/v0.10.3)

The request.datasource parameter in glean.client.messages.retrieve() was changed, introducing a breaking change.

**Read more**

## Action Required

-   Review this breaking change before upgrading: Breaking change to request.datasource in retrieve() method - Review usage of request.datasource to ensure compatibility.

## Changes

-   This release only includes breaking or deprecated changes.

## Breaking Changes

-   Breaking change to request.datasource in retrieve() method - Review usage of request.datasource to ensure compatibility.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-java/releases/tag/v0.10.7)

The Datasource field in request.Request for Glean.Client.Messages.Retrieve() was changed, introducing a breaking change.

**Read more**

## Action Required

-   Review this breaking change before upgrading: Breaking change: request.Request.Datasource modified in Glean.Client.Messages.Retrieve() - Review usage of Datasource in your integration for compatibility.

## Changes

-   This release only includes breaking or deprecated changes.

## Breaking Changes

-   Breaking change: request.Request.Datasource modified in Glean.Client.Messages.Retrieve() - Review usage of Datasource in your integration for compatibility.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-go/releases/tag/v0.10.3)

October 10

2025

The response.results.\[\].primaryEntry.digest.sections.\[\].updates.\[\].urls field was added to the output of glean.client.search.retrieveFeed().

**Read more**

## Changes

-   New urls field now available within updates in the retrieveFeed() response - No breaking changes introduced - No changes to authentication or pagination.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-typescript/releases/tag/v0.12.2)

Added the urls field to response.results.\[\].primary\_entry.digest.sections.\[\].updates in glean.client.search.retrieve\_feed().

**Read more**

## Changes

-   New urls field now available in the updates objects of the API response - No breaking changes introduced - Applies to glean 0.10.2 API client.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-python/releases/tag/v0.10.2)

A new field, response.results.\[\].primaryEntry.digest.sections.\[\].updates.\[\].urls, was added to the output of glean.client.search.retrieveFeed().

**Read more**

## Changes

-   Added urls field to updates within digest sections in retrieveFeed() response.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-java/releases/tag/v0.10.6)

Added the Urls field to response.Results.\[\].PrimaryEntry.Digest.Sections.\[\].Updates in Glean.Client.Search.RetrieveFeed().

**Read more**

## Changes

-   Enables access to URLs within update sections of feed results - No breaking changes introduced - Applies to API client version 0.10.2.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-go/releases/tag/v0.10.2)

October 9

2025

The response.agentsresponse.topAgentsInsights.\[\].icon field was added to the output of glean.client.insights.retrieve().

**Read more**

## Changes

-   New icon field now available in topAgentsInsights response - No breaking changes introduced - Applies to @gleanwork/api-client version 0.12.1.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-typescript/releases/tag/v0.12.1)

The response.agents\_response.top\_agents\_insights array in glean.client.insights.retrieve() now includes the icon field.

**Read more**

## Changes

-   Added icon field to top\_agents\_insights in API response.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-python/releases/tag/v0.10.1)

The response.agentsresponse.topAgentsInsights.\[\].icon field was added to glean.client.insights.retrieve().

**Read more**

## Changes

-   New response field: icon in topAgentsInsights array - No breaking changes or new endpoints introduced.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-java/releases/tag/v0.10.5)

The Icon field was added to response.AgentsResponse.TopAgentsInsights in Glean.Client.Insights.Retrieve().

**Read more**

## Changes

-   New Icon field now available in TopAgentsInsights response - No breaking changes introduced - Enhances agent insights data with icon information.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-go/releases/tag/v0.10.1)

October 7

2025

Breaking: 1 endpoint removed.

**Read more**

## Action Required

-   Update callers to stop using /api/index/v1/debug/{datasource}/document/events.

## Changes

-   This release only includes breaking or deprecated changes.

## Breaking Changes

-   Breaking: 1 endpoint removed.
-   Removed endpoint: /api/index/v1/debug/{datasource}/document/events.

The response object returned by glean.client.insights.retrieve() has changed.

**Read more**

## Changes

-   Review integration code for compatibility with the updated response structure.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-typescript/releases/tag/v0.12.0)

The response of glean.client.insights.retrieve() has changed.

**Read more**

## Changes

-   Review integrations using glean.client.insights.retrieve() for compatibility - Update client code if relying on previous response structure.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-python/releases/tag/v0.10.0)

The response of glean.client.insights.retrieve() has changed.

**Read more**

## Changes

-   Review integration for possible breaking changes in the response structure.
-   No new endpoints or parameters introduced.
-   Check for updates in response handling logic.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-java/releases/tag/v0.10.4)

The response object returned by Glean.Client.Insights.Retrieve() has changed.

**Read more**

## Changes

-   Review integrations using this method for compatibility - Update client code to handle the new response structure if needed.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-go/releases/tag/v0.10.0)

October 1

2025

Breaking: 2 endpoints added, 3 endpoints removed.

**Read more**

## Action Required

-   Update callers to stop using /debug/{datasource}/document/events.
-   Update callers to stop using /update/{datasource}/extenddeletionpaused.
-   Update callers to stop using /update/{datasource}/resolvedeletionpaused.

## Changes

-   Added endpoint: /update/{datasource}/extenddeletionpaused.
-   Added endpoint: /update/{datasource}/resolvedeletionpaused.

## Breaking Changes

-   Breaking: 2 endpoints added, 3 endpoints removed.
-   Removed endpoint: /debug/{datasource}/document/events.
-   Removed endpoint: /update/{datasource}/extenddeletionpaused.
-   Removed endpoint: /update/{datasource}/resolvedeletionpaused.

Updated TypeScript API client to version 0.11.2 based on OpenAPI Doc 0.9.0.

**Read more**

## Changes

-   Includes latest changes from OpenAPI specification 0.9.0 - TypeScript SDK now at v0.11.2 - NPM package released as v0.11.2.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-typescript/releases/tag/v0.11.2)

Api-client-typescript v0.11.1 includes 51 additions.

**Read more**

## Changes

-   Added `request.body.structuredList.[].document.metadata.author.relatedDocuments.[].results.[].structuredResults.[].generatedQna.followupActions.[].parameters` to `client.announcements.create()`.
-   Added `response.body.structuredList.[].document.metadata.author.relatedDocuments.[].results.[].structuredResults.[].generatedQna.followupActions.[].parameters` to `client.announcements.create()`.
-   Added `request.body.structuredList.[].document.metadata.author.relatedDocuments.[].results.[].structuredResults.[].generatedQna.followupActions.[].parameters` to `client.announcements.update()`.
-   Added `response.body.structuredList.[].document.metadata.author.relatedDocuments.[].results.[].structuredResults.[].generatedQna.followupActions.[].parameters` to `client.announcements.update()`.
-   Added `request.data.addedRoles.[].person.relatedDocuments.[].results.[].structuredResults.[].generatedQna.followupActions.[].parameters` to `client.answers.create()`.
-   Added `response.addedroles.[].person.relatedDocuments.[].results.[].structuredResults.[].generatedQna.followupActions.[].parameters` to `client.answers.create()`.
-   Added `request.addedRoles.[].person.relatedDocuments.[].results.[].structuredResults.[].generatedQna.followupActions.[].parameters` to `client.answers.update()`.
-   Added `response.addedroles.[].person.relatedDocuments.[].results.[].structuredResults.[].generatedQna.followupActions.[].parameters` to `client.answers.update()`.
-   Added `response.answerresult.answer.addedRoles.[].person.relatedDocuments.[].results.[].structuredResults.[].generatedQna.followupActions.[].parameters` to `client.answers.retrieve()`.
-   Added `response.answerresults.[].answer.addedRoles.[].person.relatedDocuments.[].results.[].structuredResults.[].generatedQna.followupActions.[].parameters` to `client.answers.list()`.
-   Added `request.chatrequest.messages.[].citations.[].sourceDocument.metadata.author.relatedDocuments.[].results.[].structuredResults.[].generatedQna.followupActions.[].parameters` to `client.chat.create()`.
-   Added `response.messages.[].citations.[].sourceDocument.metadata.author.relatedDocuments.[].results.[].structuredResults.[].generatedQna.followupActions.[].parameters` to `client.chat.create()`.
-   Added `response.chatresult.chat.createdBy.relatedDocuments.[].results.[].structuredResults.[].generatedQna.followupActions.[].parameters` to `client.chat.retrieve()`.
-   Added `response.chatresults.[].chat.createdBy.relatedDocuments.[].results.[].structuredResults.[].generatedQna.followupActions.[].parameters` to `client.chat.list()`.
-   Added `request.chatrequest.messages.[].citations.[].sourceDocument.metadata.author.relatedDocuments.[].results.[].structuredResults.[].generatedQna.followupActions.[].parameters` to `client.chat.createstream()`.
-   Added `response.collection.addedRoles.[].person.relatedDocuments.[].results.[].structuredResults.[].generatedQna.followupActions.[].parameters` to `client.collections.additems()`.
-   Added `request.addedRoles.[].person.relatedDocuments.[].results.[].structuredResults.[].generatedQna.followupActions.[].parameters` to `client.collections.create()`.
-   Added `response.[class].collection.addedRoles.[].person.relatedDocuments.[].results.[].structuredResults.[].generatedQna.followupActions.[].parameters` to `client.collections.create()`.
-   Added `response.collection.addedRoles.[].person.relatedDocuments.[].results.[].structuredResults.[].generatedQna.followupActions.[].parameters` to `client.collections.deleteitem()`.
-   Added `request.addedRoles.[].person.relatedDocuments.[].results.[].structuredResults.[].generatedQna.followupActions.[].parameters` to `client.collections.update()`.
-   Added `response.addedroles.[].person.relatedDocuments.[].results.[].structuredResults.[].generatedQna.followupActions.[].parameters` to `client.collections.update()`.
-   Added `response.collection.addedRoles.[].person.relatedDocuments.[].results.[].structuredResults.[].generatedQna.followupActions.[].parameters` to `client.collections.updateitem()`.
-   Added `response.collection.addedRoles.[].person.relatedDocuments.[].results.[].structuredResults.[].generatedQna.followupActions.[].parameters` to `client.collections.retrieve()`.
-   Added `response.collections.[].addedRoles.[].person.relatedDocuments.[].results.[].structuredResults.[].generatedQna.followupActions.[].parameters` to `client.collections.list()`.
-   Added `response.documents.{}.[document].metadata.author.relatedDocuments.[].results.[].structuredResults.[].generatedQna.followupActions.[].parameters` to `client.documents.retrieve()`.
-   Added `response.documents.[].metadata.author.relatedDocuments.[].results.[].structuredResults.[].generatedQna.followupActions.[].parameters` to `client.documents.retrievebyfacets()`.
-   Added `response.users.activityInsights.[].user.relatedDocuments.[].results.[].structuredResults.[].generatedQna.followupActions.[].parameters` to `client.insights.retrieve()`.
-   Added `response.searchresponse.results.[].structuredResults.[].generatedQna.followupActions.[].parameters` to `client.messages.retrieve()`.
-   Added `response.attribution.relatedDocuments.[].results.[].structuredResults.[].generatedQna.followupActions.[].parameters` to `client.pins.update()`.
-   Added `response.pin.attribution.relatedDocuments.[].results.[].structuredResults.[].generatedQna.followupActions.[].parameters` to `client.pins.retrieve()`.
-   Added `response.pins.[].attribution.relatedDocuments.[].results.[].structuredResults.[].generatedQna.followupActions.[].parameters` to `client.pins.list()`.
-   Added `response.attribution.relatedDocuments.[].results.[].structuredResults.[].generatedQna.followupActions.[].parameters` to `client.pins.create()`.
-   Added `request.sourceDocument.metadata.author.relatedDocuments.[].results.[].structuredResults.[].generatedQna.followupActions.[].parameters` to `client.search.queryasadmin()`.
-   Added `response.results.[].structuredResults.[].generatedQna.followupActions.[].parameters` to `client.search.queryasadmin()`.
-   Added `response.results.[].document.metadata.author.relatedDocuments.[].results.[].structuredResults.[].generatedQna.followupActions.[].parameters` to `client.search.autocomplete()`.
-   Added `response.results.[].primaryEntry.createdBy.relatedDocuments.[].results.[].structuredResults.[].generatedQna.followupActions.[].parameters` to `client.search.retrievefeed()`.
-   Added `request.sourceDocument.metadata.author.relatedDocuments.[].results.[].structuredResults.[].generatedQna.followupActions.[].parameters` to `client.search.recommendations()`.
-   Added `response.results.[].structuredResults.[].generatedQna.followupActions.[].parameters` to `client.search.recommendations()`.
-   Added `request.sourceDocument.metadata.author.relatedDocuments.[].results.[].structuredResults.[].generatedQna.followupActions.[].parameters` to `client.search.query()`.
-   Added `response.results.[].structuredResults.[].generatedQna.followupActions.[].parameters` to `client.search.query()`.
-   Added `response.results.[].relatedDocuments.[].results.[].structuredResults.[].generatedQna.followupActions.[].parameters` to `client.entities.list()`.
-   Added `response.results.[].relatedDocuments.[].results.[].structuredResults.[].generatedQna.followupActions.[].parameters` to `client.entities.readpeople()`.
-   Added `request.data.addedRoles.[].person.relatedDocuments.[].results.[].structuredResults.[].generatedQna.followupActions.[].parameters` to `client.shortcuts.create()`.
-   Added `response.shortcut.addedRoles.[].person.relatedDocuments.[].results.[].structuredResults.[].generatedQna.followupActions.[].parameters` to `client.shortcuts.create()`.
-   Added `response.shortcut.addedRoles.[].person.relatedDocuments.[].results.[].structuredResults.[].generatedQna.followupActions.[].parameters` to `client.shortcuts.retrieve()`.
-   Added `response.shortcuts.[].addedRoles.[].person.relatedDocuments.[].results.[].structuredResults.[].generatedQna.followupActions.[].parameters` to `client.shortcuts.list()`.
-   Added `request.addedRoles.[].person.relatedDocuments.[].results.[].structuredResults.[].generatedQna.followupActions.[].parameters` to `client.shortcuts.update()`.
-   Added `response.shortcut.addedRoles.[].person.relatedDocuments.[].results.[].structuredResults.[].generatedQna.followupActions.[].parameters` to `client.shortcuts.update()`.
-   Added `response.metadata.lastVerifier.relatedDocuments.[].results.[].structuredResults.[].generatedQna.followupActions.[].parameters` to `client.verification.addreminder()`.
-   Added `response.documents.[].metadata.lastVerifier.relatedDocuments.[].results.[].structuredResults.[].generatedQna.followupActions.[].parameters` to `client.verification.list()`.
-   Added `response.metadata.lastVerifier.relatedDocuments.[].results.[].structuredResults.[].generatedQna.followupActions.[].parameters` to `client.verification.verify()`.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-typescript/releases/tag/v0.11.1)

Updated Python API client to version 0.9.3 based on OpenAPI Doc 0.9.0.

**Read more**

## Changes

-   Python SDK generated at v0.9.3 - PyPI release published at v0.9.3.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-python/releases/tag/v0.9.3)

A new 'parameters' field was added to multiple request and response objects across many glean client API methods.

**Read more**

## Changes

-   A new 'parameters' field was added to multiple request and response objects across many glean client API methods.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-python/releases/tag/v0.9.2)

Updated Java API client to version 0.10.3 based on OpenAPI Doc 0.9.0.

**Read more**

## Changes

-   Java SDK generated at v0.10.3 - Released to Maven Central as v0.10.3.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-java/releases/tag/v0.10.3)

Added new parameters field to followupActions in multiple API request and response objects across announcements, answers, chat, collections, documents, insights, messages, pins, search, entities, shortcuts, and verification endpoints.

**Read more**

## Changes

-   Added new parameters field to followupActions in multiple API request and response objects across announcements, answers, chat, collections, documents, insights, messages, pins, search, entities, shortcuts, and verification endpoints.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-java/releases/tag/v0.10.2)

Updated Go API client to version 0.9.5 based on OpenAPI Doc 0.9.0 and Speakeasy CLI 1.633.1 (2.720.1).

**Read more**

## Changes

-   Updated Go API client to version 0.9.5 based on OpenAPI Doc 0.9.0 and Speakeasy CLI 1.633.1 (2.720.1).

## Source

-   [Release notes](https://github.com/gleanwork/api-client-go/releases/tag/v0.9.5)

Added the FollowupActions.Parameters field to multiple request and response objects across Announcements, Answers, Chat, Collections, Documents, Insights, Messages, Pins, Search, Entities, Shortcuts, and Verification API methods.

**Read more**

## Changes

-   Added the FollowupActions.Parameters field to multiple request and response objects across Announcements, Answers, Chat, Collections, Documents, Insights, Messages, Pins, Search, Entities, Shortcuts, and Verification API methods.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-go/releases/tag/v0.9.4)

September 30

2025

1 endpoint added.

**Read more**

## Changes

-   Added endpoint: /api/index/v1/debug/{datasource}/document/events.
-   1 endpoint added.

Updated TypeScript API client to version 0.11.0 based on OpenAPI Doc 0.9.0.

**Read more**

## Changes

-   Includes all changes from OpenAPI Doc 0.9.0 - - Published as NPM package v0.11.0.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-typescript/releases/tag/v0.11.0)

The request parameter in glean.client.insights.retrieve() was changed.

**Read more**

## Action Required

-   Review this breaking change before upgrading: Breaking change to the request parameter or object - Review usage of glean.client.insights.retrieve() for compatibility.

## Changes

-   This release only includes breaking or deprecated changes.

## Breaking Changes

-   Breaking change to the request parameter or object - Review usage of glean.client.insights.retrieve() for compatibility.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-typescript/releases/tag/v0.10.5)

Updated Python API client to v0.9.1 based on OpenAPI Doc 0.9.0 and Speakeasy CLI 1.631.5 (2.716.16).

**Read more**

## Changes

-   Python client generated at version 0.9.1 - Released on PyPI as v0.9.1.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-python/releases/tag/v0.9.1)

Updated Java API client to version 0.10.1 based on OpenAPI Doc 0.9.0 and Speakeasy CLI 1.631.5 (2.716.16).

**Read more**

## Changes

-   Java client v0.10.1 generated - Released to Maven Central v0.10.1.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-java/releases/tag/v0.10.1)

Updated Go API client to v0.9.3 based on OpenAPI Doc 0.9.0.

**Read more**

## Changes

-   Reflects changes from OpenAPI Doc 0.9.0 - Go client generated at version v0.9.3.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-go/releases/tag/v0.9.3)

September 29

2025

The request parameter for glean.client.insights.retrieve() was changed.

**Read more**

## Changes

-   Review usage of glean.client.insights.retrieve() to ensure compatibility with the updated request parameter.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-python/releases/tag/v0.9.0)

The request structure for glean.client.insights.retrieve() was changed.

**Read more**

## Action Required

-   Review this breaking change before upgrading: Breaking change to the request parameters for glean.client.insights.retrieve() - Review usage of glean.client.insights.retrieve() to ensure compatibility.

## Changes

-   This release only includes breaking or deprecated changes.

## Breaking Changes

-   Breaking change to the request parameters for glean.client.insights.retrieve() - Review usage of glean.client.insights.retrieve() to ensure compatibility.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-java/releases/tag/v0.10.0)

The request.Request parameter for Glean.Client.Insights.Retrieve() was changed.

**Read more**

## Action Required

-   Review this breaking change before upgrading: Breaking change to the request.Request parameter in Insights.Retrieve() - Review usage of Insights.Retrieve() for compatibility with this update.

## Changes

-   This release only includes breaking or deprecated changes.

## Breaking Changes

-   Breaking change to the request.Request parameter in Insights.Retrieve() - Review usage of Insights.Retrieve() for compatibility with this update.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-go/releases/tag/v0.9.2)

September 26

2025

1 endpoint added.

**Read more**

## Changes

-   Added endpoint: /debug/{datasource}/document/events.
-   1 endpoint added.

September 25

2025

Added the channelType field to response.results.\[\].primaryEntry.digest.sections in glean.client.search.retrieveFeed().

**Read more**

## Changes

-   New response field: channelType - No breaking changes - Applies to retrieveFeed() method in the search client.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-typescript/releases/tag/v0.10.3)

The response object for glean.client.search.retrieve\_feed() now includes the channel\_type field in response.results.\[\].primary\_entry.digest.sections.

**Read more**

## Changes

-   Added channel\_type to response.results.\[\].primary\_entry.digest.sections in retrieve\_feed().

## Source

-   [Release notes](https://github.com/gleanwork/api-client-python/releases/tag/v0.8.1)

The response object for glean.client.search.retrieveFeed() now includes the channelType field in response.results.\[\].primaryEntry.digest.sections.

**Read more**

## Changes

-   Added response.results.\[\].primaryEntry.digest.sections.\[\].channelType to the API response.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-java/releases/tag/v0.9.1)

Added the ChannelType field to response.Results.\[\].PrimaryEntry.Digest.Sections in Glean.Client.Search.RetrieveFeed().

**Read more**

## Changes

-   New ChannelType field is now included in the RetrieveFeed response structure.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-go/releases/tag/v0.9.1)

September 24

2025

Breaking changes to multiple request and response fields across document, answer, shortcut, chat, search, announcement, collection, and verification APIs; new parameter added to chat file retrieval.

**Read more**

## Action Required

-   Review this breaking change before upgrading: Breaking changes to multiple request and response fields across document, answer, shortcut, chat, search, announcement, collection, and verification APIs; new parameter added to chat file retrieval.

## Changes

-   This release only includes breaking or deprecated changes.

## Breaking Changes

-   Breaking changes to multiple request and response fields across document, answer, shortcut, chat, search, announcement, collection, and verification APIs; new parameter added to chat file retrieval.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-typescript/releases/tag/v0.10.1)

Breaking changes to multiple API endpoints, including request and response field modifications, and a new parameter added to chat file retrieval.

**Read more**

## Action Required

-   Review this breaking change before upgrading: Breaking changes to multiple API endpoints, including request and response field modifications, and a new parameter added to chat file retrieval.

## Changes

-   This release only includes breaking or deprecated changes.

## Breaking Changes

-   Breaking changes to multiple API endpoints, including request and response field modifications, and a new parameter added to chat file retrieval.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-python/releases/tag/v0.8.0)

Breaking changes to request and response fields across multiple endpoints, including addedRoles, relatedDocuments, and messages; new chatId parameter added to chat file retrieval.

**Read more**

## Action Required

-   Review this breaking change before upgrading: Breaking changes to request and response fields across multiple endpoints, including addedRoles, relatedDocuments, and messages; new chatId parameter added to chat file retrieval.

## Changes

-   This release only includes breaking or deprecated changes.

## Breaking Changes

-   Breaking changes to request and response fields across multiple endpoints, including addedRoles, relatedDocuments, and messages; new chatId parameter added to chat file retrieval.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-java/releases/tag/v0.9.0)

Breaking changes to request and response fields across multiple endpoints, including changes to DocumentSpecs, AddedRoles, RelatedDocuments, and Messages; new parameter added to Chat.RetrieveFiles.

**Read more**

## Action Required

-   Review this breaking change before upgrading: Breaking changes to request and response fields across multiple endpoints, including changes to DocumentSpecs, AddedRoles, RelatedDocuments, and Messages; new parameter added to Chat.RetrieveFiles.

## Changes

-   This release only includes breaking or deprecated changes.

## Breaking Changes

-   Breaking changes to request and response fields across multiple endpoints, including changes to DocumentSpecs, AddedRoles, RelatedDocuments, and Messages; new parameter added to Chat.RetrieveFiles.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-go/releases/tag/v0.9.0)

September 18

2025

Fixed an issue where ChatGPT/Claude Enterprise incorrectly required mcp-remote.

**Read more**

## Changes

-   Upgraded to ESLint 9 with flat config.
-   Internal changes only.
-   Committers: David J. Hamilton, Steve Calvert.

## Source

-   [Release notes](https://github.com/gleanwork/mcp-config-schema/releases/tag/v0.13.1)

September 12

2025

Added support for white labeling product names.

**Read more**

## Changes

-   Enables customization of product names for branding.
-   Enhancement improves flexibility for partners and clients.

## Source

-   [Release notes](https://github.com/gleanwork/mcp-config-schema/releases/tag/v0.13.0)

Initial MCP server configurator CLI for Glean released, enabling core configuration flows for MCP Server integration.

**Read more**

## Changes

-   Implements core configuration flows for MCP Server integration.
-   Enhancement release.
-   Committers: Chris Freeman, David Hamilton, Nathaniel Furniss, Steve Calvert, Robert Jackson.

## Source

-   [Release notes](https://github.com/gleanwork/configure-mcp-server/releases/tag/v1.0.0)

September 10

2025

The one click URL generator no longer relies on Buffer in browser environments.

**Read more**

## Changes

-   Bug fix: Updated URL generator dependency for browser compatibility - Committer: Steve Calvert.

## Source

-   [Release notes](https://github.com/gleanwork/mcp-config-schema/releases/tag/v0.12.2)

September 2

2025

Exports for server name utilities are now included in the browser bundle.

**Read more**

## Changes

-   Fixed missing exports of server name utilities in browser builds - Ensures server name utilities are accessible in browser environments - Committer: Steve Calvert.

## Source

-   [Release notes](https://github.com/gleanwork/mcp-config-schema/releases/tag/v0.12.1)

Adds centralized CLI configuration command building and protocol-level improvements.

**Read more**

## Changes

-   Adds centralized CLI configuration command building and protocol-level improvements.

## Source

-   [Release notes](https://github.com/gleanwork/mcp-config-schema/releases/tag/v0.12.0)

August 29

2025

Expanded configuration support coverage for MCP protocol.

**Read more**

## Changes

-   Enhanced config schema to support a wider range of use cases - Addresses protocol-level improvements for broader compatibility.

## Source

-   [Release notes](https://github.com/gleanwork/mcp-config-schema/releases/tag/v0.11.0)

Refactored to use a builder pattern and standardized config generation, with added one-click support for VS Code.

**Read more**

## Changes

-   Refactored internal logic to implement a builder pattern - Standardized configuration generation process.
-   Added one-click support for VS Code as per official documentation.

## Source

-   [Release notes](https://github.com/gleanwork/mcp-config-schema/releases/tag/v0.10.0)

Added group.datasource\_instance fields to multiple request and response objects across announcements, answers, chat, collections, documents, entities, pins, search, shortcuts, and verification APIs.

**Read more**

## Changes

-   Added group.datasource\_instance fields to multiple request and response objects across announcements, answers, chat, collections, documents, entities, pins, search, shortcuts, and verification APIs.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-python/releases/tag/v0.7.3)

August 26

2025

Device code flow support has been removed and the configure command has been streamlined, with updates to the MCP config schema.

**Read more**

## Changes

-   Device code flow support has been removed and the configure command has been streamlined, with updates to the MCP config schema.

## Source

-   [Release notes](https://github.com/gleanwork/mcp-server/releases/tag/v0.8.0)

Exported CLIENT and CLIENT\_DISPLAY\_NAME constants are now available in the browser bundle.

**Read more**

## Changes

-   Enhancement to protocol-level exports - Improves configuration flexibility for browser integrations.

## Source

-   [Release notes](https://github.com/gleanwork/mcp-config-schema/releases/tag/v0.9.0)

Goose now supports native HTTP protocol and CLIENTS.md has been updated to reflect recent configuration changes.

**Read more**

## Changes

-   Enhanced Goose with native HTTP support.
-   Updated CLIENTS.md after config changes - Changes contributed by Chris Freeman and Steve Calvert.

## Source

-   [Release notes](https://github.com/gleanwork/mcp-config-schema/releases/tag/v0.8.0)

August 23

2025

Adds support for Claude desktop on Linux platforms.

**Read more**

## Changes

-   Enhancement: Claude desktop is now available for Linux users - Committer: Steve Calvert.

## Source

-   [Release notes](https://github.com/gleanwork/mcp-config-schema/releases/tag/v0.7.0)

Adds the ability to build glean MCP server names.

**Read more**

## Changes

-   Enhancement to server naming functionality - No protocol-level or config schema changes noted - Committer: Steve Calvert.

## Source

-   [Release notes](https://github.com/gleanwork/mcp-config-schema/releases/tag/v0.6.0)

August 21

2025

Claude integration updated to use Teams/Enterprise for organization connectors.

**Read more**

## Changes

-   Bug fix addressing connector configuration for Claude - No protocol-level or config schema changes noted - Committer: Steve Calvert.

## Source

-   [Release notes](https://github.com/gleanwork/mcp-config-schema/releases/tag/v0.4.4)

Fixed an issue with broken package exports affecting protocol-level integration.

**Read more**

## Changes

-   Package exports now function correctly - Ensures compatibility with protocol consumers - No config schema changes required.

## Source

-   [Release notes](https://github.com/gleanwork/mcp-config-schema/releases/tag/v0.4.3)

Updated cursor to use HTTP native protocol and made internal improvements.

**Read more**

## Changes

-   Fixed bug by updating cursor to HTTP native.
-   Added CODEOWNERS file.
-   Updated generate-clients script.
-   Added CLAUDE.md documentation.

## Source

-   [Release notes](https://github.com/gleanwork/mcp-config-schema/releases/tag/v0.4.2)

Partial output of configuration files is now supported.

**Read more**

## Changes

-   Enhancement: Adds the ability to output partial configs - Committer: Steve Calvert.

## Source

-   [Release notes](https://github.com/gleanwork/mcp-config-schema/releases/tag/v0.4.0)

August 19

2025

Mcp-config-schema v0.2.0.

**Read more**

## Changes

-   Mcp-config-schema v0.2.0.

## Source

-   [Release notes](https://github.com/gleanwork/mcp-config-schema/releases/tag/v0.2.0)

August 12

2025

Updated TypeScript API client to v0.9.1, based on OpenAPI Doc 0.9.0 and Speakeasy CLI 1.551.0 (2.610.0).

**Read more**

## Changes

-   Includes all changes from OpenAPI Doc 0.9.0 - Generated new TypeScript SDK version 0.9.1 - Published as NPM package v0.9.1.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-typescript/releases/tag/v0.9.1)

Updated Python API client to version 0.7.2 based on OpenAPI Doc 0.9.0 and Speakeasy CLI 1.603.0.

**Read more**

## Changes

-   Python client generated at v0.7.2 - Released to PyPI as v0.7.2.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-python/releases/tag/v0.7.2)

Released java v0.8.0 API client based on OpenAPI Doc 0.9.0 and Speakeasy CLI 1.603.0 (2.681.1).

**Read more**

## Changes

-   Published to Maven Central as v0.8.0.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-java/releases/tag/v0.8.0)

Updated Go API client to v0.8.0 based on OpenAPI Doc 0.9.0 and Speakeasy CLI 1.603.0 (2.681.1).

**Read more**

## Changes

-   Generated Go client version v0.8.0 - Based on OpenAPI Doc 0.9.0 - Uses Speakeasy CLI 1.603.0 (2.681.1).

## Source

-   [Release notes](https://github.com/gleanwork/api-client-go/releases/tag/v0.8.0)

August 8

2025

Resolved an issue affecting the publishing process.

**Read more**

## Changes

-   Addressed a problem that prevented successful publishing - No protocol-level or config schema changes introduced.

## Source

-   [Release notes](https://github.com/gleanwork/mcp-server/releases/tag/v0.7.18)

Support for OneLogin device flow added and improved error handling and platform compatibility in configure-mcp-server and mcp-server-utils.

**Read more**

## Changes

-   Added OneLogin device flow support.
-   Improved platform support for Claude Code.
-   Added error when refresh token not issued.

## Source

-   [Release notes](https://github.com/gleanwork/mcp-server/releases/tag/v0.7.17)

July 24

2025

Adds support for forced restarts of indexing uploads and introduces a property definition builder.

**Read more**

## Changes

-   Forced restarts can now be triggered for indexing uploads - New property definition builder helper added.

## Source

-   [Release notes](https://github.com/gleanwork/glean-indexing-sdk/releases/tag/v0.2.0)

July 23

2025

Introduces a property definition builder and fixes the format of tags for release.

**Read more**

## Changes

-   Adds property definition builder - Fixes tag formatting for release - Adds additional model for re-export.

## Source

-   [Release notes](https://github.com/gleanwork/glean-indexing-sdk/releases/tag/v0.1.0)

July 22

2025

Support for Azure added and CVE-2025-7783 addressed in MCP server configuration and utilities.

**Read more**

## Changes

-   Bug fix: Support for Azure in configure-mcp-server and mcp-server-utils - Security fix: CVE-2025-7783 resolved in configure-mcp-server and local-mcp-server - Contributor: David J. Hamilton.

## Source

-   [Release notes](https://github.com/gleanwork/mcp-server/releases/tag/v0.7.16)

Bug fixes and dependency updates for MCP server utilities, including security improvements and version pinning.

**Read more**

## Changes

-   Updated mcp-remote fork to version 0.2.2 to address CVE-2025-6514 - Pinned connect-mcp-server dependency in mcp-server-utils - Applied fixes to configure-mcp-server and mcp-server-utils.

## Source

-   [Release notes](https://github.com/gleanwork/mcp-server/releases/tag/v0.7.15)

July 21

2025

Enhanced parameter schemas now support Field metadata, and developer setup is improved with formatting and type error fixes.

**Read more**

## Changes

-   Added enhanced parameter schemas with Field metadata support.
-   Added newline to .cz.toml.
-   Fixed type errors during task:lint.

## Source

-   [Release notes](https://github.com/gleanwork/glean-agent-toolkit/releases/tag/0.3.0)

July 18

2025

The propagation of act\_as and GLEAN\_ACT\_AS has been ensured, and tests have been updated to use the new SDK import path.

**Read more**

## Changes

-   Ensure act\_as and GLEAN\_ACT\_AS are propagated - Update tests with new SDK import path.

## Source

-   [Release notes](https://github.com/gleanwork/langchain-glean/releases/tag/v0.3.3)

July 15

2025

Fixed an issue with Azure OAuth support.

**Read more**

## Changes

-   Resolved a bug affecting Azure OAuth authentication - Change contributed by David J. Hamilton.

## Source

-   [Release notes](https://github.com/gleanwork/mcp-server/releases/tag/v0.7.14)

July 11

2025

Users can now manually open the device flow verification page in mcp-server-utils.

**Read more**

## Changes

-   Enhancement to device flow verification process - Improves user control during authentication - Contributor: David J. Hamilton.

## Source

-   [Release notes](https://github.com/gleanwork/mcp-server/releases/tag/v0.7.13)

Updated TypeScript API client to version 0.8.1 based on OpenAPI Doc 0.9.0.

**Read more**

## Changes

-   Includes changes generated from OpenAPI Doc 0.9.0 - Released as NPM package version 0.8.1 - No additional details or breaking changes specified in the release notes.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-typescript/releases/tag/v0.8.1)

Python API client updated to version 0.7.1, generated from OpenAPI Doc 0.9.0 using Speakeasy CLI 1.580.2 (2.656.5).

**Read more**

## Changes

-   Based on OpenAPI Doc 0.9.0 - Python client generated at v0.7.1 - Released on PyPI as v0.7.1.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-python/releases/tag/v0.7.1)

Released java API client v0.7.0 based on OpenAPI Doc 0.9.0 and Speakeasy CLI 1.580.2.

**Read more**

## Changes

-   Published to Maven Central as v0.7.0 - Generated from OpenAPI Doc 0.9.0 - Built using Speakeasy CLI 1.580.2 (2.656.5).

## Source

-   [Release notes](https://github.com/gleanwork/api-client-java/releases/tag/v0.7.0)

Updated Go API client to version 0.7.1 based on OpenAPI Doc 0.9.0 and Speakeasy CLI 1.580.2 (2.656.5).

**Read more**

## Changes

-   Reflects changes from OpenAPI Doc 0.9.0 - Generated using Speakeasy CLI 1.580.2 (2.656.5) - Go API client now at version 0.7.1.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-go/releases/tag/v0.7.1)

July 8

2025

Improved document reading with related docs and updated documentation by removing support email.

**Read more**

## Changes

-   Fixed reading of documents with related docs in local-mcp-server.
-   Removed support email from documentation in local-mcp-server.
-   Committers: David J. Hamilton, Steve Calvert.

## Source

-   [Release notes](https://github.com/gleanwork/mcp-server/releases/tag/v0.7.12)

July 7

2025

Updated TypeScript API client to version 0.7.1 based on OpenAPI Doc 0.9.0 and Speakeasy CLI 1.551.0 (2.610.0).

**Read more**

## Changes

-   Includes latest changes from OpenAPI specification 0.9.0 - - Released as @gleanwork/api-client v0.7.1 on NPM.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-typescript/releases/tag/v0.7.1)

Updated Python API client to version 0.7.0 based on OpenAPI Doc 0.9.0 and Speakeasy CLI 1.576.1 (2.651.2).

**Read more**

## Changes

-   Python SDK generated at v0.7.0 - Released to PyPI as v0.7.0.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-python/releases/tag/v0.7.0)

Released java API client v0.6.0 based on OpenAPI Doc 0.9.0 and Speakeasy CLI 1.576.1 (2.651.2).

**Read more**

## Changes

-   Published to Maven Central as v0.6.0.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-java/releases/tag/v0.6.0)

Updated Go API client to v0.7.0 based on OpenAPI Doc 0.9.0.

**Read more**

## Changes

-   Generated using Speakeasy CLI 1.576.1 (2.651.2) - Reflects changes from OpenAPI Doc 0.9.0 - Go client version incremented to v0.7.0.

## Source

-   [Release notes](https://github.com/gleanwork/api-client-go/releases/tag/v0.7.0)

June 26

2025

Tests updated for new SDK import path and api-client upgraded to 0.4.2.

**Read more**

## Changes

-   Updated tests to use the new SDK import path - Upgraded api-client dependency to version 0.4.2.

## Source

-   [Release notes](https://github.com/gleanwork/langchain-glean/releases/tag/v0.3.2)

June 25

2025

Added support for Claude Code and refactored goose client configuration in configure-mcp-server.

**Read more**

## Changes

-   Enhancement: Added Claude Code support.
-   Affected component: configure-mcp-server.
-   Internal: Refactored goose client config.

## Source

-   [Release notes](https://github.com/gleanwork/mcp-server/releases/tag/v0.7.11)

June 20

2025

Fixed an issue with the remote token header in the configure-mcp-server component.

**Read more**

## Changes

-   Bug fix in configure-mcp-server - Protocol-level header handling corrected - Committer: David J. Hamilton.

## Source

-   [Release notes](https://github.com/gleanwork/mcp-server/releases/tag/v0.7.10)

Fixed tag formatting for release and added an additional model for re-export.

**Read more**

## Changes

-   Fixed format of tags in release.
-   Added additional model for re-export.

## Source

-   [Release notes](https://github.com/gleanwork/glean-indexing-sdk/releases/tag/v0.0.2)

June 19

2025

Added support for Goose as a client and improved internal tooling and formatting for MCP server components.

**Read more**

## Changes

-   Support for Goose as a client in configure-mcp-server - Prettier configuration fix and format on merge enabled - Ensured releaser runs pnpm login.

## Source

-   [Release notes](https://github.com/gleanwork/mcp-server/releases/tag/v0.7.9)

Added version-based warning functionality and improved documentation and build processes.

**Read more**

## Changes

-   Added version-based warning functionality and improved documentation and build processes.

## Source

-   [Release notes](https://github.com/gleanwork/mcp-server/releases/tag/v0.7.8)

June 17

2025

You can now use the Device Authorization Flow with the same SSO provider configured in Glean to authenticate users connecting their clients to Glean’s remote MCP server.

**Read more**

## Changes

-   You can now use the Device Authorization Flow with the same SSO provider configured in Glean to authenticate users connecting their clients to Glean’s remote MCP server.
-   See here for setup instructions.
-   Note: OAuth is also enabled for the local MCP server.

June 6

2025

**Breaking Changes:** Updated minimum go version to 1.22 (from 1.20).

**Read more**

## Action Required

-   Verify your Go toolchain uses 1.22 or later.

## Changes

-   This release only includes breaking or deprecated changes.

## Breaking Changes

-   **Breaking Changes:** Updated minimum go version to 1.22 (from 1.20).

May 31

2025

Update the generated code snippets that are displayed throughout the Client API Reference and Indexing API Reference docs to include the required `instance` parameter in the API client constructor.

**Read more**

## Changes

-   Update the generated code snippets that are displayed throughout the Client API Reference and Indexing API Reference docs to include the required `instance` parameter in the API client constructor.

The Python API client now uses a namespaced package structure. All imports must be updated from `glean` to `glean.api_client`.

**Read more**

## Action Required

-   Update imports to use the new paths.

## Changes

-   Import paths have changed from `from glean import ...` to `from glean.api_client import ...`.
-   This affects all classes including `Glean`, `models`, and other API components.
-   `from glean import` → `from glean.api_client import`.
-   `from glean.` (but not glean.api\_client) → `from glean.api_client.`.
-   This change affects all Python API client users.
-   No functional changes to the API itself - only import paths.
-   Ensure you're using the latest version of the Python API client package.

May 27

2025

We fixed a bug that caused Run Agent Wait for Output (`/agents/run/wait`) to return empty responses when used with the API Client libraries.

**Read more**

## Changes

-   We fixed a bug that caused Run Agent Wait for Output (`/agents/run/wait`) to return empty responses when used with the API Client libraries.
-   We also fixed a bug that produced non-SSE compliant output when using the Run Agent Stream Output (`/agents/run/stream`) endpoint.

With Glean’s remote MCP server, you can access Glean from MCP clients like Claude Desktop, Cursor, or Goose.

**Read more**

## Changes

-   With Glean’s remote MCP server, you can access Glean from MCP clients like Claude Desktop, Cursor, or Goose. Your Glean admin can enable a remote MCP server to expose Glean agents and tools. To join the MCP Server private beta, contact your Glean account team.

May 23

2025

Tools and agents APIs added list and call endpoints, API clients and MCP added support, and search request-body handling was corrected.

**Read more**

## Action Required

-   Update request body handling before upgrading.

## Changes

-   Added `GET /tools/list` and `POST /tools/call` to the Client REST API.
-   Added API client support for `GET /tools/list` and `POST /tools/call`.
-   Added MCP server configuration support for VS Code.
-   Fixed the OpenAPI request body schema for `/rest/api/v1/search`, `/rest/api/v1/recommendations`, and `/rest/api/v1/adminsearch`.

## Breaking Changes

-   Python API client search method parameters changed to align with other API methods because the OpenAPI request body is now marked as required.

May 16

2025

Governance Admin API surface (10 endpoints).

**Read more**

## Changes

-   Governance Admin API surface (10 endpoints).
-   Policies: retrieve, update, list, create, download - Reports:.
-   Visibility Overrides: listVisibilityOverrides,.
-   Agent API brought up to the LangChain Agent-Protocol (Agents & Runs stages).
-   Retrieve an Agent `GET /agents/ {agent_id}`.
-   Retrieve an Agent's Schemas `GET /agents/{agent_id}/schemas`.
-   List Agents `POST /agents/search`.
-   Run an Agent `POST /agents/runs/wait`.
-   Run an Agent with streaming `POST /agents/runs/stream`.
-   Python API client: resolved "unclosed async coroutine" warning in async transport.
-   Replaced legacy alpha Run-Workflow endpoints with the standard Agent-Protocol equivalents (see above).
-   Governance endpoints introduce new permission scopes (`governance.read`,.
-   Python 0.4.1 uploaded to PyPI, requires 3.8+.
-   TypeScript 0.4.1 published, ESM, bundled types.
-   Go module path `github.com/gleaninc/glean-sdk-go/v4.1.0`.
-   Java 0.4.1 available on Maven Central (`com.glean:glean-sdk:0.4.1`).

May 10

2025

Released official API clients for Glean in multiple languages, replacing.

**Read more**

## Changes

-   Released official API clients for Glean in multiple languages, replacing.
-   New API clients are now.
-   Python.
-   TypeScript.
-   Go.
-   Java.
-   Updated documentation with new installation instructions and usage examples.
-   Visit the API Clients page for more information.

May 2

2025

/updatepermissions Endpoint to update document permissions: Generally available.

**Read more**

## Changes

-   /updatepermissions Endpoint to update document permissions: Generally available.
-   /debug/datasource/documents Troubleshooting endpoint for batch queries: Generally available.

April 24

2025

In the /chat API, the previous way of processing the response message stream has been deprecated as a result of the launch of LLM-generated citations.

**Read more**

## Changes

-   LLM citations are interleaved within the response text fragments. Each fragment can have "text" or "citation".
-   If streaming is set to False, the response may still be broken up into across multiple fragments.
-   The citations interleaved inside the response do not have reference ranges (start and end indices) or snippets as they used.
-   For backwards compatibility, we still return a chat message with citations at the end in the old format, except there will be no startIndex and no snippets.

April 18

2025

Deprecate X-Scio-ActAs in favor of X-Glean-AtAs. X-Scio-ActAs continues.

**Read more**

## Action Required

-   Plan migration away from deprecated behavior.

## Changes

-   Deprecate X-Scio-ActAs in favor of X-Glean-AtAs. X-Scio-ActAs continues.

April 17

2025

`/debug/{datasource}/document` - New response field `permissionIdentityStatus` under `status`: Provides information regarding upload status of users and groups specified in document permissions.

**Read more**

## Changes

-   `/debug/{datasource}/document` - New response field `permissionIdentityStatus` under `status`: Provides information regarding upload status of users and groups specified in document permissions.
-   `/debug/{datasource}/documents` - New response field `permissionIdentityStatus` under `status`: Provides information regarding upload status of users and groups specified in document permissions.

March 26

2025

The developer site has been updated with a new look, content, and features. Some new features include:.

**Read more**

## Changes

-   This documentation site is now open sourced on GitHub.
-   This changelog page, which gives you a single place to see updates across the platform.
-   Ability to switch between light and dark mode.
-   A new API Clients page with documentation for all available API Clients.
-   A list of community projects and resources to help you get started with Glean.
-   Each API has its own documentation page with detailed information.

March 11

2025

Added a Model Context Protocol (MCP) server implementation for Glean's search and chat capabilities on GitHub.

**Read more**

## Changes

-   Added a Model Context Protocol (MCP) server implementation for Glean's search and chat capabilities on GitHub.
-   This server provides a standardized interface for AI models to interact with Glean's content search and conversational AI features through stdio communication.
-   Visit the Agents for more information.

March 5

2025

Added LangChain SDK for Python on GitHub. This SDK provides a simple interface for interacting with Glean's search and chat capabilities when using LangChain.

**Read more**

## Changes

-   Added LangChain SDK for Python on GitHub. This SDK provides a simple interface for interacting with Glean's search and chat capabilities when using LangChain.
-   Visit the Agents for more information.

February 19

2025

Beta launch of new endpoint to update document permissions -.

**Read more**

## Changes

-   Beta launch of new endpoint to update document permissions -.
-   Beta launch of new troubleshooting endpoint for batch queries.
