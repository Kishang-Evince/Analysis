---
url: "https://docs.glean.com/user-guide/assistant/how-glean-accesses-info"
canonical: "https://docs.glean.com/user-guide/assistant/how-glean-accesses-info"
title: "How Glean accesses information"
description: "Learn how Glean accesses information and generates responses"
fetched_at: "2026-09-01T13:30:38.950Z"
---
On this page

Glean gathers information from multiple sources to generate responses tailored to you. Your results depend on your access permissions, query filters, prompt, and any additional context you provide in the chat, such as attached documents.

## Knowledge sources[​](#knowledge-sources "Direct link to Knowledge sources")

Glean combines three knowledge sources in every response:

-   **Company knowledge:** Documents, messages, and data from your organization’s connected applications that you have permission to access.
-   **Web knowledge:** Real-time information retrieved from the internet.
-   **LLM knowledge:** The large language model’s built-in, pre-trained knowledge.

By default, Glean uses All Knowledge mode and automatically selects the most relevant sources for each question. You don’t need to choose a knowledge source manually.

### Filter sources at query time[​](#filter-sources-at-query-time "Direct link to Filter sources at query time")

You can control which sources Glean uses for a specific query with toggles in the chat box:

-   **Search the web:** Turn this on to include web results, or turn it off to restrict responses to company and LLM knowledge.
-   **Use company sources:** Turn this on to search your organization’s connected applications, or turn it off to use only web and LLM knowledge.

When both toggles are off, Glean relies only on the LLM’s pre-trained knowledge. Responses generated this way don’t include citations because no sources are retrieved.

note

Web search is only available if your administrator has enabled it.

## Personalized results[​](#personalized-results "Direct link to Personalized results")

Glean personalizes results based on your activity and the permissions set in your company’s connectors. The results you see are tailored to the documents you have access to and have interacted with. If you frequently access certain documents or collaborate with specific colleagues, those documents and related content are more likely to appear in your results. A coworker with different permissions or interaction history might see different responses for the same query.

If any permissions change in a connector, Glean reflects those changes quickly.

## Influence what appears in results[​](#influence-what-appears-in-results "Direct link to Influence what appears in results")

You can take steps to improve the quality and relevance of your results:

-   **Create [collections](/user-guide/knowledge/collections/how-collections-work):** Group related documents together to increase the likelihood that Glean surfaces them.
-   **[Verify documents](/user-guide/knowledge/verification/what-does-verification-mean):** Mark documents as verified to signal that they’re authoritative and up to date.
-   **Attach documents:** Reference specific documents in your prompt by pasting a URL or typing **@** followed by the document name.

Glean respects the permissions set in your company’s connectors. If you have permission to view a document in Google Drive or a thread in a public Slack channel, it can appear in your results. If your coworker has different permissions, they might see different results.
