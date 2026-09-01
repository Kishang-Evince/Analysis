---
url: "https://docs.glean.com/connectors/native/website/website-credentials"
canonical: "https://docs.glean.com/connectors/native/website/website-credentials"
title: "Configure advanced credentials"
description: "Learn how to configure variables and secrets for Website connectors using Glean's advanced setup."
fetched_at: "2026-09-01T13:29:47.632Z"
---
On this page

You can use the advanced application of Glean to set configuration variables and secrets in configuration management system of Glean or the secret store respectively.

note

You can access this configureation from this link: [https://app.glean.com/admin/setup/apps?advanced](https://app.glean.com/admin/setup/apps?advanced).

-   Select to add **Secret** and **Config** based on your requirement. Provide a key and its value, some keys are set in the configuration, others are secrets (typically passwords, tokens, etc).

## Example[​](#example "Direct link to Example")

1.  Get the connector name from the web URL after you open the connector.
    
    -   For example in this case the website connector name is "WEB\_M8WEFHB". ![](/assets/images/webcredentials2-d179c1f0ce5789e4d8ed11733a19e782.png)
2.  Open the URL - [https://app.glean.com/admin/setup/apps?advanced](https://app.glean.com/admin/setup/apps?advanced) and add the Key name "WEB\_M8WEFHB\_USERNAME" followed by the key value as the user email ID. 
    

3.  On the same URL - [https://app.glean.com/admin/setup/apps?advanced](https://app.glean.com/admin/setup/apps?advanced) add the Key name "WEB\_M8WEFHB\_PASSWORD" followed by the key value as the password.

note

SSO logins are not supported. For web connectors that require SSO, consider using our [custom connector](/connectors/custom/about) option.

If you have any concerns, reach out to the [Glean support team](https://support.glean.com).
