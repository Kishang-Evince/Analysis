---
url: "https://docs.glean.com/connectors/native/confluence/forge-upgrade"
canonical: "https://docs.glean.com/connectors/native/confluence/forge-upgrade"
title: "Glean Atlassian Connector Upgrade to Forge App Model"
description: "Glean is excited to announce a significant upgrade to our Atlassian Confluence and Jira connectors. This upgrade is designed to enhance the performance, reliability, and security of your connections, ensuring a seamless and efficient experience."
fetched_at: "2026-09-01T13:29:24.782Z"
---
On this page

Glean is excited to announce a significant upgrade to our Atlassian Confluence and Jira connectors. This upgrade is designed to enhance the performance, reliability, and security of your connections, ensuring a seamless and efficient experience.

## Why the Upgrade?[​](#why-the-upgrade "Direct link to Why the Upgrade?")

The current Atlassian Connect app setup for Confluence and Jira Cloud has encountered **rate-limiting issues**, which can impact real-time synchronization between your deployment's index and the connector. This can lead to outdated search results and permission discrepancies.

We're transitioning from the Central Connector to a per-deployment Forge app model. This new setup offers:

-   **Improved Performance:** The Forge app model offers higher rate limits, leading to faster and more reliable synchronization between your connector and search index.
-   **Enhanced Security:** The new setup includes more granular scopes, providing greater control over app permissions and data access.

The Jira/Confluence Forge app requires no write or admin scopes.

This migration also ensures that your credentials remain securely within your deployment at all times.

## Action Required[​](#action-required "Direct link to Action Required")

To take advantage of these improvements and ensure uninterrupted service, please follow these steps to upgrade your **Atlassian Confluence Cloud and Jira Cloud connectors only**:

1.  **Navigate** to [https://app.glean.com/admin/setup/apps](https://app.glean.com/admin/setup/apps), select your existing Confluence or Jira connector, and visit the Setup tab.
    
2.  **Create** the Forge app and install it in the appropriate domain.
    
3.  **Complete** the setup by clicking on the save button after installing the app. This step validates the installation.
    

The connector setup page also provides detailed instructions. After following the setup steps, your crawls for Jira Cloud and Confluence Cloud will proceed as normal.

## Support[​](#support "Direct link to Support")

If you have any questions or need assistance during the upgrade process, please reach out to [https://support.glean.com](https://support.glean.com). We're here to help you make the transition as smooth as possible.
