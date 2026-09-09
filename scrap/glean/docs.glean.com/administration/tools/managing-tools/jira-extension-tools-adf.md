---
url: "https://docs.glean.com/administration/tools/managing-tools/jira-extension-tools-adf"
canonical: "https://docs.glean.com/administration/tools/managing-tools/jira-extension-tools-adf"
title: "Jira tools: Extension or legacy?"
description: "Compare the ADF-based Jira Extension Tools with the plain-text legacy Jira Tools for Jira Cloud."
fetched_at: "2026-09-01T13:29:14.877Z"
---
On this page

Glean offers two Jira tools, each differing in capabilities, deployment support, and payload formats.

Limitation

Jira Tools and Jira Extension Tools support standard Jira Cloud instances only. Jira Server, Jira Data Center, and Atlassian Government Cloud connectors can index content for search, but you can't select them when configuring Jira tools.

While you can enable both tools for a single Jira instance, doing so can cause inconsistent behavior. The Jira Extension Tools use Atlassian Document Format (ADF) for rich text, while the legacy Jira Tools use plain text. Enabling both may result in duplicate, overlapping tools such as duplicate *Create Issue* or *Comment* options.

tip

For the most consistent user experience, use only one Jira tool per Jira instance. Only enable both if you are actively migrating or strictly require unique capabilities from each tool.

## Comparison: Jira tools[​](#comparison-jira-tools "Direct link to Comparison: Jira tools")

| Feature | Jira Extension Tools | Legacy Jira Tools |
| --- | --- | --- |
| Admin console path | **Admin console** → **Tools** → **Jira Extension Tools** | **Admin console** → **Tools** → **Jira** |
| Status | Beta | GA (General Availability) |
| Supported deployments | Standard Jira Cloud only | Standard Jira Cloud only |
| Payload format | ADF (Atlassian Document Format) | Plain text (rest/api/2) |
| Rich text support | Bold, italic, code blocks, tables, @mentions | Plain text only |
| User mentions | Native Atlassian account ID @mentions | Not supported |
| Tool count | 15+ tools (Create, Edit, Search, Comment, JSM) | 4 core tools |
| Multi-instance support | One set of tools per Jira instance | One set of tools per Jira instance |

## Atlassian Document Format (ADF)[​](#atlassian-document-format-adf "Direct link to Atlassian Document Format (ADF)")

ADF is a structured JSON schema that Jira Cloud uses internally to represent rich text in fields like `description`, `comment`, and other rich-text custom fields. Instead of sending a plain string, the tool sends a JSON object:

```
{  "type": "doc",  "version": 1,  "content": [    {      "type": "paragraph",      "content": [        { "type": "text", "text": "This is a " },        { "type": "text", "text": "bold", "marks": [{ "type": "strong" }] },        { "type": "text", "text": " comment." }      ]    }  ]}
```

### Why ADF matters (API v3 vs. API v2)[​](#why-adf-matters-api-v3-vs-api-v2 "Direct link to Why ADF matters (API v3 vs. API v2)")

Jira Cloud's *REST API v3* used by the Jira Extension Tools strictly requires ADF for all rich text fields. If you send a plain text string to an API v3 `description` or `comment` field, the request will either:

-   **Fail silently:** The field saves as entirely empty.
-   **Throw a 400 Bad Request error:** The API rejects the payload completely.

The legacy Jira Tools use Jira Cloud API v2, which accepts plain strings. They support standard Jira Cloud instances but can't render rich formatting or native elements.

## Choose the right Jira tools[​](#choose-the-right-jira-tools "Direct link to Choose the right Jira tools")

To determine which Jira tools fit your environment, evaluate your deployment type and functional requirements:

### Use Jira Extension Tools if:[​](#use-jira-extension-tools-if "Direct link to Use Jira Extension Tools if:")

-   Your Jira deployment is standard *Jira Cloud*.
-   You require rich text formatting like code blocks, tables, lists in tickets.
-   You are building AI agents that must generate structured content.
-   You need native `@mention` support to notify specific team members.

### Use legacy Jira Tools if:[​](#use-legacy-jira-tools-if "Direct link to Use legacy Jira Tools if:")

-   Your Jira deployment is standard *Jira Cloud*.
-   You require tools that have reached General Availability.
-   Your workflows only require plain text descriptions and comments.

note

Enabling both tools for the same Jira instance will expose duplicate tools to users and agents. While this will not break the integration, it introduces inconsistent behavior and user confusion depending on which tool is triggered. Stick to a single tool per Jira instance unless you are actively migrating.

## ADF in practice: How the LLM processes payloads[​](#adf-in-practice-how-the-llm-processes-payloads "Direct link to ADF in practice: How the LLM processes payloads")

When a user instructs Glean to *create a Jira ticket with a code block in the description*, the LLM automatically constructs the complex ADF JSON payload behind the scenes. Administrators and users do not need to write ADF manually.

However, the LLM will only successfully generate and render ADF if the following prerequisites are met:

1.  Tool authorization: The Jira Extension Tools must be enabled.
2.  Surface availability: The specific tool must be enabled for the target surface like Agents, Assistant, or both.
3.  Field compatibility: The target field in Jira must be configured as a rich text field (data type: `doc`).

note

For standard Jira plain text fields (data type: `string`), ADF is bypassed. The Jira Extension Tools automatically detect the field type and safely transmit standard strings instead.

## Setting up Jira Extension Tools[​](#setting-up-jira-extension-tools "Direct link to Setting up Jira Extension Tools")

1.  Navigate to Glean **Admin console**.
2.  Click **Platform** → **Tools**.
3.  Click **Add tools** and search for **Jira Extension Tools**.
4.  Complete OAuth authentication using a Jira Cloud admin account.
5.  Under **Edit settings**, enable the specific tools you need for **Agents** and/or **Assistant**.

For multi-instance setups (more than one Jira Cloud org), add a separate Jira Extension Tools instance for each Jira instance and name them clearly, for example, "Jira Extension - Engineering" and "Jira Extension - Support".

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### \`@mention\` appears as plain text

For example, `@john.doe` shows as text instead of a real mention.

**Cause:** The legacy Jira Tools don't support ADF mentions. The Jira Extension Tools resolve `@mentions` to Atlassian account IDs automatically.

**Fix:** Use the Jira Extension Tools.

### 400 error when creating or commenting on a Jira Cloud ticket

**Cause:** A plain text string was sent to a REST API v3 rich text field.

**Fix:** Confirm the Jira Extension Tools are enabled. If the error persists, check whether the target field is a custom field of type `string` - those require plain text and reject ADF.

### Jira connector instance doesn't appear when you add tools

**Cause:** The connector uses Jira Server, Jira Data Center, or Atlassian Government Cloud. Jira tools support standard Jira Cloud instances only.

**Fix:** Select a standard Jira Cloud connector instance. You can continue to use a Jira Server or Jira Data Center connector to index content for search, but you can't use it with the out-of-the-box Jira tools.

For any further questions or issues, reach out to the [Glean support team](http://gleanwork.zendesk.com/).
