---
url: "https://docs.glean.com/get-started/golive/populate-content"
canonical: "https://docs.glean.com/get-started/golive/populate-content"
title: "Populate content"
description: "Seed Glean with Announcements, Answers, Go Links, Projects, document verifications, and pinned results before your teammates log in."
fetched_at: "2026-09-01T13:29:49.988Z"
---
On this page

To create an engaging first experience with Glean, populate the platform with content beyond what Glean crawls from your connectors:

-   [Announcements](#announcements) - promote updates on the home page
-   [Answers](#answers) - provide authoritative responses to FAQs
-   [Go Links](#go-links) - create memorable shortcuts to common resources
-   [Projects](#projects) - organize chats and content around a topic
-   [Document verification](#document-verification) - mark trusted (or out-of-date) content
-   [Pinned results](#pinned-results)-push specific content to the top of search results

## Open the populate content setup[​](#open-the-populate-content-setup "Direct link to Open the populate content setup")

In the **Get the most out of Glean**, select **Help your teammates get answers easily**.

![Help your teammates get answers easily](/img/get-started/populate-content-task.webp)

Help your teammates get answers easily

* * *

## Announcements[​](#announcements "Direct link to Announcements")

Announcements promote updates on Glean's home page - useful for company-wide news or messages targeted to specific teams, and especially valuable if teammates use Glean as their new tab page.

To create one, navigate to  [Knowledge → Announcements](https://app.glean.com/knowledge/announcements) and select **New announcement**. For audience targeting, scheduling, banners, and media, see [How Announcements work](/user-guide/knowledge/announcements/how-announcements-work).

* * *

## Answers[​](#answers "Direct link to Answers")

Answers let your users provide authoritative responses to frequently asked questions, so the same Q&A doesn't get rewritten in chats and emails. They surface automatically in search results and via the Slackbot.

To create one, navigate to  [Knowledge → Answers](https://app.glean.com/knowledge/answers) and select **New answer**. See [What are Answers?](/user-guide/knowledge/answers/what-are-answers-and-how-do-they-work) for the creation flow and [How to write effective Answers](/user-guide/knowledge/answers/how-to-write-effective-answers) for content guidance.

**Aim for ten Answers** covering questions teammates ask repeatedly. Ideas to get started:

1.  What is our work-from-home policy?
2.  What benefits are available to me?
3.  What is our time-off policy, and how do I request time off?
4.  What is our parental leave policy?
5.  What do I do if I (or a family member) is sick?
6.  How do I get a new laptop or office badge?
7.  How do I get access to Jira (or any other internal tool)?
8.  How do I book travel?
9.  When do we get paid?
10.  What are this year's company holidays?

* * *

## Go Links[​](#go-links "Direct link to Go Links")

Go Links (`go/...`) are memorable shortcuts that redirect to frequently used sites, documents, or internal resources. Once a teammate hears or sees one, they can recall it without bookmarking.

To create one, navigate to  [Knowledge → Go Links](https://app.glean.com/knowledge/golinks) and select **New Go Link**. See [How Go Links work](/user-guide/knowledge/go-links/how-go-links-work) for setup details, and [Create variable Go Links](/user-guide/knowledge/go-links/create-variable-go-links) for parameterized shortcuts like `go/dashboard/<customer>`.

**Aim for five Go Links** to your most-visited resources. Examples:

| Go Link | Destination |
| --- | --- |
| `go/benefits` | Company benefits portal |
| `go/help` | IT help desk |
| `go/deals` | Salesforce dashboard with current-quarter numbers |
| `go/sprint` | Jira project for your engineering team |
| `go/dashboard/<customer>` | Internal dashboard for `<customer>` (a [variable Go Link](/user-guide/knowledge/go-links/create-variable-go-links)) |
| `go/it/setup` | Setup instructions for a new laptop |
| `go/it/wifi` | Wi-Fi access details for employees |
| `go/pitch` | Company sales presentation |
| `go/pto` | New annual leave request |
| `go/git` | Main internal Git repository |
| `go/allhands` | Folder of recordings from previous all-hands |
| `go/docs` | Documentation hub |
| `go/support` | Agent view in Zendesk |
| `go/mail` | Email |
| `go/cal` | Work calendar |
| `go/roadmap` | Company roadmap |

* * *

## Projects[​](#projects "Direct link to Projects")

Projects help you organize chats and content in Glean so related work is easier to group, revisit, and share, giving teammates a single source of truth for a topic or initiative.

Projects are available only in deployments where the feature is enabled. To create one, open the menu for **Create artifact** in **Library** (or **Create**, depending on your deployment), and choose **Project**. If **Project** isn't listed, see [How projects work](/user-guide/knowledge/projects/how-projects-work) for rollout details.

Here are some examples of projects you can create:

| Project | Description |
| --- | --- |
| **New employee onboarding** | Resources and checklists a new employee needs in their first week |
| **Life @ \[Company\]** | Policy documents on benefits, time off, travel, and technology |
| **Using Glean** | Documents, Answers, and links to help teammates use Glean |
| **Legal help desk** | FAQs and documents related to legal matters |
| **T&E hub** | Documents, apps, and resources for booking travel and managing expenses |
| **\[Location\] office** | Information about a specific office (e.g., Sydney) |
| **\[Team name\]** | Contacts, channels, and key docs owned by a specific team |
| **\[Initiative name\]** | Key resources related to a specific internal initiative |

* * *

## Document verification[​](#document-verification "Direct link to Document verification")

Document verification lets owners and moderators mark search results as **Verified** (green check) or **Deprecated** (red cross), so teammates can tell at a glance which sources are current and reliable.

To verify or deprecate a document, search for it, open the **More options** (⋮) menu on the search result, and select **Verify or deprecate**. See [How verification works](/user-guide/knowledge/verification/how-verification-works) for the full flow and [Which documents should I verify?](/user-guide/knowledge/verification/which-documents-should-i-verify) for guidance on what to prioritize.

Verify the documents teammates rely on most - your employee handbook, travel & expense policy, IT setup guide, and similar canonical references.

* * *

## Pinned results[​](#pinned-results "Direct link to Pinned results")

Pinned results push specific content to the top of search results for specific keywords. Pinned results can be visible to **Only me** or to **Teammates** (everyone in your organization).

To create one, pin content directly from a search result. See [How pinned results work](/user-guide/knowledge/pins/how-pins-work).

**Aim for at least two pinned results** that promote launch-critical content. Examples:

-   Pin the **Employee Handbook** for the keywords `handbook` and `onboarding`.
-   Pin the **Travel & Expense Policy** for the keywords `travel` and `expense`.
-   Pin the **Benefits Hub** for the keywords `benefits` and `insurance`.
