---
url: "https://docs.glean.com/administration/platform/embedded-integrations/github-copilot-extension-install"
canonical: "https://docs.glean.com/administration/platform/embedded-integrations/github-copilot-extension-install"
title: "Configure Glean in GitHub Copilot"
description: "Learn how to configure Glean in GitHub Copilot."
fetched_at: "2026-09-01T13:29:10.760Z"
---
On this page

## Admin Instructions[​](#admin-instructions "Direct link to Admin Instructions")

1.  Ensure [Github is crawled by Glean](https://app.glean.com/admin/setup/apps/github/github).
    
2.  Ask your Glean contact for the Github App link for your company, and install the app for the organization:  
    ![](/assets/images/glean-in-github5-d82862e440007269229e6adb2ae904b1.png)
    
    Make sure to install it at the organizational level, not individual level:
    

We recommend giving access to all repositories, as it will minimize permission issues down the line:

3.  Now you should be all set! Let users know that the Glean Github App has been installed and ready for use.

## Admin FAQs[​](#admin-faqs "Direct link to Admin FAQs")

**Why do I as a customer need a custom app?**  
Because Github doesn’t allow multiple copilot URLs and as glean needs to ensure that your data gets delivered to your VPC, we create a different app for each customer.

**Can I install it on multiple organizations?**  
Yes! You can install it on all your organizations! (Make sure they’re connected to glean)

**Why is this not a part of the workspace setup?**  
The workspace setup works on a Central app, as mentioned before, we need new apps.

**Can I enable the Github Copilot chat extension for everyone centrally?**  
No, Github does not support it + we need the user to authenticate it so that we can connect Github and Glean.

## Individual User Instructions[​](#individual-user-instructions "Direct link to Individual User Instructions")

**Pre-Installation Checks**

1.  **Connect Github and Glean**. Check your [connectors](https://app.glean.com/settings/connectors) to make sure Github and Glean are connected. Note, depending on your connector, the Github connector might not be exactly GitHub, but something equivalent like “GithubVM”.
    
    If the Github is not connected in Glean, please connect them.
    
    Agree to the consent to show private repository content. This may trigger a redirect to connect at github.com.
    
    Wait **~1 hour** for the change to propagate.
    
2.  Make sure you have Github Copilot Installed and Active. Make sure that the Copilot Policies have Copilot Enabled in github.com and in IDE. Also make sure that Copilot Extensions are Enabled.
    
3.  Get the correct Github App name from your admin. You’ll need it later.
    

**Install for IDE:**

1.  Make sure you are logged in to Github on the IDE of your choice.
    
2.  Install the GitHub Copilot Chat Extension.
    

After installation, **restart the IDE** to make sure that all Copilot Extensions are loaded correctly.

3.  Start using the Glean Copilot Extension by initiating a new Copilot Chat. Type “@” and search for the Glean Github App name.
    
4.  Expected Flow:
    

**Install for Github.com**

1.  Open the Github.com and navigate to a repository where the Glean Github App has access to.
    
2.  Open up Github Chat. Type in “@glean-app-name”, where “glean-app-name” is your app’s name. Ask any question.  
    Since it is the first time using the app, the app might not be recognized.
    
    After clicking connect, it installs the copilot extension. All future messages starting with “@glean-app-name” will now be highlighted blue.
    
3.  Installation complete
    

## User FAQs[​](#user-faqs "Direct link to User FAQs")

**I’m getting an “github\_not\_connected” error when using the Copilot Extension.**  
It is likely that Github and Glean were not connected. Follow the steps in the Pre-Installation Checks to make sure that the two are connected. After connecting, please wait ~1 hour before trying again.

**Copilot Extension returns no message, hangs, or returns with an error.**  
GitHub’s Copilot Extensions are still in public preview, so there may be some unforeseen issues. Start a new conversation and try the same question again to see if that fixes the issue.  
If this issue persists, contact your admin to provide feedback and we will look into it and resolve.
