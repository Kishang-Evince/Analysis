# 4.9.5 Incident Response & Notification — Independent Research Test Guide

**Purpose:** Verification of every claim in the companion research doc [V2/Incident Response & Notification.md](../../../../Glean/Combined/4.9.5%20Compliance%20&%20Regulatory/V2/Incident%20Response%20&%20Notification.md). The core finding there is that "incident notification" is actually two separate systems: a public uptime status page, and a private, contractual 72-hour security-breach-notification process — easy to conflate. This guide's job is to confirm the status page directly (research couldn't load it — got blocked), and to get your organization subscribed to real notifications. Written so someone with no prior context on this project can pick it up and run it — entirely browser-based, no developer access needed.

**Tenant entry:** A normal web browser · `status.glean.com` · Admin Console (for the in-product banner check) · your Glean account team
**Companion research doc:** [V2/Incident Response & Notification.md](../../../../Glean/Combined/4.9.5%20Compliance%20&%20Regulatory/V2/Incident%20Response%20&%20Notification.md)
**Base field doc (untouched, original):** [../Incident Response & Notification.md](../../../../Glean/Combined/4.9.5%20Compliance%20&%20Regulatory/Incident%20Response%20&%20Notification.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):**
- A normal web browser (a real browser should succeed where the automated research tool got blocked with an HTTP 403).
- Admin access to the Glean Admin Console, for checking in-product banner behavior.
- Access to your organization's Glean account team, for the breach-notification-specific questions.

**Sr No mapping:** Sr No 1-7 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Incident Response & Notification.md](../../../../Glean/Combined/4.9.5%20Compliance%20&%20Regulatory/V2/Incident%20Response%20&%20Notification.md#claims-sr-no-1-7-mapped-to-test-guide) — same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes on exactly what you found. "Pass" means you personally confirmed it — not that the docs say so.

**Effort column:** each row lists an estimated time to complete plus a difficulty tag — `Easy` (routine browsing, quick to judge) or `Hard` (needs an account-team written answer) — so you can plan which rows to tackle first.

---

## Section 1 — Closing the research gap: loading the status page directly — Sr No 1, 7

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | The status page shows real recent incident history, and the named examples (Vertex AI rate limiting, AWS Bedrock latency, OpenAI auth issue) are accurate | 1. Open `status.glean.com` in your browser.<br>2. Check current system status and browse the incident history.<br>3. Confirm whether the specific incidents named in research (or similar recent ones) appear. | You successfully load the page and confirm real incident history exists, ideally matching or updating the specific examples from research. | | | ~10 min, Easy |
| 7 | Confirm the page actually loads for a normal browser — research's automated tool got a 403 error | 1. Note whether the page loaded normally for you without any block/challenge page. | The page loads normally in a real browser, confirming the 403 was a bot-blocking artifact of automated fetching, not a real access restriction. | | This directly closes the one flagged gap in research | ~5 min, Easy |

## Section 2 — Confirming the notification channels and subscription flow — Sr No 2-3

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 2 | You (or your organization's admin) can self-serve subscribe to status updates, choosing specific components to follow | 1. On the status page, find the subscribe option.<br>2. Subscribe your own email (or your admin's) and select specific components if that option exists.<br>3. Confirm you can also unsubscribe/modify afterward. | You successfully subscribe and confirm the modify/cancel option works. | | Consider actually doing this for real — it's a low-effort, genuinely useful thing to have set up | ~10 min, Easy |
| 3 | Organization-specific issues (affecting only your tenant) do NOT show up on the public status page — confirm this is really the guidance | 1. Re-read the status-page documentation's guidance on localized issues.<br>2. If your organization has ever experienced an org-specific issue, check whether it appeared on the public status page or not. | You confirm org-specific issues aren't expected to appear publicly, and (if applicable) that this matches your organization's actual past experience. | | | ~10 min, Easy |

## Section 3 — Confirming the security-breach process is genuinely separate — Sr No 4-6

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 4 | The public status page is NOT how you'd be notified of an actual data security breach — that's a separate, private, 72-hour contractual process | 1. Look through the status page for any mention of "security breach," "data breach," or "personal data breach" as a category of incident tracked there.<br>2. Ask your Glean account team directly, in writing: *"If a data security breach affecting our organization's data occurred, would we be notified via the public status page, or through a separate, private process? What is that process and its SLA?"* | You confirm the status page doesn't track security breaches as a category, and get written confirmation that breach notification is the separate, private, 72-hour DPA-governed process. | | This is the single most important row in this guide — it locks in the field's central distinction | ~10 min doc check + ~10 min active/wait for reply, Hard |
| 5 | Your organization's actual point of contact for receiving a real security breach notification is clearly known and documented internally | 1. Ask your account team: *"Who specifically at our organization would receive a security breach notification, and through what channel (email address, specific contact)?"*<br>2. Confirm this contact is current and someone who would actually see and act on it (not a generic inbox nobody monitors). | You get a specific, named channel/contact confirmed, and verify it's actively monitored. | | | ~10 min active + wait for reply, Hard |
| 6 | The 5-stage internal incident-response workflow (roles, investigation, communication, recordkeeping, audit) is something your account team can speak to specifically, not just a document you found | 1. Ask your account team: *"Can you walk us through, at a high level, what happens internally at Glean when a security incident is detected — from detection to customer notification?"* | You get a real, specific answer that's consistent with (or adds detail beyond) the 5-stage structure found in research. | | | ~10 min active + wait for reply, Easy |

---

## Result Rollup

Once every row above has a Result filled in, copy the Pass/Fail/Partial/Blocked counts back into the companion research doc [V2/Incident Response & Notification.md](../../../../Glean/Combined/4.9.5%20Compliance%20&%20Regulatory/V2/Incident%20Response%20&%20Notification.md), and specifically record whether the status page loaded successfully (Sr No 7) and your account team's written confirmation of the breach-notification distinction (Sr No 4).

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Status page directly loaded + incidents confirmed | 2 | | | | |
| 2. Notification channels + subscription flow | 2 | | | | |
| 3. Security-breach process confirmed as separate | 3 | | | | |
