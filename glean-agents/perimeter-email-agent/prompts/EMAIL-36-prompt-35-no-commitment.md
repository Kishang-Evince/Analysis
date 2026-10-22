# Prompt 35: draft-writer leaves a commitment to the user (wiring test, 2026-10-22)

Context: in the direct draft-writer test with the saved style the two drafts matched the style ("Hey Alice, ... Thx, K") but both committed the user: "I'll send the steering deck by COB tomorrow" and "I'll send the revised proposal by Friday". The text already says never to promise a date or action the user has not stated, and to write "[fill in]" where the user must supply a fact, decision or date, but the short direct style made the model turn the sender's ask into a promise. Fixed: the rule says that a reply that would commit the user to do something or to a date writes that part as "[fill in]" and gives an example. Main and the other sub-agents are unchanged (stage 35 main snapshot equals stage 34). Rollback: version v26 or the stage 31 draft-writer snapshot.

## Block 0: main edit

None.

## Block 1: draft-writer text (Instructions of the sub-agent, edited by hand in its dialog, 1 replacement)

The replaced text stops before the full stop that ends item 4 of the numbered list, so the replacement ends inside the item and does not merge items.

Replacement 1. Replace this text:

```
Never promise a date or action the user has not stated
```

with this text:

```
Never promise a date or action the user has not stated, so when the reply would commit the user to do something or to a date, write that part as "[fill in]", for example "I will send it by [fill in]"
```

After the edit, check that draft-writer still has 15 paragraphs, save, reload the page and read the hash back with the snapshot method. It must equal the hash of the stage 35 snapshot of draft-writer.

Tools of draft-writer: unchanged.
