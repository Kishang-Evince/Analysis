# Test mailer: seed a test mailbox through an SMTP relay (Brevo)

`send-test-emails.mjs` sends scripted emails through an SMTP relay (Brevo by default) to the Outlook mailbox the agent runs on, so you do not compose test mail by hand. It has 174 catalog entries taken from `../test-plan.md`; each email lists the test ids it supports.

## Where the emails live
Inside `send-test-emails.mjs`, between `// BEGIN CATALOG` and `// END CATALOG`, as plain JSON arrays:
- `PARITY_*_EMAILS`: one constant per area of the existing agent (retrieval, reply cross-reference, signals, exclusions, edge cases and so on).
- `ENH_<nn>_<NAME>_EMAILS`: **one constant per enhancement**, numbered as in the 27-feature list, for example `ENH_13_LOOKBACK_EMAILS`, `ENH_19_OUT_OF_OFFICE_EMAILS`, `ENH_26_VIP_TOPIC_EMAILS`.
- `CROSS_CUTTING_EMAILS`: injection and other cross-cutting checks.
- `ENHANCEMENTS`: registry of all 27 (number, name, ticket, constant). Enhancements 2, 22, 23 and 25 are empty and marked `outboundOnly`, because their seeds are mail you send from Outlook.
- `SCENARIOS`: all of the above joined in order; this is what the CLI reads.

A scenario with `"count": N` is sent as N separate emails (subject suffixed `(k of N)`), and one with `"optIn": true` is skipped by `--all` and `--group`; send it only by name, for example `npm run send -- --scenario E13-07 --delay 500` (80 unread for the paging test) and `npm run send -- --scenario E13-08 --delay 500 --limit 220` (220 more, 300 in total).

Add or edit an email by changing the JSON in its constant. Select one enhancement with `--group E13` (E and the two-digit number).

## Setup (once)
1. In the `test-mailer` folder run `npm install` (Node 22.9 or newer).
2. In Brevo (SMTP & API, SMTP tab) note the SMTP login and create an SMTP key. Verify the sender address (or domain) you will send from under Senders, Domains and Dedicated IPs.
3. Copy `.env.example` to `.env` and fill in `TEST_RECEIVER`, `SMTP_USER` (the SMTP login), `SMTP_PASS` (the SMTP key) and `SMTP_FROM` (the verified sender). The relay defaults to `smtp-relay.brevo.com` port 587 with STARTTLS; `SMTP_HOST`, `SMTP_PORT` and `SMTP_SECURE` change it. Set `ALLOWED_RECIPIENT_DOMAINS` to your company domain so the script can never mail anyone else. `.env` is git-ignored.

## Use
```bash
npm run list -- --group A5            # browse scenarios (also --test E14-05)
npm run dry-run -- --group A5         # preview, sends nothing, needs no credentials
npm run send -- --test A2-07          # send what one test needs (thread parents are added automatically)
npm run send -- --group E19 --tag "[run1]"
npm run send -- --all --yes           # everything (more than 10 emails needs --yes)
```
Options: `--scenario`, `--group`, `--test`, `--all`, `--to`, `--other`, `--tag`, `--delay`, `--limit`, `--no-verify`, `--dry-run`. See `--help`.

After a send the script prints the manual steps for the scenarios it sent (reply in Outlook, flag, mark as read, send a request first). Do those, then run the agent. If any email fails it prints a `--scenario` line to retry only those.

## Scripts per step
Every seed script sends to `TEST_RECEIVER`, ends with `--yes`, and takes `-- --dry-run` to preview and print the manual Outlook steps.

| Script | Sends |
|---|---|
| `seed:a1` to `seed:a5`, `seed:a7` to `seed:a9` | one parity group (Part A of the test plan); reset the mailbox between groups |
| `seed:email-01` | all seven EMAIL-01 groups (E13, E11, E05, E06, E17, E19, E20) |
| `seed:e13`, `seed:e11`, `seed:e05`, `seed:e06`, `seed:e17`, `seed:e19`, `seed:e20` | one EMAIL-01 group |
| `seed:e13-bulk80`, `seed:e13-bulk-topup` | 80 unread asks for the paging test, then 220 more (300 in total) |
| `seed:email-02` to `seed:email-07`, `seed:email-09`, `seed:email-10`, `seed:email-11` | every group of that ticket (`seed:email-08` does not exist: its seeds are mail you send from Outlook) |
| `seed:c` | the cross-cutting checks |
| `check:0` to `check:10` | check the instruction document of that stage, saved as `../specs/stage-N.md` (or pass another path: `npm run check:1 -- path`) |

`--checklist` prints the setup in order and sends nothing: STEP 1 the requests you send from Outlook first (to yopmail addresses, each with its own unique subject such as `Sign-off request [E17-02]`), STEP 2 the mail itself, STEP 3 the Outlook steps after it arrives (for example `npm run seed:email-01 -- --checklist`).

`--ticket EMAIL-nn` does the same as the ticket scripts for any combination: `node send-test-emails.mjs --ticket EMAIL-01,EMAIL-02 --dry-run`.

## Limits to know
- **One sender address by default.** Personas differ by display name only. Use `SMTP_ACCOUNTS` to give personas their own verified sender addresses (they share the login and key unless a persona gives its own). Tests that depend on a real no-reply address, a company domain or a second address for the same person cannot be fully simulated.
- **No backdating.** Mail arrives now. Simulate age with the chat message "as of YYYY-MM-DD" (today plus N days) or "LOOKBACK_DAYS N" in Preview or a manual chat run, or edit `AS_OF_DATE` and the day values in the agent's saved SETTINGS block for a scheduled run (Run now). See the test plan conventions.
- **Scheduled runs ignore chat.** A scheduled run has no chat message and uses the SETTINGS block as saved (`MODE` and `INCLUDE_CALENDAR` are Settings values too); chat overrides work only in Preview and manual chat runs. Test the scheduled path with Run now from the Active agents table and read the result under Chats, Automations.
- **Outlook state is manual.** Flags, read state, folders, and anything in your Sent Items (replies, sent requests) cannot be created by the mailer. About a third of the scenarios carry manual steps.
- **Threading is best effort.** Replies set In-Reply-To and References. If the relay rewrites Message-ID, Outlook may not thread them. Send one two-step scenario (for example `--scenario A2-07-orig` then its follow-up) and confirm they share a `conversationId` before relying on thread tests.
- Brevo limits sends per day by plan (the free plan is about 300; check yours). The script stops on login or daily-limit errors instead of retrying.
- **Never send human personas from a no-reply address.** The agent drops mail from a no-reply sender as noise (Step 3), so the seeded asks would vanish. The script prints a `WARN:` line for this and refuses a real send until you fix `SMTP_FROM` (`--allow-no-reply`, or `ALLOW_NO_REPLY=true` in `.env`, overrides it; a dry run only warns). Give the `system` and `newsletter` personas a no-reply sender through `SMTP_ACCOUNTS` and keep `SMTP_FROM` normal-looking.
- **Check once after switching to Brevo:** send `E19-01` and open the received message's source in Outlook. The `Auto-Submitted` and `X-Test-Scenario` headers must be there; if the relay strips them, the header-based automatic-reply tests are not valid. Also confirm the body arrives without an added footer.
- Several scenarios use absolute dates because the plan requires them (A4-08, E11-10, E11-11); update them if you test far from October 2026.

## Safety
- Credentials come from environment variables only and are never printed.
- Recipient is one configured mailbox, checked against `ALLOWED_RECIPIENT_DOMAINS` when set. The email pattern rejects commas, brackets and quotes. SMTP host comes from `SMTP_HOST` (default `smtp-relay.brevo.com`) and must be a relay you control.
- Injection scenarios use the fake address `attacker@example.com`.

## Tests
`npm test`, or `npm run coverage` (fails below 80% lines, 70% branches, 80% functions). Current: 124 tests, about 99% lines.
