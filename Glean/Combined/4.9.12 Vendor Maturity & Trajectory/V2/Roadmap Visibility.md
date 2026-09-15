**Glean Tier 3 Advanced Evaluation**
**Roadmap Visibility - Independent Fresh Research (V2)**

*Independent research, sources picked and read fresh this pass, dated 2026-09-14. Field definition: "Does the vendor share a product roadmap? How transparent are they about planned features and timelines?" This is part of a brand-new section, 4.9.12 Vendor Maturity & Trajectory, added 2026-09-14 to close a gap against the contracted SOW (see scrap/GLEAN_RESEARCH_MEMORY.md) - the SOW defines this as Tier 3, same as sections 4.9.1-4.9.11, but it was never built until now.*

**Sr No mapping:** rows 1-6 below map 1:1 to the same Sr No in the companion test guide [test/V2/Roadmap Visibility.md](../../../../test/Glean/4.9.12%20Vendor%20Maturity%20%26%20Trajectory/V2/Roadmap%20Visibility.md) - same number, same claim, doc-sourced here / tenant-tested there.

---

## Headline

This is a genuine, honestly-reportable gap: no public Glean product roadmap was found anywhere in this pass, across docs.glean.com, glean.com, a dedicated site search, and general web search. What exists instead is entirely retrospective - a release-notes changelog and a "product drop" recap series, both of which describe what already shipped, not what's coming. The only forward-looking language found anywhere in this pass or in this project's prior research is a single narrow "coming soon" note inside the Cost Controls admin docs (self-service usage-limit-increase requests, spend forecasting) and one feature's rollout note ("Azure support coming soon" for GPT-6 Astra). Neither is a roadmap in any meaningful sense - both are single-feature footnotes, not a published planning artifact with timelines. This should be reported to the client as an absence-check finding, not papered over.

## Claims (Sr No 1-6, mapped to test guide)

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 1 | No dedicated public roadmap page exists on docs.glean.com | Absence-check, fresh site-scoped search this pass | A `site:docs.glean.com roadmap` search returned only pages that *mention* the word "roadmap" as a customer-workflow example (e.g. an MCP-for-Product-Management doc showing how a *customer* might use Glean to search their *own* product roadmap in a tool like ClickUp/Jira) - none of the results were a Glean product roadmap itself. |
| 2 | No dedicated public roadmap page exists on glean.com/blog or the general glean.com site either | Absence-check, fresh web search this pass | A general search for "Glean AI roadmap public" surfaced blog posts about specific shipped features (e.g. slide/page generation), funding news, and the Glean:GO conference page - no page titled or functioning as a forward-looking roadmap. |
| 3 | The release-notes index (docs.glean.com/release-notes) is purely retrospective - every entry documents something already shipped, dated in the past, with no forward-dated or "planned" entries | [docs.glean.com/release-notes](https://docs.glean.com/release-notes) | Fresh fetch confirms all 44 indexed entries carry past dates (Apr 2025-Sep 2026, the latest being the current month) and describe capabilities in completed-action language ("You can now use..."). This is a changelog, not a roadmap - it tells a buyer what changed, not what's coming next or when. |
| 4 | The "product drop" recap series is also purely retrospective, confirmed via a fresh direct fetch | [glean.com/product-drop](https://www.glean.com/product-drop) | Fresh fetch: *"This page describes only past shipped releases, not upcoming features... The archive lists monthly product drops from July 2026 back through August 2025, all presented as completed updates... No quotes about future plans are present on this page."* |
| 5 | The only forward-looking product language found anywhere in this project's combined research (old or new) is two narrow, single-feature notes - not a roadmap | Cross-referenced from this project's own `scrap/GLEAN_RESEARCH_MEMORY.md` (Tier 2 finding 21, integrated into `4.9.7/V2/Hidden Costs Identified.md` Sr No 11-12) and this pass's `4.9.3/V2/Foundation Models Used.md` Sr No 12 (Azure support "coming soon" for GPT-6 Astra) | The Cost Controls admin docs note two "coming soon" items: self-service usage-limit-increase requests and spend forecasting - both correctly framed elsewhere in this project as not-yet-shipped. Combined with the single-feature Azure-support footnote, this is the entire universe of forward-looking commitment language found across ~90 fields of research (old and new). Neither carries a timeline, and neither constitutes a published roadmap artifact. |
| 6 | Glean does host an annual flagship conference (Glean:GO) that plausibly includes roadmap-adjacent sessions, but this is an event, not a published, ongoing-access roadmap document | Search-corroborated, [glean.com/events/glean-go-2026](https://www.glean.com/events/glean-go-2026) (page not independently fetched this pass; found via search snippet only) | A "Glean:GO 2026" conference page surfaced in search results, described elsewhere as including "product sessions that go deep into their product direction." This is time-boxed, in-person/event-based visibility (typically requiring attendance or a later recap), not a persistently-available, self-service roadmap page a buyer could check at any time - a meaningfully weaker form of transparency than a published roadmap. Not independently fetched this pass; flagged as unconfirmed detail requiring direct verification before citing specifics. |

## Independent read

- This field is a legitimate, low-confidence-by-design finding: the honest answer to "does the vendor share a public roadmap" is no, not a weakly-worded yes. Reporting an absence clearly is more useful to the client than stretching two footnotes into a roadmap claim.
- The practical implication for a buyer: forward planning (e.g. "will X compliance feature ship before our go-live date") cannot be sourced from any public Glean document today - it would need to be obtained directly from an account team or SE, and that verbal/relationship-based commitment should be treated as weaker evidence than a published roadmap with dates.
- This absence is worth explicitly contrasting with Product Release Velocity (the companion field in this same section): Glean is transparent about what it *has already shipped* (strong, frequent, verifiable) but not about what it *plans to ship* (no public artifact found) - these are two different kinds of transparency, and this project has real evidence for one and a genuine gap for the other.

## Confidence

**Absence-check, explicitly flagged** for claims 1-4 (fresh direct fetches/searches, all returning no roadmap). **Doc-Verified** for claim 5 (cross-referenced from this project's own prior confirmed research). **Search-corroborated, unconfirmed detail** for claim 6 (found only via search snippet, not independently fetched). Validation date 2026-09-14. If a client-facing account team later surfaces a private/NDA-gated roadmap through a direct sales relationship, that would not contradict this finding - it would confirm the public-facing gap while adding a private channel, which itself is worth noting as a data point about how Glean manages roadmap communication.

---

## Summary

| Item | Finding | Sr No |
|---|---|---|
| Public roadmap on docs.glean.com | Not found | 1 |
| Public roadmap on glean.com/blog or elsewhere on the site | Not found | 2 |
| Release-notes index | Purely retrospective changelog, not a roadmap | 3 |
| Product-drop recap series | Purely retrospective, confirmed via fresh fetch | 4 |
| Only forward-looking language found anywhere | Two narrow single-feature "coming soon" notes (Cost Controls items, Azure support for GPT-6 Astra) | 5 |
| Glean:GO annual conference | Event-based roadmap-adjacent visibility, not an ongoing published document; detail unconfirmed this pass | 6 |
