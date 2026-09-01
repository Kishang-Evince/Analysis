---
url: "https://developers.glean.com/libraries/web-sdk/overview"
canonical: "https://developers.glean.com/libraries/web-sdk/overview"
title: "Web SDK | Glean Developer"
description: "Embed permission-aware Glean search, AI chat, and contextual recommendations into any internal surface with the Glean Web SDK"
fetched_at: "2026-09-01T13:23:05.895Z"
---
## Six components, one SDK

The previews below are illustrative, rendered with sample data from a fictional engineering portal — in your app, each component renders live against your organization's Glean instance.

[

New chat Library AgentsTodayWho owns the payments…Canary alarm follow-up

Who owns the payments service?Share

The payments service is owned by the Payments Platform team.

Priya Natarajan is the tech lead, and Marcus Webb is on call this week — the deploy and rollback runbook lives in the Engineering Wiki.

Ask a follow-up…

Glean ChatA full AI assistant grounded in your company knowledge, with citations back to the source.renderChat(element, options)

](/libraries/web-sdk/components/chat)[

payments

CPayments Service — Deploy & Rollback RunbookEngineering Wiki · Updated 2 days ago

Gpayments-servicegit.internal/payments-service · 1mo ago

from:teammate

type:bug, document, message, etc.

⏎ Enter Search

Search box + resultsCompose an autocomplete search box with a full results page for a custom search experience.renderSearchBox(element, options)

](/libraries/web-sdk/components/autocomplete)[

Sample CorpServicesRunbooksOn-call

payments service runbook

CPayments Service — Deploy & Rollback RunbookEngineering Wiki · Updated 2 days ago

Gpayments-servicegit.internal/payments-service · 1mo ago

from:teammate

type:bug, document, message, etc.

⏎ Enter Search

powered by Glean

Modal SearchAttach a complete search overlay to any input on your page — one method call.attach(inputElement, options)

](/libraries/web-sdk/components/modal-search)[

Search for anything at Glean

Recommended for this page

C

Checkout — On-call RunbookUpdated 4 days ago

J

PAY-2114: Canary alarms during deployIn review

P

Priya Natarajan — Payments PlatformTech lead

RecommendationsContextual suggestions for the current page, with a built-in search box.renderRecommendations(element, options)

](/libraries/web-sdk/components/recommendations)[

Search connectors

Connected

View and manage the connectors available.

GGitHub

JJira

SSlackConnect

CConfluenceConnect

Glean SettingsBetaLet users connect personal datasources like GitHub and Slack without leaving your app.renderSettings(element, options)

](/libraries/web-sdk/components/settings)[

Sample CorpServicesRunbooksOn-call

ChatSearch

Ask Assistant anything

Reference current page

Ask Assistant anything…

Sidebar SearchDeprecatedA slide-out Glean Assistant panel with chat and search.openSidebar(options)

](/libraries/web-sdk/components/sidebar)

Quickstart

## A search box in three steps

1.  1Add the SDK — install `@gleanwork/web-sdk` from npm, or load the script tag from your Glean web app domain.
2.  2Render a container element with `position: relative` and `display: block`.
3.  3Call `renderSearchBox` — users sign in with your existing SSO, and every result respects their permissions. See [Authentication](/libraries/web-sdk/authentication/overview) for token-based options.

npmScript tag

search.ts

import { renderSearchBox } from '@gleanwork/web-sdk'

renderSearchBox(document.getElementById('search'), {
  backend: 'https://acme-be.glean.com/',
  onSearch: (query) => {
    location.assign('/search?q=' + encodeURIComponent(query))
  },
})

## Works where your team works

Step-by-step guides for the platforms teams embed Glean into most.

[ReactWrap the SDK in components and hooks for your React app.](/libraries/web-sdk/guides/react)[SharePointShip Glean search inside SharePoint with an SPFx web part.](/libraries/web-sdk/guides/sharepoint)[ZendeskAdd Glean to your help center theme and agent workspace.](/libraries/web-sdk/guides/zendesk)[LumAppsEmbed Glean widgets in your LumApps intranet pages.](/libraries/web-sdk/guides/lumapps)[BrightspotIntegrate Glean search into Brightspot-powered sites.](/libraries/web-sdk/guides/brightspot)

## Authentication

Widgets authenticate real users, so every search result and chat answer is scoped to what that person can already see.

[SSO by defaultNo extra setup — users sign in with your existing identity provider the first time a widget loads.](/libraries/web-sdk/authentication/default-sso)[Server-to-server tokensMint short-lived user tokens on your backend and pass them to the SDK for a fully seamless session.](/libraries/web-sdk/authentication/server-to-server)[Third-party cookiesUnderstand how browser cookie policies affect embedded sessions, and how the SDK handles them.](/libraries/web-sdk/3rd-party-cookies)
