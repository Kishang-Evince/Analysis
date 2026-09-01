---
url: "https://docs.glean.com/tools/connector/github/create-or-update-file-content"
canonical: "https://docs.glean.com/tools/connector/github/create-or-update-file-content"
title: "Create or update file contents"
description: "Creates a new file or updates an existing file in a GitHub repository"
fetched_at: "2026-09-01T13:30:00.075Z"
---
On this page

*GitHub create or update file contents* tool to create a new file or update an existing file in a GitHub repository. This is a write tool that creates a commit with the file changes, including support for custom commit metadata such as author, committer, branch, and SHA validation.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Your admin must install and configure the GitHub connector, add the GitHub tools under **Admin Console → Platform → Tools**, and enable this tool.
    
-   A GitHub app must be installed on the relevant organization(s) and linked to the correct GitHub connector in the Glean admin console.
    
-   The GitHub app must have write permissions to repository contents.
    

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| Owner | String | Yes | The account owner of the repository (case-insensitive). |
| Repository | String | Yes | The name of the repository without the .git extension (case-insensitive). |
| File path | String | Yes | The full path to the file in the repository, including filename and extension. |
| Content | String | Yes | The new file content, Base64 encoded (e.g., "SGVsbG8gV29ybGQ=" for "Hello World"). |
| Commit message | String | Yes | The commit message for this file creation or update. |
| Branch | String | No | The branch name to create or update the file on (defaults to repository's default branch). |
| Author name | String | No | The commit author's name (requires author email if provided). |
| Author email | String | No | The commit author's email (requires author name if provided). |
| Author date | String | No | The author's timestamp in ISO 8601 format (defaults to committer date). |
| Committer name | String | No | The committer's name (requires committer email if provided). |
| Committer email | String | No | The committer's email (requires committer name if provided). |
| Committer date | String | No | The committer's timestamp in ISO 8601 format (defaults to current time). |
| SHA | String | No | The blob SHA of the file being replaced for validation (auto-fetched if omitted). |

**Note:** If author and committer details are omitted, GitHub uses the authenticated user's identity for both.

## Usage examples[​](#usage-examples "Direct link to Usage examples")

-   "Create a new README.md file in the 'myorg/myproject' repository with the content 'Welcome to My Project'."
    
-   "Update the config.json file in 'facebook/react' on the 'develop' branch with new configuration settings."
    
-   "Add a new API documentation file at 'docs/api/endpoints.md' in the 'microsoft/vscode' repository."
    

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Authentication or authorization failure

-   **Possible cause:** The GitHub connector is not fully set up, the GitHub app is not installed on the target organization, or the app is missing write permissions to repository contents.
-   **Fix:** Confirm that the GitHub connector is installed and authenticated, that the GitHub app is installed on the correct organization(s), and that it has write permissions to repository contents. If using a custom app, verify that the `contents:write` permission is enabled.

### Content not accepted or request rejected

-   **Possible cause:** The content parameter is not Base64 encoded, or the encoding is incorrect.
-   **Fix:** Ensure that the content you pass to the tool is properly Base64 encoded. If you are sending plain text, convert it to Base64 first. Verify the encoding by decoding it locally before sending to the tool.

### 403 error with OAuth App access restrictions

-   **Possible cause:** The GitHub organization has enabled OAuth App access restrictions, and the app used by this tool is not allowed to access the target repository.
-   **Fix:** Ask your GitHub organization admin to approve or allow the GitHub app used by this tool for the relevant repositories, then retry.

### Conflict or SHA mismatch error

-   **Possible cause:** The file has been modified since you last read it, or the SHA provided does not match the current file version.
-   **Fix:** Retrieve the latest SHA for the file using a file reading tool, then retry the update with the correct SHA. Alternatively, omit the SHA parameter to have it automatically fetched (but be aware this may overwrite concurrent changes).

### File path not found or invalid

-   **Possible cause:** The path parameter includes invalid characters, refers to a directory instead of a file, or the parent directories do not exist.
-   **Fix:** Verify the path is a valid file path (not a directory). GitHub automatically creates parent directories as needed, so you do not need to create them separately. Ensure the path does not start with a leading slash.

## FAQs[​](#faqs "Direct link to FAQs")

### What encoding should I use for the file content?

The **Content** parameter must be Base64 encoded. For example, "SGVsbG8gV29ybGQ=" decodes to "Hello World". Most programming languages have built-in Base64 encoding functions to help with this conversion.

### How does the SHA parameter affect updates?

When you include **SHA**, the tool validates that you are updating the expected file version, preventing accidental overwrites. If you omit **SHA**, it is automatically fetched before applying the update. For read-modify-write workflows, always use the SHA to avoid race conditions.

### Can I create files in subdirectories that do not exist yet?

Yes. GitHub automatically creates parent directories as needed when you specify a path like "docs/api/README.md". You do not need to create the directories separately.

### What happens if the file already exists?

The tool updates the existing file with the new content by creating a new commit. If you provide a SHA, it validates that the file version matches before updating. If the file does not exist, a new file is created instead.
