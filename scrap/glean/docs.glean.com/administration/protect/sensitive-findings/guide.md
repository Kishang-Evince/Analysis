---
url: "https://docs.glean.com/administration/protect/sensitive-findings/guide"
canonical: "https://docs.glean.com/administration/protect/sensitive-findings/guide"
title: "Guide to sensitive findings"
description: "This document outlines best practices for sensitive findings in Glean."
fetched_at: "2026-09-01T13:29:13.965Z"
---
On this page

Glean Protect+

## Target the needle in the haystack[​](#target-the-needle-in-the-haystack "Direct link to Target the needle in the haystack")

Glean’s sensitive policies support over 100 predefined Infotypes, along with custom term and regex-based matching. The goal is to define each policy with precision—targeting the exact identifiers or patterns that reflect truly sensitive data.

These policies are most effective when you know the specific “needle in the haystack” you’re looking for. For example, using a broad term like *“salary”* may generate a high volume of false positives, making it difficult to isolate real risks. Precision helps ensure policies are actionable, accurate, and low-noise—a hallmark of effective DLP.

**Employee data:** Use Infotypes to detect personally identifiable information (PII), such as national ID numbers, taxpayer IDs, or social security numbers across different countries.

**Passwords and authentication tokens:** Leverage Infotypes that match common token patterns (e.g., OAuth, JWT, API keys) to reduce accidental exposure of credentials in places like docs, chat messages, or tickets.

**Customer data:** Use custom regex patterns to match structured customer identifiers (e.g., customer IDs, account numbers). Pair with Infotypes to detect associated emails, phone numbers, or payment information.

**Financial data:** Use Infotypes for financial terms, bank account numbers, and payment card details (e.g., PCI data). When applicable, supplement with regexes for internal codes or ledger IDs.

**Reduction in force (RIF) planning:** Use a combination of project codenames (as terms), personal identifiers (Infotypes), and regexes for equity grant IDs or other sensitive HR references.

**Top secret projects:** Use specific project names or codewords as custom terms. These are often referenced informally across less-controlled environments and can indicate early leakage points.

## Build policies using real examples[​](#build-policies-using-real-examples "Direct link to Build policies using real examples")

The best way to craft effective policies is to start with a known sensitive document:

-   What specific identifiers appear?
-   Are there named projects, IDs, or structured patterns?
-   Can you generalize those patterns into Infotypes, terms, or regexes?

By reverse-engineering your policy from real-world examples, you ensure relevance, reduce noise, and target the data that actually matters.

## Focus on connectors that are overly permissioned[​](#focus-on-connectors-that-are-overly-permissioned "Direct link to Focus on connectors that are overly permissioned")

It’s also important to consider the connector when creating sensitive policies. For example, if you’re concerned about broadly shared HR data but are confident that your HR system is tightly permissioned, it makes sense to focus on other sources where sharing is more flexible and less controlled—like Jira, Slack, Teams, Google Drive, or SharePoint. Targeting these more open platforms can help reduce false positives in your reports and allow you to better pinpoint where sensitive data may be unintentionally exposed.

## Look for broadly overshared information[​](#look-for-broadly-overshared-information "Direct link to Look for broadly overshared information")

We often see customers working on highly confidential projects—like “Project Falcon”—who want to track and protect mentions of the project name. While they may be comfortable with a small group of internal employees accessing this information, their primary concern is exposure to contractors, external exposure, or overly broad internal sharing. In these cases, customers can define sensitive policies using the project name as the term and set conditions based on who has access—such as a contractor email alias, anyone on the internet, or internal and external sharing with 10+ employees. The key is identifying sensitive information that isn’t properly permissioned. One of the strongest signals of risk is how broadly a file is shared across your organization.

## Iterate on policies and use auto-hide capabilities[​](#iterate-on-policies-and-use-auto-hide-capabilities "Direct link to Iterate on policies and use auto-hide capabilities")

It often takes a few iterations for organizations to identify what content is truly sensitive. We recommend refining your policies based on the initial findings they generate. If you’re seeing a large number of findings, consider narrowing the scope by excluding certain terms or focusing on specific connectors. Once you’re confident that a meaningful portion of your sensitive content is covered, you can switch the policy to “hide from all” in Glean. This enables proactive protection without requiring constant oversight. You can always return to the findings dashboard periodically to ensure your policies remain effective and aligned with your organization’s needs.
