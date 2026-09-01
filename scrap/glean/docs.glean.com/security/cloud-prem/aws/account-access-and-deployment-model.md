---
url: "https://docs.glean.com/security/cloud-prem/aws/account-access-and-deployment-model"
canonical: "https://docs.glean.com/security/cloud-prem/aws/account-access-and-deployment-model"
title: "AWS account access and deployment model"
description: "How Glean securely accesses a customer-hosted AWS account and deploys the software during build and updates, including the IAM roles, trust relationships, and permissions created by Glean's bootstrap CloudFormation."
fetched_at: "2026-09-01T13:29:56.289Z"
---
On this page

Glean establishes secure, least-privilege access to your customer-hosted AWS account through Identity and Access Management (IAM) roles. This page explains the trust policies that determine who can assume a role, the permissions policies that determine what a role can do, the CloudFormation bootstrap resources, and the managed deployment pipeline that provisions and updates your tenant. Use this information to prepare your environment, satisfy security reviews, and resolve access-related questions during rollout and operations.

Glean creates all bootstrapping resources through the Glean CloudFormation bootstrap template. You can download the [template](https://glean-public-marketplace-resources.s3.amazonaws.com/glean-cloudformation-template.yaml).

note

For information about cross-account resource access requirements from Glean's central AWS account, see [Cross-account access requirements](/get-started/prepare/self-hosted-deployment/aws/deploy-aws#prerequisites-cross-account-access-requirements).

note

-   The bootstrap template contains the authoritative definitions of roles and policies created during initialization. You must notify Glean to begin the build after you deploy the template in the selected region.
-   The CloudFormation Template (CFT) only creates the minimal resources needed to get access into the account and start the deployment.

## Access roles assumed by Glean[​](#access-roles-assumed-by-glean "Direct link to Access roles assumed by Glean")

Glean uses IAM role-based access for a limited, well-defined set of tools. Glean does not use static IAM access keys. The bootstrap template creates the following roles:

| Role | Who assumes it | Primary purpose |
| --- | --- | --- |
| glean-deployer | Glean central infrastructure through Google-based web identity | Invoke deployment workflows like setup and upgrades, read Elastic Load Balancer (ELB)/AWS Certificate Manager (ACM) metadata to finalize DNS/ACM, and set a one-time bootstrap secret for auth hand-off. |
| glean-viewer | Glean engineers through AWS Console role-switch from a known Glean account | Read-only views for debugging EC2, ELB, CloudWatch, AutoScaling, VPC, Lambda, Elastic Kubernetes Service (EKS), and logs. |
| cron-helper-invoker | Glean service account (web identity) | Invoke a specific `cron_helper` Lambda for orchestrated workflows, for example, ML jobs. |

### `glean-deployer` role[​](#glean-deployer-role "Direct link to glean-deployer-role")

**Trust policy**: Federated web identity to a known Glean GCP service account (Google OIDC) with a specific OAuth 2 Client ID audience. This only allows the service account of Glean's GCP automation to assume the role.

```
{  "Version": "2008-10-17",  "Statement": [    {      "Effect": "Allow",      "Principal": { "Federated": "accounts.google.com" },      "Action": "sts:AssumeRoleWithWebIdentity",      "Condition": {        "StringEquals": {          "accounts.google.com:aud": "102499298255048943192"        }      }    }  ]}
```

**Key permissions scope**:

-   Invoke a single deployment Lambda (`deploy_build`) to run setup or upgrade operations.
-   Describe Application Load Balancer (ALB), Listeners, or the ListenerCertificates used to finalize the DNS Canonical Name (CNAME) from `name-of-instance-be.glean.com` to the customer ELB.
-   List or describe ACM certificates for DNS validation during certificate provisioning.
-   Put a one-time bootstrap secret value `ipjc_auth_token` in Secrets Manager for a secure control-plane handshake.

### `glean-viewer` role[​](#glean-viewer-role "Direct link to glean-viewer-role")

**Trust policy**: Assumable from a known Glean AWS account for console-based, time-bound debugging.

```
{  "Version": "2008-10-17",  "Statement": [    {      "Effect": "Allow",      "Principal": { "AWS": "arn:aws:iam::518642952506:root" },      "Action": "sts:AssumeRole"    }  ]}
```

**Effective access**: Read-only visibility across EC2, ELB, CloudWatch, AutoScaling, VPC, Lambda, EKS, CloudWatch Logs (scrubbed), metrics, and dashboards through a minimal set of AWS-managed policies and tailored Lambda, EKS, and Logs viewers. It does not grant access to any data and is only used to view configuration details.

### `cron-helper-invoker` role[​](#cron-helper-invoker-role "Direct link to cron-helper-invoker-role")

**Trust policy**: Federated Google OIDC for a designated service account in Glean's central GCP project. Glean scopes this to permit only Glean's CI/CD automation to invoke the `cron_helper` Lambda. Glean provides no other access.

```
{  "Version": "2012-10-17",  "Statement": [    {      "Effect": "Allow",      "Principal": { "Federated": "accounts.google.com" },      "Action": "sts:AssumeRoleWithWebIdentity",      "Condition": {        "StringEquals": {          "accounts.google.com:aud": "108067902309312661827"        }      }    }  ]}
```

## Deployment process[​](#deployment-process "Direct link to Deployment process")

To set up infrastructure and perform updates, the account hosts a `deploy_build` Lambda that launches AWS CodeBuild projects to run Glean's deployment code. This code is primarily Terraform plus targeted Python for steps that infrastructure as code cannot handle directly.

The `deploy_build` execution role named `deploy-build` has a trust policy for `lambda.amazonaws.com` and narrow permissions to read config and create or drive CodeBuild, including `iam:PassRole` limited to a CodeBuild role.

Each CodeBuild build runs under the `codebuild` IAM role, which has broad but deployment-specific permissions required to create and configure EKS, EC2/VPC networking, Key Management Service (KMS), Relational Database Service (RDS), S3, Simple Queue Service (SQS)/Simple Notification Service (SNS), WAFv2, CloudWatch/Logs, Elastic Container Registry (ECR), Lambda, IAM constructs, and more needed to bring up the full tenant stack. The bootstrap template defines the full policy statements, and Glean's automated pipelines apply them.

## Customer controls[​](#customer-controls "Direct link to Customer controls")

-   S3 public access prevention: Glean respects the AWS Block Public Access posture, and customers commonly enforce this globally.
-   The Admin Service Role: Glean recommends that you create an auditable admin service role for rare escalation needs. You can turn off all access to this role with a Service Control Policy (SCP) and permit access only when required.
-   For AWS, use KMS Customer Managed Keys (CMK). You own and control the cryptographic keys used to encrypt your data at rest.

## See also[​](#see-also "Direct link to See also")

-   [Deploy Glean on AWS](/get-started/prepare/self-hosted-deployment/aws/deploy-aws)
-   [AWS permission boundaries](/security/cloud-prem/aws/permission-boundaries)
-   [Glean Web Application Firewall on AWS](/security/cloud-prem/aws/aws-waf)
-   [Glean IP ranges](/security/networking/glean-ip-ranges)
-   [AWS FAQ](/security/cloud-prem/aws/faq)
