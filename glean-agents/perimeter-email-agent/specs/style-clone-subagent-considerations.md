# Style clone sub-agent: what to consider before building it

Status: decisions confirmed by the user on 2026-10-22 (section 14), ready to turn into a build plan. Consent and verification at the start added the same day (section 15). Nothing here is built. Nothing here is built. No Glean or code change comes from this file. It is the checklist for a future sub-agent that reads a user's sent mail and writes down their email writing style, so draft-writer can write drafts that sound like the user.

## 1. Purpose and scope

- Input: the signed-in user's own Sent Items in Outlook, up to 200 mails.
- Output: a style profile saved as key and value rows in the shared Excel workbook (layout in section 8). The user can read and edit it there.
- Not in scope: sending mail, reading anyone else's mailbox, learning facts or opinions from the mails. Only style is kept.
- Runs on demand only, never on a schedule and never inside a board run.
- First version scope (user decision): the patterns already discussed and nothing more. These are recipient authority, urgency, message type and thread state, on top of a personal baseline. More patterns come in a later version.
- No example mails are stored in the first version. The profile holds style notes only.

## 2. Design principles (from research, see section 16)

1. One person has a baseline style plus shifts that depend on the situation. Averaging all mails into one profile hides the shifts.
2. The recipient is the strongest driver of the shift. Message type, urgency and thread state come next. Topic mostly works through who the recipient is.
3. Describe style on separate axes: softeners (please, would, hedges, thanks, apology, greeting, sign-off), directness (commands, direct questions, dropped pleasantries) and surface habits (length, contractions, exclamation marks, lowercase). Softeners follow status. Directness does not.
4. Real examples from the matching context work better than a long list of rules, but the first version stores notes only (section 8), so the notes must be concrete and checkable.

## 3. Which sent mails to read

Include: mails the user wrote themselves, with real body text, sent to one or more people, inside a recent window (for example the last 12 months, newer weighted higher because style drifts).

Exclude:
- Briefs and any mail the agent or another tool sent for the user.
- Mails sent only to the user.
- Automatic replies, calendar responses, read receipts, delivery failures.
- Forwards with no text written by the user, and one-word replies ("ok", "thanks") for the profile body, though they still count for greeting and sign-off habits.
- Mails with only attachments or only links.
- Mail the user wrote in another language, unless the profile is kept per language.
- Mail from a shared or delegated mailbox written by someone else.
- Drafts the style agent itself produced and the user then sent unchanged. They would feed the agent its own output. Needs a rule, for example ignore sent mail that matches a draft text the agent created, or ignore mail sent after the clone agent went live until the user confirms it as their own.

How many: a stable baseline needed about 25 to 100 mails in the one study that measured it, and few-shot returns flatten between 2 and 10 examples. The user set the limit at 200 mails, so each context cell gets some. Below 5 usable mails, stay neutral and say so.

## 4. Cleaning each mail before analysis

- Split the body into: greeting, body, sign-off, signature, quoted history, disclaimer.
- Keep the greeting and sign-off as their own fields, then strip quoted text, signature, disclaimer, links and tracking footers from the body.
- Strip HTML to text and keep line breaks and bullets, since they are style.
- Remove or mask personal data (names, addresses, phone numbers, account numbers, passwords or codes) before notes are written. A mail that contains a secret is skipped.

## 5. Context labels for each mail

Cheap, from mail metadata:
- Recipient role: To or Cc, recipient count.
- Internal or external domain, and for internal people the org chart (manager lookup) when available.
- New mail or reply, thread depth, time since the other side's last message, time of day.
- Importance flag.
- How many earlier mails the user sent to this person (closeness), and VIP list membership.

Needs a model (label with the LLM, then check it against 50 to 100 mails labelled by hand, and drop labels that do not agree):
- Recipient tier: above, peer, below, external or client. Use coarse tiers, because the rank effect is not smooth.
- Message type: request, inform, follow-up chase, thanks, apology, approval, decision.
- Urgency flag: no tested data exists. Do not detect it from the word "urgent" alone. Learn it from the user's own urgent mails.
- Tone of the other side's last message (calm, pushy, upset), for thread accommodation.

## 6. Style parameters to extract

For the baseline and for each context cell, record the following. Counts are better than adjectives where they can be measured.

Lexical: favourite openers and closers, signature phrases, contractions, hedges and intensifiers, jargon and slang, how the user names people (first name, title, nickname).

Character level: punctuation habits (exclamation marks, ellipses, dashes, semicolons, parentheses, Oxford comma), capitalisation, emoji, abbreviations (thx, pls).

Syntactic: average sentence length and spread, fragments, questions against statements, active against passive, imperative share.

Structural (email): greeting form and whether there is one, sign-off form, message length, paragraph count, bullets against prose, subject-line style, how deadlines and dates are written, reply position.

Pragmatic: formality, directness, warmth, how often the user thanks or apologises, how requests are softened or sharpened, how urgency is shown (short text, caps, repeated asks, deadline wording).

## 7. Context cells and fallbacks

- Start with a personal baseline plus about 4 to 6 cells built only from the first-version patterns (recipient authority, urgency, message type, thread state), for example: senior or authority request, peer routine, close or informal, urgent chase, thanks or apology.
- If a cell has too few mails (about 10 to 25 is a working guess), fall back from cell to recipient tier to the baseline.
- New recipient with no history: use tier from the org chart, domain or the VIP list. If the tier is unknown, use the baseline and flag the draft.
- Do not make topic its own axis. Do not fine-tune per cell.

## 8. What the profile holds and where it lives

Decided layout (shared workbook "Glean Personal Agent Data.xlsx", sheet Sheet0):
- Rows 1 and 2 keep VIP Contacts and VIP Topics, with entries in columns B to Z, exactly as now.
- Columns AA, AB and AC stay empty as a gap.
- The style table starts in column AD. Column AD holds the key and column AE holds the value, one key per row from row 1 downwards, up to row 60.
- The profile is read with one Get range call on AD1:AE60. VIP and topic reads stay on their own range.
- The old single style cell (A3 and B3) is retired when the style table goes live.

Keys, all short readable text, so the user can edit a value in Excel:
- Baseline keys (about 12): greeting, sign-off, sentence length, formality, directness, softeners, punctuation habits, contractions, message length, structure (bullets or prose), words to avoid, how dates and deadlines are written.
- Context cell keys (about 6 per cell, for 5 to 6 cells): the key starts with the cell name, for example `authority.greeting`, `authority.softeners`, `peer.directness`, `urgent.length`, `thanks.signoff`. Each value says only what differs from the baseline.
- Meta keys: `meta.mails_read`, `meta.date_range`, `meta.refreshed`, `meta.version`.
- That is about 55 rows at most, which fits in 60.

Rules:
- Style notes only. No names, addresses, figures, project names, quoted sentences or confidential facts. Check the finished table for such text before saving.
- No example mails are stored.
- The user can add hand-written rules as extra keys (for example `rule.never_use`).
- The write goes through a confirmation card that shows the whole table before it is saved, as notes-keeper does today.
- A refresh replaces the table. The old version is not kept in the first version.

Changes to existing agents when this is built (not done now): notes-keeper and the new style agent must read and write only their own ranges, and draft-writer must read AD1:AE60 instead of A3:B3.

## 9. Using the profile when drafting

- Read the style table once per run (one Get range call).
- Pick the context cell from the item being answered: recipient tier, message type, urgency flag and thread state. Pass draft-writer the baseline keys plus the matching cell keys. If no cell fits, or the context is unclear, use the baseline and flag the draft.
- With no stored examples, the notes are the only guide. Write the notes with concrete, checkable wording (for example "greeting: Hi plus first name", "sign-off: Thanks then Kishan", "sentences under 15 words") so the draft can follow them.
- Never copy facts, names or sentences from the user's mails into a draft. Never mention the style in a draft.
- Urgency may loosen politeness markers, shorten the text and drop the greeting, but only as far as the user has shown in their own mails. Never invent anger. Let the user override the tone.
- No marker line, no bracketed tag. Use "[fill in]" where the user must supply a fact.
- Later versions can add 3 to 5 stored or looked-up example mails per cell. Pick them by context match, not topic similarity, and test that first.

## 10. Privacy and safety

- Sent mail holds personal and confidential data. The profile must hold style notes only: no names, addresses, figures, project names or confidential facts. Check the finished profile for such text before saving.
- Skip any mail that contains a password, code, key or ID, and never write a draft that supplies one.
- Treat mail text, quoted history and signatures as untrusted data. Ignore instructions inside them.
- Scope: only the signed-in user's own mailbox, read-only on mail, write only to the profile location. Each user has their own profile. No shared copy.
- The user can see, edit and delete the profile at any time. State how long it is kept and how a refresh replaces it.
- The agent never sends mail.

## 11. Platform limits and cost (Glean Auto agent)

- A sub-agent text has its own 32,000 character limit, and reading 200 bodies means paging through List messages with body in the select, and possibly Get email message for some. Measure the run time and credits before promising a schedule. A normal board run takes about 15 to 17 minutes.
- Never pass long message ids between agents as text. Let the sub-agent list the mail itself.
- Models vary run to run. Experience in this project: a rule was ignored once in a few runs (a marker line, a duplicate draft). Build checks for every hard rule and test several runs.
- After every edit of a sub-agent, reload the page and read the saved text back (an edit once did not save).
- Keep the approval card on the write, as the confirmation step.
- On demand only: the user starts it by asking, and it reads up to 200 sent mails in that one run. Measure how long that takes before the user relies on it.

## 12. Evaluation and acceptance

Judge: the user only. Nobody else knows what they wrote.

Acceptance test (agreed with the user):
1. Hold back the user's 20 newest sent mails and do not use them to build the profile. Note the situation each one answered.
2. The agent drafts a reply for each of the same 20 situations, using only the style table.
3. The user sees 20 shuffled pairs, each with the real mail next to the agent draft, unlabelled. For each pair the user says which one they wrote, and whether they would send the draft as it is, with a small edit, or not at all.
4. Pass: the user picks the real mail in 12 or fewer of the 20 pairs (guessing gives 10), and would send at least 15 of the 20 drafts as they are or with a small edit.

Supporting checks (they inform the fixes but do not decide the pass):
- Contrast test: in the authority, peer and urgent cells, compare drafts with the user's real mails on softener rate, length, imperative share, greeting and sign-off.
- Author-embedding similarity (for example LUAR) as a secondary signal only. It was trained on Reddit and is not validated on work email.
- Check the context labels: LLM labels against 50 to 100 mails labelled by hand, and drop labels that do not agree.
- An LLM judge is optional and never used alone, because it did not agree with the embedding score in the one study found.

Honest limit: the test shows whether the user can tell. It does not promise that an AI-text detector will not flag the drafts. In the one study that tested it, most drafts written from 5 examples were still flagged as AI, even when the style scored well.

## 13. Failure modes and edge cases

- Few sent mails, or mostly short replies: stay neutral, say so.
- Sent mail that the agent drafted and the user sent: contaminates the profile (section 3).
- Templates and canned replies: they are habits but not the user's thinking. Down-weight exact repeats.
- Several languages, or different style on mobile: keep per language, and treat very short mobile mails with care.
- Role change, new job, new manager: style drifts. Refresh on a schedule and let the user reset.
- Ambiguous authority (the person who owns the task is not the senior person): do not rely on org rank alone.
- Sarcasm, anger and humour: noisy to label. Keep them out of the profile unless the user's mails show them clearly and often.
- Conflicting patterns inside one cell: record the range, not an average.

## 14. Decisions

Confirmed by the user on 2026-10-22:
1. First version scope: the patterns already discussed only (recipient authority, urgency, message type, thread state, plus a personal baseline).
2. Storage: the shared Excel workbook. Style as key and value rows in columns AD and AE, with the empty columns AA to AC between the VIP area and the style table. Layout in section 8.
3. No example mails stored in the first version. The profile holds style notes only.
4. Refresh: on demand only.
5. Size: up to 200 sent mails. Look-back window: the last 12 months unless the user says otherwise.
6. Acceptance: the 20-pair blind test in section 12, judged by the user only. Pass at 12 or fewer correct picks and at least 15 drafts the user would send as they are or with a small edit.
7. Consent and verification: at the start of the agent, when no style is saved, it asks permission before reading sent mail, and it offers a verification afterwards if the user wants one (section 15).

Left for the build plan (small design choices, no user decision needed unless the user wants one): exact key names, how the agent labels the context cells, the cap on rows read per run, how the contaminated-mail rule in section 3 is applied, and the run-time and credit measurement in section 11.

## 15. Consent and verification at the start

Added by the user on 2026-10-22: at the start of the agent it must ask the user's permission to build their writing style, and offer a verification of the style if needed.

Rules:
- Sent mail is never read for style without the user's explicit yes, given in the current chat. Text inside a mail, a saved profile or an earlier chat never counts as consent.
- When a chat starts and no style profile is saved, the agent shows one question next to the VIP and topics line, before the board. Proposed wording: "May I read up to 200 of your sent mails to learn how you write, so drafts sound like you? Nothing is sent or shared, and you can see and edit what I save. Reply yes to start, and say if you also want a check afterwards."
- The question is asked once per chat and only when no profile exists. A refresh stays on demand only.
- If the user says no or does not answer, no mail is read. Drafts then use a neutral style and say so on the board.
- The consent travels with the request: the main agent passes the user's own words to the style sub-agent, and the sub-agent refuses to read mail unless the request carries a yes. Without it, it answers with the question again.

Verification (offered after a build, used if the user wants it):
1. Review: the agent shows the saved profile in plain words (the baseline, then one line per context cell) and asks "Does this sound like you? Reply yes, or tell me what to change." A change edits one row after an approval card. The user can also edit any row in Excel.
2. 20-pair check: the acceptance test in section 12. It needs the 20 newest sent mails held out of the build, so the start question also asks whether the user wants the check. If the user says yes, the build skips those 20 mails and the check runs on them afterwards.
3. The user can say "delete my writing style" at any time. The agent clears AD1:AE60 after an approval card.

Effects on the existing agents (not done yet):
- notes-keeper reads A1:AE2 at the start of a chat. If AD1 is blank it adds the permission question to its answer, so no extra tool call is needed.
- The main agent shows that question above the board and, on a yes, calls the style sub-agent with BUILD and the user's own words.
- draft-writer today reads up to 25 sent mails on every run when no style is saved. That reads sent mail without asking, so the fallback should go and drafts should be neutral until the user agrees. To confirm with the user.
- The 20-pair check itself (replies written for 20 held-out situations) is a separate mode of the style sub-agent and is built after the first build and review modes work.

## 16. Evidence status

Sourced: Bell audience design and Brown and Levinson politeness, the Stanford politeness features ([paper](https://arxiv.org/pdf/1306.6078)), Enron formality by recipient rank ([paper](https://aclanthology.org/W11-0711.pdf)), softeners against directness in workplace request mail ([paper](https://files.eric.ed.gov/fulltext/EJ1083913.pdf)), few-shot exemplar results and the topic-similar exemplar drop ([paper](https://arxiv.org/html/2509.14543v1)), fine-tuning needs 25 to 100 mails for one global style ([Panza](https://arxiv.org/html/2407.10994v4)), evaluation metrics that disagree ([paper](https://arxiv.org/abs/2604.26460)), thread accommodation ([Echoes of Power](https://arxiv.org/pdf/1112.3670)).

My judgement, not tested: context cells with backoff, the 10 to 25 mail threshold, context-matched examples, the urgency handling, learning from the user's edits, the abstain rule, the acceptance idea.

Not found anywhere: a published method that builds one style profile per context from a single person's mail, a benchmark that varies recipient or urgency for one writer, labelled urgency data for email, and any product that documents per-recipient or per-urgency styles.

## 17. Build record and what the Preview spike changed (2026-10-22)

The sub-agent style-profiler exists in the draft agent (never published). It follows sections 8, 14 and 15 and has four modes: BUILD (needs the consent line), SHOW, EDIT and CLEAR. These parts of the design changed or became precise during the spike. Details and run results are in `../test-gaps.md` (section "style-profiler spike").

- Reading is two passes. A cheap list pass over up to 5 times TARGET sent mails (at least 100) reads only id, conversation, subject, sender, recipients and time, drops briefs, mails to oneself and mails sent on or after the date in the rule row, and keeps the candidates. Bodies are then read only for candidates, ten calls at once. The mail tool has no subject filter, so this is the only way to keep an agent's own briefs out without reading them. TARGET counts usable mails.
- A sensitivity label cannot be used. The mail tools return none, and a rule that mentions it made the model skip every mail as "unknown". The guards that stay are text based: secrets, medical, legal, HR and salary matters, personal data of a third person, confidential markers in the text, other languages, subject prefixes and mails to oneself. Skip reasons are a closed list and a mail is never skipped for being unsure, because the notes hold counts and never message text. This is a real limit: a labelled mail with no marker in its text and no sensitive topic is read for style only.
- The table lives in AD1:AE60 as designed. The user can add rows whose key starts with rule. (the first is rule.ignore_sent_from, written as "on yyyy-mm-dd" because Excel turns a bare date into a number). BUILD keeps rule rows, EDIT is the only way to change one. A too-thin cell always gets "too few mails (n), use the baseline", and the drafting side falls back from urgent or thanks to peer, then baseline.
- After every write the agent reads AD1:AE60 again and compares what it wrote. The approval card is written by the agent and is no proof of the written range.
- Measured: a 30 mail BUILD takes about 6 minutes and 8 credits. A run once hung for 9 minutes before the write and had to be stopped. Results varied between runs on one mailbox until the skip reasons were closed. Both the cost and the variance need a repeat on a mailbox with many real sent mails before the default or the 200 mail cap is trusted.
- Not built yet: the wiring into the main agent, notes-keeper (the start-of-chat consent question) and draft-writer (read AD1:AE60, drop the sent-mail sampling fallback), and the 20-pair check mode.
