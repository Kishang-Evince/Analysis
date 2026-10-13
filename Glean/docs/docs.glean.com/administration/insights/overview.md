---
url: "https://docs.glean.com/administration/insights/overview"
canonical: "https://docs.glean.com/administration/insights/overview"
title: "Insights overview"
description: "Understanding the metrics on the Overview tab and answers to some frequently asked questions."
fetched_at: "2026-10-13T08:49:15.239Z"
---
On this page

The Insights page contains metrics related to the adoption and usage of Glean in your company across all employees.

## Where to find each usage and adoption metric[​](#where-to-find-each-usage-and-adoption-metric "Direct link to Where to find each usage and adoption metric")

Glean has more than one admin analytics surface. Choose the surface that matches the question you want to answer, especially when you're comparing activity, usage, and adoption metrics across **Insights**, **Usage**, agents, and Skills.

| Question | Where to look | Measurement window | Refresh |
| --- | --- | --- | --- |
| How many people are active on Glean? | **Admin console** → **Insights** → **Overview** | Monthly active users (MAU) covers a trailing 28 days, weekly active users (WAU) a trailing 7 days, and daily active users (DAU) the previous day in Coordinated Universal Time (UTC). Glean excludes the current UTC day. | Refreshes daily around 01:00 UTC. |
| How much large language model (LLM) capacity are we using, and how reliable is it? | **Admin console** → **Insights** → **LLM insights** | Whatever you select in the time period filter, such as **Past week** or **Past month**, or a custom date range | Refreshes daily. |
| How is agent usage trending across your organization? | **Admin console** → **Insights** → **Agents insights** | Monthly active agent users covers a trailing 28 days, and weekly active agent users covers a trailing 7 days. | Refreshes daily. |
| Can I ask a natural-language question about adoption? | **Admin console** → **Insights** → **Insights chat** | Covers data through yesterday and retains 270 days of history. | Refreshes daily. |
| How many FlexCredits have we used? | **Admin console** → **Usage**, using the **Enterprise Flex dashboard** or **Glean Core Suite and Model Hub dashboard**, depending on your plan | Contract period or selected month | Updates with your selected time period. |
| How widely do people use a specific Skill? | No built-in dashboard today. Use Glean Customer Event (GCE) logs (`WORKFLOW_RUN` and `CLIENT_EVENT` event types) or ask your Glean account team for a one-time export. | Depends on your log query or export request | Depends on your GCE log destination or export timing. |

### Track Skill adoption[​](#track-skill-adoption "Direct link to Track Skill adoption")

Skills don't have a dedicated adoption dashboard today. To analyze Skill creation and usage, use [GCE logs](/administration/gce-logs/data-dictionary) or ask your Glean account team for a one-time export.

### Reconcile agent counts[​](#reconcile-agent-counts "Direct link to Reconcile agent counts")

The **Agent library** page heading counts only the agents that the signed-in user has permission to see. [**Agents insights**](/administration/insights/agents) → **Agents shared across your organization** counts published, shared agents and excludes drafts and owner-only agents. [**Insights chat**](/administration/insights/insights-chat) answers about weekly or monthly active agent users count the unique users who ran an agent in that window, not the number of agents.

note

Insights access is restricted to users with the Insights Moderator role, as defined by your Glean admins.

To open the **Insights** page, click your profile in the lower-left corner, then select **Insights**.

## Understand the Insights page structure[​](#understand-the-insights-page-structure "Direct link to Understand the Insights page structure")

The Overview tab of Insights provides a high-level view of how your organization is adopting Glean. It answers four key questions:

1.  What is the overall health of Glean at your company?
2.  How many users are active on Glean?
3.  What are users doing on Glean?
4.  Who are the most active users on Glean?

## Measure overall health of Glean at your company[​](#measure-overall-health-of-glean-at-your-company "Direct link to Measure overall health of Glean at your company")

Three metrics summarize how healthy Glean adoption is at your company:

| Metric | Calculation | What it tells you |
| --- | --- | --- |
| **Coverage** | Signups / Employees | The percentage of your current employees who have signed up for Glean. Use it to understand awareness of Glean within your company. |
| **Activity** | Monthly Active Users / Signups | The percentage of signups who are currently monthly active users on Glean. Use it to understand whether employees are realizing Glean's value after signing up. |
| **Stickiness** | Weekly Active Users / Monthly Active Users | The percentage of monthly active users who are also weekly active users. Use it to understand whether employees are making Glean a habit in their day-to-day work. |

## Measure how many users are active on Glean[​](#measure-how-many-users-are-active-on-glean "Direct link to Measure how many users are active on Glean")

### Total Employees and Signups[​](#total-employees-and-signups "Direct link to Total Employees and Signups")

Employees and Signed up employees include users whose data is made available through the org chart in Glean, provided by your admin.

If there are users outside your org chart who have accessed Glean, they aren't counted in Employees or Signups. This includes former employees.

note

Glean pulls employee data directly from the people data uploaded by your Glean admin. If your employee count seems incorrect, verify that your people data is set up correctly on the [People page](https://app.glean.com/admin/setup/people) (accessible to Glean admins only).

### Active Users[​](#active-users "Direct link to Active Users")

A user is defined as active if they take any one of a specific set of defined actions on Glean.

### Which actions make a user active?

An active user takes information-seeking or information-curation actions with Glean. Examples of common actions include:

**Knowledge discovery actions**

-   Search for an item within Glean using the web app, new tab page, sidebar, mobile app, or any embedded search experience
-   Search within another app where the user has opted to use Glean search, such as Google Drive
-   Open an item from autocomplete search results
-   Open an item from the suggested content widget on the Glean home page
-   View autocomplete search results
-   Create an announcement, answer, collection, or go link
-   View an announcement, answer, collection, go link, or people directory, whether from search or by going directly to the content page

**Glean actions**

-   Send a Glean message from any surface, or revisit an old conversation
-   Expand AI answers from Glean's search engine results page
-   Use AI summarization from Glean's search engine results page
-   Send a message or converse with a Glean app
-   Engage with Gleanbot in Slack or Microsoft Teams by tagging @Glean, using the "generate" button to answer a question asked by someone else, or sharing a proactive Gleanbot message
-   Use Glean APIs for user-initiated actions, including Search, Chat, and Summarization API calls

Actions not considered information-seeking — such as viewing the home page or opening a new tab page — aren't counted toward active users.

note

-   Actions for each user increase by 1 only once per day when the user views autocomplete search results, or views or creates an announcement, answer, collection, or people directory.
-   Actions for each user increase by 1 only once per day when the user creates or uses any go links.

Active user metrics are rolled up with monthly, weekly and daily counts:

-   Monthly Active Users measures users who were active at least once in the last 28 days.
-   Weekly Active Users measures users who were active at least once in the last 7 days.
-   Daily Active Users measures users who were active at least once in the last day.

note

Time-based metrics such as Monthly Active Users don't count the present day's usage when calculating the metric.

## Understand what users are doing on Glean[​](#understand-what-users-are-doing-on-glean "Direct link to Understand what users are doing on Glean")

### Total searches in period[​](#total-searches-in-period "Direct link to Total searches in period")

Represents the sum total of all search queries made by users in the selected departments, over the selected time period.

note

Autocomplete search queries where a result document is opened directly don't count toward this metric.

### Total Glean interactions in period[​](#total-glean-interactions-in-period "Direct link to Total Glean interactions in period")

Represents the sum total of all Glean interactions made by users in the selected departments, over the selected time period. Glean interactions include chat queries, AI summarizations, AI answers, and Gleanbot.

### Total agent runs in period[​](#total-agent-runs-in-period "Direct link to Total agent runs in period")

Represents the number of agent runs made by users in the selected departments, over the selected time period. For more details, see [Agents insights](/administration/insights/agents).

## All signed up users[​](#all-signed-up-users "Direct link to All signed up users")

This table shows the activity of users who have signed up for Glean in your organization. Each row lists the user, the number of days they were active in the selected time period, and their Assistant interactions, searches, agent runs, and MCP calls. Select the download icon to export the table as a .csv file.

## Find who hasn't started using Glean[​](#find-who-hasnt-started-using-glean "Direct link to Find who hasn't started using Glean")

Insights measures adoption in user signups and activity. Use this table to identify the metric you're looking for and where to find it.

| If you're looking for | Use this metric | Where to find it |
| --- | --- | --- |
| Allocated licenses | Signups | **Insights** → **Overview**. Signups counts the employees in your org chart who have signed up for Glean. It isn't a count of the seats in your contract. |
| Whether a specific person has signed in | Days active for that person | The **All signed up users** table. A signed-up user with 0 days active took none of the qualifying actions in the selected time period. |
| Unused seats | Activity | **Insights** → **Overview**. Activity is Monthly Active Users / Signups, so the remaining percentage is the share of signups who aren't monthly active users. |

To list the people who signed up but haven't started using Glean, sort the **All signed up users** table by days active and look for users with 0.

note

Insights doesn't report a last sign-in date for each user, and the exported .csv file doesn't include one either. Days active is the closest per-user signal. For spend per user rather than activity per user, see [Export usage data](/administration/management/usage/gleancoresuite-dashboard#export-usage-data).

## Segment by departments[​](#segment-by-departments "Direct link to Segment by departments")

You can choose the department filter dropdown to multi-select departments you want to drill down to.  
Department names are directly pulled from the org chart provided by your admin.

-   Glean rolls up all departments with <5 employees into a single department called “Departments with <5 users”
-   Users with no departments cannot be tied to a specific employee in the org chart, so coverage and activity ratios cannot be measured for this department.
-   Department-based filters apply to a user's current department mapping and do not consider any historical mappings
    -   This is to avoid double counting users across departments.

### Flexible time periods[​](#flexible-time-periods "Direct link to Flexible time periods")

The time filter dropdown allows filtering activity by predefined time ranges or by custom date ranges.

## Data retention[​](#data-retention "Direct link to Data retention")

The Insights dashboard guarantees data availability for the last 270 days. While historical data beyond this period may be available, Glean can't guarantee its persistence. Future updates and cleanup of the Insights dashboard may result in data from before the 270-day retention period being deleted.

note

This retention policy applies to all metrics and data displayed in the Insights dashboard.

## See also[​](#see-also "Direct link to See also")

-   [Departments and Managers](/administration/insights/departments-and-managers)
-   [LLM insights](/administration/insights/llm-insights)
-   [Agents insights](/administration/insights/agents)
-   [Insights chat](/administration/insights/insights-chat)
-   [GCE logs data dictionary](/administration/gce-logs/data-dictionary)
-   [Enterprise Flex dashboard](/administration/management/usage/flexcredits-dashboard)
