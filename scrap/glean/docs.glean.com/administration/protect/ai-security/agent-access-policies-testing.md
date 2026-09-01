---
url: "https://docs.glean.com/administration/protect/ai-security/agent-access-policies-testing"
canonical: "https://docs.glean.com/administration/protect/ai-security/agent-access-policies-testing"
title: "Test a policy"
description: "Validate an agent access policy rule against a sample tool call before enforcing it."
fetched_at: "2026-09-01T13:29:13.408Z"
---
Glean Protect+

Before enforcing a rule, validate that its condition fires only on the calls you intend. The policy creation page includes a test panel where you can evaluate a rule against a real tool call's input and output.

1.  Capture a real tool call's input and output. Run an agent that uses the tool in **Preview** mode, open the tool call in **Debug** mode, and copy the input and output JSON.
2.  On the policy creation page, paste the input and output JSON into the test panel on the right side.
3.  Run the test to see whether the rule's condition matches and which action would be taken.
4.  Adjust the condition until the rule matches only the intended calls, then save the policy.

tip

Not sure which fields are available to match on? See [Find a tool's schema](/administration/protect/ai-security/agent-access-policies-tool-schema).

note

This test panel validates a single rule against one sample call. To observe how a rule behaves across real traffic before enforcing it, set the action to **Flag for review** and monitor matches on the [Findings dashboard](/administration/protect/ai-security/findings-dashboard).
