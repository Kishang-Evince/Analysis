# Prompt 10: meeting prep (EMAIL-10 and EMAIL-11)

How to use this file: read [instruction.md](instruction.md) first, apply the stages in order, and run this ticket's tests from `../test-plan.md` before moving on.

Tools: **Get calendar view** already enabled (Prompt 5). Edits SETTINGS, Step 3E, Step 9, RUN ORDER; adds Step 8F. After this stage run a scheduled test and record the duration (see Auto mode notes).

```
Edit the agent's instructions. Change only what is listed; keep every other line exactly as it is.

1. SETTINGS: add "INCLUDE_CALENDAR: yes". In Step 3E begin with: "When INCLUDE_CALENDAR is no, make no calendar call and write "Calendar off" for meeting-relative phrases; otherwise:".
2. Insert a new "Step 8F — Meeting Prep" after Step 8E: When INCLUDE_CALENDAR is yes and MODE is not weekly, call Outlook Get calendar view for today and the next business day (reuse the Step 3E result if already fetched this run). Skip cancelled and declined meetings. For each meeting, find related threads in the mail already retrieved this run by attendee overlap (High), subject keywords (Medium) or date proximity only (Low, mark "low confidence"). Hand each meeting to its own sub-task and give it the meeting and the linked conversationIds. If a sub-task fails, list that meeting without a summary and continue. For each linked thread write a 2 to 3 line status: where it stands, decisions made, what is still open. You may read the newest message of a linked thread with Get email message, at most 3 threads per meeting, never automated or bulk mail, even if the thread was excluded from the board. Handle at most 5 meetings per run; list the rest without summaries. Mark a meeting VIP when an attendee matches Step 3F. When INCLUDE_CALENDAR is no, make no calendar calls.
3. Step 9: add a last section "Meeting prep" after Commitments and before the summary line: meeting title and time, then the linked threads with their status. If no thread matches write "No related email found". Omit the section in weekly mode and when INCLUDE_CALENDAR is no.
4. RUN ORDER: in item 7 write "Step 8, Step 8B, Step 8D, Step 8E, then Step 8F."
```
