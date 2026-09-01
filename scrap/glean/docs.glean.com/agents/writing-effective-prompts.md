---
url: "https://docs.glean.com/agents/writing-effective-prompts"
canonical: "https://docs.glean.com/agents/writing-effective-prompts"
title: "Writing effective prompts for formatted outputs"
description: "Prompt Glean Assistant and Agents so responses use the structure you expect through natural language, Markdown templates, or document examples"
fetched_at: "2026-09-01T13:29:17.407Z"
---
On this page

Prompt engineering is the practice of giving clear, specific instructions to Glean Assistant or your agents so they can deliver useful, repeatable results. This guide covers prompting to format the response so it comes back in the structure you expect.

## Formatting the response[​](#formatting-the-response "Direct link to Formatting the response")

You have three main ways to get a well-formatted response:

1.  Natural language descriptions of the format
2.  Markdown templates
3.  Document example templates

You can mix these approaches, but it helps to pick one primary method per prompt in order to maintain consistent instructions to the agent or Glean Assistant.

## Natural language format descriptions[​](#natural-language-format-descriptions "Direct link to Natural language format descriptions")

In this approach, you describe the format in words inside your prompt. The key is to be explicit and detailed.

### Be specific about the format[​](#be-specific-about-the-format "Direct link to Be specific about the format")

Here is a progression from okay to best when asking for a table, following an example where the input is a collection of customer support tickets, and the desired output is a summary table:

-   **OK**  
    Summarize the issues in the support tickets using a table.
    
-   **Good**  
    Summarize the support tickets. Format the response as a table with headers 'Customer', 'Date', and 'Summary of issue'. Include one row per ticket.
    
-   **Best**  
    Summarize the support tickets. Format the response as a table with headers 'Customer', 'Date', and 'Summary of issue', and populate the values according to the following definitions, including one row per ticket:
    
    -   **Customer**: the name of the company experiencing the issue
    -   **Date**: the date on which the ticket was created
    -   **Summary of issue**: a concise 2–3 sentence summary of the issue experienced by the customer

The *Best* version works well when you want reliable structure for an agent output. You are defining both the shape (headers) and the meaning (definitions) of each column.

### Patterns you can reuse[​](#patterns-you-can-reuse "Direct link to Patterns you can reuse")

You can adapt the same pattern for many structures:

-   **Lists**  
    Present the answer as a numbered list with three sections:
    
    1.  Summary (2–3 sentences)
    2.  Risks (3 risks as list sub-items)
    3.  Recommended next steps (3 steps as list sub-items)
-   **Sections**  
    Organize the response into three sections with H2 headings: “Overview,” “Details,” and “Next steps.” Keep each section under 200 words.
    
-   **Role-based views**  
    Give me two short sections: one for executives and one for admins. Each section should have:
    
    -   A one-sentence summary
    -   3 bullets on what they should do

The more you **lock in the structure** in natural language, the easier it is to scan and reuse the output.

## Markdown templates[​](#markdown-templates "Direct link to Markdown templates")

If you already know exactly how you want the output to look, you can give Assistant a **Markdown template** and ask it to fill it in.

Markdown works well because it is:

-   Easy to type
-   Easy for Assistant to follow
-   Easy to paste into docs, tickets, or knowledge articles

If you are new to Markdown, you can use a reference like [Markdown Cheatsheet](https://markdowncheatsheet.com/) to design your template.

### Example: simple report template[​](#example-simple-report-template "Direct link to Example: simple report template")

Prompt:

Use the following Markdown template. Fill in each section based on the context I provided.

```
# Project brief## Goal{{Write 2–3 sentences here}}## Current context{{Summarize relevant background in 3–5 bullets}}## Risks and dependencies{{List key risks and owners}}## Next steps{{List 3–5 actionable next steps with owners and rough timelines}}
```

Assistant will mirror this structure in the answer and replace the placeholders.

### Example: table template[​](#example-table-template "Direct link to Example: table template")

Prompt:

Create a Markdown table using this exact structure and fill it in based on the attached document:

```
| Task                                 | Owner       | Target date | Status  || ------------------------------------ | ----------- | ----------- | ------- ||                                      |             |             |         ||                                      |             |             |         ||                                      |             |             |         |
```

Defining the table up front helps ensure the output is compatible with your existing **tables** and workflows.

## Document example templates[​](#document-example-templates "Direct link to Document example templates")

Sometimes it is easier to show the format you want instead of describing it.

You can **link to an existing document** and ask Assistant or agents to match its structure, tone, or level of detail.

### How to use document examples[​](#how-to-use-document-examples "Direct link to How to use document examples")

In your prompt, you can:

-   Link to one or more **example documents**, slides, or tickets
-   Explain **what to copy** (structure, tone, level of formality)
-   Explain **what to change** (content, audience, up-to-date details)

**Example:** Use this existing incident review doc as a template for structure and tone. Create a new version for yesterday’s outage based on the notes below. Keep the same headings and table structure, but update all content and dates.

You can combine document examples with natural language, for example, “Match the structure of the linked doc, but simplify the language for non-technical teammates. Keep it under two pages.” This works well for content that needs to align with team standards or company playbooks.
