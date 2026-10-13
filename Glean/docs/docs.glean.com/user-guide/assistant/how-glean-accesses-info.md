---
url: "https://docs.glean.com/user-guide/assistant/how-glean-accesses-info"
canonical: "https://docs.glean.com/user-guide/assistant/how-glean-accesses-info"
title: "How Glean accesses information"
description: "Learn how Glean accesses information and generates responses"
fetched_at: "2026-10-13T08:51:28.051Z"
---
On this page

Glean gathers information from multiple sources to generate responses tailored to you. Your results depend on your access permissions, query filters, prompt, and any additional context you provide in the chat, such as attached documents.

## Knowledge sources[​](#knowledge-sources "Direct link to Knowledge sources")

Glean combines three knowledge sources in every response:

-   **Company knowledge:** Documents, messages, and data from your organization’s connected applications that you have permission to access. It also covers your own past Glean chats and agent runs stored in [chat history](/user-guide/assistant/glean-chat/search-past-chats#ask-glean-to-search-your-past-chats).
-   **Web knowledge:** Real-time information retrieved from the internet.
-   **LLM knowledge:** The large language model’s built-in, pre-trained knowledge.

By default, Glean uses All Knowledge mode and automatically selects the most relevant sources for each question. You don’t need to choose a knowledge source manually.

### Filter sources at query time[​](#filter-sources-at-query-time "Direct link to Filter sources at query time")

To control which sources Glean uses for a specific query, open the plus (**+**) menu in the chat box, select **Sources**, then choose an option:

-   **Both:** Search company sources and the web.
-   **Web search only:** Search the web, but not your organization’s connected applications.
-   **Company sources only:** Search your organization’s connected applications, but not the web.
-   **No sources:** Don’t retrieve any sources. Glean answers from LLM knowledge in LLM-only mode, described below.

**Both** and **Web search only** appear only if your administrator has enabled web search. **No sources** isn’t available when you run Deep Research, because the report needs company or web search.

#### No sources (LLM-only mode)[​](#no-sources-llm-only-mode "Direct link to No sources (LLM-only mode)")

When you select **No sources**, Glean uses LLM-only mode. It doesn’t search company sources or the web, and it doesn’t invoke retrieval tools such as the document reader or Model Context Protocol (MCP) read tools. Glean can still use information you provide in the chat, such as attached documents, and write tools can still be available. Because Glean doesn’t open documents or read from connected apps, responses reflect the model’s pre-trained knowledge and the context you add to the chat, and usually don’t include citations. Verify anything that depends on current company data.

note

In a [project](/user-guide/knowledge/projects/how-projects-work) chat, Glean can still read that project’s own sources when you select **No sources**, so those responses may include citations.

## Personalized results[​](#personalized-results "Direct link to Personalized results")

Glean personalizes results based on your activity and the permissions set in your company’s connectors. The results you see are tailored to the documents you have access to and have interacted with. If you frequently access certain documents or collaborate with specific colleagues, those documents and related content are more likely to appear in your results. A coworker with different permissions or interaction history might see different responses for the same query.

If any permissions change in a connector, Glean reflects those changes quickly.

## Influence what appears in results[​](#influence-what-appears-in-results "Direct link to Influence what appears in results")

You can take steps to improve the quality and relevance of your results:

-   **Create [collections](/user-guide/knowledge/collections/how-collections-work):** Group related documents together to increase the likelihood that Glean surfaces them.
-   **[Verify documents](/user-guide/knowledge/verification/what-does-verification-mean):** Mark documents as verified to signal that they’re authoritative and up to date.
-   **Attach documents:** Reference specific documents in your prompt by pasting a URL or typing **@** followed by the document name.

Glean respects the permissions set in your company’s connectors. If you have permission to view a document in Google Drive or a thread in a public Slack channel, it can appear in your results. If your coworker has different permissions, they might see different results.
