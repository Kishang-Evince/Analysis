---
url: "https://docs.glean.com/administration/protect/ai-security/configuring-policies"
canonical: "https://docs.glean.com/administration/protect/ai-security/configuring-policies"
title: "Configuring Policies"
fetched_at: "2026-09-01T13:29:13.657Z"
---
On this page

Glean Protect+

Glean Protect+ policies help you control how AI security guardrails are applied across Glean Assistant and agents.

You can use these policies to reduce the risk of prompt injection, sensitive data exposure, and unsafe generated content. For each policy, you choose where the policy applies and what happens when the policy is violated.

To understand what each policy covers and see examples of flagged versus allowed content, see [Policies and examples](/administration/protect/ai-security/policies-and-examples).

## How policies are enforced[​](#how-policies-are-enforced "Direct link to How policies are enforced")

The enforcement rules you define determine what happens when an AI agent's behavior violates a policy. The severity of a violation—whether it's high or low—is a key factor in how the rule is applied.

-   **Block and fail** only high-severity violations: If a prompt or a generated response is flagged as a high-severity threat, the agent's run is immediately stopped and the tool is blocked. Lower-severity issues, however, are simply flagged for your review in the Findings tab, allowing the agent to complete its task without interruption.
-   **Flag for review**: Marks the run for review in the "Findings" tab without stopping the process. This is useful for monitoring potential threats without disrupting agent workflows.

## Where Policies Can Be Applied[​](#where-policies-can-be-applied "Direct link to Where Policies Can Be Applied")

Glean's security policies can be applied across different types of AI agents to fit your organization's specific needs.

-   Glean: This includes all messages sent to the main Glean chat interface.
-   Interactive agents: These are agents that are triggered by a chat message.
-   Automatically triggered agents: These agents are configured to run on a schedule or when content is updated, like an agent that summarizes daily reports or analyzes new knowledge base articles.

## Configuring AI security policies[​](#configuring-ai-security-policies "Direct link to Configuring AI security policies")

You can customize where an AI security policy is enforced and how Glean responds when a violation occurs. This flexibility allows you to phase in security controls, for example, auditing a new policy in Glean Assistant to monitor user impact before applying strict enforcement to automated background agents.

### To configure a policy[​](#to-configure-a-policy "Direct link to To configure a policy")

1.  In the Glean Admin Console, go to **Glean Protect** → **AI security**.
2.  Select the **Policies** tab.
3.  Click **Edit** next to the policy you want to update.
4.  Under **Apply this policy to**, select one or more deployment targets:

| Target | Description |
| --- | --- |
| **Glean Assistant** | Applies the policy to messages sent within the main Glean Assistant interface. |
| **Interactive agents** | Applies the policy to agents triggered during user-initiated, chat-based interactions. |
| **Automated agents** | Applies the policy to agents that execute on a set schedule or trigger automatically in response to content updates. |

5.  Under **If this policy is violated**, choose an enforcement action:

| Action | Behavior |
| --- | --- |
| **Block and fail only high-severity violations** | Blocks the execution only when a violation is classified as high severity. Lower-severity issues are logged for review. |
| **Flag for review** | Allows the execution to continue uninterrupted and logs the incident in **Findings**. |

6.  Click **Save**.

The updated configuration appears immediately in the policy list.

## Agent alignment check policy for write tools[​](#agent-alignment-check-policy-for-write-tools "Direct link to Agent alignment check policy for write tools")

Use the *Agent alignment check* policy to monitor whether the write tools of an agent align with the explicit request of the user and the configured behavior of the agent.

This policy is critical for high-risk workflows, such as automatically triggered agents that execute write tools without user confirmation.

### How agent alignment check works[​](#how-agent-alignment-check-works "Direct link to How agent alignment check works")

When the policy is enabled, the system evaluates auto-approved write tools before they modify data in connected systems. If a potential misalignment is detected, the run is paused or flagged for review in the **Findings** dashboard, allowing administrators to investigate the event and fine-tune their policies.

### Configuration options[​](#configuration-options "Direct link to Configuration options")

You can configure this policy in the Admin Console by navigating to **Glean Protect** → **AI security** → **Policies**.

Within the *Agent alignment check* policy, you can:

-   **Select agent types**: Apply the policy to specific agents, including Glean Assistant, interactive agents, and Automatically triggered agents.
    
-   **Set enforcement rules**: Configure the system to **Flag for review** when a policy violation occurs.
    
-   **Audit flagged runs**: Review and investigate flagged actions directly within the **Findings** dashboard.
    
    ![Agents alignment check policy configuration](/img/agents-alignment-policy-write-tools.png)
    

### Detection examples[​](#detection-examples "Direct link to Detection examples")

This policy helps surface common AI misalignments, such as when an agent:

-   **Executes the wrong tool**: Uses an incorrect write tool entirely unsuited for the task.
-   **Applies incorrect parameters**: Uses the correct write tool but injects unintended or malicious arguments.
-   **Violates instructions**: Attempts a write tool that deviates from either the user's prompt or the agent's system instructions.

## Disabling a Policy[​](#disabling-a-policy "Direct link to Disabling a Policy")

To disable a previously enabled policy:

1.  Change the **Apply this policy to…** setting in the policy edit view from the relevant agent types to **No agents**.

## Reducing False Positives[​](#reducing-false-positives "Direct link to Reducing False Positives")

To help reduce noise and improve the accuracy of AI security detections, you can configure threshold settings:

### Adjusting Detection Thresholds[​](#adjusting-detection-thresholds "Direct link to Adjusting Detection Thresholds")

You can adjust the sensitivity of policy detections by configuring confidence thresholds. This allows you to fine-tune how strictly policies are enforced based on your organization's risk tolerance.
