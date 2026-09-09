---
url: "https://docs.glean.com/administration/protect/plus-quickstart"
canonical: "https://docs.glean.com/administration/protect/plus-quickstart"
title: "Glean Protect+ quickstart"
description: "Launch and validate Glean Protect+ with reports, policies, AI security guardrails, and operational best practices."
fetched_at: "2026-09-01T13:29:14.036Z"
---
On this page

Glean Protect+

This guide walks you through launching and validating Glean Protect+. By the end, you'll have a working sensitive content report, an automated policy running on a schedule, and initial AI security guardrails coverage.

## Verify Protect+ is provisioned in your tenant[​](#verify-protect-is-provisioned-in-your-tenant "Direct link to Verify Protect+ is provisioned in your tenant")

Glean Protect+ is a separately licensed add-on. After your account team confirms your Protect+ subscription, a Glean engineer must complete a one-time provisioning step on your deployment before the Protect+ admin surfaces become visible, even if your contract or invoice already lists Protect+.

To verify that Protect+ is fully provisioned:

1.  Sign in to Glean as a **Super Admin** or **Sensitive Content Moderator**.
2.  Open **Admin Console** and look in the **Protect** section of the navigation.
3.  Confirm that the following tabs are present:
    -   **Sensitive Findings** (with access to dashboards, policies, and findings)
    -   **AI Security** (with access to AI guardrails policies)

If, instead, you see only an onboarding or upsell screen describing Protect+ capabilities - and no **Sensitive Findings** or **AI Security** tabs - provisioning has not yet been completed for your tenant. In that case:

-   Open a ticket with [Glean Support](https://support.glean.com/) and reference your Protect+ entitlement.
-   Glean will complete the provisioning, then ask a Super Admin to recheck the Admin Console to confirm that the **Sensitive Findings** and **AI Security** tabs are visible.

tip

Only a **Super Admin** or **Sensitive Content Moderator** can access Glean Protect+ and its findings in the Admin Console. If your designated Protect+ admins do not have one of these roles, assign the appropriate role from **Admin Console → Users & permissions → User roles** before verifying.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   Understand the [capabilities of both Glean Protect and Protect+](/administration/protect/overview).
    
-   Assign roles responsible for setting up features and reviewing findings:
    
    -   A **Super Admin** sets up security features, assigns elevated roles, and can create global-scope API tokens. They can assign the Sensitive Content Moderator (SCM) role.
    -   A **Sensitive Content Moderator (SCM)** reviews findings, triages issues, and drives remediation with content owners. Once configured, day-to-day review doesn't require Super Admin.
    -   Only a Super Admin or SCM can access Glean Protect and its findings in the Admin console.
    
    tip
    
    You can test Protect+ initially using Super Admin, but we recommend identifying and configuring the SCM role for sustained operations.
    

## Step 1: Run a sensitive content report[​](#step-1-run-a-sensitive-content-report "Direct link to Step 1: Run a sensitive content report")

Start with a Protect report to get fast signals before moving to Protect+ automated policies.

1.  Run a **sensitive content report** focusing on a single connector (for example, Google Drive) and internally or broadly shared content.
2.  Start with a small set of info types such as credentials and region-specific identifiers to reduce false positives.
3.  Export findings to CSV and triage, prioritizing by department risk (for example, HR and Finance) and org-wide sharing.
4.  Optionally, hide documents in Glean via CSV upload after validation as an intermediate risk-reduction step while fixing source permissions. Glean doesn't change source-system permissions.
5.  Establish a weekly review rhythm using deltas for moderator efficiency.

For detailed instructions, see [Manage reports](/administration/protect/sensitive-findings/manage-reports).

## Step 2: Create a policy[​](#step-2-create-a-policy "Direct link to Step 2: Create a policy")

Once you've validated signal quality with a report, move to an automated Protect+ policy.

### Baseline scope[​](#baseline-scope "Direct link to Baseline scope")

Start with a constrained scope to validate precision before expanding:

-   **Connector**: A single source such as Google Drive or SharePoint.
-   **Time period**: Last 60 days.
-   **Sharing filter**: Anyone in your organization.
-   **Info types**: PII and Credentials to start.

### Info types and customization[​](#info-types-and-customization "Direct link to Info types and customization")

-   Begin with predefined types to reduce noise.
-   Use the [GCP DLP API library](https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference) of 100+ info types where applicable. Add custom regex for organization-specific patterns such as sensitive project names or keywords.
-   Keep initial scopes small and broaden based on validated findings.

For the full list of available types, see [Supported info types](/administration/protect/sensitive-findings/supported-info-types). For policy configuration details, see [Manage policies](/administration/protect/sensitive-findings/manage-policies).

### Enforcement[​](#enforcement "Direct link to Enforcement")

Choose an enforcement level based on your confidence in the policy's precision:

-   **Keep visible (report only)**: Useful while tuning to avoid user impact.
-   **Flag for review**: Recommended once signals look promising, to establish moderator flow.
-   **Hide from all**: Hides documents within Glean immediately. Doesn't change source-system permissions.

### Cadence[​](#cadence "Direct link to Cadence")

-   **Near real-time** increments run approximately every 5 minutes for new or modified items. Depending on dataset size, they can take 15 minutes to a few hours.
-   **Weekly full scan** ensures comprehensive coverage and clean baselines.
-   Keep weekly deltas as the primary review unit for moderator efficiency.

### Severity analysis[​](#severity-analysis "Direct link to Severity analysis")

Severity analysis applies Glean’s Sensitive Content Model to classify eligible findings as **High**, **Medium**, **Low**, or **False positive** severity, helping moderators focus on actionable risks and reduce false positives. New policies have severity analysis turned on by default, whether you create them from scratch or start with an out-of-the-box template. The PII, credentials, and financial data templates still supply predefined detection settings.

For details on how severity analysis works, cost estimates, and configuration options, see [Severity analysis](/administration/protect/sensitive-findings/manage-policies#severity-analysis).

## Step 3: Configure data exclusion controls[​](#step-3-configure-data-exclusion-controls "Direct link to Step 3: Configure data exclusion controls")

Glean provides several layers of control over what content it scans and surfaces:

-   **Permission-based controls**: Glean mirrors source permissions by default. Users only see what they can access in the source.
-   **Source filtering**: Exclude entire sites or folders at ingest time. In the admin console, go to **Connectors**, select the source (for example, SharePoint), then go to **Manage Data > Exclusions**. Exclusions take priority over inclusions when conflicts exist.
-   **Label-based filtering**: Honor Microsoft Purview and Google Drive labels to prevent labeled content from being indexed. Supported sources include SharePoint, OneDrive, and Google Drive.

For label-based filtering setup, see [Restrict content via sensitivity labels](/administration/protect/sensitive-findings/restrict-content-via-sensitivity-labels).

## Step 4: Roll out AI security guardrails[​](#step-4-roll-out-ai-security-guardrails "Direct link to Step 4: Roll out AI security guardrails")

AI security guardrails examine three inputs: user prompts, retrieved document content (indirect injection), and model responses. They work on both Glean Assistant and agents.

Policy coverage spans:

-   **Harmful content**: Hate speech, violent rhetoric, and harmful misinformation
-   **Malicious code detection**: Unsafe code in prompts or responses
-   **Prompt injection**: Direct and indirect injection attempts

### Phased rollout[​](#phased-rollout "Direct link to Phased rollout")

Glean recommends rolling out guardrails in phases:

1

Enable for test users

Enable AI guardrails for a subset of users. Use the findings dashboard to check whether the violations look correct and acceptable. You can expect some false positives in the dashboard.

2

Flag for review for all users

Enable guardrails for all users in **Flag for review** mode. Use the findings dashboard to evaluate which policies (harmful content, malicious code, prompt injection) have the most false positives. Establish internal guidelines on which policies to block aggressively versus flag for review.

3

Block high-confidence violations

Use the organizational guidance and learnings from Phase 2 to configure selected policies for **Block**. For example, you might block harmful content in user prompts but flag other categories for review.

4

Monitor ongoing

Monitor the findings dashboard at regular intervals. For findings that are true positives, determine the source of the issue. If the source is a document, hide it from Glean so it doesn't affect future AI usage.

For policy configuration, see [Configure AI security policies](/administration/protect/ai-security/configuring-policies). To understand what each policy covers with examples, see [Policies and examples](/administration/protect/ai-security/policies-and-examples). For findings triage, see [Findings dashboard](/administration/protect/ai-security/findings-dashboard).

## Operations best practices[​](#operations-best-practices "Direct link to Operations best practices")

Follow these best practices for reviewing and triaging findings:

-   Conduct day-to-day review of findings. This is the responsibility of the sensitive content moderator.
-   Protect privacy by turning off call recording during live reviews of sensitive findings or by pre-screening findings before sharing to a wider audience.
-   Provide a simple channel for employees to report overshared content and request help with remediation.
-   Use weekly deltas as the primary review unit for moderator efficiency.

For the findings dashboard and triage workflows, see [View sensitive findings](/administration/protect/sensitive-findings/view-policy-findings).

## API, automation, and integrations[​](#api-automation-and-integrations "Direct link to API, automation, and integrations")

You can extend Protect+ with programmatic access and third-party workflow integrations. Examples include:

-   Access findings and guardrail events via API to automate ticketing, notifications, and workflows.
-   Stream sensitive content and guardrail events to BigQuery and forward them to your SIEM for unified detection and alerting.
-   Use external automation (such as Tines or Palo Alto Networks SOAR) to notify document owners for permission reviews, track acknowledgments, and record remediation outcomes.

For BigQuery analysis, see [Investigate AI security violations](/administration/protect/ai-security/investigating-violations). For Palo Alto Networks integration, see [Configure PANW AI Runtime Security](/administration/protect/ai-security/configuring-panw).

## Measure success[​](#measure-success "Direct link to Measure success")

You can track metrics to evaluate your Protect+ deployment:

-   **False-positive rate**: Reduction over time as you tune policies and info types.
-   **Reviewer time per finding**: Average time spent per finding versus your baseline before Protect+.
-   **Scope coverage**: Number of connectors and time periods covered by active policies.

Start on a constrained scope, compare pre-deployment and post-deployment precision with moderator feedback, then expand once KPIs are met.

## Next steps[​](#next-steps "Direct link to Next steps")

-   [ ]  Run a Protect report and sample findings with your owner or SCM.
-   [ ]  Create a Protect+ policy with **Flag for review** enforcement and validate precision.
-   [ ]  Enable Purview label filtering in your environment. Coordinate with your Glean team to turn on the public beta.
-   [ ]  Test sensitive content policies against SharePoint or Google Drive content limited to the last 30 days before broadening scope.
-   [ ]  Tune thresholds and scopes after one week. Move targeted segments to **Hide from all** where warranted.
-   [ ]  If you're seeing many false positives, enable [severity analysis](/administration/protect/sensitive-findings/manage-policies#severity-analysis) to reduce noise from low-severity findings.
-   [ ]  Document the playbook and expand scope to additional connectors once precision requirements are met.
