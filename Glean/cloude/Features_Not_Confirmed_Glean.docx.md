**Glean Tier 3 Advanced Evaluation**  
**Features Not Confirmed - Full List**

*Every Glean capability that could not be independently verified \- either a marketing claim without documentary backing, or a fact that requires vendor disclosure or hands-on tenant access (Section 4.10.1, "Features Not Confirmed")*

This list totals 46 unconfirmed items across 9 categories. Each is tagged with why it's unconfirmed:

**Marketing Claim Only** \- asserted on Glean's own marketing pages with zero independent or technical documentation backing it up. **Unable to Verify** \- requires hands-on tenant/sandbox access to observe directly. **Vendor Disclosure Needed** \- the fact exists somewhere but isn't published; a vendor rep would need to state it directly.

# **AI / Model Behavior (12)**

| \# | Feature / Claim | Why Unconfirmed | Tag |
| :---- | :---- | :---- | :---- |
| 1 | **Bring Your Own Model (BYOM)** | Model Hub implies customer model choice, but a true self-hosted/custom model registration path is unconfirmed. | *Marketing* |
| 2 | **Model Routing Logic** | That routing happens is implied; the actual automated decision logic (which query goes to which model) has no technical documentation. | *Marketing* |
| 3 | **Grounding (as an enforced mechanism)** | Citations are confirmed; whether grounding is an architectural guarantee or just usually-true behavior is unconfirmed. | *Marketing* |
| 4 | **Agentic RAG** | Multi-hop, agent-driven retrieval is described in marketing terms without a technical explanation of how it differs from standard RAG. | *Marketing* |
| 5 | **Planning Capability** | Agents are described as able to 'plan'; whether a visible, human-reviewable plan actually exists before execution is unconfirmed. | *Marketing* |
| 6 | **Fine-Tuning Capabilities** | No source describes whether customers can fine-tune models on proprietary data. | *Unable* |
| 7 | **Training Data Handling** | Whether customer data is used to train/improve shared models is undocumented. | *Unable* |
| 8 | **Model Update & Versioning** | How and when underlying foundation models get updated, and whether customers are notified, is undocumented. | *Unable* |
| 9 | **Prompt Templates / Versioning (as a governed access feature)** | Exists as an Agent Builder concept; draft/publish or rollback controls for prompts are unconfirmed. | *Unable* |
| 10 | **Hallucination Detection (as a distinct mechanism)** | Guardrails and citations are confirmed; a dedicated detection mechanism for ungrounded claims is not. | *Unable* |
| 11 | **Agent Memory (long-term / cross-session)** | Session-level memory is confirmed to exist; persistence across sessions/days is unconfirmed. | *Unable* |
| 12 | **Reflection / Self-Correction** | No documentation describes agents evaluating and revising their own output before responding. | *Unable* |

# **Agents & Workflow (4)**

| \# | Feature / Claim | Why Unconfirmed | Tag |
| :---- | :---- | :---- | :---- |
| 13 | **Multi-Agent Orchestration** | Referenced generically in two separate places in this research; no orchestration spec, conflict-resolution mechanism, or working example was found in either. | *Marketing* |
| 14 | **Workflow Complexity Ceiling** | No documented limit or spec on conditional logic / branching within an agent workflow. | *Marketing* |
| 15 | **Reasoning Pipeline** | Referenced as an architectural concept in third-party comparisons, without Glean-authored technical detail. | *Marketing* |
| 16 | **Evaluation Framework** | No built-in tooling found for measuring AI-output quality or regression-testing across prompt changes. | *Unable* |

# **Model / Provider Support (4)**

| \# | Feature / Claim | Why Unconfirmed | Tag |
| :---- | :---- | :---- | :---- |
| 17 | **Azure OpenAI Support** | Not individually confirmed in the Model Hub provider list. | *Unable* |
| 18 | **Vertex AI Support** | Not individually confirmed in the Model Hub provider list. | *Unable* |
| 19 | **Local / Self-Hosted Models** | Whether a fully self-hosted inference endpoint is supported is unconfirmed. | *Unable* |
| 20 | **Ollama / Llama / Mistral / DeepSeek** | Specific open-weight model names appear in generic marketing copy, not individually confirmed as selectable. | *Unable* |

# **Architecture (5)**

| \# | Feature / Claim | Why Unconfirmed | Tag |
| :---- | :---- | :---- | :---- |
| 21 | **Caching** | Whether/how repeated queries or embeddings are cached is unconfirmed. | *Unable* |
| 22 | **Context Window** | Depends entirely on whichever underlying model a tenant selects; Glean does not publish its own fixed limit. | *Unable* |
| 23 | **Prompt Assembly** | How retrieved passages and system instructions get combined into the final prompt is undisclosed. | *Unable* |
| 24 | **Memory (Session/Long-term)** | Session and cross-session memory behavior is unconfirmed without a live multi-turn test. | *Unable* |
| 25 | **LLM Routing (the automation itself)** | Same underlying gap as Model Routing Logic above \- no technical documentation of the actual decision automation. | *Marketing* |

# **Multimodal (3)**

| \# | Feature / Claim | Why Unconfirmed | Tag |
| :---- | :---- | :---- | :---- |
| 26 | **Image Processing** | Referenced in a third-party comparison, not confirmed via Glean-authored documentation or a hands-on test. | *Marketing* |
| 27 | **OCR Support** | Whether scanned/image-based PDFs get text-extracted during indexing is unconfirmed. | *Unable* |
| 28 | **Multimodal Support** | Which modalities specifically (images, audio, video) are covered is undefined. | *Marketing* |

# **Security & Compliance (9)**

| \# | Feature / Claim | Why Unconfirmed | Tag |
| :---- | :---- | :---- | :---- |
| 29 | **CCPA** | GDPR is referenced on Glean's legal pages; CCPA-specific language was not found. | *Vendor* |
| 30 | **ABAC (Attribute-Based Access Control)** | RBAC is confirmed; a more granular attribute-based model is unconfirmed. | *Vendor* |
| 31 | **SAML Support** | 'SSO' is confirmed generally; the SAML protocol specifically is not named in any source reviewed. | *Vendor* |
| 32 | **OIDC Support** | Same gap as SAML \- OpenID Connect specifically is unconfirmed. | *Vendor* |
| 33 | **SCIM Provisioning** | Automated user lifecycle management via SCIM is unconfirmed. | *Vendor* |
| 34 | **Audit Logs (completeness/tamper-proofing)** | That some log exists is assumed; retention, completeness, and export capability are undocumented. | *Unable* |
| 35 | **Secrets Management** | How connector credentials and OAuth tokens are stored/rotated internally is undisclosed. | *Unable* |
| 36 | **Audit Trail Completeness** | No documentation on log completeness, tamper-proofing, or retention length. | *Vendor* |
| 37 | **Third-Party Sub-Processors** | No sub-processor list was found published \- typically available on request. | *Vendor* |

# **Pricing & Licensing (2)**

| \# | Feature / Claim | Why Unconfirmed | Tag |
| :---- | :---- | :---- | :---- |
| 38 | **Training & Enablement Cost** | Buyer-side sources bundle this into overall implementation cost without itemizing it separately. | *Vendor* |
| 39 | **Integration Licensing** | Whether connectors/MCP gateway access carry separate per-connector or per-call fees is unitemized. | *Vendor* |

# **Functional / Operational (3)**

| \# | Feature / Claim | Why Unconfirmed | Tag |
| :---- | :---- | :---- | :---- |
| 40 | **Performance Under Load** | Only the documented API rate limit was validated; no concurrent-load or throughput benchmark exists anywhere. | *Unable* |
| 41 | **Infrastructure Requirements** | No specific network/firewall/on-prem requirements were itemized in any source. | *Unable* |
| 42 | **Scalability Architecture** | "Petabytes of enterprise data" is a third-party comparison claim, not an independently benchmarked scale limit. | *Marketing* |

# **Adoption & Explainability (4)**

| \# | Feature / Claim | Why Unconfirmed | Tag |
| :---- | :---- | :---- | :---- |
| 43 | **Non-Technical User Experience** | No sandbox access \- could not directly observe a first-time, non-technical user's experience. | *Unable* |
| 44 | **Audit Trail for AI Actions** | Whether AI-driven actions get their own dedicated, exportable log (distinct from general system logs) is unconfirmed. | *Unable* |
| 45 | **Human-Readable Output** | Inferred from marketing language that citations link to readable source docs; not confirmed via hands-on UI review. | *Unable* |
| 46 | **Confidence Scoring** | No source describes Glean surfacing a numeric or qualitative confidence indicator alongside answers. | *Unable* |

# **Summary**

**Total unconfirmed items: 46**

  \- Marketing Claim Only: 12

  \- Unable to Verify: 25

  \- Vendor Disclosure Needed: 9

*Note: this list excludes connector-catalog gaps (GitLab, HubSpot, LlamaIndex, Zapier/Workato/Boomi/MuleSoft), internal Stratos Edge action items (partner registration/conflicts), and dependent/meta fields \- those are tracked separately in the Blockers & Stuck Items Report. This list is scoped to product-feature claims specifically.*