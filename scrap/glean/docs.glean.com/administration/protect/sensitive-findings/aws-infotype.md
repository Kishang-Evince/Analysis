---
url: "https://docs.glean.com/administration/protect/sensitive-findings/aws-infotype"
canonical: "https://docs.glean.com/administration/protect/sensitive-findings/aws-infotype"
title: "Configure AWS for Infotype Scanning"
description: "Follow these steps to configure AWS for infotype scanning."
fetched_at: "2026-09-01T13:29:14.000Z"
---
On this page

Glean Protect+

Glean sensitive findings rely on [Google’s DLP API](https://cloud.google.com/sensitive-data-protection/docs/reference/rest) for data classification for info type scanning. If you’re only using regex and term detection, you can skip these instructions.

Glean customers deployed on AWS must create or use an existing GCP account to run infotype scanning. You can use the Glean console to add a GCP DLP service account key JSON, which is then securely stored within your AWS deployment and is used to make API calls.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   You must be running Glean on AWS
-   You must create or have an existing GCP account and project
-   Your GCP project must link to a billing account

## Configure your GCP Project and Connect the DLP Service to Glean[​](#configure-your-gcp-project-and-connect-the-dlp-service-to-glean "Direct link to Configure your GCP Project and Connect the DLP Service to Glean")

note

You must have Sensitive Content Moderator role in Glean to upload the service account key JSON.

1.  From your GCP project, enable the DLP API using the link:  
    ​[https://console.cloud.google.com/apis/api/dlp.googleapis.com/overview?project=\[project\_ID](https://console.cloud.google.com/apis/api/dlp.googleapis.com/overview?project=%5Bproject_ID)\]  
    Replace the \[project\_ID\] with your GCP project ID.
2.  From the [service accounts page](https://console.cloud.google.com/iam-admin/serviceaccounts), create a service account by selecting the project, then selecting create service account.
3.  From the [IAM](https://console.cloud.google.com/iam-admin/iam) page, grant the [DLP administrator IAM role](https://cloud.google.com/sensitive-data-protection/docs/iam-roles) access to the service account.
4.  From the [service accounts](https://console.cloud.google.com/iam-admin/serviceaccounts) page, generate a service account key JSON and download it to your computer.
5.  Upload the service account key JSON you downloaded in the step above to Glean's [Sensitive content reporting](https://app.glean.com/admin/sensitivecontentreports) page.
