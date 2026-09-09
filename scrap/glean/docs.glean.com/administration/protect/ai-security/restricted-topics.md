---
url: "https://docs.glean.com/administration/protect/ai-security/restricted-topics"
canonical: "https://docs.glean.com/administration/protect/ai-security/restricted-topics"
title: "Restricted topics"
fetched_at: "2026-09-01T13:29:13.894Z"
---
On this page

The **Restricted Topics** feature in Glean Protect+ enforces topic-based controls on AI conversations. It detects and controls content related to specific themes, helping enterprises in regulated industries comply with internal policy and regulatory requirements.

Administrators can block or flag user queries on sensitive subjects (for example, performance reviews, disciplinary actions, or compensation) to enforce Acceptable Use Policies.

## Prerequisites and roles[​](#prerequisites-and-roles "Direct link to Prerequisites and roles")

| Role | Responsibilities |
| --- | --- |
| Super Admin | Sets up security features, assigns elevated roles, creates global-scope API tokens. Can assign the Sensitive Content Moderator (SCM) role. |
| Sensitive Content Moderator (SCM) | Reviews findings, triages incidents, and drives remediation with content owners. Day-to-day review doesn't require Super Admin once configured. |

note

Only a Super Admin or SCM can see the Glean Protect admin menu and findings.

You can test Protect+ initially using a Super Admin account, but it's recommended to identify and configure the SCM role for sustained operations.

## Quick start[​](#quick-start "Direct link to Quick start")

1.  In the Admin Console, navigate to **Glean Protect → AI Security Guardrails**.
2.  Select the **Restricted Topics** guardrail.
3.  Create and enable custom topics, or enable out-of-the-box (OOB) topics, and configure:
    -   **Scope** - which users, groups, or agents the policy applies to
    -   **Enforcement** - Flag for review, Redact Response, or Block

## Out-of-the-box topics[​](#out-of-the-box-topics "Direct link to Out-of-the-box topics")

Out-of-the-box (OOB) topics are predefined, read-only, tested topics that ship with Glean Protect+. They appear under the **Provided by Glean** section. The following OOB topics are currently available:

1.  Compensation & Pay Discussions
2.  Personal Financial & Investment Advice
3.  Performance and Personnel Decisions

These topics provide enterprises with readily available, compliant policies and also serve as model examples for creating new custom topics.

Important

OOB topics are read-only - you can enable or disable them, but you can't edit or delete them.

## Custom topics[​](#custom-topics "Direct link to Custom topics")

Custom topics appear under the **Created by You** section.

### Creating a custom topic[​](#creating-a-custom-topic "Direct link to Creating a custom topic")

1.  In the Admin Console, navigate to **Glean Protect → AI Security → Policies → Restricted Topics**.
2.  Click **Add**.
3.  Configure the topic:
    -   **Name** - a clear, concise label (3–50 characters).
    -   **Description** - briefly describe what should and shouldn't be covered (10–900 characters).
    -   **Activities** - add examples that clarify intent and boundaries:
        -   Define at least two **UNSAFE** activities under **Detect** (max 150 characters each). These activities are detected and disallowed.
        -   Define at least two **SAFE** activities under **Exclude** (max 150 characters each). **SAFE** activities are excluded from restriction and are allowed.
        -   You can define up to five **SAFE** and five **UNSAFE** activities per topic.

### Example: Personal Financial & Investment Advice

**Description:** Queries requesting personalized financial or investment advice directing an individual to buy, sell, hold, or allocate assets based on personal circumstances. Includes asking what to invest in, how to allocate a portfolio, or advice substituting for licensed financial guidance. Does not include queries about own pay, benefits, tax withholdings, or account balances; general policy questions; educational questions about how plans work; or publicly available company policies.

**Detect (UNSAFE, disallowed activities):**

-   Asking investment advice for stocks, bonds, crypto, or commodities
-   Requesting portfolio allocation advice for personal situation
-   Asking for personalized tax-saving strategies or how much income to invest, save, or allocate
-   Asking whether to move money into high-risk or speculative assets
-   Asking how to decide between two investment products

**Exclude (SAFE, allowed activities):**

-   Asking about own compensation details such as pay slips, tax withholdings, equity, reimbursements, or employee benefits
-   General questions about employee benefit or company financial policies (timelines, eligibility, or documentation)
-   Seeking general info about how 401(k), retirement plans, or RSU/stock options/ESPP programs work
-   General tax computations or factual tax questions that don't seek tax-saving strategies
-   Asking general questions about inflation, interest rates, or economic trends

### Editing a custom topic[​](#editing-a-custom-topic "Direct link to Editing a custom topic")

1.  Go to **Admin Console → Glean Protect → AI Security → Policies → Restricted Topics**.
2.  Click the topic name you want to edit (custom topics only).
3.  Update any of the following (subject to the same limits as creation):
    -   Name (3–50 characters)
    -   Description (10–900 characters)
    -   SAFE / UNSAFE activities (2–5 of each, max 150 characters per activity)
4.  Click **Save**.

### Deleting a custom topic[​](#deleting-a-custom-topic "Direct link to Deleting a custom topic")

1.  Go to **Admin Console → Glean Protect → AI Security → Policies → Restricted Topics**.
2.  Click the topic name you want to delete (custom topics only).
3.  Click **Delete** and confirm.

## Enabling and turning off topics[​](#enabling-and-turning-off-topics "Direct link to Enabling and turning off topics")

You can control whether a topic is currently applied to AI conversations at runtime with a checkbox next to the topic name on the **AI Security → Policies** page.

info

A maximum of 10 custom topics can be added, and a maximum of 10 topics (custom + OOB) can be enabled at the same time.

## Match confidence levels[​](#match-confidence-levels "Direct link to Match confidence levels")

Match confidence levels indicate the probability that a user query reflects intent to violate a policy, based on context and potential risk.

| Level | Meaning |
| --- | --- |
| **Low** | The content clearly poses no policy risk and aligns with allowed, legitimate usage. |
| **Medium** | The content is ambiguous and may relate to a sensitive topic, but intent to violate policy is unclear. |
| **High** | The content shows strong indicators of policy violation intent based on context and phrasing. |

Important

A topic is considered violated only if the match confidence is **High**.

## Testing topics[​](#testing-topics "Direct link to Testing topics")

Use the Test panel in Restricted Topics to validate how your topics behave before enforcing them.

1.  In the Admin Console, navigate to **Glean Protect → AI Security → Policies → Restricted Topics**.
2.  Ensure the topics you want to evaluate are enabled (checked).
3.  Enter a sample query in the Test Panel, or choose from the sample list.
4.  Click **Run test**.
5.  Review the results - for each enabled topic, the test shows:
    -   Match confidence level (Low, Medium, High)
    -   Reasoning for the classification

Use these results to decide whether you need to tighten or relax topic descriptions and SAFE/UNSAFE activities.

note

Only topics that are currently enabled are evaluated in the Test panel. Topics that are turned off are ignored by the test flow.

## Enforcement options[​](#enforcement-options "Direct link to Enforcement options")

Enforcement controls what happens when a restricted topic is detected.

### Target[​](#target "Direct link to Target")

Use **Target** to choose where the policy is applied. You can select one or more:

-   **Glean (Chat)** - applies to all messages in the main Glean chat surface.
-   **Interactive agents** - applies to interactive (chat-based) agents.
-   **Automatically triggered agents** - applies to scheduled or content-triggered agents.

If at least one topic is selected, you must also select at least one target.

### Action[​](#action "Direct link to Action")

Use **Action** to decide what happens when an enabled topic is violated (match confidence is High):

| Action | Behavior |
| --- | --- |
| **Flag for review** | The agent or chat continues normally and returns the response. The incident is logged as a finding in the AI Security dashboard with the problematic snippet, detected topics, match confidence, and reasoning. |
| **Redact Response** | The response is redacted and replaced with a policy-violation message so sensitive content isn't shown to the user. The incident is logged as a finding. |
| **Block** | The chat or agent workflow is stopped before any response is shown to the user. The incident is logged as a finding. Chat and agent workflow latencies may be slightly higher with this option. |
