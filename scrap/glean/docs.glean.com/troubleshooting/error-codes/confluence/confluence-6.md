---
url: "https://docs.glean.com/troubleshooting/error-codes/confluence/confluence-6"
canonical: "https://docs.glean.com/troubleshooting/error-codes/confluence/confluence-6"
title: "CONFLUENCE_6"
description: "CONFLUENCE_6 Error Code"
fetched_at: "2026-09-01T13:30:11.998Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

We are unable to validate if redlisted creators file is uploaded correctly.

## Resolution:[​](#resolution "Direct link to Resolution:")

-   Please ensure you've uploaded the redlisted creators with same file name as provided during setup in the sensitive configs bucket which is generally of the form: `sensitive-config-${PROJECT_ID}`
    
-   Please ensure that there is at least one email added in the file. The file contains comma separated email ids which would look like: `foo@domain.com,bar@domain.com,baz@domain.com`
    

If you are still having difficulty, please reach out to us: [https://support.glean.com](https://support.glean.com)
