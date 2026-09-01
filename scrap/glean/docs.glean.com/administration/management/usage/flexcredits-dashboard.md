---
url: "https://docs.glean.com/administration/management/usage/flexcredits-dashboard"
canonical: "https://docs.glean.com/administration/management/usage/flexcredits-dashboard"
title: "Usage dashboard: Enterprise Flex"
description: "View and understand how your organization uses FlexCredits over time"
fetched_at: "2026-09-01T13:29:09.555Z"
---
On this page

The **Usage** dashboard gives you visibility into how your organization consumes **FlexCredits** over time. You can review overall usage trends, break down consumption by feature and surface, and export data for your own reports.

note

This dashboard is for organizations with the Enterprise Flex pricing plan that has credit-based pricing. For organizations with the Glean Core Suite pricing plan that has seat-based pricing, see the [Usage dashboard: Glean Core Suite & Model Hub](/administration/management/usage/gleancoresuite-dashboard).

## Access the Usage dashboard[​](#access-the-usage-dashboard "Direct link to Access the Usage dashboard")

Prerequisites

You must have one of the following roles:

-   **Super Admin**
-   **Admin**
-   **Billing Moderator** (if enabled in your deployment)

To open the **Usage** dashboard, navigate to **Admin console** → **Usage**.

If you don't see the **Usage** dashboard, contact a Super Admin to confirm your role and permissions.

## Filter by time period[​](#filter-by-time-period "Direct link to Filter by time period")

You can filter the **Usage** dashboard to focus on a specific time period. Choose **All time** to view the entire contract period, or select a specific month to review monthly usage.

The charts and tables update to reflect your time period selection.

## Usage overview[​](#usage-overview "Direct link to Usage overview")

The **Usage** section displays how many FlexCredits you have used out of the total available.

The **Trends** panel displays usage trends by day or week.

To configure total usage alerts and monthly usage limits, see [Set usage limits and alerts](/administration/management/usage/set-usage-limits-and-alerts).

## Breakdown[​](#breakdown "Direct link to Breakdown")

The **Usage** dashboard displays granular, feature-level credit consumption so you can see which capabilities drive the most usage.

The **Breakdown** section organizes usage into tabs:

-   **By product types**
-   **By models**
-   **By departments**

### By product types[​](#by-product-types "Direct link to By product types")

Use the **By product types** tab to understand how different Glean features are consuming FlexCredits. You can identify which product types drive the most usage and spot unexpected spikes in a particular area.

Select any product type to view detailed usage breakdown for that product.

| Product type | Description |
| --- | --- |
| **Assistant** | **Usage per day**: Shows daily Assistant usage over time. Toggle **Show cumulative** to view cumulative usage instead of daily usage.  
  
**Assistant usage by models**: Shows consumption by large language model, depending on your configuration. Each row displays the model name, current status, and FlexCredits consumed.  
  
Premium models consume more FlexCredits than basic or standard models. A **$ Premium** tag next to the model name indicates that the model is a premium model. To view a complete list of premium models, see [Glean Enterprise Flex](/glean-enterprise-flex-pricing). |
| **Agents** | **Usage per day**: Shows daily Agents usage over time. Toggle **Show cumulative** to view cumulative usage instead of daily usage.  
  
**Agents**: Shows a table that lists each agent with its owner, current status, and FlexCredits consumed in the selected period.  
  
The **Agents** table may include usage from unsaved agent runs, ensuring all consumption is visible even if the agent was never saved.  
  
This table only lists agents that consumed billable FlexCredits during the selected period. Agents with non-billable usage don't appear here. To view activity for all agents, see [Agents insights](/agents/concepts/insights). |
| **API** | **Usage per day**: Shows daily API usage over time. Toggle **Show cumulative** to view cumulative usage instead of daily usage.  
  
**API**: Shows a table that lists specific APIs and their FlexCredits consumed, such as **Search API**. |

note

The **Users** table is available for any single-month selection from July 2026 onward, including **Current month**. It isn't available when you choose **All time**.

### By departments[​](#by-departments "Direct link to By departments")

Use the **By departments** tab to understand how usage is distributed across your organization. This view helps you attribute value to teams, compare departments, and spot departments that are under-adopting or driving the most consumption.

The **By departments** tab displays a table showing each department with its month-to-date FlexCredits consumed. To compare usage by product type, turn on the **Product type breakdown** toggle. The table adds sortable columns for product types with usage, such as **Assistant**, **Agents**, or **API**, while the total usage column remains available.

To work with the table:

-   **Compare departments**: Sort by consumption to see which departments use the most or fewest FlexCredits and how usage is distributed across the organization.
-   **Export**: Select the download icon to export the table as a .csv file to support adoption analysis, budgeting, chargeback, and showback.

To set spending limits by department, see [Set limits within a department](/administration/management/usage/set-usage-limits-and-alerts#set-limits-within-a-department).

note

Department views rely on the department metadata in your identity provider or org chart. A department only appears if its members have department information, and users without department metadata aren't attributed to a department. Because departments are groups of users that can change over time, moving a user between departments changes how their usage is attributed. To confirm the **Department** attribute is mapped, see [People data attribute mapping](/administration/identity/people-data/attribute-mapping).

### By models[​](#by-models "Direct link to By models")

Use the **By models** tab to understand which AI models your organization is using and how much each model contributes to your overall usage.

The **By models** tab displays a table showing:

-   **Model**: The name of the AI model, including Claude models, GPT models, and other supported models
-   **Current status**: Whether the model is enabled or turned off in your deployment
-   **Amount**: The FlexCredits consumed by each model in the selected period

This view helps you understand the cost impact of different model choices and identify opportunities to optimize usage.

## Advanced features[​](#advanced-features "Direct link to Advanced features")

Select **Advanced features** to view usage of advanced features in Assistant and Agents. These features are already included in product totals and displayed separately for visibility.

The **Advanced features** view shows:

-   **Deep research**: Advanced research capabilities
-   **Code writer**: Code generation features
-   **Slide-generation**: Content generation features
-   **Image generation**: Image creation capabilities
-   **Voice session**: Voice-based features

Each feature displays its current status and FlexCredits consumed.

## Export usage data[​](#export-usage-data "Direct link to Export usage data")

To share usage details, you can export the underlying data from the **Breakdown** panel. You might use exports to compare invoices against actual usage, forecast future FlexCredits needs, or combine Glean usage with your internal metrics.

To export usage data:

1.  Navigate to the **Breakdown** panel.
2.  Select the download icon.

The file downloads as a .csv file. You can open and view the file in your preferred analysis tool.

## Common questions[​](#common-questions "Direct link to Common questions")

### Why do I see new feature categories?[​](#why-do-i-see-new-feature-categories "Direct link to Why do I see new feature categories?")

As Glean adds new AI capabilities and feature-level pricing, new categories may appear in the **Usage** dashboard. This ensures you can track the specific impact of new features on your FlexCredits usage.

Older usage remains in your historical exports, but newer usage appears under the more granular, updated categories.

### Why the feature-level total may not match your contract total[​](#why-the-feature-level-total-may-not-match-your-contract-total "Direct link to Why the feature-level total may not match your contract total")

The **Usage** dashboard focuses on usage. Your contract may include additional terms, such as:

-   Minimum commitments
-   Overage pricing
-   FlexCredits allocated to specific add-ons or bundles

If you have questions about how usage maps to billing, or how Glean calculates overages, contact your Glean account team.
