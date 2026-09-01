---
url: "https://docs.glean.com/release-notes/releases/2025-06-04-june-release"
canonical: "https://docs.glean.com/release-notes/releases/2025-06-04-june-release"
title: "June 4, 2025"
description: "Glean release notes for admins and end users"
fetched_at: "2026-09-01T13:29:51.561Z"
---
On this page

## User Features[​](#user-features "Direct link to User Features")

#### Highlight text and revise, explain, or summarize content anywhere with the Glean companion for the browser extension[​](#highlight-text-and-revise-explain-or-summarize-content-anywhere-with-the-glean-companion-for-the-browser-extension "Direct link to Highlight text and revise, explain, or summarize content anywhere with the Glean companion for the browser extension")

The Glean companion is a floating widget that contextualizes any text the user highlights on their screen, enabling them to instantaneously access company knowledge and insights wherever they work. Users can ask the companion to explain highlighted text, find relevant documents, summarize writing, and more without navigating away from the document or application they are working in.

**How to access:** Glean companion is accessible by downloading the Glean browser extension. For troubleshooting, please contact your Glean representative.

[Learn more](/user-guide/apps/glean-companion)

Extension *FR-3300*

## Admin Features[​](#admin-features "Direct link to Admin Features")

#### Create Jira Service Management tickets from within Slack[​](#create-jira-service-management-tickets-from-within-slack "Direct link to Create Jira Service Management tickets from within Slack")

Automate IT support with Glean's ability to create Jira Service Management tickets directly from Slack, streamlining ticket resolution and improving overall efficiency.

**How to access:** Admins need to enable the Jira action pack, and add the Jira create request action to an app to use this feature.

[Learn more](https://help.glean.com/en/articles/10025881-jira-actions)

Actions *FR-2029*

* * *

#### Export to CSV option for Admin-facing insights (GCP Only)[​](#export-to-csv-option-for-admin-facing-insights-gcp-only "Direct link to Export to CSV option for Admin-facing insights (GCP Only)")

Our new Insights Overview page will now have an export to CSV functionality that was available previously for downloading a snapshot of usage at a user level.

Insights *FR-3476*

* * *

#### Wiz sensor support for AWS[​](#wiz-sensor-support-for-aws "Direct link to Wiz sensor support for AWS")

Customers using AWS can deploy Wiz sensors on their compute resources, particularly for EC2 instances and EKS nodes. This enables Wiz to monitor Glean deployments, enhancing security.

**How to access:** Please reach out to your account team for help enabling this feature.

[Learn more](/security/cloud-prem/aws/wiz-sensor#general-setup-details)

Observability *FR-3462*

* * *

#### Content hide and unhide APIs for sensitive content protection[​](#content-hide-and-unhide-apis-for-sensitive-content-protection "Direct link to Content hide and unhide APIs for sensitive content protection")

The ability to hide or unhide sensitive documents from being accessed within Glean using APIs. These APIs empower administrators to programmatically control document visibility, ensuring compliance with data governance policies and reducing the risk of accidental data exposure.

[Learn more](https://developers.glean.com/api/client-api/governance/overview)

Security *FR-3380*

* * *

#### Create and manage weekly or continuous policies for sensitive data using developer APIs[​](#create-and-manage-weekly-or-continuous-policies-for-sensitive-data-using-developer-apis "Direct link to Create and manage weekly or continuous policies for sensitive data using developer APIs")

Sensitive insights(ie: dashboards) run weekly or continuously to identify and automatically hide sensitive data from within Glean. The sensitive insights APIs enable organizations to automate the detection of sensitive data and integrate it with downstream processing systems to enhance governance capabilities.

**How to access:** Please reach out to your account executive team to learn more about sensitive insights APIs and Glean Protect+.

[Learn more](https://developers.glean.com/api/client-api/governance/overview)

Security *FR-3379*

* * *

#### Enable the deletion of data sources from the admin console[​](#enable-the-deletion-of-data-sources-from-the-admin-console "Direct link to Enable the deletion of data sources from the admin console")

Glean provides the ability to delete data sources directly from within the admin console. When a data source is deleted, all of the data is also deleted from Glean indexes.

Workspace Settings *FR-3353*
