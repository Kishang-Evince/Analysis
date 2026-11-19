# JSON contract

One JSON object. Values are plain text, the script escapes them. A missing or empty value is written as "not given", except the optional values listed as optional, which are left out.

```
mode        "morning" or "end-of-day" (weekly is refused)
asOf        the date of the board, like "Nov 5, 2026"
vipLine     text, optional. The "VIP and topics" line as plain text (no markdown marks, no semicolons), shown above the title
highlights  text, optional
must, waitingYou, review   lists of card
waiting                    list of waitingCard
commitments  { mine: [row], others: [row] }, optional
meetings     { entries: [text], unsummarized: [text] }, optional
notes        [text], optional. Note lines such as "Mailbox window truncated, older items may be missing.", shown above the summary
hidden       whole number, optional. How many cards the ignore filter left out. Shown as the note "Ignored items hidden: N" directly above the summary
partial      true, optional. Write it only when the board leaves sections out on purpose: a FOCUS other than full board or a SHOW_ setting of no (end-of-day needs no flag). The gate then accepts the reason code LATER for the rows left out
summary      text, the last line of the board
ignored      [{ n, subject, cards }], optional. The items ignored in this chat, n from 1 in the order ignored.
             The script writes it for --ignore and --undo (with the removed cards in cards). Do not write it yourself

card         person, subject, vip (true), topic, ask, action, confidence, ownership, messages,
             why, due, original, latest, more (optional), also (optional), draft (optional), link (optional),
             email (optional), received (optional), preview (optional), cid (the conversationId, always write it)
waitingCard  recipients, subject, vip (true), topic, daysWaiting, asked, sent, staleness, followUp,
             responses (optional), draft (optional), link (optional), email (optional), preview (optional), cid (the conversationId, always write it)
row          who, what, due, status, overdue (true)
```

Ignore and Undo: the script option --ignore N[,N] takes the cards with those numbers out of board.json (several numbers when one item has duplicate cards), adds one row to ignored, and raises hidden by the number of cards taken out. --undo N puts ignored row N back in its place, renumbers the rows after it and lowers hidden. Both rewrite board.json after the page is made, and print the same summary line. A wrong number prints "error: ignore: no card N" or "error: undo: no ignored item N", exits with code 2 and changes nothing.

Tiles and hover text: the script writes a static row of tiles under the title (Open items, Must do today or Must do overdue, Waiting on you, Waiting on others, Review quickly, Drafts ready, Longest wait in days). A tile has no click action. A section with no cards has no tile, so a section left out by a Show setting has none. Drafts ready counts the cards with a draft value and Longest wait is the largest daysWaiting. Do not write tiles yourself. The action word of a card (Reply, Review, Approve, Send, Decide, Complete, Attend) and the staleness word of a waiting card (Recent, Aging, Overdue) are labels and no buttons. The script adds a short hover text to each of these words. Use exactly these words so the hover text appears.

Numbering: the script numbers the cards 1, 2, 3 and so on in the order must, waitingYou, waiting, review. Do not write numbers on the cards. The printed `numbers` list gives the number of every card.

`email` is the sender address of the key message (the recipient addresses on a waitingCard), `received` is when it arrived, `preview` is its bodyPreview. They are shown under the title and under the ask in muted text. Each one is left out when empty, never "not given". Addresses are text, not links.

`cid` is the conversationId of the card. The script reads the saved List messages results of the run and compares the messages of that conversation. When an older message carries the category Brief: Ignored and the newest does not, it adds "New reply since ignored." to why (a waiting card shows why only then). When the newest message carries the category it takes the card out and raises hidden by one. When cid is missing the script looks for the one conversation whose subject matches (ignoring Re: and Fwd: and case, and the sender address when the card has one). When none or several match, or the conversation is not in the saved results, the card is left as written. The summary line reports labeled and dropped.

`link` is the webLink of the key message. Only an https address is used, anything else is dropped. `why` may end with "New reply since ignored." and the script marks that sentence.

A due value that ends with "passed" is shown in red. The sections are left out when they have no cards. A board with no cards and no commitments shows "Inbox is clear." (morning) or "All clear for the rest of today." (end-of-day).

Summary line printed by the script, for example:

```
{"mode":"morning","cards":3,"sections":{"must":1,"waitingYou":1,"waiting":1,"review":0},"ignored":1,"hidden":1,"labeled":0,"dropped":0,"buttons":4,"numbers":[{"n":1,"subject":"Audit evidence","section":"must"},{"n":2,"subject":"Board deck inputs","section":"waitingYou"},{"n":3,"subject":"Re:Delivery date","section":"waiting"}],"bytes":9120}
```

Example:

```
{"mode":"morning","asOf":"Nov 5, 2026","must":[{"person":"Alice Morgan","subject":"Audit evidence","ask":"Send the audit evidence.","action":"Send","confidence":"High","ownership":"Owned","messages":1,"why":"Direct request with a past deadline.","due":"Oct 20, 2026 (Tue), passed","original":"Nov 4, 2026, Alice Morgan","latest":"Nov 4, 2026, Alice Morgan","email":"alice.morgan@evincedev.in","received":"Nov 4, 2026, 7:17 PM","preview":"Kishan, please send the audit evidence by Oct 20.","link":"https://outlook.office.com/mail/deeplink/read/AAA="}],"summary":"Inbound: 67 emails excluded (0 already replied to, 67 noise). Outbound: 0 sent emails excluded (informational, no ask)."}
```
