---
url: "https://docs.glean.com/administration/assistant/configuration/live-or-federated-fetch"
canonical: "https://docs.glean.com/administration/assistant/configuration/live-or-federated-fetch"
title: "Live or federated fetch"
description: "Allow users to access and interact with linked files in Glean without indexing them."
fetched_at: "2026-09-01T13:28:59.625Z"
---
On this page

Your users can access Google Drive, OneDrive, and Box documents that are not already part of your Glean corpus directly through Glean. When users paste a Google Drive, OneDrive, or Box link into Glean, Glean will fetch the document, provided the item is not in the corpus.

## Key details for IT admins across Google Drive, OneDrive, and Box[​](#key-details-for-it-admins-across-google-drive-onedrive-and-box "Direct link to Key details for IT admins across Google Drive, OneDrive, and Box")

-   **On-demand access**: Glean will fetch Google Drive, OneDrive, and Box files on demand, allowing users to interact with these documents in Glean without adding them permanently to the Glean index. The content is only available while the chat session is present in history, ensuring temporary access rather than permanent indexing. This is similar to how Glean file upload feature works.
-   **Permissions and access control**: Glean respects Google Drive, OneDrive, and Box permissions through delegated access. This means that the user's own Google Drive, OneDrive, and Box permissions are used to fetch a file. If a user doesn't have access to a file, it cannot be fetched, ensuring adherence to existing access controls.
-   **File limitations**: There are certain limitations on the types of files that can be fetched. Unsupported file types include images, videos, files that are too large, or files that fail to crawl. This ensures that only compatible files are available for fetching.

## Content restrictions[​](#content-restrictions "Direct link to Content restrictions")

Currently, content restrictions such as allowlists or internal-only drives are not applied to fetched files. If the user has access to a file, it can be fetched. Therefore, if your organization requires strict content restriction policies, consider whether enabling this feature aligns with those needs.

## How to enable[​](#how-to-enable "Direct link to How to enable")

To enable Google Drive, OneDrive, and Box live fetch, the admin can flip a toggle in Glean Workspace. For Google Drive and Box, end users don’t need to authenticate.

note

For setting this up in SharePoint or OneDrive, follow the instructions for [SharePoint real-time access](/connectors/native/sharepoint/real-time-access) or [OneDrive real-time access](/connectors/native/onedrive/real-time-access).
