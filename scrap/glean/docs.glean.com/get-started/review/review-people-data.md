---
url: "https://docs.glean.com/get-started/review/review-people-data"
canonical: "https://docs.glean.com/get-started/review/review-people-data"
title: "Review people data import"
description: "Verify the accuracy of your people data import and resolve any profiles flagged as needing attention before going live."
fetched_at: "2026-09-01T13:29:50.779Z"
---
On this page

Once Glean finishes the initial sync of your people connector, confirm the imported data is correct before going live. Inaccurate or incomplete people data degrades search relevance, the directory, and the org chart.

## Review the people data task[​](#review-the-people-data-task "Direct link to Review the people data task")

In the **Prepare your workspace for better results** section, select **Review people data import** to verify your imported people data.

![Review people data import](/img/get-started/review-people-data-task.webp)

Review people data import

This task has two sub-steps:

1

Map source attributes to Glean attributes

If your people connector supports custom mapping, align directory fields with Glean's standard attributes. For example, map an Okta `managerEmail` field to Glean's **Manager** attribute. See [Attribute mapping](/administration/identity/people-data/attribute-mapping) for what each Glean attribute means and which connectors support custom mappings.

2

Review and save imported people data

Confirm the previewed records look correct. Pay attention to the **Attention required** tab on the **People data** page, which surfaces profiles with missing required fields such as department or manager. See [People data issues](/administration/identity/people-data/troubleshooting/people-data-issues) for resolution steps.

To open this task directly, go to **Users and permissions → People data** in the **Admin console**.

warning

Address any **Attention required** items before launching to your users. Missing manager or department fields propagate into the org chart and search ranking signals.

## See also[​](#see-also "Direct link to See also")

-   [Sync people data](/get-started/setup/sync-people-data) — the workspace-setup step where you select a people connector
-   [Attribute mapping](/administration/identity/people-data/attribute-mapping)
-   [People data issues](/administration/identity/people-data/troubleshooting/people-data-issues)
