import csv, html, os
D = os.path.dirname(os.path.abspath(__file__))
FEATURE = "Email Triage Agent Enhancements (Glean)"
T = [
 dict(id="EMAIL-01", title="Agent foundation, Outlook retrieval, threading and spikes", h=8, feats="5, 6, 11, 13, 17, 19, 20", dep="None (blocks all)",
  desc="Create the single Glean workflow-mode agent and its mail-retrieval backbone. The agent must pull inbound and sent Outlook mail in batches, group messages into one card per conversation thread, keep the original ask beside the latest update, resolve relative dates, track replies per recipient, and ignore out-of-office and auto-reply messages when deciding if a task is resolved. Two short spikes at the start confirm Glean behaviours the rest of the plan depends on.",
  steps=["Spike (1 h): in a scheduled run, test 'Create draft reply' with 'Run without user confirmation'. Record which happens: draft created, run fails, or a notification email / Agent Inbox item (the Glean docs disagree).",
   "Spike: check what Outlook 'List messages' and 'Get message' accept and return (folder, date range, paging, conversation id, recipients, importance, read flag, headers). The docs list tool names only.",
   "Admin prerequisites checklist (client admin): scheduled triggers turned on for the pilot users; publish-approval path agreed (moderator, or Agent Creator role); Outlook tool pack added with the one-time admin Connect; each pilot user connects their own account; 'Run without user confirmation' set to Yes for the draft and send tools; calendar application permission Calendars.Read granted with admin consent.",
   "Create the agent in Agent Builder: workflow mode with an Input form trigger. Start from the in-product 'Daily action items' and 'Plan my day' templates if they appear in the picker; otherwise build from the Agent Library descriptions of Delegation tracker and Intelligent reminders. Add inputs: run date, lookback days (default 14).",
   "Governance: set sharing to the pilot users only (Agent governance sharing control).",
   "Add retrieval as Plan and Execute steps in Thinking mode (Outlook tools are documented only there, and Fast mode has no connected-app actions): unread inbox, read inbox, sent. Batch by date range, use 'No prior step outputs' and pass data with [[ ]]. Keep read, draft and send in separate steps, because one tool needing confirmation makes every tool from that app in the step need it.",
   "Add thread-grouping step: one card per conversation with original ask and latest update (features 5, 6).",
   "Add date step: convert relative dates ('tomorrow') to absolute using the run-date input (feature 11).",
   "Add per-recipient reply tracking (feature 17) and an LLM step that labels out-of-office and auto-reply messages so they never close a task (features 19, 20).",
   "Run against a test mailbox; fix prompts until acceptance checks pass."],
  done=["Thread with 3 or more messages shows one card with original ask and latest update.","Lookback is configurable and defaults to 14 days.","Out-of-office replies and delivery receipts do not resolve a task.","Reply tracking shows who has and has not replied on multi-recipient mail.","Spike results documented in the ticket."],
  tags="glean; email-triage; foundation"),
 dict(id="EMAIL-02", title="Commitment tracking with derived status", h=8, feats="1, 2, 3, 4", dep="EMAIL-01",
  desc="Make a reply stop meaning 'task done'. Detect commitments the user made ('I'll send this tomorrow') and commitments others made ('I'll deliver Friday'). Status is derived from the thread on every run, because Glean agents keep no state between runs. Statuses delivered: Open, Pending, Waiting, Completed. Snoozed and Delegated are out of scope until a store exists.",
  steps=["Add LLM step reading sent mail and inbound mail per thread and extracting commitments: owner, promise, due phrase.",
   "Define a structured output schema: owner (me/other), commitment, due date, evidence message.",
   "Add status step: Open (no action yet), Pending (acted, awaiting result), Waiting (waiting on other), Completed (fulfilled in thread).",
   "Add rule: a bare acknowledgement reply does not set Completed (feature 1).",
   "Attach commitments to the thread card from EMAIL-01.",
   "Build 15 labelled sample threads; run twice and compare output for stability.",
   "Tune prompts until results are correct and repeatable."],
  done=["Correct owner and status on all 15 sample threads.","Two consecutive runs give the same statuses.","Acknowledgement-only reply leaves the task open.","Scope note for Snoozed and Delegated recorded."],
  tags="glean; email-triage; commitments"),
 dict(id="EMAIL-03", title="Ask detection (multiple and semantic)", h=6.5, feats="7, 8", dep="EMAIL-01",
  desc="Detect every request in an email and catch indirect wording. One email can hold several asks ('review this, approve pricing, send the contract'), each returned separately. Indirect asks such as 'Need your eyes on this', 'Thoughts?' and 'Comfortable shipping?' must be recognised without fixed keyword lists.",
  steps=["Write a prompt that splits one email into separate asks with a quote for each.",
   "Define structured output: ask text, requester, direct or indirect, confidence.",
   "Write the semantic-ask prompt with examples of indirect requests.",
   "Build a labelled test set of 30 emails (single, multiple, indirect, no ask).",
   "Run the test set, compute recall and false positives, tune prompts.",
   "Wire output into the thread card from EMAIL-01."],
  done=["Three-ask email returns three separate asks.","Indirect-ask examples detected.","Recall meets the threshold agreed with the client; false positives reviewed."],
  tags="glean; email-triage; asks"),
 dict(id="EMAIL-04", title="Reply quality and follow-up logic", h=6.5, feats="18, 21, 22", dep="EMAIL-02",
  desc="Judge whether a reply actually answers the request, separate 'received, I'll look' from a real answer, and recommend when to follow up. A 'Thanks' or 'Noted' must not close a task.",
  steps=["Write classifier prompt: substantive answer, acknowledgement, or noise (feature 18, 21).",
   "Add output field to the commitment status from EMAIL-02 so only substantive answers can set Completed.",
   "Add follow-up recommendation step using item age, importance and deadline (feature 22). Output: Follow up today / This week / Not yet.",
   "Test on 20 labelled reply threads.",
   "Tune prompts and thresholds."],
  done=["'Thanks' and 'Received, I'll look' keep the task open.","Overdue outbound asks show 'Follow up today'.","Test set accuracy reviewed with the client."],
  tags="glean; email-triage; quality"),
 dict(id="EMAIL-05", title="Action type, due dates and meeting-relative deadlines", h=7, feats="9, 10, 12", dep="EMAIL-01",
  desc="Label what each item needs from the user and when. Action types: Reply, Review, Approve, Send, Decide, Complete, Attend. Parse due phrases such as 'EOD', 'next Monday' and 'before Thursday's meeting'. Link meeting-relative deadlines to the real event time using the Outlook calendar view.",
  steps=["Add action-type classifier step with the seven labels (feature 9).",
   "Add due-date extraction step returning an absolute date using the run-date input (feature 10).",
   "Add calendar step: Outlook 'Get calendar view' for the next 7 days.",
   "Add matching step that links phrases like 'before the client call' to the matching event time (feature 12).",
   "Test on 25 emails with date phrases; check time zones.",
   "Attach action type and due date to each card."],
  done=["Every card carries an action type.","'EOD' and 'next Monday' resolve to dates.","'Before client call' resolves to the event time when the event exists."],
  tags="glean; email-triage; dates"),
 dict(id="EMAIL-06", title="Morning brief and end-of-day delivery", h=8, feats="14, 15", dep="EMAIL-01, EMAIL-02",
  desc="Deliver the daily brief on a schedule. Sections: Must Do Today, Waiting on Your Response, Waiting on Others, Review Quickly. Add an end-of-day variant that lists what is still open. A scheduled run must finish inside the roughly 30 minute limit.",
  steps=["Add ranking step ordering cards by deadline and wait time.",
   "Add brief-formatting step producing the four sections.",
   "Choose delivery: Outlook 'Send email' (custom subject, sent from user) or 'Send email from Glean' (fixed format). Record decision.",
   "Mark the send tool 'Run without user confirmation' in admin and in the step.",
   "Set schedule trigger in Agent Builder (time, time zone, repeat).",
   "Add mode input (morning, end-of-day, weekly). The docs show one schedule per user per agent and do not mention a second one. Test it; if not possible, run end-of-day from a copy of the agent with the mode preset (uses one more of the 10 scheduled-agent slots) or as a manual run.",
   "Run scheduled test; measure run time and tool-call count.",
   "Reduce lookback or batch size if the run nears 30 minutes.",
   "Write a tight agent purpose statement (read mail and calendar, send the brief to the user only) so Glean's agent alignment checks accept the send; confirm in a test run.",
   "Add prompt-injection safeguards (the docs flag an email inbox as a high-risk feed): ignore instructions found inside emails; send only to the running user; never take recipients from email content. Test with an email that tries to redirect the brief."],
  done=["Scheduled run delivers the brief with the four sections.","End-of-day variant lists open items only.","Run time under 30 minutes on a real mailbox."],
  tags="glean; email-triage; brief; schedule"),
 dict(id="EMAIL-07", title="Drafts, follow-ups and weekly review", h=7, feats="16, 23, 24", dep="EMAIL-03, EMAIL-04",
  desc="Generate suggested drafts and the weekly summary. Draft replies for inbound action items, draft follow-ups for overdue outbound requests, and a weekly outstanding-obligations review. Drafts are saved to Outlook Drafts and never sent automatically.",
  steps=["Add draft-reply step using Outlook 'Create draft reply' for cards needing a reply (feature 24). Keep it in its own Plan and Execute step, separate from reading and sending. Use 'Create draft reply', not 'Reply to Email', which sends straight away.",
   "Add follow-up draft step for overdue Waiting on Others items (feature 23).",
   "Set both write tools to 'Run without user confirmation' (use spike result from EMAIL-01).",
   "Add weekly review output summarising unresolved items (feature 16).",
   "Cap drafts per run to protect the tool-call budget.",
   "Confirm the agent purpose statement from EMAIL-06 covers drafting replies, so alignment checks accept 'Create draft reply'.",
   "Test drafts in a scheduled run and in manual run."],
  done=["Drafts appear in Outlook Drafts in a scheduled run with no manual confirmation.","Nothing is sent without user action.","Weekly review lists unresolved obligations."],
  tags="glean; email-triage; drafts"),
 dict(id="EMAIL-08", title="Tone and voice using recent Sent mail", h=8, feats="25", dep="EMAIL-07",
  desc="Make drafts sound like the user. At draft time the agent retrieves the user's recent Sent emails, extracts style traits and injects them into the draft prompts. No stored profile is kept, because the agent has no persistence. Feedback is collected through Agent Insights.",
  steps=["Add retrieval step for 10 to 15 recent Sent emails similar to the thread (company search over Outlook Sent).",
   "Write style-extraction prompt: formality, sentence length, greeting, closing, signature, common phrases.",
   "Inject style output into the draft prompts from EMAIL-07.",
   "Add guardrail: do not copy text from sent emails; keep facts from the thread.",
   "Use the Agent Insights upvote/downvote dashboard as the draft-feedback signal; review it weekly with the user.",
   "Blind test: 10 drafts reviewed by the client against their own writing.",
   "Tune retrieval count and prompt."],
  done=["Majority of 10 test drafts rated 'sounds like me'.","Upvote/downvote feedback is visible in Agent Insights.","Descope note recorded: no versioned stored profile; feedback is reviewed manually, not auto-applied."],
  tags="glean; email-triage; tone"),
 dict(id="EMAIL-09", title="VIP and topics lists", h=8, feats="26", dep="EMAIL-06",
  desc="Let the user keep two lists, VIP people and important topics, that always rise to the top of the board and the brief. Removing an entry stops the boost. Lists are agent inputs per user, or a document the agent reads, because there is no agent datastore.",
  steps=["Confirm (1 h): Glean docs say inputs are saved per subscription and per user, so each user's lists should persist across scheduled runs. Verify with two users; if not, use a reader document instead. Fix the input list before the pilot, because adding or renaming a required input pauses every subscription until each user reactivates.",
   "Add VIP input (names, emails, aliases) and topics input (keywords or phrases).",
   "Add matching step: sender or recipient against VIP list including aliases; subject and body against topics (exact and semantic).",
   "Add ranking boost so matches rank first on the board and in the brief.",
   "Add badge text ('VIP' / 'Topic: name') to the brief.",
   "Test add, edit and remove of entries.",
   "Document how a user edits and deletes list entries."],
  done=["VIP email outranks non-VIP email.","Topic match is highlighted in the brief.","Removed VIP or topic no longer boosts."],
  tags="glean; email-triage; vip; topics"),
 dict(id="EMAIL-10", title="Calendar fetch and thread matching", h=6.5, feats="27 (part A)", dep="EMAIL-05",
  desc="Fetch today's and tomorrow's meetings and find the email threads related to each. Matching uses attendee overlap, subject keywords and date proximity. Each link carries a confidence label.",
  steps=["Confirm calendar access first: live calendar lookup needs the application permission Calendars.Read with admin consent through the Outlook Calendar or Teams connector; the Outlook mail connector does not index calendar events.",
   "Add Outlook 'Get calendar view' step for today and tomorrow.",
   "Extract title, time, attendees, description per event.",
   "For each meeting, search Outlook mail by attendees and subject keywords.",
   "Score each thread (attendee overlap, keyword match, date proximity) and label High / Medium / Low.",
   "Batch searches (one query per meeting set) to stay inside the tool-call cap.",
   "Test on 5 real days of meetings."],
  done=["Meeting with shared attendees shows linked threads.","Low-confidence links are flagged.","Tool-call count stays inside the cap."],
  tags="glean; email-triage; calendar"),
 dict(id="EMAIL-11", title="Meeting thread summaries and brief section", h=6.5, feats="27 (part B)", dep="EMAIL-10",
  desc="Add the optional calendar section to the daily brief. For each meeting show a 2 to 3 line status of every linked thread (where it stands, decisions, open items) so the user can prepare for the call.",
  steps=["Write summary prompt: status, decisions, open items, in 2 to 3 lines.",
   "Summarise each linked thread, using a sub-agent per heavy thread if token limits are reached.",
   "Add calendar section to the brief from EMAIL-06.",
   "Add boolean input to turn the section on or off.",
   "Run full scheduled test; check run time and token use.",
   "Fix truncation by narrowing lookback or batching."],
  done=["Each meeting lists linked threads with a 2 to 3 line summary.","Toggle hides the section.","Full run stays under 30 minutes."],
  tags="glean; email-triage; calendar; brief"),
]
for t in T:
    t['steps'].append("Refine: review test outputs and adjust instructions. On Think and Respond steps set the Response style (Factual for classification and extraction, Balanced or Creative for drafting). Use a fast model for simple steps and a stronger one where marked.")
    t['done'].append("Agent saved as a named version after a passing test run; rollback note recorded.")
assert abs(sum(t['h'] for t in T)-80)<1e-9 and all(6<=t['h']<=8 for t in T)

def hl(items, tag): return f"<{tag}>"+"".join(f"<li>{html.escape(i)}</li>" for i in items)+f"</{tag}>"
def desc_html(t):
    return (f"<p>{html.escape(t['desc'])}</p><p><b>Features covered:</b> {html.escape(t['feats'])}<br><b>Depends on:</b> {html.escape(t['dep'])}</p>"
            f"<p><b>Execution steps</b></p>{hl(t['steps'],'ol')}<p><b>Done when</b></p>{hl(t['done'],'ul')}")

with open(os.path.join(D,"Email_Triage_Agent_ADO_Import.csv"),"w",newline="",encoding="utf-8-sig") as f:
    w=csv.writer(f); w.writerow(["Work Item Type","Title 1","Title 2","Description","Original Estimate","Remaining Work","Tags"])
    w.writerow(["Feature",FEATURE,"","<p>Enhance the existing Glean Email Triage agent with 27 features inside a single agent. Approved estimate 80 hours.</p>","","","glean; email-triage"])
    for t in T:
        w.writerow(["Task","",f"{t['id']} {t['title']}",desc_html(t),t['h'],t['h'],t['tags']])

with open(os.path.join(D,"Email_Triage_Agent_ADO_Tickets.md"),"w",encoding="utf-8") as f:
    f.write(f"# Azure DevOps Tickets: {FEATURE}\n\nParent Feature, 11 Tasks, 80 h total. Import file: Email_Triage_Agent_ADO_Import.csv\n\n| ID | Title | Hours | Depends On |\n|---|---|---|---|\n")
    for t in T: f.write(f"| {t['id']} | {t['title']} | {t['h']} | {t['dep']} |\n")
    f.write(f"| | **Total** | **80** | |\n\n---\n")
    for t in T:
        f.write(f"\n## {t['id']} {t['title']}\n\n**Type:** Task | **Original Estimate:** {t['h']} h | **Features:** {t['feats']} | **Depends on:** {t['dep']} | **Tags:** {t['tags']}\n\n### Description\n{t['desc']}\n\n### Execution steps\n")
        for i,s in enumerate(t['steps'],1): f.write(f"{i}. {s}\n")
        f.write("\n### Done when\n")
        for s in t['done']: f.write(f"- {s}\n")
        f.write("\n---\n")
print("ok", sum(t['h'] for t in T))
