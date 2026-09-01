---
url: "https://docs.glean.com/administration/identity/people-data/troubleshooting/people-data-issues"
canonical: "https://docs.glean.com/administration/identity/people-data/troubleshooting/people-data-issues"
title: "Troubleshoot People Data Issues"
description: "Resolve common issues with the synchronization of your people data (company directory) in Glean"
fetched_at: "2026-09-01T13:29:07.053Z"
---
On this page

Location: **Admin Console → Users & permissions → People data**

Once you've uploaded your company user data, Glean begins processing it. As it progresses, Glean will identify any invalid data and flag it in the **Admin console**.

Glean will flag the following issues:

-   Email address isn't formatted properly
-   Email domain is invalid
-   Department entry doesn't exist or doesn't match any known department
-   Name contains redlisted terms

You can visit the **Attention required** tab to resolve these issues. From there, Glean provides resolution options and walks you through the tools you can take to solve them, such as editing the name term list, manually assigning a user to a department, or even directing Glean to ignore the issue.

## Resolve "Name contains redlisted term" people data issues[​](#resolve-name-contains-redlisted-term-people-data-issues "Direct link to Resolve \"Name contains redlisted term\" people data issues")

Location: **Admin Console → Users & permissions → People data → People data settings**

You can add terms to either the full word redlist or the substring redlist to automatically exclude individuals from your organization whose names contain these terms.

-   **Full word redlist:** Excludes names that contain an exact match of a listed word. For example, if "apple" is on the full word redlist, Jane Apple would be excluded, but Johnny Appleseed would not.
-   **Substring redlist:** Excludes names that contain any part of a listed term. If "apple" is on the substring redlist, both Jane Apple and Johnny Appleseed would be excluded.

Use the full word redlist for precise filtering and the substring redlist for broader exclusions. Remove terms from these redlists to resolve people data issues where names contain redlisted terms.
