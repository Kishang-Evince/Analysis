---
url: "https://docs.glean.com/agents/create-agents/merge-branches"
canonical: "https://docs.glean.com/agents/create-agents/merge-branches"
title: "Merge branches"
description: "Learn how to merge multiple branches in a workflow agent back into a single node."
fetched_at: "2026-09-01T13:29:16.836Z"
---
On this page

### Overview[​](#overview "Direct link to Overview")

You can **merge multiple branches into one downstream node** in the Agent Builder. The shared node runs regardless of which branch was taken, so you can keep **one source of truth** for follow-up actions and reduce duplication in complex agents.

### When to merge branches[​](#when-to-merge-branches "Direct link to When to merge branches")

Use a merged node when:

-   **Different paths share the same outcome** Example: You route requests by department (IT, HR, Finance), but every path should end with the same **Respond** step or the same **Create doc** tool.
    
-   **You want a single place to maintain logic or formatting** Update instructions or output formatting in one node instead of many, reducing the risk of inconsistencies.
    
-   **You want a cleaner canvas as agents grow** Converging branches reduces visual clutter and makes graphs easier to understand and safely extend.
    

Avoid merging when each branch must have **distinct final tools** (for example, different ticket types with different required fields).

### How merging branches works[​](#how-merging-branches-works "Direct link to How merging branches works")

On the canvas:

-   You connect the **last node of each branch** into the **same downstream node** (the "merged" node).
-   At run time, **only the branch that actually executes** feeds its outputs into the merged node; the node then runs once for that path.
-   The merged node can be **any supported step type**, including sub-agents; merging works in both parent agents and sub-agents.
-   You can continue to **branch again** after the merged node if needed.

Merging does not change **permissions, triggers, or routing**; it only changes how your workflow is organized and reused.

### Merge branches into a single node[​](#merge-branches-into-a-single-node "Direct link to Merge branches into a single node")

To merge branches in an existing agent:

1.  Open your agent in the **Agent Builder**.
2.  Identify the branch endpoints you want to converge (for example, final **Respond** steps that are currently duplicated).
3.  Choose or create the **shared downstream node**:
    -   Use an existing node (for example, keep one of your existing **Respond** steps), **or**
    -   Add a new node (for example, **Respond**, **Create doc**, or a sub-agent) and configure it as your shared output.
4.  On each branch's last node, drag from the **drag-to-connect handle** to the shared node to create the merge connection.
5.  Review the shared node's configuration:
    -   Make sure its inputs reference only data that's available from every path that can reach it.
    -   Adjust instructions so the output still makes sense for all branches.
6.  **Save** and run **Preview** with test inputs that exercise each branch, confirming that:
    -   The correct branch logic still runs.
    -   The merged node runs once per execution and returns the expected final response or tool.

note

To refactor older agents, repeat this process to replace duplicated end-steps with a single shared node, then delete any now-unused duplicates. This reduces maintenance and keeps branches in sync over time.

## See also[​](#see-also "Direct link to See also")

-   [Debug your agent](/agents/create-agents/debug-agent)
-   [Re-run from step](/agents/create-agents/re-run-from-step)
-   [Agent Builder](/agents/concepts/agent-builder)
