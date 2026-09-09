---
url: "https://www.glean.com/blog/introducing-agent-identity"
canonical: "https://www.glean.com/blog/introducing-agent-identity"
title: "Agent identity: Agents that act and appear as themselves"
description: "Arun Kumar  | Glean agent identity lets AI agents act through their own scoped credentials with clear attribution, persistent access, and admin control."
fetched_at: "2026-09-01T13:26:46.202Z"
---
Last updated Jul 15, 2026.

# Agent identity: Agents that act and appear as themselves

0

minutes read

[![](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a57bf4911deb612d3315ee9_arun.webp)

Arun Kumar

Product Manager



](/authors/arun-kumar)

![Agent identity: Agents that act and appear as themselves](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a57bef16ec04ecea9c709f6_Agent_identity_blog-BANNER.webp)

Listen to article

0:00

0.5x 1x 1.5x 2x

### Table of contents

[

Heading 2

](#)

[

Heading 3

](#)

[

Heading 4

](#)

[

Heading 5

](#)

[

Heading 6

](#)

[

Have questions or want a demo?

We’re here to help! Click the button below and we’ll be in touch.

Get a Demo



](/get-a-demo)

Share this article:

Listen to article

0:00

0.5x 1x 1.5x 2x

In our experience building and implementing agents, customers have run into one roadblock over and over again: how can agents act as themselves? It usually goes like this. An engineer builds a triage agent - it reads incoming tickets, diagnoses the issue, suggests the fix from the team's runbooks. It works beautifully. Right when it’s ready to take on more work, it runs into four key problems:

Because the agent borrows the identity of whoever runs it, it only works for colleagues who already have access to every system behind it. When someone senior runs it, the opposite problem appears: the agent inherits *all* of their access, far more than ticket triage ever needed. Finally, long-running agents are hampered by expiring access tokens that they borrow from users.

Meanwhile, every fix the agent suggested was posted under someone's name. The audit trail for its work shows that a human who never read the agent’s work performed all of it. Because the agent is borrowing a user’s identity, it’s *less* productive. 

Last month we announced [independent agents](https://www.glean.com/blog/introducing-independent-agents) - AI coworkers built for autonomous, multiplayer work. **One of their core components was agent identity.** Today we're opening **agent identity in public beta** for Glean customers: an agent can now act through its own service account credentials - its own bot in Slack, its own account in Jira, its own App in GitHub - registered and deliberately scoped by an admin. Set once, it's the same agent for everyone who runs it.

Here's what that changes.

## A name, a face, and its own presence across surfaces

The triage agent isn't invisible automation anymore - it shows up as itself everywhere it works. Message it directly in Slack or Teams the way you'd message a colleague, and the answer comes back from it, in that same conversation. Its Jira comments are authored by its own account. Its pull requests come from its own GitHub App - reviewable, and subject to branch protections like any other contributor. People collaborate with what they can see and name; now the agent is something you can see and name.

## Trusted with exactly what the job needs

This approach streamlines data source access, because who can *invoke* an agent is now decoupled from what the agent is *trusted to do*. The executive with elevated access can run agents without worrying they will accidentally share confidential information with the rest of the company. The customer success manager with no direct access to GCP logs can run a triage agent without needing their own access. Every user gets the same credential, set deliberately by an admin.

Actions are properly attributed, too. Every action lands in the audit trail under the agent's own account, with the person or schedule that triggered it recorded alongside. Automated work and human work stay distinguishable, streamlining compliance.

## Scheduled work that doesn't silently die

The overnight queue gets worked every night, because the agent runs on its own credentials, not on anyone's session. It categorizes tickets, comments with the right runbook, delivers its morning digest - through vacations, password resets, and role changes. No human token underneath, nothing to silently expire.

## Your agents have been doing the work. Now they can sign it.

The hard part of enterprise AI was never getting agents to act - it was extending trust in a way an organization could stand behind. With agent identity, agents act through their own scoped service credentials - visible in the audit trail, and governed by the people responsible for governing access: admins can rotate or revoke any credential, for one system or all of them, at any time.

The feature is now available in beta for our Glean customers. Please reach out to your admin to enable it.  
‍

![](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a57c0f877f6513af2306129_255db98e.png)

![](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a57c0f877f6513af230612c_cdc38191.png)

[

Back to all stories

](/blog)

[

Have questions or want a demo?

We’re here to help! Click the button below and we’ll be in touch.

Get a Demo



](/get-a-demo)

[Get The Resource](#)

[Get The Resource](#)

Work AI for all.

[Get a Demo](/get-a-demo)

![CTA Section Background Shape](https://cdn.prod.website-files.com/6127a84dfe068e153ef20572/63f71e682d171e4af28f393e_cta-section-bg-shape-2.avif)

## See Enterprise AI in action

[

Get a demo

Get a demo

](/get-a-demo)
