---
url: "https://docs.glean.com/tools/connector/github/get-a-user"
canonical: "https://docs.glean.com/tools/connector/github/get-a-user"
title: "Get a user"
description: "Retrieves the public profile information for a specific GitHub user by username"
fetched_at: "2026-09-01T13:30:00.382Z"
---
On this page

*GitHub get a user* tool to retrieve the public profile for a specific GitHub user by username. This is a read-only tool that returns publicly available profile information for any GitHub account.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Your admin must install and configure the GitHub connector, add GitHub tools under **Admin Console** → **Platform** → Tools, and enable this tool.
    
-   A GitHub app must be installed on the relevant organization(s) and linked to the correct GitHub connector in the Glean admin console.
    

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| Username | String | Yes | The GitHub username whose public profile you want to retrieve. |

## Usage examples[​](#usage-examples "Direct link to Usage examples")

-   "Look up the GitHub profile for user 'abc' and show me their bio and location."
    
-   "What is the follower count for GitHub user 'abc'?"
    
-   "Show me the public profile information for 'octocat'."
    

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Authentication or authorization failure

-   **Possible cause:** The GitHub connector is not fully set up, the GitHub app is not installed on the target organization, or the app is missing required permissions.
-   **Fix:** Confirm that the GitHub connector is installed and authenticated, that the GitHub app is installed on the correct organization(s), and that it has the necessary repository and organization scopes. If using a custom app, verify that permissions such as contents, issues, pull requests, and commit-related scopes are enabled.

### User not found or 404 error

-   **Possible cause:** The username does not exist on GitHub, or there is a typo in the username.
-   **Fix:** Verify that the username is spelled correctly and exists on GitHub by visiting [https://github.com/username](https://github.com/username). GitHub usernames are case-insensitive but should be entered exactly as they appear.

### Limited or incomplete profile information returned

-   **Possible cause:** The user has a minimal GitHub profile or has not filled out certain fields.
-   **Fix:** This is expected behavior. The tool only returns publicly available information. If a user has not filled out their bio, company, location, or other fields, those fields will be empty or null in the response.

## FAQs[​](#faqs "Direct link to FAQs")

### What information does this tool return?

The tool returns the public profile for the specified GitHub user, including username, display name, bio, company, location, email (if public), website, avatar URL, public repository count, follower/following counts, and account creation date. Only publicly available information is returned.

### Can this tool retrieve private profile information?

No. This tool only retrieves publicly available profile information. Private details such as private email addresses or private repository counts are not accessible through this tool.

### Does this tool work for organization accounts?

Yes. You can use this tool to retrieve public profile information for both individual user accounts and organization accounts on GitHub.

### How is this different from Get the authenticated user?

*Get a user* retrieves the public profile for any GitHub user by username. **Get the authenticated user** retrieves the profile (including private details) for the currently authenticated user without requiring a username parameter.
