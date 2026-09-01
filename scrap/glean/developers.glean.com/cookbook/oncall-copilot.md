---
url: "https://developers.glean.com/cookbook/oncall-copilot"
canonical: "https://developers.glean.com/cookbook/oncall-copilot"
title: "On-call Copilot"
description: "An on-call dashboard that takes an alarm to a proposed action and puts a person in front of that action. It names a cause only when a past incident backs it, turns away an approver who is neither on call nor the service owner, and escalates instead of approving itself when nobody answers. It runs on recorded incidents, so you can watch it refuse things before connecting it to anything."
fetched_at: "2026-09-01T13:23:00.224Z"
---
# On-call Copilot

An on-call dashboard that takes an alarm to a proposed action and puts a person in front of that action. It names a cause only when a past incident backs it, turns away an approver who is neither on call nor the service owner, and escalates instead of approving itself when nobody answers. It runs on recorded incidents, so you can watch it refuse things before connecting it to anything.

~1.5 hrAdvanced

![On-call Copilot triaging an alert with evidence and an approval gate](/img/cookbook/previews/oncall-copilot/preview.webp)View preview

localhost:3000

![On-call Copilot triaging an alert with evidence and an approval gate](/img/cookbook/previews/oncall-copilot/preview.webp)

Evidence-ranked triage with a human approval gate before action.

Problem

An alarm fires at 3am. The runbook, the review of the last time this happened, who owns the service, and what it depends on all exist in Glean already. They just sit in different systems, and you search them one at a time while the graphs get worse.

The retrieval is the easy part. What makes a copilot safe to point at a production service is what it refuses to do, so that is what you build here. The gate turns away anyone who is neither on call nor the service owner. A proposal nobody approves in time escalates instead of quietly approving itself. An action the planner invented never reaches a human. The audit log records approvals, refusals, executions, failures, rejections, and escalations.

Know the edges before you point it anywhere real. Live Search, Chat, and optional Agents calls hit your instance. The bundled alarm buttons always fire payments-service. Catalog and evidence lookups expect the sample URL layout under /services/, /runbooks/, and /incidents/. The three registered actions are simulated in-process, and the acting user is asserted rather than authenticated.

Architecture

PagerDuty webhookfilters by severity and watched service

Service registryreads owner, on-call, and escalation from the catalog

Gleanpermission-aware Search, Chat, and optional Agents

Evidence checkpast incidents support cause, runbooks support procedure

Approval gatewho may approve, expiry, escalation, and audit

Governed actionsonly pre-registered action ids may run

Prerequisites

Node 20 or newer

Nothing else. The walkthrough replays recorded Glean responses, so it needs no credentials and makes no network calls

Only if you later point it at your own instance: an indexed service catalog, runbooks, and incident reviews, plus a work email for sign-in or a Glean API token with the SEARCH and CHAT scopes. The agent planner also needs the AGENTS scope and a conversational agent ID. Plan on editing the catalog query and parser first, since they read the sample corpus's layout

Steps

1

**Copy the project onto your machine**

Creates an oncall-copilot folder in whatever directory you are in, holding the server, the dashboard, and the recorded incidents. Stay in that same directory for the rest of the steps, since each command changes into the folder itself.

```
npx -y tiged@2.12.8 --mode=git gleanwork/glean-cookbook/recipes/oncall-copilot oncall-copilot
```

2

**Install dependencies**

Installs the few packages the TypeScript server needs. Everything runs on your machine, and nothing is deployed anywhere.

```
cd oncall-copilot && npm install
```

3

**See what it refuses before connecting anything**

Runs the unit tests, then replays the recorded incidents through the whole flow and checks the refusals: the gate turns away an actor who is neither on call nor the service owner, an unapproved proposal escalates without executing, an action the planner invented is refused, and a code-changing action with no supported cause drops to filing a ticket. The audit log records each of those decisions. The command reads no credentials and makes no network calls.

```
npm run verify:fixture
```

4

**Open the dashboard**

Starts the local server and prints a Local URL. Open that URL in a browser. The dashboard replays the same recorded Glean responses, so there is nothing to sign in to.

```
npm start
```

5

**Fire the alarms and test the gate**

The trigger row has one button per alarm. PAY-2231 gets a probable cause and the past incident it rests on. PAY-2232 gets no cause, because no past incident matches it, and its proposed fix drops to filing a ticket. PAY-2233 has the agent name an action that is not in the registry, so it is refused before any approval card appears. For a refused approval, select PAY-2231 or PAY-2232 in the queue, switch Acting as to the person who is neither on call nor the owner, and approve anyway: the request comes back 403 and the audit log records it. To watch a proposal hand off without executing, force the approval on that same incident to expire.

Relevance is not evidence

Only a matching past incident may support a causal claim. Runbooks support procedures, not causes.

Authorization is not authentication

Live and fixture both restrict who may approve, but they trust the asserted actor (INCIDENT\_ACTOR or, in demo mode, X-Incident-Actor). A deployment must authenticate the actor and decide which credential executes actions. This recipe reports impersonation: false.

Take it further

-   Persist incidents and the audit log. An audit log you can lose by restarting a process is not an audit log.
-   Add the rest of the dashboard: response-time rollups, an expiring-soon lane, and an end-of-shift handoff summary.
-   Replace the simulated actions with real governed tools, keeping the registry boundary and the approval log exactly where they are.
-   Write the postmortem draft back into your knowledge base. The next incident then retrieves it as precedent, and the evidence rules get better over time.

Try it

**Fire the sample canary alarm**

Fire the canary alarm, PAY-2231. The incident joins the on-call queue, and the triage card names the service, its tier, the engineer on call, and the owner, all read from the recorded catalog. Probable cause appears with a supported badge and links to the past incident review it came from. In the evidence table that review is tagged precedent and the deploy runbook is tagged procedure. The approval gate offers Draft fix PR, and #eng-oncall shows the acknowledgement and the request for approval.

**Triage an alert with no matching past incident**

Fire the no-precedent alarm, PAY-2232. The triage card says no probable cause was asserted, because no past incident matches this alarm signature, and no Probable cause section appears. The deploy runbook still ranks highest in the evidence table, tagged procedure. The proposed action drops from Draft fix PR to File tracking ticket, and both #eng-oncall and the audit log record that downgrade and why.

**Approve the proposed action as the outsider**

Fire an alarm, switch Acting as to the person who is neither on call nor the owner, then click Approve & execute. The approval card warns before you click that this person is not on call and does not own the service, and names who may approve. The request comes back 403, the audit log gains a refused row against that actor, and the incident stays at awaiting-approval.

**Let the approval window expire**

With an incident awaiting approval, force the approval to expire. The status changes to escalated, the approve and reject buttons are disabled, and no action runs. #eng-oncall gets a message naming the escalation target from the recorded catalog and saying the action was not executed. The audit log records the same handoff.

**Have the Glean agent propose an action that is not registered**

Fire the off-script agent alarm, PAY-2233. The recorded agent proposes rollback-production-now, which is not in the action registry. Where the approval card would be, the dashboard says no action was offered and explains that the planner named an unregistered action. There are no approve or reject buttons, and the audit log records the refusal with glean-agent as the actor.

Run this recipe

-   Choose your tool
    
    Claude CodeCodexCodex Cursor
    
    Install the pluginTerminalIn Claude Code
    
    1
    
    ```
    claude plugin marketplace add gleanwork/glean-cookbook
    ```
    
    2
    
    ```
    claude plugin install cookbook@glean-cookbook
    ```
    
    Run the recipe
    
    ```
    /cookbook:oncall-copilot
    ```
    
    Run /reload-plugins to pick it up without restarting.
    

[View source](https://github.com/gleanwork/glean-cookbook/tree/main/recipes/oncall-copilot)

Runs the recipe through the Glean cookbook plugin.

At a glance

CapabilitiesSearch, Chat, Agents, Tools, Workflows

SurfacesPlatform API, Agents, Tools

StatusShowcase

Time~1.5 hr

Required scopes

SEARCHCHATAGENTS
