# Prompt 9: VIP and topics (EMAIL-09)

How to use this file: read [instruction.md](instruction.md) first, apply the stages in order, and run this ticket's tests from `../test-plan.md` before moving on.

Tools: confirm company search and Read document are available to this agent (enable them if the Tools tab lists them as off). Setup: each user creates a document titled **Agent VIP and Topics** with lines like `VIP: Dana Whitfield, dana@bigclient.com, @bigclient.com` and `TOPIC: budget forecast`. Search finds new documents only after the next crawl, and the document must be findable in search. Edits Step 8, Step 9, RUN ORDER; adds Step 3F.

```
Edit the agent's instructions. Change only what is listed; keep every other line exactly as it is.

1. Insert a new "Step 3F — VIP and Topics" after Step 3E: Search for the document titled "Agent VIP and Topics" with the query "Agent VIP and Topics" from:me. If several match, use the one with the latest updated date. Read it. Lines starting "VIP:" list people, addresses, aliases or domains. Lines starting "TOPIC:" list topic phrases. A chat message may add entries for one run. If there is no document and no entries, skip this step and say nothing about it.
2. An email is a VIP match when the sender or any To recipient matches an entry by address, alias, domain or display name (case-insensitive). A To-recipient match counts only when the email has 5 or fewer To recipients. It is a topic match when its subject or body matches a topic phrase, exactly or by meaning.
3. Step 8: inside each primary bucket (inbound) or staleness tier (outbound), matched items sort first and are marked "VIP" or "Topic: [phrase]". A match never moves an item to another bucket, tier or section, and never revives an excluded item (already replied, noise, automated).
4. Step 9: add a "Highlights" line at the top listing the matched items; omit it when there are none.
5. RUN ORDER: add Step 3F after Step 3E.
```
