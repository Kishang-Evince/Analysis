---
url: "https://docs.glean.com/administration/platform/mcp/agents-as-tools"
canonical: "https://docs.glean.com/administration/platform/mcp/agents-as-tools"
title: "Use agents as MCP tools"
description: "Glean Agents can be exposed as tools through Glean MCP server, allowing them to be invoked directly from MCP host applications like Claude Desktop, Cursor, VS Code, and other compatible tools. This enables powerful workflows where specialized agents become callable tools in your preferred development environment, or anywhere else that you'd run MCP tools."
fetched_at: "2026-09-01T13:29:12.396Z"
---
On this page

Glean Agents can be exposed as tools through Glean MCP server, allowing them to be invoked directly from MCP host applications like Claude Desktop, Cursor, VS Code, and other compatible tools. This enables powerful workflows where specialized agents become callable tools in your preferred development environment, or anywhere else that you'd run MCP tools.

## Adding an agent as a tool[​](#adding-an-agent-as-a-tool "Direct link to Adding an agent as a tool")

Agents can be added to any MCP server you've created in your Glean instance. Follow these steps to expose an agent as an MCP tool:

1

Navigate to the MCP admin page

In the Admin Console, go to **Platform → Glean MCP server** to view your configured MCP servers.

2

Select or create a server

Choose an existing server or create a new one where you want to add the agent tool. Click on the server to view its configuration.

3

Add an agent as a tool

In the **Available tools** section, you'll see both built-in Glean tools and your agents listed together. Agents appear below the built-in tools in the selection interface.

1.  Click or select the agent(s) you want to add from the available tools list
2.  The selected agents will be enabled as tools on this server

![Adding an agent tool](/img/administration/mcp/agent-tools.png)

4

Verify the agent is enabled

The agent should now appear as an enabled tool, shown alongside the built-in tools in the "Available tools" section.

note

**For end users:** Direct your users to the [Using the Glean MCP Server](/user-guide/mcp/usage) guide for complete setup instructions on connecting MCP host applications to your Glean instance and accessing agent tools.

### Agent constraints[​](#agent-constraints "Direct link to Agent constraints")

Not all agents are eligible to be added as MCP tools. The following restrictions apply:

warning

**Agents with write tools are not supported**

Agents that include write tools (tools that modify data or external systems) cannot be added to MCP servers. MCP hosts typically expect read-only operations, and write tools may require user confirmation that cannot be handled in the MCP protocol.

When you attempt to add an agent with write tools, you'll see a validation error preventing the addition.

warning

**Agents with Human-in-the-Loop (HITL) are not supported**

Agents that use the "Wait for user input" step or any other human-in-the-loop functionality cannot be added to MCP servers. MCP tool invocations are expected to complete without user interaction, and pausing for user input would cause timeouts in most MCP host applications.

When you attempt to add an agent with HITL steps, you'll see a validation error preventing the addition.

note

These restrictions apply to the agent's entire workflow, including any sub-agents. If your agent routes to a sub-agent that contains write tools or HITL steps, the parent agent also cannot be added to an MCP server.

## Best practices[​](#best-practices "Direct link to Best practices")

Follow these best practices to ensure your agents work effectively as MCP tools:

### Write meaningful agent descriptions[​](#write-meaningful-agent-descriptions "Direct link to Write meaningful agent descriptions")

The agent's description is critical for MCP hosts to understand when and how to use the tool. The description is used by the LLM in the host application to decide whether to invoke your agent.

### Good description examples

-   **"Search the company's Jira issues and return structured information about bugs, features, and their status"** - Specific, tool-oriented, describes what data is returned
-   **"Analyze pull request code changes and provide feedback on code quality, potential bugs, and best practices"** - Clear purpose, describes the analysis performed
-   **"Find employee information including role, team, location, and contact details from the HR system"** - Explicit about connectors and types of information returned

### Poor description examples

-   **"Jira agent"** - Too vague, doesn't explain what the agent does
-   **"Helps with code"** - Not specific enough for the LLM to know when to use it
-   **"Does stuff with employee data"** - Unclear about what operations are performed or what data is returned

**Best practices for descriptions:**

-   Start with an action verb (e.g., "Search", "Analyze", "Find", "Generate")
-   Specify the connectors the agent accesses
-   Describe the type of output or information returned
-   Keep it concise but informative (2-3 sentences maximum)
-   Avoid jargon that might confuse the LLM's tool selection logic

### Design MCP-compatible agents[​](#design-mcp-compatible-agents "Direct link to Design MCP-compatible agents")

When creating agents specifically for MCP use, follow these design principles:

-   **Focus on read-only operations** - Agents should retrieve, analyze, and return information without modifying external systems
-   **Design autonomous workflows** - Avoid "Wait for user input" steps; create workflows that complete without user confirmation or input
-   **Return actionable data** - Instead of performing write operations, design agents to return recommendations or structured data that users can act upon in their MCP host application

tip

If you need both interactive and MCP-compatible versions of an agent, create two separate agents with different workflows. For example, create "PR Review (Interactive)" with HITL steps for Slack, and "PR Review (Read-only)" for MCP that returns analysis without user confirmation.

### Be aware of MCP host timeouts[​](#be-aware-of-mcp-host-timeouts "Direct link to Be aware of MCP host timeouts")

Different MCP host applications have different timeout values for tool invocations. If your agent takes too long to execute, the host may terminate the request before the agent completes.

**Timeout considerations:**

-   **Claude Desktop**: ~60 seconds for tool calls
-   **Cursor**: ~30-60 seconds depending on configuration
-   **VS Code with MCP**: ~30 seconds default
-   **Other hosts**: Vary widely, often 30-120 seconds

**Optimization strategies:**

-   Design agents to complete quickly (ideally under 30 seconds)
-   If an agent needs to process large datasets, consider pagination or limiting result sets
-   Use efficient search queries and avoid unnecessary processing steps
-   Test your agent's execution time before adding it to an MCP server

note

If an agent timeout occurs, the MCP host will typically show an error to the user. The agent execution on Glean's side may continue, but the results won't be returned to the host application.

### Limit the number of tools per server[​](#limit-the-number-of-tools-per-server "Direct link to Limit the number of tools per server")

Adding too many tools to a single MCP server can overwhelm both the server and the MCP host application's LLM, leading to:

-   Poor tool selection by the host's LLM
-   Increased latency during tool enumeration
-   Confusion about which tool to use for a given task

**Recommendations:**

-   **Limit to 40 tools per server** - Focus on the most valuable and high-quality agents/tools for each server.
-   **Group related tools together** - Create separate servers for different use cases (e.g., "Engineering Context" server vs. "General Knowledge" server)
-   **Prefer quality over quantity** - A small set of well-designed, high-signal agents is more valuable than many overlapping or low-quality agents
-   **Avoid duplicate functionality** - If multiple agents perform similar tasks, choose the best one or consolidate them

note

**MCP gateway** - Glean's built-in search already retrieves this data across your sources. Adding granular read tools enlarges the tool list, which uses more context and can make the model's tool choice less accurate.

tip

If you need to provide access to many agents, create multiple MCP servers organized by job-to-be-done. For example:

-   **Glean - Engineering**: code\_search, employee\_search, pr\_review\_agent, code\_documentation\_agent
-   **Glean - Product**: search, read\_document, feature\_research\_agent, competitive\_analysis\_agent

### Test agent performance as a tool[​](#test-agent-performance-as-a-tool "Direct link to Test agent performance as a tool")

Before widely deploying an agent as an MCP tool:

1.  **Test with multiple MCP hosts** - Verify the agent works correctly in the host applications your users prefer
2.  **Validate execution time** - Ensure the agent completes within typical timeout windows
3.  **Check error handling** - Test how the agent behaves when searches return no results or when errors occur
4.  **Review LLM tool selection** - Confirm that the host's LLM selects your agent tool appropriately based on user prompts
5.  **Gather user feedback** - Ask early users about the agent's usefulness and any issues they encounter

## See also[​](#see-also "Direct link to See also")

-   Admin setup and host-specific guidance: [Setting up Glean MCP server](/administration/platform/mcp/enable-mcp-servers)
-   MCP server best practices: [MCP Server Best Practices](/administration/platform/mcp/best-practices)
-   Claude MCP documentation: [Build with Claude - Model Context Protocol](https://docs.claude.com/en/docs/build-with-claude/mcp)
-   Model Context Protocol documentation: [Model Context Protocol (official site)](https://modelcontextprotocol.io/)
