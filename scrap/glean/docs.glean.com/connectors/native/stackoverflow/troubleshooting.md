---
url: "https://docs.glean.com/connectors/native/stackoverflow/troubleshooting"
canonical: "https://docs.glean.com/connectors/native/stackoverflow/troubleshooting"
title: "Troubleshooting"
description: "How to troubleshoot issues with the Stack Overflow connector"
fetched_at: "2026-09-01T13:29:44.467Z"
---
On this page

## No Items Indexed for Stack Overflow Connector[​](#no-items-indexed-for-stack-overflow-connector "Direct link to No Items Indexed for Stack Overflow Connector")

Please check the **Tags** configuration in your Stack Overflow connector. The tag filter uses logical AND-only questions that contain *all* specified tags are eligible for crawling. If you’ve listed more than a few tags, it’s common to see no results because questions will rarely include every tag in the list.

To increase coverage, reduce the number of tags (for example, start with one or two key tags) and expand only as needed.

## Stack Overflow Indexed Document Count Mismatch[​](#stack-overflow-indexed-document-count-mismatch "Direct link to Stack Overflow Indexed Document Count Mismatch")

If you search with an asterisk "\*" in Stack Overflow, the number of results you will see is equal to the total count of questions plus the total count of answers to any question. ![StackOverflow Search Results](/assets/images/stackoverflow-indexed-document-count-mismatch-1-39dd892ce3f80d7b9532035ac1ed05b7.png) Glean consolidates the question and any answers posted on it as a single document. Because of this, the document count you see in the admin console in Glean could be less than the number you see in Stack Overflow. To verify the document count, use the filter in the Stack Overflow search for questions as `is:question`. ![StackOverflow Question Filter](/assets/images/stackoverflow-indexed-document-count-mismatch-2-74e2a0a20ffbbaa25650e3d0c80af2d3.png) The number of results you will see in the output should match with the number of indexed documents count in the Glean admin console.
