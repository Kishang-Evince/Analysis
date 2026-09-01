---
url: "https://docs.glean.com/troubleshooting/error-codes/confluence/confluence-dc-credentials"
canonical: "https://docs.glean.com/troubleshooting/error-codes/confluence/confluence-dc-credentials"
title: "Confluence failing to save credentials"
description: "This article covers Confluence Data Center failing to save credentials."
fetched_at: "2026-09-01T13:30:12.249Z"
---
![](/assets/images/confluencedccred1-9aac3a3e3c9897474ac3c3c818d8d1c4.png) There are multiple cases in which the save credentials call fails.

1.  Check if the credentials are valid and are not expired. Sometimes, an automatic key rotation policy is enabled on the Service Accounts for security purposes.
    
2.  Check the response you get from the below cURL request.
    

```
{curl -u username:password -X GET "https://your-confluence-url/rest/api/user?username=username_to_check"ANDcurl -u username:password -X GET "https://your-confluence-url/rest/api/user?username=username" -H "Content-Type: application/json"}
```

note

Ensure to add your username, and password along with your Confluence base URL in the above cURL request.

3.  Ensure the Service Account bot (for example - "scio-confluence-bot") is active and should have access to the Confluence spaces, and has required permissions to fetch the data.
    
4.  Try logging/impersonating from the Service Account to your Confluence account from incognito mode to make sure the Service account can view the Confluence spaces.
    
5.  Check if captcha-based authentication is enabled and if the unsuccessful attempt has exceeded the limit. If that is the case then, please "Reset Failed Login Count".
    

If you are still having difficulty, please reach out to us: [https://support.glean.com](https://support.glean.com)
