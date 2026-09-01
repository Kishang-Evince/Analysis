---
url: "https://docs.glean.com/security/cloud-prem/aws/log-monitoring"
canonical: "https://docs.glean.com/security/cloud-prem/aws/log-monitoring"
title: "Log monitoring for AWS environments"
description: "Learn which AWS logs Glean collects and how to review their sensitivity."
fetched_at: "2026-09-01T13:29:57.008Z"
---
On this page

Review the logs that Glean collects in an AWS customer-hosted environment. This page explains which logs you can export to Security Information and Event Management (SIEM) tools and which logs contain sensitive data.

Glean uses AWS CloudWatch log groups and S3 buckets to store and process logs. These logs remain in your AWS account, where you can inspect them at any time.

note

Limit access to the Glean environment in AWS. S3 and CloudWatch can store sensitive data, so restrict access to these resources. Also restrict access that can modify Identity and Access Management (IAM) permissions in the Glean account.

## Audit log[​](#audit-log "Direct link to Audit log")

Glean stores all audit logs in the `audit-log` CloudWatch log group. Integrate this log group with your SIEM to alert on and analyze user activity on the Glean platform. Because it is a CloudWatch log group, you can use AWS-native tools or AWS-native SIEM ingestion mechanisms to obtain the logs.

## Sensitive logs[​](#sensitive-logs "Direct link to Sensitive logs")

Glean stores logs that may contain sensitive data. These logs should not leave the Glean environment.

Glean provides a report in JSON and Markdown formats that identifies the CloudWatch log groups and S3 buckets containing sensitive and non-sensitive data. To obtain the report, you need AWS credentials from the Glean AWS account to pull content from the `glean-terraform-deploy-packages` S3 bucket.

The zip file contains the full Terraform deployment package for Glean. Use the following commands to retrieve it:

```
# Run this command with AWS credentials for your Glean AWS account# Get the latest stable release versionRELEASE_VERSION=$(aws secretsmanager get-secret-value \  --secret-id arn:aws:secretsmanager:us-east-1:518642952506:secret:glean-stable-external-release-version-e1R7Yq \  --region us-east-1 \  --query 'SecretString' \  --output text)# Fetch the zipped release notesaws s3 cp s3://glean-terraform-deploy-packages/full_terraform_deploy_${RELEASE_VERSION}.zip .
```

After you unzip the file, the report will be available in the following locations:

-   CloudWatch:
    -   Markdown: `terraform/glean.com/docs/aws/glean_cloudwatch_logging_resources.md`
    -   JSON: `terraform/glean.com/docs/aws/glean_cloudwatch_logging_resources/cloudwatch_log_group_sensitivity.json`
-   S3:
    -   Markdown: `terraform/glean.com/docs/aws/glean_s3_resources.md`
    -   JSON: `terraform/glean.com/docs/aws/glean_cloudwatch_logging_resources/s3_sensitivity.json`

The JSON file is useful if you want to automate log collection for non-sensitive resources.

## See also[​](#see-also "Direct link to See also")

-   [Customer-hosted deployment](/security/cloud-prem)
-   [AWS account access and deployment model](/security/cloud-prem/aws/account-access-and-deployment-model)
-   [AWS cost reduction recommendations](/security/cloud-prem/aws/cost-controls)
