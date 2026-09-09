---
url: "https://docs.glean.com/agents/templates"
canonical: "https://docs.glean.com/agents/templates"
title: "Agent templates"
description: "Pre-built agent templates for common workflows"
fetched_at: "2026-09-01T13:29:17.240Z"
---
On this page

Agent templates are pre-configured agents designed for common use cases across your organization. Each template includes the prompts, tools, and workflow logic needed to accomplish specific tasks. You can use these templates as starting points and customize them to fit your organization's needs.

To use a template, navigate to the Agent Builder and select from the available templates when creating a new agent. Templates are organized by category (General, Engineering, HR, IT, Marketing, Sales, Support) to help you find the right starting point.

## Personal productivity[​](#personal-productivity "Direct link to Personal productivity")

Personal productivity templates help all employees augment their work and accomplish routine tasks faster.

### Daily action items[​](#daily-action-items "Direct link to Daily action items")

Get a list of outstanding action items based on your activity across apps connected to Glean.

#### What it does[​](#what-it-does "Direct link to What it does")

This agent uses Glean's knowledge graph to understand what connectors matter most to any given user and scans each of those sources for items the user owns and has not yet completed. It outputs a formatted report of the user's action items, separated by "high confidence" - what is explicitly owned by the user - and "ambiguous" - items that relate closely to the user's work, but where the user may not be explicitly tagged.

#### Requirements[​](#requirements "Direct link to Requirements")

| Requirement | Details |
| --- | --- |
| Feature flag | None - the [agentic engine](/user-guide/assistant/glean-chat/) is enabled by default |
| Connectors | None |

#### Inputs and outputs[​](#inputs-and-outputs "Direct link to Inputs and outputs")

**Inputs:** N/A, this agent runs without any user input required

**Outputs:**

-   List of high-confidence action items
-   List of ambiguous action items

* * *

### Plan my day[​](#plan-my-day "Direct link to Plan my day")

Get a concise brief to prep you for your day, including suggested focus areas, reminders, meeting prep, and recommended focus blocks.

Note that two versions of this template are available; one which works for Outlook Calendar and one for Google Calendar. If both show up in your template library, check the description to determine which version you should use.

#### What it does[​](#what-it-does-1 "Direct link to What it does")

This agent uses Glean's knowledge graph to understand what connectors matter most to any given user. It examines data across these sources over a one-week period to determine what the user's biggest focus areas are and what may have slipped off of their radar, and then cross-references these insights with the user's calendar for the day to produce a daily prep brief to help the user best manage their time.

#### Requirements[​](#requirements-1 "Direct link to Requirements")

| Requirement | Details |
| --- | --- |
| Feature flag | None - the [agentic engine](/user-guide/assistant/glean-chat/) is enabled by default |
| Connectors | **Google Calendar OR Outlook Calendar (via Microsoft Teams)** (at least one calendar connector required) |

#### Inputs and outputs[​](#inputs-and-outputs-1 "Direct link to Inputs and outputs")

**Inputs:** N/A, this agent runs without any user input required

**Outputs:**

-   Suggested focus areas for the day
-   Reminders for items that may have slipped the user's attention
-   Meeting prep
-   Suggested focus blocks with links to automatically create calendar blocks pre-filled with relevant tasks

* * *

### Weekly work report[​](#weekly-work-report "Direct link to Weekly work report")

Create a report detailing what the user accomplished in the past week.

#### What it does[​](#what-it-does-2 "Direct link to What it does")

This agent collects a week of data from the user's knowledge graph and performs reasoning to understand what the key contributions made by the user were. It produces a formatted report of the user's accomplishments, grouped by project.

#### Requirements[​](#requirements-2 "Direct link to Requirements")

| Requirement | Details |
| --- | --- |
| Feature flag | None |
| Connectors | None |

#### Inputs and outputs[​](#inputs-and-outputs-2 "Direct link to Inputs and outputs")

**Inputs:** N/A, this agent runs without any user input required

**Outputs:**

-   List of the user's accomplishments from the past week, grouped by project

* * *

## Marketing[​](#marketing "Direct link to Marketing")

Marketing templates help teams create content, manage events, and generate insights from customer interactions.

### Persona-based event messaging[​](#persona-based-event-messaging "Direct link to Persona-based event messaging")

Create tailored elevator pitches and talking points for specific personas at sponsored events.

#### What it does[​](#what-it-does-3 "Direct link to What it does")

This agent generates customized messaging for different audience segments attending your events. Given a persona type and event name, it produces an elevator pitch, relevant use cases, referenceable customers, and partner information to help your team engage effectively with attendees.

#### Requirements[​](#requirements-3 "Direct link to Requirements")

| Requirement | Details |
| --- | --- |
| Feature flag | None - the [agentic engine](/user-guide/assistant/glean-chat/) is enabled by default |
| Connectors | None |

#### Inputs and outputs[​](#inputs-and-outputs-3 "Direct link to Inputs and outputs")

**Inputs:**

-   Persona type (e.g., "IT Director", "Developer", "Executive")
-   Event name

**Outputs:**

-   Elevator pitch tailored to the persona
-   Relevant use cases for that audience
-   3 referenceable customers
-   Partner information

* * *

### Marketing event description[​](#marketing-event-description "Direct link to Marketing event description")

Transform internal event briefs into engaging, on-brand event descriptions.

#### What it does[​](#what-it-does-4 "Direct link to What it does")

This agent takes your internal event documentation and converts it into polished, customer-facing event descriptions. It maintains your brand voice while making the content compelling for your target audience.

#### Requirements[​](#requirements-4 "Direct link to Requirements")

| Requirement | Details |
| --- | --- |
| Feature flag | None - the [agentic engine](/user-guide/assistant/glean-chat/) is enabled by default |
| Connectors | None |

#### Inputs and outputs[​](#inputs-and-outputs-4 "Direct link to Inputs and outputs")

**Inputs:**

-   Event brief (description text or link to internal document)

**Outputs:**

-   Polished event description ready for publication

* * *

### Customer reference summary[​](#customer-reference-summary "Direct link to Customer reference summary")

Surface the best-fit customer references for live deals based on industry, company size, and use cases.

#### What it does[​](#what-it-does-5 "Direct link to What it does")

This agent searches your CRM and internal knowledge to find customers that match the profile of your prospect. It returns a structured table of relevant references including account details, deployment information, and use cases that align with your deal.

#### Requirements[​](#requirements-5 "Direct link to Requirements")

| Requirement | Details |
| --- | --- |
| Feature flag | None - the [agentic engine](/user-guide/assistant/glean-chat/) is enabled by default |
| Connectors | **Salesforce OR HubSpot** (at least one CRM connector required) |

#### Inputs and outputs[​](#inputs-and-outputs-5 "Direct link to Inputs and outputs")

**Inputs:**

-   Industry
-   Company size
-   Use cases to match

**Outputs:**

-   Table with 3 recommended customer references including:
    -   CRM links
    -   Account owner
    -   Deployment date
    -   Matching use cases

* * *

### LinkedIn post draft[​](#linkedin-post-draft "Direct link to LinkedIn post draft")

Convert internal wins and product launches into polished LinkedIn posts.

#### What it does[​](#what-it-does-6 "Direct link to What it does")

This agent takes information about company news, product launches, or team wins and drafts a professional LinkedIn post. It includes UTM tracking for analytics and provides a direct link to post the draft to LinkedIn.

#### Requirements[​](#requirements-6 "Direct link to Requirements")

| Requirement | Details |
| --- | --- |
| Feature flag | None - the [agentic engine](/user-guide/assistant/glean-chat/) is enabled by default |
| Connectors | None |

#### Inputs and outputs[​](#inputs-and-outputs-6 "Direct link to Inputs and outputs")

**Inputs:**

-   Chat message describing what to post about (e.g., "We just launched our new analytics dashboard")

**Outputs:**

-   Draft LinkedIn post
-   One-click "Draft to LinkedIn" link with UTM tracking

* * *

### SEO keyword research from sales calls[​](#seo-keyword-research-from-sales-calls "Direct link to SEO keyword research from sales calls")

Analyze sales call transcripts to generate blog topic ideas and SEO keywords.

#### What it does[​](#what-it-does-7 "Direct link to What it does")

This agent reviews sales call recordings and transcripts to identify common questions, pain points, and topics that prospects ask about. It then uses web search to validate keyword opportunities and generates actionable blog topic ideas with supporting keywords.

#### Requirements[​](#requirements-7 "Direct link to Requirements")

| Requirement | Details |
| --- | --- |
| Feature flag | None explicitly required |
| Connectors | **Web Search** |

#### Inputs and outputs[​](#inputs-and-outputs-7 "Direct link to Inputs and outputs")

**Inputs:**

-   Industry to focus on

**Outputs:**

-   5+ blog topic ideas with:
    -   Topic context from sales conversations
    -   Recommended SEO keywords
