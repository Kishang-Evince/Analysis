---
url: "https://docs.glean.com/agents/concepts/execution-limits"
canonical: "https://docs.glean.com/agents/concepts/execution-limits"
title: "Agent execution limits"
description: "Understand tool-call caps, response-size limits, and timeouts that apply to every agent run."
fetched_at: "2026-09-01T13:29:16.196Z"
---
On this page

Glean agents run within guardrails designed to protect cost, latency, and output quality. Understanding these operational limits helps you design resilient agents that scale to large datasets without experiencing unexpected truncation or timeouts.

## Tool-call limits[​](#tool-call-limits "Direct link to Tool-call limits")

Every agent execution has a hard cap on the number of tool calls it can make in a single run. This cap prevents several common failure modes:

-   Uncontrolled costs: Each tool call incurs model inference costs; unbounded loops can quickly become expensive.
-   Execution timeouts: Long chains of sequential calls risk exceeding overall session time limits.
-   Quality degradation: Extended tool chains accumulate context drift and compounding errors, reducing the reliability of the final output.
-   High latency: Minimizing tool calls keeps agent responses timely for users waiting on results.

tip

If your agent needs to iterate over many items like *one tool call per database record*, you risk hitting this cap. For large datasets, use strategies like time-based batching, download links, or querying a data warehouse in a single step.

## Response-size caps[​](#response-size-caps "Direct link to Response-size caps")

Individual tools must return results to the context of the agent within a bounded size limit. When a single tool call produces data that exceeds this threshold:

-   Truncation: The in-context response is truncated to the maximum allowable size.
-   Download links: When available, a download link to the full raw result is included in the intermediate step output.
-   Metadata tracking: Some tools return metadata such as a `total_count` so the agent can inform the user how many records matched versus how many were actually loaded into context.

When analyzing massive result sets, combine the provided download link with a follow-up data-analysis step, or batch the source query into smaller windows. For a practical example, see [Handling large result sets](/tools/connector/jira/search-jql#handling-large-result-sets).

## Scheduled run limits[​](#scheduled-run-limits "Direct link to Scheduled run limits")

Scheduled agent runs have a maximum end-to-end execution time of approximately 30 minutes. If a scheduled run does not produce a final result within this window, Glean terminates the execution.

| Run Type | Time Limit | Behavior on Timeout |
| --- | --- | --- |
| Manual run (Chat/Agent Page) | Flexible | Warns user or continues processing |
| Scheduled run | ~30 minutes | Terminated mid-run without a clear application error |

### Optimizing scheduled runs[​](#optimizing-scheduled-runs "Direct link to Optimizing scheduled runs")

To prevent your scheduled agents from timing out, apply these design patterns:

-   Deconstruct the workflow: Instead of one agent generating a massive, comprehensive report, create separate agents for individual sections or record groups and schedule them independently.
-   Batch retrieval steps: Combine narrow, per-record searches into broader queries that return results for multiple records in a single step, then filter the data downstream.
-   Route tasks by model speed: Reserve high-latency reasoning models for the final synthesis step. Use faster, lightweight models for formatting and summarization.
-   Bypass user confirmations: Scheduled runs can only execute write tools that admins have permitted to run without user confirmation. If a tool requires manual approval, the scheduled run will fail. See [Enabling tools to run without user confirmation](/agents/concepts/schedule-triggers#enabling-tools-to-run-without-user-confirmation). Glean Assistant enforces a maximum size on the content sent for each chat turn. If your scheduled agent regularly approaches the 30-minute limit after applying these optimizations, contact Glean Support to review your configuration.

## Chat session size limits[​](#chat-session-size-limits "Direct link to Chat session size limits")

Glean Chat enforces a maximum token size on the content sent during each chat turn. Multi-turn conversations that accumulate massive tool outputs, large file attachments, or full document contents can exceed this limit.

warning

When a chat session exceeds the size limit, it will fail to generate further responses and will continue to fail on subsequent retries. Oversized sessions cannot be resumed.

### Recovering from an oversized session[​](#recovering-from-an-oversized-session "Direct link to Recovering from an oversized session")

You cannot repair a broken session in place, use the following workflow to migrate your work:

1.  If the agent is still partially responding, ask it to produce a concise summary of the conversation so far.
2.  Copy that summary.
3.  Start a new chat session and paste the summary as your first message to restore context.

### Mitigation strategies[​](#mitigation-strategies "Direct link to Mitigation strategies")

To avoid hitting session size limits during long-running tasks:

-   Segment your requests: Break large projects into multiple shorter chat sessions, each focused on a single stage of the work.
-   Narrow the data scope: When processing large documents or tool outputs, restrict the scope per run, for example, specific date ranges or one document at a time rather than loading all data into a single turn.
