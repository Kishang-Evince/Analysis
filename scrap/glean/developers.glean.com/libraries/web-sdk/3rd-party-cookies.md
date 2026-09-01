---
url: "https://developers.glean.com/libraries/web-sdk/3rd-party-cookies"
canonical: "https://developers.glean.com/libraries/web-sdk/3rd-party-cookies"
title: "Third-Party Cookie Management | Glean Developer"
description: "Understanding browser third-party cookie policies and their impact on Glean functionality"
fetched_at: "2026-09-01T13:23:05.134Z"
---
On this page

Major browsers like Safari, Firefox, and Chrome (including Chromium-based browsers like Edge) have added or are planning to add restrictions to third-party cookie usage. This change entails replacing third-party cookie usage patterns by web browsers with a new partitioned cookie type or blocking them entirely.

## Browser Cookie Policies[​](#browser-cookie-policies "Direct link to Browser Cookie Policies")

info

Google Chrome has announced plans to move towards a more privacy-focused web environment with initiatives like the Privacy Sandbox, which aims to provide personalization while protecting user privacy. Google is planning to introduce a new experience in Chrome that lets people make an informed choice that applies across their web browsing, including (but not limited to) third-party cookie usage.

Mozilla Firefox and Apple's Safari have already implemented strict third-party cookie blocking by default:

-   Safari uses Intelligent Tracking Prevention (ITP) to block cookies used by advertisers to track users across sites
-   Firefox uses Enhanced Tracking Protection (ETP) for similar functionality
-   Other Chromium-based browsers, like Microsoft Edge, are expected to follow Chrome's implementation

## Impact on Glean Functionality[​](#impact-on-glean-functionality "Direct link to Impact on Glean Functionality")

warning

Since Glean is embedded on customers' websites, it is classified as a third-party and this change can have an impact on critical workflows. Glean's embedded widgets and other functionalities rely on third-party cookies for authenticating users and these would be affected if third-party cookies are blocked.

## Granting Cookie Access[​](#granting-cookie-access "Direct link to Granting Cookie Access")

Glean has an inbuilt flow that requests users for third-party cookie access if needed. After login, you will see the following screen:

![Glean 3P Cookie Access Request](/img/third_party_cookies/3P-cookie-request.png)

To grant access:

1.  Click on "Allow Cookies"
2.  You will see a browser prompt:

![Browser 3P Cookie Access Prompt](/img/third_party_cookies/3P-cookie-browser-prompt.png)

Browser prompt for third-party cookie access

3.  Click on "Allow" to grant Glean access to third-party cookies
4.  Glean will complete the login process successfully

## Frequently Asked Questions[​](#frequently-asked-questions "Direct link to Frequently Asked Questions")

How do I grant access if I accidentally clicked 'Block'?

If you clicked "Block" when the browser asked for third-party cookie access, any subsequent click on "Allow cookies" will automatically be rejected. To manually grant access:

1.  Click on the cookie access icon ![](/img/third_party_cookies/cookie-access-icon.png) in the top-right corner of the URL address bar
2.  In the prompt, switch the glean.com toggle to "On":

![Allow Cookies Chrome](/img/third_party_cookies/3P-cookie-chrome-allow.png)

3.  Click on "Allow Cookies" in the Glean UI
4.  The login should complete successfully

Why don't I see a prompt after clicking 'Allow Cookies'?

This can occur in two scenarios:

1.  Access was previously denied or the prompt was dismissed multiple times (see solution above)
2.  The embedding `iframe` configuration needs to meet specific requirements:
    -   If the `iframe` is not sandboxed, there are no issues
    -   If sandboxed, it must include these sandbox attributes:
        -   `allow-storage-access-by-user-activation`
        -   `allow-scripts`
        -   `allow-same-origin`

Do I need to grant access for each domain separately?

Yes, cookie access is domain-specific. The duration of access varies by browser:

-   **Google Chrome/Chromium:** Access persists for the current user profile
-   **Firefox:** Access persists for the current user profile
-   **Safari:** Access is limited to the current browser tab only
