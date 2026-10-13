---
url: "https://docs.glean.com/connectors/native/google-tasks/overview"
canonical: "https://docs.glean.com/connectors/native/google-tasks/overview"
title: "Google Tasks overview"
description: "What the Google Tasks connector indexes, the objects and API scopes it uses, how permissions work, and when changes appear in Glean."
fetched_at: "2026-10-13T08:49:57.911Z"
---
On this page

Use the Google Tasks connector to make personal task lists and tasks searchable in Glean. The connector reads Google Tasks through the Google Tasks API and reuses the Google Drive domain wide delegation client. Glean only reads from Google Tasks and never writes to it. Each indexed task and task list stays visible only to the person whose tasks Glean crawls.

## Supported features[​](#supported-features "Direct link to Supported features")

Glean's Google Tasks connector indexes each user's task lists and tasks, applies updates and deletions from Google Reports Audit activity, and enforces personal access so a task appears only for its owner. Its capabilities include:

-   Indexing task lists as containers and the tasks inside them.
-   Using task notes as the task body when notes exist, and the task title when they do not.
-   Adding search filters for task list, status, source, notes, and due date.
-   Storing the due date and the completion date on each task.
-   Recording the source and a link for assigned tasks, so you can open the Google Chat, Google Docs, or Gmail item the task came from.
-   Keeping content current through a full crawl of each user's tasks and an activity crawl that applies updates and deletions.

### Task body[​](#task-body "Direct link to Task body")

The connector uses the task notes as the document body when the task has notes. When a task has no notes, the connector uses the task title as the body. The document title is always the task title.

### Source[​](#source "Direct link to Source")

The Source filter shows how a task originated. A task with assignment information is `Assigned`, and a task without it is `Personal`. For an assigned task, the connector also records where the task came from, such as Google Chat, Google Docs, or Gmail, along with a link to the original item.

### Permissions[​](#permissions "Direct link to Permissions")

Glean assigns each indexed document to the single user whose Google Tasks data it crawls. Task lists and tasks are personal, so no other user can see them in Glean. The connector discovers users through the associated Google Drive instance.

### When changes appear[​](#when-changes-appear "Direct link to When changes appear")

| Change in Google Tasks | Reflected in Glean |
| --- | --- |
| A task added, edited, assigned, or reassigned | On the next activity crawl, which crawls the task again |
| A task deleted, marked as spam, or unassigned | On the next activity crawl, which removes the task document |
| A task list created or its title changed | On the next activity crawl, which rebuilds the task list document |
| A task list structure change, or its completed tasks deleted | On the next activity crawl, which crawls the task list contents again |
| A task list deleted | On the next full crawl of the user's container. The activity crawl schedules this full crawl, which reconciles the removed documents |
| Any change the activity feed does not report | On the next full crawl of the user's container |

## Supported objects[​](#supported-objects "Direct link to Supported objects")

| Object | What Glean indexes |
| --- | --- |
| Task lists | Each task list as a container, using the task list name |
| Tasks | The task title, notes, status, source, due date, completion date, and parent task list |

## Supported API scopes[​](#supported-api-scopes "Direct link to Supported API scopes")

The connector reuses the Google Drive domain wide delegation client and requests two read scopes. Glean only reads from Google Tasks and never writes to it.

| Scope | What Glean uses it for |
| --- | --- |
| `https://www.googleapis.com/auth/tasks.readonly` | Reading task lists and tasks |
| `https://www.googleapis.com/auth/admin.reports.audit.readonly` | Reading Google Reports Audit activity for the `tasks` application to apply updates and deletions |

## Limitations[​](#limitations "Direct link to Limitations")

-   Google Tasks does not run an incremental content crawl. Content that the activity crawl does not report appears on the next full crawl of the user's container.
-   Each task and task list is visible only to the user whose data Glean crawls. Google Tasks are personal, so Glean applies no shared access.
-   The connector depends on an associated Google Drive instance. It discovers users and reuses the domain wide delegation client from that instance, so the Google Drive instance must finish setup first.
-   A deleted task list produces no per task delete events. The connector reconciles the removed tasks on the next full crawl of that user's container, so the removal can lag.
-   Glean reads Google Tasks with read scopes and never writes back.

## See also[​](#see-also "Direct link to See also")

-   [Requirements](/connectors/native/google-tasks/requirements)
-   [Setup](/connectors/native/google-tasks/setup)
-   [FAQ](/connectors/native/google-tasks/faq)
-   [Troubleshooting](/connectors/native/google-tasks/troubleshooting)
