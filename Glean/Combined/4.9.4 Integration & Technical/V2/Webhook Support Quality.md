**Glean Tier 3 Advanced Evaluation**
**Webhook Support Quality - Independent Fresh Research (V2)**

*Independent research, sources picked and read fresh this pass, cross-checked 2026-09-09 against `docs.glean.com` and `developers.glean.com`. Field definition: "Inbound/outbound webhook event reliability and trigger configurations." Base file at [`../Webhook Support Quality.md`](../Webhook%20Support%20Quality.md) left untouched - this is a standalone V2 doc, not an edit of it.*

**Sr No mapping:** rows 1-7 below map 1:1 to the same Sr No in the companion test guide [test/V2/Webhook Support Quality.md](../../../../test/Glean/4.9.4%20Integration%20&%20Technical/V2/Webhook%20Support%20Quality.md) - same number, same claim, doc-sourced here / tenant-tested there.

---

## Headline

Both directions the field asks about are real, but neither has a documented reliability guarantee. **Inbound** (external system → Glean, e.g. a connector pushing real-time change events) exists with a confirmed URL/secret pattern but no signing-mechanism detail or latency figure. **Outbound** (Glean → external platform, via the Platform Triggers API) is signed and structured (HMAC-SHA256, Standard Webhooks) but is still marked **experimental** and has no documented retry policy. A generic educational blog post about webhook best practices exists but should not be mistaken for a documented SLA on either direction.

## Claims (Sr No 1-7, mapped to test guide)

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 1 | Both directions the field asks about - inbound and outbound - are real, distinct mechanisms in Glean, not one thing described two ways | [docs.glean.com/connectors/native/shortcut/](https://docs.glean.com/connectors/native/shortcut/) (inbound) ; [developers.glean.com/api/platform-api/triggers-overview](https://developers.glean.com/api/platform-api/triggers-overview) (outbound) | Inbound: a connector (e.g. Shortcut) sends change events *to* Glean at a tenant-specific URL. Outbound: Glean's Platform Triggers API sends signed events *from* Glean to a subscriber's own endpoint. Confirmed as genuinely separate systems, not the same feature. |
| 2 | Inbound webhooks (connector-level, confirmed via the Shortcut connector) have a defined URL pattern and a customer-chosen shared secret, but no documented signing-verification mechanism or processing-latency figure | [docs.glean.com/connectors/native/shortcut/](https://docs.glean.com/connectors/native/shortcut/) | Confirmed URL pattern: `https://tenant_id-be.glean.com/instance/SHORTCUT/events` (tenant_id replaced with the real backend URL). Setup requires the customer to *"Choose and enter a unique secret"* - but the page does not explain the cryptographic signing/validation process, and *"the document makes no mention of webhook processing speed, latency metrics, or how quickly Glean handles incoming webhook events."* |
| 3 | Inbound webhook events feed both real-time connector freshness and agent "content triggers" - an agent can be set to run automatically when a connected tool's content changes | Search-corroborated, [docs.glean.com/agents/concepts/triggers](https://docs.glean.com/agents/concepts/triggers) | Content trigger: *"run an agent automatically when something changes in a connected tool, with the changed content passed in as trigger input."* Confirmed as one of only three named agent trigger types on this page (alongside chat-message and input-form triggers) - no separate, general-purpose "webhook" trigger type was found named on this specific page. |
| 4 | Outbound webhooks (Platform Triggers API) are signed, standards-based, and permission-scoped - but remain explicitly experimental | [developers.glean.com/api/platform-api/triggers-overview](https://developers.glean.com/api/platform-api/triggers-overview) | Events delivered as *"Standard Webhooks, signed with HMAC-SHA256, and are scoped to what the subscribing user is permitted to see."* Each trigger subscription receives its own signing secret. Re-confirmed fresh this pass, consistent with earlier research: these endpoints remain marked *"experimental"* and require `X-Glean-Include-Experimental: true` on every request. |
| 5 | No retry policy or delivery guarantee is documented anywhere for the outbound Triggers API specifically | [developers.glean.com/api/platform-api/triggers-overview](https://developers.glean.com/api/platform-api/triggers-overview) | Checked directly: *"The provided content does not specify retry policies or delivery guarantees for webhook events."* A real, checkable gap against this field's own evaluation methodology, which explicitly asks to verify event reliability. |
| 6 | A generic educational blog post about webhook reliability *concepts* exists on Glean's site, but it should not be read as documentation of Glean's own product guarantees | [glean.com/blog/what-are-webhooks](https://www.glean.com/blog/what-are-webhooks) | Content describes general industry practice - *"at least once delivery,"* idempotency requirements, *"Most webhook providers wait only 1–5 seconds for a response"* - phrased as general guidance for building any webhook consumer, not as a statement of Glean's own Triggers API's specific retry count, timeout window, or SLA. Citing this post as if it described Glean's own guarantees would be a sourcing error. |
| 7 | No general-purpose "call this single URL to trigger any agent" public webhook endpoint was found - the closest documented mechanisms are event-source-specific (a named connector's inbound webhook) or trigger-type-specific (content trigger) | [docs.glean.com/tools/custom](https://docs.glean.com/tools/custom) plus claims 2-3 | Checked directly: this page covers custom tools generally but *"does not address: webhook URLs or endpoints for triggering agents, external system integration patterns for agent invocation, webhook authentication methods, webhook payload structures."* Combined with claims 2-3, the accurate picture is per-connector inbound webhooks plus content triggers - not one universal inbound webhook-to-agent endpoint. |

## Independent read

- Claims 1-3 establish the inbound half is real and functional (a tenant can genuinely receive external push events that feed both search freshness and agent triggers), but the *quality* half of this field - signing verification detail, latency - is undocumented.
- Claims 4-5 establish the outbound half is technically well-designed (proper HMAC signing, scoped delivery, Standard Webhooks compliance) but explicitly unfinished from a product-maturity standpoint (experimental flag, no retry/reliability documentation) - consistent with the same "beta/experimental" pattern found elsewhere in this research effort (e.g. deep-linked citations in the RAG field).
- Claim 6 is a sourcing-discipline finding worth keeping visible: it would be easy to accidentally cite Glean's own general "what are webhooks" blog post as if it documented Glean's *own* reliability guarantees - it does not, and doing so would misrepresent the vendor's actual documented commitment level.

## Confidence

**Doc-Verified**, 4 independent first-party sources plus one explicit source-scope caveat (claim 6), validation date 2026-09-09. No sandbox/tenant access used - everything above is publicly readable without login. Tenant/hands-on verification (actual latency measurement for both directions) tracked in the companion test guide.

---

## Summary

| Item | Finding | Sr No |
|---|---|---|
| Inbound vs. outbound both real? | Yes - genuinely separate mechanisms | 1 |
| Inbound: URL/secret pattern | Confirmed (Shortcut example); no signing-mechanism or latency detail | 2 |
| Inbound feeds agent triggers | Yes - "content trigger" type | 3 |
| Outbound: signing/scoping | HMAC-SHA256, Standard Webhooks, permission-scoped | 4 |
| Outbound: maturity | Experimental, header-gated | 4 |
| Outbound: retry/delivery guarantee | Not documented | 5 |
| Reliability blog post | General education only, not a Glean-specific SLA - flag if cited | 6 |
| Universal webhook-to-agent endpoint | Not found - mechanisms are per-connector / per-trigger-type | 7 |
