---
url: "https://docs.glean.com/tools/custom"
canonical: "https://docs.glean.com/tools/custom"
title: "Custom Tools"
fetched_at: "2026-09-01T13:30:06.932Z"
---
On this page

Custom tools are automations your organization defines in the Glean admin console when built-in tools do not cover your workflow.

Custom tools let you:

-   Call internal APIs or services that Glean does not support out of the box
-   Extend existing systems, for example, a legacy ticketing tool or in-house CRM
-   Run your own business logic before data is written to a system

In Glean they behave like any other tool, admins and developers manage and define them in the Admin Console, builders add them as agent steps, and end users trigger them through Glean or agents.

## When to use custom tools[​](#when-to-use-custom-tools "Direct link to When to use custom tools")

Use custom tools when you need to go beyond built-in tools.

Custom tools are a good fit when:

-   A system is not natively supported: You need to read from or write to an internal tool that has no Glean connector or tools.
-   You need custom business logic: You want to transform or validate data, enforce rules or approvals, or orchestrate multiple back-end calls behind a single tool.
-   You want a tailored Glean experience: You want Glean to recognize specific intents, for example, “file an IT onboarding request” and route them to your own workflows with clear trigger conditions and examples.

If a **By Glean** or **By connector** tool already does what you need, use it first. Custom tools are for filling gaps, not duplicating standard behavior.

## Roles and responsibilities[​](#roles-and-responsibilities "Direct link to Roles and responsibilities")

### Admins[​](#admins "Direct link to Admins")

Admins control where and how custom tools run:

-   Enable and manage: In **Admin Console → Platform → Tools**, decide which custom tools are available in Glean Assistant, Glean Agents, or both.
-   Control access: Limit visibility by group or environment, for example, test vs production; choose when to roll out widely or keep limited for pilots.
-   Governance: Ensure tools meet data, security, and compliance policies; coordinate with security and app owners before enabling write operations.

For creation and configuration steps, see [Creating Tools](https://developers.glean.com/guides/tools/create-tools) in the Developer Portal.

### Developers[​](#developers "Direct link to Developers")

Developers design and implement custom tools in the Glean admin console:

-   Tool definition: Display name, description, unique identifier, and type (Tool vs Retrieval; Execution vs Redirect).
-   Triggers: Trigger conditions and example queries so Glean knows when to call the tool.
-   API spec: Upload a YAML or JSON spec with a single endpoint, for example, `/execute`, request parameters (inputs), and required vs optional fields.
-   Authentication: Configure how Glean calls your back-end service securely.
-   Testing: Use the built-in testing tools to test and refine the tool.

### Agent builders[​](#agent-builders "Direct link to Agent builders")

Builders add custom tools as steps in agents:

-   Add the custom tool as a step in Agent Builder.
-   Set parameters: fixed values, inputs from the user, or AI-predicted values when appropriate.
-   Combine custom tools with **By Glean** and **By connector** tools in the same workflow.

No code is required for the tool itself; builders need to understand what the tool does and what its inputs and outputs mean.

### End users[​](#end-users "Direct link to End users")

End users do not manage custom tools directly. They use natural language with Glean Assistant or workflow agents, see confirmations or results when a tool runs, and follow the same guardrails, for example, Allow/Cancel dialogs as with other write tools. Custom tools appear as “one more thing the agent can do.”

## Example: internal IT onboarding tool[​](#example-internal-it-onboarding-tool "Direct link to Example: internal IT onboarding tool")

**Goal:** Automate creation of IT onboarding requests in your internal IT system.

**Flow:**

1.  *Developer*:Creates a custom tool **Create IT onboarding request**, uploads an OpenAPI spec for `/create-onboarding-request`, and defines fields such as `employee_name`, `start_date`, `manager_email`, and `equipment_type` (enum). Sets trigger examples (e.g., “Create an IT onboarding request for a new engineer”).
2.  *Admin*: Enables the tool for IT agents (and Glean after testing), scoped to HR and IT groups.
3.  *Builder*: Builds an “IT onboarding agent” that uses **Wait for user input**, calls the custom tool, and returns the request ID and a link to the internal system.
4.  *End user*: Asks the agent to “Set up IT onboarding for Alex Chen starting March 1, engineer in the data team.” The agent confirms details, runs the tool, and replies with a confirmation, ticket ID, and link.

This pattern applies to compliance approvals, in-house inventory or ticketing, and other back-office workflows that combine several services.

## Limitations and considerations[​](#limitations-and-considerations "Direct link to Limitations and considerations")

-   You need a back-end endpoint: Glean does not host your logic; you expose an API or URL for redirect that the tool calls.
-   Simple, flat input schema: One endpoint with flat parameters; no deeply nested JSON. Supported types: string, number, integer, boolean, and arrays. Use enums and required fields to control values.
-   You own reliability: Slow or failing services affect the tool. Use your own monitoring, logs, and debugging.
-   Trigger design matters: Weak trigger conditions or examples can cause Glean to miss the tool or invoke it when it is not relevant. Test and refine with real user queries.
-   Security and compliance :You are responsible for authentication, avoiding inappropriate data exposure, and aligning with internal policies.

For step-by-step setup, see [Creating Tools](https://developers.glean.com/guides/tools/create-tools) in the Developer Portal.
