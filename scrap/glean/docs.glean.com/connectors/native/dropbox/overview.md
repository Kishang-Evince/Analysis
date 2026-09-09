---
url: "https://docs.glean.com/connectors/native/dropbox/overview"
canonical: "https://docs.glean.com/connectors/native/dropbox/overview"
title: "Dropbox overview"
description: "Dropbox is a cloud-based file storage and collaboration platform."
fetched_at: "2026-09-01T13:29:25.794Z"
---
On this page

Dropbox is a cloud-based file storage and collaboration platform. The Dropbox connector for Glean allows organizations to index and search their Dropbox content-including team folders, private folders, and Dropbox Paper documents-while enforcing Dropbox permissions so users only see results they are authorized to access.

## Supported features[​](#supported-features "Direct link to Supported features")

The Dropbox connector supports indexing a broad range of content types and strictly enforces Dropbox’s underlying permission models to maintain data privacy and security for all users during search operations.

Glean understands and respects access and sharing permissions in your Dropbox account. For example, a user is given access to only one file in a private folder, that user will not be able to search for the other files in that folder in Glean.

All Dropbox data is fetched and stored to a secure Google Cloud Platform project. You retains control and ownership of your data, and the data cannot be directly accessed by Glean or any other third party.

## Supported objects[​](#supported-objects "Direct link to Supported objects")

-   Team folders and files
-   Shared folders and files
-   Private folders and files
-   Dropbox Paper documents

## Supported API endpoints[​](#supported-api-endpoints "Direct link to Supported API endpoints")

-   Dropbox Business API for team, user, and file information.
-   OAuth 2.0 authentication and token refresh flow.
-   Activity crawl through Dropbox’s activity endpoints to keep content and permissions synchronized.

Glean uses the [Dropbox API](https://www.dropbox.com/developers/documentation/http/overview) to fetch all data from the your Dropbox account. Glean requires certain viewing permissions in order for the full integration to work properly.

## Limitations[​](#limitations "Direct link to Limitations")

-   No configurations (greenlist/redlists) are supported for the updates team space file structure.
-   When a shared folder is selected in a Glean App, only nested normal folders are captured. Other shared folders will not be captured.

## Requirements[​](#requirements "Direct link to Requirements")

Deploying the Dropbox connector requires administrative privileges in Dropbox and initial configuration in both Dropbox and Glean.

-   Dropbox Business (team) account.
    
-   Glean deployment with admin console access.
    
-   HTTPS connectivity between Glean and Dropbox’s public APIs.
    
-   Dropbox admin account credentials to authorize during OAuth 2.0 flow.
    
-   Refresh token and access token generated and stored during setup.
    
-   The connector requires *Team member file access* permission to retrieve both team and individual files. During OAuth authorization, the following scopes are requested:
    
    -   View and edit Dropbox files and folders.
    -   View Dropbox sharing settings, group membership, and activity logs.
    -   View basic account and team information (usernames, emails, team membership, and more).

The admin role is required to approve these permissions during setup and maintain them for the connector’s ongoing function.
