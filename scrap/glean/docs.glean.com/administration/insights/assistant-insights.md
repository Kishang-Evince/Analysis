---
url: "https://docs.glean.com/administration/insights/assistant-insights"
canonical: "https://docs.glean.com/administration/insights/assistant-insights"
title: "Assistant insights"
description: "Understand Glean adoption, engagement, and response quality on the Assistant insights tab."
fetched_at: "2026-09-01T13:29:08.064Z"
---
On this page

The **Assistant insights** tab helps you understand adoption, engagement, and quality for your organization's Glean usage.

Prerequisite

You must have the Insights Moderator role to access this feature. To learn more about user roles in Glean, see [User roles](/administration/identity/roles/user-roles).

To open the **Assistant insights** tab, click your profile in the lower-left corner, then select **Insights → Assistant insights**.

## What's included[​](#whats-included "Direct link to What's included")

The **Assistant insights** tab covers activity across **Chat**, **AI summarization**, **AI answers**, and **Gleanbot**. Use the page-level filters and controls to focus your analysis by department and date range.

## Filters and controls[​](#filters-and-controls "Direct link to Filters and controls")

-   **Filter usage by department** to segment adoption and activity by org structure.
-   **Date range** to change the analysis window across charts and tables. This defaults to the past week, and you can also select custom time periods.
-   **As-of timestamp and time zone** appear at the top right; times are displayed in UTC. The dashboard updates once daily and reflects the data as of the previous day.
-   **Download CSV** is available beside tables to export the currently filtered view.

## Adoption: how widely is Glean used?[​](#adoption-how-widely-is-glean-used "Direct link to Adoption: how widely is Glean used?")

This section summarizes organizational reach and growth.

note

The cards in this section are cumulative and aren't affected by the selected time period.

-   **Monthly active Glean users** shows the number of unique users who engaged with Glean over the previous 28 days. A user is active if they take any one of a specific set of defined actions on Glean. For the full list, see [How Glean defines active users](/administration/insights/overview#active-users).
-   **Glean adoption rate** is calculated as Glean Monthly Active Users / Total Monthly Active Users. It measures the share of your total monthly active users who used Glean, helping you understand how widely Glean is adopted among active users.
-   **Active Glean trend** charts daily, weekly, and monthly active Glean users over the selected time range. Hover to view exact values by date.

## Engagement: how are users interacting with Glean?[​](#engagement-how-are-users-interacting-with-glean "Direct link to Engagement: how are users interacting with Glean?")

The engagement section measures the volume and patterns of interaction across Glean experiences.

-   Each metric card reports counts in the selected time period for:
    -   **Chat messages sent**: messages sent using the chat interface on Glean
    -   **Items summarized**: use of Glean to generate summaries of documents, meetings, and more
    -   **AI answers**: Glean-generated answers that appear at the top of the search results page
    -   **Gleanbot interactions**: interactions with Glean invoked within a messaging platform such as Slack or Microsoft Teams
-   **Glean interactions** chart shows total interactions over time, including a daily interactions bar series and a cumulative interactions line series. Interactions include chat messages, summarized items, AI answers, and Gleanbot interactions within the selected time period.
-   **Top Glean users** table lists the most engaged users in the selected period, with interactions per week, total interactions in period, and days active in period. The table supports pagination. Sort by any metric by clicking its column title.

## Quality: how good are Glean responses?[​](#quality-how-good-are-glean-responses "Direct link to Quality: how good are Glean responses?")

Quality metrics and feedback trends help you monitor user satisfaction with Glean responses.

-   Metric cards provide an aggregate for the selected time period of:
    -   **Feedback submission rate**: how many Glean responses received an upvote or downvote from users
    -   **Upvote rate**: the share of feedback responses that were upvotes
    -   **Downvote rate**: the share of feedback responses that were downvotes
-   **Voting feedback** chart breaks down upvoted and downvoted queries over time. The chart aggregates feedback across chat messages sent, items summarized, AI answers, and Gleanbot within the selected time period.

## See also[​](#see-also "Direct link to See also")

-   [Insights overview](/administration/insights/overview)
-   [How Glean defines active users](/administration/insights/overview#active-users)
