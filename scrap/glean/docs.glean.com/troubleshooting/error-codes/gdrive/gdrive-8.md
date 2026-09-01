---
url: "https://docs.glean.com/troubleshooting/error-codes/gdrive/gdrive-8"
canonical: "https://docs.glean.com/troubleshooting/error-codes/gdrive/gdrive-8"
title: "GDRIVE_8"
description: "GDRIVE_8 Error Code"
fetched_at: "2026-09-01T13:30:15.773Z"
---
On this page

## Issue:[​](#issue "Direct link to Issue:")

-   The supplied directory admin email is a google service account email (identified with having `iam.gserviceaccount` in the domain). This should have been a user from Google workspace

## Resolution:[​](#resolution "Direct link to Resolution:")

-   Either supply an existing user from the Google Workspace that has the necessary permissions OR create a new user under that google workspace with the necessary permissions and supply that email instead.
