---
url: "https://docs.glean.com/connectors/native/loopio/troubleshooting"
canonical: "https://docs.glean.com/connectors/native/loopio/troubleshooting"
title: "Frequently Asked Questions (FAQ)"
description: "Answers to common questions about what the Loopio connector indexes and why content may be missing."
fetched_at: "2026-10-13T08:50:04.047Z"
---
On this page

This page answers the questions that come up most often about the Loopio connector: why certain content is or isn't searchable, how permissions behave, and when changes appear. For what the connector indexes and how permissions work, see the [Loopio overview](/connectors/native/loopio/overview).

### Why can't I find our library answers in Glean?

Glean indexes project entries, not library entries. Loopio's API exposes no access control for library or stack objects, so Glean can't tell who may see a library answer. Indexing them anyway would mean showing them to everyone in your organization.

Search your project history instead. Past project entries record how the team actually answered each question, and they're often more detailed than the library wording. Loopio has confirmed that library access control isn't on their roadmap.

### Why can't a user see a project in Glean that they can open in Loopio?

The user most likely has a custom role in Loopio. Loopio's API exposes no per-role permissions, so Glean can only honor the immutable Full Access role. Everyone else sees the projects they participate in.

If the user needs a project to be searchable in Glean, add them as a participant on that project. Glean never shows more than Loopio would, so this behavior fails closed by design.

### I disabled the connector, but Loopio results still appear in Glean

Disabling a connector stops syncing. It doesn't remove content Glean has already indexed, so existing Loopio results stay searchable.

To remove Loopio content from Glean, delete the connector instead of disabling it.

### How long until a change in Loopio shows up in Glean?

It depends on what changed. New projects, status changes, and edited answers appear within a day through the incremental sync. Access changes for a project are also reflected within a day through the daily participants sweep. A user added to a participating team may get access sooner because Glean resolves nested team membership at query time.

The **Participants** filter on a project card can take up to a week to refresh because it is rebuilt when the project changes or during the weekly full sync. Project and entry deletions can also take up to a week because Loopio provides no deletion signal. Until that full sync runs, a deleted project — or a project from which Loopio removed a user — may still appear in Glean search results for users who no longer have access in Loopio. See [When changes appear](/connectors/native/loopio/overview#when-changes-appear) for the full breakdown.

### Why does an answer show a variable name in brackets?

That's a Loopio merge variable with no value set for that project. Glean reproduces it exactly as Loopio's editor displays it, so a bracketed name such as `[Client Name]` is faithful rather than a bug. If the variable no longer exists in Loopio, Glean shows `[Merge Variable]`.

### Are attachments and the original questionnaire file indexed?

No. Loopio's API doesn't return imported source questionnaires, and its file download links expire after 10 minutes, so Glean indexes no files from Loopio. Question and answer text is still indexed through project entries.

## See also[​](#see-also "Direct link to See also")

-   [Loopio overview](/connectors/native/loopio/overview)
-   [Loopio setup](/connectors/native/loopio/setup)
