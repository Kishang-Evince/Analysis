---
url: "https://docs.glean.com/administration/protect/ai-security/untrusted-url-monitoring"
canonical: "https://docs.glean.com/administration/protect/ai-security/untrusted-url-monitoring"
title: "Untrusted URL monitoring"
description: "Detect and redact untrusted or fabricated URLs in AI responses to prevent phishing and data exfiltration."
fetched_at: "2026-09-01T13:29:13.804Z"
---
On this page

Glean Protect+

The **Untrusted URL monitoring** policy helps prevent risky links from reaching users. It inspects the links that Glean and your agents include in their responses, and either flags or removes any URL that can't be traced to a trusted source.

Large language models can invent links that look real but don't exist (fabricated URLs), and they can repeat links that came from attacker-influenced content, such as a search result or a retrieved document. Both cases are risks: a fabricated or attacker-controlled link can lead users to phishing pages or encode sensitive data in the URL to exfiltrate it to an external server. This policy gives you visibility into those links and lets you strip the risky ones before they reach the user.

## How it works[​](#how-it-works "Direct link to How it works")

Every URL in a response is checked against the trust rules you configure. A URL is kept when it has a legitimate source. For example:

-   It was returned by a tool you trust.
-   It's on a domain you've marked as trusted.
-   The user provided it in their own message.

Any URL that doesn't clear these checks is treated as **untrusted** and handled according to your enforcement setting. Untrusted URLs fall into two groups:

-   **Fabricated** — the link doesn't appear in any tool output or the conversation, so the model invented it
-   **Untrusted source** — the link is real but came from a tool or source you haven't trusted

## Apply this policy to[​](#apply-this-policy-to "Direct link to Apply this policy to")

Use **Apply this policy to** to choose where the policy runs. Select one or more targets:

| Target | Description |
| --- | --- |
| **Glean Assistant** | All Glean chat messages. |
| **Interactive agents** | Agents with a chat message trigger. |
| **Automatically triggered agents** | Agents with schedule and content triggers. |

The policy runs only against the targets you select. If you clear all targets, the policy is turned off.

## Enforcement[​](#enforcement "Direct link to Enforcement")

Under **Enforcement**, choose what happens when an untrusted URL is detected. Every detected URL is recorded as a finding in the AI security dashboard for review, regardless of the option you choose.

| Option | Behavior |
| --- | --- |
| **Flag for review** | The response is returned unchanged. Each detected URL is logged as a finding. |
| **Redact the URL** | Detected URLs with medium or higher severity are removed from the response and replaced with a `<url redacted>` placeholder. Lower-severity detections stay visible and are logged. Every detection is still logged as a finding. |

## Trusted URLs[​](#trusted-urls "Direct link to Trusted URLs")

Trusted URLs are never flagged or redacted. Use the **Trusted URLs** section to mark the tools and domains you trust. Every other URL is enforced according to your enforcement setting.

### URLs returned in tool output[​](#urls-returned-in-tool-output "Direct link to URLs returned in tool output")

Enable **URLs returned in tool output** to trust links that a tool surfaced to the model rather than treating them as fabricated. URLs from trusted tool output are never redacted. You can scope this trust:

-   **All tools** — links from any tool's output are trusted, except tools you exclude
-   **Specific tools** — only links from the tools you select are trusted

Use the **Match by** dropdown to control how strictly a trusted tool's links are matched:

-   **Match by full URL** — only the exact link the tool returned is trusted. A modified link (for example, with added query parameters) is treated as untrusted. This is the strictest option and helps prevent data exfiltration through parameter padding.
-   **Match by domain** — any link on the same domain as one the tool returned is trusted, including paths the tool never surfaced.

### Domain-wide URLs[​](#domain-wide-urls "Direct link to Domain-wide URLs")

Enable **Domain-wide URLs** to always keep links on domains you trust, even when the model fabricates a link on them. Matching covers the exact host and any subdomain (for example, `glean.com` also covers `app.glean.com`).

-   **Glean recommended domains** — a curated set of well-known, enterprise-safe domains that Glean maintains for you. Enable it to trust these domains without listing them yourself.
-   **Custom domains** — domains you trust on top of the recommended list. Add your own, or add the domains detected from your connectors with one click. Wildcards (`*`) are supported, for example `*.example.com`.

## URLs that are always safe[​](#urls-that-are-always-safe "Direct link to URLs that are always safe")

Some URLs are always treated as safe and are never flagged or redacted, regardless of your policy configuration. These carry no citation risk, so keeping them avoids breaking responses.

-   **Non-citation hosts are always safe.** These are hosts the model emits inside its generated code, markup, or requests rather than as a source it's citing. Redacting them would corrupt the output. Examples include vendor API endpoints such as `graph.microsoft.com`, schema namespaces such as `schemas.openxmlformats.org` and `www.w3.org`, and font or CDN infrastructure such as `fonts.googleapis.com`, `cdn.jsdelivr.net`, and `unpkg.com`.
-   **Reserved TLDs are considered safe.** Domains under the top-level names that standards reserve for documentation, testing, and examples are never real destinations, so a model using them is illustrating rather than citing. Examples include `.test`, `.example`, `.invalid`, and `.localhost`, along with the reserved example domains `example.com`, `example.org`, and `example.net`.
-   **User-pasted domains are safe.** A domain or link the user typed in their own message is trusted. That trust extends to other paths on the same domain, so if a user references `company.com`, a link the model then builds such as `https://company.com/about` is also kept.
-   **Internal-only hostnames are safe.** A hostname that only resolves inside your own network can't cite a public source and can't send data outside it. This covers bare intranet names such as `https://go/relnotesfaq`, service names under a made-up top-level name such as `.internal`, `.corp`, or `svc.cluster.local`, and private, loopback, or link-local IP addresses. Public domains that merely look internal are still enforced, including `erp.internal.fi`, hosts under shared providers such as `*.github.io` and `*.blob.core.windows.net`, path-style storage such as `s3.amazonaws.com/some-bucket/...`, and public IP addresses.

## See also[​](#see-also "Direct link to See also")

-   [Policies and examples](/administration/protect/ai-security/policies-and-examples)
-   [Configuring policies](/administration/protect/ai-security/configuring-policies)
-   [Findings dashboard](/administration/protect/ai-security/findings-dashboard)
-   [Investigating violations](/administration/protect/ai-security/investigating-violations)
