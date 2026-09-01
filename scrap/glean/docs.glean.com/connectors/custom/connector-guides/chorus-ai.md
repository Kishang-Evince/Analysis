---
url: "https://docs.glean.com/connectors/custom/connector-guides/chorus-ai"
canonical: "https://docs.glean.com/connectors/custom/connector-guides/chorus-ai"
title: "Chorus.ai"
description: "How the Chorus.ai custom connector indexes calls and emails into Glean."
fetched_at: "2026-09-01T13:29:19.299Z"
---
On this page

The Chorus.ai custom connector brings your organization's Chorus.ai conversation intelligence content into Glean. It indexes sales calls and email engagements, including available transcripts and summaries, so employees can search revenue and customer-conversation content from Glean.

note

The Chorus.ai custom connector is set up by the Glean team. Contact [Glean Support](https://support.glean.com) to get started.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

To set up the Chorus.ai connector, you need the following ready before contacting Glean Support:

-   **Chorus.ai API token**: a token with read access to the engagements you want to index.
-   **HTTPS network access**: the connector must reach the Chorus.ai API over HTTPS.
-   **Engagement scope**: confirm whether you want to index calls, emails, or both.

## Supported objects and content types[​](#supported-objects-and-content-types "Direct link to Supported objects and content types")

The connector indexes the following content from Chorus.ai:

-   **Calls**: recorded sales calls, including available transcripts and summaries.
-   **Emails**: email engagements available through the Chorus.ai API.

Users and groups are indexed for identity and access-control resolution only. Engagement records are not indexed as a separate searchable object.

## How permissions work[​](#how-permissions-work "Direct link to How permissions work")

Call and email content is restricted to the engagement participants and the administrator groups configured for the connector. Users and groups are used to resolve those permissions; they are not searchable as standalone content.

Permission changes take effect in Glean after the next crawl. The connector does not provide real-time permission synchronization.

## Sync behavior[​](#sync-behavior "Direct link to Sync behavior")

The connector supports full and incremental crawls.

-   **Full crawl**: indexes the configured engagement types across the available Chorus.ai history.
-   **Incremental crawl**: picks up recent or changed engagements since the previous successful crawl.

Content removed from Chorus.ai is removed from Glean during a subsequent crawl. The Glean team manages the crawl schedule and engagement-type configuration.

## Next steps[​](#next-steps "Direct link to Next steps")

Contact [Glean Support](https://support.glean.com) with the prerequisites above to begin setting up the Chorus.ai connector for your organization.

## See also[​](#see-also "Direct link to See also")

-   [Custom connector overview](/connectors/custom/about): how custom connectors work in Glean.
-   [Set up a custom connector](/connectors/custom/setup): the setup process and first-run checklist.
-   [Glean REST APIs](/connectors/custom/glean-apis): the Indexing and Client APIs, and the tokens each uses.
