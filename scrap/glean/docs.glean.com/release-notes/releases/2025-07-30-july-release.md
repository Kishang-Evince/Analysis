---
url: "https://docs.glean.com/release-notes/releases/2025-07-30-july-release"
canonical: "https://docs.glean.com/release-notes/releases/2025-07-30-july-release"
title: "July 30, 2025"
description: "Glean release notes for admins and end users"
fetched_at: "2026-09-01T13:29:52.052Z"
---
On this page

## User Features[​](#user-features "Direct link to User Features")

#### Snowflake actions include SQL validation, semantic views, and custom role support[​](#snowflake-actions-include-sql-validation-semantic-views-and-custom-role-support "Direct link to Snowflake actions include SQL validation, semantic views, and custom role support")

Snowflake Actions now feature enhanced SQL query validation, support for querying both semantic views and semantic model files, and more flexible permission management by allowing any custom Snowflake role to be specified in setup.

**How to access:** Administrators must enable for your organization.

[Learn more](/tools/connector/snowflake/snowflake-index)

Actions *FR-3690*

* * *

#### Debug Mode for Agent Creation[​](#debug-mode-for-agent-creation "Direct link to Debug Mode for Agent Creation")

Agent builders can now use the debug mode when they are building and previewing agents with Glean. The debug mode shows which steps were run and the input and output for each step, allowing agent builders to rapidly build, debug and iterate on agent creation

**How to access:** Administrators must enable for your organization.

[Learn more](/agents/create-agents/debug-agent)

Agents *FR-3659*

* * *

#### Agentic reasoning engine update for 'Plan and Execute' step in Glean Agents[​](#agentic-reasoning-engine-update-for-plan-and-execute-step-in-glean-agents "Direct link to Agentic reasoning engine update for 'Plan and Execute' step in Glean Agents")

This update includes quality optimizations that improve response completeness, context handling, and enhance instruction-following within the ‘Plan and Execute’ agent step.

Agents *FR-3789*

* * *

#### Answer boards are migrating to collections[​](#answer-boards-are-migrating-to-collections "Direct link to Answer boards are migrating to collections")

All existing answer boards will be migrated to collections using the same name. Your answers—and their permissions—will be fully preserved in the new collection. We will no longer be supporting answer boards moving forward.

[Learn more](/user-guide/knowledge/answers/answer-boards-migration)

Answers *FR-3555*

* * *

#### Design updates to improve Glean Assistant experience[​](#design-updates-to-improve-glean-assistant-experience "Direct link to Design updates to improve Glean Assistant experience")

Glean Assistant design changes improve the user experience with Chat, intermediate steps, and citations.

Chat interface improvements include a lightweight chat-bubble to make the experience more conversational.

Intermediate steps will now appear in a collapsed UI, without the previously prominent steps with borders. This allows users to see more of the actual chat response and remove unnecessary visual clutter.

Citations user experience has been improved to focus on clarity including:

Clustering citations when there are more than three cited sources.Scrollable citation previews for easier navigation.“View sources” option is hidden when no sources are explicitly cited.Removed unused sources from citation drawerAdditional polish and refinements to improve overall citation presentation.

**How to access:** Note: These changes were previously available via admin preview and may have already been enabled by your administrator.

Assistant *FR-3665*

* * *

#### S3 connector for GCP deployments[​](#s3-connector-for-gcp-deployments "Direct link to S3 connector for GCP deployments")

The S3 connector (GCP platform) enables customers to index text-based documents from their S3 buckets into their Glean instance.

**How to access:** Administrators must enable for your organization.

[Learn more](/connectors/native/s3/)

Connectors *FR-1436*

* * *

#### S3 connector for AWS deployments[​](#s3-connector-for-aws-deployments "Direct link to S3 connector for AWS deployments")

The S3 connector for AWS lets customers index text-based documents from their S3 buckets into Glean.

**How to access:** Administrators must enable for your organization.

[Learn more](/connectors/native/s3/)

Connectors *FR-2848*

* * *

#### Glean browser extension sidebar support for unindexed pages[​](#glean-browser-extension-sidebar-support-for-unindexed-pages "Direct link to Glean browser extension sidebar support for unindexed pages")

Use the new extension sidebar on unindexed pages, including summarization, Doc Q&A, and any other chat features. The extension will automatically contextualize the page's contents even when the document is not within your company index.

[Learn more](/user-guide/apps/extension-sidebar)

Glean Extension *FR-3301*

* * *

#### Analyze images, PDFs, presentations, and specific pages with screenshots in extension sidebar[​](#analyze-images-pdfs-presentations-and-specific-pages-with-screenshots-in-extension-sidebar "Direct link to Analyze images, PDFs, presentations, and specific pages with screenshots in extension sidebar")

Users can now capture screenshots directly from the extension sidebar to include visual content in their chat sessions. This enables analysis of images, PDFs, presentations, and specific page sections that weren't previously accessible through text-only capture.

[Learn more](/user-guide/apps/extension-sidebar)

Glean Extension *FR-3303*

## Admin Features[​](#admin-features "Direct link to Admin Features")

#### Support for OpenAI as a web search provider for Glean key customers[​](#support-for-openai-as-a-web-search-provider-for-glean-key-customers "Direct link to Support for OpenAI as a web search provider for Glean key customers")

Support for a managed OpenAI web search is now available to key Glean customers as an action pack, powering world knowledge mode in Assistant and web search in Agents. When enabled, Glean will leverage OpenAI web search directly via OpenAI and not via Azure. Customer data is not used by OpenAI for training its models and data sent to OpenAI is not retained by OpenAI

[Learn more](/administration/tools/setup-tools/web-search-tools-setup)

Actions *FR-3726*

* * *

#### Revamped overview and department level Insights (AWS Only)[​](#revamped-overview-and-department-level-insights--aws-only "Direct link to Revamped overview and department level Insights  (AWS Only)")

The Insights page now has an “Overview” tab with key usage metrics of Glean Search, Assistant and data sources. A new “Departments” tab shows department-level usage. These features, once limited to GCP customers, are extending to AWS customers.

Admin Capabilities *FR-3447*

* * *

#### Check the last crawl time of a document based on its URL[​](#check-the-last-crawl-time-of-a-document-based-on-its-url "Direct link to Check the last crawl time of a document based on its URL")

Admins can now use the access verification tab in Protect to enter a document URL or ID and view its last crawled time, last indexed time, visibility, and check user-specific access permissions.

Admin Capabilities *FR-3576*

* * *

#### Insights now display only users who have signed up for Glean[​](#insights-now-display-only-users-who-have-signed-up-for-glean "Direct link to Insights now display only users who have signed up for Glean")

The “All users” view on the Overview page of Insights now only includes people who have actually signed up for Glean, instead of everyone in your organization. This makes it easier for admins to see meaningful data and avoids confusion from showing users with no activity who never joined Glean.

[Learn more](/administration/insights/overview#6-why-was-all-users-moved-to-signed-up-users)

Admin Capabilities *FR-3719*

* * *

#### Admins can download backups of existing prompts and apps[​](#admins-can-download-backups-of-existing-prompts-and-apps "Direct link to Admins can download backups of existing prompts and apps")

From Agents section of the admin console, admins will now be able to download backup copies of their existing simple prompts and apps.

[Learn more](/release-notes/sunset/migrating-prompts-apps)

Agents *FR-3651*

* * *

#### Support for Brave for web search[​](#support-for-brave-for-web-search "Direct link to Support for Brave for web search")

Glean adds the ability to use Brave, a search engine that emphasizes user privacy and has zero data retention, for world knowledge. Brave is available as an action pack and can be enabled in Assistant and/or Agents.

[Learn more](/administration/tools/setup-tools/web-search-tools-setup)

Assistant *FR-3612*

* * *

#### Introduction of knowledge graph concepts in Glean Chat to improve Chat quality[​](#introduction-of-knowledge-graph-concepts-in-glean-chat-to-improve-chat-quality "Direct link to Introduction of knowledge graph concepts in Glean Chat to improve Chat quality")

Glean Chat now leverages knowledge graph concepts to deliver more accurate, contextual answers. It better selects tools like Code Search when appropriate and pulls more relevant context, resulting in smarter, more targeted responses.

[Learn more](/security/knowledge-graph)

Assistant *FR-3630*

* * *

#### Enhancements to agentic reasoning engine planning drive Assistant performance gains (Glean Key)[​](#enhancements-to-agentic-reasoning-engine-planning-drive-assistant-performance-gains-glean-key "Direct link to Enhancements to agentic reasoning engine planning drive Assistant performance gains (Glean Key)")

Advancements in the planning aspect of our agentic reasoning engine architecture have improved the quality of complex queries in Assistant. Overall, queries have seen a 1.1% improvement in completeness and approximately 3% improvement in correctness. These performance enhancements come with a 30% increase in latency at p25 and a 13% increase at p50.

Assistant *FR-3718*

* * *

#### Support for Claude 4 in Glean Assistant[​](#support-for-claude-4-in-glean-assistant "Direct link to Support for Claude 4 in Glean Assistant")

Glean now supports Claude 4 for use with Glean Assistant.

[Learn more](/administration/llms)

Assistant *FR-3760*

* * *

#### Reduce citations formatting errors in Gemini and Claude[​](#reduce-citations-formatting-errors-in-gemini-and-claude "Direct link to Reduce citations formatting errors in Gemini and Claude")

Citations formatting errors when leveraging Gemini models with Glean have been reduced by 50-80% bringing error rate in the 1-2% range. Citations formatting errors when leveraging Claude models with Glean have been reduced by 20-50% bringing error rate in the 4-6% range.

Assistant *FR-3773*

* * *

#### Support for Wiz sensor in GCP deployments[​](#support-for-wiz-sensor-in-gcp-deployments "Direct link to Support for Wiz sensor in GCP deployments")

Customers using GCP can deploy Wiz sensors on their compute resources, particularly for GCE instances and GKE nodes. This enables Wiz to monitor Glean deployments, enhancing security.

**How to access:** Please reach out to your account team for help enabling this feature.

[Learn more](/security/cloud-prem/gcp/wiz-sensor)

Platform Capabilities *FR-3687*

* * *

#### Manage hidden content in a centralized dashboard[​](#manage-hidden-content-in-a-centralized-dashboard "Direct link to Manage hidden content in a centralized dashboard")

Content hiding in Glean allows users to manage document visibility by hiding specific documents—manually or via CSV—so they are excluded from search. Glean is now adding the capability to track, review, and unhide content through a centralized interface.

**How to access:** Available only to sensitive content moderator or superadmin role.

[Learn more](/administration/search/hiding-content#managing-hidden-documents)

Protect *FR-3512*
