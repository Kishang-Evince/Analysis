---
url: "https://docs.glean.com/connectors/partner/"
canonical: "https://docs.glean.com/connectors/partner/"
title: "Partner connectors"
description: "Partner connectors are built and maintained by Glean technology partners, using the Indexing API to push data into Glean with vendor-managed setup and partner-coordinated support."
fetched_at: "2026-09-01T13:29:48.756Z"
---
On this page

Partner connectors are built and maintained by Glean technology partners. They use the [Indexing API](https://developers.glean.com/) to push data into Glean, but the integration is developed, configured, and supported by the partner organization - so setup happens in the partner's product rather than the Glean admin console.

New to Glean connectors? See [About connectors](/connectors/about) for the full breakdown of every connector type and data access mode.

## What partner connectors provide[​](#what-partner-connectors-provide "Direct link to What partner connectors provide")

### Vendor-managed setup

Setup and configuration happen in the partner's product, following their integration guide.

### Indexing API sync

Data is pushed into Glean through the Indexing API and ranked alongside everything else.

### Partner-coordinated support

Support is coordinated with the technology partner that builds and maintains the connector.

## Available partner connectors[​](#available-partner-connectors "Direct link to Available partner connectors")

[

### Datastax

Bring Astra DB structured data into Glean to ground GenAI and agentic workflows.







](/connectors/partner/datastax)[

### Fellow

Sync meeting agendas, notes, and AI recaps so they're searchable alongside your work.







](/connectors/partner/fellow)[

### Rootly

Search incidents, alerts, reports, schedules, and escalation policies from Rootly.







](/connectors/partner/rootly)

note

Each partner connector requires [Indexing API authentication](https://developers.glean.com/api-info/indexing/authentication/overview) in Glean. The Indexing API only supports Glean-issued tokens.
