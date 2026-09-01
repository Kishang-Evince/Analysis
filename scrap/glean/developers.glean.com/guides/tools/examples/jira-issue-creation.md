---
url: "https://developers.glean.com/guides/tools/examples/jira-issue-creation"
canonical: "https://developers.glean.com/guides/tools/examples/jira-issue-creation"
title: "Jira Issue Creation | Glean Developer"
description: "Implement an execution tool that enables Glean Assistant to create Jira issues programmatically with proper user attribution"
fetched_at: "2026-09-01T13:23:03.571Z"
---
On this page

## Overview[​](#overview "Direct link to Overview")

This guide explains how to create an execution tool that allows Glean Assistant to create Jira issues on behalf of users. The implementation uses OAuth-based authentication and ensures proper user attribution for created issues.

This is an **execution tool** that performs operations directly by making API calls to Jira through a custom server implementation.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before beginning this implementation, ensure you have:

-   Administrator access to your Jira and Glean instances
-   Familiarity with OAuth 2.0 authentication flows
-   Basic understanding of API implementation
-   Access to necessary development resources

## Implementation Guide[​](#implementation-guide "Direct link to Implementation Guide")

1

Server Implementation

The server implementation handles requests from Glean's tools backend and manages the creation of Jira issues. This implementation includes proper security measures and ensures accurate user attribution.

Note: This example uses OAuth authentication configured through the Glean Admin UI. When setting up your tool, you'll configure OAuth with the following settings:

-   Client URL: ``[https://auth.atlassian.com/authorize?audience={`{ATLASSIAN-DOMAIN}`}.atlassian.net&prompt=consent](https://auth.atlassian.com/authorize?audience=%7B%60%7BATLASSIAN-DOMAIN%7D%60%7D.atlassian.net&prompt=consent)``
-   Authorization URL: `[https://auth.atlassian.com/oauth/token](https://auth.atlassian.com/oauth/token)`
-   Scopes: `write:jira-work`, `offline_access`, `read:me`

Click to expand the complete Python server implementation

```
from flask import Flask, request, jsonifyimport requestsimport jsonapp = Flask(__name__)cloud_id = "your_jira_cloud_id_here"create_issue_url_format = f"https://api.atlassian.com/ex/jira/{cloud_id}/rest/api/3/issue"users_search_url = f"https://your-domain.atlassian.net/rest/api/3/users/search"def get_reporter_id(email, auth_header):    """    Retrieves the Jira account ID for a given email address.    This function supports proper user attribution in Jira issues.    """    start_at = 0    max_results = 50    while True:        params = {'startAt': start_at, 'maxResults': max_results}        headers = {'Accept': 'application/json', 'Authorization': auth_header}        response = requests.get(users_search_url, params=params, headers=headers)        users = json.loads(response.text)        for user in users:            if user['emailAddress'] == email:                return user['accountId']        if len(users) < max_results:            break        start_at += max_results    return Nonedef transform_to_jira_request(input_payload, reporter_id):    """    Transforms the input payload into Jira's required format.    Ensures all required fields are properly formatted.    """    jira_request = {        "fields": {            "project": {"id": input_payload['pid']},            "issuetype": {"id": str(input_payload['issuetype'])},            "priority": {"id": str(input_payload['priority'])},            "summary": input_payload['summary'],            "components": [{"id": input_payload['components']}],            "description": {                "type": "doc",                "version": 1,                "content": [{"type": "text", "text": input_payload['description']}]            },            "assignee": {"id": input_payload['assignee']},            "reporter": {"id": reporter_id}        }    }    return jira_request@app.route('/create_issue', methods=['POST'])def create_issue():    """    Endpoint handler for creating Jira issues.    Includes authentication validation and error handling.    """    authorization_header = request.headers.get('Authorization')    glean_user_email = request.headers.get('Glean-User-Email')    if authorization_header is None or glean_user_email is None:        return jsonify({"error": "Authorization header or Glean-User-Email not found"}), 401    reporter_id = get_reporter_id(glean_user_email, authorization_header)    if reporter_id is None:        return jsonify({"error": "Reporter ID not found"}), 400    input_payload = request.json    jira_request = transform_to_jira_request(input_payload, reporter_id)    headers = {        "Content-Type": "application/json",        "Authorization": authorization_header    }    response = requests.post(create_issue_url_format, headers=headers, json=jira_request)    if response.status_code == 200:        return jsonify({"resultURL": json.loads(response.text).get("key")}), 200    else:        return jsonify({"error": "Failed to create issue", "details": response.text}), response.status_codeif __name__ == '__main__':    app.run(port=8080)
```

2

API Specification

The OpenAPI specification defines how Glean Assistant interacts with your tool server. This specification provides clear guidance for field population and ensures consistent behavior.

Click to expand the complete OpenAPI specification

```
openapi: 3.0.0info:  title: Jira Execution Tool  version: 1.0.0servers:  - url: https://your-tool-server.example.com/tools/jira    variables:      host:        default: your-tool-server.example.com        description: The publicly accessible host where your custom tool server is deployed.paths:  /create_issue:    post:      summary: Creates an issue or a sub-task from a JSON representation      description: |        This API allows you to create an issue in Jira.      parameters:        - name: Glean-User-Email          in: header          required: true          schema:            type: string          description: Email of the authenticated glean user.      requestBody:        content:          application/json:            schema:              type: object              properties:                pid:                  x-glean-typehint: 'JiraProjectID'                  type: string                  description: Project ID where the ticket is created.                issuetype:                  type: integer                  description: The ID corresponding to the type of issue being created.                priority:                  type: integer                  minimum: 1                  maximum: 5                  description: Numeric priority. 1 (highest) to 5 (lowest).                summary:                  x-glean-typehint: 'Content'                  type: string                  description: Title of the issue                components:                  x-glean-typehint: 'JiraComponentId'                  type: string                  description: Component name where the ticket should be filed.                description:                  x-glean-typehint: 'Content'                  type: string                  description: Body of the issue.                assignee:                  x-glean-typehint: 'EmailAddress'                  type: string                  description: User to which the issue is assigned.        required: true      responses:        '200':          description: OK          content:            application/json:              schema:                $ref: '#/components/schemas/CreateIssuePostResponse'        '400':          description: Bad Request        '401':          description: Not Authorized        '409':          description: Conflictcomponents:  schemas:    CreateIssuePostResponse:      type: object      properties:        resultURL:          type: string          description: URL of the created issue.
```

3

Testing and Deployment

After configuration, thoroughly test the tool before deployment.

#### Testing Process

1.  Deploy your server implementation to a publicly accessible endpoint
2.  Configure the tool in Glean with your server URL
3.  Test with various user email addresses to verify user attribution
4.  Validate that issues are created with correct project, type, and assignee information
5.  Test error scenarios (invalid users, missing permissions, etc.)

#### Deployment Configuration

Once testing is complete, deploy the tool to your organization with appropriate access controls.

## Best Practices[​](#best-practices "Direct link to Best Practices")

### Security and Authentication[​](#security-and-authentication "Direct link to Security and Authentication")

### OAuth Configuration

The implementation incorporates several security measures that protect your Jira integration:

-   The OAuth configuration uses admin-level authentication, which provides centralized control while maintaining individual user attribution
-   The server implementation validates all incoming requests and enforces proper user attribution
-   The `Glean-User-Email` header ensures that issues are created with the correct reporter, maintaining accountability and traceability

### User Attribution System[​](#user-attribution-system "Direct link to User Attribution System")

### Email Mapping

The server retrieves the appropriate Jira account ID for each user by matching their email address:

-   This process ensures that issues appear in Jira with the correct reporter
-   Maintains accurate audit trails and user accountability
-   Handles cases where users might not be found in Jira

### Data Integrity

The implementation prevents issues from being created without proper attribution:

-   Safeguards maintain data integrity within your Jira instance
-   Error handling for missing or invalid user information
-   Proper validation of all required fields

### Performance Optimization[​](#performance-optimization "Direct link to Performance Optimization")

### Efficient Implementation

Several measures ensure optimal performance of the Jira integration:

-   Uses efficient user lookup mechanisms with pagination for large organizations
-   Includes proper request timeouts and connection pooling
-   API specification includes type hints that help Glean Assistant populate fields correctly
-   Reduces the need for repeated attempts or corrections

### Error Handling[​](#error-handling "Direct link to Error Handling")

### Comprehensive Error Management

The implementation includes comprehensive error handling that addresses common scenarios:

-   Authentication failures receive appropriate error responses with clear messages
-   Missing or invalid user information is caught and handled gracefully
-   Jira API errors are properly captured and communicated back to users
-   Network issues and timeouts are managed appropriately

### Common Pitfalls to Avoid[​](#common-pitfalls-to-avoid "Direct link to Common Pitfalls to Avoid")

warning

Watch out for these common implementation mistakes:

1.  **Authentication Issues**
    
    -   Verify OAuth token validity
    -   Check scope configurations
    -   Confirm user permissions
2.  **User Attribution Problems**
    
    -   Verify email mapping functionality
    -   Check Jira user account status
    -   Confirm proper header parsing
3.  **Performance Concerns**
    
    -   Monitor response times
    -   Check rate limit usage
    -   Review connection pooling settings

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

If you encounter issues during setup or execution:

1.  **Verify Authentication Configuration**
    
    -   Check OAuth credentials are correctly configured
    -   Ensure proper scopes are granted
    -   Validate server endpoint accessibility
2.  **Debug User Attribution**
    
    -   Verify email mapping functionality
    -   Check Jira user account status
    -   Confirm proper header parsing and validation
3.  **Test API Integration**
    
    -   Monitor response times and error rates
    -   Check rate limit usage against Jira limits
    -   Review connection pooling and timeout settings

## Next Steps[​](#next-steps "Direct link to Next Steps")

After implementing the Jira integration:

-   **Documentation**: Create comprehensive user documentation
-   **Monitoring**: Establish monitoring and alerting systems
-   **Schedules**: Set up regular maintenance schedules
-   **Enhancements**: Plan for feature enhancements
-   **Recovery**: Configure backup and recovery procedures
