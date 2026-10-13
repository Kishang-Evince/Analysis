---
url: "https://docs.glean.com/connectors/native/loopio/overview"
canonical: "https://docs.glean.com/connectors/native/loopio/overview"
title: "Loopio overview"
description: "What the Loopio connector indexes, the objects and API scopes it uses, how it resolves merge variables, and when changes appear in Glean."
fetched_at: "2026-10-13T08:50:02.960Z"
---
On this page

Use the Loopio connector to make your Request for Proposal (RFP) and questionnaire history searchable in Glean. Anyone answering a new security questionnaire can see how the team answered the same question before, without opening Loopio. The connector reads Loopio through read-only OAuth 2.0 client credentials and enforces access using Loopio's participant lists and team membership.

## Supported features[​](#supported-features "Direct link to Supported features")

Glean's Loopio connector indexes project content, resolves merge variables so answers read the way they do in Loopio, and enforces Loopio's native access model at query time. Its capabilities include:

-   Indexing projects and project entries.
-   Writing custom project field values and merge variable values into a project's indexed content, so a search for a deal name or deal stage held only in a Loopio custom field matches the project.
-   Resolving merge variables inline instead of exposing raw tokens.
-   Mapping Loopio participants, teams, and roles to Glean access controls.
-   Keeping content fresh through a daily incremental sync and a weekly full sync.

### Library entries and project entries[​](#library-entries-and-project-entries "Direct link to Library entries and project entries")

Loopio has two kinds of answer, and the difference decides what Glean can index.

A **library entry** is the canonical curated answer, the approved wording for a recurring question. A **project entry** is how one specific questionnaire was actually answered, in the context of that customer and that deal.

They're often not the same. Past project answers tend to be longer, more specific, or tailored to the customer who asked. Both answer the same underlying question: how did your team respond to this last time? That's why the library staying unindexed is a real gap rather than a cosmetic one. Project entries still cover that job on their own.

### Merge variables in answers[​](#merge-variables-in-answers "Direct link to Merge variables in answers")

Loopio stores merge variables inside answer text as an internal token such as `[CONTENT_VARIABLE_PK:…]` and resolves them when it displays the answer. Glean resolves them the same way, so an indexed project entry reads the way it reads in Loopio instead of exposing raw tokens.

| In Loopio | In Glean |
| --- | --- |
| The variable has a value for that project | The value, substituted inline |
| The variable exists but has no value set | The variable name in brackets, such as `[Client Name]` |
| The variable no longer exists | `[Merge Variable]` |

Expect bracketed names

A result showing `[Client Name]` is not a Glean bug. It reproduces an unset variable exactly as Loopio's own editor displays it. `Client Name` in particular tracks the project's company name, so you can't set it per project.

### Permissions[​](#permissions "Direct link to Permissions")

Project access in Glean mirrors Loopio's participant list. Users who participate in a project get access, teams map to Glean groups, and the project owner always has access. Project entries inherit the permissions of the project they belong to.

### When changes appear[​](#when-changes-appear "Direct link to When changes appear")

| Change in Loopio | Reflected in Glean |
| --- | --- |
| A new project, or a project status change | Within a day, by the incremental sync |
| An answer edited, or an entry added | Within a day. Editing an entry updates its parent project, which the incremental sync picks up |
| Access to a project: whether a person can open it | Within a day. The daily participants sweep rewrites the project's Glean group. A user added to a participating team may get access sooner because Glean resolves nested team membership at query time |
| The Participants filter on the project card | Within a week. It refreshes when the project document is rebuilt, on the next project edit or the weekly full sync |
| A project or an entry deleted | Within a week. Loopio provides no deletion signal, so only the full sync detects the removal |

Deletions and access changes lag by up to a week

Until the next full sync, a project deleted in Loopio — or a user removed from one — may still appear in Glean search results for users who no longer have access in Loopio. This is an access-control window, not just a freshness delay.

## Supported objects[​](#supported-objects "Direct link to Supported objects")

| Indexed | Not indexed |
| --- | --- |
| Projects: RFPs, due diligence questionnaires, and other questionnaires | Library entries and Stacks |
| Project entries: the question and answer pairs inside a project | Files, including imported source questionnaires and entry attachments |
| Custom project field values, including Salesforce and HubSpot deal metadata | Library attachments and library entry history |
| Project merge variable values | Confidential projects, which Loopio's API excludes |
| Users, teams, and roles, used for access control | Project templates |

## Supported API scopes[​](#supported-api-scopes "Direct link to Supported API scopes")

The connector authenticates with an OAuth 2.0 app in Loopio and uses five read-only scopes. All five are read-only; Glean never writes to Loopio.

| Scope | What Glean uses it for |
| --- | --- |
| `project:read` | Reading projects and their entries |
| `project.participant:read` | Reading who has access to each project |
| `user:read` | Reading users and teams |
| `role:read` | Identifying Full Access administrators, and Guest users so they are excluded |
| `mergeVariable:read` | Resolving merge variables so answers read the way they do in Loopio |

## Limitations[​](#limitations "Direct link to Limitations")

Most of these limitations follow from what Loopio's API exposes.

-   **Library entries and Stacks aren't indexed.** Loopio's API exposes no access control for library or stack objects, so Glean can't reproduce who may see them. Indexing them would mean showing them to everyone. Loopio has confirmed this isn't on their roadmap.
-   **Users with custom roles may see less in Glean than in Loopio.** Loopio's API exposes no per-role permissions, so Glean can honor only the immutable Full Access role. A user whose custom role grants broad project visibility in Loopio will see only the projects they participate in. This fails closed, so Glean never shows more than Loopio would.
-   **Guests aren't indexed** and won't see Loopio content in Glean.
-   **Disabling the connector doesn't hide content that's already indexed.** Syncing stops, but existing Loopio results stay searchable. To remove them from Glean, delete the connector rather than disabling it.
-   **Files aren't indexed.** Loopio's API doesn't return the imported source questionnaire, and its file download links expire after 10 minutes.
-   **The EU datacenter isn't supported.** Only United States hosting is available today.
-   **Loopio fixes an OAuth app's scopes at creation.** You can't add a scope afterward, so granting a new one means deleting the Loopio OAuth app and recreating it.

## See also[​](#see-also "Direct link to See also")

-   [Requirements](/connectors/native/loopio/requirements)
-   [Loopio setup](/connectors/native/loopio/setup)
-   [FAQ](/connectors/native/loopio/troubleshooting)
