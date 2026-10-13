---
url: "https://docs.glean.com/tools/glean/analyze-data"
canonical: "https://docs.glean.com/tools/glean/analyze-data"
title: "Analyze data"
description: "Analyze structured files and earlier step outputs with Python for legacy workflows; use Autonomous Agents for new data-analysis workloads"
fetched_at: "2026-10-13T08:50:49.790Z"
---
On this page

note

**Deprecated:** Analyze data is a legacy tool. It remains available for existing workflows but is no longer actively developed. For new data-analysis workloads, use [Autonomous Agents](/tools/tools-overview#autonomous-agents).

The Analyze data tool runs Python in an isolated sandbox to calculate, transform, and visualize structured data for an agent. Use it with uploaded files, linked files, or structured output from earlier steps. It doesn't change the source files.

With Analyze data, you can:

-   Explore dataset columns, values, and structure
-   Calculate counts, sums, averages, trends, and other statistics
-   Filter, join, group, or reshape tabular data
-   Create summaries, charts, and downloadable files

## Inputs[​](#inputs "Direct link to Inputs")

Configure Analyze data in **Agent builder** with instructions and at least one data input. Be specific about the calculation and expected output.

| Input or setting | What to provide | Example |
| --- | --- | --- |
| Analysis instructions | Describe the calculation, transformation, or visualization | `Group open tickets by priority and calculate the average age for each group` |
| Input data | Reference an uploaded agent input, a linked file, or structured output from an earlier step | `Use the CSV from [[Search Jira with JQL]]` |
| Output format | State how the tool should present or save the result | `Return a short summary and save all filtered rows as a CSV file` |

Analyze data supports structured formats such as `CSV`, `XLS`, `XLSX`, `XLSM`, Google Sheets, and `JSON`. See [Data analysis overview](/administration/assistant/data-analysis/about-data-analysis) for format details and file guidance.

## Outputs[​](#outputs "Direct link to Outputs")

Analyze data returns a Markdown summary and can generate tables, charts, or downloadable files. The result becomes step output in the agent's memory. Add a **Respond** step to present the findings and links to generated files to the user. Later steps can access the result through their memory settings or a direct step reference.

When a result contains more than 1,000 rows, Analyze data saves the full result to a file and returns a summary in the step response. Ask for a CSV or spreadsheet output when the user needs every row. Don't ask a later **Respond** step to reconstruct the complete dataset from the summary.

## Usage examples[​](#usage-examples "Direct link to Usage examples")

-   Ask, "What columns and date ranges does this spreadsheet contain?"
-   Group opportunities by stage, then calculate record counts and total value for each stage
-   Filter retrieved tickets to a date range, select the required fields, and save the rows as a CSV file
-   Create a chart that compares monthly support volume by product area

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Enable data analysis for your organization in **Admin console → Platform → Assistant → Settings → Data Analysis**. See [Enable data analysis](/administration/assistant/data-analysis/about-data-analysis#enable-data-analysis)
-   To use uploaded files, enable file upload and give the running user access to the files. See [File upload setup](/administration/assistant/features/file-upload)
-   Add a retrieval step before Analyze data when the agent must get records from a connector

## Configuration[​](#configuration "Direct link to Configuration")

Add Analyze data to an agent:

1.  Open the agent in **Agent builder** and add a step.
2.  Select **Analyze data** under **By Glean**.
3.  Enter explicit analysis instructions.
4.  Reference an agent input or an earlier step output that contains the data.
5.  State the expected output, such as a summary, chart, CSV file, or spreadsheet.
6.  Add a **Respond** step or another downstream step that uses the analysis.

For reliable results, name the relevant columns, filters, calculations, and output format. When you need data from an earlier non-sequential step, reference that step directly instead of loading unrelated step output into memory.

## Limitations[​](#limitations "Direct link to Limitations")

-   Analyze data processes the data you provide. It doesn't search connectors or retrieve records by itself
-   Upload limits depend on the model. See [Upload limits](/user-guide/assistant/file-upload#upload-limits)
-   Glean might truncate indexed spreadsheet content before it reaches the tool. For large or wide files, upload the source file or reference it directly instead of passing text extracted by a **Read document** step
-   Complex sheets with merged cells, irregular tables, embedded charts, or diagrams can reduce accuracy
-   The sandbox has execution time, memory, CPU, and library limits. It doesn't allow network access
-   Analyze data returns results with more than 1,000 rows as a generated file with a summary in the step response

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Analyze data is unavailable in Agent builder

Confirm that data analysis is available for your organization. If the agent uses uploaded files, confirm that your admin has also enabled file upload.

### The step reports that it has no data to analyze

Add an uploaded file, link to a file, or reference structured output from an earlier step. Confirm that the step's memory settings include that output, or reference the step directly in the instructions.

### The result is incomplete or inconsistent

Check whether the tool received the source file or truncated text from an earlier step. For large spreadsheets, upload the file or reference the file directly in Analyze data. Include the required sheet names, columns, filters, and calculations in the instructions.

### A downstream step doesn't include every result row

If the result has more than 1,000 rows, use the generated file for the complete dataset. Configure the downstream **Respond** step to present the summary and file link rather than reproduce every row in its response.

### The analysis reaches a sandbox resource limit

Reduce the input size, remove unused columns, split the work into smaller batches, or simplify the requested transformation. Then run the step again.

## Frequently asked questions[​](#frequently-asked-questions "Direct link to Frequently asked questions")

### Can Analyze data use output from an earlier step?

Yes. Reference structured output from a search, query, or read step. Use the step's memory settings or a direct step reference to make that output available.

### Can Analyze data work with multiple files?

Yes, within the file limits for your organization's model. Identify each file and explain how the tool should join or compare them.

### Does Analyze data modify source files or connector data?

No. It reads the provided data in a sandbox. The sandbox returns transformed data as new output or a generated file.

### Can Analyze data call an external API?

No. The sandbox doesn't have network access. Retrieve the required data in an earlier agent step, then pass it to Analyze data.

## See also[​](#see-also "Direct link to See also")

-   [How agents work](/agents/how-agents-work) — understand step output, memory, and direct references
-   [Limits and exhaustive retrieval best practices](/agents/concepts/limits-and-best-practices) — retrieve and process large record sets
-   [File security](/administration/assistant/data-analysis/file-security) — review sandbox isolation and resource controls
-   [Build agents with atomic tools](/tools/build-agent-with-atomic-tools) — combine retrieval, analysis, and response steps
