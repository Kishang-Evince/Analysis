---
url: "https://docs.glean.com/connectors/native/productboard/permissions"
canonical: "https://docs.glean.com/connectors/native/productboard/permissions"
title: "Productboard permissions and security"
description: "Review Productboard OAuth scopes, identity handling, and the connector's workspace-wide access model"
fetched_at: "2026-10-13T08:50:12.123Z"
---
On this page

The Productboard connector uses read-only OAuth scopes and one authorization from a Productboard maker with admin access (workspace admin). Review the access model before you connect a workspace because Productboard does not provide per-object permissions through this connector.

## Understand workspace-wide access[​](#understand-workspace-wide-access "Direct link to Understand workspace-wide access")

Workspace-wide access

Glean does not import per-object Productboard access control lists. Every document indexed by a Productboard connector instance receives workspace-wide access in Glean.

Users who can search the Productboard connector can find all products, components, features, subfeatures, and notes indexed from that connector instance. Productboard item-level visibility does not restrict individual Glean results.

Before broad rollout:

-   Confirm that the connected Productboard workspace contains content suitable for everyone who can search the connector
-   Use separate connector instances when you need to keep workspaces distinct
-   Test access with representative Glean users
-   Do not connect a workspace that contains restricted content unless workspace-wide access is acceptable

## OAuth scopes[​](#oauth-scopes "Direct link to OAuth scopes")

The customer-managed Productboard OAuth application requests these read-only scopes:

| Scope | Data available to Glean |
| --- | --- |
| `entities:read` | Roadmap entities and entity field schemas |
| `notes:read` | Notes and note field schemas |
| `members:read` | Active workspace members and their Productboard member IDs |
| `members:pii:read` | Member, owner, and creator email fields used to create member identity records |

The connector does not request write scopes. It reads content, metadata, relationships, members, and field definitions from Productboard API V2.

## Identity and owner handling[​](#identity-and-owner-handling "Direct link to Identity and owner handling")

The full member crawl indexes active Productboard members with resolvable email addresses as identity records. Glean skips members who are inactive, have a pending invitation, or do not have a usable email address.

Glean needs the `members:pii:read` scope because Productboard otherwise returns `[redacted]` for member email addresses. Glean matches document owners to identity records by Productboard member ID, not by email address. It still needs a usable email address to create each member identity record. If an email address is redacted, Glean skips that member and cannot match documents to that owner. Member records do not create per-document access restrictions.

## Credential handling[​](#credential-handling "Direct link to Credential handling")

-   Create a dedicated Productboard OAuth application for Glean
-   Limit the application to the four required read scopes
-   Store the client secret only in the Productboard connector configuration
-   Use a Productboard maker with admin access to authorize the connector
-   Reauthorize the connector after rotating its client ID or client secret
-   Remove or revoke the Productboard OAuth application when you retire the connector

Productboard issues access and refresh tokens during authorization. Glean stores tokens for the authorizing admin and uses the refresh token to maintain connector access.
