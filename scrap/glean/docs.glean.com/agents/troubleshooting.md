---
url: "https://docs.glean.com/agents/troubleshooting"
canonical: "https://docs.glean.com/agents/troubleshooting"
title: "Troubleshoot agents"
description: "Resolve common issues when building or running agents, including timeouts, inconsistent outputs, and content access errors."
fetched_at: "2026-09-01T13:29:17.491Z"
---
On this page

This page covers common issues you may encounter when building or running agents, along with steps to resolve them.

## Agent errors[​](#agent-errors "Direct link to Agent errors")

### Generic "Something went wrong" or request ID errors[​](#generic-something-went-wrong-or-request-id-errors "Direct link to Generic \"Something went wrong\" or request ID errors")

If your agent displays a generic error with a request ID, try the following:

1.  Open a new chat session and run the agent again. Some errors are temporary.
2.  If the error persists, check whether your agent's LLM model is correctly configured in the Admin Console under **Platform → LLM**.
3.  Downvote the response and include a brief description of the issue. This helps your admin and Glean Support in their investigation.

### Agent times out or doesn't complete[​](#agent-times-out-or-doesnt-complete "Direct link to Agent times out or doesn't complete")

Agents with many steps or large amounts of context may time out. To reduce the chance of timeouts:

-   **Reduce the number of steps.** Combine related logic into fewer steps where possible.
-   **Use a Plan and Execute step**. Replace chains of Company Search, Think, and Respond steps.
-   **Limit context per step.** Set memory to "No memory" on steps that perform unrelated tasks, and manually tag only the steps whose output is needed.
-   **Constrain output length.** In Respond step instructions, specify a maximum length for the response.
-   **Try a faster model.** If latency is contributing to timeouts, experiment with a faster model while monitoring output quality.

### Scheduled run fails but manual run succeeds[​](#scheduled-run-fails-but-manual-run-succeeds "Direct link to Scheduled run fails but manual run succeeds")

If an agent completes successfully when you run it manually but stops part-way through when it runs on a schedule, the scheduled run is most likely hitting the [scheduled run execution limit](/agents/concepts/execution-limits#scheduled-run-limits). Manual runs are not subject to this limit, which is why the same agent can finish manually and fail on a schedule.

To resolve this:

-   Review the agent for steps that can be combined, batched, or moved to a faster model. See [Scheduled run execution limit](/agents/concepts/execution-limits#scheduled-run-limits) for detailed strategies.
-   Split long reports into multiple scheduled agents that each finish within the limit.
-   Confirm that every write tool in the agent is enabled to [run without user confirmation](/administration/tools/managing-tools/run-without-user-confirmation). Scheduled runs cannot complete tools that still require per-run confirmation.

### Chat session stops responding after a long conversation[​](#chat-session-stops-responding-after-a-long-conversation "Direct link to Chat session stops responding after a long conversation")

If a chat with an agent worked initially but later turns consistently fail with a generic error in the same session, the conversation has likely exceeded the [chat session size limit](/agents/concepts/execution-limits#chat-session-size-limits).

Start a new chat session to recover. If you need to keep context, ask the agent in the original session to summarize the prior conversation, then paste that summary into the new session as your first message.

### Inconsistent agent outputs[​](#inconsistent-agent-outputs "Direct link to Inconsistent agent outputs")

If your agent produces different results across runs:

-   Review the agent's steps in debug mode to identify which step produces inconsistent output.
-   Make sure that Company Search steps are scoped narrowly with specific filters rather than broad queries.
-   Avoid using "As many as possible" for the number of search results, as this can overload context and lead to truncation.
-   Verify that all referenced documents are indexed and accessible to the user running the agent.

## Company Search limitations[​](#company-search-limitations "Direct link to Company Search limitations")

-   Company Search returns a maximum of 500 results per step. If your use case requires processing more documents, break the work into multiple scoped searches.
-   Using "As many as possible" combined with "Entire document content" can cause context overload. Use specific queries and limit the number of results to improve reliability.

## SharePoint content in agents[​](#sharepoint-content-in-agents "Direct link to SharePoint content in agents")

Glean indexes individual documents stored in SharePoint document libraries but doesn't index SharePoint view pages (URLs ending in `AllItems.aspx` or `DocSetHome.aspx`). These pages are UI containers, not content items.

If your agent uses a **Read document** step pointed at a SharePoint view URL, it returns an "unable to read" error. To work around this:

1.  Replace the Read document step with a **Company Search** step.
2.  Scope the Company Search to the specific SharePoint library or folder.
3.  The agent retrieves and operates on the individual documents within that library.

For more details on what SharePoint content Glean indexes, see [SharePoint known limitations](/connectors/native/sharepoint/set-up-indexing-connector#known-limitations).

## Citations not appearing[​](#citations-not-appearing "Direct link to Citations not appearing")

Citations appear when the response relies on enterprise sources. If you notice citations are missing:

-   Rephrase your question to reference company-specific knowledge. For example, add context like "According to our FY25 strategy doc..."
-   If citations stopped appearing after enabling the new agentic engine, ask your admin to verify that the agentic reasoning model is set to a supported model in **Admin Console > Platform > LLM**.
-   For API integrations, make sure requests use `agentConfig.agent = "ADVANCED"` rather than `"DEFAULT"`. The `DEFAULT` config uses the legacy assistant, which may not return citations consistently.

For more information about how citations work, see [Citations](/user-guide/assistant/glean-chat/glean-chat-citations/glean-citations).

## Agent export or import failures[​](#agent-export-or-import-failures "Direct link to Agent export or import failures")

### Export fails with "Action information not loaded yet"[​](#export-fails-with-action-information-not-loaded-yet "Direct link to Export fails with \"Action information not loaded yet\"")

This message appears when you try to export an agent before tool metadata has finished loading in the **Agent builder**. Wait a few seconds for the data to load, then try the export again.

### Export fails with unresolved tool IDs[​](#export-fails-with-unresolved-tool-ids "Direct link to Export fails with unresolved tool IDs")

If your agent references a tool that no longer exists or can't be identified, export is blocked and you see an error listing the unresolved IDs. This prevents exporting a broken agent definition that would fail on import.

To resolve this:

1.  Open the agent in the **Agent builder**.
2.  Review each step and look for tools that are missing, showing errors, or referencing deleted sources.
3.  Remove or replace the unresolved tool with one that's available in your environment.
4.  Try the export again.

### Import succeeds but steps are missing[​](#import-succeeds-but-steps-are-missing "Direct link to Import succeeds but steps are missing")

When you import an agent JSON file, Glean recreates the agent and its sub-agents in the target environment. If a tool in the file doesn't exist in the target environment:

-   The step referencing the missing tool is cleared
-   A warning indicates which tools couldn't be configured

Open the imported agent in the **Agent builder** and reconfigure the cleared steps with tools available in your environment.

Custom tools from the source environment are exported with a prefixed identifier. They won't resolve automatically during import and need to be reconfigured manually.

## Agent duplication[​](#agent-duplication "Direct link to Agent duplication")

If **Duplicate** fails with "Failed to Duplicate Agent" including for the agent owner, the agent likely has an active draft that does not pass workflow validation. Duplicating from the agent detail page copies the draft for users with edit access, so the duplicate fails until the draft is fixed.

**To recover:**

1.  Open the agent in Agent builder.
    
2.  Check for a **Draft** tag in the header. If a draft exists, either click **Restore to Published State** to discard the draft, restore a previously published version from version history, or edit the failing step, for example, a branching case whose template no longer references a live step) until the draft saves cleanly.
    
3.  Retry **Duplicate** from the **More actions** menu in the Agent builder header.
    

Users who only have view access can duplicate the published version directly and are not affected by an invalid draft.

## See also[​](#see-also "Direct link to See also")

-   [Debug your agent](/agents/create-agents/debug-agent)
-   [Create a more powerful agent](/agents/create-powerful-agent)
-   [Create agents with Auto mode](/agents/auto-mode-agent)
