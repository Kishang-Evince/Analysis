---
url: "https://docs.glean.com/get-started/prepare/self-hosted-deployment/gcp/deploy-gcp"
canonical: "https://docs.glean.com/get-started/prepare/self-hosted-deployment/gcp/deploy-gcp"
title: "GCP deployment guide"
description: "Deploying Glean within your own Google Cloud Platform (GCP) environment can ensure compliance with your organization's data residency requirements while maintaining Glean's managed service model."
fetched_at: "2026-09-01T13:29:50.393Z"
---
On this page

## Overview[​](#overview "Direct link to Overview")

Glean provides customers the ability to deploy Glean software inside their own Google Cloud Platform (GCP) project. This deployment requires your GCP admin to:

1.  Create a new GCP project.
2.  Associate a valid billing account.
3.  Enable applicable GCP APIs.
4.  Request the required quota increases from GCP.
5.  Create a Service Account with Project Owner role and associate a JSON account key.
6.  Notify Glean of the GCP zone selected, the Project Name, Project ID, Project Number, and the service account JSON key.

After completing the above, Glean's systems will automatically build and deploy the required compute, workflows, and software into your GCP project.

At this stage, Glean will advise you that your tenant is ready; allowing your admins to proceed with the setup process in our [Getting Started guide](/get-started/welcome).

This document will cover the steps required by your GCP admins to prepare a GCP project that is ready for your Glean build.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before you begin, make sure you have a GCP project, an associated billing account, and access to the GCP settings needed to enable APIs and request quota increases.

* * *

## 1\. Select a GCP region[​](#1-select-a-gcp-region "Direct link to 1. Select a GCP region")

You must first select a supported GCP region for Glean to build your environment in.

-   More information: [Supported GCP Regions](/get-started/prepare/self-hosted-deployment/gcp/supported-gcp-regions)

You must notify Glean of the GCP **zone** selected, for example, `asia-northeast1-a`

warning

The region selected cannot be changed once your tenant has been built. Changing region will require a complete rebuild of your tenant.

## 2\. Create the GCP project[​](#2-create-the-gcp-project "Direct link to 2. Create the GCP project")

1.  Go to the [Manage resources](https://console.cloud.google.com/cloud-resource-manager) page in the GCP console and click **Create Project**.
    
2.  In the New Project window that appears, add a project name, organization, and location.
    
    -   For the project name, the preferred format is `glean-{customer name}` or `glean-{customer name}-{prod/sandbox}`
    -   For example, `glean-company` or `glean-company-prod`
3.  Make sure that your project is created under the same organization as your Google Workplace account, and **not** "No Organization".
    

warning

Glean is not able to proceed with the build if the project is created under "No Organization". If you are unsure of how to resolve this, please contact your GCP account team or GCP support.

4.  Save the Project ID (which is directly below the Project name) and Project Number.
    
5.  Click **Create**.
    
6.  Notify Glean of the following information:
    
    a. Project name, eg `glean-company` → This was set in Step 2 above.
    
    b. Project ID, eg `glean-company` → This was saved in Step 4 above.
    
    c. Project number, eg `715000000000` → This was saved in Step 4 above.
    
    d. Region and Zone where you want to deploy Glean, for example, `us-central1-a`
    

## 3\. Configure billing[​](#3-configure-billing "Direct link to 3. Configure billing")

1.  Go to [Billing](https://console.cloud.google.com/billing/linkedaccount) in the GCP console.
    
2.  Click **Link a billing account** to set up billing for this project.
    

warning

Ensure that the billing account has a corporate credit card attached to it. Using the "free trial billing tier" will not work.

## 4\. Review organization policies[​](#4-review-organization-policies "Direct link to 4. Review organization policies")

Organization policies can prevent Glean's project setup from creating resources or granting required permissions. Review these policies with your organization administrator before setup. The project setup script manages the policies listed below. After setup completes, you can restore policies marked **Yes** only after confirming that the deployment succeeds. Restoring a policy can block future deployments or changes.

For more information, see [Google Cloud organization policy constraints](https://cloud.google.com/resource-manager/docs/organization-policy/org-policy-constraints).

### Policies with hard requirements[​](#policies-with-hard-requirements "Direct link to Policies with hard requirements")

The following policies are hard requirements in the deployment configuration. The **Restore after setup?** column reflects the `can_be_restored_after_setup` setting; do not restore policies marked **No** after setup.

| Constraint | Required setting | Restore after setup? | Why Glean needs it |
| --- | --- | --- | --- |
| `cloudfunctions.allowedIngressSettings` | Allow `ALLOW_ALL`, `ALLOW_INTERNAL_AND_GCLB`, or `ALLOW_INTERNAL_ONLY`. | No | Glean's Continuous Deployment project invokes the `deploy_build` Cloud Function for weekly releases. |
| `cloudfunctions.allowedVpcConnectorEgressSettings` | Allow `ALL_TRAFFIC`. | No | Glean's `deploy_build` Cloud Function invokes Cloud Run services with open egress. |
| `compute.requireOsLogin` | Set `enforce` to `false`. | Yes | Glean must update virtual machine metadata during setup. |
| `compute.restrictNonConfidentialComputing` | Set `allowAll` to `true`. | No | Glean does not currently use Confidential Computing virtual machines. |
| `compute.disableGlobalCloudArmorPolicy` | Set `enforce` to `false`. | No | Glean's security policies are global policies. |
| `iam.managed.disableServiceAccountKeyCreation` | Set `enforce` to `false`. | Yes | Setup requires a `google-tools` service-account key. |
| `compute.restrictVpcPeering` | Allow peering with `folders/832634261155` and `folders/391150242170`. | Yes | Glean uses Google-managed Cloud SQL and Google Kubernetes Engine services that require private peering with Google's private API services. |
| `compute.restrictVpnPeerIPs` | Set `allowAll` to `true`. | Yes | The deployment flow creates a deployment VPC and peers it with the default VPC using a VPN tunnel. |
| `compute.restrictLoadBalancerCreationForTypes` | Allow `EXTERNAL_HTTP_HTTPS` and `INTERNAL_HTTP_HTTPS`. | Yes | Glean uses both external and internal HTTP/HTTPS load balancers. |
| `compute.trustedImageProjects` | Allow images from `projects/cloud-dataflow`, `projects/cloudsql-docker`, `projects/cos-cloud`, `projects/serverless-vpc-access-images`, and `projects/scio-engineering`. | No | Glean services use images from these projects. |
| `gcp.resourceLocations` | Allow `{{PRIMARY_MULTI_REGION}}`, `{{PRIMARY_REGION}}`, and `{{SECONDARY_REGION}}`. | Yes | Glean creates resources in the primary and secondary regions for multi-region deployments. If the primary region is `us-central1`, also allow `us-central2` because Cloud Tasks requires both regions, even when queues are created only in `us-central1`. |
| `iam.allowedPolicyMemberDomains` | Allow the Glean domain ID `C00vrnlo8`. | Yes | Setup grants selected read-only permissions to Glean's monitoring and support group. |
| `iam.disableServiceAccountKeyCreation` | Set `enforce` to `false`. | No | Setup creates deployer and OpenSearch service-account keys and rotates them every 90 days. |
| `iam.disableWorkloadIdentityClusterCreation` | Set `enforce` to `false`. | No | Glean's Google Kubernetes Engine cluster requires Workload Identity. |
| `compute.restrictCloudNATUsage` | Allow `ALLOW_ALL`. | No | Glean uses Cloud NAT to access the internet. |
| `run.allowedIngress` | Allow `ALLOW_ALL`, `ALLOW_INTERNAL_AND_GCLB`, or `ALLOW_INTERNAL_ONLY`. | No | Glean's Continuous Deployment project invokes the `deploy_build` Cloud Function for weekly releases. |
| `run.allowedVPCEgress` | Allow `ALL_TRAFFIC`. | No | Glean's `deploy_build` Cloud Function invokes Cloud Run services with open egress. |
| `cloudbuild.allowedWorkerPools` | Allow `ALLOW_ALL`. | No | Glean's Cloud Functions builds require worker pools. |
| `compute.disablePrivateServiceConnectCreationForConsumers` | Allow `GOOGLE_APIS` and `SERVICE_PRODUCERS`. | No | Glean needs to create Private Service Connect endpoints. |

## 5\. Create a service account[​](#5-create-a-service-account "Direct link to 5. Create a service account")

The service account is used to allow Glean's systems to access the project and perform the build. You will create the service account and provide Glean with the private JSON key required to use it.

1.  Go to the [Service Accounts](https://console.cloud.google.com/iam-admin/serviceaccounts) page in the GCP console and click Select a Project.
    
2.  Click **Create Service Account**. Enter the service account name (`glean-admin`), ID, and description (optional), then click **Create**.
    
3.  Click the **Select a role** dropdown to make your service account an **Owner** of the project. Click **Continue**.
    
4.  Ignore the **Grant users access to this service account** option. It is not required.
    
5.  Click **Create Key**. In the panel that appears, select the key type **JSON**, then **Create**. This will save a private JSON key to your computer.
    

## 6\. Upload the service account key to the Glean **Admin console**[​](#6-upload-the-service-account-key-to-the-glean-admin-console "Direct link to 6-upload-the-service-account-key-to-the-glean-admin-console")

1.  If you haven't already, follow the instructions from the [Access the Admin console](/get-started/setup/access-the-admin-ui) section of the Getting Started guide.
    
    -   Browse to [https://app.glean.com/admin](https://app.glean.com/admin)
    -   Enter your email to receive a link via email to sign in.
2.  On the page titled **Create a Google Cloud Platform project**, click the box under Step 2 to upload the private JSON key to Glean.
    
3.  Click **Save**. Glean will now use the JSON key to validate that all the steps above have been performed correctly.
    

Success

If the save is successful, your Glean tenant is ready to be built. Contact your Glean account team to proceed.

warning

If the save fails, you will be presented with a red error message detailing the issues to correct. The key must be saved correctly before the build of your Glean tenant can proceed.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

For Error Codes and troubleshooting steps, please see the [Troubleshooting](/troubleshooting/error-codes/gcp/setup-key-1) section.

## FAQ[​](#faq "Direct link to FAQ")

### I don't want to provide Glean with a service account and/or project owner role. Can I build everything myself?

No. Glean utilizes Infrastructure as Code (IaC) and as such, all of our build systems are automated. This ensures consistency, reliability, and security in our deployments.

### What can Glean access in my environment with the Service Account with Project Owner role?

A service account that is generated with an owner role for a specific project in Google Cloud Platform (GCP) is limited to the resources and services within that specific project. It does not have permissions to access or modify resources outside of that project, even if it's within the same GCP tenant.

The permissions of a service account are defined by the roles that are granted to it. **The owner role grants full access to all resources in the project where it is assigned, but it does not extend to other projects in the GCP tenant.**

-   More information: [GCP Service Account with Owner Role](/security/cloud-prem/gcp/owner-role)

### Can I revoke/delete the service account created and associated JSON key after the build is complete?

Yes. As part of the build, Glean automatically creates a maintenance service account that is used by our systems to automatically manage, update, and patch your environment. The original JSON key and associated account that you provided Glean can be revoked.

### I don't want Glean to be able to access the completed build at all for security reasons. Can I revoke the maintenance account as well?

No. Glean requires this account in order to roll updates to your tenant (including new features and security fixes).

warning

Deliberately restricting or blocking Glean's access to your tenant will void Glean's Service and Support SLAs, and will impact the ability of our support teams to assist you when troubleshooting issues.

info

Glean is not a traditional self-hosted service: Your Glean tenant is run as a managed service by Glean and is kept up-to-date alongside our SaaS tenants and infrastructure.

We require appropriate access to be able to provide ongoing management of your tenant's services and this is via the maintenance service account.
