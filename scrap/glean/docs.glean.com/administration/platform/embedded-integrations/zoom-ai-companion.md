---
url: "https://docs.glean.com/administration/platform/embedded-integrations/zoom-ai-companion"
canonical: "https://docs.glean.com/administration/platform/embedded-integrations/zoom-ai-companion"
title: "Configure Glean in Zoom"
description: "Learn how to configure Glean in Zoom."
fetched_at: "2026-09-01T13:29:12.227Z"
---
1.  Login to Zoom.us as Administrator. Go to **Account Management** → **Account Settings**. Ensure that the AI Companion panel in Zoom Workplace is on.
    
2.  Scroll down to the bottom to Custom AI Companion section and ensure the following items are switched on:
    
    -   Allow AI Companion to reference the organization's connectors
    -   Allow AI Companion to consume your organization's custom dictionaries
    -   Allow AI Companion assistant to join third-party meetings
    -   Allow AI Companion to perform tasks in third-party apps (might have to scroll down farther)
    
3.  Next in the Admin console navigate to **Advanced** → then **App Marketplace**, which surfaces a new tab.
    
4.  Search for Glean in the upper-right search bar. Then click Glean by Zoom, with the description of "A Glean Enterprise Search app that integrates Glean index with Zoom AI companion."
    

5.  Click **Add**.

6.  Put your full rest api name in:

[https://scio-prod-be.glean.com/rest/api/v1](https://scio-prod-be.glean.com/rest/api/v1) (This is an example API endpoint. You can find your actual API endpoint in the **Glean Admin console** under **Settings** → **About Glean**.)

7.  Copy the Public Key to a safe spot. Do not click submit until Glean portion of setup is complete.

8.  Navigate to **Admin Console → Platform → API Tokens → Client API tokens → Partner Authentication via Key Pair → Manage settings**.

9.  Input Description ZoomAI integration and Scopes:
    
    -   Chat
    -   Search
10.  Paste the Static Public Key from Zoom Marketplace setup and click **save**. You must include both the key header and footer for it to work:
     

```
\-----BEGIN PUBLIC KEY-----  Key  \-----END PUBLIC KEY-----
```

PLEASE HIDE KEY BEFORE publishing  
![](/assets/images/zoom-ai-companion10-410bccd65a7433023a4baba16b5237b2.png)

11.  Click **Submit** on Glean app in Zoom Marketplace

12.  Success looks like this:
