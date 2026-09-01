---
url: "https://docs.glean.com/tools/connector/github/search-repos"
canonical: "https://docs.glean.com/tools/connector/github/search-repos"
title: "Search repositories"
description: "Searches GitHub repositories by query with optional sorting and pagination"
fetched_at: "2026-09-01T13:30:01.181Z"
---
On this page

*GitHub search repositories* tool searches GitHub repositories that match a query string. This is a read-only tool that returns repository metadata with support for sorting, filtering, and pagination.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Your admin must install and configure the GitHub connector, add GitHub tools under **Admin Console** → **Platform** → Tools, and enable this tool.
    
-   A GitHub app must be installed on the relevant organization(s) and linked to the correct GitHub connector in the Glean admin console.
    

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameter | Type | Description |
| --- | --- | --- |
| Search query | String | Text or structured query to find matching repositories (e.g., `language:python`, `org:facebook`, `topic:react`). |
| Sort by | String | Field to sort results by (e.g., `stars`, `forks`, `updated`). |
| Order | String | Result order: `asc` (ascending) or `desc` (descending). |
| Page | Integer | Page number of results to return for pagination. |
| Results per page | Integer | Number of results to return per page (maximum 100). |

## Usage examples[​](#usage-examples "Direct link to Usage examples")

-   "Find the most popular Python repositories on GitHub".
    
-   "Show me React repositories from Facebook".
    
-   "Find recently updated TypeScript projects with more than 100 stars".
    

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Authentication or authorization failure

-   **Possible cause:** The GitHub connector is not fully set up, the GitHub app is not installed on the target organization, or the app is missing required permissions.
-   **Fix:** Confirm that the GitHub connector is installed and authenticated, that the GitHub app is installed on the correct organization(s), and that it has the necessary repository scopes. If using a custom app, verify that permissions to search repositories are enabled.

### No results or empty results for search query

-   **Possible cause:** The search query may have invalid syntax, the qualifiers may not match any repositories, or the authenticated user may not have access to matching repositories.
-   **Fix:** Verify the search query syntax using GitHub's search qualifiers documentation. Try simplifying the query (e.g., start with just `language:python`) to confirm the connection works. Note that private repositories are only returned if the authenticated user has access to them.

### Complex or compound queries return no results

-   **Possible cause:** Some combinations of search qualifiers may not work as expected due to limitations in the GitHub Search API.
-   **Fix:** Try simplifying the query by using fewer qualifiers. For example, if `repo:owner/name language:python` returns no results, try just `repo:owner/name` first to confirm the basic query works.

### Rate limiting errors

-   **Possible cause:** GitHub imposes rate limits on search API calls, which can be reached with frequent searches.
-   **Fix:** Reduce the frequency of search queries or implement caching for common searches. GitHub's rate limits for search are typically lower than other API endpoints. Contact your admin to review the GitHub app's rate limit status.

## FAQs[​](#faqs "Direct link to FAQs")

### What search query syntax is supported?

The tool supports GitHub's repository search qualifiers including: `language:`, `org:`, `user:`, `topic:`, `stars:`, `forks:`, `created:`, `pushed:`, `size:`, `license:`, `is:public/private`, and text search. You can combine multiple qualifiers with spaces. For example: `language:python stars:>1000 topic:machine-learning`.

### How many repositories can this tool return?

The tool can return up to 100 repositories per page using the *Results per page* parameter. For larger result sets, use the *Page* parameter to paginate through results. GitHub's search API typically returns up to 1000 total results per query.

### Can I search for private repositories?

Yes, the tool will return private repositories that the authenticated user has access to. The results depend on the permissions of the connected GitHub account and the repositories they can access.

### What sorting options are available?

You can sort by: `stars` (star count), `forks` (fork count), `help-wanted-issues`, `updated` (last update date), or leave empty for relevance-based sorting. Use the **Order** parameter to specify ascending (`asc`) or descending (`desc`) order.

### How is this different from listing repositories for an organization?

This tool searches across all of GitHub (or within the authenticated user's accessible repositories) using query qualifiers. To list repositories for a specific organization or user, use the List repositories tool instead.
