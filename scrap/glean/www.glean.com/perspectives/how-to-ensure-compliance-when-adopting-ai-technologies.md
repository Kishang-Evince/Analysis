---
url: "https://www.glean.com/perspectives/how-to-ensure-compliance-when-adopting-ai-technologies"
canonical: "https://www.glean.com/perspectives/how-to-ensure-compliance-when-adopting-ai-technologies"
title: "How to ensure compliance when adopting AI technologies"
description: "The Glean Team | AI compliance when adopting new technologies means conducting risk assessments and establishing governance frameworks for regulatory alignment."
fetched_at: "2026-09-01T13:27:53.011Z"
---
Last updated Jul 03, 2026.

# How to ensure compliance when adopting AI technologies

0

minutes read

![How to ensure compliance when adopting AI technologies](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a04452fec09550f52085013_6863d79aaf61530586d8796d_AI%2520in%2520life%2520sciences%2520Practical%2520use%2520cases%2520for%2520research%252C%2520regulatory%252C%2520and%2520clinical%2520teams.webp)

### Table of contents

[

Heading 2

](#)

[

Heading 3

](#)

[

Heading 4

](#)

[

Heading 5

](#)

[

Heading 6

](#)

[

Have questions or want a demo?

We’re here to help! Click the button below and we’ll be in touch.

Get a Demo



](/get-a-demo)

Share this article:

# How to maintain compliance when adopting AI technologies

AI compliance in software engineering starts with treating AI tools the same way you treat any other system that touches sensitive data: define clear boundaries for what data flows where, enforce identity-based access controls, and build audit trails that prove your policies are working.

That distinction between governance and compliance matters. Governance is the framework — the policies, roles, and decision rights that shape how your organization adopts AI. Compliance is the evidence that the framework is actually operating as intended, day after day.

Gartner predicts that by 2026, organizations that operationalize AI governance will experience 40% fewer AI-related compliance incidents than those relying on policy alone.

A Stanford study found that developers using AI coding assistants were more likely to introduce vulnerable code, particularly injection-based attacks. Meanwhile, 78% of developers already use AI tools according to Stack Overflow, and roughly 30% of AI copilot-generated code contains security weaknesses spanning 38 CWE categories.

As AI coding tool adoption rises and audit requirements tighten, compliance controls are now a standard part of the engineering stack. Stanford's 2025 AI Index confirms the urgency: publicly reported [AI security incidents increased by 56.4%](https://hai.stanford.edu/ai-index/2025) from 2023 to 2024 alone, and the trend has only accelerated since.

## A step-by-step framework for AI compliance in engineering

The security and governance requirements that matter most come down to five areas: clear data boundaries, strong identity and access controls, approved model and vendor policies, secure SDLC guardrails, and audit-ready oversight. Understanding established [AI security frameworks](https://www.glean.com/blog/what-is-ai-security) is essential before applying them to tools that generate code, summarize internal documents, and interact with proprietary data across the development lifecycle.

The following sequence gives engineering, security, legal, and IT leaders a plan they can follow in order. Start with visibility into what AI tools are already in use, then define data rules, enforce access, govern models and vendors, control code quality, and prove compliance with logs and review.

**Start with visibility.** Before you can govern AI usage, you need to know where it is happening. Shadow AI — unsanctioned tools adopted by individual developers or teams — is a governance problem before it becomes a breach problem.

Inventory every AI tool in use across your organization, including browser extensions, IDE plugins, and third-party integrations embedded in CI pipelines. Map each tool to the data it can access and the workflows it touches.

**Define data boundaries.** Not all data should flow into AI models. Classify your data by sensitivity — source code, customer PII, credentials, internal architecture documents — and create explicit policies for what can and cannot be sent to external AI services.

A practical control: block any prompt that includes environment variables or API keys from reaching a cloud-hosted model, using a gateway or proxy layer that inspects outbound requests.

**Enforce identity and access controls.** Permission-aware access is the baseline: no user and no AI model should get broader visibility through an AI tool than they already have in your systems of record. If an engineer cannot access a specific repository or internal wiki, the AI assistant should not surface that content either.

Many point-solution AI tools fall short here because they flatten permissions by design.

**Govern models and vendors.** Establish an approved list of AI models and vendors. Define evaluation criteria that cover data residency, model training policies (does the vendor train on your data?), and contractual commitments around data retention and deletion.

Map these requirements to your existing compliance frameworks — SOC 2, ISO 27001, GDPR, HIPAA, PCI DSS, or SOX — and align them with the [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) rather than inventing a parallel governance structure.

**Control code quality at the SDLC level.** AI-generated code needs the same scrutiny as human-written code, and in some cases more. Require automated security scanning on every pull request, regardless of whether the code was written by a developer or suggested by an AI assistant.

Add static analysis rules that flag common AI-generated weaknesses — the 38 CWE categories identified in copilot research are a good starting checklist. Pair these with [jailbreak detection](https://www.glean.com/blog/ai-safeguard-septdrop-2025) capabilities to keep AI-assisted workflows aligned with existing access controls rather than bypassing them.

**Build audit-ready oversight.** Compliance is not a one-time checklist. It requires continuous evidence: logs of which AI tools were used, what data they accessed, what outputs they produced, and who reviewed those outputs.

Design your audit trail so that it maps directly to the controls your compliance framework requires. When an auditor asks how you govern AI-generated code, you should be able to point to specific logs, review records, and policy enforcement events — not a slide deck.

The common thread across all six steps is that compliance has to follow real workflows. Engineers use AI inside repositories, tickets, chat, docs, CI pipelines, and internal tools. Controls that exist only as written policies, disconnected from those workflows, will not hold up under audit or under pressure.

## 1\. Inventory every AI use case, tool, model, and data flow

You cannot govern what you cannot see. The first step in AI compliance is building a complete, current inventory of every AI tool, model, and workflow running across your engineering organization.

Cast a wide net. Code generation assistants get the most attention, but AI is also embedded in code explanation tools, documentation drafters, test generators, ticket triage systems, incident analysis pipelines, and workflow automation agents.

Include browser extensions, IDE plugins, CLI tools, and third-party integrations wired into CI/CD.

Separate sanctioned tools from unsanctioned ones. Shadow AI — tools adopted by individual developers or teams without security review — is a governance problem that compounds silently.

A 2024 Salesforce survey found that more than half of generative AI users at work use unapproved tools. The financial risk is significant: IBM's 2025 Cost of a Data Breach Report found that shadow AI adds roughly [$670,000 to the average cost of a breach](https://www.ibm.com/reports/data-breach), making unsanctioned tool usage one of the most expensive governance gaps to leave unaddressed.

For each tool, document four things: who uses it, what data it can access, what model powers it, and what actions it can take. Then map data flows end to end.

Track where prompts, outputs, and metadata are stored, how long they are retained, whether they feed model training, and which jurisdiction processes the data.

Assign an owner to every AI workflow. Each use case needs a responsible engineering or platform lead, plus security review sign-off.

Prioritize by risk, not novelty. A tool that summarizes onboarding docs is lower risk than one that ingests production logs, generates code changes, and triggers CI actions. Glean's native connectors, for example, index content from 100+ enterprise tools while preserving source-level visibility into what each connector accesses.

This inventory becomes the foundation for every control that follows.

## 2\. Classify engineering data and define what AI can and cannot touch

Once you know which AI tools exist, define what data each tool is allowed to process. A data classification policy turns vague "be careful" guidance into concrete, enforceable rules.

Build at least four tiers. Public includes published documentation and open-source references. Internal covers sprint notes, team wikis, and architecture decision records.

Confidential applies to source code, unreleased product plans, and design reviews. Restricted covers secrets, access tokens, customer PII, financial records, health data, and incident material with sensitive details.

Tie each tier to specific AI handling rules. Public content can flow broadly. Internal content may be allowed in approved tools with logging.

Confidential content requires approved retrieval boundaries and audit trails. Restricted content should be blocked outright or require explicit redaction before prompting.

Do not treat all code equally. Repositories connected to authentication, payment flows, or regulated workloads need tighter controls than low-risk internal utilities. A developer pasting a stack trace from a payment service into an AI tool is a different risk profile than debugging a formatting helper.

Require automated detection for secrets, credentials, private keys, customer identifiers, and regulated records. Effective [sensitive content detection](https://www.glean.com/blog/sensitive-content-models-septdrop-2025) can separate genuine risk from noise at scale, reducing data exposure during AI implementation. Define redaction rules before prompting — if a team wants AI help debugging a production incident, strip unnecessary personal data and credentials first.

Good policy answers simple questions fast: Can I paste this log into a model? Can this agent read production tickets?

Industries with the most stringent requirements — financial services, healthcare, government — face additional constraints. Mapping your [AI compliance needs](https://www.glean.com/perspectives/top-7-industries-with-stringent-ai-compliance-needs-in-2026) back to the data classes already in your engineering systems avoids creating a disconnected AI policy that nobody follows. Glean Search enforces data classification at the retrieval layer, so answers and suggestions only draw from content the user and their role are authorized to access.

## 3\. Enforce identity, access controls, and permission-aware retrieval

Access control failures are the fastest way for an AI deployment to create a data exposure incident. Every approved AI tool in your engineering stack should sit behind the same identity and access infrastructure as your other systems.

Start with SSO, strong authentication, and centralized identity management. Building a robust [identity schema](https://www.glean.com/blog/using-our-identity-schema-to-deliver-personalized-permissions-aware-results) that maps users to their permissions across every connected system is essential — if an AI tool cannot integrate with your identity provider, it should not be approved.

Then layer on role-based access controls. Not every developer needs the same access to repositories, internal documentation, or action-taking agents. A junior engineer working on a frontend feature should not have AI-surfaced access to production infrastructure runbooks they cannot reach directly.

Apply least-privilege to both retrieval and actions. An AI system should not read from a data source or trigger a workflow unless both the user and the tool are explicitly authorized. Getting the [permissions structure](https://www.glean.com/blog/secure-generative-ai-for-the-enterprise-requires-the-right-permissions-structure) right from the start prevents the kind of access flattening that turns a productivity tool into a data exposure risk.

Keep permission checks upstream of generation — filter accessible content first, then generate answers only from what the user is allowed to see. Many point-solution AI tools fall short here because they copy content into a separate knowledge layer and flatten permissions in the process.

Segment environments clearly. Development, staging, and production data should not blur together because a single AI interface can reach all three. Restrict high-risk actions — writing back to repositories, updating tickets, triggering deployments — to explicit approval flows with traceable authorization.

A strong [AI security](https://www.glean.com/security) posture depends on getting this step right. Permission-aware retrieval is not an optional feature — it is the baseline control that keeps AI-generated answers aligned with your existing security policies.

Glean's Enterprise Graph enforces source-system permissions at query time, so no user gets broader visibility through AI than they already have in the systems of record.

## 4\. Govern models, vendors, retention, and allowed AI behavior

Model and vendor governance is the layer most organizations skip — and the one auditors ask about first. Create an approved model policy before you roll out AI tools broadly.

Specify which model families are allowed, what tasks each is approved for, and what data classes each can process. When [integrating generative AI](https://www.glean.com/blog/cio-integrating-genai-agents) into enterprise workflows, a model approved for summarizing internal meeting notes is not automatically approved for generating code that touches customer data.

Require contractual controls for every external model provider: data retention limits, training restrictions (does the vendor train on your inputs?), subprocessor disclosure, incident notification terms, and regional processing requirements. With the [EU AI Act](https://artificialintelligenceact.eu/) high-risk provisions becoming enforceable in August 2026 and penalties reaching up to €35 million or 7% of global revenue, these contractual safeguards are no longer optional for organizations operating in or serving European markets.

Maintain a model register. For each approved model, record the version, provider, use case, owner, evaluation status, and known limitations. When a vendor ships a new model version, treat it like any other production dependency change — evaluate before adopting.

Evaluate models against the tasks engineers actually perform. For software development, that means testing for secure code generation, safe dependency recommendations, configuration correctness, and resistance to unsafe shortcuts.

Model behavior risks deserve as much attention as data handling risks. Hallucinated APIs, insecure default configurations, and outdated library recommendations are governance issues when engineers act on them without scrutiny.

Add explicit boundaries for agents. An action-taking agent should have documented restrictions on which systems it can query, what tools it can invoke, and which actions require human approval before execution. Glean Agents, for instance, operate within defined guardrails — each agent's permissions, allowed actions, and escalation triggers are configured by administrators rather than left open-ended.

Define escalation rules for high-risk workflows. If an AI system proposes changes affecting authentication, production infrastructure, or customer-facing logic, require stronger review before those changes proceed.

## 5\. Put secure SDLC guardrails around AI-generated and AI-assisted code

Responsibility for every code change that ships to production stays with a named human owner, regardless of whether AI generated the code. AI accelerates development, but accountability does not shift.

Require standard pull request review for AI-assisted code. Generated code should not skip review because it came from a model instead of a teammate.

Run the same secure development checks on AI contributions as on any other: static analysis, dependency scanning, secret detection, license review, unit tests, integration tests, and CI policy gates.

Add risk-based review thresholds. A documentation update generated by AI may need a lighter process than code touching authentication, cryptography, billing logic, or infrastructure provisioning. Create explicit coding standards for AI-assisted work: no hardcoded credentials, no unvetted third-party packages, no silent error handling, no insecure defaults, and no unreviewed infrastructure changes.

Require negative testing, not just happy-path coverage. AI-generated tests often look thorough while missing the failure cases that matter most in production — edge cases around null inputs, race conditions, permission boundary violations, and error propagation paths. If a generated test suite only validates the success scenario, it creates false confidence.

Preserve traceability from AI suggestion to final commit. Teams should be able to answer three questions about any significant change: Was it AI-assisted? Who reviewed it? Which automated controls ran before merge?

Teach engineers to review for reasoning gaps, not just syntax. Common issues include insecure assumptions, invented helper functions that do not exist, unnecessary complexity, and subtle permission mistakes.

Add repository-level policies for critical services. Regulated or customer-facing repos may require senior review, security sign-off, or restricted use of certain AI-generated patterns. Glean's permission-aware architecture extends into developer workflows so that AI-assisted code suggestions and knowledge retrieval respect the same repository and document access controls that govern direct access.

## 6\. Build audit trails, prove enforcement, and continuously improve governance

Compliance is not a policy document. It is a body of evidence that proves your controls are operating as intended, day after day.

Log the events that matter: tool access, model selection, sensitive data policy matches, blocked actions, approved exceptions, connector changes, and administrative modifications. An [active data governance](https://www.glean.com/blog/data-gov-product-blog) approach that flags and remediates overshared sensitive data in real time is far more effective than periodic manual reviews.

Capture enough context for investigation without creating a new data exposure problem. In some cases, storing full prompts is appropriate. In others, metadata, classification results, and policy decisions are safer and sufficient.

Keep an evidence package ready before an audit starts. Include the AI tool inventory, approved use cases, model register, access policies, retention terms, review workflows, exception history, and incident response procedures. When an auditor asks how you govern AI-generated code, point to specific logs, review records, and policy enforcement events — not a slide deck.

Map AI controls to the compliance frameworks your organization already uses. Depending on your industry, that may include SOC 2, ISO 27001, GDPR, HIPAA, PCI DSS, SOX, or internal secure development standards. The goal is to extend existing controls to cover AI, not to build a parallel governance structure.

Establish a cross-functional AI governance forum with engineering, security, legal, privacy, and IT. Its job is to review new use cases, approve exceptions, monitor incidents, and update policy as the technology evolves.

Measure control effectiveness with operational metrics: unsanctioned tool discovery rate, blocked sensitive prompt attempts, exception volume, review coverage for AI-assisted commits, and time to remediate policy violations. Research from McKinsey and IBM shows that enterprises with mature governance programs experience [45% fewer security incidents](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai) and resolve breaches 70 days faster than organizations without formal AI oversight.

Review incidents and near misses as learning inputs. If a team nearly exposed a secret in a prompt or accepted insecure generated code, feed that back into policy, training, and tooling configuration.

Following [AI governance best practices](https://www.glean.com/perspectives/ai-governance-best-practices) turns governance from a static document into an operating rhythm with owners, review gates, and measurable controls. Glean's built-in audit logging captures tool access, query activity, and administrative changes across the platform, giving compliance teams a centralized record without requiring a separate logging integration.

Keep the program iterative. AI adoption in engineering changes quickly. Governance has to update on the same cadence as the models, tools, and workflows it covers.

## How to maintain compliance when adopting AI technologies: Frequently asked questions

### What are the key security requirements for AI tools in software engineering?

The essentials are identity-based access control, permission-aware retrieval, least-privilege actions, data classification, secure retention policies, audit logs, and standard SDLC checks on AI-assisted code. The practical test: the tool should only access approved systems, only use data the user is allowed to see, and only take actions that are explicitly authorized and logged.

### How can organizations maintain compliance when adopting AI technologies?

Start by inventorying every AI tool and use case, then define data handling rules, approve models and vendors, enforce access controls, and build review plus logging into day-to-day workflows. Compliance becomes real when policy translates into technical enforcement and audit evidence — not just an acceptable use document.

### What governance frameworks should be established for AI in software development?

A workable framework includes a cross-functional review body, an approved model register, change management for model updates, exception handling, secure SDLC policies for AI-assisted work, and clear ownership for each AI workflow. It should map back to existing enterprise standards — SOC 2, ISO 27001, GDPR, HIPAA — so teams do not build a separate AI program that conflicts with security and privacy governance already in place.

### What risks are associated with AI tools in software engineering?

The biggest risks are source code exposure, secret leakage, insecure generated code, inaccurate answers presented with high confidence, unapproved model use, unclear data retention, and weak traceability for AI-assisted changes. Regulated teams should prioritize controls based on their [AI compliance needs](https://www.glean.com/perspectives/top-7-industries-with-stringent-ai-compliance-needs-in-2026), especially when engineering systems handle customer data, financial records, health information, or other sensitive content.

### How can enterprises implement effective oversight for AI-generated code?

Keep a human accountable for every merge, require pull request review, run automated security and quality checks in CI, and preserve traceability from AI assistance to final commit. Oversight works best when it is built into the same tools and workflows engineers already use, so secure behavior becomes the default rather than a separate manual step.

AI compliance is not a one-time project. It is an operating discipline that evolves alongside your tools, models, and workflows. The organizations that get this right treat governance as a continuous practice — with clear ownership, enforceable controls, and evidence that holds up under scrutiny.

[Request a demo to explore how Glean and AI can transform your workplace.](https://www.glean.com/get-a-demo)

[

Back to Perspectives home

](/perspectives)

[

Have questions or want a demo?

We’re here to help! Click the button below and we’ll be in touch.

Get a Demo



](/get-a-demo)

## Recent posts

[

![Glean’s proactive AI suite drives organizational transformation for single and multiplayer work](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a8f0b8957e021f85e681e07_Banner%20\(2\).jpg)

August 26, 2026

### Glean’s proactive AI suite drives organizational transformation for single and multiplayer work

Glean introduces proactive AI that anticipates priorities, takes action, and improves how individuals and teams get work done.

![Marisa Huff](https://cdn.prod.website-files.com/613513981b0efaf850830620/6909cff45d623a5c2428374d_Marisa.jpeg)

Marisa Huff

Product Marketing

![Kelly Huang](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a0ae02225a70d46713e5d4f_Kelly%20Huang.webp)

Kelly Huang

Product Marketing Manager

](/blog/proactive-ai-for-enterprises)

No items found.

[

![Glean Agents can now work independently, build faster, and stay governed at scale](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a8ecd5c847f851871aa6214_agents-banner.webp)

August 26, 2026

### Glean Agents can now work independently, build faster, and stay governed at scale

Our latest updates to Glean Agents provide them with the intelligence, governance, and reliability needed to drive and scale real work.

![Anuraag Gupta](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a8ecdd4522f428d26e3d4a5_anurag-gupta.jpeg)

Anuraag Gupta

Product Manager Lead, Agents

](/blog/glean-agents-go-2026)

No items found.

[

![Introducing Glean Transform, your company's mission control for AI transformation](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a95ea719f88eaa3cb10fb33_ai-transform.png)

August 26, 2026

### Introducing Glean Transform, your company's mission control for AI transformation

Glean Transform maps how work gets done, identifies high-impact AI opportunities, and measures automation value after deployment across your entire enterprise.

![Malik Ismail](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a8ecc88202eae656d145868_Malik%20Ismail.jpeg)

Malik Ismail

Head of applied AI

![Haohan Tang](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a8ef80123c83ebce56b354e_Haohan.jpeg)

Haohan Tang

Software Engineer

](/blog/glean-transform-ai-transformation)

No items found.

[

![Scale AI usage without runaway spend with Glean’s AI usage controls ](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a8ecae4634c80145cdffe88_cost-governance-banner.webp)

August 26, 2026

### Scale AI usage without runaway spend with Glean’s AI usage controls

Glean gives enterprises the visibility and controls they need to expand AI usage confidently while keeping costs predictable

![Kathleen Qin](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a8ecb7bc4d60fcd4d9b63d8_Kathleen%20Qin.jpeg)

Kathleen Qin

Product Manager

](/blog/go-cost-governance-2026)

No items found.

[

![Right-sizing intelligence: Glean saves 81% on token costs and is preferred 78% of the time versus Claude Cowork](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a8ed201e4b8f1567ff77642_go-benchmark-Banner.webp)

August 26, 2026

### Right-sizing intelligence: Glean saves 81% on token costs and is preferred 78% of the time versus Claude Cowork

A benchmark of 180+ enterprise tasks shows that auto routing, backed by high-quality context, can deliver token cost savings while achieving better performance.

![Matthew Zhao](https://cdn.prod.website-files.com/613513981b0efaf850830620/698cf8afdc94f4c0969da8fa_Matt.png)

Matthew Zhao

Engineering

![Jessica Kwok](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a8ec942d15209655a4308d7_Jess%20Kwok.jpeg)

Jessica Kwok

Product Manager

![Karthik Rajkumar](https://cdn.prod.website-files.com/613513981b0efaf850830620/698cf94bd1b022aaa167835f_Karthik.png)

Karthik Rajkumar

Applied Scientist

](/blog/go-glean-cowork)

No items found.

[

![Celebrating the 2026 Glean Partner Award Winners](https://cdn.prod.website-files.com/613513981b0efaf850830620/6a8deebe4a5b39c6e255d913_Glean%20Partner%20Award%20winners.png)

August 25, 2026

### Celebrating the 2026 Glean Partner Award Winners

Meet the 2026 Glean Partner Award winners, recognizing the partners driving transformation, collaboration, delivery excellence, customer impact, innovation, and regional growth with Glean.

![Glean](https://cdn.prod.website-files.com/613513981b0efaf850830620/641443b7208e558a59f93731_glean-author-symbol.jpg)

Glean

](/blog/2026-glean-partner-award-winners)

No items found.

## Work AI that works.

[Get a demo](/get-a-demo)

![CTA BG](https://cdn.prod.website-files.com/6127a84dfe068e153ef20572/67a9cf6a0c3b882fc397780c_9bc5d6fcbe55519f7e2590b28a3ddc3e_Home%20-%20Universal%20CTA.webp)
