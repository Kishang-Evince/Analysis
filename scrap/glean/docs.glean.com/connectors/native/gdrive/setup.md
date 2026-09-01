---
url: "https://docs.glean.com/connectors/native/gdrive/setup"
canonical: "https://docs.glean.com/connectors/native/gdrive/setup"
title: "Google Drive setup"
description: "Learn how to set up Google Drive"
fetched_at: "2026-09-01T13:29:28.213Z"
---
On this page

You're reading the **previous setup**[Connecting Google Drive for the first time? →](/connectors/native/gdrive/new-setup)

## Required permissions[​](#required-permissions "Direct link to Required permissions")

The user setting up this connector must be a [Google Super Admin](https://knowledge.workspace.google.com/admin/users/prebuilt-administrator-roles).

## Set up custom admin role (optional)[​](#set-up-custom-admin-role-optional "Direct link to Set up custom admin role (optional)")

To use the Google Drive API, the Glean service account needs to impersonate a user with certain privileges via [domain-wide delegation](https://knowledge.workspace.google.com/admin/apps/control-api-access-with-domain-wide-delegation). This can be the Super Admin performing this setup, or a custom admin role can be created with the required privileges and assigned to a different Google Workspace user (this can be an existing user, or a new user created for this purpose).

If you would like to use the Super Admin account, simply enter the email of the Super Admin into the **Directory admin email** field in Glean. Otherwise, to create a custom admin role:

1.  Go to the [Google admin console](https://admin.google.com/ac/roles). Click **Create new role**. Name the role **Glean**. Click **Continue**.
2.  Select the following privileges:
    -   **Organization Units → Read**
    -   **Users → Read**
    -   **Groups → Read**
    -   **Services → Drive and Docs → Settings**
    -   **Domain Settings**
    -   **Services → Data Classification → Manage Labels**
    -   **Reports**
    -   **Domain Management**
3.  Click **Continue**, and then **Create Role**.
4.  You should be redirected to a page where you can assign users to the **Glean** role you just created. Click **Assign members**, and add a Google Workspace user. This user needs to have logged in at least once to the Google Workspace and accepted the Terms of Service. Click **Assign role**.
5.  Enter the email of the user from the previous step into the **Directory admin email** field in Glean.

\*This is needed to read activity events on documents, which is used by Glean for ranking, and for recrawling when a document is modified. **This is needed to read in all domains configured in the Google Workspace.**

## Add API scopes[​](#add-api-scopes "Direct link to Add API scopes")

1.  Go to the [Domain-wide Delegation section in Google Admin Console](https://admin.google.com/ac/owl/domainwidedelegation). You’ll need to be signed in as an admin.
    
2.  Click **Add new** and paste the 21-digit **Unique ID** from Glean into the **Client ID** field. You can find this in the setup instructions in your Glean Admin Console.
    
    Note: if you have already connected Google Tools (Google Calendar and Gmail) with this same Client ID, you should instead click ‘Edit’ on the existing API client and then add the additional scopes below.
    
3.  Copy and paste the following into the **OAuth scopes (comma-delimited)** field and then click **Authorize**:
    
    `[https://www.googleapis.com/auth/admin.directory.group.readonly,https://www.googleapis.com/auth/admin.directory.user.readonly,https://www.googleapis.com/auth/drive.readonly,https://www.googleapis.com/auth/admin.reports.audit.readonly,https://www.googleapis.com/auth/admin.directory.domain.readonly,https://www.googleapis.com/auth/drive.admin.labels.readonly,https://www.googleapis.com/auth/calendar.readonly](https://www.googleapis.com/auth/admin.directory.group.readonly,https://www.googleapis.com/auth/admin.directory.user.readonly,https://www.googleapis.com/auth/drive.readonly,https://www.googleapis.com/auth/admin.reports.audit.readonly,https://www.googleapis.com/auth/admin.directory.domain.readonly,https://www.googleapis.com/auth/drive.admin.labels.readonly,https://www.googleapis.com/auth/calendar.readonly)`📋
    
    Notes:
    
    -   The scope `https://www.googleapis.com/auth/admin.directory.domain.readonly` is to optionally read configured domains
    -   The scope `https://www.googleapis.com/auth/drive.admin.labels.readonly` is for optional labels crawling
    -   The scope `https://www.googleapis.com/auth/calendar.readonly` is optional at this step, but necessary if you want to set up Google Calendar
    

## Add additional Google Drive domains[​](#add-additional-google-drive-domains "Direct link to Add additional Google Drive domains")

Glean will automatically crawl all users and documents in the domain belonging to the directory admin email. If there are users registered to other domains within the Google Workspace, those domains need to be specified. To include additional domains from your Google Workspace account, follow these steps:

### (Recommended) Fetch additional domains from your Google Workspace account[​](#recommended-fetch-additional-domains-from-your-google-workspace-account "Direct link to (Recommended) Fetch additional domains from your Google Workspace account")

1.  In the [admin role](https://admin.google.com/ac/roles) you created, add the following privileges:
    -   Domain Settings
    -   Domain Management
2.  In the [API client](https://admin.google.com/ac/owl/domainwidedelegation) you created, add the following to the **OAuth scopes (comma-delimited)** field:
    
    `[https://www.googleapis.com/auth/admin.directory.domain.readonly](https://www.googleapis.com/auth/admin.directory.domain.readonly)`📋
    
3.  Click **Retrieve domains** in Glean to fetch the domains in your Google Workspace account. You can then select the domains you want to include in Glean.

### (Alternative) Manually add additional domains[​](#alternative-manually-add-additional-domains "Direct link to (Alternative) Manually add additional domains")

Visit the [Manage Domains page in Google Admin Console](https://admin.google.com/ac/domains/manage) to see the full list of all of the domains within the Google Workspace instance. Enter the domains you want to include into the text box in Glean, separated by commas, without any additional spaces. For example: `example.com,example.org`.

## Configure target audience mapping[​](#configure-target-audience-mapping "Direct link to Configure target audience mapping")

If your Google Drive uses target audiences to restrict document access, you can provide a mapping from audience IDs to Google Groups. This allows Glean to properly understand which users should have access to documents with specific target audiences.

1.  Download the CSV template by clicking the download button in the Target audience mapping section.
2.  Check if target audiences are configured:
    -   Go to [**Google Admin Console → Apps → Google Workspace → Drive and Docs**](https://admin.google.com/ac/managedsettings/55656082996/sharing)
    -   Navigate to **Sharing settings** → **Target audience**
    -   If there are any target audiences configured, you will need to identify the IDs of the configured audiences. Remember these audience names as you'll need to look these up.
    -   If no target audiences are specified, you can skip the remainder of these steps.
3.  Find the target audience ID
    -   Go to [**Google Admin Console → Directory → Target Audiences**](https://admin.google.com/ac/list/targetaudience)
    -   For each of the target audiences referenced in the previous step, click on each audience to navigate to that specific audience page.
    -   Copy the audience ID. This should be the suffix of the audience page URL (e.g. `audience-id` from the page [https://admin.google.com/ac/targetaudiences/audience-id](https://admin.google.com/ac/targetaudiences/audience-id)).
4.  Fill out the CSV file with the following format:
    -   **Column 1**: Audience ID
    -   **Column 2**: Corresponding Google Group email address Example:
        
        `xyz123,[engineering@yourcompany.com](mailto:engineering@yourcompany.com) abc456,[marketing@yourcompany.com](mailto:marketing@yourcompany.com)`📋
        
5.  Upload the completed CSV file using the file upload field in Glean.

Finally, click **Save** in Glean. You're all set!
