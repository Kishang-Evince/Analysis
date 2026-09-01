---
url: "https://docs.glean.com/security/cloud-prem/gcp/faq"
canonical: "https://docs.glean.com/security/cloud-prem/gcp/faq"
title: "GCP Frequently Asked Questions (FAQ)"
description: "Answers to common questions about Glean's customer-hosted GCP deployment, including service account access, project owner roles, and ongoing tenant management."
fetched_at: "2026-09-01T13:29:58.078Z"
---
On this page

These answers to frequently asked questions about Glean's customer-hosted GCP deployment explain the service account and project owner role that Glean uses to build your environment, whether you can revoke the credentials you provide, and how Glean manages your tenant after the initial build.

### I don't want to provide Glean with a service account and/or project owner role. Can I build everything myself?

No. Glean utilizes Infrastructure as Code (IaC) and as such, all our build systems are automated. This ensures consistency, reliability, and security in our deployments.

### What can Glean access in my environment with the service account with project owner role?

A service account that is generated with an owner role for a specific project in Google Cloud Platform (GCP) is limited to the resources and services within that specific project. It does not have permissions to access or modify resources outside of that project, even if it's within the same GCP tenant.

The permissions of a service account are defined by the roles that are granted to it. **The owner role grants full access to all resources in the project where it is assigned, but it does not extend to other projects in the GCP tenant.**

For more information, see [GCP service account with owner role](/security/cloud-prem/gcp/owner-role).

### Can I revoke or delete the service account and associated JSON key after the build is complete?

Yes. As part of the build, Glean automatically creates a maintenance service account that is used by our systems to automatically manage, update, and patch your environment. The original JSON key and associated account that you provided Glean can be revoked.

### I don't want Glean to access the completed build at all for security reasons. Can I revoke the maintenance account as well?

No. Glean requires this account to roll updates to your tenant, including new features and security fixes.

warning

Deliberately restricting or blocking Glean's access to your tenant will void Glean's Service and Support SLAs, and will impact the ability of our support teams to assist you when troubleshooting issues.

Glean is not a traditional self-hosted service. Your Glean tenant is run as a managed service by Glean and is kept up to date alongside our SaaS tenants and infrastructure. Glean requires appropriate access to provide ongoing management of your tenant's services, and this access is provided through the maintenance service account.

## See also[​](#see-also "Direct link to See also")

-   [About customer-hosted GCP](/security/cloud-prem/gcp)
-   [GCP service account with owner role](/security/cloud-prem/gcp/owner-role)
-   [Elevated access on GCP](/security/cloud-prem/gcp/elevated-access)
