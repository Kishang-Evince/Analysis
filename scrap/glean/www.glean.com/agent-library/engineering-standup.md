---
url: "https://www.glean.com/agent-library/engineering-standup"
canonical: "https://www.glean.com/agent-library/engineering-standup"
title: "Engineering standup agent | Glean AI Agent Library"
description: "Generate standup updates that focus on impact, progress, and real blockers."
fetched_at: "2026-09-01T13:27:28.504Z"
---
[

Back to Agent Library

](/ai-agents/agent-library)

![](https://cdn.prod.website-files.com/613513981b0efaf850830620/681e08c677b70c7e962534a4_AL%20-%20Engineering.svg)

Engineering

Featured

# Engineering standup

Generate standup updates that focus on impact, progress, and real blockers.

## Overview

Engineering standups work best when they’re consistent, specific, and easy to scan. This agent creates a concise daily update for an individual engineer by pulling high-signal work from the prior business day across Jira, GitHub, Slack, docs, and OKR updates. It prioritizes shipped and completed work, meaningful progress on active efforts, and blockers that genuinely prevent today’s plan, so the update reflects what matters.

## See it in action

## Capabilities

-   Hiighlights the most impactful work first, prioritizing shipped, completed, and unblocked progress.
-   Keeps updates grounded in real status by including relevant PR and ticket links.
-   Reduces noise by filtering out low-signal activity and routine churn.
-   Surfaces only true blockers that prevent planned work today.

## Example output

***Standup updates for Alex***

### What I worked on yesterday:

-   Merged PR #234 implementing bulk user import API, unblocking frontend integration
-   Closed JIRA PLAT-482 to fix auth bug causing 15 percent of logins to fail
-   Deployed platform release v2.1 to production, enabling the new analytics dashboard for all tenants

### What I am working on today:

-   Implementing rate limiter for API gateway to protect upstream services, targeting 50 percent completion
-   Hardening bulk import edge cases for large CSV files, focusing on timeout and retry handling
-   Preparing design notes for the next iteration of tenant level observability, based on latest OKR targets

### What is blocking me:

-   Need API credentials from DevOps to test the new payment integration in staging, currently blocking end to end validation

## Agent workflow

### Step 1: Determine the activity window

The agent determines the prior business day window automatically. If today is Monday, it uses Friday and ignores weekend activity. On other weekdays, it uses the previous calendar day as "yesterday."

### Step 2: Gather cross-system signals

The agent pulls the user’s relevant work from connected systems, including Jira issues, GitHub PRs, Slack activity, docs, and OKR updates within the activity window.

### Step 3: Filter to high-signal items

The agent removes low-signal items such as minor edits, routine reviews, and general chatter, keeping only completed work, meaningful progress, and credible blockers.

### Step 4: Rank and select final updates

The agent ranks items by impact (shipped, completed, unblocked, high-priority progress) and selects up to three items each for "yesterday" and "today."

### Step 5: Normalize GitHub and JIRA entries

The agent only includes meaningful PRs and ticket status changes, then applies consistent formatting and impact-focused language with direct links so each item is easy to reference.

### Step 6: Generate the standup message

The agent produces a Slack-ready update using the fixed template, keeping bullets concise and focused on outcomes.

### Step 7: Enforce high-signal output

The agent applies quality checks that prioritize manager relevance and impact on quarterly goals, with a preference for omitting marginal items over filling space.

### Best for

Engineering managers,Tech leads, Software engineers

### Connectors

[

Jira

](/connectors/jira)

[

GitHub

](/connectors/github)

[

Slack

](/connectors/slack)

### Related agents

[

#### Pull request review

Streamline code reviews with automated feedback, context, and documentation alignment.

](/agent-library/pull-request-review)

[

#### Engineering self-evaluation

Automatically generate a structured self-assessment based on your work and contributions during the review period.

](/agent-library/engineering-self-evaluation)

[

#### Resolve GitHub PR feedback

Summarize unresolved PR feedback, generate a patch, and draft replies in one pass.

](/agent-library/resolve-github-pr-feedback)

[Browse Agent Library](/ai-agents/agent-library)

## Work AI that works.

[Get a demo](/get-a-demo)

![](https://cdn.prod.website-files.com/6127a84dfe068e153ef20572/69cb2e8bf65178f31d8136e2_career_hero-cta.webp)![](https://cdn.prod.website-files.com/6127a84dfe068e153ef20572/69cb2e8bf65178f31d8136e2_career_hero-cta.webp)![CTA Background Gradient 3](https://cdn.prod.website-files.com/6127a84dfe068e153ef20572/686c0ef31e585c1c0c9eb2a0_CTA%20Background.webp)![CTA Background Gradient 3](https://cdn.prod.website-files.com/6127a84dfe068e153ef20572/686c0ef31e585c1c0c9eb2a0_CTA%20Background.webp)![CTA Background Mobile](https://cdn.prod.website-files.com/6127a84dfe068e153ef20572/686cd671fb4cd509db55077c_CTA%20Background%20Mobile.webp)
