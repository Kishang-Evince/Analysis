---
url: "https://developers.glean.com/guides/tools/examples/google-docs-update"
canonical: "https://developers.glean.com/guides/tools/examples/google-docs-update"
title: "Google Docs Update Tool | Glean Developer"
description: "Learn how to create an execution tool that allows Glean Assistant to update Google Documents programmatically"
fetched_at: "2026-09-01T13:23:03.435Z"
---
On this page

## Overview[​](#overview "Direct link to Overview")

This guide demonstrates how to create an execution tool that enables Glean Assistant to update Google Documents. You'll learn how to configure the OpenAPI specification, set up OAuth authentication, and deploy the tool for use within your organization.

This is an **execution tool** that performs operations directly within Glean by making API calls to Google Docs on behalf of users.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before proceeding, ensure you have:

-   Admin or app developer access to Glean
-   Access to Google Cloud Console
-   Familiarity with OAuth 2.0 authentication flows

## Implementation Guide[​](#implementation-guide "Direct link to Implementation Guide")

1

Basic Configuration

Navigate to [Admin console > Platform > Tools](https://app.glean.com/admin/platform/tools) and create a new tool from scratch.

#### Basic Information Configuration

Configure the following settings:

-   Display name: Choose a descriptive name (e.g., "Google Docs Updater")
-   Description: Explain the tool's functionality
-   Unique identifier: Set a unique ID (e.g., "googleDocsUpdate")
-   Tool type: Select "Write" since this will modify documents

#### Trigger Condition Setup

In the trigger condition, provide comprehensive guidance for when Glean Assistant should use this tool. Include:

-   Specific use cases that should trigger the tool
-   Examples of appropriate user queries
-   Cases where the tool should not be used

2

API Specification Development

The first step involves creating a properly formatted OpenAPI specification that defines how Glean Assistant will interact with the Google Docs API. We'll use the following endpoint:

```
POST https://docs.googleapis.com/v1/documents/{`{documentId}`}:batchUpdate
```

While Google doesn't typically provide OpenAPI specs publicly, you can construct one using their [documentation](https://developers.google.com/docs/api/reference/rest/v1/documents/batchUpdate) or reference third-party sources.

Here's the complete OpenAPI specification:

Click to expand the full OpenAPI specification

```
openapi: 3.0.0servers:  - url: 'https://docs.googleapis.com/'info:  description: Writes Google Docs documents.  title: Google Docs API  version: v1paths:  '/v1/documents/{documentId}:batchUpdate':    post:      description: >-        Applies one or more updates to the document. Each request is validated        before being applied. If any request is not valid, then the entire        request will fail and nothing will be applied. The updates in your request        are guaranteed to be applied together atomically.      operationId: docs.documents.batchUpdate      parameters:        - description: >-            The ID of the document to update. Use glean search to find            the relevant document. The documentId usually exists in the            url of the doc. The syntax of URL (with documentId) is like:            https://docs.google.com/document/d/<documentId>/edit            Extract out the documentId from the URL.          in: path          name: documentId          required: true          schema:            type: string      requestBody:        content:          application/json:            schema:              type: object              properties:                requests:                  type: array                  maxItems: 2                  items:                    type: object                    properties:                      insertText:                        description: >-                          Inserts text at the specified location. Always use this                          operation except when text deletion or text replacement                          is required.                        type: object                        properties:                          location:                            type: object                            properties:                              index:                                description: >-                                  The zero-based index, in UTF-16 code units.                                  Strictly use a value of 1 and nothing else.                                format: int32                                type: integer                          text:                            description: >-                              The text to be inserted. This is the most important field                              for this text inserting operation. Insert a neatly                              formatted text consisting of multiple paragraphs. Whenever                              required, always start with a new line for paragraphs,                              tables, lists for neatness.                            type: string                      replaceAllText:                        description: >-                          Replaces all instances of the specified text.                          Always use this operation when text deletion                          or text replacement is required.                        type: object                        properties:                          containsText:                            type: object                            properties:                              matchCase:                                description: >-                                  Indicates whether the search should respect                                  case: - \`True\`: the search is case sensitive.                                  - \`False\`: the search is case insensitive.                                type: boolean                                title: Do you want to match case                              text:                                description: The text to search for in the document.                                type: string                          replaceText:                            description: >-                              The text that will replace the                              matched text. Keep empty for deletion.                            type: string      responses:        '200':          description: Successful response
```

#### Functionality Configuration

Paste the OpenAPI specification you prepared above. Since we're using Google's API directly, leave the "Use existing on-premise server" option unchecked.

3

Authentication Setup

This tool requires OAuth User authentication to access and update individual users' Google Docs documents.

#### Google Cloud Console Setup[​](#google-cloud-console-setup "Direct link to Google Cloud Console Setup")

1.  Access the [Google Cloud Console Credentials page](https://console.cloud.google.com/apis/credentials)
    
2.  Create OAuth credentials:
    
3.  Configure as a web application:
    

#### Redirect URI Configuration[​](#redirect-uri-configuration "Direct link to Redirect URI Configuration")

Add this URI to your OAuth client (Note your instance name is typically the email domain without the TLD):

```
https://{instance-name}-be.glean.com/tools/oauth/verify_code
```

This URL can be copied from the `Callback URL` field in your tool's `Authentication` section.

#### OAuth Settings in Glean[​](#oauth-settings-in-glean "Direct link to OAuth Settings in Glean")

Configure these parameters in Glean's `Authentication` section:

```
Client URL: https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&prompt=consentAuthorization URL: https://oauth2.googleapis.com/tokenScopes: https://www.googleapis.com/auth/documents
```

note

In Glean's OAuth configuration, **Client URL** is Google's user-facing authorization endpoint (where users are redirected to grant access), and **Authorization URL** is Google's token endpoint (which Glean calls to exchange the authorization code for a token). There is no separate token URL field.

#### Enable Google Docs API[​](#enable-google-docs-api "Direct link to Enable Google Docs API")

1.  Access your Google Cloud Console
    
2.  Enable the Google Docs API for your project:
    

4

Testing and Deployment

After configuration, thoroughly test the tool before deployment.

#### Testing Process

1.  Click the testing URL provided after saving the tool
    
2.  Issue test queries to verify proper triggering
    
3.  Use the "Review and confirm" interface:
    
4.  Verify document changes:
    
    Before changes: ![State of Doc before Tool Execution](/assets/images/before_doc-c08cb3113dbcc55ff07973009b7f8c96.png)
    
    After changes: ![State of Doc after Tool Execution](/assets/images/after_doc-ae7e4e370c855244cc33179c2321fd59.png)
    

#### Deployment Configuration

Deploy the tool through the deploy tab:

You can:

-   Enable the tool for all teammates
-   Restrict access to specific teammates
-   Configure deployment settings for Chat or AI Apps integration

## Best Practices[​](#best-practices "Direct link to Best Practices")

### API Configuration Best Practices[​](#api-configuration-best-practices "Direct link to API Configuration Best Practices")

When preparing your OpenAPI specification for Google Docs integration:

### Field Descriptions

The quality of field descriptions significantly impacts Glean Assistant's ability to populate them correctly. Consider these guidelines:

-   Make descriptions actionable and specific
-   Include examples of valid values
-   Explain the business context of each field
-   Clarify relationships between fields

### Schema Structure

Your schema structure affects how Glean Assistant interprets the API:

-   Keep the schema as flat as possible
-   Use meaningful field names that reflect their purpose
-   Leverage built-in formats (like `date-time`) where applicable
-   Include proper type constraints and validations

### Authentication Considerations[​](#authentication-considerations "Direct link to Authentication Considerations")

### OAuth Configuration

Important considerations for OAuth setup:

-   Always use `access_type=offline` to enable refresh tokens
-   Include appropriate error handling for token expiration
-   Consider implementing token rotation for security
-   Monitor token usage and implement proper logging

### Performance Optimization[​](#performance-optimization "Direct link to Performance Optimization")

### User Experience

Optimize the tool for user interaction:

-   Provide clear feedback when the tool is processing
-   Include meaningful error messages
-   Allow users to preview changes before applying them
-   Maintain consistent behavior across different document types

### Efficient Operations

Ensure efficient operation:

-   Batch related operations when possible
-   Implement appropriate timeouts
-   Cache frequently used document metadata
-   Monitor tool execution times

### Error Handling[​](#error-handling "Direct link to Error Handling")

When working with the Google Docs API:

### Document Operations

Choose the right operation type for your use case:

-   Use `insertText` for adding new content without affecting existing text
-   Use `replaceAllText` when you need to modify existing content
-   Consider using `index: 1` for insertions to maintain consistent behavior
-   Handle formatting through plain text markers (like asterisks for bullets)

### Common Issues

Common issues to watch for:

-   Document permissions mismatches
-   Rate limiting constraints
-   Invalid document IDs
-   Concurrent modification conflicts

### Common Pitfalls to Avoid[​](#common-pitfalls-to-avoid "Direct link to Common Pitfalls to Avoid")

warning

Watch out for these common implementation mistakes:

1.  **Document ID Handling**
    
    -   Not properly extracting IDs from URLs
    -   Failing to validate ID format
    -   Not handling shared drive documents correctly
2.  **Permission Issues**
    
    -   Insufficient OAuth scopes
    -   Missing document-level permissions
    -   Incorrect service account configuration
3.  **Content Formatting**
    
    -   Ignoring existing document structure
    -   Not handling special characters properly
    -   Incorrect handling of line breaks and paragraphs

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

If you encounter issues during setup or execution:

1.  **Verify OAuth Configuration**
    
    -   Check OAuth credentials are correctly configured
    -   Ensure the Google Docs API is enabled
    -   Validate that the redirect URI exactly matches your tool's configuration
2.  **Check Permissions**
    
    -   Verify the user has appropriate permissions in both Glean and Google Docs
    -   Confirm document access permissions
    -   Check API quota and rate limits
3.  **Debug Implementation**
    
    -   Validate document ID extraction and formatting
    -   Test with different document types and sizes
    -   Monitor API response codes and error messages

## Next Steps[​](#next-steps "Direct link to Next Steps")

After successful implementation, consider:

-   **Documentation**: Creating documentation for end users
-   **Monitoring**: Setting up monitoring for tool usage
-   **Credentials**: Establishing a process for maintaining OAuth credentials
-   **Reviews**: Planning for periodic reviews of API specifications as the Google Docs API evolves
-   **Enhancements**: Expanding functionality based on user feedback
