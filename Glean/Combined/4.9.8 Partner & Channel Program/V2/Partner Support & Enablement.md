**Glean Tier 3 Advanced Evaluation**
**Partner Support & Enablement — Independent Fresh Research (V2)**

*Independent research, sources fetched fresh this pass, checked 2026-09-09 against `glean.com/partners/referral`, `glean.com/partner-get-a-demo`, and a credential-verification platform (Credsverse). Field definition: "Sandbox access, solution architecture support, and co-branded sales materials." Base file at [`../Partner Support & Enablement.md`](../Partner%20Support%20&%20Enablement.md) left untouched — this is a standalone V2 doc, not an edit of it.*

**Sr No mapping:** rows 1-6 below map 1:1 to the same Sr No in the companion test guide [test/V2/Partner Support & Enablement.md](../../../../test/Glean/4.9.8%20Partner%20&%20Channel%20Program/V2/Partner%20Support%20&%20Enablement.md) — same number, same claim, doc-sourced here / tenant-tested there.

---

## Headline

This pass resolves what looked like it could become an internal contradiction: this project's Training Infrastructure V2 field (4.9.6) found no certificate anywhere in the customer-facing "Glean Academy" — but that finding is about a *different* program than the one relevant here. A real, partner-specific "Agent Building Competency" credential exists, issued through Credsverse (a digital-badge/credential-verification platform), alongside two sibling competencies (Custom Connectors, Embedded Experiences) — these are genuine partner certifications, distinct from Glean Academy's customer-education content. Separately, the six named co-branded referral assets are now confirmed with their exact names and descriptions, and the enablement-session content is confirmed, though still with no scheduling or completion SLA published anywhere.

## Claims (Sr No 1-6, mapped to test guide)

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 1 | An enablement session, requested via a dedicated partner demo-request page, covers four named content areas — but no scheduling or completion timeline is published anywhere on that page | [glean.com/partner-get-a-demo](https://www.glean.com/partner-get-a-demo) | Confirmed directly: sessions cover *"Platform demo, Customer use cases and implementation examples, Competitive differentiation and market positioning, Sales resources and ongoing partner support."* The only instruction given is to *"Connect with your Glean partner manager for a comprehensive platform enablement session"* — no SLA for how quickly a session gets scheduled after form submission. |
| 2 | The referral track's public co-branded asset library consists of exactly six named items, now confirmed with their precise names and descriptions — more complete than a general "2-pager, slide deck, security FAQ" summary | [glean.com/partners/referral](https://www.glean.com/partners/referral) | Confirmed directly, full list: **Glean 2-pager** (*"Fast overview of value, use cases, and why customers choose Glean"*), **Introduction to Glean slide deck** (*"High-level product walkthrough for partner and customer conversations"*), **Glean for AI @ Work (3 min)** video (*"Short video explaining how Glean powers enterprise AI experiences"*), **Knowledge Graph blog** (*"Why Glean's Knowledge Graph is critical for search, agents, and AI accuracy"*), **Glean Security FAQ** (*"Answers on permissions, data access, security posture, and compliance"*), and the **Glean Referral Program 1-pager** (*"Rules of engagement, rewards, and how partners earn credit"*). |
| 3 | **Important clarification, resolving an apparent internal tension**: a real, partner-specific "Agent Building Competency" credential exists, issued through Credsverse — a genuine certification, distinct from the customer-facing Glean Academy program this project's Training Infrastructure V2 field (4.9.6) found to carry no certificate | Search-corroborated — [credsverse.com credential listing](https://credsverse.com/issuers/01k2z4nw0mghrrhhpysq48ekx8/credentials/01khpwag2fyn5038gj14pt6f1j) (direct fetch returned HTTP 404 this pass; content confirmed via search-result summary only) | Per search-result summary: *"The Glean Agent Building Competency certifies partner teams to design, build, govern, and operationalize production-grade Glean Agents that automate workflows and deliver measurable business outcomes."* **This does not contradict the Training Infrastructure field's finding** — that field examined "Glean Academy," a customer-facing education series with no certificate; this is a separate, partner-facing competency-certification track issued through a different platform entirely (Credsverse, a digital-credential/badge verification service). The two programs should be described as distinct in any summary, not conflated. Direct fetch of the specific credential page failed (404) this pass — flag for live-browser confirmation. |
| 4 | Two additional partner competencies — Custom Connectors and Embedded Experiences — exist alongside Agent Building, structurally confirmed, though their individual credential pages were not checked this pass | Cross-referenced from this project's Partner Program Details V2 field (claim 5), consistent with this pass's fresh search results | *"Competencies in Agent Building, Custom Connectors, and Embedded Experiences give partners a way to demonstrate specialized capabilities, and give customers more confidence in who they choose."* This pass verified the Agent Building competency's existence specifically (claim 3); the other two should be assumed to follow a similar Credsverse-issued credential model but weren't independently checked. |
| 5 | No SLA or timeline for sandbox/demo-instance provisioning after portal approval was found anywhere checked this pass, reconfirming the base research's "Pending" status as a genuine, still-open gap | Absence-check, fresh search this pass | Neither the referral page, the partner portal blog, nor the partner-get-a-demo page discloses how long sandbox/demo provisioning takes after approval — this remains something only discoverable by actually going through the process. |
| 6 | Stratos's existing evaluation sandbox (`app.glean.com`, a customer tenant) is confirmed distinct from a partner-specific sandbox — a real, practical planning point for anyone assuming the existing eval environment doubles as partner enablement access | Cross-referenced from the base research's own engineering observation, reconfirmed as still relevant | The customer-tenant eval environment used for this project's own hands-on research (elsewhere in this evaluation) is not the same as whatever sandbox/demo provisioning a partner receives post-approval — these should be tracked and requested separately if Stratos needs partner-specific demo access for GTM purposes. |

## Independent read

- Claim 3 is this pass's most important contribution: without it, a careful reader comparing this field against the Training Infrastructure field could reasonably conclude the two fields contradict each other on whether Glean offers certification at all. They don't contradict — they're describing two genuinely separate programs (customer education vs. partner competency certification), and this distinction is worth stating explicitly in any cross-field summary of this evaluation.
- Claim 3's failed direct fetch (404) means the specific credential-requirements detail should be treated as search-corroborated only, not doc-verified — worth a live-browser check before citing the "design, build, govern, and operationalize" language as a direct quote from Glean or Credsverse's own page.
- Claim 2's fully-itemized asset list is useful mainly as a practical checklist — Stratos can now confirm all six items are actually accessible rather than assuming the referral page has "some" co-branded materials.

## Confidence

**Doc-Verified** for claims 1, 2 (direct fresh fetches, verbatim quotes). **Search-corroborated, direct fetch failed** for claim 3 (explicitly flagged, not treated as equally reliable as a direct read). **Cross-referenced** for claim 4. **Absence-check** for claim 5. **Cross-referenced** for claim 6. Validation date 2026-09-09. Tenant/hands-on verification (actual asset downloads, an actual enablement session booked, an actual sandbox-provisioning timing) tracked in the companion test guide.

---

## Summary

| Item | Finding | Sr No |
|---|---|---|
| Enablement session content | Confirmed, 4 named areas; no scheduling SLA | 1 |
| Co-branded asset library | Fully itemized: 6 named assets with descriptions | 2 |
| Agent Building Competency credential | Real, partner-specific — resolves apparent tension with Academy finding | 3 |
| Custom Connectors / Embedded Experiences competencies | Structurally confirmed; not individually checked | 4 |
| Sandbox provisioning SLA | Confirmed absent — still a genuine gap | 5 |
| Eval sandbox vs. partner sandbox | Confirmed distinct — plan for separately | 6 |
