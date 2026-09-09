**Glean Tier 3 Advanced Evaluation**
**Private / Local Instance Support - Independent Fresh Research (V2)**

*Independent research, sources picked and read fresh this pass, cross-checked 2026-09-09 against `docs.glean.com` and `developers.glean.com`. Field definition: "Feasibility of deploying dedicated or local LLMs/SLMs within private clouds." Base file at [`../Private - Local Instance Support.md`](../Private%20-%20Local%20Instance%20Support.md) left untouched - this is a standalone V2 doc, not an edit of it.*

**Sr No mapping:** rows 1-6 below map 1:1 to the same Sr No in the companion test guide [test/V2/Private - Local Instance Support.md](../../../../test/Glean/4.9.3%20AI%20Architecture%20&%20Models/V2/Private%20-%20Local%20Instance%20Support.md) - same number, same claim, doc-sourced here / tenant-tested there.

---

## Headline

The answer splits sharply by *which layer of the product* you're looking at. **The Admin Console's Model Hub has no private/local/custom-endpoint option - it is a closed list of named commercial cloud providers only.** But **the developer-facing Agent Toolkit does support a genuinely private, on-premises model path**, via NVIDIA NIM microservices - just not reachable through the no-code Admin UI. Treating this as a single yes/no answer would be inaccurate; it depends on whether the evaluator means "can a business admin pick a local model from a dropdown" (no) or "can a developer point Glean at a model running inside our own network" (yes, one documented path).

## Claims (Sr No 1-6, mapped to test guide)

| Sr No | Claim | Source | Detail |
|---|---|---|---|
| 1 | The Admin Console's Model Hub / LLM setup page offers only named commercial cloud providers - no custom endpoint, no self-hosted/on-prem option, no BYOM (bring-your-own-model) | [docs.glean.com/administration/llms](https://docs.glean.com/administration/llms) | Page describes *"a curated set of leading models from providers like OpenAI, Google, Anthropic, and Amazon"* (Meta also now listed as an open-source provider option). Access is either via Glean's Universal Model Key or a Customer Key (BYOK) - but BYOK means bring-your-own-**key** to an existing named provider, not bring-your-own-**model**. No mention anywhere on this page of a custom endpoint, private VPC model, Ollama, vLLM, or any self-hosted inference target. |
| 2 | Cross-cloud restriction exists for Customer Key setups - you're limited to providers reachable from your own chosen cloud, but that's still a named-provider limitation, not a private-model option | [www.glean.com/platform/model-hub](https://www.glean.com/platform/model-hub) (search-corroborated) | With a Customer Key (BYOK), *"access to cloud-hosted providers is limited to your own cloud because cross-cloud access is not supported."* This narrows *which* commercial providers you can reach - it does not open a path to a private/local model. |
| 3 | A genuinely private, on-premises model path exists - but only through the developer-facing Agent Toolkit's NVIDIA NIM integration, not the Admin Console | [developers.glean.com/guides/agents/nvidia-example](https://developers.glean.com/guides/agents/nvidia-example) | Verbatim: *"both Glean and NVIDIA NIM microservices can be deployed in a private environment"*; developers can *"add the `base_url` parameter if you are using privately hosted NVIDIA NIM microservices."* Framed explicitly around data control: *"you can deploy this enterprise chatbot while ensuring that all data remains securely within your control."* |
| 4 | The NVIDIA NIM example's default configuration is NVIDIA's own hosted cloud API, not the private path - private deployment is opt-in, not the out-of-the-box behavior | [developers.glean.com/guides/agents/nvidia-example](https://developers.glean.com/guides/agents/nvidia-example) | Prerequisites list *"An NVIDIA API Key"* from `build.nvidia.com` (NVIDIA's cloud service) as the default starting point; the private-deployment `base_url` override is an additional, explicit configuration step, not the default. |
| 5 | "Private/custom hosting" claims elsewhere in Glean's docs (e.g. for custom connectors) are about a different layer of the product entirely, and should not be read as evidence of private *model* support | [docs.glean.com/connectors/custom/deployment](https://docs.glean.com/connectors/custom/deployment) | Explicit scope statement: *"Glean places no constraints on where a custom connector runs... You can use Glean's managed, containerized option, or run your own job or service and push data through the Indexing API."* This is about custom **connector** (data-source integration) hosting location - the page contains no discussion of hosting the generative model itself. A careless reading of Glean's marketing could conflate this connector flexibility with model-hosting flexibility; the two are unrelated capabilities. |
| 6 | Latency for a private/local inference path is not documented anywhere found this pass | - (absence checked across sources 1, 3, 4) | No page found quantifies expected latency for the NVIDIA NIM private-deployment path, or compares it against the default cloud-API path. This is a genuine gap the evaluation methodology specifically asks about ("Evaluate latency when running local network inference") - it can only be answered by an actual timed test, not documentation research. |

## Independent read: why this needs a nuanced answer, not "Yes" or "No"

- If a client's requirement is *"can our business admins select a locally-run model from the standard Glean Model Hub screen"* - the answer is **No** (claim 1).
- If a client's requirement is *"can Glean technically connect to a model our engineering team runs on our own private infrastructure"* - the answer is **Yes, narrowly**, via one documented developer-level path (claims 3-4), not via the no-code admin surface.
- This is exactly the kind of claim that would be dangerous to answer with a flat "Confirmed" or "Not Confirmed" - the correct entry for this field should state which layer of the product the capability lives in.

## Confidence

**Doc-Verified**, 3 independent sources plus one explicit absence-check (latency), validation date 2026-09-09. No sandbox/tenant access used - everything above is publicly readable without login. Tenant/hands-on verification (including an actual latency measurement) tracked in the companion test guide.

---

## Summary

| Item | Finding | Sr No |
|---|---|---|
| Admin Console (no-code) private/local model option | Does not exist - named cloud providers only | 1-2 |
| Developer-level private/local model option | Exists - NVIDIA NIM microservices via `base_url` override, Agent Toolkit only | 3 |
| Default behavior of that path | Cloud API (NVIDIA-hosted), private deployment is opt-in | 4 |
| Common confusion to avoid | Custom-connector hosting flexibility ≠ private model-hosting support | 5 |
| Latency data | Not documented - requires a real hands-on measurement | 6 |
