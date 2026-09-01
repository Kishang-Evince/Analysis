---
url: "https://docs.glean.com/tools/inline-execution-of-write-tools"
canonical: "https://docs.glean.com/tools/inline-execution-of-write-tools"
title: "In-line execution of write tools"
description: "By enabling in-line execution for write tools, you can remove confirmation steps in interactive agents, accelerating common flows while preserving your configured safety controls."
fetched_at: "2026-09-01T13:30:07.946Z"
---
On this page

## Overview[​](#overview "Direct link to Overview")

With in-line execution enabled, eligible write tools in interactive agents can execute automatically without showing a confirmation step. This removes extra clicks and shortens the time to complete tasks, especially in workflows where confirmation is not necessary.

In-line execution respects the safety rules and tool constraints of your organization:

-   Admins determine which tools are allowed to run without confirmation.
-   Agent creators must explicitly opt in at the step level.
-   Standard permissions, authentication, and audit logs continue to apply.
-   If a tool or step is not eligible, the agent either prompts for confirmation (if allowed) or surfaces an error.

After you enable tools:

-   No confirmation step: In eligible flows, the agent runs the write tool without asking the user to click **Confirm**.
-   Single, streamlined flow: The agent proceeds to the next step or returns results as part of the same conversation.
-   Normal responses on completion: The agent summarizes the change or next steps like any other tool result. Errors are surfaced with guidance to fix inputs or permissions.

When tools are enabled to run without user confirmation, Glean automatically executes the tool based on AI-predicted values and might update the system of record. We recommend that agent builders thoroughly test tool outputs and guardrails in a controlled environment before broad rollout.

For configuration steps and more information, see [Allowing in-line execution of write tools](/administration/tools/managing-tools/allowing-in-line-execution-of-write-tools).
