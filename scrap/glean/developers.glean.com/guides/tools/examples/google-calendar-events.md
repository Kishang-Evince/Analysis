---
url: "https://developers.glean.com/guides/tools/examples/google-calendar-events"
canonical: "https://developers.glean.com/guides/tools/examples/google-calendar-events"
title: "Google Calendar Events Retrieval Tool | Glean Developer"
description: "Create a retrieval tool that enables Glean Assistant to fetch and display Google Calendar events"
fetched_at: "2026-09-01T13:23:03.351Z"
---
On this page

## Overview[​](#overview "Direct link to Overview")

This guide walks through creating a retrieval tool that allows Glean Assistant to access and display Google Calendar events. This integration enables users to query their calendar events directly through Glean's interface with proper OAuth authentication and secure API access.

This is a **retrieval tool** that fetches calendar data from Google Calendar API with OAuth User authentication.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before beginning this implementation, ensure you have:

-   Administrator access to your Glean instance
-   Access to Google Cloud Console with appropriate permissions
-   Understanding of OAuth 2.0 authentication flows

## Implementation Guide[​](#implementation-guide "Direct link to Implementation Guide")

1

Creating the Base Tool

Begin by navigating to [Admin console > Platform > Tools](https://app.glean.com/admin/platform/tools) and clicking "Add".

info

Choose "start from scratch" since the Google Calendar tool isn't available in the templates.

#### Basic Information Configuration[​](#basic-information-configuration "Direct link to Basic Information Configuration")

Configure these essential details:

-   **Display Name**: Choose a clear, descriptive name (e.g., "Calendar Events Retrieval")
-   **Description**: Explain the tool's purpose and capabilities
-   **Unique Identifier**: Set a unique ID (e.g., "retrieveCalendarEvents")
-   **Tool type**: Select "Read (retrieval)" since this tool reads calendar data

#### Trigger Condition Setup[​](#trigger-condition-setup "Direct link to Trigger Condition Setup")

Your trigger condition should clearly specify:

-   When Glean Assistant should use this tool
-   Expected user query patterns
-   Scenarios where the tool shouldn't be used

2

Configuring the API Specification

Add this OpenAPI specification to define how Glean Assistant interacts with the Google Calendar API:

Click to expand the complete OpenAPI specification

```
openapi: 3.0.1servers:  - url: 'https://www.googleapis.com/calendar/v3/'info:  title: Google Calendar Events API  description: This API returns events on the primary calendar of the currently logged-in user.  version: 1.0.0paths:  /calendars/primary/events:    get:      summary: List Events      description: Retrieves events from the primary calendar.      parameters:        - name: timeMin          in: query          description: |            Lower bound (exclusive) for an event's start time to filter by. Must be an RFC3339 timestamp with a mandatory time zone offset. Its very important to have timestamp in Z format            Example: 2011-06-03T10:00:00Z          required: false          schema:            type: string            format: date-time        - name: timeMax          in: query          description: |            Upper bound (exclusive) for an event's start time to filter by. Must be an RFC3339 timestamp with a mandatory time zone offset. Its very important to have timestamp in Z format            Example: 2011-06-03T10:00:00Z          required: false          schema:            type: string            format: date-time        - name: q          in: query          description: Free text search terms to find events that match these terms in various fields such as summary, description, location, etc.          required: false          schema:            type: string      responses:        '200':          description: A list of events.          content:            application/json:              schema:                type: object                properties:                  items:                    type: array                    items:                      type: object                      properties:                        id:                          type: string                          description: Identifier of the event.                        status:                          type: string                          description: Status of the event (confirmed, tentative, cancelled).                        summary:                          type: string                          description: Title of the event.                        description:                          type: string                          description: Description of the event.                        start:                          type: object                          properties:                            dateTime:                              type: string                              format: date-time                              description: The start time of the event.                        end:                          type: object                          properties:                            dateTime:                              type: string                              format: date-time                              description: The end time of the event.
```

warning

Leave the "Use existing on-premise server" option unchecked since we're accessing Google's API directly.

3

Setting Up OAuth Authentication

This tool requires OAuth User authentication to access individual users' calendar data.

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
Client URL: https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&prompt=consentAuthorization URL: https://oauth2.googleapis.com/tokenScopes: https://www.googleapis.com/auth/calendar.readonly
```

note

In Glean's OAuth configuration, **Client URL** is Google's user-facing authorization endpoint (where users are redirected to grant access), and **Authorization URL** is Google's token endpoint (which Glean calls to exchange the authorization code for a token). There is no separate token URL field.

#### Enable Google Calendar API[​](#enable-google-calendar-api "Direct link to Enable Google Calendar API")

1.  Access your Google Cloud Console
    
2.  Enable the Calendar API:
    

4

Testing and Deployment

Test the tool thoroughly before deployment.

#### Initial Testing[​](#initial-testing "Direct link to Initial Testing")

1.  Use the provided testing URL
    
2.  You'll see the connection banner:
    
3.  Authenticate with Google
    
4.  Verify event retrieval:
    

#### Deployment[​](#deployment "Direct link to Deployment")

Configure deployment settings: 

Set appropriate access controls:

-   Enable for all teammates or
-   Restrict to specific team members

## Best Practices[​](#best-practices "Direct link to Best Practices")

### API Specification Design[​](#api-specification-design "Direct link to API Specification Design")

### Parameter Configuration

When configuring the Calendar API parameters:

-   Use RFC3339 format for all date-time fields
-   Include timezone offsets in timestamp examples
-   Provide clear descriptions for search parameters
-   Consider default values for time ranges

### Response Handling

Important considerations for handling calendar data:

-   Process multiple calendar event types (recurring, all-day, etc.)
-   Handle timezone conversions appropriately
-   Consider pagination for large result sets
-   Process cancelled or declined events properly

### Authentication Implementation[​](#authentication-implementation "Direct link to Authentication Implementation")

### OAuth Setup

Critical OAuth implementation details:

-   Always use `access_type=offline` for refresh token support
-   Request minimal scopes (readonly for calendar access)
-   Handle token refresh scenarios gracefully
-   Implement proper token storage and security

### Performance Optimization[​](#performance-optimization "Direct link to Performance Optimization")

### Query Optimization

Optimize calendar queries by:

-   Using appropriate time ranges
-   Implementing result caching
-   Limiting returned fields
-   Managing API quota usage

### Error Handling

Implement robust error handling:

-   Handle quota limit scenarios
-   Manage token expiration gracefully
-   Provide meaningful error messages
-   Implement retry logic for transient failures

### Common Implementation Challenges[​](#common-implementation-challenges "Direct link to Common Implementation Challenges")

warning

Watch out for these common issues:

1.  **Time Zone Handling**
    
    -   Inconsistent timezone formatting
    -   Missing timezone offsets
    -   Incorrect local time conversions
2.  **Calendar Access**
    
    -   Primary vs. secondary calendar confusion
    -   Shared calendar permissions
    -   Resource calendar access
3.  **Event Filtering**
    
    -   Inefficient time range queries
    -   Missing recurring event instances
    -   Incomplete search term matching
4.  **OAuth Configuration**
    
    -   Incorrect redirect URIs
    -   Missing required scopes
    -   Token refresh failures

## Security Considerations[​](#security-considerations "Direct link to Security Considerations")

### Security Best Practices

Important security measures for calendar integration:

-   **Scope Minimization**: Request only necessary permissions (readonly for retrieval)
-   **Token Security**: Implement secure token storage and transmission
-   **Access Logging**: Log access patterns for security monitoring
-   **Data Privacy**: Ensure calendar data is handled according to privacy policies

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

If you encounter issues:

1.  **Verify OAuth Configuration**
    
    -   Check credential settings in Google Cloud Console
    -   Confirm correct scopes are requested
    -   Validate redirect URIs match exactly
2.  **Check API Access**
    
    -   Confirm Calendar API is enabled in Google Cloud Console
    -   Verify quota availability and limits
    -   Check user permissions for calendar access
3.  **Debug Authentication Flow**
    
    -   Test the OAuth flow manually
    -   Check for proper token generation and refresh
    -   Validate scope permissions
4.  **Review Implementation**
    
    -   Validate timestamp formats in API calls
    -   Check parameter formatting and encoding
    -   Verify error handling logic

## Next Steps[​](#next-steps "Direct link to Next Steps")

After successful implementation:

1.  **Documentation**: Create user guides for calendar integration features
2.  **Monitoring**: Set up dashboards for tracking usage and performance
3.  **Support**: Establish procedures for handling user issues
4.  **Enhancement**: Plan feature expansions based on user feedback
5.  **Reviews**: Schedule regular system and security reviews
