---
url: "https://docs.glean.com/connectors/native/stackoverflow/about"
canonical: "https://docs.glean.com/connectors/native/stackoverflow/about"
title: "Overview"
description: "How the Stack Overflow connector works for public Stack Overflow, Stack Overflow for Teams, and Enterprise-authentication, tag filters, APIs, and setup."
fetched_at: "2026-09-01T13:29:44.453Z"
---
On this page

The Stack Overflow connector works with public **stackoverflow.com** content, private **Stack Overflow for Teams** content, and **Stack Overflow Enterprise**.

How each mode is set up:

-   **Public stackoverflow.com:** No authentication is required. Set **`stackoverflow.tagsWhiteList`** in the Glean **Admin console** so Glean knows which tags to crawl (see [Public site setup](#public-site-setup)).
-   **Stack Overflow for Teams:** Authentication uses an access token from [explicit OAuth 2.0](https://api.stackexchange.com/docs/authentication).
-   **Stack Overflow Enterprise:** Authentication uses the API key from your Enterprise instance in the Glean **Admin console** (see [Enterprise setup](#enterprise-setup)).

On the setup page, Glean only crawls questions that contain **all** of the listed tags (logical **AND**). For example, `java;spring` crawls questions tagged with both `java` and `spring`.

Glean reads user access permissions in Stack Overflow and enforces them at query time, so users cannot see search results for content they cannot access in Stack Overflow.

info

All indexed data is stored in a GCP project in your organization’s cloud account. No data leaves your environment.

## Integration features[​](#integration-features "Direct link to Integration features")

Glean currently indexes the following:

-   Questions and answers

## API usage[​](#api-usage "Direct link to API usage")

Glean uses the [Stack Exchange API documentation](https://api.stackexchange.com/docs) to ingest data.

## Public site setup[​](#public-site-setup "Direct link to Public site setup")

1.  In the Glean **Admin console**, set **`stackoverflow.tagsWhiteList`** to a semicolon-separated list of tags to crawl (tag allowlist).

## Enterprise setup[​](#enterprise-setup "Direct link to Enterprise setup")

1.  In the Glean **Admin console**, add your instance API key as **`STACKOVERFLOW_API_KEY`**.
2.  Set **`stackoverflow.useApiKey`** to **`true`**.
3.  Set **`stackoverflow.apiKeyDomain`** to your Enterprise domain.

## Stack Overflow for Teams setup[​](#stack-overflow-for-teams-setup "Direct link to Stack Overflow for Teams setup")

### Retrieve your team ID[​](#retrieve-your-team-id "Direct link to Retrieve your team ID")

1.  In Stack Overflow, go to **Admin Settings** → **Display Settings**.
2.  Find your **Team URL**. It uses the form `https://stackoverflow.com/c/{TEAM_ID}`.
3.  Save the `TEAM_ID` value for the steps below.

### Generate a personal access token (PAT)[​](#generate-a-personal-access-token-pat "Direct link to Generate a personal access token (PAT)")

1.  Open **Global account settings**.
2.  Open **Personal access tokens**, then click **Create a new PAT**.
3.  Use the following values:
    -   **PAT description:** `Glean Search Crawler`
    -   **Team scope:** The team that matches your `TEAM_ID`
    -   **Expiration date:** **No expiration** (recommended to avoid service interruptions)
    -   **Enable write access:** Leave unchecked
4.  Click **Create**, then copy the token value.

### Connect to Glean[​](#connect-to-glean "Direct link to Connect to Glean")

In the Glean **Admin console**, enter:

-   **Personal access token:** The PAT you created in Stack Overflow
-   **Team ID:** The `TEAM_ID` from [Retrieve your team ID](#retrieve-your-team-id)
-   **Allowlisted tags (optional):** A semicolon-separated list of tags to restrict the crawl

note

If you leave **Allowlisted tags** empty, Glean crawls all tags by default. If you list multiple tags, only questions that include **all** of those tags are included (**AND** logic).
