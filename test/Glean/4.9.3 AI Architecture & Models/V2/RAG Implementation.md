# 4.9.3 RAG Implementation - Independent Research Test Guide

**Purpose:** Hands-on verification of every claim in the companion research doc [V2/RAG Implementation.md](../../../../Glean/Combined/4.9.3%20AI%20Architecture%20&%20Models/V2/RAG%20Implementation.md). The core finding there is that Glean does use RAG (agentic retrieval, confirmed), but its precise, exact-quote citation capability is real yet **not what you get by default** - it needs a specific API configuration, works only with certain models, and is still labeled beta. This pass also adds two new questions to verify: how the knowledge base is actually kept fresh, and which document formats really index cleanly in your own tenant. This guide's job is to prove all of this with your own eyes. Written so someone with no prior context on this project can pick it up and run it.

**Tenant entry:** Regular Glean Chat/Assistant UI for the plain-language tests · a terminal with `curl` or a Python script for the API-level tests · Admin Console → connector/indexing settings for the knowledge-base tests
**Companion research doc:** [V2/RAG Implementation.md](../../../../Glean/Combined/4.9.3%20AI%20Architecture%20&%20Models/V2/RAG%20Implementation.md)
**Base field doc (untouched, original):** [../RAG Implementation Quality.md](../../../../Glean/Combined/4.9.3%20AI%20Architecture%20&%20Models/RAG%20Implementation%20Quality.md) · **Section pre-flight:** [../Pre-Flight.md](../Pre-Flight.md)

**Prerequisites (what you need before starting):**
- Normal Glean Chat/Assistant access for the UI-level tests (Sr No 1-2, 6).
- A Glean API token and a terminal/script environment for the API-level tests (Sr No 3-5, 7) - this half genuinely needs developer access, since the citation-precision setting isn't exposed in the Chat UI. If you're not a developer, ask one on your team to run those rows and share the raw responses with you, or mark them `Blocked (no API access available)`.
- At least 2-3 test documents you control, ideally from different source systems (e.g. one Google Doc, one PDF, one Notion page), each containing a unique fact you can search for and trace back to an exact sentence.
- For Sr No 9-10: admin/connector-config access, and a small set of test files in a few different formats (e.g. a PDF, a plain image, a JSON file, a CSV) to try indexing.

**Sr No mapping:** Sr No 1-10 below map 1:1 to the same Sr No in the companion research doc's claims table [Combined/V2/RAG Implementation.md](../../../../Glean/Combined/4.9.3%20AI%20Architecture%20&%20Models/V2/RAG%20Implementation.md#claims-sr-no-1-10-mapped-to-test-guide) - same number, same claim, doc-sourced there / tenant-tested here.

**How to record a result:** For each row, write `Pass`, `Fail`, `Partial`, or `Blocked` in the Result column, plus one line in Notes on exactly what you observed. "Pass" means you personally saw it happen - not that the docs say so.

**Effort column:** each row lists an estimated time to complete plus a difficulty tag - `Easy` (routine UI use, quick to judge) or `Hard` (needs API/terminal work or multiple model comparisons) - so you can plan which rows to tackle first.

---

## Section 1 - Does retrieval actually plan and search in parallel, rather than doing one flat search? - Sr No 1-2

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 1 | For a question that requires pulling from multiple different documents/systems, Glean plans out and runs multiple searches rather than doing a single simple lookup | 1. Ask Glean Assistant a question that can only be answered by combining facts from at least 2 of your test documents/systems (e.g. "Compare the deadline mentioned in [Doc A] with the budget mentioned in [Doc B]").<br>2. If available, open any trace/debug view for that request and look at how many separate searches/tool calls were made. | You can see (either from the answer content itself pulling from both sources, or from a trace view) that more than one distinct search/retrieval step happened for a single question - confirming Glean uses RAG. | | | ~15 min, Easy |
| 2 | The model that decides what to search for is not the same model that writes the final answer text - this is a two-stage process | 1. If you have access to any debug/trace view showing internal steps (Admin Console or developer trace tools), run a retrieval-heavy question and inspect the step breakdown.<br>2. Look for evidence of a distinct "retrieval/planning" step followed by a separate "generation" step, rather than one single opaque step. | You can see two distinct phases in the trace (retrieval/search planning, then answer generation) - or, if no trace is visible to you, mark this `Partial` and note that this is an architectural claim you couldn't directly observe from the UI alone. | | | ~15 min, Easy (or Partial without trace access) |

## Section 2 - Is the precise, exact-quote citation feature actually on by default? (the core test) - Sr No 3-4

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 3 | Two citation precision levels genuinely exist: a basic one (whole document only) and a more precise one (exact quoted snippet) | 1. Using the `/chat` API with `curl` or a script, send a grounded question about one of your test documents using default settings (no special `agentConfig`).<br>2. Inspect the raw JSON response for citation fields. | The default response's citation only identifies the document (title/datasource/URL) - no exact quoted snippet field is populated. | | This response is expected to show ONLY document-level citation - that itself confirms half of claim 4 below | ~15 min, Hard (needs API token + terminal/script) |
| 4 | To get the precise, exact-quote citation (not just the document), you must deliberately set `agentConfig.agent` to `"FAST"` or `"ADVANCED"` - it does not happen by default | 1. Repeat the exact same question from Sr No 3, but this time explicitly add `"agentConfig": {"agent": "FAST"}` (or `"ADVANCED"`) to your request.<br>2. Inspect the response again for a `referenceRanges[].snippets[]` array containing actual quoted text from your document. | This second request's response includes an exact quoted snippet from your source document (not just a document link) - while the default request from Sr No 3 did not. This side-by-side difference is the concrete proof of the gap. | | If you don't have API access, do this via any tenant setting/toggle in the Admin Console that controls "agent mode" for chat, if one exists, and note what you found instead | ~10 min, Hard (builds directly on Sr No 3's request) |

## Section 3 - Are there hidden restrictions on when the precise citation actually appears? - Sr No 5

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 5 | Even with the right settings, precise citations only appear for certain answer models and only for enterprise-document-grounded answers, not general knowledge questions | 1. Repeat the Sr No 4 test (Agentic Loop enabled) once using a GPT or Claude-backed model, and once using a different model if your tenant has one enabled (e.g. Gemini or Glean's own model).<br>2. Separately, ask a general-knowledge question with no connection to your own documents (e.g. "What year did WWII end?") with Agentic Loop still enabled. | The GPT/Claude-backed request returns precise snippets; a different model may not (record what you find either way). The general-knowledge question returns no deep-linked snippet, since there's no enterprise document to ground it in. | | | ~20 min, Hard (needs multiple model configurations tested) |

## Section 4 - Does the system honestly admit uncertainty instead of guessing? - Sr No 6

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 6 | When the system isn't confident about an exact snippet match, it falls back to a document-level citation rather than showing a possibly-wrong quote | 1. Ask a question that's grounded in your documents but phrased vaguely or ambiguously enough that an exact matching sentence may be hard to pin down.<br>2. Check whether the citation for that specific claim is a full quoted snippet, or just a document-level link. | You find at least one case where the citation degrades to document-level rather than showing a snippet - and the answer itself doesn't look like it's confidently misquoting a source. | | This is a "does the safety net work" test, not a simple pass/fail on citation precision alone | ~15 min, Easy |

## Section 5 - Confirming feature maturity and the chunking documentation gap - Sr No 7-8

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 7 | The precise citation feature is still labeled beta, and any existing integration that doesn't ask for it will simply never see it, even though the tenant supports it | 1. Ask your Glean account team, in writing, whether deep-linked/precise citations are still in beta for your tenant's plan.<br>2. If your organization has any existing custom integration using the Chat API, check whether it explicitly sets `agentConfig.agent` - if not, confirm with whoever built it that it has therefore never used this feature. | Your account team confirms beta status in writing, and/or you confirm an existing integration has been silently missing this capability the whole time because it never opted in. | | | ~15 min active + wait for account-team reply, Easy |
| 8 | Nowhere in Glean's public developer documentation is the actual document-chunking strategy (chunk size, overlap, method) disclosed | 1. Search `developers.glean.com` yourself for any page describing how documents are split into chunks before being embedded/indexed.<br>2. Ask your Glean account team directly whether they can share chunking parameters (chunk size, overlap, strategy) for your tenant. | You find no public documentation describing this, and your account team either declines to share specifics or confirms this is proprietary/not disclosed externally. | | | ~15 min, Easy |

## Section 6 - Verifying knowledge-base management and real-world format support - Sr No 9-10

| Sr No | Claim | Step-by-step test | Expected result (= Pass) | Result | Notes | Effort |
|---|---|---|---|---|---|---|
| 9 | The knowledge base is refreshed via a real, structured full-crawl/incremental-crawl mechanism, not a one-time load - a changed document should show up as updated within your connector's normal sync window, and a deleted source document should eventually be cleaned up (not remain searchable forever) | 1. Pick one of your test documents and make a small, identifiable edit to it (e.g. add a unique sentence).<br>2. Wait for your connector's normal sync/crawl interval to pass, then search for the new unique sentence in Glean and confirm it appears.<br>3. Separately, delete (or move out of scope) one test document entirely, wait the same interval, and confirm it eventually stops appearing in search results (stale-document cleanup). | The edited content appears in search after the sync window; the deleted document eventually disappears from results - confirming both the incremental-update and stale-cleanup mechanisms work as documented. | | | ~1-2 hrs (mostly waiting on the sync interval), Easy |
| 10 | A representative sample of your organization's real document formats indexes successfully, while formats research found excluded (JSON, XML, images, video, ZIP archives) do not index as searchable content by default | 1. Upload/index one file in each of a few formats you actually use (e.g. PDF, DOCX, a plain image file, a JSON export, a ZIP archive).<br>2. After the sync window, search for unique content from each file and note which ones are findable as full-text-searchable content vs. metadata-only vs. not indexed at all. | Standard office/text formats (PDF, DOCX, etc.) are found as full-text-searchable. Image/video/ZIP/JSON are either not indexed, or indexed as metadata-only (title/filename) if your tenant has that configuration enabled - matching the documented default-exclusion list. | | If your organization has documents in a format not on the "supported" list from research (claim 10), that's a real finding worth flagging directly | ~45 min, Easy |

---

## Result Rollup

Once every row above has a Result filled in, copy the Pass/Fail/Partial/Blocked counts back into the companion research doc [V2/RAG Implementation.md](../../../../Glean/Combined/4.9.3%20AI%20Architecture%20&%20Models/V2/RAG%20Implementation.md). Sr No 3-4's side-by-side JSON comparison is the single most valuable evidence this guide can produce - save both raw responses as supporting artifacts.

| Section | Items | Pass | Fail | Partial | Blocked |
|---|---|---|---|---|---|
| 1. Agentic, multi-step retrieval (confirms RAG usage) | 2 | | | | |
| 2. Default vs. opt-in precise citations | 2 | | | | |
| 3. Model/content restrictions | 1 | | | | |
| 4. Confidence-gated fallback | 1 | | | | |
| 5. Feature maturity + chunking gap | 2 | | | | |
| 6. Knowledge-base freshness + real-world format support | 2 | | | | |
