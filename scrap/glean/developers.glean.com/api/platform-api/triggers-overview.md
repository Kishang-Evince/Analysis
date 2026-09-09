---
url: "https://developers.glean.com/api/platform-api/triggers-overview"
canonical: "https://developers.glean.com/api/platform-api/triggers-overview"
title: "Triggers API Overview | Glean Developer"
description: "The Platform Triggers API lets an application subscribe to content events in Glean and receive them at its own endpoint as signed webhooks. A trigger is created from a preset - a curated event definition such as \"a review is requested from me\" or \"30 minutes before an event starts\" - so you describe what you care about rather than assembling a query."
fetched_at: "2026-09-01T13:22:59.302Z"
---
On this page

The Platform Triggers API lets an application subscribe to content events in Glean and receive them at its own endpoint as signed webhooks. A trigger is created from a **preset** - a curated event definition such as "a review is requested from me" or "30 minutes before an event starts" - so you describe what you care about rather than assembling a query.

Events are delivered as [Standard Webhooks](https://www.standardwebhooks.com), signed with HMAC-SHA256, and are scoped to what the subscribing user is permitted to see.

These endpoints are [experimental](/experimental/overview) - send `X-Glean-Include-Experimental: true` on each request, or they are not exposed.

## Explore Triggers[​](#explore-triggers "Direct link to Explore Triggers")

[

### Browse presets

List the event definitions your deployment serves, and the inputs each one accepts.







](/api/platform-api/platform-trigger-presets-list)[

### Create a trigger

Instantiate a preset against your webhook URL and receive its signing secret.







](/api/platform-api/platform-triggers-create)[

### Preview matching events

See which recent events a preset would have matched, before you create anything.







](/api/platform-api/platform-trigger-presets-events-search)[

### Manage triggers

List, update, and delete the triggers you own.







](/api/platform-api/platform-triggers-list)

Browse the complete [Triggers API reference](/api/platform-api/platform-trigger-presets-list).
