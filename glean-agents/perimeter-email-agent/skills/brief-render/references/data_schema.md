# JSON contract

One JSON object. Values are plain text, the script escapes them. A missing or empty value is written as "not given".

```
mode        "morning" or "end-of-day" or "weekly"
asOf        the date of the brief, like "Oct 23, 2026". It is also the base for days overdue
highlights  text, optional
must, waitingYou, review   lists of card
waiting                    list of waitingCard
commitments  { mine: [row], others: [row] }
meetings     { entries: [text], unsummarized: [text] }
notes        [text]
summary      text, the last line of the board
weekly       { asksToMe, openCommitments, othersOwe, waitingOnOthers }, each a list of { who, what, date }   (weekly mode only)

card         person, subject, vip (true), topic, ask, action, confidence, ownership, messages,
             why, due, original, latest, more, also
             days is optional. When it is missing the script works it out from due and asOf
waitingCard  recipients, subject, vip (true), topic, daysWaiting, asked, sent, staleness, followUp, responses
row          who, what, due, status, overdue (true)
```

Days overdue: when due ends with "passed", the whole days between the first date in due (like "Oct 16, 2026") and asOf, otherwise 0.

Summary line printed by the script, for example:

```
{"mode":"morning","cards":43,"sections":{"must":13,"waitingYou":0,"waiting":30,"review":0},"commitment_rows":0,"meeting_cards":0,"tiles":9,"chart_rows":7,"duplicates":3,"bytes":83289}
```

Example:

```
{"mode":"morning","asOf":"Oct 23, 2026","must":[{"person":"Dana Whitfield","vip":true,"subject":"Budget","ask":"Approve the budget.","action":"Approve","confidence":"High","ownership":"Owned","messages":3,"why":"VIP sender.","due":"Oct 21, 2026 (Wed), passed","original":"Oct 20, 2026 (Tue), Dana Whitfield","latest":"Oct 22, 2026 (Thu), Dana Whitfield"}],"summary":"Inbound: 3 emails excluded (0 already replied to, 3 noise). Outbound: 1 sent emails excluded (informational, no ask)."}
```
