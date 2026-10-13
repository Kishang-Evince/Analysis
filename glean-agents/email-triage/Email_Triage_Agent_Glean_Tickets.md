# Email Triage Agent — Glean-Native Execution Tickets (80 h)

One Glean agent (workflow mode). All 27 features. Each ticket 6–8 h. Total 80 h.
Build work = Agent Builder steps, Outlook tools, prompts, triggers, test sets. No custom backend.

## Glean design decisions (applied to all tickets)

| Area | Decision | Glean basis |
|------|----------|-------------|
| Mode | Workflow mode, single agent | Deterministic branching; uses 1 of 10 background-agent slots per user |
| Mail access | Outlook tools (List messages, Get message, Create draft reply, Send email) inside Plan and Execute steps in Thinking mode, plus company search over the Outlook index | Tools documented only there; Fast mode has no connected-app actions. Index = Inbox + Sent, latest 5,000 msgs/user, about 30 min behind; no unread/folder/sent search operators |
| Calendar | Schedule trigger + Get calendar view (today, tomorrow); needs Calendars.Read application permission via the Outlook Calendar or Teams connector | Outlook Calendar "before event" trigger is experimental (latency up to a day); mail connector does not index calendar |
| Triggers | Input form trigger with schedule enabled (one schedule per user per agent). No content trigger | One trigger type per agent; scheduling is off by default and needs admin enablement |
| State | Stateless. Re-derive status from threads every run | Agent memory is per-run only |
| Lists / tone | VIP + topic lists as agent inputs (or reader doc). Tone = few-shot from recent Sent mail | No agent datastore found |
| Writes | Create draft reply / Send email set to "Run without user confirmation" (admin = Yes, step ticked, user consent) | Docs disagree on a blocked scheduled write: run fails, email notice, or Agent Inbox notice. Spike 1 in EMAIL-01 |
| Limits | Scheduled run about 30 min, tool-call cap, token cap | Batch retrieval, "No prior step outputs", pass data via `[[ ]]` |

## Ticket list

| Ticket | Title | Features | Hours | Depends On |
|--------|-------|----------|-------|------------|
| EMAIL-01 | Agent foundation, Outlook retrieval, threading + spikes | 5, 6, 11, 13, 17, 19, 20 | 8 | — |
| EMAIL-02 | Commitment tracking (derived status) | 1, 2, 3, 4 | 8 | 01 |
| EMAIL-03 | Ask detection | 7, 8 | 6.5 | 01 |
| EMAIL-04 | Reply quality and follow-up logic | 18, 21, 22 | 6.5 | 02 |
| EMAIL-05 | Action type, dates, meeting-relative deadlines | 9, 10, 12 | 7 | 01 |
| EMAIL-06 | Morning brief + EOD delivery | 14, 15 | 8 | 01, 02 |
| EMAIL-07 | Drafts, follow-ups, weekly review | 16, 23, 24 | 7 | 03, 04 |
| EMAIL-08 | Tone and voice (few-shot from Sent) | 25 | 8 | 07 |
| EMAIL-09 | VIP and topics lists | 26 | 8 | 06 |
| EMAIL-10 | Calendar fetch + thread matching | 27 (A) | 6.5 | 05 |
| EMAIL-11 | Meeting thread summaries + brief section | 27 (B) | 6.5 | 10 |
| | **Total** | **27** | **80** | |

---

## EMAIL-01 — Agent foundation, Outlook retrieval, threading + spikes (8 h)

Features 5, 6, 11, 13, 17, 19, 20.

**Build**
- Confirm Microsoft 365 connector + Outlook tools pack enabled; user OAuth connected.
- Create workflow-mode agent skeleton with run-date input.
- Retrieval steps: unread inbox, read inbox, sent. Lookback configurable (default 14 days), batched by date range.
- Group by conversation into one card per thread: original ask + latest update.
- Resolve relative dates to absolute using run date.
- Per-recipient reply tracking. Out-of-office and auto-reply classified by LLM step.

**Spikes (do first, 1 h)**
- Does Create draft reply run in a scheduled run without confirmation?
- Are conversationId / recipients / headers exposed by List/Get message?

**Done when:** thread with 3+ messages gives one card; OOO and receipts do not resolve a task; spike answers written down.

## EMAIL-02 — Commitment tracking, derived status (8 h)

Features 1, 2, 3, 4.

**Build:** LLM step extracting commitments from user's sent mail and sender mail. Status computed each run from thread: Open, Pending, Waiting, Completed. A bare acknowledgement does not close a task.
**Descope flag:** Snoozed and Delegated need stored state. Not delivered unless client funds a store (custom action or MCP).
**Done when:** sample threads give correct owner and status; run twice gives same result.

## EMAIL-03 — Ask detection (6.5 h)

Features 7, 8.

**Build:** structured-output prompt splitting one email into separate asks; semantic ask prompt ("Need your eyes", "Thoughts?"). Test set of 30 labelled emails.
**Done when:** multi-ask email yields separate asks; test-set recall meets threshold agreed with client.

## EMAIL-04 — Reply quality and follow-up logic (6.5 h)

Features 18, 21, 22.

**Build:** classify reply as substantive, acknowledgement, or noise. Follow-up recommendation from age, importance, deadline.
**Done when:** "Thanks" and "Received, I'll look" keep task open; overdue outbound items show "Follow up today".

## EMAIL-05 — Action type, dates, meeting-relative deadlines (7 h)

Features 9, 10, 12.

**Build:** action-type label (Reply, Review, Approve, Send, Decide, Complete, Attend). Due-date extraction ("EOD", "next Monday"). Meeting-relative phrases matched to Get calendar view results.
**Done when:** every card has action type; "before client call" resolves to the event time when one exists.

## EMAIL-06 — Morning brief + EOD delivery (8 h)

Features 14, 15.

**Build:** schedule trigger set in Agent Builder. Brief sections: Must Do Today, Waiting on Your Response, Waiting on Others, Review Quickly. Delivery by Outlook Send email (custom subject, from user) or "Send email from Glean" (fixed format). EOD variant. Check whether a second schedule is possible; if not, run EOD as a mode input.
**Done when:** scheduled run completes under 30 min and delivers the brief.

## EMAIL-07 — Drafts, follow-ups, weekly review (7 h)

Features 16, 23, 24.

**Build:** Create draft reply for inbound action items; draft follow-up for overdue outbound asks; weekly outstanding summary. Drafts saved to Outlook Drafts, never auto-sent.
**Done when:** drafts appear in Outlook without manual confirmation in a scheduled run.

## EMAIL-08 — Tone and voice, few-shot from Sent (8 h)

Feature 25.

**Build:** retrieve 10–15 recent Sent emails at draft time; style-extraction step (formality, length, greeting, closing, phrases); inject into draft prompts from EMAIL-07. Collect feedback with Agent Insights feedback.
**Descope flag:** no persisted, versioned profile and no rating-driven refinement without a store.
**Done when:** blind review of 10 drafts: client rates majority as "sounds like me".

## EMAIL-09 — VIP and topics lists (8 h)

Feature 26.

**Build:** two list inputs (VIPs with aliases, topics) per subscriber, or a reader doc. Match sender and keyword/semantic topic. Boost to top of board and brief with badge. Delete means remove from input. Spike: confirm per-user inputs persist across scheduled runs.
**Done when:** VIP email outranks non-VIP; removed VIP stops boosting.

## EMAIL-10 — Calendar fetch + thread matching (6.5 h)

Feature 27 part A.

**Build:** Get calendar view for today and tomorrow. Match threads by attendee overlap, subject keywords, date proximity via Outlook search. Confidence label on each link.
**Done when:** meeting with shared attendees shows linked threads; low-confidence links flagged.

## EMAIL-11 — Meeting thread summaries + brief section (6.5 h)

Feature 27 part B.

**Build:** 2–3 line status per linked thread; calendar section in brief; on/off input. Batch retrieval to stay inside tool-call and 30-min limits.
**Done when:** brief shows each meeting with thread summaries; toggle hides section.

---

## Risks to the 80 h

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Scheduled drafts blocked by confirmation | EMAIL-07 fails or sends a notice instead of a draft (docs disagree) | Spike in EMAIL-01; admin setting, step tick and user consent all needed |
| Scheduling off by default | No pilot user can activate the brief | Admin enables scheduled triggers for pilot users or groups before build day |
| Publish approval gate | Pilot delayed until a moderator approves | Agree approval path or Agent Creator role up front |
| User OAuth token expires silently in scheduled runs | Brief stops arriving | Monitor runs; Agent Identity service credential is the documented alternative (fixed tenant-wide scope) |
| Outlook tools only inside Plan and Execute (Thinking mode) | Slower steps, 30-minute limit | Separate read, draft and send steps; narrow lookback; spike 6 |
| Only one schedule per user per agent | End-of-day brief not scheduled | Copy of the agent with mode preset, or manual run |
| Per-run credits (about 7 median, about 114 at 90th percentile on Flex) | Cost grows with users | Usage limits per user and agent; avoid deep reasoning in background runs |
| Inbox prompt injection | Brief or draft hijacked | Narrow purpose statement, send only to the user, injection test in EMAIL-06 |
| No persistence | Snoozed/Delegated, stored tone profile, auto-applied rating loop out of scope | Optional phase 2: Glean custom tool (OpenAPI spec, single endpoint such as /execute, own backend or MCP) as a state store. Needs a backend, not in the 80 h; client decision |
| Alignment checks reject drafts or sends | EMAIL-06/07 writes blocked | Tight agent purpose statement; confirm in a test run |
| Governance and alignment details are marketing-level | Behaviour differs from the site | Verify in the tenant during spikes |
| Library templates are overviews only | Less reuse than hoped | Copy Delegation tracker and Intelligent reminders in EMAIL-01 and judge on the first run |

## Build practices added from the Glean site (all tickets)

- Start from the Agent Library template copies (Delegation tracker, Intelligent reminders); Ghostwriter and Daily meeting action summary are reference patterns.
- Use the Refine step: test outputs, adjust instructions, tune creativity settings (lower for classification, higher for drafts).
- Every ticket ends with a named saved version after a passing test run, with a rollback note.
- Pilot sharing only; use Agent Insights upvote/downvote as draft feedback.
| Single agent hits 30 min / tool-call cap | Brief truncated | Batch, narrow lookback, "No prior step outputs" |
| Headers not exposed | OOO and per-recipient less exact | LLM classification from content |
| Crawl dated 2026-09-01 | Docs may have changed | Re-verify in tenant during spikes |
