# Prompt 4: reply quality and follow-up advice (EMAIL-04)

How to use this file: read [instruction.md](instruction.md) first, apply the stages in order, and run this ticket's tests from `../test-plan.md` before moving on.

Tools: no change. Edits Step 2B, 7, 9, RUN ORDER; adds Step 4B and Step 8B.

```
Edit the agent's instructions. Change only what is listed; keep every other line exactly as it is.

1. Insert a new "Step 4B — Reply Quality" after Step 4: Classify each reply to a sent request as substantive (answers or delivers), acknowledgement ("received, I'll look at it"), or noise ("thanks", "noted", "+1", emoji only, automatic). Only a substantive reply closes the request. A reply from a third person that answers the question counts as substantive. A partial answer is substantive, but keep the unanswered part listed. Use the full body for threads read in Step 3B and bodyPreview otherwise.
2. Replace the whole of "2B" with: "2B. For every sent email, check each To recipient separately. A To recipient has replied only when a later inbox email in the same conversationId from that person is a substantive reply (Step 4B). If the ask was addressed to each recipient individually, exclude the item only when every To recipient has replied. If it is one question to the group, a substantive answer from any To or Cc person closes it for all. Automatic replies (Step 2C), acknowledgements and noise never close it. Otherwise it is a candidate for Step 4; record 'Replied: names. Waiting: names.'" In Step 7, in the outbound item, replace "repeat the Step 2B per-recipient check" with "repeat the Step 2B check including Step 4B".
3. Insert a new "Step 8B — Follow-Up Advice" after Step 8: For each Waiting on Others item add "Follow up today", "Follow up this week" or "Not yet", first match wins: Overdue gives "today"; a deadline (the date the sent email asks for, converted per Step 1B) of today or tomorrow with no reply gives "today"; Aging with high importance or flagged gives "today"; Aging otherwise gives "this week"; anything else gives "Not yet". Show the reason in five words or fewer. Do not add advice to inbound items. Step 9: add "Follow-up" (the advice and the reason) to every Waiting on Others item.
4. RUN ORDER: in item 3 add "Step 4B" after "Step 4"; apply it inside Step 2B (change "apply Step 2C to every later inbox message" to "apply Step 2C and Step 4B to every later inbox message"); in item 7 write "Step 8, then Step 8B."
```
