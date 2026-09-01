---
url: "https://docs.glean.com/connectors/native/gchat/"
canonical: "https://docs.glean.com/connectors/native/gchat/"
title: "Google Chat"
description: "This article covers configuration, requirements, and supported features for the Google Chat connector, which enables enterprise-wide search and assistant features within Glean by indexing Google Chat content, including spaces, messages, and attachments."
fetched_at: "2026-09-01T13:29:27.504Z"
---
On this page

Glean’s Google Chat connector allows organizations to ingest and index chat content from Google Chat, making chat communications discoverable via Glean’s enterprise search and work assistant. The connector integrates with Google Chat via APIs, enforces end-user access permissions, and supports various controls for managing which content is indexed. All indexed data remains in the customer’s own Google Cloud Platform (GCP) environment, maintaining complete data residency and privacy.

## Supported Features and Limitations[​](#supported-features-and-limitations "Direct link to Supported Features and Limitations")

The connector indexes conversations, spaces, and relevant metadata from Google Chat to support robust search experiences and assistant capabilities.

### Supported Objects/Entities[​](#supported-objectsentities "Direct link to Supported Objects/Entities")

-   Spaces (public and private)
-   Direct Messages (DMs) and Group Chats
-   Messages (including those from bots, with crawl toggles)
-   Attachments (files shared within chats)

### Supported API Endpoints/Features[​](#supported-api-endpointsfeatures "Direct link to Supported API Endpoints/Features")

-   `/spaces`: List all spaces a user is a member of
-   `/spaces/{space_id}/messages`: List all messages in a space
-   `/media/{resourceName}`: Retrieve message attachments
-   `/spaces/{spaceId}/spaceEvents`: Access events (message created, updated, deleted, space updated) for incremental crawls

Admin controls enable inclusion/exclusion (greenlist/redlist) of spaces by exact space ID, name prefix, or suffix. Crawls for messages by bots, DMs, and group chats can be enabled or disabled individually via toggles in the Admin Console (**Platform** → **Connectors**, **Manage Data** tab). Content, including both public and private spaces, is indexed by default.

### Limitations[​](#limitations "Direct link to Limitations")

-   The corresponding Google Drive connector must be installed and configured, as credential authentication is shared.
-   The user account must have Google Chat set up and an active Workspace license. Accounts not meeting these prerequisites will be skipped during crawls.
-   Space membership changes may take up to 20 minutes to reflect (identity crawls run at this interval). As a result, permissions updates (members added or removed) may not be immediately visible in indexed search results.
-   Both greenlist and redlist settings cannot be populated simultaneously; doing so will trigger a validation error.
-   Edge cases: Rapid membership changes and chat events may result in incremental crawl edge cases where very recent events are not captured for newly added members until the next crawl.

## Requirements[​](#requirements "Direct link to Requirements")

To successfully install and operate the Google Chat connector, certain platform, credential, permission, and preliminary setup steps are required.

### Technical Requirements[​](#technical-requirements "Direct link to Technical Requirements")

-   A Google Workspace environment with Google Chat enabled.
-   The Glean Google Drive connector must be set up prior to configuring the Chat connector, as credentials are shared and authentication leverages the same service account.

### Credential Requirements[​](#credential-requirements "Direct link to Credential Requirements")

-   API authentication is performed using a service account associated with the configured Google Drive connector.
-   The administrator will need access to the Google Admin Console to configure Domain-wide Delegation scopes for the API client.
-   OAuth scopes required are:
    -   [https://www.googleapis.com/auth/chat.spaces.readonly](https://www.googleapis.com/auth/chat.spaces.readonly)
    -   [https://www.googleapis.com/auth/chat.memberships.readonly](https://www.googleapis.com/auth/chat.memberships.readonly)
    -   [https://www.googleapis.com/auth/chat.messages.readonly](https://www.googleapis.com/auth/chat.messages.readonly)

### Permission Requirements[​](#permission-requirements "Direct link to Permission Requirements")

-   The user configuring the connector must be a Google Super Admin.
-   Admin role is required to access the Domain-wide Delegation settings and authorize authentication scopes for the required service account.
-   Permissions and membership for specific spaces, DMs, and chat messages are enforced at query time, ensuring users only see content they are authorized to access.

### Preliminary Source/System Setup[​](#preliminary-sourcesystem-setup "Direct link to Preliminary Source/System Setup")

-   The Google Drive connector must be enabled and operational.
-   Create or use an existing service account that is configured with the above scopes.
-   Enable the Google Chat API in the customer’s GCP project as needed.
-   The Domain-wide Delegation section in the Google Admin Console must be updated to authorize the necessary OAuth scopes for Glean's API client.

### External References[​](#external-references "Direct link to External References")

-   Google Chat API Reference: developers.google.com/workspace/chat/api/reference/rest
-   Google Admin Console (Domain-wide Delegation): admin.google.com

## Configuration and Setup Instructions[​](#configuration-and-setup-instructions "Direct link to Configuration and Setup Instructions")

Configuration of the Google Chat connector is primarily performed in the Glean Admin Console and the Google Admin Console. The setup process involves several coordinated steps.

### Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   You must already have Google Workspace Super Admin access.
-   The Glean Google Drive connector must be fully configured and associated with the same Workspace tenant.
-   The service account credentials for the existing Google Drive connector will be used.

### Authentication and Credentials[​](#authentication-and-credentials "Direct link to Authentication and Credentials")

-   In the Google Admin Console, navigate to **Security → API Controls → Domain-wide Delegation**.
-   Find the API client ID associated with your Glean Google Drive connector and edit its configuration.
-   Add the following OAuth scopes (comma-separated):
    
    ```
    https://www.googleapis.com/auth/chat.spaces.readonly,https://www.googleapis.com/auth/chat.memberships.readonly,https://www.googleapis.com/auth/chat.messages.readonly
    ```
    
-   Save the configuration. This enables Glean to programmatically access Chat content with the correct permissions, tied to the authenticated service account.

### Step-by-Step Setup[​](#step-by-step-setup "Direct link to Step-by-Step Setup")

1.  **Preliminary**
    
    -   Ensure the Glean Google Drive connector is installed and associated with your domain.
    -   Valid service account and authorized OAuth scopes must be in place.
2.  **Domain-wide Delegation**
    
    -   As a Super Admin, add the OAuth scopes listed above to the Domain-wide Delegation configuration for the API client used by Glean.
3.  **Associate GDrive Instance**
    
    -   In Glean's Admin settings, select the Google Drive instance to be used for Chat integration.
4.  **Enable Google Chat API and Configure Chat App (if applicable)**
    
    -   If not already enabled, activate the Google Chat API in your GCP project.
    -   For customers not on Glean's central Google app, follow the deployment pipeline instructions (e.g., run the required Spinnaker pipeline step to grant app configuration access, as outlined in the internal guide).
5.  **Configure Content Controls**
    
    -   Optionally, specify greenlist or redlist settings for spaces (by ID, prefix, or suffix).
    -   Configure crawl toggles for DMs, group chats, and bot messages via the **Manage Data** tab in the Admin Console (**Platform** → **Connectors**) in Glean.
6.  **Finalize and Save**
    
    -   Complete and save configuration in the Glean Admin Console.
    -   Data synchronization will begin once all prerequisites are confirmed.
