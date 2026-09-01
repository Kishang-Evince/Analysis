---
url: "https://docs.glean.com/administration/platform/embedded-integrations/glean-in-service-now"
canonical: "https://docs.glean.com/administration/platform/embedded-integrations/glean-in-service-now"
title: "Configure Glean in ServiceNow"
description: "How to configure and set up Glean in ServiceNow for your team."
fetched_at: "2026-09-01T13:29:11.149Z"
---
On this page

Important

Glean is retiring the embedded ServiceNow experience previously known as Glean Assist. This page remains available for existing customers during the transition period. The replacement path is the [Glean browser extension sidebar](/user-guide/apps/extension-sidebar#agents), where end users can use Chat, Search, and Agents without leaving ServiceNow.

## Migrate to the browser extension[​](#migrate-to-the-browser-extension "Direct link to Migrate to the browser extension")

Glean is replacing the embedded ServiceNow experience with the browser extension sidebar. Use the **Chat** and **Search** tabs for general questions and company knowledge, and use the **Agents** tab for support workflows that use the current incident or case as context.

To start using the replacement experience:

1.  **Admin:** Configure the browser-extension integration and the agents that should be available for ServiceNow. See [Configure agents for support platforms](/administration/management/features/browser/about#configure-agents-for-support-platforms).
2.  **End user:** Install the [Glean browser extension](/user-guide/apps/installing-the-browser-extension) and sign in to Glean.
3.  Open a supported ServiceNow record page and launch the [Glean browser extension sidebar](/user-guide/apps/extension-sidebar#how-to-open-the-sidebar). On supported pages, the sidebar opens to the **Agents** tab when the integration and agent access configuration is complete.

For supported pages, end-user prerequisites, and troubleshooting steps, see [Extension sidebar](/user-guide/apps/extension-sidebar#agents).

## Feature overview[​](#feature-overview "Direct link to Feature overview")

Glean in ServiceNow is an embedded assistant in the Service Operations, Customer Service Management, and HR Case Management workspaces. It helps support agents, HR staff, and IT admins resolve issues more effectively.

## Overview[​](#overview "Direct link to Overview")

The app enhances productivity and streamlines various support, HR and IT workflows by allowing users to:

-   Generate incident and case summaries dynamically, along with customer sentiment
-   Access AI powered issue resolution steps and ask follow-up questions to Glean
-   Receive contextual recommendations (related documents, similar incidents/cases, knowledge articles)
-   Chat with Glean
-   Compose a response to the customer
-   Run AI agents

## How the feature works[​](#how-the-feature-works "Direct link to How the feature works")

1.  The feature is available as an embedded app for incidents and cases in the Service Operations, Customer Service Management and HR Case Management workspaces.
2.  When a user opens an incident or case, they will see a Glean icon in the right hand panel. Clicking on the icon opens the app.
3.  The app takes into account the title, description, other case details and comments to understand the context of the issues reported and the conversation so far.
4.  Based on this information, the app automatically summarizes the issue, suggests resolution steps, surfaces similar issues and relevant knowledge articles, allows users to ask follow-up questions to Glean, execute prompts and compose responses.

Below we explore all the features and components available in the app:

#### Structured summary of the current ServiceNow incident or case[​](#structured-summary-of-the-current-servicenow-incident-or-case "Direct link to Structured summary of the current ServiceNow incident or case")

The summary highlights the key points of interest including the issue that was reported, a suspected cause if identified, the current status of the case, and the customer sentiment in the form of concise bullet points.

#### Set of suggested next steps for issue resolution[​](#set-of-suggested-next-steps-for-issue-resolution "Direct link to Set of suggested next steps for issue resolution")

Next steps aim to help users resolve the issue as quickly as possible. Glean understands the case context, knows what information the user has access to and is able to suggest steps towards resolution by bringing relevant company knowledge directly into ServiceNow. This saves users time by presenting relevant information without the users having to search for it. In addition, citations help users verify the next steps and get more information from documents (expand *Sources*) used to generate the suggestions.

#### Quick access to Glean[​](#quick-access-to-glean "Direct link to Quick access to Glean")

Users can interact with Glean, ask follow-up questions, or get help with any relevant issue by quickly without leaving ServiceNow

#### See related documents, similar incidents or cases and knowledge articles[​](#see-related-documents-similar-incidents-or-cases-and-knowledge-articles "Direct link to See related documents, similar incidents or cases and knowledge articles")

Users can hover over a document and click to see a summary. In addition to related tickets and knowledge base articles, Resources will surface the latest relevant documentation from across the company, such as Slack threads, to help solve the ticket.

#### Run agents[​](#run-agents "Direct link to Run agents")

Admins are able to add selected agents to Glean in ServiceNow. End users can see and run these agents right from the interface.

#### Compose a response[​](#compose-a-response "Direct link to Compose a response")

Glean helps you compose a response based on the case contents. End users can modify the response and send it to the customer, thus streamlining communication. You can also refine the response to make it more concise, friendly or professional.

-   ### Search across all your apps[​](#search-across-all-your-apps "Direct link to Search across all your apps")
    
    Click the Glean icon on the top bar. Glean Search will open, allowing you to search across all your enterprise apps connected to Glean, directly from ServiceNow. The Glean search on the top bar allows searching across all your enterprise apps connected to Glean, directly from ServiceNow.
    

## Compatibility[​](#compatibility "Direct link to Compatibility")

Glean in ServiceNow works on Xanadu and subsequent releases of ServiceNow. It is embeddable in the following workspaces:

-   Service Operations Workspace
-   CSM Configurable Workspace
-   HR Agent Case Management Workspace

Glean in ServiceNow will be available on the following objects, and any objects derived from these:

-   incident
-   sn\_customerservice\_case
-   sn\_hr\_core\_case

## Installation Instructions[​](#installation-instructions "Direct link to Installation Instructions")

Install the app from [ServiceNow's App Store](https://store.servicenow.com/store/app/94b4675893907ad47b73393d6cba1011). The [Links and Documents](https://store.servicenow.com/store/app/94b4675893907ad47b73393d6cba1011#linksAndDocuments) section contains detailed instructions on how to set up Glean in ServiceNow for each workspace.

## Setting up a Glean in ServiceNow configuration[​](#setting-up-a-glean-in-servicenow-configuration "Direct link to Setting up a Glean in ServiceNow configuration")

As a Glean Admin, you can configure Glean in ServiceNow to align with your team’s specific needs. To customize Glean in ServiceNow, you’ll need to create a configuration in the Admin Console:

1.  Navigate to Admin Console > Platform > Embedded integrations.
2.  Click the New Configuration button.
3.  Select ServiceNow. If your team uses multiple applications, you can add configurations for each one.

After selecting an application, you’ll be directed to an editor screen where you can customize the configuration. Once you click Save, your configuration will appear in a table on the Glean in ServiceNow page.

## Configure AI agents in Glean in ServiceNow[​](#configure-ai-agents-in-glean-in-servicenow "Direct link to Configure AI agents in Glean in ServiceNow")

You can choose which agents show up in ServiceNow, enabling your team to run agents without switching contexts. Note: Only admins can customize how the agents appear in the side panel, not end users. Pinned agents display on the Home tab inside Glean in ServiceNow. By default, you will have three Pinned agents.

-   Summary
-   Next steps
-   Draft a response These three agents come as default with the installation of this embedded integration. They are not shown in the agent library, though you can build similar Quickstart agents in the agent library.

Adding agents:

1.  Open your Glean in ServiceNow configuration.
2.  Go to the Additional Agents section.
3.  Click **Add Agent**. You (the admin) can add any agent you have access to. End users will only see and run agents they personally have access to.
4.  Select your desired agent and click Add. Repeat as needed to add multiple agents.

Once added, the agents will appear in the Additional Agents section. These agents will display inside the Agents tab in Glean in ServiceNow.

note

Agent tiles and run access are permission‑aware. If a user doesn't have access to an agent, that agent won't appear for them in the sidebar.

From here, you can:

-   Rearrange agents by dragging them into the desired order.
-   Remove agents by clicking the trash bin icon.

Note: If an agent is deleted or its visibility is restricted, it will be automatically removed from your configuration.

Once the configuration is saved, your changes will take effect immediately.

### Adjusting pinned agents[​](#adjusting-pinned-agents "Direct link to Adjusting pinned agents")

You may wish to have certain agents in your Additional Agents section, which display on the Agents tab in Glean in ServiceNow, instead appear on the Home tab in Glean in ServiceNow. To do so, simply click the pin icon next to the agent.

To move an agent from the Home tab to the Agents tab, unselect the pin icon next to the agent in the Pinned agents section.

To remove agents from both the Home tab and the Agents tab, you can hide agents. When you remove any of the three default agents from the Pinned agents section and the Additional Agents section, they will remain accessible to the admin only in the Hidden agents section.

### Configuring agents[​](#configuring-agents "Direct link to Configuring agents")

#### Set pinned agents to run automatically or manually[​](#set-pinned-agents-to-run-automatically-or-manually "Direct link to Set pinned agents to run automatically or manually")

You can configure any agent in the Pinned agents section to run automatically. This means that the agent will run as soon as a user opens a new ticket. You can add a maximum of 2 auto-run agents.

For example, if the Summary agent is set to run automatically, a summary of the ticket will be instantly generated every time a user opens a ticket. Alternatively, you can set these agents to be manually activated, which means they will wait to be manually triggered before running.

To adjust this setting, click on the three dots next to any pinned agent and select, “Configure.” You can then toggle between the automatic and manual trigger options. You will also see an option to set the input field for the auto-run, such as a ticket url.

#### Customizing knowledge sources for the Next Steps agent[​](#customizing-knowledge-sources-for-the-next-steps-agent "Direct link to Customizing knowledge sources for the Next Steps agent")

The Next Steps agent references various knowledge sources to suggest next steps and recommend resources. You can edit these sources to better suit your team by editing the Knowledge Sources field in the configuration options for this agent.

By default, this field is left blank, allowing Glean in ServiceNow to reference all company knowledge in Glean.

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

If you would like the input for the agent you have added to auto-fill, consider changing the first step in your agent to “Ticket URL.” This way, Glean in ServiceNow will auto-fill the ticket url of the ticket you are looking at into the agent. The context from the tickets, such as “customer name” and “status of ticket,” can be referenced in subsequent steps in an agent if they are needed.
