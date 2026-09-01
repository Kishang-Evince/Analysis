---
url: "https://docs.glean.com/user-guide/mcp/engineering"
canonical: "https://docs.glean.com/user-guide/mcp/engineering"
title: "MCP for Engineering"
description: "Debug errors, review code, and understand your codebase with Glean's MCP server"
fetched_at: "2026-09-01T13:30:42.165Z"
---
On this page

Engineering teams use Glean's MCP server in their IDEs to access enterprise context without leaving their development environment. These examples come from validated, production use cases.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

**Recommended connectors:**

-   GitHub (or GitLab, Bitbucket)
-   Jira (or Linear, Asana)
-   Slack
-   Confluence (or Notion)
-   Google Drive (for design docs and RFCs)

**Supported MCP hosts:**

-   Cursor
-   VS Code with extensions
-   Claude Desktop
-   Windsurf
-   Claude Code

## Glean plug-in for Cursor, Claude Code, and Codex[​](#glean-plug-in-for-cursor-claude-code-and-codex "Direct link to Glean plug-in for Cursor, Claude Code, and Codex")

If you use Cursor, Claude Code, or Codex, you can install a Glean plug-in for dynamic Skill and tool discovery. For installation and authentication, see [Use the Glean plug-in](/user-guide/mcp/glean-plugin). Use that guide for plug-in setup; use this page for engineering workflows and example prompts.

## Use Cases[​](#use-cases "Direct link to Use Cases")

### 1\. Stack Trace Debugging[​](#1-stack-trace-debugging "Direct link to 1. Stack Trace Debugging")

When you encounter an error, Glean can find similar past issues, known fixes, and relevant experts.

### Example Prompt

```
Here's a build failure log from our CI pipeline. Use Glean to identifythe file and line causing the issue, search for similar failures in the last30 days, and find what fix was used last time. Draft a PR with the solutionand suggest who to ask if this doesn't work.
```

### Alternative Prompts

```
Check Glean if anyone else has run into this error: [paste error]
```

```
I'm getting this stack trace. Use Glean to find the likely source files,similar errors in Slack or Jira, and relevant documentation.
```

**What it does:**

-   Parses the stack trace to identify key error messages
-   Searches Slack, Jira, and GitHub for similar errors
-   Finds documentation about error handling
-   Suggests the right expert or Slack channel if confidence is low

**Real user flow:** Highlight a terminal error → Ask your IDE assistant to check Glean → Get context without leaving your editor.

### 2\. Understanding Code History[​](#2-understanding-code-history "Direct link to 2. Understanding Code History")

Find out why code was written a certain way by tracing through PRs, design docs, and Slack discussions.

### Example Prompt

```
Why was the file `code_oqagen.py` created? What's the rationale behindhaving a separate code oqagen file instead of adding it to the existingoqagen pipeline? Use Glean to find the PR, design discussions, and any Slackconversations about this decision.
```

### Alternative Prompts

```
Use Glean to explain why this authentication method was chosen overalternatives. Look for RFCs, PR discussions, and Slack threads.
```

```
Why was X done instead of Y in this module? Find the historical context.
```

**What it does:**

-   Searches GitHub for the original PR and review comments
-   Finds related design docs or RFCs
-   Locates Slack discussions that influenced the decision
-   Synthesizes the "why" behind implementation choices

### 3\. CI/CD Pipeline Failures[​](#3-cicd-pipeline-failures "Direct link to 3. CI/CD Pipeline Failures")

Explain pipeline failures by correlating logs with recent code changes, known flakes, and similar incidents.

### Example Prompt

```
Explain this CI failure: [link or log snippet]Use Glean to:1. Cluster similar failures in the last 14 days2. Point to the culprit PR range3. Propose the fastest minimal fix4. Include the likelihood this is a flaky test vs a real issue
```

### Alternative Prompts

```
This pipeline failed. Search Glean for past incidents that looked like this andshow me the one-liner that fixed it.
```

```
Use Glean to find recent code changes that might have caused this buildfailure, and check if there are open bugs about it.
```

**What it does:**

-   Correlates failure logs with recent commits
-   Searches for similar failures and their resolutions
-   Identifies known flaky tests
-   Recommends retry vs fix strategy

### 4\. PR Review and Documentation[​](#4-pr-review-and-documentation "Direct link to 4. PR Review and Documentation")

Generate PR descriptions that link to relevant context, and perform code reviews based on your team's standards.

### Example Prompt

```
Generate a PR description for my current changes. Use Glean to:1. Link relevant Jira tickets and RFC sections2. Check our code review guidelines3. Flag any security or performance concerns based on past reviews4. Suggest reviewers based on code ownership
```

### Alternative Prompts

```
Review this PR using Glean to reference our style guide, security bestpractices, and architectural design docs. Flag deviations.
```

```
Use Glean to find the code owners for these files and suggest who shouldreview this PR.
```

**What it does:**

-   Generates comprehensive PR descriptions with context
-   Links to related tickets, RFCs, and discussions
-   Checks code against documented standards
-   Suggests appropriate reviewers

### 5\. Codebase Onboarding[​](#5-codebase-onboarding "Direct link to 5. Codebase Onboarding")

Speed up understanding of unfamiliar code by pulling together docs, architectural context, and ownership info.

### Example Prompt

```
I'm new to the Search Serving service. Use Glean to:1. Explain the service architecture2. Show me how to run the test suite locally3. Describe our release process4. Tell me who reviews changes in this area
```

### Alternative Prompts

```
Help me get started writing a new connector. Use Glean to find relevant codeexamples, design patterns, and developer guides.
```

```
I need to modify the payment processing flow. Use Glean to find the design doc,recent changes, and who owns this code.
```

**What it does:**

-   Finds onboarding documentation and developer guides
-   Locates architecture diagrams and RFCs
-   Identifies code owners and subject matter experts
-   Surfaces recent changes and active work

### 6\. Jira Bug Triage[​](#6-jira-bug-triage "Direct link to 6. Jira Bug Triage")

Quickly understand bugs by pulling together ticket details, Slack escalations, and similar past issues.

### Example Prompt

```
Can you help debug and resolve Jira ticket EN-12345? Use Glean to:1. Find the ticket details and any linked Slack threads2. Search for similar resolved bugs3. Identify the likely root cause based on recent changes4. Propose a fix or suggest who to escalate to
```

### Alternative Prompts

```
Given this Jira ticket and the linked Slack escalation, use Glean to summarizerepro steps, suspected cause, prior related bugs, and next steps.
```

```
Search Glean for all tickets and Slack messages about this error code in thelast 90 days. What's the pattern?
```

**What it does:**

-   Retrieves full ticket context including comments
-   Links related Slack discussions and escalations
-   Finds duplicate or similar issues
-   Suggests owners and next steps

### 7\. Write Code Aligned with Style[​](#7-write-code-aligned-with-style "Direct link to 7. Write Code Aligned with Style")

Ensure new code follows team conventions by checking style guides before generating suggestions.

### Example Prompt

```
Before suggesting this code change, use Glean to find our style guide for[language] and make sure the suggestion follows our conventions.
```

### Alternative Prompts

```
Use Glean to search for similar implementations in our codebase and generatecode that matches our patterns.
```

```
Check our code review guidelines in Glean and verify this change follows ourstandards for error handling and logging.
```

**What it does:**

-   Searches for documented style guides
-   Reviews past code review feedback
-   Ensures consistency with team conventions

### 8\. RFC to Implementation Drift[​](#8-rfc-to-implementation-drift "Direct link to 8. RFC to Implementation Drift")

Compare design documents to actual implementation to find what changed and what needs updating.

### Example Prompt

```
Find the RFC for "Hosted MCP Server" in Glean and compare the approved designsections on URL schemes and authentication to our current implementation.Summarize the deltas and propose updates to the doc and a PR checklist.
```

### Alternative Prompts

```
Use Glean to find the design doc for feature X. Compare it to the merged PRsand tell me what was implemented differently and why.
```

```
Search for our API design RFC and check if the current endpoints match what wasapproved. Flag any undocumented changes.
```

**What it does:**

-   Retrieves original design documents
-   Compares with current code implementation
-   Identifies undocumented changes
-   Suggests documentation updates

### 9\. Generate Launch Notes[​](#9-generate-launch-notes "Direct link to 9. Generate Launch Notes")

Automatically create release notes from Jira tickets and merged PRs.

### Example Prompt

```
Use Glean to find all Jira tickets tagged for the Q3 release. Generatelaunch notes that summarize new features, bug fixes, and breaking changeswith links to relevant documentation.
```

### Alternative Prompts

```
Create release notes from merged PRs in the last sprint. Use Glean togroup by feature, link to Jira tickets, and highlight customer impact.
```

**What it does:**

-   Aggregates tickets and PRs for a release
-   Groups changes by category
-   Generates user-facing descriptions
-   Links to detailed documentation

### 10\. Documentation Generation[​](#10-documentation-generation "Direct link to 10. Documentation Generation")

Create or update documentation from RFCs, code, and team knowledge.

### Example Prompt

```
Draft a "QE MCP Server: URL Schemes & Auth" runbook using Glean to find theRFC, design doc, and current code. Include validation steps and rollbackprocedures. Format for Confluence.
```

### Alternative Prompts

```
Use Glean to generate API documentation for this endpoint based on the code,design doc, and any existing examples.
```

```
Create an onboarding doc for this service. Use Glean to find setupinstructions, architecture docs, and team conventions.
```

**What it does:**

-   Synthesizes information from multiple sources
-   Generates structured documentation
-   Includes code examples and validation steps
-   Formats for your documentation platform

## Best Practices[​](#best-practices "Direct link to Best Practices")

### Use .cursorrules or Similar[​](#use-cursorrules-or-similar "Direct link to Use .cursorrules or Similar")

Many MCP hosts support configuration files. Add Glean-specific instructions:

```
When debugging errors, always search Glean for similar issues before proposing fixes.When writing new code, check Glean for our style guides and existing patterns.For PRs, use Glean to find related tickets and design docs to include in descriptions.
```

### Be Specific About Timeframes[​](#be-specific-about-timeframes "Direct link to Be Specific About Timeframes")

```
✅ "Search Glean for similar errors in the last 30 days"✅ "Find PRs merged since the last release"❌ "Find similar errors" (may return stale results)
```

### Request Confidence Levels[​](#request-confidence-levels "Direct link to Request Confidence Levels")

```
If confidence is low, suggest the Slack channel or expert to ask instead of guessing.
```

### Combine Tools[​](#combine-tools "Direct link to Combine Tools")

```
Use Glean to find the design doc, then analyze the code in this repository tocompare the implementation.
```

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

**Assistant not using Glean?**

-   Be explicit: "Use Glean to search for..."
-   Check that the MCP server is configured correctly
-   Verify you have the necessary connector permissions

**Results not relevant?**

-   Add more specific keywords or identifiers
-   Specify the connector (for example, "in GitHub" or "in Slack")
-   Narrow the timeframe

**Missing context?**

-   Check that required connectors are enabled
-   Verify indexing is up to date
-   Ensure you have permissions to the connectors

## See also[​](#see-also "Direct link to See also")

-   [MCP Setup Guide](/user-guide/mcp/usage) - Initial configuration
-   [Glean for Engineering](https://www.glean.com/solutions/engineering) - Overview of engineering use cases
-   [Chat Best Practices](/user-guide/assistant/best-practices) - General prompting tips
