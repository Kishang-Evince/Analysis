---
url: "https://docs.glean.com/security/architecture/service-restoration-access"
canonical: "https://docs.glean.com/security/architecture/service-restoration-access"
title: "Service restoration access"
description: "Learn how Glean restores business continuity during rare incidents and outages"
fetched_at: "2026-09-01T13:29:55.559Z"
---
On this page

Glean provides a secure, audited, and time limited service restoration process. This mechanism allows engineers on call to restore services during rare, serious incidents when normal administrative paths are unavailable. The process maximizes safety and business continuity, without granting persistent access or exposing customer data.

### Infrastructure and security[​](#infrastructure-and-security "Direct link to Infrastructure and security")

Administrators approve infrastructure commands in advance, and an isolated backend service automatically executes them using service account credentials with limited privileges.

-   **Restricted access:** Engineers submit commands through an internal portal accessible only to approved production personnel.
-   **Mandatory approval:** Every command requires peer review and approval before execution.
-   **Zero direct access:** Employees don't have direct permissions to execute commands through this service account.
-   **Framework isolation:** This process operates independently from Glean’s Debug Operation request handling framework.

## Key advantages[​](#key-advantages "Direct link to Key advantages")

**Business continuity:** During rare outages, the service mitigates incidents even when those outages impair standard paths, such as vault keys or administrator controls. **Security by design:** Enforces security through zero persistent entitlements, a narrow tool scope, and strict traceability. **Operational accountability:** Provides transparent auditing for every request, approval, and command.

## Architectural and security specifications[​](#architectural-and-security-specifications "Direct link to Architectural and security specifications")

-   **Isolated execution environment:** A lightweight, fully isolated service that runs within the same Kubernetes cluster but operates in a separate namespace from the main application. This separation reduces the attack surface and maintains operational independence.
-   **Short-lived credentials with limited privileges:** The system generates credentials with a short lifetime scoped exclusively to infrastructure commands, for example, `kubectl`, `gcloud`, `aws`, and `az`. These credentials explicitly deny access to customer data stores.
-   **Zero standing privileges:** Glean doesn't maintain persistent service restoration access. The system creates access when needed, limits usage to a minimum duration, and ensures automatic expiration.
-   **Auditable approval workflow:** Requests require justification and approval by an authorized second party. This separate approval follows the `two person rule` and prevents self approval.
-   **Immutable auditing:** The system logs every tool, including the requester, approver, execution details, timestamps, and justification, to a cloud provider audit log designed to detect tampering. Logs are available to customers upon request.

## Scope and restrictions[​](#scope-and-restrictions "Direct link to Scope and restrictions")

| Area | Not included |
| --- | --- |
| Data access | Prohibits direct access to customer data stores. |
| Persistent access | No long-lived credentials, backdoors, or standing entitlements. |
| Routine ops | Excludes routine maintenance and convenience tasks. |
| One person control | Prevents any single actor from both requesting and approving access. |

## How it works[​](#how-it-works "Direct link to How it works")

-   **Request**: An on-call engineer submits a service restoration request through Glean’s internal admin UI, including a justification and an intended timeout.
    
-   **Approval**: A separate authorized production engineer or manager (Glean employee) reviews and approves or rejects the request. Approval is required before any command can be executed.
    
-   **Execution in isolation:** Upon receiving an approved command payload, the isolated service automatically executes the vetted infrastructure command by using a service account with limited privileges. Access to customer data is explicitly denied by policy.
    
-   **Audit everywhere**: The system logs the unique request identifier, requester, approver, timestamps, commands, and outcomes in an immutable audit store.
    

## Customer safeguards by design[​](#customer-safeguards-by-design "Direct link to Customer safeguards by design")

-   **Strong separation of duties** with the two person rule.
    
-   **Explicitly deny** data store access for querying or viewing customer data.
    
-   **Short-lived execution credentials** that automatically expire.
    
-   **Full transparency** through immutable audit logs ordered by time.
    
-   **Principle of least privilege** applied to all service restoration access tools.
    
-   **No shared infrastructure** between the service restoration access service and the application runtime to minimize the impact of a security incident.
    

## Permissions granted to the service[​](#permissions-granted-to-the-service "Direct link to Permissions granted to the service")

The following roles support troubleshooting and administration beyond the access that on-call engineers have by default.

Cloud service account “service-restoration-gke” with roles:

-   Kubernetes Engine Developer
-   Dataflow Developer
-   Custom Cloud Build Developer
-   App Engine Service Admin
-   Cloud SQL Admin
-   Service Usage Admin
-   Cloud Run Admin
-   Cloud Scheduler Admin
-   Cloud Functions Admin
-   Cloud Tasks Admin
-   Redis Admin
-   IAM Role Viewer
-   Service Account Viewer
-   Compute Viewer
-   Compute Network User
-   Compute Load Balancer Viewer
-   DNS Reader

Kubernetes service account `service-restoration-gke` on glean-cluster only with role:

-   Kubernetes Cluster Admin

## Blocked operations[​](#blocked-operations "Direct link to Blocked operations")

The service restoration blocks all commands that could expose customer data:

**Database access**

-   Direct database connections (mysql, psql, redis-cli)
-   Database dumps and backups (mysqldump, pg\_dump)
-   Data export and import operations

**Object storage**

-   Google Cloud Storage (gsutil, gcloud storage)
-   AWS S3 (aws s3, s3api, s3control)
-   Azure Blob Storage (az storage)
-   Third-party storage tools (rclone, MinIO)

**File operations**

-   Reading sensitive file types (.sql, .db, .json, .csv, .parquet, .log)
-   File transfers (ssh, scp, rsync)

**Secrets and credentials**

-   Viewing secrets (kubectl get secret, gcloud secrets, aws secretsmanager, az keyvault)

**Command chaining**

-   The system blocks shell operators, including pipes, semicolons, and backgrounding, to prevent bypass attempts

This capability is part of Glean’s standard reliability and safety controls to ensure service is restored under adverse conditions. Learn more about Glean’s access to customer deployments in the [Trust Center resources](https://trust.glean.com/resources).

## Frequently asked questions[​](#frequently-asked-questions "Direct link to Frequently asked questions")

### When will the service restoration feature be GA?

It's planned to be fully released with the last release on February 19, 2026.

### When will service restoration access be used?

Operators use this capability only during high-severity incidents when normal administrative paths are unavailable and fast remediation is required to restore service.

### Can any Glean employee use it?

No. Only on-call engineers can request access, and only authorized personnel can approve. A single person cannot both request and approve.

### Can it access our data?

No. Service restoration credentials are explicitly denied access to data stores. They are scoped for infrastructure operations only.

### What's logged?

Requester, approver, timestamps, unique request ID, justification, commands executed, parameters, and results, all in a store designed to detect tampering.

### What if a service restoration tool needs more time?

The default session is time limited. Extending it requires a new request and fresh approval, which renews the two person control and audit trail.
