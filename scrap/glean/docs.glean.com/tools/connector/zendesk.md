---
url: "https://docs.glean.com/tools/connector/zendesk"
canonical: "https://docs.glean.com/tools/connector/zendesk"
title: "Zendesk Tools"
fetched_at: "2026-09-01T13:30:06.953Z"
---
On this page

The Zendesk tools contain a tool to allow users to **Add a comment to a Zendesk Ticket**. This tool enables teams to efficiently add comments to existing Zendesk tickets directly within Glean agents. Users can post internal notes or public replies to tickets without switching contexts, helping maintain responsive customer support while reducing the friction of navigating between different systems. This capability helps support teams document resolutions, provide updates, and collaborate on tickets more effectively.

The Zendesk tools are available in both Glean Assistant and Glean Agents.

## Add Comment to Zendesk Ticket[​](#add-comment-to-zendesk-ticket "Direct link to Add Comment to Zendesk Ticket")

### Key Features[​](#key-features "Direct link to Key Features")

The Add Comment to Zendesk Ticket tool in Glean enables users to append comments directly to existing Zendesk tickets from within Glean workflows or conversations. This feature streamlines communication and documentation by allowing users to provide updates, share insights, or respond to customers without leaving their current workspace. It supports both public replies visible to customers and private internal notes for team collaboration.

-   **Dual Comment Types**: Add public comments (visible to customers) or private internal notes (visible only to agents).
-   **Context Preservation**: Maintains full conversation history within the ticket while adding new information.
-   **Workflow Integration**: Seamlessly integrates with other Glean tools to create comprehensive support workflows.
-   **Permission-Aware**: Respects Zendesk permissions, ensuring users can only comment on tickets they have access to.
-   **Audit Trail**: All comments are tracked with proper attribution, timestamps, and user information.

### Set Up in Agent Builder[​](#set-up-in-agent-builder "Direct link to Set Up in Agent Builder")

This step is needed only once per tools.

1.  In the Agent Builder, select the Zendesk tool by navigating to **Select Step → Tools → By connector → \[your Zendesk tools name\]**.
2.  Authenticate Zendesk by clicking **Connect**.
3.  On Zendesk's authorization page, approve the requested permissions and click **Accept**.
4.  Configure the comment defaults:
    -   Set whether comments should be public or internal by default
    -   Define any standard signatures or footers
    -   Configure formatting preferences
5.  Use and test the tool with a sample ticket ID and comment.

### Examples[​](#examples "Direct link to Examples")

-   **Status Update**: "Add a comment to ticket #12345 saying 'We've identified the issue and are working on a fix. Expected resolution time is 2 hours.'"
-   **Internal Documentation**: "Post an internal note on ticket #67890: 'Escalated to engineering team. Root cause appears to be database timeout during peak hours.'"
-   **Customer Response**: "Reply to ticket #11111 with 'Thank you for your patience. The issue has been resolved. Please let us know if you experience any further problems.'"
-   **Handoff Note**: "Add internal comment to ticket #54321: 'Customer verified. Needs tier 2 support for advanced configuration. See attached troubleshooting log.'"
-   **Resolution Documentation**: "Comment on ticket #99999: 'Issue resolved by clearing cache and restarting service. Added to knowledge base as KB-2024-001.'"

### Best Practices[​](#best-practices "Direct link to Best Practices")

-   Always verify the ticket ID before adding comments by using a search or verification step in your agent workflow.
-   Clearly specify whether comments should be public or internal to avoid accidental disclosure of internal information.
-   Use structured formatting (bullet points, sections) for longer comments to improve readability.
-   Note that every user needs to connect their account to Zendesk before running the agent.

### Known Limitations[​](#known-limitations "Direct link to Known Limitations")

-   Comments cannot be edited or deleted once posted through the API.
-   Maximum comment size is 65,535 characters.
-   Rich text formatting support depends on your Zendesk configuration.
-   Cannot add attachments directly through this tool (attachments must be handled separately).
-   Rate limits apply based on your Zendesk plan (typically 400 requests per minute).
-   The tool requires the ticket to exist and be accessible to the authenticated user.
-   Comments are subject to any Zendesk triggers or automations configured in your instance.
