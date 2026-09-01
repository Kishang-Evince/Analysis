---
url: "https://docs.glean.com/troubleshooting/error-codes/tools/gsheet-format"
canonical: "https://docs.glean.com/troubleshooting/error-codes/tools/gsheet-format"
title: "GSHEET-FORMAT"
description: "GSHEET-FORMAT Error Code"
fetched_at: "2026-09-01T13:30:32.538Z"
---
On this page

## Issue:[​](#issue "Direct link to Issue:")

The format of the markdown input provided to the Google Sheets tool is incorrect, causing the tool to fail.

## Resolution:[​](#resolution "Direct link to Resolution:")

Try the following steps to resolve this issue:

1.  **Specify correct markdown formatting**: LLMs sometimes produce inconsistent markdown formatting with complex tables. In your prompt or agent step, explicitly instruct the model to format the output as a properly structured markdown table. For example:
    
    ```
    Format the sheet request as a markdown table with headers separated by pipes (|) and a separator row using dashes (---).
    ```
    
2.  **Try a different model**: Model capabilities vary for structured output. A more advanced model may produce correctly formatted markdown more consistently.
    

If you are still having difficulty please reach out to us: [https://support.glean.com](https://support.glean.com)
