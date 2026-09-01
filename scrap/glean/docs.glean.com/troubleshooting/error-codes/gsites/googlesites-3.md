---
url: "https://docs.glean.com/troubleshooting/error-codes/gsites/googlesites-3"
canonical: "https://docs.glean.com/troubleshooting/error-codes/gsites/googlesites-3"
title: "GOOGLESITES_3"
description: "GOOGLESITES_3 Error Code"
fetched_at: "2026-09-01T13:30:22.495Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

The Google Vault export completed successfully but returned no Google Sites content. This typically occurs when the Vault Matter is not configured to include the users or shared drives that contain the Google Sites you want to crawl.

## Resolution[​](#resolution "Direct link to Resolution")

To resolve this issue, verify the following in your Google Vault Matter configuration:

1.  **Confirm connector set-up is correct:**
    
    -   Ensure the Google Sites connector is configured to use the correct Google Vault Matter ID and Google Workspace domain according to the instructions in the Google Sites page in admin console.
2.  **Reproduce the export:** Try to export the Google Sites from the Google Vault Matter again using the same settings as the previous export by doing the following:
    
    a. **Navigate to Google Vault:**
    
    -   Go to [Google Vault](https://vault.google.com/)
    -   Log in as the service account used for the Google Sites connector
    -   Go to **Matters** and select the Matter ID provided to Glean during connector set-up
    
    b. **Create Vault Search:**
    
    -   In the **Search** tab, choose **Drive** as the Service
    -   If you have Google Sites in Shared Drives, set the **Entity** to **Shared Drive**. Add the shared drive which contains the Google Sites to be crawled. If you have Google Sites in My Drives, set the **Entity** to **Account**. Add the user account which contains the Google Sites to be crawled.
    -   Under **Terms**, enter `type:site` and click **Search**.
    
    c. **Create Vault Export:**
    
    -   Create an export of the search query created above.
    -   Once the export is complete, check the status. Look for any warning or error symbols next to the export name
    
    d. **View Error File:**
    
    -   If there is an error, click on the export name to view the details.
    -   Open the error.csv file to view error messages.
    -   Forward the error message to the Glean Support team so they can continue to debug.
3.  **Verify Directory Admin has access to Drive and Docs settings:**
    
    -   Navigate to [Google Admin Console](https://admin.google.com/)
    -   Go to **Menu → Directory → Users**
    -   Search for the Directory Admin Email and navigate to the user's page
    -   Verify that the Directory Admin Email has access to the Drive and Docs settings.

For additional assistance, please contact Glean Support at [https://support.glean.com](https://support.glean.com)
