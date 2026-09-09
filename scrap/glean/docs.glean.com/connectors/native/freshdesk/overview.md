---
url: "https://docs.glean.com/connectors/native/freshdesk/overview"
canonical: "https://docs.glean.com/connectors/native/freshdesk/overview"
title: "Freshdesk overview"
description: "The Freshdesk connector integrates Freshdesk-a cloud-based customer support platform-with Glean. This integration allows support, IT, and operations teams to search tickets, solution articles, contacts, and companies alongside their other enterprise knowledge."
fetched_at: "2026-09-01T13:29:26.440Z"
---
On this page

The Freshdesk connector integrates Freshdesk-a cloud-based customer support platform-with Glean. This integration allows support, IT, and operations teams to search tickets, solution articles, contacts, and companies alongside their other enterprise knowledge. The connector mirrors Freshdesk's role‑based permissions and ticket visibility so users only see content they are allowed to access in Freshdesk.

note

The connector currently supports Freshdesk cloud deployments only. On-premises variants are not supported.

Freshdesk is a multi-channel support platform used to manage tickets, workflows, self-service knowledge bases, and analytics. Connecting Freshdesk to Glean enables teams to:

-   Search tickets, solution articles, contacts, and companies from one place instead of pivoting between tools.
-   Use Glean to summarize tickets, propose fixes, and synthesize context across Freshdesk and other connected systems.
-   Use Glean Agents to automate common support, operations, and reporting workflows using Freshdesk data.
-   Build reports and operational views (such as tickets by customer, group, or agent) using natural-language queries.

## Freshdesk data retrieval[​](#freshdesk-data-retrieval "Direct link to Freshdesk data retrieval")

Freshdesk supports both native indexing and real-time data fetching to ensure high performance and data freshness. Data fetching retrieves real-time, permission‑aware Freshdesk data at query time for eligible experiences in Glean Search and Glean.

## Usage in Glean[​](#usage-in-glean "Direct link to Usage in Glean")

This section describes how Freshdesk content is used across Glean Search, Glean, and Glean Agents.

### Glean Search[​](#glean-search "Direct link to Glean Search")

Users can run keyword or natural‑language queries in Glean Search that return Freshdesk items alongside content from other tools (for example, Drive, Confluence, Slack):

-   Find tickets by subject, status, priority, tags, group, or escalation.  
    *Examples:*
    
    -   “`network timeout` tickets from the last 7 days with High priority.”
    -   “Tickets escalated to Tier‑1 Support for Customer X.”
-   Look up solution articles to resolve a ticket.  
    *Examples:*
    
    -   “Solution articles about login and authentication failures.”
    -   “Articles in the ‘Billing’ category updated this month.”
-   Retrieve contact and company context linked to tickets.  
    *Examples:*
    
    -   “Tickets opened by `jane.doe@example.com` in the last 90 days.”
    -   “Tickets for companies in the ‘Enterprise’ segment with open high‑priority issues.”

### Glean[​](#glean "Direct link to Glean")

Glean uses Freshdesk as a retrieval source to ground answers in real ticket and knowledge‑base data:

-   **Resolve tickets faster**
    
    -   “Summarize this Freshdesk ticket and propose the next steps.”
    -   “Show similar resolved tickets for this issue and summarize how they were fixed.”
-   **Draft and refine replies**
    
    -   “Draft a response to this ticket using the top related solution article.”
    -   “Rewrite this reply in a more empathetic tone while keeping the technical content.”
-   **Self‑productivity for frontline agents**
    
    -   “Which tickets are open, assigned to me, and marked as High priority?”
    -   “Summarize high‑priority tickets raised by Customer X in the last 3 months.”

Glean experiences remain permission‑aware. Glean can only use Freshdesk items that the signed‑in user is allowed to see in Freshdesk.

### Glean Agents[​](#glean-agents "Direct link to Glean Agents")

Glean Agents let users define reusable, multi‑step workflows and “mini‑apps” that operate on Freshdesk data plus other systems (for example, Customer Relationship Management (CRM), HR, project tools):

-   **Ops and leadership reporting**
    
    -   “Create a weekly report of all tickets created or updated in the last day, grouped by customer and priority, including assignee and Service Level Agreement (SLA) status.”
    -   “Generate a table of open escalations in top customer accounts with owner, severity, and days open.”
-   **Playbooks and health monitoring**
    
    -   “For each top‑tier account, pull all open Freshdesk tickets, group them by product area, and highlight customers at risk.”
    -   “Summarize failure patterns across tickets that mention ‘checkout error’ and propose themes for an incident review.”
-   **Agent productivity automations**
    
    -   “For my queue, summarize all tickets updated in the last 24 hours and draft a short update for each one.”
    -   “Categorize my open tickets by product, priority, and company tier.”

When designing Agents, treat Freshdesk like any other connector: use Freshdesk results as context, optionally combine with other connectors, and, where available, pair with Freshdesk‑specific tools (for example, ticket update tools) in your Agent definitions.

## Supported features[​](#supported-features "Direct link to Supported features")

-   **Mirror Freshdesk permissions**: Glean mirrors Freshdesk roles, groups, and ticket‑scope so users only see tickets, solution articles, contacts, and companies they can access in Freshdesk.
    
-   **Provide deep links**: Each result links back to the corresponding Freshdesk item (ticket, solution article, contact, or company) in the Freshdesk UI.
    
-   **Sync data via crawls**: The connector uses initial full crawls to populate the index and incremental crawls to keep tickets, solution articles, contacts, and companies up to date.
    
-   **Secure user access**: The connector prevents anonymous or link-based access. All content visibility is strictly tied to an authenticated Freshdesk user identity.
    

## Supported objects[​](#supported-objects "Direct link to Supported objects")

The following table summarizes the main objects and representative fields (non‑exhaustive).

| Object | Description | Example indexed fields (non‑exhaustive) |
| --- | --- | --- |
| **Tickets** | Support requests created in Freshdesk | `id`, `subject`, `description_text`, `status`, `priority`, `type`, `tags`, `group_id`, `requester_id`, `company` name, `custom_fields`, `created_at`, `updated_at`, conversations (body, author, timestamps), attachments metadata |
| **Solution articles** | Only published solution articles are indexed. Draft or unpublished articles are excluded. | `id`, `title`, `status`, `description`, `description_text`, `category_id` / name, `folder_id` / name, `tags`, `hits`, `thumbs_up`, `thumbs_down`, `updated_at` |
| **Contacts** | Customer / requester profiles | `id`, `name`, `email`, `company_id` / name, `job_title`, `language`, `active`, `other_companies`, `created_at`, `updated_at` |
| **Companies** | Customer organizations | `id`, `name`, `description`, `industry`, `renewal_date`, `health_score`, `account_tier`, `custom_fields`, `note`, `created_at`, `updated_at` |

For each object:

-   Glean indexes full text (where applicable) plus key metadata for search ranking and filters.
-   Metadata is used to power filters and result displays (for example, status, priority, group, company, last updated time).

## Permissions and visibility[​](#permissions-and-visibility "Direct link to Permissions and visibility")

Freshdesk determines content access through roles, groups, and ticket scopes. The Glean connector mirrors these rules to ensure data security.

### Agent roles[​](#agent-roles "Direct link to Agent roles")

Freshdesk enforces Role-Based Access Control (RBAC):

-   Users (typically agents) are assigned roles such as Agent, Supervisor, or Administrator.
-   Roles control permissions for viewing, creating, editing, and deleting objects such as tickets and solution articles.
-   Roles control permissions for viewing solutions, contacts, and companies data; the connector strictly enforces this permissions model.

### Groups and ticket scope[​](#groups-and-ticket-scope "Direct link to Groups and ticket scope")

The connector uses an agent's group membership and assigned scope to filter ticket results:

-   **Group membership:** Agents can belong to one or more groups (for example, “Tier-1 Support,” “Billing,” or “Enterprise Support”).
-   **Ticket scope:** Each agent has a `ticket_scope` value that defines their visibility level:
    -   **Global (1):** Can view all tickets.
    -   **Group (2):** Can view tickets assigned to their specific groups.
    -   **Restricted (3):** Can view only tickets assigned directly to them.

The connector evaluates both the agent’s scope for tickets and their role-based tab permissions for solution articles, contacts, and companies.

### Identity and access requirements[​](#identity-and-access-requirements "Direct link to Identity and access requirements")

Access is restricted to registered Freshdesk users. When a user searches in Glean:

-   Glean resolves their Freshdesk identity and associated metadata.
    
-   Results are filtered so that the user only sees tickets, articles, contacts, and companies they can access in Freshdesk.
    
-   Glean never grants elevated permissions. If an administrator cannot access an object in Freshdesk, that object will not appear in their Glean search results.
