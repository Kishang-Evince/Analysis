---
url: "https://docs.glean.com/troubleshooting/error-codes/tools/tools-missing-required-params"
canonical: "https://docs.glean.com/troubleshooting/error-codes/tools/tools-missing-required-params"
title: "ACTIONS_MISSING_REQUIRED_PARAMS"
description: "An error that occurs across all Glean tools when required fields are missing or empty."
fetched_at: "2026-09-01T13:30:32.530Z"
---
On this page

## Possible errors[​](#possible-errors "Direct link to Possible errors")

You encounter the `ACTIONS_MISSING_REQUIRED_PARAMS` error when Glean is unable to run a tool because one or more required fields are not provided. The request is rejected before being sent to the external application.

This error can occur with any tool in Glean whether you are using Glean, workflows, static agents, or custom integrations—regardless of the specific tool type or external application.

## Possible reasons[​](#possible-reasons "Direct link to Possible reasons")

This error occurs when a tool defines certain fields as *required*, but at least one of those fields is missing or empty in the request.

| Scenario | Cause |
| --- | --- |
| Glean / Chat | The agent's instructions and your original query do not provide enough detail for Glean to generate values for one or more required parameters. |
| Workflows / Static Agents | The parameter configuration leaves a required parameter unmapped or allows it to be empty at runtime (for example, a required field is not wired to any variable or is marked "don't autofill"). |
| Custom Tools / Tools | The parameter configuration or OpenAPI spec marks fields as required, but they are not properly surfaced or populated during execution. |

## Possible resolutions[​](#possible-resolutions "Direct link to Possible resolutions")

### If you are a user running tools manually[​](#if-you-are-a-user-running-tools-manually "Direct link to If you are a user running tools manually")

1.  **Check the tool form**
    
    1.  Review the tool form in the UI and locate all fields marked as *required*, usually indicated with an asterisk \*.
    2.  Ensure each required field contains a value.
2.  **Provide complete information in your request**
    
    When using Glean or natural language commands, include all necessary details:
    
    -   **Target resource** – Specify the document, ticket, spreadsheet, or calendar you want to act on
    -   **Identifiers** – Include relevant IDs, names, or links the tool depends on
    -   **Additional context** – Provide dates, owners, project names, or other required parameters
    
    **Example:** "Create a ticket in the Engineering project titled 'Fix login bug' assigned to John Smith with priority High"
    
3.  **Retry the tool**
    
    After providing all missing information, run the tool again.
    

### If you are a workflow or static agent owner[​](#if-you-are-a-workflow-or-static-agent-owner "Direct link to If you are a workflow or static agent owner")

If this error appears during automated runs or scheduled workflows:

1.  **Locate the failing step**
    
    1.  Open your agent or workflow configuration.
    2.  Find the step that generated the `ACTIONS_MISSING_REQUIRED_PARAMS` error.
2.  **Verify required parameter mappings**
    
    For each required field in the tool:
    
    -   Check if it has a value assigned (constant or variable).
    -   Ensure mapped variables from previous steps are not empty.
    -   Confirm that output mappings reference valid data.
3.  **Fix missing or invalid mappings**
    
    Choose one of these approaches:
    
    -   **Add a constant value** – If the value is always the same, enter it directly.
    -   **Map to a previous step's output** – Ensure the previous step always produces this value.
    -   **Add a validation step** – Insert a step before this tool to verify required data exists.
    -   **Make the field optional** – If appropriate, update the parameter configuration to make the field optional (requires admin access).
4.  **Test your changes**
    
    1.  Save the updated configuration.
    2.  Run the agent or workflow manually to verify the error is resolved.
    3.  Monitor subsequent automated runs to ensure consistency.

### If you are a tool creator or administrator[​](#if-you-are-a-tool-creator-or-administrator "Direct link to If you are a tool creator or administrator")

If multiple users or workflows encounter this error with your tool:

1.  **Audit your parameter configuration**
    
    Review the required fields in your parameter configuration:
    
    -   Confirm each field truly needs to be *required* for the tool to succeed.
    -   Verify that required fields are visible and accessible in all interfaces.
    -   Ensure field descriptions clearly explain what information is needed.
2.  **Set sensible defaults**
    
    Reduce user friction by providing default values where appropriate:
    
    -   If a field typically has the same value (e.g., default project, board, or priority), set it as the default.
    -   Consider making fields optional if the system can infer the value safely.
    -   Document when and why users should override defaults.
3.  **Validate allowed values and permissions**
    
    If your tool uses restricted field values:
    
    -   Verify that allowed value lists are current and accurate.
    -   Confirm users have appropriate permissions to use those values.
    -   Ensure dropdown menus or selectors properly populate with available options.
4.  **Test thoroughly**
    
    Before deploying changes:
    
    -   Execute the tool yourself using Glean with typical user queries
    -   Create a test workflow that exercises common scenarios
    -   Verify the tool handles edge cases (e.g., missing optional fields, unusual value combinations)

## When to Contact Support[​](#when-to-contact-support "Direct link to When to Contact Support")

Contact Glean Support if the error persists after trying the resolutions above. Before reaching out, gather the following information:

-   **Error details:** Copy and paste the entire error message from Glean, including the tool name, tool ID, run ID (if shown), and the error code `ACTIONS_MISSING_REQUIRED_PARAMS`.
-   **Trigger method:** How the tool was invoked (Glean, static agent, workflow, or custom integration).
-   **Screenshots (optional):** Include a screenshot of the error state in Glean if possible.
-   **Steps taken:** List the troubleshooting steps you have already attempted.

Submit your issue through the [Glean Support Center](https://community.glean.com) with the information listed above.
