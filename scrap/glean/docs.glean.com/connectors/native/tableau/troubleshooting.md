---
url: "https://docs.glean.com/connectors/native/tableau/troubleshooting"
canonical: "https://docs.glean.com/connectors/native/tableau/troubleshooting"
title: "Troubleshooting and FAQs"
description: "Common issues and questions for the Tableau connector and Tableau in Assistant."
fetched_at: "2026-09-01T13:29:45.333Z"
---
On this page

This page covers issues most often reported on Tableau indexing and Tableau in Assistant. For setup steps, see [Indexing](/connectors/native/tableau/connector) for the connector and PAT-based path, and [Connected App and MCP setup](/connectors/native/tableau/assistant) for the Assistant-capable path.

## Setup and configuration[​](#setup-and-configuration "Direct link to Setup and configuration")

### Setup validation fails citing a missing domain, site content URL, or webhook base URL[​](#setup-validation-fails-citing-a-missing-domain-site-content-url-or-webhook-base-url "Direct link to Setup validation fails citing a missing domain, site content URL, or webhook base URL")

**Symptoms:**

-   **Setup cannot complete:** Validation returns an error instead of moving the connector to a healthy, crawling state.
-   **Error messaging:** The error references a missing domain, site content URL, or webhook base URL.

| Likely cause | Fix / Remediation |
| --- | --- |
| **Required fields empty or cleared:** The domain or webhook base URL is blank, or the site content URL field was removed. | In the **Admin console** setup page, confirm the **domain** and **webhook base URL** are filled in and the **site content URL** field is present. You can leave it empty if you're on the default site, but the field itself can't be removed. The webhook base URL auto-populates. Verify it wasn't cleared. |

### Setup validation fails with an authentication error[​](#setup-validation-fails-with-an-authentication-error "Direct link to Setup validation fails with an authentication error")

**Symptoms:**

-   Validation fails with an authentication or sign-in error.

| Likely cause | Fix / Remediation |
| --- | --- |
| **Incorrect Connected App credentials or admin username:** The client ID, secret ID, secret value, or Tableau username is wrong. | Confirm the values match the Connected App. The admin value must be the Tableau **Username**, including the exact case, and the account must have the required site role. |
| **Incorrect or expired personal access token:** The PAT name or secret is wrong or has expired. | This applies to the PAT-based setup. The token secret is shown only once in Tableau. If you're unsure it was copied correctly, generate a new PAT and re-enter the name and secret. |
| **Wrong domain:** The configured domain doesn't match your Tableau instance. | Confirm the domain matches your Tableau instance (for example, `abc.tableau.com`). |

### Setup validation reports that no users were returned[​](#setup-validation-reports-that-no-users-were-returned "Direct link to Setup validation reports that no users were returned")

**Symptoms:**

-   Validation connects successfully but reports that no users were found.

| Likely cause | Fix / Remediation |
| --- | --- |
| **Insufficient site role:** The authorizing account can't enumerate users and content. | For the PAT-based setup, the PAT must belong to an account with the **Server Administrator**, **Site Administrator Creator**, or **Site Administrator Explorer** site role. For the Connected App setup, the **Admin Tableau username** must belong to one of those roles. |

**Still not resolved?** Contact Glean Support with your Tableau domain and the exact text of the validation error.

## Search results and content[​](#search-results-and-content "Direct link to Search results and content")

### A user's Tableau search results stopped appearing in Glean[​](#a-users-tableau-search-results-stopped-appearing-in-glean "Direct link to A user's Tableau search results stopped appearing in Glean")

**Symptoms:**

-   A user who previously saw Tableau results in search no longer gets any.
-   Other users' Tableau results are unaffected.

| Likely cause | Fix / Remediation |
| --- | --- |
| **Expired or revoked personal access token:** In the PAT-based setup, when a per-user token fails to sign in, Glean removes it and stops retrying. | The user must re-add a valid PAT under **Your Settings → Apps → Tableau**. This does not apply to the Connected App setup, which does not require end users to provide PATs. |

### Some workbook or data source fields are missing[​](#some-workbook-or-data-source-fields-are-missing "Direct link to Some workbook or data source fields are missing")

**Symptoms:**

-   Indexed workbooks or data sources are missing some metadata fields.
-   Thumbnails, preview images, dashboard visuals, or underlying data never appear.

| Likely cause | Fix / Remediation |
| --- | --- |
| **Field selection limits:** Glean requests a specific set of fields from the `/workbooks` and `/datasources` endpoints rather than all fields, because requesting all fields triggers a `500` error from the Tableau REST API. | This is expected behavior. Some non-default fields aren't captured, and thumbnails, preview images, dashboard visuals, and underlying data are never indexed. Datasource schema metadata and folded view metadata depend on deployment configuration and crawl timing. |

## Tableau in Assistant[​](#tableau-in-assistant "Direct link to Tableau in Assistant")

### Assistant doesn't return Tableau data[​](#assistant-doesnt-return-tableau-data "Direct link to Assistant doesn't return Tableau data")

**Symptoms:**

-   Users ask Tableau-related questions but Assistant doesn't use Tableau tools.

| Likely cause | Fix / Remediation |
| --- | --- |
| **Incorrect Connected App credentials:** The client ID, secret ID, or secret value is wrong. | Confirm the Connected App credentials are entered correctly in the Tableau connector's **Set up indexing** step. |
| **Admin Tableau username is incorrect:** The value does not match Tableau or the account lacks the required role. | Enter the Tableau **Username** value exactly, including case, and verify that the account has a **Server Administrator**, **Site Administrator Creator**, or **Site Administrator Explorer** site role. |
| **Connect step not completed:** The Tableau MCP connection was not completed after indexing setup. | Return to the Tableau connector setup, complete **Set up indexing**, select **Continue**, and select **Connect** in the same wizard. |
| **Missing tool access:** The user doesn't have access to the Tableau tools. | After connector setup is complete, review the Tableau connector's **Tools** tab and confirm the user has access to the required tools and surfaces. |

### Results don't match the user's expected Tableau access[​](#results-dont-match-the-users-expected-tableau-access "Direct link to Results don't match the user's expected Tableau access")

**Symptoms:**

-   A user can't retrieve a workbook, view, or metric they expected to access.

| Likely cause | Fix / Remediation |
| --- | --- |
| **Per-user permission scoping:** Assistant results are scoped to each user's own Tableau permissions through Connected App impersonation. | Confirm the user has access to the relevant content in Tableau itself, then retry the query in Assistant. |

### Connected App authentication fails[​](#connected-app-authentication-fails "Direct link to Connected App authentication fails")

**Symptoms:**

-   The connection test fails or Assistant can't reach Tableau.

| Likely cause | Fix / Remediation |
| --- | --- |
| **Connected App disabled or secret expired.** | In Tableau, confirm the Connected App is enabled and the secret hasn't expired. |
| **Credential mismatch:** The Client ID, Secret ID, or Secret Value doesn't match Glean. | Verify the values match what's configured in Glean. |
| **Admin username lacks the required role.** | Confirm the admin username belongs to an account with the **Server Administrator**, **Site Administrator Creator**, or **Site Administrator Explorer** site role. |

**Still not resolved?** Contact Glean Support with your Tableau domain and, for Assistant issues, the Connected App Client ID.

## FAQs[​](#faqs "Direct link to FAQs")

### Why don't I see any Tableau results in Glean?

For the PAT-based setup, each user must connect their own Tableau personal access token before Tableau content appears in their search results. Open **Your Settings → Apps → Tableau** in Glean and follow the prompts to add your PAT. Connected App instances use per-user sessions minted by Glean, so users do not add individual PATs for that setup.

### Does Glean modify or write to my Tableau content?

No. The connector is read-only and indexes metadata only. It reads workbook and data source metadata along with user and permission information, and registers webhooks for change notifications. It never creates, modifies, or deletes content in Tableau.

### What does Glean index from Tableau?

Metadata for workbooks and data sources (such as names, descriptions, owners, projects, tags, and timestamps), plus user identity and site role information. When enabled, datasource descriptions, tables, fields, parameters, and folded view names, URLs, and tags can also be added to the relevant parent document. Raw dashboard visuals, workbook binaries, thumbnails, and underlying table rows aren't indexed.

### Which Tableau deployments are supported?

Both Tableau Cloud (Online) and Tableau Server (on-premises). The connector uses the same REST API and authentication flow for both.

### Do users need their own credentials for Tableau in Assistant?

No. Unlike PAT-based indexing, which uses per-user personal access tokens, Tableau in Assistant authenticates through a Connected App with per-user impersonation. Users don't provide their own credentials. Access is handled automatically, and each user only sees data they can access in Tableau itself.

### Can I connect more than one Tableau site?

Yes. To connect additional Tableau sites, contact the Glean engineer helping with your deployment. In the PAT-based setup, each user provides credentials for each instance on the same settings page. In the Connected App setup, the administrator configures Connected App credentials for each connector instance.

### Can I control which sites, projects, or workbooks are indexed?

There are no greenlist (inclusion) or redlist (exclusion) filters. Everything accessible to the admin token is indexed. You can, however, limit which users receive Tableau search results. Ask your Glean representative how this is configured for your instance.

### How quickly do changes in Tableau appear in Glean?

Workbook and data source create, update, and delete events are picked up through webhooks. Other content refreshes on scheduled crawls. Incremental crawls run approximately every 45 minutes and full crawls approximately every 24 hours by default, but datasource schema metadata is fetched only on full crawls when metadata fetching is enabled. Folded view content and permissions also depend on the relevant deployment configuration.
