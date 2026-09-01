---
url: "https://docs.glean.com/troubleshooting/error-codes/tools/tool-permission-error"
canonical: "https://docs.glean.com/troubleshooting/error-codes/tools/tool-permission-error"
title: "Tool Permission Error"
description: "Tools - Permission error (Invalid redirect URI or Access blocked)"
fetched_at: "2026-09-01T13:30:32.564Z"
---
**Issue**:

When clicking “connect” in assistant response it redirect to the particular application to complete the authentication but receives redirect\_uri\_mismatch or Access blocked error. ![](/assets/images/actionpermission1-c9989d3eb9c4ae89cd4163b247571ba1.png)

**Error**: ![](/assets/images/actionpermission2-184df2b6c48a0376121abd6ace2dc017.png)

**Resolution**: As the error suggests seems like the redirect url is not correctly setup. Might have not configured the correct verify\_code URI in the allowed list of redirects for the OAuth app. Below redirect url should be added in allowed URI for redirects as this endpoint exchanges the auth code for an access token.

> [https://tenant\_id-be.glean.com/tools/oauth/verify\_code/\*your-tool-unique-identifier-name](https://tenant_id-be.glean.com/tools/oauth/verify_code/*your-tool-unique-identifier-name)\*

> For example: [https://tenant\_id-be.glean.com/tools/oauth/verify\_code/CreateGoogleDoc](https://tenant_id-be.glean.com/tools/oauth/verify_code/CreateGoogleDoc)

Copy your full backend URL from [app.glean.com/admin/about-glean](https://app.glean.com/admin/about-glean) under **Server instance (QE)**, and replace [https://tenant\_id-be.glean.com](https://tenant_id-be.glean.com) with it.

note

Note: “your-tool-unique-identifier-name” is case sensitive.

You can find the **your-tool\-unique-identifier-name** from tools setup as shown in below screenshot. ![](/assets/images/actionpermission3-f3cb218168a742b8ec50b7237e8f79c4.png)
