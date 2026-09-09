---
url: "https://developers.glean.com/cookbook/customer-360"
canonical: "https://developers.glean.com/cookbook/customer-360"
title: "Customer 360: an account page built from your own content"
description: "One page per account - status, risks, and a drill-in chat - assembled from whatever your instance already knows about that customer. No CRM export, no separate index."
fetched_at: "2026-09-01T13:22:59.342Z"
---
# Customer 360: an account page built from your own content

One page per account - status, risks, and a drill-in chat - assembled from whatever your instance already knows about that customer. No CRM export, no separate index.

~1 hrIntermediate

![Customer 360 workspace with account evidence and an assistant conversation](/img/cookbook/previews/customer-360/preview.webp)View preview

localhost:3000

![Customer 360 workspace with account evidence and an assistant conversation](/img/cookbook/previews/customer-360/preview.webp)

Account context, cited evidence, and follow-up chat in one workspace.

Problem

Account executives jump between CRM notes, renewal docs, and security packets to prep a single customer conversation. This puts those sources in one account workspace with evidence coverage, compact source sections, and an above-the-fold assistant thread - so the next call needs one tab, not nine.

Everything displayed comes from what your instance already knows about that account. The overview shows only the account name you set and counts taken straight from the Search results; assistant claims remain cited rather than turning loose search matches into unsupported CRM facts.

This recipe builds the page two ways: Platform Search plus Platform Chat for an open-ended dashboard, or Agents `createRun` for a prescriptive QBR-ready brief.

Architecture

Account pageEvidence overview + sources + assistant thread

Path A: Search + Chatglean.search.query + glean.chat.create

Path B: Agentsglean.agents.createRun

Glean Platform APIpermission-aware retrieval + synthesis

Prerequisites

Node 20 or newer

Your work email, so the sign-in command can find your Glean tenant. If your tenant cannot use OAuth, you need a Glean API token instead, scoped to the path you pick

The name of one of your own customers, spelled the way it appears in your Glean documents. You put that name in GLEAN\_ACCOUNT\_NAME, and the page is built around it. This is the customer you are reading about, not your own company or your Glean instance

Path B only: a conversational Account Brief agent in Agent Builder, whose ID you put in GLEAN\_AGENT\_ID. A form-triggered agent will not work

Steps

1

**Pick a path**

Both paths build the same page from the same content, and each has its own set of steps. Choose Platform Search Chat if you want the page to assemble the account itself, which is the better starting point. Choose Platform Agents if you already run an Account Brief agent and want the page to show what that agent says.

-   Platform Search Chat
-   Platform Agents

1

**Copy the project onto your machine**

Creates a customer-360 folder in whatever directory you run this from. Every command after this one runs inside that folder.

```
npx -y tiged@2.12.8 --mode=git gleanwork/glean-cookbook/recipes/customer-360/platform-search-chat customer-360
```

2

**Install dependencies**

Installs the Glean API client and the small local server that serves the page.

```
cd customer-360 && npm install
```

3

**See it work before you connect anything**

Runs the whole page against recorded answers for a fictional account named Globex, so you can see what it produces before you connect anything. This needs no Glean credentials.

```
npm run verify:fixture
```

4

**Sign in to Glean**

Your email is used once to find which Glean tenant you belong to, then a browser window opens for you to approve access. The command creates the .env file for you and fills in GLEAN\_SERVER\_URL and GLEAN\_API\_TOKEN. If your tenant has not enabled OAuth, skip this command and do it by hand instead: copy .env.example to .env, then fill in your Glean instance URL and a Glean API token that has the SEARCH and CHAT scopes.

```
npm run login -- --email "<work-email>"
```

5

**Choose which customer the page is about**

Signing in does not pick an account for you, so open .env and set GLEAN\_ACCOUNT\_NAME to one of your own customers, for example Acme Logistics. Spell it the way your Glean documents spell it, because the page searches your content for that exact name and builds the whole page from what it finds.

6

**Check it against your own content**

Takes 1 to 3 minutes. It starts its own server, asks your Glean instance the three demo questions about the account you chose, and fails if any answer comes back without citing a real document.

```
npm run verify
```

7

**Open the page**

Starts the server and prints a Local URL. Open that URL in your browser.

```
npm start
```

1

**Build the Account Brief agent**

In Agent Builder, create a conversational agent that writes an account brief, and copy its ID from the browser URL. It must be conversational, because this page sends it a question and reads the reply. A form-triggered agent will not work here.

2

**Copy the project onto your machine**

Creates a customer-360 folder in whatever directory you run this from. Every command after this one runs inside that folder.

```
npx -y tiged@2.12.8 --mode=git gleanwork/glean-cookbook/recipes/customer-360/platform-agents customer-360
```

3

**Install dependencies**

Installs the Glean API client and the small local server that serves the page.

```
cd customer-360 && npm install
```

4

**Sign in to Glean**

Your email is used once to find which Glean tenant you belong to, then a browser window opens for you to approve access. The command creates the .env file for you and fills in GLEAN\_SERVER\_URL and GLEAN\_API\_TOKEN. If your tenant has not enabled OAuth, skip this command and do it by hand instead: copy .env.example to .env, then fill in your Glean instance URL and a Glean API token that has the SEARCH and AGENTS scopes.

```
npm run login -- --email "<work-email>"
```

5

**Choose the customer and point at your agent**

Signing in does not pick an account for you, so open .env and set two values. GLEAN\_ACCOUNT\_NAME is one of your own customers, for example Acme Logistics, spelled the way your Glean documents spell it. GLEAN\_AGENT\_ID is the ID of the Account Brief agent you created in Agent Builder.

6

**Check it against your own content**

Takes 1 to 3 minutes. It starts its own server, confirms your agent answers for the account you chose, and fails if the brief comes back without citing a real document.

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

-   Add a portfolio dashboard across a rep's whole book of business, with health and renewal countdown tiles per account.
-   Schedule a weekly headless job that re-runs the account's queries, diffs against the last run, and posts only what changed to Slack.
-   Wire push-to-CRM / push-to-Slack actions from the journey panel once you have a governed custom tool.

Try it

**What's the status of our renewal with that account?**

Returns a non-empty answer citing real documents about the account you built the page around. Substitute the name when you ask - there is no fixed query text for a page built around whichever account you pick.

**Give me a customer summary**

Synthesizes across more than one source with a citation per claim, rather than restating a single document.

**What are the renewal risks?**

Either names risks grounded in cited content, or says it has none to report. It must not infer risk the sources don't support, and the account overview must show only the account name you set plus counts taken straight from the Search results.

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
    /cookbook:customer-360
    ```
    
    Run /reload-plugins to pick it up without restarting.
    

[View source](https://github.com/gleanwork/glean-cookbook/tree/main/recipes/customer-360)

Runs the recipe through the Glean cookbook plugin.

Auth

**Platform Search Chat**

Run the authenticate step on this page. It discovers your tenant from work email and signs you in with [OAuth](/api-info/client/authentication/oauth), using the shipped login command. If OAuth is unavailable, create a scoped [Glean-issued token](/api-info/client/authentication/glean-issued) in [Token Management](https://app.glean.com/admin/platform/tokenManagement?tab=client) (SEARCH, CHAT).

**Platform Agents**

Run the authenticate step on this page. It discovers your tenant from work email and signs you in with [OAuth](/api-info/client/authentication/oauth), using the shipped login command. If OAuth is unavailable, create a scoped [Glean-issued token](/api-info/client/authentication/glean-issued) in [Token Management](https://app.glean.com/admin/platform/tokenManagement?tab=client) (SEARCH, AGENTS).

At a glance

CapabilitiesSearch, Chat, Agents

SurfacesPlatform API

StatusShowcase

Time~1 hr

Required scopes

**Platform Search Chat**

SEARCHCHAT

**Platform Agents**

SEARCHAGENTS
