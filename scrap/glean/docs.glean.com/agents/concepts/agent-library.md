---
url: "https://docs.glean.com/agents/concepts/agent-library"
canonical: "https://docs.glean.com/agents/concepts/agent-library"
title: "Agent library"
description: "Browse, search, and launch agents from the Agents page to automate your tasks."
fetched_at: "2026-09-01T13:29:16.182Z"
---
On this page

The **Agents** page (referred as Agent library) lists all agents available based on the permission of your organization. From the Agents page, you can find, favorite, and launch agents to automate your workflows. It is designed for any team member looking to leverage agents to streamline their workflows.

To access the **Agents** page:

1.  Open Glean.
2.  Click **Agents** in the left navigation. You are redirected to the **Agents** page.

If you do not see **Agents** in the navigation, contact your admin to enable the Agent Library or assign you the appropriate role.

## Using the **Agents** page[​](#using-the-agents-page "Direct link to using-the-agents-page")

## Find and use agents in the Agent Library[​](#find-and-use-agents-in-the-agent-library "Direct link to Find and use agents in the Agent Library")

The *Agent Library* is a single-page catalog where you can browse, filter, and search for agents you can run. It replaces the older two-tab layout `All agents` / `Active agents` with one page optimized for discovery.

When you open the Library, you will see:

-   A **search bar** across the top to look for agents by name or purpose.
-   Filters that help you narrow down agents by **who created them**, **verification status**, and **category**.
-   A list of agents with key details such as **name**, **badge**, **author**, and **usage**.

You can use the Library in three main ways:

1.  *Search* for an agent  
    Enter keywords that describe what you want to do, for example, *“create a customer QBR deck”* or *“summarize Zendesk tickets”*. Glean searches across the agent’s name, description, and internal steps so you can find the right agent even if you don’t know its exact title.
    
2.  *Filter by who created the agent*
    
    Common filters include:
    
    -   **By you**: Shows agents you have created or run. This is the fastest way to return to agents you personally use most often.
    -   **Verified / by Company**: Shows agents that your admins or moderators have reviewed, branded as *by Company*, and marked as trusted for broader use. These are often the “official” agents your organization wants people to rely on.
3.  *Browse by category*
    
    Your admins can define **categories** that group related agents, such as:
    
    -   Sales
    -   Marketing
    -   Support
    -   HR
    -   All
    
    From the Library, you can open a *category dropdown* or navigation and browse all agents in that group. Categories are curated by admins to highlight the most relevant, high-quality agents for each audience.
    

## Activate and manage triggered agents[​](#activate-and-manage-triggered-agents "Direct link to Activate and manage triggered agents")

When you open a scheduled or content-triggered agent in the library, the trigger details and activation controls appear at the top of the page. Glean also redirects you here automatically right after you publish a new agent.

### Activate an agent[​](#activate-an-agent "Direct link to Activate an agent")

1.  Review the configuration (*Prerequisite*)  
    Confirm the trigger details and setup before turning the agent on.
2.  Turn on the agent (*Activation*)  
    Use the activation controls to turn on the agent.
3.  Verify in the dashboard (*Confirmation*)  
    After turned on, the agent moves to the **Active agents** table.

### Manage active agents[​](#manage-active-agents "Direct link to Manage active agents")

From the **Active agents** table, you can monitor and control your running agents:

-   **Monitor performance:** Review trigger configurations and check the last run status.
-   **Control execution:** Pause or resume the agent as needed.
-   **Clean up:** Remove the agent permanently when it is no longer required.

For setup details, see [Content triggers](/agents/concepts/content-trigger) and [Schedule triggers](/agents/concepts/schedule-triggers).

## Understand agent badges and metadata[​](#understand-agent-badges-and-metadata "Direct link to Understand agent badges and metadata")

Each row in the Library shows information that helps you decide whether to trust and use an agent:

-   *Agent name*: A short description of what the agent does.
-   *Verified / company badge*: Indicates that the agent was created or curated by admins or moderators and is considered an official, trusted agent. The badge appears in the Library list and on the agent’s detail view.
-   *Author*: Shows either the individual who owns the agent or your company name (for branded agents).
-   *Usage signals* :May include views, run counts, or other indicators your deployment exposes to show how commonly an agent is used.

As a general rule:

-   Prefer *verified / company-branded agents* when you need an officially supported workflow.
-   Use *personal or unverified agents* for experimentation or team specific workflows.
