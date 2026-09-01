---
url: "https://docs.glean.com/agents/agent-development-lifecycle/manage-drafts-versions-and-rollbacks"
canonical: "https://docs.glean.com/agents/agent-development-lifecycle/manage-drafts-versions-and-rollbacks"
title: "Manage drafts, versions, and rollbacks"
description: "Use the draft and publish model of Glean, version history, and rollbacks to iterate safely without disrupting live users."
fetched_at: "2026-09-01T13:29:15.983Z"
---
On this page

As your agent evolves, you must use drafts and version history to make changes safely. This ensures that you can iterate on new ideas without disrupting the experience for your active users.

## Drafts vs. published versions[​](#drafts-vs-published-versions "Direct link to Drafts vs. published versions")

Glean uses a *Draft and Publish* model to protect the live user experience.

-   Drafts: These are auto-saved, work-in-progress edits. Changes made in a draft are not visible to your users until you hit publish.
-   Published versions: These are permanent snapshots of the agent at a specific point in time. When you publish, the draft becomes the new live version for all users.

This separation allows you to experiment freely in the Agent Builder without the risk of breaking the agent for others.

## A Workflow for safe iteration[​](#a-workflow-for-safe-iteration "Direct link to A Workflow for safe iteration")

To maintain a high-quality agent, you can follow this standard deployment process:

1.  Work in draft: Open your agent and make the necessary logic or connector updates.
2.  Test in preview: Use the *Preview* pane to run your *Golden test set* against the draft.
3.  Validate edge cases: Ensure the new changes haven't introduced regressions in existing behaviors.
4.  Publish: After you are confident, click **Publish** to push the changes live.

## Roll back safely[​](#roll-back-safely "Direct link to Roll back safely")

Rollbacks are a standard part of agent maintenance, not a sign of failure. If a newly published version behaves unexpectedly, you have two primary recovery paths:

-   Discard draft: If your current edits are not working out, you can simply restore the last published state and start your draft over.
-   Version restore: If a version you published yesterday was better than the one you published today, you can restore that older version as a new draft, verify it, and re-publish it.

Always have a known good version in your history that you can return to if a complex update does not go as planned.

## Environments and UAT[​](#environments-and-uat "Direct link to Environments and UAT")

Since agents interact with live enterprise data, it is important to manage your testing environment carefully.

-   Use preview for testing: The Preview pane is your primary testing ground before a draft goes live.
-   Separate UAT agents: For high-risk or company-wide workflows, consider creating a separate *Beta* version of the agent. This allows a small group of users to test the live behavior before you promote those changes to the primary *Production* agent.

## Keeping history meaningful[​](#keeping-history-meaningful "Direct link to Keeping history meaningful")

Version history is only useful if you know what was changed. Whenever you publish a significant update, keep a brief internal record of:

-   New capabilities: Did you add a new tool or skill?
-   Data changes: Did you add or remove a specific connector?
-   Logic refinements: Did you change the core instructions to improve accuracy or safety?

### Example: Handling a Regression[​](#example-handling-a-regression "Direct link to Example: Handling a Regression")

If a newly published *Research Agent* starts providing incomplete summaries:

1.  Identify: The team notices the regression in the live version.
2.  Restore: They open **Version History**, find the version from two days ago, and restore it as a draft.
3.  Publish: They click **Publish** immediately to return users to the working version.
4.  Investigate: The team then uses a separate draft to figure out why the new logic failed, without the pressure of a broken live agent.
