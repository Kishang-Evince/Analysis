---
url: "https://docs.glean.com/administration/platform/embedded-integrations/slackbot/admin-guide/enable-public-mode"
canonical: "https://docs.glean.com/administration/platform/embedded-integrations/slackbot/admin-guide/enable-public-mode"
title: "Enable Public Mode"
description: "Share Glean's answers with everyone in a Slack channel thread."
fetched_at: "2026-09-01T13:29:11.881Z"
---
On this page

Public Mode allows Glean to share answers directly in Slack channel threads. When enabled, Glean's responses — whether triggered by a direct mention or detected proactively — are visible to all members of the channel. This ensures that high-value information is accessible to the entire team, reducing repetitive questions and centralizing knowledge.

Public Mode is on by default. When Glean in Slack is enabled, public replies are turned on automatically — but only in the channels allowed by your [rollout configuration](#enable-public-mode-for-glean-in-slack), never in channels you have excluded. You can review, restrict, or turn off Public Mode at any time using the steps below.

![Public mode](/img/administration/platform/embed-integrate/public-mode1.png)

## Before you begin[​](#before-you-begin "Direct link to Before you begin")

To use Public Mode in Slack channels, your organization must:

-   Set up the Slack connector and install the Glean app in your Slack workspace. See [Slack connector](/connectors/native/slack).
-   Enable Gleanbot to respond in Slack channels. For setup instructions, see [Configure bot responses in channels](/administration/platform/embedded-integrations/slackbot/admin-guide/configure-bot-responses).

## Enable Public Mode for Glean in Slack[​](#enable-public-mode-for-glean-in-slack "Direct link to Enable Public Mode for Glean in Slack")

Review and configure Public Mode for Glean Assistant in Slack, including how to restrict it to specific channels or turn it off. If you are configuring a Glean agent in Slack, see [Publishing to Slack](https://docs.glean.com/agents/concepts/publish-slack#option-c---visible-to-everyone-in-the-slack-channel).

In both cases, public replies use only broadly shared content. For agents, this content must also be included in the agent's configured [knowledge sources](https://docs.glean.com/agents/knowledge-source-types).

1.  In the **Glean Admin Console**, go to **Setup** > **Connectors**.
    
2.  Select your Slack instance and open the **Glean in Slack** tab.
    
3.  Under **Allow public replies in channels**, turn the setting on. This allows Glean to post responses that are visible to everyone in the channel.
    
4.  When you turn on **Allow public replies in channels**, **Reply to questions without being @mentioned** is enabled automatically.
    
5.  If you want Public Mode responses only when Glean is directly mentioned, turn off **Reply to questions without being @mentioned**.
    
    note
    
    If **Allow public replies in channels** is off, **Reply to questions without being @mentioned** is disabled.
    
6.  Under **Rollout configuration**, **All channels where Glean is active** is selected by default. If needed, restrict Public Mode to specific channels.
    
    note
    
    You can also control which connectors public replies draw from, not just which channels. See [Choose which connectors public replies can use](#choose-which-connectors-public-replies-can-use).
    
7.  Click **Save Changes** to apply your settings.
    
    ![Enable public mode](/img/administration/platform/embed-integrate/public-mode-slack.png)
    

## How Public Mode works[​](#how-public-mode-works "Direct link to How Public Mode works")

Public Mode follows the same detection, response, and feedback flow described in [Configure bot responses in channels](/administration/platform/embedded-integrations/slackbot/admin-guide/configure-bot-responses).

However, Public Mode uses a specific visibility and corpus for replies:

-   Replies are visible to all members in the Slack channel thread.
-   Replies are triggered by a direct `@Glean` mention or, if enabled, automatically when Glean detects a question.
-   Glean generates public replies using only broadly shared content from your organization's public corpus.

## What content Public Mode can use[​](#what-content-public-mode-can-use "Direct link to What content Public Mode can use")

Public Mode uses broadly shared content. This means content that anyone in the organization can search for via Glean, or content that is publicly accessible. It does not use link-only, restricted, or private content for public replies.

Public Mode also restricts some other capabilities. MCP and most federated sources are disabled in this mode, so skills that depend on restricted actions or federated sources may be less effective.

### Connectors that can contribute to public replies by default[​](#connectors-that-can-contribute-to-public-replies "Direct link to Connectors that can contribute to public replies by default")

By default, the following connectors can contribute to public replies. Admins can adjust which sources are included — see [Choose which connectors public replies can use](#choose-which-connectors-public-replies-can-use).

| Connector | Content that can be used for public replies |
| --- | --- |
| Slack | Messages from public channels |
| Slack Enterprise Grid | Same as Slack public channels |
| Google Drive | Files shared as Anyone in your organization can find and open, or Anyone on the internet can find and open |
| Confluence | Pages available to an organization-wide access group, or pages with anonymous access |
| SharePoint | Content shared with Everyone or Everyone except external users |
| OneDrive | Content shared through the SharePoint permission model with Everyone except external users |
| Jira | Issues visible to logged-in users across the organization, or issues on a public Jira instance |
| Salesforce | Knowledge articles with no data category restrictions or with Customer Support Portal enabled, content documents shared with All Internal Users, or Public Knowledge Base articles |
| ServiceNow | Articles or catalog items available to all instance users |
| GitHub | Internal repositories visible to all organization members, and public repositories. For pull requests on public repositories, anonymous access may depend on configuration. |
| GitLab | Public projects |
| Azure (Microsoft 365) | Same organization-wide content model as SharePoint and OneDrive |
| Custom connector | Content explicitly connected by your organization as organization-wide or public |
| Web crawler | Public website pages, and organization-wide pages when configured that way |
| Microsoft Teams | Messages from public channels in public teams, when public-team membership is not required for visibility |
| Notion | Workspace content is organization-wide visible by default. Pages can also be shared publicly to the web. |
| Google Groups | Groups shared with anyone in the organization, or anyone on the internet |
| Google Sites | Sites shared with everyone in the organization, or published publicly |
| Quip | Company-shared or public threads, when domain access or anonymous access is enabled |
| Monday.com | Open workspaces, and main boards within open workspaces |
| Yammer | Public communities and posts visible across the organization |
| Bitbucket | Content in repositories with public issue trackers |
| Simpplr | Public sites visible to all organization users |
| WordPress | Published pages and posts without password protection |
| Trello | Public workspaces, public boards, and cards on public boards |
| Highspot | Content visible to all users through identity settings, or all content when identity permissions are disabled |
| Brightspot | REST API pages with no permission settings are organization-wide visible, and non-REST CMS pages are publicly accessible |
| LumApps | Open or read-only communities visible to all users |
| Guru | Cards with public link sharing enabled |
| S3 | All connected S3 content |
| Facebook Workplace | Posts in open groups, and group-level metadata for both open and closed groups |
| Lattice | Non-private goals and feedback marked with public visibility |
| Lessonly | Lessons marked public |
| 15Five | High Five recognition posts |
| Zendesk | Articles available to all logged-in users, or public help center articles |
| Freshservice | Content visible to all logged-in users, when that visibility option is enabled. Link-based access does not qualify for public replies. |
| Linear | Non-private teams and projects visible across the organization |
| Stack Overflow | All Q&A posts -- no per-post permissions are applied, and all content is accessible to everyone in the team |
| Intercom | Published help center articles |
| Databricks | Content shared with the built-in account users group |
| Workday | All content when greenlisting is disabled. When greenlisting is enabled, only greenlisted articles qualify. |
| Windchill | Content marked by an admin as publicly accessible or organization-wide visible |
| Public Jira | All issues on a public Jira instance |
| Public GitHub | Same as public GitHub repositories |
| GitHub Enterprise | Same as GitHub internal or public visibility |
| Shortcut | All Shortcut content, including stories and epics |
| Announcements | Announcements with an All Users audience that have started their display period |
| Answers | Answers with no audience restriction, or with an All Users audience |
| Artifacts | Artifacts with an All Users viewer audience |
| Glean | Glean chats with an All Users audience |
| Files | All uploaded files |
| Prism | Dashboards with an All Users viewer audience |
| Workflows | Workflows with an All Users viewer audience |
| Dropbox | Documents with 'People with the link' sharing (edit or view) |
| Miro | Boards and content with organization access enabled |

### Connectors not considered for Public Mode by default[​](#connectors-not-considered-for-public-mode "Direct link to Connectors not considered for Public Mode by default")

By default, Public Mode does not consider connectors that are likely to contain sensitive data, or that have restricted permissions for org-wide visibility.

View list of excluded connectors

-   Asana
-   Outlook
-   BambooHR
-   Greenhouse
-   Egnyte
-   Figma
-   Tableau
-   Airtable
-   Coda
-   Gong
-   Google Chat
-   Google Cloud Storage
-   Looker
-   PagerDuty
-   Pingboard
-   Docebo
-   Contentful
-   Lucid
-   Seismic
-   Zoom
-   Gmail
-   Google Calendar
-   Outlook Calendar
-   HubSpot
-   Lever
-   Freshdesk
-   NetSuite
-   Affinity
-   Azure DevOps
-   Procore
-   Ironclad
-   Gainsight
-   Panopto
-   Sigma
-   Scribe
-   VeevaVault
-   Dynamics 365
-   Salesloft Conversation Intelligence
-   Aha
-   Collections
-   Box
-   Smartsheet

Note

This list is not exhaustive. What qualifies depends on how content is shared in each connector.

## Choose which connectors public replies can use[​](#choose-which-connectors-public-replies-can-use "Direct link to Choose which connectors public replies can use")

By default, public replies only use content that everyone in your organization can already see — content shared with your whole domain, public GitHub repositories, and content users have shared with all members.

To review or change this set, open the **Glean in Channels** tab and find **Allow public replies in channels**:

1.  Select **Configure** to open **Configure public connectors**, then toggle individual connectors on or off.
    
    ![choose connector](/img/administration/platform/embed-integrate/choose-ds1.png)
2.  Use the search box and the **Status** and **Category** filters to find a source; the counter shows how many are currently on.
    
3.  Select **Save changes**.
    
    ![configure connector](/img/administration/platform/embed-integrate/choose-ds.png)

Public replies always use only broadly shared content — never link-only, restricted, or private content, even when an admin enables a source. For details, see [What content Public Mode can use.](#what-content-public-mode-can-use)

## Find more information in private sources[​](#find-more-information-in-private-sources "Direct link to Find more information in private sources")

If a user feels an answer could be improved by data only they have access to (such as private documents or restricted Jira tickets), they can select **Find more information**.

-   Glean generates a **private** response visible only to that user. For more information, see [Ephemeral messages](https://docs.slack.dev/messaging/#ephemeral).
-   This private response focuses only on new updates found in restricted sources to avoid duplicating the public answer.
-   The user can manually **post the private answer** into the thread if they believe it would benefit the rest of the channel.
-   Find more information can use actions and MCP tools that are restricted in Public Mode.

## Example scenarios[​](#example-scenarios "Direct link to Example scenarios")

| Question | Included in public replies | Not included in public replies |
| --- | --- | --- |
| What is the status of the migration project? | Docs about the migration, Jira issues tracking the work, and relevant public Slack channel discussions. | Salesforce comments or notes on at-risk deals, private Slack channels discussing the migration impact on specific customers. |
| Where can I find our updated leave policy? | HR policy docs in Google Drive or Confluence shared org-wide, intranet pages visible to everyone, and HR announcements. | Draft policy docs in restricted folders, 1:1 emails or DMs between HR and employees. |
| What are the Q3 OKRs for the engineering team? | Public OKR docs in Confluence/Notion, org-wide goal tracking tools, and announcements shared with all employees. | Private manager notes about performance, individual review packets, or restricted leadership docs. |
| How is the ACME renewal deal progressing? | Publicly shared renewal playbooks or process docs, general pipeline dashboards that are visible org-wide. | Deal-specific Salesforce opportunity comments, emails with the customer, and private Slack channels discussing negotiation details. |

Note

These examples are illustrative. Actual sources included or excluded depend on the connectors you have connected and how content is shared and permissioned in your organization.
