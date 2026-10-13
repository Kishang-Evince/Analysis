---
url: "https://docs.glean.com/connectors/native/vitally/about"
canonical: "https://docs.glean.com/connectors/native/vitally/about"
title: "Vitally overview"
description: "Learn what the Glean Vitally connector indexes, how it handles permissions and crawling, and which content is outside its current scope."
fetched_at: "2026-10-13T08:50:22.691Z"
---
On this page

Use the Vitally connector to search customer success records and related work in Glean. The connector indexes structured Vitally content and applies Vitally user and ownership information when it builds document permissions.

To connect Vitally to Glean, see [Vitally setup](/connectors/native/vitally/setup).

## Common use cases[​](#common-use-cases "Direct link to Common use cases")

Use Vitally information in Glean to support customer success, sales, and account-management workflows:

-   Review account health, segments, Monthly Recurring Revenue (MRR), and upcoming renewal dates.
-   Prepare for QBRs using historical notes and customer conversations.
-   Find renewal and expansion signals across accounts and related work.
-   Find tasks and projects by owner, status, or category.
-   Understand what a customer cares about before an account conversation.

## Supported objects[​](#supported-objects "Direct link to Supported objects")

| Object | What Glean indexes |
| --- | --- |
| Accounts | Account name, health score, MRR, renewal date, segments, and customer success ownership details |
| Organizations | Organization name, health score, MRR, and account count |
| Notes | Note subject and body, plus category, source, author, and tags when available |
| Tasks | Task name and description, plus status, assignee, and category when available |
| Projects | Project name and summary, plus owner, category, and status when available |
| Conversations | Conversation subject and message thread when Vitally returns the conversation details and messages, plus source, status, and rating when available |

Glean indexes account and organization attributes as structured content. Notes, tasks, and conversation messages use rich text when Vitally provides it. Glean fetches conversation details to retrieve the message thread.

## Search filters[​](#search-filters "Direct link to Search filters")

Customer Success Manager (CSM) is an account field in Vitally. When indexed records contain values for these fields, Glean shows the following connector-specific filters in the listed order:

| Result type | Filters |
| --- | --- |
| Account | **CSM**, **Account Executive**, **Key Role**, **Segment**, **Health bucket**, **Net Promoter Score**, **Renewal Quarter**, **Status** |
| Note | **Category**, **Source**, **Author**, **Tag** |
| Task | **Status**, **Assignee**, **Category** |
| Project | **Category**, **Status**, **Owner** |
| Conversation | **Source**, **Status**, **Rating** |
| Organization | No connector-specific filters |

## How content appears in Glean[​](#how-content-appears-in-glean "Direct link to How content appears in Glean")

Glean shows the result title and the metadata listed below for each result.

| Result type | Metadata shown |
| --- | --- |
| Account | Object type, CSM, health bucket, renewal quarter, status, and last updated time |
| Organization | Object type, account count, MRR, health score, and last updated time |
| Note | Object type, author, category, note date, and last updated time |
| Task | Object type, assignee, status, and last updated time |
| Project | Object type, owner, category, status, and last updated time |
| Conversation | Object type, source, status, and last updated time |

When a Project result doesn't have an owner value, Glean displays **Unassigned**.

When your organization uses AI summarization, hover over a supported Vitally result and select **Summarize**. The option appears when the result contains content that Glean can summarize.

Each indexed record links back to its corresponding page in Vitally.

## Permissions[​](#permissions "Direct link to Permissions")

Glean builds Vitally document permissions from the Vitally user roster and ownership fields returned by the Vitally API:

-   The connector adds Vitally users with the Admin role to an admin group that can access all indexed Vitally documents
-   Accounts and organizations receive groups containing their key-role owners
-   Notes, tasks, and projects with a parent account inherit that account's permissions
-   Conversations receive access from each linked account, so users can access a conversation when they have access to one of its linked accounts

The connector does not use Vitally Access Groups when it builds permissions. Access Groups are outside the current connector implementation.

For records processed by an incremental crawl, Glean refreshes owner and parent-organization memberships and removes stale memberships. Changes not observed by incremental crawls may require a full crawl for reconciliation. Full crawls run weekly by default.

### User exclusions (redlisting)[​](#user-exclusions-redlisting "Direct link to User exclusions (redlisting)")

You can exclude non-admin Vitally users from accessing content indexed by this connector in Glean. Redlisting overrides access granted through account and organization ownership.

Users with the Admin role in Vitally cannot be redlisted and retain access to all indexed Vitally documents.

Glean applies changes to the excluded-user list during the Vitally user identity crawl (the connector's `admins` crawl). This crawl supports full crawls only, so changes might not take effect immediately. Redlisting does not change the user's permissions in Vitally.

To configure user redlisting, see [Exclude users](/connectors/native/vitally/setup#exclude-users-optional).

### What permissions mean in practice[​](#what-permissions-mean-in-practice "Direct link to What permissions mean in practice")

The following examples apply to users who are not redlisted:

-   A user with the Admin role in Vitally can access all indexed Vitally documents.
-   An account owner can access the account and its account-linked notes, tasks, and projects through the account's permission group.
-   An organization owner can inherit access to accounts associated with that organization.
-   A user can access a conversation when they have access to at least one of the conversation's linked accounts.
-   A Vitally Access Group does not grant access in Glean unless the user also receives access through the connector's documented ownership model.

## Crawling and update frequency[​](#crawling-and-update-frequency "Direct link to Crawling and update frequency")

The connector uses polling crawls. It runs full and incremental crawls for content objects and a full crawl for the Vitally user roster and reference data.

The default crawl periods in Glean are:

| Content | Full crawl | Incremental crawl |
| --- | --- | --- |
| Accounts and notes | Weekly | Every 15 minutes |
| Organizations | Weekly | Every hour |
| Tasks | Weekly | Every 15 minutes |
| Projects and conversations | Weekly | Every hour |
| Vitally user roster | Daily | Not supported |
| Note categories, task categories, and project templates | Daily | Not supported |

These are default connector settings. Your Glean deployment can use different crawl periods.

Incremental crawls use each record's `updatedAt` value. Churned accounts and organizations, and archived notes, tasks, or projects, may be removed by the applicable status-based incremental crawl when that crawl is deployed and enabled. A weekly full crawl also reconciles records that Vitally no longer returns.

This connector uses polling rather than webhooks or real-time updates.

## Limitations[​](#limitations "Direct link to Limitations")

-   The current connector scope includes accounts, organizations, notes, tasks, projects, and conversations
-   The connector doesn't index Net Promoter Score (NPS) responses, customer contacts, meetings, custom objects, or custom survey responses
-   The connector doesn't support write operations
-   The connector doesn't include Vitally Access Groups in its permission model

If an expected record is missing, see [Vitally troubleshooting](/connectors/native/vitally/troubleshooting#missing-content).

## See also[​](#see-also "Direct link to See also")

-   [Vitally setup](/connectors/native/vitally/setup)
-   [Vitally troubleshooting](/connectors/native/vitally/troubleshooting)
