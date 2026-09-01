---
url: "https://docs.glean.com/connectors/native/dropbox/setup"
canonical: "https://docs.glean.com/connectors/native/dropbox/setup"
title: "Dropbox setup"
description: "The connector is configured primarily in the Glean admin console, with OAuth authorization completed on Dropbox."
fetched_at: "2026-09-01T13:29:25.976Z"
---
The connector is configured primarily in the Glean admin console, with OAuth authorization completed on Dropbox.

1.  As an admin, navigate to the Glean **Admin console**.
2.  Click **Add connector** and select Dropbox.
3.  In the **Setup** tab, click **Authorize**. You are redirected to a Dropbox login page.
4.  Follow the generated link to start an OAuth 2.0 authorization flow between your Dropbox account and the Glean-Dropbox central app. Signing in grants the app permission to fetch data from your Dropbox account so it can be indexed and made searchable in Glean.

Use the Glean admin console to manage and troubleshoot the connector, and to view logs and monitor ingestion progress.

If you encounter configuration issues or need further assistance, contact the [Glean support team](https://support.glean.com/hc/en-us/requests/new).
