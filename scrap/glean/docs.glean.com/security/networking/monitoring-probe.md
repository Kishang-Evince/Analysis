---
url: "https://docs.glean.com/security/networking/monitoring-probe"
canonical: "https://docs.glean.com/security/networking/monitoring-probe"
title: "Glean monitoring probe"
description: "Reference for Glean health monitoring probe requests, including endpoints, request patterns, and how to suppress false-positive security alerts"
fetched_at: "2026-09-01T13:29:58.825Z"
---
On this page

Glean runs automated health monitoring probes against each customer deployment to verify that critical platform services are functioning correctly. These probes originate from the service account `monitoring-probe@glean.com` and may appear in your security monitoring tools, SIEM, or SOC dashboards.

This page describes what the monitoring probe does, what traffic patterns to expect, and how to configure your security tooling to avoid false-positive alerts.

## Purpose[​](#purpose "Direct link to Purpose")

The monitoring probe continuously validates that the chat file upload pipeline - which handles file attachments in Glean Assistant conversations - is healthy end to end. Each probe cycle uploads a small synthetic test file, verifies that it reaches a terminal processing state, and then deletes it. No customer data is read, modified, or retained by the probe.

## Request patterns[​](#request-patterns "Direct link to Request patterns")

### Endpoints[​](#endpoints "Direct link to Endpoints")

The monitoring probe sends `POST` requests to the following endpoints on your Glean deployment:

| Endpoint | Purpose |
| --- | --- |
| `/api/v1/uploadchatfiles` | Uploads a synthetic test file (~1 KB) |
| `/api/v1/getchatfiles` | Polls the file's processing status until it reaches a terminal state |
| `/api/v1/deletechatfiles` | Deletes the test file after the check completes |

### Cycle frequency[​](#cycle-frequency "Direct link to Cycle frequency")

The probe runs one complete cycle (upload, poll, delete) approximately every **150 seconds**.

### Identify headers[​](#identify-headers "Direct link to Identify headers")

Every probe request includes the following headers:

| Header | Value |
| --- | --- |
| `User-Agent` | `GleanHealthProbe` |
| `ActAs` | `monitoring-probe@glean.com` |

### Data impact[​](#data-impact "Direct link to Data impact")

-   The test file is a fixed ~1 KB synthetic text file.
-   The file is deleted at the end of each cycle.
-   There is no impact to data retention, privacy, billing, or storage costs.

## Suppress false-positive alerts[​](#suppress-false-positive-alerts "Direct link to Suppress false-positive alerts")

If your security monitoring tools flag these requests as suspicious activity, use the following criteria to create allowlist rules or suppress alerts:

### Recommended filter criteria[​](#recommended-filter-criteria "Direct link to Recommended filter criteria")

Create a suppression rule matching **any** of the following:

-   **User-Agent** equals `GleanHealthProbe`
-   **ActAs** or **user identity** equals `monitoring-probe@glean.com`
-   **Request path** matches `/api/v1/uploadchatfiles`, `/api/v1/getchatfiles`, or `/api/v1/deletechatfiles` **and** the User-Agent is `GleanHealthProbe`

tip

Filtering on the `User-Agent: GleanHealthProbe` header is the simplest and most stable approach, as it covers all current and future probe endpoints in a single rule.

### Example SIEM rules[​](#example-siem-rules "Direct link to Example SIEM rules")

### Splunk

```
index=web_proxy sourcetype=access_combined| where NOT (useragent="GleanHealthProbe")
```

### Microsoft Sentinel (KQL)

```
CommonSecurityLog| where RequestClientApplication != "GleanHealthProbe"
```

## Changes to the probe[​](#changes-to-the-probe "Direct link to Changes to the probe")

Glean may add or modify the endpoints that the monitoring probe exercises as new platform capabilities are introduced. The `User-Agent: GleanHealthProbe` header and the `monitoring-probe@glean.com` service account identity remain stable across changes.

If you notice new endpoints in probe traffic, you can verify them by contacting [Glean Support](https://support.glean.com).

## Turn off the probe[​](#turn-off-the-probe "Direct link to Turn off the probe")

If your organization prefers not to receive monitoring probe traffic, Glean can turn off the probe for your deployment. Contact [Glean Support](https://support.glean.com) to request this change.

warning

Turning off the monitoring probe reduces Glean's ability to proactively detect and respond to service health issues in your deployment.

## See also[​](#see-also "Direct link to See also")

-   [Glean IP Ranges](/security/networking/glean-ip-ranges) - IP ranges to allowlist for Glean connectivity
