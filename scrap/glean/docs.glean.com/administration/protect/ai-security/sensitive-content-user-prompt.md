---
url: "https://docs.glean.com/administration/protect/ai-security/sensitive-content-user-prompt"
canonical: "https://docs.glean.com/administration/protect/ai-security/sensitive-content-user-prompt"
title: "Sensitive content in user prompt"
fetched_at: "2026-09-01T13:29:13.766Z"
---
On this page

The **Sensitive content in user prompt** policy detects sensitive data - such as credentials, PII, financial information, and government IDs - in user messages before they reach the AI model. Administrators define regex-based pattern groups to identify content that should not appear in prompts, and choose whether to flag matches for review or block the interaction.

note

This policy scans user prompts only. It does not scan AI-generated responses or retrieved data.

## Prerequisites and roles[​](#prerequisites-and-roles "Direct link to Prerequisites and roles")

## Prerequisites and roles[​](#prerequisites-and-roles-1 "Direct link to Prerequisites and roles")

To identify and manage sensitive content in user prompts, have one of the following roles:

| Role | Responsibilities |
| --- | --- |
| Super Admin | Sets up security features, assigns elevated roles. Can assign the Sensitive Content Moderator (SCM) role. |
| Sensitive Content Moderator (SCM) | Configures pattern groups, reviews findings, and manages enforcement actions. |

note

Only a Super Admin or SCM can see the Glean Protect admin menu and configure this policy.

## Pattern groups[​](#pattern-groups "Direct link to Pattern groups")

A pattern group is a collection of related regex patterns organized by category. For example, a "Credentials & Secrets" group might contain patterns for AWS keys, JWT tokens, and private keys.

Each pattern group has:

-   **Name** - a descriptive label shown in the admin UI and findings
-   **Description** (optional) - context about what the group detects
-   **Patterns** - one or more regex patterns, each individually toggleable

## Templates[​](#templates "Direct link to Templates")

Glean provides pre-built pattern group templates for common sensitive content categories. Templates are **copies**. Once you add a template, you fully own the patterns and can modify, enable, or disable them independently.

| Template | Patterns included | Example matches |
| --- | --- | --- |
| Credentials & Secrets | Generic API Key/Secret, Vendor-Prefixed API Key, Bearer Token, JWT Token, AWS Access Key ID, Basic Auth Header, Private Key (PEM) | `AKIA1234ABCD5678EFGH`, `eyJhbGci...` |
| PII | Email Address, US Phone Number, IPv4 Address | `user@company.com`, `(555) 123-4567` |
| Financial Data | Credit Card Number, IBAN Code | `4XXX-XXXX-XXXX-1234` |
| Government IDs | US SSN, US ITIN, UK NINO, India Aadhaar, Canada SIN | `123-45-6789` |

info

All template patterns start disabled. You choose which to enable after copying.

## Steps[​](#steps "Direct link to Steps")

Here's how to add patterns you want to detect in user prompts:

1.  In the Admin Console, navigate to **Glean Protect > AI Security > Policies**.
2.  Select **Sensitive content in user prompt**.
3.  Click **Add pattern group** and select a template (or create a custom group).
4.  Enable the patterns you want to detect.
5.  Choose an enforcement action (Flag for review or Block).
6.  Click **Save**.

## Enforcement options[​](#enforcement-options "Direct link to Enforcement options")

### Target[​](#target "Direct link to Target")

Use **Target** to choose where the policy is applied. You can select one or more:

-   **Glean Assistant** - applies to all Glean chat messages.
-   **Interactive agents** - applies to interactive (chat-based) agents.
-   **Automatically triggered agents** - applies to scheduled or content-triggered agents.

### Action[​](#action "Direct link to Action")

| Action | Behavior | Use when |
| --- | --- | --- |
| **Flag for review** (Monitor) | The prompt proceeds normally. A finding is created for admin review in the Findings tab. | You want visibility without disrupting users. Recommended for initial rollout. |
| **Block the run** | The prompt is rejected immediately. The user sees a policy violation message. The agent run is terminated. | You need strict enforcement for highly sensitive content (e.g., production API keys). |

False positives

Regex-based matching can produce false positives - for example, a phone number pattern might match an order ID, or a credit card pattern might match a long numeric string in a document reference. Always start with **Flag for review** mode to evaluate match quality before switching to **Block**. Overly broad patterns in Block mode will disrupt users with incorrect rejections.

Important

Enforcement applies to all pattern groups collectively. You cannot set different actions per group.

## How to configure[​](#how-to-configure "Direct link to How to configure")

### Add a pattern group from a template[​](#add-a-pattern-group-from-a-template "Direct link to Add a pattern group from a template")

1.  Navigate to the Sensitive content policy page.
2.  Click **Add pattern group**.
3.  In the modal, click a template card (e.g., "Credentials & Secrets").
4.  The pattern group drawer opens pre-filled with the template's patterns.
5.  Toggle on the patterns you want to enable.
6.  Optionally modify the name, description, or patterns.
7.  Click **Add**.
8.  Click **Save** on the policy page to apply.

### Create a custom pattern group[​](#create-a-custom-pattern-group "Direct link to Create a custom pattern group")

1.  Click **Add pattern group**.
2.  Click **Create custom pattern group**.
3.  Enter a name (required) and optional description.
4.  Click **\+ Add pattern** to add regex patterns:
    -   **Name** - descriptive label for the pattern
    -   **Pattern (Regex)** - the RE2 regex expression
5.  Toggle patterns on/off as needed.
6.  Click **Add**.
7.  Click **Save** on the policy page to apply.

### Test patterns before enabling[​](#test-patterns-before-enabling "Direct link to Test patterns before enabling")

1.  Open the pattern group drawer.
2.  Enter sample text in the **Text to test** area.
3.  Click **View results**.
4.  Review which patterns matched and what text they detected.
5.  Adjust patterns as needed before enabling enforcement.

### Review findings[​](#review-findings "Direct link to Review findings")

When patterns match in Monitor mode:

1.  Navigate to **Glean Protect > AI Security > Findings**.
2.  Filter by **Policy: Sensitive content in user prompt**.
3.  Click a finding to see:
    -   **Snippet** - the user's message that triggered the match
    -   **Matches** - which pattern groups and patterns fired
    -   **Surface** - whether it was Glean Chat or an Agent
    -   **Conversation link** - jump to the full conversation for context

## Pattern syntax[​](#pattern-syntax "Direct link to Pattern syntax")

Patterns use **RE2 regex syntax** ([full reference](https://github.com/google/re2/wiki/Syntax)). RE2 provides linear-time matching performance, making it safe for real-time scanning.

**Supported features:**

-   Character classes: `[A-Z]`, `[0-9]`, `\d`, `\w`, `\s`
-   Quantifiers: `*`, `+`, `?`, `{n}`, `{n,m}`
-   Alternation: `|`
-   Grouping: `(?:...)` (non-capturing)
-   Anchors: `\b` (word boundary), `^`, `$`
-   Case-insensitive: `(?i)`

**Not supported:**

-   Lookaheads: `(?=...)`, `(?!...)`
-   Lookbehinds: `(?<=...)`, `(?<!...)`
-   Backreferences: `\1`, `\2`

info

If you receive an error about "unsupported Perl syntax", your pattern likely uses a feature not available in RE2.

## Limits[​](#limits "Direct link to Limits")

| Resource | Limit |
| --- | --- |
| Pattern groups per policy | 10 |
| Patterns per group | 10 |
| Pattern regex length | 500 characters |
| Test input text length | 2,000 characters |

## Best practices[​](#best-practices "Direct link to Best practices")

1.  **Start with Monitor mode.** Enable patterns in Flag for Review mode first. Review findings for 1-2 weeks to identify false positives before switching to Block.
2.  **Be specific with patterns.** Broad patterns generate noise. Prefer patterns with structural markers (separators, prefixes, specific lengths) over patterns that match any N-digit number.
3.  **Use templates as a starting point.** Templates provide well-tested patterns. Copy and customize rather than writing from scratch.
4.  **Organize by sensitivity.** Create separate groups for content that requires different levels of urgency when reviewing findings.
5.  **Test before enabling.** Always use the test feature to validate patterns against representative sample text before enabling them for production traffic.
