---
url: "https://docs.glean.com/security/networking/glean-ip-ranges"
canonical: "https://docs.glean.com/security/networking/glean-ip-ranges"
title: "Glean IP ranges"
description: "Configure your network security to allow connectivity with Glean services by allowlisting the required IP ranges."
fetched_at: "2026-09-01T13:29:58.688Z"
---
On this page

Allowlist the required IP ranges through your firewalls and security controls to connect to Glean services. These ranges support connections from Glean to connected connectors and from users to Glean services.

There are two categories of IP addresses to allowlist: Glean Central addresses and the addresses assigned to your Glean tenant.

## Glean Central[​](#glean-central "Direct link to Glean Central")

Glean Central serves as the centralized control plane tenant for the service. This infrastructure component is responsible for:

-   Orchestrating customer environments
-   Pushing service updates to all tenancies
-   Handling tenancy lookup and redirection during user sign-in
-   Aggregating health data and anonymized analytics for each tenancy
-   Managing the front end and routing OAuth flows from apps such as Box and Jira to the corresponding customer tenancy

### Glean Central IP addresses[​](#glean-central-ip-addresses "Direct link to Glean Central IP addresses")

The following static IP addresses are used by Glean Central and should be allowlisted:

```
104.154.230.46/3235.239.35.180/3234.120.39.18/3234.144.241.72/3234.120.90.191/3234.120.148.20/3234.111.103.238/3234.160.40.155/32
```

These CIDRs must be permitted for AWS deployments:

```
98.89.71.36/32
```

note

Last updated: August 13, 2026

## Customer tenant configuration[​](#customer-tenant-configuration "Direct link to Customer tenant configuration")

Each Glean customer deployment operates in isolation with its own dedicated backend domain, such as `companyname-be.glean.com`. Your tenancy is assigned three public IP addresses for these purposes:

-   **Inbound webhooks**: Handles notifications and webhooks from connected applications
-   **Crawler egress**: Manages outbound connections for data crawling operations
-   **Load balancing**: Handles inbound user queries from the Glean application interface and API requests

info

To obtain the specific IP addresses associated with your Glean environment, contact [Glean Support](https://support.glean.com/).

## See also[​](#see-also "Direct link to See also")

-   [Monitoring probe](/security/networking/monitoring-probe) for proxy and connector checks
-   [Glean Web Application Firewall on AWS](/security/cloud-prem/aws/aws-waf) for AWS web application firewall controls
