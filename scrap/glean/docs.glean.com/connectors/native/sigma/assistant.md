---
url: "https://docs.glean.com/connectors/native/sigma/assistant"
canonical: "https://docs.glean.com/connectors/native/sigma/assistant"
title: "Sigma in Assistant"
description: "Set up Sigma in Glean Assistant so users can ask natural-language questions about Sigma data."
fetched_at: "2026-09-01T13:29:42.033Z"
---
On this page

Beta

This page describes a beta feature that may change.

Sigma in Assistant lets users ask natural-language questions about Sigma data from Glean through Sigma's official MCP server. Unlike the [search integration](/connectors/native/sigma/connector), which indexes Sigma content for discovery, this setup uses per-user Sigma authentication so Assistant can return results based on each user's Sigma permissions.

Use Sigma in Assistant when:

-   You want users to ask natural-language questions about Sigma data from Glean, without switching to Sigma.
-   You want Assistant responses to reflect each user's own Sigma access.
-   You want to bring Sigma data into Glean Assistant and agent workflows alongside other connected tools.

## How it works[​](#how-it-works "Direct link to How it works")

After you add the Sigma MCP server in Glean, Glean links it to a Sigma connector instance and connects to Sigma's official MCP endpoint using the region or API host you select during setup. Users authenticate with Sigma through the MCP OAuth flow, and Assistant can use the enabled Sigma tools to return results scoped to each user's Sigma access.

The available tools include:

-   **Begin Session** — start a new Sigma MCP session.
-   **Describe** — retrieve detailed metadata about a Sigma resource.
-   **List Documents** — discover available Sigma documents.
-   **Query** — run a natural-language query against Sigma data.
-   **Search** — search across Sigma content.

## Requirements[​](#requirements "Direct link to Requirements")

### Sigma requirements[​](#sigma-requirements "Direct link to Sigma requirements")

-   The [Sigma search integration](/connectors/native/sigma/connector) must already be set up.
-   You need the correct Sigma region or API host for your Sigma MCP endpoint.
-   Users who will use Sigma in Assistant must be able to complete the Sigma sign-in flow.

### Glean requirements[​](#glean-requirements "Direct link to Glean requirements")

-   Access to the **Glean admin console** with permission to add tools or MCP servers and manage tool access.
-   A Sigma connector instance that can be linked during setup.

## Setup and configuration[​](#setup-and-configuration "Direct link to Setup and configuration")

Sigma in Assistant is set up as a separate MCP server flow, not from the Sigma connector settings.

### Step 1: Add the Sigma MCP server[​](#step-1-add-the-sigma-mcp-server "Direct link to Step 1: Add the Sigma MCP server")

1.  In the **Glean admin console**, open the Tools or MCP server setup flow.
2.  Add **Sigma**.
3.  Link the MCP server to the correct Sigma connector instance.
4.  Select the Sigma region or API host that matches your Sigma MCP endpoint.
5.  Complete the Sigma authentication flow.

### Step 2: Configure tool access[​](#step-2-configure-tool-access "Direct link to Step 2: Configure tool access")

1.  Review the Sigma tools that were added.
2.  Ensure each user or group who should use this integration has access to **all** Sigma tools. Partial tool access can prevent the integration from working as expected.
3.  Save your changes.

### Step 3: Verify the connection[​](#step-3-verify-the-connection "Direct link to Step 3: Verify the connection")

1.  As an end user with Sigma access, open **Glean Assistant**.
2.  Ask a question about Sigma data, for example: "Use the Monthly Metrics dashboard to find our current WAU and how far we are from the 1M WAU target."
3.  Confirm that Assistant returns relevant results from Sigma.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### Assistant does not return Sigma data

**Symptom:** Users ask Sigma-related questions but Assistant does not use Sigma tools.

**Cause:** The Sigma MCP server may not be set up correctly, the wrong connector instance may be linked, or the user may not have access to the Sigma tools.

**Fix:**

1.  Confirm that the Sigma MCP server was added successfully.
2.  Verify that it is linked to the correct Sigma connector instance.
3.  Check that the Sigma tools are enabled and the user has access to them.

### Users cannot complete Sigma authentication

**Symptom:** Users are prompted to connect to Sigma, but the setup does not complete successfully.

**Cause:** The selected Sigma region or API host may be incorrect, or the user's Sigma sign-in flow may not complete successfully.

**Fix:**

1.  Verify that the selected Sigma region or API host matches the Sigma MCP endpoint for your deployment.
2.  Retry the Sigma sign-in flow.

### Assistant results do not match the expected Sigma access

**Symptom:** A user cannot retrieve a workbook, page, or metric they expected to access.

**Cause:** Sigma access is enforced per user, so Assistant results depend on the user's own Sigma permissions.

**Fix:** Confirm that the user has access to the relevant Sigma content in Sigma itself, then retry the query in Assistant.
