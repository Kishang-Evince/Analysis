---
url: "https://docs.glean.com/administration/managing-agents/agent-routing"
canonical: "https://docs.glean.com/administration/managing-agents/agent-routing"
title: "Route requests to agents"
description: "Learn how to configure Glean to automatically route user questions to specialized, custom-built agents for faster and more accurate answers."
fetched_at: "2026-09-01T13:29:09.982Z"
---
On this page

Glean auto-routing to agents connects users to the most relevant custom-built agent automatically, so they don't need to know which agent to use or how to find it.

Auto-routing to agents provides the following benefits:

-   **Faster, more accurate answers**: Users get responses from the most relevant expert agent, improving quality and speed.
-   **Seamless user experience**: Employees continue to use Glean as their single entry point. No need to search for the right agent.
-   **Centralized control**: Admins can define and update routing rules to match evolving business needs.

## Typical use cases[​](#typical-use-cases "Direct link to Typical use cases")

-   **HR**: Route all questions about benefits, PTO, or company policies to an HR agent that references official documentation and can initiate HR workflows.
-   **IT Help Desk**: Direct IT support requests to an IT agent that can troubleshoot, file tickets, or grant access.
-   **Departmental Experts**: Route specialized queries (e.g., "Who should I contact about X?") to expert finder agents.

## How it works[​](#how-it-works "Direct link to How it works")

-   When a user submits a question to Glean, the system evaluates the request against the routing conditions you've defined for each agent. If a match is found, Glean automatically routes the request to the appropriate agent. The user sees a message such as "Using Agent: \[Agent Name\]" at the top of the response, making the handoff transparent.
-   If multiple agents' conditions match, the first agent in your configured list is selected. You can reorder agents to set priority.
-   If no agent matches, Glean responds as usual.
-   If an agent was mistakenly invoked or the user prefers not to use the agent, the user can "X" out of the agent at the top of the response and have Glean regenerate the answer using its general knowledge.

## Step-by-step setup[​](#step-by-step-setup "Direct link to Step-by-step setup")

Prerequisites

-   Agents are enabled and launched for your deployment.
-   You have Admin access to the **Admin console**.

1.  **Go to the Admin console**: Navigate to [Admin console → Platform → Agents](https://app.glean.com/admin/setup/agents).
2.  **Open Glean Auto-Routing**: Expand the "Glean auto-routing" section and click **Configure**.
3.  **Add Agents and Routing Conditions**: You can specify up to 15 conversational agents.
    -   For each agent, provide a routing condition - a natural language description (max 500 characters) of the types of requests that should be routed to this agent.
    -   Add example user requests to improve routing accuracy.
4.  **Set Priority Order**: Drag and drop agents to change their order.
5.  **Save Changes**: Click **Save changes** to activate your configuration.

## Example routing conditions[​](#example-routing-conditions "Direct link to Example routing conditions")

### HR agent[​](#hr-agent "Direct link to HR agent")

*Route to agent if the user asks about HR policy, benefits, leave (PTO, sick, parental/maternity/paternity), holidays, payroll/tax docs (W‑2, paystubs), employment verification, or reports a sensitive concern (harassment, discrimination). Do not route if it's a login, MFA, SSO, or access issue to an HR/benefits system.*

Example requests:

-   "How do I request a PTO?"
-   "What holidays do we get off?"
-   "How do I enroll in benefits?"
-   "What is the process for maternity leave?"
-   "How do I update my direct deposit?"
-   "Where can I find my W‑2?"
-   "I need an employment verification letter."
-   "How do I report harassment?"

### IT Help Desk agent[​](#it-help-desk-agent "Direct link to IT Help Desk agent")

*Route to agent if the user needs help with accounts or access (password reset, MFA, SSO/Okta), devices/hardware (laptop, mouse, keyboard, monitor, dock), software installs/licenses, network/VPN/Wi‑Fi, email/calendar/chat tools, printers, or provisioning/access to applications (including the HR/benefits portal).*

Example requests:

-   “How do I reset my password?”
-   “How do I request a new laptop?”
-   “My mouse isn’t working.”
-   “I can’t log in to the benefits portal — my MFA code is invalid.”
-   “Outlook isn’t showing company holidays.”
-   “Please grant me access to Zoom Pro and Figma.”
-   “VPN keeps disconnecting when I’m on hotel Wi‑Fi.”

## Best practices[​](#best-practices "Direct link to Best practices")

-   **Be specific in routing conditions**: Use clear, concise language and provide several example requests for each agent.
-   **Review and update regularly**: As your organization's needs change, revisit your routing rules and agent list.
-   **Test with real queries**: Try common user questions to ensure they're routed as expected.
-   **Prioritize your routes**: Reserve routing for the most impactful use cases.

## Limitations and known issues[​](#limitations-and-known-issues "Direct link to Limitations and known issues")

-   Routing is not 100% accurate: Quality depends on the clarity of your routing instructions and examples.
-   Only conversational agents viewable by everyone can be routed to.
-   If an agent is removed or made private, it will be excluded from routing.
-   Currently, only agents with chat-message triggers are supported for routing. Expansion to input-form types is planned.
-   Routing applies to all users in your deployment; limiting to a subset (e.g., pilot group) is not currently supported.
