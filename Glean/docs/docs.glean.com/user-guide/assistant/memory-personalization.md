---
url: "https://docs.glean.com/user-guide/assistant/memory-personalization"
canonical: "https://docs.glean.com/user-guide/assistant/memory-personalization"
title: "Memory and personalization"
description: "Use memory to personalize responses based on your preferences, role, and work context"
fetched_at: "2026-10-13T08:51:28.512Z"
---
On this page

Memory is a persistent, privacy-safe continuity layer that enables Glean to remember your preferences, work context, and ongoing projects. Memory helps Glean provide more relevant, personalized responses without requiring you to repeat information across sessions.

Deployment availability

Memory is available for:

-   GCP deployments that use Glean Universal Key.
-   AWS and Azure deployments.
-   Customer Key deployments that use Bring Your Own Key (BYOK).

On deployments where memory isn't yet available, the **Personalization** section doesn't appear in users' Settings. For details about your deployment, contact your Glean representative or [Glean Support](https://support.glean.com/).

## How memory works[​](#how-memory-works "Direct link to How memory works")

Glean uses two types of memory to personalize your experience:

-   **Saved memories**: Explicit, user-controlled information you tell Glean to remember (for example, "Remember that I prefer concise answers" or "I'm a Sales Engineer in Europe").
-   **Learned memories**: Insights Glean learns automatically from your chats and your broader work activity. These include your response preferences, role and responsibilities, active projects, and recent topics.

Memory improves response quality and efficiency for tasks that benefit from personalization, including tone, style, role awareness, and continuity across conversations.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Memory must be available for your deployment. See **Deployment availability** above for details.

note

Memory does not grant Glean access to documents you cannot access. Memory only stores user-level facts and preferences.

## How to manage your memories[​](#how-to-manage-your-memories "Direct link to How to manage your memories")

You can view, edit, and delete your memories from **Settings**, and you can also add and manage memories directly in chat.

## Memory categories[​](#memory-categories "Direct link to Memory categories")

Glean organizes memories into the following categories:

| Category | What Glean may remember | How it helps |
| --- | --- | --- |
| **About you and your work** | Your role, responsibilities, and professional context | Tailors answers to your level of familiarity and day-to-day work |
| **How you like to work** | Preferences for tone, format, level of detail, and collaboration style | Makes responses feel more natural and useful |
| **What you're working on** | Ongoing projects, initiatives, and areas of focus | Provides continuity so you don't have to re-explain active work |
| **Your goals and priorities** | Objectives, priorities, and the outcomes you're working toward | Keeps recommendations aligned with what matters to you |
| **People you work with** | Key collaborators, teams, and organizational relationships | Accounts for who's involved in your work |
| **Relevant knowledge and context** | Work-related terminology, areas of expertise, and recurring topics | Makes answers more relevant to your domain and vocabulary |
| **Your instructions and boundaries** | Standing guidance about what to do, avoid, or keep in mind | Helps Glean follow your preferences consistently |
| **Recent context** | Topics and context from recent conversations or work activity | Helps you pick up where you left off |
| **Memories you explicitly save** | Information you directly ask Glean to remember | Gives you control over the context Glean carries across conversations |

## Benefits of memory[​](#benefits-of-memory "Direct link to Benefits of memory")

Memory helps you work more efficiently by:

-   **Reducing repetition**: You don't need to re-explain your role, preferences, or project context in each conversation.
-   **Providing continuity**: Glean remembers context from previous discussions, so you can continue where you left off.
-   **Personalizing responses**: Responses match your preferred communication style and level of detail.
-   **Improving relevance**: Recommendations and suggestions are tailored to your work focus areas and past requests.

### View and edit memories in Settings[​](#view-and-edit-memories-in-settings "Direct link to View and edit memories in Settings")

1.  Click your profile icon and select **Settings**.
2.  Select **Personalization**.
3.  Review your memories organized by category. You can edit or delete individual entries.

### Add memories from MCP-connected tools[​](#add-memories-from-mcp-connected-tools "Direct link to Add memories from MCP-connected tools")

MCP-connected tools such as ChatGPT, Claude, Cursor, VS Code, and Copilot can add, update, and delete your Glean memories directly. Make sure your connected Glean MCP server exposes `memory` and `memory_schema`. The default server includes both.

To manage third-party memories using the MCP tools:

1.  In your MCP host application, call `memory_schema` to understand the available categories, storage policies, filterable fields, writable fields, and whether search is enabled.
    
2.  Call `memory` for CRUD operations:
    

### Read memories

```
{"action":"read","category":"Preferences"}
```

### Add a memory

```
{"action":"add","category":"Preferences","memory_source":"Cursor","content":"User prefers dark mode","options":{"subcategory":"ui"}}
```

### Update a memory

```
{"action":"update","category":"Preferences","memory_source":"Cursor","memory_id":"<existing_id>","content":"new content"}
```

### Delete a memory

```
{"action":"delete","memory_source":"Cursor","memory_id":"<existing_id>"}
```

3.  To perform a CRUD operation, call the `memory` tool with the appropriate action and category. For example, here's how to update an existing memory:
    
    ```
    {"action": "update","category": "Preferences","memory_source": "Cursor","memory_id": "existing-memory-id","content": "User prefers very concise responses"}
    ```
    

### Import memories from another AI tool[​](#import-memories-from-another-ai-tool "Direct link to Import memories from another AI tool")

If you've built up context in another AI assistant, such as ChatGPT, Claude, Cursor, or Copilot, you can bring it into Glean so Assistant personalizes responses without you starting over. Glean gives you a prompt to run in the other tool, then saves what comes back as memories you can review or delete.

1.  Click your profile icon and select **Settings**.
2.  Select **Personalization**.
3.  Click **Import memory**. Glean opens a pop-up with a ready-made prompt.
4.  Copy the prompt and paste it into the other AI assistant.
5.  Copy the assistant's reply and paste it back into the pop-up.

Glean reviews the reply and saves your conversation context as memories. Imported memories appear in **Settings → Personalization**, where you can view or delete them like any other memory.

The import option appears when memory is enabled for your organization. If your organization doesn't have memory, the **Personalization** section and the import option don't appear.

note

Importing memories isn't supported in Fast mode.

### Add memories using chat[​](#add-memories-using-chat "Direct link to Add memories using chat")

Tell Glean what to remember using natural language:

-   "Remember that I prefer comprehensive responses in tabular format"
-   "Remember that I work on the enterprise sales team"
-   "Remember that I always want code examples in Python"

Glean confirms when it saves a memory.

### View memories using chat[​](#view-memories-using-chat "Direct link to View memories using chat")

Ask Glean what it remembers about you to see the full picture of your stored context, then shape it in the same conversation:

-   "What do you remember about me?"
-   "Show me my saved memories"
-   "Show me what you know about my current projects"

After Glean shows you what it has, you can refine it on the spot. For example, "Forget that I prefer bulleted responses" or "Remember that my role is now Staff Engineer."

### Delete memories[​](#delete-memories "Direct link to Delete memories")

You can delete individual memories or all memories:

**Delete a specific memory:**

-   In **Settings → Personalization**, click the delete icon next to the memory you want to remove
-   In chat, tell Glean: "Forget that I prefer responses in bulleted format"

**Delete all memories:**

-   In **Settings → Personalization**, click **Delete all** to remove all memories in a category

note

When you delete a memory, Glean records the deletion and excludes it from future updates, so it won't reappear.

### See when Glean uses memory[​](#see-when-glean-uses-memory "Direct link to See when Glean uses memory")

When a response draws on your memories, Glean shows a book icon with the response. Select it to see which memories shaped the answer. The indicator appears only on responses that used memory. A response without it relied on your prompt and your sources alone.

If a memory in that list is wrong or out of date, edit or delete it in **Settings → Personalization**, or tell Glean to forget it in the chat. The change applies to future responses.

### Runtime controls in chat[​](#runtime-controls-in-chat "Direct link to Runtime controls in chat")

You can control memory usage during a conversation using natural language:

-   "Don't use memory in this chat"
-   "Use memory for this response"
-   "What memories are you using right now?"

## Privacy and security[​](#privacy-and-security "Direct link to Privacy and security")

Memory is designed with privacy and security as core principles:

-   **User-level data**: Memories are stored at the individual user level. There is no cross-user memory sharing.
-   **No document access**: Memory stores facts and preferences, not document content. Memory does not grant access to documents you don't have permission to view.
-   **Retention policies**: Glean persists saved memories until you delete them. Glean maintains learned memories as living records that update as it learns from your activity, rather than deleting them on a fixed schedule. Older, less-relevant knowledge ages out over time.
-   **Sensitive data**: The system does not extract sensitive personal attributes. Learned memory is scoped to your work context and preferences.
-   **Admin controls**: An admin can turn off learned memories in **Admin console → Advanced Features**. You control saved memories. An admin can't turn them off. View, edit, and delete them in **Settings → Personalization**. See [Configure memory settings](/administration/assistant/configuration/memory-personalization) for details.

## Known limitations[​](#known-limitations "Direct link to Known limitations")

-   **Deployment availability**: On deployments where memory isn't yet available, the **Personalization** section doesn't appear in Settings. See **Deployment availability** above for details.
-   **Writing profile section removed**: The **Writing profile** section in **Settings → Personalization** has been temporarily removed. An updated memory experience with a more detailed view and improved ways to manage your preferences is coming soon.
-   **Possible duplication**: You may see duplicate entries in memory views. Glean consolidates these over time.
-   **Timing**: Glean consolidates new context on a daily basis, so newly learned memories may take up to about a day to appear.

## Frequently asked questions[​](#frequently-asked-questions "Direct link to Frequently asked questions")

### How is memory different from chat history?

Chat history stores your previous conversations so you can reference them later. Memory extracts and stores durable facts, preferences, and context that persist across all conversations, not just within a single chat thread.

### Will Glean use memory in agent conversations?

Yes, agents can access your memories to provide personalized responses, subject to the agent's configuration and your memory settings.

### Can my admin see my memories?

No. Memories are private to each user, and your admin cannot view individual user memories. For more information about admin configuration, see [Memory and personalization configuration](/administration/assistant/configuration/memory-personalization).
