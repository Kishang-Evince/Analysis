---
url: "https://docs.glean.com/connectors/native/zoom/"
canonical: "https://docs.glean.com/connectors/native/zoom/"
title: "Zoom"
description: "The Zoom connector indexes the transcripts and stores the play URLs of Zoom cloud recordings. This enables users to search for and open meeting recordings from Glean, while also allowing Glean to use the transcript content to answer questions about meetings. All connector data is stored securely in the customer's GCP project, and no data leaves the customer’s cloud environment. The connector supports Cloud Zoom Enterprise and Pro accounts."
fetched_at: "2026-09-01T13:29:48.643Z"
---
On this page

The Zoom connector indexes the transcripts and stores the play URLs of Zoom cloud recordings. This enables users to search for and open meeting recordings from Glean, while also allowing Glean to use the transcript content to answer questions about meetings. All connector data is stored securely in the customer's GCP project, and no data leaves the customer’s cloud environment. The connector supports Cloud Zoom Enterprise and Pro accounts.

The connector supports two permission models that control who can see Zoom transcripts and recording links in Glean:

-   **V1 (host-only permissions):** Only the meeting organizer/host can access the transcript in Glean.
-   **V2 (Zoom ACL–aware permissions):** Glean uses Zoom’s meeting instance access settings and a special Zoom authentication option to safely expand access to participants and invitees of a meeting, while defaulting to host-only behavior for broad, organization‑wide or public sharing modes.

> Existing customers default to V1 until they opt in to V2.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

-   A paid Zoom plan (for example, Pro or Enterprise) with cloud recordings is required. Free plans are not supported.
    
-   Cloud recording must be enabled in Zoom.
    
-   The user performing the setup must have an **Admin** or **Owner** role to create and authorize the integration's access tokens.
    
-   The authorizing user must have the **View the recording and transcript content** permission in Zoom. Without this permission, Zoom hides the transcript download URL and Glean cannot index transcripts.
    
-   Determine your Zoom base URL. If your Zoom URLs start with `https://glean.zoom.us/`, enter `https://glean.zoom.us` in the **Zoom Base URL** field during setup in Glean.
    
-   To use the Zoom **V2** permission model with participants and invitees access:
    
    -   Your Zoom admin must be able to configure **cloud recording authentication options** (AOs). This includes creating an authentication option named `[GLEAN] Participants and Invitees Only`, which can be set as the default option for recordings you want to expose to meeting participants and invitees in Glean.
    
    For more information see [Configure Zoom cloud recording permissions](https://docs.glean.com/connectors/native/zoom/cloud-recording-perms).
    

## Authentication and setup[​](#authentication-and-setup "Direct link to Authentication and setup")

To connect Glean to Zoom, you must authorize the Glean app for Zoom to use an account with correct permissions. This process automatically generates and stores the required access tokens for your tenant. The app requests read-only access with the following scopes: **Repository permissions**, **Recording files**, **Organization permissions**, and **Users**.

1.  In the **Glean Admin Console**, navigate to **Connectors** → **Add connector** → **Zoom**.
2.  Click **Authorize**. Glean will generate a link for you to click.
3.  You'll be redirected to Zoom to review the scopes requested by the **Glean Search Crawler for Zoom** app. Select any optional scopes based on your needs.
4.  After you authorize the app, you will be redirected back to Glean. Click **Save** to complete the connection.

> **Note:** The installation and authorization must be initiated from the **Glean Admin Console**. Installing the app directly from the Zoom App Marketplace will not complete the setup.

### Scopes requested[​](#scopes-requested "Direct link to Scopes requested")

The Zoom app requests **read‑only** access. In addition to repository, recording, organization, and user data, the connector uses the following scopes to support V2 permissions and participants access:

-   **Recording access settings**:  
    `cloud_recording:read:recording_settings:admin`: used to fetch the access settings of each meeting instance (cloud recording) so Glean can map Zoom ACLs into Glean permissions.
-   **Past meeting participants**:  
    `meeting:read:list_past_participants:admin`: used to fetch the participants of a past meeting instance, enabling both the participants‑based ACL and the Participants search facet in Glean.

### Re‑authorizing existing Zoom connectors[​](#reauthorizing-existing-zoom-connectors "Direct link to Re‑authorizing existing Zoom connectors")

If you already have the Zoom connector configured:

-   You must **re‑authorize the Zoom app** from the Glean Admin Console so the app can obtain the new scopes for recording access settings and past participants.

## Permission model configuration (V1 vs V2)[​](#permission-model-configuration-v1-vs-v2 "Direct link to Permission model configuration (V1 vs V2)")

The Zoom connector supports two permission models, configured in self‑serve on the Zoom connector setup page.

### V1 – Host‑only permissions[​](#v1--hostonly-permissions "Direct link to V1 – Host‑only permissions")

In the V1 model, permissions are determined only by the Zoom account/group setting **Prevent hosts from accessing their recordings** and do not use Zoom’s cloud recording access options.

-   If **Prevent hosts from accessing their recordings = True** → **No one can view** the transcript in Glean.
-   If **Prevent hosts from accessing their recordings = False** → **Only the host/owner** of the meeting can view the transcript in Glean.

This behavior matches the original Zoom connector behavior documented as “only the meeting organizer can access a meeting transcript in Glean.”

### V2 – Zoom ACL–aware permissions[​](#v2--zoom-aclaware-permissions "Direct link to V2 – Zoom ACL–aware permissions")

In the V2 model, Glean additionally considers the **meeting instance access** configuration from Zoom and maps it to Glean ACLs using Zoom’s authentication options (AOs) and sharing modes.

-   Glean calls Zoom’s recording settings API to fetch the access settings for each meeting instance (cloud recording).
-   Based on these access settings, Glean constructs ACLs using internal Zoom groups and domain groups created from the authentication options.

## Usage and Features[​](#usage-and-features "Direct link to Usage and Features")

Once the connector is set up, Glean will crawl and index your Zoom cloud recordings. Historical transcripts will also be indexed. **Cloud recording files**: the transcripts will be used to index in Glean Search. The URLs to access the cloud recordings will also be stored in the Glean index.

-   **Glean Search** will show the cloud recording play URL associated with the transcript.
-   **Glean** will use the transcript content to answer user queries.

You can ask Glean to summarize your meetings so that you know what your company knows, in seconds!

-   You can also use Zoom meeting transcripts across Search, Chat, and Home in Glean. For more information, see [Use Zoom meeting transcripts in Search, Chat, and Home](/user-guide/knowledge/meetings-and-calendar/zoom-meeting-transcripts).

### Participants facet[​](#participants-facet "Direct link to Participants facet")

The Zoom connector crawls participants of each meeting instance (and stores them as immutable metadata for that recording).

In Glean:

-   Zoom meeting and transcript documents include a Participants facet.
-   Admins and users can filter Zoom results by who attended a meeting, which is especially helpful when combined with the Zoom V2 permission model and the `[GLEAN] Participants and Invitees Only` authentication option.

Because participants of a meeting are immutable once the meeting has occurred, Glean only needs to crawl this information once per meeting instance.

## Limitations[​](#limitations "Direct link to Limitations")

-   The connector with V1 permission model (host-only permissions) does not currently use webhooks for content updates. It only supports the deauthorization webhook event.
-   The Zoom connector does not support transcripts from 'AI Companion'.

## Remove app[​](#remove-app "Direct link to Remove app")

1.  Login to your Zoom Account and navigate to the Zoom App Marketplace.
    
2.  Click **Manage > Added Apps** or search for the "Glean Search Crawler for Zoom" app.
    
3.  Click the "Glean Search Crawler for Zoom" app.
    
4.  Click **Remove**.
    

Once you have removed the app, Glean removes access/refresh tokens from your Glean instance. Crawls would fail and alerts would be raised.
