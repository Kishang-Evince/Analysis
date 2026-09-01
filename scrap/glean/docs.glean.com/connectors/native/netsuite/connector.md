---
url: "https://docs.glean.com/connectors/native/netsuite/connector"
canonical: "https://docs.glean.com/connectors/native/netsuite/connector"
title: "NetSuite search integration"
description: "Learn how the NetSuite search integration works and how to configure it for Glean."
fetched_at: "2026-09-01T13:29:35.799Z"
---
On this page

The NetSuite search integration indexes key financial and operational records from your NetSuite ERP into Glean, allowing teams to search invoices, purchase orders, customer billing data, and related entities alongside the rest of your enterprise knowledge (Drive, Confluence, Slack, etc.).

Use the search integration when:

-   You want NetSuite records to appear in Glean search results.
-   You want scheduled syncs rather than live tool access.
-   You want search visibility enforced by NetSuite roles and segment restrictions.

info

Looking for live tool access instead of indexed search? See [NetSuite MCP](/connectors/native/netsuite/mcp).

This integration supports high-value workflows:

-   Surface NetSuite records directly in Glean search results alongside content from other systems, eliminating the need for users to switch tools for common finance, revenue operations (RevOps), or back-office tasks.
-   Enable scenarios such as viewing unpaid invoices, checking purchase order status, and looking up customer or vendor records and their related transactions directly from Glean.
-   The connector enforces NetSuite's **role-based** permissions (RBAC) and segment restrictions (subsidiary, department, location, class), ensuring users only see the NetSuite data they are entitled to view in NetSuite itself.

Freshness

The search integration is crawl-based. Changes in NetSuite become visible in Glean after the next crawl completes. The search integration supports incremental crawls.

## Requirements[​](#requirements "Direct link to Requirements")

### Technical requirements[​](#technical-requirements "Direct link to Technical requirements")

-   An active NetSuite account with REST Web Services enabled.
-   Support for OAuth 2.0 Machine‑to‑Machine (Client Credentials) authentication in your NetSuite environment.
-   Network connectivity from Glean to the NetSuite API endpoints (typically over the public internet; any firewall or IP allowlisting must permit Glean's traffic).

### Credential requirements[​](#credential-requirements "Direct link to Credential requirements")

You will need the following information during setup:

-   NetSuite Account ID (retrieve from your NetSuite URL — for example, `https://12345-sb1.app.netsuite.com` → `12345-sb1`, `https://12345.app.netsuite.com` → `12345`). The Account ID is not case-sensitive.
-   A Machine‑to‑Machine OAuth 2.0 Server Application in NetSuite with:
    -   Integration type: OAuth 2.0 Server Application
    -   Grant type: Client Credentials
    -   Scope: REST Web Services
-   The application's Client ID
-   Certificate ID (generated when uploading the certificate to NetSuite)
-   An X.509 certificate and private key pair for the integration (generated via OpenSSL or your PKI and uploaded to Glean).

### Permission requirements[​](#permission-requirements "Direct link to Permission requirements")

-   The user configuring the integration in NetSuite must have Administrator privileges with access to the **Setup** menu and **Integration Management** features.
-   The service account / integration app must have read access to the NetSuite objects you intend to index (customers, vendors, transactions, etc.).

## Setup and configuration[​](#setup-and-configuration "Direct link to Setup and configuration")

### Step 1: Create the NetSuite integration (OAuth 2.0 M2M)[​](#step-1-create-the-netsuite-integration-oauth-20-m2m "Direct link to Step 1: Create the NetSuite integration (OAuth 2.0 M2M)")

1.  Log in to NetSuite as an administrator.
2.  Navigate to **Setup → Integration → Manage Integrations**.
3.  Click **New** and create an integration application with the following characteristics:
    -   **Application type:** OAuth 2.0 Server Application
    -   **Grant type:** Client Credentials
    -   **Scope:** REST Web Services
4.  Save the integration and copy the generated **Client ID**. You will use this in the Glean Admin console.

### Step 2: Generate certificate and private key[​](#step-2-generate-certificate-and-private-key "Direct link to Step 2: Generate certificate and private key")

Use OpenSSL (or your internal PKI tooling) to generate an X.509 certificate and private key pair for the Machine‑to‑Machine integration. For example:

```
# Generate private keyopenssl genrsa -out netsuite_private_key.key 4096# Generate certificate signing request (CSR)openssl req -new -key netsuite_private_key.key -out netsuite.csr# Generate self-signed certificate (example: valid for 1 year)openssl x509 -req -days 365 -in netsuite.csr -signkey netsuite_private_key.key -out netsuite_certificate.crt# Create a copy with .pem extension for NetSuite uploadcp netsuite_certificate.crt netsuite_certificate.pem
```

Refer to the [NetSuite documentation](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_162686838198.html#subsect_162686947286) for detailed instructions on client credential setup and certificate requirements.

### Step 3: Upload the certificate to NetSuite[​](#step-3-upload-the-certificate-to-netsuite "Direct link to Step 3: Upload the certificate to NetSuite")

1.  Navigate to **Setup** → **Integration** → **OAuth 2.0 Client Credentials (M2M) Setup**.
    
2.  Click **Create New**.
    
3.  Select **Entity** and **Role**: Administration.
    
4.  Select the application created earlier (Glean M2M Integration).
    
5.  Upload your `netsuite_certificate.pem` file. Note the **Certificate ID** for later setup.
    
    You will need to enter this **Certificate ID** in the Glean Admin console in a later step.
    

### Step 4: Create Service Account User[​](#step-4-create-service-account-user "Direct link to Step 4: Create Service Account User")

1.  Navigate to **Setup** → **Users/Roles** → **Manage Users**.
2.  Create or designate a user with Administrator role that has the following permissions:
    -   **Administrator** role assigned (required for API access)
    -   **REST Web Services**: Full access
    -   **Log in using OAuth 2.0 Access Tokens**: Enabled
    -   **Login using OAuth 2.0 Client Credentials Grant**: Required

Upload the resulting certificate and private key in the Glean Admin console during connector setup.

### Step 5: Configure the NetSuite connector in Glean[​](#step-5-configure-the-netsuite-connector-in-glean "Direct link to Step 5: Configure the NetSuite connector in Glean")

1.  In the **Glean Admin console**, go to **Connectors** → **Add connector**, and select **NetSuite**.
2.  Give the connector a recognizable **name** and **icon** (for example, `NetSuite – Finance`). This label appears in search filters and results.
3.  In the **Setup** tab, enter the following:
    -   **Account ID**: your NetSuite account ID (see [Credential requirements](#credential-requirements))
    -   **Client ID**: from the NetSuite integration application (see [Step 1](#step-1-create-the-netsuite-integration-oauth-20-m2m))
    -   **Certificate ID**: the certificate ID noted when uploading the certificate to NetSuite
    -   **Certificate file**: upload the X.509 certificate (`.crt` file)
    -   **Private key file**: upload the matching private key (`.key` file)
    -   **Excluded Role IDs** (optional): a comma-separated list of NetSuite role IDs to exclude from crawling (e.g., `3, 5, 10`)
4.  Save the configuration to trigger the initial full crawl. Depending on dataset size, the first crawl can take some time to complete.

### Step 6: Verify search behavior[​](#step-6-verify-search-behavior "Direct link to Step 6: Verify search behavior")

After the initial crawl finishes:

1.  Open Glean and search using a query such as `app:netsuite purchase order` or `app:netsuite customer testcompany1`.
2.  Confirm that NetSuite records (customers, purchase orders, invoices, vendor bills, etc.) appear with the expected metadata and that permissions align with what you see in NetSuite.

For example, you should see NetSuite transactions (purchase orders, sales orders, invoices) and account records appearing in Glean's results list with status, amount, and key dates.

## Supported objects and data[​](#supported-objects-and-data "Direct link to Supported objects and data")

### Objects crawled[​](#objects-crawled "Direct link to Objects crawled")

The NetSuite search integration currently crawls the following objects:

-   Customers
-   Vendors
-   Transactions (master transaction records)
    -   Purchase Orders
    -   Sales Orders
    -   Invoices
    -   Vendor Bills
    -   Credit Memos
    -   Journal Entries
    -   Opportunities

Transaction line items are also indexed and associated with their parent transactions, enabling more granular queries on line‑level details such as quantities, unit prices, and line amounts.

### Transaction types[​](#transaction-types "Direct link to Transaction types")

The following transaction types contain specialized data structures.

-   **Credit memos:** Customer transactions that are structured like invoices. Glean titles and dates these records similarly to other customer transactions and associates them with the related customer.
-   **Journal entries:** General ledger (GL) postings that do not have customer or vendor associations. Each line item is a GL posting that carries its account and a debit or credit amount. The total record amount equals the sum of the line debits. For large journals, such as allocations or payroll, Glean indexes the first 100 GL lines and appends an "… and N more" summary.
-   **Opportunities:** Pre-sales customer relationship management (CRM) records. In addition to line items, these entries surface core CRM header fields — customer, expected close date, projected total, win probability, and sales representative. Users can filter these records by sales representative and expected close date.

### Identity and permissions data[​](#identity-and-permissions-data "Direct link to Identity and permissions data")

To mirror NetSuite access controls, the connector also crawls identity/segment objects at full‑crawl intervals:

-   Permission and role groups (`permission_groups`, `role_groups`, `role_group_members`, `user_ancestor_groups`)
-   Segment hierarchies (`subsidiary_parents`, `subsidiary_members`, `department_parents`, `department_members`, `location_parents`, `location_members`, `class_parents`, `class_members`)

This identity data is used purely for permission enforcement and does not appear as user‑visible content in search.

## Permissions and security[​](#permissions-and-security "Direct link to Permissions and security")

NetSuite enforces access through a combination of role‑based permissions and segment restrictions (subsidiary, department, location, class). The search integration mirrors these rules in Glean:

-   **Role‑based visibility**: Users only see transactions and master records they can access via their NetSuite roles (for example, AP vs. Sales vs. Finance roles).
-   **Segment‑based restrictions**: Records limited by subsidiary, department, location, or class obey those restrictions in Glean; users in another region or segment cannot see them.
-   **Ownership / "my records" behavior**: Tests validate that users can see records they own (or that are assigned to their subordinates) while being prevented from viewing unassigned or unrelated records, consistent with NetSuite "my records" semantics.

When a user opens a NetSuite result from Glean, final access is still enforced by NetSuite itself.

### Exclude roles from crawling[​](#exclude-roles-from-crawling "Direct link to Exclude roles from crawling")

To exclude specific NetSuite roles (such as internal system roles) from being crawled, enter a comma-separated list of numeric role IDs in the [**Excluded Role IDs** field](#step-5-configure-the-netsuite-connector-in-glean) in the Glean Admin console. Use the numeric ID only (e.g., `1234`), not the full internal role name (e.g., `customrole1234`).

**When role IDs are excluded**:

-   They are filtered from role groups, role group memberships, and permission group mappings.
-   Users assigned to these roles will not be able to view NetSuite records in Glean.

## Crawling strategy and update frequency[​](#crawling-strategy-and-update-frequency "Direct link to Crawling strategy and update frequency")

The NetSuite search integration currently uses full crawls for both identity and content data:

-   Identity crawl (groups and segments)
    
-   Content crawl (business data)
    

Glean can tune these full‑crawl intervals (expressed in seconds) per object type to balance freshness and API load. If you need specific SLAs for update latency, work with your Glean representative to adjust the configuration.

The search integration supports both full crawls and incremental crawls. Glean can tune crawl intervals per object type to balance freshness and API load.

## Limitations[​](#limitations "Direct link to Limitations")

-   **Sharded object types (no record limit)**: Transactions, transaction line items, customers, and customer activity use date-range sharding to work around the NetSuite SuiteQL API's 100,000 per-query result cap. These types can be indexed in full regardless of volume.
-   **Non-sharded object types (100,000 record limit)**: Vendors and vendor activity do not support sharding and are subject to the SuiteQL API limit of 100,000 records. If these object types exceed this limit, records beyond the threshold are not indexed.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Account ID format

Use the numeric-only format for production accounts (for example, `12345`) and include the `-sb` suffix for sandbox accounts (for example, `12345-sb1`). The Account ID is not case-sensitive. You can retrieve the Account ID from your NetSuite URL.

### Certificate file formats

NetSuite requires a `.pem` extension for the certificate upload, while Glean requires a `.crt` extension. Both files contain the same certificate content — only the extension differs.

### Authentication failures

Verify that the integration application type is set to **Server Application**, **Client Credentials Grant** is enabled, the service account has the **Administrator** role, the certificate is properly uploaded to NetSuite (using the `.pem` file), and the service account has Client Credentials Grant permission enabled.
