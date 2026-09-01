---
url: "https://docs.glean.com/user-guide/mcp/data-analytics"
canonical: "https://docs.glean.com/user-guide/mcp/data-analytics"
title: "MCP for Data Analytics"
description: "Query data, identify trends, and generate insights with Glean's MCP server"
fetched_at: "2026-09-01T13:30:41.985Z"
---
On this page

Data analysts use Glean's MCP server to query structured connectors, combine quantitative and qualitative insights, and generate reports without switching between multiple analytics tools.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

**Recommended connectors:**

-   Databricks (for data warehouse queries)
-   Salesforce (for CRM data)
-   Google Drive (for spreadsheets and reports)
-   Confluence or Notion (for analysis documentation)
-   Slack (for data discussions)
-   Jira (for project tracking)

**Supported MCP hosts:**

-   Claude Desktop
-   ChatGPT
-   Cursor (for data notebooks)
-   Any MCP-compatible interface

## Use Cases[​](#use-cases "Direct link to Use Cases")

### 1\. Natural Language Database Queries[​](#1-natural-language-database-queries "Direct link to 1. Natural Language Database Queries")

Query structured connectors using natural language instead of SQL.

### Example Prompt

```
Use Glean to query Databricks for:1. Total revenue by customer segment for Q3 20242. Month-over-month growth rates3. Top 10 customers by revenue4. Any significant anomalies or outliers Display results as a table andhighlight key insights.
```

### Alternative Prompts

```
Query Databricks via Glean to show user sign-ups by week for the lastquarter. Calculate week-over-week growth and flag any unusual drops.
```

```
Use Glean to analyze our sales data: What's the average deal size byindustry? Which industries have the highest close rates?
```

**What it does:**

-   Translates natural language to SQL queries
-   Executes queries against connected data warehouses
-   Formats results for easy interpretation
-   Identifies notable patterns or anomalies

**Note:** Requires Databricks Genie or similar connectors that support structured data queries.

### 2\. Trend Analysis and Pattern Recognition[​](#2-trend-analysis-and-pattern-recognition "Direct link to 2. Trend Analysis and Pattern Recognition")

Identify trends in business metrics and customer behavior.

### Example Prompt

```
Use Glean to analyze customer purchase behavior trends:1. Query our transaction data for the last 12 months2. Identify seasonal patterns3. Segment by customer type (new vs returning)4. Look for correlations with marketing campaigns5. Summarize the key trends and their business implications.
```

### Alternative Prompts

```
Search Glean for usage metrics discussions in Slack and productanalytics. What features are growing? What's declining? Why?
```

```
Use Glean to analyze support ticket volume over time. Are there spikes relatedto releases or specific features?
```

**What it does:**

-   Queries time-series data
-   Identifies patterns and correlations
-   Combines quantitative data with qualitative context
-   Provides business interpretation

### 3\. Automated Report Generation[​](#3-automated-report-generation "Direct link to 3. Automated Report Generation")

Generate recurring reports by pulling data from multiple sources.

### Example Prompt

```
Generate a detailed analytical report on monthly sales data using Glean:1. Query Salesforce for closed-won deals this month2. Calculate key metrics: total ARR, average deal size, win rate3. Compare to previous month and same month last year4. Pull in any relevant context from sales team Slack discussions5. Identify top performers and any concerning trends6. Format as an executive summary with supporting data tables.
```

### Alternative Prompts

```
Use Glean to create a weekly performance report: pull key metrics fromour analytics dashboard, add context from team discussions, highlight winsand areas needing attention.
```

```
Generate a quarterly business review using Glean to aggregate data fromSalesforce, support metrics, product usage, and financial reports.
```

**What it does:**

-   Aggregates data from multiple sources
-   Calculates key metrics automatically
-   Adds qualitative context from discussions
-   Formats for stakeholder consumption

### 4\. Anomaly Detection in Financial Data[​](#4-anomaly-detection-in-financial-data "Direct link to 4. Anomaly Detection in Financial Data")

Identify unusual patterns or errors in financial datasets.

### Example Prompt

```
Analyze accounting data from Salesforce or your financial system using Glean to find anomalies:1. Look for transactions with unusual amounts (outliers)2. Identify accounts with unexpected activity patterns3. Flag duplicate entries or reconciliation issues4. Check for missing data or incomplete recordsPrioritize findings by potential financial impact and create an audit checklist for items needing investigation.
```

### Alternative Prompts

```
Use Glean to analyze our expense data from the last quarter. Findanomalies, duplicate charges, or policy violations.
```

```
Query financial data via Glean to identify high-risk transactions or accountsthat need closer review during our audit.
```

**What it does:**

-   Analyzes financial data for outliers
-   Identifies reconciliation issues
-   Flags potential errors or fraud
-   Prioritizes audit focus areas

### 5\. Customer Cohort Analysis[​](#5-customer-cohort-analysis "Direct link to 5. Customer Cohort Analysis")

Analyze customer behavior by cohort to understand retention and growth patterns.

### Example Prompt

```
Use Glean to perform a cohort analysis on customers:1. Group customers by their signup month2. Calculate retention rates by cohort3. Analyze revenue trends for each cohort4. Identify which acquisition channels have best long-term value5. Visualize the cohort data and highlight insights for the growth team.
```

### Alternative Prompts

```
Query customer data via Glean to compare cohorts from Q1 vs Q2. Whichcohort has better engagement and retention?
```

```
Use Glean to analyze user behavior by signup source. Do customers fromdifferent channels behave differently?
```

**What it does:**

-   Groups customers by cohort
-   Calculates retention and lifetime value metrics
-   Compares cohort performance
-   Identifies successful acquisition strategies

### 6\. Root Cause Analysis[​](#6-root-cause-analysis "Direct link to 6. Root Cause Analysis")

Investigate data anomalies by combining quantitative and qualitative sources.

### Example Prompt

```
Our conversion rate dropped 15% last week.Use Glean to investigate:1. Query analytics data to confirm the drop and identify when it started2. Check for code deployments or feature releases during that time3. Search Slack for mentions of site issues or customer complaints4. Look for related support tickets or bug reports5. Determine the most likely root cause and suggest data to validate it.
```

### Alternative Prompts

```
Revenue is down this month. Use Glean to analyze: Are we closing fewerdeals? Lower deal sizes? Different customer segments? What changed?
```

```
Use Glean to investigate this spike in API errors. Check logs, recentdeployments, and engineering discussions for clues.
```

**What it does:**

-   Combines quantitative metrics with qualitative context
-   Correlates changes with events (deployments, campaigns)
-   Searches for related discussions and issues
-   Proposes hypotheses for investigation

### 7\. Competitive Benchmarking[​](#7-competitive-benchmarking "Direct link to 7. Competitive Benchmarking")

Analyze competitive data and market positioning.

### Example Prompt

```
Use Glean to compile competitive benchmarking data:1. Search for market research reports in Confluence2. Find competitive pricing data from sales conversations3. Look for analyst reports or industry surveys4. Query our win/loss data by competitor5. Create a comparison table showing our position vs top 3 competitors.
```

### Alternative Prompts

```
Search Glean for all mentions of [competitor] in sales calls andanalysis docs. How do we compare on features, pricing, and positioning?
```

```
Use Glean to analyze our competitive win rate by segment. Where are westrongest? Where are we losing?
```

**What it does:**

-   Aggregates competitive intelligence
-   Compiles market research and analysis
-   Quantifies competitive performance
-   Identifies positioning opportunities

### 8\. Data Quality Assessment[​](#8-data-quality-assessment "Direct link to 8. Data Quality Assessment")

Audit data quality and identify gaps or inconsistencies.

### Example Prompt

```
Audit data quality in our CRM using Glean: 1. Find records with missingrequired fields 2. Identify duplicate accounts or contacts 3. Check forinconsistent data formats 4. Flag accounts without recent activityPrioritize cleanup by potential impact on reporting and operations.
```

### Alternative Prompts

```
Use Glean to analyze our analytics data for gaps. Are there time periodswith missing data? Features with no tracking?
```

```
Query our data warehouse via Glean to identify tables or fields with highnull rates that might affect analysis accuracy.
```

**What it does:**

-   Identifies incomplete or inconsistent data
-   Finds duplicates and errors
-   Quantifies data quality issues
-   Prioritizes remediation efforts

### 9\. Predictive Analysis Support[​](#9-predictive-analysis-support "Direct link to 9. Predictive Analysis Support")

Gather data and context for predictive modeling.

### Example Prompt

```
I'm building a churn prediction model. Use Glean to gather: 1.Historical customer data: tenure, usage, support tickets 2. Known churncases with reasons (from CRM and support) 3. Research on churn indicatorsfrom past analyses 4. Feature ideas discussed by data science team in SlackCompile a dataset and suggest additional predictive features to consider.
```

### Alternative Prompts

```
Use Glean to find factors that predict deal win rate. Query CRM data andsearch for sales team insights about what makes deals succeed.
```

```
Search Glean for past analyses about [business outcome]. What variables werefound to be predictive? What connectors should I use?
```

**What it does:**

-   Aggregates historical data for modeling
-   Surfaces domain knowledge from past analyses
-   Suggests relevant features and variables
-   Connects quantitative data with qualitative insights

### 10\. Ad Hoc Business Questions[​](#10-ad-hoc-business-questions "Direct link to 10. Ad Hoc Business Questions")

Answer urgent business questions quickly with data.

### Example Prompt

```
Leadership is asking: "How many customers from [industry] churned last quarter and why?"Use Glean to:1. Query CRM for churned customers in that industry2. Find their support ticket history and escalations3. Search for exit interview notes or feedback4. Look for patterns in account health scoresProvide a concise answer with supporting evidence.
```

### Alternative Prompts

```
How many deals did we close with new vs existing customers last month?Use Glean to query Salesforce and break down by segment.
```

```
What's the average time to close by deal size? Use Glean to analyze ourpipeline data and identify where deals slow down.
```

**What it does:**

-   Quickly queries relevant connectors
-   Provides evidence-based answers
-   Combines data with contextual information
-   Formats insights for executive consumption

## Best Practices[​](#best-practices "Direct link to Best Practices")

### Start with Clear Questions[​](#start-with-clear-questions "Direct link to Start with Clear Questions")

```
✅ "What's the month-over-month growth in user sign-ups?"✅ "Which customer segment has the highest churn rate?"❌ "Tell me about our customers" (too broad)
```

### Specify Time Ranges[​](#specify-time-ranges "Direct link to Specify Time Ranges")

```
Always include time boundaries: "last quarter", "YTD", "since January 2024"
```

### Combine Quantitative and Qualitative[​](#combine-quantitative-and-qualitative "Direct link to Combine Quantitative and Qualitative")

```
Don't just query numbers. Also search for context in Slack discussions,meeting notes, and analysis docs to understand the "why" behind the data.
```

### Validate Results[​](#validate-results "Direct link to Validate Results")

```
When Glean returns data, cross-check key figures against known sources ordashboards before using in reports.
```

### Document Assumptions[​](#document-assumptions "Direct link to Document Assumptions")

```
Ask Glean to note any assumptions, filters, or data limitations in theanalysis so stakeholders understand the context.
```

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

**Can't query structured data?**

-   Verify Databricks Genie or similar connector is properly configured
-   Check that your user has query permissions on the data warehouse
-   Ensure the connector is actively indexed

**Inaccurate calculations?**

-   Be explicit about formulas: "Calculate as (new - old) / old \* 100 for growth rate"
-   Specify how to handle nulls, duplicates, or edge cases
-   Ask Glean to show the query it's using so you can verify

**Missing business context?**

-   Connect Slack channels where data discussions happen
-   Index analysis documentation from Confluence or Notion
-   Include links to past analyses and reports

**Results don't match dashboards?**

-   Check if time zones or date boundaries are defined consistently
-   Verify filters and segments match your dashboard definitions
-   Confirm you're querying the same underlying connectors

## See also[​](#see-also "Direct link to See also")

-   [MCP Setup Guide](/user-guide/mcp/usage) - Initial configuration
-   [Chat Best Practices](/user-guide/assistant/best-practices) - Prompting tips
-   [Deep Research](/user-guide/assistant/deep-research) - In-depth analysis features
