---
url: "https://docs.glean.com/administration/insights/mau-exceeds-employees"
canonical: "https://docs.glean.com/administration/insights/mau-exceeds-employees"
title: "Why MAU Exceeds Employees or Signups"
description: "Understanding and resolving when Monthly Active Users (MAU) percentage shows over 100% compared to employees or signups"
fetched_at: "2026-09-01T13:29:08.257Z"
---
On this page

If your organization's Monthly Active Users (MAU) is greater than your organization's Employee count or Signups, resulting in an Activity rate that exceeds 100%, this implies there are active users in Glean who either (1) are not present in your current organization chart, or (2) were active within the last 28 days but have since been removed from your organization chart. The MAU count includes any user with qualifying activity in the past 28 days, regardless of their current organization chart status.

## Common causes[​](#common-causes "Direct link to Common causes")

This situation is typically caused by two common and easily addressable scenarios:

### Recently terminated employees[​](#recently-terminated-employees "Direct link to Recently terminated employees")

Former employees who were active on Glean before leaving the company may continue to appear in MAU calculations for up to 28 days after their last activity, even if those employees have been removed from your organization chart.

**Why this happens:**

-   MAU is calculated based on activity in the last 28 days
-   Terminated employees may have been active shortly before or after their departure
-   Their accounts may still be accessible for a brief period during the offboarding process

### Stale organization chart data[​](#stale-organization-chart-data "Direct link to Stale organization chart data")

Your organization chart data might be outdated, missing recently hired employees or containing outdated information.

**Why this happens:**

-   Static CSV files haven't been updated recently
-   Identity provider sync has gaps or delays
-   New employees haven't been added to the organization chart connector
-   Department changes or role updates haven't been reflected

## How to resolve this issue[​](#how-to-resolve-this-issue "Direct link to How to resolve this issue")

### Step 1: Update your organization chart[​](#step-1-update-your-organization-chart "Direct link to Step 1: Update your organization chart")

1.  Navigate to the **Admin Console** in Glean
2.  Go to **Setup** → **People** (accessible only to Glean admins)
3.  Review and update your organization chart data:
    -   **If using CSV upload:** Upload a current CSV file with all active employees
    -   **If using identity provider sync:** Verify the sync is working properly and includes all current employees
    -   **If using manual entry:** Add any missing employees and remove terminated ones

### Step 2: Verify the data[​](#step-2-verify-the-data "Direct link to Step 2: Verify the data")

After updating your organization chart:

-   Ensure all active employees are included
-   Confirm terminated employees have been removed
-   Check that department and role information is current

### Step 3: Wait for the metrics to update[​](#step-3-wait-for-the-metrics-to-update "Direct link to Step 3: Wait for the metrics to update")

-   Insights data refreshes once per day
-   You should see the corrected MAU percentage within 24 hours of updating your organization chart
-   If the issue was caused by recently terminated employees, the percentage will naturally decrease as their activity ages beyond the 28-day window

## What to expect after fixing[​](#what-to-expect-after-fixing "Direct link to What to expect after fixing")

Once you've updated your organization chart data:

-   MAU percentage should return to under 100%
-   Coverage metrics (Signups / Employees) will be more accurate
-   Employee-based segmentation and reporting will work correctly

## When to contact support[​](#when-to-contact-support "Direct link to When to contact support")

If your MAU percentage remains over 100% after updating your organization chart and waiting 24 hours, please contact Glean Support. Include:

-   The specific MAU percentage you're seeing
-   When you last updated your organization chart data
-   The method you use for managing organization chart data (CSV, identity provider, etc.)

## See also[​](#see-also "Direct link to See also")

-   [How Glean defines active users](/administration/insights/overview#active-users)
-   [Overview tab on Insights](/administration/insights/overview)
-   [Sync People Data](/get-started/setup/sync-people-data)
