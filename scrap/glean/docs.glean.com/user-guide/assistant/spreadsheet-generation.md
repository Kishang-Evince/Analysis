---
url: "https://docs.glean.com/user-guide/assistant/spreadsheet-generation"
canonical: "https://docs.glean.com/user-guide/assistant/spreadsheet-generation"
title: "Spreadsheet Generation in Glean"
description: "Create spreadsheets from natural-language prompts in Glean Canvas and export to Excel, Google Sheets, or CSV"
fetched_at: "2026-09-01T13:30:39.633Z"
---
On this page

Glean can turn a chat prompt into a spreadsheet, or take a spreadsheet you already have and work with it in Canvas. Iterate on the rows and columns with Glean in Canvas, then export to Excel, Google Sheets, or CSV — or copy the table straight into another tool.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Spreadsheet generation is available wherever Glean and Canvas are enabled. There is no admin template or separate setup step.

If you don't see the option to create a spreadsheet, the most common causes are:

-   Canvas is not yet enabled for your organization.
-   You need to hard-refresh the page after recent feature rollouts.

## How spreadsheet generation works[​](#how-spreadsheet-generation-works "Direct link to How spreadsheet generation works")

Spreadsheet generation uses Canvas as the working surface. You describe the spreadsheet you want in chat, refine it with follow-up prompts to Glean, and then export it in your preferred format.

### Start from chat[​](#start-from-chat "Direct link to Start from chat")

1

Ask Glean for a spreadsheet

In Glean, describe the spreadsheet you want. For example: *"Build a spreadsheet comparing our top five competitors across pricing, target market, and key features."*

2

Iterate with Glean in Canvas

Glean opens Canvas with a draft spreadsheet. Use follow-up prompts to add or remove columns, change which rows appear, restructure the data, or pull in additional sources until the spreadsheet matches what you need.

3

Export the spreadsheet

Use the export control in Canvas and choose your format:

-   **Excel** — downloads a `.xlsx` file you can open in Excel or any compatible application.
-   **Google Sheets** — exports the spreadsheet directly to your Google Drive.
-   **CSV** — downloads a plain `.csv` file for use in any tool that accepts CSV input.
-   **Copy to clipboard** — copies the table contents so you can paste into another spreadsheet, doc, or message.

4

Open and share

Open the exported file in Excel, Google Sheets, or your tool of choice to continue editing and share with your team.

### Start from an existing Canvas[​](#start-from-an-existing-canvas "Direct link to Start from an existing Canvas")

If you already have a Canvas open — for example, a brainstorm or research summary — you can ask Glean to turn the relevant content into a spreadsheet from the same Canvas without starting a new conversation.

### Start from an existing spreadsheet[​](#start-from-an-existing-spreadsheet "Direct link to Start from an existing spreadsheet")

You can also bring an existing spreadsheet into Glean. Upload a file in chat and ask Glean what you want to do with it — for example, summarize it, restructure it, or pull additional data into new columns. Glean opens the spreadsheet in Canvas so you can iterate with follow-up prompts and then export the result.

## What Glean generates[​](#what-glean-generates "Direct link to What Glean generates")

When you generate a spreadsheet, Glean produces:

-   A structured table with column headers and rows based on the prompts you've given Glean.
-   Content drawn from the company knowledge and sources referenced in your chat — for example, documents, tickets, and search results that Glean used to answer your prompt.
-   A Canvas representation you can keep iterating on with Glean before exporting.

## Use cases[​](#use-cases "Direct link to Use cases")

Spreadsheet generation is designed to help with common tabular tasks, including:

-   **Competitive comparison tables** — compare vendors, products, or features across consistent attributes.
-   **Project trackers** — compile status, owners, and dates from project tools and chat into a single sheet.
-   **Metric roll-ups** — aggregate numbers referenced across multiple documents or reports into one view.
-   **Catalog and inventory extraction** — pull structured lists out of long-form documents or search results.
-   **Tool-item tables** — turn meeting notes or decisions into a tracked list of follow-ups.

## Tips for better results[​](#tips-for-better-results "Direct link to Tips for better results")

-   **Describe the columns you want.** Naming the columns up front (e.g., "columns for vendor, pricing tier, region, contract end date") gives Glean a clearer target.
-   **Iterate with follow-up prompts.** Ask Glean to adjust columns, filter rows, or pull in additional sources until the spreadsheet looks right before you export.
-   **Reference internal sources.** Ask Glean to pull from specific documents, projects, or teams so the rows are grounded in real data.
-   **Review after exporting.** Treat the exported file as a starting point — verify cells against source-of-truth systems before sharing widely.

## Frequently asked questions[​](#frequently-asked-questions "Direct link to Frequently asked questions")

### What export formats are supported?

Spreadsheet generation supports Excel (`.xlsx`), Google Sheets, CSV, and copy-to-clipboard. Choose the option that fits where you'll continue your work.

### Can I edit the spreadsheet after exporting?

Yes. Excel and CSV exports are fully editable in Excel or any compatible spreadsheet tool. Google Sheets exports open directly in your browser for editing and sharing.

### Why don't I see the option to create a spreadsheet?

Canvas may not be enabled for your organization, or your browser may need a hard-refresh after a recent rollout. If the option still doesn't appear, contact your Glean admin.

### Can I use Glean spreadsheets in Slack or Teams?

Use copy-to-clipboard to paste a table into a Slack or Teams message, or share the exported file as an attachment.

## See also[​](#see-also "Direct link to See also")

-   [Glean Canvas](/user-guide/assistant/glean-chat/canvas) - Learn about using Canvas for content creation.
-   [Slide generation](/user-guide/assistant/slide-generation) - Create branded presentations from Canvas content.
-   [Glean Assistant Best Practices](/user-guide/assistant/best-practices) - Tips for getting better results from Glean Assistant.
