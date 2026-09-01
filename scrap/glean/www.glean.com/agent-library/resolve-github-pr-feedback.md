---
url: "https://www.glean.com/agent-library/resolve-github-pr-feedback"
canonical: "https://www.glean.com/agent-library/resolve-github-pr-feedback"
title: "Resolve GitHub PR feedback agent | Glean AI Agent Library"
description: "Summarize unresolved PR feedback, generate a patch, and draft replies in one pass."
fetched_at: "2026-09-01T13:27:29.598Z"
---
[

Back to Agent Library

](/ai-agents/agent-library)

![](https://cdn.prod.website-files.com/613513981b0efaf850830620/681e08c677b70c7e962534a4_AL%20-%20Engineering.svg)

Engineering

Featured

# Resolve GitHub PR feedback

Summarize unresolved PR feedback, generate a patch, and draft replies in one pass.

## Overview

PR reviews move faster when the remaining feedback is clear and actionable. The resolve GitHub PR feedback agent pulls unresolved comments from one or more pull requests, groups them into a focused set of tasks, and flags what’s blocking merge versus nice to have. It then uses Glean code writer action to generate a ready-to-apply patch and drafts concise reviewer replies, so engineers can close the loop with less context switching.

## See it in action

## Capabilities

-   Aggregates unresolved review comments across one or more PRs and clusters them by file, concern type, and severity so engineers don’t have to chase threads.
-   Flags which items are blocking merge versus nice to have, and turns each cluster into a concrete task.
-   Generates a scoped, ready-to-apply patch that addresses high-confidence feedback and ties changes back to the exact comments they resolve.
-   Drafts concise, technical replies that are ready to paste into review threads and helps keep conversations moving.

## Example output

**Repository:** <span class="text-color-green">internal-platform/api-gateway</span>  
**Pull request:** #482 Add rate limiting to public API  
**Status:** Open, 1 reviewer, 2 unresolved comments

### Summary

-   All high-level design concerns are addressed
-   Remaining work is concentrated in configuration validation

### Outstanding review items

1.  **Config validation and defaults (blocking)**  
    -   <span class="text-color-green">config/rate\_limiting.yaml:</span> Add validation that requests\_per\_minute is greater than zero
    -   <span class="text-color-green">config/rate\_limiting.yaml:</span> Provide default burst\_size when not specified, current behavior is to treat missing as zero

### Proposed code changes and fixes

**1\. Config validation**

*File:* <span class="text-color-green">config/rate\_limiting.yaml</span> *(loader logic in* <span class="text-color-green">config/loader.go</span>*)*

-   Before applying configuration, add a validation step:

<span class="text-color-green">if cfg.RequestsPerMinute &lt;= 0 {</span>

    <span class="text-color-green">return fmt.Errorf("rate limiting: requests\_per\_minute must be &gt; 0, got %d", cfg.RequestsPerMinute)</span>

<span class="text-color-green">}</span>

<span class="text-color-green">if cfg.BurstSize == 0 {</span>

    <span class="text-color-green">cfg.BurstSize = cfg.RequestsPerMinute</span>

<span class="text-color-green">}</span>

This resolves comments from Alice on invalid configurations and missing defaults.

### Draft reviewer responses

**For Alice:**

Added validation for <span class="text-color-green">requests\_per\_minute &gt; 0</span> and defaulted <span class="text-color-green">burst\_size</span> to <span class="text-color-green">requests\_per\_minute</span> when unspecified. This should prevent invalid configs from booting successfully and matches the behavior you described.

## Agent workflow

### Step 1: Identify target PRs

The user provides one or more GitHub pull request URLs to run the agent. The agent resolves each link to a PR and pulls core metadata like title, author, reviewers, status, and linked issues.

### Step 2: Pull open comments and threads

For each PR, the agent retrieves inline comments, unresolved review threads, and top-level review summaries or requested changes. Resolved or superseded feedback is filtered out so the output stays focused.

### Step 3: Analyze and cluster feedback

The agent groups remaining comments by file, concern type, and severity. Duplicate or closely related feedback is merged into a single actionable item.

### Step 4: Build a resolution plan

Each feedback cluster is translated into a concrete task with scope and relevant files identified. Tasks are ordered to address merge-blocking items first.

### Step 5: Generate fixes with code writer

For high-confidence clusters, the agent invokes the code writer action with relevant files, diff context, and reviewer comments. It produces scoped edits intended to resolve the feedback while following existing repo patterns and style.

### Step 6: Map changes to review threads

The agent links each generated change back to the originating comment thread, so it’s clear which code line and commit address which piece of feedback.

### Step 7: Draft reviewer replies

For each outstanding thread, the agent drafts a short, technical response that confirms what changed and where, explains why a request wasn’t applied, or asks a clarifying question when requirements are unclear.

### Step 8: Produce final summary 

The agent outputs a PR-level summary covering status, remaining effort, proposed fixes, tests, and ready-to-paste replies for GitHub, Slack, or a task tracker.

### Best for

Engineering managers,Tech leads,Software engineers

### Connectors

[

GitHub

](/connectors/github)

### Related agents

[

#### Pull request review

Streamline code reviews with automated feedback, context, and documentation alignment.

](/agent-library/pull-request-review)

[

#### Engineering standup

Generate standup updates that focus on impact, progress, and real blockers.

](/agent-library/engineering-standup)

[

#### Spec to implementation PR

Go from spec to a draft PR grounded in your codebase, so engineers can review and refine faster.

](/agent-library/spec-to-implementation-pr)

[Browse Agent Library](/ai-agents/agent-library)

## Work AI that works.

[Get a demo](/get-a-demo)

![](https://cdn.prod.website-files.com/6127a84dfe068e153ef20572/69cb2e8bf65178f31d8136e2_career_hero-cta.webp)![](https://cdn.prod.website-files.com/6127a84dfe068e153ef20572/69cb2e8bf65178f31d8136e2_career_hero-cta.webp)![CTA Background Gradient 3](https://cdn.prod.website-files.com/6127a84dfe068e153ef20572/686c0ef31e585c1c0c9eb2a0_CTA%20Background.webp)![CTA Background Gradient 3](https://cdn.prod.website-files.com/6127a84dfe068e153ef20572/686c0ef31e585c1c0c9eb2a0_CTA%20Background.webp)![CTA Background Mobile](https://cdn.prod.website-files.com/6127a84dfe068e153ef20572/686cd671fb4cd509db55077c_CTA%20Background%20Mobile.webp)
