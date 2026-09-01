---
url: "https://docs.glean.com/administration/insights/departments-and-managers/"
canonical: "https://docs.glean.com/administration/insights/departments-and-managers/"
title: "Departments and Managers"
description: "Learn how to use the Departments and Managers views in Glean Insights to understand adoption and usage across your organization."
fetched_at: "2026-09-01T13:29:08.119Z"
---
On this page

The **Departments** and **Managers** views in Insights help you understand how different parts of your organization are adopting and using Glean. Both views show a similar set of metrics and have an identical layout so you can segment usage by department or by manager hierarchy, and compare groups side by side.

The only functional difference is that the **Managers** view includes a level selector that lets you choose which layer of leaders to analyze (for example, direct reports to executives vs. the next level down in the org chart).

Prerequisite

You must have the Insights Moderator role to access this feature. To learn more about user roles in Glean, see [User roles](/administration/identity/roles/user-roles).

To open the **Departments** or **Managers** view, click your profile in the lower-left corner, then select **Insights → Departments** or **Insights → Managers**.

## What these views help you answer[​](#what-these-views-help-you-answer "Direct link to What these views help you answer")

Use the Departments and Managers views to answer questions such as:

-   Which departments or leaders have the strongest Glean adoption?
-   Where is coverage (signups) lagging even though employees exist in the org chart?
-   Which teams have high activity but lower stickiness, indicating that usage may not yet be habitual?
-   How many people in each department or manager's organization are actively using Search, Glean, and Agents?

Both views use the same core health metrics defined on the Overview tab:

-   **Coverage**: Signups / Employees – how many employees have signed up for Glean.
-   **Activity**: Monthly Active Users / Signups – how many signed up users are active in the last 28 days.
-   **Stickiness**: Weekly Active Users / Monthly Active Users – how many monthly active users also use Glean weekly.

For full details on how these metrics are calculated, see the [Insights overview](/administration/insights/overview).

## Organization or Department overview table[​](#organization-or-department-overview-table "Direct link to Organization or Department overview table")

The top table on each view summarizes adoption and engagement by department or manager.

-   On **Departments**: Department overview
-   On **Managers**: Organization overview

Each row represents either:

-   A department from your org chart (Departments view), or
-   A manager and everyone in their reporting tree at the selected level (Managers view).

**Key columns:**

-   **Department / Manager**: The department name or manager name from your org chart and people data.
-   **Level (Managers view only)**: The distance from your top leadership in the manager hierarchy. For example, Level 1 managers report directly into your top leadership layer, Level 2 managers report into Level 1 managers, and so on.
-   **Employees / Team size**: The number of employees in that department or in that manager's organization based on your people data.
-   **Coverage**: Percentage of employees in that group who have signed up for Glean, using the same definition as on the Overview tab.
-   **Activity**: Percentage of signups in that group who are currently monthly active.
-   **Stickiness**: Percentage of monthly active users in that group who are also weekly active.

Use this table to quickly find teams with:

-   Low coverage (they may not know about Glean yet)
-   Low activity (they signed up but are not using Glean regularly)
-   Low stickiness (they try Glean but have not formed a weekly habit)

## Product usage by Department or by Manager[​](#product-usage-by-department-or-by-manager "Direct link to Product usage by Department or by Manager")

The bottom table shows how people in each group are using different Glean products.

-   On **Departments**: Product usage by department
-   On **Managers**: Product usage in organization

**Columns include:**

-   **Department / Manager**: The same grouping as in the overview table.
-   **Employees / Team size**: Total number of employees in that group.
-   **Search users**: Number of employees in that group who were active search users in the selected time period.
-   **Glean users / Chat users**: Number of employees who used Glean and chat-based features (for example, chat queries, AI summarizations, AI answers).
-   **Agents users (Managers view)**: Number of employees who ran agents in the selected time period.
-   **Overall users (Departments view)**: Number of employees in that department who were active Glean users in the selected time period, regardless of which product area they used.

The timeframe dropdown (for example, Monthly active, Weekly active) controls how these counts are calculated. For instance, "Monthly active" counts users who engaged with that product at least once in the last 28 days, consistent with how active users are defined in Insights.

Use this table to:

-   Compare search vs. Glean vs. agent usage across departments or managers.
-   Identify teams that are heavy Glean or Agents users and might serve as champions or references.
-   Spot groups that have signed up but are only using one surface, which may suggest an enablement opportunity.

## Understanding Departments and Managers data[​](#understanding-departments-and-managers-data "Direct link to Understanding Departments and Managers data")

Both views rely on the same underlying org chart and people data that your admins provide to Glean.

**Departments**

-   Department names come directly from your org chart.
-   Departments with fewer than 5 employees are rolled into a combined row such as "Departments with <5 users" so the tables remain readable.
-   Users without a department cannot be tied to a specific employee in the org chart, so coverage and activity ratios are not calculated for that group.

**Managers**

-   The hierarchy is built from the manager relationships in your people data.
-   The **Level** filter at the top of the Managers view controls which layer in the hierarchy to show, so you can compare peer managers at the same reporting depth.

In both cases, filters apply to a user's current department or manager mapping and do not consider historical mappings to avoid double counting across groups.

## Tips for using these views[​](#tips-for-using-these-views "Direct link to Tips for using these views")

-   Start with **Departments** to identify broad areas that need more onboarding or communication.
-   Switch to **Managers** to see which leaders have the most engaged teams and where manager-level coaching or enablement may help.
-   Use coverage, activity, and stickiness together to prioritize follow-ups:
-   **Low coverage + low activity**: focus on awareness and rollout.
-   **High coverage + low activity**: focus on training and use cases.
-   **High activity + low stickiness**: focus on embedding Glean into weekly workflows.

Together, the Departments and Managers views give you a detailed, people-centric picture of how Glean is adopted across your organization, using the same core definitions and metrics as the Insights Overview tab.

## See also[​](#see-also "Direct link to See also")

-   [Insights overview](/administration/insights/overview)
-   [How Glean defines active users](/administration/insights/overview#active-users)
