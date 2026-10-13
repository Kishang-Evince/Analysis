---
url: "https://docs.glean.com/user-guide/assistant/deep-research"
canonical: "https://docs.glean.com/user-guide/assistant/deep-research"
title: "Use Deep Research"
description: "Start a cited Deep Research report from the skill picker or a slash command"
fetched_at: "2026-10-13T08:51:26.984Z"
---
On this page

Deep Research writes a cited report from your company's sources and the web. Use it when a short chat answer would drop the comparison, the timeline, or the sources behind a conclusion.

## Choose Deep Research or chat[​](#choose-deep-research-or-chat "Direct link to Choose Deep Research or chat")

Use Deep Research when the question needs a synthesis across many sources. A finished report usually runs 5–10 pages, includes linked citations, and takes 5–30 minutes.

Chat is the better fit for a single fact, a short rewrite, or any task that has to change a connected app. Deep Research only reads. It will not file a ticket, post a message, or update a record.

These questions are a better fit for a report than for chat:

| Goal | What to ask for |
| --- | --- |
| Track a project | Recent issues for one customer, with status, pulled from Jira, Gong, and Slack |
| Compare a competitor | New launches in one feature area, from their blogs, marketing pages, and news |
| Plan a bet | Untapped demand in one business area, from Gong calls, Slack threads, and Salesforce activity |

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

An admin has to turn Deep Research on before you can run it. See [Deep Research](/administration/assistant/configuration/deep-research).

Where you start a report depends on the key your organization uses:

-   **Glean Universal Key** — Deep Research is a skill. The separate monthly quota does not apply. Usage follows your standard Assistant terms.
-   **Customer Key** — Deep Research stays a chat mode, and the monthly quota still applies.

## Start a report[​](#start-a-report "Direct link to Start a report")

### On the Glean Universal Key[​](#on-the-glean-universal-key "Direct link to On the Glean Universal Key")

1.  Open **Chat**.
2.  In the composer, open the skill picker and select **Deep Research**. You can also type `/deep-research` and the question.
3.  State the goal. Name the teams, systems, or documents that matter.
4.  Submit. The report runs in the background. Glean notifies you when it is ready.

A question can look like this:

`/deep-research Summarize competitor launches in Q3 across their blogs, press releases, and our Gong calls.`

### On a Customer Key[​](#on-a-customer-key "Direct link to On a Customer Key")

If **Deep research** is still in the mode picker, your organization has not moved to the skill. Select **Deep research**, then enter the question.

### Pick up an older chat[​](#pick-up-an-older-chat "Direct link to Pick up an older chat")

A thread that ran on the previous Deep Research agent shows this banner: "Deep Research is now a skill. Start a new chat and add /deep-research to your question to run it." **Start new chat** places `/deep-research` in the composer.

Choosing **Try again** or **Think deeper** starts a normal chat and drops `/deep-research`. Type the command again if you still want the report.

## See what a report includes[​](#see-what-a-report-includes "Direct link to See what a report includes")

Glean searches your connected systems and the web, then writes one report with linked citations. Web pages come from Brave Web Search. You only see documents you already have permission to open.

Deep Research supports the Glean Universal Key and Customer Key (BYOK). On the Glean Universal Key, it runs on the Assistant models configured for chat.

## Limitations[​](#limitations "Direct link to Limitations")

-   Deep Research is available in the web app.
-   It uses the model selected for that chat. On the Glean Universal Key, that is the model Glean routes to for the question.
-   It does not run tools that change connected apps. Ask in chat when the task has to write back to an app.
