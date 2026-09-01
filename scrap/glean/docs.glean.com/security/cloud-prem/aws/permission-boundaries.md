---
url: "https://docs.glean.com/security/cloud-prem/aws/permission-boundaries"
canonical: "https://docs.glean.com/security/cloud-prem/aws/permission-boundaries"
title: "AWS permission boundaries for Glean"
description: "Learn how Glean uses AWS permission boundaries to limit permissions for IAM roles created by Glean infrastructure orchestration."
fetched_at: "2026-09-01T13:29:57.162Z"
---
On this page

Use [AWS permission boundaries](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html) to limit the permissions available to Identity and Access Management (IAM) roles that Glean infrastructure orchestration creates. Glean provides the Terraform package and sample service control policy (SCP) used to apply these boundaries.

## Implementation summary[​](#implementation-summary "Direct link to Implementation summary")

Glean supports permission boundaries that prevent Glean application IAM roles from escalating privileges. The boundaries restrict IAM role creation and modification and the ability to pass IAM roles to AWS services.

Glean provides a Terraform module that creates the managed policies attached to roles as permission boundaries.

warning

You must use the permission boundary policies that Glean supplies. These policies must use the Amazon Resource Name (ARN) values created by Terraform. You can create the policies yourself, but they must use the policy that Glean provides.

After you create the permission boundaries, Glean recommends that you set up an SCP on the AWS account. The SCP should require every IAM role that Glean infrastructure orchestration creates to use the boundary. Glean includes a sample SCP in the permission boundary Terraform package.

During the first deployment, new customers can choose to have Glean provision the boundaries automatically.

## Permission boundaries[​](#permission-boundaries "Direct link to Permission boundaries")

Glean can provision two permission boundaries:

1.  The Orchestration Role Boundary
    -   ARN: `arn:aws:iam::GLEAN-ACCOUNT-ID:policy/glean/perm-boundary/glean-OrchestrationRolePermBoundary`
2.  The Application Role Boundary
    -   ARN: `arn:aws:iam::GLEAN-ACCOUNT-ID:policy/glean/perm-boundary/glean-ApplicationRolePermBoundary`

The Orchestration Role Boundary applies only to IAM roles that run orchestration automation, such as Terraform, in the AWS account. It allows those roles to create IAM roles with the Application Role Boundary attached.

The Application Role Boundary applies to all other IAM roles that Glean provisions. This boundary permits required operations but explicitly prevents privilege escalation. It restricts:

-   IAM role creation and modification
-   IAM `PassRole`

note

The IAM role ARN values for these managed policies must match the values listed earlier.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before you begin, confirm that you have:

-   Access to the AWS account where Glean infrastructure orchestration creates IAM roles
-   The permission boundary Terraform package from Glean, if you are an existing customer
-   A decision about whether Glean should provision the boundaries automatically during the initial deployment, if you are a new customer

## Procedure[​](#procedure "Direct link to Procedure")

### New customers[​](#new-customers "Direct link to New customers")

During the initial deployment, tell [Glean Support](https://support.glean.com/) whether you want Glean to provision the permission boundaries automatically. Glean provides a sample SCP for you to apply to the AWS account.

### Existing customers[​](#existing-customers "Direct link to Existing customers")

Contact [Glean Support](https://support.glean.com/) for the permission boundary Terraform package. Then complete these steps:

1.  Configure the Terraform backend.
2.  Update the `tfvars` files, including the region for the Glean deployment.
3.  Run Terraform.
4.  Tell [Glean Support](https://support.glean.com/) when you finish.
5.  Ask Glean to perform the deployment operation that attaches the permission boundaries.
6.  Set up the SCP on the AWS account.

## See also[​](#see-also "Direct link to See also")

-   [AWS account access and deployment model](/security/cloud-prem/aws/account-access-and-deployment-model)
-   [AWS deployment guide](/get-started/prepare/self-hosted-deployment/aws/deploy-aws)
