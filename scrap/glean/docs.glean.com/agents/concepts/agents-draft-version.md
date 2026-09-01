---
url: "https://docs.glean.com/agents/concepts/agents-draft-version"
canonical: "https://docs.glean.com/agents/concepts/agents-draft-version"
title: "Agents draft and version"
fetched_at: "2026-09-01T13:29:16.209Z"
---
On this page

The agent draft and version features let you safely develop and improve your agent without affecting the live version. Work on your agent in a draft with autosave, then publish your changes when you're ready. Use version history to restore a previous state.

### Understanding drafts, ready-to-publish versions, and published versions[​](#understanding-drafts-ready-to-publish-versions-and-published-versions "Direct link to Understanding drafts, ready-to-publish versions, and published versions")

Glean separates in-progress work from the live agent that end users see. The following states let you update an agent safely:

-   **Draft**: your in-progress working version. Changes are autosaved while you edit.
-   **Ready to publish**: a staged version waiting to be published. This state appears when publishing requires approval for the agent's sharing scope. When a version moves to this state, the builder must enter a short change message that explains what changed.
-   **Published**: the live version that end users currently use.

A draft or ready-to-publish version doesn't change the live experience. End users continue to use the published version until a new version is published.

Version history stores published versions so you can review older versions and restore one as a new draft. Glean retains up to 30 published versions, identified by timestamp and editor metadata.

### Working with drafts and publishing[​](#working-with-drafts-and-publishing "Direct link to Working with drafts and publishing")

With drafts and version history, you can safely improve an agent without interrupting active users. You can:

-   Work in a draft while changes are autosaved
-   Publish a version when it is ready to go live
-   Request to publish when approval is required and you don't have direct publish permission
-   Restore an older published version as a new draft
-   Discard a draft you no longer want to keep

If approval is required, requesting to publish moves the agent to **Ready to publish** and sends it to a moderator for review. The currently published version stays live until the moderator publishes the staged version.

If approval isn't required, users with publish permission can publish the draft directly.

### Drafts in the agent library[​](#drafts-in-the-agent-library "Direct link to Drafts in the agent library")

Agent drafts are saved automatically. Use the **Drafts** filter to find agents that currently have active drafts. Owners, editors, and moderators can see draft indicators on agents they can edit. View-only users can't see draft indicators.

### Edit a draft[​](#edit-a-draft "Direct link to Edit a draft")

1.  Use the **Drafts** filter to find the agent you want to update.
2.  Open the draft and continue editing in **Agent builder**.

note

Changes to agent permissions, sharing settings, and publishing options are not versioned. Only changes to the core agent workflow are versioned.
