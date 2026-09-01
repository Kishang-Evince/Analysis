---
url: "https://docs.glean.com/security/cloud-prem/aws/wiz-sensor"
canonical: "https://docs.glean.com/security/cloud-prem/aws/wiz-sensor"
title: "Wiz sensor support on AWS"
description: "Set up Wiz sensors on AWS Glean deployments, including credentials, AWS Secrets Manager configuration, and deployment requirements."
fetched_at: "2026-09-01T13:29:57.598Z"
---
On this page

Set up Wiz sensors on Glean workloads that run on Amazon Elastic Compute Cloud (EC2) instances and Amazon Elastic Kubernetes Service (EKS) nodes. Glean installs and manages the sensors after you provide the required credentials, secret, and deployment details.

## Setup instructions[​](#setup-instructions "Direct link to Setup instructions")

Glean installs the Wiz sensors through the standard Glean deployment process. You do not need to install the sensors or change the Glean deployment yourself.

## Requirements[​](#requirements "Direct link to Requirements")

Confirm that you have:

-   A Wiz account
-   Access to your Wiz tenant and permission to create a service account
-   Permission to create an [AWS Secrets Manager](https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html) secret in the same region as the Glean deployment
-   Permission to create a Key Management Service (KMS) customer managed key and configure cross-account access if the secret will be in a different AWS account
-   A way to provide the required deployment details to [Glean Support](https://support.glean.com/)

## Configuration[​](#configuration "Direct link to Configuration")

Complete these steps before Glean deploys the sensors:

1.  In Wiz, create a service account for a Wiz sensor. Follow the Wiz documentation for the required steps. Record the **Client ID** and **Client Secret**. Use the client secret later as `WIZ_API_CLIENT_SECRET`.
    
2.  Collect the runtime sensor image pull key from your Wiz tenant. Go to [Wiz tenant information](https://app.wiz.io/tenant-info/general) to view the tenant details.
    
    Record these values:
    
    -   **Domain**: Select `registry.wiz.io` from the drop-down when possible
    -   **Username**: Use this value later as `WIZ_REGISTRY_USERNAME`
    -   **Password**: Use this value later as `WIZ_REGISTRY_PASSWORD`
3.  Create the [AWS Secrets Manager](https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html) secret described in [Secret creation](#secret-creation). Create it in the same region as the Glean deployment.
    
4.  Provide the required details to [Glean Support](https://support.glean.com/), as described in [Share with Glean](#share-with-glean).
    
5.  After you provide the details, Glean deploys the Wiz sensors.
    

## Secret creation[​](#secret-creation "Direct link to Secret creation")

Create an AWS Secrets Manager secret in the same region as the Glean deployment. Create the secret in the same AWS account as the Glean deployment, or in a different AWS account.

### Secret in the same AWS account[​](#secret-in-the-same-aws-account "Direct link to Secret in the same AWS account")

If you create the secret in the same AWS account as the Glean deployment, Glean recommends encrypting it with the AWS managed `aws/secretsmanager` KMS key.

Create the secret, then continue to [Secret contents](#secret-contents).

### Secret in a different AWS account[​](#secret-in-a-different-aws-account "Direct link to Secret in a different AWS account")

If you create the secret in a different AWS account than the Glean deployment, you must create a new customer managed key in Key Management Service (KMS).

Apply this JSON policy to the KMS key:

```
{  "Version": "2012-10-17",  "Id": "key-consolepolicy-3",  "Statement": [    {      "Sid": "Enable IAM User Permissions",      "Effect": "Allow",      "Principal": {        "AWS": "arn:aws:iam::ACCOUNT-ID-THAT-THE-KMS-KEY-RESIDES-IN:root"      },      "Action": "kms:*",      "Resource": "*"    },    {      "Sid": "Allow secrets manager use of the key",      "Effect": "Allow",      "Principal": {        "AWS": "arn:aws:iam::YOUR-GLEAN-DEPLOYMENT-AWS-ACCOUNT-ID:root"      },      "Action": [        "kms:Decrypt",        "kms:DescribeKey"      ],      "Resource": "*",      "Condition": {        "StringEquals": {          "kms:ViaService": "secretsmanager.DEPLOYMENT-REGION.amazonaws.com"        }      }    }  ]}
```

Attach this cross-account JSON policy to the secret:

```
{    "Version": "2012-10-17",    "Statement": [        {            "Sid": "AllowCrossAccountSecretRead",            "Effect": "Allow",            "Principal": {                "AWS": "arn:aws:iam::YOUR-GLEAN-DEPLOYMENT-AWS-ACCOUNT:root"            },            "Action": "secretsmanager:GetSecretValue",            "Resource": "*"        }    ]}
```

You cannot use the AWS managed `aws/secretsmanager` key for cross-account secrets.

### Secret contents[​](#secret-contents "Direct link to Secret contents")

The secret must contain a JSON string with this structure:

```
{    "WIZ_API_CLIENT_SECRET": "ADD-ME",    "WIZ_REGISTRY_USERNAME": "ADD-ME",    "WIZ_REGISTRY_PASSWORD": "ADD-ME"}
```

Include the following:

1.  The Wiz Client Secret for `WIZ_API_CLIENT_SECRET`
2.  The image pull registry username for `WIZ_REGISTRY_USERNAME`
3.  The password for the image for `WIZ_REGISTRY_PASSWORD`

After you create the secret, record these Amazon Resource Name (ARN) values:

1.  The ARN of the secret
2.  The ARN of the KMS key that encrypted the secret. You can find this in the KMS console. For a secret encrypted with the `aws/secretsmanager` managed key, find the ARN under AWS managed keys in the AWS console.

## Share with Glean[​](#share-with-glean "Direct link to Share with Glean")

After you complete the customer steps, provide [Glean Support](https://support.glean.com/) with these Wiz deployment details:

1.  The Wiz Client ID
2.  The ARN of the Secrets Manager secret
3.  The ARN of the KMS key that encrypted the secret

Glean deploys the Wiz sensors with the values.

## Pricing[​](#pricing "Direct link to Pricing")

Wiz reports to the customer's Wiz tenant. The customer is responsible for billing and capacity requirements. This typically requires a billable unit for each EC2 instance and EKS node instance. Contact [Glean Support](https://support.glean.com/) to discuss sizing.

## See also[​](#see-also "Direct link to See also")

-   [AWS account access and deployment model](/security/cloud-prem/aws/account-access-and-deployment-model)
-   [AWS permission boundaries for Glean](/security/cloud-prem/aws/permission-boundaries)
-   [AWS FAQ](/security/cloud-prem/aws/faq)
