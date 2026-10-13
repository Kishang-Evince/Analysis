---
url: "https://docs.glean.com/tools/glean/code-search"
canonical: "https://docs.glean.com/tools/glean/code-search"
title: "Code search"
description: "Search connected code repositories in Glean and return relevant files, diffs, code, and references for code-related questions."
fetched_at: "2026-10-13T08:50:50.356Z"
---
On this page

The Code Search tool lets agents search connected code repositories from Glean. Use it to find relevant files, diffs, code, and references for code-related questions.

Code Search is available in several Glean experiences. Glean can invoke it automatically for code-related questions, and you can add it explicitly as a *By Glean* tool in Agent Builder. Code Search is also available through the [Glean MCP Server](/user-guide/mcp/usage) for supported third-party coding tools.

With Code Search, you can:

-   Find and understand code by locating specific snippets, recent changes, and relevant files across connected repositories
-   Generate code snippets and starting points based on examples in your codebase
-   Debug by tracing recent commits and pull or merge requests that may have introduced an issue
-   Check feature implementation status and find related documentation

## Inputs[​](#inputs "Direct link to Inputs")

Configure Code Search in **Agent Builder** with a natural-language query or a fixed search pattern. You can optionally filter results by file extension.

| Input or setting | What to provide | Example |
| --- | --- | --- |
| Search query | Describe the code, change, or implementation you want to find | `recent changes in runtime config loading logic` |
| Fixed query or template | Provide a precise search pattern or use variables in a query template | `Find [[Feature name]] in the codebase` |
| File extension | Limit results to a file type using the `extension` field | `py` |

## Outputs[​](#outputs "Direct link to Outputs")

Code Search returns relevant code files, snippets, commits, pull or merge request diffs, and references from the connected repositories. The results become context for the agent, so follow Code Search with a **Respond** step to summarize findings or with another step that uses the code context.

## Usage examples[​](#usage-examples "Direct link to Usage examples")

-   **Debug errors:** Ask what recent changes could have affected a component. Code Search can find relevant pull or merge requests, commits, and files for the agent to analyze.
-   **Confirm feature status:** Ask whether a feature exists and how to enable it. The agent can locate feature flags, code paths, and related documentation.
-   **Get implementation guidance:** Ask where to add or extend functionality. Code Search can find similar changes and example files.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Connect a supported code host, such as [GitHub Cloud](/connectors/native/github/setup), [GitHub Enterprise Server](/connectors/native/github-enterprise-server/setup), or [GitLab Cloud](/connectors/native/gitlab/setup)
-   For self-hosted code hosts, ensure the instance is network-accessible to the Glean crawler running in your cloud
-   Allow Glean to complete an initial crawl and indexing process before expecting all repository content to be searchable

Code Search respects the connected code host's permissions. Users can access only the code and repository content they are allowed to access in the source system.

## Configuration[​](#configuration "Direct link to Configuration")

The steps below describe how to use Code Search as a tool in Agent Builder:

1.  Open **Agent Builder** and add a step.
2.  Select the **Code Search** tool under **By Glean**.
3.  Enter a natural-language query or a fixed query template.
4.  Optionally provide a file extension, such as `py`, to focus the search.
5.  Add a **Respond** step or another downstream step to summarize or use the results.

Code Search is enabled by default after a supported code host is connected. The previous admin toggle for the code tool has been removed.

## Limitations[​](#limitations "Direct link to Limitations")

-   Results are limited to repositories and content that the running user can access in the connected code host
-   Newly connected or recently changed repositories may not appear until crawling and indexing complete
-   Search quality depends on the specificity of the query and the available indexed code context

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Code Search is not available in Agent Builder

Confirm that a supported code host is connected and that its initial crawl has completed. Code Search is enabled automatically after a supported code host is connected.

### Expected files or repositories are missing from the results

Confirm that the running user has access to the files in the source code host. If the content was recently added or changed, wait for crawling and indexing to complete, then retry with a specific query.

### The results are too broad or not relevant

Include the repository, feature, component, file name, or change you are looking for. You can also provide a fixed query or filter results by file extension.

## FAQ[​](#faq "Direct link to FAQ")

### Which code hosts does Code Search support?

Code Search supports connected code hosts including GitHub Cloud, GitHub Enterprise Server, and GitLab. Availability depends on the connectors enabled for your organization.

### Do I need to enable Code Search separately?

No. Code Search is enabled by default after a supported code host is connected.

### Does Code Search change anything in my code repositories?

No. Code Search retrieves indexed code and repository content; it does not modify the source repositories.

## See also[​](#see-also "Direct link to See also")

-   [GitHub connector setup](/connectors/native/github/setup)
-   [GitLab Cloud connector setup](/connectors/native/gitlab/setup)
-   [Using the Glean MCP Server](/user-guide/mcp/usage)
-   [Build agents with atomic tools](/tools/build-agent-with-atomic-tools)
