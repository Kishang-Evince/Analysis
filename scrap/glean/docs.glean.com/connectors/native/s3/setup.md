---
url: "https://docs.glean.com/connectors/native/s3/setup"
canonical: "https://docs.glean.com/connectors/native/s3/setup"
title: "S3 setup"
description: "Index text-based objects from Amazon S3 in Glean using IAM roles, with setup for Glean on GCP or AWS and optional pre-signed URLs."
fetched_at: "2026-09-01T13:29:39.571Z"
---
On this page

This page explains how to configure IAM access and add the S3 connector in the Glean Admin console.

## Requirements[​](#requirements "Direct link to Requirements")

You need the following before you turn on the connector.

### Technical requirements[​](#technical-requirements "Direct link to Technical requirements")

-   A running Glean instance on **GCP** or **AWS**.
-   Access to the S3 buckets you want to index.
-   **GCP-hosted Glean:** Ability to create or use a Google Cloud service account that AWS IAM can trust (web identity federation).
-   **AWS-hosted Glean:** Ability to configure a cross-account IAM trust to Glean’s AWS principal, per your setup page.

### Credential requirements[​](#credential-requirements "Direct link to Credential requirements")

-   **IAM:** A role Glean can assume to read S3, configured per your deployment type (federated trust for GCP-hosted Glean, or cross-account trust for AWS-hosted Glean).
-   Credentials and keys must stay confidential and should grant **read-only** access to the buckets you intend to index unless your security team approves otherwise.

### Permission requirements[​](#permission-requirements "Direct link to Permission requirements")

-   The crawl role should include `AmazonS3ReadOnlyAccess` or a tighter custom policy with the same effect.
-   The role trust policy must allow Glean’s service account or AWS role to assume it, exactly as shown on the Glean **S3** connector setup page.
-   Multi-instance setups may need a separate IAM role and bucket allowlist per instance.
-   You need enough access in AWS to create IAM roles and policies.
-   **GCP-hosted Glean:** Create an IAM role that can read your buckets, trust the Glean GCP service account through web identity federation, and use the **audience** value from the Glean setup page.
-   **AWS-hosted Glean:** Create a dedicated IAM role for bucket access, apply the trust policy template from the Glean setup page, and attach `AmazonS3ReadOnlyAccess` (or equivalent read-only scope).
-   Keep the role ARN and bucket list ready for the Glean **Admin console**.

## Configuration and setup[​](#configuration-and-setup "Direct link to Configuration and setup")

Configuration is mostly in the Glean **Admin console** plus IAM in your AWS account.

### Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Glean **Admin console** access
-   AWS access to create IAM roles

### Authentication and fields[​](#authentication-and-fields "Direct link to Authentication and fields")

In the Glean **Admin console**, open the **S3** connector and provide:

-   **Display name**
-   **IAM role ARN**
-   **Bucket allowlist:** Comma-separated bucket names to crawl (only these buckets are indexed)

### Create an IAM role (GCP-hosted Glean)[​](#create-an-iam-role-gcp-hosted-glean "Direct link to Create an IAM role (GCP-hosted Glean)")

1.  In AWS, open **IAM**.
2.  Choose **Roles** → **Create role**.
3.  For trusted entity, choose **Web identity**.
4.  Choose **Google** as the identity provider and enter the **Audience** value from the Glean **S3** connector setup page.
5.  Click **Next**.
6.  Attach the `AmazonS3ReadOnlyAccess` managed policy (or your approved read-only policy), then click **Next**.
7.  Enter a role name and description, then click **Create role**.

### Create an IAM role (AWS-hosted Glean)[​](#create-an-iam-role-aws-hosted-glean "Direct link to Create an IAM role (AWS-hosted Glean)")

1.  In AWS, open **IAM**.
2.  Choose **Roles** → **Create role**.
3.  Use the **trusted entity type** and trust policy from the Glean **S3** connector setup page for AWS-hosted Glean (typically a cross-account trust to Glean’s AWS account-not the Google web identity flow).
4.  Attach `AmazonS3ReadOnlyAccess` (or your approved read-only policy).
5.  Name the role, create it, then open the role and copy **Role ARN**.

### Connect Glean to S3[​](#connect-glean-to-s3 "Direct link to Connect Glean to S3")

1.  In the Glean **Admin console**, go to **Connectors** → **S3** → **Add connector**.
2.  Enter **Display name**, **IAM role ARN**, and the **bucket allowlist** (for example `bucket1,bucket2,bucket3`).
3.  Save and test the connection. Fix IAM or trust issues if the test fails.
4.  Finish setup. The first full crawl runs on the connector schedule.
5.  To change scope later, edit the bucket allowlist and run another crawl.

### Crawl configuration[​](#crawl-configuration "Direct link to Crawl configuration")

-   **Bucket allowlist:** Only buckets you list are crawled.
