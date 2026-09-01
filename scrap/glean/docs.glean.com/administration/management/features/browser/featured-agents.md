---
url: "https://docs.glean.com/administration/management/features/browser/featured-agents"
canonical: "https://docs.glean.com/administration/management/features/browser/featured-agents"
title: "Configure featured agents"
description: "Configure which agents appear first when users open the browser extension on supported Zendesk, ServiceNow, or Service Cloud pages."
fetched_at: "2026-09-01T13:29:09.015Z"
---
On this page

Use the **Glean browser extension** page in the Admin console to feature agents for supported support-platform pages. Featured agents appear at the top of the **Agents** tab when a user opens the browser extension on a matching page.

Featuring an agent does not grant users permission to run it. Users see only the featured agents they can access.

Migrate existing embedded integrations

If you previously configured agents under **Glean in Zendesk**, **Glean in ServiceCloud**, or **Glean in ServiceNow**, Glean automatically migrates those configurations to the corresponding platform entry in **Glean browser extension**.

The migration preserves the following settings:

-   Knowledge sources configured for **Generate next steps**
-   **Composer Instructions** configured for **Draft a response**
-   Automatic-run settings
-   Featured-agent order, with pinned agents remaining at the top and additional agents following them

## Before you begin[​](#before-you-begin "Direct link to Before you begin")

As an admin, make sure that:

-   You have deployed the [Glean browser extension](/administration/management/features/browser/deployment) to your users.
-   You have the **Setup Admin**, **Admin**, or **Super Admin** role. These roles can manage the browser-extension integration; members and app developers cannot.

End-user prerequisites

For users to see and run a featured agent:

-   The user must have the browser extension installed and be signed in to Glean. Share [Extension sidebar](/user-guide/apps/extension-sidebar#prerequisites) with end users for installation and sign-in steps.
-   The user must have permission to run the agent. Featuring an agent does not grant access to it.
-   The user must open a page that matches the platform's supported URL pattern. The **Agents** tab appears only in the new browser extension experience on supported pages.

## Supported platforms[​](#supported-platforms "Direct link to Supported platforms")

Glean defines the platforms and URL patterns supported by this page. You cannot edit the URL patterns. To see the exact patterns, open a platform configuration in the Admin console.

### Best practices[​](#best-practices "Direct link to Best practices")

For better agent responses, set up the corresponding platform connector before featuring agents. Connector setup is optional when configuring featured agents, but it can provide agents with relevant platform context and improve response quality. For example, set up the [Zendesk connector](/connectors/native/zendesk/) before featuring agents on Zendesk pages.

| Platform | Supported pages |
| --- | --- |
| Zendesk | Ticket pages |
| ServiceNow | Incident records, Customer Service Management (CSM) case records, and HR case records |
| Service Cloud | Salesforce Lightning case pages |

## Configure featured agents[​](#configure-featured-agents "Direct link to Configure featured agents")

### Open a platform configuration[​](#open-a-platform-configuration "Direct link to Open a platform configuration")

1.  In the **Admin console**, go to **Embedded integrations** → **Glean browser extension**.
    
    ![Featured agents overview showing Zendesk, ServiceNow, and Service Cloud with no featured agents configured](/img/administration/management/features/browser/featured-agents-overview.png)
    
    Featured agents overview in the Admin console
    
2.  Under **Featured agents**, select the platform you want to configure.
    
    The platform drawer opens and displays the platform's URL patterns. These patterns determine which pages show the featured agents.
    
    ![ServiceNow featured-agent configuration drawer showing configured agents and the More menu with Configure agent, Run automatically, and View agent](/img/administration/management/features/browser/featured-agents-servicenow-drawer.png)
    
    ServiceNow featured-agent configuration drawer
    

### Add agents[​](#add-agents "Direct link to Add agents")

1.  Select **Add agents**.
    
2.  Use **Search agents** to find an agent by name or description.
    
3.  Review the available agents in these sections:
    
    -   **Suggested by Glean**: Glean's out-of-the-box support agents, including **Summarize ticket**, **Generate next steps**, and **Draft a response**.
    -   **Company agents**: Agents created in your organization.
    
    ![Suggested by Glean agents including Summarize ticket, Generate next steps, and Draft a response](/img/administration/management/features/browser/featured-agents-suggested-agents.png)
    
    Suggested by Glean agents available to feature
    
4.  Select the agents you want to feature. A selected agent shows a checkmark.
    
5.  Use the back arrow to return to the platform drawer.
    

#### Configure an agent[​](#configure-an-agent "Direct link to Configure an agent")

From the platform configuration, select the **More** menu next to an agent to access these options:

-   **Run automatically:** For eligible agents, allow the agent to run automatically. We recommend enabling automatic runs for frequently used agents to reduce friction for end users. Input-form agents may require you to map all input fields before you enable automatic runs.
    
-   **Configure agent:** For supported agents, configure agent-specific settings:
    
    -   **Generate next steps:** Select the data sources, folders, or URLs that the agent can reference for its recommendations.
        
        ![Configure Generate next steps with selectable knowledge sources](/img/administration/management/features/browser/featured-agents-configure-generate-next-steps.png)
        
        Configure Generate next steps
        
    -   **Draft a response:** Add **Composer Instructions** to specify response guidelines such as tone, salutations, and formatting.
        
        ![Configure Draft a response with Composer Instructions](/img/administration/management/features/browser/featured-agents-configure-draft-response.png)
        
        Configure Draft a response
        
-   **View agent:** Open the agent without leaving the platform configuration flow.
    

### Set the order and save[​](#set-the-order-and-save "Direct link to Set the order and save")

1.  Drag the featured agents into the order you want. Users see the agents in this order.
2.  Select **Save**. You can save the configuration even when you do not select any agents.

If you haven't configured agents for a platform, the drawer shows **No agents featured for this domain yet** and an **Add agents** button.

### Edit or remove a configuration[​](#edit-or-remove-a-configuration "Direct link to Edit or remove a configuration")

-   To change the selected agents or their order, open the platform and select **Edit**.
-   To remove a saved platform configuration, select **Remove domain**, then confirm. Users on matching pages will no longer see featured agents for that platform.

## When users see your changes[​](#when-users-see-your-changes "Direct link to When users see your changes")

Glean can take up to 10 minutes to apply changes to users. If a user already has the browser extension sidebar open when you save a configuration, they must close and reopen the sidebar to see the updated featured-agent list.

## How featured agents behave for users[​](#how-featured-agents-behave-for-users "Direct link to How featured agents behave for users")

-   **Order:** Featured agents appear in the order you set.
-   **Permissions:** Users see only the featured agents they have permission to run. Featuring an agent does not grant access to it.
-   **Deleted agents:** If someone deletes an agent, it no longer appears for users, even if it remains in a saved configuration.

## See also[​](#see-also "Direct link to See also")

-   [About the browser extension](/administration/management/features/browser/about)
-   [Deploy the browser extension to managed devices](/administration/management/features/browser/deployment)
-   [Manage agent access](/administration/managing-agents/agent-access)
-   [Extension sidebar](/user-guide/apps/extension-sidebar)
