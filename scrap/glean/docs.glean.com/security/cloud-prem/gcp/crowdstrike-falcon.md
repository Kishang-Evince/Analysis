---
url: "https://docs.glean.com/security/cloud-prem/gcp/crowdstrike-falcon"
canonical: "https://docs.glean.com/security/cloud-prem/gcp/crowdstrike-falcon"
title: "CrowdStrike Falcon Sensors on GCP"
description: "This document describes how to set up and install CrowdStrike Falcon sensors on GCP Glean deployments."
fetched_at: "2026-09-01T13:29:57.624Z"
---
On this page

For customer-hosted GCP customers that want to set up CrowdStrike Falcon sensors on the Glean compute workloads (Compute Engine instances and GKE nodes), please review the following:

## General Setup Details[​](#general-setup-details "Direct link to General Setup Details")

CrowdStrike Falcon sensor installation is conducted via the standard Glean deploy process. The customer need not worry about having to perform the installation, nor does the customer need to make any changes to the Glean deployment. The customer will need to provide Glean with some details to have CrowdStrike Falcon deployed properly. Please see the requirements section.

note

Some Glean workloads utilize the Google Container Optimized OS (COOS) outside of Kubernetes. At this time, CrowdStrike does not support standalone (i.e. non-Kubernetes) COOS instances. As such, we are unable to support CrowdStrike on those instances.

### Setup Details[​](#setup-details "Direct link to Setup Details")

For stand-alone Compute Engine instances, Glean simply installs the Falcon agent. For K8s, Glean leverages the [Falcon Operator](https://github.com/CrowdStrike/falcon-operator) to install the Node Sensor and the Kubernetes Admission Controller.

## Requirements[​](#requirements "Direct link to Requirements")

### Licensing[​](#licensing "Direct link to Licensing")

CrowdStrike is not hosted by Glean; CrowdStrike is hosted by the customer and Glean hooks in to the customer's CrowdStrike licenses.

For customers to leverage CrowdStrike Falcon sensors to monitor their Glean deployment, there are one of 2 licensing options that customers must possess:

-   **Option 1**: For CrowdStrike's most comprehensive security capabilities, customers will need both CNAPP and CNAPP with Containers
-   **Option 2**: For just runtime protection, customers will need both Cloud Runtime Security and Cloud Runtime Security with Containers

### Pricing[​](#pricing "Direct link to Pricing")

Because this is reporting back to the customer’s CrowdStrike tenant, the customer is responsible for all billing related matters.

## Customer Instructions[​](#customer-instructions "Direct link to Customer Instructions")

Glean requires that the customer perform the following steps:

1.  Perform the steps required to add the Glean GCP project to your Falcon console for monitoring. Follow the CrowdStrike documentation for how to do this.
2.  You will need CrowdStrike credentials that will be used by the Falcon sensors to communicate back to CrowdStrike. These credentials are composed of the following elements:
    1.  Client ID
    2.  Client Secret
    3.  Customer ID (see number 4 - this is important and needs to be formatted correctly)
    4.  OPTIONAL: If you require a provisioning token for CIDs with restricted AID provisioning enabled - then you will need to obtain the provisioning token.
3.  After you obtain the credentials, grant the following permissions:
    1.  `Falcon Images Download`
    2.  `Installation Tokens` - `Read` and `Write`
    3.  `Sensor Download`
4.  You will also need the Customer ID (CID Checksum). To obtain the Customer ID (CID Checksum), in the Falcon console, go to the CrowdStrike Sensor download page. The CID checksum should be at the top of the page. Click "Copy your Customer ID checksum to the clipboard." This will be needed when constructing the secret. The CID will typically end in a hyphen and 2 characters, such as `-2F` for example.
5.  Create the Secrets Manager entry (more on this below)
6.  Provide details to Glean (more on this below)

#### Google Secret Manager Requirements[​](#google-secret-manager-requirements "Direct link to Google Secret Manager Requirements")

You will need to create a secret in the same *project* as the Glean deployment. We recommend that you create a secret that is encrypted with the Google-managed encryption keys (default).

##### The Secret Contents[​](#the-secret-contents "Direct link to The Secret Contents")

The secret that is created needs to be a JSON string that looks like this:

```
{    "FALCON_CLIENT_SECRET": "ADD-ME",    "CUSTOMER_ID": "ADD-ME"}
```

*NOTE*: If you are adding a provisioning token then you will need to add: `"PROVISIONING_TOKEN": "the token"` to the JSON string.

You need to embed:

1.  The CrowdStrike Falcon Client Secret for `FALCON_CLIENT_SECRET`
2.  The Customer ID for `CUSTOMER_ID`
3.  OPTIONAL: If you are requiring a provisioning token, then you will need to embed that in as well.

Once you create the secret, you will need to keep note of the name of the secret.

## Provide Glean with Details[​](#provide-glean-with-details "Direct link to Provide Glean with Details")

After you have completed all the customer steps above, then last step is to provide the desired CrowdStrike deployment details to Glean. The following details need to be sent over:

1.  The Client ID for the credentials.
2.  Name of the secret you just created
3.  An optional comma-separated list of Tags that you would like to have applied to CrowdStrike deployments.
4.  An optional "version decrement" for EC2 instances. By default, this value is set to 0. This sets the Falcon version to deploy minus the decrement (i.e. you can have the Falcon release that is 2 versions old to be deployed). See the CrowdStrike documentation for details.
5.  An optional kubernetes Falcon auto update strategy. By default, this is set to `normal`, but this can also be set to `off` or `force`. See the CrowdStrike documentation for details.
6.  An optional kubernetes Falcon update policy string. This is the name of the Falcon Linux sensor update policy (configured in the Falcon UI). When set, this policy determines which Falcon sensor version to install. This is unset by default. See the CrowdStrike documentation for details.

Once the details are provided, Glean will perform a deployment which will place the falcon sensors on the Glean compute components.
