---
url: "https://docs.glean.com/agents/create-agents/debug-agent"
canonical: "https://docs.glean.com/agents/create-agents/debug-agent"
title: "Debug your agent"
description: "Learn how to use debug mode to troubleshoot your agent."
fetched_at: "2026-09-01T13:29:16.796Z"
---
On this page

You can use Debug mode in the Agent Builder to inspect step-by-step execution, view inputs and outputs, and understand how your agent makes decisions. Debug mode supports both task-based and conversational (chat) agents, providing a consistent, trace-based experience during Preview. This improves observability and speeds up troubleshooting while you iterate.

## What Debug mode lets you do[​](#what-debug-mode-lets-you-do "Direct link to What Debug mode lets you do")

-   See a list of steps that executed in your agent run, with status for each step and human-readable metadata.
-   Use clear visual cues: green highlights indicate success and red indicate errors; highlights clear appropriately as the run updates.
-   Click into any step to view detailed input and output payloads, execution time, and model metadata.
-   Filter the list to “Only show errors” to focus on failures.
-   Use the span list and single span views to see the nested operations in a step.
-   Keep your place: the trace persists if you close and re-open the debug panel during the same Preview session.
-   See trace updates when you use Try Again, Reset Preview, or delete a step during iteration.
-   Use debug confidently across major browsers; the UI is designed to be responsive and adapt to dark mode and zoom.

## Enable Debug mode[​](#enable-debug-mode "Direct link to Enable Debug mode")

1.  Open your agent in the Agent Builder and select **Preview** to test it interactively.
2.  In the Preview, toggle Debug mode on; the toggle is visible in the preview pane and resets when you restart the session.
3.  Run the agent. For chat-style agents, debug can be enabled before, during, or after you send a message; multi‑turn runs are supported in Preview.
4.  Close the debug panel at any time. When re-opened in the same Preview session, your execution trace remains available.

## Troubleshoot with Debug mode[​](#troubleshoot-with-debug-mode "Direct link to Troubleshoot with Debug mode")

-   You can use the **Only show errors** checkbox to filter for failures. Start with this filter to find failing steps quickly, then open each failing step to review inputs, outputs, and span details.
-   Iterate in small changes. Adjust step instructions or model settings, use Try Again, and re-check the trace to validate improvements.
-   Work from inputs to outputs. When a step fails or looks wrong, compare the step’s input fields (including any referenced memory) to the output for quick root-cause clues.
-   If a step does not display input/output, that may be by design for certain tools. Use surrounding steps and spans to infer context.
-   Closing the debug panel does not discard the current trace. You can reopen the preview or reselect the Debug toggle to resume your inspection.
-   Use the **Reset Preview** button to clear your debug state and begin a fresh debugging session. The Debug toggle state resets when a session restarts.
-   In conversational agents, multi‑turn interactions will append to the trace. When you Try Again or Reset Preview, the trace updates accordingly so you can compare iterations.

## Known behaviors and limitations[​](#known-behaviors-and-limitations "Direct link to Known behaviors and limitations")

-   Debug mode is not supported for Azure-hosted deployments. If your organization uses an Azure-hosted Glean deployment, you may not see debug trace details in Agent Builder.
-   Some steps do not surface debug traces. For example, unsupported steps such as **Let agent decide** do not show debug details.
-   Not every tool exposes inputs or outputs in the debug panel, so some steps may not show anything.

## See also[​](#see-also "Direct link to See also")

-   [Create your first agent](/agents/create-agents/create-your-first-agent)
-   [Memory](/agents/concepts/memory) - understand and manage agent memory, including handling large documents
