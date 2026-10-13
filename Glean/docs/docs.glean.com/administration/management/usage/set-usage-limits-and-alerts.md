---
url: "https://docs.glean.com/administration/management/usage/set-usage-limits-and-alerts"
canonical: "https://docs.glean.com/administration/management/usage/set-usage-limits-and-alerts"
title: "Set usage limits and alerts"
description: "Configure usage alerts and limits for your organization, users, teams, and agents."
fetched_at: "2026-10-13T08:49:18.445Z"
---
On this page

You can manage usage alerts and limits for your whole organization, users, teams (departments or identity provider groups), and agents from the **Usage** dashboard. Usage limits reset at the start of each calendar month.

note

The steps below apply to both the [Enterprise Flex dashboard](/administration/management/usage/flexcredits-dashboard) and the [Glean Core Suite and Model Hub dashboard](/administration/management/usage/gleancoresuite-dashboard). Usage amounts appear in **FlexCredits** on Enterprise Flex plans and in **dollars** (Model Hub Usage cost) on Glean Core Suite plans. Where behavior differs by plan, it's called out inline.

## How Glean enforces limits[​](#how-glean-enforces-limits "Direct link to How Glean enforces limits")

Glean enforces limits in near real time. If a user query or agent run crosses the threshold while it's running, Glean lets the in-flight action finish, then blocks subsequent billable usage for the rest of the calendar month. As a result, a small amount of overage may occur.

note

Glean does not support user or agent usage limits for the legacy Glean Enterprise plan.

## Set limits for all users[​](#set-limits-for-all-users "Direct link to Set limits for all users")

Here's how to manage the default usage limit for all users:

At the top of the dashboard, select **Manage usage limits** to display a modal where you can configure usage alerts and monthly usage limits. By default, Glean sends alert emails to Super Admins, Admins, and Billing Moderators.

### Total usage alerts (Enterprise Flex only)[​](#total-usage-alerts-enterprise-flex-only "Direct link to Total usage alerts (Enterprise Flex only)")

Total usage alerts are available on the Enterprise Flex plan, which tracks a pool of credits across your contract period.

In the **All time** section, the **Total usage alerts** card shows your **Total available credits** and contract period.

Under **Admin alerts (daily digest email)**, select the thresholds (**50%**, **75%**, **90%**, or **100%**) at which Glean sends alert emails. To add additional recipients to the alert email list, toggle **Add additional recipients** and enter the email addresses of the recipients.

### Monthly usage limits[​](#monthly-usage-limits "Direct link to Monthly usage limits")

In the **Monthly usage limits** section, you can set the following limits:

-   **Total monthly limit**: Set a total limit for your organization.
-   **User monthly limit**: Set a default limit for each user.
-   **Agent monthly limit**: Set a default limit for each agent.

To set any of these limits, first turn on its toggle. Then, configure the limit and alert threshold:

1.  In the **Usage limit** field, enter the maximum amount allowed for the period (FlexCredits or dollars, depending on your plan).
2.  Under **Admin alerts (daily digest email)**, select the thresholds at which Glean sends alert emails. To add additional recipients to the alert email list, toggle **Add additional recipients** and enter the email addresses of the recipients.
3.  (Optional) Select **Block usage until the next month** to stop usage once the limit is reached. Usage resumes at the start of the next calendar month. If you leave this unchecked, Glean sends alerts to admins but does not block usage once users reach the limit.

When you finish configuring limits, select **Save**.

## Set limits for specific users[​](#set-limits-for-specific-users "Direct link to Set limits for specific users")

You can override the default limit for an individual user.

In the **Breakdown** section of the **Usage** dashboard, select the **By users** tab. Select the three dots menu next to a user to open the **Manage usage limit** modal, where you can set a custom limit, remove their limit, or reset their limit to the default.

### Set a custom limit for a user[​](#set-a-custom-limit-for-a-user "Direct link to Set a custom limit for a user")

1.  Select **Set an amount**.
2.  In the **Usage limit** field, enter the maximum amount the user can consume per month (FlexCredits or dollars, depending on your plan).
3.  (Optional) Select **Block usage until the next month** to stop the user's usage once they reach the limit. The user's usage resumes at the start of the next calendar month.
4.  Select **Save**.

### Remove limit for a user[​](#remove-limit-for-a-user "Direct link to Remove limit for a user")

1.  Select **No limit**. The user has no individual usage limit, but if you configured an organizational limit, it still applies.
2.  Select **Save**.

### Reset a user's limit to the default[​](#reset-a-users-limit-to-the-default "Direct link to Reset a user's limit to the default")

To remove an individual override and reapply the default limit, select **Reset to default**, then select **Save**.

## Set limits within a department[​](#set-limits-within-a-department "Direct link to Set limits within a department")

Apply a monthly department limit to allocate different budgets to different teams without individually configuring each user. For example, you might give each developer within Engineering a higher limit than each staff member within HR.

Prerequisite

Department limits rely on the department metadata in your people data. Make sure department members have department information in your identity provider or org chart. See [People data attribute mapping](/administration/identity/people-data/attribute-mapping).

To set a limit for a department:

1.  Select the **Current month**. In the **Breakdown** section of the **Usage** dashboard, select the **By departments** tab.
2.  Select the three dots menu next to a department to open the **Manage usage limit** modal.
3.  Select **Set an amount**, then enter the maximum amount each member of the department can consume per month (FlexCredits or dollars, depending on your plan).
4.  (Optional) Select **Block usage until the next month** to stop a member's usage once they reach the limit. Their usage resumes at the start of the next calendar month. If you leave this unchecked, Glean sends alerts to admins but does not block usage once users reach the limit.
5.  Select **Save**.

Glean enforces department limits the same way as user limits. For details, see [How Glean enforces limits](#how-glean-enforces-limits).

### How department limits interact with other limits[​](#how-department-limits-interact-with-other-limits "Direct link to How department limits interact with other limits")

A department limit is *not pooled*. It sets the same monthly limit for *each* member of the department. For example, if you set a $100 department limit for R&D, every user in R&D gets an individual $100 limit — not $100 shared across the whole team.

When more than one limit could apply to a user, Glean enforces the most specific one, in this order:

1.  **Individual user limit**: An override set for a specific user on the **By users** tab.
2.  **Department limit**: The limit set for the user's department.
3.  **Default user limit**: The organization-wide user limit.

Rollout considerations

-   Start with alert-only limits (leave **Block usage until the next month** unchecked) to observe how each department consumes before you enforce hard caps.
-   Set higher limits for departments that rely on Glean more heavily, and use individual overrides for power users who need more headroom than their department's limit allows.
-   Because department attribution follows current department metadata, revisit your limits after reorganizations so they stay aligned with your teams.

## Set team limits[​](#set-team-limits "Direct link to Set team limits")

Team limits apply a monthly per-user default to every current member of a selected team. The limit isn't a shared team budget. For example, a $100 team limit gives each member a $100 monthly limit.

Prerequisite

Your teams and their memberships must be available in Glean before you configure limits. See [Group-based permissions](/administration/identity/roles/group-based-permissions) for supported identity providers and identity sync requirements. You don't need to assign Glean roles to a team to use it for usage limits.

### Switch from departments to IdP groups[​](#switch-from-departments-to-idp-groups "Direct link to Switch from departments to IdP groups")

A workspace uses either departments or IdP groups as the team source for per-user defaults. You can't apply both at the same time.

warning

Switching to IdP groups discards existing department-level default usage limits. Individual user overrides and the organization-wide default user limit aren't affected. You can't recover discarded department-level defaults if you switch back.

To use IdP groups as your teams:

1.  Select the **Current month**. In the **Breakdown** section of the **Usage** dashboard, open the three dots menu and select **Manage usage by IdP groups instead**.
2.  In the **Settings** modal, select **Switch to Groups**. This changes the **By departments** view to **By groups** and discards existing department-level default usage limits.
3.  (Optional) To change how Glean resolves limits for users who belong to more than one configured team, open the three dots menu next to the **Groups** breakdown, select **Group settings**, then choose an option under **Multi-group usage limit**. If you take no action, Glean applies **Highest limit**.
    -   **Highest limit** applies the highest matching limit. A team with no limit takes precedence over teams with a limit.
    -   **Lowest limit** applies the lowest matching limit. A team with no limit doesn't override a team with a limit.
4.  Select **Save**.

Before switching, make sure an IdP group provider is configured and its groups and memberships are available in Glean. If a user doesn't belong to a team with a configured limit, the default user limit applies.

### Set a limit for a team[​](#set-a-limit-for-a-team "Direct link to Set a limit for a team")

1.  Select the **Current month**. In the **Breakdown** section of the **Usage** dashboard, select the **By groups** tab.
2.  Select the three dots menu next to a team, then click **Manage user usage limit**.
3.  Select **Set an amount**, then enter the maximum amount each member can consume per month (FlexCredits or dollars, depending on your plan).
4.  (Optional) Select **Block usage until the next month** to stop a member's billable usage once they reach the limit. Their usage resumes at the start of the next calendar month. If you leave this unchecked, Glean sends alerts but doesn't block usage.
5.  Click **Save**.

### View team usage[​](#view-team-usage "Direct link to View team usage")

The **By groups** tab shows each synced team's current member count, current-month usage, and configured per-user limit. The usage total includes each current member's full usage. It isn't progress toward a pooled team limit.

A user who belongs to multiple teams contributes their full usage to each team. As a result, team totals overlap and shouldn't be added together or compared with the organization total. For previous months, the dashboard attributes usage using the current team membership data, not the membership from that month.

### How team limits interact with other limits[​](#how-team-limits-interact-with-other-limits "Direct link to How team limits interact with other limits")

When more than one per-user limit could apply, Glean uses this order:

1.  **Individual user limit**: An override set for a specific user on the **By users** tab
2.  **Team limit**: The team limit selected by the **Highest limit** or **Lowest limit** setting
3.  **Default user limit**: The organization-wide user limit

Organization-wide and agent limits apply independently. Reaching either limit can still block a request even when a user's individual or team limit hasn't been reached.

Team membership changes affect the user's limit going forward. Glean keeps the user's existing month-to-date usage, so joining or leaving a team doesn't reset their usage.

Team usage limits control how much team members can consume. They don't grant access to Glean features or change connector permissions. To manage roles and feature access with IdP groups, see [Group-based permissions](/administration/identity/roles/group-based-permissions).

## Set limits for all agents[​](#set-limits-for-all-agents "Direct link to Set limits for all agents")

Here's how to manage the default usage limit for all agents:

1.  At the top of the dashboard, select **Manage usage limits** to display a modal where you can configure usage alerts and monthly usage limits.
2.  Toggle on **Agent monthly limit**.
3.  Configure the limits according to the previous instructions in [Set limits for all users](#set-limits-for-all-users), but for all agents instead of users.

## Set limits for specific agents[​](#set-limits-for-specific-agents "Direct link to Set limits for specific agents")

Admins and users with edit permission on a published agent can select **View usage** to open the agent's usage page even if the organization hasn't configured a usage limit. The organization must enable the usage feature. To configure a limit, use **Manage usage limit** on the **Usage** tab in the **Admin dashboard**.

Here's how to manage the usage limit for a specific agent:

1.  In the **Breakdown** section of the **Usage** dashboard, select the **By product types** tab.
2.  Select **Agents** to open the Agents usage page.
3.  On the Agents usage page, select the three dots menu next to an agent to open the **Manage usage limit** modal. Configure the limits according to the previous instructions in [Set limits for specific users](#set-limits-for-specific-users), but for the agent you selected instead of a specific user.

## End-user experience with limits[​](#end-user-experience-with-limits "Direct link to End-user experience with limits")

As a user approaches and reaches a configured limit, Glean notifies them through email and in-product banners so they know their current status. End-user notifications appear at 75%, 90%, and 100% of the limit. The 50% threshold applies only to admin alert emails.

End users can view a personal usage page under **Profile** → **Your settings** → **Usage**. The page is available for all end-users on Enterprise Flex and Glean Core Suite plans. It shows their current-month usage across product surfaces and models, and when an applicable hard-cap limit is enabled for a user, their progress toward that limit. For details, see [View your usage](/user-guide/advanced/view-my-usage).

## Usage limits FAQs[​](#usage-limits-faqs "Direct link to Usage limits FAQs")

### What happens when a limit is reached?

If an enforced limit is reached, Glean lets the in-flight action finish, then blocks subsequent billable usage for the rest of the calendar month. As a result, a small amount of overage may occur.

For Enterprise Flex customers, end users can continue using basic chat capabilities after a limit is reached, but premium and billable models are blocked until the start of the next calendar month.

### Why do small overages happen when I set a limit?

Glean enforces limits in near real time, but a small amount of overage can occur if a user query or agent run crosses the threshold as it completes. Glean allows the in-flight action to finish, then blocks subsequent billable usage for the rest of the calendar month if the limit is enforced.

### What if my organization is migrating pricing plans?

If your organization migrates between pricing plans, you need to reset your usage limits as part of the transition.

### If I set a monthly recurring budget before, does it carry over to the new usage limits?

No. If you previously set a monthly recurring budget, you need to reconfigure those alerts as usage limits.

### Why don't the usage counts match between the overview and breakdown?

Different dashboard widgets may refresh at different times. See the **Updated** timestamp in the dashboard for its last refresh time. Counts align as the dashboard continues to refresh.

### Why doesn't the feature-level total match my contract total?

The **Usage** dashboard focuses on usage. Your contract may include additional terms that aren't reflected in feature-level usage, such as minimum commitments and overage pricing.

Additional plan-specific terms:

-   **Enterprise Flex**: FlexCredits allocated to specific add-ons or bundles.
-   **Glean Core Suite**: Flexible Model Management. To learn more, see [Glean Flexible Model Management](/glean-core-suite-pricing#glean-flexible-model-management).

If you have questions about how usage maps to billing, or how Glean calculates overages, contact your Glean account team.
