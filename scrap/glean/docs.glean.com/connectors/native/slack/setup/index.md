---
url: "https://docs.glean.com/connectors/native/slack/setup/"
canonical: "https://docs.glean.com/connectors/native/slack/setup/"
title: "Set up Slack, then Slack Real Time Search"
description: "Learn how to set up the Slack connectors in Glean."
fetched_at: "2026-09-01T13:29:42.870Z"
---
On this page

The Slack hybrid connector combines two Slack connectors to provide a unified, real-time Slack search experience in Glean. To fully integrate Slack with Glean, you must configure the following two connectors in this order:

1.  Slack
2.  Slack Real Time Search (RTS)

Together, these two connectors form the **Slack hybrid connector**, which blends real-time results from Slack's RTS API with signals from a customer-owned Slack app. This gives users a single, seamless Slack search experience with up-to-date results and enterprise-grade ranking.

[

Set up first

### Slack

Set up the Slack native connector for Slack Enterprise or single workspace deployments.







](/connectors/native/slack/setup/slack-connector)[

Set up second

### Slack Real Time Search (RTS)

Set up the Slack Real Time Search (RTS) connector for Slack Enterprise or single workspace deployments.







](/connectors/native/slack/setup/slack-rts-connector/)

## Configuration modes[​](#configuration-modes "Direct link to Configuration modes")

During setup, you will select one of the following modes based on your Slack architecture:

Choose workspace configuration

Select your configuration mode based on **how many workspaces you want to search across**, not your Slack plan type. If you only need to access data in one workspace, select Single workspace — even if your organization uses a Slack Enterprise Grid plan.

### Single workspace[​](#single-workspace "Direct link to Single workspace")

-   **Scope:** Authorizes a single connector instance for one specific Slack workspace.
-   **Recommended for:** Customers who need to search across a single Slack workspace. This includes organizations on Slack Enterprise Grid that only need content from a single workspace.

### Slack Enterprise Grid[​](#slack-enterprise-grid "Direct link to Slack Enterprise Grid")

-   **Scope:** Authorizes one connector instance at the Slack Enterprise Grid organization level. This single connection covers all workspaces within the organization.
-   **Recommended for:** Enterprise Grid customers who need to access data in **multiple workspaces** across their organization. If you only need one workspace, use Single workspace mode instead.
