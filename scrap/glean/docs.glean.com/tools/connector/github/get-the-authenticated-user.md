---
url: "https://docs.glean.com/tools/connector/github/get-the-authenticated-user"
canonical: "https://docs.glean.com/tools/connector/github/get-the-authenticated-user"
title: "Get the authenticated user"
description: "Retrieves profile information for the currently authenticated GitHub user"
fetched_at: "2026-09-01T13:30:00.609Z"
---
On this page

*GitHub get the authenticated user* tool to retrieve profile information for the currently authenticated GitHub user. This is a read-only tool that returns both public and private profile details based on the GitHub settings of the user.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Your admin must install and configure the GitHub connector, add GitHub tools under **Admin Console** → **Platform** → Tools, and enable this tool.
    
-   A GitHub app must be installed on the relevant organization(s) and linked to the correct GitHub connector in the Glean admin console.
    

## Supported parameters[​](#supported-parameters "Direct link to Supported parameters")

This tool does not accept any input parameters. It automatically retrieves profile information for the currently authenticated GitHub user.

## Usage examples[​](#usage-examples "Direct link to Usage examples")

-   "Show me my GitHub profile information."
    
-   "What is my GitHub username and email address?"
    
-   "How many public repositories do I have on GitHub?"
    

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Authentication or authorization failure

-   **Possible cause:** The GitHub connector is not fully set up, the GitHub app is not installed, or the OAuth token has expired.
-   **Fix:** Confirm that the GitHub connector is installed and authenticated. Have the user reconnect their GitHub account via OAuth in Glean. Verify that the GitHub app has the necessary permissions to read user profile information.

### Incomplete profile information returned

-   **Possible cause:** The user has set certain profile fields to private or has not filled them out in their GitHub account.
-   **Fix:** This is expected behavior. The tool can only return information that is available in the GitHub profile of the user. Users can update their profile visibility settings directly in GitHub if they want to share more information.

### Tool fails with 403 forbidden error

-   **Possible cause:** The GitHub app does not have permission to read user profile data, or the OAuth scopes are insufficient.
-   **Fix:** Verify that the GitHub app has the correct OAuth scopes enabled. The app needs user profile read permissions. Contact your admin to review the GitHub app configuration.

## FAQs[​](#faqs "Direct link to FAQs")

### Can this tool retrieve profile information for other users?

No. This tool only retrieves profile information for the currently authenticated user. To get information about other GitHub users, you would need to use a different tool that accepts a username parameter.

### Does this tool work with GitHub Enterprise?

This tool is designed for GitHub.com and GitHub Enterprise Cloud. Support for GitHub Enterprise Server depends on your GitHub connector configuration. Confirm with your admin if you are using GitHub Enterprise Server.

### Will this tool expose private email addresses?

The tool may return private email addresses if the authenticated user has made them available through their GitHub account settings. The tool respects GitHub's privacy settings and only returns information that the user has permission to access about their own account.
