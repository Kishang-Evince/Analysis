---
url: "https://docs.glean.com/security/cloud-prem/aws/connecting-to-onprem-connectors"
canonical: "https://docs.glean.com/security/cloud-prem/aws/connecting-to-onprem-connectors"
title: "Connecting Glean to on-premises connectors"
description: "Connect Glean on AWS to on-premises connectors over a shared Transit Gateway (TGW), including transit network setup, resource sharing, and routing."
fetched_at: "2026-09-01T13:29:56.270Z"
---
On this page

Glean's AWS project can peer with the Transit Gateways (TGWs) in your other AWS accounts so that Glean can crawl private services inside your network. This page describes how to configure shared TGW connectivity from Glean on AWS to your on-premises connectors.

Within its AWS project, Glean uses a transit VPC network to minimize IP collisions with your network and minimize exposure. You must set aside a [private](https://tools.ietf.org/html/rfc1918) /26 range for this transit VPC.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Confirm that you have:

-   A TGW already established in the VPC that you want to share with Glean
-   A private /26 CIDR range that you can set aside for the transit VPC and that does not conflict with the Glean VPC (10.1.0.0/16) or any existing customer ranges

## Topology[​](#topology "Direct link to Topology")

## Configuration[​](#configuration "Direct link to Configuration")

note

You do not need to change anything within the Glean account. Terraform handles all configuration. Make sure you set up routes and security groups on your connector or networking accounts.

The following setup assumes you have a TGW already established in your VPC that you want to share with Glean.

1.  To start configuring Glean shared TGW connectivity, first decide on a transit network:
    -   The set-aside /26 IP CIDR range for Glean's use that doesn't conflict with the Glean VPC (10.1.0.0/16) or any existing customer ranges **and provide this to Glean**. This avoids IP collisions.
2.  Create a resource share with the corresponding Glean account, sharing the TGW resource with the principal: `arn:aws:iam::{glean-account-id}:root`.
3.  You can either accept the resource share on the Glean account manually and provide the accepted transit gateway ID.
4.  **Or**, if you would like the Glean account to make the connection request, provide the resource share to Glean. Glean creates an outgoing connection request, which you need to accept. Let Glean know once done.
5.  Glean creates a TGW attachment to the shared TGW. You need to accept this attachment and set up routes from there.

The 10.99.0.0/26 and 10.99.0.0/29 CIDRs in the diagram are examples.

## Routing[​](#routing "Direct link to Routing")

For routing, route all traffic destined for Glean's network through the shared TGW attachment, using the /26 transit CIDR.

## See also[​](#see-also "Direct link to See also")

-   [About customer-hosted AWS](/security/cloud-prem/aws)
-   [Connect Glean to on-premises connectors on GCP](/security/cloud-prem/gcp/connecting-to-onprem-connectors)
