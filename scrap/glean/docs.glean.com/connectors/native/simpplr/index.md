---
url: "https://docs.glean.com/connectors/native/simpplr/"
canonical: "https://docs.glean.com/connectors/native/simpplr/"
title: "Simpplr (AWS Version)"
description: "Learn how to index and search content from Simpplr’s content via your underlying AWS instance, directly within Glean."
fetched_at: "2026-09-01T13:29:42.425Z"
---
On this page

The Glean Simpplr Connector enables your organization to index and search content from Simpplr’s modern intranet, directly within Glean. This new connector is specifically built for Simpplr’s AWS platform, replacing the old Salesforce-based integration. As Simpplr transitions all customers to AWS, Glean’s renewed connector ensures you maintain seamless intranet search and knowledge discovery.

## Key features[​](#key-features "Direct link to Key features")

-   **Design**: Works with Simpplr’s latest AWS APIs and infrastructure.

-   **Indexes Pages, Events, and Sites**: Search Simpplr’s core objects - Pages (knowledge/news), Events, and Sites. Metadata like likes/comments is supported, but not page view/activity analytics.
-   **Permission-aware:** Honors granular Simpplr permissions so users only see content they’re allowed to access.
-   **Incremental crawling:** Efficiently syncs new and updated items post initial import.
-   **Authentication**: Uses OAuth 2.0 client credentials.
-   **Access control:** Excludes inactive or frozen users from search results, **preventing permission leaks**.

## Supported objects[​](#supported-objects "Direct link to Supported objects")

| Object | Description |
| --- | --- |
| Pages | Authored documents within a site, including “knowledge” and “news” types |
| Events | Calendar entries with details such as date, location, and linked site |
| Sites | Primary groupings in Simpplr, which can be public, private, or unlisted |

## Limitations[​](#limitations "Direct link to Limitations")

-   Page view/activity analytics are not indexed.

## Permission model[​](#permission-model "Direct link to Permission model")

-   **Public sites:** Accessible to all users in your Glean connector.
-   **Private & unlisted sites:** Only visible to explicitly invited members.
-   **Admins:** Have access to all site content.

note

Only users marked as `active` in Simpplr get search access. Inactive or frozen users are excluded.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Your Simpplr environment **must be on AWS**. It is important to note that your Simpplr instance must be migrated to AWS if it is built on Salesforce.
-   Admin permissions in both Simpplr and Glean.

## Instructions[​](#instructions "Direct link to Instructions")

1.  In Glean, navigate to **Admin console** → **Add connector** → and select **Simpplr**.
2.  Enter a name and icon to your connector. Results for this connector will appear to all users under this name and icon.
3.  Provide the following configuration details about your Simpplr instance:
    -   **API Hostname**
    -   **UI Hostname**
    -   **Client ID**
    -   **Client Secret**

### Determine Simpplr hostnames and credentials[​](#determine-simpplr-hostnames-and-credentials "Direct link to Determine Simpplr hostnames and credentials")

This connector requires two distinct hostnames from your Simpplr environment and a dedicated OAuth 2.0 application.

#### Obtain API and UI hostnames[​](#obtain-api-and-ui-hostnames "Direct link to Obtain API and UI hostnames")

You must identify two different hostnames for the connector's internal and external functions.

1.  **Determine the API Hostname:**
    1.  **Tool:** Consult your Simpplr API documentation or admin settings to find the exact backend endpoint used for communication. The general format of Simpplr API URLs is: `https://<api-hostname>/v1/...`
    2.  **Purpose:** This hostname is used by the connector for backend API calls and authentication.
    3.  *Example Format:* `platform.app.simpplr.com` or `platform.eu.simpplr.com`
2.  **Determine the UI Hostname:**
    1.  **Tool:** Open Simpplr in your browser and check the URL bar. The hostname is the value between `https://` and the first single slash (`/`). The general format of Simpplr user URLs is: `https://<ui-hostname>/site/...`
    2.  **Purpose:** This hostname represents the user-facing URL for content links in Glean.
    3.  *Example Format:* `mycompany.app.simpplr.com` or `intranet.mycompany.com`

#### Generate and provide credentials[​](#generate-and-provide-credentials "Direct link to Generate and provide credentials")

You must create an OAuth 2.0 Client Application in Simpplr to obtain the required access keys. For more information, see [Creating the Client Application](https://platform.simpplr.com/reference/creating-the-client-application).

1.  **Create the client application:**
    
    1.  Log in to Simpplr as an **App Manager**.
    2.  Select **Application settings** → **Application** → **Integrations** → **Client application**.
    3.  Click **Add client application** and select the **Client Credentials** type.
    4.  Provide a unique name and ID for the application (e.g., "Glean Connector").
    5.  Click **Save**.
2.  **Copy credentials to Glean:**
    
    1.  **Copy** the newly generated **Client ID** and **Client Secret** provided by Simpplr.
    2.  **Paste** these credentials into the respective input fields in the Glean setup page.
    3.  **Click Save** in Glean to complete the configuration.

Glean will fetch an access token (valid 24h) and test connection automatically. Once connected, Glean will begin crawling and periodically sync changes.

## Stop crawling of previous Simpplr (Salesforce) setup[​](#stop-crawling-of-previous-simpplr-salesforce-setup "Direct link to Stop crawling of previous Simpplr (Salesforce) setup")

-   Once crawls from the new Simpplr setup completes, you can stop crawling of the Salesforce setup.
-   You can delete previous connector once results from the new connector are visible in Glean search results.

## Frequently asked questions (FAQs)[​](#frequently-asked-questions-faqs "Direct link to Frequently asked questions (FAQs)")

**Q: What happens to existing indexed Simpplr (Salesforce) data?**  
A: Once migrated to AWS, the legacy Salesforce connector won’t update content. Historic data may linger if the old instance is left online, but will eventually disappear.

**Q: When should previous connector needs to be stopped/deleted?**  
A: As soon as crawls for the new connector is completed, you can stop crawling the Salesforce instances of Simpplr connector. Then verify some search results on Glean for the new connector. Once verified, you can delete previous connector.

**Q: What will happen if the previous connector is not deleted once the new connector starts working?**  
A: If this is not done, then there will be duplicated data in search results.

**Q: Are permissions respected?**  
A: Yes, all Simpplr sites and membership permissions are honored. Search results are only shown to people with access in Simpplr. Permissions rely on site membership lists.

**Q: Do deleted users or content show up?**  
A: No. When a user or item is deactivated or deleted in Simpplr, it disappears from Glean’s index at the next sync.
