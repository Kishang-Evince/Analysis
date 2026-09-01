---
url: "https://developers.glean.com/cookbook/no-code-pto-lookup-replit"
canonical: "https://developers.glean.com/cookbook/no-code-pto-lookup-replit"
title: "Build a PTO lookup page in Replit"
description: "Paste a prompt into Replit Agent to get a private page that answers PTO and benefits questions from your Glean docs."
fetched_at: "2026-09-01T13:23:00.105Z"
---
# Build a PTO lookup page in Replit

Paste a prompt into Replit Agent to get a private page that answers PTO and benefits questions from your Glean docs.

~45 minBeginner

Problem

HR fields the same PTO and benefits questions on repeat. The answers are already in your docs.

This recipe builds a private Replit page that looks those answers up in Glean. Nobody on the team has to write a backend.

Prerequisites

A Replit account with Agent access

A Glean Client API token with the CHAT scope. Create it in Admin Console → API access → Client API tokens, and keep it in Replit Secrets. Every request uses that token owner's access

A private Repl. Multi-user deployments require authenticated per-user Glean OAuth

Steps

1

**Copy your instance name**

Copy the instance name from the lookup on this page, or from `https://app.glean.com/admin/about-glean`. For `https://acme-be.glean.com` that value is `acme`, not the full URL and not `app.glean.com`. Cookbook plugin users can run `resolve-backend.mjs` with the work email and use the `instance` field.

2

**Copy the prompt into a private Repl**

Click `Copy Replit prompt`. Replace `<your-glean-instance>` with your instance name. Paste the result into a new private Repl at `https://replit.com/new` and open Agent. Cookbook plugin users: the same text is in `replit-agent-prompt.md` next to this skill.

3

**Add secrets when Replit asks**

When Replit Agent asks, add `GLEAN_API_TOKEN` and `GLEAN_INSTANCE` in the Secrets tab, never in the chat. This token is one person's Glean access. Keep the Repl private.

4

**Ask a PTO question, then an off-topic one**

Ask "What is our PTO policy?" and confirm a cited answer from your own docs. Then ask "what's our revenue?" and confirm the assistant does not invent an answer when Glean cites nothing.

Take it further

-   Scope the `CHAT` token even further if your Glean plan supports per-collection tokens, so this tool can only ever answer from HR content.
-   Compare this to [`no-code-it-helpdesk-lovable`](/cookbook/no-code-it-helpdesk-lovable). Same Chat API call, same constraint that the browser never holds the token, different no-code tool and persona.

Try it

**What is our PTO policy?**

A cited answer from your own HR docs, with a real title and URL.

**what's our revenue?**

No fabricated answer when Glean cites nothing. The page shows that it does not know.

Copy Replit prompt[View source](https://github.com/gleanwork/glean-cookbook/tree/main/recipes/no-code-pto-lookup-replit)

Paste into a new private Replit project. Replace <your-glean-instance> first.

Auth

Create a Client API token with CHAT in [Token Management](https://app.glean.com/admin/platform/tokenManagement?tab=client). Keep it in the host's secret store, never in a prompt. Steps: [Glean-issued tokens](/api-info/client/authentication/glean-issued).

At a glance

CapabilitiesChat

SurfacesClient API

StatusShowcase

Time~45 min

Required scopes

CHAT
