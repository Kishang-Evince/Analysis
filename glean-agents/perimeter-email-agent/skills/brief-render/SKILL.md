---
name: brief-render
description: Renders the Outlook action board brief (morning, end-of-day or weekly) from a JSON file into an email safe designed HTML file with a script. Use it before sending the brief by email and never write the brief HTML by hand.
---

# Brief render

The script makes the HTML. You write only the JSON.

## Steps

1. Write the board as one JSON object to a file, for example board.json. The keys are in references/data_schema.md.
2. Run: python3 scripts/render_brief.py board.json brief.html
   The script writes brief.html and prints one summary line of JSON. On a structural error it prints "error: <path>: <message>" and stops with exit code 2.
3. Compare the summary with the JSON: cards equals the cards of must, waitingYou, waiting and review together, and sections gives the same number per section.
4. Use the content of brief.html unchanged as the email body, with is_html true.

## Rules

- Never write, edit or shorten the HTML. Never add JavaScript, forms, iframes or external files.
- Never work out days, classes, tiles, ranks or counts. The script does it.
- Escaping is done by the script. Put plain text values in the JSON.
- A missing value is written as "not given" by the script. Never put a secret in a value.

## Resources

- scripts/render_brief.py: the renderer.
- assets/: the HTML fragments the script fills.
- references/data_schema.md: the JSON contract.
