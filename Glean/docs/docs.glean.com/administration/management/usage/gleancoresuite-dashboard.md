---
url: "https://docs.glean.com/administration/management/usage/gleancoresuite-dashboard"
canonical: "https://docs.glean.com/administration/management/usage/gleancoresuite-dashboard"
title: "Usage dashboard: Glean Core Suite and Model Hub"
description: "View and understand how your organization uses Glean over time"
fetched_at: "2026-10-13T08:49:18.457Z"
---
On this page

The **Usage** dashboard gives you visibility into your organization's Model Hub Usage over time. You can review overall usage trends, break down consumption by feature and surface, and export data for your own reports.

note

This dashboard is for organizations with the Glean Core Suite and Model Hub pricing plan. For organizations with the FlexCredits pricing plan that has credit-based pricing, see the [Usage dashboard: Enterprise Flex](/administration/management/usage/flexcredits-dashboard).

Not on this plan?

If your organization is on a legacy Glean Enterprise plan, **Admin console** → **Usage** shows a notice that this dashboard is no longer available instead of the dashboard itself, because that dashboard measures Enterprise Flex pricing. This doesn't affect your access to Glean or your current agreement. To monitor large language model (LLM) capacity and reliability, use [LLM insights](/administration/insights/llm-insights). Glean shows that dashboard to organizations that bring their own LLM key, and to organizations on a Glean key with the LLM gateway enabled. For custom usage reporting, use [Glean Customer Event (GCE) logs](/administration/gce-logs/data-dictionary). Contact your Glean account team with any questions.

## Access the Usage dashboard[​](#access-the-usage-dashboard "Direct link to Access the Usage dashboard")

### Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Have one of the following roles:

-   **Super Admin**
-   **Admin**
-   **Billing Moderator** (if enabled in your deployment)

To open the **Usage** dashboard, navigate to **Admin console** → **Usage**.

If you don't see the **Usage** dashboard, contact a Super Admin to confirm your role and permissions.

## Filter by time period[​](#filter-by-time-period "Direct link to Filter by time period")

You can filter the **Usage** dashboard to focus on a specific time period. Choose **All time** to view the entire contract period, or select a specific month to review monthly usage.

The charts and tables update to reflect your time period selection.

## Usage overview[​](#usage-overview "Direct link to Usage overview")

The **Usage** section displays how much of your budget you have used. The dollar values represent Model Hub Usage costs.

The **Trends** panel displays usage trends by day or week.

See the following resources to learn more about LLMs and pricing:

-   To set up and manage LLMs, navigate to the [Model Hub](/administration/llms).
-   To learn more about LLM support in Glean, see [Set up LLMs using the Model Hub](/administration/llms).

## Breakdown[​](#breakdown "Direct link to Breakdown")

The **Usage** dashboard displays granular, feature-level consumption so you can see which capabilities drive the most usage.

The **Breakdown** section organizes usage into tabs and opens on the **By users** tab:

-   **By product types**
-   **By users**
-   **By departments**
-   **By models**

### By product types[​](#by-product-types "Direct link to By product types")

Use the **By product types** tab to understand how different Glean features are consuming your budget. You can identify which product types drive the most usage and spot unexpected spikes in a particular area.

Select any product type to view a detailed usage breakdown for that product type.

| Product type | Description |
| --- | --- |
| **Assistant** | **Usage per day**: Shows daily Assistant usage over time. Toggle **Show cumulative** to view cumulative usage instead of daily usage.  
  
**Assistant usage by models**: Shows consumption by large language model, depending on your configuration. Each row displays the model name, current status, and dollar amount consumed.  
  
Premium models, such as Claude Opus 4.8, consume more budget than basic or standard models. To view a complete list of premium models, see [Glean Core Suite](/glean-core-suite-pricing). |
| **Agents** | **Usage per day**: Shows daily Agents usage over time. Toggle **Show cumulative** to view cumulative usage instead of daily usage.  
  
**Agents**: Shows a table listing each agent with its owner, current status, and dollar amount consumed in the selected period.  
  
The **Agents** table may include usage from unsaved agent runs, ensuring all consumption is visible even if the agent was never saved. |

### By users[​](#by-users "Direct link to By users")

Use the **By users** tab to understand how individual users contribute to your organization's usage. This view helps you investigate unexpectedly high usage and identify the activity driving a user's total.

The **By users** tab displays a table showing each user's month-to-date dollar amount consumed and their usage limit. Users without a limit show **NO LIMIT** in the **Usage limit** column. Select a user to view a detailed breakdown of the product types, models, and agents contributing to their usage.

To change a user's limit, click **Manage** in their row. **Manage** and the limit columns appear only when you view the current month. For a past month, the table shows each user's usage.

To set spending limits for an individual user, see [Set limits for specific users](/administration/management/usage/set-usage-limits-and-alerts#set-limits-for-specific-users).

note

The **Users** table is available for any single-month selection from July 2026 onward, including **Current month**. It isn't available when you choose **All time**.

### By departments[​](#by-departments "Direct link to By departments")

Use the **By departments** tab to understand how usage is distributed across your organization. This view helps you attribute value to teams, compare departments, and spot departments that are under-adopting or driving the most consumption.

The **By departments** tab displays a table showing each department with its month-to-date dollar amount consumed. To compare usage by product type, turn on the **Product type breakdown** toggle. The table adds sortable columns for product types with usage, such as **Assistant** or **Agents**, while the total usage column remains available.

To work with the table:

-   **Compare departments**: Sort by consumption to see which departments use the most or least and how usage is distributed across the organization.
-   **Export**: Select the download icon to export the table as a .csv file to support adoption analysis, budgeting, chargeback, and showback. When the **Product type breakdown** toggle is on, the exported file includes the per-product columns shown in the table.

To set spending limits by department, see [Set limits within a department](/administration/management/usage/set-usage-limits-and-alerts#set-limits-within-a-department).

note

Department views rely on the department metadata in your identity provider or org chart. A department only appears if its members have department information, and users without department metadata aren't attributed to a department. Because departments are groups of users that can change over time, moving a user between departments changes how their usage is attributed. To confirm the **Department** attribute is mapped, see [People data attribute mapping](/administration/identity/people-data/attribute-mapping).

### By models[​](#by-models "Direct link to By models")

Use the **By models** tab to understand which AI models your organization is using and how much each model contributes to your overall usage.

The **By models** tab displays a table showing:

-   **Model**: The name of the AI model, including Claude models, GPT models, and other supported models
-   **Current status**: Whether the model is enabled or turned off in your deployment
-   **Amount**: The dollar amount consumed by each model in the selected period

This view helps you understand the cost impact of different model choices and identify opportunities to optimize usage.

## Advanced features[​](#advanced-features "Direct link to Advanced features")

Select **Advanced features** to view usage of advanced features in Assistant and Agents. These features are already included in product totals and displayed separately for visibility.

The **Advanced features** view shows:

-   **Deep research**: Advanced research capabilities
-   **Code writer**: Code generation features
-   **Slide generation**: Content generation features
-   **Image generation**: Image creation capabilities
-   **Voice session**: Voice-based features
-   **Skill scanning**: Safety scans of locally uploaded Skills and third-party Skill repositories. Skills from Glean are safe by default and aren't scanned.

Each feature displays its current status and dollar amount consumed.

Expand a feature to see the agents that used it. To open an agent's usage page in a new tab, open the actions menu on the agent's row and select **View usage details**. The option is unavailable if you don't have permission to manage that agent. If you don't see **View usage details**, your organization might not have agent usage details enabled. Contact your Glean account team to confirm availability.

Admins can turn billed advanced features such as Skill scanning on or off, and view their pricing, from **Admin console → Advanced features**. See [Skill scanning and safety review](/administration/managing-skills/skill-scanning#billing).

## Export usage data[​](#export-usage-data "Direct link to Export usage data")

To share usage details, you can export the underlying data from the **Breakdown** panel. You might use exports to compare invoices against actual usage, forecast future needs, or combine Glean usage with your internal metrics.

To export usage data:

1.  Navigate to the **Breakdown** panel.
2.  Select the download icon.

The file downloads as a .csv file. You can open and view the file in your preferred analysis tool.

note

The updated **Usage** dashboard includes the **Show cumulative** toggle and the **Breakdown** CSV export. If you don't see these options, your organization might not have the updated dashboard yet. Contact your Glean account team to confirm availability.

## Common questions[​](#common-questions "Direct link to Common questions")

### Why do I see new feature categories?[​](#why-do-i-see-new-feature-categories "Direct link to Why do I see new feature categories?")

As Glean adds new AI capabilities and feature-level pricing, new categories may appear in the **Usage** dashboard. This ensures you can track the specific impact of new features on your budget.

Older usage remains in your historical exports, but newer usage appears under the more granular, updated categories.

### Why the feature-level total may not match your contract total[​](#why-the-feature-level-total-may-not-match-your-contract-total "Direct link to Why the feature-level total may not match your contract total")

The **Usage** dashboard focuses on Model Hub Usage consumption. Your contract may include additional terms, such as:

-   Minimum commitments
-   Overage pricing
-   Budget allocated to specific add-ons or bundles

If you have questions about how usage maps to billing, or how Glean calculates overages, contact your Glean account team.

## See also[​](#see-also "Direct link to See also")

-   To learn how to manage usage limits and alerts, see [Set usage limits and alerts](/administration/management/usage/set-usage-limits-and-alerts).
-   To find the people who signed up for Glean but haven't started using it, see [Find who hasn't started using Glean](/administration/insights/overview#find-who-hasnt-started-using-glean).
