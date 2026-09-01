---
url: "https://docs.glean.com/connectors/native/box/api"
canonical: "https://docs.glean.com/connectors/native/box/api"
title: "API endpoints"
description: "Glean crawls and indexes Box content using the Box API endpoints below. All calls are read-only GET requests, except the OAuth token refresh."
fetched_at: "2026-09-01T13:29:23.381Z"
---
On this page

Glean crawls and indexes Box content using the Box API endpoints below. All calls are read-only `GET` requests, except the OAuth token refresh.

## Authentication[​](#authentication "Direct link to Authentication")

| Endpoint | Purpose | Reference |
| --- | --- | --- |
| `POST /oauth2/token` | Refresh the access token using the client ID, secret, and refresh token. | [Refresh access token](https://developer.box.com/reference/post-oauth2-token--refresh/) |

## Identity[​](#identity "Direct link to Identity")

| Endpoint | Purpose | Reference |
| --- | --- | --- |
| `GET /2.0/users` | List enterprise users to determine which users and content to index. | [List enterprise users](https://developer.box.com/reference/get-users/) |
| `GET /2.0/users/me` | Get the authenticated service account's own user information. | [Get current user](https://developer.box.com/reference/get-users-me/) |
| `GET /2.0/groups` | List enterprise groups, used for permission modeling. | [List groups for enterprise](https://developer.box.com/reference/get-groups/) |
| `GET /2.0/groups/{group_id}/memberships` | List the members of a group, used for permission modeling. | [List members of group](https://developer.box.com/reference/get-groups-id-memberships/) |

## Content[​](#content "Direct link to Content")

| Endpoint | Purpose | Reference |
| --- | --- | --- |
| `GET /2.0/folders/{folder_id}` | Get folder metadata. | [Get folder information](https://developer.box.com/reference/get-folders-id/) |
| `GET /2.0/folders/{folder_id}/items` | List the items within a folder for indexing. | [List items in folder](https://developer.box.com/reference/get-folders-id-items/) |
| `GET /2.0/folders/{folder_id}/collaborations` | List a folder's collaborations, used for permission modeling. | [List folder collaborations](https://developer.box.com/reference/get-folders-id-collaborations/) |
| `GET /2.0/files/{file_id}` | Get file metadata. | [Get file information](https://developer.box.com/reference/get-files-id/) |
| `GET /2.0/files/{file_id}/content` | Download file content for indexing. | [Download file](https://developer.box.com/reference/get-files-id-content/) |
| `GET /2.0/files/{file_id}/collaborations` | List a file's collaborations, used for permission modeling. | [List file collaborations](https://developer.box.com/reference/get-files-id-collaborations/) |
| `GET /2.0/search` | Locate content and folders by query. | [Search for content](https://developer.box.com/reference/get-search/) |
| `GET /2.0/shared_items` | Resolve a shared item from its shared link. | [Get shared item](https://developer.box.com/reference/get-shared-items/) |

## Activity[​](#activity "Direct link to Activity")

| Endpoint | Purpose | Reference |
| --- | --- | --- |
| `GET /2.0/events` | Fetch enterprise and user events to keep content and permissions fresh. | [List enterprise events](https://developer.box.com/reference/get-events/) |
