---
url: "https://developers.glean.com/guides/tools/examples/zendesk-ticket-redirection"
canonical: "https://developers.glean.com/guides/tools/examples/zendesk-ticket-redirection"
title: "Zendesk Ticket Redirection Tool | Glean Developer"
description: "Implement a redirect tool that enables Glean Assistant to create Zendesk tickets through the native Zendesk interface"
fetched_at: "2026-09-01T13:23:03.529Z"
---
On this page

## Overview[​](#overview "Direct link to Overview")

This guide demonstrates how to create a redirect tool that allows users to create Zendesk tickets through Glean Assistant. This implementation leverages Zendesk's URL-based ticket creation parameters to provide a seamless experience that directs users to the familiar Zendesk interface with pre-populated ticket fields.

This is a **redirect tool** that directs users to Zendesk's ticket creation interface with pre-populated fields using URL parameters.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before implementing this tool, ensure you have:

-   Administrator access to your Zendesk and Glean instances
-   Understanding of Zendesk's URL parameter structure and ticket creation interface
-   Access to Zendesk API documentation for field mappings
-   Knowledge of redirect tool configuration principles

## Implementation Guide[​](#implementation-guide "Direct link to Implementation Guide")

1

OpenAPI Specification Design

The OpenAPI specification serves as the blueprint for parameter handling and URL construction. This specification must accurately reflect Zendesk's parameter structure and validation requirements.

Click to expand the complete OpenAPI specification

```
openapi: 3.0.0info:  title: Create Zendesk Ticket Tool  version: 1.0.0servers:  - url: https://{ZENDESK_SUBDOMAIN}.zendesk.com/agent/tickets/new?    variables:      ZENDESK_SUBDOMAIN:        default: your-subdomain        description: Your Zendesk subdomainpaths:  /:    post:      summary: Create a new support ticket in Zendesk      description: |        This tool redirects to Zendesk's ticket creation interface with pre-populated fields        for efficient ticket creation and management.      parameters:        - name: ticket[requester]          in: query          required: true          schema:            type: string            x-glean-typehint: EmailAddress          description: Email address of the person requesting support        - name: ticket[subject]          in: query          required: true          schema:            type: string            x-glean-typehint: Content          description: Brief summary of the issue or request        - name: ticket[description]          in: query          required: true          schema:            type: string            x-glean-typehint: Content          description: Detailed description of the issue or request        - name: ticket[priority]          in: query          schema:            type: string            enum:              - low              - normal              - high              - urgent            default: normal          description: Priority level of the ticket        - name: ticket[type]          in: query          schema:            type: string            enum:              - question              - incident              - problem              - task            default: question          description: Type of ticket being created        - name: ticket[status]          in: query          schema:            type: string            enum:              - new              - open              - pending              - hold              - solved              - closed            default: new          description: Initial status of the ticket      responses:        '200':          description: Successful redirect to Zendesk ticket creation interface          content:            text/html:              schema:                type: string
```

2

URL Construction Strategy

The URL construction process is the core functionality of this redirect tool. Understanding how Zendesk processes URL parameters ensures that tickets are created with the correct information.

#### Parameter Structure

Zendesk uses a nested parameter structure where ticket fields are prefixed with `ticket[]`. This format ensures that parameters are properly interpreted by Zendesk's ticket creation interface. For example, `ticket[subject]` sets the ticket's subject field.

#### Required vs Optional Parameters

The specification defines three required parameters that ensure basic ticket functionality:

-   **ticket\[requester\]**: The email address of the person requesting support
-   **ticket\[subject\]**: A brief summary of the issue or request
-   **ticket\[description\]**: Detailed information about the issue

Optional parameters provide additional context and workflow control:

-   **ticket\[priority\]**: Allows setting urgency levels (low, normal, high, urgent)
-   **ticket\[type\]**: Categorizes the ticket (question, incident, problem, task)
-   **ticket\[status\]**: Sets initial workflow state (typically "new")

#### Content Generation Guidelines

The `x-glean-typehint` directives guide Glean Assistant in generating appropriate content:

-   **EmailAddress**: Ensures valid email format for the requester field
-   **Content**: Generates contextually appropriate text for subject and description

3

Testing and Deployment

Thorough testing ensures that the redirect tool functions correctly across different scenarios and user types.

#### Testing Process

1.  Test URL generation with various parameter combinations
2.  Verify that redirects properly reach Zendesk's interface
3.  Confirm that all fields are correctly populated in Zendesk's form
4.  Test with different user types and permission levels
5.  Validate parameter encoding for special characters and long content
6.  Test edge cases such as missing optional parameters

#### Deployment Configuration

Configure deployment settings to ensure appropriate access control and user experience.

## Best Practices[​](#best-practices "Direct link to Best Practices")

### Parameter Management[​](#parameter-management "Direct link to Parameter Management")

### Effective Parameter Design

The specification implements several best practices for parameter management:

-   **Clear Naming**: Use descriptive parameter names that match Zendesk's expectations
-   **Appropriate Defaults**: Provide sensible default values for optional parameters
-   **Type Validation**: Use enums to constrain values to valid options
-   **Content Hints**: Leverage type hints to guide content generation

### URL Construction and Encoding[​](#url-construction-and-encoding "Direct link to URL Construction and Encoding")

### Proper URL Encoding

URL construction requires careful attention to encoding:

-   Encode special characters to prevent URL parsing errors
-   Handle spaces and line breaks in description fields
-   Ensure parameter values don't exceed URL length limits
-   Validate parameter order for optimal compatibility

### Content Length Management

Manage content length to ensure successful redirects:

-   Monitor description length to prevent URL truncation
-   Implement content summarization for long descriptions
-   Consider character encoding implications
-   Test with various content types and formats

### Security Considerations[​](#security-considerations "Direct link to Security Considerations")

### Security Best Practices

Important security measures for redirect tools:

-   **Domain Validation**: Ensure redirects only target authorized Zendesk instances
-   **Parameter Sanitization**: Clean parameter values to prevent injection attacks
-   **Access Control**: Verify users have appropriate permissions to create tickets
-   **Audit Logging**: Log tool usage for security monitoring and compliance

### Performance Optimization[​](#performance-optimization "Direct link to Performance Optimization")

### Redirect Efficiency

Optimize redirect performance:

-   Minimize the number of parameters to reduce URL complexity
-   Cache parameter validation logic where possible
-   Implement client-side validation to prevent invalid redirects
-   Monitor redirect success rates and failure patterns

### User Experience

Enhance the user experience:

-   Provide clear feedback during the redirect process
-   Ensure smooth transitions between Glean and Zendesk interfaces
-   Handle error scenarios gracefully with appropriate messaging
-   Consider mobile compatibility for redirect URLs

## Advanced Configuration[​](#advanced-configuration "Direct link to Advanced Configuration")

### Multi-Subdomain Support[​](#multi-subdomain-support "Direct link to Multi-Subdomain Support")

### Multiple Zendesk Instances

For organizations with multiple Zendesk instances:

-   **Dynamic Subdomain Selection**: Implement logic to determine the correct Zendesk subdomain based on user context
-   **Configuration Management**: Maintain mappings between user groups and Zendesk instances
-   **URL Template Flexibility**: Design URL templates that accommodate different subdomain patterns
-   **Error Handling**: Provide fallback mechanisms when subdomain determination fails

### Custom Field Integration[​](#custom-field-integration "Direct link to Custom Field Integration")

### Enhanced Field Mapping

Support for Zendesk custom fields:

-   **Custom Field Parameters**: Add parameters for organization-specific custom fields
-   **Field Validation**: Implement validation for custom field values and formats
-   **Dynamic Field Discovery**: Consider mechanisms for automatically discovering available custom fields
-   **Field Mapping Logic**: Create mappings between Glean context and Zendesk custom fields

### Common Pitfalls to Avoid[​](#common-pitfalls-to-avoid "Direct link to Common Pitfalls to Avoid")

warning

Common challenges and their solutions:

1.  **URL Length Limitations**
    
    -   Monitor total URL length to prevent truncation
    -   Implement content summarization for long descriptions
    -   Consider parameter prioritization for essential fields
2.  **Character Encoding Issues**
    
    -   Properly encode special characters and Unicode content
    -   Test with various languages and character sets
    -   Validate encoding compatibility with Zendesk
3.  **Parameter Mapping Errors**
    
    -   Verify parameter names match Zendesk's expectations
    -   Test with different ticket types and field configurations
    -   Validate enum values against current Zendesk setup
4.  **Redirect Failures**
    
    -   Implement fallback mechanisms for failed redirects
    -   Provide clear error messages for troubleshooting
    -   Monitor redirect success rates and common failure points

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

If you encounter issues during implementation or operation:

1.  **Verify Parameter Configuration**
    
    -   Check parameter names against Zendesk documentation
    -   Validate enum values match your Zendesk configuration
    -   Ensure required parameters are properly marked
2.  **Test URL Construction**
    
    -   Manually test generated URLs in browsers
    -   Verify parameter encoding and formatting
    -   Check URL length against browser limitations
3.  **Debug Zendesk Integration**
    
    -   Confirm Zendesk subdomain and URL structure
    -   Test with different user permission levels
    -   Validate field mappings and custom field configurations
4.  **Monitor Performance**
    
    -   Track redirect success and failure rates
    -   Monitor user feedback and error reports
    -   Analyze usage patterns for optimization opportunities

## Next Steps[​](#next-steps "Direct link to Next Steps")

To ensure ongoing success:

-   **Documentation**: Create comprehensive user guides and troubleshooting resources
-   **Monitoring**: Establish metrics tracking for redirect success rates and user satisfaction
-   **Feedback**: Implement feedback collection mechanisms for continuous improvement
-   **Maintenance**: Plan regular reviews of parameter configurations and Zendesk compatibility
-   **Enhancement**: Consider additional features such as template-based ticket creation

This implementation provides a solid foundation for streamlined ticket creation while maintaining the familiar Zendesk interface. Regular monitoring and user feedback will guide future enhancements and ensure continued effectiveness.
