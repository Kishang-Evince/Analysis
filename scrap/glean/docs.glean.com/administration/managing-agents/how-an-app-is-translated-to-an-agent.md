---
url: "https://docs.glean.com/administration/managing-agents/how-an-app-is-translated-to-an-agent"
canonical: "https://docs.glean.com/administration/managing-agents/how-an-app-is-translated-to-an-agent"
title: "How an app migrates to an agent"
description: "Learn how each component of an AI app maps to its agent equivalent when you migrate from apps to agents."
fetched_at: "2026-09-01T13:29:09.962Z"
---
On this page

When migrating from Apps to Agents, each App component maps directly to its Agent equivalent to ensure seamless functionality.

### Building blocks of an AI application[​](#building-blocks-of-an-ai-application "Direct link to Building blocks of an AI application")

1.  Name
    
    -   **App Display Name → Agent name**
    -   Direct one-to-one mapping with no changes
2.  Icon
    
    -   **App Icon → Agent Icon**
    -   Visual representation remains identical
3.  Description
    
    -   **App Description → Agent Description**
4.  Instructions
    
    -   App Instructions → Instructions for the “Plan & Execute” step in the Agent (see screenshot below)
5.  Tools
    
    -   **App Tools → Tools** for the “Plan & Execute” step in the Agent
    -   All configured tools and their customization are preserved as-is.

### Additional migration details[​](#additional-migration-details "Direct link to Additional migration details")

1.  Permissions & Access:
    -   App library audience (Users, Departments) → Agent VIEWER roles
    -   App Editors → Agent EDITOR roles
    -   Creator becomes Agent Owner
2.  Configuration:
    -   Prompts → Converted to conversation starters for the agent.
3.  Integration:
    -   Slack Settings are preserved as-is and can be accessed from the “Share menu” in the Agent builder.  
        ℹ️ The migrated agent will refer to itself as `Agent: <name>` in Slack in its responses instead of `App: <name>`.

## Example: Sample Agent (migrated from an App)[​](#example-sample-agent-migrated-from-an-app "Direct link to Example: Sample Agent (migrated from an App)")

## FAQs[​](#faqs "Direct link to FAQs")

### What happens to bookmarked links to my Application post-migration, such as https://app.glean.com/chat?applicationId=example\_application?

Once the migration is completed, Glean will seamlessly redirect any navigation from a link to an App to the corresponding Agent, so any previously bookmarked links for Apps will continue to work.

### What about the Web SDK? I'm using an App with chat embedded on my website.

Currently, one can embed an AI App in their site by using the applicationId parameter such as:

```
GleanWebSDK.renderChat(document.getElementById('container'), {  applicationId: 'example_application',});
```

Post-migration, your existing code that is using applicationId with the Web SDK will continue to work as Glean internally translates the applicationId to the corresponding migrated agentId, ensuring your embedded chat functionality remains uninterrupted.

note

-   The applicationId parameter will not work for new agents, and agentId should be used instead.
-   We recommend switching to agentId for Web SDK usage of migrated agents once the same is completed.

```
GleanWebSDK.renderChat(document.getElementById('container'), {  applicationId: 'example_application', // Will continue to work for agents that used to be Apps.});GleanWebSDK.renderChat(document.getElementById('container'), {  agentId: 'example_application', // (Recommended) Use this for new agents or agents migrated from Apps.});
```

### I’m using the App via REST API, will the app stop working when called via /rest/api/v1/chat?

For Apps that are migrated to an Agent, Glean will internally translate the applicationId parameter in the chat request to the corresponding agentId to ensure functionality remains uninterrupted.

note

-   The applicationId parameter will not work for new agents, and agentId should be used instead.
-   We recommend switching to agentId for REST API usage of migrated agents once the same is completed.

```
curl 'https://<your-glean-be>.glean.com/rest/api/v1/chat' \  -H 'Content-Type: application/json' \  -H 'Authorization: Bearer ...' \  -d '{        "stream": false,        "applicationId": "example_application",        "messages": [            {                "author": "USER",                "fragments": [                    {                        "text": "What are the holidays this year?"                    }                ]            }        ]    }'curl 'https://<your-glean-be>.glean.com/rest/api/v1/chat' \  -H 'Content-Type: application/json' \  -H 'Authorization: Bearer ...' \  -d '{        "stream": false,        "agentId": "example_application",        "messages": [            {                "author": "USER",                "fragments": [                    {                        "text": "What are the holidays this year?"                    }                ]            }        ]    }'
```

### Will my App's conversation history be preserved?

Yes, all existing chat sessions and conversation history will be maintained.

### What happens to my App's Slack integration?

Your App's Slack settings and channel mappings will transfer directly to the corresponding Agent. The Agent will maintain the same Slack functionality and channel associations as your original App.

### Can I continue using my App during the migration process?

During the migration phases, your Apps will continue to function normally until it is successful and they are replaced with the corresponding agent.

### What if I made changes to my App before migration?

Any changes made to Apps before the final migration will be preserved in the resulting Agent.
