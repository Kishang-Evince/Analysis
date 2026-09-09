**Glean Tier 3 Advanced Evaluation**
**Certifications Validated - Independent Fresh Research (V2)**

*Independent research, sources picked and read fresh this pass, cross-checked 2026-09-09 against `docs.glean.com`, `www.glean.com`, and `trust.glean.com`. Field definition: "Verified third-party security audits (e.g., SOC 2 Type II, ISO 27001, ISO 42001)." Base file at [`../Certifications Validated.md`](../Certifications%20Validated.md) left untouched - this is a standalone V2 doc, not an edit of it.*

**Sr No mapping:** rows 1-6 below map 1:1 to the same Sr No in the companion test guide [test/V2/Certifications Validated.md](../../../../test/Glean/4.9.5%20Compliance%20&%20Regulatory/V2/Certifications%20Validated.md) - same number, same claim, doc-sourced here / tenant-tested there.

---

## Headline

A genuine sourcing trap surfaced during this pass and needs to be flagged prominently: **"Glean.ai" (glean.ai) is a completely different company from "Glean" (glean.com)** - an accounts-payable spend-intelligence startup, not the enterprise search/AI platform this entire research effort covers. Search results repeatedly surfaced Glean.ai's own SOC 2 Type I/Type II press releases, which must never be cited as evidence for glean.com's certifications. Separately, the actual Trust Portal (`trust.glean.com`) is not readable via a simple page load - it's gated/JS-rendered - meaning the field's own evaluation methodology ("audit standard SOC 2 compliance reports") can only be completed by actually requesting access, not by browsing public pages.

## Claims (Sr No 1-6, mapped to test guide)

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 1 | Glean (glean.com) holds SOC 2 Type II, ISO/IEC 27001, and ISO/IEC 42001:2023 certifications | Search-corroborated, consistent across multiple glean.com-domain sources including [docs.glean.com/security/agent-sandbox-ptc](https://docs.glean.com/security/agent-sandbox-ptc) | *"Glean is SOC 2 Type II certified"*; *"certified to ISO/IEC 27001, the leading global standard for information security management"*; *"certified to ISO/IEC 42001:2023, the leading international standard for AI management systems."* The specific "2023" version-year for ISO 42001 is a useful precision detail not always stated elsewhere. |
| 2 | **A real, serious sourcing trap exists and must be flagged**: "Glean.ai" is a completely different company from "Glean" (glean.com) - its SOC 2 press coverage must never be cited as glean.com's own certification evidence | Independently verified this pass via direct comparison of company descriptions | Glean.ai: *"Accounts Payable Spend Intelligence"* - a finance/spend-management company. Glean.com: *"enterprise AI platform that connects company knowledge, powers search, answers, and AI agents."* Two unrelated companies with confusingly similar names; press releases like *"Glean.ai Secures SOC 2 Type II Certification"* and *"Glean AI Completes SOC 2 Type 1 Attestation with Laika"* are about the finance company, not the vendor this research covers. |
| 3 | Certifications are explicitly stated to extend to specific product surfaces, not just asserted generically for "the platform" as a whole | [docs.glean.com/security/agent-sandbox-ptc](https://docs.glean.com/security/agent-sandbox-ptc) | Directly fetched and confirmed, verbatim: *"Glean's platform-level compliance certifications extend to Agent Sandbox: SOC 2 Type II, ISO 27001, ISO 42001, HIPAA, GDPR, TX-RAMP Level 2."* This is a specific, checkable scope statement - naming a particular feature (Agent Sandbox) and confirming the certification umbrella covers it explicitly, rather than leaving scope ambiguous. |
| 4 | Compliance documentation (SOC 2 reports, ISO certificates) is distributed through a dedicated Trust Portal, with at least some content gated by NDA | Search-corroborated | *"Compliance documentation (e.g. SOC2) and other content under NDA is available via the Glean Trust Portal."* Not all documentation is described as freely public - some requires an NDA to access. |
| 5 | The Trust Portal itself could not be read via a direct, simple page fetch this pass - it returned only a page title with no content, consistent with a gated or JavaScript-rendered access flow | [trust.glean.com](https://trust.glean.com) and [trust.glean.com/resources](https://trust.glean.com/resources), both fetched directly | Both attempts returned only the literal page title *"Glean Trust Center"* with no document list, certificate details, or access buttons visible to a simple fetch. This is itself a real, checkable finding for this field's evaluation methodology (which asks to "request and audit" reports) - a tester should expect to need an actual account/request flow, not a browsable public page. |
| 6 | No certificate expiration date, specific auditor firm name, or specific audit period was found published on any page that could be directly fetched this pass | Absence checked across claims 1, 3-5 | The exact "active scope" language this field's evaluation methodology asks to verify (dates, auditor, period) was not found on any publicly-reachable page - obtaining it requires actually going through the Trust Portal's request process, which is consistent with claim 4's NDA-gating. |

## Independent read

- Claim 2 is the single most important finding in this doc, precisely because it's an easy mistake to make and would be a real credibility problem if it slipped into a client-facing deliverable - a naive search for "Glean SOC 2" surfaces glean.ai's press releases prominently, and they read as plausible at a glance.
- Claims 4-5 together mean this field genuinely cannot be fully closed by documentation research alone - the Trust Portal's actual content (scope, dates, auditor) is intentionally gated, and the companion test guide is built around actually requesting access rather than assuming public visibility.
- Claim 3's Agent Sandbox-specific scope statement is a good model for how this field should be answered generally: not just "Glean has these certifications" but "these certifications are confirmed to cover this specific surface."

## Confidence

**Doc-Verified** for claim 3 (directly fetched, verbatim). **Search-corroborated, consistent across multiple sources** for claims 1, 4. **Independently verified via direct research** for claim 2 (the company-confusion finding). **Confirmed absence via direct fetch attempt** for claim 5. Validation date 2026-09-09. Tenant/hands-on Trust Portal access tracked in the companion test guide.

---

## Summary

| Item | Finding | Sr No |
|---|---|---|
| Certifications held | SOC 2 Type II, ISO 27001, ISO 42001:2023 | 1 |
| Sourcing trap | Glean.ai ≠ Glean.com - different companies, don't cite Glean.ai's certs | 2 |
| Scope statement example | Explicitly confirmed to cover Agent Sandbox | 3 |
| Documentation access | Trust Portal, NDA-gated for some content | 4 |
| Trust Portal readability | Not fetchable via simple page load - gated/JS-rendered | 5 |
| Dates/auditor/period published? | Not found anywhere publicly reachable | 6 |
