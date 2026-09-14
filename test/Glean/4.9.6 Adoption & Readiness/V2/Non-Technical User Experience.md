# 4.9.6 Non-Technical User Experience — Independent Research Test Guide

**Purpose:** Verification of every claim in the companion research doc [V2/Non-Technical User Experience.md](../../../../Glean/Combined/4.9.6%20Adoption%20&%20Readiness/V2/Non-Technical%20User%20Experience.md). The core finding there is that search itself is genuinely simple, but the entry path (Teams/desktop pre-deployed vs. SSO-only) determines the real-world experience more than the UI does. This guide's job is to have an actual non-technical user run the tasks with a stopwatch, and to confirm the independent G2 rating with a live browser since automated fetch got blocked. Written so someone with no prior context on this project can pick it up and run it — uses this tenant's existing stack (Teams, Outlook, Google Drive, Notion) throughout.

**Tenant entry:** Microsoft Teams (Glean sidebar app) · Glean browser extension · Glean desktop app · `app.glean.com` · a normal web browser for the G2 check
**Companion research doc:** [V2/Non-Technical User Experience.md](../../../../Glean/Combined/4.9.6%20Adoption%20&%20Readiness/V2/Non-Technical%20User%20Experience.md)
**Base field doc (untouched, original):** [../Non-Technical User Experience.md](../../../../Glean/Combined/4.9.6%20Adoption%20&%20Readiness/Non-Technical%20User%20Experience.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):**
- A genuine non-technical business user (not an admin, not IT) willing to run timed tasks — "User B hat" per the base doc's convention.
- At least one test document seeded in Google Drive/Notion/OneDrive that this user can search for by name.
- 10 Answers / 5 Go Links seeded per Glean's own go-live guidance (or, if not yet seeded, a chance to observe the "blank slate" experience directly for comparison).

**Sr No mapping:** Sr No 1-17 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Non-Technical User Experience.md](../../../../Glean/Combined/4.9.6%20Adoption%20&%20Readiness/V2/Non-Technical%20User%20Experience.md#claims-sr-no-1-17-mapped-to-test-guide) — same number, same claim, doc-sourced there / tenant-tested here. Rows 10-17 (home-page widgets, Announcements, Team Pages, Pinned Results, Go Links sub-features) added 2026-09-14, crawl-only, not independently re-fetched live this pass — recommend live re-confirmation before finalizing as a client-facing claim.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes on exactly what you observed. "Pass" means a real non-technical user actually did it — not that the docs say so.

**Effort column:** each row lists an estimated time to complete plus a difficulty tag — `Easy` (a few minutes, no special access) or `Hard` (needs a specific role, a fresh/unpinned account, or an external site check) — so you can plan which rows to tackle first.

---

## Section 1 — Testing the entry-path gate directly — Sr No 1

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | A user with Glean pre-deployed in Teams has zero setup; a user without it hits a real IT-request barrier | 1. With your test user's normal Teams account, check whether Glean already appears in the sidebar.<br>2. If it does, note that this reflects an already-deployed org — for a true test, ask IT for a second, freshly-provisioned test account with Glean NOT pre-deployed, and confirm that user sees no Glean option and must explicitly request access.<br>3. Time how long the self-install path (Apps icon → search Glean → Add) takes for a user who does have permission but no pre-pin. | You confirm both experiences directly: instant access when pre-deployed, and a real request-based barrier when not — with actual timing for the self-install path. | | Needs a non-pre-deployed test account to fully verify — flag as Blocked if unavailable | ~20 min (or Blocked without a fresh test account), Hard |

## Section 2 — Timed, stopwatch tasks with a real non-technical user — Sr No 2, 3, 4, 9

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 2 | Plain-text and natural-language search both work with no special syntax required | Have your non-technical test user ask 2-3 questions in plain English (e.g. "what is our PTO policy", "find the Stratos SOW document") with no coaching on filters/operators. Time each, note whether they succeeded unaided. | User completes each search unaided, in under 60 seconds each, with no explanation of query syntax needed. | | Reuse this as your Row 1/3 in the stopwatch table below | ~15 min, Easy |
| 3 | Pre-seeded Answers/Go Links (10 Answers, 5 Go Links) meaningfully improve the first-time experience vs. a blank slate | 1. If your tenant already has Answers/Go Links seeded, have the user ask an HR/ops-type question and confirm an Answer surfaces directly (not just a document citation).<br>2. If not yet seeded, note the difference — does the same question return a generic document search result instead of a direct Answer? | You confirm a real, observable difference in result quality/directness between a seeded Answer and a generic search result. | | | ~10 min, Easy |
| 4 | The desktop app's quick-entry shortcut (Cmd/Ctrl+Shift+J) works as documented and is fast in practice | Have the user install the desktop app (self-install, following the in-product prompt) and time how long it takes to go from pressing the shortcut to seeing a usable search result. | Shortcut works as documented; total time from keypress to result is genuinely fast (a few seconds). | | | ~10 min, Easy |
| 9 | Outlook/Gmail search is permission-aware but bounded by each provider's indexing limits — confirm this doesn't silently mislead the user | Have the user ask a natural-language question about an older email thread (e.g. something from 6+ months ago) and a recent one, and compare results. | You observe whether older threads are found or silently missed, and whether the UI gives any indication of a coverage limit (or is silent about it). | | Cross-referenced finding — this row tests whether the silence itself is real | ~10 min, Easy |

## Section 3 — Confirming the independent G2 rating with a live browser — Sr No 5-8

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 5 | Glean Technologies holds a 4.7/5 rating across 162 G2 reviews, with specific ease-of-use praise | 1. Open `g2.com` in a normal browser and search for "Glean" — carefully confirm you land on **Glean Technologies'** product page, not Glean.ai or another similarly-named listing (see Sr No 7).<br>2. Confirm the star rating and review count.<br>3. Read 3-5 reviews specifically for ease-of-use commentary. | You independently confirm the rating and find ease-of-use praise consistent with research — succeeding where automated fetch was blocked. | | This closes research's one flagged gap | ~15 min, Easy |
| 6 | Reviews also surface a real learning-curve caveat specifically for advanced features and reporting customization | While reading reviews in Sr No 5, specifically look for any mention of a learning curve, advanced-feature complexity, or reporting/customization difficulty. | You find review language consistent with (or contradicting) this specific caveat. | | | Included in Sr No 5's reading, ~0 min extra, Easy |
| 7 | GleanQuote (CPQ software) and Glean.ai (AP/spend company) are different companies that could easily be mistaken for Glean.com in a review search | While on G2 (or a general web search) searching "Glean," note how many *different* companies named "Glean-something" appear in the results, and confirm which one is the actual subject of this evaluation. | You personally observe the name-confusion risk firsthand — useful context for anyone else on the team doing further review research for this vendor. | | Sanity-check row to prevent future sourcing mistakes | ~5 min, Easy |
| 8 | The G2 reviews page loads fine in a real browser — research's automated tool got HTTP 403 | Note whether the page loaded normally for you without any bot-challenge or block page. | The page loads normally, confirming the 403 was a bot-blocking artifact rather than a real access restriction. | | | ~2 min, Easy |

## Section 4 — Home-page widgets, Announcements, Team Pages, Pinned Results, Go Links variants — Sr No 10-17

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 10 | Celebrations widget surfaces new hires/anniversaries with an HRIS-data-quality dependency and a privacy opt-out | 1. On the Glean homepage, locate the Celebrations widget (if enabled) and confirm it shows a real new-hire or anniversary entry for this tenant. 2. In Settings → Privacy, confirm an opt-out toggle exists and test it. | Widget shows real, tenant-accurate people data, and the opt-out toggle works as documented. | | Crawl-only claim — confirm the widget is actually enabled in this tenant first | ~15 min, Easy |
| 11 | Mentions card aggregates cross-app mentions but does NOT support Microsoft Teams | 1. Get @mentioned in a Confluence/Jira/GitHub/Google Drive comment (whichever are in scope) and confirm it surfaces in the homepage Mentions card. 2. Separately, get @mentioned in a Microsoft Teams message and confirm whether it appears (expected: it does not). | Mentions from supported sources appear; a Teams mention does not appear, confirming the documented gap. | | This is a real tenant gap worth flagging given Teams is in-scope for this eval | ~15 min, Easy |
| 12 | Shortcuts is distinct from Go Links, with a browsing-history-based "Top sites" variant | 1. Add a personal Shortcut to a frequently used site and confirm it only appears for you, not company-wide. 2. Enable "Top sites" (if available) and confirm it auto-populates from your own browsing activity. | Shortcut is personal-only (contrast with Go Links); Top sites reflects your actual browsing history. | | Flag the browsing-history data collection to a compliance reviewer | ~10 min, Easy |
| 13 | Announcements supports scheduled, audience-targeted homepage banners with rich media | 1. As an admin, create a test Announcement targeted to a specific Department/Team. 2. Add an inline image and an embedded YouTube/Vimeo/Drive video. 3. Schedule it and confirm it appears/disappears on schedule for the targeted audience only. | Announcement is correctly scoped to the targeted audience, renders the media, and respects the schedule. | | Confirm whether a Teams-push option exists in this tenant (research found none) | ~20 min, Easy |
| 14 | Team Pages is a distinct org primitive from People profiles, admin/moderator-created, with a Team Directory | 1. Open the Team Directory and confirm existing team pages (departments, pods, ERGs) are listed as expandable cards showing up to 6 members. 2. As a non-admin, attempt to create a new team page and confirm you cannot (unless a moderator). | Team Directory is populated and browsable; only admins/moderators can create new team pages. | | | ~15 min, Easy |
| 15 | Individual profile collaboration widgets (At a glance, related people) auto-disable above 50 reports | 1. On your own profile, confirm the "At a glance" and "related people" widgets show real calendar/collaboration data. 2. If you or a colleague has 50+ direct/indirect reports, check whether those widgets are disabled by default on that person's profile. | Widgets work as documented for a normal user; a 50+-report profile shows them disabled by default. | | Relevant to leadership/exec profiles for a healthcare client | ~15 min, Easy (needs a high-report-count profile to fully verify) |
| 16 | Pinned Results forces a chosen existing result to the top for a specific query/audience | 1. From a search-results page, hover a result and use the pushpin icon to pin it for a test query. 2. Set the audience to "Only Me" first, confirm only you see it pinned, then widen to a team audience and confirm others see it too. 3. Confirm a user without access to the underlying item does not see the pin. | Pin appears at top of results only for the intended audience, and never for a user without underlying access. | | | ~15 min, Easy |
| 17 | Go Links: Variable Go Links, Unlisted Go Links, and a Go Links moderator role all function as documented | 1. Create a Variable Go Link (e.g. `go/jira/{*}`) and confirm it correctly redirects with a substituted value. 2. Create an Unlisted Go Link and confirm it's absent from the general Go Links dashboard listing but still resolves directly when the exact link is typed. 3. As an admin, designate a Go Links moderator and confirm they can edit a Go Link marked non-editable by its creator. | All three sub-features behave exactly as documented, including confirming Unlisted is obscurity-only, not real access control. | | Don't conflate Unlisted with genuine permissioning when reporting results | ~20 min, Easy |

---

## Result Rollup

Once every row above has a Result filled in, copy the Pass/Fail/Partial/Blocked counts back into the companion research doc [V2/Non-Technical User Experience.md](../../../../Glean/Combined/4.9.6%20Adoption%20&%20Readiness/V2/Non-Technical%20User%20Experience.md), and specifically log the actual stopwatch times from Section 2 and whether the G2 rating was independently confirmed (Sr No 5).

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Entry-path gate | 1 | | | | |
| 2. Timed non-technical user tasks | 4 | | | | |
| 3. Independent G2 rating confirmed live | 4 | | | | |
| 4. Home-page widgets, Announcements, Team Pages, Pinned Results, Go Links variants | 8 | | | | |

---

## User B hat — stopwatch table (carry over from base test guide)

| # | Surface | Task | Sec | Layout 1–5 | Friction 1–5 |
|---|---|---|---|---|---|
| 1 | Teams sidebar | PTO/policy question + citation | | | |
| 2 | Extension | Find `Stratos_Connector_Test_Doc` | | | |
| 3 | Web Assistant | Gmail/Outlook thread question | | | |
| 4 | Go Link | Resolve `go/stratos-sow` | | | |

Pass question: *Search + chat without training?* Y/N + 1 sentence.
