**Glean Tier 3 Advanced Evaluation**  
**Undocumented Features (Found, Not in Marketing)**

*Genuine capabilities and design choices discovered only by reading SDK source code and official developer documentation directly \- none of these appear on any Glean marketing or product page (Section 4.10.1, "Undocumented Features")*

This list totals 8 findings. Each was surfaced only through hands-on review of SDK source code, README files, or the official developer-docs API reference \- never through Glean's marketing site, product pages, or press materials. They matter for two opposite reasons: some are positive engineering-quality signals a sales demo would never surface (deliberate deprecation testing, typed error handling, built-in debug logging). Others are structurally significant corrections to earlier findings in this research (the Platform API's existence, and the webhook/Triggers system that reversed an earlier "confirmed absent" conclusion).

## **1\. exclude\_deprecated\_after / include\_experimental SDK parameters**

| Where Found | Python & TypeScript SDK constructor options |
| :---- | :---- |

**What it is:** Lets a developer configure the client to test its own code against an upcoming API deprecation before it takes effect, or opt into experimental (not-yet-GA) endpoints on purpose. Most vendors just publish a changelog; building forward-testing directly into the client is a more deliberate deprecation-management design.

**Why it matters:** A concrete signal of engineering maturity around API lifecycle management \- the kind of thing that only shows up by actually reading SDK source/README, never in a product marketing page.

***Source:** github.com/gleanwork/api-client-python (hands-on, SDK README)*

## **2\. X-Glean-ActAs header for rate-limit quota distribution**

| Where Found | Client API request headers |
| :---- | :---- |

**What it is:** An officially documented (in the SDK, not marketing) workaround: when an agent runs on behalf of many end users, this header lets the calling application distribute its rate-limit quota across those users individually, rather than one shared bucket getting exhausted by all agent traffic combined.

**Why it matters:** Solves a real operational problem (a single busy agent starving out human users on the same rate limit) that most vendors never think to expose a control for.

***Source:** github.com/gleanwork/api-client-python (hands-on, SDK README)*

## **3\. Typed GleanDataError with structured .data payload**

| Where Found | Python & TypeScript SDK exception classes |
| :---- | :---- |

**What it is:** 403 (permission) and 422 (validation) errors return a distinct exception type carrying a structured .data field \- not just a generic HTTP error with a status code, but a typed object a developer can programmatically inspect and branch on.

**Why it matters:** Meaningfully reduces integration risk versus a vendor that just throws a bare HTTPError \- confirmed hands-on by reading the SDK's exception-handling code directly.

***Source:** github.com/gleanwork/api-client-python (hands-on, SDK README)*

## **4\. debug\_logger constructor parameter \+ GLEAN\_DEBUG environment variable**

| Where Found | Python & TypeScript SDK client initialization |
| :---- | :---- |

**What it is:** A built-in, opt-in verbose-logging mode for the SDK client, toggled either programmatically (debug\_logger) or via an environment variable at runtime \- standard practice in mature SDKs, but never mentioned anywhere in Glean's public developer guides or marketing.

**Why it matters:** Confirms Glean's SDK team designed for real-world debugging workflows, not just a happy-path demo.

***Source:** github.com/gleanwork/api-client-python (hands-on, SDK README)*

## **5\. Governance API resource group (Findings, Policies, Reports, VisibilityOverrides)**

| Where Found | Client API resource catalog |
| :---- | :---- |

**What it is:** A full governance/DLP-adjacent resource group exists in the API \- sensitive-content findings, policy definitions, generated reports, and visibility-override controls \- none of which appear on Glean's marketing pages, which talk about 'AI governance' only in general terms.

**Why it matters:** Suggests real, API-accessible governance tooling exists beneath the marketing language, though its functional depth was only catalog-confirmed, not walked through end-to-end.

***Source:** github.com/gleanwork/api-client-python (hands-on, full resource catalog review)*

## **6\. "Skills" API resource**

| Where Found | Platform API resource catalog |
| :---- | :---- |

**What it is:** A resource literally named 'Skills' appears in the Platform API's navigation/reference alongside Agents, Chat, Search, and Triggers \- its existence is confirmed, but no guide, example, or explanation of what a 'Skill' actually is (versus an Agent or a Tool) was found anywhere.

**Why it matters:** An entirely new, unexplained primitive \- the kind of thing only surfaced by walking the official API reference directly, not by reading any product page.

***Source:** developers.glean.com/api/platform-api (hands-on doc review, Sept 2026\)*

## **7\. Platform API as a distinct third API (separate from Client API and Indexing API)**

| Where Found | developers.glean.com top-level API navigation |
| :---- | :---- |

**What it is:** Glean's marketing and even its own SDK README only ever reference two APIs (Client, Indexing). A live re-check of the developer docs found a third, separate Platform API covering Agents, Chat, Search, Skills, and Triggers with its own OpenAPI spec and quickstart \- and its Agents resource appears to overlap, unexplained, with the Client API's own Agents resource.

**Why it matters:** A structurally significant finding that reverses an earlier, narrower understanding of Glean's API surface \- and a clear sign the platform is mid-transition, something no marketing page would ever admit to.

***Source:** developers.glean.com (hands-on doc review, Sept 2026 \- corrected an earlier finding in this research)*

## **8\. Signed webhook Triggers system with preset preview and pause/resume**

| Where Found | Platform API Triggers guide \+ Webhook Delivery guide |
| :---- | :---- |

**What it is:** A fully-built webhook system: triggers are created from per-datasource 'presets' (curated event definitions with typed inputs), can be previewed before creation, deliver a cryptographically signed payload (signing\_secret returned only once, at creation), and support partial updates (e.g., pausing delivery via PATCH status=DISABLED without losing the secret). None of this appears in any Glean marketing material, and this research's own earlier pass had incorrectly concluded webhooks were entirely absent.

**Why it matters:** The single most consequential undocumented-in-marketing finding in this research \- it reversed a prior 'confirmed absent' conclusion and materially changes the Integration & Technical Architecture assessment.

***Source:** developers.glean.com/guides/triggers/overview (hands-on doc review, Sept 2026\)*

# **Summary**

**Total undocumented findings: 8**

*Note: this differs from the "Features Not Confirmed" list in an important way \- those are claims Glean makes that lack backing evidence. This list is the reverse: capabilities that ARE confirmed to exist (via hands-on technical review), but that Glean itself never talks about publicly. Two items here (Platform API existence, and the webhook/Triggers system) were significant enough to require correcting earlier conclusions elsewhere in this research \- see Research Notes in the main workbook for the full correction log.*