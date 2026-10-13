# Glean context for the Email Triage agent

Sources: local Glean crawl (fetched 2026-09-01) under `scrap/glean/`, plus live fetches of glean.com/ai-agents, /agent-library, /agent-builder, /agent-orchestration. Marketing pages give workflow shape, not configuration. Verify in the tenant.

## Building blocks
- **Modes:** workflow mode (fixed steps, same result each run) and auto mode (goal-driven). We use workflow mode.
- **Triggers:** chat message, input form, content change. Schedule rides on the input form trigger in workflow mode. One trigger type per agent (inferred).
- **Input fields:** Text, Document, Multiple choice. Reach a step only when tagged `[[name]]`.
- **Tools:** read (Outlook List/Get message, Get calendar view, company search) and write (Create draft reply, Send email, Send email from Glean). Skills are described for auto mode only. Sub-agents run with separate memory.
- **Models:** agent-level default, per-step override, Fast vs Thinking reasoning mode. "Creativity" is the Response style (Factual, Balanced, Creative) on Think and Respond steps, not a temperature. Plan and Execute has Basic, Fast and Thinking modes; Fast has no connected-app or MCP actions.
- **Lifecycle:** drafts, automatic versions, test run, rollback.

## Limits and constraints found
- Scheduled run about 30 minutes; tool-call cap; response-size cap; max 10 scheduled agents per user.
- Scheduled writes need admin "Run without user confirmation"; tools that predict inputs with an LLM always ask.
- Outlook index: Inbox + Sent, latest 5,000 messages per user; federated real-time access for the rest.
- Agent memory is per run (about 2 h chat memory). No agent datastore found.
- Outlook Calendar "before event" trigger is experimental (latency up to a day).

## Library templates worth reusing
- **Delegation tracker:** Waiting on Others (date sent, waiting on, days unanswered).
- **Intelligent reminders:** open action items with confidence grouping.
- **Ghostwriter:** retrieve writing samples at draft time (our tone approach).
- **Daily meeting action summary:** scheduled run, loop with a sub-agent per meeting (schedule and loop marked beta).

## Governance and operations
- Sharing scope set by admins and builders; permissions checked on every request; alignment checks compare each action to the agent's stated purpose.
- Agent Insights dashboards: adoption, errors, upvotes/downvotes.
- Orchestration: users turn on eligible agents and set their own run times.

## Persistence option (outside the 80 h)
A Glean custom tool (OpenAPI spec, single endpoint such as `/execute`) can call our own backend, giving stored state for Snoozed/Delegated, tone profile and feedback. Needs a backend and admin enablement.

## From the full docs folder (Glean/docs/docs.glean.com, fetched 2026-10-13)
- **Scheduling:** off by default; admin enables for everyone or named users/groups. Workflow mode needs an Input form trigger plus "Allow agent to run on a schedule", then each user clicks Set schedule. Inputs are saved per subscription and user. Adding or renaming a required input pauses every subscription. One schedule per user per agent is implied. "Wait for user input" cannot be scheduled. Subscribers are kept when an owner switches a scheduled agent to manual (2026-09-22).
- **Scheduled write steps needing confirmation:** the docs disagree. Fail (execution-limits, troubleshooting), email notification instead of silent skip (schedule-triggers), Agent Inbox notice (human-in-the-loop page, no setup page). Draft tools are not named as confirm-required.
- **Outlook tools:** names only, no parameter docs. Mail: List messages, Get message, Create draft, Create draft reply, Reply to Email (sends directly), Send email, Forward. Calendar: List events, Get event, Get calendar view, Get calendar schedule, List calendars, create/update/cancel/delete event. Documented only inside Plan and Execute steps (one page says Select Step, Tools, By connector). User OAuth; admin one-time Connect; single-tenant app for new custom setups. Tokens can expire silently in scheduled runs.
- **Service credentials / Agent Identity (GA 2026-10-01):** client-credentials Entra app, tenant-wide or limited by Exchange RBAC; same credential for every user; Outlook writes still need user approval. Independent agents lack schedule config.
- **Publishing:** User roles, Default member permission, "Publishing an agent requires approval" (Never, entire company, specific people). Moderator verifies inputs, tools, triggers. Agent Creator role bypasses.
- **Mail index:** Inbox, Sent, other configured folders; not Junk or Deleted; 5,000 most recent messages per user; incremental refresh 30 minutes; threads over 1,000 messages truncated; conversation ids indexed; unread/flag/importance not found. Search has `from:`, `app:`, `after:`, `before:`, no unread/folder/sent operators.
- **Calendar:** separate Outlook Calendar connector (or Teams); organizer copies only, previous 90 days and next 7 days; live lookup needs application permission Calendars.Read.
- **Limits:** about 30 minutes per scheduled run; 10 active scheduled agents per user (soft); Company Search 500 results per step; Read Document 100 files per step; 30 versions kept; tool-call cap and response-size cap not published.
- **Cost:** Flex bills each run in FlexCredits (about 7 median, about 114 at 90th percentile); Core Suite bills model use per token via Model Hub. Usage limits per user, team, agent.
- **State:** none across runs; custom tool needs a hosted backend, one endpoint, flat parameters; docs conflict on running custom tools unconfirmed.
- **Security:** inbox is called a high-risk prompt-injection feed; avoid dynamic recipients. Alignment check for background writes since 2026-05-06.
- **Testing:** Preview, Debug (not on Azure-hosted Glean), re-run from step (about 2 hours, Preview only), content-trigger sample button needs a saved, error-free agent.

## Not verified
Outlook tool parameters and headers, whether draft tools need confirmation in scheduled runs, whether one agent can hold two schedules, how alignment checks treat draft/send steps, whether Outlook tools work outside Plan and Execute, the tool-call cap, the "Inside Glean Agents" whitepaper (not read). Three agents skimmed some files by grep (content-trigger, publish-slack, templates).
