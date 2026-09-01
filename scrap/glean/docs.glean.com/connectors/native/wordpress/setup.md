---
url: "https://docs.glean.com/connectors/native/wordpress/setup"
canonical: "https://docs.glean.com/connectors/native/wordpress/setup"
title: "WordPress setup"
description: "Set up the WordPress connector in Glean."
fetched_at: "2026-09-01T13:29:48.216Z"
---
On this page

The following requirements apply when setting up the connector.

### Technical requirements[​](#technical-requirements "Direct link to Technical requirements")

To use the WordPress connector, you need:

-   A self-hosted WordPress site (or WordPress.com Business plan or higher) with the [WordPress API](https://developer.wordpress.org/rest-api/) (`/wp-json/wp/v2`) enabled.
-   A WordPress user account with an [Application Password](https://make.wordpress.org/core/2020/11/05/application-passwords-integration-guide/) configured (requires WordPress 5.6 or later).
-   A Glean deployment with access to the **Admin console** to manage data sources.
-   A WordPress site that Glean can reach over the internet. If the site is behind a firewall, IP allowlist, or other network protection, allowlist Glean's crawler egress IP addresses so the connector can reach it. Contact Glean Support for your instance's egress IP addresses.

Glean connects to WordPress via the WordPress API (`/wp-json/wp/v2/`) over HTTPS and stores indexed data in your organization's Glean deployment.

note

Allowlisting Glean's egress IP addresses only affects whether Glean can reach the site over the network. It does not change what Glean indexes: the connector still crawls only published, public content. Draft, private, and password-protected content is never indexed. See [Content configuration](#content-configuration).

### Credential requirements[​](#credential-requirements "Direct link to Credential requirements")

The connector uses HTTP Basic Authentication with a WordPress Application Password:

-   **WordPress site URL** (the hostname of your WordPress instance, for example, `https://your-site.example.com`)
-   **Application Username** (the WordPress username associated with the Application Password)
-   **Application Password** (generated in your WordPress user profile under **Application Passwords**)

Enter these values into the WordPress connector setup in the Glean admin console.

### Permission requirements[​](#permission-requirements "Direct link to Permission requirements")

To configure the connector end-to-end, the person performing setup must:

-   Be a WordPress user with sufficient privileges to generate an **Application Password** and read all published pages, posts, comments, tags, and categories via the WordPress API.
-   Be a **Glean admin** with permission to add and configure data sources.

The connector indexes only content with `publish` status. Password-protected content and unapproved comments are excluded. All indexed content is treated as publicly visible within Glean: WordPress does not enforce per-user document-level permissions, so all Glean users will see all indexed WordPress content.

## Setup and configuration instructions[​](#setup-and-configuration-instructions "Direct link to Setup and configuration instructions")

### Authentication and credentials[​](#authentication-and-credentials "Direct link to Authentication and credentials")

-   In WordPress, log in with an administrator account. Navigate to the user's profile and generate a new Application Password for Glean use.
-   Record both the newly created Application Password and the associated username.
-   In Glean's admin console, enter the hostname of the WordPress site, the admin username, and the Application Password in the relevant connector fields.

### Setup in the WordPress admin console[​](#setup-in-the-wordpress-admin-console "Direct link to Setup in the WordPress admin console")

1.  Log in to your WordPress site as an administrator and navigate to your user profile.
2.  Create a new Application Password specifically for Glean integration.
3.  Copy the Application Password and username; store this information securely.

### Setup in the Glean admin console[​](#setup-in-the-glean-admin-console "Direct link to Setup in the Glean admin console")

1.  Open Glean's admin console and select **Add Connector → WordPress**.
2.  Input the data source name in the **Name** text box and select an icon.
3.  Input the Application Username created in the WordPress admin console in the **Username** text box.
4.  Input the Application Password created in the WordPress admin console in the **Application Password** text box.
5.  Input the WordPress site hostname, including the scheme (for example, `https://your-site.example.com`), in the **Hostname** text box.
6.  Click **Save**.

## External references[​](#external-references "Direct link to External references")

-   WordPress [API reference](https://developer.wordpress.org/rest-api/reference/).
-   Application passwords [Integration guide](https://make.wordpress.org/core/2020/11/05/application-passwords-integration-guide/)
