---
url: "https://docs.glean.com/release-notes/releases/2025-07-02-july-release"
canonical: "https://docs.glean.com/release-notes/releases/2025-07-02-july-release"
title: "July 2, 2025"
description: "Glean release notes for admins and end users"
fetched_at: "2026-09-01T13:29:51.756Z"
---
On this page

## User Features[​](#user-features "Direct link to User Features")

#### New action to deliver agent results to your email inbox[​](#new-action-to-deliver-agent-results-to-your-email-inbox "Direct link to New action to deliver agent results to your email inbox")

The “Send email from Glean” action lets Agents automatically email their output-text, tables, links, etc.-directly to the user who ran or subscribed to the agent (ie: send me a daily email summary of action items).

**How to access:** Administrators must enable for your organization.

1.  Go to Platforms > Actions in Glean.
    
2.  Click on “Add” and select “Email automation” action pack
    
3.  Update your Publish Settings to include new action in Google pack.
    

[Learn more](/tools/connector/google)

Actions *FR-3235*

* * *

#### Create Go Links on unindexed pages from extension sidebar[​](#create-go-links-on-unindexed-pages-from-extension-sidebar "Direct link to Create Go Links on unindexed pages from extension sidebar")

Glean has added the ability to create Go Links on any page a user is working in, even if the page does not contain an indexed document.

**How to access:** Open the extension sidebar, and navigate to the “Layers” icon in the sidebar sticky tab then create a name for your Go Link in the input field.

[Learn more](/user-guide/apps/extension-sidebar)

Glean Everywhere *FR-3590*

## Admin Features[​](#admin-features "Direct link to Admin Features")

#### AWS WAF default blocking for Linux and Unix rule set[​](#aws-waf-default-blocking-for-linux-and-unix-rule-set "Direct link to AWS WAF default blocking for Linux and Unix rule set")

Glean has been working on improving the security of our AWS deployments. We are rolling out AWS WAF controls for all our AWS customers that have been tested and will harden the security of the Glean deployment.

In this release, we are enabling by default the AWS Managed Rule Groups for Linux and Unix rules.

You don't need to do anything at all. If you do not want to opt-in for any reason, please let us know and we will opt you out.

**How to access:** Customers are opted in by default. Please reach out to your account team if you wish to be opted out.

[Learn more](/security/cloud-prem/aws/aws-waf)

WAF *FR-3572*

* * *

#### AWS WAF default blocking for SQL injection rule set[​](#aws-waf-default-blocking-for-sql-injection-rule-set "Direct link to AWS WAF default blocking for SQL injection rule set")

Glean has been working on improving the security of our AWS deployments. We are rolling out AWS WAF controls for all our AWS customers that have been tested and will harden the security of the Glean deployment.

In this release, we are enabling by default the AWS Managed Rule Groups for SQL Injection rules.

**How to access:** Customers are opted in by default. Please reach out to your account team if you wish to be opted out.

[Learn more](/security/cloud-prem/aws/aws-waf)

WAF *FR-3573*

* * *

#### Logging of data source configuration changes in the admin console[​](#logging-of-data-source-configuration-changes-in-the-admin-console "Direct link to Logging of data source configuration changes in the admin console")

Logging of changes to data source configurations will be made available in the admin console.

[Learn more](https://developers.glean.com/api-info/indexing/getting-started/setup-datasource)

Workspace Settings *FR-3298*
