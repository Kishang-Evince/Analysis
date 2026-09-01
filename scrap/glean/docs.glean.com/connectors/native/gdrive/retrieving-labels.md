---
url: "https://docs.glean.com/connectors/native/gdrive/retrieving-labels"
canonical: "https://docs.glean.com/connectors/native/gdrive/retrieving-labels"
title: "Retrieve label IDs from Google Drive"
description: "Supported label types for Inclusions and Exclusions, and how to retrieve them"
fetched_at: "2026-09-01T13:29:28.075Z"
---
On this page

Follow these steps to retrieve label IDs and configure label-based inclusions and exclusions for files in Google Drive.

## Requirements[​](#requirements "Direct link to Requirements")

-   Ensure that you've authorized the labels scope (`https://www.googleapis.com/auth/drive.admin.labels.readonly`) to your GDrive client id
-   Enable crawling labels on the Glean setup page for GDrive

## Content configuration[​](#content-configuration "Direct link to Content configuration")

### Exclusion (redlisting) options[​](#exclusion-redlisting-options "Direct link to Exclusion (redlisting) options")

We support redlisting for the following field types:

-   Badge list
-   Options list (both Single select and Multi select)

1.  Go to [Labels API reference](https://developers.google.com/workspace/drive/labels/reference/rest/v2/labels/list). You can use the APIs Explorer to get the list of labels in your organization. Use the following parameters:

-   view = LABEL\_VIEW\_FULL
-   Google Oauth 2.0 selected

2.  In the JSON output, find the choiceIds of the selectionOptions you want to redlist. These are the [choice objects](https://developers.google.com/workspace/drive/labels/reference/rest/v2/labels#Choice). Add these to the redlist lists in the Manage Data tab in the Glean admin setup page

### Inclusion (greenlisting) options[​](#inclusion-greenlisting-options "Direct link to Inclusion (greenlisting) options")

1.  Go to [Label Manager](https://admin.google.com/ac/dc/labels), or in the [Admin Console](https://admin.google.com/), navigate to Security > Access and data control > Label manager.
    
2.  Click a label of interest. It will open an URL and copy Label ID as highlighted below and copy it. `https://admin.google.com/ac/dc/labels/3gxNhIMk3oOaNkly22lhAazVeDj7aMapiSNNEbbFcb`
    
3.  Repeat step 2 for all the labels. Glean indexes all the labels greenlisted here and enable search over them. Glean treats all provided labels as public labels.
    
4.  Create a Comma separated list of labels to index and search over: `3gxNhIMk3oOaNkly22lhATsazVeDj7aMapiSNNEbbFcb,...`
