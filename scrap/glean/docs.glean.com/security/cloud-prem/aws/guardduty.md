---
url: "https://docs.glean.com/security/cloud-prem/aws/guardduty"
canonical: "https://docs.glean.com/security/cloud-prem/aws/guardduty"
title: "AWS GuardDuty and Glean"
description: "How to enable AWS GuardDuty for your Glean AWS account for intrusion detection, and what Glean configures when you do."
fetched_at: "2026-09-01T13:29:56.996Z"
---
On this page

Glean supports [AWS GuardDuty](https://aws.amazon.com/guardduty/features/) as an intrusion detection option for customers who host Glean in their own AWS environment. GuardDuty analyzes traffic and logs against AWS-managed threat intelligence to produce ranked security findings, alerting on suspicious activity and potential breaches in your cloud infrastructure.

## Supported data sources[​](#supported-data-sources "Direct link to Supported data sources")

The following [GuardDuty foundational data sources](https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_data-sources.html) work with Glean:

-   **CloudTrail management event analysis** — provides visibility into how AWS API calls are used in the account, including detections for suspicious API usage and some IAM credential exfiltration. See the [IAM finding types](https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_finding-types-iam.html).
-   **Network intrusion detection (NIDS) via VPC Flow Log analysis** — detects suspicious network activity that can indicate a compromise, such as instances communicating with command-and-control systems. You do not need to enable VPC Flow Logs. GuardDuty manages this automatically. See the [EC2 finding types](https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_finding-types-ec2.html).
-   **DNS log analysis** — detects DNS queries that suggest instances are communicating with suspicious systems. See the [EC2 finding types](https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_finding-types-ec2.html).

## Enable GuardDuty[​](#enable-guardduty "Direct link to Enable GuardDuty")

GuardDuty is enabled by the customer. Ensure that GuardDuty is enabled for the Glean AWS account:

-   If you enable GuardDuty through **AWS Organizations**, the Glean AWS account inherits those settings
-   If you do not use AWS Organizations, enable GuardDuty directly in the Glean AWS account

Once you enable GuardDuty for the account, Glean adds a finding publishing destination that automatically exports findings to an S3 bucket every 15 minutes. This bucket has a lifecycle policy that deletes findings after 180 days (twice GuardDuty's 90-day retention period). Glean also provisions a KMS key, which GuardDuty requires to publish findings to S3.

For the NIDS capability, GuardDuty automatically analyzes the traffic and generates findings as appropriate. See the [AWS GuardDuty documentation](https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_data-sources.html#guardduty_vpc) to learn more.

## Monitoring and alerts[​](#monitoring-and-alerts "Direct link to Monitoring and alerts")

Monitoring and alerting on GuardDuty findings is the customer's responsibility. For findings rated **High**, work with Glean's support and security teams to address them.

## Cost[​](#cost "Direct link to Cost")

GuardDuty pricing is largely based on volume. Consult the [AWS GuardDuty pricing documentation](https://aws.amazon.com/guardduty/pricing/) for the current pricing structure.

Additional cost implications include the 180-day finding storage in S3 and the KMS key that encrypts the delivered findings. See the AWS S3 and KMS pricing pages for details.
