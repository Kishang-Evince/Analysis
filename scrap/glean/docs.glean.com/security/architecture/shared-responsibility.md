---
url: "https://docs.glean.com/security/architecture/shared-responsibility"
canonical: "https://docs.glean.com/security/architecture/shared-responsibility"
title: "Shared responsibility model"
description: "Essential security practices and responsibilities for Glean tenant administrators"
fetched_at: "2026-09-01T13:29:55.733Z"
---
On this page

As a Glean administrator, you are responsible for implementing and maintaining specific security practices to ensure the safe and effective operation of your Glean tenant. This guide outlines your key responsibilities across different areas of tenant management.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Confirm that you have Glean **Admin console** access with permissions to add and configure connectors, along with the administrator permissions required in your organization’s SSO provider.

## Procedure[​](#procedure "Direct link to Procedure")

Review each responsibility and apply the controls that match your Glean deployment model.

## Employee access controls[​](#employee-access-controls "Direct link to Employee access controls")

warning

Proper access control management is critical for maintaining the security of your Glean environment. Administrators must actively manage user access and authentication policies.

### SSO and Authentication[​](#sso-and-authentication "Direct link to SSO and Authentication")

### SSO access policy

Ensure your Single Sign-On (SSO) access policy aligns with organizational security protocols, including:

-   Multi-Factor Authentication (MFA) implementation
-   Trusted Location designation
-   Regular policy review and updates

### Access restriction

Maintain strict control over user authentication by:

-   Limiting SSO access to authorized Glean users only
-   Implementing proper authentication gates
-   Regularly auditing user access permissions

### User management[​](#user-management "Direct link to User management")

1

Terminated user management

Implement processes for immediate removal of terminated employees and contractors from the SSO provider configured with Glean to prevent unauthorized access.

2

Role-Based Access Control (RBAC)

Establish and maintain clear policies for:

-   Administrator role assignments
-   Permission scope definition
-   Access level restrictions based on job responsibilities
-   Regular review of admin permissions

3

IP Access Control

If your users access Glean from specific IP ranges, for example through a VPN:

-   Configure appropriate IP Allowlists
-   Maintain up-to-date IP address/range documentation
-   Regularly review and update allowed IP ranges

## Connector integrations[​](#connector-integrations "Direct link to Connector integrations")

info

Proper management of connector integrations is essential for maintaining secure and reliable data access within Glean.

### Security best practices[​](#security-best-practices "Direct link to Security best practices")

### Credential management

Implement regular rotation schedules for:

-   API keys
-   Access tokens
-   Integration secrets
-   Other authentication credentials

### Service account usage

Prioritize service accounts over individual credentials:

-   Set up dedicated service accounts for integrations
-   Maintain proper documentation of service account usage
-   Regularly audit service account permissions

## Customer hosted environments[​](#customer-hosted-environments "Direct link to Customer hosted environments")

info

Organizations hosting Glean within their own cloud infrastructure have additional security responsibilities.

[

### Customer hosted security guidelines

For organizations hosting Glean in their own GCP or AWS environment, review the complete set of additional security considerations and responsibilities in the customer-hosted deployment documentation.







](/security/cloud-prem/gcp/)
