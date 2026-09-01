---
url: "https://docs.glean.com/tools/connector/confluence/search-content"
canonical: "https://docs.glean.com/tools/connector/confluence/search-content"
title: "Search content"
description: "Finds Confluence pages using intelligent ranking based on how well page titles match the search query"
fetched_at: "2026-09-01T13:29:59.555Z"
---
On this page

*Confluence search content* finds Confluence pages by searching page titles with intelligent relevance ranking. This is a read-only tool that ranks results by exact phrase matches first, then pages containing all query words, and finally partial matches.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Confluence must be connected as a connector with the Confluence Cloud connector successfully crawling content.

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameter | Type | Description |
| --- | --- | --- |
| Query | String | Text to find in page titles. Supports case-insensitive matching and multi-word queries. |
| Space key | String | Limits the search to a specific Confluence space by its space key. |
| Start | Integer | Zero-based starting index for pagination to fetch subsequent pages of results. |
| Limit | Integer | Maximum number of results to return in a single call. |
| Expand | String | Comma-separated list of additional fields to expand in the response (e.g., content bodies or metadata). |

## Usage examples[​](#usage-examples "Direct link to Usage examples")

-   "Find our incident response runbook in the Engineering space."
    
-   "Search for API documentation pages in Confluence."
    
-   "Show me all pages with 'quarterly review' in the title from the HR space."
    

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Expected page does not appear in results

-   **Possible cause:** The Space key filter is excluding the page, or the Confluence connector does not have permission to read the page.
-   **Fix:** Check whether **Space key** is set. If it is, the tool only searches that space. Clear it or set it to the correct space key. Verify that the missing page is in a space and status that the Confluence connector can crawl, and that the Glean Forge app has permission to read it.

### Too few results or results stop earlier than expected

-   **Possible cause:** The Result limit is too small, or Start index is skipping results.
-   **Fix:** Review the **Result limit** and **Start index** values. A small limit or non-zero start index will reduce how many results appear. The tool fetches up to 300 pages per internal fetch. If there are many matching pages, refine the query or use pagination to step through additional windows.

### Results do not look ranked correctly

-   **Possible cause:** The query phrasing affects which pages are considered exact phrase matches versus partial matches.
-   **Fix:** Check your *Search query* text. The ranking logic prioritizes exact phrase matches in titles first, then pages whose titles contain all the words in your query, and finally those with partial matches. Small changes in phrasing can change which pages are considered an exact phrase or all-words match.

## FAQs[​](#faqs "Direct link to FAQs")

### What does smart ranking mean?

Smart ranking means the tool orders results based on how well the page title matches your query. Titles containing an exact phrase match are ranked highest, followed by titles that contain all of the query words in any order, and then titles with partial word matches. All matching is case-insensitive, and multi-word queries are supported.

### Does the tool modify any Confluence content?

No. This is a read-only tool that only retrieves and ranks page data from Confluence. It does not create, update, or delete any pages, spaces, or metadata.
