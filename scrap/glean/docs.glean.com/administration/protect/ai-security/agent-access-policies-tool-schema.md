---
url: "https://docs.glean.com/administration/protect/ai-security/agent-access-policies-tool-schema"
canonical: "https://docs.glean.com/administration/protect/ai-security/agent-access-policies-tool-schema"
title: "Find a tool's schema"
description: "Discover the input and output attributes a tool exposes so you can write accurate agent access policy conditions."
fetched_at: "2026-09-01T13:29:13.381Z"
---
Glean Protect+

The attributes available to a [rule condition](/administration/protect/ai-security/agent-access-policies#rule-conditions) depend entirely on the tool. Before writing a rule, find the tool's input and output schema so you reference fields that actually exist.

You can discover a tool's schema by running an agent that uses the tool in preview mode within the agent builder:

1.  In the agent builder, set up an agent that includes the tool you want to write a rule for.
2.  Run the agent in **Preview** mode and trigger the tool.
3.  Open the tool call to inspect the input arguments and the structured output payload. These fields are the attributes you can reference in conditions:
    -   Input arguments map to `params.*` in **tool-call** conditions.
    -   Output fields map to `output.structured.*` in **tool-output** conditions.

tip

Once you know the schema, you can paste a real tool call's input and output JSON into the policy test panel to confirm your condition behaves as expected. See [Test a policy](/administration/protect/ai-security/agent-access-policies-testing).
