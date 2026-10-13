---
url: "https://docs.glean.com/administration/managing-skills/skill-scanning"
canonical: "https://docs.glean.com/administration/managing-skills/skill-scanning"
title: "Skill scanning and safety review"
description: "How Glean scans Skills for unsafe content, how moderators review findings and turn off risky Skills, and how scanning is billed"
fetched_at: "2026-10-13T08:49:19.792Z"
---
On this page

Glean scans Skills uploaded locally and Skills imported from a third-party repository for unsafe instructions, malicious code, and other risky content, so moderators can catch problems before a Skill spreads. Skills from Glean are safe by default and aren't scanned. This page covers when scans run, what each status means, how to review findings or turn a risky Skill off, and how to manage scanning as a billed advanced feature.

Scanning runs in the background, and a Skill stays usable while its scan runs. A Skill becomes unusable only when a moderator turns it off. See [Understand the safety model](#understand-the-safety-model).

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Complete the following prerequisites:

-   Have the Skills Moderator, Admin, or Super Admin role to review findings and turn off Skills.
-   Have the Admin or Super Admin role to turn Skill scanning on or off for your organization. See [Set up Skills and manage access](/administration/managing-skills/skills-roles) and [About Role Based Access Control (RBAC)](/administration/identity/roles/about).

Skill scanning is on by default for Skills uploaded locally and for third-party Skill repositories, and it applies regardless of your runtime guardrail configuration. It's a billed advanced feature. Admins can view its pricing and turn it off from **Admin console → Advanced features**. See [Turn Skill scanning on or off](#turn-skill-scanning-on-or-off).

## Know when a scan runs[​](#know-when-a-scan-runs "Direct link to Know when a scan runs")

Glean scans a Skill when its executable content first appears or changes:

-   Someone uploads a Skill locally.
-   Someone imports a Skill from a third-party repository, such as GitHub.
-   The instructions or bundled files of one of those Skills change, whether edited in Glean or pulled in from a repository sync.

Glean doesn't scan Skills from Glean. They're safe by default, so adding one or changing its content doesn't start a scan.

Each time that content changes, Glean starts a fresh scan of that version and clears results from the previous version.

Metadata-only changes don't trigger a new scan. Renaming a Skill, changing its description, adjusting sharing, or turning it on or off leaves the current scan and its results in place.

note

Scanning is asynchronous, so there's a short delay between saving a Skill and its scan starting. The Skill is usable during that window. If a scan doesn't start, Glean queues it again automatically.

## Read scan statuses[​](#read-scan-statuses "Direct link to Read scan statuses")

Each Skill shows one security status for its latest content. Moderators see these statuses on **Admin console → Skills → Manage**. Statuses include text labels, so they don't rely on color alone.

| Status | What it means | Skill usable? |
| --- | --- | --- |
| **Not scanned** | No scan has run yet, or a scan couldn't finish. A failed scan shows a **Retry scan** action. | Yes |
| **Scan in progress** | The scan is queued or running. | Yes |
| **Pass** | The scan finished with no findings. | Yes |
| **Review recommended** | The scan finished and reported one or more findings for review. | Yes, unless turned off |
| **Disabled** | A moderator turned the Skill off because of findings. | No |

A finished scan shows **Pass** when there are no findings, or **Review recommended** when there are. A Skill with findings stays usable until a moderator turns it off, which changes the status to **Disabled**.

A failed scan means Glean couldn't complete the check, not that the Skill is unsafe. It shows as **Not scanned** with a **Retry scan** action, and the Skill stays usable. Editing the Skill also starts a new scan.

## Review findings and severity[​](#review-findings-and-severity "Direct link to Review findings and severity")

When a scan reports findings, each finding includes:

-   A **rule ID** identifying the check that matched, such as `skill.prompt_injection`.
-   A **severity**: Low, Medium, High, or Critical.
-   A plain-language **description** of the issue.
-   An optional **source location** pointing to the file and line range the finding applies to. A finding with no location applies to the whole Skill.

If one issue affects multiple files or separate line ranges, Glean reports it as multiple findings so each points to a single location. The Skill's overall severity is the highest among its findings.

Scanning currently runs these checks:

-   **Prompt injection** — instructions that try to hijack or override the assistant
-   **Malicious code** — code patterns that look harmful
-   **Harmful content** — content that violates safety policy
-   **Bundle structure** — unsafe or duplicate file paths, or files that can't be inspected (for example, non-text files or files that are too large)

The set of checks may expand over time.

### Fix with Glean[​](#fix-with-glean "Direct link to Fix with Glean")

When an owner opens a Skill with findings, they see a **Fix with Glean** action. Applying a fix saves a new version of the Skill and starts a new scan of the updated content. The earlier scan no longer applies.

## Understand the safety model[​](#understand-the-safety-model "Direct link to Understand the safety model")

Scanning is informational and fail-open. A Skill remains usable while its scan hasn't run, is queued or running, has failed, or reports findings. The only thing that prevents use is a moderator turning off the Skill.

A provider outage or a scan failure doesn't turn off Skills your teammates rely on. Findings alone don't stop a Skill from running, even High or Critical ones. A moderator decides what happens next.

Normal Skill status and permission checks still apply. A Skill that's in draft, turned off by its owner, or not shared with someone stays unavailable to them regardless of its scan result.

Only the current scan matters. When a Skill's content changes, its previous scan and any decision on it no longer apply, and a new scan begins.

## Review findings[​](#review-findings "Direct link to Review findings")

Moderators review Skills shared at their scope from **Admin console → Skills → Manage**. Open a Skill with **Review recommended** status to see its findings, each with a rule ID and description, and the date of the last scan.

A moderator can take these actions:

| Action | What it does |
| --- | --- |
| **Dismiss findings** | Clears the review warning for you. The Skill stays usable. |
| **Disable skill** | Turns off the Skill across discovery and execution right away. Its status becomes **Disabled**. |
| **Enable skill** | Turns a Skill back on after it was turned off for security. |
| **Retry scan** | Re-runs a scan that failed. |

Turning off a Skill is the only action that changes whether it can be used. Dismissing findings hides the warning for that reviewer and doesn't change availability.

When an owner fixes a turned-off Skill and saves a new version, the earlier decision no longer applies. The new version starts a fresh scan and the Skill is usable again, until a moderator turns off the new version.

note

Review actions apply to the scan you're looking at. If the Skill's content changes while you review, Glean starts a new scan and rejects a decision made against the old one. Refresh the Skill to see the latest scan and decide again.

### Example of turning off a Skill[​](#example-of-turning-off-a-skill "Direct link to Example of turning off a Skill")

1.  A teammate creates a Skill, and Glean queues a scan.
2.  The scan completes with findings, including a Critical one. The Skill shows **Review recommended** and stays usable.
3.  A moderator reviews the findings and turns off the Skill. It immediately becomes unusable for everyone and shows **Disabled**.
4.  The owner fixes the Skill with Glean or edits it by hand, which creates a new version and starts a new scan. The Skill is usable again unless a moderator turns off the new version.

## See what people see[​](#see-what-people-see "Direct link to See what people see")

What a person sees depends on their relationship to the Skill:

-   Anyone with access to a Skill that's still being scanned sees a short notice that the scan is in progress. The Skill stays usable while the scan runs.
-   Owners and moderators see a **Review recommended** warning on a Skill with findings, listing each finding's rule and description. They can dismiss the warning, which hides it only for that person. Owners also see a **Fix with Glean** action.
-   Anyone with access to a Skill that a moderator has turned off sees a short notice that the Skill is temporarily turned off for security reasons, with a link to learn more. This notice can't be dismissed, and the Skill can't be used until its owner saves a new version or a moderator turns it back on.

Dismissal is per user and applies only to the current scan. If the Skill's content changes, a new scan begins and the warning returns.

## Turn Skill scanning on or off[​](#turn-skill-scanning-on-or-off "Direct link to Turn Skill scanning on or off")

Skill scanning is on by default. Because each scan consumes usage, admins can turn it off for the whole organization.

1.  Navigate to **Admin console → Advanced features**.
2.  Find **Skill scanning**. The card shows the feature's current state and its price.
3.  Turn the feature off or on.

When scanning is off, Glean stops starting new scans. Skills stay usable. Moderators can still turn Skills off or on from **Admin console → Skills → Manage**. When you turn scanning back on, Glean scans a Skill the next time its content changes.

caution

Turning scanning off removes the automated safety check on Skills uploaded locally and on third-party Skill repositories. Skills from Glean aren't scanned either way. Keep it on unless you review that content another way.

## Billing[​](#billing "Direct link to Billing")

Skill scanning is a billed advanced feature. Each scan Glean runs counts toward your organization's usage, in the same way as other advanced features such as Deep research and Image generation.

-   To see the price, open **Admin console → Advanced features** and find **Skill scanning**.
-   To see how much scanning your organization has consumed, open **Admin console → Usage** and select **Advanced features**. Skill scanning appears alongside the other advanced features. See [Usage dashboard: Enterprise Flex](/administration/management/usage/flexcredits-dashboard#advanced-features) or [Usage dashboard: Glean Core Suite and Model Hub](/administration/management/usage/gleancoresuite-dashboard#advanced-features).

Scanning usage counts toward the limits you configure. See [Set usage limits and alerts](/administration/management/usage/set-usage-limits-and-alerts). For questions about how scanning maps to your contract, contact your Glean account team.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

### A scan has been in progress for a while

Scanning runs in the background and can lag behind a save, especially right after a bulk import. The Skill stays usable the whole time. Glean re-queues scans that stall, so no action is needed. Editing the Skill starts a fresh scan against the new content.

### A scan failed

A failed scan means Glean couldn't finish the check, not that the Skill is unsafe. It shows as **Not scanned** with a **Retry scan** action, and the Skill stays usable. Select **Retry scan**, or edit and save the Skill to start a new scan. If scans keep failing for a specific Skill, contact [Glean Support](https://support.glean.com/).

### New Skills never start a scan

Check whether Skill scanning is turned off for your organization under **Admin console → Advanced features**. When it's off, Glean doesn't start scans. Turn it back on, then edit and save a Skill to scan that version.

### A Skill still shows findings after the owner fixed it

Findings reflect the scan of a specific version. When the owner saves a fix, Glean starts a new scan, and the findings clear once that scan completes. Wait for the new scan to finish, then refresh.

### A Skill was turned off and needs to be restored

The owner can fix the Skill with Glean or edit it by hand and save a new version, which starts a fresh scan and restores use. A moderator can also select **Enable skill** to turn it back on if the security concern no longer applies.

### A review action was rejected

If the Skill's content changed while you were reviewing, your decision no longer matches the current scan and Glean rejects it. Refresh the Skill to load the latest scan, then act again.

### Teammates see different warnings for the same Skill

Dismissal is per user and tied to the current scan. One person dismissing a warning doesn't dismiss it for others. When the Skill's content changes, the warning returns until the new scan completes.

## Frequently asked questions[​](#frequently-asked-questions "Direct link to Frequently asked questions")

### Does a finding turn off a Skill automatically?

No. Findings are informational. A Skill with findings shows **Review recommended** and stays usable, even for High or Critical findings, unless a moderator turns it off.

### Does a failed scan turn off a Skill?

No. Scanning is fail-open. A queued scan, a running scan, a failed scan, or a scan with findings leaves the Skill usable. You can retry a failed scan, and editing the Skill starts a new one.

### Do I need to set up scanning?

No. Scanning is on by default and needs no configuration. Moderators get controls for reviewing findings and turning off Skills. Admins can turn scanning off under **Admin console → Advanced features** if they don't want to pay for it.

### Are Skills from Glean scanned?

No. Skills from Glean are safe by default and aren't scanned. Glean scans Skills uploaded locally and Skills imported from a third-party repository. A repository sync that changes that content starts a new scan. Sharing or publishing a Skill doesn't change this.

### Does scanning change the Skill's content?

No. Scanning reads a Skill and reports findings without editing it. Content only changes when an owner applies a fix or edits the Skill, which then starts a new scan.

### Does scanning affect usage or billing?

Yes. Skill scanning is a billed advanced feature, and each scan counts toward your usage. You can see the price under **Admin console → Advanced features** and track consumption under **Admin console → Usage → Advanced features**. See [Billing](#billing).

### Does Glean rescan every Skill when I turn scanning back on?

No. Glean scans a Skill the next time its content changes. Skills that didn't change while scanning was off keep their earlier status.

### Who can turn off a Skill?

Someone with the Skills Moderator, Admin, or Super Admin role can turn off a Skill within their scope. It takes effect immediately across discovery and execution.

## See also[​](#see-also "Direct link to See also")

-   [Skills](/user-guide/assistant/skills) — how teammates create, use, and manage Skills
-   [Share Skills](/administration/managing-skills/share-skills) — share and publish Skills to wider audiences
-   [Set usage limits and alerts](/administration/management/usage/set-usage-limits-and-alerts) — cap advanced feature spend by organization, department, or user
