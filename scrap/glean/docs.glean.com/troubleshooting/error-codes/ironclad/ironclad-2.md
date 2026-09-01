---
url: "https://docs.glean.com/troubleshooting/error-codes/ironclad/ironclad-2"
canonical: "https://docs.glean.com/troubleshooting/error-codes/ironclad/ironclad-2"
title: "IRONCLAD_2"
description: "IRONCLAD_2 Error Code"
fetched_at: "2026-09-01T13:30:22.945Z"
---
On this page

## Issue[​](#issue "Direct link to Issue")

The user account used to authenticate the Ironclad connector does not have administrator permissions. The Ironclad connector requires the authenticating user to be a member of the "Administrators" group.

## Resolution[​](#resolution "Direct link to Resolution")

To resolve this issue:

1.  Verify that the user account being used to set up the Glean connector is an administrator in Ironclad.
2.  If the user is not an administrator:
    -   Either ask an Ironclad administrator to add the user to the "Administrators" group, or
    -   Re-authenticate the connector using a different user account that has administrator permissions.
3.  After granting administrator access, re-authenticate the connector in Glean.

**Note:** Administrator permissions are required because the connector needs to access workflows, records, entities, and user information across your entire Ironclad instance.

For additional assistance, please contact Glean Support at [https://support.glean.com](https://support.glean.com)
