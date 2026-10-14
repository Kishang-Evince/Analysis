# Prompt 3: multiple and indirect asks (EMAIL-03)

How to use this file: read [instruction.md](instruction.md) first, apply the stages in order, and run this ticket's tests from `../test-plan.md` before moving on.

Tools: no change. Edits Step 3, 5, 6, 9, RUN ORDER; adds Step 3C.

```
Edit the agent's instructions. Change only what is listed; keep every other line exactly as it is.

1. Insert a new "Step 3C — Extract Asks" after Step 3B: Split an email with several requests into separate asks ("review this, approve pricing, send the contract" is three). For each ask record: the ask, the requester, a short quote, direct or indirect, and confidence (High, Medium, Low). Count only requests made to the user: asks addressed to others, rhetorical questions, and requests that appear only in quoted older text do not count. Recognize indirect asks without fixed phrases, for example "Need your eyes on this", "Thoughts?", "Comfortable shipping?", "Let me know what you think", "Can we get this over the line?". A polite statement ("Appreciate your help") or a question to someone else on the thread is not an ask.
2. Step 3: in the Request language bullet, replace "Direct questions with a clear expectation of the user's response" with "Direct questions with a clear expectation of the user's response; indirect asks (Step 3C) such as "Need your eyes on this" or "Thoughts?"". In the exclusion that starts "Informational updates without any request" add "or indirect ask" after "request". In the exclusion about inferenceClassification "other", replace "no request language or ownership signals" with "no request language, indirect ask or ownership signals".
3. Step 6: replace the bullet that starts "Multiple asks in one email" with: "Multiple asks in one email: show the primary ask on the card and list the others under More asks (Step 3C)." Step 5: Class C confidence becomes "Medium or Low". Step 9: the Confidence field becomes "High, Medium or Low (Low only in Review Quickly)"; show the primary ask on the card and list the others under "More asks". Asks with Low confidence go to Review Quickly.
4. RUN ORDER: in item 3 (the one containing Step 3B and "Step 1B again on the full bodies") add Step 3C after it.
```
