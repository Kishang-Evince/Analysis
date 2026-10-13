---
url: "https://docs.glean.com/connectors/native/asana/choose-your-setup"
canonical: "https://docs.glean.com/connectors/native/asana/choose-your-setup"
title: "Choose your Asana setup"
description: "Identify whether to use the new setup or Previous setup flow for the Asana connector."
fetched_at: "2026-10-13T08:49:45.117Z"
---
On this page

Glean offers two Asana connection flows. Which flow applies to you depends on your Glean deployment, not on when you personally connect Asana.

-   **New setup:** Use this flow if you created your Glean deployment on or after September 11, 2026.
-   **Previous setup:** Use this flow if you created your Glean deployment before September 11, 2026. Use it even if you are connecting Asana for the first time.

## Asana setup comparison: New vs. previous[​](#asana-setup-comparison-new-vs-previous "Direct link to Asana setup comparison: New vs. previous")

Both setups provide permission-aware Asana search and use the same connector and permission model. They differ in what you configure up front and when each capability becomes available.

-   **New setup:** The Connect step authorizes Asana's MCP server, the Set up indexing step collects the separate access token and Asana domain, and the Review setup step lets you choose who can use the connector. With interactive authorization, team members authenticate with Asana before using tools. With Cross App Access, the identity provider issues their tokens instead. Indexing builds in the background.
-   **Previous setup:** The combined form collects the connector name, access token, and Asana domain. Configure Asana tools separately if your deployment exposes them.

| Capability | New setup | Previous setup |
| --- | --- | --- |
| **Setup flow** | Connect, Set up indexing, and Review setup | One combined connector form |
| **Tools authentication** | Customer-owned Asana MCP OAuth app or Cross App Access | Configure tools separately if your deployment exposes them |
| **Indexing credentials** | Separate access token and Asana domain step | Access token and Asana domain in the combined form |
| **User access** | Choose All users, Test group only, or None during review | Use your deployment's access controls |
| **Tools configuration** | Configure tools from the connector's Tools tab after setup | Use your deployment's separate tools configuration |
| **Where to start** | [Set up Asana](/connectors/native/asana/new-setup) | [Connect Asana with Glean](/connectors/native/asana/setup) |
