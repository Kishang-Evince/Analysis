---
url: "https://docs.glean.com/user-guide/assistant/code-generation"
canonical: "https://docs.glean.com/user-guide/assistant/code-generation"
title: "Code Generation"
description: "Enhance software development workflows with Glean's intelligent code generation capabilities"
fetched_at: "2026-09-01T13:30:38.412Z"
---
On this page

When Glean is connected to your organization's code repositories like GitHub (Cloud or Enterprise Server) or GitLab, Glean gains powerful capabilities that boost productivity of your software engineers. Unlike traditional generative AI or co-pilot tools, Glean provides a unique advantage by understanding and incorporating context from multiple sources including code, design docs, technical documentation, tickets, PRs, issues, and discussion threads.

## Overview[​](#overview "Direct link to Overview")

By integrating with the code repositories of your organization, Glean enriches its enterprise knowledge graph to provide:

### Code Search and Understanding

Ask questions about your codebase and get answers grounded in your organization's actual code, documentation, and related discussions.

### Inline Code Generation

Generate code snippets directly in chat that align with your organization's standards. Copy and paste into your editor.

### Code Writer

Propose and apply small, targeted code changes by opening draft pull requests in GitHub. Move from bug to fix without leaving Glean.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Code Search is enabled by default after your admin connects a supported code host to Glean.

note

Your admin must connect GitHub (Cloud or Enterprise Server) or GitLab to enable Code Search capabilities. For configuration details, see [Code Tool](/user-guide/assistant/code-search).

### Key Benefits[​](#key-benefits "Direct link to Key Benefits")

### Rapid Error Resolution

Quickly identify and resolve issues using a comprehensive database of code snippets, documentation, and previous solutions.

### Automated Code Generation

Boost productivity with automatic generation of code snippets for both routine tasks and new feature development.

### Knowledge Sharing

Facilitate effective communication of coding practices and standards across your organization.

### Streamlined Onboarding

Accelerate new engineer integration with structured learning resources and codebase insights.

## Understanding the Capabilities[​](#understanding-the-capabilities "Direct link to Understanding the Capabilities")

Glean supports several related capabilities for working with code:

-   **Code search and questions**
    
    -   Ask questions about your codebase and Glean searches your code, PRs, commits, and related documentation.
    -   Use this when you want to understand how something works, find implementations, or get context.
-   **Inline code generation**
    
    -   Write or improve code snippets directly in chat.
    -   Use this when you want ideas, examples, or a starting point that you will paste into your editor.
-   **Code Writer**
    
    -   Proposes and applies code changes by opening draft pull requests in GitHub.
    -   Uses your instructions as context, then writes code into a branch for review.
    -   Use this when you want to make changes in a repository.

A typical flow looks like:

1.  Ask questions to understand existing code (Glean searches automatically).
2.  Ask Glean to **use Code Writer** to propose a fix if you need changes.
3.  Review and merge the resulting pull request in GitHub.

Code search and inline generation happen in chat, while Code Writer always works through pull requests.

## Example Queries[​](#example-queries "Direct link to Example Queries")

You can ask Glean about your codebase without explicitly invoking Code Writer. These questions use code search and inline generation:

### Code Context and Understanding[​](#code-context-and-understanding "Direct link to Code Context and Understanding")

-   "How is `[system]` implemented at our company?"
-   "How do I debug/solve `[error]`?"
-   "Help me write code to do `X` in `[language]`"
-   "Where is the code file that does `X`?"
-   "Help me write unit tests for `[file]`"

### Process and Customer Context[​](#process-and-customer-context "Direct link to Process and Customer Context")

-   "What is the status of this week's backend release?"
-   "Who can I ask about `[system or feature]`?"
-   "How do I set up my dev environment?"
-   "Which customers are using `[feature]`?"
-   "What customers have raised issues this week?"

## Code Writer[​](#code-writer "Direct link to Code Writer")

**Code Writer** is an AI‑powered code tool that edits code and opens draft pull requests. It works with GitHub so you can make changes to your code without leaving Glean or Slack.

When Code Writer is enabled for your organization and you have access:

-   Glean can call Code Writer behind the scenes when a task requires code changes.
-   Code Writer reads the relevant repository, proposes a change, and opens a draft pull request in GitHub.
-   Glean returns the pull request link and a short explanation so you can review it in your usual tools.

You still review, update, and merge changes in GitHub.

## Use Code Writer in Glean[​](#use-code-writer-in-glean "Direct link to Use Code Writer in Glean")

You can trigger Code Writer from Glean to make changes in GitHub.

### Connect your GitHub account[​](#connect-your-github-account "Direct link to Connect your GitHub account")

The first time you use a feature that relies on Code Writer:

1.  Ask Glean to perform a code change (see examples below).
2.  Glean prompts you to **connect your GitHub account**.
3.  Follow the sign‑in flow to authorize Glean.
4.  After that, tokens refresh automatically and you typically will not see this prompt again.

If you do not see a GitHub prompt and Glean says it cannot use Code Writer, your admin may need to enable the feature.

### Example prompts[​](#example-prompts "Direct link to Example prompts")

Here are some example ways to ask Glean to use Code Writer:

-   “Use Code Writer to create a draft PR that fixes this stack trace in the `example` repo.”
-   “Based on JIRA-1234, propose a fix and open a draft PR.”
-   “Update the error message in our password reset handler and open a draft PR with the change.”
-   “Review PR `ENG-5678` and apply the requested logging changes as a new commit.”

When you run a request like this and Code Writer is available:

1.  Glean gathers context (ticket text, stack traces, related code).
    
2.  Code Writer plans and applies a small change in the configured GitHub repository and branch.
    
3.  Glean returns:
    
    -   A link to the draft pull request.
    -   A short summary of what changed.

You can then:

-   Open the pull request in GitHub and review the diff.
-   Ask follow‑up questions in Glean (for example, “What tests should I run?” or “Can you narrow this change to just the `user-profile` module?”).

## Use Code Writer from Slack (Glean in Slack)[​](#use-code-writer-from-slack-glean-in-slack "Direct link to Use Code Writer from Slack (Glean in Slack)")

If your organization has **Glean in Slack** and Code Writer enabled, you can trigger Code Writer directly from Slack.

### Requirements[​](#requirements "Direct link to Requirements")

-   The **Glean** Slack app is installed for your workspace.
-   The **Glean** app is added to the channel where you want to use it.
-   You have permission to use Code Writer and have connected your GitHub account when prompted.

## How to use Code Writer in common scenarios[​](#how-to-use-code-writer-in-common-scenarios "Direct link to How to use Code Writer in common scenarios")

### Adding to Existing Code[​](#adding-to-existing-code "Direct link to Adding to Existing Code")

1

Situation

An engineer needs to create a new evalset, working with code spread across multiple files and languages. They need to leverage existing code rather than starting from scratch.

2

Example Queries

-   "How do I add a new search evalset?"
-   "How to create a new autocomplete evalset for history suggestions?"

3

Outcome

Glean identifies relevant files requiring changes and provides explanations with adaptable code snippets.

### Debugging Errors[​](#debugging-errors "Direct link to Debugging Errors")

1

Situation

An on-call engineer encounters a panic occurring in specific product situations.

2

Example Queries

-   "Help me debug \[full panic error\]"
-   "Can you review the code and help me fix the panic?"
-   "Give me a list of reviewers for this code change"
-   "Can you create a PR description?"

3

Outcome

Glean analyzes the stack trace, suggests fixes, and can use Code Writer to open a draft PR with the fix.

### Feature Status Check[​](#feature-status-check "Direct link to Feature Status Check")

1

Situation

An engineer needs to determine a feature's implementation status and customer requests.

2

Example Queries

-   "Is \[feature\] enabled?"
-   "What customers have asked for this feature?"

3

Outcome

Glean compiles information from design docs, code changes, and Jira tickets, including feature flags and customer requests.

### Code Change Impact[​](#code-change-impact "Direct link to Code Change Impact")

1

Situation

An engineer debugging an error needs to understand recent changes affecting their component.

2

Example Queries

"What recent changes could have caused errors in runtime configs?"

3

Outcome

Glean analyzes recent changes across code, tickets, and discussions to provide a comprehensive summary.

### Implementation Guidance[​](#implementation-guidance "Direct link to Implementation Guidance")

1

Situation

An engineer starting a new implementation needs guidance on multi-file changes across the stack.

2

Example Queries

"Where can I add a new endpoint for QE?"

3

Outcome

Glean provides file locations and required changes based on similar past implementations.

## FAQ[​](#faq "Direct link to FAQ")

### Which connectors are supported?

Code repositories in GitHub (Cloud), GitHub Enterprise Server, and GitLab are supported.

### What permissions are required?

The permissions match those of the Glean GitHub and GitLab connectors exactly. For Code Writer specifically, you will need to connect your personal GitHub account to authorize changes.

### Is code search supported in search results?

Currently, indexed code is only used for Glean responses. Glean Search matches PR descriptions and file names, but not code contents directly, to reduce result noise.

### How is my data secured?

Code snippets become part of your organization's Glean Knowledge Graph, ensuring:

-   Only users with existing code access can access it via Glean
-   Code snippets follow the same privacy guarantees as all other indexed Glean content

### What code file types are supported?

Glean searches through code in:

-   PR and Merge Request differentials
-   Latest commit and Main/Master branch files with extensions including but not limited to:
    -   Common languages: .js, .py, .java, .cpp, .go, .rb, .php
    -   Web technologies: .html, .css, .scss
    -   Configuration: .ini, .cfg, .cnf

info

For a complete list of supported file extensions, please contact Glean support.

### Do I need Code Writer to ask questions about my code?

No. You can ask Glean questions about your codebase, get explanations, and receive code snippets without using Code Writer. Code Writer is only needed when you want to create actual pull requests with proposed changes.
