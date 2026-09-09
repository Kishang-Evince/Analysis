---
url: "https://docs.glean.com/security/cloud-prem/gcp/elevated-access"
canonical: "https://docs.glean.com/security/cloud-prem/gcp/elevated-access"
title: "Elevated access via impersonation"
description: "How Glean uses GCP service account impersonation for secure, auditable, time-bound elevated access to customer-hosted deployments"
fetched_at: "2026-09-01T13:29:57.820Z"
---
On this page

Glean uses [GCP service account impersonation](https://cloud.google.com/iam/docs/service-account-impersonation) for elevated access to customer-hosted GCP deployments. This approach replaces static service account keys with short-lived, identity-preserving credentials, giving your security team full visibility into every action Glean personnel take in your project.

## How it works[​](#how-it-works "Direct link to How it works")

When a Glean engineer requires elevated access to your GCP project - for example, to investigate an infrastructure issue or perform a maintenance operation - the following flow is used:

1.  The engineer submits an access request through Glean's internal access-management system.
2.  The request is reviewed and approved by Glean management or on-call leadership.
3.  Upon approval, the engineer receives **time-bound impersonation privileges** (typically 1 hour, extensible up to 3 hours) on a central, Glean-owned service account dedicated for your Glean instance.
    -   These service accounts have the following naming convention: `glean-admin-<obfuscated customer id>@glean-admin-provisioning.iam.gserviceaccount.com`
    -   These service accounts have the permanent ability to impersonate the relevant admin account within your Glean project, for example `glean-admin@<customer project>.iam.gserviceaccount.com`
4.  The engineer uses chained [GCP service account impersonation](https://cloud.google.com/iam/docs/service-account-impersonation) to assume the admin service account in your project via the dedicated central account. All API calls are made using **short-lived access tokens** that expire quickly and preserve the end user's true identity.
5.  When the task is complete or the grant expires, the impersonation access is revoked automatically.

At no point are long-lived credentials stored or transmitted. The impersonation chain ensures that every action is tied back to the individual Glean engineer who performed it.

## What this means for your security posture[​](#what-this-means-for-your-security-posture "Direct link to What this means for your security posture")

This model provides several security improvements:

-   **No static keys**: Glean does not hold or store any long-lived service account keys for elevated access. Short-lived credentials are generated on demand and expire automatically.
-   **Identity-preserving audit trail**: Every API call made through impersonation records the identity of the individual Glean engineer in your [GCP audit logs](https://cloud.google.com/logging/docs/audit). This replaces the previous model where actions appeared under a shared service account identity.
-   **Time-bound access**: Impersonation grants are short-lived and automatically revoked. Engineers cannot retain elevated access beyond the approved window.
-   **Centralized access control** - All impersonation grants are managed through Glean's internal access-management system, which enforces approval workflows and logs all requests.

## Audit log visibility[​](#audit-log-visibility "Direct link to Audit log visibility")

When a Glean engineer uses impersonation to access your project, GCP audit logs capture the full impersonation chain. You can identify and monitor these actions by looking for the `serviceAccountDelegationInfo` field in your audit log entries.

To query for elevated, impersonation-based access from the Glean team in your project, you can use the following Cloud Logging filter (assuming the relevant IAM audit logs are enabled):

```
protoPayload.authenticationInfo.serviceAccountDelegationInfo.firstPartyPrincipal.principalEmail:"@glean-admin-provisioning.iam.gserviceaccount.com"
```

The `protoPayload.authenticationInfo.serviceAccountDelegationInfo` field in these logs reveals the full impersonation chain used during the elevated access calls. The last entry in the chain should reveal the true end user's identity with a glean.com email.

Here's what a sample audit log looks like:

```
{  "protoPayload": {    "@type": "type.googleapis.com/google.cloud.audit.AuditLog",    "status": {},    "authenticationInfo": {      "principalEmail": "glean-admin@customer-project.iam.gserviceaccount.com",      "serviceAccountDelegationInfo": [        {          "firstPartyPrincipal": {            "principalEmail": "glean-admin-877ca5f02f2728a17b@glean-admin-provisioning.iam.gserviceaccount.com"          }        },        {          "firstPartyPrincipal": {            "principalEmail": "named-engineer@glean.com"          }        }      ],      "principalSubject": "serviceAccount:glean-admin@customer-project.iam.gserviceaccount.com",      ...    },    ...  },  ...}
```

## Customer controls[​](#customer-controls "Direct link to Customer controls")

You retain full control over access to your GCP project. Specifically, you can leverage [**VPC Service Controls**](https://cloud.google.com/vpc-service-controls/docs/overview) to ensure that only the relevant central Glean-owned account can perform the impersonation flow as described above. Please contact your Glean account representative for more specifics around these controls.

warning

Restricting Glean's access to your environment may impact Glean's ability to deploy updates, troubleshoot issues, and meet Service Level Agreements (SLAs). Contact your Glean account team before making changes to access controls that affect Glean service accounts, including any and all VPC Service Control changes.

## Related resources[​](#related-resources "Direct link to Related resources")

-   [Managing the GCP service account with Owner role](/security/cloud-prem/gcp/owner-role) - Details on the service account used for initial deployment and ongoing maintenance.
-   [GCP service account impersonation (Google documentation)](https://cloud.google.com/iam/docs/service-account-impersonation)
-   [Monitoring service account usage patterns (Google documentation)](https://cloud.google.com/iam/docs/service-account-monitoring)
