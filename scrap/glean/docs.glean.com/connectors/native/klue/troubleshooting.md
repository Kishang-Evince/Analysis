---
url: "https://docs.glean.com/connectors/native/klue/troubleshooting"
canonical: "https://docs.glean.com/connectors/native/klue/troubleshooting"
title: "Troubleshooting and FAQs"
description: "Common issues and frequently asked questions for the Klue connector."
fetched_at: "2026-09-01T13:29:33.900Z"
---
On this page

This page covers issues most often reported on the Klue connector, followed by [frequently asked questions](#faqs). For setup steps, see [Klue indexing](/connectors/native/klue/indexing).

## Setup and validation[​](#setup-and-validation "Direct link to Setup and validation")

### The connector does not save or validation fails[​](#the-connector-does-not-save-or-validation-fails "Direct link to The connector does not save or validation fails")

**Symptoms:**

-   Setup cannot complete. Validation returns an error instead of saving the connector.
-   The error references the API key, SCIM access, or scope validation.

| Likely cause | Fix / Remediation |
| --- | --- |
| **Invalid API key:** The API key was not copied correctly or has expired. | Generate a new API key in Klue and paste it exactly as generated into the Glean admin console. |
| **Missing `content:read` scope:** The API key does not include the `content:read` scope. | In Klue, go to **Apps & Integrations** > **Manage API Keys**, edit the key, and grant `content:read`. |
| **Missing `scim:read` scope:** The API key does not include the `scim:read` scope. | Edit the API key in Klue and grant `scim:read`. |
| **Cannot reach Klue:** Glean could not connect to the Klue API to validate the key (for example, a network issue or Klue-side availability). | Confirm your Klue instance is reachable and try again. If the problem persists, contact Glean Support. |

These validation failures surface as error code [KLUE\_1](/troubleshooting/error-codes/).

**Still not resolved?** Contact Glean Support with the exact validation error message.

## Missing content[​](#missing-content "Direct link to Missing content")

### Content is missing from search results[​](#content-is-missing-from-search-results "Direct link to Content is missing from search results")

**Symptoms:**

-   A user expects to find a known Klue card or battlecard, but it does not appear in Glean search results.
-   Some cards appear while others do not.

| Likely cause | Fix / Remediation |
| --- | --- |
| **Dynamic card:** The card is a dynamic card. Glean indexes only non-dynamic cards. | Confirm the card type in Klue. Dynamic cards are not indexed. |
| **Restricted battlecard:** The battlecard is not visible to everyone. Glean indexes only battlecards with the `everyone` audience. | Check the battlecard's audience setting in Klue. Only battlecards visible to everyone are indexed. |
| **Crawl delay:** The content was recently created or updated. | Allow a crawl cycle to complete. Incremental crawls pick up changes periodically. |
| **Metadata-only content:** The item is a competitor, competitor group, topic, or tag. | These appear as facets on indexed cards and battlecards, not as standalone documents. |

## Permissions and access[​](#permissions-and-access "Direct link to Permissions and access")

### Permissions are not working as expected[​](#permissions-are-not-working-as-expected "Direct link to Permissions are not working as expected")

**Symptoms:**

-   A user sees content they should not have access to, or cannot see content they should.
-   Permission changes in Klue are not reflected in Glean search results.

| Likely cause | Fix / Remediation |
| --- | --- |
| **Missing `scim:read` scope:** The API key does not have the `scim:read` scope, so Glean cannot read user and group data. | Edit the API key in Klue and grant `scim:read`. Reconnect the connector in Glean. |
| **Pending identity sync:** Recent user or group changes in Klue have not been synced yet. | Allow a full crawl cycle to complete for the updated identities to be reflected. |

**Still not resolved?** Contact Glean Support with the affected user's email and the content they expect to see.

## FAQs[​](#faqs "Direct link to FAQs")

### What content does the Klue connector index?

Non-dynamic cards and non-dynamic battlecards. Cards are indexed with their Klue permissions, including cards that are not visible to everyone, while only battlecards visible to everyone are indexed. Dynamic cards are not indexed. Competitors, competitor groups, topics, and tags appear as facets on those documents rather than as standalone items.

### Does the Klue connector enforce per-user permissions?

Yes. Glean reads users and groups from Klue over SCIM to enforce document-level access. If the API key is missing `scim:read`, Glean cannot read these identities to enforce permissions.

### What scopes does the API key need?

It needs `content:read` to read cards and battlecards, and `scim:read` to read the users and groups used for permissions.

### What is the difference between indexing and Klue MCP?

Indexing pulls Klue cards and battlecards into Glean search using an admin API key. Klue MCP provides live, per-user access to Klue tools from Glean Assistant and Agents using each user's own OAuth credentials. You can enable both. See [Klue MCP](/connectors/native/klue/mcp) for details.
