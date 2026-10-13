---
url: "https://docs.glean.com/agents/generate-files-from-templates"
canonical: "https://docs.glean.com/agents/generate-files-from-templates"
title: "Create Microsoft 365 files with agents"
description: "Use agents to create or update Word documents, Excel workbooks, and PowerPoint presentations while understanding template and file-output limitations"
fetched_at: "2026-10-13T08:49:37.555Z"
---
On this page

Agents can create Microsoft 365 files from structured instructions and update existing files when you enable the required tools. The workflow depends on the file type and tools you use. Without the required tools, asking Glean for a particular format doesn't populate an existing Word or Excel template.

This guide covers Word, Excel, and PowerPoint workflows. For Google Workspace files, see [Google Docs tools](/tools/connector/google-docs-tools) and [Google Sheets tools](/tools/connector/google-sheets-tools).

note

If the required tool does not appear in Agent Builder, ask your Glean admin to enable it. See [Microsoft 365 tools and extension tools setup](/administration/tools/setup-tools/m365-tools-setup) for setup requirements.

## Choose the right workflow[​](#choose-the-right-workflow "Direct link to Choose the right workflow")

| What you want to do | Recommended workflow | Important limitation |
| --- | --- | --- |
| Create a new Word document | Use the **Create Microsoft Word documents** tool | Creates a new document. It does not populate an arbitrary Word template. |
| Create a new Excel workbook | Use the **Create Excel spreadsheets** tool or **Spreadsheet Generation** | Creates a new workbook. It does not populate an arbitrary Excel template. |
| Update an existing Excel workbook | Use the **Microsoft Excel tools** | The agent writes to the workbook and ranges that the connected account can access. |
| Create a PowerPoint presentation | Use **Slide generation** or the **Presentation Generation** tool | Template behavior depends on the Glean surface and tool configuration. Review the generated deck before sharing it. |

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before you write the agent instructions, decide the following details:

-   File type: Word, Excel, or PowerPoint.
-   Starting point: A new file, an existing workbook, or an existing presentation.
-   Content and structure: The fields, sections, worksheets, ranges, slides, or layouts that the agent must produce or update.
-   Destination: A download from Glean, OneDrive, or SharePoint.
-   Permissions: The Microsoft account or connected service account that will create or update the file.
-   Review step: Who checks the output for content, formatting, and sensitive information before it is shared.

\[Important\]

Give the agent the exact source file, workbook range, folder, or presentation reference it must use. Do not rely on a file name alone when multiple files have similar names.

## Create a Word document[​](#create-a-word-document "Direct link to Create a Word document")

The **Create Microsoft Word documents** tool creates a new Word document from the instructions in the agent. Describe the document structure and the content to include.

### Example[​](#example "Direct link to Example")

"Create a Word document named Q3 customer summary. Add an executive summary, a table of customer themes, and recommended actions. Save it to my default OneDrive folder."

To use an existing Word document as a visual or structural reference, provide a clean, reusable example with placeholders instead of document-specific values. Tell the agent which structure or visual elements to follow and which example content it must not copy. Review the new document after it is created. The create tool does not populate an arbitrary Word template or guarantee that its styles, headers, footers, fields, or other document elements will be preserved in the new file.

## Create or update an Excel workbook[​](#create-or-update-an-excel-workbook "Direct link to Create or update an Excel workbook")

Use **Create Excel spreadsheets** or **Spreadsheet Generation** when you need a new workbook from structured data. In the instructions, specify the worksheet names, exact column names and order, formulas, and expected value formats, such as dates, percentages, or currency. Verify these details in the generated workbook.

Use the [Microsoft Excel tools](/tools/connector/ms-excel-tools) when you need to work in an existing workbook.

For an existing workbook, identify the workbook and the ranges the agent must change.

### Example[​](#example-1 "Direct link to Example")

"Open the Q3 forecast workbook. Add the new regional forecast values to the Forecast worksheet in cells B4:F12. Do not change the formulas or formatting outside that range. Save the updated workbook."

The agent can update only the files and ranges available to the authenticated Microsoft account. If the workbook is a protected or highly formatted template, verify that formulas, formatting, named ranges, comments, and other workbook features still work as expected after the update.

## Create a PowerPoint presentation[​](#create-a-powerpoint-presentation "Direct link to Create a PowerPoint presentation")

Use **Slide generation** to create a deck in Canvas, refine the content, and export it. When an administrator has configured a company PowerPoint template, Canvas slide generation uses that template automatically. Individual users cannot override the Canvas template from the slide-generation interface.

The **Presentation Generation** tool is available in Autonomous (Auto Mode) agents when slide generation is enabled by your admin. It is not currently available in Workflow-mode agents or prompts. To use a specific existing presentation as a template or source, link or attach the presentation and identify it in the agent instructions. The tool accepts up to three presentation references and creates a new deck instead of modifying the source presentations. If you do not provide a specific presentation, the tool uses the company template configured by your admin when one is available. See [Slide generation](/user-guide/assistant/slide-generation) for availability and setup details.

PowerPoint generation uses the configured or provided presentation as a visual source for branding, themes, layouts, and relevant master slides. Because it generates a new deck, the output is not guaranteed to preserve every theme setting, slide master, custom layout, animation, or embedded element. Open the generated `.pptx` file in PowerPoint or another compatible application and check the visual result before distributing it.

## Find the generated file[​](#find-the-generated-file "Direct link to Find the generated file")

The location depends on how the file was created:

-   *Download from Glean or Canvas:* The file is downloaded using your browser's normal download settings. Check the browser's downloads list if you cannot find it.
    
-   *Microsoft 365 create or export tools:* The file is written to the authenticated user's default OneDrive folder unless the tool or agent specifies another supported destination.
    
-   *OneDrive or SharePoint tools:* The file is created or updated in the folder or document library provided to the tool.
    

Microsoft 365 tools use user OAuth. Each user connects their own Microsoft account, and the tools run with that user's permissions. An agent cannot use a file that the connected account cannot access or grant itself additional permissions.

If an agent returns a file link that you cannot open, check that you are signed in to the correct Microsoft account and that the file was created in the expected OneDrive or SharePoint location. Ask the file owner or administrator to grant access when needed.

## Write effective file-generation instructions[​](#write-effective-file-generation-instructions "Direct link to Write effective file-generation instructions")

Include the following details in the agent instructions and configuration to help generate accurate files safely:

-   Source data: Specify the exact names or links of the source documents, workbooks, or presentations the agent must read.
-   Output details: Define the required file type, file name, and destination folder.
-   Structure and layout: List specific elements to include, such as required headings, columns, worksheets, slides, or cell ranges.
-   Formatting rules: State any critical formatting requirements, and explicitly highlight elements that must not change.
-   Pre-execution check: Direct the agent to verify source files, target destination, and planned changes before running write tools.
-   Human approval: For interactive agents, turn off **Run without user confirmation** so the user can approve changes before execution.
-   Result verification: Instruct the agent to confirm created or updated items, and report any skipped fields or inaccessible files.
-   Error correction: Include necessary editing or update tools in the agent configuration, and instruct the agent when to use them if adjustments are needed.
-   Final review step: Require a human check for accuracy, formatting, access permissions, and sensitive information before sharing the generated file.

note

The confirmation step approves the write action, but Microsoft document and spreadsheet creation tools do not provide an editable inline preview. Review the generated file after the tool runs.

### Example[​](#example-2 "Direct link to Example")

"Use the linked source report to create a PowerPoint presentation with 8 slides for an executive audience. Use the configured company template if available. Include a title slide, one slide per recommendation, and a final risks-and-next-steps slide. Return the .pptx file and list any source sections you could not use. I will review the deck before sharing it."

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### The agent created a new file instead of filling my template

The Word and Excel create tools generate new files. To update an existing Excel workbook, use the Microsoft Excel tools and provide the workbook and target ranges. Native population of arbitrary customer-approved Word or Excel templates is not supported by the create tools.

### I cannot find or open the output file

Check whether the agent downloaded the file through your browser or saved it to OneDrive or SharePoint. Confirm that you are using the Microsoft account that authenticated the tool and that this account has access to the destination.

### The presentation does not match the template exactly

Template-based generation does not guarantee that every theme, master slide, custom layout, or embedded element will be retained. Review the generated presentation in PowerPoint and make any required formatting adjustments before sharing it.

### A required tool is unavailable

Tool availability depends on your organization's configuration and the Glean surface you are using. Ask your Glean admin to enable the relevant tool pack and verify the required Microsoft 365 connector and OAuth permissions.

## See also[​](#see-also "Direct link to See also")

-   [Microsoft 365 tools](/tools/connector/microsoft-365): Configure and use Microsoft 365 tools with agents
-   [Microsoft Excel tools](/tools/connector/ms-excel-tools): Update existing Excel workbooks
-   [Spreadsheet Generation](/user-guide/assistant/spreadsheet-generation): Create spreadsheets in Canvas
-   [Slide generation](/user-guide/assistant/slide-generation): Create presentations in Canvas
-   [Writing effective prompts](/agents/writing-effective-prompts): Structure agent instructions and formatted outputs
