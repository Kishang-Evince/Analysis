---
url: "https://docs.glean.com/user-guide/mcp/sales"
canonical: "https://docs.glean.com/user-guide/mcp/sales"
title: "MCP for Sales"
description: "Research accounts, prepare for calls, and close deals faster with Glean's MCP server"
fetched_at: "2026-09-01T13:30:42.586Z"
---
On this page

Sales teams use Glean's MCP server to gather comprehensive account intelligence, prepare for meetings, and stay on top of deal progress without switching between multiple tools.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

**Recommended connectors:**

-   Salesforce or HubSpot (for CRM)
-   Slack
-   Gong or Zoom (for call recordings)
-   Gmail or Outlook
-   Confluence or Notion (for internal wikis)
-   Zendesk (for customer health)
-   Google Drive (for proposals and presentations)

**Supported MCP hosts:**

-   Claude Desktop
-   ChatGPT
-   Any MCP-compatible interface

## Use Cases[​](#use-cases "Direct link to Use Cases")

### 1\. Customer 360 / Account Snapshot[​](#1-customer-360--account-snapshot "Direct link to 1. Customer 360 / Account Snapshot")

Get a comprehensive view of accounts by pulling together opportunities, tickets, and recent discussions.

### Example Prompt

```
Generate an account snapshot for [Company Name] using Glean. Include:1. All open opportunities and their stages from Salesforce2. Recent support tickets from Zendesk3. Active discussions in Slack channels (#sales, #customer-success)4. Recent emails and meeting notes5. Product usage or engagement metrics mentioned anywhereHighlight any red flags or opportunities.
```

### Alternative Prompts

```
Use Glean to create a 360-degree view of [account]. What's happeningacross sales, support, and product? What should I know before my call?
```

```
Search Glean for all activity related to [company] in the last 30 days.Summarize deal status, health issues, and recent wins.
```

**What it does:**

-   Aggregates information across CRM, support, and communication tools
-   Identifies risks and opportunities
-   Surfaces recent customer interactions
-   Provides complete context before calls

### 2\. Research Prospects and Draft Outreach[​](#2-research-prospects-and-draft-outreach "Direct link to 2. Research Prospects and Draft Outreach")

Gather intelligence on prospects and create personalized outreach.

### Example Prompt

```
I'm reaching out to [prospect name] at [company].Use Glean to:1. Search for any past interactions or mentions in our systems2. Find similar customers in our portfolio (same industry/size)3. Look for relevant case studies or success stories4. Check if anyone on our team has connections thereDraft a personalized intro email highlighting relevant customer wins.
```

### Alternative Prompts

```
Research [prospect company] using Glean. Have we talked to them before?Do we have customers in the same space? Draft an outreach email.
```

```
Use Glean to find case studies and wins relevant to [prospect's industry].Create talking points for my first call.
```

**What it does:**

-   Checks for prior engagement history
-   Finds relevant case studies and references
-   Identifies internal connections
-   Drafts personalized outreach

### 3\. Deal Preparation and Call Briefing[​](#3-deal-preparation-and-call-briefing "Direct link to 3. Deal Preparation and Call Briefing")

Prepare for customer calls with comprehensive background and talking points.

### Example Prompt

```
I have a call with [customer name] tomorrow about [topic].Use Glean to:1. Pull the latest Salesforce opportunity details2. Find recent emails and meeting notes with this customer3. Check for any open support issues or escalations4. Search for internal discussions about this deal in Slack5. Locate relevant product documentation or demo assets Create a call prep doc with key context and potential questions.
```

### Alternative Prompts

```
Prepare me for my customer call. Search Glean for everything about[account]: recent activity, deal status, pain points, and decision makers.
```

```
Use Glean to create a briefing for my QBR with [customer]. What'stheir usage, issues, wins, and expansion opportunities?
```

**What it does:**

-   Aggregates deal context from Salesforce
-   Surfaces recent customer communications
-   Flags open issues or concerns
-   Prepares relevant materials and talking points

### 4\. Competitive Intelligence[​](#4-competitive-intelligence "Direct link to 4. Competitive Intelligence")

Access competitive information from battlecards, calls, and win/loss analysis.

### Example Prompt

```
I'm in a competitive deal against [competitor].Use Glean to:1. Find our competitive battlecard for [competitor]2. Search Gong calls where we've competed against them3. Look for win/loss analysis in Slack or Confluence4. Check what features or pricing objections come up Summarize theirpositioning and our best counter-strategies.
```

### Alternative Prompts

```
Search Glean for recent deals where we competed against [competitor].What made us win? What makes us lose?
```

```
Use Glean to prepare me for acompetitive situation. Find everything about [competitor]: their strengths,weaknesses, and our differentiation.
```

**What it does:**

-   Retrieves competitive battlecards and analysis
-   Analyzes win/loss patterns
-   Surfaces recent competitive insights from calls
-   Provides proven counter-strategies

### 5\. Weekly Account Progress Reports[​](#5-weekly-account-progress-reports "Direct link to 5. Weekly Account Progress Reports")

Track progress across your book of business and identify what needs attention.

### Example Prompt

```
Generate a weekly report on my top accounts using Glean.For each account:1. Summarize deal progress from Salesforce2. Note any support escalations or health issues3. Highlight completed activities and next steps4. Flag accounts that haven't had activity in 7+ daysCall out red flags and recommend priorities for this week.
```

### Alternative Prompts

```
Use Glean to create a status report for all my enterprise deals. Whatmoved forward? What's stuck? What needs my attention?
```

```
Search Glean for activity across my territory in the last week. Summarize wins, losses,and deals needing tool.
```

**What it does:**

-   Aggregates status across multiple accounts
-   Identifies stalled deals
-   Flags at-risk accounts
-   Recommends prioritization

### 6\. Closed-Lost Deal Analysis[​](#6-closed-lost-deal-analysis "Direct link to 6. Closed-Lost Deal Analysis")

Understand why deals are lost to improve future outcomes.

### Example Prompt

```
Opportunity [SFDC ID] just moved to closed-lost.Use Glean to:1. Search Gong call transcripts for objections and concerns2. Find Slack discussions about why we lost3. Check for competitive mentions4. Look for pricing or feature gaps discussedExtract insights: Why did we lose? What could we have done differently?
```

### Alternative Prompts

```
Analyze this lost deal using Glean. What were the objections? Was itprice, features, or something else? Find evidence in calls and emails.
```

```
Search Glean for all closed-lost deals to [competitor] this quarter.What's the pattern? What are we missing?
```

**What it does:**

-   Analyzes call transcripts for loss reasons
-   Identifies common objection patterns
-   Surfaces competitive factors
-   Informs strategy improvements

### 7\. Customer Success Handoff[​](#7-customer-success-handoff "Direct link to 7. Customer Success Handoff")

Create comprehensive handoff documentation when deals close.

### Example Prompt

```
Deal [opportunity name] just closed. Use Glean to create a handoff docfor customer success:1. Summarize the sales process and key stakeholders 2. List promised features or customizations from calls 3. Note pain points and use cases discussed 4. Include relevant emails, meeting notes, and demos 5. Highlight expectations set during the sales process Suggest onboarding priorities and potential expansion areas.
```

### Alternative Prompts

```
Search Glean for everything about [new customer] during the sales cycle.Create a transition document for the CSM team.
```

```
Use Glean to compile all commitments and expectations for [customer] from sales calls, proposals,and contracts.
```

**What it does:**

-   Synthesizes the entire sales journey
-   Documents commitments and expectations
-   Identifies key stakeholders and pain points
-   Ensures smooth customer success transition

### 8\. Territory Planning and Prioritization[​](#8-territory-planning-and-prioritization "Direct link to 8. Territory Planning and Prioritization")

Analyze your territory to identify the best opportunities.

### Example Prompt

```
Help me plan my quarter. Use Glean to analyze my territory:1. List all accounts with open opportunities in Salesforce2. Identify accounts with high engagement but no active deal3. Find customers mentioned in expansion discussions4. Check for at-risk accounts with recent support escalationsRecommend where I should focus my time for maximum pipeline impact.
```

### Alternative Prompts

```
Search Glean for signals indicating expansion opportunities: increased usage,new stakeholder engagement, feature requests, budget discussions.
```

```
Use Glean to identify my most engaged accounts that aren't in an active salescycle. Who should I reach out to?
```

**What it does:**

-   Analyzes account health and engagement
-   Identifies expansion signals
-   Flags at-risk customers
-   Recommends prioritization strategy

### 9\. Proposal and RFP Support[​](#9-proposal-and-rfp-support "Direct link to 9. Proposal and RFP Support")

Gather information to respond to proposals and RFPs quickly.

### Example Prompt

```
I need to respond to an RFP asking about [specific requirements]. Use Glean to:1. Find similar past proposals we've submitted2. Locate relevant product documentation and specs3. Search for customer references in the same industry4. Check if we have compliance certifications they're asking forDraft responses to the key technical requirements sections.
```

### Alternative Prompts

```
Search Glean for our standard responses to RFP questions about security,compliance, and integration capabilities.
```

```
Use Glean to find case studies, ROI data, and testimonials relevant to[prospect's industry] for this proposal.
```

**What it does:**

-   Locates past proposal content for reuse
-   Finds relevant documentation and specs
-   Identifies appropriate case studies
-   Accelerates response creation

### 10\. Lead Qualification and Enrichment[​](#10-lead-qualification-and-enrichment "Direct link to 10. Lead Qualification and Enrichment")

Quickly qualify inbound leads with context from multiple sources.

### Example Prompt

```
New lead: [name] from [company]. Use Glean to qualify:1. Check if this company is already in Salesforce2. Search for any past interactions or demo requests3. Look for similar customers in our base (industry/size)4. Find mentions of this company in Slack or emailsAssess fit and recommend whether to prioritize this lead.
```

### Alternative Prompts

```
Search Glean to see if anyone's talked to [company] before. Are theyalready a customer? Have we engaged with them?
```

```
Use Glean to research [inbound lead]. Find relevant talking points, similarcustomers, and our best positioning for their industry.
```

**What it does:**

-   Checks for existing relationships
-   Identifies similar customers for reference
-   Assesses lead quality and fit
-   Provides context for initial outreach

## Best Practices[​](#best-practices "Direct link to Best Practices")

### Keep CRM Data Current[​](#keep-crm-data-current "Direct link to Keep CRM Data Current")

MCP works best when your Salesforce data is up to date:

-   Ensure opportunities have current stages and close dates
-   Tag deals with relevant industries, competitors, use cases
-   Keep contact roles and stakeholder information current

### Use Specific Account Identifiers[​](#use-specific-account-identifiers "Direct link to Use Specific Account Identifiers")

```
✅ "Account: Acme Corp (SFDC ID 001...)"✅ "Opportunity: Q4 Enterprise Deal (Opp-12345)"❌ "That big deal I'm working on" (too vague)
```

### Combine Real-Time with Historical[​](#combine-real-time-with-historical "Direct link to Combine Real-Time with Historical")

```
What's the current deal status? And what were the key concerns raised inour last three calls with this customer?
```

### Request Actionable Outputs[​](#request-actionable-outputs "Direct link to Request Actionable Outputs")

```
Not just "summarize this account" but "identify the top 3 risks and suggestspecific actions I should take this week"
```

### Verify Before Sending Externally[​](#verify-before-sending-externally "Direct link to Verify Before Sending Externally")

```
Always review Glean's output before sending to customers. Ensure accuracyand appropriateness of any competitive or internal information.
```

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

**Missing Salesforce data?**

-   Verify Salesforce connector is properly configured
-   Check that necessary fields and objects are being indexed
-   Ensure your user permissions allow access to the data

**Incomplete call intelligence?**

-   Confirm Gong or similar tool is connected
-   Check that call recordings are being transcribed
-   Verify date ranges match when calls occurred

**Can't find competitive intel?**

-   Check that Confluence or document repositories are indexed
-   Search for specific competitor names or product names
-   Look in both formal battlecards and informal Slack discussions

**Generic account summaries?**

-   Be more specific about what you need (deal status, health, risks)
-   Reference specific time frames ("last 30 days")
-   Ask for specific types of information (support issues, expansion signals)

## See also[​](#see-also "Direct link to See also")

-   [MCP Setup Guide](/user-guide/mcp/usage) - Initial configuration
-   [Glean for Sales](https://www.glean.com/solutions/sales) - Overview of sales use cases
-   [Chat Best Practices](/user-guide/assistant/best-practices) - Prompting tips
