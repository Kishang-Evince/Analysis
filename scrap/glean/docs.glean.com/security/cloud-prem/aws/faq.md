---
url: "https://docs.glean.com/security/cloud-prem/aws/faq"
canonical: "https://docs.glean.com/security/cloud-prem/aws/faq"
title: "AWS FAQ"
description: "Frequently asked questions about Glean's AWS deployment options, infrastructure requirements, and feature support"
fetched_at: "2026-09-01T13:29:57.099Z"
---
On this page

If you have questions about Glean's AWS support that aren't covered below, please reach out to Glean Support or your designated Glean contact.

## General Information[​](#general-information "Direct link to General Information")

### Is AWS region \_\_\_\_\_ supported?

Generally yes. We now support any region that offers all of our required services.

However, certain regions have limitations. For example, as of early April 2024, VPC endpoints for specific managed services may be available only in us-east-1 and us-west-2.

We currently do not support GovCloud regions and have no immediate timeframe for supporting this.

## Security[​](#security "Direct link to Security")

### What access to the AWS account is required from Glean?

Glean requires access from:

-   The central Glean project which orchestrates setup and release deployments
-   The Glean AWS account (518642952506) which hosts container images, deployment artifacts, and other shared resources

More information is available in the following documents:

-   [AWS Deployment Guide - Cross-Account Access Requirements](/get-started/prepare/self-hosted-deployment/aws/deploy-aws#prerequisites-cross-account-access-requirements)
-   [Glean AWS Account Access and Deployment Model](/security/cloud-prem/aws/account-access-and-deployment-model)

### Are customer managed keys (CMK) supported by Glean for the AWS accounts?

Glean does support customer-managed CMKs, however, Glean strongly recommends the use of default AWS Managed KMS keys. Default keys provide strong AWS account level safeguards and eliminates the ability for misconfiguration. At any time, you have the ability to place an SCP on the Glean AWS account to stop all KMS key activity in the unlikely event of an emergency.

### Why does Glean request the customer to create an admin role?

There are situations where the Glean on-call engineer needs admin-level access to remediate or mitigate escalations. They must get approval from Glean leadership to access a Glean-side internal admin GCP service account which can then be used for federated access to the AWS-side IAM admin role.

### Will NAF and WAF be managed by Glean?

Yes.

### Which WAF are you using?

We're using AWS WAF natively: [https://aws.amazon.com/waf/](https://aws.amazon.com/waf/)

### Does WAF log to CloudWatch?

Yes, this is enabled by default for all logs except for deny requests.

### Do you apply data protection filters on CloudWatch logs?

Currently, we do not apply AWS [masking](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/mask-sensitive-log-data.html) to our logs. This would render logs unusable in important support and debugging situations.

### What's the path of incoming webhooks?

The path for incoming webhooks is:

1.  Webhooks first go through the WAF (you can add rules like IP restrictions)
2.  Then the application load balancer
3.  Then the k8s cluster

The authentication scheme depends on the specific vendor's API.

### Can we attach custom security groups to one of the managed services?

Please provide the details to our support team who can further discuss this.

### Does Glean provide any Intrusion Detection capabilities on AWS?

Glean recommends customers leverage AWS GuardDuty for IDS capabilities on AWS.

For more information, see [AWS GuardDuty and Glean](/security/cloud-prem/aws/guardduty).

## Networking[​](#networking "Direct link to Networking")

### What are the network requirements?

Glean will set up and deploy all infrastructure, including VPC components, within an empty AWS account the customer owns, so there is nothing that the customer needs to do proactively with respect to networking.

## Compute[​](#compute "Direct link to Compute")

### What OS are the EC2 instances running on and where do the AMIs come from?

Generally Amazon Linux 2 on EKS nodes. We use the default AWS-provided AMIs here.

For some standalone EC2 instances, we run a Glean AMI image built on top of Ubuntu 20.04 LTS (Focal).

### Will the OS's be patched by Glean or is that a customer responsibility?

Glean will handle the patching and maintenance of all compute instances. This is automated by our internal systems.

## Cost & Resourcing[​](#cost--resourcing "Direct link to Cost & Resourcing")

### How do we appropriately size our Glean instance?

Glean will handle dynamically sizing all of the infrastructure based on many different factors relevant to the customer-specific corpus.

### Can you provide estimates for costs and resource usage?

These details can vary depending on the characteristics of your Glean deployment. To receive accurate estimates, please provide your Glean contact with:

-   Number of employees in your organization
-   Number of documents in your corpus
-   The connectors to be connected, and ideally the number of docs per connector

While these are high-level factors, there are many more nuances that affect data storage and processing requirements. We can provide estimates based on comparable deployments, but any numbers provided should be used as estimates only.

### What GPU instance types are typically needed?

Our SageMaker training jobs require ml.g4dn.\* instance types (primarily ml.g4dn.xlarge). We run about 1-4 training jobs a day, with varying runtimes from 30 minutes to a few hours.

However, none of the instances we explicitly create, e.g. on the EKS cluster, require GPUs.

### How do we minimize egress cost?

Most Glean-relevant traffic is ingress (incoming data). AWS generally does not charge for ingress.

## Storage - RDS[​](#storage---rds "Direct link to Storage - RDS")

### Which database are you using?

We're using AWS RDS for MySQL: [https://aws.amazon.com/rds/mysql/](https://aws.amazon.com/rds/mysql/)

### How often are SQL backups taken?

Once a day.

## Storage - S3[​](#storage---s3 "Direct link to Storage - S3")

### Do buckets have Inventory enabled?

No, we don't enable Inventory.

### Are S3 buckets accessible publicly or from Glean Central?

No.

### Is S3 configured for cross-region replication?

No, we don't configure cross-region replication and in practice have not had a strong reason to.

## Lambda[​](#lambda "Direct link to Lambda")

### What is the purpose of the private lambdas separate from the EKS cluster?

These lambdas are used for:

-   Setup & deployment (Bootstrap configuration template)
-   Maintenance operations and cron jobs, e.g. restarting or upgrading node pools

### Are the lambdas configured to be publicly accessible?

No. None of them are publicly accessible.

### Do you add layers to lambdas, and if so, are they accessible from outside the organization?

No, Glean doesn't add layers to lambdas.

### Do you use lambda function URLs?

No, they are disabled.

## Disaster Recovery[​](#disaster-recovery "Direct link to Disaster Recovery")

### How does Glean handle Disaster Recovery?

Please refer to the Glean Business Continuity & Disaster Recovery Policy (Trust Portal Access Required).

## Feature Support[​](#feature-support "Direct link to Feature Support")

### Does Glean on AWS support vanity URLs?

Yes. Vanity URLs, i.e. companyname.glean.com, are supported on AWS.

### Does Glean on AWS have feature parity with other Glean deployment methods?

Glean on AWS has feature parity, with the exception of:

**DLP / Sensitive Content Reporting:** AWS deployments need to setup their own GCP project and upload a DLP-API key to their Glean Protect dashboard in order to use DLP info-types in their sensitive content scans.

**OCR:** OCR is an optional feature and requires a subscription uplift for use. Glean leverages GCP Cloud Vision for OCR capabilities. We are currently investigating the use of a multi-modal local LLM to provide this capability instead.
