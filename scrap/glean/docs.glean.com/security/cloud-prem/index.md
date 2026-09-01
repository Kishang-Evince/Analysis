---
url: "https://docs.glean.com/security/cloud-prem/"
canonical: "https://docs.glean.com/security/cloud-prem/"
title: "Customer-hosted deployment"
description: "Learn how to host Glean in your own GCP or AWS account"
fetched_at: "2026-09-01T13:29:56.251Z"
---
On this page

Choose a customer-hosted deployment on GCP or AWS, review supported security monitoring tools, and find vulnerability reports for Glean-managed container images.

## Choose a cloud provider[​](#choose-a-cloud-provider "Direct link to Choose a cloud provider")

[

### Google Cloud Platform (GCP)

Host Glean in your own GCP account.







](/security/cloud-prem/gcp/)[

### Amazon Web Services (AWS)

Host Glean in your own AWS account.







](/security/cloud-prem/aws/)

## Security monitoring and tooling[​](#security-monitoring-and-tooling "Direct link to Security monitoring and tooling")

You can monitor a customer-hosted Glean deployment with security tools. Glean supports security tools that perform *read-only* monitoring of the cloud environment *without modifying* deployed resources. This includes many Cloud Security Posture Management (CSPM) products.

### Glean and Wiz[​](#glean-and-wiz "Direct link to Glean and Wiz")

For enhanced monitoring, Glean supports [Wiz runtime sensors](https://www.wiz.io/solutions/runtime-sensor). You can install these sensors on all compute resources in the Glean environment.

For information about setting up Wiz sensors, see the following pages:

-   [Wiz sensors in AWS](/security/cloud-prem/aws/wiz-sensor)
-   [Wiz sensors in GCP](/security/cloud-prem/gcp/wiz-sensor)

### Glean and CrowdStrike[​](#glean-and-crowdstrike "Direct link to Glean and CrowdStrike")

For enhanced monitoring, Glean supports CrowdStrike Falcon sensors. You can install these sensors on all compute resources in the Glean environment.

For information about setting up Falcon sensors, see the following pages:

-   [CrowdStrike Falcon sensors in AWS](/security/cloud-prem/aws/crowdstrike-falcon)
-   [CrowdStrike Falcon sensors in GCP](/security/cloud-prem/gcp/crowdstrike-falcon)

## Security vulnerability reports[​](#security-vulnerability-reports "Direct link to Security vulnerability reports")

Glean publishes an **authoritative vulnerability report** with every release. Your security team can use it to see which Common Vulnerabilities and Exposures (CVEs) affect **Glean-managed container images** in your environment, along with severity assessments and remediation status. Each report is exported as both:

-   An interactive **HTML** report
-   A machine-readable **CSV** file

note

You should leverage this report to compare and contrast with your own security tooling to get a full understanding on which vulnerabilities are outstanding and how they rank, along with an estimated ETA for Glean to resolve.

Glean internally leverages Wiz to generate these reports and filters out false positives with notes on our reasoning for making that determination.

Please consult with this **first** before submitting a support ticket should you detect security vulnerabilities in your internal tooling.

These are stored in your deployment's `release-notes` S3 or GCS bucket alongside your regular release notes for each Glean release.

### What the vulnerability report covers[​](#what-the-vulnerability-report-covers "Direct link to What the vulnerability report covers")

The report is scoped to components Glean builds and maintains:

-   Container images built by Glean for services that run in your environment.
-   Only Glean-managed components, not your cloud provider's managed infrastructure.

This is the canonical source for:

-   Which CVEs currently affect Glean-managed images in your deployment.
-   How Glean has rated their severity (often different from generic NVD scores).
-   Whether a fix is already available, planned, or not applicable in your configuration.

The report is updated on every Glean release (about twice a week), so it tracks the current state of Glean-managed images over time.

The vulnerability-report HTML and CSV artifacts are in the same release folder for the given release version that you have installed.
