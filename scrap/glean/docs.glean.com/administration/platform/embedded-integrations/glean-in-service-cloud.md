---
url: "https://docs.glean.com/administration/platform/embedded-integrations/glean-in-service-cloud"
canonical: "https://docs.glean.com/administration/platform/embedded-integrations/glean-in-service-cloud"
title: "Configure Glean in Service Cloud"
description: "How to configure and set up Glean in Service Cloud for your team."
fetched_at: "2026-09-01T13:29:11.176Z"
---
On this page

## Feature overview[​](#feature-overview "Direct link to Feature overview")

Glean in Service Cloud is a group of two apps built for support teams using Salesforce Service Cloud:

-   Glean Case Assistant
-   Glean Search

These apps enhance productivity and streamline various customer support workflows by allowing users to:

-   Search across all company apps
-   Generate case summaries dynamically
-   Access AI powered issue resolution steps and ask follow-up questions to Glean
-   Case sentiment
-   Receive contextual recommendations (related documents, similar cases, knowledge articles)
-   Chat with Glean
-   Compose a response to the customer
-   Run AI agents

Add "Case Assistant" to access Agents, Search and Glean in a single surface. If you specifically want to use only search, you can select to add only Search.

### Glean Case Assistant[​](#glean-case-assistant "Direct link to Glean Case Assistant")

This app only supports Service Cloud Cases and is not applicable to other Salesforce objects like Accounts or Opportunities.

The Glean Case Assistant app surfaces key information related to the case that the support user is currently working on:

-   Case summary
-   Case sentiment
-   Case resolution steps
-   Contextual recommendations (related documents and similar cases)
-   Ability to chat and ask follow-up questions to Glean
-   Compose a response

#### Structured summary of the current case[​](#structured-summary-of-the-current-case "Direct link to Structured summary of the current case")

The summary highlights the key points of interest from the case including the issue that was reported, a suspected cause if identified, the current status of the case, and the customer sentiment in the form of concise bullet points.

#### Set of suggested next steps for issue resolution[​](#set-of-suggested-next-steps-for-issue-resolution "Direct link to Set of suggested next steps for issue resolution")

Next steps aim to help users resolve the issue as quickly as possible. Glean understands the case context, knows what information the user has access to and is able to suggest steps towards resolution by bringing relevant company knowledge directly into Salesforce. This saves users time by presenting relevant information without the users having to search for it. In addition, citations help users verify the next steps and get more information from documents (see *Sources*) used to generate the suggestions.

Note: Users can provide feedback on these next steps by clicking on the thumbs up/down icons.

#### Quick access to Glean[​](#quick-access-to-glean "Direct link to Quick access to Glean")

Users can interact with Glean, ask follow-up questions, or inquire about anything relevant to the issue by quickly accessing Glean without leaving Salesforce.

When a teammate asks a question from a Salesforce case page, Glean includes the current record URL in the ticket context sent to Glean Assistant. On Salesforce Lightning record pages, Glean also includes the Salesforce record ID when available. This helps Glean answer record-identifier questions, such as case-number lookups, more reliably.

#### See related documents and cases[​](#see-related-documents-and-cases "Direct link to See related documents and cases")

Users can hover over a document and click to see a summary. In addition to related tickets and knowledge base articles, Resources will surface the latest relevant documentation from across the company, such as Slack threads, to help solve the ticket.

In addition, Glean also surfaces other cases that might be related to the current issue.

#### Run agents[​](#run-agents "Direct link to Run agents")

Admins are able to add selected agents to Glean in Service Cloud. End users can see and run these agents right from the interface.

#### Compose a response[​](#compose-a-response "Direct link to Compose a response")

Glean helps you compose a response based on the case contents. End users can modify the response and send it to the customer, thus streamlining communication.

### Glean Search App[​](#glean-search-app "Direct link to Glean Search App")

Click the Glean icon on the top bar. Glean Search will open, allowing you to search across all your enterprise apps connected to Glean, directly from Salesforce.

### Ability to greenlist connectors for search, recommendations, and chat[​](#ability-to-greenlist-connectors-for-search-recommendations-and-chat "Direct link to Ability to greenlist connectors for search, recommendations, and chat")

Shown below in the installation instructions, admins have the ability to greenlist a certain set of connectors for search and related documents.

## Installation Instructions[​](#installation-instructions "Direct link to Installation Instructions")

Note: If your organization already has a previous version of Glean in Service Cloud, you may be able to upgrade instead of re-install. Checkout “Upgrade Instructions” in the next section.

Install the app from AppExchange: [https://appexchange.salesforce.com/appxListingDetail?listingId=a0N4V00000GuFOBUA3](https://appexchange.salesforce.com/appxListingDetail?listingId=a0N4V00000GuFOBUA3)

1.  Navigate to the above installation URL and follow the installation process. You can then enable the app for all users or a test group. Select "Install for all users" and accept the installation terms.
    
2.  In our latest packages, we ask for permission to install an additional CSP Trusted Site. This helps make sure Glean in Service Cloud loads correctly after installation. Checkbox “Yes, grant access to these third-party web sites” and click “Continue” to finish the installation.
    
3.  Once the package is installed, visit any Case Record page and click on “Edit Page” to go to Lightning App Builder.
    
4.  Search for “Glean” components in the top-left search bar. Glean apps should appear in the “Managed” section on the left hand side in the lightning app builder page.
    
5.  Drag the Glean Case Assistant component to your desired location on the Case Record layout. (Recommendation: Position it in the top right corner for optimal visibility)
    
6.  Configuring Glean Apps: In Lightning App Builder, select the Glean app to access its settings in the right sidebar. Optional Settings:
    
    1.  webAppUrl (optional): Enter the web app URL for your Glean setup. If you have a custom Glean subdomain, use [https://subdomain.glean.com](https://subdomain.glean.com). Otherwise, use the default URL [https://app.glean.com](https://app.glean.com/).
7.  Finalizing: Click "Save" to apply your changes. Navigate to a case page to verify the Glean Case Assistant is functioning correctly.
    

## Upgrade Instructions[​](#upgrade-instructions "Direct link to Upgrade Instructions")

Find the latest app version from AppExchange: [https://appexchange.salesforce.com/appxListingDetail?listingId=a0N4V00000GuFOBUA3](https://appexchange.salesforce.com/appxListingDetail?listingId=a0N4V00000GuFOBUA3)

1.  Navigate to the above installation URL and follow the installation process. You will be prompted with “An earlier version is installed. It can be upgraded while preserving the existing data.” Choose the group of users you wish to install for, and click “Upgrade”
    
2.  In our latest packages, we ask for permission to install an additional CSP Trusted Site. This helps make sure the Embedded Integration loads correctly after installation. Checkbox “Yes, grant access to these third-party web sites” and click “Continue” to finish the upgrade.
    

Configure Glean in Service Cloud  
How to configure and set up Glean in Service Cloud for your team. Glean in Service Cloud brings AI-powered features directly into your team’s support applications to improve ticket resolution efficiency. As a Glean Admin, you can configure Glean in Service Cloud to align with your team’s specific needs.

## Setting up a Glean in Service Cloud configuration[​](#setting-up-a-glean-in-service-cloud-configuration "Direct link to Setting up a Glean in Service Cloud configuration")

To customize Glean in Service Cloud, you’ll need to create a configuration in the Admin Console:

1.  Navigate to Admin Console > Platform > Embedded integrations.
2.  Click the New Configuration button.
3.  Select Service Cloud. If your team uses multiple applications, you can add configurations for each one.

After selecting an application, you’ll be directed to an editor screen where you can customize the configuration. Once you click Save, your configuration will appear in a table on the Glean in Service Cloud page.

## Configure AI agents in Glean in Service Cloud[​](#configure-ai-agents-in-glean-in-service-cloud "Direct link to Configure AI agents in Glean in Service Cloud")

You choose which agents show up in Service Cloud, enabling your team to run agents without switching contexts. Note: Only admins can customize how the agents appear in the side panel, not end users.

Pinned agents display on the Home tab inside Glean in Service Cloud. By default, you will have three Pinned agents.

-   Summary
-   Next steps
-   Draft a response

These three agents come as default with the installation of this embedded integration. They are not shown in the agent library, though you can build similar Quickstart agents in the agent library.

## Adding agents[​](#adding-agents "Direct link to Adding agents")

1.  Open your Glean in Service Cloud configuration.
2.  Go to the Additional Agents section.
3.  Click **Add Agent**. You (the admin) can add any agent you have access to. End users will only see and run agents they personally have access to.
4.  Select your desired agent and click Add. Repeat as needed to add multiple agents.

Once added, the agents will appear in the Additional Agents section. These agents will display inside the Agents tab in Glean in Service Cloud.

note

Agent tiles and run access are permission‑aware. If a user doesn't have access to an agent, that agent won't appear for them in the sidebar.

From here, you can:

-   Rearrange agents by dragging them into the desired order.
-   Remove agents by clicking the trash bin icon.

Note: If an agent is deleted or its visibility is restricted, it will be automatically removed from your configuration.

Once the configuration is saved, your changes will take effect immediately.

## Adjusting pinned agents[​](#adjusting-pinned-agents "Direct link to Adjusting pinned agents")

You may wish to have certain agents in your Additional Agents section, which display on the Agents tab in Glean in Service Cloud, instead appear on the Home tab in Glean in Service Cloud. To do so, simply click the pin icon next to the agent.

To move an agent from the Home tab to the Agents tab, unselect the pin icon next to the agent in the Pinned agents section.

To remove agents from both the Home tab and the Agents tab, you can hide agents. When you remove any of the three default agents from the Pinned agents section and the Additional Agents section, they will remain accessible to the admin only in the Hidden agents section.

## Configuring agents[​](#configuring-agents "Direct link to Configuring agents")

### Set pinned agents to run automatically or manually[​](#set-pinned-agents-to-run-automatically-or-manually "Direct link to Set pinned agents to run automatically or manually")

You can configure any agent in the Pinned agents section to run automatically. This means that the agent will run as soon as a user opens a new ticket. You can add a maximum of 2 auto-run agents. For example, if the Summary agent is set to run automatically, a summary of the ticket will be instantly generated every time a user opens a ticket. Alternatively, you can set these agents to be manually activated, which means they will wait to be manually triggered before running. To adjust this setting, click on the three dots next to any pinned agent and select, “Configure.” You can then toggle between the automatic and manual trigger options. You will also see an option to set the input field for the auto-run, such as a ticket url.

### Customizing knowledge sources for the Next Steps agent[​](#customizing-knowledge-sources-for-the-next-steps-agent "Direct link to Customizing knowledge sources for the Next Steps agent")

The Next Steps agent references various knowledge sources to suggest next steps and recommend resources. You can edit these sources to better suit your team by editing the Knowledge Sources field in the configuration options for this agent. By default, this field is left blank, allowing Glean in Service Cloud to reference all company knowledge in Glean. If you specify sources in the Knowledge Sources field, the Next Steps agent will only use those sources, ignoring all others.

Once the configuration is saved, your changes will take effect immediately.

Previously, "Knowledge sources" controlled which connectors will be used for both "Next Steps" and "Resources" sections. Now, the setting will only control the Next Steps agent, meaning that the Search tab and Chat tab results will not be bound by the knowledge sources set in this configuration. We made this decision to make the experience consistent with the Search experience in the Glean app and other surfaces.

### Customizing the Draft a Response agent[​](#customizing-the-draft-a-response-agent "Direct link to Customizing the Draft a Response agent")

The Draft a Response agent helps your team craft responses to customers. You can customize how they’re written by adding instructions.

For example:

-   Specify a salutation that you want responses to begin with.
-   Specify a signature that you want responses to end with.
-   Specify the desired tone or formatting of messages.

Once the configuration is saved, your changes will take effect immediately.

### Further customization options[​](#further-customization-options "Direct link to Further customization options")

You can further customize other agents inside the Glean agent builder, inside the agent library. For example, you can select which LLMs you want the agent to use.

To have the ticket url of the ticket you are looking at auto-fill in the agent, select “Configure” in the menu for that agent in the admin console and adjust the “Ticket info type” to “Ticket URL.”

If you would like the input for the agent you have added to auto-fill, consider changing the first step in your agent to “Ticket URL.” This way, Glean in Service Cloud will auto-fill the ticket url of the ticket you are looking at into the agent. The context from the tickets, such as “customer name” and “status of ticket,” can be referenced in subsequent steps in an agent if they are needed.
