---
url: "https://developers.glean.com/cookbook/onboarding-hub"
canonical: "https://developers.glean.com/cookbook/onboarding-hub"
title: "Onboarding Hub: a day-one checklist grounded in your own docs"
description: "A guided first-week hub for new hires: a checklist with progress, and every step able to answer itself from your own onboarding content."
fetched_at: "2026-09-01T13:23:00.153Z"
---
# Onboarding Hub: a day-one checklist grounded in your own docs

A guided first-week hub for new hires: a checklist with progress, and every step able to answer itself from your own onboarding content.

~45 minIntermediate

![Onboarding Hub with a first-week checklist and cited assistant guidance](/img/cookbook/previews/onboarding-hub/preview.webp)View preview

localhost:3000

![Onboarding Hub with a first-week checklist and cited assistant guidance](/img/cookbook/previews/onboarding-hub/preview.webp)

A first-week checklist where every step can answer itself.

Problem

New hires land on day one with a dozen tasks spread across HR, IT, and their team — and no single place to see what's done, what's left, and where to get help. The Onboarding Hub solves that: a gamified checklist with progress tracking, milestone badges, and contextual Glean chat on every step.

This recipe builds the hub two ways so you can pick the trade-off that fits your portal — Web SDK for fastest SSO integration, Platform Chat when you need full UI control.

Architecture

Onboarding Hubchecklist + progress + chat

Path A: Web SDKrenderChat — Glean owns chat UI

Path B: Platform Chatglean.chat.create — you own the UI

Gleanpermission-aware cited answers

Prerequisites

Node 20.19+ or 22.12+

Your work email, so setup can find your Glean tenant

Onboarding content already indexed in Glean, because the checklist answers from your own docs

Web SDK path only: you are already signed in to Glean in your normal browser

Steps

1

**Pick a path**

Both paths build the same first-week checklist. Choose Web SDK if you want Glean's chat UI and the Glean session already in your browser. Choose Platform Chat if you want to own the answer UI and call Glean from your backend.

-   Web SDK
-   Platform Chat

1

**Copy the project onto your machine**

Creates an `onboarding-hub` folder in whatever directory you run this from. Every command after this one runs inside that folder.

```
npx -y tiged@2.12.8 --mode=git gleanwork/glean-cookbook/recipes/onboarding-hub/web-sdk onboarding-hub
```

2

**Install dependencies**

Installs the Glean Web SDK and the Vite dev server that hosts the page.

```
cd onboarding-hub && npm install
```

3

**Find your Glean tenant**

Your email is used once to find which Glean tenant you belong to. The command creates `.env.local` and fills in `VITE_GLEAN_BACKEND`.

```
npm run configure -- --email "<work-email>"
```

4

**Keep the sample checklist, or use your own**

`public/steps.json` is already in the project, so you can run with the sample. To use your own onboarding program, replace those steps. Each one needs a unique `id`, a `title`, a `group` (`it`, `hr`, `team`, or `engineering`), `initiallyDone`, and an `askPrompt`.

5

**Open the page**

Starts Vite and prints a Local URL. Open that URL yourself in your normal browser where you are already signed in to Glean.

```
npm run dev
```

6

**Check it against your own content**

Once the page is open in your signed-in browser, confirm your checklist renders. Click \*\*Ask about this\*\* on a step and check that Glean returns a cited first-day answer.

1

**Copy the project onto your machine**

Creates an `onboarding-hub` folder in whatever directory you run this from. Every command after this one runs inside that folder.

```
npx -y tiged@2.12.8 --mode=git gleanwork/glean-cookbook/recipes/onboarding-hub/platform-chat onboarding-hub
```

2

**Install dependencies**

Installs the Glean API client and the small local server that serves the page.

```
cd onboarding-hub && npm install
```

3

**See it work before you connect anything**

Runs the checklist and chat against recorded Sample Corp answers, so you can see cited first-day, VPN, and PTO replies plus unsupported-question escalation before you connect anything. This needs no Glean credentials.

```
npm run verify:fixture
```

4

**Sign in to Glean**

Your email is used once to find which Glean tenant you belong to, then a browser window opens for you to approve access. The command creates the `.env` file for you and fills in `GLEAN_SERVER_URL` and `GLEAN_API_TOKEN`. If your tenant has not enabled OAuth, skip this command and do it by hand instead: copy `.env.example` to `.env`, then fill in your Glean instance URL and a Glean API token that has the `CHAT` scope.

```
npm run login -- --email "<work-email>"
```

5

**Keep the sample checklist, or use your own**

`steps.json` is already selected in `.env`, so you can run with the sample. To use your own onboarding program, replace those steps. Each one needs a unique `id`, a `title`, a `group` (`it`, `hr`, `team`, or `engineering`), `initiallyDone`, and an `askPrompt`.

6

**Check it against your own content**

Takes 1 to 3 minutes. It starts its own server, checks your onboarding topics for cited answers, and fails if an unsupported question does not escalate.

```
npm run verify
```

7

**Open the page**

Starts the server and prints a Local URL. Open that URL in your browser.

```
npm start
```

Take it further

-   Wire real HRIS completion events instead of localStorage toggles.
-   Add a manager view that shows onboarding progress across the team.
-   Scope chat to onboarding-only documents, so a first-week question cannot wander into unrelated content.

Try it

**What should I do on my first day?**

Returns a cited answer drawn from your own onboarding documents, and the checklist reflects steps that actually appear in them rather than a hardcoded list.

**How do I set up VPN?**

Returns a cited answer from your own IT documentation.

**What's our PTO policy?**

Returns a cited answer respecting the asker's permissions — the same question from two people with different access should not return content either of them can't see.

**Ask about a step your docs don't cover**

Platform Chat path only: the app offers its escalation affordance rather than inventing a plausible-sounding onboarding step. The Web SDK owns its unsupported-answer experience.

*Each of these was run against a live Glean instance on 2026-08-21.*

Run this recipe

-   Choose your tool
    
    Claude CodeCodexCodex Cursor
    
    Install the pluginTerminalIn Claude Code
    
    1
    
    ```
    claude plugin marketplace add gleanwork/glean-cookbook
    ```
    
    2
    
    ```
    claude plugin install cookbook@glean-cookbook
    ```
    
    Run the recipe
    
    ```
    /cookbook:onboarding-hub
    ```
    
    Run /reload-plugins to pick it up without restarting.
    

[View source](https://github.com/gleanwork/glean-cookbook/tree/main/recipes/onboarding-hub)

Runs the recipe through the Glean cookbook plugin.

Auth

**Web SDK**

This path uses your existing Glean browser session. Find the web app URL on the About page. The API [server URL](/get-started/authentication#finding-your-server-url) is a different field.

**Platform Chat**

Run the authenticate step on this page. It discovers your tenant from work email and signs you in with [OAuth](/api-info/client/authentication/oauth), using the shipped login command. If OAuth is unavailable, create a scoped [Glean-issued token](/api-info/client/authentication/glean-issued) in [Token Management](https://app.glean.com/admin/platform/tokenManagement?tab=client) (CHAT).

At a glance

CapabilitiesChat, Embed

SurfacesWeb SDK, Platform API

StatusShowcase

Time~45 min

Required scopes

**Platform Chat**

CHAT
