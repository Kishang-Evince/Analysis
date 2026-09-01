---
url: "https://docs.glean.com/user-guide/assistant/glean-chat/canvas"
canonical: "https://docs.glean.com/user-guide/assistant/glean-chat/canvas"
title: "Canvas"
description: "Draft, iterate, and refine content with Glean using Canvas"
fetched_at: "2026-09-01T13:30:38.645Z"
---
On this page

Glean Canvas is a co-authoring surface built into Glean. It opens alongside Chat and gives you a dedicated editor where you can draft, refine, and export documents, emails, messages, and presentations with AI assistance grounded in your company’s knowledge.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Some Canvas export features require additional setup by your admin:

-   Export to Gmail and Google Docs requires your admin to configure [Google tools](/administration/tools/setup-tools/google-tools-setup).
-   Export to Outlook and Word requires your admin to configure [Microsoft 365 tools](/administration/tools/setup-tools/m365-tools-setup).

## Open Canvas[​](#open-canvas "Direct link to Open Canvas")

You can open Canvas in any of these ways:

-   **Describe a writing task in chat.** Ask Glean something like "Write a report summarizing what I accomplished this week" or "Draft an email to the team about the new policy." Glean detects the writing intent and opens Canvas automatically.
-   **Use the composer menu.** Click the **+** menu in the chat composer and select **Canvas**.
-   **Move a chat response into Canvas.** If Glean gives you a response in chat that you want to refine further, click **Edit in canvas** at the bottom of that response.
-   **Draft an email or message.** Ask Glean to "write an email" or "draft a Slack message." Canvas opens with a layout tailored to the medium, with the right fields (subject, recipients, channel) already in place.

## Edit and refine[​](#edit-and-refine "Direct link to Edit and refine")

Canvas supports several ways to iterate on your content:

-   **Direct editing.** Type directly in the Canvas editor to add, remove, or rearrange content. All changes are saved automatically.
    
-   **Conversational editing.** Ask Glean in the chat panel to make changes and the updates appear in Canvas. For example, "Make the intro more concise" or "Add a section about timelines."
    
-   **Targeted editing.** Highlight a specific section in Canvas and ask Glean to revise just that part, such as "Rewrite this paragraph in a more formal tone." You can [queue edits and apply them all at once](#queued-edits).
    
-   **Iterative rounds.** Continue chatting with Glean to refine the document across multiple turns. Each round builds on the previous version.
    
    tip
    
    When your request is broad or ambiguous, Glean may display [clarifying questions](/user-guide/assistant/glean-chat/clarifying-questions) before generating the canvas. Answering them helps produce a more relevant first draft.
    

### Personalized writing style[​](#personalized-writing-style "Direct link to Personalized writing style")

Glean adapts to your unique writing style by analyzing your existing communications across connected platforms. Generated content matches your tone, structure, and vocabulary so the output sounds like you, not generic AI. This happens automatically and doesn’t require any setup.

### Citations[​](#citations "Direct link to Citations")

Canvas includes a **Sources** section at the bottom of the document that shows exactly where the content came from. Each citation links back to the original document so you can verify the information.

### Version history[​](#version-history "Direct link to Version history")

Canvas keeps a full version history of your document. Click the version history icon at the top of Canvas to browse previous versions, compare changes, and restore an earlier draft if needed.

### Queued edits[​](#queued-edits "Direct link to Queued edits")

You can queue multiple targeted editing instructions and apply them all at once. This works whether you're drafting a document, email, or message.

## How to queue edits[​](#how-to-queue-edits "Direct link to How to queue edits")

1.  Highlight a specific section you want to change and click **Edit with AI** in the popup menu.
2.  Type your edit instruction and click **\+ Add**. The edit appears in a side panel queue on the right.
3.  To add more edits to the queue, highlight another section, type an instruction, and click **\+ Add** or press **Enter**.
4.  When you're done queuing edits, click **Apply *N* edits** in the top right. Glean revises the document in a single pass, addressing every edit while preserving the rest of your content.

## Export and share[​](#export-and-share "Direct link to Export and share")

When your content is ready, export it to the tools your team already uses. The export options available depend on the type of content and the integrations your admin has configured.

### Documents[​](#documents "Direct link to Documents")

| Destination | How to export |
| --- | --- |
| Google Docs | Click the export menu and select **Export to Docs**. A new Google Doc is created with formatting preserved. |
| Microsoft Word | Click the export menu and select **Export to Word**. A `.docx` file is created. |
| Download as Markdown | Click the export menu and select **Download Markdown**. A clean `.md` file is saved to your device. Glean-hosted images are preserved as clickable links. |

### Emails and messages[​](#emails-and-messages "Direct link to Emails and messages")

When you draft an email or message in Canvas, the export options adapt to the medium:

| Destination | How to export |
| --- | --- |
| Gmail | Click the primary export button to open a draft in Gmail with subject, recipients, and formatting preserved. |
| Outlook | Click the primary export button to open a draft in Outlook. |
| Slack | Export your message to a Slack channel or DM. |
| Microsoft Teams | Export your message to a Teams channel or chat. |

### Presentations[​](#presentations "Direct link to Presentations")

Canvas serves as the working surface for slide generation. You refine an outline in canvas, generate a branded presentation, and then export the deck to the format or destination that fits your workflow. Export options include PowerPoint, Google Slides, SharePoint, PDF, and Storybook Slides. See [Slide generation](/user-guide/assistant/slide-generation) for the full workflow and guidance on choosing the right output.

You can preview generated slides and images directly inside Canvas without downloading them first.

### Spreadsheets[​](#spreadsheets "Direct link to Spreadsheets")

Canvas is also the working surface for spreadsheet generation. Iterate on rows and columns with Glean in Canvas and then export to Excel, Google Sheets, or CSV — or copy the table to your clipboard. See [Spreadsheet generation](/user-guide/assistant/spreadsheet-generation) for the full workflow.

## Canvas content types[​](#canvas-content-types "Direct link to Canvas content types")

Canvas adapts its layout and export options based on what you’re creating:

| Content type | Description | Primary export targets |
| --- | --- | --- |
| **Document** | Reports, proposals, knowledge base articles, and other long-form writing. | Google Docs, Word, Markdown |
| **Email** | Email drafts with subject line and recipient fields. | Gmail, Outlook |
| **Message** | Chat messages for Slack or Teams. | Slack, Teams |
| **Slides** | Presentation outlines that can be turned into branded decks. | PowerPoint, Google Slides, SharePoint, PDF, Storybook Slides |
| **Spreadsheets** | Structured tables with column headers and rows. | Excel, Google Sheets, CSV |
| **Interactive artifacts** | Rich HTML pages, dashboards, and visualizations that live natively in Glean. | Share via Glean link |

For interactive artifacts such as dashboards, infographics, and lightweight apps, see [Interactive artifacts](/user-guide/assistant/html-artifacts).

## Find your canvases[​](#find-your-canvases "Direct link to Find your canvases")

-   **Thread history.** Look for the Canvas icon in your conversation thread history to see which threads have a Canvas at a glance.
    
-   **Search.** Canvas content is indexed and discoverable through Glean search.
    
    info
    
    Canvas content indexing is undergoing a managed rollout. It may not be available for your organization yet.
    

## Use cases[​](#use-cases "Direct link to Use cases")

-   **Emails and reports.** Draft professional emails, reports, or proposals that reflect your authentic voice.
-   **Meeting summaries.** Generate meeting recaps with key decisions and next steps by pulling from transcripts, notes, and follow-up messages.
-   **Knowledge base articles.** Draft internal documentation and how-to guides that maintain consistent terminology while referencing existing company knowledge.
-   **Status reports.** Compile progress updates by aggregating information from project tools, emails, and conversations.
-   **Presentations.** Create slide outlines and generate branded decks from Canvas content.
-   **Spreadsheets.** Build structured tables and export to Excel, Google Sheets, or CSV.
-   **Interactive dashboards.** Build visual, interactive pages that you can share with a stable Glean link.

## Known limitations[​](#known-limitations "Direct link to Known limitations")

-   **Export formatting.** Glean-hosted images are converted to text links when exporting to Google Docs or Word, because those images require Glean authentication to render in external apps. Table formatting may also be partially simplified during export.
-   **No two-way sync.** After you export a Canvas to an external tool (for example, Google Docs), edits made in the external tool are not synced back to Canvas.
-   **Single template for slides.** Only one company-wide PowerPoint template is supported for slide generation. Individual users can’t override the template.

## See also[​](#see-also "Direct link to See also")

-   [Slide generation](/user-guide/assistant/slide-generation) - Create branded presentations from Canvas content.
-   [Spreadsheet generation](/user-guide/assistant/spreadsheet-generation) - Create spreadsheets from Canvas content and export to Excel, Google Sheets, or CSV.
-   [Image generation](/user-guide/assistant/image-generation) - Generate and edit visuals in Glean.
-   [Interactive artifacts](/user-guide/assistant/html-artifacts) - Publish rich HTML pages, dashboards, and apps from Canvas.
-   [Google tools setup](/administration/tools/setup-tools/google-tools-setup) - Admin setup for Google Docs, Sheets, and Gmail export.
-   [Microsoft 365 tools setup](/administration/tools/setup-tools/m365-tools-setup) - Admin setup for Word, Outlook, and Teams export.
