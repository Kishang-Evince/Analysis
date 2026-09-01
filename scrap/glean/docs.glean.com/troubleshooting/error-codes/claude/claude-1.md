---
url: "https://docs.glean.com/troubleshooting/error-codes/claude/claude-1"
canonical: "https://docs.glean.com/troubleshooting/error-codes/claude/claude-1"
title: "CLAUDE_1"
description: "CLAUDE_1 Error Code"
fetched_at: "2026-09-01T13:30:11.640Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

Glean is unable to list chats from Claude. This error occurs when the Claude Compliance API key configured for the connector does not have the required `read:compliance_user_data` scope.

## Resolution[​](#resolution "Direct link to Resolution")

Ask your Claude Enterprise administrator to ensure that the Compliance API key configured for the Claude connector has access to the `read:compliance_user_data` scope, which is required to list chats.

For additional assistance, contact [Glean Support](https://support.glean.com).
