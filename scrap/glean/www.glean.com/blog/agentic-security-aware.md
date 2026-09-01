---
url: "https://www.glean.com/blog/agentic-security-aware"
canonical: "https://www.glean.com/blog/agentic-security-aware"
title: "How to Deploy AI Agents With Confidence: Introducing AWARE and New Glean Protect Capabilities"
description: "Sandy Tang Sunil Agrawal | Glean Protect and our newly developed AWARE framework prepare CIOs and CISOs to integrate AI into the enterprise with speed and confidence."
fetched_at: "2026-09-01T13:26:25.292Z"
---
Last updated Mar 11, 2026.

# How to Deploy AI Agents With Confidence: Introducing AWARE and New Glean Protect Capabilities

0

minutes read

[![](https://cdn.prod.website-files.com/613513981b0efaf850830620/69b0f4b762bd5a1a6e70e8b4_Sandy%20\(1\).png)

Sandy Tang

Product Marketing



](/authors/sandy-tang)[![](https://cdn.prod.website-files.com/613513981b0efaf850830620/67ac95165f7b0f3e4b901ab2_Sunil%20Agarwal.jpeg)

Sunil Agrawal

Chief Security Officer



](/authors/sunil-agrawal)[![](https://cdn.prod.website-files.com/613513981b0efaf850830620/69b0f51eded32396d28c4239_Allan.jpeg)

Allan Livingston

Product Lead, Enterprise



](/authors/allan-livingston)[![](https://cdn.prod.website-files.com/613513981b0efaf850830620/68baa8c5975c47dca2e21777_Sarika.png)

Sarika Mohapatra

Software Engineer



](/authors/sarika-mohapatra)

![How to Deploy AI Agents With Confidence: Introducing AWARE and New Glean Protect Capabilities](https://cdn.prod.website-files.com/613513981b0efaf850830620/69b26842347de1930d091a71_BANNER%20\(1\).jpg)

Listen to article

0:00

0.5x 1x 1.5x 2x

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

Listen to article

0:00

0.5x 1x 1.5x 2x

AI agents are rapidly becoming more capable by the day, transforming how work gets done by automating decisions, orchestrating workflows, and acting on behalf of people at unprecedented scale. By the end of 2026, Gartner predicts that [40%](https://www.gartner.com/en/newsroom/press-releases/2025-08-26-gartner-predicts-40-percent-of-enterprise-apps-will-feature-task-specific-ai-agents-by-2026-up-from-less-than-5-percent-in-2025) of enterprise applications will embed task-based AI agents. However, [69%](https://home.bigid.com/download-ai-risk-report) of organizations cite AI-powered data leaks as their top security concern, while [47%](https://home.bigid.com/download-ai-risk-report) have no AI-specific controls in place, according to Big ID. Enterprise leaders are asking: how do we deploy agents without losing control? 

The gap between AI innovation and governance is widening. Traditional security frameworks weren't built for AI that acts autonomously across your entire tech stack. With CIOs looking for speed and innovation, while CISOs are pushing for better visibility and governance, there’s a real tension around AI agents. 

## Introducing AWARE: A framework for secure AI agent deployment

To help unravel this tension between innovation and governance, we’ve created the AWARE framework to codify a philosophy on how enterprises should think about the governance of AI agents.

The AWARE framework is a collaboration led by the [Work AI Institute,](https://www.glean.com/work-ai-institute) our research center at Glean, in partnership with security leaders who aren’t just researching AI, they’ve seen it in production, know the guardrails enterprises need, and are actively building the next security standard. Our framework’s co-authors Databricks and Palo Alto Networks agree: AI agents have changed how we should think about security and governance.

The AWARE framework helps you answer five critical questions about agent behavior:

-   **A – Actor Intent**: **Who or what is acting, and why?**  
    -   Agents operate with a specific job to be done, often on behalf of a human. Ensuring the agents understand the intent of that job and stay within that scope is key.
-   **W – Work Context: Is this data or action sensitive in this context?**  
    -   Sensitivity depends on both the job to be done, the person, and when it’s being asked, something static labels alone can’t capture.
-   **A – Autonomous Guardrails: Is this behavior within policy and purpose?**  
    -   Agents hallucinate, drift, and act out of scope, that’s why guardrails are needed at runtime.
-   **R – Real-Time Risk Scoring & Blocking: How risky is this right now?**  
    -   The agent system should act on risks as they occur, such as rapid access patterns, unexpected API calls, and more to curb abuse patterns. 
-   **E – Ecosystem Observability: Can we trace what the agent did, across systems and time?**  
    -   Agents operate across apps, APIs, files, and cloud tools. Being able to trace the agent is important for accountability and reliability.

With this framework, both IT and security can collaborate to assess their overall agentic system and each newly created agent. By going through these questions, teams can ensure there are clear guardrails and accountability for agent actions. They can also continuously monitor and remediate any potentially risky behavior.

This enables CIOs to drive innovation and business agility and CISOs to have confidence that every agent operates with secure, governed boundaries. With AWARE, organizations empower agent adoption without sacrificing trust or control.

Have a look at the [complete AWARE framework](https://www.glean.com/resources/guides/aware) for guidance on how to approach AI agent deployments securely.

## Guardrails on. Risks down. Agents up. See what’s new in Glean Protect.

While the market races to ship AI capabilities, many solutions are bypassing foundational security controls and leaving enterprises exposed at the platform level. We took a different approach: instead of bolting security afterwards, we’re building it according to our AWARE framework into the foundation of Glean.

### AI agents that stay in scope

As agents become more autonomous, Glean Protect continues to implement comprehensive guardrails: controls on who can build and deploy agents and limits on the actions they can take.

Now, you can enforce **restricted topics policies** that flag or prevent conversations on disallowed topics in real time. For many organizations, this is a critical way to enforce acceptable use for AI at work and keep it focused on productivity while preventing risky conversations about compensation, performance decisions, and personal financial advice.

![](https://cdn.prod.website-files.com/613513981b0efaf850830620/69b2686bd3e357e353a58017_Glean%20Protect%20provides%20several%20restricted%20topics%20policies%20to%20help%20you%20quickly%20get%20started.%20\(2\).jpg)

*Glean Protect provides several restricted topics policies to help you quickly get started.*

These are the kinds of topics enterprises worry about when they bring AI into the organization and Glean helps stop them before they turn into a privacy or compliance issue. We also made it easy to get started with out-of-the-box policies for common high-risk topics. These deterministic guardrails around AI agents capture multiple aspects of the AWARE framework, but it embodies the W – Work Context the most, given that this data and action are sensitive in this context.

Glean Protect also offers **agent alignment models** that check what an agent plans to do before allowing it to proceed. These checks pre-scan every write action before it runs. The models detect and flag unsafe or misaligned agent attempts to reduce the risk of harmful changes across your systems. Imagine a performance coach agent planning to share notes to an org-wide Slack channel instead of a private DM, the agent alignment models will catch this before it happens. To refer back to the AWARE framework, this is the A – Autonomous Guardrails.

This is all in addition to Glean Protect’s existing runtime protection designed to block prompt injections, malicious code, and toxic content the moment they occur. These can be captured under R – Real-Time Risk Scoring and Blocking from the AWARE framework as it is assessing risk and stopping attacks. 

### Effortlessly keep all your data safe

Enterprise AI needs to be grounded in the full context of your company. But when data becomes widely available to AI, it can surface overshared information that was previously buried. This content wasn't necessarily a problem before, because finding it required knowing exactly where to look. Security through obscurity isn't a policy, but for many enterprises, it was an accidental reality. This is why permissions alone are not enough. As AI increases visibility, permission gaps become far more apparent, which is why enterprises need an additional layer of protection through sensitive data detection and enforcement.

To build in deterministic guardrails, Glean Protect now empowers you with pre-built sensitive content policies you can immediately turn on. Instead of beginning on a blank slate for data loss prevention, these policy templates can start scanning for common high-risk patterns and oversharing behaviors.

![](https://cdn.prod.website-files.com/613513981b0efaf850830620/69b268c748be9bdc77090869_Glean%20Protect%20empowers%20you%20to%20turn%20on%20sensitive%20content%20policies%20with%20one-click.%20\(2\).jpg)

*Glean Protect empowers you to turn on sensitive content policies with one-click.*

Some of these **out-of-the-box policies** include secrets and credentials, payment card and banking data, personal medication information, and PII such as sensitive personal IDs. As you get started with a template, you can make adjustments to the policy to cater to your organization’s needs.

Glean continuously discovers sensitive content that’s been overshared and automatically hides it. You don’t need to be a data security expert, Glean’s models start protecting your data right away.

Glean’s sensitive content models separate signal from the noise to determine the severity level of sensitive findings. You can now also **tune the model** to understand what's sensitive to your organization with natural language, like "If documents owned by HR and containing ‘credentials’ infotypes are shared with someone outside of HR, increase the severity." That way, the sensitive content models can work for your organization.

Both sensitive content policies and models are relevant to the W - Work Context of the AWARE framework. It's important to have these policies in place to determine the types of content that is sensitive within your organization and safeguard it.

![](https://cdn.prod.website-files.com/613513981b0efaf850830620/69b2e5082e944fcedd3446b9_Glean%20Protect%20makes%20it%20easy%20to%20organize%20and%20triage%20sensitive%20findings-new.jpg)

*Glean Protect makes it easy to organize and triage sensitive findings.*

Glean now offers a **triage workflow for sensitive content findings**. If you want to play it safe, you can auto-hide sensitive data. But many organizations want a review and remediation cycle so they can validate findings, assign clear ownership, strengthen their data security posture, and tune their models or policies based on what’s actually sensitive to their organization. We make that possible with a new triage workflow for sensitive content findings.

And through our open ecosystem, you can easily export these findings to your SIEM/SOAR of choice.

Today, security teams can automate how sensitive findings are managed by **integrating** **Tines SOAR remediation runbooks** to investigate and resolve cases. By managing cases within Tines, you can fully remediate overshared content at the source.

While we’ve already partnered with Palo Alto Networks to leverage **Prisma AIRS** for AI runtime security, we have now added **Cortex Cloud DSPM** for data security posture management, so security teams can standardize security using the tools you’re already invested in. We are also expanding this secure ecosystem by bringing agentic Glean search into Prisma Browser, empowering users with intelligent, AI-driven discovery directly within their secure browsing sessions.

Our open approach to our security program embodies the E – Ecosystem Observability in the AWARE framework. We extend beyond Glean’s UI and into best-in-class security tools your teams are already using.

This suite of security guardrails ensure your data is always AI-ready without creating new exposure risks.

### Private-by-design platform

Our approach to the cloud is different. Instead of a traditional multi-tenant SaaS model, we built for enterprises that need AI data to reside in a **single-tenant environment**. Our architecture supports **deployment in the cloud of your choice** (AWS, Azure, or GCP) along with regional coverage to meet enterprise data sovereignty requirements, all fully isolated from every other customer. 

Today, we’re introducing a new deployment model: **customer-managed deployment.**

Built for some of our largest and most security-conscious customers, this model gives organizations direct **control over the deployment of Glean code in their cloud.** It’s designed for teams with strong requirements around where software runs, how traffic flows, and who controls access to data.

With customer-managed deployment, you control the deployment of code in your environment. You also get **private connectivity**, where every user request, response, and log can stay on your private network instead of traveling over the public internet. You define the destinations Glean is allowed to reach, and Glean stays within those boundaries. You can also use **customer-managed keys,** so your data is encrypted with keys you control.

In practice, this means the infrastructure runs in your cloud, you own the operational controls, and you hold the keys that ultimately govern access to your data. 

With Glean, the platform is private by design. It starts with our deployment models and carries over to connectors that enforce permissions, AI interactions that are authorized by the user, and models that only access the data a user is permitted to see, backed by agreements with model providers to prevent training on customer data or data retention.

![](https://cdn.prod.website-files.com/613513981b0efaf850830620/69b268fabf5ac8dd431f0177_You%20have%20the%20option%20to%20run%20Glean%20in%20your%20cloud%2C%20in%20your%20region%2C%20in%20your%20VPC.%20\(2\).jpg)

*You have the option to run Glean in your cloud, in your region, or in your VPC.*

Glean’s platform is validated through independent certifications. Glean recently achieved **ISO 42001**, the world’s first certifiable standard for AI Management Systems (AIMS), and maintains ISO 27001, SOC 2 Type II, and HIPAA certifications, delivering the security foundation and verified assurances that make [enterprise AI safe](https://www.glean.com/security).

## The path forward: Deploy AI agents with confidence

We hope that introducing the AWARE framework provides a better way for CIOs and CISOs to speak a common language about agent risk and governance.

Here at Glean, we've put the AWARE framework into practice. That starts with A – Actor Intent where agents act on behalf of the user with granular role-based access controls. W – Work Context by helping keep AI focused on approved use cases with restricted topics policies. A – Autonomous Guardrails that include agent alignment models that keep agents in scope instead of drifting from their intended purpose. R – Real-Time Risk Scoring & Blocking to block attacks like prompt injection and malicious code. And, E – Ecosystem Observability where customers can plug Glean into their broader security stack without losing the logging, auditability, and control they need to govern AI with confidence.

With AWARE and Glean Protect, you don’t have to choose between agents and security.

Want to see it in action? Watch the [Security Showcase](https://www.glean.com/security-showcase), and sign up for a [demo](https://www.glean.com/get-a-demo) today to learn more about Glean.

*Feature availability: Many of these capabilities are now generally available, including out-of-the-box sensitive content policies, Tines SOAR remediation runbooks, customer-managed deployment model, private connectivity, and customer-managed keys. Certain capabilities, including restricted topics policies, agent alignment models, fine-tuning sensitive content models in natural language, triage workflows for sensitive findings, Cortex Cloud DSPM, and Glean directly embedded in Prisma browser are currently in beta.*

[

Back to all stories

](/blog)

[

Have questions or want a demo?

We’re here to help! Click the button below and we’ll be in touch.

Get a Demo



](/get-a-demo)

[Get The Resource](#)

[Get The Resource](#)

Work AI for all.

[Get a Demo](/get-a-demo)

![CTA Section Background Shape](https://cdn.prod.website-files.com/6127a84dfe068e153ef20572/63f71e682d171e4af28f393e_cta-section-bg-shape-2.avif)

## See Enterprise AI in action

[

Get a demo

Get a demo

](/get-a-demo)
