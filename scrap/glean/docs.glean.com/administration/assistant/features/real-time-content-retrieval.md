---
url: "https://docs.glean.com/administration/assistant/features/real-time-content-retrieval"
canonical: "https://docs.glean.com/administration/assistant/features/real-time-content-retrieval"
title: "Real-time content retrieval"
description: "for GDrive and Box"
fetched_at: "2026-09-01T13:29:00.454Z"
---
On this page

## Overview[​](#overview "Direct link to Overview")

Glean has introduced a new feature for Google Drive (GDrive) and Box. This feature allows users to access Google Drive and Box documents that are not already part of their Glean corpus directly through Glean. When a user pastes a Google Drive and Box link into Glean, Glean will fetch the document, provided the item is not in the corpus.

## Key Details for IT Admins[​](#key-details-for-it-admins "Direct link to Key Details for IT Admins")

-   **On-Demand Access**: Glean will fetch Google Drive and Box files on demand, allowing users to interact with these documents in Glean without adding them permanently to the Glean index. The content will only be available during the chat session, ensuring temporary access rather than permanent indexing.
    
-   **Permissions and Access Control**: Glean respects Google Drive and Box permissions through delegated access. This means that the user's own Google Drive and Box permissions are used to fetch a file. If a user doesn't have access to a file, it cannot be fetched, ensuring adherence to existing access controls.
    
-   **File Limitations**: There are certain limitations on the types of files that can be fetched. Unsupported file types include images, videos, files that are too large, or files that fail to crawl. This ensures that only compatible files are available for fetching.
    

## Content Restrictions[​](#content-restrictions "Direct link to Content Restrictions")

Currently, content restrictions such as greenlists or internal-only drives are not applied to fetched files. If the user has access to a file, it can be fetched. Therefore, if your organization requires strict content restriction policies, consider whether enabling this feature aligns with those needs.

## How to Enable[​](#how-to-enable "Direct link to How to Enable")

To enable GDrive and Box Federated Fetch, a Glean employee must flip a configuration flag for the customer deployment. Glean admins can request activation, and the feature will be available for all users. For more information, contact your Account Executive (AE) or [Glean support](https://support.glean.com/hc/en-us).
