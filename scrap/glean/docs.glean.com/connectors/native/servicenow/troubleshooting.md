---
url: "https://docs.glean.com/connectors/native/servicenow/troubleshooting"
canonical: "https://docs.glean.com/connectors/native/servicenow/troubleshooting"
title: "Troubleshooting and FAQs"
description: "Common issues and questions for the ServiceNow connector."
fetched_at: "2026-09-01T13:29:40.858Z"
---
On this page

This page covers issues most often reported on the ServiceNow connector. For setup steps, see the [Simple setup](/connectors/native/servicenow/setup) and [Advanced setup](/connectors/native/servicenow/setup-advanced) guides.

## Missing content[​](#missing-content "Direct link to Missing content")

### A specific catalog item is missing from search results[​](#a-specific-catalog-item-is-missing-from-search-results "Direct link to A specific catalog item is missing from search results")

**Symptoms:**

-   One or more catalog items are missing from Glean search.
-   Other catalog items from the same ServiceNow instance are indexed correctly.
-   No error is visible in the connector health view.

| Likely cause | Fix / Remediation |
| --- | --- |
| **Missing role or table access:** The Glean service account is missing the `catalog_admin` role or does not have read access to the `sc_cat_item` table. | In ServiceNow, verify the `gleansearch` service account has the `catalog_admin` role. |
| **Catalog item indexing turned off:** The selected crawl mode does not include catalog items. Catalog item indexing is enabled by default, but may have been turned off. | In **Admin console → Connectors → ServiceNow → Settings**, confirm that catalog item indexing is enabled, then trigger a content re-crawl. |

**Full resolution steps:** See [SERVICENOW\_2](/troubleshooting/error-codes/servicenow/servicenow-2).

### Knowledge articles are not appearing in Glean[​](#knowledge-articles-are-not-appearing-in-glean "Direct link to Knowledge articles are not appearing in Glean")

**Symptoms:**

-   Knowledge articles from one or more knowledge bases are missing from search results.
-   Other content types (for example, catalog items) are indexed correctly.
-   No errors are visible in the connector health view.

| Likely cause | Fix / Remediation |
| --- | --- |
| **Missing `knowledge_admin` role:** The Glean service account is missing the `knowledge_admin` role, which is required to read all knowledge articles and knowledge bases in the global scope. | In ServiceNow, confirm the `gleansearch` service account has the `knowledge_admin` role, then trigger a content re-crawl from **Admin console → Connectors → ServiceNow**. |
| **Non-global knowledge base scope:** The affected knowledge base uses permissions managed in a non-global application scope (for example, HR or Employee Core), which the service account cannot read. | Work with your ServiceNow admin to add a scope-specific role to the `gleansearch` account (for example, `sn_hr_core.admin` for HR knowledge bases), or to expose the permission data in the global scope. Then trigger a content re-crawl. |

**Related:** [SERVICENOW\_6](/troubleshooting/error-codes/servicenow/servicenow-6) covers under-permissioned access to non-global-scope tables, including the scope-specific roles referenced above.

### A knowledge article exists in Glean but a specific user cannot see it[​](#a-knowledge-article-exists-in-glean-but-a-specific-user-cannot-see-it "Direct link to A knowledge article exists in Glean but a specific user cannot see it")

**Symptoms:**

-   A knowledge article appears in search for some users but not for others.
-   The affected user confirms they can access the article in ServiceNow directly.
-   The issue persists after the next identity crawl completes.

| Likely cause | Fix / Remediation |
| --- | --- |
| **Permission records in a non-global scope:** The knowledge base's permission records (`kb_uc_can_read_mtom`) are managed in a non-global application scope; Glean can only read permission data from the global scope. | In ServiceNow, check whether the `kb_uc_can_read_mtom` records for the affected knowledge base exist in the global scope. Work with your ServiceNow admin to recreate or replicate those records in the global scope, then trigger an identity crawl from **Admin console → Connectors → ServiceNow**. |
| **Custom HR or Employee Core ACLs:** This most commonly affects HR or Employee Core knowledge bases, which often use custom application scopes with restricted ACLs. | Add a scope-specific role to the `gleansearch` account (for example, `sn_hr_core.admin` for HR knowledge bases), then trigger an identity crawl. |

note

Knowledge bases in non-global application scopes require additional ServiceNow configuration for Glean to read their permission data. Contact [Glean Support](https://support.glean.com) if you need help identifying the affected scope.

**Related:** [SERVICENOW\_6](/troubleshooting/error-codes/servicenow/servicenow-6) covers under-permissioned access to non-global-scope tables, including the scope-specific roles referenced above.

### A catalog item is visible to users who should not have access[​](#a-catalog-item-is-visible-to-users-who-should-not-have-access "Direct link to A catalog item is visible to users who should not have access")

**Symptoms:**

-   A catalog item appears in Glean search for users who do not have access to it in ServiceNow.
-   The catalog item is marked as restricted in ServiceNow.

| Likely cause | Fix / Remediation |
| --- | --- |
| **User criteria in a non-global scope:** The catalog item's user criteria (`sc_cat_item_user_criteria_mtom`) are managed in a non-global application scope. | In ServiceNow, confirm that the `sc_cat_item_user_criteria_mtom` records for the affected catalog item exist in the global scope. Work with your ServiceNow admin to move or replicate the records in the global scope, then trigger an identity crawl and re-crawl from **Admin console → Connectors → ServiceNow**. |
| **Default visibility for unreadable permissions:** When Glean cannot read permission data for a catalog item, it defaults the item to public visibility. | Move or replicate the catalog item's user criteria records into the global scope so Glean can read them, then trigger an identity crawl and re-crawl. |

### Knowledge article or catalog item links in Glean open the wrong page[​](#knowledge-article-or-catalog-item-links-in-glean-open-the-wrong-page "Direct link to Knowledge article or catalog item links in Glean open the wrong page")

**Symptoms:**

-   Clicking a knowledge article or catalog item in Glean opens a 404 page or the wrong content.
-   The URL shown in Glean uses a different portal name, article type, or query parameter than the URL users normally visit in ServiceNow.

| Likely cause | Fix / Remediation |
| --- | --- |
| **URL format mismatch:** The default URL format configured in Glean does not match your organization's ServiceNow portal setup—for example, a custom portal name (`hr` instead of `kb`), a custom article type identifier, or a different query parameter. | In **Admin console → Connectors → ServiceNow → Settings**, update the **KB Article URL Format** fields to match the URL structure your users see when browsing ServiceNow: set the correct portal name, article type, and query parameter. |
| **Custom catalog item URL `id`:** Catalog items use a custom `id` field in the URL (for example, `wd_sc_cat_item` instead of `sc_cat_item`). | Contact [Glean Support](https://support.glean.com) to configure custom catalog item URL mapping. |

## Permissions and access[​](#permissions-and-access "Direct link to Permissions and access")

### All API requests are failing with an IP address not authorized error[​](#all-api-requests-are-failing-with-an-ip-address-not-authorized-error "Direct link to All API requests are failing with an IP address not authorized error")

**Symptoms:**

-   The connector health page shows a credential failure.
-   Crawls are not completing.
-   Error details mention `HTTP 403 – Access restricted` with an IP address.

| Likely cause | Fix / Remediation |
| --- | --- |
| **Egress IP not allowlisted:** Your ServiceNow instance has IP Address Access Control enabled, and Glean's egress IP address has not been added to the allowlist. | Contact [Glean Support](https://support.glean.com) to get the correct egress IP address for your Glean deployment. In ServiceNow, navigate to **System Security → IP Address Access Control** and add Glean's egress IP address to the allowlist. |

### The connector health check is failing but no error is visible in the Admin console[​](#the-connector-health-check-is-failing-but-no-error-is-visible-in-the-admin-console "Direct link to The connector health check is failing but no error is visible in the Admin console")

**Symptoms:**

-   Glean Support or an internal notification indicates the ServiceNow connector credentials are unhealthy.
-   The connector page in **Admin console → Connectors → ServiceNow** shows no error or warning.
-   Content may still appear in search from a previous crawl.

| Likely cause | Fix / Remediation |
| --- | --- |
| **Health check failure not surfaced in the console:** In some cases, connector credential health check failures do not surface as visible alerts in the Admin console. | Contact [Glean Support](https://support.glean.com) to check the current credential status for your ServiceNow connector. If credentials have failed, re-authenticate the connector from **Admin console → Connectors → ServiceNow**, then confirm crawls resume successfully. |

### The connector shows a `SERVICENOW_3` error and crawls are returning unexpected results[​](#the-connector-shows-a-servicenow_3-error-and-crawls-are-returning-unexpected-results "Direct link to the-connector-shows-a-servicenow_3-error-and-crawls-are-returning-unexpected-results")

**Symptoms:**

-   The connector health view shows a `SERVICENOW_3` error.
-   Identity or incremental crawls may be returning stale or incorrect results.

| Likely cause | Fix / Remediation |
| --- | --- |
| **Service account timezone not GMT:** The `gleansearch` service account's timezone in ServiceNow is not set to GMT, which is required for Glean to accurately process timestamp-based queries during incremental crawls. | In ServiceNow, go to **Organization → Users**, open the `gleansearch` user record, set the **Time Zone** field to **GMT**, and save. |

**Full resolution steps:** See [SERVICENOW\_3](/troubleshooting/error-codes/servicenow/servicenow-3).

## Authentication and setup[​](#authentication-and-setup "Direct link to Authentication and setup")

### OAuth setup fails with a user mismatch error[​](#oauth-setup-fails-with-a-user-mismatch-error "Direct link to OAuth setup fails with a user mismatch error")

**Symptoms:**

-   The connector health view shows an authentication error after completing the OAuth authorization flow.
-   Error details indicate the OAuth session user does not match the configured Glean service account.

| Likely cause | Fix / Remediation |
| --- | --- |
| **Authorized with the wrong account:** During the OAuth authorization step, a ServiceNow admin or other user authenticated with their own account instead of the designated `gleansearch` service account. | In **Admin console → Connectors → ServiceNow**, restart the OAuth authorization flow. When prompted to sign in to ServiceNow, sign in as the `gleansearch` service account (or whichever account is configured for Glean), complete the OAuth flow, and rerun validation to confirm the error is resolved. |

**Full resolution steps:** See [SERVICENOW\_10](/troubleshooting/error-codes/servicenow/servicenow-10).

### The connector cannot generate an auth token (`SERVICENOW_1`)[​](#the-connector-cannot-generate-an-auth-token-servicenow_1 "Direct link to the-connector-cannot-generate-an-auth-token-servicenow_1")

**Symptoms:**

-   The connector health view shows a `SERVICENOW_1` credential error.
-   Crawls are not running.

| Likely cause | Fix / Remediation |
| --- | --- |
| **Credential mismatch:** The OAuth Client ID, Client Secret, or service account credentials entered in Glean do not match the values configured in ServiceNow. | In ServiceNow, verify the `Glean Search OAuth` application is correctly configured and that the Client ID and Secret match what is entered in the Admin console. Confirm the `gleansearch` user exists, the username and password are correct, and the domain name entered in Glean excludes any `http://` or `https://` prefix. |
| **`snc_read_only` blocks token creation:** The `gleansearch` service account has the `snc_read_only` role at the time of OAuth token creation. Creating OAuth tokens requires write access to the `oauth_credential` table, which `snc_read_only` blocks, so token generation fails. | If using OAuth, remove the `snc_read_only` role from the `gleansearch` service account before authorizing the OAuth application, then re-assign it once the OAuth flow completes. The role blocks token creation, but reassigning it afterward keeps the crawl least-privilege and read-only. |

**Full resolution steps:** See [SERVICENOW\_1](/troubleshooting/error-codes/servicenow/servicenow-1).

### Validation fails because the advanced user criteria REST endpoint is not accessible (`SERVICENOW_5`)[​](#validation-fails-because-the-advanced-user-criteria-rest-endpoint-is-not-accessible-servicenow_5 "Direct link to validation-fails-because-the-advanced-user-criteria-rest-endpoint-is-not-accessible-servicenow_5")

**Symptoms:**

-   Connector validation fails with a `SERVICENOW_5` error during setup.
-   The Advanced setup was used.

| Likely cause | Fix / Remediation |
| --- | --- |
| **Scripted REST API missing or misconfigured:** The GleanSearch scripted REST API has not been created or is not correctly configured in ServiceNow. | In ServiceNow, verify the GleanSearch scripted REST API exists and is active; if not, follow the Advanced setup instructions in the Admin console to create it. |
| **Missing ACL for the scripted API:** The ACL granting the `gleansearch` service account access to the scripted API is missing. | Confirm the ACL for the scripted API is granted to the `gleansearch` service account. |
| **API Namespace mismatch:** The API Namespace value in Glean does not match the namespace configured for the scripted API in ServiceNow. | In **Admin console → Connectors → ServiceNow → Settings**, ensure the **API Namespace** field matches the namespace configured in ServiceNow. |

**Full resolution steps:** See [SERVICENOW\_5](/troubleshooting/error-codes/servicenow/servicenow-5).

### Validation fails with `SERVICENOW_8` — advanced user criteria scripts use `gs.getUser()`[​](#validation-fails-with-servicenow_8--advanced-user-criteria-scripts-use-gsgetuser "Direct link to validation-fails-with-servicenow_8--advanced-user-criteria-scripts-use-gsgetuser")

**Symptoms:**

-   Connector validation fails with a `SERVICENOW_8` error during setup or when saving connector settings.
-   The Advanced or Hybrid setup mode is in use.
-   One or more advanced user criteria scripts are flagged in the error details.

| Likely cause | Fix / Remediation |
| --- | --- |
| **Scripts call `gs.getUser()` / `gs.getUserID()`:** One or more scripted user criteria use `gs.getUser()` or `gs.getUserID()`; ServiceNow evaluates these functions against the Glean service account during permission checks instead of the end user, producing incorrect permission decisions. | In ServiceNow, identify the scripted user criteria flagged by the error and replace any usage of `gs.getUser()` or `gs.getUserID()` with the pre-defined `user_id` variable. If an upstream fix is not immediately possible, contact [Glean Support](https://support.glean.com) to discuss options for your deployment. |

**Full resolution steps:** See [SERVICENOW\_8](/troubleshooting/error-codes/servicenow/servicenow-8).

### Connector validation fails on table access (`SERVICENOW_2`)[​](#connector-validation-fails-on-table-access-servicenow_2 "Direct link to connector-validation-fails-on-table-access-servicenow_2")

**Symptoms:**

-   Connector validation fails with a `SERVICENOW_2` error.
-   One or more required tables are listed as inaccessible in the error details.

| Likely cause | Fix / Remediation |
| --- | --- |
| **Missing roles for a crawl mode:** The `gleansearch` service account is missing one or more required roles for the selected crawl modes (ITSM, APM, or SPM). | In ServiceNow, ensure the `gleansearch` service account has all required roles for each enabled crawl mode; see the setup guide for the complete role list. |
| **Crawl mode for an uninstalled module:** A selected crawl mode includes modules that are not installed on this ServiceNow instance, or a required table does not exist in this instance. | Confirm the enabled crawl modes in **Admin console → Connectors → ServiceNow → Settings** match the modules actually installed on your ServiceNow instance; turn off any module that is not installed. |

**Full resolution steps:** See [SERVICENOW\_2](/troubleshooting/error-codes/servicenow/servicenow-2).

## Crawl behavior[​](#crawl-behavior "Direct link to Crawl behavior")

### Validation fails because the knowledge article template table is not accessible (`SERVICENOW_7`)[​](#validation-fails-because-the-knowledge-article-template-table-is-not-accessible-servicenow_7 "Direct link to validation-fails-because-the-knowledge-article-template-table-is-not-accessible-servicenow_7")

**Symptoms:**

-   The connector health view shows a `SERVICENOW_7` error or a credential validation failure referencing template tables.
-   Affected tables include `kb_template_faq`, `kb_template_how_to`, `kb_template_what_is`, and `kb_template_kcs_article`.

| Likely cause | Fix / Remediation |
| --- | --- |
| **Template fetching enabled without template tables:** The connector has knowledge article template fetching enabled, but this ServiceNow instance does not have the knowledge article template tables set up. | If your organization does not use knowledge article templates, turn off the **Enable fetching template-based knowledge articles** setting in **Admin console → Connectors → ServiceNow → Settings**. If templates are in use, verify with your ServiceNow admin that the template tables exist and that the `gleansearch` service account can read them. |

**Full resolution steps:** See [SERVICENOW\_7](/troubleshooting/error-codes/servicenow/servicenow-7).

### Attachments on knowledge articles are not being indexed[​](#attachments-on-knowledge-articles-are-not-being-indexed "Direct link to Attachments on knowledge articles are not being indexed")

**Symptoms:**

-   Attachments on knowledge articles are missing from Glean search.
-   The knowledge articles themselves appear correctly in search results.

| Likely cause | Fix / Remediation |
| --- | --- |
| **Unsupported file type:** The attachment's file type is outside the indexed content-type allowlist. | Confirm the attachment is a supported file type (see the note below). To index a file type that is not in the default allowlist, contact [Glean Support](https://support.glean.com). |
| **Attachment exceeds the size limit:** The attachment exceeds the maximum size Glean indexes. | Glean does not index attachments above its size limit. Contact [Glean Support](https://support.glean.com) to confirm the current limit. |
| **Attachment table not readable:** The `gleansearch` service account cannot read the attachment tables (for example, `sys_attachment`). | In ServiceNow, verify the `gleansearch` service account can read the `sys_attachment` table for the affected knowledge base. |
| **No re-crawl since the attachment was added:** A content re-crawl has not run since the attachment was added. | Trigger a full content re-crawl from **Admin console → Connectors → ServiceNow**. |

note

Glean indexes knowledge article attachments by default. Supported file types include PDF, plain text, images (PNG and JPEG), and Microsoft Office documents (Word, Excel, and PowerPoint); the set of indexed types is configurable through Glean Support. Attachments on Customer Service (CSM) cases can also be indexed, but are off by default. Attachments on other content types are not indexed.

## FAQs[​](#faqs "Direct link to FAQs")

### Does Glean require admin-level permissions for the ServiceNow connector?

The default setup uses a service account (`gleansearch`) with several admin-level roles — including `knowledge_admin`, `catalog_admin`, `user_admin`, and `user_criteria_admin` — to access all required tables and permission data. A non-admin setup using a custom role with reduced permissions is available. See the [custom role setup guide](/connectors/native/servicenow/servicenow-custom-role) for the required configuration.

### What authentication methods does Glean support for ServiceNow?

Glean supports basic authentication (username and password for the `gleansearch` service account) and OAuth Authorization Code Grant Flow. Both methods require the `gleansearch` service account to be configured in ServiceNow with the appropriate roles.

When using OAuth, the account used to authorize the OAuth flow must be the designated `gleansearch` service account — authorizing with a personal admin account will cause a [SERVICENOW\_10](/troubleshooting/error-codes/servicenow/servicenow-10) user mismatch error.

### What content types does Glean index from ServiceNow?

Glean indexes the following content types from ServiceNow:

| Content type | Enabled by default |
| --- | --- |
| Knowledge articles | Yes |
| Catalog items | Yes |
| ITSM incidents, requests, and interactions | No |
| APM business applications | No |
| SPM demands, epics, and projects | No |
| Customer Service (CSM) cases | No |

ITSM, APM, and SPM indexing must be enabled in **Admin console → Connectors → ServiceNow → Settings**. Each module requires the corresponding ServiceNow application to be installed on your instance and additional roles on the `gleansearch` service account. Customer Service (CSM) case indexing is not exposed in the Admin console; contact [Glean Support](https://support.glean.com) to enable it.

### Does Glean index attachments from knowledge articles?

Yes. Glean indexes knowledge article attachments by default, including PDFs, plain text, images (PNG and JPEG), and Microsoft Office documents (Word, Excel, and PowerPoint). The set of indexed file types is configurable — contact [Glean Support](https://support.glean.com) to adjust it. Attachments on Customer Service (CSM) cases can also be indexed, but are off by default; contact Glean Support to enable them. Attachments on other content types are not indexed.

### Does Glean index embedded links from ServiceNow knowledge articles?

No. Glean does not follow embedded links within knowledge articles to crawl other documents. A link appearing inside a knowledge article will not cause the linked document to be indexed unless it is independently discovered and indexed as a standalone document through a standard content crawl.
