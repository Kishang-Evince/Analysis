# Glean Research Memory - Full-Corpus Coverage Audit

*Built 2026-09-14, in response to a user-flagged gap (Glean Chat sub-tree missing from `4.9.1/UI-UX Quality.md`). Purpose: a durable, standalone record of what has and hasn't been checked against the full local Glean documentation crawl, so future work doesn't have to re-derive this diff, and so confirmed gaps aren't lost before they're integrated into the 87-field research corpus.*

## Why this exists

Every one of the 87 V2 fields in `Glean/Combined/<section>/V2/<field>.md` was researched **claim-driven**: each field fetched only the specific pages its own pre-defined question needed. No field ever did a completeness sweep of Glean's full documentation surface. Meanwhile this project also holds a **sitemap crawl** at `scrap/glean/` (three domains, ~3572 Markdown files, `fetched_at: "2026-09-01"`) that was never used as a research source - only as raw material sitting on disk.

Diffing "every URL cited across all 87 field docs" (307 unique) against "every URL in the crawl" (3572 total) found **3325 uncited pages**. Exhaustive row-by-row triage of all 3325 was judged disproportionate; instead this audit prioritized the highest-density, most feature-relevant subtrees plus a live-web spot-check for anything newer than the crawl's Sept 1 cutoff.

## Methodology

1. Extracted every crawled page's `url` frontmatter (`scrap/._audit1.mjs`, `scrap/._audit2.mjs` - temporary scripts, outputs at `scrap/._uncited.json` / `scrap/._uncited_all.json`).
2. Extracted every unique URL cited anywhere in the 87 V2 docs (regex over all `Combined/*/V2/*.md`).
3. Diffed (loose-matched, ignoring `www.` / trailing slash) to get the uncited-page candidate list per subfolder.
4. Prioritized by folder size × feature-density: `docs.glean.com/user-guide` (102 files), `docs.glean.com/administration` (268 files), plus small high-signal folders `www.glean.com/platform` (11 files) and `www.glean.com/product-drop` (8 files).
5. Launched 4 parallel background research agents against these subtrees, each told to draft new Sr-No-format claim rows (not write files), live-refetch high-value pages to confirm currency, and flag anything that looked stale/superseded.
6. Separately asked Agent 4 to check the live web for anything published **after** the crawl's Sept 1, 2026 cutoff.

## Coverage status by subfolder

| Subfolder | Files | Status | Agent |
|---|---|---|---|
| `docs.glean.com/user-guide/assistant/*` (chat, glean-chat/*) | ~15 | Audited | Agent 1 |
| `docs.glean.com/user-guide/knowledge/*` (collections, projects, go-links, pins, home-page, announcements, verification) | ~40 | Audited | Agent 3 |
| `docs.glean.com/user-guide/people/*` (teams, profiles) | ~8 | Audited | Agent 3 |
| `docs.glean.com/administration/protect/*`, `management/alerts/*`, `management/maintenance-windows` | ~20 | Audited | Agent 2 |
| `docs.glean.com/administration/identity/*` (roles, aliases, people-data troubleshooting) | ~15 | Audited | Agent 2 |
| `docs.glean.com/administration/agent-identity/*` (sampled 3 of ~19 integrations) | 3/~19 sampled | Partial | Agent 2 |
| `docs.glean.com/administration/management/features/*` (desktop, mobile, language, dns-go-links, org-chart-export) | ~12 | Audited | Agent 2 |
| `docs.glean.com/administration/platform/embedded-integrations/glean-in-teams/*` | ~6 | Audited | Agent 3 |
| `docs.glean.com/administration/search/*` (access-verification, hiding-content) | ~5 | Audited | Agent 2 |
| `www.glean.com/platform/*` (ai-gateway, cost-controls, intelligence) | 11 | Audited | Agent 4 |
| `www.glean.com/product-drop/*` (Aug 2025-Mar 2026) | 8 | Audited (crawl-only) | Agent 4 |
| Live web, post-crawl (Apr-Sep 2026 releases) | n/a | Checked | Agent 4 |
| `docs.glean.com/tools/*` (132 files) | 132 | Not yet audited | -- |
| `docs.glean.com/agents/*` (41 files, top-level) | 41 | Not yet audited | -- |
| `developers.glean.com/*` (SDK/API reference beyond what individual fields already cite) | large | Not yet audited | -- |
| Remaining `docs.glean.com/administration/*` not listed above | ~200 | Not yet audited | -- |
| Remaining `www.glean.com/*` (blog, customer stories, comparison pages) | ~3000+ | Not yet audited (low priority -- mostly marketing/case-study content, not feature documentation) | -- |

**Bottom line: the highest-value ~450 pages (user-guide, administration/protect+identity+alerts+management, Teams integration, AI Gateway/cost) are now audited. ~3000 remaining pages are mostly blog/marketing/case-study content, judged low-yield for feature-gap discovery -- `docs.glean.com/tools` and `docs.glean.com/agents` are the two known remaining higher-value subtrees if further passes are wanted.**

## Confirmed findings -- consolidated by significance

### Tier 1 -- Corrections to existing claims (highest priority, changes what's already said)

1. **Memory & Personalization** -- Glean now has persistent, cross-session Assistant memory. This corrects/supersedes any existing "no long-term memory" framing in `4.9.1/Features Not Confirmed.md` or `4.9.3/Context Window & Memory.md`. *(Agent 1, live-verified 2026-09-14.)*
2. **A2A protocol support** -- Glean supports Google's Agent2Agent (A2A) protocol as a second interoperability standard alongside MCP. Corrects any "MCP-only" framing in `4.9.9/Coexistence Scenarios.md`. *(Agent 1, live-verified 2026-09-14.)*
3. **Projects is replacing Collections** -- not a rename; a structurally distinct, broader primitive (bundles chats/artifacts/files/URLs, private-by-default vs. Collections' company-wide-viewable default). Existing Collections auto-migrate; Collections pages are marked "Deprecated" in Glean's own docs. **Any existing claim describing Collections as Glean's current org-content primitive needs a staleness flag** -- affects `License Structure Details.md`, `Switching Cost Assessment.md` (x2), Use Case Library files, `Features Confirmed.md`, `Displacement Scenarios.md`, `API Architecture Type.md`. *(Agent 3, live-verified 2026-09-14.)*
4. **GPT-6 Astra added** to Assistant/Agents (Sept 8, 2026 release) -- post-dates the existing Foundation Models Used list (which tops out at GPT-5.6). *(Agent 4, live-verified 2026-09-14.)*
5. **MCP directory grew from 17 to 48 preloaded vendor templates** between March and Sept 2026 drops; March drop's own "tool search" and "Skills/SKILL.md" concepts were never cited anywhere in this project. *(Agent 4, MCP count live-verified; underlying March detail crawl-only.)*

### Tier 2 -- Significant new capabilities (net-new fields or major additions)

6. **Glean Agents in Microsoft Teams** -- Agent Builder agents (not just base search) deploy into Teams chat with real tool execution (ServiceNow/Jira). Max 3 non-default agents per org. Setup requires multi-portal Azure Bot Service registration with a documented Single/Multi-tenant 401 pitfall (healthcare Azure tenants are typically single-tenant -- a real pre-pilot risk). **High tenant relevance** since Teams is in Perimeter Healthcare's in-scope stack. *(Agent 3, crawl-only, recommend live re-confirm -- beta-flagged area.)*
7. **No Microsoft Teams meeting-transcript ingestion found** (Zoom has a documented pattern; Teams does not, anywhere in the crawl) -- a real gap for this tenant's actual meeting platform, worth a direct hands-on test rather than a doc claim.
8. **Operational-resilience alerting** -- mandatory (non-disableable) admin alerts across 7 failure categories; connector-failure alerts framed explicitly as a permissions/compliance risk; LLM-provider-outage alerts with an HTTP-status diagnostic table; a **documented maintenance-window SLA** (up to 90 min downtime, Sat 12:00-1:30pm UTC) with **no customer notification mechanism** -- directly relevant to a 24/7 clinical-ops buyer. *(Agent 2, live-verified 2026-09-14.)*
9. **Palo Alto Networks AI Runtime Security (AIRS) integration** -- a named third-party security-vendor plug-in point for agent guardrails, not previously found in any AI-Specific Governance pass. *(Agent 2, live-verified.)*
10. **Untrusted URL monitoring, Restricted Topics (LLM-judged), Sensitive-content-in-prompt scanning (prompt-only, one-directional)** -- three granular Protect+ guardrail mechanisms materially more specific than the existing AI-Specific Governance doc's 4-category list. *(Agent 2, one live-verified, two crawl-only.)*
11. **AI-security violation export** -- BigQuery export with a deliberate raw-log-vs-scrubbed-export PII split (user_email kept out of scrubbed export) -- relevant to HIPAA audit-trail evaluation. *(Agent 2, crawl-only.)*
12. **Document lookup tool** -- dedicated admin permission-verification tool ("can user X see document Y") distinct from and complementary to the existing Salesforce FLS gap finding. *(Agent 2, crawl-only.)*
13. **Content-hiding CSV bulk mechanism** (up to 500,000 docs, 3 visibility modes, own audit trail) -- additive to, not a duplicate of, the already-documented Governance API kill switch. Explicitly does NOT cover federated/real-time fetch surfaces. *(Agent 2, crawl-only.)*
14. **User aliases / identity stitching** across multiple IdP tenants -- relevant to M&A/multi-domain healthcare-network scenarios; named Entra/Okta attribute mechanics with documented spoofing-risk rationale. *(Agent 2, crawl-only.)*
15. **RBAC governance ratchet** -- Admins cannot touch Super Admin role; first Super Admin grant requires written CISO/Security-Officer authorization (maps to HIPAA Sec164.308 access-authorization expectations). *(Agent 2, crawl-only.)*
16. **Agent Identity spans 19+ named service integrations**, each with a distinct auth mechanism (not a generic "service account" abstraction) -- reinforces existing Implementation Complexity Sr No 1 with mechanism-level detail. *(Agent 2, partial sample -- 3 of 19 read in depth.)*
17. **Desktop/mobile deployment specifics** -- macOS App Store build deprecated (PKG/MDM path only), Windows per-user Intune install, full Intune MAM support without MDM enrollment, **no org-level toggle to disable mobile access entirely**. *(Agent 2, crawl-only.)*
18. **Language support is explicitly tiered/partial** -- Assistant GA only in English/German/Japanese; vendor explicitly warns against inferring broader support from casual multilingual testing; cross-lingual Q&A is early-access only. *(Agent 2, crawl-only.)*
19. **Insights chat / Admin chat** -- natural-language admin-console analytics and self-service help layer, distinct from the Agent Library/Actions catalog already documented. *(Agent 4, crawl-only -- first-party blog, Feb 2026.)*
20. **Glean-vs-Claude-Cowork self-reported benchmark** (78% win rate, 81% lower cost/task) -- a citable but vendor-run, methodology-undisclosed marketing claim; flag as unverified. *(Agent 4, crawl-only.)*
21. **Cost Controls roadmap items** ("coming soon": self-service usage-limit-increase requests, spend forecasting) -- correctly framed as not-yet-shipped. *(Agent 4, crawl-only.)*

### Tier 3 -- Smaller additive findings (lower priority, still real)

22. Go Links: Variable Go Links (URL templating via `{*}`), Unlisted Go Links (obscurity not access control), Go Links moderator role, hard browser-extension dependency confirmed. *(Agent 3, crawl-only.)*
23. Collections sub-features (Subcollections nesting limits, one-way permission inheritance, Headers) -- likely stale given Projects migration (finding 3); low priority to add given finding 3 already flags Collections as deprecated.
24. Pinned Results -- distinct third knowledge-org primitive alongside Answers/Collections; audience-targeted, permission-respecting.
25. Home-page widgets: Celebrations (HRIS-data-quality dependent), Mentions (does NOT cover Microsoft Teams as a source -- a real gap for this tenant), Shortcuts (includes browser-history-based "Top sites").
26. Announcements -- full internal-comms tool with attribute-based audience targeting; no Teams-push equivalent found (Slack push exists).
27. Team Pages -- admin/moderator-created org primitive (departments, pods, ERGs), separate from People profiles.
28. Individual profile customization -- collaboration widgets, auto-disabled at 50+ reports (privacy default relevant to healthcare exec profiles).
29. DNS-based Go Links (Firefox doesn't support bare short-URL Go Links).
30. Org-chart CSV export -- self-service PII export, worth noting for a data-flow/PII-inventory review.

### Checked and explicitly ruled out (not gaps -- do not re-research)

- Real-time collaborative multiplayer workspace -- no new info beyond what's already in `Features Not Confirmed.md`.
- Answers-authoring best-practices page -- pure copywriting guidance, no mechanism.
- AI Gateway / Glean Intelligence pages -- same Model Hub/auto-routing story already covered in `Model Agnosticism.md` + `License Structure Details.md`, just re-branded marketing language, NOT a distinct product.
- 85+ actions, 8 named engineering agents (Feb 2026 drop) -- already fully captured in `API Depth & Writeback.md` and `Pre-Built Templates.md`.
- Verification mechanism -- no new pathway, only a named UI location (`Knowledge -> Verification -> Tasks`) worth a minor addendum.

## Integration status (updated as work lands)

All Tier 1 and Tier 2 findings, plus most Tier 3, are now integrated into the actual 87-field corpus (research doc + paired test guide, matching Sr No, 2026-09-14). 17 research docs + 15 test guides touched, zero unresolved integration misses.

- [x] Memory & Personalization -- `4.9.3/V2/Context Window & Memory.md` Sr No 10-14 (+ test Section 7) + correction note in `4.9.1/V2/Features Not Confirmed.md`
- [x] A2A protocol support -- `4.9.4/V2/API Architecture Type.md` Sr No 7 (+ test Section 5) + correction note in `4.9.9/V2/Coexistence Scenarios.md` (folds in Glean-plugin-vs-MCP distinction + MCP-beta staleness fix)
- [x] GPT-6 Astra -- `4.9.3/V2/Foundation Models Used.md` Sr No 12 (+ test Section 7)
- [x] MCP directory growth (17->48 templates, tool search, SKILL.md) -- `4.9.4/V2/API Depth & Writeback.md` Sr No 8 (+ test Section 6)
- [x] Projects replacing Collections (correction) -- `4.9.1/V2/Features Confirmed.md` Sr No 50-52; staleness-flag follow-up still open against `License Structure Details.md`, `Switching Cost Assessment.md` (x2), Use Case Library files, `Displacement Scenarios.md`, `API Architecture Type.md` (flagged in the Confidence note, not yet actioned in those 5 files)
- [x] AI Answers, Chat Sharing, Contextual Images, Real-Time Voice, Browser History search, Glean Companion, Desktop Quick Chat, 3-knowledge-sources framing, advanced search filter syntax -- `4.9.1/V2/Features Confirmed.md` Sr No 53-61 (+ test Section 9)
- [x] Insights chat / Admin chat -- `4.9.1/V2/Features Confirmed.md` Sr No 62 (+ test Section 10)
- [x] Canvas gap resolved + "Plan" steering control -- `4.9.11/V2/Override & Correction Mechanism.md` (Sr No 3 updated in place, Sr No 6 added; + test Section 2 rewritten)
- [x] Home-page widgets (Celebrations, Mentions-excludes-Teams, Shortcuts), Announcements, Team Pages, profile customization, Pinned Results, Go Links variants -- `4.9.6/V2/Non-Technical User Experience.md` Sr No 10-17 (+ test Section 4)
- [x] Operational-resilience alerting (mandatory alerts, connector/LLM-outage alerts, maintenance-window SLA, Slack side effect), macOS/Windows/mobile deployment specifics, language-support tiering -- `4.9.4/V2/Infrastructure Requirements.md` Sr No 8-16 (+ test Sections 6-13)
- [x] Agent Identity 19-integration breadth -- `4.9.10/V2/Implementation Complexity.md` Sr No 5 (+ test Section 2)
- [x] PANW AIRS integration, Untrusted URL monitoring, Restricted Topics, Sensitive-content-prompt scanning, BigQuery violation export, Findings-dashboard JSONL export, agent-policy test workflow -- `4.9.5/V2/AI-Specific Governance.md` Sr No 9-15 (+ test Sections 6-12)
- [x] Document lookup tool, content-hiding CSV mechanism, RBAC Super Admin ratchet -- `4.9.5/V2/Access Control Granularity.md` Sr No 8-10 (+ test Sections 6-8)
- [x] Identity/alias stitching across IdP tenants, SSO-vs-People-Data decoupling -- `4.9.4/V2/Identity & SSO Integrations.md` Sr No 8-9 (+ test Sections 7-8)
- [x] Claude-Cowork benchmark (flagged as unverified vendor marketing) -- `4.9.9/V2/Honest Strengths.md` Sr No 9 (+ test Section 5)
- [x] Cost Controls roadmap items ("coming soon" usage-request + spend forecasting) -- `4.9.7/V2/Hidden Costs Identified.md` Sr No 11-12 (+ test Section 6); AI Gateway/Intelligence confirmed same-as-Model-Hub, no new claim needed
- [ ] Still open: the Collections-staleness cross-check across the 5 files named above, DNS Go Links + org-chart-export (2 very minor Tier 3 items, low priority, not yet added anywhere)
- [ ] `docs.glean.com/tools/*` (132 files) and `docs.glean.com/agents/*` (41 files) -- not yet audited at all.

## Temporary files still on disk (from this audit)

- `scrap/._audit1.mjs`, `scrap/._audit2.mjs` -- diff scripts (safe to delete once this memory file is trusted as the record)
- `scrap/._uncited.json`, `scrap/._uncited_all.json` -- raw diff output (kept for now in case deeper re-triage of `docs.glean.com/tools` or `/agents` is wanted later)


## SOW-alignment pass (2026-09-14)

Direct comparison of the 87-field V2 corpus against the actual contracted `Exhibit_A_SOW_Stratos AI-Radar_Research_Database_Evince_04_16_2026 1.pdf` (pages 26-41, "Tier 3: Advanced Evaluation") found the corpus had drifted from the contract: one entire section missing, 20 fields missing inside existing sections, ~9 fields renamed/scope-drifted from their SOW names. Fixed via 5 parallel agents (one further fanned into 7 sub-agents):

- **New section 4.9.12 Vendor Maturity & Trajectory** (5 fields: Product Release Velocity, Roadmap Visibility, Customer Retention Signals, Platform vs. Point Solution, Dependency Risk) - built from scratch, 36 claims total.
- **15 new fields in existing sections**: 4.9.3 Training Data Handling (1); 4.9.4 Validated Customer References, Custom Integration Effort, Integration Licensing, Data Flow Architecture, Deployment Complexity Assessment, Scalability Architecture (6); 4.9.5 Financial Services Readiness, FedRAMP Status, Third-Party Sub-Processors (3); 4.9.6 Adoption Measurement Capabilities, Change Management Support (2); 4.9.7 Training & Enablement Cost, Ongoing Maintenance Cost, Cost Comparison Position (3).
- **9 fields renamed to match SOW exactly**, with a re-analysis pass checking the SOW's own description (not just old title) was actually answered - 5 needed only a rename (Model Hosting Validated, Model Selection - Flexibility, RAG Implementation, Actual Pricing Details, Total Cost Projection), 4 needed new claims added to close a real sub-question the old scope missed (Custom Agent Development +4 claims, Model Update & Versioning +1, Private LLM-SLM Availability +2, Training & Enablement Infrastructure +5).

Result: 87 → **107 fields**, 11 → **12 sections**, 692 → **851 claim rows**. Every new/renamed file followed the established Sr No/Claims/Confidence/Summary + paired-test-guide shape. Several fields produced genuine absence-check findings (FedRAMP: not authorized; PCI-DSS/FINRA: not addressed; public roadmap: does not exist; NPS/churn: never published) - reported honestly as gaps needing direct vendor engagement, not fabricated.

**Known residual issue**: agents ran inside a git worktree; brand-new files (the 15+5 new fields) initially landed only in the worktree copy and had to be synced to the main checkout afterward via a direct file-copy pass - confirmed all 41 new files + 5 Overview.md updates landed correctly in the main checkout. The 9 renames landed directly in the main checkout without needing a sync (no worktree-conflict triggered since those paths had no pre-existing worktree copy).

Plan reference: `/home/kishan-gajipara/.claude/plans/validated-fluttering-clarke.md`.


## Client-added xlsx columns (2026-09-16)

Client added 3 new columns to the workbook schema (seen first in their own edited copy `Glean_Analysis_Draft_3.xlsx`): **Confidence Level** (Tested / Vendor-Stated (Unverified) / Estimated), **As-Of Date** (YYYY-MM-DD), **Visibility** (Guarded / Internal Only / Open, fixed per sheet). Implemented in `scrap/build-vendor-comparison-xlsx.mjs`:

- `confidenceLevel(tier)` — maps this corpus's existing Confidence tiers down to the 3-value scheme. Only "Tested"/"hands-on" tiers count as Tested; only "estimat*" tiers count as Estimated; everything else (Doc-Verified, Search-corroborated, Cross-referenced, Absence-check, third-party, ...) is Vendor-Stated (Unverified) — including docs.glean.com sources, since reading vendor docs isn't independent verification. Result: 850 of 851 rows Vendor-Stated, 1 Tested, 0 Estimated — matches the client's own "~830 expected" ballpark.
- `parseDateOverrides`/`parsePrimaryDate` — pulls each doc's own validation date from its `## Confidence` section as the per-field default, with per-Sr-No overrides where a doc explicitly says "Rows/Claims X-Y added YYYY-MM-DD" (a pattern this project's own edits already used consistently). Produced 4 distinct real dates across the corpus (2026-09-08/09/10/14), not one fake blanket date.
- `SECTION_VISIBILITY` — hardcoded per-sheet map exactly matching the client's table (4.9.8 Internal Only, 4.9.10/4.9.11 Open, rest Guarded).

Workbook is now 9 columns: Sr No | Claim/Feature/Finding | Source | Confirmation Detail | Confirmation Notes | Check Required | Confidence Level | As-Of Date | Visibility.


## Confidence Level + Confirmation Notes fill pass (2026-09-16)

Filled Confidence Level + rewrote Confirmation Notes for all 792 `Check Required: No` rows in `Client Drafts/Glean_Analysis_Draft_3.xlsx` (the client's live working copy, project root now `/home/kishan-gajipara/Kishan/Files/Stratos AI/Analysis`). `Check Required: Yes` rows (59) left untouched per client's explicit scope.

Method: piloted on 10 rows first (got client sign-off on tone), then dispatched 7 parallel agents by section, each doing pure classification+writing (no xlsx access) — output JSON only, to avoid concurrent writes corrupting the shared file. Merged all 7 outputs myself in one script with cross-validation against each sheet's original rowNum set (caught that "rowNum" is per-sheet not global — two agent outputs combined multiple sheets, required positional-split-with-validation during merge, not a naive rowNum lookup).

Confidence Level distribution: 781 Vendor-Stated (Unverified), 6 Tested, 9 Estimated (of 786 newly filled + 6 from the pilot). Confirmation Notes: one unique, human-written sentence per row, first-person-plural, referencing the actual source/claim specifics — explicitly must NOT contain the literal phrase "Vendor-Stated (Unverified)" or "Confidence Level" (verified: zero occurrences of the real tier-name phrases; natural English use of words like "unverified" in a sentence is fine and expected).

Client feedback incorporated: notes don't follow one template (varied per-row), and never restate the Confidence Level value inside the note text.
