---
url: "https://developers.glean.com/api/indexing-api/permissions-overview"
canonical: "https://developers.glean.com/api/indexing-api/permissions-overview"
title: "Overview | Glean Developer"
description: "<ApiOverview"
fetched_at: "2026-09-01T13:22:57.098Z"
---
Manage user access controls and group memberships that determine content visibility in search results. These endpoints ensure users only see content they have permission to access.

## Use Cases

### Access Control Management

Define and update user permissions to ensure secure access to sensitive documents and maintain compliance with data governance policies.

### Group-Based Permissions

Manage group memberships and permissions to efficiently control access for teams, departments, or project-based groups.

### Dynamic Permission Updates

Automatically update user access as roles change, projects evolve, or organizational structures are modified.

### Compliance & Auditing

Maintain detailed permission records for compliance requirements and enable auditing of content access controls.

## API Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | [`/api/index/v1/indexuser`](/api/indexing-api/index-user) | [Index user](/api/indexing-api/index-user) |
| POST | [`/api/index/v1/bulkindexusers`](/api/indexing-api/bulk-index-users) | [Bulk index users](/api/indexing-api/bulk-index-users) |
| POST | [`/api/index/v1/indexgroup`](/api/indexing-api/index-group) | [Index group](/api/indexing-api/index-group) |
| POST | [`/api/index/v1/bulkindexgroups`](/api/indexing-api/bulk-index-groups) | [Bulk index groups](/api/indexing-api/bulk-index-groups) |
| POST | [`/api/index/v1/indexmembership`](/api/indexing-api/index-membership) | [Index membership](/api/indexing-api/index-membership) |
| POST | [`/api/index/v1/bulkindexmemberships`](/api/indexing-api/bulk-index-memberships-for-a-group) | [Bulk index memberships for a group](/api/indexing-api/bulk-index-memberships-for-a-group) |
| POST | [`/api/index/v1/uploadmemberships`](/api/indexing-api/schedules-the-processing-of-group-memberships) | [Schedules the processing of group memberships](/api/indexing-api/schedules-the-processing-of-group-memberships) |
| POST | [`/api/index/v1/deleteuser`](/api/indexing-api/delete-user) | [Delete user](/api/indexing-api/delete-user) |
| POST | [`/api/index/v1/deletegroup`](/api/indexing-api/delete-group) | [Delete group](/api/indexing-api/delete-group) |
| POST | [`/api/index/v1/deletemembership`](/api/indexing-api/delete-membership) | [Delete membership](/api/indexing-api/delete-membership) |
| POST | [`/api/index/v1/betausers`](/api/indexing-api/beta-users) | [Beta users](/api/indexing-api/beta-users) |
