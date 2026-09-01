---
url: "https://developers.glean.com/api-info/client/authentication/glean-issued"
canonical: "https://developers.glean.com/api-info/client/authentication/glean-issued"
title: "Glean-Issued Tokens | Glean Developer"
description: "Complete guide to creating and using Glean-issued tokens for Client API authentication"
fetched_at: "2026-09-01T13:22:49.902Z"
---
On this page

Glean-issued tokens provide an alternative to OAuth when you need granular scope control or don't have OAuth infrastructure. They're manually created through the admin console and offer fine-grained permissions.

### Glean Token Benefits

-   **Granular scope control** - Limit access to specific API endpoints
-   **User-scoped or global** - Choose appropriate permission level
-   **No external dependencies** - Works without identity provider setup
-   **Flexible expiration** - Set custom expiry dates

warning

Client API and Indexing API each support separately created Glean-issued credentials; a Client API token cannot be used as an Indexing API token. This guide focuses on Client API tokens. For Indexing API credentials, see [Indexing API Authentication](/api-info/indexing/authentication/overview).

* * *

## Authentication Headers[​](#authentication-headers "Direct link to Authentication Headers")

Glean token requests use different headers based on token type:

-   User-Scoped Token
-   Global Token

```
Authorization: Bearer <user_scoped_token>
```

```
Authorization: Bearer <global_token>X-Glean-ActAs: user@company.com
```

### Header Details[​](#header-details "Direct link to Header Details")

| Header | Required For | Description | Example Value |
| --- | --- | --- | --- |
| `Authorization` | All tokens | Bearer token authentication | `Bearer glean_XYZ123...` |
| `X-Glean-ActAs` | Global tokens only | Email of user to impersonate | `user@company.com` |

* * *

## Token Types[​](#token-types "Direct link to Token Types")

Choose the right token type for your use case:

-   User-Scoped (Recommended)
-   Global (Super Admin Only)

**Best for**: Most applications, user-specific integrations

-   **Security**: Highest security, limited to specific user's data
-   **Headers**: Only `Authorization: Bearer <token>` required
-   **Creation**: Super Admins can create Glean-issued tokens for any user. Admins and API Token Creators can create Glean-issued tokens for themselves only.
-   **Use case**: Applications accessing data as a specific user

```
curl -X POST https://instance-be.glean.com/rest/api/v1/search \  -H 'Authorization: Bearer <USER_TOKEN>' \  -H 'Content-Type: application/json' \  -d '{"query": "quarterly reports"}'
```

**Best for**: Multi-user applications, service integrations

-   **Security**: Can impersonate any user (use carefully)
-   **Headers**: Requires `X-Glean-ActAs` header with user email
-   **Creation**: Only Super Admins can create these tokens
-   **Use case**: Applications serving multiple users

```
curl -X POST https://instance-be.glean.com/rest/api/v1/search \  -H 'Authorization: Bearer <GLOBAL_TOKEN>' \  -H 'X-Glean-ActAs: user@company.com' \  -H 'Content-Type: application/json' \  -d '{"query": "quarterly reports"}'
```

warning

The `X-Glean-ActAs` header is **required** for global tokens. Requests without this header will fail.

* * *

## Creating Tokens[​](#creating-tokens "Direct link to Creating Tokens")

Follow these steps to create Glean-issued tokens:

1

Navigate to Token Management

Go to [Client API Token Settings](https://app.glean.com/admin/platform/tokenManagement?tab=client) (admin access required)

2

Add New Token

Click **Add New Token** and configure:

-   **Description**: Helpful name for tracking
-   **Permissions**: USER (recommended) or GLOBAL
-   **Scopes**: Select required API access scopes
-   **Expires**: Optional expiration date
-   **User Email**: Required for USER tokens

3

Save Token Securely

warning

The token secret is only shown once after creation. Save it securely - you cannot retrieve it again.

* * *

## Available Scopes[​](#available-scopes "Direct link to Available Scopes")

Scopes control which Client API endpoints your token can access:

Complete Scopes Reference

| Scope | Description | Example Endpoints |
| --- | --- | --- |
| `ACTIVITY` | User activity collection | Activity reporting APIs |
| `AGENTS` | Glean Agents | Agent creation, execution |
| `ANNOUNCEMENTS` | Company announcements | Create, update announcements |
| `ANSWERS` | Glean Answers | Manage Q&A content |
| `CHAT` | GleanChat functionality | Chat API, conversations |
| `COLLECTIONS` | Content collections | Create, manage collections |
| `DOCPERMISSIONS` | Document permissions | Access control management |
| `DOCUMENTS` | Document operations | Document retrieval, metadata |
| `ENTITIES` | Entity data | People, organizational data |
| `FEEDBACK` | User feedback | Feedback collection |
| `INSIGHTS` | Analytics insights | Usage analytics, reports |
| `MCP` | Remote MCP server access | Connecting MCP hosts to Glean |
| `PEOPLE` | People directory | Employee information |
| `PINS` | Pinned content | Content pinning features |
| `SEARCH` | Search functionality | Search queries, autocomplete |
| `SHORTCUTS` | GoLinks/shortcuts | Shortcut management |
| `SUMMARIZE` | AI summarization | Document summarization |
| `TOOLS` | Glean Tools | List and execute tools |
| `VERIFICATION` | Content verification | Document verification |

warning

Token permissions and scopes **cannot be changed** after creation. Plan carefully when creating tokens.

* * *

## Implementation Examples[​](#implementation-examples "Direct link to Implementation Examples")

### Search with User-Scoped Token[​](#search-with-user-scoped-token "Direct link to Search with User-Scoped Token")

```
curl -X POST https://instance-be.glean.com/rest/api/v1/search \  -H 'Authorization: Bearer <USER_TOKEN>' \  -H 'Content-Type: application/json' \  -d '{    "query": "quarterly reports",    "pageSize": 10  }'
```

### Search with Global Token[​](#search-with-global-token "Direct link to Search with Global Token")

```
curl -X POST https://instance-be.glean.com/rest/api/v1/search \  -H 'Authorization: Bearer <GLOBAL_TOKEN>' \  -H 'X-Glean-ActAs: user@company.com' \  -H 'Content-Type: application/json' \  -d '{    "query": "quarterly reports",     "pageSize": 10  }'
```

### Chat with Glean Token[​](#chat-with-glean-token "Direct link to Chat with Glean Token")

```
curl -X POST https://instance-be.glean.com/rest/api/v1/chat \  -H 'Authorization: Bearer <USER_TOKEN>' \  -H 'Content-Type: application/json' \  -d '{    "query": "What are the latest quarterly results?",    "conversationId": "optional-conversation-id"  }'
```

* * *

## Testing Glean Tokens[​](#testing-glean-tokens "Direct link to Testing Glean Tokens")

### Test Commands[​](#test-commands "Direct link to Test Commands")

-   User-Scoped Token
-   Global Token

```
curl -X POST https://<instance>-be.glean.com/rest/api/v1/search \  -H 'Authorization: Bearer <USER_TOKEN>' \  -H 'Content-Type: application/json' \  -d '{"query": "test", "pageSize": 1}'
```

```
curl -X POST https://<instance>-be.glean.com/rest/api/v1/search \  -H 'Authorization: Bearer <GLOBAL_TOKEN>' \  -H 'X-Glean-ActAs: your-email@company.com' \  -H 'Content-Type: application/json' \  -d '{"query": "test", "pageSize": 1}'
```

### Expected Response[​](#expected-response "Direct link to Expected Response")

Successful authentication returns a 200 status with search results:

```
{  "results": [...],  "trackingToken": "...",  "requestId": "..."}
```

* * *

## Troubleshooting Glean Tokens[​](#troubleshooting-glean-tokens "Direct link to Troubleshooting Glean Tokens")

### Common Token Errors[​](#common-token-errors "Direct link to Common Token Errors")

| Error | Cause | Solution |
| --- | --- | --- |
| `401 Unauthorized` | Invalid or expired token | Verify token is correct and not expired |
| `403 Forbidden` | Insufficient scopes | Add required scopes to token |
| `400 Bad Request: Required header missing: X-Glean-ActAs` | Missing header for global token | Add `X-Glean-ActAs` header |
| `401 Invalid identity` | Invalid email in `X-Glean-ActAs` | Verify email is valid and user exists |

### Debugging Steps[​](#debugging-steps "Direct link to Debugging Steps")

1

Verify token validity

Check that your token hasn't expired and is correctly formatted

2

Confirm headers

Ensure you have the correct headers for your token type:

-   User token: `Authorization` only
-   Global token: `Authorization` + `X-Glean-ActAs`

3

Check token scopes

Verify your token has the required scopes for the endpoint you're accessing

4

Test with simple endpoint

Start with a basic search request before testing complex operations

* * *

## Token Management Best Practices[​](#token-management-best-practices "Direct link to Token Management Best Practices")

### Security[​](#security "Direct link to Security")

-   **Use USER tokens** over GLOBAL tokens when possible
-   **Set expiration dates** for tokens used in temporary integrations
-   **Store tokens securely** - never commit tokens to version control
-   **Use environment variables** for token storage in applications
-   **Rotate tokens regularly** for long-lived integrations

### Development[​](#development "Direct link to Development")

-   **Create separate tokens** for development, staging, and production
-   **Use descriptive names** for tokens to track their purpose
-   **Test with minimal scopes** first, then expand as needed
-   **Plan token architecture** early - scopes cannot be changed after creation

### Monitoring[​](#monitoring "Direct link to Monitoring")

-   **Monitor token usage** through Glean's admin console
-   **Implement proper error handling** for authentication failures
-   **Log authentication events** for debugging and auditing
-   **Set up alerts** for token expiration

* * *

## Scope Planning Guide[​](#scope-planning-guide "Direct link to Scope Planning Guide")

Choose the right scopes for your application:

### Common Scope Combinations[​](#common-scope-combinations "Direct link to Common Scope Combinations")

| Use Case | Recommended Scopes | Notes |
| --- | --- | --- |
| **Search Application** | `SEARCH`, `DOCUMENTS` | Basic search functionality |
| **Chat Integration** | `CHAT`, `SEARCH` | Chat with search capabilities |
| **Analytics Dashboard** | `INSIGHTS`, `ACTIVITY` | Usage analytics and reporting |
| **Content Management** | `COLLECTIONS`, `PINS`, `SHORTCUTS` | Content organization features |
| **Admin Tool** | Multiple scopes as needed | Consider global token for multi-user access |

### Scope Selection Tips[​](#scope-selection-tips "Direct link to Scope Selection Tips")

-   **Start minimal** - Add only scopes you immediately need
-   **Review regularly** - Audit which scopes are actually used
-   **Document decisions** - Record why specific scopes were chosen
-   **Test thoroughly** - Verify all required functionality works

* * *

## Next Steps[​](#next-steps "Direct link to Next Steps")

[

### Client API Reference

Explore available Client API endpoints and their scope requirements







](/api/client-api)[

### Token Management

Manage your Glean tokens in the admin console







](https://app.glean.com/admin/platform/tokenManagement?tab=client)

* * *

## Migration from OAuth[​](#migration-from-oauth "Direct link to Migration from OAuth")

If you're considering switching from OAuth to Glean tokens:

### When to Use Glean Tokens Instead of OAuth[​](#when-to-use-glean-tokens-instead-of-oauth "Direct link to When to Use Glean Tokens Instead of OAuth")

-   **Need Indexing API access** - Indexing API operations require separately created Glean-issued credentials and do not accept OAuth
-   **Don't have identity provider** - Glean tokens work independently
-   **Require global permissions** - Global tokens can impersonate users
-   **Need custom expiration** - More control over token lifecycle

### Migration Considerations[​](#migration-considerations "Direct link to Migration Considerations")

-   **Scope mapping** - Determine which scopes match your OAuth usage
-   **Header changes** - Update authentication headers in your code
-   **Permission model** - Understand user vs global token implications
-   **Testing** - Thoroughly test with new token type

* * *

## Need Help?[​](#need-help "Direct link to Need Help?")

-   **Token Creation**: Contact your Glean administrator for token creation access
-   **Scope Questions**: Review [Client API Reference](/api/client-api) for endpoint requirements
-   **Technical Issues**: Check troubleshooting section above
-   **Community**: Join discussions at [community.glean.com](https://community.glean.com)
