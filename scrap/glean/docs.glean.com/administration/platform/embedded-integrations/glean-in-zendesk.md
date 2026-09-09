---
url: "https://docs.glean.com/administration/platform/embedded-integrations/glean-in-zendesk"
canonical: "https://docs.glean.com/administration/platform/embedded-integrations/glean-in-zendesk"
title: "Configure Glean in Zendesk"
description: "How to configure and set up Glean in Zendesk for your team."
fetched_at: "2026-09-01T13:29:11.368Z"
---
On this page

Important

Glean is retiring the embedded support integration previously known as Glean Assist. This page remains available for existing customers during the transition period. The replacement path is the [Glean browser extension sidebar](/user-guide/apps/extension-sidebar#agents), where end users can use Chat, Search, and Agents without leaving Zendesk.

## Migrate to the browser extension[​](#migrate-to-the-browser-extension "Direct link to Migrate to the browser extension")

Glean is replacing the embedded Zendesk experience with the browser extension sidebar. Use the **Chat** and **Search** tabs for general questions and company knowledge, and use the **Agents** tab for support workflows that use the current Zendesk ticket as context.

To start using the replacement experience:

1.  **Admin:** Configure the browser-extension integration and the agents that should be available for Zendesk. See [Configure agents for support platforms](/administration/management/features/browser/about#configure-agents-for-support-platforms).
2.  **End user:** Install the [Glean browser extension](/user-guide/apps/installing-the-browser-extension) and sign in to Glean.
3.  Open a Zendesk ticket page and launch the [Glean browser extension sidebar](/user-guide/apps/extension-sidebar#how-to-open-the-sidebar). On supported pages, the sidebar opens to the **Agents** tab when the integration and agent access configuration is complete.

For supported pages, end-user prerequisites, and troubleshooting steps, see [Extension sidebar](/user-guide/apps/extension-sidebar#agents).

## Feature overview[​](#feature-overview "Direct link to Feature overview")

Glean in Zendesk enhances productivity and streamlines customer support workflows by allowing users to:

-   Search across all company apps
-   Generate ticket summaries dynamically, along with customer sentiment
-   Access AI powered issue resolution steps and ask follow-up questions to Glean
-   Receive contextual recommendations (related documents, similar tickets, knowledge articles)
-   Chat with Glean
-   Compose a response to the customer
-   Run AI agents

### Structured summary of the current Zendesk ticket[​](#structured-summary-of-the-current-zendesk-ticket "Direct link to Structured summary of the current Zendesk ticket")

The summary highlights the key points of interest from the ticket including the issue that was reported, a suspected cause if identified, the current status of the ticket and the sentiment of the customer in the form of concise bullet points.

### Set of suggested next steps for issue resolution[​](#set-of-suggested-next-steps-for-issue-resolution "Direct link to Set of suggested next steps for issue resolution")

Next steps aim to help users resolve the issue as quickly as possible. Glean understands the ticket context, knows what information the user has access to and is able to suggest steps towards resolution by bringing relevant company knowledge directly into Zendesk. This saves users time by presenting relevant information without the users having to search for it. In addition, citations help users verify the next steps and get more information from documents (see *Sources*) used to generate the suggestions.

### Quick access to Glean[​](#quick-access-to-glean "Direct link to Quick access to Glean")

Users are able to interact with Glean, ask follow up questions or ask anything else relevant to the issue by quickly accessing Chat without having to go outside of Zendesk.

### See related documents, similar tickets and knowledge articles[​](#see-related-documents-similar-tickets-and-knowledge-articles "Direct link to See related documents, similar tickets and knowledge articles")

Users can hover over a document and click to see a summary. In addition to related tickets and knowledge base articles, Resources will surface the latest relevant documentation from across the company, such as Slack threads, to help solve the ticket.

In addition, Glean also surfaces past tickets and knowledge articles that might be related to the current issue.

### Run agents[​](#run-agents "Direct link to Run agents")

Admins are able to add selected agents to Glean in Zendesk. End users can see and run these agents right from the interface.

### Compose a response[​](#compose-a-response "Direct link to Compose a response")

Glean helps you compose a response based on the case contents. End users can modify the response and send it to the customer, thus streamlining communication.

### Search across all your apps[​](#search-across-all-your-apps "Direct link to Search across all your apps")

Click the Glean icon on the top bar. Glean Search will open, allowing you to search across all your enterprise apps connected to Glean, directly from Zendesk.

### Ability to greenlist connectors for search, recommendations, and chat[​](#ability-to-greenlist-connectors-for-search-recommendations-and-chat "Direct link to Ability to greenlist connectors for search, recommendations, and chat")

Shown below in the installation instructions, admins have the ability to greenlist a certain set of connectors for search and related documents.

## Installation Instructions[​](#installation-instructions "Direct link to Installation Instructions")

Note: If you already have the Glean app installed in Zendesk, you should automatically get the app updates (*Recommend a hard refresh with cmd + shift + R, in case the widget is stale/stuck in the old version)*

1.  Visit [Zendesk Marketplace - Glean](https://www.zendesk.com/marketplace/apps/support/922191/glean/) and click Install to proceed to the Zendesk Admin Installation page. Note: Only admins can install or update the app
    
2.  On the installation page, you can configure the settings for your app as described below.
    
3.  Enter the domain of your Glean backend server. Copy your full backend URL from [app.glean.com/admin/about-glean](https://app.glean.com/admin/about-glean) under **Server instance (QE)**, then enter the domain only (without the `https://` prefix) - for example, if your backend URL is `https://tenant_id-be.glean.com`, enter `tenant_id-be.glean.com`.
    
    1.  Note: if you put “https://” in front of the backend server URL, the Glean app will not work. Please enter the URL without “http” or “https”
4.  Enter the web app URL for your Glean setup. If you have a custom Glean subdomain, use [https://subdomain.glean.com](https://subdomain.glean.com). Otherwise, use the default URL [https://app.glean.com](https://app.glean.com/)
    
5.  (Recommended) Select 'Enable Activity Logging' to enable logging of user activity which enhances the quality of Glean's search and recommendation results.
    
6.  (Optional) If you want to restrict the app to specific users, use the role and group restrictions on the app settings page.
    
7.  Note: Glean backend automatically updates the hidden webhookSecret parameter of the Glean Zendesk app upon installation. This streamlines the authentication of activity requests and minimizes manual setup.
    
8.  Click Install to experience the Glean app in Zendesk Support.
    
9.  Reorder the Glean app to make it discoverable. Go to My apps in Zendesk, and select reorder apps.  
    For New Ticket & Ticket location drag the Glean app to top.
    
10.  Important: Please ask users to pin the Glean app so that they can access it easily.
     

## Configure Glean in Zendesk[​](#configure-glean-in-zendesk "Direct link to Configure Glean in Zendesk")

How to configure and set up Glean in Zendesk for your team.  
Glean in Zendesk brings AI-powered features directly into your team’s support applications to improve ticket resolution efficiency. As a Glean Admin, you can configure Glean in Zendesk to align with your team’s specific needs.

### Setting up a Glean in Zendesk configuration[​](#setting-up-a-glean-in-zendesk-configuration "Direct link to Setting up a Glean in Zendesk configuration")

To customize Glean in Zendesk, you’ll need to create a configuration in the Admin Console:

1.  Navigate to **Admin Console → Platform → Embedded integrations**.
2.  Click the New Configuration button.
3.  Select Zendesk. If your team uses multiple applications, you can add configurations for each one.

After selecting an application, you’ll be directed to an editor screen where you can customize the configuration. Once you click Save, your configuration will appear in a table on the Glean in Zendesk page.

### Configure AI agents in Glean in Zendesk[​](#configure-ai-agents-in-glean-in-zendesk "Direct link to Configure AI agents in Glean in Zendesk")

You can choose which agents show up in Zendesk, enabling your team to run agents without switching contexts. Note: Only admins can customize how the agents appear in the side panel, not end users. Pinned agents display on the Home tab inside Glean in Zendesk. By default, you will have three Pinned agents.

### Adding agents:[​](#adding-agents "Direct link to Adding agents:")

1.  Open your Glean in Zendesk configuration.
2.  Go to the Additional Agents section.
3.  Click **Add Agent**. You (the admin) can add any agent you have access to. End users will only see and run agents they personally have access to.
4.  Select your desired agent and click Add. Repeat as needed to add multiple agents.

Once added, the agents will appear in the Additional Agents section. These agents will display inside the Agents tab in Glean in Zendesk.

note

Agent tiles and run access are permission‑aware. If a user doesn't have access to an agent, that agent won't appear for them in the sidebar.

From here, you can:

-   Rearrange agents by dragging them into the desired order.
-   Remove agents by clicking the trash bin icon.

Note: If an agent is deleted or its visibility is restricted, it will be automatically removed from your configuration.

Once the configuration is saved, your changes will take effect immediately.

### Adjusting pinned agents[​](#adjusting-pinned-agents "Direct link to Adjusting pinned agents")

You may wish to have certain agents in your Additional Agents section, which display on the Agents tab in Glean in Zendesk, instead appear on the Home tab in Glean in Zendesk. To do so, simply click the pin icon next to the agent.

To move an agent from the Home tab to the Agents tab, unselect the pin icon next to the agent in the Pinned agents section.

To remove agents from both the Home tab and the Agents tab, you can hide agents. When you remove any of the three default agents from the Pinned agents section and the Additional Agents section, they will remain accessible to the admin only in the Hidden agents section.

### Configuring agents[​](#configuring-agents "Direct link to Configuring agents")

#### Set pinned agents to run automatically or manually[​](#set-pinned-agents-to-run-automatically-or-manually "Direct link to Set pinned agents to run automatically or manually")

You can configure any agent in the Pinned agents section to run automatically. This means that the agent will run as soon as a user opens a new ticket. You can add a maximum of 2 auto-run agents.

For example, if the Summary agent is set to run automatically, a summary of the ticket will be instantly generated every time a user opens a ticket. Alternatively, you can set these agents to be manually activated, which means they will wait to be manually triggered before running.

To adjust this setting, click on the three dots next to any pinned agent and select, “Configure.” You can then toggle between the automatic and manual trigger options. You will also see an option to set the input field for the auto-run, such as a ticket url.

#### Customizing knowledge sources for the Next Steps agent[​](#customizing-knowledge-sources-for-the-next-steps-agent "Direct link to Customizing knowledge sources for the Next Steps agent")

The Next Steps agent references various knowledge sources to suggest next steps and recommend resources. You can edit these sources to better suit your team by editing the Knowledge Sources field in the configuration options for this agent.

By default, this field is left blank, allowing Glean in Zendesk to reference all company knowledge in Glean.

If you specify sources in the Knowledge Sources field, the Next Steps agent will only use those sources, ignoring all others.

Once the configuration is saved, your changes will take effect immediately.

Previously, "Knowledge sources" controlled which connectors will be used for both "Next Steps" and "Resources" sections. Now, the setting will only control the Next Steps agent, meaning that the Search tab and Chat tab results will not be bound by the knowledge sources set in this configuration. We made this decision to make the experience consistent with the Search experience in the Glean app and other surfaces.

#### Customizing the Draft a Response agent[​](#customizing-the-draft-a-response-agent "Direct link to Customizing the Draft a Response agent")

The Draft a Response agent helps your team craft responses to customers. You can customize how they’re written by adding instructions.

For example:

-   Specify a salutation that you want responses to begin with.
-   Specify a signature that you want responses to end with.
-   Specify the desired tone or formatting of messages.

Once the configuration is saved, your changes will take effect immediately.

#### Further customization options[​](#further-customization-options "Direct link to Further customization options")

You can further customize other agents inside the Glean agent builder, inside the [agent library](https://app.glean.com/chat/agents). For example, you can select which LLMs you want the agent to use.

To have the ticket url of the ticket you are looking at auto-fill in the agent, select “Configure” in the menu for that agent in the admin console and adjust the “Ticket info type” to “Ticket URL.”

If you would like the input for the agent you have added to auto-fill, consider changing the first step in your agent to “Ticket URL.” This way, Glean in Zendesk will auto-fill the ticket url of the ticket you are looking at into the agent. The context from the tickets, such as “customer name” and “status of ticket,” can be referenced in subsequent steps in an agent if they are needed.
