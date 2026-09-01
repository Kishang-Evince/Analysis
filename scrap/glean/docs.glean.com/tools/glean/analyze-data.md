---
url: "https://docs.glean.com/tools/glean/analyze-data"
canonical: "https://docs.glean.com/tools/glean/analyze-data"
title: "Analyze data"
description: "Process and query structured files such as spreadsheets and JSON in a sandboxed environment to run ad hoc analyses from agents."
fetched_at: "2026-09-01T13:30:06.898Z"
---
On this page

The analyze data tool allows an agent to process structured files like spreadsheets or JSON. This tool is designed to help you perform various analyses on the data contained within these files, saving you significant time on ad hoc analyses. The analyze data tool supports several key features:

2.  **Real-Time Querying**: Users can query the tabular content of uploaded files immediately after upload or link to a file.
3.  **File Processing**: Analysis is conducted in a separate sandboxed environment to ensure privacy and security.
4.  **Privacy**: Files uploaded are only accessible to the user who uploaded them.

## Usage examples[​](#usage-examples "Direct link to Usage examples")

-   **Dataset Exploration**: Users can ask questions like "What columns does my data contain?" to explore the structure of the dataset.
-   **Column Statistics**: Users can request statistics such as average, sum, and count for specific columns.
-   **Data Distribution**: Queries such as "Show me all the unique values in x column" help analyze data distribution.
-   **Data Relationships**: Users can analyze relationships, e.g., "How does conversion change by lead source?"
-   **Time-Series Relationships**: Analyze trends over time, like "What product area have we gotten more tickets in over the last month compared to previous months?"

## Configuration[​](#configuration "Direct link to Configuration")

-   Ensure that necessary file upload permissions are enabled and the tool has access to the required connectors. for more information on the file upload feature in Glean, see the [file upload article](/administration/assistant/features/file-upload).
