---
url: "https://docs.glean.com/administration/assistant/configuration/memory-personalization"
canonical: "https://docs.glean.com/administration/assistant/configuration/memory-personalization"
title: "Configure memory settings"
description: "Configure organization-level settings for Glean memory and personalization"
fetched_at: "2026-10-13T08:49:06.421Z"
---
On this page

Glean memory lets users to personalize their interactions with Glean by storing preferences, work context, and project information.

Deployment availability

Memory is available for GCP deployments that use Glean Universal Key. Glean supports memory for AWS and Azure deployments after deployment-specific readiness checks. These checks include activity-pipeline infrastructure, monitoring, provider routing, evaluations, AIOM enablement, and final readiness approval. Glean also supports Customer Key deployments that use Bring Your Own Key (BYOK), subject to product readiness and supported cloud/model combinations. On deployments where memory isn't yet available, the **Personalization** section doesn't appear in users' Settings. For details about your deployment, contact your Glean representative or [Glean Support](https://support.glean.com/).

Memory helps users work more efficiently by reducing repetition and providing continuity across conversations. The feature includes:

-   **Saved memories**: Explicit information users tell Glean to remember, such as role, preferences, or project context.
-   **Learned memories**: Insights Glean learns automatically from users' chats and their broader work activity, including response preferences, roles and responsibilities, and active projects.

Glean stores memory data at the individual user level and does not share memory data across users. For the full list of what memory can capture, see [Memory categories](/user-guide/assistant/memory-personalization#memory-categories) in the user guide.

## Configure memory settings[​](#configure-memory-settings "Direct link to Configure memory settings")

Learned memories are on by default. Turn them off in **Admin console → Advanced Features**. Users control saved memories. You can't turn saved memories off. Users view, edit, and delete saved memories in **Settings → Personalization**. They can also control memory use within a single chat. See [User controls](#user-controls).

## Retention policies[​](#retention-policies "Direct link to Retention policies")

Glean captures context continuously as users work, drawing from each chat turn and from work activity, and consolidates it into durable memory through a daily process. Memories stay current without a fixed regeneration cycle.

| Memory type | Retention |
| --- | --- |
| **Saved memories** | Persist until the user deletes them. |
| **Learned memories** | Maintained as living, versioned records that Glean updates over time as it learns from new activity. Older, less-relevant knowledge ages out gradually rather than expiring on a fixed schedule. |

## Billing[​](#billing "Direct link to Billing")

Memory is part of Glean Assistant, not a separate product or SKU. Glean does not sell memory on its own. How Glean bills the underlying LLM usage depends on your plan:

-   **Glean Core Suite**: Saved memories are included in the seat. Learned memories are billed with Model Hub Usage.
-   **Enterprise Flex**: Saved memories are included in the seat. Learned memories are free through November 6, 2026, then consume FlexCredits at the current rate card beginning November 7, 2026.
-   **Legacy and existing customers**: Memory remains included in the platform fee.

For questions about billing or credits, contact your Glean representative or [Glean Support](https://support.glean.com/).

## User controls[​](#user-controls "Direct link to User controls")

Users have individual controls over their memory settings:

-   **View, edit, and delete memories**: Users can view their memories organized by category, edit them, and delete individual entries or all memories in a category.
-   **Memory indicator**: Responses that drew on a user's memories show a book icon. Users select it to see which memories Glean used, so they can correct or delete any that are wrong.
-   **Runtime controls**: Users can control memory usage during a conversation using natural language commands.

## Privacy and security[​](#privacy-and-security "Direct link to Privacy and security")

Memory is designed with privacy and security as core principles:

-   **User-level isolation**: Glean stores memory per user and scopes the memory to that user's permissions. Glean doesn't share memory across users, and memory doesn't create cross-company or cross-user learning.
-   **No document access**: Memory stores facts and preferences, not document content. Memory does not grant users access to documents they cannot otherwise view.
-   **Sensitive data handling**: The system does not extract sensitive personal attributes. Learned memory is scoped to work context and preferences.

## Compliance considerations[​](#compliance-considerations "Direct link to Compliance considerations")

When evaluating memory for your organization:

-   **Data residency**: Memory data is stored in accordance with your organization's data residency configuration.
-   **User deletion**: When a user is deleted from your organization, their memory data is also deleted.
-   **Audit logs**: Memory operations are logged and available through your standard audit log channels.

## Known limitations[​](#known-limitations "Direct link to Known limitations")

Administrators and users should be aware of the following:

-   **Deployment availability**: Memory is available for GCP deployments that use Glean Universal Key. AWS and Azure deployments require deployment-specific readiness checks. Customer Key deployments that use BYOK are supported for eligible cloud/model combinations, subject to product readiness.
-   **Possible duplication**: Users may see duplicate entries in memory views. Glean consolidates these over time.
-   **Timing**: Glean consolidates new context on a daily basis, so newly learned memories may take about a day to appear.

## See also[​](#see-also "Direct link to See also")

-   [Memory and personalization](/user-guide/assistant/memory-personalization) — user guide for using memory features in Glean Assistant
