# Character budget for stages 7 to 10

Date: 2026-10-16. Glean's Instructions counter after the stage 6 trims: 833 characters left.

## Size of the remaining prompts (edit text pasted into Builder Assistant)

| Prompt | Edit text | Expected growth (about 50 to 60 percent of the edit text, from stages 4 to 6) |
|--------|-----------|--------------------------------------------------------------------------------|
| 7 drafts | 2,981 | 1,500 to 1,800 |
| 8 writing style | 1,567 | 800 to 950 |
| 9 VIP and topics | 1,919 | 1,000 to 1,150 |
| 10 meeting prep (E11) | 3,081 | 1,600 to 1,850 |
| Total | 9,548 | 4,900 to 5,750 |

Room needed beyond the 833 left: about 4,100 to 4,900 characters.

## Where the space can come from

| Source | Saves | Cost or risk |
|--------|-------|--------------|
| Four medium-risk trims already proposed (Step 9 cards 325, Step 8B 192, Step 3C 247, Step 3E 330) | 1,094 | Rewords rules that stages 3 to 5 tested; retest those items |
| Shorten the Step 1 query lists (the three select lists repeat the same field list) | about 450 | Low: say "same select list as the first query" |
| Shorten Output Rules bullets and Step 5 class definitions | about 400 | Low to medium |
| Move Steps 6C and 6D (commitments) to a sub-agent | about 1,800 | Changes a tested stage; Step 1B and SAFETY must be repeated in the sub-agent; the builder could not confirm a sub-agent character limit |
| Move Step 8D writing style to a skill | about 800 (when added) | New feature; draft style samples then need a skill |
| Drop stage 10 (meeting prep) or stage 9 (VIP) | 1,000 to 1,850 | Loses a feature |

Realistic order: the four medium trims, then the two low trims (about 1,950 total), then the sub-agent for 6C and 6D, then decide on dropping or deferring stage 10.

## Decision needed from the user (not yet taken)

1. Keep the single agent (the user's last answer), which means choosing which later features to cut or shrink: roughly stages 7 and 8 fit after the trims; stages 9 and 10 do not.
2. Or revisit the sub-agent for Steps 6C and 6D when stage 9 is reached.

Nothing here has been applied in Glean.

## Update 2026-10-16: measured options

Skills and sub-agents were tested in a throwaway agent and neither counts against the 32,000-character Instructions limit. Details and the revised options are in `specs/glean-extension-findings.md`. The "Decision needed" section above is superseded once the user picks a route.

> Superseded (options table): see `specs/subagent-rework-design.md` for the chosen design.
