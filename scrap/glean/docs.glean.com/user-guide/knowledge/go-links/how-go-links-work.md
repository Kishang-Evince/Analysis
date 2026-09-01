---
url: "https://docs.glean.com/user-guide/knowledge/go-links/how-go-links-work"
canonical: "https://docs.glean.com/user-guide/knowledge/go-links/how-go-links-work"
title: "How Go Links work"
description: "Create short, memorable go/links for important destinations across your company"
fetched_at: "2026-09-01T13:30:41.428Z"
---
On this page

Go Links are short company bookmarks in the form **go/link**. After someone shares or mentions a Go Link, anyone with access can open it in the browser and land on the right destination.

For example, you might create **go/401k** for a benefits portal, **go/it-help** for an IT help desk, or **go/sprint-planning** for a Jira project. Glean also supports variable and appending Go Links, so one Go Link can reach many related destinations.

note

Go Links require the [Glean browser extension](https://chrome.google.com/webstore/detail/glean/cfpdompphcacgpjfbonkdokgjhgabpij) or DNS-based redirection. If you use the extension, allow it to redirect Go Links when prompted. For DNS redirection, contact your Glean account team.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Access to Glean in the browser
-   The Glean browser extension, or DNS redirection set up by your organization

## How to create a Go Link[​](#how-to-create-a-go-link "Direct link to How to create a Go Link")

Glean allows you to create Go Links in several ways. The following steps show how to create a Go Link from the Library:

1.  Open [**Library → Go Links**](https://app.glean.com/library/golinks).
2.  Click the dropdown next to **Create artifact**, then click **Go Link**.
3.  Paste the destination under **Destination URL**.
4.  Enter the **Go Link name** (the part after **go/**).
5.  Optionally add a **Description** so others know what the link is for.
6.  Click **Create**.

The name must be unique. Allowed characters are letters, numbers, and `.` `:` `@` `&` `~` `-` `_`.

note

Forward slashes in Go Link names can be enabled on request, but that can limit [variable Go Links](/user-guide/knowledge/go-links/create-variable-go-links).

When someone opens a Go Link, Glean ignores punctuation differences for matching. For example, **go/q4-goals**, **go/q4\_goals**, and **go/q4goals** resolve to the same destination, so you cannot create separate Go Links that differ only by punctuation.

By default, anyone in your organization can edit a Go Link. To limit edits, open **More options** and select **Restrict edit access to only me**.

For variable Go Links, see [Create variable Go Links](/user-guide/knowledge/go-links/create-variable-go-links).

## Ways to create Go Links[​](#ways-to-create-go-links "Direct link to Ways to create Go Links")

-   **Library → Go Links:** Click **Create**, then **Go Link**.
-   **Homepage:** Click **New** in the top right, then **Go Link**.
-   **Search result:** Open **More options** on a result, then select **Create Go Link**.
-   **Extension sidebar:** Open the sidebar with **Ctrl + J** (Mac) or **Alt + J** (Windows) and create a Go Link for the current page. If the page already has one, it appears there.
-   **Not-found page:** If you open a Go Link that does not exist, you can create it from that page.

## Use a Go Link[​](#use-a-go-link "Direct link to Use a Go Link")

1.  Confirm the browser extension can redirect Go Links, or that DNS redirection is set up.
2.  Type the Go Link in the browser address bar, for example **go/onboarding**.
3.  Press Enter to open the destination.

## Share a Go Link[​](#share-a-go-link "Direct link to Share a Go Link")

Copy and paste a Go Link in email or Slack, or tell someone to open **go/onboarding**.

In public Slack channels, [Glean in Slack](/user-guide/embedded-integrations/slack/) can unfurl Go Links automatically.

If a document has one or more Go Links, they also appear next to the document title in Glean search results.

## Manage Go Links[​](#manage-go-links "Direct link to Manage Go Links")

-   Anyone in the organization can view Go Links under [**Library → Go Links**](https://app.glean.com/library/golinks).
-   Anyone can create a Go Link.
-   If the creator selects **Restrict edit access to only me**, only the owner, Go Links moderators, and admins can edit or delete it.
-   Otherwise, anyone in the organization can edit it.
-   Opening a Go Link still respects permissions in the destination app.

### Usage insights[​](#usage-insights "Direct link to Usage insights")

If you have access to Insights, open **Insights → Go Links** to see visits and unique visits. You can filter by department. Hover a Go Link for recent usage detail.

note

Insights may show only the highest-traffic Go Links for the selected period. Lower-usage Go Links might not appear in the list.

## See also[​](#see-also "Direct link to See also")

-   [Create variable Go Links](/user-guide/knowledge/go-links/create-variable-go-links)
-   [How to make the most of Go Links](/user-guide/knowledge/go-links/how-to-make-the-most-of-go-links)
-   [Go Links troubleshooting](/user-guide/knowledge/go-links/troubleshooting)
