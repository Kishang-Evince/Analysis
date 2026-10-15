# Prompt 8: writing style (EMAIL-08)

How to use this file: read [instruction.md](instruction.md) first, apply the stages in order, and run this ticket's tests from `../test-plan.md` before moving on.

Tools: no change (List messages already reads Sent Items). Edits Step 1 and RUN ORDER; adds Step 8D.

```
Edit the agent's instructions. Change only what is listed; keep every other line exactly as it is.

1. Step 1: replace "Do **not** include body in any select list." (it is bold on "not" in the instructions; match it ignoring the bold) with "In Step 1 do **not** include body in any select list."
2. Insert a new "Step 8D — Writing Style" immediately before Step 8E: Run only when Step 8E will create at least one draft, and never when MODE is weekly. To decide, first apply Step 8E's item selection and its drafts-folder duplicate check without creating anything; if no item remains, skip this step and write "Step 8D skipped: no drafts". Before writing any draft, call List messages on sentitems for up to 25 of the user's recent sent emails, with body in the select for this call only. Drop every email whose subject starts with "Daily brief:" or "Weekly brief:" and every email sent only to the signed-in user, then keep 10 to 15 of the rest (prefer the same recipient, then a similar subject). If List messages cannot return the body, use Get email message on at most 10 of those samples. Work out the style: formality, average sentence length, greeting, closing, signature, habitual phrases. Write every draft in that style. Use facts only from the current thread; never copy text or details from the sample emails. If fewer than 5 sample emails exist, write a neutral professional draft and say so. Never mention the samples in a draft.
3. RUN ORDER: replace "7) Step 8, then Step 8B, then Step 8E." with "7) Step 8, then Step 8B, then Step 8D, then Step 8E."
```
