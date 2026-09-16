# 4.9.6 Training & Enablement Infrastructure - Independent Research Test Guide

**Purpose:** Verification of every claim in the companion research doc [V2/Training & Enablement Infrastructure.md](../../../../Glean/Combined/4.9.6%20Adoption%20&%20Readiness/V2/Training%20&%20Enablement%20Infrastructure.md). The core finding there is a mismatch: "Glean Academy" sounds like hands-on developer training but is actually a guest-lecture business/leadership speaker series with no certificate, and the developer docs are static, not interactive. Research also found a narrow video-library component and monthly instructor-led sessions, but couldn't confirm their cost/inclusion status, and found no train-the-trainer program or in-app guidance layer anywhere. The one thing research genuinely could not confirm is real community-forum activity - the page is JS-rendered and didn't serve content to automated fetch. This guide's job is to close all of these gaps with a real, logged-in browser session and direct account-team questions. Written so someone with no prior context on this project can pick it up and run it - entirely browser-based, no developer access strictly required (though one section benefits from a developer's perspective).

**Tenant entry:** A normal web browser · `community.glean.com` (may require a Glean/Gleaniverse account to view fully) · `developers.glean.com` · `glean.com/academy-s1` and `/academy-s2` · your Glean account team for pricing/program questions
**Companion research doc:** [V2/Training & Enablement Infrastructure.md](../../../../Glean/Combined/4.9.6%20Adoption%20&%20Readiness/V2/Training%20&%20Enablement%20Infrastructure.md)
**Base field doc (untouched, original):** [../Training Infrastructure.md](../../../../Glean/Combined/4.9.6%20Adoption%20&%20Readiness/Training%20Infrastructure.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):**
- A normal web browser.
- If available, a Gleaniverse/community.glean.com login - some forum content may only render for signed-in users, which would also explain why automated fetch saw only empty structure.
- Nice to have, not required: a developer on your team who can spend 10 minutes confirming whether other pages on `developers.glean.com` besides the one checked in research are also non-interactive.
- For Sr No 11-13: your Glean account team contact, for written cost/program confirmation.

**Sr No mapping:** Sr No 1-14 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/Training & Enablement Infrastructure.md](../../../../Glean/Combined/4.9.6%20Adoption%20&%20Readiness/V2/Training%20&%20Enablement%20Infrastructure.md#claims-sr-no-1-14-mapped-to-test-guide) - same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes on exactly what you found. "Pass" means you personally confirmed it - not that the docs say so.

**Effort column:** each row lists an estimated time to complete plus a difficulty tag - `Easy` (routine browsing, quick to judge) or `Hard` (needs a logged-in session, a developer's judgment, or waiting on an external reply) - so you can plan which rows to tackle first.

---

## Section 1 - Confirming Academy content and the certificate gap - Sr No 1-4

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | An "Explore Academy" section exists on the Gleaniverse community homepage, separate from the Forum | 1. Open `community.glean.com` in your browser.<br>2. Confirm the Academy and Forum sections both appear as described. | You independently confirm the page layout matches research. | | | ~5 min, Easy |
| 2 | Academy Season 1 (academy-s1) is a 3-part guest-lecture series (T-Mobile, Reddit, Pure Storage speakers) with no certificate | 1. Open `glean.com/academy-s1`.<br>2. Confirm the three sessions, speakers, and topics match research.<br>3. Scan the whole page for any mention of a certificate, badge, or credential. | You confirm the content matches, and confirm no certificate is mentioned anywhere on the page. | | | ~10 min, Easy |
| 3 | Academy Season 2 (academy-s2) continues the same guest-lecture, leadership-focused format with no certificate | 1. Open `glean.com/academy-s2`.<br>2. Confirm the three sessions, speakers, and topics match research.<br>3. Scan for any certificate/credential mention. | You confirm the content matches, and confirm no certificate is mentioned. | | | ~10 min, Easy |
| 4 | No certification or credential program exists anywhere on Glean's site - confirm this more broadly than research's own limited check | 1. Search Glean's site (Academy pages, community, docs, and a general site search if available) for "certification," "certificate," or "credential."<br>2. Also ask your Glean account team directly, in writing: *"Do you offer any formal certification or credential program for developers or admins? If not today, is one planned?"* | You confirm no certification program exists via your own broader search, and get a direct written answer from the account team closing the question for good. | | This closes research's biggest hedge - "not found in the sources checked" becomes a real, broader answer | ~15 min search + ~10 min active/wait for reply, Hard |

## Section 2 - Confirming the developer documentation is (or isn't) interactive - Sr No 5

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 5 | Glean's developer documentation is static prose with copy-paste code snippets, not an interactive "try it" quickstart | 1. Open `developers.glean.com/guides/search/overview` and confirm the code-snippet-only format matches research.<br>2. Browse 2-3 other pages under `developers.glean.com` (e.g. other guides, the API reference) and check whether ANY of them have an embedded interactive console, "try it" button, or runnable example with a live endpoint.<br>3. If you have a developer on your team, ask them to do this check instead - they'll recognize an interactive API console immediately if one exists. | You confirm the specific page matches research, and additionally confirm (or contradict) whether the wider docs site has any interactive component anywhere - this broadens research's single-page finding into a real site-wide answer. | | If you find even one interactive page, that meaningfully updates this field's finding - note it clearly | ~20 min, Easy (Hard if you want a developer's judgment specifically) |

## Section 3 - Closing the biggest gap: real community forum activity - Sr No 6-8

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 6 | The community forum has real, visible thread activity - research's automated fetch only saw empty structure (Hot/New/All filters, no posts) | 1. Open `community.glean.com/public/forum` in your browser.<br>2. If prompted, log in with a Gleaniverse/community account (this may be exactly why automated fetch saw nothing).<br>3. Browse the "Hot" and "New" tabs and note: how many threads are visible, how recent the newest ones are, and whether questions appear to get answered (and how quickly). | You see real thread content (this alone updates research's "unconfirmed" status to confirmed), and you form a genuine impression of activity level and response speed. | | This is the single most important row in this guide | ~15 min, Easy (once logged in) |
| 7 | The "Glean Developer Community" group is small - about 24 members as of a July 2025-dated source - and its page may require login to load (research got a 404 without one) | 1. Try `community.glean.com/group/3-glean-developer-community` directly in your browser.<br>2. If it 404s for you too, search within the Gleaniverse site itself (not a search engine) for "Developer Community" to find the current URL.<br>3. Once found, note the current member count and how recently the group had activity. | You either reach the group page and get a current, more accurate member/activity count than research's dated snippet, or you confirm the URL is genuinely gone/renamed. | | | ~10 min, Easy |
| 8 | A "Community Projects" page exists on the developer portal (`developers.glean.com/home/community`) with content research couldn't retrieve | 1. Open `developers.glean.com/home/community` directly.<br>2. Note what's actually there - project showcases, links, discussion, or something else. | You confirm what this page actually contains, resolving research's unretrieved-content gap. | | | ~10 min, Easy |

## Section 4 - Sanity-check on the sourcing traps - Sr No 9, 14

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 9 | Glean Education (gleaneducation.com) is a completely unrelated student-literacy company, not a Glean.com training program | 1. Briefly open `gleaneducation.com` and confirm it's a K-12 literacy-training company with no visible connection to Glean.com's enterprise AI product. | You confirm the two are unrelated, so nobody on your team accidentally cites Glean Education's content as if it were Glean.com's own training material. | | Quick sanity check, not a deep test | ~5 min, Easy |
| 14 | Glean UDS (training.gleanuds.com) is a separate, unrelated organization's training portal, not Glean.com's | 1. Briefly open `training.gleanuds.com` and confirm it belongs to a different organization entirely, unconnected to Glean.com. | You confirm the two are unrelated, closing this pass's newly-flagged sourcing trap. | | Quick sanity check, not a deep test | ~5 min, Easy |

## Section 5 - Closing the SOW's four added questions: video library, instructor-led cost, train-the-trainer, in-app guidance - Sr No 10-13

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 10 | Community Resources offers a real, if narrow, self-service video library ("videos") alongside tips/best-practice articles | 1. On `community.glean.com`, open the Community Resources section.<br>2. Count how many videos are actually there, note their apparent topics/length, and judge whether this is a meaningful self-service library or just a handful of clips. | You get a real, first-hand sense of the video library's depth (count, topics), closing research's "exists but undocumented depth" gap. | | | ~15 min, Easy |
| 11 | Monthly instructor-led sessions (support-team troubleshooting, product-team updates) exist, but whether they're included in your license or cost extra was not confirmed by research | 1. Find and, if possible, attend or review a recording of one of the monthly sessions.<br>2. Ask your Glean account team directly, in writing: *"Are the monthly troubleshooting and product-update sessions included with our license, or is there a separate fee? Are there other instructor-led training options beyond these two, and what do they cost?"* | You get a definitive written answer on cost/inclusion, closing a direct SOW-asked question research could not answer from public docs alone. | | | ~15 min + wait for account-team reply, Hard |
| 12 | No train-the-trainer program exists - confirm this directly rather than relying only on an absence-of-evidence finding | Ask your Glean account team directly, in writing: *"Do you offer any train-the-trainer program, certified-instructor pathway, or internal-champion enablement track? If not today, is one planned?"* | You get a definitive written answer, either confirming the absence (matching research) or revealing a program that should update the research doc. | | | ~10 min active + wait for account-team reply, Easy |
| 13 | No in-app guidance, product tour, or contextual onboarding walkthrough exists inside the actual Glean product | 1. Log into the live Glean product as a new/test user if possible, and look for any guided tour, tooltip walkthrough, or contextual "getting started" overlay on first login.<br>2. If none is visible to you, ask your Glean account team directly whether such a feature exists (even if not visible to your specific role/tenant configuration). | You confirm firsthand whether any in-app guidance layer exists in the product itself - the most direct possible test of this SOW question, better than a documentation search alone. | | This is the SOW's most product-experience-driven question in this field - a hands-on login test beats any documentation search | ~20 min, Easy |

---

## Result Rollup

Once every row above has a Result filled in, copy the Pass/Fail/Partial/Blocked counts back into the companion research doc [V2/Training & Enablement Infrastructure.md](../../../../Glean/Combined/4.9.6%20Adoption%20&%20Readiness/V2/Training%20&%20Enablement%20Infrastructure.md), and specifically record what you found for the forum activity check (Sr No 6), the certification written answer (Sr No 4), and the instructor-led cost/train-the-trainer written answers (Sr No 11-12) - those rows do the most to firm up this field's final rating.

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Academy content + certificate gap | 4 | | | | |
| 2. Developer docs interactivity | 1 | | | | |
| 3. Community forum activity (closes the biggest gap) | 3 | | | | |
| 4. Sourcing-trap sanity checks | 2 | | | | |
| 5. Video library, instructor-led cost, train-the-trainer, in-app guidance | 4 | | | | |
