# Glean context for the agent

Sources: local Glean crawl (fetched 2026-09-01) under `scrap/glean/`, plus live fetches of glean.com/ai-agents, /agent-library, /agent-builder, /agent-orchestration. Marketing pages give workflow shape, not configuration. Verify in the tenant.

## Building blocks
- **Modes:** Auto mode (goal-driven), which we use (see "Auto mode: how we build it").
- **Triggers:** chat message, schedule, content change. One trigger type per agent (inferred). In Auto mode we set the schedule on the Triggers tab.
- **Tools:** read (Outlook List/Get email message, Get calendar view, company search) and write (Create a draft reply, Send email, Send email from Glean). Skills are described for auto mode only. Sub-agents run with separate memory.
- **Models:** agent-level default; Fast vs Thinking reasoning mode. We use Thinking on the Model tab.
- **Lifecycle:** drafts, automatic versions, test run, rollback.

## Auto mode: how we build it
- **Instructions as steps:** one instruction document. Step 1 to Step 9 keep their numbers; each enhancement adds or edits a named step (Step 1B, 3C, 8E, then Step 10). A RUN ORDER section gives the order. Steps are instructions, not a fixed graph: confirm in Debug that each ran in order.
- **SETTINGS block:** at the top of the instructions (AS_OF_DATE, LOOKBACK_DAYS, READ_DAYS, MODE, INCLUDE_CALENDAR). Settings are shared by all users. A chat message ("as of 2026-10-14", "LOOKBACK_DAYS 7") overrides a value for one run, but only in Preview and manual chat runs: a scheduled run has no chat message and uses SETTINGS as saved. Test the scheduled path with Run now from the Active agents table; results appear under Chats, Automations.
- **Tools at every step:** in Auto mode Outlook tools are available at every step. Only the tools attached to the agent are available. The Tools tab lists each tool of the pack as a removable chip (all 29 are attached when the pack is added), so we keep List messages first, then add Get email message, Get calendar view, Send email and Create a draft reply at their stages. The box "Allow agent to use write tools without approval" is per agent and covers every write tool left on it, so Reply to email, Forward message, Delete message and the rest are removed before it is ticked (seen in the user's screenshots, 2026-10-14). If Send email stays blocked, "Send email from Glean" is the fallback.
- **Task tool:** sub-agents via dynamic delegation (on by default). Used when more than 5 threads need reading (Step 3B) and for one sub-task per meeting (Step 8F). Behaviour in scheduled runs and its limits are not documented: test it.
- **Caps:** a scheduled run is cut off at about 30 minutes with no clear error, so the prompts cap full-message reads at 15 and meetings at 5. Record duration after Prompt 2 and Prompt 10 with a scheduled test; if over about 20 minutes, lower the caps or move meeting prep to a second scheduled agent.
- **Saving:** in Auto mode Save publishes live. Create a Saved version (checkpoint) before every Builder Assistant edit; check the Instructions tab and the publish-modal diff; publish only after Preview tests pass; if Builder Assistant changes more than asked, restore the checkpoint and edit the Instructions tab by hand.
- **Schedule:** configured in the builder on the Triggers tab (weekdays 3:45 pm, later 8:00 am). Weekday recurrence in the schedule picker is not documented: verify, else daily. The agent also runs from chat.
- **Per-user lists:** VIP and topics live in a user-owned document "Agent VIP and Topics" (lines "VIP: ..." and "TOPIC: ..."), found with the query "Agent VIP and Topics" from:me (latest updated wins). Search finds a new document only after the next crawl. Not SETTINGS values.

## Limits and constraints found
- Scheduled run cut off at about 30 minutes, no clear error; tool-call cap; response-size cap; max 10 scheduled agents per user.
- Scheduled writes need the per-agent box "Allow agent to use write tools without approval" (Tools tab); whether a scheduled run honours it is unverified; tools that predict inputs with an LLM always ask.
- Outlook index: Inbox + Sent, latest 5,000 messages per user; federated real-time access for the rest.
- Agent memory is per run (about 2 h chat memory). No agent datastore found.
- Outlook Calendar "before event" trigger is experimental (latency up to a day).

## Library agents worth using as reference patterns (not a start template)
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
- **Scheduling:** off by default; admin enables for everyone or named users/groups. One schedule per user per agent is implied. Subscribers are kept when an owner switches a scheduled agent to manual (2026-09-22). The Triggers tab offers a weekday recurrence ("Every weekday (Monday to Friday)") and, in Auto mode, Input fields with default values (referenced as [[name]]) that a schedule uses and Preview can override; we use the SETTINGS block for now (open decision).
- **Scheduled write steps needing confirmation:** the docs disagree. Fail (execution-limits, troubleshooting), email notification instead of silent skip (schedule-triggers), Agent Inbox notice (human-in-the-loop page, no setup page). Draft tools are not named as confirm-required.
- **Outlook tools (the tenant's own list, pasted by the user 2026-10-14):** 29 tools. Read (11, Always allow): Download outlook attachment, Get calendar event, Get calendar schedule, Get calendar view, Get email message, Get outlook profile, Get supported time zones, List events, List messages, List outlook attachments, List outlook calendars. Write (18, Needs approval): Add event attachment, Add mail attachment, Cancel user calendar event, Create a draft reply, Create calendar event, Create contact, Create email draft, Create email rule, Create user message attachment, Delete calendar event, Delete message, Forward message, Move message to folder, Reply to email, Send email, Update calendar event, Update contact, Update email message. From the tool descriptions: List messages takes offset and opaque continuation tokens, `search`, a raw OData `filter` and `folder` = allfolders; Get email message takes `select`, for example `internetMessageHeaders` to spot automated mail; Create email draft makes a standalone draft for a new conversation, Create a draft reply replies to an existing message. Approval is per agent (see Tools at every step). User OAuth; admin one-time Connect; single-tenant app for new custom setups. Tokens can expire silently in scheduled runs.
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
Outlook tool parameters and headers, whether draft tools need confirmation in scheduled runs, whether one agent can hold two schedules, whether the schedule picker offers a weekday recurrence, whether the Task tool delegates in scheduled runs, how alignment checks treat draft/send steps, whether Auto mode exposes the Outlook tools at every step as assumed, whether the query "Agent VIP and Topics" from:me finds the per-user VIP document in scheduled runs, whether Auto mode keeps to the numbered steps, the tool-call cap, the "Inside Glean Agents" whitepaper (not read). Three agents skimmed some files by grep (content-trigger, publish-slack, templates).
