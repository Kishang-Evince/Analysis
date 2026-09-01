---
url: "https://docs.glean.com/security/cloud-prem/aws/aws-waf"
canonical: "https://docs.glean.com/security/cloud-prem/aws/aws-waf"
title: "Glean web application firewall on AWS"
description: "How Glean uses AWS WAF to protect your deployment, including default rules, customizable options, monitoring, costs, IP restrictions, and third-party WAF support."
fetched_at: "2026-09-01T13:29:56.226Z"
---
On this page

Glean integrates AWS Web Application Firewall (WAF) rules into your deployment to augment the security protocols on the external Application Load Balancer (ALB). You cannot alter the WAF settings directly. To request changes, contact [Glean Support](https://support.glean.com/).

## Default features[​](#default-features "Direct link to Default features")

Glean enables the following features by default:

-   [IP reputation rule groups](https://docs.aws.amazon.com/waf/latest/developerguide/aws-managed-rule-groups-ip-rep.html) to block anonymous IP traffic (Tor) and IPs from the AWS managed IP reputation lists
-   IP green list: trusts only the Glean outbound IP for control plane communication protocols
-   Denial-of-service (DoS) protection: rate limiting on selected endpoints
-   Distributed denial-of-service (DDoS) protection: AWS Shield Standard, included by default
-   [AWS managed Core rule set](https://docs.aws.amazon.com/waf/latest/developerguide/aws-managed-rule-groups-baseline.html#aws-managed-rule-groups-baseline-crs)
-   [AWS managed Known bad inputs rule set](https://docs.aws.amazon.com/waf/latest/developerguide/aws-managed-rule-groups-baseline.html#aws-managed-rule-groups-baseline-known-bad-inputs)
-   [AWS managed SQL injection rule set](https://docs.aws.amazon.com/waf/latest/developerguide/aws-managed-rule-groups-use-case.html#aws-managed-rule-groups-use-case-sql-db)
-   [AWS managed Linux and Unix rule set](https://docs.aws.amazon.com/waf/latest/developerguide/aws-managed-rule-groups-use-case.html#aws-managed-rule-groups-use-case-linux-os)

## Customizable features[​](#customizable-features "Direct link to Customizable features")

The following features are available for customization. Contact your Glean Solutions Engineer (SE) to enable them:

-   Request country red listing: block requests that originate from specified countries.
-   Request country green listing: permit requests only from specified countries. You must allow the United States.
-   Request IP red listing: block requests that originate from specified IP ranges.
-   Request IP green listing: allow access only from designated IP ranges.
-   Request user agent red listing: block requests with certain header values.
-   Known URI allowlisting: permit only known URIs and block unknown URIs by default.
-   Sensitive support endpoint blocking: block all sensitive support endpoints.

Adding new rules may increase charges and may reach [AWS WAF limits](https://docs.aws.amazon.com/waf/latest/developerguide/limits.html).

## Monitoring[​](#monitoring "Direct link to Monitoring")

View AWS WAF activity in the AWS WAF console in the account that hosts your Glean deployment. Glean also stores logs in the `aws-waf-logs-glean` CloudWatch log group. You can write custom automation to ship the CloudWatch logs to your own internal tooling.

## Optional features[​](#optional-features "Direct link to Optional features")

-   Enable AWS Shield Advanced for the Glean load balancers. Be aware of [AWS's costs for this feature](https://aws.amazon.com/shield/pricing/).

## Support for a third-party WAF[​](#support-for-a-third-party-waf "Direct link to Support for a third-party WAF")

Glean does not support customers deploying their own WAFs or third-party WAFs. Work with Glean to configure AWS WAF for your deployment. Glean tests its supported WAF rules to confirm they do not break Glean's functionality.

## Restrict Glean to a specific set of IPs[​](#restrict-glean-to-a-specific-set-of-ips "Direct link to Restrict Glean to a specific set of IPs")

Glean can restrict non-webhook traffic to a specific set of IP addresses, for example, VPN IPs. To do this, provide Glean with a list of valid VPN CIDRs to restrict access to. Glean then enables IP green listing and the block-by-default configuration described earlier for the WAF.

This requires that you configure your VPN to always send traffic destined for the `*-be.glean.com` ALB out through your VPN. In all cases, you must provide Glean with the current list of VPN CIDRs and tell Glean whenever you add new CIDRs.

## See also[​](#see-also "Direct link to See also")

-   [AWS account access and deployment model](/security/cloud-prem/aws/account-access-and-deployment-model)
-   [Glean IP ranges](/security/networking/glean-ip-ranges)
-   [AWS FAQ](/security/cloud-prem/aws/faq)
-   [About customer-hosted AWS](/security/cloud-prem/aws)
