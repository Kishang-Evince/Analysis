---
url: "https://www.glean.com/agent-library/resolve-jira-tickets"
canonical: "https://www.glean.com/agent-library/resolve-jira-tickets"
title: "Resolve Jira ticket agent | Glean AI Agent Library"
description: "Turn a Jira issue into a review-ready pull request, plus a short summary of what changed."
fetched_at: "2026-09-01T13:27:29.366Z"
---
[

Back to Agent Library

](/ai-agents/agent-library)

![](https://cdn.prod.website-files.com/613513981b0efaf850830620/681e08c677b70c7e962534a4_AL%20-%20Engineering.svg)

Engineering

Featured

# Resolve Jira ticket

Turn a Jira issue into a review-ready pull request, plus a short summary of what changed.

## Overview

Handing off a Jira ticket into an implementation PR can mean rereading threads, rewriting requirements, and stitching together missing context. The resolve Jira tickets agent streamlines that path by extracting the important details from a Jira issue, enriching them with relevant context beyond the ticket, and passing a structured payload to a code writing action. The result is a pull request suitable for review, along with a brief summary and a direct link so engineers can move straight into code review.

## See it in action

## Capabilities

-   Reduces back-and-forth by translating ticket details into clear, implementation-ready requirements.
-   Gathers context from beyond the ticket and generates a review-ready pull request.
-   Explains what changed and why, with a direct link for faster review and merge.

## Example output

**Ticket:** <span class="text-color-green">ENG-1245</span>  
**Status:** Resolved via generated pull request  
**Generated pull request:** <span class="text-color-green">https://github.com/your-org/example-service/pull/482</span>

**Summary**

The Jira Ticket Fixer extracted the problem description from **ENG-1245**, passed it to code writer, and used the result to open pull request **#482**. The PR contains the code changes proposed by code writer to address the behavior described in the ticket, along with any associated test updates.

**Returned to the user**

-   Ticket: <span class="text-color-green">ENG-1245</span>
-   Pull request: <span class="text-color-green">https://github.com/your-org/example-service/pull/482</span>
-   Summary: Generated PR implements the fix proposed by code writer for the issue described in the ticket

## Agent workflow

### Step 1: Extract details from the Jira ticket

The user inputs a Jira ticket to run the agent. The agent extracts the relevant details and converts them into a concise description that a code writing action can work from without needing the full ticket thread.

### Step 2: Send extracted content to code writer

The agent passes the structured payload to Glean code writer, which generates or modifies code in the relevant repo based on the problem description from the ticket.

### Step 3: Create a pull request

The agent turns the generated changes into a pull request, populating it with the proposed implementation so engineers can inspect and validate before merging.

### Step 4: Summarize and return the PR link

The agent produces a brief summary of what was implemented in the context of the original ticket and returns a direct link to the generated pull request.

### Best for

Engineering managers,Tech leads,Software engineers

### Connectors

[

Jira

](/connectors/jira)

[

GitHub

](/connectors/github)

### Related agents

[

#### Resolve GitHub PR feedback

Summarize unresolved PR feedback, generate a patch, and draft replies in one pass.

](/agent-library/resolve-github-pr-feedback)

[

#### Pull request review

Streamline code reviews with automated feedback, context, and documentation alignment.

](/agent-library/pull-request-review)

[

#### Spec to implementation PR

Go from spec to a draft PR grounded in your codebase, so engineers can review and refine faster.

](/agent-library/spec-to-implementation-pr)

[Browse Agent Library](/ai-agents/agent-library)

## Work AI that works.

[Get a demo](/get-a-demo)

![](https://cdn.prod.website-files.com/6127a84dfe068e153ef20572/69cb2e8bf65178f31d8136e2_career_hero-cta.webp)![](https://cdn.prod.website-files.com/6127a84dfe068e153ef20572/69cb2e8bf65178f31d8136e2_career_hero-cta.webp)![CTA Background Gradient 3](https://cdn.prod.website-files.com/6127a84dfe068e153ef20572/686c0ef31e585c1c0c9eb2a0_CTA%20Background.webp)![CTA Background Gradient 3](https://cdn.prod.website-files.com/6127a84dfe068e153ef20572/686c0ef31e585c1c0c9eb2a0_CTA%20Background.webp)![CTA Background Mobile](https://cdn.prod.website-files.com/6127a84dfe068e153ef20572/686cd671fb4cd509db55077c_CTA%20Background%20Mobile.webp)
