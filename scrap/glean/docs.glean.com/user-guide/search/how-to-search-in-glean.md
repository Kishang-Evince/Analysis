---
url: "https://docs.glean.com/user-guide/search/how-to-search-in-glean"
canonical: "https://docs.glean.com/user-guide/search/how-to-search-in-glean"
title: "Search in Glean"
description: "Find everything you need in Glean with search basics, filters, and advanced features"
fetched_at: "2026-09-01T13:30:42.887Z"
---
On this page

This guide covers all the ways you can start searching in Glean:

-   Search basics
-   Filters to narrow down results
-   Search for people
-   Search from wherever you work
-   Share knowledge from Glean
-   Advanced features

## Search basics[​](#search-basics "Direct link to Search basics")

![The Glean chat bar with the Explore a topic placeholder](/img/assistant-navigation-chat-bar.png)

Type a query in the chat bar to search or start a conversation.

### Search for words from anywhere in the document[​](#search-for-words-from-anywhere-in-the-document "Direct link to Search for words from anywhere in the document")

Glean doesn't search document titles alone. You can search for whatever you remember about a document, such as specific phrases or keywords, and Glean returns the most relevant results.

You can run queries as either keywords or phrased as questions.

When you enter a short, keyword-style query in Glean like a title or name, Glean shows a concise set of top search results directly in the conversation so you can open the right document without leaving the conversation. For more information, see [Search results in chat](/user-guide/assistant/glean-chat/search-and-autocomplete#search-results-in-chat).

### Navigate to documents with autocomplete[​](#navigate-to-documents-with-autocomplete "Direct link to Navigate to documents with autocomplete")

If you've visited a document before, start typing some words from the title to see it appear as a suggestion in autocomplete.

With the [Glean browser extension](https://chrome.google.com/webstore/detail/glean/cfpdompphcacgpjfbonkdokgjhgabpij), you'll also see documents from enterprise apps that Glean hasn't indexed.

### Use quotes to require a word[​](#use-quotes-to-require-a-word "Direct link to Use quotes to require a word")

To ensure that a word or phrase appears in all results, wrap it in quotes.

For example: **`featureX “featureY”`** or **`featureX “some phrase”`**

Two words in quotes require those words to appear in the same order, next to each other in the document. If you want to ensure that words appear independently anywhere in the document, put separate quotes around each word.

## Filters[​](#filters "Direct link to Filters")

There are two ways to filter in Glean:

1.  Type filter keywords directly in the query box.
2.  Select filters after you see results.

The following are the search filters you can use in Glean.

### Find recent results with “updated”[​](#find-recent-results-with-updated "Direct link to Find recent results with “updated”")

Use the **updated** filter to find documents updated in a certain time frame, for example **`updated:yesterday`**.

Updated time is one of the common filters shown across the top of the results page.

### Find a person associated with a document with “from”[​](#find-a-person-associated-with-a-document-with-from "Direct link to Find a person associated with a document with “from”")

Use the **from** filter to find people associated with a document across any tool. For example, this returns results where the person is an owner or contributor for a Google Drive, Dropbox, or Box document, or an assignee, reporter, or commenter in Jira.

You can use the **from** filter on top of the results page, or include **`from:`** as you're formulating your query and select one of the names that appear in autocomplete suggestions.

Tips

-   Use **`from:me`** to find documents related to you.
-   If you need to narrow it down to a specific field (for example, the owner of the document), use the app-specific filters discussed in later sections.

### Find specific document types with “type”[​](#find-specific-document-types-with-type "Direct link to Find specific document types with “type”")

Use the **type** filter to narrow by a specific document type (such as a **presentation** in Google Drive or a **bug** in Jira).

You can use the **type** filter on top of the results page, or include **`type:`** as you're formulating your query and select an autocomplete suggestion.

### Find previously viewed documents with “my history”[​](#find-previously-viewed-documents-with-my-history "Direct link to Find previously viewed documents with “my history”")

Use the **my history** filter to narrow your results to documents you've already viewed.

Type **`my:history`** into the query box or use the filters at the top of the results page.

This filter applies to documents you've viewed in the past six months.

### Filter by app[​](#filter-by-app "Direct link to Filter by app")

Select the app name in the right side filters to narrow results to that app.

You can also use **`app:`** in the query to pre-filter to a specific app.

### Use dynamically suggested filters within an app[​](#use-dynamically-suggested-filters-within-an-app "Direct link to Use dynamically suggested filters within an app")

Once you narrow down to a specific app, you'll see dynamically populated filters based on the results on the page. Use these to refine what you're looking for. All filters can also be typed while you're formulating the query.

## Search for people[​](#search-for-people "Direct link to Search for people")

### Find contact info and details[​](#find-contact-info-and-details "Direct link to Find contact info and details")

Search for a person's name to find contact info, see their org chart, and view recent documents and activity from the person. You can also search by a department or role, for example `Engineering`.

### Learn more about a document owner[​](#learn-more-about-a-document-owner "Direct link to Learn more about a document owner")

When you see a name next to a document, you can select the person's name to search for the document owner.

## Search from wherever you work[​](#search-from-wherever-you-work "Direct link to Search from wherever you work")

Use the browser extension sidebar, Slack, or the desktop app to search without leaving your current context. For more information, see [Extension sidebar](/user-guide/apps/extension-sidebar).

## Share knowledge[​](#share-knowledge "Direct link to Share knowledge")

To send results to someone else, copy the URL of your Glean query and send it to anyone on your team, for example [https://app.glean.com/search?q=example](https://app.glean.com/search?q=example).

Their results are personalized, so they won't see any sensitive content they don't have access to, even if you see it in your results.

## Advanced features[​](#advanced-features "Direct link to Advanced features")

### Advanced filters[​](#advanced-filters "Direct link to Advanced filters")

For complex workflows, you might use apps with many custom fields, like Salesforce, Zendesk, and Jira.

Glean extracts those custom fields when it indexes your content, so you can use them in your searches.

Select the **info** icon in the right corner of the search box to see the fields that are available for each app.

You can create a query that filters by a single advanced filter, then build on it with additional filters (either the standard ones on the right side or other advanced filters). You can also add keywords on top.

**Example:**

If you’re in sales, answer the common question *“Does anyone have a customer that has…?”*

Search for **`status:"closed won" vertical:"xyz" feature name`** and narrow down to Salesforce to run an ad-hoc report looking for Won deals in the "xyz" vertical that mention a specific feature.

For the full syntax, app-specific operators like Jira, Google Drive, Slack, and more, see [Advanced search filters in Glean](/user-guide/advanced/advanced-search-filter).

### Filter out certain apps[​](#filter-out-certain-apps "Direct link to Filter out certain apps")

If you know certain apps aren't relevant for your query, you can remove them from your search results. Select the filter icon at the top of the app filters and change the list of apps you'd like to see results from.

### Search for anything[​](#search-for-anything "Direct link to Search for anything")

If you're looking for a folder but don't want to use a search operator, you can type what you're searching for in plain text.

For example, if you're looking for the Product folder, search **`product folder`**.

You can also type something like **`pptx`** or **`pdf`** at the end of your query to focus on specific document types.

This approach works in most cases. If it doesn't filter results as expected, use the specific filters mentioned earlier.

### Zoom meeting results[​](#zoom-meeting-results "Direct link to Zoom meeting results")

When relevant, Zoom meeting transcripts appear in search results. For more information, see [Zoom meeting transcripts](/user-guide/knowledge/meetings-and-calendar/zoom-meeting-transcripts).
