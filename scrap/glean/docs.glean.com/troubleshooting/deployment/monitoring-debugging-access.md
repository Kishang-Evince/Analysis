---
url: "https://docs.glean.com/troubleshooting/deployment/monitoring-debugging-access"
canonical: "https://docs.glean.com/troubleshooting/deployment/monitoring-debugging-access"
title: "Monitoring and debugging access in customer-hosted deployments"
description: "Understand the logs, IAM roles, and access model Glean uses for monitoring, incident investigation, and operational support in customer-hosted deployments."
fetched_at: "2026-09-01T13:30:08.414Z"
---
On this page

In customer-hosted deployments, customers often want to understand exactly what access Glean needs for monitoring, incident investigation, and operational support.

Glean's access model is centered on two areas:

-   **Operational log visibility** for debugging and production support
-   **Read-only IAM principals** for the `alert-monitoring@glean.com` alias used by Glean's on-call team (GCP), and the `glean-viewer` IAM role for AWS deployments

Important

For operational supportability, customers should ensure that the agreed debugging access path remains available for incident response and production support.

Glean may be unable to investigate issues if a customer removes or blocks Glean's access to the deployment entirely.

## System logs[​](#system-logs "Direct link to System logs")

The following system logs are available in a customer-hosted deployment:

| Log type | Retention | How to access | Notes |
| --- | --- | --- | --- |
| Non-PII logs | 400 days | Viewable by Glean employees for debugging purposes | Available in the Stackdriver or Cloud Logging console for GCP and CloudWatch Log Groups for AWS |
| PII logs | 30 days | Restricted to the AWS/GCP project admins | Stored in the `glean_sensitive_logs_bigquery` and `audit_logs` BigQuery tables for GCP. For AWS, stored in similarly named CloudWatch Log groups and S3 buckets. |

PII in this context includes information such as employee email addresses or permission group names. Glean doesn't log the content stored in the document body.

note

In rare debugging scenarios, Glean employees can look up specific log entries using dedicated debugging APIs. All such access is audit-logged, requires justification, and must be authorized by a small set of Glean engineering leaders.

## User activity logs[​](#user-activity-logs "Direct link to User activity logs")

User activity logs are available for searches and actions performed by a customer's employees in Glean.

| Log location | Retention | Contents | How to access |
| --- | --- | --- | --- |
| `scio-<projectid>-query-endpoint-access` bucket | 270 days | Logs for all search queries, including user identity and query | Not accessible to Glean employees unless the customer has allowed access for debugging |
| `scio-<projectid>-search-query`, `scio-<projectid>-search-result`, `scio-<projectid>-search-result-feedback` buckets | 270 days | Queries, returned results, clicks, and views | Primarily used by ranking pipelines to improve search |

*For log locations in AWS deployments, replace `projectid` with `account id`.*

## Error reporting[​](#error-reporting "Direct link to Error reporting")

Error reporting counts, analyzes, and aggregates crashes in the running cloud services. These stack traces are visible to Glean employees and are used to help diagnose and fix production issues.

## GCP: IAM roles for [alert-monitoring@glean.com](mailto:alert-monitoring@glean.com)[​](#gcp-iam-roles "Direct link to gcp-iam-roles")

Glean provides a fully managed SaaS experience even when the deployment is hosted in a GCP project owned by the customer. To monitor and manage the system efficiently, Glean requests that `alert-monitoring@glean.com` be granted specific read-only IAM permissions.

If a customer doesn't allow standard access to `alert-monitoring@glean.com`, the recommended approach is to create a customer-managed principal and apply the **same bindings** to that principal. This preserves the intended read-only debugging model while allowing the customer to manage approval and access workflows within their own environment.

These permissions don't provide access to customer data stored in **Cloud SQL**, **Kubernetes**, or **Cloud Storage**, and they don't provide access to logs with PII that aren't sent to the Stackdriver Logging Console.

### Custom roles[​](#custom-roles "Direct link to Custom roles")

| Role | Expanded permissions | Purpose |
| --- | --- | --- |
| `roles/glean_cost_reader_v1` | `billing.resourceCosts.get` | Allows the on-call team to access billing information for the project and monitor costs associated with cloud services and usage |
| `roles/glean_dataflow_oncall_v1` | `dataflow.jobs.list`, `dataflow.metrics.get`, `dataflow.jobs.get`, `dataflow.messages.list` | Allows the on-call team to view Dataflow jobs, monitor job status, access performance metrics, and review job-related messages |
| `roles/glean_pubsub_reader_v1` | `pubsub.schemas.get`, `pubsub.schemas.list`, `pubsub.subscriptions.get`, `pubsub.subscriptions.list`, `pubsub.topics.get`, `pubsub.topics.list`, `resourcemanager.projects.get`, `serviceusage.quotas.get`, `serviceusage.services.get`, `serviceusage.services.list` | Grants read-only visibility into Pub/Sub topics, subscriptions, schemas, quota state, and related service metadata |
| `roles/glean_sql_oncall_v1` | `cloudsql.instances.get`, `cloudsql.instances.list` | Allows the on-call team to inspect Cloud SQL instance status and configuration |
| Custom Cloud Trace read-only role | `cloudtrace.insights.get`, `cloudtrace.insights.list`, `cloudtrace.stats.get`, `cloudtrace.tasks.get`, `cloudtrace.tasks.list`, `cloudtrace.traces.get`, `cloudtrace.traces.list` | Enables trace inspection, performance analysis, and debugging using Cloud Trace |

### Predefined roles[​](#predefined-roles "Direct link to Predefined roles")

| Role | Purpose |
| --- | --- |
| `roles/aiplatform.viewer` | Read-only access to AI Platform resources for monitoring models and training jobs |
| `roles/cloudbuild.builds.viewer` | View Cloud Build logs for debugging deployment errors |
| `roles/cloudfunctions.viewer` | View Cloud Functions configuration and metadata |
| `roles/cloudscheduler.viewer` | View scheduled job configuration and status |
| `roles/cloudtasks.viewer` | View Cloud Tasks status and configuration |
| `roles/compute.viewer` | View VM instance status and configuration in Compute Engine |
| `roles/container.viewer` | Monitor Kubernetes Engine and other container resources |
| `roles/errorreporting.viewer` | View and manage application errors reported in Error Reporting |
| `roles/logging.viewer` | View non-PII logs in the Stackdriver Logging console |
| `roles/ml.viewer` | Monitor machine learning resources on AI Platform, including models and job status |
| `roles/monitoring.viewer` | View monitoring data, dashboards, and alerts in Google Cloud Monitoring |
| `roles/run.viewer` | View Google Cloud Run service configuration and status |
| `roles/servicehealth.viewer` | Monitor the health and status of Google Cloud services |
| `roles/workflows.viewer` | View Google Cloud Workflows configuration and execution history |

### Privileged Access Manager (PAM)[​](#privileged-access-manager-pam "Direct link to Privileged Access Manager (PAM)")

For customers who want time-bound elevated access, [Google Cloud's Privileged Access Manager (PAM)](https://cloud.google.com/iam/docs/pam-overview) provides a more controlled just-in-time model than temporary group membership alone.

PAM uses entitlements and grants to let approved Glean engineers request short-lived access to specific roles, with built-in justification, optional customer approval workflows, notifications, audit logs, and automatic revocation at the end of the grant window. Customers can still use Google Groups to control who may request or approve access, while PAM ensures elevated roles are granted only to the individual requester for a limited duration.

Common best practices include:

-   Use narrowly scoped roles
-   Set short TTLs
-   Create a separate break-glass entitlement for emergency cases

## AWS: IAM roles for Glean[​](#aws-iam-roles "Direct link to AWS: IAM roles for Glean")

For AWS deployments, use Glean's standard `glean-viewer` role with view-only, non-sensitive access to observe infrastructure configuration. For customers with stricter access controls, preserve the same `glean-viewer` permissions while gating role assumption through the customer's internal approval mechanism.

## Anonymized logs sent to Glean's central server[​](#anonymized-logs-sent-to-gleans-central-server "Direct link to Anonymized logs sent to Glean's central server")

For analytics purposes, Glean sends anonymized non-PII logs from the customer project to Glean's central server.

| Aspect | Details |
| --- | --- |
| Data sent | Anonymized non-PII logs |
| Sanitization | User IDs, document URLs, query terms, and other PII are scrubbed and hashed before export |
| Export mechanism | A GCP log sink exports the anonymized logs from the customer project to a BigQuery table in a locked-down Glean-managed GCP project |
| Purpose | Correlating tools within search sessions and supporting analytics without exposing user, query, or document details |

The logs are anonymized at creation time through a sanitization process in Glean code before they're exported.

## FAQ[​](#faq "Direct link to FAQ")

### Do these IAM principals allow Glean to access customer data?

No. The requested permissions don't provide access to customer data stored in Cloud SQL and RDS, Kubernetes, or Cloud Storage and S3, and they don't provide access to logs with PII. Mechanisms that store sensitive logs (not sent to Stackdriver) can't be viewed or retrieved through these principals.

### Does Glean log document body content?

No. Glean doesn't log the content stored in the document body in non-sensitive logs.

### Are user activity logs accessible to Glean by default?

No. User activity logs aren't accessible to Glean employees unless the customer has explicitly allowed access for debugging purposes.

## See also[​](#see-also "Direct link to See also")

-   [Support and troubleshooting in customer-hosted Glean environments](/troubleshooting/deployment/support-troubleshooting-in-restricted-glean-environments)
-   [Customer-hosted deployment](/security/cloud-prem)
