# Brief HTML templates

Build every emailed brief from these files. Never write brief HTML from scratch.

## Files

- brief-shell.html: the whole page. Fill its tokens, then insert the rows and cards below.
- kpi-row.html: one row of three KPI tiles. Fill TILE_1, TILE_2, TILE_3 with kpi-tile.html.
- kpi-tile.html: one KPI tile. Fill KPI_COLOR, KPI_VALUE, KPI_UNIT_HTML, KPI_LABEL.
- chart-row.html: one "Who holds your items" row per recipient or owner.
- section-head.html: the gold section heading. Fill SECTION_TITLE and SECTION_COUNT.
- card-must.html: one Must Do Today card.
- card-waiting.html: one Waiting on Others card.
- examples/: finished briefs with sample data. Use them to check the result, not as a source.

## Rules

1. KPI tiles: 9 tiles, 3 per kpi-row, in this order: open items, must do today, waiting on others, drafts ready, check first, oldest overdue, longest wait, recipients, duplicate pairs.
2. KPI_UNIT_HTML: empty when the value has no unit. For a value like "6 days", set KPI_VALUE to "6" and KPI_UNIT_HTML to `<span style="display:block;font-size:11px;line-height:13px;color:COLOR">days</span>` with COLOR equal to KPI_COLOR.
3. Chart rows: sort by total items, highest first. Each row: PCT_TO_DO is the share of must do items, PCT_WAITING the share of waiting items, both out of the largest total, rounded. PCT_REST = 100 - PCT_TO_DO - PCT_WAITING. Remove the segment td of a 0% value.
4. Must Do cards: sort by due date, oldest first. RANK starts at 1. DAYS_TEXT is "N day" or "N days". DAYS_BG and DAYS_FG are #FDECEA and #B42318 when 5 or more days overdue, else #FFF3DC and #B54708.
5. Must Do card optional parts: ROLE_PILL and THREAD_PILL are empty strings when the item has no role or topic. MORE_ASKS_ROW is empty unless the item has more asks. When it has more asks, use `<tr>` + cell2 "More asks" + an empty cell + `</tr>`.
6. Waiting cards: sort by sent date, oldest first. DAYS_TEXT and the colors follow the same rule with 8 days as the threshold. VIP_PILL is the VIP pill only for VIP items. TAG_PILL is the topic pill when the item has one.
7. Every card line is printed. Write "not given" for a missing value.
8. Never use an em dash or a semicolon in the brief text.
9. After filling, no token like {{...}} may remain in the output.

## Glean

Attach these files to the agent as resources, or paste the same content into the agent instructions. The agent cannot read this folder at run time.
