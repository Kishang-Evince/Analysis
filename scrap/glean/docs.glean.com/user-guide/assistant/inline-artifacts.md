---
url: "https://docs.glean.com/user-guide/assistant/inline-artifacts"
canonical: "https://docs.glean.com/user-guide/assistant/inline-artifacts"
title: "Inline artifacts in Glean"
description: "Ask Glean to render a chart, diagram, or other interactive widget directly inside a chat response"
fetched_at: "2026-09-01T13:30:39.166Z"
---
On this page

When you ask for a chart or a diagram, Glean can render it as an interactive widget right inside the chat response.

![A Glean chat response showing an inline bar chart comparing meeting time and independent work time across weekdays](/img/chat/inline-artifacts.png)

Glean answers a visual question with an interactive chart rendered inline in the chat response

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Inline artifacts are controlled by the **Inline artifacts** setting in the admin console. When the setting is on, Glean renders a chart or diagram inline whenever you ask for one. When it's off, Glean answers in text instead.

If you don't see interactive widgets inline with your responses:

-   Your admin may not have turned on the **Inline artifacts** setting for your organization.
-   Your browser may need a hard refresh after a recent rollout.

## How inline artifacts work[​](#how-inline-artifacts-work "Direct link to How inline artifacts work")

Inline artifacts appear when you ask for a chart or a diagram - you don't need to switch modes or use a special command. Request the visual and Glean renders it directly in the response.

1

Ask for a chart or diagram

Ask Glean for the visual you want. For example: *"Create a chart that compares last quarter's revenue across regions"* or *"Show our onboarding process as a flow diagram."*

2

Glean renders an inline widget

Glean responds with a compact, interactive chart or diagram inside the chat, instead of describing the answer in text.

3

Interact with the widget

The widget stays interactive after the response finishes generating. You can hover over and explore the chart or diagram.

4

Copy as an image

Copy the widget's output as an image to drop into a document, slide, or message.

## What Glean generates[​](#what-glean-generates "Direct link to What Glean generates")

When you ask for a visual, Glean produces:

-   A small, self-contained interactive widget (a chart, diagram, comparison, or similar) rendered as an HTML component.
-   A self-contained interactive chart or diagram rendered directly in the chat response.
-   A widget you can save as a full interactive artifact in Canvas for further editing and sharing.

## Use cases[​](#use-cases "Direct link to Use cases")

Inline artifacts make charts and diagrams easy to request, including:

-   **Quick charts from live data**: Visualize numbers Glean pulled during the same turn, such as revenue across regions or headcount by team.
-   **Trends and comparisons**: Chart values over time or compare options side by side with bar, line, or pie charts.
-   **Process and concept diagrams**: Turn a process, workflow, or framework into a flow diagram instead of a list of steps.
-   **Relationships and structures**: Diagram how systems, teams, or steps connect.

## Tips for better results[​](#tips-for-better-results "Direct link to Tips for better results")

-   **Ask for the visual you want.** Naming the format ("compare these as a bar chart" or "show this as a flow diagram") gives Glean a clearer target.
-   **Reference internal sources.** Ask Glean to pull from specific documents, projects, or teams so the chart or diagram is grounded in real data.

## Frequently asked questions[​](#frequently-asked-questions "Direct link to Frequently asked questions")

### How do I get an inline chart or diagram?

Ask Glean for one. When the **Inline artifacts** setting is on for your organization, Glean renders a chart or diagram inline whenever you request a visual.

### What happens if inline artifacts are turned off?

Glean answers in text instead. Inline artifacts fall back cleanly, so you always get a useful response.

### How is an inline artifact different from a full interactive artifact?

An inline artifact is a compact chart or diagram rendered directly in the chat response. A full interactive artifact lives in Canvas with a stable URL you can share.

### Can I save or share an inline artifact?

Select **Copy** to copy the widget as an image and share it.

## See also[​](#see-also "Direct link to See also")

-   [Interactive artifacts](/user-guide/assistant/html-artifacts) - Publish and share full interactive artifacts from Canvas with a stable link.
-   [Canvas](/user-guide/assistant/glean-chat/canvas) - Learn about using Canvas for content creation.
-   [Best Practices](/user-guide/assistant/best-practices) - Tips for getting better results from Glean.
