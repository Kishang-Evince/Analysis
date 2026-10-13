---
url: "https://docs.glean.com/user-guide/knowledge/projects/how-projects-work"
canonical: "https://docs.glean.com/user-guide/knowledge/projects/how-projects-work"
title: "Organize content with Projects"
description: "Organize chats, documents, and artifacts into a project to keep related work together in one place."
fetched_at: "2026-10-13T08:51:32.481Z"
---
On this page

Projects help you organize chats and content in Glean so related work is easier to group, revisit, and share. You can think of a project as a workspace where you keep relevant chats, documents, and artifacts together in one place.

With projects, you can:

-   **Plan a product launch**: Group the planning doc, Jira epic, design folder, and related Glean chats in a single project so your cross-functional team stays aligned.
-   **Onboard a new teammate**: Organize all the onboarding resources, chats, and documents a new employee needs into a project and share it with them on day one.
-   **Research a topic across multiple tools**: Keep your research chats, source documents, and generated artifacts in one project so you can pick up where you left off.

* * *

## Create a project[​](#create-a-project "Direct link to Create a project")

info

Projects are rolling out gradually and might not be enabled for every deployment. If you don't see **Project** in the Library create menu, Projects aren't enabled for your deployment yet.

To view existing projects, select **Projects** in the left navigation. If **Projects** is not visible, open **More** and select **Projects**.

To create a Project:

1.  Open **Library** from the left navigation. If it is not visible, open **More** and select **Library**.
2.  Select the arrow next to **Create Artifact** (shown as **Create** in some deployments), then select **Project**.
3.  Give the project a title and an optional description.

Projects are private by default. You can share a project with specific people or groups when you're ready.

* * *

## Add content to a project[​](#add-content-to-a-project "Direct link to Add content to a project")

You can add the following types of content to a project:

-   **Chats** — keep related Glean Assistant conversations together.
-   **Documents** — add documents from any connected workplace app.
-   **Interactive content** — include generated content like canvases, slide decks, and spreadsheets.
-   **Files** — upload files directly to the project.
-   **URLs** — add links to external content that isn't indexed in Glean.

* * *

## Pin a project[​](#pin-a-project "Direct link to Pin a project")

For quick access to projects, use Sidebar Pins to keep a project in the **Pinned** section of the left navigation.

Open the project's options menu and select **Pin**.

To remove the project from **Pinned**, open its options menu and select **Unpin**. The project returns to **Projects**.

## Share a project[​](#share-a-project "Direct link to Share a project")

Select the **Share** button on any project to manage who can view or edit it. You can share with individual users or groups, and adjust permissions at any time.

Any chats and artifacts you create in a project are not visible to all project members by default.

Chats that others share with you appear in **Projects**, giving you a consistent place to return to conversations you can read. This includes chats shared with **Viewer** access, and it works even on deployments that don't use [Team chat](/user-guide/assistant/team-chat). Viewer access is read-only, so you can read the conversation but can't prompt Glean or edit artifacts in it. To work in the same thread together, the owner can share it through Team chat instead. See [Share chats](/user-guide/assistant/chat-sharing) for more about sharing conversations, and [Team chat](/user-guide/assistant/team-chat) for more about chat between multiple teammates.

* * *

## Understand items that require access[​](#understand-items-that-require-access "Direct link to Understand items that require access")

A project can include documents that not every member can open. Glean enforces the permissions of each underlying source, so members only see content they already have access to.

When you don't have access to a document, it appears as **Item requires access**. Glean hides the document's link, you can't open the item, and **Copy link** doesn't appear in its menu. To view the document, request access from its owner in the source app.

* * *

## Migration from Collections[​](#migration-from-collections "Direct link to Migration from Collections")

Existing Collections automatically migrate to Projects. All content and permissions are preserved during the migration, so you don't need to recreate anything.

If you previously used Collections, your existing Collections appear as projects with the same content, structure, and access controls.

For more details on how Collections worked before the migration, see [How Collections work](/user-guide/knowledge/collections/how-collections-work).
