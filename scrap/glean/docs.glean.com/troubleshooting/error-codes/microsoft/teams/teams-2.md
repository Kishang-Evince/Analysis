---
url: "https://docs.glean.com/troubleshooting/error-codes/microsoft/teams/teams-2"
canonical: "https://docs.glean.com/troubleshooting/error-codes/microsoft/teams/teams-2"
title: "TEAMS-2"
description: "TEAMS-2 Error Code"
fetched_at: "2026-09-01T13:30:28.738Z"
---
On this page

## Possible error[​](#possible-error "Direct link to Possible error")

-   The Glean application cannot access Microsoft Teams online meetings and transcripts.

## Possible reasons[​](#possible-reasons "Direct link to Possible reasons")

-   An [application access policy](https://learn.microsoft.com/en-us/graph/cloud-communication-online-meeting-application-access-policy#configure-application-access-policy) has not been configured for applications to access meetings and transcripts. Without this policy, even with the correct API permissions granted, the application cannot access online meeting content.
-   A different application access policy has been assigned to the affected user and overrides the Glean application access policy. In Microsoft Teams, a per-user policy assignment takes precedence over the tenant-wide (global) policy grant. If a user has another application access policy assigned to them directly, the Glean app will not be able to access their meetings and transcripts even when the global policy is configured correctly.

## Possible resolutions[​](#possible-resolutions "Direct link to Possible resolutions")

To resolve this error, try the following steps.

### Configure application access policy for online meetings[​](#configure-application-access-policy-for-online-meetings "Direct link to Configure application access policy for online meetings")

Configure an application access policy for your Glean Teams application. See the Teams setup instructions in the admin console, specifically the section **Configure access policy to access online meetings**.

### Add the Glean app to a user's overriding application access policy[​](#add-the-glean-app-to-a-users-overriding-application-access-policy "Direct link to Add the Glean app to a user's overriding application access policy")

If the application access policy is configured but the error persists for specific users, another application access policy may be overriding the Glean policy. To resolve this:

1.  Check whether the affected user has an application access policy assigned directly to them. In PowerShell (connected to the MicrosoftTeams module), run:

```
Get-CsUserPolicyAssignment -Identity "<user_id>" -PolicyType ApplicationAccessPolicy
```

2.  If another application access policy is assigned to that user, add the Glean app's client ID to that policy so the Glean app is authorized for access, alongside the existing app IDs:

```
Set-CsApplicationAccessPolicy -Identity "<existing_policy_name>" -AppIds @{Add="<glean_client_id>"}
```

This adds the Glean app to the policy, rather than removing the user's existing assignment.

If you continue to see this error, contact [Glean Support](https://support.glean.com).
