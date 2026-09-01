---
url: "https://www.glean.com/agent-library/spec-to-implementation-pr"
canonical: "https://www.glean.com/agent-library/spec-to-implementation-pr"
title: "Spec to implementation PR agent | Glean AI Agent Library"
description: "Go from spec to a draft PR grounded in your codebase, so engineers can review and refine faster."
fetched_at: "2026-09-01T13:27:29.927Z"
---
[

Back to Agent Library

](/ai-agents/agent-library)

![](https://cdn.prod.website-files.com/613513981b0efaf850830620/681e08c677b70c7e962534a4_AL%20-%20Engineering.svg)

Engineering

Featured

# Spec to implementation PR

Go from spec to a draft PR grounded in your codebase, so engineers can review and refine faster.

## Overview

Specs are only useful if they translate cleanly into working code. The spec to implementation PR agent reads a design doc or PRD as the source of truth, pulls out the requirements that matter for implementation, and anchors the work in your existing patterns and prior art. It then hands a structured plan to a code writer to produce a high-quality implementation pull request in GitHub, plus a concise summary and link so engineers can review, iterate, and merge through their normal workflow.

## See it in action

## Capabilities

-   Cuts “blank page” time with implementation-ready requirements pulled from the spec.
-   Keeps work consistent by grounding changes in existing GitHub patterns and prior art.
-   Accelerates spec-to-code with a structured plan that’s ready for code generation.
-   Simplifies review with a PR and spec-linked summary engineers can validate fast.

## Example output

**Design doc:** <span class="text-color-green">https://docs.your-org.com/designs/payments/v2-recurring-billing</span>  
**Target repository:** payments-service  
**Generated pull request:** <span class="text-color-green">https://github.com/your-org/payments-service/pull/942</span>

### **Summary**

The Implementation from Design Doc/PRD agent analyzed the **Recurring Billing v2** design doc, identified the required API surface, data model changes, and integration points with the existing invoicing service, and produced a draft implementation PR. The pull request adds the <span class="text-color-green">RecurringSchedule</span> entity, new endpoints for schedule creation and cancellation, and background processing for generating invoices according to the configured cadence, consistent with the flows described in the spec.

### **Key changes in the PR**

-   Added <span class="text-color-green">RecurringSchedule</span> and related persistence schema to model recurring billing plans
-   Implemented POST <span class="text-color-green">/v2/recurring-schedules and DELETE /v2/recurring-schedules/{id}</span> endpoints as specified in the design doc
-   Introduced a scheduler worker that creates invoices on the correct schedule, with idempotent processing and logging aligned with existing jobs
-   Added integration tests that cover creation, update, cancellation, and invoice generation paths described in the requirements

### **Returned to the engineer**

-   Design doc: <span class="text-color-green">Recurring Billing v2</span>
-   Implementation PR: <span class="text-color-green">payments-service#942</span>
-   Summary: Implements recurring billing API and background processing according to the documented design, including schema, endpoints, worker, and tests
-   Next steps: Review the generated implementation, adjust any naming or edge cases that were not fully specified in the PRD, and merge after CI passes

## Agent workflow

### Step 1: Ingest the design doc or PRD

The user provides a design doc or PRD. The agent reads it as the source of truth and pulls out intent, desired behaviors, data models, API shapes, and constraints.

### Step 2: Extract requirements and constraints

The agent distills the document into implementation-oriented requirements, separating what directly impacts code structure from broader context.

### Step 3: Gather codebase context

Using GitHub as a required data source, the agent finds related services, modules, libraries, and similar implementations to align the new work with established architecture.

### Step 4: Build an implementation plan

The agent packages the requirements, target repositories and directories, relevant prior art, and any must-handle behaviors into a focused plan for Glean code writer.

### Step 5: Generate the changes

The agent invokes Glean code writer with the plan and context so code can be generated or edited in the relevant repos, reusing prior art where appropriate.

### Step 6: Create and summarize the pull request

The agent wraps the generated diff in a GitHub pull request and returns a concise summary tied back to the original spec, along with the PR link for review and iteration.

### Best for

Engineering managers,Tech leads,Software engineers

### Connectors

[

GitHub

](/connectors/github)

### Related agents

[

#### Resolve Jira ticket

Turn a Jira issue into a review-ready pull request, plus a short summary of what changed.

](/agent-library/resolve-jira-tickets)

[

#### Pull request review

Streamline code reviews with automated feedback, context, and documentation alignment.

](/agent-library/pull-request-review)

[

#### Launch documentation

Automate release documentation with just a few clicks.

](/agent-library/launch-documentation)

[Browse Agent Library](/ai-agents/agent-library)

## Work AI that works.

[Get a demo](/get-a-demo)

![](https://cdn.prod.website-files.com/6127a84dfe068e153ef20572/69cb2e8bf65178f31d8136e2_career_hero-cta.webp)![](https://cdn.prod.website-files.com/6127a84dfe068e153ef20572/69cb2e8bf65178f31d8136e2_career_hero-cta.webp)![CTA Background Gradient 3](https://cdn.prod.website-files.com/6127a84dfe068e153ef20572/686c0ef31e585c1c0c9eb2a0_CTA%20Background.webp)![CTA Background Gradient 3](https://cdn.prod.website-files.com/6127a84dfe068e153ef20572/686c0ef31e585c1c0c9eb2a0_CTA%20Background.webp)![CTA Background Mobile](https://cdn.prod.website-files.com/6127a84dfe068e153ef20572/686cd671fb4cd509db55077c_CTA%20Background%20Mobile.webp)
