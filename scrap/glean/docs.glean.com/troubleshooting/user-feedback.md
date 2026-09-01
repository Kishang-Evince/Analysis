---
url: "https://docs.glean.com/troubleshooting/user-feedback"
canonical: "https://docs.glean.com/troubleshooting/user-feedback"
title: "User feedback"
description: "Users can upvote or downvote Glean responses. For agent chats, feedback may be shared with Glean, workspace admins, and the agent's builder."
fetched_at: "2026-09-01T13:30:37.415Z"
---
On this page

You can provide feedback on Glean responses by clicking the **upvote** or **downvote** buttons at the bottom of the chat window. After you click a button, a feedback modal opens where you can add detail before sending.

Glean uses this feedback for review and troubleshooting to help teams understand response utility and identify recurring issues. Feedback does not directly retrain Glean responses automatically.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Make any request in Glean chat or search, and you can give feedback about the helpfulness of Glean's response.

## What feedback users can submit[​](#what-feedback-users-can-submit "Direct link to What feedback users can submit")

When a user marks a response as helpful or not helpful, they can submit:

-   A thumbs up or thumbs down rating
-   One or more structured reasons, when available
-   Optional free-text comments
-   Related chat context needed to review the feedback

## Agent feedback data sharing and privacy[​](#agent-feedback-data-sharing-and-privacy "Direct link to Agent feedback data sharing and privacy")

When users submit feedback on an agent response, Glean may share the feedback and relevant chat context with specific audiences to assist with troubleshooting and quality improvement.

### Data visibility and access[​](#data-visibility-and-access "Direct link to Data visibility and access")

Workspace admins can review feedback across all agents in their workspace. Agent builders can review feedback only for the agents they built.

The following table outlines who may have access to the underlying feedback and chat context:

| Audience | Access scope | Purpose |
| --- | --- | --- |
| Glean | Agent feedback and related chat context, as needed for support and product improvement | To review issues and improve the core product experience. |
| Workspace admins | All agent feedback in the workspace | To monitor feedback and investigate quality or usage issues across agents. |
| Agent builder | Only feedback for the agents they built | To diagnose agent-specific problems and improve those agents over time. |

### Usage guidance and disclosure[​](#usage-guidance-and-disclosure "Direct link to Usage guidance and disclosure")

For agent chats, the feedback modal includes a specific disclosure:

*Your chat and feedback may be shared with Glean, your admins, and this agent's builder to help improve your experience. Fact-check important information because AI can make mistakes.*

#### Important considerations[​](#important-considerations "Direct link to Important considerations")

-   Routing vs. access: This disclosure explains who has access to the data for diagnostics. This is separate from *email-based routing*, which only controls where feedback notifications are sent.
-   Sensitive information: Because chat context may be included, users should avoid submitting sensitive information in feedback unless it is necessary for troubleshooting.
-   Scope: These disclosures and sharing rules apply to **agent feedback** only. They do not change general feedback routing for standard chat and search in the Admin console.

## Configure feedback notifications[​](#configure-feedback-notifications "Direct link to Configure feedback notifications")

### Configure feedback emails[​](#configure-feedback-emails "Direct link to Configure feedback emails")

To configure where feedback notifications are sent:

1.  Navigate to **Settings > Help**.
2.  Expand the **Feedback** dropdown and click **Advanced preferences**.
3.  Enter the email address(es) that should receive feedback. You can assign different aliases for different feedback types, for example, **Chat** or **Search**.
4.  Click **Save**.

note

For security, you can only enter email addresses belonging to the domains of your company. Contact Glean Support to add new domains.

tip

Glean recommends configuring a separate alias to assist in routing. You may also want to automatically ingest this feedback into a ticketing system like Jira, Zendesk, or ServiceNow.

### Send feedback to Slack[​](#send-feedback-to-slack "Direct link to Send feedback to Slack")

To automatically send feedback to a Slack channel, for example, #glean-chat-feedback, you must first generate a destination email address for that channel:

1.  Open the **Channel Information** page for a channel you own and click the **Integrations** tab.
2.  Click **Send emails to this channel**, then **Get Email Address**.
3.  Raise a ticket with Glean Support to associate the Slack domain from this email, for example, company.slack.com with your Glean instance.
4.  Copy the Slack email address into the **Feedback** section of Glean Settings and click **Save**.

warning

You cannot add the Slack email address until Glean Support associates the Slack domain of your company with your account.

## Improving Glean performance[​](#improving-glean-performance "Direct link to Improving Glean performance")

Feedback is most useful when reviewed alongside broader troubleshooting, source quality, and agent performance data. A *not-helpful* rating often identifies:

-   Ambiguous questions or missing context
-   Poor source data
-   Agent logic failures

### Best practices[​](#best-practices "Direct link to Best practices")

-   Refine prompts: Clear, specific questions lead to better answers. Consider user training on effective prompting.
-   Improve data quality: Regularly update or deprecate inaccurate information in connected sources. Use the **Verification** feature of Glean where available.
-   Optimize connectors: Organize documentation and clarify conflicting content to ensure the right information is accessible.
-   Analyze patterns: Use feedback signals and comments to spot recurring issues. If systemic misfires persist, contact Glean Support for deeper tuning.
