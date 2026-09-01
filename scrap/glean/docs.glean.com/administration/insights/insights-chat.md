---
url: "https://docs.glean.com/administration/insights/insights-chat"
canonical: "https://docs.glean.com/administration/insights/insights-chat"
title: "Insights chat"
description: "Natural language query interface for Glean platform usage analytics"
fetched_at: "2026-09-01T13:29:08.097Z"
---
On this page

The **Insights chat** tab provides a natural language interface for analyzing Glean platform usage. Instead of navigating pre-built dashboards, you can ask questions like "Which departments have the highest Glean adoption?" and get responses through natural language, CSV downloads, or charts.

Prerequisite

You must have the Insights Moderator role to access this feature. To learn more about user roles in Glean, see [User roles](/administration/identity/roles/user-roles).

To open the **Insights chat** tab, click your profile in the lower-left corner, then select **Insights → Insights chat**.

## What you can ask about[​](#what-you-can-ask-about "Direct link to What you can ask about")

The following sections list the topics that Insights chat can answer.

### User activity[​](#user-activity "Direct link to User activity")

You can ask about Daily Active Users (DAU), Weekly Active Users (WAU), and Monthly Active Users (MAU), department-level engagement comparisons, top active users, and power user identification:

-   DAU/WAU/MAU trends over time, with breakdowns by search, assistant, and agents
-   Department-level engagement comparisons (employees, signups, active users, searches, chats)
-   Top active users ranked by searches, chats, AI answers, summarizations, and agent runs
-   Power user identification per department

### Search and chat[​](#search-and-chat "Direct link to Search and chat")

You can ask about top connectors:

-   Top connectors by search click-through counts
-   Top connectors referenced in chat and AI responses

### Agents[​](#agents "Direct link to Agents")

You can ask about agent run counts, top agents, top agent users, and agent feedback trends:

-   Agent run counts over time, per agent or per department
-   Top agents ranked by user count, run count, upvotes, and downvotes
-   Top agent users with per-user breakdowns
-   Weekly and Monthly Active Agent Users (WAAU/MAAU)
-   Agent feedback trends (upvotes vs downvotes over time)

### Assistant[​](#assistant "Direct link to Assistant")

You can ask about assistant adoption, activity, and per-user breakdown:

-   Glean adoption summary (MAU, WAU, signups)
-   Glean activity timeseries (daily/weekly/monthly active users)
-   Per-user assistant breakdown (chat messages, summarizations, AI answers, Gleanbot interactions)
-   Event-level timeseries with upvote and downvote trends

### Adoption and health[​](#adoption-and-health "Direct link to Adoption and health")

You can ask about coverage, activity, stickiness, unsigned-up users, and monthly inactive users:

-   Coverage rate: Signups / Employees
-   Activity rate: MAU / Signups
-   Stickiness rate: WAU / MAU
-   Unsigned-up users with new hire indicator
-   Monthly inactive users

* * *

## What Insights chat can't answer[​](#what-insights-chat-cant-answer "Direct link to What Insights chat can't answer")

The following table provides a list of topics that Insights chat can't answer and alternative approaches you can take.

| Topic | Suggested alternative |
| --- | --- |
| Individual search queries ("What are people searching for?") | Use search connector clicks to see which apps people are using |
| Document-level metrics (views per document) | Use **Admin console** document analytics |
| Real-time usage data from the current day | Usage data is available up to and including yesterday (in UTC) |
| Revenue, costs, or financial metrics | Use finance tools |
| Infrastructure health or connector status | Use the **Admin console** connectors page |
| User retention, churn, or cohort analysis | Use activity timeseries as a proxy |
| Benchmarks against other companies | Compare against internal department baselines |
| Usage data older than 270 days | Insights data is only guaranteed for the last 270 days |
| Users with access to Glean but no historical usage | Join usage data with a source of data on which users have access to Glean (for example, from your Single Sign-On (SSO) system) |

note

Usage data from the current day in Coordinated Universal Time (UTC) isn't available. The usage data summarized by this tool spans a period of 270 days, terminating with the previous day in UTC.

## See also[​](#see-also "Direct link to See also")

-   [Insights overview](/administration/insights/overview)
-   [User roles](/administration/identity/roles/user-roles)
