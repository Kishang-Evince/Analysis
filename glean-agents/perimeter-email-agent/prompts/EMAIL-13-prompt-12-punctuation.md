# Prompt 12: no em dash and no semicolon (user request 2026-10-21)

User request, verbatim: "Never use — or ;". Applied through Builder Assistant to the main Instructions (it replaced every em dash and semicolon and added a rule), by hand to the three sub-agent texts (each semicolon followed by a lower-case letter became a full stop and a capital letter). The rule line in Output Rules was shortened to stay inside the 32,000 characters.

## Block 0: message sent to Builder Assistant

```
Only edit the Instructions text. Do not create or change sub-agents, tools, resources or settings, and do not ask me questions.

Never use the em dash or the semicolon in anything this agent writes: the board, the brief, drafts and chat replies. Change every em dash and every semicolon in the Instructions text so that the meaning stays the same (use a comma, a colon, a period or the word "and"), and keep every other word exactly as it is.
```

## Marker texts after the change (one per line)

Step 1: Retrieve Recent Emails
Step 2: Cross-Reference Replies
2A: Build the Reply Match Log
2B: Identify sent emails still awaiting a response from others
Step 3: Detect Actionable Inbound Emails
Step 4: Detect Sent Emails Awaiting Response
Step 5: Classify Inbound Emails
Step 6: Handle Edge Cases
Step 7: Final Verification Gate
Step 8: Rank Results
Step 9: Present the Action Board
Step 1B: Absolute Dates
Step 2C: Automatic Replies
LOOKBACK_DAYS was invalid, used 14.
Mailbox window truncated, older items may be missing.
Step 3B: Read the Full Message
Step 6B: Reply Is Not Completion
Step 6C: Commitments
Step 6D: Commitment Status
Step 3C: Extract Asks
Step 4B: Reply Quality
Step 8B: Follow-Up Advice
Step 3D: Action Type and Due Date
Step 3E: Meeting Deadlines
Step 10: Deliver the Brief
MODE was invalid, used auto.
Step 8E: Drafts
Secret requested, no draft.
Step 3F: VIP and Topics
Step 8F: Meeting Prep
even if the board is clear.
Leave the VIP and topics line out.
Never use an em dash or a semicolon.

Prompt 12b (2026-10-21 run): a morning board run followed the rule in the chat reply and in the main text, but the emailed brief held 18 em dashes, all in the Meeting prep section written by `meeting-prep`. The line "Never use an em dash or a semicolon." was appended to the end of the three sub-agent texts (draft-writer, meeting-prep, notes-keeper). Hashes after the change: draft-writer 26d9d4cc, meeting-prep e876218a, notes-keeper a6122fdd.

Prompt 12c (2026-10-21, second run): the brief held 0 em dashes and 0 semicolons, but it still started with the "VIP and topics" line although Step 9 said "never in the brief". Step 9 now ends that sentence at "even if the board is clear." and Step 10 ends with "Leave the VIP and topics line out." Main hash 27c9df45 (30,666 characters), 4 characters left.
