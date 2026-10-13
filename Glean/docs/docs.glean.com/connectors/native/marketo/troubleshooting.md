---
url: "https://docs.glean.com/connectors/native/marketo/troubleshooting"
canonical: "https://docs.glean.com/connectors/native/marketo/troubleshooting"
title: "Troubleshooting"
description: "Resolve Marketo connector setup, crawl, content, and permission issues"
fetched_at: "2026-10-13T08:50:04.414Z"
---
On this page

Use these checks to diagnose Marketo connector issues, including Representational State Transfer (REST) API endpoint failures. For setup instructions, see [Set up Marketo](/connectors/native/marketo/setup).

## Setup and authorization[​](#setup-and-authorization "Direct link to Setup and authorization")

### The setup form rejects the REST API endpoint[​](#the-setup-form-rejects-the-rest-api-endpoint "Direct link to The setup form rejects the REST API endpoint")

**Symptoms:**

-   The setup form rejects the Marketo REST API endpoint
-   You can't save or authorize the connector with the endpoint you entered

| Cause | Fix |
| --- | --- |
| **HTTPS is missing:** The endpoint doesn't use HTTPS. | Enter the instance host with `https://`. |
| **The host is incorrect:** The endpoint isn't a Marketo REST host. | Use the host shown under **Admin → Integration → Web Services**. It must end in `.mktorest.com`. |
| **The URL contains extra components:** The value includes a path, port, query string, or fragment. | Enter the host only, such as `https://123-ABC-456.mktorest.com`. The form removes `/rest`, `/identity`, and trailing slashes, but it doesn't accept other paths. |

### Authorization fails[​](#authorization-fails "Direct link to Authorization fails")

**Symptoms:**

-   Marketo authorization returns an error
-   The connector can't obtain a Marketo access token

| Cause | Fix |
| --- | --- |
| **The credentials are incorrect:** The **Client ID** or **Client Secret** doesn't match the configured service. | Copy both values from **View Details** for the same LaunchPoint custom service. |
| **The service uses the wrong user:** The custom service isn't assigned to the intended API-only user. | Edit or recreate the service and select the Glean API-only user. |
| **The API-only user can't access the required APIs:** The user is inactive or lacks required permissions. | Confirm the user is active and has the dedicated Glean role from [Set up Marketo](/connectors/native/marketo/setup#create-the-api-only-role-and-user). |

**Still not resolved?** Contact [Glean Support](https://support.glean.com) with the connector instance name and exact authorization error.

## Roles export and identity[​](#roles-export-and-identity "Direct link to Roles export and identity")

### The roles workbook won't upload[​](#the-roles-workbook-wont-upload "Direct link to The roles workbook won't upload")

**Symptoms:**

-   The setup form rejects the roles and permissions workbook
-   You can't complete connector setup with the selected file

| Cause | Fix |
| --- | --- |
| **The file isn't a Marketo roles export:** The workbook came from another page or process. | In Marketo, go to **Admin → Users & Roles → Roles** and click **Export**. |
| **The file type is incorrect:** The file isn't an `.xlsx` workbook. | Upload the `.xlsx` workbook downloaded from Marketo. |
| **The workbook changed after export:** Someone changed rows, columns, or other workbook content. | Export a new workbook and upload it unchanged. |

### The identity crawl fails after a role change[​](#the-identity-crawl-fails-after-a-role-change "Direct link to The identity crawl fails after a role change")

**Symptoms:**

-   A full identity crawl fails after someone adds, renames, or changes a Marketo role
-   User access in Glean doesn't reflect the latest Marketo role configuration

| Cause | Fix |
| --- | --- |
| **A role is missing from the workbook:** An active Marketo role doesn't appear in the uploaded export. | Export and upload a current roles workbook, then run a full identity crawl. |
| **The workbook is stale:** Marketo renamed the role or changed its permissions after the export. | Upload a new export from Marketo, then run a full identity crawl. |
| **The API-only user can't read identity data:** The role lacks access to list workspaces, roles, or users. | Confirm the role includes **Access User Management Api** and **Access Users**. |
| **Marketo returned an invalid record:** A workspace, role, or user record is incomplete. | Retry the crawl. If it fails again, contact [Glean Support](https://support.glean.com) with the connector instance name, crawl ID, and exact error. |

## Content and crawling[​](#content-and-crawling "Direct link to Content and crawling")

### Expected assets are missing[​](#expected-assets-are-missing "Direct link to Expected assets are missing")

**Symptoms:**

-   A known Marketo asset doesn't appear in Glean
-   Assets from one workspace or of one type are missing

| Cause | Fix |
| --- | --- |
| **The API-only user can't access the workspace:** The asset belongs to a workspace outside the user's access. | Grant the dedicated Marketo role access to the required workspace. |
| **The role lacks read access:** The API-only user's role can't read the asset. | Confirm the role includes **Read-Only Asset** and **Read-Only Campaigns** as described in [Set up Marketo](/connectors/native/marketo/setup#create-the-api-only-role-and-user). |
| **The asset type isn't supported:** The missing item isn't one of the nine indexed asset types. | Review [What Glean indexes](/connectors/native/marketo/overview#what-glean-indexes). Glean doesn't index leads, activities, program members, or folders as searchable documents. |
| **The incremental crawl hasn't processed the update:** The relevant asset crawl hasn't completed since the asset changed. | Check the crawl scope for that asset type and wait for it to complete. |
| **A deleted asset remains indexed:** Incremental crawls add or update documents but don't remove stale documents. | Run or wait for the next full content crawl. |

### Content or metadata is incomplete[​](#content-or-metadata-is-incomplete "Direct link to Content or metadata is incomplete")

**Symptoms:**

-   An indexed asset is missing expected content or metadata
-   Folder context or optional facets don't appear on a result

| Cause | Fix |
| --- | --- |
| **Marketo omitted an optional field:** The API response doesn't include the field. | Compare the result with the source asset. Optional facets and metadata appear only when Marketo supplies them. |
| **A content-detail request failed:** Glean couldn't retrieve the additional content for the asset. | Review and retry the relevant asset crawl. Emails, landing pages, templates, forms, and snippets use additional content-detail requests. |
| **The folder crawl is incomplete:** Folder context wasn't available when the content crawl ran. | Confirm the full folder crawl completed before the full content crawl. |

## Permissions[​](#permissions "Direct link to Permissions")

### One user can't find a Marketo asset[​](#one-user-cant-find-a-marketo-asset "Direct link to One user can't find a Marketo asset")

**Symptoms:**

-   A user can open an asset in Marketo but can't find it in Glean
-   Other users can find the same asset in Glean

| Cause | Fix |
| --- | --- |
| **The user isn't an active permission principal:** The user is locked, expired, or has no resolvable email address. | Correct the user record in Marketo, then run a full identity crawl. |
| **The account is API-only:** Glean excludes API-only users from permission membership. | Test with an active human user. |
| **The identity data is stale:** The user's role or workspace assignment changed after the last identity crawl. | Run or wait for a full identity crawl. |
| **The roles workbook is stale:** The uploaded workbook doesn't reflect the current role permissions. | Export and upload a current workbook, then run a full identity crawl. |
| **The user lacks a required capability:** The user's role and workspace assignments don't meet all permission requirements for the asset. | Compare the user's access with the [asset permission mapping](/connectors/native/marketo/permissions#asset-permission-mapping). For assets inside a program, also check **Access Marketing Activities** in the same workspace. |

### A user can find an unexpected asset[​](#a-user-can-find-an-unexpected-asset "Direct link to A user can find an unexpected asset")

**Symptoms:**

-   A user finds an asset they didn't expect to access in Glean
-   The result's access doesn't appear to match the user's current Marketo role

| Cause | Fix |
| --- | --- |
| **The user has the required capabilities:** The user's active role and workspace assignments meet the asset's permission requirements. | Identify the asset's workspace and type, then compare the user's access with the [asset permission mapping](/connectors/native/marketo/permissions#asset-permission-mapping). |
| **The roles workbook is stale:** The uploaded workbook contains earlier role permissions. | Export and upload a current workbook, then run a full identity crawl. |
| **The identity data is stale:** A role, workspace, or user change hasn't reached Glean. | Run or wait for a full identity crawl, then test the same asset again. |

**Still not resolved?** Contact [Glean Support](https://support.glean.com) with the connector instance name, crawl ID, asset type, workspace, and affected user.
