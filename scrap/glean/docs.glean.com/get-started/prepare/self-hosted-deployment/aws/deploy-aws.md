---
url: "https://docs.glean.com/get-started/prepare/self-hosted-deployment/aws/deploy-aws"
canonical: "https://docs.glean.com/get-started/prepare/self-hosted-deployment/aws/deploy-aws"
title: "AWS deployment guide"
description: "Deploying Glean within your own Amazon Web Services (AWS) environment can ensure compliance with your organization's data residency requirements while maintaining Glean's managed service model."
fetched_at: "2026-09-01T13:29:49.929Z"
---
On this page

## Overview[​](#overview "Direct link to Overview")

Glean provides customers the ability to deploy Glean software inside their own Amazon Web Services (AWS) account. This deployment requires your AWS admin to:

1.  Create a new empty AWS account.
2.  Associate a valid billing account.
3.  Notify Glean of any tags that need to be added to any resources that are created.
4.  Notify Glean of the AWS account ID, AWS account name, and AWS region selected, and wait for confirmation that you have access to the CloudFormation template.
5.  Execute the provided Glean CloudFormation template to bootstrap the AWS environment.

After completing the above, Glean's systems will automatically build and deploy the required compute, workflows, and software into your AWS account.

At this stage, Glean will advise you that your tenant is ready; allowing your admins to proceed with the setup process in the Getting Started guide.

This document will cover the steps required by your AWS admins to prepare an AWS account that is ready for your Glean build.

* * *

## Prerequisites: Cross-Account Access Requirements[​](#prerequisites-cross-account-access-requirements "Direct link to Prerequisites: Cross-Account Access Requirements")

Glean's deployment process requires access to specific resources hosted in Glean's central AWS account (`518642952506`, `us-east-1` region). **Your AWS account must not have policies that block access to these resources.**

note

Most customers do not need to take any action for these requirements. However, if your organization has restrictive Service Control Policies (SCPs), IAM policies, or VPC endpoint policies in place, verify that they permit the cross-account resource access described below.

For detailed information about Glean's account access model, see [AWS Account Access and Deployment Model](/security/cloud-prem/aws/account-access-and-deployment-model).

* * *

### ECR - Container Images[​](#ecr---container-images "Direct link to ECR - Container Images")

Glean distributes container images via Amazon Elastic Container Registry (ECR) for all Glean services deployed in your environment.

**Required Resource Access:**

```
arn:aws:ecr:us-east-1:518642952506:repository/*
```

**Permissions Used:** `ecr:GetAuthorizationToken`, `ecr:BatchGetImage`, `ecr:GetDownloadUrlForLayer`

* * *

### AWS Signer - Code Signing Verification[​](#aws-signer---code-signing-verification "Direct link to AWS Signer - Code Signing Verification")

Glean uses AWS Signer to verify the integrity and authenticity of deployed code.

**Required Resource Access:**

```
arn:aws:signer:us-east-1:518642952506:signing-profiles/*
```

**Permissions Used:** `signer:Describe*`, `signer:Get*`, `signer:List*`

* * *

### KMS & Secrets Manager - Control Plane Bootstrap[​](#kms--secrets-manager---control-plane-bootstrap "Direct link to KMS & Secrets Manager - Control Plane Bootstrap")

Glean uses AWS Key Management Service (KMS) and Secrets Manager to securely bootstrap the IPJC protocol, which is Glean's control plane communication protocol.

**Required Resource Access:**

| Service | Resource ARN |
| --- | --- |
| KMS (Decrypt) | `arn:aws:kms:us-east-1:518642952506:*` |
| Secrets Manager | `arn:aws:secretsmanager:us-east-1:518642952506:secret:*` |

**Permissions Used:** `kms:Decrypt`, `secretsmanager:GetSecretValue`

* * *

### S3 - Deployment Artifacts & ML Resources[​](#s3---deployment-artifacts--ml-resources "Direct link to S3 - Deployment Artifacts & ML Resources")

Glean distributes deployment artifacts and requires access to AWS machine learning resources via S3.

**Glean Central S3 Buckets** (deployment artifacts):

```
arn:aws:s3:::scio-cloud-function-sourcesarn:aws:s3:::scio-cloud-function-sources/*arn:aws:s3:::scio-beam-runners-flinkarn:aws:s3:::scio-beam-runners-flink/*arn:aws:s3:::elastic-plugin-hotswapsarn:aws:s3:::elastic-plugin-hotswaps/*arn:aws:s3:::glean-chomp-dagsarn:aws:s3:::glean-chomp-dags/*arn:aws:s3:::glean-frontend-versionsarn:aws:s3:::glean-frontend-versions/*arn:aws:s3:::scio-cloud-function-sourcesarn:aws:s3:::scio-cloud-function-sources/*arn:aws:s3:::scio-beam-runners-flinkarn:aws:s3:::scio-beam-runners-flink/*arn:aws:s3:::elastic-plugin-hotswapsarn:aws:s3:::elastic-plugin-hotswaps/*arn:aws:s3:::glean-chomp-dagsarn:aws:s3:::glean-chomp-dags/*arn:aws:s3:::glean-frontend-versionsarn:aws:s3:::glean-frontend-versions/*arn:aws:s3:::public-glean-ami-versionsarn:aws:s3:::public-glean-ami-versions/*
```

**Permissions Used:** `s3:GetObject*`, `s3:ListBucket`

**AWS SageMaker & Glue S3 Buckets** (ML operations):

```
arn:aws:s3:::*SageMaker*arn:aws:s3:::*SageMaker*/*arn:aws:s3:::*aws-glue*arn:aws:s3:::*aws-glue*/*
```

**Permissions Used:** `s3:GetObject*`, `s3:ListBucket`

* * *

### AMIs - Compute Resources[​](#amis---compute-resources "Direct link to AMIs - Compute Resources")

Glean uses Amazon Machine Images (AMIs) for deploying compute resources in your environment.

**AWS Bottlerocket AMIs** (AWS-managed):

Glean programmatically retrieves the latest Bottlerocket AMI for each Kubernetes version during deployment following [AWS's recommended approach](https://docs.aws.amazon.com/eks/latest/userguide/retrieve-ami-id-bottlerocket.html). These are publicly available AWS-owned AMIs and require no special configuration.

**Glean Custom Ubuntu AMIs** (Glean-managed):

Glean maintains custom Ubuntu images based on Ubuntu 22.04+ LTS with the latest security patches and optional Wiz and CrowdStrike sensor support. These AMIs are hosted in Glean's central AWS account.

**Required Capability:** Ability to copy AMIs from account `518642952506` in region `us-east-1` to your deployment region.

note

Glean custom AMIs contain only base operating system components and security tooling. They do not contain any customer data or sensitive Glean intellectual property.

* * *

### Cross-Account Role Assumption[​](#cross-account-role-assumption "Direct link to Cross-Account Role Assumption")

Glean uses IAM role assumption for deployment automation and support access. The following roles are involved:

**CI/CD Roles:**

| Role | Purpose |
| --- | --- |
| `glean-deployer` | Assumed by Glean's central CI/CD system via Google OIDC to invoke the `deploy_build` Lambda function that starts deployments or upgrades. This role is not used by humans and has no general administration permissions. |
| `cron-helper-invoker` | Assumed by Glean's CI/CD system to invoke a `cron_helper` Lambda function that orchestrates scheduled workflows and ML jobs. |

**Support Roles:**

| Role | Purpose |
| --- | --- |
| `glean-viewer` | Provides view-only access for Glean engineers to see AWS infrastructure configuration. Does not grant write permissions or access to sensitive data. |
| `GleanAdmin` (optional) | Break-glass role for Glean engineers to address deployment issues requiring elevated access. See the [Create the Admin Service Role](#5-strongly-recommended-create-the-admin-service-role) section below for details. |

Both support roles permit role assumption from Glean's central AWS account (`518642952506`).

For detailed role and permission breakdowns, see [AWS Account Access and Deployment Model](/security/cloud-prem/aws/account-access-and-deployment-model).

* * *

### Optional: AWS Bedrock Integration[​](#optional-aws-bedrock-integration "Direct link to Optional: AWS Bedrock Integration")

For customers leveraging Glean-hosted AWS Bedrock capacity, Glean assumes an IAM role in Glean's central AWS Bedrock account to make Bedrock API calls.

**Required Resource Access:**

```
arn:aws:iam::503561420092:role/BedrockInvokeModelRole*
```

**Permissions Used:** `sts:AssumeRole`

note

This is only required if your organization uses Glean's hosted Bedrock capacity. Contact your Glean deployment engineer to determine if this applies to your deployment.

* * *

### Additional Security Configurations[​](#additional-security-configurations "Direct link to Additional Security Configurations")

**EBS Encryption:** Glean enables EBS encryption by default for all volumes during the initial AWS account setup. This configuration is applied once during bootstrapping.

**S3 Public Access Block:** Glean enables account-wide S3 public access blocking by default for security. If your organization prefers to manage this setting directly, inform your Glean deployment engineer so the appropriate flag can be toggled in deployment automation.

* * *

warning

**Action Required:** If your organization enforces restrictive cross-account access policies, review the resources above with your security team and ensure they are permitted. Contact your Glean deployment engineer if you have questions or need assistance configuring policy exceptions.

* * *

## 1\. Create a New AWS Account[​](#1-create-a-new-aws-account "Direct link to 1. Create a New AWS Account")

Glean deploys to an empty AWS instance to provide layer of isolation from any other services you have running in AWS. This also simplifies the deployment process as it eliminates potential conflicts with existing services.

-   Select a supported AWS region for Glean to build your environment in.
-   Create a new AWS account in the selected region.

warning

The region selected cannot be changed once your tenant has been built. Changing region will require a complete rebuild of your tenant.

## 2\. Company Tag Policy[​](#2-company-tag-policy "Direct link to 2. Company Tag Policy")

You must notify Glean if your company policy enforces the use of specific tags on AWS resources.

Glean can add these tags to nearly all resources that we create, but **we must be notified in advance** before commencing the build of your Glean tenant so that the tags can be seeded in the initial deployment.

You should provide your Glean engineer a list of any and all tags that are required in the following format:

```
tag1:value1--tag2:value2--tag3:value3--...
```

## 3\. Run the SCP Check Tool[​](#3-run-the-scp-check-tool "Direct link to 3. Run the SCP Check Tool")

Glean provides an [SCP checker script](/get-started/prepare/self-hosted-deployment/aws/scp-checker) that you can use to check for SCPs that can conflict with the build of Glean.

If a conflict is detected, please notify your Glean deployment engineer who can provide further guidance.

After running the SCP checker, share the following information with your Glean deployment engineer:

-   AWS Account ID (for example, `182333000101`)
-   AWS Account Name (`aws-glean-companyname`)
-   AWS Region (`us-east-1`)

Wait for your Glean deployment engineer to confirm that Glean has created the required manifest and added your account to the access list for the Docker/ECR repository. Do not deploy the CloudFormation template until you receive confirmation that you have access to it.

## 4\. Deploy the Glean CloudFormation Template[​](#4-deploy-the-glean-cloudformation-template "Direct link to 4. Deploy the Glean CloudFormation Template")

A Glean provided CloudFormation template is used to bootstrap the AWS account so that the Glean build system can access and deploy Glean services. This process is automated. For more information on how Glean securely accesses your AWS account, see [AWS Account Access and Deployment Model](/security/cloud-prem/aws/account-access-and-deployment-model).

1.  Log in to your new AWS account as an Administrator.
    
2.  Navigate to the AWS CloudFormation console at [https://console.aws.amazon.com/cloudformation/](https://console.aws.amazon.com/cloudformation/)
    
    -   Ensure that the correct region is selected before proceeding!
    -   If the CF template is installed to an incorrect region, you can delete it and re-install it to the correct one.
3.  Click **Create stack**.
    
4.  On the **Specify template** page, select **Amazon S3 URL** and paste the following URL for Glean's CloudFormation template. Click **Next** to proceed.
    
    ```
    https://glean-public-marketplace-resources.s3.amazonaws.com/glean-cloudformation-template.yaml
    ```
    
5.  Specify a name for the stack (for example, `glean-bootstrap`). Click **Next** to proceed.
    
6.  On the **Specify stack details** page, enter the **GleanInstanceName** provided by your Glean deployment engineer. This parameter is required.
    
7.  Leave the optional parameters at their default values unless your Glean deployment engineer instructs you otherwise. Click **Next** to proceed. On the options page, skip all other fields and click **Next** again at the bottom.
    
8.  On the final review page, scroll to the bottom, agree to the capabilities acknowledgment, and click **Submit** to deploy the template.
    
    -   More information: [Selecting a Stack Template (docs.aws.amazon.com)](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-using-console-create-stack-template.html)

## 5\. (Strongly Recommended) Create the Admin Service Role[​](#5-strongly-recommended-create-the-admin-service-role "Direct link to 5. (Strongly Recommended) Create the Admin Service Role")

Glean recommends that customers set up an admin service role for allowing Glean on-call engineers break-glass access to triage any issues with the build (and the environment once deployed).

This access is short-lived, auditable, and only used to triage issues. Glean engineers require approval from Glean Senior Leadership to access this role.

Glean especially recommends creating this role during the initial setup of Glean to help get the deployment to a stable state. This is *not* a required IAM role. However, Glean recommends that customers create this role and use an SCP attached to the Glean AWS account to disable all access to this role (example below). Whenever this access is needed, customers are able to detach the SCP to permit access and then re-attach the SCP once access is no longer required.

note

Note: If you do not create this role (or block access with the SCP), then you must have an established process in place where Glean can request access 24/7 in response to service issues. Without this process, Glean will not be able to honor any Service or Support SLAs.

1.  Following the CloudFormation process above, deploy the following template which defines the Admin Service role:
    
    ```
    https://glean-public-marketplace-resources.s3.amazonaws.com/glean-admin-access-cft.yaml
    ```
    
2.  You will need to specify the **External ID** in the above template script. This is unique for each environment and will need to be provided by your Glean deployment engineer. Please notify them when you are up to this step.
    
3.  Optional: If you want to lock down this role via an SCP, you will want to create an SCP that looks like this:
    
    ```
    {    "Version": "2012-10-17",    "Statement": [        {            "Effect": "Deny",            "Action": "*",            "Resource": "*",            "Condition": {                "ArnEquals": {                    "aws:PrincipalArn": "arn:aws:iam::GLEAN-ACCOUNT-ID:role/GleanAdmin"                }            }        }    ]}
    ```
    

### Service Restoration Access[​](#service-restoration-access "Direct link to Service Restoration Access")

If you choose not to manage an admin service role manually, Glean uses **Service Restoration Access** to restore and manage your infrastructure. This capability is deployed and operated by Glean as part of your environment.

-   Uses a dedicated, least-privilege service account and an isolated execution service limited to infrastructure-level tools (for example, service restarts, rollbacks, scaling).
-   Strict validation prevents this service and its account from reading or exporting your data.

## 6\. Request Quota Changes[​](#6-request-quota-changes "Direct link to 6. Request Quota Changes")

The resource quotas that Glean requires are detailed below.

| Quota Type | Service | Quota name | Location | New Value | Justification |
| --- | --- | --- | --- | --- | --- |
| All Quotas | SageMaker | ml.g4dn.12xlarge for training job usage | primary deployment region | 1 | The Glean search system trains a custom AI language model on the corpus, enabling features such as semantic search, synonyms, and more. Glean uses these GPU machines to power the training. |
| All Quotas | SageMaker | ml.g4dn.xlarge for training job usage | primary deployment region | 4 | These are the standard machine types used for our general training jobs, which can have multiple running in parallel. We want to increase the quota to alleviate this contention. |
| All Quotas | SageMaker | (For Small and Medium sized deployments) ml.m5.2xlarge for training job usage  
(For Large and Extra Large sized deployments) ml.m5.4xlarge for training job usage | primary deployment region | 1 | Used for cpu based ml training jobs |

You will only need to request quota increases for the AWS region that you have selected for your deployment.

## 7\. Enable AWS cost visibility[​](#7-enable-aws-cost-visibility "Direct link to 7. Enable AWS cost visibility")

From your AWS management or payer account, enable EKS split cost allocation data and the required user-defined cost allocation tags. These free billing features take about 5 minutes to configure and add billing metadata to the existing Cost and Usage Report. They do not provide Glean with access to your application data, query logs, user information, workloads, or AWS environment.

Follow the steps in [Enable detailed cost visibility](/security/cloud-prem/aws/cost-controls#enable-detailed-cost-visibility).

### Review cost reduction recommendations[​](#review-cost-reduction-recommendations "Direct link to Review cost reduction recommendations")

Review the [AWS cost reduction recommendations](/security/cloud-prem/aws/cost-controls) and apply the recommendations that are appropriate for your organization. For example, you can purchase Savings Plans for predictable EC2 and RDS usage instead of relying only on on-demand pricing.

## 8\. Notify Glean to Begin the Build[​](#8-notify-glean-to-begin-the-build "Direct link to 8. Notify Glean to Begin the Build")

Once the above steps have been completed, notify your Glean deployment engineer who will initiate the build process for your environment.

* * *

## FAQ[​](#faq "Direct link to FAQ")

-   [Glean on AWS FAQ](/security/cloud-prem/aws/faq)
