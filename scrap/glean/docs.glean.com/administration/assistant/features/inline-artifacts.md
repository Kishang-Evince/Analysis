---
url: "https://docs.glean.com/administration/assistant/features/inline-artifacts"
canonical: "https://docs.glean.com/administration/assistant/features/inline-artifacts"
title: "Inline artifacts"
description: "Control whether Glean renders charts and diagrams inline in chat responses."
fetched_at: "2026-09-01T13:29:00.254Z"
---
On this page

Inline artifacts let teammates create data visualizations and diagrams directly in Glean chat. When a user asks for a chart or diagram, Glean renders it as a compact, interactive widget inside the response instead of describing it in text. When inline artifacts are off, Glean answers in text instead.

info

Inline artifacts are on for everyone by default. To limit or turn off the feature, select **On only for admins** or **Off** in the **Admin console**.

## Configure inline artifacts[​](#configure-inline-artifacts "Direct link to Configure inline artifacts")

1

Open the admin console

Go to **Admin console → Assistant → Settings → Inline artifacts**.

2

Choose who can use inline artifacts

Select one of the following options:

-   **On for everyone**: All users see charts and diagrams rendered inline in chat (default).
-   **On only for admins**: Only admins see inline artifacts. Use this to preview the feature before rolling it out.
-   **Off**: Glean answers in text instead of rendering inline artifacts.

3

Save your changes

Click **Save**.

## How inline artifacts relate to interactive artifacts[​](#how-inline-artifacts-relate-to-interactive-artifacts "Direct link to How inline artifacts relate to interactive artifacts")

Inline artifacts and [Interactive artifacts](/user-guide/assistant/html-artifacts) are separate settings that you configure independently:

-   **Inline artifacts** are compact charts or diagrams rendered directly in a chat response. They fall back to a text answer when turned off.
-   **Interactive artifacts** are full, shareable pages that live in Glean Canvas with a stable link.

A user can save an inline artifact as a full interactive artifact in Canvas when Interactive artifacts are also turned on.

## Pricing and credit usage[​](#pricing-and-credit-usage "Direct link to Pricing and credit usage")

Generating inline artifacts consumes [FlexCredits](/administration/management/usage/flexcredits-dashboard) based on the model tier used. Auto mode selects a model optimized for creating visualizations, which may be a premium model enabled in your deployment. Inline artifacts require premium artifact availability in your deployment.

## See also[​](#see-also "Direct link to See also")

-   [Inline artifacts](/user-guide/assistant/inline-artifacts) - User guide for requesting charts and diagrams inline in chat.
-   [Interactive artifacts](/user-guide/assistant/html-artifacts) - Create and share full interactive artifacts from Canvas.
-   [Slide deck generation](/administration/assistant/features/slide-deck-generation) - Configure presentation generation for Glean.
-   [Chat sharing](/administration/assistant/features/chat-sharing) - Share Glean conversations with teammates.
