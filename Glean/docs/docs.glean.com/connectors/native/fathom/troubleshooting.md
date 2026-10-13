---
url: "https://docs.glean.com/connectors/native/fathom/troubleshooting"
canonical: "https://docs.glean.com/connectors/native/fathom/troubleshooting"
title: "Fathom troubleshooting and FAQs"
description: "Resolve setup, authorization, and missing-content issues on the Fathom connector."
fetched_at: "2026-10-13T08:49:50.875Z"
---
On this page

This page covers the issues most often reported on the Fathom connector. For setup steps, see the [Fathom setup guide](/connectors/native/fathom/setup).

## Setup and authorization[​](#setup-and-authorization "Direct link to Setup and authorization")

### Fathom rejects the redirect during authorization[​](#fathom-rejects-the-redirect-during-authorization "Direct link to Fathom rejects the redirect during authorization")

**Symptoms:**

-   Clicking **Authorize** returns an error from Fathom instead of completing the OAuth flow.

| Likely cause | Fix / Remediation |
| --- | --- |
| **Redirect URL mismatch:** The **Production redirect URL** on the Fathom app doesn't match the URL Glean sends. | Copy the redirect URL from the Fathom setup page in the **Admin console** and paste it into the Fathom app exactly, including the scheme, host, and path. Don't construct the URL by hand. |
| **Wrong app type:** The Fathom app uses an app type other than a public app. | In Fathom, go to **Settings → API access** and register the app again with **Create public app**. |

### Setup fails with an invalid client error[​](#setup-fails-with-an-invalid-client-error "Direct link to Setup fails with an invalid client error")

**Symptoms:**

-   Authorization fails, and Fathom reports that the client is unknown or the secret is wrong.

| Likely cause | Fix / Remediation |
| --- | --- |
| **Credentials mistyped or truncated:** Someone copied the client ID or secret incompletely. | Re-copy both values from the Fathom app and re-enter them in **OAuth Client ID** and **OAuth Client Secret**. |
| **App deleted or re-registered in Fathom:** Fathom no longer recognizes the credentials because someone deleted or re-registered the app. | Register the app again in Fathom, then enter the new client ID and secret in Glean. |

### No Fathom users appear in Glean[​](#no-fathom-users-appear-in-glean "Direct link to No Fathom users appear in Glean")

**Symptoms:**

-   Setup fails with `FATHOM_1` when Glean can't read the Fathom user list.

| Likely cause | Fix / Remediation |
| --- | --- |
| **The setup account isn't a Fathom account admin:** Fathom restricts its user list API to account admins, so Fathom rejects the request. | Re-run **Authorize** on the Fathom setup page and sign in with a Fathom account admin. |
| **Fathom revoked the admin authorization:** Fathom no longer accepts the stored authorization. | Check the app under **Settings → API access** in Fathom, then authorize again in the **Admin console**. |

### Glean never prompts a user to connect Fathom[​](#glean-never-prompts-a-user-to-connect-fathom "Direct link to Glean never prompts a user to connect Fathom")

**Symptoms:**

-   A user never sees a prompt to connect Fathom and gets no error explaining why.

If the user saw and dismissed a prompt, they can connect Fathom from **Settings → Connectors**. If Glean has never shown Fathom to the user, the user may be missing from the Fathom user list, and an administrator needs to reauthorize the connector.

| Likely cause | Fix / Remediation |
| --- | --- |
| **The setup account isn't a Fathom account admin:** Fathom rejects the user-list request, so Glean discovers no users and prompts none. | Re-run **Authorize** on the Fathom setup page as a Fathom account admin, then wait for the next user sync. See [FATHOM\_1](/troubleshooting/error-codes/fathom/fathom-1). |
| **The user dismissed the prompt:** The user saw and closed the search-results banner. | Have the user connect Fathom from **Settings → Connectors** instead. |

## Missing content[​](#missing-content "Direct link to Missing content")

### Glean doesn't show a user's meetings[​](#glean-doesnt-show-a-users-meetings "Direct link to Glean doesn't show a user's meetings")

**Symptoms:**

-   A user can open a meeting in Fathom but can't find it in Glean.

| Likely cause | Fix / Remediation |
| --- | --- |
| **The user hasn't authorized Fathom:** Glean indexes a meeting only when an authorized account returns it. | Have the user connect Fathom from the search-results banner or from **Settings → Connectors**. After the user connects, Glean indexes their accessible meetings during a subsequent crawl. If Glean never prompts the user, see [Glean never prompts a user to connect Fathom](#glean-never-prompts-a-user-to-connect-fathom). |
| **The user connected recently:** Glean processes the user's meetings during scheduled crawls rather than immediately after authorization. | Wait for subsequent crawl cycles. If the user still sees no Fathom results after the connector has had time to crawl, contact [Glean Support](https://support.glean.com). |
| **The user's authorization stopped working:** The refresh token expired or Fathom revoked the authorization, so Glean can no longer refresh the user's token. The next crawl removes that user's access. | Have the user authorize Fathom again. |
| **The meeting is newer than the last crawl:** The connector doesn't use Fathom webhooks, so new meetings arrive on a schedule. | Wait for the next incremental crawl. See [Crawling frequency and freshness](/connectors/native/fathom/about#crawling-frequency-and-freshness). |

### Glean hasn't reflected an edited summary or a new share[​](#glean-hasnt-reflected-an-edited-summary-or-a-new-share "Direct link to Glean hasn't reflected an edited summary or a new share")

**Symptoms:**

-   Someone renamed a meeting, changed its summary, or shared it with more people, but Glean still shows the earlier state.

| Likely cause | Fix / Remediation |
| --- | --- |
| **Fathom's API doesn't provide an "updated after" filter:** An incremental crawl requests only newly created meetings. The next full crawl picks up changes to existing meetings. | Wait for the next full crawl. |

### Initial indexing is slow[​](#initial-indexing-is-slow "Direct link to Initial indexing is slow")

**Symptoms:**

-   Meetings appear gradually over several hours or days after setup.

| Likely cause | Fix / Remediation |
| --- | --- |
| **Fathom rate limits:** Fathom returns rate-limit headers that tell Glean when to back off. Glean reads those headers and continues indexing across crawl cycles when Fathom reports a rate limit. | Wait for subsequent crawl cycles. If indexing remains stalled, contact [Glean Support](https://support.glean.com). |

## FAQs[​](#faqs "Direct link to FAQs")

### Why does every user have to authorize Fathom separately?

Fathom's API has no admin endpoint for reading other people's recordings. The only way to read a meeting is with the authorization of someone who can already see it, so Glean asks each user to authorize their own account. That's also why Glean can't show anyone a meeting they couldn't already open in Fathom.

### Does the setup account have to be a Fathom account admin?

Yes. Fathom restricts its user list API to account admins, and Glean uses that list to match Fathom users to Glean users and to know who to prompt. A non-admin authorization is rejected for that request, so no users are discovered.

### Can other users see my Fathom meetings in Glean?

Only the users whose own Fathom account returned a meeting can find it in Glean. Recorder and invitee metadata are indexed for search, but they don't grant access to anyone; being invited to a meeting doesn't make it searchable for you. Someone who hasn't connected Fathom sees no Fathom results at all, even for meetings a colleague's authorization already indexed. They may still see a prompt to connect Fathom, which carries no meeting content.

### Why are speaker names missing from some transcripts?

Some Fathom transcripts do not include speaker attribution. When Fathom provides speaker names, Glean includes them in the indexed transcript; otherwise, Glean indexes the transcript without speaker names.

### Does Glean use Fathom webhooks for real-time sync?

No. The connector polls Fathom on a schedule, so a new meeting appears in Glean after the next incremental crawl rather than as soon as Fathom finishes processing it.

### What happens when someone deletes a recording in Fathom?

Glean detects deletions by reconciling full-crawl results. When a recording stops appearing in every authorized user's meeting list, Glean removes it from the index on the next full crawl.

## See also[​](#see-also "Direct link to See also")

-   [Fathom overview](/connectors/native/fathom/about)
-   [Fathom setup](/connectors/native/fathom/setup)
