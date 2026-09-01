---
url: "https://docs.glean.com/connectors/native/zoom/cloud-recording-perms"
canonical: "https://docs.glean.com/connectors/native/zoom/cloud-recording-perms"
title: "Configure Zoom cloud recording permissions"
description: "Complete the following steps within the Zoom Admin Portal to ensure that Glean can index your cloud recordings and accurately reflect access permissions to meeting participants and invitees."
fetched_at: "2026-09-01T13:29:48.552Z"
---
On this page

Complete the following steps within the Zoom Admin Portal to ensure that Glean can index your cloud recordings and accurately reflect access permissions to meeting participants and invitees.

## Enable cloud recording sharing[​](#enable-cloud-recording-sharing "Direct link to Enable cloud recording sharing")

1.  Log into Zoom using an **Admin account**.
2.  In the left navigation panel, go to **Admin** → **Account Management** → **Account Settings**.
3.  Click the **Recording & Transcript** tab.
4.  Navigate to the **Share** section.
5.  Enable the toggle for **Allow cloud recording sharing** and confirm the change in the dialogue box.

## Configure Glean authentication options[​](#configure-glean-authentication-options "Direct link to Configure Glean authentication options")

This step defines a specific authentication option that Glean requires to match meeting permissions.

1.  In the same **Share** section, enable the toggle for **Require users to authenticate before viewing cloud recordings**.
2.  Under **Authentication Options**, click **\+ Add Option**.
3.  In the **Add Authentication Option** dialog, select **Sign in to Zoom with specified domains**.
4.  **Name this option exactly** as follows: `[GLEAN] Participants and Invitees`  
    **Note:** The name must be entered precisely, including the brackets and capitalization, for Glean to correctly identify the option.
5.  In **Specify Domains**, enter your organization's domain(s) separated by a comma (e.g., `*@company.com`).
6.  Check the box for **Set as default authentication option**. We recommend enabling this option so that when a new cloud recording is created, this authentication option is applied to that cloud recording.
7.  Click **Save**.

The new option `[GLEAN] Participants and Invitees (Default)` now appears in your Authentication Options list.

## Enable sharing with specific users[​](#enable-sharing-with-specific-users "Direct link to Enable sharing with specific users")

This setting is necessary for Glean to support granular sharing access set by individual users.

1.  In the same **Share** section under Authentication Options, check the box next to **Allow sharing of recordings with specific user in addition to the above authentication options**.

## Verification and usage[​](#verification-and-usage "Direct link to Verification and usage")

Once the configuration is complete, the new authentication option will be available when sharing meeting recordings.

1.  Navigate to your **Recordings & Transcripts** in the left panel.
2.  Open a specific meeting recording.
3.  Click the **Share** button.
4.  Under **Link access**, the option **\[GLEAN\] Participants and Invitees** will be available.
    -   Set the meeting access to **\[GLEAN\] Participants and Invitees** option. This ensures that every participant and invitee of that meeting recording can view it in Glean.
    -   If you use the option **Anyone in Signed-in users in my account**, Glean cannot correctly identify the permissions for this option and defaults the recording to private access (only the host/owner can see it).
