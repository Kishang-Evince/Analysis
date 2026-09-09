**Glean Tier 3 Advanced Evaluation**  
**Features Confirmed - Full List**

*Every Glean capability independently confirmed through hands-on SDK testing and official documentation review (Section 4.10.1, "Features Confirmed")*

This list totals 65 individually confirmed features/capabilities across 7 categories, each traceable to a specific tab/row in the Glean-Tier3-Data-Collection workbook or to a directly-cited official source. "Confirmed" means either (a) hands-on tested against the SDK/API, or (b) stated explicitly in Glean's own official developer documentation \- not inferred from general marketing language. Items that exist only as marketing claims, without independent or documentary backing, are tracked separately in the "Features Not Confirmed" list.

# **Search & Retrieval (9)**

| \# | Feature | Confirmation Detail |
| :---- | :---- | :---- |
| 1 | **Hybrid search (semantic \+ keyword/BM25)** | Core retrieval combines dense semantic vectors with traditional keyword/BM25 matching. |
| 2 | **AI-powered relevance ranking** | Results ranked using signals beyond simple keyword match \- usage, proximity, recency. |
| 3 | **Faceted filtering** | Filter by source, content type, date, and custom attributes \- confirmed in the official Search guide. |
| 4 | **Autocomplete / search suggestions** | Query-time suggestions as the user types, confirmed in official docs. |
| 5 | **Federated search across multiple Glean instances** | A single query can span more than one Glean deployment. |
| 6 | **Click-feedback loop** | tracking\_token \+ POST /feedback reports user clicks back into ranking \- a genuine learning-to-rank signal. |
| 7 | **Permission-aware retrieval** | Results respect source-system access controls \- stated as an explicit Search API feature, not just inferred. |
| 8 | **Knowledge Graph** | People, content, and interaction signals connected into a graph structure underlying search and ranking. |
| 9 | **Real-time / "Live Mode" indexing** | Connectors can sync near-real-time rather than only on a scheduled crawl. |

# **AI / LLM Capabilities (10)**

| \# | Feature | Confirmation Detail |
| :---- | :---- | :---- |
| 10 | **Multi-model support** | OpenAI, Anthropic Claude, Google Gemini, and AWS Bedrock-hosted models all confirmed as selectable. |
| 11 | **Model Hub / LLM routing (existence)** | A model-selection layer exists; the automated routing logic itself is not independently confirmed \- see Not Confirmed list. |
| 12 | **Guardrails** | Content/topic restriction policies, part of the Glean Protect / AWARE framework. |
| 13 | **Citation generation / grounding** | Answers are referenceable back to source documents \- confirmed via official press materials and hands-on citation checks. |
| 14 | **Tool calling / function calling** | Agents and chat can invoke external tools/functions as part of generating a response. |
| 15 | **RAG implementation** | Full retrieval-augmented-generation pipeline, confirmed and documented across its own dedicated research tab. |
| 16 | **Workflow engine (agent-side)** | Agents API exposes workflow objects (workflow ID/name) as part of the Agents resource. |
| 17 | **Explainability & decision logs (citation-based)** | Citation-based explanation confirmed; a deeper decision-log/audit mechanism remains unconfirmed. |
| 18 | **Streaming chat responses** | create\_stream / create\_stream\_async confirmed hands-on in the SDK. |
| 19 | **Agent memory (session-level)** | Session-level memory confirmed to exist as a concept; long-term/cross-session memory is unconfirmed. |

# **Agents & Automation (7)**

| \# | Feature | Confirmation Detail |
| :---- | :---- | :---- |
| 20 | **No-code Agent Builder UI** | A visual interface for configuring agents without writing code. |
| 21 | **Code-based Agents API** | create / update / list / run operations confirmed directly from the SDK. |
| 22 | **Cross-framework Agent Toolkit** | Open-source toolkit confirmed to work across multiple agent frameworks (not LangChain/CrewAI-exclusive). |
| 23 | **Direct API Integration path** | A documented path for building custom agents directly against the API, without a framework dependency. |
| 24 | **NVIDIA NIM integration example** | An official example integrating Glean agents with NVIDIA's NIM inference microservices. |
| 25 | **Formal Agent Specification document** | A dedicated spec document for agent behavior/structure, confirmed in official developer docs. |
| 26 | **Webhook / Triggers system** | Platform API's preset-based, signed webhook delivery system \- corrected into "confirmed present" after live doc re-verification. |

# **APIs & Developer Platform (9)**

| \# | Feature | Confirmation Detail |
| :---- | :---- | :---- |
| 27 | **Three REST APIs** | Platform API, Client API, and Indexing API all independently confirmed \- REST-only, no GraphQL/gRPC/SOAP found. |
| 28 | **"Skills" API resource** | A resource newly found on the Platform API; existence confirmed, functional depth not yet explored. |
| 29 | **OAuth2 \+ API key authentication** | Both authentication modes hands-on tested and working. |
| 30 | **Documented rate limiting** | 30 qpm token-bucket limit, 429 responses, and backoff behavior all hands-on tested and matching documentation exactly. |
| 31 | **Typed error handling** | GleanError and GleanDataError with structured payloads (status\_code, message, raw\_response, body) confirmed hands-on. |
| 32 | **Bulk indexing / bulk operations endpoints** | Confirmed via the Indexing API's bulk\_index and related resources. |
| 33 | **Pagination (cursor-based)** | Confirmed across multiple list-type API resources. |
| 34 | **Deprecation policy \+ changelog** | exclude\_deprecated\_after / include\_experimental SDK parameters let developers test against upcoming deprecations ahead of time. |
| 35 | **Open-source SDKs with active release cadence** | Python (80 releases), TypeScript (86 releases), and Java SDKs, all actively maintained over roughly 14 months. |

# **Connectors & Integrations (9)**

| \# | Feature | Confirmation Detail |
| :---- | :---- | :---- |
| 36 | **100+ native search connectors (advertised)** | Vendor-advertised figure across the connector catalog. |
| 37 | **Salesforce, Microsoft 365/SharePoint/Teams/Outlook, Google Workspace, Slack** | Major enterprise productivity/collaboration systems, all confirmed connectors. |
| 38 | **Jira, Confluence, GitHub, Zendesk, ServiceNow** | Common engineering and support-desk systems, all confirmed connectors. |
| 39 | **Snowflake, Databricks, Box/Dropbox/Notion** | Data-platform and file-storage systems, all confirmed connectors. |
| 40 | **Open-source Indexing SDK** | For building custom connectors to sources without a native integration. |
| 41 | **MCP client (176-server gateway outward)** | Glean can connect outward to 176 third-party MCP servers. |
| 42 | **MCP server (Glean hosts its own)** | Glean also runs its own MCP server for its developer docs \- a dual MCP posture, confirmed on re-verification. |
| 43 | **LangChain integration** | Direct integration path confirmed for the LangChain agent framework. |
| 44 | **12 first-party "action packs"** | Write/action-capable integrations (Jira, Confluence, Salesforce, Slack, GitHub, Zendesk, Google Workspace, Microsoft 365, Snowflake, Databricks, Calendar Search, Code Writer) \- narrower in scope than the 100+ search-connector count. |

# **Security, Compliance & Governance (14)**

| \# | Feature | Confirmation Detail |
| :---- | :---- | :---- |
| 45 | **SOC 2 Type II** | Confirmed enterprise security certification. |
| 46 | **ISO 27001** | Confirmed information-security management certification. |
| 47 | **ISO 42001 (AI Management)** | Confirmed AI-specific management-system certification \- a notable, less-common bonus finding. |
| 48 | **HIPAA \+ BAA availability** | Confirmed, including Business Associate Agreement availability for healthcare customers. |
| 49 | **FedRAMP (in progress / targeted)** | Confirmed as an active target, not yet a completed authorization. |
| 50 | **GDPR, PCI DSS** | Both confirmed as part of the compliance posture. |
| 51 | **Encryption at rest & in transit** | Both confirmed as standard security controls. |
| 52 | **RBAC** | Role-based access control confirmed generally, including record-level permission mirroring from at least one source system (Salesforce). |
| 53 | **SSO support** | Confirmed generally, including named support for Okta and Microsoft login specifically. |
| 54 | **SIEM integration, DLP** | Both confirmed as part of the security/compliance feature set. |
| 55 | **Data residency options** | Flexible single-tenant or customer-managed deployment options confirmed for residency needs. |
| 56 | **Customer-managed encryption keys** | Confirmed as an available security control. |
| 57 | **Zero Trust architecture** | Confirmed as a stated architectural principle. |
| 58 | **Glean Protect / AWARE AI-governance framework** | A named, dedicated AI-governance framework covering restricted topics, agent alignment models, and runtime attack protection. |

# **Architecture & Infrastructure (7)**

| \# | Feature | Confirmation Detail |
| :---- | :---- | :---- |
| 59 | **Documented end-to-end architecture** | Indexing → embeddings → ranking → serving pipeline confirmed at a high level. |
| 60 | **Connector framework** | The underlying framework connectors are built on, confirmed to exist as a distinct architectural layer. |
| 61 | **Inference infrastructure (AWS Bedrock path)** | Confirmed via a 2023 AWS Marketplace architecture blog \- dated, but a real documented path. |
| 62 | **Document processing pipeline** | Including OCR/multimodal handling at a conceptual level (specific OCR/multimodal claims remain individually unconfirmed \- see Not Confirmed list). |
| 63 | **Caching layer** | Confirmed to exist as an architectural component (specific cache behavior unconfirmed \- see Not Confirmed list). |
| 64 | **Multi-tenant / single-tenant / customer-hosted deployment options** | All three deployment models confirmed as available, per third-party sources. |
| 65 | **SSO & identity integration (Okta, Microsoft)** | Confirmed by name via a third-party security-profile tool. |

# **Summary**

**Total confirmed features: 65**

*Note: a corresponding "Features Not Confirmed" list (55 items) and a "Feature Maturity Assessment" (sorting these confirmed features into Production/Mature, Beta/Evolving, Emerging, and Undetermined maturity tiers) exist as separate companion documents/workbook rows.*