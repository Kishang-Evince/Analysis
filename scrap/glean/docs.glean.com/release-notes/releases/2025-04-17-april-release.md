---
url: "https://docs.glean.com/release-notes/releases/2025-04-17-april-release"
canonical: "https://docs.glean.com/release-notes/releases/2025-04-17-april-release"
title: "April 17, 2025"
description: "Glean release notes for admins and end users"
fetched_at: "2026-09-01T13:29:51.541Z"
---
On this page

## User Features[​](#user-features "Direct link to User Features")

#### Fast execution query path for information-seeking queries[​](#fast-execution-query-path-for-information-seeking-queries "Direct link to Fast execution query path for information-seeking queries")

Glean establishes an efficient execution pathway for straightforward information-seeking queries, while also providing an advanced planning mechanism to handle more complex queries effectively. With this architectural change, we expect information-seeking queries to experience lower latency.

Assistant *FR-2843*

* * *

#### Analyze multiple files in Glean Assistant[​](#analyze-multiple-files-in-glean-assistant "Direct link to Analyze multiple files in Glean Assistant")

Glean supports the analysis of multiple-file uploads of CSV, XLS/XLSX, and JSON formats in Assistant, 5 files up to 64MB each.

[Learn more](/administration/assistant/data-analysis/about-data-analysis)

Data analytics *FR-3195*

* * *

#### Voice-to-text support is available for Glean mobile users on Android[​](#voice-to-text-support-is-available-for-glean-mobile-users-on-android "Direct link to Voice-to-text support is available for Glean mobile users on Android")

Go hands-free with voice-to-text support for Android devices. The new speech-to-text feature lets you dictate questions and messages—no typing is required.

Mobile *FR-3186*

## Admin Features[​](#admin-features "Direct link to Admin Features")

#### Ability to enable new actions in existing action packs[​](#ability-to-enable-new-actions-in-existing-action-packs "Direct link to Ability to enable new actions in existing action packs")

New out of the box actions provided by Glean will now appear in existing action packs where relevant, and the admin will be prompted to enable these newly available actions.

Actions *FR-2922*

* * *

#### Glean key on Amazon Bedrock[​](#glean-key-on-amazon-bedrock "Direct link to Glean key on Amazon Bedrock")

Glean Key for Amazon Bedrock enables AWS customers to achieve consistent performance without the need to manage models directly. Additionally, it ensures enterprise data security by keeping models hosted within AWS.

Assistant *FR-2900*

* * *

#### Support for indexing Confluence attachments[​](#support-for-indexing-confluence-attachments "Direct link to Support for indexing Confluence attachments")

Glean will support the ability to index Confluence attachments.

Connectors *FR-1551*

* * *

#### Separate data source setup and management of Microsoft SharePoint and OneDrive[​](#separate-data-source-setup-and-management-of-microsoft-sharepoint-and-onedrive "Direct link to Separate data source setup and management of Microsoft SharePoint and OneDrive")

Glean separates data source setup and management of Microsoft OneDrive and SharePoint to allow for finer-grained controls, easier troubleshooting, and ability to manage each data source individually.

Connectors *FR-3160*

* * *

#### New Hubspot connector[​](#new-hubspot-connector "Direct link to New Hubspot connector")

Glean's Hubspot connector enables sales and services teams can get the insight to progress deals forward and resolve customer support issues. Glean indexes the following Hubspot content: contacts, deals, companies, tickets.

**How to access:** Please setup HubSpot via Glean admin console > data sources.

Connectors *FR-1026*

* * *

#### Improvements to the setup of Salesforce objects[​](#improvements-to-the-setup-of-salesforce-objects "Direct link to Improvements to the setup of Salesforce objects")

We are streamlining the additional objects self serve experience for Salesforce. This should make adding additional objects (standard + custom) to Salesforce a much smoother experience.

Connectors *FR-3263*
