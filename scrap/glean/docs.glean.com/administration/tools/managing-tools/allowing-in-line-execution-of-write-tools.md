---
url: "https://docs.glean.com/administration/tools/managing-tools/allowing-in-line-execution-of-write-tools"
canonical: "https://docs.glean.com/administration/tools/managing-tools/allowing-in-line-execution-of-write-tools"
title: "Allowing in-line execution of write tools"
description: "By enabling in-line execution for write tools, you can remove confirmation steps in interactive agents, accelerating common flows while preserving your configured safety controls."
fetched_at: "2026-09-01T13:29:14.657Z"
---
On this page

## Overview[​](#overview "Direct link to Overview")

With in-line execution enabled, eligible write tools in interactive agents can execute automatically without showing a confirmation step. This removes extra clicks and shortens the time to complete tasks, especially in workflows where confirmation is not necessary. When configured by an admin and enabled by the agent creator, the agent executes the write tool as part of the normal conversation, reducing friction while preserving safety controls defined for the tool.

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

## Configuration steps[​](#configuration-steps "Direct link to Configuration steps")

To use the in-line execution of tools feature, you must first configure this feature in the Admin console and then enable it in the Agent Builder. Some creation or drafting of tools may be enabled to run without confirmation by default, while others require an admin to opt in. As defaults can change over time, check the settings of specific tool in Admin console.

### Configuring in Glean Admin console[​](#configuring-in-glean-admin-console "Direct link to Configuring in Glean Admin console")

#### Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Admin access to Glean.
-   The tool must be a supported write tool, for example, updating a record in a third‑party system.

#### Steps[​](#steps "Direct link to Steps")

Perform the following steps to enable tools:

1.  Navigate to Glean **Admin console**.
2.  Click **Platform** → Tools.
3.  Click the tools you want to configure and go to **Configuration** tab.
4.  Click **Edit settings** under **Enable tools**.
5.  Click **Agents** and set **Run without user confirmation** to *Yes* to enable tools.
6.  Click **Save**.

### Enabling in the Agent Builder[​](#enabling-in-the-agent-builder "Direct link to Enabling in the Agent Builder")

Agent creators can decide whether to run a configured write tool in-line within a specific agent. Perform the following steps to enable tools configured in the Admin console:

1.  Open the agent in Agent Builder.
2.  Add or select the step that runs the relevant write tool you configured in Admin console.
3.  Enable the option to run the tool in-line.
4.  Save and publish your agent.

### End‑user consent and permissions[​](#enduser-consent-and-permissions "Direct link to End‑user consent and permissions")

End users must grant consent for an agent to execute allowed tools without a confirmation step. During consent, users can review what permissions or tools the agent may perform. Glean stores this consent for future runs until the agent version is updated, at which point users will be prompted to re‑consent.

## Known limitations[​](#known-limitations "Direct link to Known limitations")

-   Not supported for custom tools.
-   Applies to supported write tools only.
-   Designed for interactive agents (chat-based flows).
-   Some tools may always require confirmation due to risk or policy.
-   Tenant policies, authentication state, or missing configuration can block in-line execution.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

If a write tool still shows a confirmation step or fails to run in-line:

-   Confirm the admin has enabled the tool to run without confirmation.
-   Verify the agent step is configured to run in-line in Agent Builder.
-   Check user permissions and authentication for the destination system.
-   Re‑test with a simpler change or a single record to isolate issues.
-   Review agent step instructions for clarity and guardrails.

## FAQs[​](#faqs "Direct link to FAQs")

### Does this bypass safety?

No. In-line execution follows the same permission checks, admin controls, and auditing as standard tools.

### Can I enable tools at once?

In-line execution must be explicitly allowed by admins at the tool level and then opted into per agent step by the agent creator.

### What happens on failure?

The agent returns an error with guidance to fix inputs, configuration, or permissions, and you can re-run the flow after addressing the issue.

### Is there an audit trail?

Yes. Tools executed in-line are recorded like any other tool run in your environment.
