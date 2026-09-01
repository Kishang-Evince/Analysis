---
url: "https://docs.glean.com/administration/protect/overview"
canonical: "https://docs.glean.com/administration/protect/overview"
title: "About Glean Protect and Protect+"
description: "Compare Glean Protect and Protect+ features — data security, sensitive content scanning, AI guardrails, and agent alignment for enterprise AI deployments."
fetched_at: "2026-09-01T13:29:14.018Z"
---
On this page

**Glean Protect** provides the security foundation for every Glean deployment. Your data lives in a fully isolated cloud with strictly enforced permissions and zero LLM data retention.

**Glean Protect+** is an add-on to Protect. It adds continuous sensitive content scanning across all connected sources and AI security guardrails that detect and block harmful content at every stage of an LLM interaction.

note

Glean Protect+ is a separately licensed add-on to Protect. Contact your Glean account team to get started.

## Capabilities at a glance[​](#capabilities-at-a-glance "Direct link to Capabilities at a glance")

| Capability | Glean Protect | Glean Protect+ |
| --- | --- | --- |
| Sensitive content detection | One-time CSV reports | Weekly and continuous policies across 100+ sources |
| Findings review | CSV export | Customizable dashboards, CSV, and API |
| Remediation | Manual via CSV uploads | Automated enforcement within AI surfaces |
| Severity analysis | Not included | Sensitive content models with classifiers |
| Protect notifications | Not included | Recurring email summaries of Sensitive Findings and AI Security activity |
| AI security guardrails | Not included | Prompt injection, malicious code, and toxic content protection |
| Agent alignment | Not included | Alignment models that check tools before execution Beta |
| Restricted topics | Not included | Policy to monitor AI usage of sensitive topics |
| Partner integrations | Not included | Open ecosystem (Palo Alto Networks, Tines, and SIEM/SOAR) |

## Access Protect and Protect+[​](#access-protect-and-protect "Direct link to Access Protect and Protect+")

important

Only a **Super Admin** or **Sensitive Content Moderator (SCM)** can access Glean Protect or Protect+ and their findings in the Admin console.

[Learn more about administrator roles](/administration/identity/roles/admin-roles)

## Benefits of Protect and Protect+[​](#benefits-of-protect-and-protect "Direct link to Benefits of Protect and Protect+")

### Move from one-time to continuous protection[​](#move-from-one-time-to-continuous-protection "Direct link to Move from one-time to continuous protection")

Instead of relying on one-time scans, Protect+ continuously monitors indexed content and AI interactions in near real time, automatically hiding sensitive documents and blocking unsafe AI requests as they occur.

### Keep your data safe[​](#keep-your-data-safe "Direct link to Keep your data safe")

Detect and remediate overshared or externally exposed sensitive content before it becomes a risk in AI-powered search and agents. Glean’s models start protecting your data right away with out-of-the-box policies.

### Make security an enabler, not a blocker[​](#make-security-an-enabler-not-a-blocker "Direct link to Make security an enabler, not a blocker")

Teams can deploy agents faster with AI security guardrails in Glean Protect+. Automated enforcement keeps Glean secure while users continue working.

### Unified security across data, AI, and agents[​](#unified-security-across-data-ai-and-agents "Direct link to Unified security across data, AI, and agents")

Protect your entire AI ecosystem with a single platform, from indexed documents to AI assistant interactions to autonomous agent workflows.

### Reduce alert fatigue[​](#reduce-alert-fatigue "Direct link to Reduce alert fatigue")

Sensitive content models separate real risks from noise, classifying findings by severity and applying enhanced analysis to reduce false positives while preserving recall on actual threats.

### Help meet regulatory requirements[​](#help-meet-regulatory-requirements "Direct link to Help meet regulatory requirements")

Maintain compliance with data protection regulations through automated scanning, detailed audit trails, customizable policies, and integration with your existing governance workflows.

## Private-by-design platform[​](#private-by-design-platform "Direct link to Private-by-design platform")

Every Glean deployment includes these foundational security capabilities:

-   **Single-tenant architecture** across clouds (AWS, Azure, GCP)
-   **Glean-hosted or customer-hosted** isolated cloud options
-   **Strict permissions enforcement** of connectors
-   **Zero LLM data retention**: no training of LLMs on enterprise data
-   **Strong single sign-on (SSO)** and role-based access controls (RBAC)
-   **Encryption** in transit and at rest
-   **Detailed audit logs**
-   **Compliance certifications**, including ISO 42001, SOC 2 Type II, and ISO 27001
-   **Regional data residency**

## Data security[​](#data-security "Direct link to Data security")

Glean Protect and Protect+ give you layered controls over what content is indexed, scanned, and surfaced in AI responses.

### Glean Protect[​](#glean-protect "Direct link to Glean Protect")

-   **Customizable inclusion and exclusion indexing rules** to control what content gets indexed from each connector
-   **Sensitive content protection** with one-time CSV reports for point-in-time audits
-   **Manual remediation** via CSV uploads to hide sensitive content from Glean

### Glean Protect+[​](#glean-protect-1 "Direct link to Glean Protect+")

-   **Weekly and continuous sensitive findings** across 100+ connectors
-   **Out-of-the-box sensitive findings policies** with support for custom configurations
-   **Customizable dashboards** based on sensitive findings policies
-   **Automated remediation** of overshared sensitive content within AI surfaces
-   **Sensitive content models** via classifiers for automated severity analysis
-   **Triage workflows** to review, assign, and resolve findings
-   **Protect notifications** with recurring email summaries for Super Admins and Sensitive Content Moderators
-   **Open partner ecosystem**, including Palo Alto Networks and Tines

## Safeguard AI agents[​](#safeguard-ai-agents "Direct link to Safeguard AI agents")

Glean Protect and Protect+ control how agents are managed, what data they can access, and what guardrails apply at runtime.

### Glean Protect[​](#glean-protect-2 "Direct link to Glean Protect")

-   **Permissions for agent management**: control who can create, edit, view, or share agents
-   **User-level permissions enforcement**: agents follow user permissions, so they only see data and take actions the user already has access to

### Glean Protect+[​](#glean-protect-3 "Direct link to Glean Protect+")

-   **Prevention against prompt injection**, jailbreak attempts, malicious code, and toxic content
-   **Agent alignment models** that check tools before they execute Beta
-   **Restricted topics policy** to monitor AI usage of sensitive topics

## Feature availability[​](#feature-availability "Direct link to Feature availability")

| Private-by-design platform | Glean Protect | Glean Protect+ |
| --- | --- | --- |
| Single-tenant architecture across clouds (AWS, Azure, GCP) | ✓ | ✓ |
| Glean-hosted or customer-hosted isolated cloud options | ✓ | ✓ |
| Strict permissions enforcement of connectors | ✓ | ✓ |
| Zero LLM data retention; no training of LLMs on enterprise data | ✓ | ✓ |
| Strong single sign-on (SSO) and role-based access controls (RBAC) | ✓ | ✓ |
| Encryption in transit and at rest | ✓ | ✓ |
| Detailed audit logs | ✓ | ✓ |
| Compliance certifications, including ISO 42001, SOC 2 Type II, and ISO 27001 | ✓ | ✓ |
| Regional data residency | ✓ | ✓ |

| Data security | Glean Protect | Glean Protect+ |
| --- | --- | --- |
| Customizable inclusion and exclusion indexing rules | ✓ | ✓ |
| Sensitive content protection with one-time CSV reports | ✓ | ✓ |
| Manual remediation via CSV uploads | ✓ | ✓ |
| Weekly and continuous sensitive findings across 100+ connectors |  | ✓ |
| Recurring Protect email summaries |  | ✓ |
| Out-of-the-box sensitive findings policies |  | ✓ |
| Customizable dashboards based on sensitive findings policies |  | ✓ |
| Automated remediation of overshared sensitive content within AI surfaces |  | ✓ |
| Sensitive content models via classifiers for automated severity analysis |  | ✓ |
| AI security triage workflows |  | ✓ |
| Open partner ecosystem, including Palo Alto Networks Beta and Tines |  | ✓ |

| Safeguard AI agents | Glean Protect | Glean Protect+ |
| --- | --- | --- |
| Permissions for agent management | ✓ | ✓ |
| User-level permissions enforcement | ✓ | ✓ |
| Prevention against prompt injection, jailbreak attempts, malicious code, and toxic content |  | ✓ |
| Agent alignment models Beta |  | ✓ |
| Restricted topics policy |  | ✓ |

## See also[​](#see-also "Direct link to See also")

-   [Introduction to AI Security Guardrails](/administration/protect/ai-security/introduction)
-   [Policies and examples](/administration/protect/ai-security/policies-and-examples)
-   [Configure Protect notifications](/administration/protect/notifications)
-   [Introduction to Sensitive Findings](/administration/protect/sensitive-findings/about)
-   [Manage sensitive content policies](/administration/protect/sensitive-findings/manage-policies)
-   [Configure AI security policies](/administration/protect/ai-security/configuring-policies)
