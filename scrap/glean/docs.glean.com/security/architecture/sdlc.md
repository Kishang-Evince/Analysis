---
url: "https://docs.glean.com/security/architecture/sdlc"
canonical: "https://docs.glean.com/security/architecture/sdlc"
title: "Upgrade model and Software Development Life Cycle (SDLC)"
description: "A comprehensive overview of Glean's secure software development lifecycle and upgrade processes"
fetched_at: "2026-09-01T13:29:55.420Z"
---
On this page

Glean maintains a robust software delivery model designed to ensure customers always have access to the latest features while maintaining the highest standards of security, privacy, and reliability.

Our Software Development Lifecycle (SDLC) follows strict processes to ensure only trusted and verified code runs in customer deployments.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Identify if your deployment is Glean hosted or customer hosted. Customer hosted administrators must confirm access to the deployment's release notes bucket and vulnerability reports.

## Procedure[​](#procedure "Direct link to Procedure")

Review the sections to follow code from trusted branches through build, vulnerability analysis, quality assurance, and deployment.

## Trust chain overview[​](#trust-chain-overview "Direct link to Trust chain overview")

Our SDLC implements a comprehensive chain of trust that governs code from development through deployment:

-   **Reviewed, validated, and approved code** is merged only into trusted branches.
-   A **central, restricted build service** reads from trusted branches and produces signed artifacts.
-   A **restricted deployment workflow** in each customer environment only accepts these signed artifacts and validates integrity before upgrade.

## Development and deployment process[​](#development-and-deployment-process "Direct link to Development and deployment process")

The following sections describe how code moves from development to production through a controlled, auditable pipeline.

### Code management[​](#code-management "Direct link to Code management")

-   **Protected branches:** Release branches are protected and only accept code after mandatory review through signed commits. Access to critical branches is tightly controlled and monitored.
-   **Vulnerability scanning:** Continuous source and dependency scanning, for example through SCM native vulnerability scanners and dependency analysis tools, assists in early detection of potential security issues. Findings are triaged and turned into tracked remediation work validated before release.

### Build process[​](#build-process "Direct link to Build process")

1

Central build service

A restricted build service, implemented using Google Cloud Build, periodically fetches code from trusted branches in GitHub. The build service runs in a hardened project with restrictive IAM policies and minimal network access.

2

Container building

The build service builds Docker container images for Glean services and signs them using binary authorization. Only a limited set of Glean engineers can trigger builds. They cannot modify the build pipeline itself.

3

Security scanning

Multiple scanning tools are employed during the build process as defense in depth, including:

-   **Web application security scanning** against key application surfaces
-   **Cloud asset configuration scanning** to detect misconfigurations in cloud resources
-   **Container registry scanning** to detect vulnerable OS and language packages in built images

These layers help ensure that vulnerabilities are detected as early as possible, before artifacts are promoted to customer environments.

## Vulnerability management[​](#vulnerability-management "Direct link to Vulnerability management")

Vulnerability management is integrated directly into the SDLC and release pipeline so that every release is evaluated for security risk before it is made available to customers.

### Per release security analysis[​](#per-release-security-analysis "Direct link to Per release security analysis")

For **every release that ships to customers**, Glean runs an automated security analysis pipeline over all code and artifacts included in that release. This includes:

-   **Industry standard security vendor tooling** to:
    -   Scan source code, dependencies, and container images for known vulnerabilities.
    -   Identify misconfigurations and insecure defaults in the environment footprint associated with the release.
-   **Executable code reachability analysis** to:
    -   Determine whether vulnerable functions or code paths are actually loaded and reachable under expected configurations.
    -   Distinguish between issues that are present in transitive dependencies but never exercised, and issues that are realistically invokable in production.

This analysis runs as part of the release process and is updated on **every release**, not just on a scheduled calendar.

### Risk ranking and measurement[​](#risk-ranking-and-measurement "Direct link to Risk ranking and measurement")

All identified vulnerabilities from the release analysis pipeline are normalized and ranked using Glean's internal risk measurement criteria. At a high level, this process:

-   Aggregates findings across multiple scanners and analysis engines.
-   Applies a **risk scoring model** that incorporates:
    -   Upstream severity information.
    -   Exploitability and reachability (for example, whether the vulnerable path is actually executable in our usage).
    -   Potential impact in the context of how the affected component is used in Glean.
-   Assigns each issue a **criticality level** (for example, Critical, High, Medium, Low) according to Glean's internal metric.

note

The exact details of this measurement metric and mapping from raw scanner output to final criticality levels are documented separately and can be shared under NDA.

### Release gating, reports, and timelines[​](#release-gating-reports-and-timelines "Direct link to Release gating, reports, and timelines")

The outcome of this vulnerability analysis is fed back into the SDLC and release process:

-   **Critical vulnerabilities**:
    -   Receive **high priority for patching** and generally must be addressed before a release is allowed to ship.
    -   May result in **release gating**, requiring a fix or a compensating control before the release can be promoted to customer environments.
    -   Can trigger **unscheduled patches** when appropriate, rather than waiting for the next scheduled release.
-   **High and medium vulnerabilities**:
    -   Are scheduled into the engineering backlog according to their criticality.
    -   Have **target timelines for remediation** based on risk, exposure, and customer impact.

#### For customer hosted deployments only[​](#for-customer-hosted-deployments-only "Direct link to For customer hosted deployments only")

For each release, Glean produces a consolidated **vulnerability report** that:

-   Summarizes the vulnerabilities relevant to that release and their final criticality ratings under Glean's metric.
-   Highlights any **reachable and exploitable** issues and the actions taken (or planned) to mitigate them.
-   Includes an expected **timeline for resolution** for issues that are not yet fixed, aligned with Glean's risk-based remediation policy.

Each report is exported as both an interactive **HTML report** and a machine readable **CSV file**, stored in your deployment's release notes bucket, such as Amazon S3 or Google Cloud Storage, alongside your regular release notes.

note

You should leverage this report to compare and contrast with your own security tooling to get a full understanding of which vulnerabilities are outstanding and how they rank. Please consult this report first before submitting a support ticket should you detect security vulnerabilities with your internal tooling.

## Quality assurance[​](#quality-assurance "Direct link to Quality assurance")

info

All releases undergo comprehensive testing in separate tenancies before customer deployment. No production or customer data is ever used in testing.

Our QA process includes:

-   **Internal soak testing:** Extended soak periods for new releases in environments that are not used for production, with monitoring for regressions in stability, performance, and correctness.
-   **Automated testing:** Comprehensive automated test suites covering unit, integration, end to end, and regression tests. CI pipelines enforce these checks before code can be promoted to release branches.
-   **Manual testing:** Targeted manual verification for new or high risk features, complex integration paths, and UX regressions that are hard to capture automatically.
-   **Security testing:** P0 security and permissions testing as part of release validation, including targeted regression testing for authentication, authorization, connector boundaries, and administrative surfaces.

## Deployment process[​](#deployment-process "Direct link to Deployment process")

1

Central workflow

A central deployment workflow orchestrates upgrades across customer environments. The workflow is limited to invoking specific cloud functions that were approved in advance within customer tenants.

2

Release specification

The only input to the customer side upgrade function is the **name of the approved release** to upgrade to. Customer environments never receive arbitrary code or configuration from the central control plane.

3

Self upgrade

The system self-upgrades by downloading the signed release from a trusted storage location and verifying integrity using binary authorization policies. Only releases that pass these verification checks are allowed to run.

## Security measures[​](#security-measures "Direct link to Security measures")

### Access control[​](#access-control "Direct link to Access control")

### Employee authentication

Glean implements:

-   **Single Sign-On (SSO)** with **Multi-Factor Authentication (MFA)** for all corporate systems
-   Short lived authentication sessions, for example, 24 hour sessions for cloud console access, that require authentication again after expiry
-   Centralized identity and access management with periodic reviews and revocation for unused or unneeded access

### Repository access

Access controls for source and build infrastructure include:

-   Limited engineer access to private GitHub repositories, based on role and need to know
-   Separation of duties: engineers who can trigger builds **cannot modify** the build pipelines. Pipeline configuration changes require separate review and approval

### Security testing and compliance[​](#security-testing-and-compliance "Direct link to Security testing and compliance")

-   **Security exercises:** Regular tabletop exercises to practice detection, response, and recovery for realistic incident scenarios, complemented by periodic external penetration testing by specialized security firms. Follow-up remediation and verification of findings are tracked to closure.
-   **Compliance standards:** Glean maintains System and Organization Controls (SOC) 2 Type II compliance.

note

Detailed reports including the latest penetration test results and full SOC 2 Type II documentation are available under NDA through your Glean account team.
