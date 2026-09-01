---
url: "https://docs.glean.com/get-started/golive/setup-glean-assistant"
canonical: "https://docs.glean.com/get-started/golive/setup-glean-assistant"
title: "Configure Glean Assistant"
description: "Configure and activate Glean Assistant, Glean's suite of enterprise-grade generative AI capabilities, for your organization."
fetched_at: "2026-09-01T13:29:49.733Z"
---
On this page

note

Before you proceed with this step, ensure that all of your initial connector crawls are complete and that your machine learning (ML) workflows have run. Glean Assistant will not respond correctly until these steps have completed.

* * *

## About Glean Assistant[​](#about-glean-assistant "Direct link to About Glean Assistant")

Glean Assistant is a secure, enterprise-ready digital workplace assistant that respects data access permissions and delivers personalized answers based on your organization's data. Think of it like ChatGPT, but with secure access to your company's information.

Glean Assistant is designed to enhance the workplace experience by providing your teammates with the information they need, when they need it, in a secure and personalized manner. It understands your company's content, internal language, people, and relationships, enabling Glean Assistant to deliver more relevant and accurate information than publicly available generative AI tools.

## Set up Glean Assistant[​](#set-up-glean-assistant "Direct link to Set up Glean Assistant")

### Activate Glean Assistant[​](#activate-glean-assistant "Direct link to Activate Glean Assistant")

You can activate Glean Assistant by navigating to  [Admin Console → Platform → Assistant → Setup](https://app.glean.com/admin/setup/gleanassistant?tab=setup), then selecting **Activate**.

If the Glean menu option is greyed out or not visible, this means that either:

-   Your people data sync has not been completed.
-   The initial crawling and indexing tasks for all connectors have not yet completed, OR
-   The ML workflows for your environment have not yet completed.

Once you have completed these steps, the Glean menu option will become visible and you can activate Glean Assistant.

![Activate Glean Assistant](/img/get-started/assistant-activate.webp)

Activate Glean Assistant from the \*\*Admin console\*\* once your crawling and ML has completed

### Assign teammates[​](#assign-teammates "Direct link to Assign teammates")

Glean Assistant can be enabled for the entire organization or for a selected test group. Glean recommends enabling Glean Assistant for a test group first before proceeding with the rollout to the broader organization.

To assign teammates, navigate to  [Admin Console → Platform → Assistant → Setup](https://app.glean.com/admin/setup/gleanassistant?tab=setup), then open the **User access** dropdown menu. Here you can select either:

-   Enabled for all users
-   Enabled for test group only

If you select **Enabled for test group only**, select **Add teammates** to specify the people who will have access.

![Assign teammates to Glean Assistant](/img/get-started/assistant-teammates.webp)

Assign teammates to Glean Assistant

info

If your organization uses [group-based permissions](/administration/identity/roles/group-based-permissions), you can also grant Glean Assistant access via identity provider groups. Teammates who belong to groups with access will automatically receive access when they sign in. This is recommended for large-scale rollouts, as it keeps access synchronized with your IdP without manual user management.

### Enable Glean Assistant[​](#enable-glean-assistant "Direct link to Enable Glean Assistant")

Once you have specified the teammates that Glean Assistant should be enabled for, select **Activate** to turn on Glean Assistant for those teammates.

Alternatively, you can also follow any of the applicable optional steps below to customize Glean Assistant and its behavior.

![Activate Glean Assistant](/img/get-started/assistant-enable.webp)

When you are ready, select Activate to turn on Glean Assistant for your teammates

* * *

## Customize Glean Assistant[​](#customize-glean-assistant "Direct link to Customize Glean Assistant")

There are a number of optional settings you can configure for Glean Assistant.

### Select your LLM[​](#select-your-llm "Direct link to Select your LLM")

Glean Assistant supports a range of LLMs including:

-   GPT
-   Claude
-   Gemini

In addition, Glean Assistant supports accessing your selected LLM via a variety of methods depending on the needs of your organization. For example, AWS Bedrock, GCP Vertex AI, etc.

You can select the LLM provider by navigating to  [Admin Console → Platform → Assistant → Setup](https://app.glean.com/admin/setup/gleanassistant?tab=setup), then expanding the **LLM Provider** section.

### Receive user feedback[​](#receive-user-feedback "Direct link to Receive user feedback")

Teammates can provide feedback to Glean Assistant responses as positive (👍) or negative (👎) with accompanying comments. You can opt to have this feedback sent to a company email alias for review.

To configure settings related to user feedback, navigate to  [Admin Console → Customization → In-product help](https://app.glean.com/admin/helpsettings), expand the **Feedback** section, and select **Advanced preferences**.

For more information, see [Receive user feedback](/troubleshooting/user-feedback).

### Set exclusion rules[​](#set-exclusion-rules "Direct link to Set exclusion rules")

You can exclude certain content from ever being sent to an LLM across all Glean interfaces.

For example, if you exclude a document, Glean Assistant will not use any data from that document to generate responses; even if a teammate is permitted to access the document content.

To set explicit exclusion (or inclusion) rules, navigate to  [Admin Console → Platform → Assistant → Advanced](https://app.glean.com/admin/setup/gleanassistant?tab=advanced), then expand the **Exclusion rules** and **Inclusion rules** sections.

For more information, see [Restricting LLM access to content](/administration/assistant/configuration/content-restrictions).

### Provide custom instructions[​](#provide-custom-instructions "Direct link to Provide custom instructions")

You can optionally provide Glean Assistant with up to five custom instructions to better align its behavior with your enterprise requirements.

For example:

-   Ensure that you remind teammates that their answers may not be accurate.
-   Do not respond to any queries regarding salary.
-   Only respond in German.

To set a custom instruction, navigate to  [Admin Console → Platform → Assistant → Advanced](https://app.glean.com/admin/setup/gleanassistant?tab=advanced), then expand the **Custom instructions** section.

warning

Custom instructions do not alter Glean Assistant's retrieval capabilities. They control the response generated by the LLM and are sent alongside data retrieved by Glean Assistant as deemed relevant to the user's query.

For more information, see [Custom instructions](/administration/assistant/configuration/custom-instructions).

### Set a disclaimer[​](#set-a-disclaimer "Direct link to Set a disclaimer")

You can set a disclaimer that will be displayed to teammates when they interact with Glean Assistant. This can be used to inform them about the limitations of generative AI or to provide them with important information.

To set a disclaimer, navigate to  [Admin Console → Platform → Assistant → Advanced](https://app.glean.com/admin/setup/gleanassistant?tab=advanced), then expand the **Disclaimers** section.

* * *

## Use Glean Assistant[​](#use-glean-assistant "Direct link to Use Glean Assistant")

### Chat[​](#chat "Direct link to Chat")

**Glean** is the dedicated entry point for Glean Assistant and can be accessed by clicking the message bubble icon from the left-side menu of the Glean UI:  [Chat → New Chat](https://app.glean.com/chat)

For more information, see the [Quick start guide](/user-guide/about/end-user-quick-start-guide).

### AI Answers[​](#ai-answers "Direct link to AI Answers")

**AI Answers** are typically used in the context of search results, providing direct answers to teammate queries based on the content of your documents when a teammate makes a relevant search query.

For more information, see [AI Answers](/user-guide/assistant/ai-answers).

### AI summaries[​](#ai-summaries "Direct link to AI summaries")

The AI summarization feature of Glean Assistant provides concise summaries of documents. This feature is designed to enhance your productivity by providing a quick overview of a document's content without having to read the entire document.

To summarize a document, hover over a search result and select **Summarize** at the top-right of the result.

### Glean in Slack[​](#glean-in-slack "Direct link to Glean in Slack")

If your organization uses Slack, you can configure Glean as a bot within your Slack workspace to automatically answer questions as employees post them.

For more information, see [Glean in Slack](/administration/platform/embedded-integrations/slackbot/getting-started/installation-guide).

### Glean in Microsoft Teams[​](#glean-in-microsoft-teams "Direct link to Glean in Microsoft Teams")

If your organization uses Microsoft Teams, you can configure Glean as a bot within your Teams workspace to automatically answer questions as employees post them.

For more information, see [Glean in Microsoft Teams](/administration/platform/embedded-integrations/glean-in-teams/glean-in-microsoft-teams--admin-guide).

### Glean agents[​](#glean-agents "Direct link to Glean agents")

Glean Agents are AI-powered workflows that help automate tasks and streamline processes. Agents can be configured to perform complex, multi-step operations by combining multiple tools together. They can be triggered on-demand, scheduled, or integrated into Slack channels.

For more information, see [Agents](/agents/).

## See also[​](#see-also "Direct link to See also")

-   [Set up LLMs using the Model Hub](/administration/llms)
-   [Custom instructions](/administration/assistant/configuration/custom-instructions)
-   [Restricting LLM access to content](/administration/assistant/configuration/content-restrictions)
-   [Receive user feedback](/troubleshooting/user-feedback)
-   [Quick start guide](/user-guide/about/end-user-quick-start-guide)
