---
url: "https://docs.glean.com/administration/about"
canonical: "https://docs.glean.com/administration/about"
title: "About the Admin Console"
description: "The Admin Console is where all enterprise-wide configuration for the Glean platform occurs."
fetched_at: "2026-09-01T13:28:58.213Z"
---
On this page

Admins can manage and configure their deployment from the Glean Admin Console. The Glean Admin Console is a user-friendly and self-serve central hub that empowers customer admins to set up their deployment without needing a dedicated project.

## Key features[​](#key-features "Direct link to Key features")

-   **Role Based Access Control (RBAC):** Admins can manage what permissions users have using the Admin Console. They can grant a user permission to moderate content, or relevate them to either Full Admin or Setup Admin roles.
    
-   **Authentication Settings:** Admins can configure an Identity Provider (IdP) for Single Sign-On (SSO) using the **Users & permissions → Authentication** page of the Admin Console.
    
-   **Search Management:** Admins can check whether a user has access to a document within Glean, or hide documents from appearing in search results.
    
-   **Connector Management:** Admins can manage and configure the connectors that Glean can access. This includes adding new connectors, removing existing ones, and adjusting the permissions and access levels.
    
-   **Glean Setup:** Admins can set up Glean, which covers Generative AI features such as chat, answers, and summarization.
    
-   **Manage Adoption**: Admins can track the people in their company who haven't yet been invited to Glean, who have received an invite, and who are actively using Glean - all in a single view.
    

## Admin Chat[​](#admin-chat "Direct link to Admin Chat")

Admin Chat is an embedded, admin-focused chat experience in the Admin Console. It helps you configure, operate, and troubleshoot Glean using Glean's public documentation—the Help Center, Developer Docs, and Gleaniverse. It appears as a resizable widget labeled **Admin Chat** in the bottom-right corner of the Admin Console.

info

Admin Chat is for Glean admins, not end users. It uses only Glean's public documentation—it doesn't read your private content, inspect your tenant configuration, or change settings on your behalf. For tenant-specific help, it points you to the relevant docs or to Glean Support.

Use it for onboarding and setup, feature discovery, security and governance questions, and connector or indexing troubleshooting. For the best answers, state your goal, mention where you are in the Admin Console, and include key constraints (for example, "pilot rollout to a small group" or "GCP deployment"). You can ask follow-up questions in the same panel; conversations aren't saved to your chat history.

## Locate your Tenant ID[​](#locate-your-tenant-id "Direct link to Locate your Tenant ID")

When integrating Glean with connectors and applications, you'll often need your Glean **Tenant ID** or **Tenant Domain**. The domain typically follows the format `tenant_id-be.glean.com`—also called the Backend Domain or Query Endpoint (QE) Domain—where `tenant_id` is your unique Glean Tenant ID. It's used for login, search, crawling, webhooks, and API interactions, so you'll need it when setting up SSO or connectors.

note

Some Glean-managed platform services may operate outside the customer-dedicated project while maintaining logical and secure isolation.

Glean usually includes your Tenant ID in the customized setup instructions in the UI. To find it independently:

-   **From a connector's setup instructions:** Go to **Admin Console → Platform → [Connectors](https://app.glean.com/admin/setup/apps)** and select **Add App**, then choose any app. In the setup sidebar, the *Setting up webhooks* section shows a URL containing your Tenant Domain.
    
-   **From browser developer tools at login:** Open an incognito window, go to [app.glean.com](https://app.glean.com/), open your browser's **Network** tab, and sign in. Look for a request to `https://tenant_id-be.glean.com/login`—the `tenant_id` in that URL is your Tenant ID.
    

Learn with Glean Academy

You can learn more in the Gleaniverse with the [Glean Academy](https://community.glean.com/categories/glean-academy).
