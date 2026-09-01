---
url: "https://docs.glean.com/administration/assistant/features/slide-deck-generation"
canonical: "https://docs.glean.com/administration/assistant/features/slide-deck-generation"
title: "Slide deck generation"
description: "Configure slide deck generation so users can create on-brand presentations from Glean."
fetched_at: "2026-09-01T13:29:00.450Z"
---
On this page

Slide deck generation lets users create on-brand slide decks directly from Glean. When users ask Glean to create a presentation, Glean generates an outline, then builds a full deck.

Users can view the generated slides in Glean and then export them:

-   Export to Google Slides and SharePoint
-   Download storybooks as PDF
-   Download PPTX to view in PowerPoint

The available export options depend on your configured integrations.

info

Slide deck generation is on by default. To turn it off or limit access, select **Off** or **On only for admins** in the Admin console.

## Configure slide deck generation[​](#configure-slide-deck-generation "Direct link to Configure slide deck generation")

1

Open the admin console

Go to **Admin console → Assistant → Settings → Slide deck generation**.

2

Upload a template (optional)

To use a company-approved template, click **Upload** and select a `.pptx` file (for example, a QBR, all-hands, or onboarding deck). Glean only supports `.pptx` files for templates.

note

Uploading a template is optional. Without a template, Glean infers styling from your company's existing visual assets.

3

Choose who can use slide deck generation

Select one of the following options:

-   **On for everyone**: All users can generate slide decks (default).
-   **On only for admins**:Only admins can generate full slide decks. Use this to test the feature before rolling it out.
-   **Off**: Slide deck generation is disabled.

4

Save your changes

Click **Save**.

### Template guidelines[​](#template-guidelines "Direct link to Template guidelines")

Upload a template that reflects your company's standard branding:

-   Use a `.pptx` file with the slide layouts, master slides, fonts, and color palettes you want Glean to use.
-   Company-approved templates for common use cases (QBRs, all-hands, onboarding) work best.
-   Glean clones the template's design when generating new decks, so the output matches your brand.
-   Templates must be 16 MB or smaller. The admin uploader enforces this limit and shows a warning banner for oversized `.pptx` files. If your template is too large, the most common cause is large embedded images. Compress or remove them before re-uploading. Templates that are exactly 16 MB are accepted.

note

When you set the feature to **Off**, users who ask Glean to create slides will still get a slide outline in Canvas, but they cannot generate the full deck.

## Slide deck generation setting for agents[​](#slide-deck-generation-setting-for-agents "Direct link to Slide deck generation setting for agents")

The slide deck generation setting globally controls presentation features for both Glean and agents. Toggling this setting determines whether the **Presentation Generation** tool is available within the agent builder.

The slide deck generation setting controls the following:

| Setting | Glean | Agents |
| --- | --- | --- |
| **On for everyone** | All users can generate slide decks | Agent builders can add the Presentation Generation tool from the Glean toolset |
| **On only for admins** | Only admins can generate slide decks | Agent builders can add the Presentation Generation tool from the Glean toolset |
| **Off** | Users get a slide outline in Canvas but cannot generate the full deck | The Presentation Generation tool is not available in the agent builder |

note

In the **Agents** column above, availability applies to Autonomous (Auto Mode) agents. The **Presentation Generation** tool is available in Autonomous agents and in Glean Assistant, but is **not currently available in Workflow-mode agents or prompts**. In those surfaces it does not appear in the **By Glean** tool picker, even when slide deck generation is enabled, because presentation generation runs only in Glean's agentic runtime. To build an agent that generates slide decks, use an Autonomous (Auto Mode) agent.

## Add *Presentation Generation* tool[​](#add-presentation-generation-tool "Direct link to add-presentation-generation-tool")

When slide generation is enabled globally, the **Presentation Generation** tool becomes available under **Glean tools** in the agent builder for Autonomous (Auto Mode) agents. Builders can add this tool to any Autonomous agent, allowing it to generate slide decks using the configured template of your organization.

1

Open the agent builder

Open the **agent builder** in Glean and either create a new agent or select an existing one to edit.

2

Find the Presentation Generation tool

Navigate to the **Tools** tab and look for **Presentation Generation** under the **Glean tools** section.

3

Add and save

Add **Presentation Generation** to the toolset of the agent and save your configuration.

note

When slide generation is turned off by an admin, the **Presentation Generation** tool is hidden from the agent builder. Any existing agents that already use the tool will immediately lose the ability to generate slide decks until the admin setting is turned back on.

## Model restrictions[​](#model-restrictions "Direct link to Model restrictions")

As a Glean Assistant feature, slide deck generation honors your organization's model restrictions. If you turn off a model across Glean or add it to the Assistant blocklist, slide deck generation won't use that model, even if it's the model Glean would otherwise default to for presentations.

When the preferred model is restricted, slide deck generation automatically falls back to an allowed model, so users can still generate decks without interruption.

To manage which models are available, see [Exclude or restrict models](/administration/model-exclusion).

## See also[​](#see-also "Direct link to See also")

-   [Slide generation](/user-guide/assistant/slide-generation) - User guide for creating presentations with Glean Assistant
-   [Exclude or restrict models](/administration/model-exclusion) - Control which models Glean Assistant and Agents can use
-   [Create agents with Auto mode](/agents/auto-mode-agent) - How to build auto mode agents
-   [Overview and concepts](/tools/tools-overview) - How tools work across Glean surfaces
-   [File Upload](/administration/assistant/features/file-upload) - Upload and analyze files in Glean Assistant
-   [Chat sharing](/administration/assistant/features/chat-sharing) - Share Assistant conversations with teammates
