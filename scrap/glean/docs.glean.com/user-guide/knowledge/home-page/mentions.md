---
url: "https://docs.glean.com/user-guide/knowledge/home-page/mentions"
canonical: "https://docs.glean.com/user-guide/knowledge/home-page/mentions"
title: "Mentions"
description: "See where you were tagged or assigned across your work apps from Glean Home."
fetched_at: "2026-09-01T13:30:41.691Z"
---
On this page

Keep up with important activity where users tag you across your work apps from your **Home** page. The **Mentions** card surfaces recent activity where you were mentioned or assigned, helping you jump back into relevant conversations and documents quickly. Mentions display chronologically and include quick actions to review, copy links, or dismiss items you no longer need.

This feature aims to streamline the process of staying updated on relevant discussions and tasks, ensuring that you do not miss out on important mentions across your work platforms.

## Mentions card details[​](#mentions-card-details "Direct link to Mentions card details")

-   A **Mentions card** on the home page that surfaces when you have new mentions.
    
-   **A chronological list** with the app icon, title, who mentioned you, and when. Multiple mentions in the same item is consolidated to reduce noise.
    
-   **Quick actions** to mark all as read, dismiss, and copy a link. If Glean is enabled in your org, you can also summarize a mention’s content.
    

![An activity card showing a mention notification on the Glean home page](/img/assistant-navigation-activity-card.png)

A Mentions activity card on the Glean home page.

## Supported sources and triggers[​](#supported-sources-and-triggers "Direct link to Supported sources and triggers")

Below are common events that create a mention in Glean. Only content you have permission to access will appear.

-   Jira integration
    
    -   You will receive notifications in your Mentions Feed when another user tags you in a comment or the body of a Jira issue, even if the issue is not assigned to you.
    -   Notifications are also sent when someone CC’s you in an issue, assigns an issue to you, or comments on an issue that is assigned to you.
    -   The feature covers instances when someone changes or updates an issue assigned to you. However, it does not include follow-up comments on a Jira comment you are tagged in unless you are tagged again.
-   Google Drive integration
    
    -   In Google Drive, you are notified when someone assigns a comment to you, @mentions you in a comment, or shares a document with you. Similar to Jira, if you are @mentioned in the body of a document, it is not currently within the scope of what triggers a mention notification.
-   Other supported apps
    
    -   Mentions can also surface from select connected apps. Current coverage includes Confluence, Google Drive, GitHub, and Jira.

## Behavior and limits[​](#behavior-and-limits "Direct link to Behavior and limits")

-   Time window: Mentions remain visible for up to 10 days (240 hours).
    
-   List size: Up to 50 mentions are retrieved. The card shows up to 5 by default. You can select **More** to view the rest.
    
-   Unread vs. dismiss: There is no manual *unread* state. You can use dismiss to clear items you no longer need. Dismissed mentions are removed from your Mentions queue.
    
-   Consolidation: Glean can consolidate multiple mentions in the same item and across users to reduce noise.
    
-   Enabling/disabling: Glean can set this feature to be enabled or disabled by default, or it can be self-serve.
    

## Using Mentions[​](#using-mentions "Direct link to Using Mentions")

-   The **Mentions** card on the home page gives you a quick view of conversations where you were tagged or mentioned.
-   You can sort mentions by application using the drop-down menu.
-   You can review mentions and mark them as read in bulk, or dismiss individual items.
