---
url: "https://docs.glean.com/connectors/native/guru/"
canonical: "https://docs.glean.com/connectors/native/guru/"
title: "Guru"
description: "This article provides comprehensive documentation on the Guru connector for Glean. It covers supported features, requirements, and detailed configuration and setup instructions for integrating Guru with Glean."
fetched_at: "2026-09-01T13:29:32.048Z"
---
On this page

Guru is a company wiki platform designed to centralize organizational knowledge. The Guru connector allows Glean to index and search content from Guru so authorized users can find cards and card comments directly from Glean's unified search. The integration ensures user access permissions are enforced consistently with how Guru controls document visibility.

## Supported Features and Limitations[​](#supported-features-and-limitations "Direct link to Supported Features and Limitations")

The Guru connector enables Glean to discover and index specific objects and data types from the connected Guru instance. This section outlines the core features and any key limitations to be aware of.

### Supported Objects/Entities[​](#supported-objectsentities "Direct link to Supported Objects/Entities")

-   Cards
-   Card Comments

### Supported API Endpoints/Features[​](#supported-api-endpointsfeatures "Direct link to Supported API Endpoints/Features")

-   Uses Guru's standard Developer API for data ingestion
-   Supports crawling and indexing of content, including:
    -   Card text and metadata (e.g., author, date published, modification date)
    -   Card comments and associated metadata
-   Respects and enforces Guru user access permissions at query time, ensuring only content available to the end user in Guru is surfaceable in Glean.

### Limitations[​](#limitations "Direct link to Limitations")

-   Only cards and card comments are indexed. Other Guru objects (such as collections, boards, or attachments) are not currently supported.
-   Content visibility in Glean strictly mirrors Guru permissions. If a user is not a member of a group or collection in Guru, corresponding content will not appear in Glean search.
-   Guru’s recent “workspace” features (multiple workspaces in a single Guru instance) may introduce edge cases: content shared across workspaces might not appear in Glean for users only present in the recipient workspace. Support for workspace-shared content may require additional setup or connector enhancements.
-   The connector does a full crawl of all content every 24 hours and updates content/permissions every hour, but near-real-time updates are not currently available.
-   Public Guru cards (those accessible to anyone with a link) may appear in Glean if not explicitly set to "private" in Guru.
-   The connector cannot initiate crawls directly from Guru; all synchronization is managed from within Glean.

## Requirements[​](#requirements "Direct link to Requirements")

Refer to this section for all prerequisites and requirements for deploying the Guru connector.

### Technical Requirements[​](#technical-requirements "Direct link to Technical Requirements")

-   A Guru instance with administrative access
-   Glean environment configured to allow connector setup
-   No additional hardware; all operations occur within Glean's managed architecture.

### Credential Requirements[​](#credential-requirements "Direct link to Credential Requirements")

-   A Guru team admin account is required. This admin must have view access to all collections and boards to be indexed.
-   You will need to generate a User Access Token associated with the Guru team admin. This token is used by Glean to authenticate and crawl Guru data.

### Permission Requirements[​](#permission-requirements "Direct link to Permission Requirements")

-   The Guru admin providing the access token must have visibility into all collections, boards, and cards for desired coverage in Glean.
-   If not all collections or specific boards are visible to the admin account, Glean will not index their content.
-   Guru group and user permissions are reflected in Glean. Content is only presented to users through Glean if they would have corresponding visibility in Guru.

### Preliminary Source/System Setup[​](#preliminary-sourcesystem-setup "Direct link to Preliminary Source/System Setup")

-   The Guru admin (token generator) must be explicitly added to all relevant collections or boards in Guru. Access is not automatically granted by being an admin; collections must include the admin as a member to enable crawling their contents.
-   Review and enable necessary API access in Guru to generate a valid access token.

### External References (if applicable)[​](#external-references-if-applicable "Direct link to External References (if applicable)")

-   See Guru’s API and authentication documentation for creating access tokens (Guru vendor documentation; no direct links included per policy).

## Configuration and Setup Instructions[​](#configuration-and-setup-instructions "Direct link to Configuration and Setup Instructions")

Configuration is performed in the Admin Console. The following steps provide a comprehensive set of instructions to complete the connection.

### Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Ensure you have admin access in both Guru and Glean.
-   Ensure required collections, boards, and cards are visible to the Guru admin account.
-   Prepare the Guru admin User Access Token.

### Authentication and credentials[​](#authentication-and-credentials "Direct link to Authentication and credentials")

-   During connector setup, input the Guru admin access token into the Glean configuration field.
-   Glean will verify the token’s validity and confirm connectivity to the Guru environment.
-   If authentication fails, ensure the admin token is valid and the account has required visibility into Guru content.

### Step-by-Step Setup[​](#step-by-step-setup "Direct link to Step-by-Step Setup")

1.  In the **Glean Admin Consol**e, navigate to **Connectors** and select **Add Connector**, and select **Guru**.
2.  Enter a Name for your connector. This name will appear to all users in search results.
3.  Enter the Guru **Admin email** and **User access token**. For more information, see [Steps to generate a User token](https://help.getguru.com/docs/gurus-api#steps-to-generate-a-user-token).
4.  Click **Save** to complete the connection.

After you save, Glean will initiate an initial full crawl of all accessible cards and comments. This process may take several hours, depending on your data volume. Glean automatically manages subsequent periodic crawls and incremental updates. If content is removed or permissions change in Guru, you can contact Glean support to request a full re-crawl.

If content is missing after the initial crawl, verify that the Guru admin account used for setup is a member of all required collections and has view access to the desired boards and cards.

### Additional Notes[​](#additional-notes "Direct link to Additional Notes")

-   Data from Guru is stored securely within the customer’s GCP project; no Guru data leaves the customer’s cloud environment.
-   Permission propagation logic: Document and comment access in Glean matches the effective permissions at the time of the user’s search, mirroring Guru’s access controls.
-   Known security restrictions: If public cards are not intended to be visible in Glean search, ensure they are manually set to private within Guru.
-   For advanced setup or edge-case installations, contact Glean support for hands-on assistance.
