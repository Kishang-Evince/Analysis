---
url: "https://docs.glean.com/connectors/native/sharepoint/security/app-vs-delegated"
canonical: "https://docs.glean.com/connectors/native/sharepoint/security/app-vs-delegated"
title: "SharePoint permission models"
description: "Understanding Glean's requirement for Application permissions for the Microsoft Graph API"
fetched_at: "2026-09-01T13:29:41.128Z"
---
On this page

Glean's integration with SharePoint and OneDrive necessitates the use of **Application** permissions, as opposed to **Delegated** permissions.

This distinction is crucial for the functionality of the SharePoint and OneDrive Connector within Glean and aligns with [Microsoft's guidelines](https://learn.microsoft.com/en-us/entra/identity-platform/app-only-access-primer#when-should-i-use-application-only-access) for application development:

> ***When should I use application-only access?***
> 
> *In most cases, application-only access is broader and more powerful than delegated access, so you should only use app-only access where needed. It's usually the right choice if:*
> 
> -   ***The application needs to run in an automated way, without user input. For example, a daily script that checks emails from certain contacts and sends automated responses.***
> -   ***The application needs to access resources belonging to multiple different users. For example, a backup or data loss prevention app might need to retrieve messages from many different chat channels, each with different participants.***
> -   *You find yourself tempted to store credentials locally and allow the app to sign in "as" the user or admin.*
> 
> → [Understanding application-only access (learn.microsoft.com)](https://learn.microsoft.com/en-us/entra/identity-platform/app-only-access-primer#when-should-i-use-application-only-access)

## Why Application permissions?[​](#why-application-permissions "Direct link to Why Application permissions?")

Glean requires Application permissions for the following reasons:

-   **Autonomous Operation:** Glean operates independently of any specific user interaction. It needs to access and index data across your SharePoint and OneDrive environments systematically and continuously. This includes crawling content, permissions, and activity data for assets.
    
-   **Comprehensive Access:** Unlike delegated permissions, which act on behalf of a user, application permissions allow Glean to access all relevant data across the environment without being tied to individual user sessions or permissions. This is essential for Glean to perform its functions effectively, ensuring that it can access and index content as needed, regardless of user activity.
    
-   **Efficiency and Scalability:** The need to fetch data asynchronously and across the entire environment means that relying on user-based delegated permissions would severely limit Glean's ability to operate efficiently. Application permissions ensure that Glean can scale its operations to meet the demands of large and complex environments.
    
-   **Rate Limits**: Microsoft enforces Graph API rate limits tenant-wide for each registered application. Switching to Delegated permissions would require Glean to make individual Graph API calls for each user for every individual API request that is made currently. This change would dramatically accelerate how quickly Glean reaches Microsoft's API rate limits, significantly impairing platform functionality.
    

## Limitations of Delegated permissions[​](#limitations-of-delegated-permissions "Direct link to Limitations of Delegated permissions")

Delegated permissions, which operate on behalf of a logged-in user, do not provide the scope of access required for Glean's crawlers to function. Specifically:

-   **User Dependency:** Delegated permissions restrict Glean to the permissions of individual users, limiting content access and indexing to what the user can see during their session. This approach is not scalable and delays data availability, risking exposure of sensitive data if document access changes, as updates depend on user sessions to be processed.
    
-   **Interactivity Requirement:** Delegated permissions are designed for scenarios where an application acts with user interaction. Glean's requirement to operate independently, fetching data asset by asset without direct user involvement, is incompatible with the nature of delegated permissions.
    

## Token security[​](#token-security "Direct link to Token security")

Glean's crawlers use a Service Principal (App Registration) to authenticate with Microsoft Graph and SharePoint REST APIs. The Service Principal is configured with a certificate (X.509 public certificate plus PEM PKCS#8 private key) that is used to authenticate requests to the APIs. Client secrets are not supported for SharePoint or OneDrive — Microsoft retired Azure ACS on April 2, 2026.

### Secure storage[​](#secure-storage "Direct link to Secure storage")

The certificate and private key provided to Glean are stored, as per all other connector credentials, in the Secrets Store of your Glean tenant. Every Glean customer tenancy has its own unique Secret Store, ensuring no cross-tenant exposure.

Secrets saved to the Secret Store are double encrypted: Once before being written to the Secret Store, and again at rest. To facilitate this, the native KMS of the underlying cloud provider (GCP or AWS) is used, with the key rotation occurring frequently.

### Secure access[​](#secure-access "Direct link to Secure access")

Using a designated service account, Glean connectors fetch the certificate and private key from the Secret Store each time a crawl takes place. The credentials are held in the encrypted memory of the connector and discarded once the crawl is complete: they are **never** stored in the crawler itself or written to disk within any Glean component (other than the Secret Store).

### Additional controls[​](#additional-controls "Direct link to Additional controls")

For additional security, you can configure IP restrictions via Entra ID Conditional Access to constrain use of the certificate credential to only the IP addresses associated with the crawlers of your Glean tenant.

-   → More information: [IP Restrictions (Conditional Access)](/connectors/native/sharepoint/security/controls#ip-restrictions-conditional-access)
