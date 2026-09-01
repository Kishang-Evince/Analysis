---
url: "https://docs.glean.com/user-guide/apps/extension-sidebar"
canonical: "https://docs.glean.com/user-guide/apps/extension-sidebar"
title: "Extension Sidebar"
description: "Start searching faster, not harder"
fetched_at: "2026-09-01T13:30:38.045Z"
---
On this page

The Glean browser extension sidebar brings **Chat**, **Search**, and **Agents** into your browser on indexed and unindexed pages. Open it with a keyboard shortcut, a browser extension icon, or the blue Glean icon on a sticky tab to research, find information, and run supported workflows without leaving the page you're on. For details, see [How to open the sidebar](#how-to-open-the-sidebar).

## Glean browser extension sidebar[​](#glean-browser-extension-sidebar "Direct link to Glean browser extension sidebar")

The sidebar features three tabs:

-   **Chat:** Ask questions using Glean's company knowledge and the context of the page you're viewing.
-   **Search:** Find relevant content, documents, and experts across your connected sources.
-   **Agents:** Run purpose-built workflows on supported pages, such as Zendesk tickets and ServiceNow incidents and cases.

Chat and Search are general-purpose tools. Agents are available only on supported pages after your admin has configured the browser-extension experience and shared the relevant agents with you.

## Supported browsers[​](#supported-browsers "Direct link to Supported browsers")

The Glean browser extension is available for **Google Chrome**, **Microsoft Edge**, **Mozilla Firefox**, **Safari**, and **Brave**. See [Installing the browser extension](/user-guide/apps/installing-the-browser-extension) for installation links and browser-specific instructions.

## Using the sidebar screenshot[​](#using-the-sidebar-screenshot "Direct link to Using the sidebar screenshot")

Capture and use content you can't copy or highlight on the web page.

-   Screenshot images, non-selectable text, or specific sections from the current page in just a few clicks.
-   Focus on a part of a page and bring more content into Glean's Chat and tools.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

To use the sidebar as an end user:

1.  Install the [Glean browser extension](/user-guide/apps/installing-the-browser-extension) in a supported browser.
2.  Sign in to Glean when the extension prompts you.
3.  If you need Agents for a support workflow, ask your Glean admin to configure the browser-extension integration for your support platform and share the relevant agents with you. Admins can follow [Configure agents for support platforms](/administration/management/features/browser/about#configure-agents-for-support-platforms).

If you only need Chat or Search, the first two steps are enough.

## How to open the sidebar[​](#how-to-open-the-sidebar "Direct link to How to open the sidebar")

There are three ways to open the Glean browser extension sidebar:

-   Use the keyboard shortcut: Command + J (Mac) or Alt + J (Windows).
-   In the browser toolbar, click the Glean extension icon if you pinned it. If you haven't pinned it, click the **Extensions** icon (puzzle piece) and select Glean.
-   Click the blue Glean icon on the sticky tab on the right side of the screen.
    
    ![The Glean browser extension icon shown in the Extensions menu, pinned in the browser toolbar, and available on the sticky tab at the bottom right.](/img/user-guide/apps/extension-sidebar-open.png)
    

## Knowledge tools[​](#knowledge-tools "Direct link to Knowledge tools")

The content tab provides knowledge tools that enhance your ability to organize and access information:

-   **Collections:** Add or view collections this document is relevant to, helping you organize related content for easy discovery later.
-   **Go Links:** Create or view Go Links to the current page you are on, enabling quick access through memorable shortcuts.

## Agents[​](#agents "Direct link to Agents")

The **Agents** tab is available in the new browser extension experience. It isn't available in the legacy extension experience.

The Agents tab supports both migrated support workflows and company agents that your admin has shared with you. For support workflows, the browser extension replaces the embedded integrations previously known as Glean Assist.

To streamline frequently used workflows, admins should share the most useful company agents with their teams and configure eligible agents to run automatically when users open a supported page. Automatic runs reduce the need for users to select an agent manually. For administrator setup, see [About the browser extension](/administration/management/features/browser/about#configure-agents-for-support-platforms). For deployment options, see [Deploy the browser extension to managed devices](/administration/management/features/browser/deployment).

### Supported pages[​](#supported-pages "Direct link to Supported pages")

Agents are available on the following pages:

-   Zendesk ticket pages
-   Salesforce Lightning Case pages
-   ServiceNow incidents and cases, including Customer Service Management (CSM) and HR cases

### Use agents on supported pages[​](#use-agents-on-supported-pages "Direct link to Use agents on supported pages")

To run an agent on a supported page:

1.  Open a supported case or ticket page.
2.  Open the Glean browser extension sidebar. If your admin configures the integration and agent for you, the sidebar automatically opens to the **Agents** tab on supported pages.
3.  Select and run the relevant agent. The agent uses the page context to generate results. If an admin enables automatic runs for an agent, it runs when you open the supported page.

The following screenshot shows the Agents tab on a ServiceNow incident page with the three out-of-the-box agents.

The browser extension page permissions used to provide page context apply only to the out-of-the-box agents.

Here is the same experience on a Zendesk ticket page:

tip

If you open a supported page and do not see the **Agents** tab, confirm your extension sign-in. If the tab remains unavailable, ask your admin to confirm the browser-extension integration settings for the page and your access to an agent.

### Migrate from embedded integrations[​](#migrate-from-embedded-integrations "Direct link to Migrate from embedded integrations")

If your team currently uses Glean in Zendesk, Glean in ServiceNow, or Glean in Service Cloud, use agents in the browser extension as the replacement path for support workflows. Install the [Glean browser extension](/user-guide/apps/installing-the-browser-extension), sign in, and then open the [Extension sidebar](#how-to-open-the-sidebar) on a supported ticket or case page.

The sidebar's **Chat** and **Search** tabs remain available for general questions, follow-up questions, and finding company knowledge. Use the **Agents** tab for migrated support workflows and other company agents that your admin has shared with you.

For transition details on the existing embedded integrations, see:

-   [Configure Glean in Zendesk](/administration/platform/embedded-integrations/glean-in-zendesk)
-   [Configure Glean in ServiceNow](/administration/platform/embedded-integrations/glean-in-service-now)
-   [Configure Glean in Service Cloud](/administration/platform/embedded-integrations/glean-in-service-cloud)
