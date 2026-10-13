---
url: "https://docs.glean.com/administration/platform/embedded-integrations/slackbot/admin-guide/manage-permissions-security"
canonical: "https://docs.glean.com/administration/platform/embedded-integrations/slackbot/admin-guide/manage-permissions-security"
title: "Manage permissions and security"
description: "Understand and manage permissions and security for Glean in Slack."
fetched_at: "2026-10-13T08:49:23.932Z"
---
On this page

This page consolidates the permissions and security considerations for Glean in Slack. Each section links to the relevant configuration page for details.

## Content permissions[​](#content-permissions "Direct link to Content permissions")

Glean's responses in Slack respect individual content permissions. Like Glean Search and Chat, the final response includes only data the user is authorized to access. This means two users who view the same Glean answer in a channel may see different results based on their individual permissions.

For more details on how permissions are enforced during response generation, see [Configure bot responses](/administration/platform/embedded-integrations/slackbot/admin-guide/configure-bot-responses).

## Channel-level permissions[​](#channel-level-permissions "Direct link to Channel-level permissions")

Admins control which Slack channels Glean responds in. You can configure Glean to respond in all public channels, only channels where the Glean app is added, or a specific set of channels.

To configure channel-level settings, see [Enable Gleanbot to respond in channels](/administration/platform/embedded-integrations/slackbot/admin-guide/configure-bot-responses#enable-gleanbot-to-respond-in-channels).

## External channel restrictions[​](#external-channel-restrictions "Direct link to External channel restrictions")

Glean will not respond in channels that include external parties. This safeguard prevents inadvertent information leaks to people outside your organization. This behavior is not configurable.

## User access requirements[​](#user-access-requirements "Direct link to User access requirements")

Glean only responds in Slack to users who meet both of the following criteria:

-   The user has logged into Glean at least once.
-   The user has access to Glean Assistant.

If a user does not meet these requirements, Glean will not generate a response for their questions.

## Slack app permissions and scopes[​](#slack-app-permissions-and-scopes "Direct link to Slack app permissions and scopes")

The Glean Slack app requires specific OAuth scopes to function. The required scopes are listed in **Admin console → Platform → Connectors → Slack → Setup**. Common scopes include:

-   `assistant:write` -- required for the Glean sidebar integration.
-   `reactions:write` -- required for emoji reactions on messages.
-   `canvases:read` and `canvases:write` -- required only if you enable Slack Canvas for daily digest delivery.

For a **new RTS setup**, follow the [Slack Real Time Search setup](/connectors/native/slack/setup/slack-rts-connector/). Authorization installs Glean's Marketplace app.

If you are migrating an existing custom or Enterprise Grid app, first [identify your connector type](/connectors/native/slack/upgrade/identify-connector-type/) and follow the matching upgrade guide. Update the existing app manifest before authorizing RTS. Do not create a second app. If you add or change scopes for a custom Slack app, reinstall the updated app to your workspace. For an Enterprise Grid custom-app migration, revoke existing tokens and complete the organization-level reinstall and workspace deployment steps.

## Public Mode permissions[​](#public-mode-permissions "Direct link to Public Mode permissions")

When Public Mode is enabled, Glean posts responses that are visible to all members of a channel thread. To protect sensitive information, Public Mode uses only broadly shared content -- content that anyone in the organization can search for via Glean, or content that is publicly accessible.

Public Mode does not use link-only, restricted, or private content. Users can select **Find more information** to generate a private response that includes restricted sources visible only to them.

For the full list of connectors and content types that qualify for public replies, see [Enable Public Mode](/administration/platform/embedded-integrations/slackbot/admin-guide/enable-public-mode).

## Connector permissions[​](#connector-permissions "Direct link to Connector permissions")

Ensure that permissions configured in your connected connectors align with your Glean permissions. Glean respects the access controls defined in each connector. If a user lacks access to a document in the source system, Glean will not include that document in their response.

## Rate limits[​](#rate-limits "Direct link to Rate limits")

Glean may not respond if calls have exceeded a rate limit. If Glean has received a high rate of questions, it may temporarily stop responding. This is a safeguard to ensure system stability. Users can try asking the question again later.
