---
url: "https://docs.glean.com/user-guide/assistant/glean-chat/glean-chat-citations/deep-linked-citations"
canonical: "https://docs.glean.com/user-guide/assistant/glean-chat/glean-chat-citations/deep-linked-citations"
title: "Deep-linked citations"
description: "Learn about deep-linked citation and how to use it in Glean"
fetched_at: "2026-09-01T13:30:38.742Z"
---
On this page

A citation is a reference to a source Glean used. It includes a brief pointer to the document, allowing you to locate and evaluate the information. A deep-linked citation links directly to the exact passage that supports the statement. This allows you to instantly verify the response and explore the surrounding context without searching the entire document.

With deep-linked citations, hovering over a citation shows significant details about the cited content.

You will see the cited text highlighted in blue, with the rest of the paragraph visible for full context.

In addition to the source information, the citation popover displays the page number. You can also select the **Expand** button in the top-right corner to view a preview of the source. For certain file types, the link may jump to a specific section, for example, a slide within a presentation when available.

## Enabling deep-linked citations for Glean[​](#enabling-deep-linked-citations-for-glean "Direct link to Enabling deep-linked citations for Glean")

### Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Ensure that agentic loop for Glean is turned on.

### Step[​](#step "Direct link to Step")

Deep-linked citations are automatically enabled when the agentic engine is turned on.

## Attachment-aware citations for Confluence[​](#attachment-aware-citations-for-confluence "Direct link to Attachment-aware citations for Confluence")

When Glean finds a match in a Confluence attachment, the citation experience can highlight the attachment that contains the match. This makes it easier to verify the source even when the attachment belongs to a larger Confluence page. Availability depends on your Confluence deployment type and connector configuration. When attachment-aware citations aren't available, the citation points to the parent Confluence page.

## Limitations[​](#limitations "Direct link to Limitations")

-   Deep-linked citations for complex content Currently, deep-linked citations sourced from non-plaintext content such as tables and code blocks-are displayed as simple plaintext. This presentation may make the cited information difficult to read or parse.
    
-   Source Navigation The ability to click on a citation and navigate directly to the cited page is not yet supported in this release.
