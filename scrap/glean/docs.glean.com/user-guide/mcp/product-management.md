---
url: "https://docs.glean.com/user-guide/mcp/product-management"
canonical: "https://docs.glean.com/user-guide/mcp/product-management"
title: "MCP for Product Management"
description: "Draft PRDs, track features, and research markets with Glean's MCP server"
fetched_at: "2026-09-01T13:30:42.549Z"
---
On this page

Product managers use Glean's MCP server to synthesize information across tools, draft documentation, and stay on top of project status without constant context switching.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

**Recommended connectors:**

-   Jira (or Linear, Asana)
-   Confluence (or Notion)
-   Slack
-   GitHub (for engineering context)
-   Salesforce (for customer feedback)
-   Gong or Zoom (for meeting transcripts)
-   Google Drive (for documents and presentations)

**Supported MCP hosts:**

-   Claude Desktop
-   ChatGPT
-   Cursor
-   Any MCP-compatible chat interface

## Use Cases[​](#use-cases "Direct link to Use Cases")

### 1\. Draft Product Requirements Documents[​](#1-draft-product-requirements-documents "Direct link to 1. Draft Product Requirements Documents")

Generate first drafts of PRDs using context from existing docs, customer feedback, and team discussions.

### Example Prompt

```
Use Glean to draft a first version of a PRD for [feature name]. Include:1. Target persona and pain points from our Notion customer research2. Jobs-to-be-done from recent sales calls in Gong3. Technical constraints from engineering Slack discussions4. Similar features we've built, based on past PRDsStructure it using our standard PRD template in Confluence.
```

### Alternative Prompts

```
Search Glean for customer requests about [feature area] in the last 6 months.Draft a PRD that addresses the top 3 pain points.
```

```
Use Glean to find our PRD template, then draft a new PRD for [feature] usingcontext from Jira epic PROJ-123 and related Slack threads.
```

**What it does:**

-   Pulls relevant customer feedback and research
-   Finds similar past features for reference
-   Incorporates technical constraints from engineering
-   Structures content using your team's template

**Note:** PRD generation works best when you have well-structured Notion pages or Confluence spaces with customer research and templates.

### 2\. Roadmap Planning and Status Updates[​](#2-roadmap-planning-and-status-updates "Direct link to 2. Roadmap Planning and Status Updates")

Synthesize project status across multiple sources to create comprehensive updates.

### Example Prompt

```
Generate a summary of current project statuses and upcoming milestones fromJira and Confluence for the Q3 roadmap. Include:- Projects in progress with completion percentage- Blocked items and their reasons- Upcoming milestones in the next 30 days- Red flags or risks mentioned in recent standupsFormat as a table.
```

### Alternative Prompts

```
Use Glean to create a weekly roadmap update by checking Jira epics tagged"Q3-2025", recent #product-updates Slack messages, and engineering teamupdates. Highlight changes from last week.
```

```
Search Glean for all projects assigned to my team. Summarize progress,blockers, and next steps for each.
```

**What it does:**

-   Aggregates status from Jira, Confluence, and Slack
-   Identifies blockers and dependencies
-   Highlights changes and risks
-   Formats for stakeholder communication

### 3\. Analyze and Prioritize Feature Requests[​](#3-analyze-and-prioritize-feature-requests "Direct link to 3. Analyze and Prioritize Feature Requests")

Compile customer feedback from multiple channels and identify patterns.

### Example Prompt

```
Use Glean to compile and prioritize user feedback on recent productupdates. Search: - Zendesk tickets tagged "feature-request" - Slack#customer-feedback channel from last 60 days - Sales calls in Gongmentioning "feature request" - Existing Jira tickets with customer votesCategorize by theme, count mentions, assess business impact, and recommendtop 3 priorities.
```

### Alternative Prompts

```
Search Glean for all customer requests about [feature area]. Group bycustomer segment and show which enterprise customers are asking for it.
```

```
Use Glean to analyze feedback from the last product launch. What areusers loving? What's causing friction?
```

**What it does:**

-   Aggregates feedback across support, sales, and direct channels
-   Identifies common themes and patterns
-   Links to specific customer examples
-   Helps prioritize based on frequency and impact

### 4\. Competitive Research[​](#4-competitive-research "Direct link to 4. Competitive Research")

Gather competitive intelligence from internal discussions, sales calls, and research docs.

### Example Prompt

```
Use Glean to compile competitive intelligence on [competitor name]: 1.Search sales call transcripts where they were mentioned 2. Find competitiveanalysis docs in Confluence 3. Look for Slack discussions in #sales aboutcompetitive deals 4. Identify features customers say they have that we don'tSummarize their positioning, key features, and our win/loss patterns.
```

### Alternative Prompts

```
Search Glean for recent "why we lost" discussions mentioning [competitor]. Whatfeatures are causing us to lose deals?
```

```
Use Glean to find all competitive battlecards and analysis docs. What do weknow about [competitor]'s pricing and target customers?
```

**What it does:**

-   Aggregates competitive mentions across sales and product
-   Identifies feature gaps and win/loss themes
-   Surfaces recent competitive intelligence
-   Links to detailed battlecards and analysis

### 5\. RFC-to-Reality Validation[​](#5-rfc-to-reality-validation "Direct link to 5. RFC-to-Reality Validation")

Compare design documents to what was actually shipped to identify gaps.

### Example Prompt

```
Use Glean to find the RFC for "[feature name]" and compare the approved designto what was actually implemented. Check:1. The original design doc2. Merged PRs for this feature3. Slack discussions about scope changes4. Current feature documentationList what was cut, what changed, and what needs documenting.
```

### Alternative Prompts

```
Compare the original PRD for [feature] to the shipped version. Use Glean tofind what acceptance criteria weren't met and why.
```

```
Search Glean for the design doc and release notes for [feature]. Did we deliverwhat was promised?
```

**What it does:**

-   Compares planned vs shipped features
-   Identifies scope changes and cuts
-   Finds reasoning in Slack or PR discussions
-   Highlights documentation gaps

### 6\. Customer Impact Analysis[​](#6-customer-impact-analysis "Direct link to 6. Customer Impact Analysis")

Understand how customers are affected by features or issues.

### Example Prompt

```
Use Glean to analyze customer impact of [bug/incident/feature]:1. Search Zendesk for related support tickets2. Find Slack escalations in #customer-success3. Check Salesforce for affected accounts and their ARR4. Look for Gong calls discussing this issueSummarize severity, affected customer segments, and business impact.
```

### Alternative Prompts

```
Search Glean for all customer mentions of [feature] since launch. Are customersusing it? What feedback are we getting?
```

```
Use Glean to find which enterprise customers are affected by bug JIRA-123 basedon support tickets and escalations.
```

**What it does:**

-   Identifies affected customers across support and sales
-   Quantifies business impact
-   Surfaces specific customer feedback
-   Helps prioritize fixes or communication

### 7\. Stakeholder Meeting Preparation[​](#7-stakeholder-meeting-preparation "Direct link to 7. Stakeholder Meeting Preparation")

Gather context before meetings with executives or cross-functional partners.

### Example Prompt

```
I have a meeting with [person] about [topic] tomorrow. Use Glean to:1. Find recent documents they've created or commented on about this topic2. Check Slack for their recent concerns or questions3. Summarize the current status from Jira and Confluence4. Identify any blockers or decisions neededCreate a meeting prep doc with key points and potential questions.
```

### Alternative Prompts

```
Use Glean to prepare me for the quarterly business review. Find progress onOKRs, customer wins, and key metrics from our dashboards.
```

```
Search Glean for everything about project X that [executive] would care about:status, risks, customer impact, and next milestones.
```

**What it does:**

-   Aggregates relevant context for the meeting
-   Identifies stakeholder concerns from recent activity
-   Prepares talking points and potential questions
-   Ensures you have latest status information

### 8\. Market and Trend Analysis[​](#8-market-and-trend-analysis "Direct link to 8. Market and Trend Analysis")

Research market trends and opportunities using internal knowledge.

### Example Prompt

```
Use Glean to analyze recent market trends in [market segment]:1. Search for analyst reports and competitive research in Confluence2. Find sales calls discussing market changes3. Look for customer requests indicating new use cases4. Check product strategy docs mentioning this marketSummarize emerging trends and opportunities for us.
```

### Alternative Prompts

```
Search Glean for customer conversations about [emerging technology]. Arecustomers asking about this? What's the demand signal?
```

```
Use Glean to find our latest market analysis and customer research about[vertical/segment]. What opportunities are we seeing?
```

**What it does:**

-   Synthesizes market intelligence from multiple sources
-   Identifies emerging customer needs
-   Connects market trends to internal strategy
-   Surfaces relevant analyst reports and research

### 9\. Sprint Planning Support[​](#9-sprint-planning-support "Direct link to 9. Sprint Planning Support")

Prepare for sprint planning with comprehensive epic and story context.

### Example Prompt

```
Use Glean to help plan next sprint. For epic PROJ-456:1. Find the original PRD and design docs2. Check engineering Slack for technical concerns3. List related bugs or tech debt from Jira4. Identify dependencies on other teamsSuggest a story breakdown and flag risks.
```

### Alternative Prompts

```
Search Glean for everything about [feature] to help estimate effort. Findsimilar features we've built and how long they took.
```

```
Use Glean to check if epic PROJ-456 has all required design approvals,security reviews, and technical specs before we start building.
```

**What it does:**

-   Gathers full context for sprint planning
-   Identifies dependencies and risks
-   Finds similar work for estimation
-   Ensures prerequisites are met

### 10\. Post-Launch Analysis[​](#10-post-launch-analysis "Direct link to 10. Post-Launch Analysis")

Evaluate feature launches by analyzing adoption and feedback.

### Example Prompt

```
Use Glean to analyze the [feature name] launch from 30 days ago:1. Search for customer feedback in Zendesk or support tickets2. Find usage discussions in #customer-success Slack3. Check for bugs filed in Jira4. Look for mentions in sales callsSummarize adoption, feedback themes, and issues to address.
```

### Alternative Prompts

```
Search Glean for all feedback and metrics about [feature] since launch. Is itmeeting the goals from the PRD?
```

```
Use Glean to create a post-launch report for [feature]: usage data mentions,customer quotes, bugs filed, and next iteration ideas.
```

**What it does:**

-   Aggregates launch feedback from multiple channels
-   Identifies adoption patterns and issues
-   Compares results to original goals
-   Informs iteration planning

## Best Practices[​](#best-practices "Direct link to Best Practices")

### Structure Your Knowledge Base[​](#structure-your-knowledge-base "Direct link to Structure Your Knowledge Base")

PMs get better results when:

-   PRD templates are in Confluence or Notion
-   Feature requests are consistently tagged in Jira/Zendesk
-   Customer research is centralized and well-organized
-   Meeting notes follow consistent formats

### Use Specific Identifiers[​](#use-specific-identifiers "Direct link to Use Specific Identifiers")

```
✅ "Search for feedback on feature X (PROJ-123)"✅ "Find PRDs tagged with #enterprise"❌ "Find product docs" (too broad)
```

### Combine Qualitative and Quantitative[​](#combine-qualitative-and-quantitative "Direct link to Combine Qualitative and Quantitative")

```
Use Glean to find customer quotes about [feature], then analyze usagemetrics from our analytics dashboard to validate the feedback.
```

### Iterate on Drafts[​](#iterate-on-drafts "Direct link to Iterate on Drafts")

```
After Glean drafts a PRD, ask: "Now add technical constraints from theengineering team's RFC" or "Expand the success metrics section"
```

### Validate Assumptions[​](#validate-assumptions "Direct link to Validate Assumptions")

```
I think customers want [feature]. Use Glean to search support tickets,sales calls, and feature requests to validate or challenge this.
```

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

**Incomplete PRD drafts?**

-   Ensure your Notion/Confluence has well-structured templates and research
-   Be specific about which docs to reference
-   Break into smaller steps: "First find the template, then draft section by section"

**Missing customer feedback?**

-   Verify connectors for support tools (Zendesk or ServiceNow) are set up
-   Check that Gong or Zoom meeting transcript tools are indexed
-   Use specific date ranges to narrow results

**Generic competitive analysis?**

-   Reference specific battlecards or analysis docs by name
-   Ask for specific aspects (pricing, features, positioning)
-   Include both sales call insights and formal research

## See also[​](#see-also "Direct link to See also")

-   [MCP Setup Guide](/user-guide/mcp/usage) - Initial configuration
-   [Chat Best Practices](/user-guide/assistant/best-practices) - Prompting tips
-   [Deep Research](/user-guide/assistant/deep-research) - In-depth analysis features
