---
url: "https://docs.glean.com/get-started/prepare/items-to-prepare"
canonical: "https://docs.glean.com/get-started/prepare/items-to-prepare"
title: "Items to prepare"
description: "Complete the following preparation tasks to make your setup of Glean a smooth process."
fetched_at: "2026-09-01T13:29:50.140Z"
---
On this page

Complete these preparation tasks to make your Glean setup a smooth process.

## Identify Phase 1 connectors[​](#identify-phase-1-connectors "Direct link to Identify Phase 1 connectors")

Every organization has a long list of applications that require connection and integration with Glean.

To speed up your time to value, you should identify 4 to 6 "mission critical" apps to integrate first. For example, SharePoint, Outlook, Google Drive, Jira, Confluence, Zendesk, etc.

**These should be the core applications that have the largest user footprints within your organization.** At a bare minimum you should ensure you have in scope at least:

-   One document repository app (SharePoint, OneDrive, Google Drive, Box, etc)
-   One communications app (Teams, Slack, etc)

You can add any apps outside of this core scope later.

tip

**Why can't every app be connected upfront?**

Before Glean can be used, a full fetch of data from core apps needs to be completed so that your search algorithm can be created. The algorithm cannot be created before this is complete.

If the focus is on connecting **every** application in the organization upfront, you will significantly delay the point at which Glean's training workflows can be started, and in turn, the point at which users can start using the service.

## Obtain app owner and security approvals[​](#obtain-app-owner-and-security-approvals "Direct link to Obtain app owner and security approvals")

One of the biggest delays encountered by customers when setting up Glean is the internal approvals needed (both from an application owner and security perspective) to connect each app to Glean.

Glean recommends initiating the approval process as early as possible to avoid any unnecessary delays. Start by:

-   Identifying the key stakeholders within your organization who are responsible for application ownership and security.
-   Scheduling meetings or consultations with these stakeholders to discuss the integration of Glean and address any concerns they may have.
-   Providing them with detailed documentation about Glean's security protocols, compliance certifications, and data handling practices to facilitate a smoother approval process.
-   Preparing a clear and concise summary of the benefits and functionalities that Glean will bring to your organization, which can help in gaining their support.

tip

Some of this information may require an NDA. Please contact your Glean account team for more information.

## (Self-hosted instances) Prepare your cloud environment[​](#self-hosted-instances-prepare-your-cloud-environment "Direct link to (Self-hosted instances) Prepare your cloud environment")

If you are opting for a self-hosted deployment of Glean, it is crucial to prepare your cloud environment in advance by following the preparation guide of the cloud provider you are choosing. To do this, please work with your internal administrator of the cloud provider.

This will involve:

1.  Picking one of the supported regions of the cloud provider.
2.  Correctly setting billing information for the environment.
3.  Enabling all the required services.
4.  Adjusting the quotas of the cloud provider.
5.  Providing Glean with details of the environment including:
    -   (GCP) The project ID, name, number, and the selected region.
    -   (AWS) The account ID, name, and the selected region.

For detailed documentation on the requirements for creating the environment, see the docs for [GCP](/get-started/prepare/self-hosted-deployment/gcp/deploy-gcp) or [AWS](/get-started/prepare/self-hosted-deployment/aws/deploy-aws).

## Identify the user group[​](#identify-the-user-group "Direct link to Identify the user group")

If not launching to the entire company at once, you should identify the initial group of users who will test Glean and provide feedback on the system. Consider the following when selecting users to pilot Glean:

-   **Diverse representation:** Choose users from different departments and roles to ensure diverse feedback and comprehensive testing.
-   **Tech-savvy users:** Select users who are comfortable with technology and can quickly adapt to new tools.
-   **Key stakeholders:** Include key stakeholders who can champion the adoption of Glean within their teams.

Once identified, provide these users with the necessary training and resources to get started with Glean (your Glean account team can help). Their feedback will be invaluable in fine-tuning the system before a broader rollout.

## Ready your SSO and people and directory data[​](#ready-your-sso-and-people-and-directory-data "Direct link to Ready your SSO and people and directory data")

-   **SSO integration:** Ensure that your SSO provider is ready for integration with Glean. Glean supports a variety of SSO providers, including Okta, Azure AD, and Google Workspace. You should have the necessary permissions to configure SSO settings in your IdP. Glean requires SSO integration to be complete before end-users can access Glean.
-   **People/directory data:** Ensure that your people data is up-to-date and accurate in your people connector. Glean uses this data to provide personalized search results and recommendations to users. The important fields are First Name, Last Name, Email, Title, Team, Department, Location, and Manager Email. People data is a required item.

tip

In most organizations, people data is already synced to the SSO provider you are using, and both the SSO and people data can be configured by the same person.

## Plan your timeline[​](#plan-your-timeline "Direct link to Plan your timeline")

## Timeline planning[​](#timeline-planning "Direct link to Timeline planning")

A well-structured timeline ensures smooth deployment and sets appropriate expectations.

-   **Project plan:** Develop a detailed project plan that outlines all the key milestones, tasks, and deadlines associated with the deployment.
-   **Resource allocation:** Ensure that you have allocated the necessary resources, including personnel, to assist with deployment of Glean.
-   **Risk management:** Identify potential risks and develop mitigation strategies to address any issues that may arise during the deployment process.
-   **Communication plan:** Establish a communication plan to keep all stakeholders informed about the progress of the deployment. You should also ensure that mechanisms to collect and aggregate user feedback have been identified.

## Provide administrator emails[​](#provide-administrator-emails "Direct link to Provide administrator emails")

Provide Glean with the email addresses of the administrators who will be responsible for managing the Glean environment. These admins receive the initial magic link to access the **Admin console**.

## Provide email authentication domains[​](#provide-email-authentication-domains "Direct link to Provide email authentication domains")

Provide Glean with a list of all email domains that your users will use to sign in.

warning

Glean does not allow users to sign in from domains that it is not aware of, for security reasons. For example, `company.com` for `user@company.com`.

## Select a deployment region[​](#select-a-deployment-region "Direct link to Select a deployment region")

Provide Glean with the country or region where you would like to deploy your Glean environment.

By default, Glean establishes all new tenants in the USA.

note

Hosting in certain regions may increase your Glean licensing costs (or infrastructure costs if you are self-hosting Glean) to compensate for the higher infrastructure expenses in those regions.

For details, please reach out to your Glean account team.
