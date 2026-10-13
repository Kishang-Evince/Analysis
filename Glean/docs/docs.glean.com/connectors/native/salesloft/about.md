---
url: "https://docs.glean.com/connectors/native/salesloft/about"
canonical: "https://docs.glean.com/connectors/native/salesloft/about"
title: "Salesloft overview"
description: "Learn what the Salesloft connector indexes, how it applies Salesloft access rules, and how its crawls keep data fresh."
fetched_at: "2026-10-13T08:50:14.177Z"
---
On this page

Use the Salesloft connector to search Salesloft sales and engagement records in Glean. The connector indexes selected fields from structured records and uses Salesloft ownership, groups, roles, and team access settings to build document permissions.

To connect Salesloft, see [Salesloft setup](/connectors/native/salesloft/setup).

## Supported objects[​](#supported-objects "Direct link to Supported objects")

| Object | Selected fields indexed by Glean |
| --- | --- |
| People | Title, job seniority, stage, account, tags, and owner |
| Accounts | Domain, industry, stage, tier, tags, owner, and creator |
| Cadences | Function, state, sharing status, tags, groups, owner, and creator |
| Activity emails | Recipient, subject, body, status, sender identity, timestamps, cadence |
| Activity calls | Called person, disposition, sentiment, creator, timestamps, and cadence |
| Notes | Note content, author, associated person or account, associated type, and linked call when available |
| Tasks | Subject, description, status, type, due date, creator, and associated person |
| Meetings | Title, status, type, start time, owner, associated person, and cadence |

These are the eight content document types implemented by the connector. Salesloft custom fields are not mapped into indexed content or facets.

## How content appears in Glean[​](#how-content-appears-in-glean "Direct link to How content appears in Glean")

-   People, accounts, and cadences appear as structured records with searchable metadata.
-   Activity emails, notes, and tasks include their text content when Salesloft returns it.
-   Activity calls and meetings include searchable metadata but do not include call recordings or transcripts.
-   Each record links to the corresponding page in Salesloft. Activity emails link to their email record, while calls, tasks, and meetings link to the related person page when that association is available. Notes can link to their associated person or account, with the appropriate Salesloft tab and record selected.

## Searchable fields[​](#searchable-fields "Direct link to Searchable fields")

The connector exposes selected fields that help you narrow results:

| Object | Searchable fields |
| --- | --- |
| People | Title, job seniority, stage, account, tag, and owner |
| Accounts | Domain, industry, stage, tier, tag, and owner |
| Cadences | Function, current state, shared, team cadence, group, tag, and owner |
| Activity emails | Status, cadence, recipient, subject, body, and sender identity |
| Activity calls | Disposition, sentiment, cadence, called person, and creator |
| Notes | Associated type, person, call, and author |
| Tasks | Status, task type, associated person, due date, and creator |
| Meetings | Status, meeting type, cadence, person, start time, and owner |

Field values appear only when Salesloft returns them. Salesloft custom fields are not mapped into indexed content or facets.

## Permissions[​](#permissions "Direct link to Permissions")

The connector reconstructs Salesloft access from the team, user, group, role, owner, and record data returned by the Salesloft API. It does not receive a complete per-record ACL from a single endpoint.

### People and accounts[​](#people-and-accounts "Direct link to People and accounts")

For people, Glean grants access through the Salesloft `view_all_people` permission group and the record owner. For accounts, Glean uses the `view_all_companies` permission group and the record owner.

Salesloft team access settings can expand access further:

-   **All records:** Glean grants domain access to the primary records of that type.
-   **Owned by group and subordinates:** Glean grants access through the owner's Salesloft group and its memberships.
-   **Other or unavailable access modes:** Glean applies the owner and the corresponding `view_all_*` permission group without adding an unrecognized access rule.

Ownerless records do not receive an owner-specific user permission, but they still receive the applicable `view_all_people` or `view_all_companies` permission group.

### Cadences[​](#cadences "Direct link to Cadences")

Glean always grants the Salesloft Admin role group and the cadence owner access to a cadence. For shared cadences, Glean also applies Salesloft's team privacy and group rules:

-   If the team makes shared groups public, Glean grants domain access.
-   Team cadences receive the Salesloft public- and team-cadence permission groups and their configured Salesloft groups.
-   Other shared cadences receive access through the owner's Salesloft group when available.

### Related records[​](#related-records "Direct link to Related records")

Notes inherit access from their associated person or account. Activity emails, calls, tasks, and meetings use the person association mapped for their record type. For example, a task linked to a person uses that person's access rules, and a note linked to an account uses the account's access rules. A secondary record without the association required by its type cannot receive the corresponding inherited permission.

Glean models Salesloft’s built-in roles and crawls custom roles. The connector uses these roles, groups, and memberships to resolve permission groups relevant to the supported `view_all_*` and cadence access groups. Salesloft users are synchronized with their active status.

## Crawling and update frequency[​](#crawling-and-update-frequency "Direct link to Crawling and update frequency")

The connector uses scheduled polling crawls. These are the default periods in Glean; your deployment can use different values.

| Crawl scope | Full crawl | Incremental crawl | Scope |
| --- | --- | --- | --- |
| Users, groups, custom roles, and team | Hourly | Not supported | Identity, group membership, role permissions, and team access settings |
| People, accounts, cadences, activity emails, activity calls, notes, tasks, and meetings | Weekly | Every 5 minutes | Records returned by the corresponding Salesloft API endpoint; incremental crawls use `updated_at[gt]` |
| Person stages, account stages, and account tiers | Daily | Not supported | Lookup values used by person and account facets |

Salesloft does not use webhooks in this connector. Identity and group membership data is synchronized hourly. Updated content is synchronized approximately every five minutes, and full content crawls run at least weekly. The time required for a permission change to appear in Glean depends on the type of change. Full crawls reconcile records that incremental crawls did not capture and remove records that Salesloft no longer returns.

## Limitations[​](#limitations "Direct link to Limitations")

-   The connector uses the permissions of the Salesloft account that created the private application. Create it with workspace-wide access to avoid incomplete coverage.
-   The connector does not index Salesloft custom fields, cadence memberships as separate documents, raw call recordings, call transcripts, or other Salesloft modules outside the eight supported object types.
-   Salesloft does not provide webhook updates through this connector. Glean polls on the schedule above.
-   Secondary records depend on their required person or account association and on the related owner metadata being available during processing.
-   The connector reads from Salesloft for indexing and does not write changes back to Salesloft.

## See also[​](#see-also "Direct link to See also")

-   [Salesloft setup](/connectors/native/salesloft/setup)
-   [Salesloft troubleshooting and FAQs](/connectors/native/salesloft/troubleshooting)
