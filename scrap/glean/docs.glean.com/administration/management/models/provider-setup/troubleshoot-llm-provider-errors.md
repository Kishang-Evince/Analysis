---
url: "https://docs.glean.com/administration/management/models/provider-setup/troubleshoot-llm-provider-errors"
canonical: "https://docs.glean.com/administration/management/models/provider-setup/troubleshoot-llm-provider-errors"
title: "Troubleshoot LLM provider errors"
description: "Resolve common errors when connecting Glean to your LLM provider, including invalid API keys, deployment mismatches, and rate limits."
fetched_at: "2026-09-01T13:29:09.351Z"
---
On this page

When you use your own LLM provider key with Glean, you may encounter errors during setup or ongoing operation. This guide covers the most common error codes, what they mean, and how to resolve them.

tip

Glean sends [LLM provider alert emails](/administration/management/alerts/llm-provider-alerts) when your endpoint returns repeated errors. If you've received one of these alerts, use this guide to diagnose and fix the issue.

## Common error codes[​](#common-error-codes "Direct link to Common error codes")

### 401: Invalid or expired API key[​](#401-invalid-or-expired-api-key "Direct link to 401: Invalid or expired API key")

**Issue:** Glean can't authenticate with your LLM provider because the API key is invalid, expired, or was revoked.

**Resolution:**

1.  Go to your LLM provider's portal and confirm the API key is still active.
2.  If the key has expired or been revoked, generate a new one.
3.  In the **Admin console**, go to **Platform → LLMs** and update the key.
4.  Click **Validate** to confirm the new key works.

### 403: Access denied[​](#403-access-denied "Direct link to 403: Access denied")

**Issue:** The request reached your LLM provider, but it was rejected. Common causes include:

-   Your organization's IP isn't allowlisted in the provider's network settings.
-   A web application firewall (WAF) or network policy is blocking Glean's requests.
-   The API key doesn't have the required permissions for the requested model.

**Resolution:**

1.  Check your provider's network or firewall settings and confirm that Glean's traffic is allowed.
2.  Verify the API key has the correct permissions and role assignments for the models you've selected.
3.  If you use a custom gateway or proxy, confirm it's forwarding requests correctly.

### 404: Deployment or model not found[​](#404-deployment-or-model-not-found "Direct link to 404: Deployment or model not found")

**Issue:** Glean is trying to call a model deployment that doesn't exist at the configured endpoint. This is one of the most common Azure OpenAI errors and usually means the **deployment name in Glean doesn't match the deployment name in your provider's portal**.

**Resolution:**

1.  In your provider's portal, find the exact deployment name:
    -   **Azure OpenAI:** Go to the Azure Portal, navigate to your Azure OpenAI resource, and select **Model deployments > Manage Deployments**. Copy the **Deployment name** exactly as shown.
    -   **OpenAI:** Check that the model name in Glean matches a model available in your OpenAI organization.
2.  In the **Admin console**, go to **Platform → LLMs** and compare the deployment name you entered against the one in your provider's portal.
3.  Fix any mismatches — deployment names are case-sensitive and must match exactly.
4.  Click **Validate** to confirm the connection.

warning

The deployment name is not the same as the model name. For example, you might deploy the model `gpt-5.1` with a deployment name like `gpt-51-prod`. Glean needs the **deployment name**, not the model name.

### 429: Rate limit exceeded[​](#429-rate-limit-exceeded "Direct link to 429: Rate limit exceeded")

**Issue:** Your LLM provider is throttling requests because you've exceeded your provisioned capacity (tokens per minute or requests per minute).

**Resolution:**

1.  Check your current quota in your provider's portal:
    -   **Azure OpenAI:** Go to **Quotas** in the Azure Portal.
    -   **OpenAI:** Go to **Settings > Organization > Limits** in the OpenAI Dashboard.
2.  Compare your quota against the capacity requirements for your provider ([Azure OpenAI](/administration/management/models/provider-setup/azure-openai-setup#request-additional-capacity-from-azure) or [OpenAI](/administration/management/models/provider-setup/open-ai-setup#capacity-for-openai-models)) for your number of users.
3.  Request a quota increase from your provider if your current limits are too low.
4.  If you're using Azure OpenAI, consider deploying models across multiple regions to distribute traffic.

### 500: Server or gateway error[​](#500-server-or-gateway-error "Direct link to 500: Server or gateway error")

**Issue:** The LLM provider or an intermediary gateway returned an internal error. This indicates:

-   A temporary outage on the provider's side.
-   A misconfiguration in a custom LLM gateway (such as an authentication header mismatch).

**Resolution:**

1.  Check your provider's status page for any ongoing outages:
    -   [OpenAI Status](https://status.openai.com/)
    -   [Azure Status](https://azure.status.microsoft/en-us/status)
    -   [Google Cloud Status](https://status.cloud.google.com/)
    -   [AWS Health Dashboard](https://health.aws.amazon.com/health/status)
2.  If you use a custom gateway or proxy (such as Azure API Management), check its logs for more details. Common causes include:
    -   **Authentication header mismatch:** Azure OpenAI expects an `api-key` header, while some gateways send an `Authorization: Bearer` header instead. Confirm your gateway forwards the correct header format.
    -   **Unsupported custom headers:** Confirm your gateway isn't adding headers that the LLM provider doesn't recognize.
3.  If the error persists and there's no provider outage, contact [Glean support](https://support.glean.com).

## Timeout errors[​](#timeout-errors "Direct link to Timeout errors")

**Issue:** Glean's request to your LLM provider didn't receive a response within the expected time frame. You might see errors such as "context deadline exceeded" or "something went wrong."

Common causes include:

-   The LLM endpoint is slow or unresponsive.
-   A custom gateway or proxy is adding latency.
-   Network connectivity issues between Glean and the provider.

**Resolution:**

1.  Confirm the LLM endpoint is reachable and responding to other requests.
2.  If you use a custom gateway, check its latency metrics and logs.
3.  Verify there are no network issues or firewall rules that could be slowing traffic.
4.  If the issue persists, contact [Glean support](https://support.glean.com).

## Verify your configuration[​](#verify-your-configuration "Direct link to Verify your configuration")

If you're seeing errors after initial setup or after making changes, walk through these checks:

1.  **API key:** Confirm the key is active and hasn't been rotated or revoked.
2.  **Endpoint URL:** Confirm the endpoint URL is correct and reachable. For Azure OpenAI, don't include `https://` in the endpoint field.
3.  **Deployment names:** Confirm every deployment name in Glean matches your provider's portal exactly (case-sensitive).
4.  **Region support:** If you're using Azure OpenAI, confirm your resource is deployed in a region that supports the [Responses API](https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/responses?tabs=python-secure#responses-api).
5.  **Quota:** Confirm your provisioned capacity meets the requirements for your provider ([Azure OpenAI](/administration/management/models/provider-setup/azure-openai-setup#request-additional-capacity-from-azure) or [OpenAI](/administration/management/models/provider-setup/open-ai-setup#capacity-for-openai-models)) for your number of users.
6.  **Validate:** In the **Admin console**, go to **Platform → LLMs** and click **Validate** to test the connection.

## When to contact Glean support[​](#when-to-contact-glean-support "Direct link to When to contact Glean support")

Contact [Glean support](https://support.glean.com) if:

-   You've verified your configuration and the error persists.
-   You're seeing errors that aren't listed on this page.
-   Your provider's status page shows no issues, but Glean still can't connect.
-   You need help interpreting an LLM provider alert email.
