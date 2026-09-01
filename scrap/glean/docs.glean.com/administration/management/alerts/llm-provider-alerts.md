---
url: "https://docs.glean.com/administration/management/alerts/llm-provider-alerts"
canonical: "https://docs.glean.com/administration/management/alerts/llm-provider-alerts"
title: "LLM provider alerts"
description: "Understand LLM provider alert emails — what triggers them and how to resolve the underlying errors"
fetched_at: "2026-09-01T13:29:08.472Z"
---
On this page

Glean sends an LLM provider alert when the endpoint for your LLM provider (Azure OpenAI, OpenAI, Google Vertex AI, or Amazon Bedrock) returns repeated errors. The email identifies the affected endpoint and the distribution of HTTP status codes it returned.

This alert appears as **LLM provider errors** on the [Alerts page](https://app.glean.com/admin/alerts) and is active whenever you use your own LLM provider. For recipients, sender details, and other alert settings, see [About admin alerts](/administration/management/alerts/admin-alerts).

## Why you received this alert[​](#why-you-received-this-alert "Direct link to Why you received this alert")

Glean calls your LLM provider's endpoint to power Glean Assistant. Because Glean doesn't have administrative access to your provider, you need to resolve these errors on the provider side. Until the errors stop, some or all of Glean Assistant's functionality is affected.

## Resolve the errors[​](#resolve-the-errors "Direct link to Resolve the errors")

The HTTP status codes in the alert email indicate what's going wrong:

| Status code | Meaning |
| --- | --- |
| 401 | Invalid or expired API key |
| 403 | Access denied, such as an IP allowlist, firewall, or permissions issue |
| 404 | Deployment or model not found |
| 429 | Rate limit exceeded because your provisioned capacity is too low |
| 500 | Server or gateway error, often a provider outage |
| Timeout | Endpoint is slow or unreachable, or a gateway is adding latency |

For step-by-step resolution for each status code, see [Troubleshoot LLM provider errors](/administration/management/models/provider-setup/troubleshoot-llm-provider-errors).

Once the errors are resolved, you stop receiving alert emails. No further action is required.
