---
url: "https://docs.glean.com/administration/agent-identity/aws-cloudwatch"
canonical: "https://docs.glean.com/administration/agent-identity/aws-cloudwatch"
title: "Set up AWS CloudWatch Logs service credential"
description: "Configure cross-account IAM role assumption with Workload Identity Federation so Glean agents can read AWS CloudWatch Logs."
fetched_at: "2026-09-01T13:28:58.388Z"
---
On this page

An Amazon Web Services (AWS) CloudWatch Logs service credential allows Glean to read CloudWatch logs using a cross-account Identity and Access Management (IAM) role. For Google Cloud Platform (GCP)-hosted deployments, Glean uses Workload Identity Federation (WIF) to exchange a short lived GCP identity token for temporary AWS credentials through `sts:AssumeRoleWithWebIdentity`. This approach ensures Glean never requires long lived AWS IAM access keys.

-   Authentication: Workload Identity Federation with `sts:AssumeRoleWithWebIdentity`
-   Scope: The AWS account, region, and log groups allowed by the IAM role
-   Access: Read-only CloudWatch Logs access

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   An AWS account with CloudWatch Logs data that the agent should read.
-   A GCP project where you can create a service account.
-   Permission to create IAM roles and policies in AWS.
-   Permission to create and configure service accounts in GCP.
-   A Glean administrator who can create service credentials.
-   The *AWS CloudWatch Logs* template enabled for your deployment.

## Step 1: Create a dedicated GCP service account[​](#step-1-create-a-dedicated-gcp-service-account "Direct link to Step 1: Create a dedicated GCP service account")

Create a service account dedicated to the agent. This service account is the identity that federates into AWS.

Use a descriptive name, such as `cloudwatch-reader`, in your Glean GCP project:

```
cloudwatch-reader@<GLEAN_PROJECT_ID>.iam.gserviceaccount.com
```

To create a service account, refer to the [Google Cloud documentation](https://cloud.google.com/iam/docs/service-accounts-create).

## Step 2: Grant impersonation access on the service account[​](#step-2-grant-impersonation-access-on-the-service-account "Direct link to Step 2: Grant impersonation access on the service account")

The Glean query endpoint must impersonate the dedicated service account to mint the GCP identity token used in the AWS exchange.

Grant the Glean query endpoint service account the *Service Account Token Creator* role (`roles/iam.serviceAccountTokenCreator`) on the dedicated service account:

-   **Principal:** `query-endpoint@<GLEAN_PROJECT_ID>.iam.gserviceaccount.com`
-   **Role:** Service Account Token Creator
-   **Resource:** The dedicated service account from Step 1

-   Using the CLI
-   Using the GCP Console

```
TARGET_SA="cloudwatch-reader@<GLEAN_PROJECT_ID>.iam.gserviceaccount.com"QE_SA="query-endpoint@<GLEAN_PROJECT_ID>.iam.gserviceaccount.com"gcloud iam service-accounts add-iam-policy-binding "$TARGET_SA" \  --member="serviceAccount:$QE_SA" \  --role="roles/iam.serviceAccountTokenCreator"
```

1.  Open the Google Cloud Console and navigate to **[IAM & Admin > Service Accounts](https://console.cloud.google.com/iam-admin/serviceaccounts)** in your Glean GCP project.
2.  Select the dedicated service account from Step 1.
3.  In the permissions panel, click **Grant Access**.
4.  In **New principals**, enter the full email address of the query endpoint service account.
5.  Select **Service Account Token Creator**.
6.  Click **Save**.

## Step 3: Get the service account OAuth 2.0 Client ID[​](#step-3-get-the-service-account-oauth-20-client-id "Direct link to Step 3: Get the service account OAuth 2.0 Client ID")

AWS uses the numeric OAuth 2.0 Client ID in the role trust policy `aud` condition to verify that the incoming identity token was issued for the correct GCP service account.

-   Using the CLI
-   Using the GCP Console

```
gcloud iam service-accounts describe \  cloudwatch-reader@<GLEAN_PROJECT_ID>.iam.gserviceaccount.com \  --project="<GLEAN_PROJECT_ID>"
```

1.  Open the Google Cloud Console and navigate to **[IAM & Admin > Service Accounts](https://console.cloud.google.com/iam-admin/serviceaccounts)** in your Glean GCP project.
2.  Select the dedicated service account from Step 1.
3.  Copy the numeric **OAuth 2.0 Client ID** from the service account details.

Copy and save this value for use in Step 4.

## Step 4: Create an AWS IAM role that trusts the GCP service account[​](#step-4-create-an-aws-iam-role-that-trusts-the-gcp-service-account "Direct link to Step 4: Create an AWS IAM role that trusts the GCP service account")

Create an IAM role in the AWS account that contains the CloudWatch Logs data. Configure the role to trust Google's web identity provider and the OAuth 2.0 Client ID from Step 3.

The trust policy has the following structure:

```
{  "Version": "2012-10-17",  "Statement": [    {      "Effect": "Allow",      "Principal": {        "Federated": "accounts.google.com"      },      "Action": "sts:AssumeRoleWithWebIdentity",      "Condition": {        "StringEquals": {          "accounts.google.com:aud": "<OAUTH2_CLIENT_ID>"        }      }    }  ]}
```

Replace `<OAUTH2_CLIENT_ID>` with the numeric value from Step 3.

For more detail, see the AWS documentation on [creating a role for web identity federation](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-idp.html).

Copy the role Amazon Resource Name (ARN)-you enter it when you create the credential in Glean:

```
arn:aws:iam::<AWS_ACCOUNT_ID>:role/glean-cloudwatch-reader
```

## Step 5: Attach CloudWatch Logs read permissions to the role[​](#step-5-attach-cloudwatch-logs-read-permissions-to-the-role "Direct link to Step 5: Attach CloudWatch Logs read permissions to the role")

Attach read permissions for the CloudWatch Logs data that the agent needs.

You can use the AWS managed policy `CloudWatchLogsReadOnlyAccess`, or create a custom policy scoped to specific log groups. See the [CloudWatch Logs permissions reference](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/permissions-reference-cwl.html) for the complete list of actions.

tip

Use the narrowest permissions and log-group scope that supports the agent's use case.

## Step 6: Create the service credential in Glean[​](#step-6-create-the-service-credential-in-glean "Direct link to Step 6: Create the service credential in Glean")

1.  In Glean, go to **Admin console → Platform → Tools → Service credentials**.
2.  Click **Add**.
3.  Select **AWS CloudWatch Logs** under **Service credentials**.
4.  Fill in these fields:
    -   **Credential name:** A human-readable name for the credential, such as `CloudWatch Logs - Production`.
    -   **Description:** A short description of what this credential is used for.
    -   **IAM role ARN:** The full ARN of the AWS IAM role from Step 4.
    -   **AWS region:** The AWS region that contains the CloudWatch Logs data, such as `us-east-1`.
    -   **Service account email:** The email address of the dedicated GCP service account from Step 1.
    -   **Audience:** The users or groups that can attach this credential to agents.
5.  Click **Save**.

## Step 7: Attach the credential to an agent[​](#step-7-attach-the-credential-to-an-agent "Direct link to Step 7: Attach the credential to an agent")

Agent builders can attach the credential from the **Service credentials** tab in the agent builder.

1.  Go to **Agents** in Glean.
2.  Select the agent to which you want to add the service credential.
3.  In the **Tools** tab, select **Service credentials** and select the AWS CloudWatch Logs credential you created.

After you attach the credential, Glean handles the identity-token exchange and AWS authentication for requests made by the agent.

## Verify it works[​](#verify-it-works "Direct link to Verify it works")

Success

Ask the agent to read recent log data, for example: "Show me the most recent errors from `<log-group>` in `<region>`." If the agent returns CloudWatch Logs data from the configured account and region, the credential is working.

## What the agent can do[​](#what-the-agent-can-do "Direct link to What the agent can do")

With an AWS CloudWatch Logs credential attached, the agent can read CloudWatch Logs data allowed by the IAM role, including the log groups and actions covered by the role's policies.

The agent cannot access log groups outside the role's permissions or perform actions not granted by the attached policies.

## Security and operational notes[​](#security-and-operational-notes "Direct link to Security and operational notes")

-   No long lived AWS keys: Glean uses Workload Identity Federation and temporary AWS credentials, there is no static access key to store or leak.
-   Server-side authentication: The agent runtime never receives the GCP identity token, AWS credentials, or IAM role trust configuration.
-   Least privilege: Scope the IAM role to the regions, log groups, and read actions the agent needs.
-   Dedicated identity: Use a dedicated GCP service account and AWS IAM role instead of a personal identity.
-   Revocation: To cut off access, remove the credential from the agent and remove or turn off the federated trust relationship or permissions on the AWS IAM role.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Glean cannot mint an identity token

The Glean query endpoint service account may be missing the *Service Account Token Creator* role on the dedicated GCP service account. Re-check the principal and role from Step 2, then retry.

### AWS returns InvalidIdentityToken or AccessDenied

The AWS IAM role trust policy may have an incorrect federated principal or OAuth 2.0 Client ID. Verify that:

-   The federated principal is `accounts.google.com`.
-   The action is `sts:AssumeRoleWithWebIdentity`.
-   The `accounts.google.com:aud` condition matches the numeric OAuth 2.0 Client ID from Step 3.
-   The IAM role ARN in the Glean credential matches the role that contains the trust policy.

### The agent cannot read the expected logs

The IAM role may not have read access to the requested log group, or the credential may use the wrong region. Verify the AWS region in the Glean credential and confirm that the IAM role has the required CloudWatch Logs permissions for the target log group.

### The AWS CloudWatch Logs template is not available

The template is not enabled for your deployment. Contact your Glean representative to turn it on.

## See also[​](#see-also "Direct link to See also")

-   [Service credentials overview](/administration/agent-identity/overview)
-   [Set up GCP cloud logging service credential](/administration/agent-identity/gcp-service-account)
