---
url: "https://docs.glean.com/agents/agent-development-lifecycle/test-and-launch-your-agent"
canonical: "https://docs.glean.com/agents/agent-development-lifecycle/test-and-launch-your-agent"
title: "Test and launch your agent"
description: "Run QA and user acceptance testing, document usage, and roll out your Glean Agent so others can adopt it with confidence."
fetched_at: "2026-09-01T13:29:15.970Z"
---
On this page

Before publishing an agent to a broader audience, you must confirm that it works as designed, meets user needs, and is documented clearly enough for others to adopt it. A successful launch ensures the agent is not only functional but also trusted.

## Quality assurance (QA)[​](#quality-assurance-qa "Direct link to Quality assurance (QA)")

QA is your final technical check. At this stage, you are confirming that the testing of the agent is sound and the logic is resilient.

Your QA process must answer:

-   Reliability: Do all steps run without error?
-   Consistency: Does the agent pass your *Golden test set* at the expected rate?
-   Resilience: Does it handle malformed or adversarial inputs safely?
-   Privacy: Does it respect data permissions across different user profiles?
-   Performance: Is the response time fast enough for the intended workflow?

## User acceptance testing (UAT)[​](#user-acceptance-testing-uat "Direct link to User acceptance testing (UAT)")

While QA focuses on the technical build, UAT focuses on utility. This involves getting the agent into the hands of the people who will actually use it daily.

Ask your UAT group:

-   Did the agent provide the right answer for your specific task?
-   Was the output format easy to use and act upon?
-   Did you feel confident in the accuracy of the result?
-   Would you use this agent again tomorrow?

UAT must always involve end-users, not just the builder. Their *real-world* phrasing often reveals gaps that the developer might miss.

## Document for your users[​](#document-for-your-users "Direct link to Document for your users")

Before clicking *Publish*, ensure your users have a roadmap. Clear documentation reduces support tickets and increases adoption.

Key information to include:

-   Purpose and scope: A clear *What this is for* and *What it is not for.*
-   Example prompts: 3–5 concrete ways a user can start a conversation.
-   Connectors: Which systems the agent is *reading*, for example, *Answers based on Zendesk and Slack*.
-   Limitations: Be transparent about known gaps or edge cases.
-   Support path: Who to contact for feedback or to report a bug.

## Use a staged rollout[​](#use-a-staged-rollout "Direct link to Use a staged rollout")

For agents with higher impact, consider a tiered approach:

-   Phase 1: Preview. Keep the agent as a draft and share the *Preview* link with 2–3 close collaborators.
-   Phase 2: Limited group. Publish to a specific team or department first.
-   Phase 3: Company-wide. Move to the Agent Library for broad discovery.

## Pre-Launch checklist[​](#pre-launch-checklist "Direct link to Pre-Launch checklist")

Use this list as your final *Go/No-Go* gate:

-   Golden set testing is complete and passed.
-   Permissions are verified with a restricted user account.
-   Agent description and *About* section are filled out in Glean.
-   Sample prompts are helpful and specific.
-   Owner is clearly identified for long-term maintenance.

## Example: Support Triage Agent[​](#example-support-triage-agent "Direct link to Example: Support Triage Agent")

Before a department-wide launch, the team can follow these steps:

1.  QA: Verify the agent does not hallucinate ticket numbers during high-volume testing.
2.  UAT: Three senior support leads use the agent for a week and suggest adding *Slack thread links* to the output.
3.  Documentation: The builder adds a note: *This agent only sees tickets from the last 90 days.*
4.  Launch: The agent is published to the *Customer Support* group in the Agent Library.
