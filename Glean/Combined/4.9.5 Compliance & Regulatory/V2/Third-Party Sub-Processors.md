**Glean Tier 3 Advanced Evaluation**
**Third-Party Sub-Processors - Independent Fresh Research (V2)**

*Independent research, sources picked and read fresh this pass, dated 2026-09-14. Field definition: "Who are the vendor's sub-processors? Where are they located? Are they disclosed proactively or only on request?" Base file: none exists yet - this is a new field added to close a gap against the contracted SOW (see scrap/GLEAN_RESEARCH_MEMORY.md).*

**Sr No mapping:** rows 1-6 below map 1:1 to the same Sr No in the companion test guide [test/V2/Third-Party Sub-Processors.md](../../../../test/Glean/4.9.5%20Compliance%20&%20Regulatory/V2/Third-Party%20Sub-Processors.md) - same number, same claim, doc-sourced here / tenant-tested there.

---

## Headline

Glean maintains a **proactively published, named sub-processor list** at `www.glean.com/legal/subprocessors` - a genuinely strong finding for this field. The page lists 19 named third-party sub-processors (mostly US-based cloud/LLM providers and support-tooling vendors) plus one Glean affiliate entity in India providing remote support access. This is meaningfully better than the gated/JS-rendered Trust Portal pattern found for certifications - the sub-processor list is a plain, directly fetchable public page.

## Claims (Sr No 1-6, mapped to test guide)

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 1 | Glean proactively publishes a named sub-processor list at a stable public URL, not gated behind login or NDA | [glean.com/legal/subprocessors](https://www.glean.com/legal/subprocessors) (directly fetched) | The page was directly fetched and returned full content with no authentication barrier - a table of named entities, their purpose, and location. This directly answers the field's "disclosed proactively or only on request?" sub-question: proactively, via a public page. |
| 2 | 19 named third-party sub-processors are listed, spanning cloud/LLM infrastructure, customer support tooling, and communications, almost entirely US-located | [glean.com/legal/subprocessors](https://www.glean.com/legal/subprocessors) (directly fetched) | Full list as fetched: Palo Alto Networks (AI security - Prisma AI Runtime Security), Amazon Web Services (Cloud/LLM Provider), Google LLC (Cloud/LLM Provider), Microsoft Corporation (Cloud/LLM Provider), Intercom (customer support), Twilio (communications), Salesforce (CRM), Slack Technologies (customer communications), Zendesk (support portal), SendGrid (email), Anthropic PBC (LLM Provider), Baseten Labs (LLM Provider), Fireworks.ai (LLM Provider), Groq (LLM Provider), Modal Labs (LLM Provider), OpenAI OpCo (LLM Provider), Snowflake (LLM Provider), Brave Software (Search), Deepgram (speech-to-text transcription), Exa Labs (web crawling/rendering). All are listed with "United States" as location. |
| 3 | One Glean affiliate entity - not a third-party sub-processor - is separately disclosed as having remote access for support purposes, located in India | [glean.com/legal/subprocessors](https://www.glean.com/legal/subprocessors) (directly fetched) | Listed under a distinct "Affiliate" heading: *"Glean Search Technologies India Private Limited - Remote access for support, security, and debugging (India)."* Distinguishing this from the main sub-processor table is a meaningful nuance this field should capture - it's Glean's own subsidiary, not an external vendor, but it does represent a data-access point located outside the US. |
| 4 | The AWS, Google, and Microsoft cloud/LLM entries note that customers retain some discretion over location selection for certain providers | [glean.com/legal/subprocessors](https://www.glean.com/legal/subprocessors) (directly fetched) | The page marks these three entries with an asterisk annotation indicating "customers retain discretion over location selection for certain providers" - meaning the "United States" location listed is not necessarily fixed/exclusive for every customer, depending on regional deployment configuration chosen. |
| 5 | The sub-processor list carries a visible "Last Updated" date, and the underlying DPA (Data Processing Addendum) is versioned and separately published, with at least one documented addition event (Baseten Labs, Modal Labs) | Search-corroborated; [assets.glean.com DPA PDF](https://assets.glean.com/marketing/Legal/Glean%20Technologies%2C%20Inc.%20DPA%20Mar%206%202026%20(Online).pdf) | The subprocessors page shows "Last Updated: July 28, 2026." Separately, search results surfaced DPA text stating Glean "maintains a current list of Subprocessors required to provide and maintain the Service" in Annex III of Exhibit A, and specifically that Glean "is updating its list of subprocessors to add Baseten Labs, Inc., and Modal Labs, Inc." - both of which do appear in the current live list (claim 2), confirming the list is actively maintained and changes are tracked. |
| 6 | No explicit customer-notification mechanism (e.g., advance email alert before a new sub-processor is added) was found stated on the public page itself | Absence checked on [glean.com/legal/subprocessors](https://www.glean.com/legal/subprocessors) | The directly-fetched page content contained the list itself and a "Last Updated" date, but no visible statement describing *how* customers are notified of additions/changes (e.g., "customers will receive 30 days' notice by email before a new sub-processor is added"). This is a genuine gap in what's publicly stated - the DPA PDF itself (a longer legal document) may contain a formal notification clause not captured in this pass's page-level fetch, so this is flagged as needing direct confirmation rather than a fully closed absence. |

## Independent read

- This field came back with unusually strong, directly verifiable public information compared to the other 4 new fields in this research pass - worth noting explicitly, since most of this pass's other fields (FedRAMP, PCI-DSS/FINRA/SEC, change management playbooks) turned up genuine absences. Sub-processor transparency is a real strength to report.
- The India-based Glean affiliate (claim 3) is the single most client-relevant nuance in this doc - it means "remote access for support/security/debugging" can originate outside the US even though every third-party sub-processor is listed as US-located. For a healthcare client evaluating data residency/access exposure, this is the detail worth surfacing prominently rather than letting the "mostly US" headline overshadow it.
- The notification-mechanism gap (claim 6) is a good candidate for the companion test guide's direct-question row - the DPA PDF itself should be pulled in full (not just search-snippet content) to check for a formal notice clause before concluding it's absent from Glean's contractual commitments, not just absent from the marketing page.

## Confidence

**Doc-Verified**, directly fetched, for claims 1-4 (the live subprocessors page). **Search-corroborated, cross-checked against the live page** for claim 5 (DPA update history, confirmed consistent with current list contents). **Confirmed absence on the page-level fetch, but not yet checked against the full DPA PDF text** for claim 6 - flagged as needing the full DPA document review, which the companion test guide includes as a follow-up step. Validation date 2026-09-14, 2 independent sources (live subprocessors page + DPA-referencing search results).

---

## Summary

| Item | Finding | Sr No |
|---|---|---|
| Disclosure method | Proactive, public page - no login/NDA required | 1 |
| Sub-processor count | 19 named third-party entities | 2 |
| Locations | Nearly all "United States"; one India-based Glean affiliate for support access | 2, 3 |
| Customer location discretion | Yes, for some cloud/LLM providers (AWS/Google/Microsoft) | 4 |
| List maintenance | Actively updated, dated, changes traceable via DPA | 5 |
| Change-notification mechanism | Not stated on the public page - needs full DPA PDF review | 6 |
