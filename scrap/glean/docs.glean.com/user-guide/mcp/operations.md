---
url: "https://docs.glean.com/user-guide/mcp/operations"
canonical: "https://docs.glean.com/user-guide/mcp/operations"
title: "MCP for Operations"
description: "IT support, HR policies, meeting prep, and incident response with Glean's MCP server"
fetched_at: "2026-09-01T13:30:42.503Z"
---
On this page

Operations teams (IT, HR, and general ops) use Glean's MCP server to answer employee questions, troubleshoot issues, prepare for meetings, and respond to incidents efficiently.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

**Recommended connectors:**

-   Confluence (or Notion for internal wikis)
-   Slack
-   Jira or ServiceNow (for IT ticketing)
-   Google Drive and Gmail (or SharePoint and Outlook)
-   Workday or BambooHR (for HR data)
-   Google Calendar or Outlook (for scheduling)

**Supported MCP hosts:**

-   Claude Desktop
-   ChatGPT
-   Any MCP-compatible interface

## Use Cases[​](#use-cases "Direct link to Use Cases")

### 1\. IT Troubleshooting Assistant[​](#1-it-troubleshooting-assistant "Direct link to 1. IT Troubleshooting Assistant")

Help employees resolve technical issues by searching knowledge bases and past solutions.

### Example Prompt

```
An employee is reporting: "I can't access the VPN." Use Glean to:1. Search our IT knowledge base for VPN troubleshooting guides2. Find similar past IT tickets and their resolutions3. Check for recent Slack mentions of VPN issues4. Look for known incidents or outagesProvide step-by-step troubleshooting instructions. If this doesn't resolve it, suggest who to escalate to.
```

### Alternative Prompts

```
Search Glean's IT documentation for how to reset a user's laptop. Provide thecomplete procedure with any security considerations.
```

```
Use Glean to help troubleshoot this error: [error message]. Check runbooks,past tickets, and engineering discussions for solutions.
```

**What it does:**

-   Searches internal IT documentation
-   Finds similar past issues and resolutions
-   Checks for ongoing incidents
-   Provides escalation paths when needed

**Real impact:** Reduces IT ticket volume by enabling self-service and faster first-line resolution.

### 2\. HR Policy Questions[​](#2-hr-policy-questions "Direct link to 2. HR Policy Questions")

Answer employee questions about policies, benefits, and procedures.

### Example Prompt

```
An employee is asking about our parental leave policy. Use Glean to:1. Find the official parental leave policy document2. Check for any recent updates or changes3. Look for related FAQs or guidance4. Search for examples of how this policy has been appliedProvide a clear answer with links to the official policy.
```

### Alternative Prompts

```
Search Glean for our PTO policy. How much vacation do employees get?What's the rollover policy?
```

```
Use Glean to explain our expense reimbursement process. What's allowed?What's the approval workflow?
```

**What it does:**

-   Retrieves official policy documents
-   Finds supplementary guidance and FAQs
-   Provides consistent, accurate answers
-   Reduces HR team inquiries

### 3\. Meeting Preparation[​](#3-meeting-preparation "Direct link to 3. Meeting Preparation")

Gather context and prepare for upcoming meetings automatically.

### Example Prompt

```
I have a 1:1 with [person] in an hour. Use Glean to prepare me:1. Find recent projects or documents they're working on2. Check for any Slack messages or emails between us3. Look for action items from our last meeting4. Search for any blockers or issues they've mentionedCreate a meeting prep doc with topics to discuss.
```

### Alternative Prompts

```
Use Glean to prepare for my team meeting. Summarize what everyone worked onthis week based on Slack, Jira, and documents.
```

```
I'm meeting with [stakeholder] about [project]. Search Glean for the currentstatus, open issues, and recent discussions.
```

**What it does:**

-   Aggregates recent activity and context
-   Identifies action items and follow-ups
-   Surfaces relevant discussions
-   Creates structured meeting prep

### 4\. Daily Digest and Morning Briefing[​](#4-daily-digest-and-morning-briefing "Direct link to 4. Daily Digest and Morning Briefing")

Get a personalized summary of what you need to know to start your day.

### Example Prompt

```
Create my daily morning digest using Glean:1. Summarize important Slack messages I missed overnight2. List action items from recent emails3. Show my calendar for today with context on each meeting4. Flag any urgent mentions or escalations5. Highlight documents that were shared with mePrioritize by urgency and relevance to my role.
```

### Alternative Prompts

```
Use Glean to create a Monday morning team update: What happened last week inour Slack channels, what's coming up this week from calendars, any blockersmentioned?
```

```
Search Glean for everything important that happened while I was out. Summarizedecisions, action items, and urgent items needing my attention.
```

**What it does:**

-   Aggregates information from multiple sources
-   Filters by relevance and urgency
-   Extracts action items automatically
-   Provides context for meetings

### 5\. Incident Response and Timeline[​](#5-incident-response-and-timeline "Direct link to 5. Incident Response and Timeline")

Quickly understand incidents by pulling together logs, discussions, and tools.

### Example Prompt

```
We had an outage this morning. Use Glean to build an incident timeline:1. Find the initial alert or escalation in Slack2. Locate related Jira tickets or incident reports3. Search for relevant code changes or deployments4. Gather discussion from incident channels5. Identify when the issue was resolvedCreate a chronological timeline with key events and actions taken.
```

### Alternative Prompts

```
Use Glean to help with an incident postmortem. Find all related Slackthreads, Jira tickets, PRs, and logs to create a complete picture. 
```

```
Search Glean for context on this incident: customer impact from supporttickets, root cause from engineering, and timeline from Slack.
```

**What it does:**

-   Aggregates incident data from multiple sources
-   Creates chronological timelines
-   Identifies root causes and resolutions
-   Supports postmortem creation

### 6\. Onboarding New Employees[​](#6-onboarding-new-employees "Direct link to 6. Onboarding New Employees")

Provide comprehensive onboarding information and resources.

### Example Prompt

```
A new engineer is starting next week. Use Glean to create an onboarding package:1. Find our engineering onboarding documentation2. Locate setup guides for dev environments3. Identify key people on the engineering team and their roles4. List common resources and tools they'll need access toCreate a structured onboarding checklist with links.
```

### Alternative Prompts

```
Search Glean for onboarding materials for [role]. What should a new hire read,who should they meet, what tools do they need?
```

```
Use Glean to help me onboard to [team/project]. What docs should I read first?Who owns what? What's the current state of work?
```

**What it does:**

-   Compiles onboarding documentation
-   Identifies key contacts and resources
-   Creates structured checklists
-   Ensures consistent onboarding experience

### 7\. Software Access Requests[​](#7-software-access-requests "Direct link to 7. Software Access Requests")

Streamline software access approval workflows.

### Example Prompt

```
Employee needs access to [software]. Use Glean to:1. Find our software access policy2. Check who typically approves this type of request3. Look for the access request form or process4. Verify any compliance or security requirementsDraft an approval request or create a ticket with all required information.
```

### Alternative Prompts

```
Search Glean for the process to request [tool] access. What's the approvalworkflow? What information do I need to provide?
```

```
Use Glean to check if we have licenses available for [software] and who managesaccess provisioning.
```

**What it does:**

-   Retrieves access policies and procedures
-   Identifies approval workflows
-   Ensures compliance requirements are met
-   Streamlines request processing

### 8\. Company Announcements and Updates[​](#8-company-announcements-and-updates "Direct link to 8. Company Announcements and Updates")

Find important company information and announcements quickly.

### Example Prompt

```
Search Glean for recent company announcements about:1. Organizational changes or new leadership2. Product launches or major features3. Company events or all-hands meetings4. Policy updates that affect employeesSummarize the most important updates from the last month.
```

### Alternative Prompts

```
Use Glean to find information about [upcoming event]. When is it? What's theagenda? How do I register?
```

```
Search Glean for our Q3 OKRs and how they were announced. What are the companypriorities this quarter?
```

**What it does:**

-   Searches announcements and updates
-   Filters by relevance and recency
-   Summarizes key information
-   Provides links to full details

### 9\. Performance Review Preparation[​](#9-performance-review-preparation "Direct link to 9. Performance Review Preparation")

Gather information to prepare for performance reviews.

### Example Prompt

```
Help me prepare for my performance review. Use Glean to:1. Find projects I worked on this review period2. Locate documents I created or contributed to3. Search for positive feedback or recognition in Slack/emails4. Identify key metrics or results I deliveredCreate a summary of accomplishments with supporting evidence.
```

### Alternative Prompts

```
I'm writing a performance review for [direct report]. Use Glean to find theirprojects, contributions, feedback from others, and key achievements.
```

```
Search Glean for my work on [major project] to document my contributions forthe performance review.
```

**What it does:**

-   Aggregates work artifacts and contributions
-   Finds feedback and recognition
-   Quantifies impact where possible
-   Creates evidence-based summaries

### 10\. Finding Subject Matter Experts[​](#10-finding-subject-matter-experts "Direct link to 10. Finding Subject Matter Experts")

Quickly identify who to ask for help on specific topics.

### Example Prompt

```
Who should I talk to about [technical topic/project]? Use Glean to:1. Find people who've authored docs on this topic2. Check who's been active in related Slack discussions3. Look for code owners or recent contributors4. Identify team ownership from org docsRecommend 2-3 people to contact and why they're relevant.
```

### Alternative Prompts

```
Use Glean to find experts on [tool/technology] in our company. Who hasexperience with this and might be able to help?
```

```
Search Glean for who owns [service/project]. Who should I talk to about makingchanges or asking questions?
```

**What it does:**

-   Identifies document authors and contributors
-   Analyzes discussion participation
-   Surfaces code ownership
-   Recommends specific people with context

## Best Practices[​](#best-practices "Direct link to Best Practices")

### Maintain Up-to-Date Documentation[​](#maintain-up-to-date-documentation "Direct link to Maintain Up-to-Date Documentation")

MCP works best when your knowledge base is current:

-   Regularly update IT runbooks and troubleshooting guides
-   Keep HR policies and FAQs current
-   Archive outdated documentation
-   Mark documents with last-reviewed dates

### Use Specific Department or Topic Tags[​](#use-specific-department-or-topic-tags "Direct link to Use Specific Department or Topic Tags")

```
✅ "Search IT knowledge base for VPN troubleshooting"✅ "Find HR policy about remote work"❌ "How do I fix this?" (too vague, no context)
```

### Combine with Ticket Systems[​](#combine-with-ticket-systems "Direct link to Combine with Ticket Systems")

```
After Glean helps resolve an issue, document the solution in yourticketing system so future queries are even more effective.
```

### Verify Sensitive Information[​](#verify-sensitive-information "Direct link to Verify Sensitive Information")

```
For HR questions about individual employee situations, verify the answerwith official sources before providing guidance.
```

### Leverage for Self-Service[​](#leverage-for-self-service "Direct link to Leverage for Self-Service")

```
Empower employees to use Glean directly for common questions, reducingload on IT and HR teams.
```

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

**Can't find documentation?**

-   Verify that knowledge base connectors (Confluence, wikis) are set up
-   Check that documents are properly indexed
-   Ensure you have permissions to access the documentation

**Outdated information in results?**

-   Use date filters: "policies updated in the last year"
-   Check document metadata for last-updated dates
-   Flag outdated docs for archiving or updating

**Missing context from Slack?**

-   Verify Slack connector includes relevant channels
-   Check that historical messages are indexed
-   Use specific channel names in queries

**Privacy concerns with employee data?**

-   MCP respects existing permissions
-   Verify connectors honor data access controls
-   For sensitive HR queries, ensure proper authorization

## See also[​](#see-also "Direct link to See also")

-   [MCP Setup Guide](/user-guide/mcp/usage) - Initial configuration
-   [Chat Best Practices](/user-guide/assistant/best-practices) - Prompting tips
-   [Glean for Engineering](https://www.glean.com/solutions/engineering) - Engineering workflows
