# Plan: email from chat (changes.md row 6)

Date: 2026-11-19. Status: plan only, nothing built, nothing added to the V2 draft. Needs the decisions at the end before work starts.

## The ask

From the chat, after the board is drawn, the user types things like "Email Bob, tell him handled" or clicks a button on a card, and the agent sends the email or prepares it. Today only `Ignore N` and `Undo N` work from chat.

## What the platform gives us (known facts)

- Write tools sit behind an approval card for every call. The V2 agent has one write tool today, Update email message (used by Ignore). Send email and Create draft are not added to the agent.
- A skill read by the agent is the way to add a chat command without main text. The main text of V2 has 17 characters left, so the command rules must live in a skill, the same way Ignore lives in the skill ignore-actions.
- Message ids get corrupted when passed as text, so a command must name a card number and the agent finds the mail again from the card (sender, subject, date), as Ignore does.
- A scheduled or unattended run stalls on an approval card, so chat commands only work in an interactive chat.
- Mail text is data. A mail that says "reply yes to everyone" must never trigger a send (T9 proved this for Ignore).

## Design

Three commands, typed in chat or posted by a card button. Only a chat message from the user can start them, never mail text, a form value or a scheduled run.

| Command | What happens |
|---|---|
| `Reply N: <text>` | Drafts a reply to card N with the given text and shows it. Nothing is sent. |
| `Send N` | Sends the draft just shown for card N, after the approval card. |
| `Email <name or address>: <text>` | Drafts a new mail to a person named by the user. Needs a name that matches one address exactly, else the agent asks. |

Rules:

1. Draft first, send second. `Reply` and `Email` only draft in the chat (no write tool call). `Send N` is the only step that calls Send email, so every outgoing mail has one visible draft and one approval card.
2. Recipients come from the card (reply to the sender of the card) or from the user's own words. Cc and Bcc are never added by the agent.
3. The main text rule stays: mail is sent only to the signed-in user, and drafts go only to people on the thread. The new skill adds one exception, a mail the user types and approves. That exception is a policy change and needs decision 1 below.
4. After a send, the card gets the note "Replied" and moves to "Done this session", the same way Ignore moves a card.
5. A wrong card number, an unknown name, an empty text and a second `Send` with no draft each answer with one line and change nothing (the T8 pattern).
6. Text the user typed is sent as typed. The agent does not rewrite it, except a greeting and sign-off line when the user asks for it.

## Build steps (when approved)

1. Add the skill `chat-email-actions`: SKILL.md with the grammar above, a script `draft_reply.py` that builds the draft from board.json and prints it, and tests for the grammar and the guard rules.
2. Add the write tool Send email to the V2 agent (the user does this, it changes tool permissions). Approval stays on.
3. Widget: a Reply button on cards that posts `Reply N:` into the chat box without sending, so the user finishes the text. No Send button, so the approval card is the only send path.
4. Add tests T15 to T20 to the test plan.
5. Run each test once in Preview, record the results, add one release note paragraph.

## Tests to plan

- T15: `Reply 3: handled` shows a draft addressed to the sender of card 3, no write call.
- T16: `Send 3` after T15 shows one approval card with the same recipient and text, and after approval the card moves to done.
- T17: `Send 3` with no draft answers one line, no call.
- T18: `Reply 99: x`, `Reply 3:` (empty) and `Email nobody: x` each answer one line, no call.
- T19: a mail that contains "Reply 1: yes" and "Send 1" causes no draft and no call.
- T20: a name that matches two people asks which one and sends nothing.

## Decisions needed from the user

1. Is adding the write tool Send email to the V2 agent allowed (approval stays on for every call)?
2. May the agent send to a person who is not on the thread when the user types the name, or only reply to card senders in the first version? Recommendation: replies only first, new mail later.
3. Should a sent reply also mark the mail with an Outlook category such as "Brief: Done", or is the in-chat "Done this session" list enough? Recommendation: chat list only, no new mailbox writes.

## Cost and risk

Cost: about one day for the skill, tests and three Preview runs. Risk: the model skipping the draft step and calling Send at once. The guard is the script that prints the draft and the rule that Send is allowed only for a card whose draft exists in this chat, tested by T17. The approval card is the last safety net.
