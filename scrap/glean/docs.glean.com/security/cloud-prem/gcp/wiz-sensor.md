---
url: "https://docs.glean.com/security/cloud-prem/gcp/wiz-sensor"
canonical: "https://docs.glean.com/security/cloud-prem/gcp/wiz-sensor"
title: "Wiz sensor support on GCP"
description: "Set up Wiz sensors on GCP Glean deployments, including credentials, Google Secret Manager configuration, and deployment requirements."
fetched_at: "2026-09-01T13:29:58.019Z"
---
On this page

Set up Wiz sensors on Glean compute workloads that run on Compute Engine instances and Google Kubernetes Engine (GKE) nodes in customer-hosted GCP deployments. Glean installs and manages the sensors after you provide the required credentials, secret, and deployment details.

## Setup instructions[​](#setup-instructions "Direct link to Setup instructions")

Glean installs the Wiz sensors through the standard Glean deployment process. You do not need to install the sensors or change the Glean deployment yourself. You provide Glean with the details described on this page so that Glean can deploy Wiz correctly.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Confirm that you have:

-   A Wiz account
-   Access to your Wiz tenant and permission to create a service account
-   Permission to create a Google Secret Manager secret in the same project as the Glean deployment
-   A way to provide the required deployment details to [Glean Support](https://support.glean.com/)

## Configuration[​](#configuration "Direct link to Configuration")

Complete these steps before Glean deploys the sensors:

1.  In Wiz, create a service account for a Wiz sensor. Follow the Wiz documentation for the required steps. Record the **Client ID** and **Client Secret**. Use the client secret later as `WIZ_API_CLIENT_SECRET`.
    
2.  Collect the runtime sensor image pull key from your Wiz tenant. Go to [Wiz tenant information](https://app.wiz.io/tenant-info/general) to view the tenant details.
    
    ![Wiz tenant information page showing the runtime sensor image pull credentials](/img/security/cloud-prem/wiz-details.png)
    
    Record these values:
    
    -   **Domain**: Select `registry.wiz.io` from the drop-down when possible
    -   **Username**: Use this value later as `WIZ_REGISTRY_USERNAME`
    -   **Password**: Use this value later as `WIZ_REGISTRY_PASSWORD`
3.  Create the Google Secret Manager secret described in [Google Secret Manager secret](#google-secret-manager-secret). Create it in the same project as the Glean deployment.
    
4.  Provide the following details to [Glean Support](https://support.glean.com/):
    
    -   The Wiz Client ID
    -   The Wiz registry Domain
    -   The name of the Secret Manager secret
5.  After you provide the details, Glean deploys the Wiz sensors.
    

## Google Secret Manager secret[​](#google-secret-manager-secret "Direct link to Google Secret Manager secret")

Create a secret in the same project as the Glean deployment. Glean recommends that you encrypt the secret with the Google-managed encryption keys, which is the default.

### Secret contents[​](#secret-contents "Direct link to Secret contents")

The secret must contain a JSON string with this structure:

```
{    "WIZ_API_CLIENT_SECRET": "ADD-ME",    "WIZ_REGISTRY_USERNAME": "ADD-ME",    "WIZ_REGISTRY_PASSWORD": "ADD-ME"}
```

Embed these values:

-   The Wiz Client Secret for `WIZ_API_CLIENT_SECRET`
-   The image pull registry username for `WIZ_REGISTRY_USERNAME`
-   The image password for `WIZ_REGISTRY_PASSWORD`

After you create the secret, record the name of the secret so that you can share it with Glean.

## Pricing[​](#pricing "Direct link to Pricing")

Because the sensors report back to your Wiz tenant, you are responsible for billing and capacity requirements. This generally requires a billable unit for each Compute Engine instance and GKE node instance. Contact [Glean Support](https://support.glean.com/) to discuss sizing.

## See also[​](#see-also "Direct link to See also")

-   [About customer-hosted GCP](/security/cloud-prem/gcp)
-   [CrowdStrike Falcon support on GCP](/security/cloud-prem/gcp/crowdstrike-falcon)
-   [Reduce GCP costs](/security/cloud-prem/gcp/cost-controls)
