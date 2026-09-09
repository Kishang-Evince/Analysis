---
url: "https://docs.glean.com/connectors/native/monday/overview"
canonical: "https://docs.glean.com/connectors/native/monday/overview"
title: "Monday.com overview"
description: "Learn how the Monday.com connector works with Glean."
fetched_at: "2026-09-01T13:29:35.308Z"
---
On this page

-   Glean requires an admin to install the Glean app to the Monday.com account and authorize the app.
-   Authentication is done via [OAuth](https://developer.monday.com/apps/docs/oauth).
-   Glean will understand user viewing permissions for workspaces and boards. Glean will never show documents to a user who does not have access.
-   It's important to note that all data is stored in the customer's cloud account and no data leaves the customer environment.

## Integration features[​](#integration-features "Direct link to Integration features")

By default Glean will capture the following content:

-   All workspaces a user has access to
-   Public boards in open workspaces

In addition, each user can choose to authorize Glean to index private boards, shareable boards, and public boards in closed workspaces they have access to-this needs to be enabled on a per-user basis.

Over time, Glean may add support for docs, dashboards, items, and other Monday.com objects.

## API usage[​](#api-usage "Direct link to API usage")

Glean uses the [Monday.com API](https://developer.monday.com/api-reference/docs) to ingest all data:

-   Glean begins by understanding the users and teams that are a part of the Monday.com account.
-   Glean then crawls workspaces and boards in the customer's Monday.com account.

Glean performs a full crawl of the content hourly, and updates permissions several times every hour.
