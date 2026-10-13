---
url: "https://docs.glean.com/connectors/native/looker/troubleshooting"
canonical: "https://docs.glean.com/connectors/native/looker/troubleshooting"
title: "Looker troubleshooting"
description: "Troubleshoot Looker indexing, semantic routing, OAuth, permissions, and live-query issues in Glean."
fetched_at: "2026-10-13T08:50:02.730Z"
---
On this page

This page covers common issues with Looker indexing, semantic routing, OAuth, permissions, and live Assistant queries.

## Connector setup[​](#connector-setup "Direct link to Connector setup")

### Connector validation fails[​](#connector-validation-fails "Direct link to Connector validation fails")

**Symptoms:**

-   Connector validation fails instead of completing setup.
-   The initial crawl does not start.

| Cause | Fix |
| --- | --- |
| Incorrect **Instance name** format: The value doesn't match the required format for the Looker hostname. | For `.looker.com`, enter only the qualifier, such as `acme.cloud`. For `.looker.app`, enter the full hostname, such as `acme.looker.app`. Exclude `https://`, ports, paths, and query strings. |
| **Credential mismatch:** The API3 **Client ID** and **Client Secret** do not belong to the same Looker API key. | Copy both values from the same API3 key and enter them in the Looker connector configuration. |
| **Validation access failure:** Connector validation checks the current user and the first page of users. It does not validate roles, Looks, dashboards, or semantic project files. Those access checks occur during later crawls; semantic project files are relevant only when semantic indexing is enabled. | Confirm that the API credential can authenticate and list users (`see_users`). If validation passes but a later crawl fails, review the credential user’s access to the affected roles, Looks, dashboards, or semantic project files. |
| **Unsupported or unreachable instance:** The Looker instance is customer-hosted, on-premises, or unavailable through its API. | Use a supported hosted Looker instance and confirm that the Looker API is available and reachable. |

The connector uses the API3 credentials to obtain a short-lived bearer token. It does not use the per-user OAuth client configured for Looker MCP.

If your connector uses a custom proxy URL template with the Looker hostname in its path, contact [Glean Support](https://support.glean.com) to check the template. The connector doesn't automatically correct an extra `.looker.com` suffix in the URL path for `.looker.app` instances.

## Indexed content and permissions[​](#indexed-content-and-permissions "Direct link to Indexed content and permissions")

### A saved Look or dashboard is missing from Search[​](#a-saved-look-or-dashboard-is-missing-from-search "Direct link to A saved Look or dashboard is missing from Search")

**Symptoms:**

-   A Look or dashboard that exists in Looker does not appear in Glean Search.
-   Other Looker content may appear as expected.

| Cause | Fix |
| --- | --- |
| **Content is unavailable:** The content was deleted or is not available to the connector. | Confirm that the content exists in Looker and is not soft-deleted. |
| **Crawl has not completed:** The content was created or changed after the last successful crawl. | Run or wait for the next successful full crawl and indexing pipeline. |
| **Permission mismatch:** The user does not satisfy both the Looker role permission and content-level access requirements. | Confirm that the user has the relevant Looker permissions and access to the folder or content. |
| **Folder not visible to the connector account:** The non-Admin account cannot view the folder. | Grant the account **View** access to the folder. See [Non-Admin access](/connectors/native/looker/connector#non-admin-access). |
| **Unrecognized permission state:** The connector cannot safely interpret the content’s permission state. | Review the connector crawl status and Looker permissions. Users may not see the content until permissions are available; Looker admins remain an explicit fallback audience. |

The connector does not provide incremental or activity crawls, and it does not use Looker webhooks. Recent changes appear after the next successful full crawl and indexing pipeline.

### A public Look appears differently from an authorized Look[​](#a-public-look-appears-differently-from-an-authorized-look "Direct link to A public Look appears differently from an authorized Look")

**Symptoms:**

-   A public Look uses a different link or visibility behavior than an authorized Look.
-   Users see a public Look even when they do not have the same permissioned access as another Looker asset.

| Cause | Fix |
| --- | --- |
| **Public Look handling:** Public Looks are handled as public content by the connector and may use a public Looker view link. | Verify that the Look is intentionally public and that its data and link are intended for public access. |
| **Unsupported public dashboard:** Public dashboard handling is not the same as public Look handling. | Do not rely on public visibility for dashboards. Use the dashboard’s normal Looker permissions. |

### Models or Explores do not appear in Search[​](#models-or-explores-do-not-appear-in-search "Direct link to Models or Explores do not appear in Search")

**Symptoms:**

-   A known Looker Model or Explore does not appear in Glean Search.
-   Saved Looks and dashboards may still be searchable.

| Cause | Fix |
| --- | --- |
| **Semantic indexing is unavailable:** Semantic indexing is optional and rollout-controlled. | Confirm that semantic indexing is enabled for the Looker connector. Contact your Glean representative if the option is not available. |
| **Missing semantic permissions:** The connector account lacks `explore` or `see_lookml`. | Add both permissions. |
| **Identity crawl is incomplete:** ModelSet-aware identity crawling has not completed successfully. | Confirm that ModelSet-aware identity crawling is enabled, review the identity crawl status, and resolve any identity crawl errors before relying on semantic permissions. |
| **Semantic crawl has not completed:** The semantic full crawl has not completed successfully. | Check the crawl status and wait for a successful semantic full crawl. |
| **Explore is hidden or gated:** The Explore is hidden or has effective `required_access_grants`. | Review the Explore’s LookML visibility and access grants. Hidden and gated Explores are not published to the semantic index. |
| **Access requirements are unclassifiable:** Glean cannot safely classify the Explore’s effective access requirements. | No action is required in Glean. The Explore is omitted to prevent publication with uncertain visibility. |

The semantic crawl runs after the identity full-crawl dependency, but it does not independently verify identity completeness or freshness.

### A Model appears, but an Explore does not[​](#a-model-appears-but-an-explore-does-not "Direct link to A Model appears, but an Explore does not")

**Symptoms:**

-   A Model appears in Search, but one or more expected Explores do not.
-   Other Explores from the same Model may be available.

| Cause | Fix |
| --- | --- |
| **Explore visibility:** The Explore is hidden. | Make the Explore visible in Looker if it should be available for routing, then wait for the next semantic full crawl. |
| **Required access grants:** The Explore has effective `required_access_grants`. | Review the Explore’s access-grant configuration. Glean does not publish gated Explores. |
| **Unclassifiable access requirements:** Glean cannot determine the Explore’s access requirements safely. | No action is required in Glean. Glean omits the Explore rather than publishing it with uncertain visibility. |
| **Minimal Model document:** Model documents are published separately from Explore documents. | A published Model does not imply that every Explore in that Model is eligible for semantic indexing. |

Glean does not evaluate user-attribute-derived access grants during semantic crawling.

## Assistant and live queries[​](#assistant-and-live-queries "Direct link to Assistant and live queries")

### Looker does not appear as a live option in Assistant[​](#looker-does-not-appear-as-a-live-option-in-assistant "Direct link to Looker does not appear as a live option in Assistant")

**Symptoms:**

-   Users cannot select or invoke Looker in Assistant.
-   Looker content may still be available through Search.

| Cause | Fix |
| --- | --- |
| **Looker connector is not configured:** The managed MCP template requires a Looker connector instance. | Configure the Looker connector before configuring Looker MCP. |
| **MCP tool is not configured or published:** The Looker MCP tool is missing from **Admin console** > **Tools**, or is not published to the user or group. | Configure the Looker MCP tool and publish it to the intended users or groups. |
| **Incorrect MCP host:** The connector qualifier was entered instead of the full Looker instance host. | For MCP, enter the full host, such as `acme.cloud.looker.com`. Do not use `acme.cloud` in the MCP host field. |
| **MCP access is not enabled:** The deployment does not have access to the managed Looker MCP server. | Confirm that the required Looker and Glean capabilities are enabled for the deployment. |

### OAuth registration or authorization fails[​](#oauth-registration-or-authorization-fails "Direct link to OAuth registration or authorization fails")

**Symptoms:**

-   Looker OAuth registration fails.
-   Users cannot complete authorization or are returned to Glean with an error.

| Cause | Fix |
| --- | --- |
| **Dynamic Client Registration:** The managed Looker MCP server does not support Dynamic Client Registration. | Register the OAuth client manually through the Looker API Explorer or the `oauth_client_apps` API. |
| **Client ID mismatch:** The OAuth client ID registered in Looker does not match the client ID configured in Glean. | Update one configuration so the client IDs match exactly. |
| **Redirect URI mismatch:** The redirect URI registered in Looker does not match the callback URL supplied by Glean. | Update the registered redirect URI to match Glean’s callback URL exactly. |
| **Client secret provided:** The managed MCP configuration uses a public-client OAuth flow with Proof Key for Code Exchange (PKCE) and does not use a client secret. | Remove the client secret from the managed MCP registration and configuration. |
| **Wrong scope or account:** The client is not using the Looker `cors_api` scope, or the user signed in to a different Looker instance. | Use OAuth 2.1 with PKCE and the `cors_api` scope, and sign in to the same Looker instance configured for the tool. |

### A live query is denied[​](#a-live-query-is-denied "Direct link to A live query is denied")

**Symptoms:**

-   Search finds a Looker asset, but Assistant cannot run it.
-   A live Explore query returns an authorization error.

| Cause | Fix |
| --- | --- |
| **Separate authorization decisions:** Indexed discovery does not grant live query access. | Check the user’s Looker roles, content permissions, ModelSet, field access, access grants, and row restrictions. |
| **MCP tool is disabled:** The relevant read-only MCP tool is not enabled in Looker. | Enable the required tool in Looker. Glean still exposes only its fixed read-only allowlist. |
| **User lacks live access:** The authenticated user cannot run the saved query or access the Explore. | Grant the user the required Looker access, then reconnect or retry the live query. |

Looker evaluates these controls for the authenticated user when the MCP tool runs.

### A live answer is stale or does not match Search[​](#a-live-answer-is-stale-or-does-not-match-search "Direct link to A live answer is stale or does not match Search")

**Symptoms:**

-   Search and Assistant return different values or metadata.
-   A recent Looker change appears in one surface but not the other.

| Cause | Fix |
| --- | --- |
| **Crawl is pending:** Search and semantic results come from the most recent successful crawl. | Wait for the relevant full crawl and indexing pipeline to complete. |
| **Live and indexed data differ:** Assistant retrieves live results from Looker at request time, while Search uses indexed content. | For a current value, use Assistant and open the linked Looker asset to verify the definition and result. |
| **Permission context differs:** The user’s live Looker permissions differ from the permissions captured during the last crawl. | Review the user’s current Looker roles, content access, ModelSet, and row restrictions. |

### The MCP tool list is missing a recently enabled tool[​](#the-mcp-tool-list-is-missing-a-recently-enabled-tool "Direct link to The MCP tool list is missing a recently enabled tool")

**Symptoms:**

-   A Looker administrator enabled an MCP tool, but the user cannot invoke it.
-   The tool is available in Looker but not in the Glean MCP tool list.

| Cause | Fix |
| --- | --- |
| **Stale tool manifest:** The user’s MCP client has not refreshed its tool manifest after the Looker tool list changed. | Wait about 30 seconds, reconnect the user’s MCP client, then retry the request. |
| **Tool is outside Glean’s allowlist:** The tool is not one of the fixed read-only operations exposed by Glean. | Use a supported tool. Glean excludes mutation, administration, development-mode, and other unsupported operations. |

### A live query times out[​](#a-live-query-times-out "Direct link to A live query times out")

**Symptoms:**

-   A Looker MCP request does not complete within the expected time.
-   The same question may succeed with a narrower scope.

| Cause | Fix |
| --- | --- |
| **Preview service capacity:** The managed Looker MCP server has fixed capacity during the preview phase. | Retry the request and narrow the question if the timeout persists. |
| **Expensive query:** The request uses many dimensions, a broad time range, or a large result set. | Use fewer dimensions, an explicit time range, or a smaller result set. |
| **Looker API quota:** Tool calls consume the Looker instance’s standard administrative and query-based API quotas. | Check the Looker instance’s quota usage and retry after the load decreases. |

If timeouts persist, record the timestamp, user, Looker instance, tool name, and question and contact your Glean representative.

## Report an issue[​](#report-an-issue "Direct link to Report an issue")

When reporting a Looker issue, include:

-   The Looker instance host and affected asset, Model, or Explore
-   Whether the issue affects indexing, Search, OAuth, routing, or live execution
-   The user’s Looker role, ModelSet, and relevant content-access context
-   The prompt, expected source, and observed result
-   The approximate time of the failure and any visible error message

Do not include OAuth tokens, client secrets, raw LookML, generated SQL, or sensitive query results in a support request.

For provider-specific behavior, see [Looker-managed MCP server](https://docs.cloud.google.com/looker/docs/mcp).
