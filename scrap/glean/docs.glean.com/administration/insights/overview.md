---
url: "https://docs.glean.com/administration/insights/overview"
canonical: "https://docs.glean.com/administration/insights/overview"
title: "Insights overview"
description: "Understanding the metrics on the Overview tab and answers to some frequently asked questions."
fetched_at: "2026-09-01T13:29:08.275Z"
---
On this page

The Insights page contains metrics related to the adoption and usage of Glean in your company across all employees.

note

Insights access is restricted to users with the Insights Moderator role, as defined by your Glean admins.

To open the **Insights** page, click your profile in the lower-left corner, then select **Insights**.

## Understand the Insights page structure[​](#understand-the-insights-page-structure "Direct link to Understand the Insights page structure")

The Overview tab of Insights provides a high-level view of how your organization is adopting Glean. It answers four key questions:

1.  What is the overall health of Glean at your company?
2.  How many users are active on Glean?
3.  What are users doing on Glean?
4.  Who are the most active users on Glean?

## Defining overall health of Glean at your company[​](#defining-overall-health-of-glean-at-your-company "Direct link to Defining overall health of Glean at your company")

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

This table shows the activity of users who have signed up for Glean in your organization.

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
