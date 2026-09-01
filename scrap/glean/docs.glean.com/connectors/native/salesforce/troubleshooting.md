---
url: "https://docs.glean.com/connectors/native/salesforce/troubleshooting"
canonical: "https://docs.glean.com/connectors/native/salesforce/troubleshooting"
title: "Troubleshooting"
description: "This section summarizes common issues and resolutions."
fetched_at: "2026-09-01T13:29:40.265Z"
---
On this page

This section summarizes common issues and resolutions.

## Connection and authentication issues[​](#connection-and-authentication-issues "Direct link to Connection and authentication issues")

**Symptoms**

-   Salesforce connector stuck in **Activating** or **Error** state.
-   Errors indicating Glean cannot validate connector credentials or administrative permissions (for example, SALESFORCE\_1–3 error codes).

**Likely causes & fixes**

-   Integration user lacks required **administrative permissions** (e.g., API Enabled, View Roles and Role Hierarchy, View Setup and Configuration, View All Profiles, View Data Categories in Setup).  
    → Review the **Required Salesforce permissions** and update the user’s profile/permission set.
-   Integration user lacks **Read/View All** on required objects (Accounts, Cases, etc.).  
    → Grant appropriate object‑level permissions and retry the connection or crawl.
-   Salesforce connected app / API Access Control is preventing the OAuth flow (e.g., app not approved, IP restrictions, MFA requirements).  
    → Approve the Glean app or relax relevant policies for the integration user.

## Missing objects or fields[​](#missing-objects-or-fields "Direct link to Missing objects or fields")

**Symptoms**

-   An object you expect (e.g., a custom object) does not appear in the Glean **Objects** picker.
-   A field you expect cannot be selected as a facet or filter, or does not appear in results.

**Likely causes & fixes**

-   The object is not **queryable/retrievable** per its Salesforce metadata, or the integration user lacks access to it.  
    → Confirm metadata flags in Salesforce (Object Manager → \[Object\] → Details) and integration‑user access.
-   The field type is not eligible as a **filter** (e.g., not an email, picklist, multipicklist, string, boolean, or combobox).  
    → The field may still be indexable but cannot be used as a structured filter; select a supported field type instead.
-   The field is not readable by the integration user at FLS level, triggering **SALESFORCE\_3** or similar errors.  
    → Grant field‑level read access or remove the field from the configuration.

## Files and Knowledge issues[​](#files-and-knowledge-issues "Direct link to Files and Knowledge issues")

**Symptoms**

-   Files you expect are missing, or appear without content.
-   Knowledge articles do not appear, appear only for some users, or drafts are missing when you expect them.

**Likely causes & fixes**

-   Files:
    -   **ContentDocument** is not configured as an object in the Salesforce connector.
    -   Integration user lacks **Query All Files** permission.
    -   Files exceed the **64 MB** limit or are of unsupported types (encrypted/compressed/media), so only metadata is indexed.
-   Knowledge:
    -   Integration user is not a **Knowledge User** or lacks required Knowledge permissions.
    -   Draft article indexing is not enabled in your deployment (if you expect drafts).

## Slow or stalled crawls[​](#slow-or-stalled-crawls "Direct link to Slow or stalled crawls")

**Symptoms**

-   Initial crawl runs for a very long time.
-   Incremental crawls appear to lag, or backlogs accumulate.

**Likely causes & fixes**

-   Very large data volumes (many records/objects) or very wide objects (many fields) increasing payload size.
-   Low internal QPS / cautious API throttling due to observed Salesforce limits.
-   Extremely complex share record structures causing heavy hourly scans.

**Mitigations**

-   Start with a **smaller object set** and expand as you validate performance.
-   Work with Glean Support to tune crawl frequencies or QPS where appropriate.
-   Consider reducing share‑record crawl frequency for very high‑volume orgs, understanding the trade‑off for permission revocation latency.
