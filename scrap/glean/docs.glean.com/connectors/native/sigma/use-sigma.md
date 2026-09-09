---
url: "https://docs.glean.com/connectors/native/sigma/use-sigma"
canonical: "https://docs.glean.com/connectors/native/sigma/use-sigma"
title: "Use Sigma in Glean"
description: "Find Sigma dashboards and ask natural-language questions about Sigma data in Glean."
fetched_at: "2026-09-01T13:29:42.403Z"
---
On this page

Sigma in Glean gives you two ways to work with your organization's Sigma data without leaving Glean:

-   **Find dashboards and charts** - search for Sigma workbooks, pages, and elements directly from Glean search.
-   **Ask natural-language questions** - use Glean Assistant to ask natural-language questions about Sigma data and get answers scoped to your permissions.

Both are scoped to your Sigma permissions. You only see content and data you have access to in Sigma.

## Find Sigma content in search[​](#find-sigma-content-in-search "Direct link to Find Sigma content in search")

After your admin sets up the [Sigma search integration](/connectors/native/sigma/connector), you can search for Sigma content directly in Glean.

### What you can find[​](#what-you-can-find "Direct link to What you can find")

| What you want | What to search | What Glean returns |
| --- | --- | --- |
| A dashboard | Workbook name or related business keyword | Matching **Sigma workbook** results |
| A specific tab in a dashboard | Workbook name plus page name | A **workbook page** result |
| A chart or table | Chart name, element name, or related topic | A **workbook element** result |

### Tips for better search results[​](#tips-for-better-search-results "Direct link to Tips for better search results")

-   Use **business terms** rather than technical Sigma names - Glean indexes descriptions and tags along with titles.
-   Include the **workbook name** when searching for a specific page or element within it.
-   Sigma search results link directly to the content in Sigma, so you can click through to explore further.

## Ask Sigma questions in Assistant[​](#ask-sigma-questions-in-assistant "Direct link to Ask Sigma questions in Assistant")

If your admin has enabled [Sigma in Assistant](/connectors/native/sigma/assistant), you can ask natural-language questions about Sigma data directly in Glean Assistant.

### What you can ask[​](#what-you-can-ask "Direct link to What you can ask")

-   "What workbooks are available in Sigma?"
-   "Show me the elements in the Q2 Revenue dashboard."
-   "What columns are available in the sales pipeline dataset?"
-   "What does the Monthly Active Users chart show?"

### How it works[​](#how-it-works "Direct link to How it works")

When you ask a question about Sigma data, Glean Assistant:

1.  Identifies that the question relates to Sigma content.
2.  Routes the question to the Sigma tools.
3.  Queries Sigma on your behalf using your permissions.
4.  Returns the answer in the Assistant conversation.

You do not need to specify that you want Sigma data - Assistant routes the question automatically based on context.

### What to expect[​](#what-to-expect "Direct link to What to expect")

-   **Your data:** Assistant queries Sigma on your behalf, so answers reflect the current state of your Sigma environment.
-   **Your permissions:** Results are scoped to your Sigma access. If you cannot see a workbook in Sigma, you will not see its data in Assistant.
-   **Natural language:** Ask questions the way you would ask a colleague. Assistant interprets your intent and selects the right Sigma tools.

## When to use search vs Assistant[​](#when-to-use-search-vs-assistant "Direct link to When to use search vs Assistant")

| You want to... | Use |
| --- | --- |
| Find a specific dashboard or chart | **Glean search** |
| Browse what Sigma content exists | **Glean search** |
| Ask a question about data in a workbook | **Glean Assistant** |
| Explore what columns or elements a dashboard contains | **Glean Assistant** |
| Get a link to open in Sigma | **Glean search** |

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### I cannot find a Sigma workbook in search

-   Confirm you have access to the workbook in Sigma.
-   The Sigma connector uses full crawls. If the workbook was recently created, it may not appear until the next crawl completes.
-   Try searching by the workbook name, description, or tags.

### Assistant does not answer my Sigma question

-   Sigma in Assistant may not be enabled for your organization. Check with your Glean admin.
-   Try rephrasing your question to be more specific about the workbook or data you are asking about.
-   If you do not have access to the relevant Sigma content, Assistant cannot retrieve it on your behalf.

### Assistant returns different data than what I see in Sigma

-   Assistant queries Sigma in real time using your permissions. If your Sigma role has different access than another user's, you may see different results.
-   Filters or parameters applied in a Sigma workbook may not be replicated exactly in an Assistant response.
