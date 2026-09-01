---
url: "https://docs.glean.com/tools/glean/code-search"
canonical: "https://docs.glean.com/tools/glean/code-search"
title: "Code search"
description: "Search across your connected code repositories from Glean to return relevant files, diffs, and references for code-related questions."
fetched_at: "2026-09-01T13:30:07.144Z"
---
On this page

The Code Search tool lets agents search across your code repositories in supported code hosts directly from Glean, returning relevant files, diffs, code and references to help answer code‑related questions. It is available as a *By Glean* tool in Agent Builder and is also automatically invoked by Glean when a user’s prompt is code‑related.

After a supported code host such as GitHub or GitLab is connected, Code Search is enabled by default. Code Search is supported for Glean deployments on GCP, AWS and Azure.

Code Search respects your existing GitHub or GitLab permissions. It uses the same API scopes as the connectors, and only users who can access code in the source system can access it through Glean. Code snippets become part of your organization’s knowledge graph under the same privacy guarantees as other indexed content.

note

Code Search is enabled by default and the previous admin toggle for the code tool has been removed.

With the Code Search tool, you can:

-   Find and understand code by locating specific snippets, recent changes, and relevant files across connected repositories.
    
-   Generate helpful code snippets and starting points based on examples in your codebase.
    
-   Debug faster by tracing recent commits and pull/merge requests that may have introduced issues.
    
-   Check feature implementation status and learn how to enable it by searching code and related docs.
    

When a query is categorized as code‑related, the agent issues a targeted search over code sources, for example, GitHub or GitLab. For richer answers, it can retrieve PR/MR diffs and code file contents as additional context before responding.

## Usage examples[​](#usage-examples "Direct link to Usage examples")

-   Debug errors: Ask what recent changes could have affected a component and Code Search looks at recent PRs/MRs and commits, then summarizes likely causes with sources.
-   Confirm feature status: Ask whether a feature exists and how to enable it and the agent can locate flags, code paths, and docs.
-   Implementation guidance: Ask where to add or extend functionality and the agent finds similar changes and suggests files and example code.

## Using the Code Search tool in an agent[​](#using-the-code-search-tool-in-an-agent "Direct link to Using the Code Search tool in an agent")

Add Code Search as a step in your agent to retrieve code context before responding.

### Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Connect a supported code host like GitHub (Cloud), GitHub Enterprise Server, or GitLab.
    
-   For self‑hosted code hosts, ensure the instance is network‑accessible to the Glean crawler running in your cloud.
    
-   Allow Glean to complete a full crawl and index; initial machine learning workflows may take time after connection.
    

### Steps[​](#steps "Direct link to Steps")

1.  Open Agent Builder and add a step.
    
2.  Choose the **Code Search tool** (By Glean).
    
3.  Provide the input:
    
    -   Natural language: Describe what to find, for example, “recent changes in runtime config loading logic”. Or
        
    -   Fixed queries: Provide precise search patterns or templates the agent should issue.
        
4.  (Optional) Filter by file extension using the extension field, for example, “py” to focus on Python files.
    
5.  Follow the Code Search step with a Respond step that explains how to summarize or extract findings for the user.
    

After configuring, test the agent with sample inputs, verify results and sources, and then save.
