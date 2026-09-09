---
url: "https://docs.glean.com/get-started/prepare/self-hosted-deployment/aws/supported-aws-regions"
canonical: "https://docs.glean.com/get-started/prepare/self-hosted-deployment/aws/supported-aws-regions"
title: "Supported AWS regions and services"
description: "The infrastructure and services required by Glean are not available in every AWS region. This document covers the AWS services required by Glean for successful deployment in each region."
fetched_at: "2026-09-01T13:29:50.406Z"
---
On this page

note

Glean does not currently support GovCloud regions.

## Required AWS Services[​](#required-aws-services "Direct link to Required AWS Services")

When deciding on deployment region for your Glean deployment, you must ensure that all AWS services required by Glean are available for use in your environment.

| Service | Required | VPC Endpoint Support |
| --- | --- | --- |
| Amazon Athena | Yes | Opt-in |
| Amazon Bedrock and Bedrock Runtime | No - Required only if Claude is the selected LLM | Opt-in |
| AWS Certificate Manager (ACM) | Yes | Opt-in |
| AWS CloudFormation | Yes | Opt-in |
| AWS CloudTrail | No - Only used by debug roles for troubleshooting and can be blocked | Not available |
| AWS CodeBuild | Yes | Opt-in |
| DynamoDB | Yes (only used for Terraform state locking) | Default enabled |
| Amazon Elastic Block Store (Amazon EBS) | Yes | Opt-in |
| Amazon Elastic Compute Cloud (Amazon EC2) | Yes | Opt-in |
| Amazon Elastic Container Registry (Amazon ECR and DKR) | Yes | Opt-in |
| Amazon Elastic Kubernetes Service (Amazon EKS) | Yes | Opt-in |
| Amazon ElastiCache | Yes | Opt-in |
| Elastic Load Balancing/Application Load Balancing (ELB/ALB) | Yes | Opt-in |
| Glue | Yes | Opt-in |
| AWS Key Management Service (AWS KMS) | Yes | Opt-in |
| Kinesis Firehose | Yes | Opt-in |
| AWS IAM | Yes | Opt-in |
| AWS Lambda | Yes | Opt-in |
| AWS Pricing API | No | Opt-in |
| Amazon CloudWatch Events | No | Opt-in |
| Amazon CloudWatch Metrics and Logs | Yes | Opt-in |
| Amazon Relational Database Service (Amazon RDS & Performance Insights) | Yes | Opt-in |
| AWS Resource Access Manager (RAM) | No - only if sharing TGW for on-prem connectivity | Opt-in |
| Amazon Simple Storage Service (Amazon S3) | Yes | Default enabled |
| Amazon SageMaker | Yes (see below for specifics) | Opt-in |
| AWS Secrets Manager | Yes | Opt-in |
| AWS Service Quotas | No | Opt-in |
| AWS Shield | No | Opt-in |
| AWS Signer | Yes | Not available |
| Amazon Simple Notification Service (Amazon SNS) | Yes | Opt-in |
| Amazon Simple Queue Service (Amazon SQS) | Yes | Opt-in |
| STS | Yes | Opt-in |
| AWS Systems Manager (Session Manager only w/ SSM Messages and EC2 Messages) | Yes | Default enabled |
| Amazon Textract | No | Not available |
| Amazon Virtual Private Cloud (Amazon VPC) | Yes | Not available |
| AWS WAFv2 | Yes | Opt-in |

note

Glean uses [AWS VPC endpoints](https://docs.aws.amazon.com/vpc/latest/privatelink/create-interface-endpoint.html) to keep AWS API traffic internal within a VPC. **Default enabled** endpoints (DynamoDB, S3, SSM, SSM Messages, EC2 Messages) are always provisioned. **Opt-in** endpoints can be enabled upon request - note that VPC endpoints [incur additional cost](https://aws.amazon.com/privatelink/pricing/). Contact Glean if you would like to enable any optional endpoints or request support for a service not listed above.

### Amazon Bedrock[​](#amazon-bedrock "Direct link to Amazon Bedrock")

Amazon Bedrock is only required if you wish to use Anthropic's Claude models for your organization's selected LLM. If so, you must ensure that the following models are present in Bedrock for your selected region (Glean does not support the region if these models are not available):

-   Claude Sonnet 4.6
-   Claude Haiku 4.5
-   Amazon Titan Embeddings G1 - Text

More information: [Model Support by AWS Region (docs.aws.amazon.com)](https://docs.aws.amazon.com/bedrock/latest/userguide/models-regions.html)

### Amazon SageMaker[​](#amazon-sagemaker "Direct link to Amazon SageMaker")

For Amazon Sagemaker, Glean requires that the following resource types be available in region:

-   ml.p3.16xlarge (NVIDIA V100 Multi GPU machines)
-   ml.g4dn.xlarge
-   ml.m5.2xlarge (deployments under 50M documents)
-   ml.m5.4xlarge (deployments over 50M documents)
