---
url: "https://docs.glean.com/user-guide/mcp/support"
canonical: "https://docs.glean.com/user-guide/mcp/support"
title: "MCP for Support"
description: "Resolve tickets faster and deliver better customer service with Glean's MCP server"
fetched_at: "2026-09-01T13:30:42.615Z"
---
On this page

Support teams use Glean's MCP server to quickly find solutions, understand ticket context, and deliver accurate responses by accessing the full enterprise knowledge base.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

**Recommended connectors:**

-   Zendesk or ServiceNow (for ticketing)
-   Slack
-   Confluence or Notion (for internal knowledge bases)
-   GitHub (for technical issues)
-   Jira (for bug tracking)
-   Google Drive (for documentation)

**Supported MCP hosts:**

-   Claude Desktop
-   ChatGPT
-   Any MCP-compatible interface
-   Embedded in support workflows

## Use Cases[​](#use-cases "Direct link to Use Cases")

### 1\. Ticket Triage and Next Steps[​](#1-ticket-triage-and-next-steps "Direct link to 1. Ticket Triage and Next Steps")

Get immediate recommendations for how to handle incoming tickets based on past resolutions.

### Example Prompt

```
Given Zendesk ticket #12345, use Glean to: 1. Summarize the customer's issue 2. Find similar resolved tickets from the past 3. Check for related bugs in Jira 4. Identify the likely root cause 5. Suggest next steps and who to escalate to if needed 6. Provide confidence level for your recommendation.
```

### Alternative Prompts

```
Use Glean to triage this ticket. Search for similar issues, known bugs,and workarounds. Tell me if this is a quick fix or needs engineering.
```

```
This customer is reporting [error]. Search Glean for past tickets withthis error and show me how they were resolved.
```

**What it does:**

-   Analyzes ticket content and metadata
-   Finds similar historical tickets
-   Checks for known bugs or ongoing incidents
-   Recommends resolution path and priority
-   Suggests escalation if confidence is low

### 2\. Find Similar Resolved Tickets[​](#2-find-similar-resolved-tickets "Direct link to 2. Find Similar Resolved Tickets")

Quickly locate past solutions without manual searching.

### Example Prompt

```
Search Glean for Zendesk tickets about login errors in the last 90 days.Show me the top 3 most common solutions and which customers were affected.
```

### Alternative Prompts

```
Use Glean to find all resolved tickets about [specific error code].What's the pattern? Is there a common fix? 
```

```
This issue looks familiar. Search Glean for similar tickets from enterprise customers andshow me verified solutions.
```

**What it does:**

-   Semantic search across ticket history
-   Identifies resolution patterns
-   Filters by customer segment or date
-   Shows verified solutions

### 3\. Build Contextual Ticket Timeline[​](#3-build-contextual-ticket-timeline "Direct link to 3. Build Contextual Ticket Timeline")

Synthesize full customer context across all systems.

### Example Prompt

```
For customer [Company Name], use Glean to create a timeline of: 1. All open and recent closed support tickets 2. Escalations in the #customer-success Slack channel 3. Recent Salesforce activity and account health 4. Product usage or feature requests from sales calls Highlight anypatterns or recurring issues.
```

### Alternative Prompts

```
Build a detailed support ticket timeline for ticket #12345. Use Glean tofind related Slack threads, Jira bugs, and any internal discussions. 
```

```
Search Glean for everything related to [customer name]: tickets,escalations, bugs, and sales notes. Summarize their experience.
```

**What it does:**

-   Aggregates customer interactions across systems
-   Creates chronological timeline of issues
-   Identifies recurring themes
-   Surfaces relevant internal discussions

### 4\. Draft Ticket Responses[​](#4-draft-ticket-responses "Direct link to 4. Draft Ticket Responses")

Generate accurate, context-aware responses based on knowledge base and past solutions.

### Example Prompt

```
Draft a response to Zendesk ticket #12345. Use Glean to: 1. Find our official documentation about this feature 2. Check for similar tickets and how they were resolved 3. Look for any known issues in Jira 4. Use our response tone guidelines from the support wiki Keep it concise, empathetic,and include relevant links.
```

### Alternative Prompts

```
This customer is asking about [feature]. Use Glean to draft a responsewith links to help docs and relevant examples. 
```

```
Search Glean for our troubleshooting guide for [issue] and draft a step-by-step response I cansend to this customer.
```

**What it does:**

-   Pulls from official documentation
-   Incorporates successful past responses
-   Matches your support tone and style
-   Includes appropriate links and resources

### 5\. Identify Knowledge Base Gaps[​](#5-identify-knowledge-base-gaps "Direct link to 5. Identify Knowledge Base Gaps")

Find recurring issues that need better documentation.

### Example Prompt

```
Use Glean to analyze closed tickets from the last 30 days. Identify: 1. Common issues that took multiple back-and-forths to resolve 2. Topics where agents had to escalate to engineering 3. Questions not covered in our current help docs 4. Feature confusion points mentioned repeatedly Suggest new knowledge base articles we should create.
```

### Alternative Prompts

```
Search Glean for Zendesk tickets about [topic]. Are there gaps in ourdocumentation? What questions keep coming up? 
```

```
Use Glean to find all tickets where agents said "let me check with engineering." What documentation would prevent these escalations?
```

**What it does:**

-   Analyzes ticket patterns
-   Identifies documentation gaps
-   Finds frequently escalated issues
-   Recommends content creation priorities

### 6\. Technical Troubleshooting[​](#6-technical-troubleshooting "Direct link to 6. Technical Troubleshooting")

Access technical documentation and past solutions for complex issues.

### Example Prompt

```
Customer is reporting error code ERR_AUTH_401. Use Glean to: 1. Search technical docs for this error code 2. Find GitHub issues or PRs related to authentication errors 3. Check Slack #engineering for recent authentication issues 4. Look for similar Zendesk tickets and their resolutions Provide a troubleshooting checklist and known solutions.
```

### Alternative Prompts

```
Use Glean to help debug this technical issue. Search our runbooks,GitHub discussions, and past tickets for solutions.
```

```
This looks like a backend issue. Search Glean for recent incidents, related Jira bugs, andengineering team notes about this service.
```

**What it does:**

-   Searches technical documentation and runbooks
-   Connects to engineering systems (GitHub, Jira)
-   Finds past technical resolutions
-   Provides systematic troubleshooting steps

### 7\. Customer Sentiment Analysis[​](#7-customer-sentiment-analysis "Direct link to 7. Customer Sentiment Analysis")

Understand customer satisfaction trends and identify at-risk accounts.

### Example Prompt

```
Use Glean to analyze customer sentiment from tickets and escalations for[customer name]. Check: 1. Recent ticket volume and resolution times 2. Escalations or negative feedback in Slack 3. CSAT scores from resolved tickets 4. Mentions in customer success check-ins Is this account at risk?What are the main pain points?
```

### Alternative Prompts

```
Search Glean for all tickets from enterprise customers in the lastquarter. Which accounts are opening the most tickets? What's the theme?
```

```
Use Glean to check sentiment across all support channels for [customer].Are they happy with our support?
```

**What it does:**

-   Aggregates feedback across channels
-   Identifies sentiment trends
-   Flags at-risk customers
-   Surfaces recurring pain points

### 8\. Onboarding New Support Agents[​](#8-onboarding-new-support-agents "Direct link to 8. Onboarding New Support Agents")

Help new team members ramp up quickly with instant access to tribal knowledge.

### Example Prompt

```
I'm new to the support team. Use Glean to: 1. Find our support processdocumentation 2. Show me examples of well-handled complex tickets 3. Locateour product documentation and common troubleshooting guides 4. Tell me whothe subject matter experts are for different product areas
```

### Alternative Prompts

```
Use Glean to explain our escalation process. When should I escalate toengineering vs customer success vs product? 
```

```
Search Glean for training materials and best practices for handling [type of issue]. Show meexamples of good responses.
```

**What it does:**

-   Locates onboarding documentation
-   Finds example tickets and responses
-   Identifies subject matter experts
-   Surfaces process guidelines

### 9\. Bug Verification and Reporting[​](#9-bug-verification-and-reporting "Direct link to 9. Bug Verification and Reporting")

Determine if a ticket is a bug and gather information for engineering.

### Example Prompt

```
This ticket might be a bug. Use Glean to: 1. Check if this is a knownissue in Jira 2. Find similar reports from other customers 3. Search forrecent code changes that might be related 4. Look for engineeringdiscussions about this area Should I file a new bug report? If yes, draft itwith all relevant context.
```

### Alternative Prompts

```
Search Glean for other reports of [issue]. Is this a pattern? Gatherrepro steps and affected customers for a bug report. 
```

```
Use Glean to check if engineering knows about this issue. Search Jira, GitHub, and Slack#engineering for mentions.
```

**What it does:**

-   Checks for existing bug reports
-   Finds duplicate reports from other customers
-   Gathers reproduction steps
-   Drafts comprehensive bug reports

### 10\. Feature Request Validation[​](#10-feature-request-validation "Direct link to 10. Feature Request Validation")

Understand the scope and priority of feature requests.

### Example Prompt

```
Customer is requesting [feature]. Use Glean to: 1. Check if this is already on the roadmap (Jira, product docs) 2. Find how many other customers have requested this 3. Look for related sales conversations or escalations4. Search for any product strategy docs mentioning this area 5. Summarize demand and provide an informed response to the customer.
```

### Alternative Prompts

```
Search Glean for all feature requests about [capability]. How manycustomers want this? What's the business impact? 
```

```
Use Glean to check our product roadmap and recent planning docs. Is [feature] planned? Whenmight it ship?
```

**What it does:**

-   Checks roadmap and planning docs
-   Aggregates feature request volume
-   Assesses business impact
-   Provides informed customer responses

## Best Practices[​](#best-practices "Direct link to Best Practices")

### Always Verify Solutions[​](#always-verify-solutions "Direct link to Always Verify Solutions")

```
After Glean suggests a solution, verify it matches current product behaviorbefore sending to customers. Documentation can be outdated.
```

### Use Specific Ticket References[​](#use-specific-ticket-references "Direct link to Use Specific Ticket References")

```
✅ "Given Zendesk ticket #12345..."✅ "For customer Acme Corp (SFDC account 001...)..."❌ "This customer has a problem..." (too vague)
```

### Prioritize Recent Information[​](#prioritize-recent-information "Direct link to Prioritize Recent Information")

```
Search Glean for solutions from the last 30 days - our product changesfrequently and older solutions may not apply.
```

### Combine Sources[​](#combine-sources "Direct link to Combine Sources")

```
Search both our public help docs and internal troubleshooting guides.Internal docs often have more detailed technical steps.
```

### Request Confidence Indicators[​](#request-confidence-indicators "Direct link to Request Confidence Indicators")

```
Include your confidence level and reasoning. If confidence is low, suggestI escalate to [specific team/person].
```

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

**Getting irrelevant ticket results?**

-   Use ticket status filters ("resolved tickets only")
-   Specify date ranges ("in the last 90 days")
-   Add customer segment context ("enterprise customers")

**Responses too technical or too vague?**

-   Reference your response guidelines: "Use our support tone guide from Confluence"
-   Specify audience: "Draft a response for a non-technical user"
-   Provide examples: "Similar to how we handled ticket #98765"

**Missing internal context?**

-   Verify Slack channels are indexed (#support, #customer-success, #engineering)
-   Check that internal wikis and runbooks are connected
-   Ensure Jira connector includes relevant projects

**Slow response times?**

-   Break complex queries into smaller steps
-   Search specific connectors rather than everything
-   Use ticket IDs or error codes for faster lookups

## See also[​](#see-also "Direct link to See also")

-   [MCP Setup Guide](/user-guide/mcp/usage) - Initial configuration
-   [Glean for Support](https://www.glean.com/solutions/support) - Overview of support use cases
-   [Chat Best Practices](/user-guide/assistant/best-practices) - Prompting tips
