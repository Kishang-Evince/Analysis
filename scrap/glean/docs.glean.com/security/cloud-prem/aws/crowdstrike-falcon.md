---
url: "https://docs.glean.com/security/cloud-prem/aws/crowdstrike-falcon"
canonical: "https://docs.glean.com/security/cloud-prem/aws/crowdstrike-falcon"
title: "CrowdStrike Falcon sensors on AWS"
description: "Set up CrowdStrike Falcon sensors on AWS Glean deployments, including licensing, credentials, secrets, and deployment requirements."
fetched_at: "2026-09-01T13:29:57.039Z"
---
On this page

Set up CrowdStrike Falcon sensors on Glean workloads that run on Amazon Elastic Compute Cloud (EC2) instances and Amazon Elastic Kubernetes Service (EKS) nodes. Glean installs and manages the sensors after you provide the required licensing, credentials, secret, and deployment details.

## Setup instructions[​](#setup-instructions "Direct link to Setup instructions")

Glean installs the CrowdStrike Falcon sensors through the standard Glean deployment process. You do not need to install the sensors or change the Glean deployment yourself.

For EC2 instances, Glean installs the Falcon agent. For Kubernetes, Glean uses the [Falcon Operator](https://github.com/CrowdStrike/falcon-operator) to install the Node Sensor and Kubernetes Admission Controller.

### Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Confirm that you have:

-   A CrowdStrike Falcon account and the required license
-   Access to the Falcon console to add the Glean AWS account for monitoring
-   Permission to create an [AWS Secrets Manager](https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html) secret in the same region as the Glean deployment
-   Permission to create a Customer Managed Key (KMS) and configure cross-account access if the secret will be in a different AWS account
-   A way to provide the required deployment details to [Glean Support](https://support.glean.com/)

### Licensing[​](#licensing "Direct link to Licensing")

The customer hosts CrowdStrike, not Glean. Glean connects the deployment to the customer's CrowdStrike licenses.

To monitor your Glean deployment with CrowdStrike Falcon sensors, you need one of these licensing options:

-   **Option 1**: CrowdStrike Cloud-Native Application Protection Platform (CNAPP) and CNAPP with Containers for comprehensive security capabilities
-   **Option 2**: Cloud Runtime Security and Cloud Runtime Security with Containers for runtime protection

### Pricing[​](#pricing "Direct link to Pricing")

CrowdStrike reports to the customer's CrowdStrike tenant. The customer is responsible for all related billing.

### Configuration[​](#configuration "Direct link to Configuration")

Complete these steps before Glean deploys the sensors:

1.  Add the Glean AWS account to your Falcon console for monitoring. Follow the CrowdStrike documentation for the required steps.
2.  Create CrowdStrike credentials for the Falcon sensors to use when they communicate with CrowdStrike. The credentials include:
    -   Client ID
    -   Client Secret
    -   Customer ID. You will use this value again in step 4, and it must use the required format.
    -   An optional provisioning token for a Customer Identifier (CID) with restricted Agent Identifier (AID) provisioning enabled.
3.  Grant the credentials these permissions:
    -   `Falcon Images Download`
    -   `Installation Tokens` with `Read` and `Write` access
    -   `Sensor Download`
4.  Find the Customer Identifier (CID) checksum in the Falcon console. Go to the CrowdStrike Sensor download page, find the checksum at the top of the page, and click **Copy your Customer ID checksum to the clipboard**. Use this value when you construct the secret. The CID typically ends with a hyphen and two characters, such as `-2F`.
5.  Create the AWS Secrets Manager secret described in [Secret creation](#secret-creation).
6.  Provide the deployment details to [Glean Support](https://support.glean.com/), as described in [Provide Glean with details](#provide-glean-with-details).

### Secret creation[​](#secret-creation "Direct link to Secret creation")

The Glean deployment needs access to the credentials you created. Create an **AWS Secrets Manager secret in the same region as the Glean deployment**.

You can create the secret in the same AWS account as the Glean deployment or in a different AWS account.

#### Secret in the same AWS account[​](#secret-in-the-same-aws-account "Direct link to Secret in the same AWS account")

If you create the secret in the same AWS account as the Glean deployment, Glean recommends encrypting it with the AWS managed `aws/secretsmanager` KMS key.

Create the secret, then continue to [Secret contents](#secret-contents).

#### Secret in a different AWS account[​](#secret-in-a-different-aws-account "Direct link to Secret in a different AWS account")

If you create the secret in a different AWS account than the Glean deployment, you must first create a new AWS Customer Managed Key (KMS).

Apply this JSON policy to the KMS key:

```
{  "Version": "2012-10-17",  "Id": "key-consolepolicy-3",  "Statement": [    {      "Sid": "Enable IAM User Permissions",      "Effect": "Allow",      "Principal": {        "AWS": "arn:aws:iam::ACCOUNT-ID-THAT-THE-KMS-KEY-RESIDES-IN:root"      },      "Action": "kms:*",      "Resource": "*"    },    {      "Sid": "Allow secrets manager use of the key",      "Effect": "Allow",      "Principal": {        "AWS": "arn:aws:iam::YOUR-GLEAN-DEPLOYMENT-AWS-ACCOUNT-ID:root"      },      "Action": [        "kms:Decrypt",        "kms:DescribeKey"      ],      "Resource": "*",      "Condition": {        "StringEquals": {          "kms:ViaService": "secretsmanager.DEPLOYMENT-REGION.amazonaws.com"        }      }    }  ]}
```

Attach this JSON cross-account policy to the secret:

```
{    "Version": "2012-10-17",    "Statement": [        {            "Sid": "AllowCrossAccountSecretRead",            "Effect": "Allow",            "Principal": {                "AWS": "arn:aws:iam::YOUR-GLEAN-DEPLOYMENT-AWS-ACCOUNT:root"            },            "Action": "secretsmanager:GetSecretValue",            "Resource": "*"        }    ]}
```

You cannot use the AWS managed `aws/secretsmanager` key for cross-account secrets.

#### Secret contents[​](#secret-contents "Direct link to Secret contents")

The secret must contain a JSON string with this structure:

```
{    "FALCON_CLIENT_SECRET": "ADD-ME",    "CUSTOMER_ID": "ADD-ME"}
```

Include these values:

-   The CrowdStrike Falcon Client Secret for `FALCON_CLIENT_SECRET`
-   The Customer ID for `CUSTOMER_ID`
-   If you use a provisioning token, add `"PROVISIONING_TOKEN": "the token"` to the JSON string

After you create the secret, record these Amazon Resource Name (ARN) values:

1.  The ARN of the secret
2.  The ARN of the KMS key that encrypted the secret. You can find this in the KMS console. For a secret encrypted with the `aws/secretsmanager` managed key, find the ARN under AWS managed keys in the AWS console.

## Share with Glean[​](#share-with-glean "Direct link to Share with Glean")

After you complete the customer steps, provide [Glean Support](https://support.glean.com/) with these CrowdStrike deployment details:

1.  The Client ID for the credentials
2.  The ARN of the secret
3.  The ARN of the KMS key that encrypted the secret
4.  An optional comma-separated list of tags to apply to CrowdStrike deployments
5.  An optional version decrement for EC2 instances. The default is `0`. This value sets the Falcon version to deploy by subtracting the decrement. For example, a decrement of `2` deploys a Falcon release that is two versions old.
6.  An optional Kubernetes Falcon auto update strategy. The default is `normal`. You can also set it to `off` or `force`.
7.  An optional Kubernetes Falcon update policy string. This is the name of the Falcon Linux sensor update policy configured in the Falcon user interface. When set, this policy determines which Falcon sensor version to install. The default is unset.

After you provide the details, Glean deploys the Falcon sensors to the Glean compute components.
