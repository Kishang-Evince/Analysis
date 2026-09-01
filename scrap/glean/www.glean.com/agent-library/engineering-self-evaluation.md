---
url: "https://www.glean.com/agent-library/engineering-self-evaluation"
canonical: "https://www.glean.com/agent-library/engineering-self-evaluation"
title: "Engineering self-evaluation agent | Glean AI Agent Library"
description: "Automatically generate a structured self-assessment based on your work and contributions during the review period."
fetched_at: "2026-09-01T13:27:28.382Z"
---
[

Back to Agent Library

](/ai-agents/agent-library)

![](https://cdn.prod.website-files.com/613513981b0efaf850830620/681e08c677b70c7e962534a4_AL%20-%20Engineering.svg)

Engineering

Featured

# Engineering self-evaluation

Automatically generate a structured self-assessment based on your work and contributions during the review period.

## Overview

The engineering self-evaluation agent generates a detailed self-review based on your work and contributions. It analyzes your activity and project history, pulling evidence from GitHub, Jira, Slack, Microsoft Teams, and Google Drive to show the impact of your work. Customize the timeframe, structure, and focus to fit your review process.

## See it in action

Watch how the engineering self-evaluation agent turns your contributions into a structured, evidence-backed self-assessment — no digging, formatting, or guesswork required.

## Capabilities

Saves hours by generating a structured, evidence-backed self-assessment.Supports flexible timeframes and structures to match your company’s review process.Makes it easier to showcase your impact, using specific examples to tell a clear story.

## Example output

### Self assessment for Jordan Lee - 2025-May-12

#### Front end performance optimization for search

**Timeframe**: December 2024 – April 2025

**Project summary**: Improved load time and responsiveness of the universal search experience by optimizing front end rendering, reducing client-side overhead, and introducing lazy-loading for result clusters.

**Complexity & difficulty**: Required deep profiling to identify bottlenecks across frameworks, caching layers, and DOM rendering. Also involved cross-browser testing and coordination with design to preserve UX integrity.

**My impact**: Led the performance audit, implemented key improvements, and worked closely with QA to validate results across environments. Reduced median search load time by 42%.

**My specific contributions:**

-   Identified bottlenecks via profiling and tracing (<span class="text-color-blue">Perf Report</span>)
-   Refactored results rendering logic (<span class="text-color-blue">PR</span>)
-   Introduced async loading for low-priority content (<span class="text-color-blue">Tech Spec</span>)  
      
    

**Technical leadership and code contributions**

**Design docs authored/reviewed:**

-   Search rendering refactor (<span class="text-color-blue">Design Spec</span>)
-   Expert detection pipeline (<span class="text-color-blue">Detection Brainstorm</span>)  
    

**Code & system contributions:**

-   Delivered 5 – 10 PRs per week for core systems
-   Maintained infra reliability during multiple rollouts  
    

**Initiative & mentorship:**

-   Provided guidance on frontend performance tooling
-   Supported junior engineers through PR reviews and tech syncs  
    

**Total number of projects combined:** 6

*The full document includes additional sections*

## Agent workflow

### Step 1: Trigger activation

This workflow is triggered when the user enters a start date and end date to define the review period.

### Step 2: Split date range

The agent breaks the selected time range into smaller chunks of four months each, adjusting for partial months and removing any ranges that fall in the future.

### Step 3: Loop through time segments (beta)

For each 4-month period, the agent runs a sub-agent that retrieves and processes relevant review content tied to that window.

### Step 4: Gather performance data

The agent pulls in projects and contributions from past reviews, removes duplicate entries, and adjusts timeframes to build a unified timeline.

### Step 5: Analyze and summarize contributions

The agent adds key details for each project, including the employee’s scope, role, impact, technical contributions, and supporting evidence.

### Step 6: Add technical leadership section

A dedicated section titled “technical leadership and code contributions” is appended. It includes metrics like average PRs per week and highlights broader team-level contributions.

### Step 7: Generate Markdown summary

The response is output in a clean, consistent Markdown format with sections for each project and contribution type.

### Step 8: Create self-assessment doc

The agent generates a new Google Doc titled Self Assessment for \[User Name\] – \[Today’s Date\], preserving all formatting and references.

### Best for

Software Engineers,Engineering Managers,Directors of Engineering

### Connectors

[

Gong

](/connectors/gong)

[

Google Drive

](/connectors/google-drive)

[

Jira

](/connectors/jira)

[

Microsoft Teams

](/connectors/microsoft-teams)

[

Slack

](/connectors/slack)

### Related agents

[

#### Engineering project onboarding

Get up to speed on engineering projects faster with a complete view of project docs, code, tickets, and owners.

](/agent-library/engineering-project-onboarding)

[

#### Launch documentation

Automate release documentation with just a few clicks.

](/agent-library/launch-documentation)

[

#### Pull request review

Streamline code reviews with automated feedback, context, and documentation alignment.

](/agent-library/pull-request-review)

[Browse Agent Library](/ai-agents/agent-library)

## Work AI that works.

[Get a demo](/get-a-demo)

![](https://cdn.prod.website-files.com/6127a84dfe068e153ef20572/69cb2e8bf65178f31d8136e2_career_hero-cta.webp)![](https://cdn.prod.website-files.com/6127a84dfe068e153ef20572/69cb2e8bf65178f31d8136e2_career_hero-cta.webp)![CTA Background Gradient 3](https://cdn.prod.website-files.com/6127a84dfe068e153ef20572/686c0ef31e585c1c0c9eb2a0_CTA%20Background.webp)![CTA Background Gradient 3](https://cdn.prod.website-files.com/6127a84dfe068e153ef20572/686c0ef31e585c1c0c9eb2a0_CTA%20Background.webp)![CTA Background Mobile](https://cdn.prod.website-files.com/6127a84dfe068e153ef20572/686cd671fb4cd509db55077c_CTA%20Background%20Mobile.webp)
