---
url: "https://docs.glean.com/get-started/prepare/about-deployment"
canonical: "https://docs.glean.com/get-started/prepare/about-deployment"
title: "Glean deployment models"
description: "A comprehensive guide to Glean's deployment models, helping you choose the right option based on your organization's data residency, infrastructure, security, and cost requirements."
fetched_at: "2026-09-01T13:29:49.714Z"
---
On this page

The deployment model your organization uses determines whether Glean runs in a Glean-managed environment or in your own cloud environment, and shapes the cloud-environment prep work required before setup.

Glean offers multiple deployment models:

-   **[Glean Hosted](#glean-hosted)**: Glean's own tenant hosts your Glean instance.
-   **[Customer Hosted](#customer-hosted)**: Glean deploys its tenant as a managed service in isolation within your own cloud environment (GCP, AWS). Previously known as Cloud-Prem.

The product is the same in all deployment models, with the only difference being where the infrastructure runs and the level of control you have over specific deployment aspects.

Regardless of the deployment model:

-   Glean uses a single-tenant infrastructure, meaning that the infrastructure isolates your data from other customers' data. Your data doesn't leave this environment.
-   Glean is responsible for infrastructure and application management, including upgrades, patching, and monitoring.
-   Glean maintains support access to your environment for debugging and support purposes.

Need more control over your deployment?

Contact your Glean account team to learn about opportunities to control specific aspects of your Glean environment.

## Glean Hosted[​](#glean-hosted "Direct link to Glean Hosted")

In the Glean Hosted deployment model, Glean's own tenant hosts your Glean instance. This is a true SaaS service, where you don't have any infrastructure responsibility. Glean uses GCP as its cloud provider.

### Advantages[​](#advantages "Direct link to Advantages")

-   **Simplified setup process** - no infrastructure setup required on customer end.
-   **Full auto-scaling** - Glean scales automatically as your corpus and number of users grow.
-   **Built-in security controls** - Glean's security controls and guarantees protect your data.
-   **Simpler licensing and pricing model** - Glean is responsible for all infrastructure costs.
-   **Multiple regions supported** - Glean is available in multiple [GCP](/get-started/prepare/self-hosted-deployment/gcp/supported-gcp-regions) and [AWS](/get-started/prepare/self-hosted-deployment/aws/supported-aws-regions) regions around the world.

### When should you choose this?[​](#when-should-you-choose-this "Direct link to When should you choose this?")

-   You do not want to host the infrastructure for Glean.
-   You want a full out-of-the-box experience.
-   You want to have a simpler pricing model.

## Customer Hosted[​](#customer-hosted "Direct link to Customer Hosted")

In the Customer Hosted (previously known as Cloud-Prem) deployment model, Glean deploys its tenant **as a managed service** in isolation within your own cloud environment (GCP, AWS).

Not a traditional self-hosted model

Customer Hosted is equivalent to a hosted-SaaS model, where Glean still has minimal access to operate it like a SaaS service.

### Advantages[​](#advantages-1 "Direct link to Advantages")

-   **Full data residency guarantees** - data doesn't leave your organizational boundaries.
-   **Enhanced visibility** - you have full access to all raw logs stored within Glean.
-   **Additional networking options** - organizations have more options for networking to internal resources, while Glean still operates in an isolated VPC controlled by Glean.
-   **Additional security controls** - you can apply VPC SC + Org policies (GCP) or SCPs (AWS) to further lock down the project.
-   **Cloud spend optimization** - you can use your existing cloud spend commitments to retire the costs of hosting Glean, with lower licensing costs for customers that host Glean in their own cloud environment.

### When should you choose Customer Hosted?[​](#when-should-you-choose-customer-hosted "Direct link to When should you choose Customer Hosted?")

-   You have strict data residency requirements where data cannot leave your organizational boundaries. Alternative geographic regions are also available in SaaS.
-   You want full access to raw logs for compliance or security reasons.
-   You want to leverage your existing cloud spend commitments to retire the costs of hosting Glean.
-   You want additional security controls and networking options on the project.

warning

In the Customer Hosted model, Glean doesn't support manually deploying or patching the Glean services, or altering any part of the Glean architecture. Glean's architecture isn't just a set of containerized services: it's a fully integrated system spanning different private networks, storage, databases, compute resources, and other integrated services.

If your organization has significant restrictions on what it can deploy in your cloud environment, consider the Glean Hosted option instead.

## Comparison of deployment models[​](#comparison-of-deployment-models "Direct link to Comparison of deployment models")

|  | Glean Hosted | Customer Hosted |
| --- | --- | --- |
| **Deployment model** |  |  |
| Single-tenant deployment model | ✅ | ✅ |
| Support for staged environments\* | ✅ | ✅ |
| Support for scanning Glean software images (out of band) |  | ✅ |
| **Access controls** |  |  |
| SSO only enterprise deployments for centralizing and streamlining user authentication | ✅ | ✅ |
| Support for multi-factor authentication | ✅ | ✅ |
| OAuth for authorizing account access without sharing or storing user login credentials | ✅ | ✅ |
| **Encryption** |  |  |
| Automatic encryption of all data at REST AES-256 and in transit TLS | ✅ | ✅ |
| Automatic rotation of data encryption keys for increased detection (every 30 days GCP; every 90 days on AWS) | ✅ | ✅ |
| **Network controls** |  |  |
| Network policies for limiting/controlling access to Glean by IP address | ✅ | ✅ |
| Support for private connectivity for on-premise connectors | ✅ | ✅ |
| Support for AWS VPC Endpoints local to Glean account deployment |  | ✅ |
| **Audit** |  |  |
| Audit the user access history | ✅ | ✅ |
| Audit all agent access and tool history | ✅ | ✅ |
| No logging of individual user queries or responses | ✅ | ✅ |
| **Backup & availability** |  |  |
| Data backups (up to 7 days) | ✅ | ✅ |
| Support for multiple availability zones | ✅ | ✅ |
| **Security integrations** |  |  |
| Support for Crowdstrike and Wiz sensors |  | ✅ |
| Support for Cloud IDS, VPC SC, NGFW (GCP Only) |  | ✅ |

## Next steps[​](#next-steps "Direct link to Next steps")

If you're an admin setting up your Glean deployment, the next steps depend on your deployment model:

-   **Glean Hosted**: Glean takes care of the infrastructure for you. You can continue to [Stage 1: Create workspace](/get-started/setup/access-the-admin-ui).
-   **Customer Hosted (self-hosted in your own cloud)**: Prepare your cloud environment using the [GCP deployment guide](/get-started/prepare/self-hosted-deployment/gcp/deploy-gcp) or [AWS deployment guide](/get-started/prepare/self-hosted-deployment/aws/deploy-aws) before moving on to creating your workspace.

## See also[​](#see-also "Direct link to See also")

-   To understand which LLM providers are available in each deployment and key mode, see [Availability by hosting environment and provider](/administration/llms#availability-by-hosting-environment-and-provider).
