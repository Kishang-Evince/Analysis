---
url: "https://docs.glean.com/get-started/review/review-connector-crawl"
canonical: "https://docs.glean.com/get-started/review/review-connector-crawl"
title: "Review connector crawl status"
description: "Start the crawl for each connector you set up during workspace creation and monitor sync progress until each connector reaches steady state."
fetched_at: "2026-09-01T13:29:50.754Z"
---
On this page

When you finish setting up a connector in [Stage 1: Create workspace](/get-started/setup/add-connectors), Glean does not start the crawl automatically. Use this task to start the crawl for each connected source and monitor its progress.

## Start the crawls[​](#start-the-crawls "Direct link to Start the crawls")

In the **Prepare your workspace for better results** section, select **Review connector crawl status** to start crawls for your connectors.

![Review connector crawl status](/img/get-started/review-connector-crawl-task.webp)

Review connector crawl status

1

Select connectors to crawl

From the **Review connector crawl status** task, select the checkbox next to each connector whose crawl you want to start.

2

Enable the crawl

Click **Enable crawl** next to the selected connector. (After your workspace launches, this button is labeled **Start crawl**.) The status updates to **Crawl started**.

3

Monitor progress

Go to **Admin console → Platform → Connectors** to monitor sync progress. Each connector moves through **Crawling (Step 1/2)** → **Indexing (Step 2/2)** → **All connectors** as the initial sync completes.

Status and metrics refresh on an hourly cadence. The metrics column shows **Crawl rate** during the initial sync and **Change rate** once steady state is reached. For more detail, see [Monitoring connectors](/connectors/connectors-monitoring).

## See also[​](#see-also "Direct link to See also")

-   [Add connectors](/get-started/setup/add-connectors): the workspace-setup step where you add connectors
-   [Monitoring connectors](/connectors/connectors-monitoring)
-   [Crawling FAQ](/connectors/crawling-faq)
-   [Crawling & learning process](/get-started/review/crawling-and-learning)
