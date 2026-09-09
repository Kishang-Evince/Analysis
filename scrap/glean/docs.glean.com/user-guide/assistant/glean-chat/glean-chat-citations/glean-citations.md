---
url: "https://docs.glean.com/user-guide/assistant/glean-chat/glean-chat-citations/glean-citations"
canonical: "https://docs.glean.com/user-guide/assistant/glean-chat/glean-chat-citations/glean-citations"
title: "Citations"
description: "Learn how citations work in Glean"
fetched_at: "2026-09-01T13:30:38.779Z"
---
On this page

A citation is a reference to a source Glean used. They appear within the response, immediately following statements that need backing, and provide a brief pointer to the document, file, or person so readers can locate and evaluate the source.

Citations never grant new access. You can only open items you already have permission to view. Source previews and links inherit data controls and retention policies of your organization.

Glean cites the following resources:

-   Documents and pages like Google Docs, Confluence, SharePoint pages.
-   Files like PDFs, presentations, spreadsheets where a specific portion supports the claim.
-   People records when the answer reflects a person as a source like an author or owner reference.

You see citations in the Assistant responses as:

-   Inline markers and a **View sources** section show the sources used for the answer.
-   Hover over a citation to preview context.
-   Opening a source shows a preview so you can confirm you are looking at the right place before you click through.
-   Clicking a source opens the original item in its native application like Google Drive, Confluence, SharePoint which is subject to your access.

When deep linked citations are enabled, you are directed to the exact passage in the source that supports the statement, with the referenced text so that you can verify it.

-   Hover previews highlight the cited text and show surrounding context.
-   For certain file types, the link may jump to a specific section, for example, a slide within a presentation when available.
-   Page numbers are also displayed for the appropriate sources.

note

Deep linking availability and behavior can vary by connector and admin settings.

### Confluence attachments in citations[​](#confluence-attachments-in-citations "Direct link to Confluence attachments in citations")

When a response draws on content from a file attached to a Confluence page, the citation can identify the specific attachment rather than pointing only to the parent page. This makes it easier to verify the source when the matching content comes from an attached PDF, spreadsheet, or other file. Availability depends on your Confluence deployment type and connector configuration; where it isn't enabled, the citation points to the parent page.

### When citations aren't included[​](#when-citations-arent-included "Direct link to When citations aren't included")

Citations appear when Assistant retrieves content from company sources or web search to build a response. In some cases, citations won't be included:

-   **Assistant didn't invoke a retrieval tool.** If Assistant determines that a query is generic enough to answer without searching, it relies on pre-trained knowledge and won't have source documents to cite. This is more common in fast mode, which prioritizes speed and may use fewer tools.
-   **Both source toggles are off.** When both **Search the web** and **Use company sources** are unselected in the composer, Assistant uses only the LLM's pre-trained knowledge. Responses generated this way won't include citations.

### Improve citation coverage[​](#improve-citation-coverage "Direct link to Improve citation coverage")

If you're not seeing citations when you expect them, try these steps:

-   **Check your source toggles.** Make sure **Use company sources** is turned on in the composer settings. If you also want web results, turn on **Search the web**.
-   **Switch to thinking mode.** Thinking mode spends more time planning and uses more tools, which produces more reliable citations. Fast mode prioritizes speed and may skip retrieval steps for queries it considers straightforward.
-   **Be specific in your query.** Rephrase your question to anchor it to company-specific knowledge. Add or tag relevant documentation URLs - for example, "According to our FY25 strategy doc…"
-   **Explicitly request a search.** Prompting Assistant to search (for example, "Use Glean search to answer this") can improve citation coverage.
-   **Add custom instructions.** You can add a custom instruction such as: *"For every question, first check the company's internal knowledge and answer based on it. If the information is not found, then use web search and clearly distinguish external sources."* This helps guide Assistant to prioritize company knowledge.

note

Glean is continuously improving how Assistant decides when to invoke retrieval tools and include citations, particularly in fast mode.

### Report incorrect or low-quality citations[​](#report-incorrect-or-low-quality-citations "Direct link to Report incorrect or low-quality citations")

If you see incorrect citations, share your feedback by clicking the **thumbs down** button and selecting *Used incorrect citation or source*.

### Can't open a cited item[​](#cant-open-a-cited-item "Direct link to Can't open a cited item")

You can only open items you already have permission to view. Citations won't typically reference sources you can't access, but they may remain in your history if your permission is later revoked. Source previews and links inherit data controls and retention policies of your organization.

### FAQs[​](#faqs "Direct link to FAQs")

### Are citations always present?

Citations aren't always returned. They appear when Assistant retrieves content from company sources or web search. Responses that rely only on the LLM's pre-trained knowledge won't have citations.

### Do citations affect answer quality?

Citations have been shown to steer responses to being more truthful. However, the absence of citations doesn't indicate that a response is hallucinated or wrong.

### Why does fast mode sometimes have fewer citations than thinking mode?

Fast mode prioritizes speed and uses a slimmed-down set of tools. It may skip retrieval steps for queries it considers straightforward, which means fewer source documents are available to cite. Thinking mode spends more time planning, invokes more tools, and synthesizes more context, producing more complete answers with more reliable citations. If consistent citations are important, use thinking mode.

### What happens when both source toggles are off?

When both **Search the web** and **Use company sources** are unselected, Assistant relies on the LLM's pre-trained knowledge only. Responses generated this way won't include citations because there are no retrieved sources to reference.
