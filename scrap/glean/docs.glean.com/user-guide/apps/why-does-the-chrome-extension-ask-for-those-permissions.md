---
url: "https://docs.glean.com/user-guide/apps/why-does-the-chrome-extension-ask-for-those-permissions"
canonical: "https://docs.glean.com/user-guide/apps/why-does-the-chrome-extension-ask-for-those-permissions"
title: "Why does the Glean browser extension ask for these permissions?"
description: "Understand why the Glean browser extension requests permissions and how it uses them."
fetched_at: "2026-09-01T13:30:38.447Z"
---
On this page

You might have noticed that the Glean browser extension asks for several permissions. This page explains why those permissions are needed and how Glean uses them.

### Read and change all your data on websites you visit[​](#read-and-change-all-your-data-on-websites-you-visit "Direct link to Read and change all your data on websites you visit")

Glean has a variety of features that enhance the user experience and shown in the native tool. Some examples are:

-   Native search replacement where Glean powers search directly in tools like Google Drive and Box
-   Our Glean sticky tab appears on workplace apps where you can verify a document.
-   To use [Go Links](/user-guide/knowledge/go-links/how-go-links-work), it asks for an additional permission to read and change your data on “go,” which enables redirection to shortened links

In order to provide these features, it requires this broad permission – but the access is limited to only workplace applications that work with Glean.

### Replace the page you see when opening a new tab[​](#replace-the-page-you-see-when-opening-a-new-tab "Direct link to Replace the page you see when opening a new tab")

Glean replaces your browser's default homepage with its search experience so you can bring up anything from any tool you use in an instant. You can still search Google from the browser's URL bar or turn off Glean as your homepage at any time from the settings.

### Read and change your browsing history[​](#read-and-change-your-browsing-history "Direct link to Read and change your browsing history")

Glean only uses the "read" part of this permission so it can autocomplete search results for you and improve search result ranking for individual users. The system only uses history from the workplace apps you've connected to Glean and other well known productivity apps that it doesn't currently index (for example, Notion or Airtable), and ignores all other history.

This data will never be shared with any 3rd party.

### Read and change your bookmarks[​](#read-and-change-your-bookmarks "Direct link to Read and change your bookmarks")

Glean shows a dismissible bookmarks bar on its homepage, since replacing Chrome's default homepage also disables the Google bookmarks feature which only shows the bookmarks bar on a new tab.
