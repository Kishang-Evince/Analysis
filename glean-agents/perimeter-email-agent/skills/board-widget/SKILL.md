---
name: board-widget
description: Shows the Outlook action board in a chat as an interactive HTML page with an Ignore button on every card, made by a script from a JSON file. Use it in a chat after the board is written (Step 9) and whenever Ignore N or Undo N changes the board. Never for the emailed brief and never for a weekly run.
---

# Board widget

The script makes the HTML. You write only the JSON, once per run. The file board.json always holds the board that is on screen.

## Draw the board (Step 9, chat only)

1. Write the board as one JSON object to /home/user/output/board.json. The keys are in references/data_schema.md. Put the number of items that the filter of the skill ignore-actions left out in hidden. Write vipLine as plain text with no markdown marks and no semicolons. Put the conversationId of every card in cid. The script reads the saved mail results of the run to add "New reply since ignored." and to take out a card whose newest message is marked ignored, and it finds the conversation by subject when cid is missing.
2. Run: python3 scripts/render_widget.py /home/user/output/board.json /home/user/output/action-board.html. It writes the page and prints one line of JSON: cards, sections, ignored, hidden, buttons, bytes and numbers (the number, subject and section of every card). On a structural error it prints "error: PATH: MESSAGE" and exits with code 2.
3. Compare the line with the JSON: cards equals the cards of must, waitingYou, waiting and review together. The numbers list is the numbering of the board for Ignore N and Undo N.
4. Open the page with the tool Open File In Canvas and show it as the board. Do not copy or retype its HTML and do not write the markdown board in the reply.
5. When the script exits with code 2 or the page cannot be opened, show the board in markdown as board-layout-v2 says, and say nothing about the script.

## After Ignore N or Undo N

Run this after the skill ignore-actions has marked or restored the emails and the approval is done. Use the number N of the board on screen.

- Ignore N: python3 scripts/render_widget.py /home/user/output/board.json /home/user/output/action-board.html --ignore N. When the item has duplicate cards, give all their numbers, for example --ignore 3,5.
- Undo N: the same command with --undo N, where N is the number in the list "Ignored this session".
- The script takes the cards out (or puts them back), renumbers the board, keeps the list "Ignored this session" and the note "Ignored items hidden: N", and rewrites board.json. Then open the page again with Open File In Canvas.
- Never edit board.json by hand and never write the markdown board for these commands.

## Rules

- Never write, edit or shorten the HTML. Never add JavaScript, forms, iframes or external files.
- Never number the cards, work out days or counts, or add a button. The script does it.
- Escaping is done by the script. Put plain text values in the JSON. A missing value is written as "not given" by the script.
- Weekly runs have no widget. Use the markdown board.
- The buttons only send the chat message Ignore N or Undo N. The command itself is handled by the skill ignore-actions, never by this skill.

## Resources

- scripts/render_widget.py: the renderer.
- references/data_schema.md: the JSON contract.
