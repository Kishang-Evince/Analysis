---
url: "https://docs.glean.com/tools/connector/google-drive-tools"
canonical: "https://docs.glean.com/tools/connector/google-drive-tools"
title: "Google Drive tools"
description: "Use Google Drive tools in Glean to find, create, copy, move, share, and manage files and folders directly from agents and workflows."
fetched_at: "2026-09-01T13:30:01.377Z"
---
On this page

With Google Drive tools, you can find, create, copy, move, share, and manage files and folders directly from Glean without switching to Google Drive.

Google Drive tools are part of the broader Google tool suite.

When building a workflow agent, the Google Drive tools are available within the **plan and execute** step. For agents with **auto mode**, the Google Drive tools are available for all steps. This allows the agent to dynamically determine when to create, move, or manage files and folders to fulfill a complex user request.

## Supported tools[​](#supported-tools "Direct link to Supported tools")

The Google Drive tools are enabled as a unified bundle.

The following tools are included:

### File and folder discovery[​](#file-and-folder-discovery "Direct link to File and folder discovery")

-   Find file: Searches for files and folders in Google Drive that match the request. Use this tool to locate a Drive item before using another Google Drive tool.
-   List Folder Children (V2): Lists the files and folders directly inside a specified Google Drive folder.

These tools are read-only. They return only items the authenticated user can access and do not create, edit, move, share, trash, or delete files or folders.

### File creation and management[​](#file-creation-and-management "Direct link to File creation and management")

-   Create file: Creates a new file in Google Drive.
-   Create folder: Creates a new folder in Google Drive.
-   Copy file: Creates a copy of an existing file in Google Drive, including its content and metadata.
-   Upload file from URL: Uploads a file to Google Drive from a publicly reachable URL.
-   Move file: Moves an existing file to a different folder in Google Drive.
-   Delete file: Permanently deletes a file from Google Drive.
-   Trash file: Moves a file to the trash in Google Drive, allowing recovery if needed.

### File information[​](#file-information "Direct link to File information")

-   Get file metadata: Retrieves metadata for a specific file in Google Drive, such as its name, size, type, and parent folder.

### Sharing and permissions[​](#sharing-and-permissions "Direct link to Sharing and permissions")

-   Create permission: Shares a file or folder by adding a permission for a user, group, or domain.
-   Update permission: Modifies an existing permission on a file or folder, such as changing the role from viewer to editor.

### Comments[​](#comments "Direct link to Comments")

-   Reply to comment: Adds a reply to an existing comment on a Google Drive file.

## Example use cases[​](#example-use-cases "Direct link to Example use cases")

Google Drive tools support several common workflow patterns:

-   File discovery: An agent can search for a file or list the contents of a folder before retrieving metadata or taking another action.
-   Automated file organization: An agent can create folder structures and move files into the appropriate locations based on project, team, or date.
-   Content sharing workflows: A workflow can create a file, populate it using other Google tools, and then share it with the right stakeholders by setting permissions.
-   File lifecycle management: An agent can trash outdated files or clean up temporary documents after a workflow completes.
-   Collaborative document setup: A workflow can copy a template file, move it to a project folder, and share it with team members in a single automated sequence.
-   Metadata-driven routing: An agent can retrieve file metadata to determine file type or ownership, then decide how to process or route the file in subsequent steps.

## Setup and configuration[​](#setup-and-configuration "Direct link to Setup and configuration")

### Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before configuring tools, ensure you have the following:

You must have administrative access to the Glean **admin console**.

-   Your organization must have an existing Google Drive connector configured in Glean.
-   You must have access to the Google Cloud Console to enable the required APIs and configure OAuth credentials.
-   The Google Drive API must be enabled in the Google Cloud project linked to your Google tools configuration.

### Administrator steps[​](#administrator-steps "Direct link to Administrator steps")

1.  Enable the tools: In Glean, go to **Admin console** → **Platform** → Tools and add **Google Drive extension tools** from the template library.
2.  Select the connector instance: Link the tools to your existing **Google Drive** connector instance.
3.  Configure authentication: Google Drive tools use OAuth user authentication.
    -   **Central**: Use the Glean-managed Google OAuth app when it is available in your environment.
    -   **Custom OAuth app**: If using a customer-managed app, register it in the Google Cloud Console, enable the Google Drive API, configure the OAuth consent screen, and enter the client credentials in Glean.
4.  Save the tools after authentication is complete.
5.  Enable the tools for users: Use **Edit settings** under **Enable Tools** to make the tools available to the relevant users and supported Glean surfaces.

note

Google Drive tools use OAuth user authentication exclusively. Domain-wide Delegation is not supported for Google Drive extension tools.

For detailed setup steps, see [Google tools setup](/administration/tools/setup-tools/google-tools-setup).

## FAQ[​](#faq "Direct link to FAQ")

### Do users need to connect their own Google account?

Yes.

Google Drive tools use OAuth user authentication, so each user must authenticate with their own Google account before using the tools. File and folder discovery results are limited to content that user can access.

### Can I enable only some Google Drive tools from the pack?

Yes. Admins can enable a subset of Google Drive tools based on what they want to make available.

### What Google APIs need to be enabled?

You must enable the **Google Drive API** in the Google Cloud project associated with your Google tools configuration.

### Can I use Domain-wide Delegation for Google Drive tools?

No.

Google Drive extension tools require OAuth user authentication. Domain-wide Delegation is not supported for these tools. Each user authenticates individually.

### Can the discovery tools modify files or folders?

No. *Find file* and *List Folder Children (V2)* are read-only. They locate or list Drive items but do not create, edit, move, share, trash, or delete them.

### Where are created files stored?

Files and folders created through Google Drive tools are stored in the signed-in user's Google Drive, in their default location (typically **My Drive**) unless a specific parent folder is provided.
