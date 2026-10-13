---
url: "https://docs.glean.com/administration/assistant/configuration/feedback-data-handling"
canonical: "https://docs.glean.com/administration/assistant/configuration/feedback-data-handling"
title: "Feedback data handling"
description: "Configure where user feedback is sent, control what data Glean receives, and understand access and retention"
fetched_at: "2026-10-13T08:49:06.267Z"
---
On this page

When a user provides in-product feedback with an upvote ( **Helpful**) or downvote ( **Not helpful**) per response, Glean records the rating and a scrubbed set of supporting fields. Learn exactly which fields leave your deployment, how to restrict them, and who can access them. Use this information to complete a privacy or compliance review of the feedback feature.

## Understand feedback destinations[​](#understand-feedback-destinations "Direct link to Understand feedback destinations")

Every feedback submission can go to two places: to Glean, and to your own company.

Each destination has its own toggle and shows its current state in the **Admin console**:

| Destination | Toggle | When on | Default |
| --- | --- | --- | --- |
| Glean | **Allow Glean to file a support ticket for in-product user feedback** | When a submission files a Glean support ticket, the ticket carries:
-   The vote, the rating, and the reason categories
-   The comment
-   The email address of the submitter
-   Identifiers: trace ID, session identifiers, request token, and application or agent ID
-   The page URL and the UI element
-   Diagnostic labels
-   For search feedback, references to the results involved

Glean uses the information for troubleshooting and defect analysis. See [The support feedback payload](#the-support-feedback-payload). | On |
| Your company | **Allow (your company name) to receive in-product user feedback** | Glean emails the following to the feedback addresses you specify:

-   The rating
-   The reason categories and their details
-   The comment
-   The chat transcript
-   The agent name, for agent feedback

 | Off |

## Configure feedback destinations[​](#configure-feedback-destinations "Direct link to Configure feedback destinations")

An Admin or Super Admin configures both destinations in **Admin console → Settings → Help**. Non-admin users cannot view or change these settings. See [Admin roles](/administration/identity/roles/admin-roles).

Turning on the company toggle prompts for an email address if none is set, and its label shows your configured company name. Turning one destination off has no effect on the other.

When the Glean destination is on for a surface, these rules decide whether a submission files a Glean support ticket:

| Action | Files ticket | Does not file ticket |
| --- | --- | --- |
| Downvote with a reason category or a comment | ✅ |  |
| Upvote with a comment | ✅ |  |
| Upvote with no comment |  | ✅ |
| Click a thumbs-up or thumbs-down icon without submitting the feedback form |  | ✅ |

note

Turning the Glean toggle off stops the Glean support ticket. It does not stop the [scrubbed feedback analytics](#scrubbed-feedback-analytics), which Glean records on every submission.

The full-transcript feedback email that your administrators already receive is the company destination. That email goes to your own configured addresses, not to Glean.

Glean sends feedback to the configured destinations when the user submits, so you cannot approve feedback before a destination receives it. To review feedback internally before a Glean support ticket is filed, turn off the Glean destination and route feedback to your own addresses or ticketing system. [Scrubbed feedback analytics](#scrubbed-feedback-analytics) are still recorded.

### Control feedback destination per surface[​](#control-feedback-destination-per-surface "Direct link to Control feedback destination per surface")

To control the destinations per surface, click **Advanced preferences**. This lists each feedback surface, such as Chat, Search, and Feed, with a separate checkbox for each destination and a field for the email address that receives that surface's feedback.

Each surface configuration is independent from the others. If you uncheck a ***Glean*** checkbox for a surface but leave the other checkboxes selected, that surface files no Glean support ticket while other surfaces still do. Unchecking a surface stops that surface's ticket, not the [scrubbed feedback analytics](#scrubbed-feedback-analytics).

note

You can only edit the per-surface checkboxes when the corresponding parent toggle is on. You cannot exclude general feedback per surface.

### Route feedback notifications to an email address[​](#route-feedback-notifications-to-an-email-address "Direct link to Route feedback notifications to an email address")

To set where feedback notifications go:

1.  Navigate to **Settings → Help**.
2.  Expand the **Feedback** dropdown and click **Advanced preferences**.
3.  Enter the email addresses that should receive feedback. You can assign different aliases for different feedback types, for example **Chat** or **Search**. You can only enter email addresses belonging to the domains of your company. Contact Glean Support to add new domains.
4.  Click **Save**.

tip

Glean recommends configuring a separate alias to assist in routing. You may also want to automatically ingest this feedback into a ticketing system like Jira, Zendesk, or ServiceNow.

### Send feedback to Slack[​](#send-feedback-to-slack "Direct link to Send feedback to Slack")

To automatically send feedback to a Slack channel, for example #glean-chat-feedback, first generate a destination email address for that channel:

1.  Open the **Channel Information** page for a channel you own and click the **Integrations** tab.
2.  Click **Send emails to this channel**, then **Get Email Address**.
3.  Raise a ticket with Glean Support to associate the Slack domain from this email, for example company.slack.com, with your Glean instance.
4.  Copy the Slack email address into the **Feedback** section of Glean Settings and click **Save**.

warning

You cannot add the Slack email address until Glean Support associates the Slack domain of your company with your account.

## Review who can access agent feedback[​](#review-who-can-access-agent-feedback "Direct link to Review who can access agent feedback")

Workspace admins can review feedback across all agents in their workspace. Agent builders can review feedback only for the agents they built.

| Audience | Access scope | Purpose |
| --- | --- | --- |
| Glean | Agent feedback, plus a session debugger link for support | To review issues and diagnose problems. |
| Workspace admins | All agent feedback in the workspace | To monitor feedback and investigate quality or usage issues across agents. |
| Agent builder | Only feedback for the agents they built | To diagnose agent-specific problems and improve those agents over time. |

This access is separate from email-based routing, which only controls where feedback notifications are sent. The sharing rules apply to agent feedback and do not change feedback routing for standard chat and search.

Users see a disclosure in the feedback modal for agent chats, explaining that their chat and feedback may be shared with Glean, their admins, and the agent's builder. See [User feedback](/user-guide/assistant/user-feedback).

## Review what Glean receives[​](#review-what-glean-receives "Direct link to Review what Glean receives")

The following table describes what Glean can access when you configure Glean as a feedback destination:

| Record | When Glean receives it | Glean access | Retention |
| --- | --- | --- | --- |
| Complete feedback record | By default, Glean does not receive the complete feedback record. The record, including the conversation context, stays in your own cloud storage. | No | 270 days by default. If your admin sets a chat retention period, chat feedback and chat message records in the complete feedback record follow that period instead. See [Chat History](/administration/assistant/configuration/chat-history). |
| Feedback logs | By default, Glean does not receive feedback logs. The logs stay in your own deployment project. | No | 270 days |
| [Support feedback payload](#the-support-feedback-payload) | Only when the Glean destination is on | Yes | 270 days |
| [Scrubbed feedback analytics](#scrubbed-feedback-analytics) | On every submission, whatever the destination settings, on a route separate from the support payload | Yes | 
-   Manual-feedback analytics: 30 days
-   Glean Chat feedback: 180 days
-   Customer-event analytics: up to 730 days (2 years)

 |
| [Downvote analysis output](#downvote-learning-and-evaluations) | Only on deployments that use the Glean Universal Model Key. Customer Key deployments do not run downvote learning. | Yes | 90 days |

Complete feedback record and log access

Glean engineers can access the complete feedback record and feedback logs only through an approved debug operation. See [Understand how Glean engineers access conversation content](#understand-how-glean-engineers-access-conversation-content).

### The support feedback payload[​](#the-support-feedback-payload "Direct link to The support feedback payload")

This record drives the Glean support ticket. When the Glean destination is on, Glean receives:

-   The vote, the rating, and any structured reason categories the user selected
-   The free-text comment the user typed
-   The email address of the user who submitted the feedback
-   Identifiers used to locate the request: trace ID, session identifiers, request token, and application or agent ID
-   The page URL and the UI element the user gave feedback on
-   Diagnostic labels attached to the request
-   For search feedback, references to the results involved: the document ID, the datasource, the document type and category, and the position of the result

note

To remove the submitter's identity from the feedback record, contact Glean Support to request a deployment configuration change.

Because a user can add sensitive content to a comment and the free-text comment is included in this payload, treat the comment field as the main privacy consideration. The payload omits the question and the response, but a comment that quotes them still conveys that content.

Consider a user who asks for an approved renewal budget, receives an incorrect figure, then downvotes with the comment "For the renewal, $5M is wrong. The signed agreement says $7M." The record Glean receives looks like this example payload:

```
{  "category": "CHAT",  "event": "MANUAL_FEEDBACK",  "manualFeedbackInfo": {    "source": "CHAT",    "vote": "DOWNVOTE",    "email": "user@example.com",    "traceId": "trace-123",    "comments": "For the renewal, $5M is wrong. The signed agreement says $7M."  }}
```

The dedicated question and response fields are absent, but the copied comment still reveals the topic and both figures.

note

The absence of a field from the support feedback payload does not mean the field is never stored. Comments and conversation context are retained in your deployment, in the feedback store and in request logs, and the company email destination can carry the comment and the chat transcript. Those fields remain available to an authorized investigation.

### Scrubbed feedback analytics[​](#scrubbed-feedback-analytics "Direct link to Scrubbed feedback analytics")

This record is written on every submission, regardless of the destination configuration. Most identifying fields are removed, pseudonymized, or hashed. It carries:

-   The feedback category, the event type, and the vote
-   The structured reason categories and the detail values the user selected
-   A timestamp and the page path
-   A pseudonymous user identifier, produced by salting and hashing the user ID. Not the email address
-   The session tracking token, copied as-is and not hashed
-   The application or agent ID
-   The length and a salted hash of the structured feedback payload field. These describe the structured field, not the free-text comment
-   For search, feed, and autocomplete feedback, the datasource, plus salted hashes of document IDs and URLs

This record does not carry the comment text, the submitter's email address, or the rating.

### Downvote learning and evaluations[​](#downvote-learning-and-evaluations "Direct link to Downvote learning and evaluations")

Glean uses downvotes to improve the product, but only within the personally identifiable information (PII) and defined permission controls. Downvotes supply Glean's customer health reporting, in aggregate form only. Glean uses this reporting for defect analysis, not product development.

Downvote learning and evaluations on downvoted queries run only on deployments that use the Glean Universal Model Key. How Glean processes a downvote depends on the LLM key your deployment uses:

| Key type | What happens when a user downvotes a chat |
| --- | --- |
| Customer Key | Glean receives a support ticket, and a Glean engineer diagnoses the issue manually. See [Configure feedback destinations](#configure-feedback-destinations) for which submissions file a ticket. No automated agent reads or parses the downvote data. Downvote learning and evaluations do not apply. |
| Glean Universal Model Key | An automated agent parses the downvote data to generate downvote learnings and to run evaluations on downvoted queries. See [Glean Universal Model Key downvote learning](#glean-universal-model-key-downvote-learning). |

With either key type, Glean receives a support ticket only when the Glean destination is on. See [Configure feedback destinations](#configure-feedback-destinations).

#### Glean Universal Model Key downvote learning[​](#glean-universal-model-key-downvote-learning "Direct link to Glean Universal Model Key downvote learning")

When a user downvotes an Assistant response in Thinking mode, the downvote can trigger an automated analysis of what went wrong. The analysis runs inside your deployment and produces a learning: a short record of the failure that tells Assistant what to do differently next time. When the same user later asks a similar question, Assistant retrieves the learning and uses it to avoid the same mistake.

Downvote learnings are scoped to the user who submitted the downvote:

-   Each learning applies only to that user's future queries. It does not change responses for other users.
-   Learnings are stored in your deployment.

When sharing with Glean is on, Glean receives the following analysis output:

-   Classification labels
-   The request identifiers
-   Short summaries of the problem, written by a model

Glean does not receive the conversation, the documents, or the citations.

Glean also runs evaluations on downvoted queries. An automated judge measures how well responses align with the feedback the user gave. These evaluations follow the same permission guardrails as the rest of the Glean evaluation framework.

## What Glean does not receive[​](#what-glean-does-not-receive "Direct link to What Glean does not receive")

The support feedback payload and scrubbed feedback analytics do not carry:

-   The user's query text, the response text, or the chat transcript
-   Previous messages in the conversation
-   Citations and source references
    -   If a user reports a citation problem, Glean receives the reason category, such as an incorrect citation or a missing citation, without the citation itself.
-   The reproduction URL, image URLs, and the raw structured feedback payload
-   Reasoning traces, or details of tool and MCP execution
-   The content of any document

## Provide the minimum data for Glean support[​](#provide-the-minimum-data-for-glean-support "Direct link to Provide the minimum data for Glean support")

To investigate a reported issue, Glean needs the trace ID and the session identifier to find the specific request. The trace ID and session identifier let Glean support locate the request without the conversation content. The rating and reason category tell support what went wrong.

If you disable sending feedback to Glean, supply the trace ID with your support ticket. Without it, support cannot reliably locate the request.

## Understand how Glean engineers access conversation content[​](#understand-how-glean-engineers-access-conversation-content "Direct link to Understand how Glean engineers access conversation content")

Access to conversation content is not a continuous data feed. A Glean engineer reaches it only through a **high-sensitivity debug operation**: a time-boxed access grant raised for a specific investigation.

Every high-sensitivity debug operation is recorded in the audit log, so you can review these operations yourself rather than requesting a record from Glean.

To download debug operation records from the audit log:

1.  In the **Admin console**, navigate to **Users & permissions → Audit logs**.
2.  Filter the logs by time range, or search by keyword to find the debug operations you want to review.
3.  Click **Export to CSV**.

The audit log keeps records for 30 days by default. To keep a longer record, export the logs regularly or contact your Glean representative to request a longer retention period. For Glean-hosted deployments, Glean can also set up ongoing delivery of audit logs to a destination you manage, such as your SIEM. Contact your Glean account team to set this up. See [Audit logs](/administration/management/audit-logs/admin-audit-logs).

Each request requires internal approval at Glean. For additional control, contact Glean Support to turn on the Customer Approval Flow. When the Customer Approval Flow is on, no Glean engineer reaches conversation content until one of your admins approves the request:

-   Glean sends each request to your admins by email and in the Glean product.
-   Your admins can grant or revoke access at any time.
-   By default, each grant expires automatically after 7 days. To change this period, contact Glean Support.

Even with your approval, the Glean engineer still needs internal approval at Glean.

## Act on feedback to improve response quality[​](#act-on-feedback-to-improve-response-quality "Direct link to Act on feedback to improve response quality")

Feedback is most useful when reviewed alongside broader troubleshooting, source quality, and agent performance data. A not-helpful rating often identifies:

-   Ambiguous questions or missing context
-   Poor source data
-   Agent logic failures

To act on what feedback tells you:

-   Refine prompts: Clear, specific questions lead to better answers. Consider user training on effective prompting.
-   Improve data quality: Regularly update or deprecate inaccurate information in connected sources. Use the **Verification** feature of Glean where available.
-   Optimize connectors: Organize documentation and clarify conflicting content to ensure the right information is accessible.
-   Analyze patterns: Use feedback signals and comments to spot recurring issues. If systemic misfires persist, contact Glean Support for deeper tuning.

## See also[​](#see-also "Direct link to See also")

-   [User feedback](/user-guide/assistant/user-feedback) — how users submit feedback and what the feedback modal discloses
