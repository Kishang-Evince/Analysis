---
url: "https://docs.glean.com/connectors/native/monday/setup"
canonical: "https://docs.glean.com/connectors/native/monday/setup"
title: "Monday.com setup"
description: "Install the Glean app and authorize Monday.com accounts for permission-aware search"
fetched_at: "2026-10-13T08:50:05.662Z"
---
On this page

Connect Monday.com to make its workspaces, boards, items, subitems, updates, and replies searchable in Glean. A Monday.com account admin installs and authorizes the Glean app. Each user then authorizes their Monday.com account.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

You need a Monday.com account admin to install and authorize the Glean app.

## Connect to Monday.com[​](#connect-to-mondaycom "Direct link to Connect to Monday.com")

1.  Enter your account subdomain into the **Account subdomain** box e.g. `glean` if you access Monday.com at `glean.monday.com`. Do not include `.monday.com`.
2.  Click the **Install** link to begin installing the Glean app to your Monday.com account. If the link doesn't work, make sure you entered your subdomain correctly in the previous step.
3.  On the Monday.com installation page, make sure the subdomain in the top right corner matches the one you entered earlier. a. Select **All Workspaces** to make the app available to all current and future workspaces. b. Click **Install**.
4.  Back on Glean, click **Authorize** and follow the generated link. If the authorization succeeds, you’re all set!

## Authorize individual accounts[​](#authorize-individual-accounts "Direct link to Authorize individual accounts")

Each user must authorize Monday.com so Glean can index all content that the user can access:

1.  Sign in to Glean and open the profile menu.
2.  Go to **Your settings → Connectors**.
3.  Select **Monday.com** and click **Authorize**.
4.  Complete the Monday.com consent flow.

Existing Monday.com connections might not grant Glean access to updates and replies. To grant this access, authorize Monday.com again. Until then, Glean continues to index available boards and items, but not their updates or replies.

Glean reflects new content and authorization changes after the next successful full content crawl.

## Get help[​](#get-help "Direct link to Get help")

Contact [Glean Support](https://support.glean.com/hc/en-us/requests/new) if you have questions or encounter setup issues.
