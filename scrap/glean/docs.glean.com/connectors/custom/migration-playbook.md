---
url: "https://docs.glean.com/connectors/custom/migration-playbook"
canonical: "https://docs.glean.com/connectors/custom/migration-playbook"
title: "Migrate from a native connector to a custom connector"
description: "Step-by-step guide for replacing a native Glean connector with a custom connector, including namespace constraints, parallel-run strategy, and artifact migration"
fetched_at: "2026-09-01T13:29:20.464Z"
---
On this page

If you've built a custom connector that covers more data types or offers better control than a native connector, you can replace the native connector with your custom one. This guide walks through the migration process.

## Before you begin[​](#before-you-begin "Direct link to Before you begin")

warning

Native and custom connectors occupy separate namespaces in Glean. The system rejects any attempt to push content into a built-in connector name. Your custom connector will always have its own distinct identity, document IDs, and connector reference.

Because of this namespace separation, agents, saved searches, app filters, and pinned results scoped to the native connector won't automatically recognize content in the custom connector. You'll need to migrate these artifacts as part of the transition.

## Migration steps[​](#migration-steps "Direct link to Migration steps")

1.  **Create and populate the custom connector**
    
    Set up a new custom connector with a distinct name and push all content on a regular schedule. Since custom connectors don't have an automated crawl like native connectors, your team manages the ingestion cadence by pushing content through the [Indexing API](https://developers.glean.com/api-info/indexing/getting-started/overview):
    
    -   Use [`/indexdocument`](https://developers.glean.com/api/indexing-api/index-document) for incremental updates.
    -   Use [`/bulkindexdocuments`](https://developers.glean.com/api/indexing-api/bulk-index-documents) for full refreshes.
    
    tip
    
    Run both the native and custom connectors in parallel during the transition period. This avoids gaps in search coverage while you migrate.
    
2.  **Migrate user-facing artifacts**
    
    Users and admins need to update any artifacts that reference the native connector to point at the new custom connector. There's no automatic carry-over for these items:
    
    -   **Agents** - update any agents that filter by or reference the native connector.
    -   **Saved searches** - re-create or update saved searches to scope to the new connector name.
    -   **App filters** - update any preconfigured app filters in the **Admin console**.
    -   **Pinned results** - re-pin results from the new custom connector if you've pinned native connector results.
3.  **Deactivate the native connector**
    
    Only deactivate the native connector after you've confirmed that the custom connector is fully populated and all user-facing artifacts point to it.
    
    warning
    
    When you deactivate a native connector, its content is removed from the search index. Make sure the custom connector is serving all the content your users need before you deactivate.
    

## Verify the migration[​](#verify-the-migration "Direct link to Verify the migration")

After completing the migration steps, verify that everything works as expected:

1.  Search in Glean for content that was previously only available through the native connector. Confirm it appears as a result from the custom connector.
2.  Test with users who have different permission levels to verify that document-level access controls are working correctly.
3.  Confirm that agents referencing the new connector return the expected results.
4.  Check the custom connector status using the [debug status endpoint](/connectors/custom/troubleshooting#debug-connector-status) to verify that documents are indexed and processing is complete.

## See also[​](#see-also "Direct link to See also")

[

### Custom connectors

Learn how to create and configure custom connectors in Glean.







](/connectors/custom/about)[

### Troubleshooting

Debug endpoints and tools for investigating indexing API issues.







](/connectors/custom/troubleshooting)[

### Indexing API overview

Full API documentation for the indexing endpoints.







](https://developers.glean.com/api-info/indexing/getting-started/overview)
