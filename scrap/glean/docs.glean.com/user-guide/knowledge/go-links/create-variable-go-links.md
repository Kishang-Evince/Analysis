---
url: "https://docs.glean.com/user-guide/knowledge/go-links/create-variable-go-links"
canonical: "https://docs.glean.com/user-guide/knowledge/go-links/create-variable-go-links"
title: "Create Variable Go Links"
description: "Create Go Links with variable URL segments for search queries, tickets, and other dynamic destinations."
fetched_at: "2026-09-01T13:30:41.369Z"
---
On this page

Variable Go Links redirect to specific destinations when you add a custom value, such as a ticket number. You can make any part of a URL variable and use the Go Link to target destinations such as a **Search results** page or support tickets.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

You need permission to create Go Links in your organization.

## How to create a Variable Go Link[​](#how-to-create-a-variable-go-link "Direct link to How to create a Variable Go Link")

1.  Go to **Library → Go Links** or open the [Go Links dashboard](https://app.glean.com/library/golinks) and click **New Go Link**.
    
2.  Fill in the Destination URL and identify the part of the URL (parameter) to make variable and replace it with **`{*}`**. You will see "**Variable**" pop up when it detects a **`{*}`**.
    

-   Example: **`glean.atlassian.net/123`** -> **`glean.atlassian.net/{*}`**

3.  Fill in "Default Go Link to". This is to specify the default destination URL for the Go Link without a variable.

-   Example: You can specify **go/jira** to be redirected to **glean.atlassian.net**

Note: When typing a variable Go Link, the substitution is denoted by another “/” following go/jira (for example, **go/jira/123**). There can be multiple variable substitutions in a single URL (for example, **go/jira/123/abc**).

### Examples[​](#examples "Direct link to Examples")

Use Variable Go Links to quickly navigate to search result pages

-   `https://app.glean.com/search?q={*}` -> `https://app.glean.com/search?q=expense-policy`
-   `https://github.com/search?q={*}` -> `https://github.com/search?q=fastapi`

*Note that Variable Go Links support spaces (for example, you can search for "how do go links work" using `go/glean/how do go links work`).*

Use Variable Go Links to quickly navigate to specific issues and tickets

-   `https://app.atlassian.net/browse/PROD-{*}` -> `https://app.atlassian.net/browse/PROD-79845`
-   `https://github.com/product/{*}/issues/{*}` -> `https://github.com/product/featureX/issues/BUG-1234`
