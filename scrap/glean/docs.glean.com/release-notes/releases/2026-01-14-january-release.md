---
url: "https://docs.glean.com/release-notes/releases/2026-01-14-january-release"
canonical: "https://docs.glean.com/release-notes/releases/2026-01-14-january-release"
title: "January 14, 2026"
description: "Glean release notes for admins and end users"
fetched_at: "2026-09-01T13:29:53.260Z"
---
On this page

## User Features[​](#user-features "Direct link to User Features")

#### Code Writer: In Assistant, Slack and Agent actions[​](#code-writer-in-assistant-slack-and-agent-actions "Direct link to Code Writer: In Assistant, Slack and Agent actions")

Code Writer is an AI-powered code action in Assistant and Glean Agents that edits code and opens draft PRs end‑to‑end, built with enterprise‑grade security and controls. It’s ideal for small features, refactors, tests, and docs, and can be triggered from Assistant, Agents, or Slack.

**How to access:** Administrators must enable for your organization. Available for GCP and AWS customers using GitHub

This feature may use credits. Learn more in Glean's Help Center.

[Learn more](/administration/assistant/features/code-writer)

Actions *ROAD-785*

* * *

#### Run Deep Research in existing chat conversations[​](#run-deep-research-in-existing-chat-conversations "Direct link to Run Deep Research in existing chat conversations")

Glean Assistant users can now run Deep Research in a pre-existing conversation, rather than only at the beginning of a brand new one. When a user's query would benefit from deeper, multi-source synthesis, they can now follow up in Deep Research mode. This makes it easier to discover and benefit from Deep Research, helping users access more comprehensive, citation-rich analysis directly when needed and improving satisfaction and outcomes for complex research tasks.

To learn more about Deep Research pricing for flex credits, please visit our pricing documentation: \[/glean-enterprise-flex-pricing|/glean-enterprise-flex-pricing\].

**How to access:** Administrators must enable for your organization. Administrators can enable via self-serve in the Admin Console (Assistant → Deep Research) for all users or specific users.

This feature may use credits. Learn more in Glean's Help Center.

[Learn more](/user-guide/assistant/deep-research)

Assistant *ROAD-1072*

* * *

#### Glean in Webex[​](#glean-in-webex "Direct link to Glean in Webex")

Glean is now embedded within Webex through the Cisco AI Assistant in the Webex ecosystem. Users can query Glean directly from within Webex-whether in meetings, messaging, or elsewhere-to discover knowledge and boost productivity. This integration enables seamless access to your connected Glean instance, helping you find information and get work done without leaving Webex.

**How to access:** Administrators must enable for your organization.

[Learn more](/administration/platform/embedded-integrations/glean-in-webex)

Embedded Integrations *ROAD-986*

* * *

#### Zoom: participant access for cloud recordings[​](#zoom-participant-access-for-cloud-recordings "Direct link to Zoom: participant access for cloud recordings")

Glean now allows access for cloud recording transcripts to participants and invitees of a meeting. Previously, only meeting organizers could access Zoom meeting transcripts in Glean. With this update, Glean will surface transcripts to users who have access to recordings via glean participant role OR individual role, making it easier for teams to find, search, and summarize meeting content directly in Glean.

[Learn more](/connectors/native/zoom/cloud-recording-perms)

Connectors *ROAD-1010*

## Admin Features[​](#admin-features "Direct link to Admin Features")

#### Improving metric granularity on Overview page of Insights[​](#improving-metric-granularity-on-overview-page-of-insights "Direct link to Improving metric granularity on Overview page of Insights")

We're bringing in upgrades to the overall usage-related metrics reported on the Insights Overview page.

[Learn more](/administration/insights/overview#accessing-the-insights-page)

Admin Capabilities *ROAD-1050*

* * *

#### Configure actions during data source setup - Expand to all eligible datasources[​](#configure-actions-during-data-source-setup---expand-to-all-eligible-datasources "Direct link to Configure actions during data source setup - Expand to all eligible datasources")

Access and configure actions directly from the data source setup flow via clear “Go to setup” links. This new experience introduces an optional Actions step in the datasource setup UI, making it easier for admins to discover and enable relevant pre-built actions and (soon) MCP tools for select apps-all while configuring the datasource, without context switching. With this latest update, the combined setup is supported for all actions - Google, Microsoft, Salesforce, Jira, etc.

[Learn more](/connectors/configure-tools-in-connector/config-tools-mcp-from-connector)

Admin Capabilities *ROAD-1037*

* * *

#### Display indexing status in the admin console[​](#display-indexing-status-in-the-admin-console "Direct link to Display indexing status in the admin console")

Admins can now view the indexing status of all connected data sources directly in the Glean admin console. This enhancement provides clear visibility into which data sources are fully indexed and which are still in progress, helping admins monitor the health of their deployment and ensure that content is discoverable as expected. With this update, admins can quickly identify and address any issues that may impact search completeness or data freshness.

**How to access:** To view the indexing status for your data sources: Go to the Glean Admin Console and navigate to the Data sources section. The table of configured apps will display the progress of each crawl, including the number of documents indexed and any errors encountered. You can monitor crawl and indexing status at any time to ensure your data sources are up to date and troubleshoot as needed.

[Learn more](/get-started/review/crawling-and-learning)

Admin Capabilities *ROAD-848*

* * *

#### Native connectors that are hybrid are configured in data sources in the admin console[​](#native-connectors-that-are-hybrid-are-configured-in-data-sources-in-the-admin-console "Direct link to Native connectors that are hybrid are configured in data sources in the admin console")

Native connectors that are hybrid-combining indexed and federated access-are configured in the Admin Console under the Data sources tab. From there, you can now manage Confluence Cloud access to both indexed and federated data.

[Learn more](/connectors/native/confluence/)

Admin Capabilities *ROAD-846*

* * *

#### Improvements to answer quality for multi-modal PDF uploads in Assistant (AWS)[​](#improvements-to-answer-quality-for-multi-modal-pdf-uploads-in-assistant-aws "Direct link to Improvements to answer quality for multi-modal PDF uploads in Assistant (AWS)")

Now available for customers on AWS, Glean has significantly improved the quality of answers related to PDF documents that are referenced in Glean assistant via uploading files, tagging documents in chat, mentioning a document by @ mention, pasting URLs. The quality improvements also apply to multi-modal PDF documents that include images. This feature was previously released for customers on GCP.

**How to access:** To experience the improved quality, admins need to enable the AWS Bedrock model amazon.titan-embed-image-v1 in the us-west-2 region via the AWS Management Console. To do this, log in to the AWS Console, navigate to the Bedrock service, select the us-west-2 region from the region selector, locate the amazon.titan-embed-image-v1 model in the list of available models, and enable it for your account. Once enabled, the model will be available for use in your Bedrock applications.

[Learn more](/user-guide/about/end-user-quick-start-guide)

Assistant *ROAD-742*

* * *

#### Simpplr Connector (AWS Version)[​](#simpplr-connector-aws-version "Direct link to Simpplr Connector (AWS Version)")

Glean now offers an all-new Simpplr connector built specifically for Simpplr’s AWS platform. As Simpplr transitions all customers from Salesforce to AWS, this connector ensures your organization can seamlessly index and search core Simpplr content-Pages, Sites, and Events-within Glean. The connector honors granular Simpplr permissions, supports efficient incremental crawls, and delivers a streamlined intranet search experience throughout and after your Simpplr platform migration.

[Learn more](/connectors/native/simpplr/)

Connectors *ROAD-423*

* * *

#### Adjust info types thresholds for better defaults in sensitive findings[​](#adjust-info-types-thresholds-for-better-defaults-in-sensitive-findings "Direct link to Adjust info types thresholds for better defaults in sensitive findings")

Admins can now customize the detection threshold (likelihood) for each info type in Glean Protect+ sensitive findings policies and reports. This enhancement provides more granular control over data loss prevention (DLP) results, helping organizations balance coverage and accuracy for sensitive data detection. Improved default values for common info types reduce false negatives and make it easier to surface relevant findings, increasing the reliability and transparency of DLP for diverse environments.

**How to access:** Glean Admin Console and navigate to Protect → Sensitive findings.

[Learn more](/administration/protect/sensitive-findings/manage-policies#create-a-policy)

Protect *ROAD-973*
