---
url: "https://docs.glean.com/troubleshooting/error-codes/gdrive/gdrive-2"
canonical: "https://docs.glean.com/troubleshooting/error-codes/gdrive/gdrive-2"
title: "GDRIVE-2"
description: "GDRIVE-2 Error Code"
fetched_at: "2026-09-01T13:30:15.133Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

We are unable to make an API request for a required API scope. The error message displayed in the console should display the specific scope we're unable to validate.

## Resolution[​](#resolution "Direct link to Resolution")

**Verify that the directory admin user is setup correctly**

-   In your Google Admin console (at [admin.google.com](http://admin.google.com/)),
    
-   Go to [**Menu → Directory → Users**](https://admin.google.com/ac/users).
    
-   Search for the directory admin email and navigate to the user’s page
    
-   Verify that the user has the right privileges
    
    -   Under **Admin roles and privileges → Privileges**, verify that the user has all the right privileges listed in [Set up custom admin role](/connectors/native/gdrive/setup#set-up-custom-admin-role-optional)
-   Verify that the user has logged in at least once in to Google Workspace and accepted the Terms of Service
    
-   Verify that the user has access to the GDrive app
    
    -   Under Apps, verify that **Drive and Docs** is ON
    
    ![](/img/troubleshooting/error-codes/gdrive-error2a.png)
    

**Verify that the Drive SDK is available to the user**

-   On the admin portal ([admin.google.com](http://admin.google.com/)), from the left sidebar click **Apps → Google Workspace → Drive and Docs**
    
-   Then click Features and Applications, and under Users search for the directory admin email
    
-   Verify that under Drive SDK, the setting Allow users to access Google Drive with the Drive SDK API is ON
    
    ![](/img/troubleshooting/error-codes/gdrive-error2b.png)
    

For more information on the specified API scope: [https://developers.google.com/drive/api/guides/api-specific-auth](https://developers.google.com/drive/api/guides/api-specific-auth)

If you are still having difficulty please reach out to us: [https://support.glean.com](https://support.glean.com)
