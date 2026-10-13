---
url: "https://docs.glean.com/administration/management/appearance/home-page"
canonical: "https://docs.glean.com/administration/management/appearance/home-page"
title: "Home page"
description: "Customize the layout of the Glean home page, including background images, cards, and quick actions."
fetched_at: "2026-10-13T08:49:16.085Z"
---
On this page

![The Glean home page showing the refreshed navigation and activity cards](/img/chat/glean-chat-ui.png)

The Glean home page with the refreshed layout.

The home page settings menu allows admins to define the look and feel of the Glean home page for employees at their company.

This is the primary place where your employees will interact with Glean across their workflows.

note

You must be assigned the **Admin** or **Super Admin** roles to be able to customize the workspace appearance.

You can personalize the Home page for all of your employees by adjusting:

-   **Cards:** Cards are the sections that are visible on the Glean home page for each of your users. These can include suggested documents, collections, and people celebrations.
-   **Quick actions:** Quick actions appear under the **New** button in the home page and provide shortcuts for employees to create content in connected apps.
-   **Default wallpapers:** You can set the default wallpaper that is used for both light and dark themes when users first open Glean.
-   **Background changes:** You can decide whether teammates can replace that default wallpaper with a background of their own.

* * *

## Cards[​](#cards "Direct link to Cards")

 [Admin console → Appearance → Manage home page → Cards](https://app.glean.com/admin/preview/cards)

Use the **Cards** menu to choose which widgets appear on your employees' Glean home page.

note

With the refreshed Glean experience, some card content (such as Mentions) may also appear as personalized activity cards on the home page. The settings below still control which card types are available to users.

The cards available on the home page:

-   **Suggested**: Recently and frequently accessed content across all apps.
-   **Recents**: Recently accessed content, with the most recent on top.
-   **Mentions**: Notifies users about relevant conversations, updates, and tasks across integrated platforms like Jira and Google Drive whenever they are tagged, assigned, or referenced.
-   **Trending**: Top content viewed within a teammate's department.
-   **People Celebrations**: See who's new and celebrate users' work anniversaries.
-   **Collection**: A list of resources organized by topic, for example, HR Policies, New Hire Resources, and more.
    -   You must first add a collection from [**Collections**](https://app.glean.com/knowledge/collections).
    -   You can add multiple collections to the home page.
    -   The collections card supports different visibility settings. For example, you might make a "New Hire" collection visible for employees with a tenure under 90 days.

### Mentions card[​](#mentions-card "Direct link to Mentions card")

The Mentions card helps you stay on top of relevant discussions and tasks across your work platforms. When there are new mentions, **Home** shows the Mentions card, otherwise it shows the Suggested card.

#### Behavior and limits[​](#behavior-and-limits "Direct link to Behavior and limits")

-   Mentions remain visible for up to 10 days (240 hours).
-   Up to 50 mentions are retrieved, and the card shows up to 5 by default, with an option to view more.
-   Mentions are chronological and **consolidated** to reduce noise.

#### Supported sources and triggers[​](#supported-sources-and-triggers "Direct link to Supported sources and triggers")

-   Jira integration
    -   You receive notifications in your Mentions Feed when another user tags you in a comment or the body of a Jira issue, even if the issue is not assigned to you.
    -   Glean sends notifications when someone CC's you in an issue, assigns an issue to you, or comments on an issue that is assigned to you.
    -   The Jira integration covers instances when someone changes or updates an issue assigned to you. However, it does not include follow-up comments on a Jira comment you are tagged in unless you are tagged again.
-   Google Drive integration
    -   Glean notifies you when someone assigns a comment to you, @mentions you in a comment, or shares a document with you. If somebody @mentioned you in the body of a document, the Google Drive integration does not trigger a mention notification.
-   Other supported apps
    -   Mentions can also surface from select connected apps, such as Confluence, Google Drive, GitHub, and Jira.

#### Permissions and visibility[​](#permissions-and-visibility "Direct link to Permissions and visibility")

Only items where the user has at least read access will appear.

#### Configuration[​](#configuration "Direct link to Configuration")

You can enable or disable the Mentions card by default for your domain, or you can manage it as a self-serve card in **Home page** settings.

* * *

## Quick actions[​](#quick-actions "Direct link to Quick actions")

 [Admin console → Appearance → Manage home page → Quick actions](https://app.glean.com/admin/preview/quickActions)

Use the **Quick actions** menu to choose which tools appear under the **New** button in the home page.

The available tools depend on the connectors that you have connected to Glean.

If you would like to add additional links to this menu other than what is available to be selected, contact Glean support.

* * *

## Default wallpaper[​](#default-wallpaper "Direct link to Default wallpaper")

 [Admin console → Appearance → Manage home page → Background](https://app.glean.com/admin/preview/themes)

![The Themes menu, where admins set the default background image for all users](/img/administration/management/customization/home-page/home-page.20240205094051016.png)

The **Themes** menu is where you can customize the default background image that is used for all users at your company when they first access Glean. Users who have set their background from Glean's library will not have their choices affected by any change in the default background.

Images must be PNG, JPG, or WebP, and should be 2400 x 1600px. Larger images are scaled down, with the initial aspect ratios retained.

Different images can be set for light mode and dark mode.

* * *

## Background changes[​](#background-changes "Direct link to Background changes")

By default, teammates can pick their own home page background from Glean's wallpaper library. To keep everyone on the wallpaper you set, navigate to  [Admin console → Appearance](https://app.glean.com/admin/appearance), find the **Background changes** section, and turn off **Allow teammates to choose their own home-page background**.

When the setting is off:

-   The **Background** section no longer appears in each teammate's home page settings.
-   Everyone sees your default wallpaper for their current theme. If you haven't set one, Glean uses its own default.
-   Backgrounds that teammates chose earlier are overridden, so their saved choice no longer displays.

Turning the setting back on restores the **Background** section, along with each teammate's previous choice.

note

Background selection is part of the older home page experience. Teammates on the new home page don't see a **Background** option regardless of this setting.
