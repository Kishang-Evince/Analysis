---
url: "https://docs.glean.com/user-guide/assistant/update-salesforce-opportunities"
canonical: "https://docs.glean.com/user-guide/assistant/update-salesforce-opportunities"
title: "Update Salesforce opportunities in Glean"
description: "Update Salesforce opportunity fields directly from Glean using natural language."
fetched_at: "2026-09-01T13:30:39.679Z"
---
On this page

Glean lets you update Salesforce opportunity records using natural language, without switching to the Salesforce app. You can change fields such as stage, close date, amount, and forecast category by describing the update in plain language. Glean identifies the correct opportunity, proposes the changes for your review, and writes them back to Salesforce after you confirm.

## What you can do[​](#what-you-can-do "Direct link to What you can do")

-   Update standard opportunity fields such as stage, close date, amount, forecast category, next step, and description.
-   Update supported custom fields defined in your organization's Salesforce schema.
-   Review proposed changes side by side with current values before confirming.
-   Receive a direct link to the updated opportunity in Salesforce after each update.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before you can update Salesforce opportunities from Glean:

-   A Glean admin must enable the Salesforce tool and complete Salesforce tools setup. See [Salesforce tools setup](/administration/tools/setup-tools/salesforce-tools-setup) for admin instructions. For newly created Salesforce tools, Update Salesforce opportunity is available in Assistant by default. If your Salesforce tool was created earlier, your admin may still need to verify that the action is enabled for your deployment.
-   You must authenticate your Salesforce account in Glean when prompted. This allows Glean to respect your individual Salesforce permissions.
-   You need edit permission on Opportunity records in Salesforce.

## How it works[​](#how-it-works "Direct link to How it works")

1.  **Ask Glean to make a change.** Describe what you want to update in natural language. Include the opportunity name or enough detail to identify the correct record.
2.  **Glean identifies the opportunity.** Glean searches your Salesforce data to find the matching opportunity. If multiple records match, Glean asks you to confirm which one to update.
3.  **Review the proposed changes.** Glean displays the current values alongside the proposed updates. You can accept, edit, or cancel before anything changes in Salesforce.
4.  **Confirm the update.** Once you approve, Glean writes the changes to Salesforce and confirms success with a link to the updated record.

## Example prompts[​](#example-prompts "Direct link to Example prompts")

Try prompts like these to update opportunities from Glean:

-   "Update the Acme Corp opportunity to Negotiation stage and move the close date to next quarter."
-   "Change the amount on the GlobalTech deal to $150,000 and set probability to 60%."
-   "Set the next step on the Contoso Enterprise License opportunity to Schedule executive review."
-   "Move the Frasier Automotive opportunity to Closed Won and update the close date to today."

## Supported fields[​](#supported-fields "Direct link to Supported fields")

You can update any Opportunity field that your Salesforce org has marked as updateable, including custom fields. The exact set of available fields depends on your organization's Salesforce schema and your field-level permissions.

Common standard fields include:

| Field | Description |
| --- | --- |
| Name | Name of the opportunity. |
| Stage name | Current stage of the opportunity (for example, Prospecting, Negotiation, Closed Won). |
| Close date | Expected or actual close date. |
| Amount | Monetary amount associated with the opportunity. |
| Forecast category | Forecast category (for example, Pipeline, Best Case, Commit). |
| Next step | Planned next action for this opportunity. |
| Description | Additional details or notes. |
| Probability | Probability of winning, as a percentage. |
| Lead source | Source from which the opportunity originated. |

## Tips for better results[​](#tips-for-better-results "Direct link to Tips for better results")

-   **Be specific about which opportunity to update.** Include the opportunity name, account name, or other distinguishing details so Glean can find the right record.
-   **Review proposed changes before confirming.** Glean shows current and proposed values side by side. Take a moment to verify the changes before you approve.
-   **Update multiple fields at once.** You can change several fields in a single request, for example, "Move the Acme deal to Negotiation, set the amount to $200,000, and update the close date to July 15."
-   **Use follow-up messages to adjust.** If Glean proposes changes that aren't quite right, you can ask it to modify specific fields before confirming.

## Limitations[​](#limitations "Direct link to Limitations")

-   All updates respect your Salesforce permissions. You can only update opportunities and fields that your Salesforce profile allows you to edit.
-   Each update requires your confirmation before changes are written to Salesforce.
-   Bulk updates across multiple opportunities in a single request are not supported. Update one opportunity at a time.
-   Not all custom or complex field types may be available in all releases.

## See also[​](#see-also "Direct link to See also")

-   [Update Salesforce opportunity](/tools/connector/salesforce/update-salesforce-opportunity) — tool reference for agent builders, including supported parameters and troubleshooting.
-   [Salesforce tools setup](/administration/tools/setup-tools/salesforce-tools-setup) — admin guide for enabling the Salesforce tools and configuring authentication.
-   [Salesforce tools](/tools/connector/salesforce/sf-index) — full list of available Salesforce tools.
