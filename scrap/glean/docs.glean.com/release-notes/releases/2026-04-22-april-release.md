---
url: "https://docs.glean.com/release-notes/releases/2026-04-22-april-release"
canonical: "https://docs.glean.com/release-notes/releases/2026-04-22-april-release"
title: "April 22, 2026"
description: "Glean release notes for admins and end users"
fetched_at: "2026-09-01T13:29:53.819Z"
---
On this page

## User Features[​](#user-features "Direct link to User Features")

#### One click install of Glean's remote MCP server to claude code, cursor, desktop apps[​](#one-click-install-of-gleans-remote-mcp-server-to-claude-code-cursor-desktop-apps "Direct link to One click install of Glean's remote MCP server to claude code, cursor, desktop apps")

Use your MDM provider (Jamf, Kandji, Intune) to configure Glean's remote MCP server on your desktop apps (Claude Code, Codex, Cursor, Gemini CLI, Goose, JetBrains AI assistant, Visual Studio Code, Windsurf).

**How to access:** Admins can now deploy a Glean MCP remote server to user devices through their organization's MDM server, so users do not need to manually set up Glean MCP themselves.

[Learn more](https://docs.glean.com/administration/platform/mcp/mdm-mcp)

Admin Capabilities *ROAD-1123*

* * *

#### Claude Opus 4.7 in Assistant and Agents[​](#claude-opus-47-in-assistant-and-agents "Direct link to Claude Opus 4.7 in Assistant and Agents")

Opus 4.7 is now available in Glean Assistant and Agents! This feature may be subject to usage-based pricing. Learn more in Glean's Help Center.

[Learn more](https://docs.glean.com/)

Agents *ROAD-1296*

* * *

#### Glean Assistant can create Google Slides presentations[​](#glean-assistant-can-create-google-slides-presentations "Direct link to Glean Assistant can create Google Slides presentations")

Glean Assistant can now generate full slide decks with day zero support for Google Slides presentations directly from prompts. Ask Assistant to create a slide deck on any topic, and it will automatically use your company's approved template to maintain consistent branding and formatting across all presentations. Available for Glean Key and Customer Key. Admins must add their company slide template to the admin console via Console > Assistant > Settings > Slide deck generation > upload template. This feature may be subject to usage-based pricing. Learn more in Glean's Help Center.

**How to access:** Admins must enable Google slide generation via the Admin console for admins or all users, and upload a company template.

[Learn more](https://docs.glean.com/user-guide/assistant/slide-generation)

Assistant *ROAD-1272*

* * *

#### View changes between versions of your documents, emails, and messages[​](#view-changes-between-versions-of-your-documents-emails-and-messages "Direct link to View changes between versions of your documents, emails, and messages")

You can now see exactly what changed between versions of a document, email, or message generated in Glean Assistant. When you ask the assistant to revise an artifact, the diff view highlights additions, deletions, and edits inline — so you can review changes at a glance instead of re-reading the whole thing. Whether you are iterating on a customer email, refining a proposal, or editing a team update, diffs make every revision transparent and easy to approve.

[Learn more](https://docs.glean.com/user-guide/assistant/glean-chat/canvas)

Assistant *ROAD-1305*

* * *

#### Experience refreshed progress updates[​](#experience-refreshed-progress-updates "Direct link to Experience refreshed progress updates")

We've improved the intermediate steps experience in Assistant so it's easier to scan tool execution and reasoning while a task is running. This makes progress clearer, helps users better understand what Assistant is doing, and creates a more polished overall experience.

**How to access:** The intermediate steps automatically invoke for queries in assistant.

[Learn more](https://docs.glean.com/user-guide/assistant/glean-chat/)

Assistant *ROAD-1294*

* * *

#### Ask clarifying questions in Glean Assistant[​](#ask-clarifying-questions-in-glean-assistant "Direct link to Ask clarifying questions in Glean Assistant")

Glean Assistant can now ask concise, contextual clarifying questions when a request is ambiguous or under-specified, helping it choose the right path before taking action. This improves first-pass quality, reduces wasted work caused by incorrect assumptions, and makes Assistant feel more collaborative on multi-step tasks.

**How to access:** Clarifying Questions activate automatically for Glean Assistant.

[Learn more](https://docs.glean.com/user-guide/assistant/glean-chat/clarifying-questions)

Assistant *ROAD-1269*

* * *

#### MCP Apps Extension support in Glean Assistant[​](#mcp-apps-extension-support-in-glean-assistant "Direct link to MCP Apps Extension support in Glean Assistant")

You can now bring your favorite applications right into Glean with MCP App Extensions. Glean acts as an MCP app host, so when an MCP server returns a UI resource, the app can render directly inside the chat experience as an interactive widget.

That means users can interact with dashboards, forms, approval flows, and data visualizations natively in Glean—without switching tools or opening a separate window. All third-party UI runs in a secure, sandboxed environment with enforced content security policies, so you get a seamless experience without compromising safety. This feature may be subject to usage-based pricing. Learn more in Glean's Help Center.

[Learn more](https://docs.glean.com/administration/actions/connect-remote-mcp-servers-to-glean)

Assistant *ROAD-1234*

* * *

#### Salesforce object query filters in setup page[​](#salesforce-object-query-filters-in-setup-page "Direct link to Salesforce object query filters in setup page")

Admins can now add query filters to Salesforce objects directly in the Glean Admin Console, so you can control which Salesforce records are indexed without backend configuration changes. Filters support SOQL-style conditions and combine multiple rules with AND logic, so only records that match all configured conditions are indexed. This makes it easier to limit crawl scope, support compliance and data minimization needs, and manage Salesforce indexing in a more self-serve way.

**How to access:** In the Admin Console, go to Data sources → Salesforce → Objects, then add a new object or edit an existing one. Open Advanced options, select Add filter, choose the Salesforce field, operator, and value for each condition, then save your changes and run a crawl for the filters to take effect. Filters apply only to the object you configure, so if you need similar scoping on related objects, configure filters separately for each one.

[Learn more](https://docs.glean.com/connectors/native/salesforce/setup#query-filters)

Connectors *ROAD-1265*

* * *

#### Native search replacement in Atlassian's Confluence and Jira is moving to the browser extension[​](#native-search-replacement-in-atlassians-confluence-and-jira-is-moving-to-the-browser-extension "Direct link to Native search replacement in Atlassian's Confluence and Jira is moving to the browser extension")

Glean's Atlassian Native Search replacement previously available within Jira and Confluence will revert to Atlassian's native search capabilities over the coming weeks. However, users can still search from Atlassian pages with the Glean browser extension sidebar, which lets them leverage Glean search without leaving the browser or the Atlassian page. This change is being made due to low usage and the broader benefits and extensibility of the Glean extension.

[Learn more](https://docs.glean.com/user-guide/apps/installing-the-browser-extension)

Search *ROAD-1276*

## Admin Features[​](#admin-features "Direct link to Admin Features")

#### Glean now supports custom static & dynamic headers for MCP[​](#glean-now-supports-custom-static--dynamic-headers-for-mcp "Direct link to Glean now supports custom static & dynamic headers for MCP")

Glean now supports customer-specific custom HTTP headers for outbound requests to external MCP servers, making it easier to connect servers that require tenant-specific metadata, vendor-specific headers, or request-time identity context. Customers can configure any fixed static headers and dynamic headers for user email, user ID, and API key.

**How to access:** Reach out to your support representative with the list of headers you want to enable for MCPs and they can update your config.

[Learn more](/administration/tools/mcp-custom-headers)

Actions *ROAD-1306*

* * *

#### Simplified OAuth management for admins[​](#simplified-oauth-management-for-admins "Direct link to Simplified OAuth management for admins")

Admins can now manage OAuth settings in a clearer, more organized Third-party access page. The updated experience separates IDP-configured OAuth and the Glean OAuth Authorization Server into distinct views, making it easier to find the right settings and manage third-party access with more confidence.

**How to access:** Go to the Admin Console and open Settings → Third-party access (OAuth) to manage OAuth configuration. From there, admins can enable the Glean OAuth Authorization Server and create static OAuth clients with the redirect URIs and scopes needed for their internal or third-party applications. If you're using MCP, enable the OAuth authorization server first, then enable Glean MCP Servers under Platform → Glean MCP servers.

[Learn more](https://docs.glean.com/administration/oauth/oauth-overview)

Admin Capabilities *ROAD-1216*

* * *

#### Latency enhancements for Egnyte customers with multiple admin accounts[​](#latency-enhancements-for-egnyte-customers-with-multiple-admin-accounts "Direct link to Latency enhancements for Egnyte customers with multiple admin accounts")

Glean's Egnyte connector now supports multiple administrator authentications for a single Egnyte data source, so you can authorize more than one Egnyte admin account. Glean uses every active admin token during Egnyte crawls, which improves crawl throughput as you add admins while continuing to enforce Egnyte's native permissions. This helps large Egnyte deployments index content faster and keep more content fresh in Glean.

[Learn more](https://docs.glean.com/connectors/native/egnyte/#authorize-additional-admin-accounts)

Connectors *ROAD-1238*

* * *

#### OneDrive and SharePoint connector enhancements[​](#onedrive-and-sharepoint-connector-enhancements "Direct link to OneDrive and SharePoint connector enhancements")

Glean supports real-time search across Microsoft OneDrive and SharePoint, including Document Libraries, Sites, and Lists. The feature streamlines collaboration and ensures users can quickly find and use the most up-to-date documents across their Microsoft 365 environment.

**How to access:** Admins can turn on the feature in the Glean Admin Console. For OneDrive and SharePoint, setup requires registering an app in Azure, granting the necessary application permissions (including Sites.FullControl.All and Files.ReadWrite.All), and completing the configuration in Glean. Once enabled, users can paste OneDrive or SharePoint links into Assistant to fetch and interact with documents, provided they have access rights. For detailed setup steps, refer to the Glean Help Center documentation for OneDrive and SharePoint connectors.

[Learn more — OneDrive](/connectors/native/onedrive/real-time-access) | [Learn more — SharePoint](/connectors/native/sharepoint/real-time-access)

Connectors *ROAD-1141*

* * *

#### NetSuite connector[​](#netsuite-connector "Direct link to NetSuite connector")

Glean now offers a NetSuite connector, enabling organizations to securely search key financial and operational data from their NetSuite ERP. The connector supports high-value workflows such as viewing invoices, payment histories, unpaid invoices, and customer records directly within Glean. By making critical NetSuite data discoverable, teams can streamline finance, sales operations, and back-office processes, improving visibility and productivity across the business.

[Learn more](https://docs.glean.com/connectors/native/netsuite/home)

Connectors *ROAD-842*

* * *

#### Glean OAuth - Dynamic client registration[​](#glean-oauth---dynamic-client-registration "Direct link to Glean OAuth - Dynamic client registration")

Glean now supports a generally available OAuth authorization server for secure third-party access and MCP host connections. Admins can enable Dynamic Client Registration so supported MCP hosts can register at runtime, apply redirect URI restrictions for tighter control, and manage connected OAuth applications, including revocation, from the Admin Console. This makes it faster to connect approved tools to Glean while giving admins more visibility and control over access.

**How to access:** In the Admin Console, go to Settings > Third-party access (OAuth) and enable the Glean OAuth Authorization Server. If you want to control which dynamically registered apps can connect, open Manage settings, turn on Restrict Dynamic Clients by Redirect URI, and use either the Glean-managed list or your own static list of allowed redirect URI patterns. If you're using Glean MCP Servers, also go to Platform > Glean MCP servers and enable them there.

[Learn more](https://docs.glean.com/administration/oauth/dynamic-client-registration)

Developer Experience *ROAD-1205*

* * *

#### Restricted topics policies (acceptable use policies / topic guardrails) on user prompt for Assistant compliance[​](#restricted-topics-policies-acceptable-use-policies--topic-guardrails-on-user-prompt-for-assistant-compliance "Direct link to Restricted topics policies (acceptable use policies / topic guardrails) on user prompt for Assistant compliance")

Glean now enables organizations to enforce Acceptable Use Policies (AUP) at the user query level in Glean Assistant and Agents. Admins can define and centrally manage topic-based guardrails to block or flag user prompts on sensitive topics—such as performance reviews, disciplinary actions, compensation, and other HR-sensitive areas—ensuring compliance with internal policies and regulatory requirements. This feature helps reduce the risk of information leakage, supports adoption in regulated industries, and builds trust by preventing prohibited queries from being processed or answered, regardless of underlying data source permissions.

[Learn more](https://docs.glean.com/administration/protect/ai-security/restricted-topics)

Protect *ROAD-872*
