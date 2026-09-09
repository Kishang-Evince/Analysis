---
url: "https://docs.glean.com/administration/identity/people-data/user-aliases"
canonical: "https://docs.glean.com/administration/identity/people-data/user-aliases"
title: "User aliases and identity stitching"
description: "Learn how Glean derives user aliases from identity provider directory attributes to stitch identities across tenants and connectors"
fetched_at: "2026-09-01T13:29:07.282Z"
---
On this page

When a user appears in multiple connectors or across multiple identity provider (IdP) tenants, Glean stitches those separate accounts into a single person record using **aliases**. Aliases are alternate email addresses associated with a user's primary identity, and Glean derives them from your IdP's directory attributes during the people data crawl.

This page describes which IdP attributes Glean uses to build aliases, how to safely enable additional alias sources, and the recommended pattern for cross-tenant and multi-domain organizations.

## How identity stitching works[​](#how-identity-stitching-works "Direct link to How identity stitching works")

Glean creates one person record per primary email. When the same user appears in a connector under a different email - for example, an employee whose account exists in two Entra ID tenants, or a user signing in to a SaaS app with a secondary address - Glean uses aliases to attribute that activity to the correct person.

If a connector account's email matches a person's primary email or any of their aliases, Glean links that account to the same person. If no match exists, the connector account does not link to the user, and content shared with the connector account does not appear in the user's search results.

Aliases are populated from your IdP on every identity crawl. You don't add them in Glean directly. You maintain them on the user's IdP profile, and Glean picks them up on the next crawl.

## Microsoft Entra ID[​](#microsoft-entra-id "Direct link to Microsoft Entra ID")

Glean crawls the following Entra ID attributes when building each person's aliases:

| Entra ID attribute | Used as alias | Notes |
| --- | --- | --- |
| `userPrincipalName` | Primary email | The default primary email for the person. |
| `mail` | Yes (default) | Crawled as an alias by default. Can also be promoted to the primary email. See [Use mail as the primary email field](#use-mail-as-the-primary-email-field). |
| `proxyAddresses` | Yes (default) | Crawled as aliases by default. Admin-controlled in Entra ID, the recommended source for additional aliases. |
| `otherMails` | Opt-in | Off by default. Turn on with the `azure.crawlOtherMailsForAlias` config. |

### Why `otherMails` is opt-in[​](#why-othermails-is-opt-in "Direct link to why-othermails-is-opt-in")

`otherMails` is a user-editable field. Any user can add arbitrary email addresses to it from their own Entra ID profile. If Glean treated those entries as aliases by default, a user could add a colleague's email and inherit access to documents shared with that colleague.

Only turn on `otherMails` aliasing if you've confirmed that users in your tenant can't freely edit the field, or if no admin-controlled attribute carries the aliases you need.

To turn on `otherMails` aliasing, contact Glean support to set `azure.crawlOtherMailsForAlias=true`. After the config change, Glean runs a new identity crawl and the new aliases apply on the next people data build.

### Use mail as the primary email field[​](#use-mail-as-the-primary-email-field "Direct link to Use mail as the primary email field")

If `userPrincipalName` doesn't match the email format you want shown in Glean, you can configure Glean to use the `mail` attribute as the primary email instead. Contact Glean support to set `azure.useMailAsPrimaryEmailField=true`.

warning

Switching the primary email field affects search ranking, insights, and any place where users are matched by email. Schedule the change outside standard business hours and expect a temporary degraded experience until the next identity build completes.

## Okta[​](#okta "Direct link to Okta")

Glean crawls the following Okta attributes when building each person's aliases:

| Okta attribute | Used as alias | Notes |
| --- | --- | --- |
| `email` | Primary email | The default primary email for the person. |
| `login` | Yes (default) | Crawled as an alias by default. |
| `proxyAddresses` | Yes (default) | Crawled as aliases by default when present on the Okta profile.  
  
This attribute is not a native Okta default profile property. It is populated by Okta's Active Directory or Entra ID directory integration, or added as an admin-mapped custom attribute. Recommended source for additional aliases. |
| `secondEmail` | Opt-in | Off by default. User-editable and carries the same spoofing risk as Entra ID's `otherMails`. |

### Why `secondEmail` is opt-in[​](#why-secondemail-is-opt-in "Direct link to why-secondemail-is-opt-in")

`secondEmail` is a user-editable Okta profile field. As with `otherMails` in Entra ID, treating it as an alias by default would let any user claim alternate addresses and potentially inherit document permissions shared with another person.

If you need to alias additional addresses for your users, prefer `proxyAddresses`. It's populated by your Okta administrators and isn't editable by end users.

To turn on `secondEmail` aliasing in Okta, contact Glean support. `proxyAddresses` doesn't require a config change - populate the attribute on the Okta profile and Glean picks it up on the next identity crawl.

## Recommended pattern for cross-tenant and multi-domain users[​](#recommended-pattern-for-cross-tenant-and-multi-domain-users "Direct link to Recommended pattern for cross-tenant and multi-domain users")

After a merger, acquisition, or domain migration, the same person often has identities in multiple tenants or under multiple domains. To make sure Glean stitches them correctly:

1.  **Maintain aliases in an admin-controlled attribute.** Use `proxyAddresses` (Entra ID and Okta) or `mail` (Entra ID). These are populated by your IT team and aren't user-editable, which protects against spoofing.
2.  **Avoid user-editable attributes.** Don't rely on `otherMails` (Entra ID) or `secondEmail` (Okta) unless you've confirmed that users in your tenant can't edit them.
3.  **Populate the attribute for every user, not just legacy accounts.** A common pitfall in dual-tenant setups is to seed aliases only for the original users at migration time. Newer accounts added after the migration won't be stitched unless the same attribute is populated for them too.
4.  **Update aliases at the IdP, not in Glean.** Aliases sync on the next identity crawl, so keeping your IdP as the source of truth avoids drift between systems.

tip

If you're investigating a stitching issue, check the affected user's `proxyAddresses` (or other configured alias attribute) in your IdP first. If the expected address isn't there, the fix is to update the IdP - not to add the alias in Glean.

## Fallback: manual alias upload[​](#fallback-manual-alias-upload "Direct link to Fallback: manual alias upload")

If your IdP can't carry the aliases you need - for example, because you don't have write access to the relevant user attributes, or you're stitching identities for accounts that predate your current IdP - Glean supports a manual alias mapping as a fallback. Contact Glean support to upload a CSV mapping primary emails to aliases.

Manual aliases are static. They don't sync with your IdP, so you'll need to re-upload the mapping whenever you add or change users. Prefer IdP-driven aliasing whenever it's an option.

## See also[​](#see-also "Direct link to See also")

-   [Sync people data from Entra ID](/administration/identity/people-data/configuration/people-data-entra-id)
-   [Sync people data from Okta](/administration/identity/people-data/configuration/people-data-okta)
-   [Sync people data](/get-started/setup/sync-people-data)
-   [Difference between SSO and people data](/administration/identity/people-data/troubleshooting/sso-vs-people-data)
