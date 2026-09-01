---
url: "https://docs.glean.com/agents/create-agents/re-run-from-step"
canonical: "https://docs.glean.com/agents/create-agents/re-run-from-step"
title: "Re-run from step"
description: "Learn how to re-run agent workflows from a specific step using cached memory."
fetched_at: "2026-09-01T13:29:17.004Z"
---
On this page

### Overview[​](#overview "Direct link to Overview")

The re-run from step feature in Agent Builder Preview allows you to re-run an agent workflow from a previously executed step, reusing the preserved state and outputs from earlier steps. This streamlines iteration and debugging for complex, multi-step agents by skipping re-execution of unchanged steps.

Previously, making changes to any step in a multi-step agent required re-running the entire workflow from the beginning. With this feature, you can quickly test changes to later steps without waiting for the whole workflow to re-execute.

### Key concepts[​](#key-concepts "Direct link to Key concepts")

-   **Eligibility**: Only steps that were successfully executed in the most recent Preview run are eligible for re-run. Steps in unexecuted branches, sub-agents, or loops are not eligible.
-   **Session limitation**: re-run is available for approximately 2 hours after the last Preview run. After this period, a full run is required to re-enable the feature.

### What you can do with re-run from step[​](#what-you-can-do-with-re-run-from-step "Direct link to What you can do with re-run from step")

-   Re-run your agent from any successfully executed step without re-running earlier steps
-   Quickly iterate on later steps in your workflow without waiting for the full execution
-   Review which steps are cached versus re-executed in the debug view

### Re-run an agent from a specific step[​](#re-run-an-agent-from-a-specific-step "Direct link to Re-run an agent from a specific step")

1.  Open your agent in the Agent Builder and run a full **Preview** to execute all steps.
2.  In the workflow or step list view, select any step that was successfully executed in the most recent Preview run.
3.  Click **Play from this step** to re-run the agent from that point onward, reusing the states and outputs from earlier steps.
4.  Review results in the debug view. Cached steps and re-executed steps are clearly distinguished in the UI.

note

Each re-run from a step creates a new session to preserve the integrity of the workflow and debugging context. Follow-up queries use the context from the re-run session.

### Eligibility and invalidation[​](#eligibility-and-invalidation "Direct link to Eligibility and invalidation")

Steps become ineligible for re-run if:

-   The workflow is modified (steps added, removed, or edited)
-   Inputs change
-   The session expires (after approximately 2 hours)
-   Preview is reset

If a step is ineligible, the play button is disabled.

### Known behaviors and limitations[​](#known-behaviors-and-limitations "Direct link to Known behaviors and limitations")

-   Only top-level workflow steps are supported. Steps inside sub-agents or loops are not eligible for re-run.
-   Only the most recent Preview session is supported. You cannot select historical runs.
-   Re-run always continues through to the end of the workflow. Single-step execution is not supported.
-   Editing or manipulating step outputs directly is not supported.
-   After 2 hours or after workflow, input changes or preview reset, a new full run is required to re-run any steps.

## See also[​](#see-also "Direct link to See also")

-   [Debug your agent](/agents/create-agents/debug-agent)
-   [Create your first agent](/agents/create-agents/create-your-first-agent)
-   [Agent Builder](/agents/concepts/agent-builder)
