---
url: "https://docs.glean.com/connectors/native/gmail-federated/about"
canonical: "https://docs.glean.com/connectors/native/gmail-federated/about"
title: "Gmail (Google Tools & Add-On) Connector Overview"
description: "Introduction"
fetched_at: "2026-09-01T13:29:30.133Z"
---
On this page

## Introduction[​](#introduction "Direct link to Introduction")

The Gmail (GoogleTools) and Gmail Add-on Connector for Glean provides a comprehensive suite for federating or indexing Gmail, including Calendar.

-   **Gmail (Google Tools)** is a federated search of Gmail inboxes and calendars. Federated search, in this context, means that each Glean search query involving email will be passed to Gmail's native search.
    
-   **Gmail Add-on** - Glean will index and maintain 90 days of Gmail email history
    

The result of a Glean email search will vary depending on which connector is installed.

-   **Federated** - search results will appear when using the Gmail app directly "app:gmail *insert your query here*" or utilize the source filter on the search results page in the Glean UI

**API Usage**

-   **Standard API**: Glean uses Gmail's standard API to request federated search, index, and ingest all data depending on which Gmail connector is installed.

**Integration Features**

-   **Content Captured**: Glean captures only the text in the email for the past 90 days, not the attachments
-   **Permissions Enforcement**: Glean respects all user access permissions, ensuring users only see search results for documents they have access to. When a user clicks on a search result, they are taken to the Gmail web application, which enforces the permission

### Versions Supported[​](#versions-supported "Direct link to Versions Supported")

There are no specific version limitations of the GMail Tools and Add-on connectors.

### Objects Supported[​](#objects-supported "Direct link to Objects Supported")

The GDrive connector supports the following objects:

-   **Gmail (Google Tools)** is a federated search of Gmail inboxes and calendars therefore all objects Google supports will be returned in search results.
-   **Gmail Add-on** - Indexes text from email in the last 90 days only and no attachments

## Authentication Mechanism[​](#authentication-mechanism "Direct link to Authentication Mechanism")

### Connector credentials requirements[​](#connector-credentials-requirements "Direct link to Connector credentials requirements")

The Google Drive connector for Glean requires specific permissions to function correctly:

-   Glean requires authentication to GDrive instance and the Glean GDrive connector in order to fetch relevant information as a baseline for Gmail (Google Tools) connector and then Gmail Add-on
-   Authentication is done through the existing Service Account used for GDrive, however expanded scopes are required (see below for more details)
-   Glean understands all user access permissions and strictly enforces them at the time of the query, ensuring that users cannot see results to which they do not have access.
-   It's important to note that all data is stored in the customer's project in the customer's cloud account and no data leaves the customer's environment.
-   Glean only requires READ-level permissions except during setup

To use Google's API, the Glean service account needs to impersonate a user with certain privileges via [domain-wide delegation](https://knowledge.workspace.google.com/admin/apps/control-api-access-with-domain-wide-delegation). This can be the Super Admin performing this setup, or a custom admin role with the required privileges can be created and assigned to a different Google Workspace user (this can be an existing user or a new user created for this purpose).

**NOTE:** Super Admin privileges are not required for the Glean service account but only to set up the Glean roles for it.

**NOTE:** For more information on Google domain-wide delegation, please see the GDrive connector documentation

### Connection instructions[​](#connection-instructions "Direct link to Connection instructions")

**NOTE:** Please ensure the requirements are met before starting the Gmail (GoogleTools) and Gmail Add-on Connectors.

-   Glean GDrive connector must be installed and working properly
-   Gmail (GoogleTools) must be installed and working properly before installing the Gmail Add-on connector

### Gmail Google Tools[​](#gmail-google-tools "Direct link to Gmail Google Tools")

1.  Go to the [Domain-wide Delegation section in Google Admin Console](https://admin.google.com/ac/owl/domainwidedelegation). You must be signed in as a Super admin.
2.  Click Add new and paste the 21-digit Unique ID from below into the Client ID field (provided in Glean app)

**Note:** if you have already connected Google Drive with this same Client ID, you should instead click 'Edit' on the existing API client and then add the additional scopes below.

1.  Copy and paste the following into the **OAuth scopes (comma-delimited)** field and then click **Authorize**

1.  Once completed, click **Save**

### Authentication scope requirements[​](#authentication-scope-requirements "Direct link to Authentication scope requirements")

| Scope | Purpose | Additional Notes |
| --- | --- | --- |
| [https://www.googleapis.com/auth/calendar.readonly](https://www.googleapis.com/auth/calendar.readonly) | Read-only access to the calendar |  |
| [https://www.googleapis.com/auth/gmail.readonly](https://www.googleapis.com/auth/gmail.readonly) | Read-only access to Gmail |  |

### Known limitations[​](#known-limitations "Direct link to Known limitations")

By default, Glean will index the following content:

-   The entire email thread for emails that a user has interacted (sent or replied to) within the last 90 days

Limitations:

-   Only the text content of the email thread will be crawled. The attachments included in the email thread will not be crawled
-   We limit our indexing to 6k email threads/30 days. If users reach this limit, we will not index additional emails in that time period.

Email Deletion:

-   If a user deletes an email, we will also delete the associated email thread in the Glean corpus.
-   Similarly, emails that have been filtered as spam will not be indexed, even if the user has previously interacted with it. If the user marks an email as spam after Glean has crawled it, we will delete the associated email after receiving the associated webhook/performing the next incremental crawl.

### Update frequency[​](#update-frequency "Direct link to Update frequency")

Content updates for Gmail (Google Tools) connector are immediate because it is a federated search. For the Gmail Add-on Connector, updates in Glean can happen quite rapidly, depending on the type of update and the configuration settings. Here are the key areas:

For the most up-to-date crawler refresh information, please refer to [Crawling frequency](/connectors/crawling-refresh-rates)

## Content Configuration[​](#content-configuration "Direct link to Content Configuration")

If green listing options are enabled, only content from the inclusion content will be indexed. If exclusion options are enabled all content in the exclusion will be removed. If both rules are applied to the same piece of content, then the content will NOT be indexed as the exclusion rule takes priority

The rules below should be used MINIMALLY to preserve the enterprise search experience, as most end-users expect to find all content. Most customers do not apply any rules, or apply red listing rules sparingly for sensitive folders

**Note:** Inclusion/Exclusion rules from Gmail (Google Tools) are imported from GDrive connector settings

### Inclusion Options[​](#inclusion-options "Direct link to Inclusion Options")

Glean provides the ability to explicitly only index specified members in Google Groups. To add the Google Groups, please enter the Google Groups in a comma-separated list.

### Exclusion Options[​](#exclusion-options "Direct link to Exclusion Options")

Glean provides the ability to restrict or exclude members in Google Groups from being crawled including emails sent to a Google Group. An example of an exclusion could be [legal@glean.com](mailto:legal@glean.com). To add the Google Groups, please enter the Google Groups in a comma-separated list.
