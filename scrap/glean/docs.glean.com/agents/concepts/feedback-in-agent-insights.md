---
url: "https://docs.glean.com/agents/concepts/feedback-in-agent-insights"
canonical: "https://docs.glean.com/agents/concepts/feedback-in-agent-insights"
title: "How feedback data is used in Agent insights"
description: "Learn what feedback related data may appear in Agent insights and how Glean helps protect user privacy"
fetched_at: "2026-09-01T13:29:16.377Z"
---
On this page

When users provide feedback on agent responses, Glean surfaces these insights to help admins and builders refine agent performance and improve the overall user experience.

## Data utilized for insights[​](#data-utilized-for-insights "Direct link to Data utilized for insights")

Depending on your workspace configuration, Glean analyzes the following data points to provide quality metrics:

-   Sentiment signals: Upvotes and downvotes.
-   Written feedback: Optional comments submitted by the user.
-   Interaction context: Relevant chat history and technical traces from the specific session.
-   Diagnostic data: Metadata required to troubleshoot technical performance during the interaction.

Authorized users can drill into individual feedback entries to inspect the full context of an interaction, allowing for precise troubleshooting.

## Strategic value[​](#strategic-value "Direct link to Strategic value")

Reviewing feedback related insights allows your organization to:

-   Target improvements: Identify specific agents that require prompt technical or prompt-engineering adjustments.
-   Detect patterns: Spot recurring quality issues across different departments or use cases.
-   Measure progress: Validate that updates and optimizations are successfully improving the user experience over time.

## Access and permissions[​](#access-and-permissions "Direct link to Access and permissions")

Access to feedback-related data is strictly governed by role-based permissions. This information is typically visible to:

-   Admins: For organization-wide quality oversight.
-   Insights moderators: For performance monitoring and reporting.
-   Agent builders: For specific agents they have created or manage.

## Privacy and data protection[​](#privacy-and-data-protection "Direct link to Privacy and data protection")

Glean is designed with privacy-first principles to ensure feedback is used responsibly:

-   Anonymization: Depending on settings, Glean can anonymize user-identifiable information within the insights views.
-   Access control: Organization admins manage who can view Agent Insights, ensuring only necessary personnel have access to interaction data.
-   Transparency: In-product notices inform users how their feedback contributes to agent improvements.
