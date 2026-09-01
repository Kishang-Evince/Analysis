---
url: "https://docs.glean.com/troubleshooting/error-codes/servicenow/servicenow-9"
canonical: "https://docs.glean.com/troubleshooting/error-codes/servicenow/servicenow-9"
title: "SERVICENOW_9"
description: "SERVICENOW_9 Error Code"
fetched_at: "2026-09-01T13:30:30.315Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

Multiple active ServiceNow `sys_user` records exist with the same email address. This causes conflicting permissions that may prevent users from accessing content they should be able to see.

## Resolution[​](#resolution "Direct link to Resolution")

### 1\. Identify duplicates[​](#1-identify-duplicates "Direct link to 1. Identify duplicates")

In ServiceNow, open the Users list (`sys_user`) and search for the impacted person's email. Confirm if there are multiple active entries for the same email address.

### 2\. Deactivate duplicate records[​](#2-deactivate-duplicate-records "Direct link to 2. Deactivate duplicate records")

Deactivate the duplicate `sys_user` records that should not be used going forward, leaving a single, correct active record for that email.

### 3\. Wait for next crawl[​](#3-wait-for-next-crawl "Direct link to 3. Wait for next crawl")

The next scheduled crawl will remove stale users and resolve identity collisions.

## Best Practices[​](#best-practices "Direct link to Best Practices")

-   Keep only one active `sys_user` per email address
-   Use distinct email addresses for test accounts (e.g., [test-user@example.com](mailto:test-user@example.com))
-   Regularly audit for duplicate email addresses in the `sys_user` table

For additional assistance, please contact Glean Support at [https://support.glean.com](https://support.glean.com).
