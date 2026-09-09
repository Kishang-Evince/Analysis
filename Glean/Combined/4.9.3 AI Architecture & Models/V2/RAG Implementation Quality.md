**Glean Tier 3 Advanced Evaluation**
**RAG Implementation Quality — Independent Fresh Research (V2)**

*Independent research, sources picked and read fresh this pass, cross-checked 2026-09-09 against `docs.glean.com` and `developers.glean.com`. Field definition: "Retrieval architecture, vector chunking strategies, and precise citation engines." Base file at [`../RAG Implementation Quality.md`](../RAG%20Implementation%20Quality.md) left untouched — this is a standalone V2 doc, not an edit of it.*

**Sr No mapping:** rows 1-8 below map 1:1 to the same Sr No in the companion test guide [test/V2/RAG Implementation Quality.md](../../../../test/Glean/4.9.3%20AI%20Architecture%20&%20Models/V2/RAG%20Implementation%20Quality.md) — same number, same claim, doc-sourced here / tenant-tested there.

---

## Headline

The retrieval architecture is genuinely agentic (plan → parallel search → ground → generate), and Glean does have a real passage-level "deep-linked" citation capability — but it is **beta, opt-in, and model-restricted**, not the default behavior. Out of the box, a normal chat request gets document-level citations only; the precise, exact-quote citations this field is really asking about require a specific configuration choice most integrations won't make unless told to. Chunking strategy itself — the other half of this field's definition — is not disclosed anywhere found in the developer docs.

## Claims (Sr No 1-8, mapped to test guide)

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 1 | Retrieval is agentic and planned, not a single flat vector search — Waldo decides whether to retrieve, plans the query, and issues parallel targeted searches | [docs.glean.com/administration/assistant/features/adaptive-reasoning](https://docs.glean.com/administration/assistant/features/adaptive-reasoning) | *"Waldo determines whether the question would benefit from a retrieval plan. If so, it issues targeted searches in parallel across your organization's content using a controlled set of tools."* It *"breaks down the question, and figures out the right search tools to call"* before handing results downstream. |
| 2 | The retrieval model and the answer-generating model are architecturally separate — Waldo never writes the user-facing text itself | [docs.glean.com/administration/assistant/features/adaptive-reasoning](https://docs.glean.com/administration/assistant/features/adaptive-reasoning) | Verbatim: *"Waldo never generates user-visible text. The frontier model always runs afterward and is responsible for the final response."* Retrieved evidence is *"passed to the frontier model, which reasons over the initial searches, does its own reasoning, and produces a grounded, cited answer."* |
| 3 | Citations exist at two distinct precision tiers — a document-level baseline, and a newer, more precise "deep-linked" passage/snippet tier | [developers.glean.com/guides/chat/deep-linked-citations](https://developers.glean.com/guides/chat/deep-linked-citations) | Baseline: citations *"traditionally point to entire documents only, showing title, datasource, and URL."* Newer tier: *"exact snippets from the source document that support the preceding statement,"* delivered via a `referenceRanges[].snippets[]` array, each snippet carrying quoted text and an optional `pageNumber`. |
| 4 | The precise (deep-linked) citation tier is **not** the default — it requires explicitly opting into Agentic Loop mode, and a standard/default request gets document-level citations only | [developers.glean.com/guides/chat/deep-linked-citations](https://developers.glean.com/guides/chat/deep-linked-citations) | Requirement stated directly: *"Deep-linked citations are available when your `/chat` request must use Agentic Loop. Set `agentConfig.agent` to `\"FAST\"` or `\"ADVANCED\"`... If omitted, requests default to Chat V2, which does not support deep-linked citations."* |
| 5 | Even with Agentic Loop enabled, precise citations are further restricted to specific answer-generating models and content types | [developers.glean.com/guides/chat/deep-linked-citations](https://developers.glean.com/guides/chat/deep-linked-citations) | Conditions for deep-linked snippets to appear: answers must use *"OpenAI (GPT) or Anthropic (Claude) models"*; content must be *"grounded in enterprise documents (not pure web search/world knowledge)"*; and the underlying model must *"confidently match a snippet."* No mention found of Gemini or Glean's own Waldo/Nemotron path supporting this precise tier. |
| 6 | The system is designed to deliberately fall back to the less-precise document-level citation when snippet-matching confidence is low — a safety choice, not a defect | [developers.glean.com/guides/chat/deep-linked-citations](https://developers.glean.com/guides/chat/deep-linked-citations) | Verbatim: *"Deep-linked citations are not provided for world-knowledge or web-search-only answers. Some citations may intentionally fall back to document-level when matching is uncertain, to avoid misleading users."* |
| 7 | The deep-linked citation feature is recent and still officially in beta at the API level, not a long-established stable capability | Search-corroborated via [docs.glean.com/user-guide/assistant/glean-chat/glean-chat-citations/deep-linked-citations](https://docs.glean.com/user-guide/assistant/glean-chat/glean-chat-citations/deep-linked-citations) and [developers.glean.com/guides/chat/deep-linked-citations](https://developers.glean.com/guides/chat/deep-linked-citations) | Feature availability dated to Q4 2025 onward; REST API support explicitly noted as *"currently in Beta"*. Change is additive/backward-compatible — integrations that ignore the new fields continue working exactly as before, meaning many existing integrations may never surface the precise-citation data even though the tenant technically supports it. |
| 8 | Vector chunking strategy (how source documents are actually split before embedding/retrieval) is not disclosed anywhere found in the developer documentation | [developers.glean.com/libraries/indexing-sdk/concepts/architecture](https://developers.glean.com/libraries/indexing-sdk/concepts/architecture) | This architecture page covers the indexing lifecycle (identity crawl → content crawl → transform → upload) and connector class hierarchy in detail, but contains no mention of chunk size, overlap, or chunking strategy (fixed-size, semantic, sentence-based, etc). This is a direct, named gap against this field's own definition, which explicitly asks about "vector chunking strategies." |

## Independent read

- Claims 1-2 are a genuine architectural strength: separating "decide what to retrieve" from "write the answer" into two different models is a more defensible RAG design than a single-pass system, and it's clearly documented, not just asserted.
- Claims 3-7 are where accuracy really matters: marketing language around "precise, traceable citations" is true, but only under a specific, non-default configuration (Agentic Loop + GPT/Claude + enterprise-grounded content), and the capability itself is still beta. An evaluator who tests with a default `/chat` call and sees only document-level citations hasn't found a bug — they've found the actual default behavior, which is a materially weaker claim than the marketing implies.
- Claim 8 (chunking) is a straightforward, honest gap — it should be reported as "not disclosed," not implied to be either good or bad, since no evidence exists either way.

## Confidence

**Doc-Verified**, 4 independent sources (one confirming an absence — chunking), validation date 2026-09-09. No sandbox/tenant access used — everything above is publicly readable without login. Tenant/hands-on verification (including an actual multi-document citation test) tracked in the companion test guide.

---

## Summary

| Item | Finding | Sr No |
|---|---|---|
| Retrieval architecture | Agentic — plan, parallel search, then ground+generate via a separate frontier model | 1-2 |
| Citation precision tiers | Two: document-level (baseline) and deep-linked/snippet-level (advanced) | 3 |
| Is precise citation the default? | **No** — requires explicit Agentic Loop opt-in (`FAST`/`ADVANCED`); default Chat V2 = document-level only | 4 |
| Model/content restrictions on precise citations | GPT/Claude only, enterprise-grounded content only, confidence-gated | 5 |
| Fallback behavior | Deliberate degrade-to-document-level when match confidence is low | 6 |
| Feature maturity | Beta at API level, dated Q4 2025+ | 7 |
| Chunking strategy disclosure | Not found anywhere in developer docs — genuine gap | 8 |
