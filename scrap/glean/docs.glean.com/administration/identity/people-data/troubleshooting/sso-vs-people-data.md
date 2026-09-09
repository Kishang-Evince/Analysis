---
url: "https://docs.glean.com/administration/identity/people-data/troubleshooting/sso-vs-people-data"
canonical: "https://docs.glean.com/administration/identity/people-data/troubleshooting/sso-vs-people-data"
title: "Difference between SSO and People Data in Glean"
description: "Understand what SSO controls, what people data controls, and how they work together in Glean."
fetched_at: "2026-09-01T13:29:07.254Z"
---
On this page

## What’s the difference[​](#whats-the-difference "Direct link to What’s the difference")

-   **Single Sign-On (SSO)** controls authentication and access to Glean (who can log in). It does not, by itself, populate user profiles, org chart, or the users directory.
-   **People data** powers user profiles, org chart, users, ranking signals, and personalization in Glean. It is a separate data flow from SSO and must be synced from a directory source (e.g., Okta, Entra ID/Azure, CSV, Indexing API).
-   Outcomes to expect: it is possible to have people data entries for users who cannot log in, or to allow login for users who are hidden from search/directory.

## What SSO does vs. what people data does[​](#what-sso-does-vs-what-people-data-does "Direct link to What SSO does vs. what people data does")

**SSO (OIDC/SAML)**

-   Authenticates users into Glean and manages session access.
-   Glean strongly recommends OIDC for SSO because SAML does not carry the identity attributes Glean needs and only updates on re-auth; with SAML, customers must push directory info separately (CSV or Indexing API).

**People data (Directory sync)**

-   Populates profiles, org chart, users, and signals (e.g., department, manager, location) used for search ranking and personalization. -Required fields include name, title, email, department; manager email is strongly recommended and required for the org chart to populate correctly. -Initial sync and indexing are not instantaneous; allow 2–4 hours on first setup (and ~within an hour for updates thereafter, depending on source and pipeline).

**Decoupled setup**

-   SSO and People Data are intentionally decoupled in product and setup; many tenants use separate apps/credentials and secrets for each.
-   If you configure SSO using OIDC and the IdP is also the directory, you often complete directory access as part of SSO-then you still need to enable that source under People Data in Admin Console.

## Why login does not guarantee a visible profile[​](#why-login-does-not-guarantee-a-visible-profile "Direct link to Why login does not guarantee a visible profile")

-   A user can authenticate via SSO but be missing from people data or missing required attributes (e.g., department, manager), so their profile/org chart node doesn’t appear.
-   Admins can apply “hide” or redlisting rules for invalid people data; these users may still log in but won’t appear in directory/org chart.
-   With SAML-only SSO (no OIDC directory scopes), people data must be supplied via CSV or Indexing API; if not provided, users can sign in without showing up in profiles/org chart/teammates.

## Common customer scenarios[​](#common-customer-scenarios "Direct link to Common customer scenarios")

**User can log in but is missing from the org chart**

-   Likely there is a missing people data record, missing required fields (especially department), or missing manager email needed to build the org chart edge.
-   CSV-based tenants must keep the file up to date; if the person isn’t in the CSV, they won’t appear.

**Non‑Glean users show up in the User Roles section**

-   The User Roles page reflects the directory, not just active Glean accounts; organizations often see all directory users, which can include people who haven’t signed up for Glean yet.

**SAML set up for SSO but no people data**

-   SAML doesn’t provide ongoing identity attributes; customer must connect a people source (Okta/Azure via OIDC scopes) or push CSV/API. If they don’t, login will succeed but with no profiles/org chart.

**Users appear in people data but cannot log in**

-   SSO assignment or access policy may exclude them; because SSO and people sync are separate, a person can be in the directory but not authorized to authenticate into Glean.

**Azure/Entra or Okta setup confusion**

-   Customers may confuse the SSO app vs. the People Data app/credentials; these are saved as separate secrets and often set up as separate apps.

## Troubleshoot missing profiles for users who can sign in[​](#troubleshoot-missing-profiles-for-users-who-can-sign-in "Direct link to Troubleshoot missing profiles for users who can sign in")

Follow these steps if a user can successfully sign in with SSO, but you don’t see their profile or org chart entry in Glean.

1.  **Confirm that people data is configured**
    
    1.  In Glean, go to **Admin Console → Users & permissions → People data**.
    2.  Make sure at least one people source is enabled (for example **Okta, Entra ID/Azure AD, CSV, or Indexing API**) and that the total user count and department list look as you expect.
2.  **Check the user’s people data record**
    
    For the affected user, confirm that the synced record includes:
    
    -   **Name**
    -   **Title**
    -   **Email**
    -   **Department**
    -   **Manager email** (required for the org chart to build the reporting line)
    
    If any of these are missing or incorrect in your directory or CSV, update them there first, then allow time for Glean to re‑sync.
    
3.  **Allow time for sync and indexing**
    
    People data does not update in real time:
    
    -   For a new setup, allow 2–4 hours for the first sync to complete.
    -   For ongoing updates, expect changes to appear in Glean within about an hour after a successful sync, depending on your source.
    
    If you still don’t see the user after a few hours, continue with the steps below.
    
4.  **Verify directory / API permissions**
    
    If you sync from an IdP such as **Entra ID (Azure AD)**:
    
    -   Make sure the app that Glean uses has the correct application permissions to read your directory (for example, `Directory.Read.All` and `User.Read.All`).
    -   If these permissions are missing or only configured as delegated user permissions, Glean may not be able to read all user records.
5.  **Review manager mapping**
    
    If the user appears in people data but is missing from the org chart specifically:
    
    -   Confirm that the manager field is mapped to a stable identifier (typically the manager’s email address).
    -   Avoid using free‑form names or custom IDs that Glean can’t resolve to an actual person; this can prevent org chart edges from being created.
6.  **If you use SAML‑only SSO, add a people source**
    
    If you use **SAML** for SSO:
    
    -   SAML alone usually doesn’t provide enough profile data to build the directory and org chart.
    -   Make sure you also provide people data through one of these options:
        -   An **OIDC‑based directory sync** (for example, from Okta or Entra ID), or
        -   Regular **CSV uploads**, or
        -   A custom integration using the **Indexing API**.
7.  **Check for hidden or excluded users**
    
    Glean can automatically hide certain people from the directory and org chart:
    
    -   In **Admin Console → Users & permissions → People data**, review any **redlists**, exclusion rules, or “attention required” items.
    -   A user whose name or attributes match these rules may be **hidden from people search and org chart**, even though they’re still allowed to sign in via SSO.
    -   If you want the user to appear, adjust the rule or remove them from the redlist/exclusion configuration, then let the next sync run.

**If you have done the above and are still facing issues, please contact Glean Support.**
