---
url: "https://docs.glean.com/connectors/native/gdrive/security/permissions"
canonical: "https://docs.glean.com/connectors/native/gdrive/security/permissions"
title: "Permissions"
description: "Information on the permissions required by the Glean connector to function"
fetched_at: "2026-09-01T13:29:27.931Z"
---
Simply stated: Glean provides the same search permissions enforcement as Google Drive with a small, notable exception for documents with public or domain access which are shared in a public collaboration channel.

![Glean permissions enforcement for Google Drive](/img/connectors/native/gdrive/security/how-does-glean-enforce-permissions-for-google-drive-files-1.png)

If a particular Google document (document, spreadsheet, slide, etc) is set to "General access: Anyone with the link" OR Shared to your specific company domain, the doc will **not be visible** to Glean search users ***except*** in the following scenarios:

1.  The user has already accessed the document
    
2.  For files shared to your specific company domain: The option for "**Can find in search results**" is toggled to "On"
    

Important

The **Searchable → Can find in search results** setting also affects agents and Glean Assistant in Slack. When an agent is published to a Slack channel with the `Visible to everyone` option - or when Glean Assistant uses [public mode](/administration/platform/embedded-integrations/slackbot/admin-guide/enable-public-mode) - only documents with **Can find in search results** enabled appear in responses. Documents set to `Must have link to access` aren't discoverable, even if shared to the company domain.

![Can find in search results setting](/img/connectors/native/gdrive/security/how-does-glean-enforce-permissions-for-google-drive-files-2.png)

3.  The user is a member of a Slack channel where a link to the file was shared. This is optional and can be disabled.
    
4.  A link to the file has been pinned, and the user is part of the pin audience
    
    ![Pinned file audience](/img/connectors/native/gdrive/security/how-does-glean-enforce-permissions-for-google-drive-files-3.png)
    
    If so, the user will be able to see the linked file in two ways:
    
    a. **As a pinned item:** If the user uses the exact query/keyword which matches that pin, they will see the pinned document in the search results, even if they have not visited the document before.
    
    ![Pinned item in search results](/img/connectors/native/gdrive/security/how-does-glean-enforce-permissions-for-google-drive-files-4.png)
    
    b. **As an (unpinned) search result:** If the query does not match exactly with the pin keyword and if the query contains a keyword that matches the document, the document will be visible in the search results as a normal (unpinned) result.
