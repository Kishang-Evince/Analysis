---
url: "https://docs.glean.com/administration/protect/ai-security/introduction"
canonical: "https://docs.glean.com/administration/protect/ai-security/introduction"
title: "AI Security Overview"
fetched_at: "2026-09-01T13:29:13.588Z"
---
On this page

Glean Protect+

AI Security protects AI agents from malicious prompts, jailbreaks, and hidden commands. It monitors both user prompts and data retrieved by agents to detect and mitigate these threats.

Administrators can create and configure policies that determine which agents are monitored and what action to take when a rule is triggered.

## Design philosophy[​](#design-philosophy "Direct link to Design philosophy")

Glean's AI security policies follow a principle of **defense in depth with minimal false positives**:

-   **Catch genuinely harmful content:** Detect and block requests that seek to cause real-world harm, exploit vulnerable populations, or facilitate illegal activity.
-   **Preserve legitimate use:** Allow everyday workplace queries, academic discussion, news references, and creative content to flow without interruption.
-   **Context matters:** The same words can be harmful or benign depending on intent and context. For example, a casual expression of frustration is not the same as an actual threat.

## Threat types[​](#threat-types "Direct link to Threat types")

-   **Jailbreak / Prompt injection:** Detects attempts to override the AI agent's built-in restrictions through prompt injection or jailbreak attacks. This applies to both user input and data retrieved or used by the agent.
-   **Malicious code:** Identifies harmful or unsafe code in user input and the AI-generated response that could lead to unintended execution or vulnerabilities.
-   **Harmful content:** Detects hate speech, violent rhetoric, and harmful misinformation in both user input and the AI-generated response.

For detailed descriptions of each policy's risk categories and examples of what gets flagged versus allowed, see [Policies and examples](/administration/protect/ai-security/policies-and-examples).

## Policies and Tools[​](#policies-and-tools "Direct link to Policies and Tools")

Every policy specifies its target agents and an enforcement action. A policy might apply to all agents and be set to:

-   “Block and fail” if a prompt-injection is detected
-   “Flag for review” to log the event without failing

## Findings dashboard[​](#findings-dashboard "Direct link to Findings dashboard")

When a policy triggers, an issue is created in the Findings dashboard.

-   For a block policy, the agent run is stopped and an issue is logged
-   For a flag policy, the run continues and an issue is logged

Admins can triage these issues in the UI dashboard with a complete workflow including status tracking (Open, In Progress, Rejected, Allowed) and assignment management. Issues can also be investigated via BigQuery for deeper analysis.
