**Glean Tier 3 Advanced Evaluation**  
**Feature Maturity Assessment**

*Every confirmed Glean capability sorted into a maturity tier, with the evidence behind each placement (Section 4.10.1, "Feature Maturity Assessment")*

This assessment sorts 19 feature areas into four maturity tiers \- not by how impressive a feature sounds, but by how much independent evidence exists that it actually works reliably at scale. "Production/Mature" means independently corroborated (G2, hands-on testing, sustained release history). "Beta/Actively Evolving" means real and documented, but with the vendor's own caveats about instability. "Emerging" means genuinely new \- discovered only on the most recent re-verification pass \- with no adoption evidence yet either way. "Undetermined" means the concept is confirmed to exist, but nothing at all is known about its maturity.

# **Production / Mature (7)**

*Stable, widely deployed, backed by independent evidence \- not just vendor docs.*

| Feature Area | Maturity Evidence |
| :---- | :---- |
| **Core Search (hybrid semantic \+ keyword, ranking, faceted filtering, autocomplete)** | G2 4.7/5 aggregate (160-185+ reviews) plus a 9.5/10 'Ease of Use' sub-score across multiple independent comparison pages \- corroborated across many independent sources, not just Glean's own claims. |
| **Native connectors \- Salesforce, Microsoft 365/SharePoint/Teams/Outlook, Google Workspace, Slack, Jira, Confluence, GitHub, Zendesk, ServiceNow** | Long-standing, listed consistently across vendor docs and third-party comparisons over an extended period \- not a recent addition. |
| **Client API \+ Indexing API** | SDK has 80 Python releases / 86 TypeScript releases over roughly 14 months \- a mature, active, well-established release cadence. |
| **Streaming Chat responses** | Core, long-established product surface referenced consistently since the earliest sources reviewed. |
| **Authentication (OAuth2, API key)** | Hands-on tested directly against the live API and confirmed working exactly as documented. |
| **Rate limiting (30 qpm token-bucket \+ 429 backoff)** | Hands-on tested \- the documented behavior matched observed behavior precisely, including backoff timing. |
| **Security certifications (SOC 2 Type II, ISO 27001, ISO 42001, HIPAA)** | An established, externally audited compliance program \- certifications are earned over time, not toggled on. |

# **Beta / Actively Evolving (4)**

*Real and documented, but with explicit vendor caveats or visibly-in-flux scope.*

| Feature Area | Maturity Evidence |
| :---- | :---- |
| **Agents API (Client API version)** | The SDK's own README warns of breaking changes without a major version bump, and implements only a 'subset' of the LangChain Agent Protocol \- the vendor itself signals this isn't fully settled. |
| **Agent Toolkit** | Open source and actively expanding \- genuinely useful today, but young enough that its interface should be expected to shift. |
| **MCP Gateway (176 third-party servers)** | Actively expanding per the most recent snapshot found (June 2026\) \- the count itself is a moving target, a sign of a still-growing feature. |
| **12 first-party "action packs"** | Materially narrower than the 100+ search-connector count \- suggests a newer, still-limited rollout relative to the mature search-connector catalog. |

# **Emerging / Newly Discovered (4)**

*Documented and real, but too new (to this research) to have independent adoption evidence yet.*

| Feature Area | Maturity Evidence |
| :---- | :---- |
| **Platform API (separate from Client API)** | Only discovered on live re-verification in September 2026; its Agents resource overlaps unexplained with the Client API's own Agents resource \- a classic sign of a platform mid-transition, not a settled architecture. |
| **Triggers / Webhooks system** | Well-designed (signed payloads, preview-before-create, pause/resume) but brand new to this research \- no evidence yet of how widely it's actually used in production by real customers. |
| **"Skills" API resource** | Confirmed to exist in the navigation/reference; zero further documentation, examples, or usage evidence found beyond its existence. |
| **Agent Specification document \+ NVIDIA NIM integration example** | Signals active investment in the agent ecosystem, but no independent adoption evidence exists yet for either. |

# **Undetermined Maturity (4)**

*Concept confirmed to exist, but no signal at all on how mature or stable it actually is.*

| Feature Area | Maturity Evidence |
| :---- | :---- |
| **Multi-LLM routing logic (the automation itself, not the model menu)** | That models can be chosen is confirmed; whether the routing decision is automated, rule-based, or manual is entirely unconfirmed \- no maturity signal either way. |
| **Fine-tuning, training data handling, model update/versioning** | All three are simply undocumented \- there isn't even a marketing claim to assess maturity against. |
| **ABAC, SCIM, explicit SAML/OIDC** | RBAC and generic 'SSO' are confirmed and mature; these more specific, granular mechanisms are neither confirmed present nor absent. |
| **Multimodal support, OCR, image processing** | Referenced only in third-party comparisons, never in Glean's own technical documentation \- no basis yet to assess how developed these are. |

# **Bottom Line for Stratos Edge**

**Trust Search \+ core connectors \+ Client/Indexing APIs for production workloads today. Treat Agents, the MCP gateway, and action packs as capable but still-maturing \- pilot before committing critical workflows to them. Treat the Platform API / Triggers / Skills cluster as too new to size risk on \- this needs a direct vendor conversation, not just documentation review, before relying on it for anything customer-facing or business-critical.**

*Total feature areas assessed: 19  \-  7 Production/Mature, 4 Beta/Evolving, 4 Emerging, 4 Undetermined.*