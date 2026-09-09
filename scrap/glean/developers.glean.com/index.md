---
url: "https://developers.glean.com/"
canonical: "https://developers.glean.com/"
title: "Glean Developer Platform | Glean Developer"
fetched_at: "2026-09-01T13:23:07.814Z"
---
[

Experimental

### Introducing Glean Platform APIs

Build search experiences and run Glean agents in your applications with our new Platform APIs - now rolling out in experimental preview.

Explore Platform APIs](/api/platform-api)

Chat API

# Chat grounded in company knowledge

Ask across every connected app and get permission-aware answers, with citations, in a single API call.

Search API

# Search your entire knowledge graph

Enterprise search over 100+ connected sources - ranked, permission-aware, and fast, from one query.

Agents

# Build agents on your company's knowledge

Plan, retrieve, and act across your tools - agents reason over the knowledge graph, not just a prompt window.

Web SDK

# Embed Glean in your apps

Drop permission-aware search and chat into the tools your team already uses - one npm package, two components.

Indexing SDK

# Bring any data into Glean

Build a connector on the open-source indexing SDK - push documents from any source and make them searchable everywhere.

[Start building](/guides/chat/overview)[API reference](/api/client-api/chat/overview)

chat.pyChat API

from glean.api\_client import Glean

with Glean(
    api\_token=os.environ\["GLEAN\_API\_TOKEN"\],
    server\_url=os.environ\["GLEAN\_SERVER\_URL"\],
) as client:
    response = client.client.chat.create(
        messages=\[{"fragments":
            \[{"text": "Summarize the Q3 roadmap"}\]}\]
    )
    answer = "".join(
        f.text or ""
        for m in response.messages or \[\]
        for f in m.fragments or \[\]
    )

search.pySearch API

from glean.api\_client import Glean

with Glean(
    api\_token=os.environ\["GLEAN\_API\_TOKEN"\],
    server\_url=os.environ\["GLEAN\_SERVER\_URL"\],
) as glean:
    results = glean.client.search.query(
        query="quarterly reports",
        page\_size=10,
    )
    titles = \[r.title for r in results.results\]

agent.pyAgents

from glean.agent\_toolkit.tools import (
    search,
    employee\_search,
)

# Use with LangChain
search\_tool = search.as\_langchain\_tool()
people\_tool = employee\_search.as\_langchain\_tool()

# Use with CrewAI
crew\_tool = search.as\_crewai\_tool()

embed.tsWeb SDK

import {
  renderSearchBox,
  renderSearchResults,
  renderChat,
} from "@gleanwork/web-sdk";

renderSearchBox(searchEl, {
  backend: "https://acme-be.glean.com",
  onSearch: (query) =>
    renderSearchResults(resultsEl, { query }),
});

renderChat(chatEl, {
  backend: "https://acme-be.glean.com",
});

connector.pyIndexing SDK

from glean.indexing.connectors import (
    BaseDatasourceConnector,
)

class CatalogConnector(BaseDatasourceConnector):
    def get\_data(self):
        return load\_catalog\_pages()

connector = CatalogConnector(name="catalog")
connector.index\_data(mode=IndexingMode.FULL)

## Choose your path

Four ways to get started.

[Build with Platform APIStart with modern search, agents, skills, and chat from your code.](/api/platform-api)[Embed with the Web SDKPermission-aware search and chat inside the apps your team already uses.](/libraries/web-sdk/overview)[Connect your dataBring any source into Glean with the Indexing API.](/api-info/indexing/getting-started/overview)[Bring Glean to your IDEClaude Code, Cursor, Codex, and any MCP host.](/guides/mcp)

Quickstart

### One call to your knowledge graph

1.  1Prefer OAuth for per-user Client and Platform work in [Authentication](/get-started/authentication). Use a Glean-issued token for Indexing, global ActAs, or when no OAuth path exists.
2.  2Install a [client library](/libraries/api-clients) for your language.
3.  3Run your first query - results come back ranked and permission-aware.

PythonTypeScriptGoJavacURL

main.py

from glean.api\_client import Glean

with Glean(
    api\_token=os.environ\["GLEAN\_API\_TOKEN"\],
    server\_url=os.environ\["GLEAN\_SERVER\_URL"\],
) as glean:
    results = glean.client.search.query(
        query="quarterly planning",
        page\_size=10,
    )
    for r in results.results:
        print(r.title, r.url)

## API client libraries

[Python`pip install glean-api-client`](/libraries/api-clients)[TypeScript`npm install @gleanwork/api-client`](/libraries/api-clients)[Java`com.glean.api-client`](/libraries/api-clients)[Go`go get github.com/gleanwork/api-client-go`](/libraries/api-clients)

## Bring Glean into your IDE

[Claude CodeInstall the Glean plugins and search company knowledge from your terminal.](/guides/mcp/claude-code) [CursorConnect the Glean MCP server to Cursor for context-aware coding.](/guides/mcp/cursor)[CodexCodexInstall the Glean plugin for Codex - enterprise knowledge in your terminal.](/guides/mcp/codex)

Plus GitHub Copilot, Goose, Windsurf, and [any MCP host](/guides/mcp/supported-hosts).

Agents

## Framework-agnostic by design

The agent toolkit exposes Glean retrieval as tools for whatever you build with - the knowledge graph comes along regardless of framework.

LangChainOpenAI Agents SDKGoogle ADKMCP

[Explore the agent toolkit](/guides/agents/toolkit)

tools.pyAgent toolkit

from glean.agent\_toolkit.tools import (
    search,
    employee\_search,
)

# LangChain
lc\_tool = search.as\_langchain\_tool()

# CrewAI
crew\_tool = search.as\_crewai\_tool()
