---
url: "https://developers.glean.com/cookbook/no-code-it-helpdesk-lovable"
canonical: "https://developers.glean.com/cookbook/no-code-it-helpdesk-lovable"
title: "Build an IT helpdesk page in Lovable"
description: "Paste a prompt into Lovable to get a private page that answers common IT questions from your Glean docs."
fetched_at: "2026-09-01T13:22:59.267Z"
---
# Build an IT helpdesk page in Lovable

Paste a prompt into Lovable to get a private page that answers common IT questions from your Glean docs.

~45 minBeginner

Problem

Half the helpdesk tickets are "how do I reset my SSO password" and "how do I get a new laptop." The IT docs already answer both.

This recipe builds a private Lovable page that answers those questions from your Glean content before a ticket gets filed.

Prerequisites

A Lovable account

A Glean Client API token with the CHAT scope. Create it in Admin Console → API access → Client API tokens, and keep it as a Lovable backend secret. Every request uses that token owner's access

A private Lovable project. Multi-user deployments require authenticated per-user Glean OAuth

Steps

1

**Copy your instance name**

Copy the instance name from the lookup on this page, or from `https://app.glean.com/admin/about-glean`. For `https://acme-be.glean.com` that value is `acme`, not the full URL and not `app.glean.com`. Cookbook plugin users can run `resolve-backend.mjs` with the work email and use the `instance` field.

2

**Copy the prompt into a private Lovable project**

Click `Copy Lovable prompt`. Replace `<your-glean-instance>` with your instance name. Paste the result into a new private project at `https://lovable.dev`. Cookbook plugin users: the same text is in `lovable-prompt.md` next to this skill.

3

**Add secrets when Lovable asks**

When Lovable asks, add `GLEAN_API_TOKEN` and `GLEAN_INSTANCE` as backend secrets, never in the chat. This token is one person's Glean access. Keep the project private.

4

**Ask the two IT questions**

Ask "Where do I reset my SSO password?" and "How do I request a new laptop?" Each answer should cite a real doc from your own instance.

Take it further

-   Scope the `CHAT` token even further if your Glean plan supports per-collection tokens, so this tool can only ever answer from IT content.
-   Compare this to [`no-code-pto-lookup-replit`](/cookbook/no-code-pto-lookup-replit). Same Chat API call, same constraint that the browser never holds the token, different no-code tool and persona.

Try it

**Where do I reset my SSO password?**

A cited answer from your own IT docs, with a real title and URL.

**How do I request a new laptop?**

A cited answer from your own IT docs, with a real title and URL.

Copy Lovable prompt[View source](https://github.com/gleanwork/glean-cookbook/tree/main/recipes/no-code-it-helpdesk-lovable)

Paste into a new private Lovable project. Replace <your-glean-instance> first.

Auth

Create a Client API token with CHAT in [Token Management](https://app.glean.com/admin/platform/tokenManagement?tab=client). Keep it in the host's secret store, never in a prompt. Steps: [Glean-issued tokens](/api-info/client/authentication/glean-issued).

At a glance

CapabilitiesChat

SurfacesClient API

StatusShowcase

Time~45 min

Required scopes

CHAT
