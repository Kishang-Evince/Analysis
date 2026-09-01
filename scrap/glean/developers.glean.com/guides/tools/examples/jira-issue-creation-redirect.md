---
url: "https://developers.glean.com/guides/tools/examples/jira-issue-creation-redirect"
canonical: "https://developers.glean.com/guides/tools/examples/jira-issue-creation-redirect"
title: "Jira Issue Creation Using Redirect Tool | Glean Developer"
description: "Implement a redirect tool that enables Glean Assistant to create Jira issues through the native Jira interface"
fetched_at: "2026-09-01T13:23:03.636Z"
---
On this page

## Overview[​](#overview "Direct link to Overview")

This guide explains how to implement a redirect tool that allows users to create Jira issues through Glean Assistant. Unlike execution tools that create issues programmatically, this approach directs users to Jira's native interface with relevant information already filled in. This implementation maintains the familiar Jira environment while streamlining the issue creation process.

This is a **redirect tool** that directs users to Jira's issue creation interface with pre-populated fields.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before proceeding, ensure you have:

-   Administrator access to your Jira and Glean instances
-   Understanding of Jira's URL parameter structure
-   Access to Jira project and component IDs
-   Familiarity with redirect tool concepts

## Implementation Guide[​](#implementation-guide "Direct link to Implementation Guide")

1

API Specification Development

The OpenAPI specification serves as the blueprint for how Glean Assistant interacts with your redirect tool. This specification must clearly define all parameters and their behaviors to ensure accurate field population.

Click to expand the complete OpenAPI specification

```
openapi: '3.0.0'info:  title: 'Jira Create Ticket'  version: '1.0.0'servers:  - url: 'https://{YOUR-ATLASSIAN-DOMAIN}.atlassian.net/secure/CreateIssueDetails!init.jspa?'paths:  /:    post:      summary: 'Creates an issue or a sub-task from a JSON representation'      description: |        This API allows you to create a ticket or an issue in Jira.      parameters:        - name: 'pid'          in: 'query'          required: true          schema:            type: 'string'            x-glean-typehint: 'JiraProjectID'            default: '10000'          description: 'Project ID where the ticket is created. 10000 refers to Engineering project.'        - name: 'issuetype'          in: 'query'          required: true          schema:            type: 'integer'            enum:              - 10002              - 10004          description: 'Issue type. 10002 refers to Task, 10004 refers to Bug.'        - name: 'priority'          in: 'query'          schema:            type: 'integer'            minimum: 1            maximum: 5          description: 'Numeric priority. 1 (highest) to 5 (lowest).'        - name: 'summary'          in: 'query'          required: true          schema:            type: 'string'            x-glean-typehint: 'Content'          description: 'Title of the issue.'        - name: 'components'          in: 'query'          schema:            type: 'string'            x-glean-typehint: 'JiraComponent'          description: 'Component name where the ticket should be filed.'        - name: 'description'          in: 'query'          schema:            type: 'string'            x-glean-typehint: 'Content'          description: 'Body of the issue.'        - name: 'assignee'          in: 'query'          schema:            type: 'string'            x-glean-typehint: 'JiraId'          description: 'User to which the issue is assigned.'      responses:        '200':          description: 'OK'          content:            application/json:              schema:                type: 'string'
```

2

Parameter Configuration Strategy

The specification includes carefully designed parameters that guide Glean Assistant in populating the Jira issue creation form. Each parameter serves a specific purpose and includes clear instructions for value generation.

#### Project Identification

The project ID parameter (`pid`) requires specific attention as it determines where issues are created. The specification includes a default value and clear description to ensure proper project targeting. For example, setting "10000" as the Engineering project helps maintain consistent issue organization.

#### Issue Type Classification

The issue type parameter uses enumerated values to ensure accurate categorization. The specification maps numeric values to specific issue types, such as 10002 for Tasks and 10004 for Bugs. This mapping ensures that issues are properly classified within your Jira instance.

#### Priority Assignment

The priority parameter implements a numeric scale from 1 to 5, with built-in validation to prevent invalid values. This structured approach maintains consistency with Jira's priority system while allowing for flexible assignment based on issue urgency.

#### Content Generation

Content-related parameters like summary and description use the `x-glean-typehint: "Content"` directive to guide Glean Assistant in generating appropriate text. This hint ensures that generated content matches the expected format and style for Jira issues.

3

Testing and Deployment

After configuration, thoroughly test the redirect tool before deployment.

#### Testing Process

1.  Test the tool with various user queries to verify proper parameter population
2.  Verify that URLs are constructed correctly with all required parameters
3.  Check that redirects function properly and reach the correct Jira interface
4.  Validate that field values are correctly populated in Jira's form
5.  Test with different project types, issue types, and user scenarios

#### Deployment Configuration

Once testing is complete, deploy the tool to your organization with appropriate access controls.

## Best Practices[​](#best-practices "Direct link to Best Practices")

### Parameter Value Management[​](#parameter-value-management "Direct link to Parameter Value Management")

### Value Management Strategy

The specification implements various methods for managing parameter values effectively:

-   **Default Values**: Provide sensible defaults where appropriate to streamline the creation process
-   **Value Constraints**: Use enumerated values and ranges to ensure valid input
-   **Type Hints**: Leverage Glean-specific type hints to guide content generation
-   **Required Fields**: Mark essential parameters as required to ensure complete issue creation

### URL Construction[​](#url-construction "Direct link to URL Construction")

### URL Building Process

The redirect tool builds URLs that properly integrate with Jira's interface:

-   Proper parameter encoding to handle special characters and spaces
-   Correct ordering of query parameters for optimal compatibility
-   Implementation of appropriate parameter separators and delimiters
-   Validation of URL length to prevent truncation issues

### Error Prevention

The implementation includes several measures to prevent common issues:

-   Parameter validation before URL construction
-   Proper encoding of special characters
-   Length validation for generated content
-   Type checking for numeric values

### Performance Optimization[​](#performance-optimization "Direct link to Performance Optimization")

### URL Construction Efficiency

To ensure optimal performance and user experience:

-   Minimize parameter count to reduce URL length
-   Implement efficient parameter value generation
-   Consider caching frequently used project and component mappings
-   Add client-side validation to prevent invalid redirects

### Response Time Management

Optimize redirect timing and reliability:

-   Monitor redirect success rates and identify common failure patterns
-   Implement fallback mechanisms for parameter population failures
-   Track redirect timing metrics
-   Optimize parameter generation processes

### Security Considerations[​](#security-considerations "Direct link to Security Considerations")

### Security Best Practices

Important security considerations for redirect tools:

-   **URL Validation**: Ensure generated URLs point only to authorized Jira instances
-   **Parameter Sanitization**: Sanitize all parameter values to prevent injection attacks
-   **Access Control**: Verify users have appropriate permissions for target projects
-   **Audit Logging**: Implement logging for tool usage and parameter values

### Common Pitfalls to Avoid[​](#common-pitfalls-to-avoid "Direct link to Common Pitfalls to Avoid")

warning

Common implementation challenges and solutions:

1.  **Parameter Encoding Issues**
    
    -   Ensure special characters are properly URL-encoded
    -   Test with various content types including non-ASCII characters
    -   Verify encoding compatibility with Jira's interface
2.  **Field Mapping Problems**
    
    -   Confirm project IDs and issue type IDs match your Jira configuration
    -   Validate component names and assignee IDs
    -   Test with different user permission levels
3.  **URL Length Limitations**
    
    -   Monitor generated URL lengths to prevent truncation
    -   Implement content trimming for long descriptions
    -   Consider parameter prioritization for essential fields

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

If you encounter issues during setup or execution:

1.  **Verify Parameter Configuration**
    
    -   Check that all required parameters are properly defined
    -   Validate parameter types and constraints
    -   Ensure type hints are correctly applied
2.  **Test URL Generation**
    
    -   Verify that URLs are constructed correctly
    -   Check parameter encoding and formatting
    -   Test with various input scenarios
3.  **Debug Jira Integration**
    
    -   Confirm that generated URLs work directly in browsers
    -   Validate that field mapping matches Jira's expectations
    -   Test with different Jira projects and configurations

## Next Steps[​](#next-steps "Direct link to Next Steps")

To ensure ongoing success with your implementation:

-   **Documentation**: Develop comprehensive user documentation
-   **Monitoring**: Establish regular monitoring procedures
-   **Feedback**: Create a feedback collection system
-   **Reviews**: Plan for periodic review and updates
-   **Enhancements**: Consider potential feature enhancements

This implementation provides a solid foundation for streamlined issue creation while maintaining the flexibility and familiarity of the Jira interface. Regular monitoring and maintenance will ensure continued effectiveness and user satisfaction.
