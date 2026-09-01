# Tier 3 Analysis Report

Field inventory for the Tier 3 vendor analysis report, with definitions and evaluation methodology, organised by SOW section.

## 4.9.1 — Functional Capabilities

| # | Field Name | Technical Definition | Evaluation Methodology (How to Verify in Sandbox) |
|---|---|---|---|
| 1 | Features Confirmed | The validated list of core feature assertions made by the vendor. | Deploy standard test cases (e.g., TEST-01) and document successful execution outputs. Verify UI behavior matching. |
| 2 | Features Not Confirmed | Features advertised by the vendor that failed to execute, were missing, or underperformed during testing. | Document specific test failures, timeouts, or UI elements that did not update as expected during workflow execution. |
| 3 | Undocumented Features | Undocumented system capabilities or workarounds found during hands-on exploration. | Record unexpected features, API shortcuts, or configuration parameters found in system files/consoles not highlighted in docs. |
| 4 | Feature Maturity | Assessment of the platform's stability (e.g., Enterprise Production-ready, Public Beta, Early Access, Developer Sandbox). | Review system documentation and stability under load. Verify frequency of breaking releases. |
| 5 | UI/UX Quality | The intuitive ease of navigating administrative dashboards, designer canvases, and user interfaces. | Run cognitive walkthroughs with a business user. Rate on a 1-5 scale for layout, response latency, and setup friction. |
| 6 | Configuration Complexity | The level of technical effort required to configure standard workflows. | Track hours required to complete a baseline deployment without developer support. Rate low/medium/high. |
| 7 | Error Handling & Recovery | System behavior during API timeouts, invalid inputs, or network drops. | Trigger simulated server/endpoint drops mid-workflow (TEST-03) and log system state capture and clarity of diagnostic errors. |
| 8 | Performance Under Load | System latency, concurrency, and compute consumption when handling concurrent tasks. | Load test endpoints with standard tooling. Track response latency degradation curve as concurrent connections scale up. |

## 4.9.2 — Agent & Workflow Builder

| # | Field Name | Technical Definition | Evaluation Methodology (How to Verify in Sandbox) |
|---|---|---|---|
| 1 | Builder Type | Primary design model of the editor (e.g., Visual Drag-and-Drop, Code-First, Natural Language Directives, Hybrid). | Assess the workflow designer interface. Identify if coding knowledge is a hard requirement for baseline paths. |
| 2 | Agent Autonomy Level | Limit of independent decision-making, automated guardrails, and human check-points. | Map autonomous routing logic. Test agent's ability to handle unknown edge cases before throwing unhandled errors. |
| 3 | Workflow Complexity Ceiling | The maximum logical structures supported (e.g., nested loops, multi-branched decision trees, parallel agent runs). | Build complex stress workflows in the editor and document structural or runtime crash points. |
| 4 | Pre-Built Templates | Availability and quality of ready-to-use virtual agents or workflow models. | Count and evaluate native templates for custom business processes. Verify ease of customization. |
| 5 | Custom Code Support | The capability to insert custom scripts or programming libraries into workflows. | Write and test custom API/SDK logic blocks inside the builder. Check language and compilation limits. |
| 6 | Multi-Agent Orchestration | Cooperation and conflict-resolution patterns when running multiple automated agents. | Run simultaneous parallel agents. Track decision overlapping, race conditions, and message queue integrity. |
| 7 | Testing & Debugging Tools | Quality of native sandboxes, loggers, step-tracers, and rollback environments. | Evaluate the debugging UI during runtime failures. Track ability to isolate errors in multi-branch paths. |
| 8 | Versioning & Rollback | Administrative management of system revisions, workspaces, and immediate rollbacks. | Test the revert/rollback functionality of search indexes or agents to prior versions during active use. |
| 9 | Human-in-the-Loop Design | Handoff efficiency, pausing, and clinician/operator approval checkpoints. | Deploy automated approval checkpoints. Verify state survival during human-in-the-loop pauses. |
| 10 | Trigger Types Supported | Supported event bindings (e.g., schedules, API calls, webhooks, data shifts). | Verify active event listeners. Test webhook callback latency and triggers across external database changes. |

## 4.9.3 — AI Architecture & Models

| # | Field Name | Technical Definition | Evaluation Methodology (How to Verify in Sandbox) |
|---|---|---|---|
| 1 | Foundation Models Used | The specific large language or machine learning models driving the generative intelligence. | Identify available models in the vendor's Model Hub. Check API transparency and exact version controls. |
| 2 | Model Hosting Location | The confirmed physical/cloud hosting location for model inference. | Analyze network logs during model execution. Verify if customer data travels to shared public cloud domains. |
| 3 | Private / Local Instance Support | Feasibility of deploying dedicated or local LLMs/SLMs within private clouds. | Confirm architecture support for private VPS models. Evaluate latency when running local network inference. |
| 4 | Model Agnosticism | Ability to swap underlying LLM providers or models without breaking workflows. | Swap underlying LLM provider in settings and document subsequent script/prompt degradation metrics. |
| 5 | Fine-Tuning Capabilities | Process and constraints for tuning models on custom clinical or corporate documents. | Review fine-tuning documentation. Test prompt adaptation or custom weight loading capabilities in the sandbox. |
| 6 | RAG Implementation Quality | Retrieval architecture, vector chunking strategies, and precise citation engines. | Query multi-system PDFs (TEST-02). Verify if the generated answer provides precise, traceable citations. |
| 7 | Prompt Engineering Access | Admin/developer capability to configure system prompts, instructions, and weights. | Locate and edit system prompts in the admin UI. Test override safety guidelines and injection vulnerabilities. |
| 8 | Context Window & Memory | The maximum token count supported and session-level context retention. | Execute massive multi-document search queries and document context-drop or token-overflow thresholds. |
| 9 | Hallucination Controls | Output validation engines, confidence thresholds, and toxicity/hallucination checks. | Inject false medical jargon or ungrounded queries. Evaluate system confidence scoring or fallback mechanisms. |
| 10 | Explainability & Decision Logs | Human-readability of decision logs, system routing, and reasoning steps. | Inspect trace log dashboards during agent execution. Verify readability of the routing decision logic. |
| 11 | Data Leakage Protections | Privacy controls preventing tenant data from entering general vendor model training loops. | Review legal DPAs and system agreements. Verify if opt-out clauses for training are enabled and contractually bound. |
| 12 | Model Versioning Freeze | Option to pin specific API model releases to protect against downstream behavior shifts. | Confirm admin control to lock an exact model version (e.g., GPT-4o-2024-05-13) rather than auto-floating on updates. |

## 4.9.4 — Integration & Technical

| # | Field Name | Technical Definition | Evaluation Methodology (How to Verify in Sandbox) |
|---|---|---|---|
| 1 | API Architecture Type | The framework type of the vendor's APIs (e.g., REST, GraphQL, gRPC, SOAP). | Examine SDK and API network traffic to classify the architecture type (REST, GraphQL, etc.). |
| 2 | API Depth & Writeback | Scope of data mutations supported (e.g., Read-Only vs. bidirectional CRUD). | Test bidirectional POST/PATCH calls in the sandbox and document writeback latency and authentication safety. |
| 3 | Webhook Support Quality | Inbound/outbound webhook event reliability and trigger configurations. | Verify custom webhook configurations and measure delay between system event and webhook trigger. |
| 4 | Tenancy Model | Database tenant architecture (e.g., Shared SaaS multi-tenant vs. isolated single-tenant). | Audit infrastructure documentation to confirm database and storage isolation per tenant. |
| 5 | Data Residency Validation | Physical region where data-at-rest and processing servers are located. | Check physical location of servers to confirm alignment with regional laws (e.g., GDPR, HIPAA). |
| 6 | Identity & SSO Integrations | Support for SAML, OIDC, SCIM directory syncs, and multi-factor authentication. | Configure SSO (Okta/Active Directory) in sandbox and test user authentication and directory mapping. |
| 7 | Native Connectors | List of pre-built, out-of-the-box integrations supported directly by the vendor. | Audit the integrations catalog. Test native connection setup times and reliability across standard tools. |
| 8 | Infrastructure Requirements | Minimum cloud infrastructure, security networks, or local compute required to run the platform. | Review prerequisite hardware/software requirements, VPC configs, and network tunnel setups in deployment documentation. |

## 4.9.5 — Compliance & Regulatory

| # | Field Name | Technical Definition | Evaluation Methodology (How to Verify in Sandbox) |
|---|---|---|---|
| 1 | Certifications Validated | Verified third-party security audits (e.g., SOC 2 Type II, ISO 27001, ISO 42001). | Request and audit standard SOC 2 compliance reports. Verify certification active scope and sub-processors. |
| 2 | HIPAA Readiness & BAAs | Verification of BAA execution capability, and HIPAA data encryption controls. | Check standard legal agreements. Verify BAA availability and data-at-rest/in-transit compliance. |
| 3 | Audit Trail Completeness | Log immutability and detail level for administrative and AI actions. | Examine administrative logging capabilities. Verify if user queries, permissions, and settings changes are recorded. |
| 4 | Data Retention & Disposal | Controls and policy governing customer data purge limits and post-termination scrubbing. | Review data retention policies. Verify availability of automated database purging tools in the admin panel. |
| 5 | Data Encryption Standards | Cryptographic standards used to secure data-at-rest and data-in-transit, including BYOK options. | Verify AES-256 and TLS 1.2+ encryption standards in legal trust documentation. Test custom key support. |
| 6 | Access Control Granularity | Ability to restrict access down to row, document, or field levels, inheriting source permissions. | Test data access maps across multiple user tiers. Verify if inherited source permissions are dynamically enforced. |
| 7 | Incident Response & Notification | SLA timelines and technical workflows for breach identification and customer reporting. | Review incident response policies and contractual breach notification SLAs (e.g., 72 hours under GDPR). |
| 8 | Data Processing Agreements | CCPA/GDPR aligned standard data protection clauses and sub-processor controls. | Audit standard DPAs. Verify presence of clear data-transfer protections and sub-processor security rules. |
| 9 | AI-Specific Governance | Bias mitigation controls, prompt injection shields, and toxic input/output filtering. | Inject prompt attacks. Verify if safety layers automatically deflect toxic or unauthorized prompts. |

## 4.9.6 — Adoption & Readiness

| # | Field Name | Technical Definition | Evaluation Methodology (How to Verify in Sandbox) |
|---|---|---|---|
| 1 | Training Infrastructure | Availability of comprehensive developer academies, certifications, and documentation. | Evaluate quality of developer guides, interactive quickstarts, and quick-response community forums. |
| 2 | Adoption Friction Signals | Indicators of employee resistance or structural workflow friction during pilot setups. | Monitor pilot user analytics. Document drop-off rates and common support-ticket friction patterns. |
| 3 | Non-Technical User Experience | Intuitive ease of onboarding and daily usage for non-technical business employees. | Conduct usability tests with non-technical business staff. Rate portal interface, navigation, and learning curve. |
| 4 | Resistance & Failure Signals | Identified system bottlenecks or user-adoption failures that could trigger project termination. | Identify critical workflow friction points, lack of cultural fit, or slow page-load speeds that lead to abandonment. |

## 4.9.7 — Pricing & TCO

| # | Field Name | Technical Definition | Evaluation Methodology (How to Verify in Sandbox) |
|---|---|---|---|
| 1 | Actual Partner Pricing | Confirmed enterprise pricing, discount tiers, and volume pricing scales. | Audit official pricing sheets and negotiated contracts to establish baseline partner licensing costs. |
| 2 | License Structure Details | SaaS license models (e.g., per-seat, volume consumption, or hybrid flex-credits). | Verify license structures and compute-intensive usage limits (e.g., weekly query caps). |
| 3 | Implementation Costs | Estimated professional services, baseline configuration, and expert deployment fees. | Aggregate professional services quotes and deployment consultant rates to calculate total setup fees. |
| 4 | Hidden Costs Identified | Unpublicized fees, mandatory support tier overheads, API overage charges, and hardware costs. | Identify additional mandatory charges (e.g., 10% support fees, custom connector developer overhead). |
| 5 | 3-Year Projected TCO | Estimated total cost of ownership over a standard 3-year enterprise horizon. | Model 3-year TCO for a standard 100-seat baseline deploy, combining license, setup, and support fees. |

## 4.9.8 — Partner & Channel Program

| # | Field Name | Technical Definition | Evaluation Methodology (How to Verify in Sandbox) |
|---|---|---|---|
| 1 | Partner Program Details | Structure, tiers, and certification pathways of the vendor's partner ecosystem. | Audit the partner portal to verify partner classifications (Technology, Consulting, Reseller) and qualifications. |
| 2 | Commission Structure | Fee splits, referral margins, setup percentages, and recurring revenue splits. | Review standard partner agreements to document recurring SaaS margins and one-time referral commissions. |
| 3 | Deal Registration Process | Submission guidelines, lead protection windows, and approval timelines. | Verify the lead submission workflow, registration protection durations (e.g., 90 days), and renewal locks. |
| 4 | Partner Support & Enablement | Sandbox access, solution architecture support, and co-branded sales materials. | Evaluate availability of dedicated partner test sandboxes and joint technical advisory channels. |
| 5 | Co-Sell & Joint Go-to-Market | Cloud marketplace availability, MDF marketing funds, and target account mapping. | Track cloud marketplace presence (AWS/GCP) and joint co-selling opportunities across enterprise targets. |
| 6 | Existing Partner Conflicts | Competitive consulting overlaps with other systems integrators selling the same platform. | Audit active integrators representing the tool. Estimate risk of channel conflict in target regions. |
| 7 | Partner Agreement Status | Current execution status of the Stratos Edge partnership agreement. | Document contract execution milestones (e.g., Executed, Under Legal Review, Active). |
| 8 | Stratos Edge Registration Status | Authorization status of Stratos Edge inside the vendor's channel program. | Verify current registered tier and certified advisor counts in the vendor database. |

## 4.9.9 — Competitive Positioning

| # | Field Name | Technical Definition | Evaluation Methodology (How to Verify in Sandbox) |
|---|---|---|---|
| 1 | Honest Strengths | Proven technical or functional advantages where the platform leads competitors. | Document distinct capabilities (e.g., Permissions RAG) verified through sandbox testing. |
| 2 | Honest Weaknesses | Validated system limitations, missing features, and necessary workarounds. | Document critical software defects, slow response latencies, and failed integrations. |
| 3 | Best-Fit Client Profile | The ideal enterprise customer size, security posture, and existing software stack. | Identify sweet-spot organizations where the platform delivers maximum, immediate ROI. |
| 4 | Worst-Fit Client Profile | Organizational profiles or compliance structures where the tool represents a mismatch. | Document warning indicators (e.g., purely relational database search needs) that suggest rejection. |
| 5 | Displacement Scenarios | Legacy tools, siloed wiki indexes, or fragile manual pipelines this platform directly replaces. | Identify legacy point tools or manual search scripts that are retired upon deployment. |
| 6 | Coexistence Scenarios | Standard enterprise tools this system operates alongside without duplication of value. | Map operational boundaries. Confirm how this platform runs next to CRM/EHR databases without conflict. |
| 7 | Switching Cost Assessment | Friction, re-architecting fees, and developer re-training required to migrate off this platform. | Calculate engineering migration difficulty and vendor lock-in risk (custom code vs. native setups). |

## 4.9.10 — Use Case Library

| # | Field Name | Technical Definition | Evaluation Methodology (How to Verify in Sandbox) |
|---|---|---|---|
| 1 | Use Case Name | The designated name of the validated business workflow. | Identify the target use-case assertion to evaluate in the sandbox. |
| 2 | Business Process Affected | The exact organizational workflow impacted by automation. | Map the baseline sequence of steps affected by the integration. |
| 3 | Department / Function | The internal business group or division utilizing the tool. | Identify target user departments (e.g., Customer Support, Billing, Clinical Staff). |
| 4 | Industry Applicability | Industry sectors where this specific use case is highly relevant. | Verify sector compliance (e.g., Healthcare HIPAA boundaries or Financial auditing). |
| 5 | Problem Solved | The operational inefficiency or manual bottleneck resolved by deployment. | Document the baseline friction (e.g., silent billing script errors or slow intake review). |
| 6 | Implementation Complexity | The estimated engineering complexity to configure the workflow (Low, Med, High). | Track custom developer hours and prerequisites needed to build and configure the path. |
| 7 | Time to Value Estimate | Expected months to achieve measurable adoption and ROI. | Track deployment times from project initiation to active daily workforce usage. |
| 8 | Expected Outcome | The target metrics, deflection rates, or productivity savings achieved. | Compare automated sandbox metrics with historical manual benchmark sequences. |
| 9 | Dependencies & Prerequisites | Required software licenses, external database APIs, or security networks. | List all third-party systems or software agreements required prior to activation. |
| 10 | Validated Through Testing | A flag indicating if this use case was physically built and verified in the sandbox. | Assert if the test case was successfully simulated and completed without unhandled errors (YES/NO). |

## 4.9.11 — Client-Facing Explainability

| # | Field Name | Technical Definition | Evaluation Methodology (How to Verify in Sandbox) |
|---|---|---|---|
| 1 | Decision Explanation Capability | The platform's capability to explain prompt selections and routing choices made by AI agents. | Examine generative search outputs. Verify if answers include traceable citations linked to original source text. |
| 2 | Audit Trail for AI Actions | Immutable logging of LLM system prompts, reasoning paths, and actions taken by automated agents. | Inspect administrative debug consoles during active queries. Verify logging of internal agent steps. |
| 3 | Human-Readable Output | Clarity of natural-language outputs and formatting for non-technical clients and users. | Conduct user tests on generative answers to rate clarity, visual layout, and natural phrasing. |
| 4 | Confidence Scoring | Numerical confidence scores or truth indicators attached to AI-generated answers. | Examine the developer API responses to confirm if the LLM outputs numerical confidence or similarity scores. |
| 5 | Override & Correction Mechanism | Interface or developer configurations allowing humans to override or correct wrong AI decisions. | Test manual override tools in the console. Document the latency to update the indexing engine with corrections. |
| 6 | Compliance Reporting | Availability of pre-packaged compliance dashboards detailing security, model safety, and alignment. | Locate and export administrative compliance reports to verify details on user permissions and audit trends. |

---

## Summary

| SOW Section | Field Category | Fields |
|---|---|---:|
| 4.9.1 | Functional Capabilities | 8 |
| 4.9.2 | Agent & Workflow Builder | 10 |
| 4.9.3 | AI Architecture & Models | 12 |
| 4.9.4 | Integration & Technical | 8 |
| 4.9.5 | Compliance & Regulatory | 9 |
| 4.9.6 | Adoption & Readiness | 4 |
| 4.9.7 | Pricing & TCO | 5 |
| 4.9.8 | Partner & Channel Program | 8 |
| 4.9.9 | Competitive Positioning | 7 |
| 4.9.10 | Use Case Library | 10 |
| 4.9.11 | Client-Facing Explainability | 6 |
| **Total** |  | **87** |