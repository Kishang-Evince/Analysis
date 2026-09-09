---
url: "https://developers.glean.com/libraries/web-sdk/guides/sharepoint"
canonical: "https://developers.glean.com/libraries/web-sdk/guides/sharepoint"
title: "SharePoint | Glean Developer"
description: "Guide for embedding Glean Search or Chat into SharePoint sites using SharePoint Framework (SPFx)"
fetched_at: "2026-09-01T13:23:06.022Z"
---
On this page

## Overview[​](#overview "Direct link to Overview")

This guide provides step-by-step instructions for integrating Glean Search and Chat functionality into SharePoint sites using the SharePoint Framework (SPFx).

### Glean Search

Embed Glean's search functionality directly into SharePoint pages

### Glean Chat

Add Glean's conversational AI interface to SharePoint sites

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before beginning the integration, ensure your SharePoint environment meets the following requirements:

### SharePoint Version Compatibility[​](#sharepoint-version-compatibility "Direct link to SharePoint Version Compatibility")

-   SharePoint Online
-   SharePoint On-Premises

SPFx is fully supported in SharePoint Online (Microsoft 365). This is the recommended platform for Glean integration.

SPFx requires:

-   **SharePoint Server 2016**: Feature Pack 2 or later
-   **SharePoint Server 2019**: Fully supported
-   **SharePoint Subscription Edition**: Fully supported

### Required Permissions[​](#required-permissions "Direct link to Required Permissions")

You'll need the following permissions to deploy SPFx solutions:

-   SharePoint Administrator role, or
-   Site Collection Administrator rights for the target sites

### App Catalog Verification[​](#app-catalog-verification "Direct link to App Catalog Verification")

1

Check App Catalog Availability

Navigate to your App Catalog: `https://<tenant-name>.sharepoint.com/sites/appcatalog/_layouts/15/tenantAppCatalog.aspx/manageApps`

If you encounter a 404 error, the App Catalog needs to be created.

2

Create App Catalog (if needed)

1.  Go to **SharePoint Admin Center**: `https://admin.microsoft.com`
2.  Navigate to **More features** > **Apps** > **App Catalog**
3.  Follow the setup instructions to create a new App Catalog site

3

Verify Modern Pages

Ensure your SharePoint sites use the modern experience. SPFx web parts are not compatible with classic SharePoint pages.

## Development Environment Setup[​](#development-environment-setup "Direct link to Development Environment Setup")

1

Install Node.js

The Glean example web parts target SPFx 1.19–1.20, which require Node.js 18.x. Newer SPFx versions support newer Node.js releases - check Microsoft's [SPFx compatibility matrix](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/compatibility) for the version your project uses.

```
# Check current versionnode -v# Install Node.js 18.x if needed# Visit https://nodejs.org/en/download/package-manager for installation instructions
```

2

Install Development Tools

Install the required global packages:

```
# Install Yeoman, SPFx Yeoman Generator, and Gulp CLInpm install gulp-cli yo @microsoft/generator-sharepoint -g
```

3

Set Up Code Editor

Install Visual Studio Code or your preferred code editor for SPFx development.

## Creating the SPFx Web Part[​](#creating-the-spfx-web-part "Direct link to Creating the SPFx Web Part")

### Generate New SPFx Project[​](#generate-new-spfx-project "Direct link to Generate New SPFx Project")

1

Create Project Directory

```
mkdir GleanSearchWebPartcd GleanSearchWebPart
```

2

Generate SPFx Web Part

Run the Yeoman generator:

```
yo @microsoft/sharepoint
```

Configure the project with these settings:

-   **Solution Name**: `GleanSearchWebPart`
-   **Target for deployment**: SharePoint Online only
-   **Web Part Name**: `GleanSearch`
-   **Framework**: React

3

Download Glean Web Part Code

Replace the generated code with the Glean-specific implementation:

-   **Search Web Part**: Download from [web-sdk-embed-examples/sharepoint-webpart-search](https://github.com/gleanwork/web-sdk-embed-examples/tree/main/sharepoint-webpart-search)
-   **Chat Web Part**: Download from [web-sdk-embed-examples/sharepoint-webpart-chat](https://github.com/gleanwork/web-sdk-embed-examples/tree/main/sharepoint-webpart-chat)

### Customize for Your Environment[​](#customize-for-your-environment "Direct link to Customize for Your Environment")

1

Update Search Element Selector

The web part uses `document.querySelector('input[placeholder*="Search"]')` to locate SharePoint's search input.

If your SharePoint site uses different search box styling or placeholder text, modify this selector in the web part code.

2

Configure Glean Settings

Update the Glean configuration in the web part properties:

-   Backend URL
-   Authentication settings
-   Application ID (for Chat web parts)

3

Test in Development

Test the web part in a non-production SharePoint environment before deploying to live sites.

## Build and Package[​](#build-and-package "Direct link to Build and Package")

1

Build the Project

```
gulp build
```

2

Create Production Bundle

```
gulp bundle --ship
```

3

Package the Solution

```
gulp package-solution --ship
```

This creates a `.sppkg` file in the `sharepoint/solution` folder.

## Deploy to SharePoint[​](#deploy-to-sharepoint "Direct link to Deploy to SharePoint")

1

Upload to App Catalog

1.  Navigate to your SharePoint App Catalog
2.  Upload the generated `.sppkg` file
3.  Click **Deploy** when prompted

2

Enable App

Choose one of these deployment options:

-   All Sites (Recommended)
-   Manual Addition

Select **Enable this app and add it to all sites** to make the web part available across your tenant.

Select **Only enable this app** to manually add the web part to specific sites.

3

Confirm Deployment

Wait for the confirmation message indicating successful deployment.

## Add Web Part to SharePoint Pages[​](#add-web-part-to-sharepoint-pages "Direct link to Add Web Part to SharePoint Pages")

1

Navigate to Target Page

Go to the SharePoint site where you want to add Glean functionality.

2

Edit the Page

Click the **Edit** button to modify the page.

3

Add the Web Part

1.  Click the **+** icon to add a new web part
2.  Search for your Glean web part by name
3.  Select and add it to the page

note

The web part can be added to any page section. It will activate when users interact with the SharePoint search box, regardless of where the web part is positioned.

4

Configure Properties

Configure any web part properties specific to your Glean deployment.

5

Save and Publish

Save and **Republish** the page to make the Glean functionality live.

## Testing the Integration[​](#testing-the-integration "Direct link to Testing the Integration")

1

Verify Search Functionality

Test that Glean Search activates when users interact with the SharePoint search box.

2

Check API Connectivity

Ensure that API calls to Glean services are functioning correctly.

3

Validate User Experience

Confirm that the search interface and results display properly within the SharePoint environment.

## Chat Integration[​](#chat-integration "Direct link to Chat Integration")

To implement Glean Chat instead of or in addition to Search, follow the same process using the Chat web part code. The main differences are:

-   Use the chat-specific web part code from [web-sdk-embed-examples/sharepoint-webpart-chat](https://github.com/gleanwork/web-sdk-embed-examples/tree/main/sharepoint-webpart-chat)
-   Configure the Application ID for your specific AI application
-   Customize the chat trigger element selector as needed

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Common Issues[​](#common-issues "Direct link to Common Issues")

**App Catalog Not Found (404 Error)** If you encounter a 404 error when accessing the App Catalog, it may not be created yet. Follow the App Catalog setup steps in the Prerequisites section.

**Web Part Not Appearing**

-   Verify the web part is properly deployed to the App Catalog
-   Confirm the page is using the modern SharePoint experience
-   Check that you have sufficient permissions to add web parts

**Search Box Not Detected** If the Glean functionality doesn't activate:

-   Inspect your SharePoint page to identify the correct search box selector
-   Update the `querySelector` in the web part code to match your page structure
-   Test the selector in the browser console before rebuilding

**Glean script blocked due to Content Security Policy**

Find your Glean Web app URL in the [admin console](https://app.glean.com/admin/about-glean) and add it as a Trusted Script Source in SharePoint Online.

More information is available in this [Microsoft guide](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/content-securty-policy-trusted-script-sources)

### Getting Help[​](#getting-help "Direct link to Getting Help")

For additional support with SharePoint integration:

-   Review the [SharePoint Framework documentation](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/sharepoint-framework-overview)
-   Check the [SPFx Yeoman Generator guide](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/yeoman-generator-for-spfx-intro)
-   Consult SharePoint admin resources for App Catalog management

## Technical Reference[​](#technical-reference "Direct link to Technical Reference")

### Code Structure[​](#code-structure "Direct link to Code Structure")

The Glean web parts extend Microsoft's `BaseClientSideWebPart` class, which provides:

-   Lifecycle methods (`onInit`, `render`, `onDispose`)
-   Property management for user-defined settings
-   Context access for SharePoint resources

### Key Components[​](#key-components "Direct link to Key Components")

-   **Web Part Implementation**: Extends `BaseClientSideWebPart` with Glean-specific functionality
-   **Element Detection**: Uses `document.querySelector` to locate SharePoint search elements
-   **Dynamic Loading**: Loads Glean SDK from `https://app.glean.com/embedded-search-latest.min.js`
-   **Search Integration**: Attaches Glean's EmbeddedSearch object to SharePoint's search interface

### Useful Resources[​](#useful-resources "Direct link to Useful Resources")

-   [SharePoint Framework Overview](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/sharepoint-framework-overview)
-   [SharePoint App Catalog Management](https://learn.microsoft.com/en-us/sharepoint/use-app-catalog)
-   [SPFx Development Environment Setup](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/yeoman-generator-for-spfx-intro)
