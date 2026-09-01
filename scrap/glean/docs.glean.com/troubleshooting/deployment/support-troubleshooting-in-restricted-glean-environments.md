---
url: "https://docs.glean.com/troubleshooting/deployment/support-troubleshooting-in-restricted-glean-environments"
canonical: "https://docs.glean.com/troubleshooting/deployment/support-troubleshooting-in-restricted-glean-environments"
title: "Support and troubleshooting in customer-hosted Glean environments"
description: "How support and troubleshooting work when Glean is deployed in customer-hosted environments where Glean has no direct access to logs or infrastructure."
fetched_at: "2026-09-01T13:30:08.396Z"
---
On this page

A restricted or customer-hosted environment refers to any deployment where the Glean support and engineering teams are isolated from the underlying infrastructure. In these environments, Glean does not have visibility into application logs. All diagnostic information must be manually exported and shared by the customer for troubleshooting purposes.

This is different from the standard hosted deployments, where Glean typically has limited, controlled read access to operational logs and dashboards.

Glean is designed to operate seamlessly within environments with strict security controls.

Since Glean does not have direct access to your logs or observability tools in these deployments, troubleshooting follows a collaborative, iterative process. This may require additional coordination between your team and Glean Support, which can result in increased resolution times compared to standard deployments.

## Support workflows in customer-hosted environments[​](#support-workflows-in-customer-hosted-environments "Direct link to Support workflows in customer-hosted environments")

Several parts of the support workflow change when Glean is hosted in a restricted environment.  
For such environments, the Glean support team follows a coordinated process to resolve issues:

-   **Discovery:** The Glean support team works with the customer’s team to identify the specific logs, metrics, or dashboards required for the investigation.
-   **Data collection:** The administrators on the customer’s side, gather and share the relevant artifacts like Glean admin logs, third-party integration data, or infrastructure logs.
-   **Live troubleshooting:** If needed, Glean support team schedules joint sessions where the customer’s team runs commands and updates configurations using their admin privileges in real-time while we provide guidance.
-   **Analysis cycles:** Because each step requires coordination, the initial triage and subsequent iterations may take longer than in a standard deployment.

## Support commitments in customer-hosted environments[​](#support-commitments-in-customer-hosted-environments "Direct link to Support commitments in customer-hosted environments")

Even in customer-hosted environments, our goal is to resolve issues with maximum efficiency. Here is how Glean maintains the support standards:

-   **Consistent severity standards:** Glean prioritize all tickets using our global severity framework and focuses on the business impact of the issue, ensuring critical problems receive immediate attention.
    
-   **Strategic working sessions:** When troubleshooting requires a deeper look, Glean leverages live working sessions to bridge the visibility gap.
    
-   **Collaborative diagnostics:** Glean provides the expertise while your team provides the environment access. By walking through logs and configurations together via screen-sharing, the Glean support team can diagnose complex issues in real-time.
    

## Accelerating resolution[​](#accelerating-resolution "Direct link to Accelerating resolution")

In a customer-hosted environment, your team is a critical part of the troubleshooting loop. To keep investigations efficient, we ask our customers to adhere to the Customer Obligations in the [Glean Customer SLA](https://assets.glean.com/marketing/Legal/Glean%20Technologies%2C%20Inc.%20Customer%20Support%20SLA%20Mar%206%202026.pdf), including the following:

### Assign a technical owner[​](#assign-a-technical-owner "Direct link to Assign a technical owner")

Designate a **technical owner** for the deployment who:

-   Has operational access to the environment (logs, monitoring, configuration, network).
-   Can join calls or working sessions on short notice for higher‑severity issues and coordinate internally with your Security, Infrastructure, and Application teams.

### Provide timely access to logs and diagnostics[​](#provide-timely-access-to-logs-and-diagnostics "Direct link to Provide timely access to logs and diagnostics")

Glean will often ask for:

-   Provide read access to the Glean service account.
-   Screenshots or exports from your monitoring dashboards.
-   Any error IDs, correlation IDs, or traces surfaced in your own tooling.

When you can share the details, the Glean support team can move much faster.

### Share relevant context and recent changes[​](#share-relevant-context-and-recent-changes "Direct link to Share relevant context and recent changes")

Timely information about your environment can dramatically shorten investigations, for example:

-   Recent upgrades, configuration changes, or network/firewall changes.
-   New security controls (WAF, DLP, EDR) that might affect Glean traffic.
